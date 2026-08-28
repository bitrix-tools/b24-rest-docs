# Как создать свое действие для бизнес-процесса

> Scope: [`bizproc`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужен администратор Битрикс24
>
> - [bizproc.activity.add](../../api-reference/bizproc/bizproc-activity/bizproc-activity-add.md) — администратор
> - [bizproc.event.send](../../api-reference/bizproc/bizproc-robot/bizproc-event-send.md) — любой пользователь с актуальным `EVENT_TOKEN`

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Действие приложения добавляет в дизайнер бизнес-процессов свой шаг. Когда процесс доходит до этого шага, Битрикс24 вызывает обработчик приложения, передает ему входные параметры и может ждать результат. Результат возвращается методом [bizproc.event.send](../../api-reference/bizproc/bizproc-robot/bizproc-event-send.md) и становится доступен в следующих действиях процесса.

Сценарий показывает, как создать действие `MD5 генератор`. Оно получает строку из документа, считает MD5-хеш и возвращает его в бизнес-процесс как дополнительный результат `outputString`.

Сценарий состоит из трех шагов.

1. Зарегистрируйте действие методом [bizproc.activity.add](../../api-reference/bizproc/bizproc-activity/bizproc-activity-add.md)
2. Добавьте действие в шаблон бизнес-процесса и запустите процесс
3. Верните результат из обработчика методом [bizproc.event.send](../../api-reference/bizproc/bizproc-robot/bizproc-event-send.md)

## Что нужно до начала

Метод `bizproc.activity.add` работает только в контексте [приложения](../../settings/app-installation/index.md). Входящий вебхук не подойдет: метод вернет ошибку `ACCESS_DENIED` с описанием `Application context required`.

Перед началом подготовьте:

- установленное приложение со scope `bizproc`
- публичный HTTPS-адрес обработчика, например `https://your-domain.example/bp-md5-handler`
- идентификатор администратора для параметра `AUTH_USER_ID`
- шаблон бизнес-процесса, в который вы добавите действие после регистрации
- переменные окружения `B24_CLIENT_ID` и `B24_CLIENT_SECRET` с идентификатором и секретом приложения

`AUTH_USER_ID` определяет пользователя, чью авторизацию Битрикс24 передаст обработчику. Обработчик получит объект `auth` с `domain`, `access_token` и `refresh_token`. Эти значения нужны, чтобы вызвать `bizproc.event.send`.

Не храните секрет приложения в исходном коде. Передавайте его через переменные окружения или хранилище секретов на сервере приложения.

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Инициализируйте SDK в обработчике

Обработчик получает авторизацию в запросе от Битрикс24. Используйте `auth`, чтобы создать клиент SDK для вызова метода `bizproc.event.send`.

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk express
    import express from 'express'
    import crypto from 'node:crypto'
    import { B24OAuth } from '@bitrix24/b24jssdk'

    const APP = {
        clientId: process.env.B24_CLIENT_ID,
        clientSecret: process.env.B24_CLIENT_SECRET,
    }
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

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
    $appProfile = ApplicationProfile::initFromArray([
        'BITRIX24_PHP_SDK_APPLICATION_CLIENT_ID' => getenv('B24_CLIENT_ID'),
        'BITRIX24_PHP_SDK_APPLICATION_CLIENT_SECRET' => getenv('B24_CLIENT_SECRET'),
        'BITRIX24_PHP_SDK_APPLICATION_SCOPE' => 'bizproc',
    ]);

    $authToken = AuthToken::initFromEventRequest($request);
    $domain = (string)$request->request->all('auth')['domain'];

    $log = new Logger('bizproc');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $b24 = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->init($appProfile, $authToken, $domain, DefaultOAuthServerUrl::default());
    ```

- Python

    ```python
    # pip install b24pysdk flask
    import hashlib
    import os
    from flask import Flask, request
    from b24pysdk import BitrixApp, BitrixToken, Client

    APP = BitrixApp(
        client_id=os.environ["B24_CLIENT_ID"],
        client_secret=os.environ["B24_CLIENT_SECRET"],
    )
    app = Flask(__name__)

    def get_payload() -> dict:
        json_payload = request.get_json(silent=True)
        if json_payload:
            return json_payload

        form = request.form
        return {
            "event_token": form["event_token"],
            "auth": {
                "domain": form["auth[domain]"],
                "access_token": form["auth[access_token]"],
                "refresh_token": form.get("auth[refresh_token]", ""),
            },
            "properties": {
                "inputString": form.get("properties[inputString]", ""),
            },
        }

    def make_client(auth: dict) -> tuple[Client, BitrixToken]:
        token = BitrixToken(
            domain=auth["domain"],
            auth_token=auth["access_token"],
            refresh_token=auth.get("refresh_token", ""),
            bitrix_app=APP,
        )
        return Client(token), token
    ```

{% endlist %}

## 1. Зарегистрируйте действие

Метод [bizproc.activity.add](../../api-reference/bizproc/bizproc-activity/bizproc-activity-add.md) добавляет новое действие для использования в бизнес-процессах. Передайте в `CODE` уникальный код действия в рамках приложения. В `HANDLER` укажите публичный URL, на который Битрикс24 отправит данные при выполнении действия.

Примеры регистрации запускайте в установленном приложении со scope `bizproc`. В JS пример выполняется в iframe приложения. В PHP и Python переменные `$b24` и `client` должны быть созданы на токене установленного приложения.

Чтобы обработчик мог вернуть результат в бизнес-процесс, задайте:

- `USE_SUBSCRIPTION: 'Y'` — действие будет ждать ответ приложения
- `RETURN_PROPERTIES` — список результатов, которые обработчик сможет вернуть в `RETURN_VALUES` метода `bizproc.event.send`

В примере действие получает параметр `inputString` и возвращает результат `outputString`.

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    import { initializeB24Frame } from '@bitrix24/b24jssdk'

    const $b24 = await initializeB24Frame()

    const response = await $b24.actions.v2.call.make({
        method: 'bizproc.activity.add',
        params: {
            CODE: 'md5_action',
            HANDLER: 'https://your-domain.example/bp-md5-handler',
            AUTH_USER_ID: 1,
            USE_SUBSCRIPTION: 'Y',
            NAME: {
                ru: 'MD5 генератор',
                en: 'MD5 generator',
            },
            DESCRIPTION: {
                ru: 'Действие возвращает MD5-хеш от входящего параметра',
                en: 'Activity returns MD5 hash of input parameter',
            },
            PROPERTIES: {
                inputString: {
                    Name: {
                        ru: 'Входящая строка',
                        en: 'Input string',
                    },
                    Description: {
                        ru: 'Введите строку для хеширования',
                        en: 'Input string for hashing',
                    },
                    Type: 'string',
                    Required: 'Y',
                    Multiple: 'N',
                    Default: '{=Document:NAME}',
                },
            },
            RETURN_PROPERTIES: {
                outputString: {
                    Name: {
                        ru: 'MD5',
                        en: 'MD5',
                    },
                    Type: 'string',
                    Multiple: 'N',
                    Default: null,
                },
            },
        },
        requestId: 'bizproc-activity-add',
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }

    console.info(response.getData().result) // true
    ```

- PHP

    ```php
    <?php
    // $b24 построен на токене установленного приложения.
    // Типизированный метод activity()->add принимает расширенные DTO,
    // поэтому для короткого примера используем прямой вызов через ядро SDK.
    $response = $b24->core->call('bizproc.activity.add', [
        'CODE' => 'md5_action',
        'HANDLER' => 'https://your-domain.example/bp-md5-handler',
        'AUTH_USER_ID' => 1,
        'USE_SUBSCRIPTION' => 'Y',
        'NAME' => [
            'ru' => 'MD5 генератор',
            'en' => 'MD5 generator',
        ],
        'DESCRIPTION' => [
            'ru' => 'Действие возвращает MD5-хеш от входящего параметра',
            'en' => 'Activity returns MD5 hash of input parameter',
        ],
        'PROPERTIES' => [
            'inputString' => [
                'Name' => [
                    'ru' => 'Входящая строка',
                    'en' => 'Input string',
                ],
                'Description' => [
                    'ru' => 'Введите строку для хеширования',
                    'en' => 'Input string for hashing',
                ],
                'Type' => 'string',
                'Required' => 'Y',
                'Multiple' => 'N',
                'Default' => '{=Document:NAME}',
            ],
        ],
        'RETURN_PROPERTIES' => [
            'outputString' => [
                'Name' => [
                    'ru' => 'MD5',
                    'en' => 'MD5',
                ],
                'Type' => 'string',
                'Multiple' => 'N',
                'Default' => null,
            ],
        ],
    ]);

    print_r($response->getResponseData()->getResult()); // true
    ```

- Python

    ```python
    # client построен на токене установленного приложения.
    result = client.bizproc.activity.add(
        code="md5_action",
        handler="https://your-domain.example/bp-md5-handler",
        auth_user_id=1,
        use_subscription=True,
        name={
            "ru": "MD5 генератор",
            "en": "MD5 generator",
        },
        description={
            "ru": "Действие возвращает MD5-хеш от входящего параметра",
            "en": "Activity returns MD5 hash of input parameter",
        },
        properties={
            "inputString": {
                "Name": {
                    "ru": "Входящая строка",
                    "en": "Input string",
                },
                "Description": {
                    "ru": "Введите строку для хеширования",
                    "en": "Input string for hashing",
                },
                "Type": "string",
                "Required": "Y",
                "Multiple": "N",
                "Default": "{=Document:NAME}",
            },
        },
        return_properties={
            "outputString": {
                "Name": {
                    "ru": "MD5",
                    "en": "MD5",
                },
                "Type": "string",
                "Multiple": "N",
                "Default": None,
            },
        },
    ).response.result

    print(result)  # True
    ```

{% endlist %}

Пример успешного ответа:

```json
{
    "result": true
}
```

Метод возвращает `true`, если действие зарегистрировано. Идентификатор действия не возвращается: для дальнейшей работы используйте код из параметра `CODE`. После регистрации действие появится в дизайнере бизнес-процессов.

## 2. Добавьте действие в шаблон

В Битрикс24 добавьте созданное действие в шаблон бизнес-процесса. Подробнее читайте в статье [Как работать в дизайнере бизнес-процессов](https://helpdesk.bitrix24.ru/open/22955798/).

1. Перейдите в раздел *Автоматизация > Бизнес-процессы > Процессы в ленте новостей*
2. Откройте карточку нужного процесса или создайте новый
3. Нажмите *Настройки > Настроить бизнес-процессы*
4. Откройте шаблон и перетащите свое действие из блока *Действия приложений* в нужное место
5. В настройках действия заполните созданные вами поля и убедитесь, что параметр *Ожидать ответа* установлен в значение *Да*
6. Сохраните шаблон

Если действие не видно в блоке *Действия приложений*, проверьте регистрацию методом [bizproc.activity.list](../../api-reference/bizproc/bizproc-activity/bizproc-activity-list.md). В ответе должен быть код действия.

```json
{
    "result": [
        "md5_action"
    ]
}
```

Когда процесс дойдет до действия, Битрикс24 отправит POST-запрос на `HANDLER`. Обработчик получит:

- `event_token` — токен текущего ожидания
- `properties.inputString` — значение параметра действия
- `auth` — данные авторизации приложения
- `workflow_id`, `document_id`, `document_type` и `code` — контекст запуска

Пример входящих данных обработчика:

```json
{
    "workflow_id": "55c1dc1c3f0d75.78875596",
    "code": "md5_action",
    "document_id": [
        "lists",
        "BizprocDocument",
        "123"
    ],
    "event_token": "55c1dc1c3f0d75.78875596|A51601_82584_96831_81132|hsyUws1j4XiwqPqN45eH66CcQtEvpUIP",
    "properties": {
        "inputString": "Тестовая строка"
    },
    "auth": {
        "domain": "example.bitrix24.ru",
        "access_token": "put_access_token_here",
        "refresh_token": "put_refresh_token_here"
    }
}
```

Сохраните `event_token` до вызова `bizproc.event.send`. Без него Битрикс24 не поймет, какое ожидающее действие нужно завершить.

## 3. Верните результат в бизнес-процесс

В обработчике рассчитайте MD5-хеш и вызовите [bizproc.event.send](../../api-reference/bizproc/bizproc-robot/bizproc-event-send.md).

Передайте:

- `EVENT_TOKEN` — значение `event_token`, которое пришло в обработчик
- `RETURN_VALUES` — объект с результатами действия. Ключи должны совпадать с ключами из `RETURN_PROPERTIES`
- `LOG_MESSAGE` — сообщение для журнала бизнес-процесса

{% list tabs %}

- JS

    ```js
    app.post('/bp-md5-handler', async (req, res) => {
        const payload = req.body
        const inputString = String(payload.properties?.inputString ?? '')
        const outputString = crypto
            .createHash('md5')
            .update(inputString)
            .digest('hex')

        const $b24 = makeClient(payload.auth)
        const response = await $b24.actions.v2.call.make({
            method: 'bizproc.event.send',
            params: {
                EVENT_TOKEN: payload.event_token,
                RETURN_VALUES: {
                    outputString,
                },
                LOG_MESSAGE: `Получена строка: ${inputString}`,
            },
            requestId: 'bizproc-event-send',
        })

        if (!response.isSuccess) {
            res.status(500).json({ error: response.getErrorMessages() })
            return
        }

        res.json({ result: true, outputString })
    })

    app.listen(3000)
    ```

- PHP

    ```php
    <?php
    $payload = $request->request->all();
    $inputString = (string)($payload['properties']['inputString'] ?? '');
    $outputString = md5($inputString);

    $response = $b24->core->call('bizproc.event.send', [
        'EVENT_TOKEN' => $payload['event_token'],
        'RETURN_VALUES' => [
            'outputString' => $outputString,
        ],
        'LOG_MESSAGE' => 'Получена строка: ' . $inputString,
    ]);

    echo json_encode([
        'result' => $response->getResponseData()->getResult(),
        'outputString' => $outputString,
    ]);
    ```

- Python

    ```python
    @app.post("/bp-md5-handler")
    def bp_md5_handler():
        payload = get_payload()
        auth = payload["auth"]
        properties = payload.get("properties", {})
        input_string = str(properties.get("inputString", ""))
        output_string = hashlib.md5(input_string.encode("utf-8")).hexdigest()

        client, token = make_client(auth)
        result = token.call_method("bizproc.event.send", {
            "EVENT_TOKEN": payload["event_token"],
            "RETURN_VALUES": {
                "outputString": output_string,
            },
            "LOG_MESSAGE": f"Получена строка: {input_string}",
        })["result"]

        return {
            "result": result,
            "outputString": output_string,
        }
    ```

{% endlist %}

Пример успешного ответа `bizproc.event.send`:

```json
{
    "result": true
}
```

После успешного вызова Битрикс24 закрывает ожидающее действие. Значение `outputString` можно выбрать в форме *Вставка значения* в следующих действиях бизнес-процесса.

## Проверим результат

Запустите бизнес-процесс с действием `MD5 генератор`.

1. Перейдите в *Бизнес-процессы > Запуск процессов*
2. Найдите нужный процесс, откройте его и нажмите *Запустить*
3. Заполните поля формы (если требуется) и подтвердите запуск

После запуска проверьте обработчик на стороне приложения. На URL из параметра `HANDLER` должен прийти POST-запрос с `event_token`, `properties.inputString` и блоком `auth`.

После выполнения обработчика откройте журнал бизнес-процесса. В журнале должна быть запись из `LOG_MESSAGE`.

Добавьте после пользовательского действия стандартное действие, которое записывает значение в переменную или поле документа. В форме *Вставка значения* выберите результат действия `MD5 генератор` — `MD5`. Если обработчик вернул `outputString`, в переменную или поле попадет MD5-хеш входящей строки.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код или признак** | **Причина и действие** ||
|| `ACCESS_DENIED`, `Application context required` | Действие регистрируется не из приложения. Установите приложение и вызовите `bizproc.activity.add` в его контексте ||
|| `ACCESS_DENIED`, `Access denied!` | Регистрацию выполняет не администратор или в `bizproc.event.send` передан невалидный `EVENT_TOKEN` ||
|| `ERROR_ACTIVITY_VALIDATION_FAILURE`, `Wrong properties array!` | Некорректно заполнены `PROPERTIES` или `RETURN_PROPERTIES`. Проверьте ключи параметров, типы полей и обязательные названия ||
|| `ERROR_ACTIVITY_ALREADY_INSTALLED` | Действие с таким `CODE` уже установлено приложением. Измените `CODE` или обновите действие методом [bizproc.activity.update](../../api-reference/bizproc/bizproc-activity/bizproc-activity-update.md) ||
|| Результат не появился в форме *Вставка значения* | Ключ в `RETURN_VALUES` не совпадает с ключом из `RETURN_PROPERTIES`. В примере оба ключа должны быть `outputString` ||
|| Процесс не продолжился после вызова обработчика | Действие не ждет ответ приложения или обработчик не вызвал `bizproc.event.send`. Проверьте `USE_SUBSCRIPTION: 'Y'` и успешный ответ `{"result": true}` ||
|#

После исправления ошибки регистрации повторите шаг 1. После исправления обработчика добавьте действие в шаблон заново, если изменили `RETURN_PROPERTIES`, и повторно запустите бизнес-процесс со шага 2.

## Что важно учитывать

- `EVENT_TOKEN` действует для конкретного запуска действия. Не используйте токен повторно для другого процесса или другого действия
- В `RETURN_VALUES` передавайте только ключи, описанные в `RETURN_PROPERTIES`. Остальные значения Битрикс24 не сохранит в результатах действия
- Если `USE_SUBSCRIPTION` явно задан как `N`, действие не будет ждать `bizproc.event.send` и процесс продолжится без результата обработчика
- Значение `AUTH_USER_ID` определяет, чей токен передается обработчику. Этот пользователь должен иметь права, которые нужны обработчику для дополнительных вызовов REST API
- Для новой CRM-автоматизации обычно удобнее использовать [роботов приложений](../../api-reference/bizproc/bizproc-robot/bizproc-robot-add.md). Механика возврата результата через `bizproc.event.send` остается такой же

## Пример кода

Код проходит основные шаги сценария: регистрирует действие с входным параметром `inputString` и выходным результатом `outputString`, принимает запрос от бизнес-процесса, считает MD5-хеш и возвращает результат методом `bizproc.event.send`.

В сценарии две точки запуска:

- регистрация действия выполняется из установленного приложения
- обработчик размещается на публичном HTTPS-адресе из параметра `HANDLER`

Замените `https://your-domain.example/bp-md5-handler`, `B24_CLIENT_ID` и `B24_CLIENT_SECRET` на значения вашего приложения.

{% list tabs %}

- JS

    ```js
    // install-page.js
    // npm install @bitrix24/b24jssdk
    import { initializeB24Frame } from '@bitrix24/b24jssdk'

    // Вызовите функцию на странице установки или настройки приложения.
    export async function registerActivity() {
        const $b24 = await initializeB24Frame()

        const response = await $b24.actions.v2.call.make({
            method: 'bizproc.activity.add',
            params: {
                CODE: 'md5_action',
                HANDLER: 'https://your-domain.example/bp-md5-handler',
                AUTH_USER_ID: 1,
                USE_SUBSCRIPTION: 'Y',
                NAME: {
                    ru: 'MD5 генератор',
                    en: 'MD5 generator',
                },
                DESCRIPTION: {
                    ru: 'Действие возвращает MD5-хеш от входящего параметра',
                    en: 'Activity returns MD5 hash of input parameter',
                },
                PROPERTIES: {
                    inputString: {
                        Name: {
                            ru: 'Входящая строка',
                            en: 'Input string',
                        },
                        Type: 'string',
                        Required: 'Y',
                        Multiple: 'N',
                        Default: '{=Document:NAME}',
                    },
                },
                RETURN_PROPERTIES: {
                    outputString: {
                        Name: {
                            ru: 'MD5',
                            en: 'MD5',
                        },
                        Type: 'string',
                        Multiple: 'N',
                        Default: null,
                    },
                },
            },
            requestId: 'bizproc-activity-add',
        })

        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }

        return response.getData().result
    }

    // bp-md5-handler.js
    // npm install express
    import express from 'express'
    import crypto from 'node:crypto'
    import { B24OAuth } from '@bitrix24/b24jssdk'

    const APP = {
        clientId: process.env.B24_CLIENT_ID,
        clientSecret: process.env.B24_CLIENT_SECRET,
    }

    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

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

    app.post('/bp-md5-handler', async (req, res) => {
        try {
            const payload = req.body
            const inputString = String(payload.properties?.inputString ?? '')
            const outputString = crypto
                .createHash('md5')
                .update(inputString)
                .digest('hex')

            const $b24 = makeClient(payload.auth)
            const response = await $b24.actions.v2.call.make({
                method: 'bizproc.event.send',
                params: {
                    EVENT_TOKEN: payload.event_token,
                    RETURN_VALUES: {
                        outputString,
                    },
                    LOG_MESSAGE: `Получена строка: ${inputString}`,
                },
                requestId: 'bizproc-event-send',
            })

            if (!response.isSuccess) {
                res.status(500).json({ error: response.getErrorMessages() })
                return
            }

            res.json({ result: true, outputString })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    })

    app.listen(3000)
    ```

- PHP

    ```php
    <?php
    // install.php и bp-md5-handler.php
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

    function buildB24(Request $request)
    {
        $appProfile = ApplicationProfile::initFromArray([
            'BITRIX24_PHP_SDK_APPLICATION_CLIENT_ID' => getenv('B24_CLIENT_ID'),
            'BITRIX24_PHP_SDK_APPLICATION_CLIENT_SECRET' => getenv('B24_CLIENT_SECRET'),
            'BITRIX24_PHP_SDK_APPLICATION_SCOPE' => 'bizproc',
        ]);

        $authToken = AuthToken::initFromEventRequest($request);
        $domain = (string)$request->request->all('auth')['domain'];

        $log = new Logger('bizproc');
        $log->pushHandler(new StreamHandler('php://stdout'));

        return (new ServiceBuilderFactory(new EventDispatcher(), $log))
            ->init($appProfile, $authToken, $domain, DefaultOAuthServerUrl::default());
    }

    function registerActivity($b24): bool
    {
        // Вызовите функцию на странице установки или настройки приложения.
        $response = $b24->core->call('bizproc.activity.add', [
            'CODE' => 'md5_action',
            'HANDLER' => 'https://your-domain.example/bp-md5-handler',
            'AUTH_USER_ID' => 1,
            'USE_SUBSCRIPTION' => 'Y',
            'NAME' => [
                'ru' => 'MD5 генератор',
                'en' => 'MD5 generator',
            ],
            'DESCRIPTION' => [
                'ru' => 'Действие возвращает MD5-хеш от входящего параметра',
                'en' => 'Activity returns MD5 hash of input parameter',
            ],
            'PROPERTIES' => [
                'inputString' => [
                    'Name' => [
                        'ru' => 'Входящая строка',
                        'en' => 'Input string',
                    ],
                    'Type' => 'string',
                    'Required' => 'Y',
                    'Multiple' => 'N',
                    'Default' => '{=Document:NAME}',
                ],
            ],
            'RETURN_PROPERTIES' => [
                'outputString' => [
                    'Name' => [
                        'ru' => 'MD5',
                        'en' => 'MD5',
                    ],
                    'Type' => 'string',
                    'Multiple' => 'N',
                    'Default' => null,
                ],
            ],
        ]);

        return (bool)$response->getResponseData()->getResult();
    }

    $request = Request::createFromGlobals();
    $b24 = buildB24($request);

    $payload = $request->request->all();
    $inputString = (string)($payload['properties']['inputString'] ?? '');
    $outputString = md5($inputString);

    $response = $b24->core->call('bizproc.event.send', [
        'EVENT_TOKEN' => $payload['event_token'],
        'RETURN_VALUES' => [
            'outputString' => $outputString,
        ],
        'LOG_MESSAGE' => 'Получена строка: ' . $inputString,
    ]);

    echo json_encode([
        'result' => $response->getResponseData()->getResult(),
        'outputString' => $outputString,
    ]);
    ```

- Python

    ```python
    # app.py
    # pip install b24pysdk flask
    import hashlib
    import os
    from flask import Flask, request
    from b24pysdk import BitrixApp, BitrixToken, Client

    APP = BitrixApp(
        client_id=os.environ["B24_CLIENT_ID"],
        client_secret=os.environ["B24_CLIENT_SECRET"],
    )
    app = Flask(__name__)

    def make_client(auth: dict) -> tuple[Client, BitrixToken]:
        token = BitrixToken(
            domain=auth["domain"],
            auth_token=auth["access_token"],
            refresh_token=auth.get("refresh_token", ""),
            bitrix_app=APP,
        )
        return Client(token), token

    def register_activity(client: Client) -> bool:
        # Вызовите функцию на странице установки или настройки приложения.
        return client.bizproc.activity.add(
            code="md5_action",
            handler="https://your-domain.example/bp-md5-handler",
            auth_user_id=1,
            use_subscription=True,
            name={
                "ru": "MD5 генератор",
                "en": "MD5 generator",
            },
            description={
                "ru": "Действие возвращает MD5-хеш от входящего параметра",
                "en": "Activity returns MD5 hash of input parameter",
            },
            properties={
                "inputString": {
                    "Name": {
                        "ru": "Входящая строка",
                        "en": "Input string",
                    },
                    "Type": "string",
                    "Required": "Y",
                    "Multiple": "N",
                    "Default": "{=Document:NAME}",
                },
            },
            return_properties={
                "outputString": {
                    "Name": {
                        "ru": "MD5",
                        "en": "MD5",
                    },
                    "Type": "string",
                    "Multiple": "N",
                    "Default": None,
                },
            },
        ).response.result

    def get_payload() -> dict:
        json_payload = request.get_json(silent=True)
        if json_payload:
            return json_payload

        form = request.form
        return {
            "event_token": form["event_token"],
            "auth": {
                "domain": form["auth[domain]"],
                "access_token": form["auth[access_token]"],
                "refresh_token": form.get("auth[refresh_token]", ""),
            },
            "properties": {
                "inputString": form.get("properties[inputString]", ""),
            },
        }

    @app.post("/bp-md5-handler")
    def bp_md5_handler():
        payload = get_payload()
        properties = payload.get("properties", {})
        input_string = str(properties.get("inputString", ""))
        output_string = hashlib.md5(input_string.encode("utf-8")).hexdigest()

        client, token = make_client(payload["auth"])
        result = token.call_method("bizproc.event.send", {
            "EVENT_TOKEN": payload["event_token"],
            "RETURN_VALUES": {
                "outputString": output_string,
            },
            "LOG_MESSAGE": f"Получена строка: {input_string}",
        })["result"]

        return {
            "result": result,
            "outputString": output_string,
        }
    ```

{% endlist %}

## Продолжите изучение

- [Действия приложений: обзор методов](../../api-reference/bizproc/bizproc-activity/index.md)
- [Добавить новое действие bizproc.activity.add](../../api-reference/bizproc/bizproc-activity/bizproc-activity-add.md)
- [Получить список действий bizproc.activity.list](../../api-reference/bizproc/bizproc-activity/bizproc-activity-list.md)
- [Вернуть параметры действию или роботу bizproc.event.send](../../api-reference/bizproc/bizproc-robot/bizproc-event-send.md)
- [Записать информацию в лог бизнес-процесса bizproc.activity.log](../../api-reference/bizproc/bizproc-activity/bizproc-activity-log.md)
