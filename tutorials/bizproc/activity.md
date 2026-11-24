# Как добавить действие для создания смарт-счета на основании лида или сделки

> Scope: [`bizproc`, `crm`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужен администратор Битрикс24 с правами на чтение лида или сделки, создание смарт-счета и изменение его товарных позиций
>
> - [bizproc.activity.add](../../api-reference/bizproc/bizproc-activity/bizproc-activity-add.md) и [bizproc.robot.add](../../api-reference/bizproc/bizproc-robot/bizproc-robot-add.md) — администратор
> - [crm.lead.get / crm.deal.get](../../api-reference/crm/rest-v3/items/crm-entity-get-rest-v3.md) — пользователь с правом чтения элементов объекта CRM
> - [crm.smartinvoice.add](../../api-reference/crm/rest-v3/items/crm-entity-add-rest-v3.md) — пользователь с правом добавления элементов объекта CRM
> - [crm.lead.productrow.list / crm.deal.productrow.list](../../api-reference/crm/rest-v3/product-rows/crm-entity-product-row-list-rest-v3.md) — пользователь с правом чтения объекта CRM, товарные позиции которого выбираются
> - [crm.smartinvoice.productrow.replace](../../api-reference/crm/rest-v3/product-rows/crm-entity-product-row-replace-rest-v3.md) — пользователь с правом изменения объекта CRM, товарные позиции которого устанавливаются

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Сценарий показывает, как приложение добавляет действие бизнес-процесса, которое получает лид или сделку из контекста запуска и создает смарт-счет по данным CRM-объекта. Из лида или сделки в счет передаются клиент и товарные позиции. Для сделки счет дополнительно связывается с исходной сделкой через поле `relatedDealId`.

Действие можно использовать в дизайнере бизнес-процессов. Для CRM-автоматизации используйте робота приложения: набор параметров и обработчик останутся такими же, изменится только метод регистрации.

Сценарий состоит из четырех шагов.

1. Зарегистрируйте действие методом [bizproc.activity.add](../../api-reference/bizproc/bizproc-activity/bizproc-activity-add.md)
2. Получите в обработчике `document_id` и определите, что запустило действие: лид или сделка
3. Получите данные CRM-объекта методом [crm.lead.get / crm.deal.get](../../api-reference/crm/rest-v3/items/crm-entity-get-rest-v3.md) и товарные позиции методом [crm.lead.productrow.list / crm.deal.productrow.list](../../api-reference/crm/rest-v3/product-rows/crm-entity-product-row-list-rest-v3.md)
4. Создайте смарт-счет методом [crm.smartinvoice.add](../../api-reference/crm/rest-v3/items/crm-entity-add-rest-v3.md) и перенесите товары методом [crm.smartinvoice.productrow.replace](../../api-reference/crm/rest-v3/product-rows/crm-entity-product-row-replace-rest-v3.md)

Порядок развертывания: соберите функции шагов 2–4 и разместите обработчик по адресу `HANDLER`, затем зарегистрируйте действие из шага 1 и только после этого запускайте бизнес-процесс.

## Подготовьте приложение

Методы `bizproc.activity.add` и `bizproc.robot.add` работают только в контексте [приложения](../../settings/app-installation/index.md). Входящий вебхук не подойдет: метод вернет ошибку `ACCESS_DENIED` с описанием `Access denied! Application context required`.

Перед началом подготовьте:

- приложение со scope `bizproc` и `crm`
- публичный HTTPS-адрес обработчика, например `https://your-domain.example/bp-handler`
- идентификатор администратора для параметра `AUTH_USER_ID`
- обработчик события [ONAPPINSTALL](../../api-reference/common/events/on-app-install.md), подготовленный до установки приложения: в примерах PHP и Python он регистрирует действие из шага 1. Как подключить обработчик установки, описано в статье [ONAPPINSTALL](../../api-reference/common/events/on-app-install.md). Если приложение уже установлено без такого обработчика, переустановите его
- проверку запроса установки. Адрес обработчика установки публичный, поэтому до сохранения токенов и регистрации действия проверьте запрос по инструкции для [локального](../../settings/app-installation/local-apps/installation-callback.md) или [тиражного](../../settings/app-installation/mass-market-apps/installation-callback.md) приложения
- хранилище приложения для `application_token`: после успешной проверки запроса установки сохраните `application_token` вместе с `domain` и реализуйте функцию, которая возвращает значение по `domain`. Обработчик действия вызывает ее до вызовов CRM
- переменные окружения `B24_CLIENT_ID` и `B24_CLIENT_SECRET`, зависимости SDK и Express для Node.js или Flask для Python
- идентификатор вашей компании для поля смарт-счета `myCompanyId`. Его можно получить методом [crm.mycompany.list](../../api-reference/crm/rest-v3/items/crm-entity-list-rest-v3.md) с `select: ["id", "title"]`

Тип объекта задается именем метода REST 3.0:

#|
|| Объект | Методы ||
|| Лид | `crm.lead.get`, `crm.lead.productrow.list` ||
|| Сделка | `crm.deal.get`, `crm.deal.productrow.list` ||
|| Смарт-счет | `crm.smartinvoice.add`, `crm.smartinvoice.productrow.replace` ||
|#

{% include [Сноска о примерах](../../_includes/examples.md) %}

## 1. Зарегистрируйте действие

Регистрацию выполните один раз из установленного приложения, например на странице настройки приложения. В JS пример выполняется в iframe приложения через `initializeB24Frame()`. В PHP и Python переменные `$b24` и `client` создайте на токенах установленного приложения, например из события [ONAPPINSTALL](../../api-reference/common/events/on-app-install.md): поля `auth` в нем приходят так же, как в запросе на обработчик в шаге 2. В примерах замените адрес `HANDLER`, `AUTH_USER_ID` и значение по умолчанию `mycompany_id` на данные своего приложения и Битрикс24.

Передайте в `CODE` уникальный код действия в рамках приложения. В `HANDLER` укажите публичный URL, на который Битрикс24 отправит данные при выполнении действия. В `PROPERTIES` опишите параметры, которые администратор заполнит в дизайнере бизнес-процесса.

В примере действие получает два параметра:

- `invoice_title` — название смарт-счета
- `mycompany_id` — идентификатор вашей компании

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    import { initializeB24Frame } from '@bitrix24/b24jssdk'

    const $b24 = await initializeB24Frame()

    const response = await $b24.actions.v2.call.make({
        method: 'bizproc.activity.add',
        params: {
            CODE: 'create_smart_invoice',
            HANDLER: 'https://your-domain.example/bp-handler',
            AUTH_USER_ID: 1,
            NAME: 'Создать смарт-счет',
            DESCRIPTION: 'Создает смарт-счет по данным лида или сделки',
            PROPERTIES: {
                invoice_title: {
                    Name: 'Название счета',
                    Type: 'string',
                    Required: 'Y',
                    Default: 'Счет по документу CRM',
                },
                mycompany_id: {
                    Name: 'Идентификатор вашей компании',
                    Type: 'int',
                    Required: 'Y',
                    Default: '1',
                },
            },
            FILTER: {
                INCLUDE: [
                    ['crm', 'CCrmDocumentDeal'],
                    ['crm', 'CCrmDocumentLead'],
                ],
            },
        },
        requestId: 'bizproc-activity-add',
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }

    console.info(response.getData().result) // true
    ```

- Python

    ```python
    # pip install b24pysdk flask
    # Код выполняется в обработчике ONAPPINSTALL после проверки запроса установки
    # и сохранения application_token. make_client и form_group — из шага 2
    from flask import request

    auth = form_group(request.form, "auth")
    client, token = make_client(auth)

    result = client.bizproc.activity.add(
        code="create_smart_invoice",
        handler="https://your-domain.example/bp-handler",
        auth_user_id=1,
        name="Создать смарт-счет",
        description="Создает смарт-счет по данным лида или сделки",
        properties={
            "invoice_title": {
                "Name": "Название счета",
                "Type": "string",
                "Required": "Y",
                "Default": "Счет по документу CRM",
            },
            "mycompany_id": {
                "Name": "Идентификатор вашей компании",
                "Type": "int",
                "Required": "Y",
                "Default": "1",
            },
        },
        filter={
            "INCLUDE": [
                ["crm", "CCrmDocumentDeal"],
                ["crm", "CCrmDocumentLead"],
            ],
        },
    ).response.result

    print(result)  # True
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    // Код выполняется в обработчике ONAPPINSTALL после проверки запроса установки и сохранения application_token.
    // Регистрация действия идет через REST 2, поэтому нужен клиент SDK
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Core\Credentials\ApplicationProfile;
    use Bitrix24\SDK\Core\Credentials\AuthToken;
    use Bitrix24\SDK\Core\Credentials\DefaultOAuthServerUrl;
    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Psr\Log\NullLogger;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Symfony\Component\HttpFoundation\Request;

    $request = Request::createFromGlobals();
    $appProfile = ApplicationProfile::initFromArray([
        'BITRIX24_PHP_SDK_APPLICATION_CLIENT_ID' => getenv('B24_CLIENT_ID'),
        'BITRIX24_PHP_SDK_APPLICATION_CLIENT_SECRET' => getenv('B24_CLIENT_SECRET'),
        'BITRIX24_PHP_SDK_APPLICATION_SCOPE' => 'bizproc,crm',
    ]);
    $b24 = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))->init(
        $appProfile,
        AuthToken::initFromEventRequest($request),
        (string)$request->request->all('auth')['domain'],
        DefaultOAuthServerUrl::default()
    );

    // Типизированный метод activity()->add принимает расширенные DTO,
    // поэтому для короткого примера используем прямой вызов через ядро SDK.
    $response = $b24->core->call('bizproc.activity.add', [
        'CODE' => 'create_smart_invoice',
        'HANDLER' => 'https://your-domain.example/bp-handler',
        'AUTH_USER_ID' => 1,
        'NAME' => 'Создать смарт-счет',
        'DESCRIPTION' => 'Создает смарт-счет по данным лида или сделки',
        'PROPERTIES' => [
            'invoice_title' => [
                'Name' => 'Название счета',
                'Type' => 'string',
                'Required' => 'Y',
                'Default' => 'Счет по документу CRM',
            ],
            'mycompany_id' => [
                'Name' => 'Идентификатор вашей компании',
                'Type' => 'int',
                'Required' => 'Y',
                'Default' => '1',
            ],
        ],
        'FILTER' => [
            'INCLUDE' => [
                ['crm', 'CCrmDocumentDeal'],
                ['crm', 'CCrmDocumentLead'],
            ],
        ],
    ]);

    print_r($response->getResponseData()->getResult()[0]); // true: SDK возвращает скалярный result массивом
    ```
{% endlist %}

Если нужно добавить робота для CRM-автоматизации, замените метод `bizproc.activity.add` на [bizproc.robot.add](../../api-reference/bizproc/bizproc-robot/bizproc-robot-add.md). Параметры `CODE`, `HANDLER`, `AUTH_USER_ID`, `NAME`, `DESCRIPTION`, `PROPERTIES` и `FILTER` используются так же.

Пример успешного ответа:

```json
{
    "result": true
}
```

После регистрации действие появится в дизайнере бизнес-процессов для лидов и сделок. Когда процесс дойдет до действия, Битрикс24 отправит запрос на `HANDLER`.

## 2. Разберите данные обработчика

Битрикс24 отправляет запрос на `HANDLER` методом POST в формате `application/x-www-form-urlencoded`. В запросе приходят параметры действия в `properties`, идентификаторы документа в `document_id` и авторизация в `auth`. Для лида `document_id` содержит строку вида `LEAD_456`, для сделки — `DEAL_123`.

Код шагов 2–4 оформлен функциями. В разделе [Соберите обработчик](#handler) они вызываются по порядку внутри одного обработчика запроса.

### Создайте клиент

По полям `auth` создайте клиент для вызовов CRM-методов в шагах 3 и 4 через [REST 3.0](../../api-reference/rest-v3.md#call), адрес `/rest/api/`. Регистрация действия остается в REST 2. В JS CRM вызывается через `actions.v3.call.make`. В PHP пример отправляет HTTP-запрос на `/rest/api/` напрямую, с OAuth-токеном в поле `auth` тела JSON. `client_id` и `client_secret` приложения храните в переменных окружения сервера, а не в коде.

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    import { B24OAuth } from '@bitrix24/b24jssdk'

    const APP = { clientId: process.env.B24_CLIENT_ID, clientSecret: process.env.B24_CLIENT_SECRET }

    function makeClient(auth) {
        const $b24 = new B24OAuth({
            applicationToken: auth.application_token,
            userId: Number(auth.user_id),
            memberId: auth.member_id,
            accessToken: auth.access_token,
            refreshToken: auth.refresh_token,
            expires: Number(auth.expires),
            expiresIn: Number(auth.expires_in),
            scope: auth.scope,
            domain: auth.domain,
            clientEndpoint: auth.client_endpoint,
            serverEndpoint: auth.server_endpoint,
            status: auth.status,
        }, APP)
        $b24.offClientSideWarning()
        return $b24
    }
    ```

- Python

    ```python
    # pip install b24pysdk
    import os
    from b24pysdk import BitrixApp, BitrixToken, Client, Config

    V3_METHODS = {
        "crm.lead.get", "crm.deal.get", "crm.smartinvoice.add",
        "crm.lead.productrow.list", "crm.deal.productrow.list",
        "crm.smartinvoice.productrow.replace",
    }

    APP = BitrixApp(
        client_id=os.environ["B24_CLIENT_ID"],
        client_secret=os.environ["B24_CLIENT_SECRET"],
    )

    def make_client(auth: dict) -> tuple[Client, BitrixToken]:
        # Настройки b24pysdk хранятся отдельно для каждого потока,
        # поэтому методы REST 3.0 подключаем в потоке запроса
        Config().configure(api_v3_methods=Config().api_v3_methods | V3_METHODS)
        token = BitrixToken(
            domain=auth["domain"],
            auth_token=auth["access_token"],
            refresh_token=auth.get("refresh_token", ""),
            bitrix_app=APP,
        )
        return Client(token), token

    def form_group(form, name: str) -> dict:
        """Собирает поля формы вида name[key] в словарь"""
        prefix = f"{name}["
        return {k[len(prefix):-1]: v for k, v in form.items() if k.startswith(prefix)}
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Symfony\Component\HttpFoundation\Request;

    function makeClient(Request $request): Closure
    {
        $auth = $request->request->all('auth');
        return static function (string $method, array $params) use ($auth): array {
            $curl = curl_init('https://' . $auth['domain'] . '/rest/api/' . $method);
            curl_setopt_array($curl, [
                CURLOPT_POST => true,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
                CURLOPT_POSTFIELDS => json_encode($params + ['auth' => $auth['access_token']], JSON_THROW_ON_ERROR),
            ]);
            $body = curl_exec($curl);
            $error = curl_error($curl);
            curl_close($curl);
            if ($body === false) {
                throw new RuntimeException($error);
            }
            $data = json_decode($body, true, 512, JSON_THROW_ON_ERROR);
            if (isset($data['error'])) {
                throw new RuntimeException($data['error']['message']);
            }
            return $data['result'];
        };
    }
    ```

{% endlist %}

### Определите исходный объект

Из `document_id` получите:

- сегмент типа для имени метода: `lead` для лида или `deal` для сделки
- числовой идентификатор исходного CRM-объекта. Если он не положительное целое число, функция останавливает обработку

{% list tabs %}

- JS

    ```js
    function parseDocumentId(documentId) {
        const values = Array.isArray(documentId) ? documentId : [documentId]
        const types = { DEAL_: 'deal', LEAD_: 'lead' }

        for (const value of values.map(String)) {
            for (const [prefix, type] of Object.entries(types)) {
                const id = Number(value.slice(prefix.length))
                if (value.startsWith(prefix) && Number.isInteger(id) && id > 0) {
                    return { type, id }
                }
            }
        }

        throw new Error('Действие запущено не из лида и не из сделки')
    }
    ```

- Python

    ```python
    def parse_document_id(document_id: list[str]) -> dict:
        types = {"DEAL_": "deal", "LEAD_": "lead"}

        for value in document_id:
            for prefix, entity_type in types.items():
                suffix = value[len(prefix):]
                if value.startswith(prefix) and suffix.isdigit() and int(suffix) > 0:
                    return {"type": entity_type, "id": int(suffix)}

        raise ValueError("Действие запущено не из лида и не из сделки")
    ```

- PHP

    ```php
    <?php
    function parseDocumentId(array $documentId): array
    {
        $types = ['DEAL_' => 'deal', 'LEAD_' => 'lead'];

        foreach ($documentId as $value) {
            foreach ($types as $prefix => $type) {
                $suffix = substr((string)$value, strlen($prefix));
                if (str_starts_with((string)$value, $prefix) && ctype_digit($suffix) && (int)$suffix > 0) {
                    return ['type' => $type, 'id' => (int)$suffix];
                }
            }
        }

        throw new RuntimeException('Действие запущено не из лида и не из сделки');
    }
    ```

{% endlist %}

## 3. Получите CRM-объект и товары

Вызовите [crm.lead.get / crm.deal.get](../../api-reference/crm/rest-v3/items/crm-entity-get-rest-v3.md), передайте `id` из `document_id`. В `select` укажите `companyId`, `contactsId`, `currencyId`: без `select` метод вернет только `id`.

Товары получите методом [crm.lead.productrow.list / crm.deal.productrow.list](../../api-reference/crm/rest-v3/product-rows/crm-entity-product-row-list-rest-v3.md). Фильтр — массив условий `[["ownerId", "=", id]]`, тип задает имя метода. Явно запросите поля позиций. Собирайте страницы через `pagination.page`, начиная с `1`, пока не придет меньше `pagination.limit` позиций. Общего количества и `next` в ответе нет.

{% list tabs %}

- JS

    ```js
    async function callMethod($b24, method, params) {
        const response = await $b24.actions.v3.call.make({ method, params, requestId: method })
        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }
        return response.getData().result
    }

    async function loadSource($b24, source) {
        const { item } = await callMethod($b24, `crm.${source.type}.get`, {
            id: source.id,
            select: ['companyId', 'contactsId', 'currencyId'],
        })
        const sourceRows = []
        for (let page = 1; ; page++) {
            const { items } = await callMethod($b24, `crm.${source.type}.productrow.list`, {
                filter: [['ownerId', '=', source.id]],
                select: ['productId', 'productName', 'price', 'quantity', 'discountTypeId',
                    'discountRate', 'discountSum', 'taxRate', 'taxIncluded', 'measureCode', 'sort'],
                order: { sort: 'asc', id: 'asc' },
                pagination: { limit: 50, page },
            })
            sourceRows.push(...items)
            if (items.length < 50) break
        }
        return { sourceItem: item, sourceRows }
    }
    ```

- Python

    ```python
    def load_source(token, source: dict) -> tuple[dict, list[dict]]:
        source_item = token.call_method(f"crm.{source['type']}.get", {
            "id": source["id"],
            "select": ["companyId", "contactsId", "currencyId"],
        }, prefer_version=3)["result"]["item"]
        source_rows = []
        page = 1
        while True:
            items = token.call_method(f"crm.{source['type']}.productrow.list", {
                "filter": [["ownerId", "=", source["id"]]],
                "select": ["productId", "productName", "price", "quantity", "discountTypeId",
                           "discountRate", "discountSum", "taxRate", "taxIncluded", "measureCode", "sort"],
                "order": {"sort": "asc", "id": "asc"},
                "pagination": {"limit": 50, "page": page},
            }, prefer_version=3)["result"]["items"]
            source_rows.extend(items)
            if len(items) < 50:
                break
            page += 1
        return source_item, source_rows
    ```

- PHP

    ```php
    <?php
    function loadSource($b24, array $source): array
    {
        $sourceItem = $b24('crm.' . $source['type'] . '.get', [
            'id' => $source['id'],
            'select' => ['companyId', 'contactsId', 'currencyId'],
        ])['item'];
        $sourceRows = [];
        $page = 1;
        do {
            $items = $b24('crm.' . $source['type'] . '.productrow.list', [
                'filter' => [['ownerId', '=', $source['id']]],
                'select' => ['productId', 'productName', 'price', 'quantity', 'discountTypeId',
                    'discountRate', 'discountSum', 'taxRate', 'taxIncluded', 'measureCode', 'sort'],
                'order' => ['sort' => 'asc', 'id' => 'asc'],
                'pagination' => ['limit' => 50, 'page' => $page++],
            ])['items'];
            $sourceRows = array_merge($sourceRows, $items);
        } while (count($items) === 50);
        return [$sourceItem, $sourceRows];
    }
    ```

{% endlist %}

В сокращенном ответе `get` поля клиента и валюты лежат в `result.item`. Сохраните их для создания счета. Товары из `result.items` подготовьте для переноса. Ниже сокращены живые ответы, идентификаторы заменены.

```json
{"result":{"item":{"companyId":null,"contactsId":[],"currencyId":"RUB"}}}
```

Сокращенный ответ страницы товаров при `select: ["productName", "price", "quantity"]`:

```json
{"result":{"items":[{"productName":"Товар A","price":100,"quantity":2},{"productName":"Товар B","price":250,"quantity":1}]}}
```

## 4. Создайте смарт-счет и перенесите товары

Создайте смарт-счет методом [crm.smartinvoice.add](../../api-reference/crm/rest-v3/items/crm-entity-add-rest-v3.md). Тип уже задан именем метода.

В `fields` передайте:

- `title` — название смарт-счета из параметра действия `invoice_title`
- `companyId` — идентификатор компании из исходного CRM-объекта
- `contactsId` — массив идентификаторов контактов из исходного CRM-объекта; `contactId` доступен только для чтения
- `currencyId` — валюта исходного CRM-объекта, чтобы цены товаров остались в той же валюте
- `myCompanyId` — идентификатор вашей компании из параметра действия `mycompany_id`. Если он не положительное целое число, функция останавливает обработку до создания смарт-счета
- `relatedDealId` — идентификатор сделки, если действие запущено из сделки

Затем передайте товарные позиции в созданный смарт-счет методом [crm.smartinvoice.productrow.replace](../../api-reference/crm/rest-v3/product-rows/crm-entity-product-row-replace-rest-v3.md). В `ownerId` передайте `result.id` из ответа создания, в `items` — полный набор позиций. Метод заменяет весь набор: пустой `items` удалит все товары. За один вызов можно передать не больше 1000 позиций.

{% list tabs %}

- JS

    ```js
    function prepareProductRows(rows) {
        return rows.map((row, index) => ({
            productId: row.productId,
            productName: row.productName,
            price: row.price,
            quantity: row.quantity,
            discountTypeId: row.discountTypeId,
            discountRate: row.discountRate,
            discountSum: row.discountSum,
            taxRate: row.taxRate,
            taxIncluded: row.taxIncluded,
            measureCode: row.measureCode,
            sort: row.sort || (index + 1) * 10,
        }))
    }

    async function createInvoice($b24, source, properties, sourceItem, sourceRows) {
        const myCompanyId = Number(properties.mycompany_id)
        if (!Number.isInteger(myCompanyId) || myCompanyId <= 0) {
            throw new Error('Параметр mycompany_id должен быть положительным целым числом')
        }

        if (sourceRows.length > 1000) throw new Error('В счете может быть не больше 1000 позиций')

        const fields = {
            title: properties.invoice_title || 'Счет по документу CRM',
            companyId: sourceItem.companyId || null,
            contactsId: sourceItem.contactsId || [],
            myCompanyId,
        }

        if (sourceItem.currencyId) {
            fields.currencyId = sourceItem.currencyId
        }

        if (source.type === 'deal') {
            fields.relatedDealId = source.id
        }

        const invoiceResult = await callMethod($b24, 'crm.smartinvoice.add', {
            fields,
        })
        const invoiceId = invoiceResult.id
        console.info(`Создан смарт-счет ${invoiceId}`)

        if (sourceRows.length > 0) {
            await callMethod($b24, 'crm.smartinvoice.productrow.replace', {
                ownerId: invoiceId,
                items: prepareProductRows(sourceRows),
                select: ['id'],
            })
        }

        return invoiceId
    }
    ```

- Python

    ```python
    def prepare_product_rows(rows: list[dict]) -> list[dict]:
        return [
            {
                "productId": row.get("productId"),
                "productName": row.get("productName"),
                "price": row.get("price"),
                "quantity": row.get("quantity", 1),
                "discountTypeId": row.get("discountTypeId"),
                "discountRate": row.get("discountRate"),
                "discountSum": row.get("discountSum"),
                "taxRate": row.get("taxRate"),
                "taxIncluded": row.get("taxIncluded"),
                "measureCode": row.get("measureCode"),
                "sort": row.get("sort", (index + 1) * 10),
            }
            for index, row in enumerate(rows)
        ]

    def create_invoice(token, source: dict, properties: dict, source_item: dict, source_rows: list[dict]) -> int:
        mycompany_id = str(properties.get("mycompany_id", ""))
        if not mycompany_id.isdigit() or int(mycompany_id) <= 0:
            raise ValueError("Параметр mycompany_id должен быть положительным целым числом")

        if len(source_rows) > 1000:
            raise ValueError("В счете может быть не больше 1000 позиций")

        fields = {
            "title": properties.get("invoice_title", "Счет по документу CRM"),
            "companyId": source_item.get("companyId"),
            "contactsId": source_item.get("contactsId") or [],
            "myCompanyId": int(mycompany_id),
        }

        if source_item.get("currencyId"):
            fields["currencyId"] = source_item["currencyId"]

        if source["type"] == "deal":
            fields["relatedDealId"] = source["id"]

        invoice = token.call_method("crm.smartinvoice.add", {
            "fields": fields,
        }, prefer_version=3)["result"]
        print(f"Создан смарт-счет {invoice['id']}")

        if source_rows:
            token.call_method("crm.smartinvoice.productrow.replace", {
                "ownerId": invoice["id"],
                "items": prepare_product_rows(source_rows),
                "select": ["id"],
            }, prefer_version=3)

        return invoice["id"]
    ```

- PHP

    ```php
    <?php
    function prepareProductRows(array $rows): array
    {
        $preparedRows = [];

        foreach (array_values($rows) as $index => $row) {
            $preparedRows[] = [
                'productId' => $row['productId'] ?? null,
                'productName' => $row['productName'] ?? null,
                'price' => $row['price'] ?? null,
                'quantity' => $row['quantity'] ?? 1,
                'discountTypeId' => $row['discountTypeId'] ?? null,
                'discountRate' => $row['discountRate'] ?? null,
                'discountSum' => $row['discountSum'] ?? null,
                'taxRate' => $row['taxRate'] ?? null,
                'taxIncluded' => $row['taxIncluded'] ?? null,
                'measureCode' => $row['measureCode'] ?? null,
                'sort' => $row['sort'] ?? (($index + 1) * 10),
            ];
        }

        return $preparedRows;
    }

    function createInvoice($b24, array $source, array $properties, array $sourceItem, array $sourceRows): int
    {
        $myCompanyId = (string)($properties['mycompany_id'] ?? '');
        if (!ctype_digit($myCompanyId) || (int)$myCompanyId <= 0) {
            throw new InvalidArgumentException('Параметр mycompany_id должен быть положительным целым числом');
        }

        if (count($sourceRows) > 1000) {
            throw new InvalidArgumentException('В счете может быть не больше 1000 позиций');
        }

        $fields = [
            'title' => $properties['invoice_title'] ?? 'Счет по документу CRM',
            'companyId' => $sourceItem['companyId'] ?? null,
            'contactsId' => $sourceItem['contactsId'] ?? [],
            'myCompanyId' => (int)$myCompanyId,
        ];

        if (!empty($sourceItem['currencyId'])) {
            $fields['currencyId'] = $sourceItem['currencyId'];
        }

        if ($source['type'] === 'deal') {
            $fields['relatedDealId'] = $source['id'];
        }

        $invoice = $b24('crm.smartinvoice.add', ['fields' => $fields]);
        error_log('Создан смарт-счет ' . $invoice['id']);

        if ($sourceRows !== []) {
            $b24('crm.smartinvoice.productrow.replace', [
                'ownerId' => $invoice['id'],
                'items' => prepareProductRows($sourceRows),
                'select' => ['id'],
            ]);
        }

        return (int)$invoice['id'];
    }
    ```

{% endlist %}

Сокращенный ответ `crm.smartinvoice.add`: сохраните `result.id` для переноса товаров.

```json
{"result":{"id":128}}
```

Ответ `crm.smartinvoice.productrow.replace` при `select: ["id"]` содержит актуальные идентификаторы позиций в `result.items`:

```json
{"result":{"items":[{"id":201},{"id":202}]}}
```

## Соберите обработчик {#handler}

Обработчик вызывает функции шагов 2–4 по порядку. Адрес `HANDLER` публичный, поэтому сначала обработчик сверяет `auth[application_token]` со значением, которое приложение сохранило из события [ONAPPINSTALL](../../api-reference/common/events/on-app-install.md), и при несовпадении отвечает `403` без вызовов CRM. Сохраненное значение возвращает функция `getSavedAppToken` в JS и PHP и `get_saved_app_token` в Python — реализуйте ее на своем хранилище. Функция получает домен Битрикс24 и возвращает сохраненный для него `application_token`, а если записи нет — пустую строку. Токен не выводите в журнал. Разместите обработчик по адресу `HANDLER` до запуска бизнес-процесса.

{% list tabs %}

- JS

    ```js
    // npm install express
    import { timingSafeEqual } from 'node:crypto'
    import express from 'express'

    const app = express()
    app.use(express.urlencoded({ extended: true }))

    const sameToken = (a = '', b = '') => {
        const left = Buffer.from(String(a))
        const right = Buffer.from(String(b))
        return left.length > 0 && left.length === right.length && timingSafeEqual(left, right)
    }

    app.post('/bp-handler', async (req, res) => {
        const auth = req.body.auth || {}
        if (!sameToken(auth.application_token, await getSavedAppToken(auth.domain))) {
            return res.sendStatus(403)
        }

        res.sendStatus(200) // Битрикс24 не ждет результата действия

        try {
            const $b24 = makeClient(auth)
            const source = parseDocumentId(req.body.document_id)
            const properties = req.body.properties || {}
            const { sourceItem, sourceRows } = await loadSource($b24, source)
            await createInvoice($b24, source, properties, sourceItem, sourceRows)
        } catch (error) {
            console.error('Ошибка обработчика:', error.message)
        }
    })

    app.listen(3000)
    ```

- Python

    ```python
    # pip install flask
    import hmac
    from flask import Flask, request

    app = Flask(__name__)

    @app.post("/bp-handler")
    def bp_handler():
        form = request.form
        saved = get_saved_app_token(form.get("auth[domain]", ""))
        if not saved or not hmac.compare_digest(form.get("auth[application_token]", ""), saved):
            return "", 403

        try:
            client, token = make_client(form_group(form, "auth"))
            source = parse_document_id(list(form_group(form, "document_id").values()))
            properties = form_group(form, "properties")
            source_item, source_rows = load_source(token, source)
            create_invoice(token, source, properties, source_item, source_rows)
        except Exception as error:
            app.logger.error("Ошибка обработчика: %s", error)

        return "", 200
    ```

- PHP

    ```php
    <?php
    // bp-handler.php
    // Функции шагов 2–4 и getSavedAppToken сохраните в файле bp-functions.php с одним открывающим тегом <?php
    require_once __DIR__ . '/vendor/autoload.php';
    require_once __DIR__ . '/bp-functions.php';

    $request = Symfony\Component\HttpFoundation\Request::createFromGlobals();
    $auth = $request->request->all('auth');

    $saved = getSavedAppToken($auth['domain'] ?? '');
    if ($saved === '' || !hash_equals($saved, (string)($auth['application_token'] ?? ''))) {
        http_response_code(403);
        exit;
    }

    try {
        $b24 = makeClient($request);
        $source = parseDocumentId($request->request->all('document_id'));
        $properties = $request->request->all('properties');
        [$sourceItem, $sourceRows] = loadSource($b24, $source);
        createInvoice($b24, $source, $properties, $sourceItem, $sourceRows);
    } catch (Throwable $e) {
        error_log('Ошибка обработчика: ' . $e->getMessage());
    }

    http_response_code(200);
    ```

{% endlist %}

## Проверим результат

1. Разместите обработчик из раздела [Соберите обработчик](#handler) по адресу `HANDLER`
2. Откройте дизайнер бизнес-процессов для лидов или сделок, добавьте действие *Создать смарт-счет* в шаблон, заполните параметры *Название счета* и *Идентификатор вашей компании* и сохраните шаблон
3. Запустите бизнес-процесс для лида или сделки с товарами

Откройте карточку смарт-счета. В ней должны быть заполнены название, клиент, ваша компания, валюта и товары из исходного лида или сделки.

Через REST 3.0 проверьте счет методом [crm.smartinvoice.get](../../api-reference/crm/rest-v3/items/crm-entity-get-rest-v3.md): передайте `id` из журнала *Создан смарт-счет …* и `select: ["title", "companyId", "contactsId", "myCompanyId", "currencyId", "relatedDealId"]`. Для сделки `relatedDealId` должен совпасть с исходным `id`. Товары проверьте методом [crm.smartinvoice.productrow.list](../../api-reference/crm/rest-v3/product-rows/crm-entity-product-row-list-rest-v3.md) с `filter: [["ownerId", "=", id]]` и `select: ["productName", "price", "quantity"]`.

## Диагностика ошибок

Если метод вернул ошибку, проверьте данные запроса.

- `ACCESS_DENIED`, `Access denied! Application context required` — действие или робот регистрируется не из приложения. Установите приложение и вызовите метод в его контексте
- `ACCESS_DENIED`, `Access denied!` — регистрацию выполняет не администратор
- `ERROR_ACTIVITY_VALIDATION_FAILURE`, `Wrong property key (...)!` или `Empty property NAME (...)!` — ключ параметра в `PROPERTIES` должен начинаться с латинской буквы и содержать только латинские буквы, цифры и символ подчеркивания, а у параметра должно быть заполнено `Name`. `Wrong properties array!` означает, что `PROPERTIES` передан не объектом
- `ERROR_ACTIVITY_VALIDATION_FAILURE`, `Wrong activity FILTER!` — `FILTER` передан не объектом. Передайте объект с ключом `INCLUDE`, как в шаге 1
- `ERROR_ACTIVITY_ALREADY_INSTALLED`, `Activity or Robot already installed!` — действие с таким `CODE` уже зарегистрировано приложением. Измените `CODE` или обновите действие методом [bizproc.activity.update](../../api-reference/bizproc/bizproc-activity/bizproc-activity-update.md)
- `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION` при вызове CRM-методов — у пользователя, от имени которого запускается действие, нет прав на чтение исходного CRM-объекта, создание смарт-счета или изменение товарных позиций счета
- `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION` — объект не найден. Проверьте `id` исходного объекта или `ownerId` счета
- ошибка валидации REST 3.0 — проверьте имена полей в `select` и `fields`, положительный `myCompanyId`, массив условий `filter` и объект `pagination`
- пустой `result.items` — в исходном лиде или сделке нет товарных позиций, смарт-счет будет создан без товаров
- обработчик ответил `200`, а счета нет — ответ `200` не подтверждает создание счета: Битрикс24 не ждет результата. Проверьте журнал обработчика. Сообщение *Создан смарт-счет* подтверждает только создание счета и содержит его идентификатор. Если после него есть *Ошибка обработчика*, сбой произошел при переносе товаров — проверьте товарные позиции счета отдельно
- обработчик ответил `403` — для домена из запроса не найден сохраненный `application_token` этого приложения или он не совпадает. Проверьте хранилище и повторите запуск процесса
- обработчик не получил запрос — проверьте, что действие добавлено в шаблон, бизнес-процесс дошел до него, а `HANDLER` доступен из интернета по HTTPS

После исправления ошибки регистрации повторите шаг 1. После исправления обработчика заново запустите бизнес-процесс для лида или сделки. Если счет создан, а товары не перенесены, не запускайте процесс повторно: он создаст второй счет. Исправьте причину и повторите `crm.smartinvoice.productrow.replace` для уже созданного счета — его идентификатор обработчик выводит сразу после `crm.smartinvoice.add`. Метод заменяет весь набор позиций счета, поэтому передайте полный список товаров, а не только недостающие.

## Что важно учитывать

- Для лида сценарий переносит в смарт-счет клиента и товары, но не связывает счет с исходным лидом
- Повторный запуск действия создаст новый смарт-счет. Если дубликаты недопустимы, храните связь между CRM-объектом и созданным счетом в поле CRM или во внешней системе
- `AUTH_USER_ID` задает пользователя по умолчанию в поле *Запускать от имени* в настройках действия. Битрикс24 передает обработчику токен пользователя из этого поля, а если поле пустое — токен пользователя `AUTH_USER_ID`. У этого пользователя должны быть права на чтение исходного CRM-объекта, создание смарт-счета и изменение его товарных позиций
- Параметр `FILTER` ограничивает доступность действия в дизайнере, но не заменяет проверку прав пользователя в CRM
- Действие зарегистрировано без `USE_SUBSCRIPTION`, поэтому по умолчанию не ждет ответа обработчика: бизнес-процесс переходит к следующему действию после постановки запроса в очередь. Ожидание можно включить в настройках действия, полем *Ожидать ответа*. Если следующим действиям нужен идентификатор счета, зарегистрируйте действие с `USE_SUBSCRIPTION: 'Y'` и `RETURN_PROPERTIES` и верните значение методом [bizproc.event.send](../../api-reference/bizproc/bizproc-robot/bizproc-event-send.md)

## Продолжите изучение

- [Добавить новое действие bizproc.activity.add](../../api-reference/bizproc/bizproc-activity/bizproc-activity-add.md)
- [Зарегистрировать нового робота bizproc.robot.add](../../api-reference/bizproc/bizproc-robot/bizproc-robot-add.md)
- [Получить лид или сделку в REST 3.0](../../api-reference/crm/rest-v3/items/crm-entity-get-rest-v3.md)
- [Создать смарт-счет в REST 3.0](../../api-reference/crm/rest-v3/items/crm-entity-add-rest-v3.md)
- [Получить товарные позиции в REST 3.0](../../api-reference/crm/rest-v3/product-rows/crm-entity-product-row-list-rest-v3.md)
- [Заменить товарные позиции в REST 3.0](../../api-reference/crm/rest-v3/product-rows/crm-entity-product-row-replace-rest-v3.md)
