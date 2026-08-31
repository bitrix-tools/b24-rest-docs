# Как автоматически заполнить зависимое поле CRM после изменения основного поля

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — «изменения» элементов объекта CRM
>
> - [event.bind](../../../api-reference/events/event-bind.md) — любой пользователь приложения
> - [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) — пользователь с правом «чтения» элементов объекта CRM
> - [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) — пользователь с правом «изменения» элементов объекта CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Зависимое поле можно заполнять автоматически после сохранения сделки. Например, менеджер выбирает услугу в поле «Услуга», а приложение записывает в поле «Документы» список документов для этой услуги.

Сценарий не меняет интерфейс карточки во время редактирования: он не показывает и не скрывает поля, не делает их обязательными и не перестраивает разделы карточки. Приложение получает событие после сохранения, читает сделку, проверяет значение основного поля и обновляет зависимое поле.

Сценарий состоит из четырех шагов.

1. Подписать приложение на событие [onCrmDealUpdate](../../../api-reference/crm/deals/events/on-crm-deal-update.md) методом [event.bind](../../../api-reference/events/event-bind.md)
2. Получить значения полей сделки методом [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md)
3. Проверить значение основного поля в коде обработчика
4. Записать значение в зависимое поле методом [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md)

## Что нужно до начала

- локальное приложение с OAuth-авторизацией и scope `crm`
- публичный HTTPS-URL обработчика события
- завершенная установка приложения: события не отправляются, пока установка не завершена
- сохраненный `application_token` приложения для проверки входящих событий
- два пользовательских поля в сделке: основное поле, значение которого проверяет приложение, и зависимое поле, которое приложение заполняет. В примере основное поле «Услуга» имеет тип «Список», зависимое поле «Документы» — тип «Текст». Если список документов короткий, можно использовать тип «Строка»
- права пользователя, под которым выполняется обработчик, на чтение и изменение сделки

В примерах замените:

- `https://your-domain.example/crm-deal-update` — URL обработчика события
- `B24_CLIENT_ID` — идентификатор приложения
- `B24_CLIENT_SECRET` — секретный ключ приложения
- `B24_APPLICATION_TOKEN` — `application_token` установленного приложения
- `UF_CRM_SERVICE` — поле «Услуга»
- `UF_CRM_DOCUMENTS` — поле «Документы»
- `102` и `103` — идентификаторы значений списка «Услуга»

Идентификаторы пользовательских полей и значений списка в каждом Битрикс24 свои. Их можно посмотреть в настройках пользовательских полей или получить методами [crm.deal.userfield.list](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md) и [crm.deal.userfield.get](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-get.md).

Фрагменты в шагах 2–4 показывают отдельные операции внутри обработчика. Полный код обработчика — в блоке [Пример кода](#primer-koda).

## 1. Подпишем приложение на изменение сделки

Метод [event.bind](../../../api-reference/events/event-bind.md) регистрирует обработчик события. В параметре `event` передайте код события `ONCRMDEALUPDATE`, в `handler` — публичный HTTPS-URL обработчика.

Метод работает только в контексте приложения. Входящий вебхук не подойдет для регистрации события методом `event.bind`.

В примерах ниже `$b24` для JS, `$b24` для PHP и `client` для Python — уже инициализированные клиенты с OAuth-токеном приложения. Получение, хранение и продление OAuth-токенов описаны в статье [Полный протокол авторизации OAuth 2.0](../../../settings/oauth/index.md).

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    const handlerUrl = 'https://your-domain.example/crm-deal-update'

    const response = await $b24.actions.v2.call.make({
        method: 'event.bind',
        params: {
            event: 'ONCRMDEALUPDATE',
            handler: handlerUrl,
        },
        requestId: 'bind-crm-deal-update',
    })

    console.log(response.getData().result)
    ```

- PHP

    ```php
    <?php
    $handlerUrl = 'https://your-domain.example/crm-deal-update';

    // У event.bind нет обертки в SDK — вызываем метод напрямую
    $response = $b24->core->call('event.bind', [
        'event' => 'ONCRMDEALUPDATE',
        'handler' => $handlerUrl,
    ]);

    print_r($response->getResponseData()->getResult());
    ```

- Python

    ```python
    handler_url = "https://your-domain.example/crm-deal-update"

    response = client.event.bind(
        event="ONCRMDEALUPDATE",
        handler=handler_url,
    ).response

    print(response.result)
    ```

{% endlist %}

Успешная регистрация вернет `true`.

```json
{
    "result": true
}
```

## 2. Получим значения полей сделки

Когда сделка изменится, Битрикс24 отправит POST-запрос на URL обработчика. Событие [onCrmDealUpdate](../../../api-reference/crm/deals/events/on-crm-deal-update.md) передает только идентификатор сделки в `data.FIELDS.ID`. Значения полей в событие не входят, поэтому обработчик должен запросить сделку методом [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md).

Тело запроса приходит как `application/x-www-form-urlencoded`. В примере ниже структура показана в формате JSON.

```json
{
    "event": "ONCRMDEALUPDATE",
    "data": {
        "FIELDS": {
            "ID": "759"
        }
    },
    "auth": {
        "domain": "some-domain.bitrix24.ru",
        "access_token": "put_access_token_here",
        "refresh_token": "put_refresh_token_here",
        "member_id": "a223c6b3710f85df22e9377d6c4f7553",
        "application_token": "51856fefc120afa4b628cc82d3935cce"
    }
}
```

В примере передаем в `crm.item.get`:

- `entityTypeId` — `2`, тип объекта «Сделка»
- `id` — идентификатор сделки из события
- `useOriginalUfNames` — `Y`, чтобы читать пользовательские поля по именам вида `UF_CRM_SERVICE`

{% list tabs %}

- JS

    ```js
    import express from 'express'
    import { B24OAuth } from '@bitrix24/b24jssdk'

    const app = express()
    app.use(express.urlencoded({ extended: true }))

    const APP = {
        clientId: process.env.B24_CLIENT_ID,
        clientSecret: process.env.B24_CLIENT_SECRET,
    }
    const APPLICATION_TOKEN = process.env.B24_APPLICATION_TOKEN

    function makeClient(auth) {
        const $b24 = new B24OAuth({
            domain: auth.domain,
            accessToken: auth.access_token,
            refreshToken: auth.refresh_token,
            memberId: auth.member_id,
        }, APP)
        $b24.offClientSideWarning()
        return $b24
    }

    app.post('/crm-deal-update', async (req, res) => {
        const auth = req.body.auth
        const dealId = Number(req.body.data?.FIELDS?.ID)
        if (!APPLICATION_TOKEN || auth?.application_token !== APPLICATION_TOKEN) {
            res.sendStatus(403)
            return
        }

        const $b24 = makeClient(auth)
        const response = await $b24.actions.v2.call.make({
            method: 'crm.item.get',
            params: {
                entityTypeId: 2,
                id: dealId,
                useOriginalUfNames: 'Y',
            },
            requestId: `deal-${dealId}-get`,
        })

        const deal = response.getData().result.item
        console.log(deal.UF_CRM_SERVICE)

        res.sendStatus(200)
    })

    app.listen(3000)
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Core\Credentials\ApplicationProfile;
    use Bitrix24\SDK\Core\Credentials\AuthToken;
    use Bitrix24\SDK\Core\Credentials\DefaultOAuthServerUrl;
    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Monolog\Handler\StreamHandler;
    use Monolog\Logger;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Symfony\Component\HttpFoundation\Request;

    $request = Request::createFromGlobals();
    $auth = $request->request->all('auth');
    $applicationToken = getenv('B24_APPLICATION_TOKEN');

    if (!$applicationToken || (($auth['application_token'] ?? '') !== $applicationToken)) {
        http_response_code(403);
        return;
    }

    $appProfile = ApplicationProfile::initFromArray([
        'BITRIX24_PHP_SDK_APPLICATION_CLIENT_ID' => getenv('B24_CLIENT_ID'),
        'BITRIX24_PHP_SDK_APPLICATION_CLIENT_SECRET' => getenv('B24_CLIENT_SECRET'),
        'BITRIX24_PHP_SDK_APPLICATION_SCOPE' => 'crm',
    ]);

    $authToken = AuthToken::initFromEventRequest($request);
    $domain = (string)$auth['domain'];

    $log = new Logger('crm-dependent-fields');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $b24 = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->init($appProfile, $authToken, $domain, DefaultOAuthServerUrl::default());

    $eventData = $request->request->all('data');
    $dealId = (int)$eventData['FIELDS']['ID'];

    // Параметр useOriginalUfNames передаем прямым вызовом через ядро SDK
    $response = $b24->core->call('crm.item.get', [
        'entityTypeId' => 2,
        'id' => $dealId,
        'useOriginalUfNames' => 'Y',
    ]);
    $deal = $response->getResponseData()->getResult()['item'];

    echo $deal['UF_CRM_SERVICE'];
    ```

- Python

    ```python
    # pip install flask b24pysdk
    import os
    from flask import Flask, request
    from b24pysdk import BitrixApp, BitrixToken

    app = Flask(__name__)

    APP = BitrixApp(
        client_id=os.environ["B24_CLIENT_ID"],
        client_secret=os.environ["B24_CLIENT_SECRET"],
    )
    APPLICATION_TOKEN = os.environ["B24_APPLICATION_TOKEN"]

    def make_token(auth: dict) -> BitrixToken:
        return BitrixToken(
            domain=auth["domain"],
            auth_token=auth["access_token"],
            refresh_token=auth.get("refresh_token", ""),
            bitrix_app=APP,
        )

    def get_nested(prefix: str) -> dict:
        result = {}
        for key, value in request.form.items():
            if key.startswith(prefix + "[") and key.endswith("]"):
                path = key[len(prefix) + 1 : -1].split("][")
                cursor = result
                for part in path[:-1]:
                    cursor = cursor.setdefault(part, {})
                cursor[path[-1]] = value
        return result

    @app.post("/crm-deal-update")
    def handle_deal_update():
        auth = get_nested("auth")
        event_data = get_nested("data")
        deal_id = int(event_data["FIELDS"]["ID"])
        if auth.get("application_token") != APPLICATION_TOKEN:
            return "", 403

        token = make_token(auth)
        # Параметр useOriginalUfNames передаем прямым вызовом через SDK
        deal = token.call_method("crm.item.get", {
            "entityTypeId": 2,
            "id": deal_id,
            "useOriginalUfNames": "Y",
        })["result"]["item"]

        print(deal["UF_CRM_SERVICE"])
        return "", 200
    ```

{% endlist %}

Ответ метода содержит сделку и пользовательские поля. В примере оставлены только поля, которые нужны для сценария. Поле `UF_CRM_DOCUMENTS` пустое, потому что зависимое поле еще не обновлено.

```json
{
    "result": {
        "item": {
            "id": 759,
            "title": "Сделка #759",
            "UF_CRM_SERVICE": "102",
            "UF_CRM_DOCUMENTS": ""
        }
    }
}
```

Сохраните значение `UF_CRM_SERVICE`: оно нужно для проверки условия.

## 3. Проверим значение основного поля

Правила зависимости задает код приложения. В примере `102` и `103` — это идентификаторы вариантов списка в поле «Услуга». Каждому варианту приложение сопоставляет свой список документов.

Ниже фрагмент логики обработчика. Полные реализации на JS, PHP и Python есть в блоке [Пример кода](#primer-koda).

```js
const documentsByService = {
    102: 'Паспорт, заявление, договор',
    103: 'ИНН, доверенность, акт',
}

const serviceId = deal.UF_CRM_SERVICE
const documents = documentsByService[serviceId]

if (!documents) {
    return
}
```

Если поле «Услуга» пустое или выбранного значения нет в `documentsByService`, обработчик завершится без обновления сделки. Добавьте в объект `documentsByService` все значения списка, для которых нужно заполнять поле «Документы».

Если зависимое поле уже содержит нужное значение, завершите обработчик без вызова `crm.item.update`. Это защитит приложение от лишнего обновления сделки и повторного события.

```js
if (deal.UF_CRM_DOCUMENTS === documents) {
    return
}
```

## 4. Изменим зависимое поле

Метод [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) обновляет только поля, которые переданы в объекте `fields`. Передайте идентификатор сделки из события и новое значение зависимого поля.

В примере передаем:

- `entityTypeId` — `2`, тип объекта «Сделка»
- `id` — идентификатор сделки из события
- `fields.UF_CRM_DOCUMENTS` — новое значение зависимого поля
- `useOriginalUfNames` — `Y`, чтобы использовать имя поля вида `UF_CRM_DOCUMENTS`

{% list tabs %}

- JS

    ```js
    await $b24.actions.v2.call.make({
        method: 'crm.item.update',
        params: {
            entityTypeId: 2,
            id: dealId,
            fields: {
                UF_CRM_DOCUMENTS: documents,
            },
            useOriginalUfNames: 'Y',
        },
        requestId: `deal-${dealId}-update-documents`,
    })
    ```

- PHP

    ```php
    <?php
    // Параметр useOriginalUfNames передаем прямым вызовом через ядро SDK
    $b24->core->call('crm.item.update', [
        'entityTypeId' => 2,
        'id' => $dealId,
        'fields' => [
            'UF_CRM_DOCUMENTS' => $documents,
        ],
        'useOriginalUfNames' => 'Y',
    ]);
    ```

- Python

    ```python
    # Параметр useOriginalUfNames передаем прямым вызовом через SDK
    token.call_method("crm.item.update", {
        "entityTypeId": 2,
        "id": deal_id,
        "fields": {
            "UF_CRM_DOCUMENTS": documents,
        },
        "useOriginalUfNames": "Y",
    })
    ```

{% endlist %}

Успешный ответ содержит обновленную сделку. В примере оставлены только поля, которые подтверждают изменение зависимого поля.

```json
{
    "result": {
        "item": {
            "id": 759,
            "title": "Сделка #759",
            "UF_CRM_SERVICE": "102",
            "UF_CRM_DOCUMENTS": "Паспорт, заявление, договор"
        }
    }
}
```

## Проверим результат

Откройте карточку сделки в CRM. Если в поле «Услуга» выбрано значение, которому приложение сопоставило список документов, поле «Документы» будет заполнено после сохранения сделки и обработки события.

Проверить результат через REST можно методом [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md).

```json
{
    "entityTypeId": 2,
    "id": 759,
    "useOriginalUfNames": "Y"
}
```

Сценарий выполнен, если в ответе поле `UF_CRM_DOCUMENTS` содержит значение, соответствующее `UF_CRM_SERVICE`.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| `ERROR_EVENT_NOT_FOUND` | В `event.bind` передан неверный код события. Для сделки укажите `ONCRMDEALUPDATE` ||
|| `ACCESS_DENIED` | У пользователя нет права читать или изменять сделку. Проверьте права пользователя, под которым выполняется обработчик ||
|| `NOT_FOUND` | Сделка не найдена или недоступна пользователю. Проверьте `data.FIELDS.ID` из события ||
|| `CRM_FIELD_ERROR_VALUE_NOT_VALID` | В зависимое поле передано значение неподходящего типа. Проверьте тип пользовательского поля и формат значения ||
|#

Если событие не приходит, проверьте, что приложение установлено, установка завершена, обработчик доступен по HTTPS, а событие зарегистрировано методом `event.bind`.

Если событие приходит, но поле не меняется, проверьте:

- код поля «Услуга» и код поля «Документы»
- идентификаторы значений списка «Услуга»
- наличие выбранного значения в объекте `documentsByService`
- значение параметра `useOriginalUfNames`
- условие, которое пропускает обновление, если `UF_CRM_DOCUMENTS` уже равно нужному значению
- значение `B24_APPLICATION_TOKEN`, если обработчик возвращает `403`

## Что важно учитывать

- Сценарий срабатывает после сохранения сделки. Он не меняет интерфейс карточки в момент выбора значения
- Событие `ONCRMDEALUPDATE` сообщает только идентификатор сделки, а не список измененных полей. Поэтому обработчик всегда читает сделку методом `crm.item.get`
- Обновление зависимого поля тоже вызывает событие изменения сделки. Перед `crm.item.update` сравнивайте текущее и новое значения
- Если важно не потерять изменение при временной недоступности обработчика, используйте [офлайн-события](../../../api-reference/events/offline-events.md). Приложение сможет забрать накопленные события из очереди
- Для смарт-процессов используйте событие [onCrmDynamicItemUpdate](../../../api-reference/crm/universal/events/on-crm-dynamic-item-update.md). В событии придут `ID` элемента и `ENTITY_TYPE_ID`, их нужно передать в `crm.item.get` и `crm.item.update`
- Для лидов, контактов и компаний используйте события соответствующего объекта: [onCrmLeadUpdate](../../../api-reference/crm/leads/events/on-crm-lead-update.md), [onCrmContactUpdate](../../../api-reference/crm/contacts/events/on-crm-contact-update.md), [onCrmCompanyUpdate](../../../api-reference/crm/companies/events/on-crm-company-update.md)
- Проверяйте `application_token`, чтобы убедиться, что запрос пришел от Битрикс24. Подробный разбор есть в статье [Безопасная обработка событий](../../../api-reference/events/safe-event-handlers.md)
- Токены OAuth не придут в обработчик, если изменение выполнил робот, бизнес-процесс или агент. Для надежной фоновой обработки храните токены пользователя, который установил приложение

## Пример кода

Код проходит все четыре шага: получает событие изменения сделки, читает значения полей, выбирает список документов по услуге и обновляет зависимое поле.

Замените параметры приложения, `application_token`, URL обработчика, коды пользовательских полей и идентификаторы значений списка.

{% list tabs %}

- JS

    ```js
    // npm install express @bitrix24/b24jssdk
    import express from 'express'
    import { B24OAuth } from '@bitrix24/b24jssdk'

    const app = express()
    app.use(express.urlencoded({ extended: true }))

    const APP = {
        clientId: process.env.B24_CLIENT_ID,
        clientSecret: process.env.B24_CLIENT_SECRET,
    }
    const APPLICATION_TOKEN = process.env.B24_APPLICATION_TOKEN

    const ENTITY_TYPE_ID = 2
    const SERVICE_FIELD = 'UF_CRM_SERVICE'
    const DOCUMENTS_FIELD = 'UF_CRM_DOCUMENTS'
    const DOCUMENTS_BY_SERVICE = {
        102: 'Паспорт, заявление, договор',
        103: 'ИНН, доверенность, акт',
    }

    function makeClient(auth) {
        const $b24 = new B24OAuth({
            domain: auth.domain,
            accessToken: auth.access_token,
            refreshToken: auth.refresh_token,
            memberId: auth.member_id,
        }, APP)
        $b24.offClientSideWarning()
        return $b24
    }

    async function call($b24, method, params, requestId) {
        const response = await $b24.actions.v2.call.make({ method, params, requestId })
        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }
        return response.getData().result
    }

    app.post('/crm-deal-update', async (req, res) => {
        try {
            const auth = req.body.auth
            const dealId = Number(req.body.data?.FIELDS?.ID)
            if (!auth || !dealId) {
                res.sendStatus(400)
                return
            }
            if (!APPLICATION_TOKEN || auth.application_token !== APPLICATION_TOKEN) {
                res.sendStatus(403)
                return
            }

            const $b24 = makeClient(auth)
            const { item: deal } = await call($b24, 'crm.item.get', {
                entityTypeId: ENTITY_TYPE_ID,
                id: dealId,
                useOriginalUfNames: 'Y',
            }, `deal-${dealId}-get`)

            const serviceId = deal[SERVICE_FIELD]
            const documents = DOCUMENTS_BY_SERVICE[serviceId]
            if (!documents || deal[DOCUMENTS_FIELD] === documents) {
                res.sendStatus(200)
                return
            }

            await call($b24, 'crm.item.update', {
                entityTypeId: ENTITY_TYPE_ID,
                id: dealId,
                fields: {
                    [DOCUMENTS_FIELD]: documents,
                },
                useOriginalUfNames: 'Y',
            }, `deal-${dealId}-update-documents`)

            res.sendStatus(200)
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    })

    app.listen(3000)
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Core\Credentials\ApplicationProfile;
    use Bitrix24\SDK\Core\Credentials\AuthToken;
    use Bitrix24\SDK\Core\Credentials\DefaultOAuthServerUrl;
    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Monolog\Handler\StreamHandler;
    use Monolog\Logger;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Symfony\Component\HttpFoundation\Request;

    $request = Request::createFromGlobals();
    $auth = $request->request->all('auth');
    $applicationToken = getenv('B24_APPLICATION_TOKEN');

    if (!$applicationToken || (($auth['application_token'] ?? '') !== $applicationToken)) {
        http_response_code(403);
        return;
    }

    $appProfile = ApplicationProfile::initFromArray([
        'BITRIX24_PHP_SDK_APPLICATION_CLIENT_ID' => getenv('B24_CLIENT_ID'),
        'BITRIX24_PHP_SDK_APPLICATION_CLIENT_SECRET' => getenv('B24_CLIENT_SECRET'),
        'BITRIX24_PHP_SDK_APPLICATION_SCOPE' => 'crm',
    ]);

    $authToken = AuthToken::initFromEventRequest($request);
    $domain = (string)$auth['domain'];

    $log = new Logger('crm-dependent-fields');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $b24 = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->init($appProfile, $authToken, $domain, DefaultOAuthServerUrl::default());

    $entityTypeId = 2;
    $serviceField = 'UF_CRM_SERVICE';
    $documentsField = 'UF_CRM_DOCUMENTS';
    $documentsByService = [
        '102' => 'Паспорт, заявление, договор',
        '103' => 'ИНН, доверенность, акт',
    ];

    try {
        $eventData = $request->request->all('data');
        $dealId = (int)$eventData['FIELDS']['ID'];

        // Параметр useOriginalUfNames передаем прямым вызовом через ядро SDK
        $resultDeal = $b24->core->call('crm.item.get', [
            'entityTypeId' => $entityTypeId,
            'id' => $dealId,
            'useOriginalUfNames' => 'Y',
        ]);
        $deal = $resultDeal->getResponseData()->getResult()['item'];

        $serviceId = (string)$deal[$serviceField];
        $documents = $documentsByService[$serviceId] ?? null;

        if ($documents === null || $deal[$documentsField] === $documents) {
            http_response_code(200);
            return;
        }

        // Параметр useOriginalUfNames передаем прямым вызовом через ядро SDK
        $b24->core->call('crm.item.update', [
            'entityTypeId' => $entityTypeId,
            'id' => $dealId,
            'fields' => [
                $documentsField => $documents,
            ],
            'useOriginalUfNames' => 'Y',
        ]);

        http_response_code(200);
    } catch (\Throwable $e) {
        error_log($e->getMessage());
        http_response_code(500);
    }
    ```

- Python

    ```python
    # pip install flask b24pysdk
    import os
    from flask import Flask, request
    from b24pysdk import BitrixApp, BitrixToken

    app = Flask(__name__)

    APP = BitrixApp(
        client_id=os.environ["B24_CLIENT_ID"],
        client_secret=os.environ["B24_CLIENT_SECRET"],
    )
    APPLICATION_TOKEN = os.environ["B24_APPLICATION_TOKEN"]

    ENTITY_TYPE_ID = 2
    SERVICE_FIELD = "UF_CRM_SERVICE"
    DOCUMENTS_FIELD = "UF_CRM_DOCUMENTS"
    DOCUMENTS_BY_SERVICE = {
        "102": "Паспорт, заявление, договор",
        "103": "ИНН, доверенность, акт",
    }

    def make_token(auth: dict) -> BitrixToken:
        return BitrixToken(
            domain=auth["domain"],
            auth_token=auth["access_token"],
            refresh_token=auth.get("refresh_token", ""),
            bitrix_app=APP,
        )

    def get_nested(prefix: str) -> dict:
        result = {}
        for key, value in request.form.items():
            if key.startswith(prefix + "[") and key.endswith("]"):
                path = key[len(prefix) + 1 : -1].split("][")
                cursor = result
                for part in path[:-1]:
                    cursor = cursor.setdefault(part, {})
                cursor[path[-1]] = value
        return result

    @app.post("/crm-deal-update")
    def handle_deal_update():
        try:
            auth = get_nested("auth")
            event_data = get_nested("data")
            deal_id = int(event_data["FIELDS"]["ID"])
            if auth.get("application_token") != APPLICATION_TOKEN:
                return "", 403

            token = make_token(auth)
            # Параметр useOriginalUfNames передаем прямым вызовом через SDK
            deal = token.call_method("crm.item.get", {
                "entityTypeId": ENTITY_TYPE_ID,
                "id": deal_id,
                "useOriginalUfNames": "Y",
            })["result"]["item"]

            service_id = str(deal[SERVICE_FIELD])
            documents = DOCUMENTS_BY_SERVICE.get(service_id)

            if documents is None or deal[DOCUMENTS_FIELD] == documents:
                return "", 200

            # Параметр useOriginalUfNames передаем прямым вызовом через SDK
            token.call_method("crm.item.update", {
                "entityTypeId": ENTITY_TYPE_ID,
                "id": deal_id,
                "fields": {
                    DOCUMENTS_FIELD: documents,
                },
                "useOriginalUfNames": "Y",
            })

            return "", 200
        except Exception as error:
            print(error)
            return "", 500
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](../../../api-reference/events/index.md)
- [{#T}](../../../api-reference/events/event-bind.md)
- [{#T}](../../../api-reference/events/safe-event-handlers.md)
- [{#T}](../../../api-reference/crm/deals/events/on-crm-deal-update.md)
- [{#T}](../../../api-reference/crm/universal/crm-item-get.md)
- [{#T}](../../../api-reference/crm/universal/crm-item-update.md)
- [{#T}](../../../api-reference/crm/deals/user-defined-fields/index.md)
