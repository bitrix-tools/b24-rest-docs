# Зарегистрировать бота imbot.v2.Bot.register

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: авторизованный пользователь

Метод `imbot.v2.Bot.register` регистрирует нового чат-бота.

Метод идемпотентен: повторный вызов с тем же `fields.code` от того же приложения возвращает существующего бота без обновления данных. Для обновления используйте [imbot.v2.Bot.update](./bot-update.md).

## Параметры метода

{% include [Сноска о параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **botToken**
[`string`](../../../../data-types.md) | Уникальный токен авторизации бота. Обязателен при авторизации через вебхук, не нужен для OAuth.

Передайте уникальный botToken — этот ключ будет привязан к чат-боту и потребуется для всех последующих вызовов imbot.v2* через вебхук ||
|| **fields***
[`object`](../../../../data-types.md) | Объект с параметрами бота. Описание параметров — [ниже](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`Тип` | **Описание** ||
|| **code***
[`string`](../../../../data-types.md) | Уникальный код бота в рамках приложения ||
|| **properties***
[`object`](../../../../data-types.md) | Свойства профиля бота. Описание параметров — [ниже](#properties) ||
|| **type**
[`string`](../../../../data-types.md) | Тип бота. Описание типов и их поведения — [Типы ботов](../../index.md#bot-types).

Значение по умолчанию: `bot` ||
|| **eventMode**
[`string`](../../../../data-types.md) | Режим доставки событий.

Допустимые значения:
- `fetch` — бот забирает события через [imbot.v2.Event.get](../events/event-get.md)
- `webhook` — события отправляются POST-запросом на `webhookUrl`

Значение по умолчанию: `fetch` ||
|| **webhookUrl**
[`string`](../../../../data-types.md) | URL обработчика событий бота. Обязателен при `eventMode = webhook` ||
|| **isHidden**
[`boolean`](../../../../data-types.md) | Скрытый бот. Допустимые значения: `true`, `false`. По умолчанию `false` ||
|| **isReactionsEnabled**
[`boolean`](../../../../data-types.md) | Включить поддержку реакций. Допустимые значения: `true`, `false`. По умолчанию `true` ||
|| **isSupportOpenline**
[`boolean`](../../../../data-types.md) | Включить поддержку Открытых линий. Допустимые значения: `true`, `false`. По умолчанию `false` ||
|| **backgroundId**
[`string`](../../../../data-types.md) | Фон чата бота. По умолчанию `null` — используется фон из настроек пользователя. Доступные значения — в [таблице фонов](#backgrounds) ||
|#

### Параметр properties {#properties}

#|
|| **Название**
`Тип` | **Описание** ||
|| **name***
[`string`](../../../../data-types.md) | Имя бота. Отображается в списке чатов и заголовке диалога ||
|| **lastName**
[`string`](../../../../data-types.md) | Фамилия бота ||
|| **workPosition**
[`string`](../../../../data-types.md) | Должность бота (отображается в профиле) ||
|| **color**
[`string`](../../../../data-types.md) | Цвет аватара в формате HEX ||
|| **gender**
[`string`](../../../../data-types.md) | Пол. Допустимые значения: `M`, `F` ||
|| **avatar**
[`file`](../../../../data-types.md) | Аватар в формате [Base64](../../../../files/how-to-upload-files.md) ||
|#

### Доступные фоны {#backgrounds}

#|
|| **ID** | **Тема** | **Цвет** ||
|| `azure` | dark | Голубой ||
|| `mint` | dark | Мятный ||
|| `steel` | dark | Стальной ||
|| `slate` | dark | Сланцевый ||
|| `teal` | dark | Бирюзовый ||
|| `cornflower` | dark | Васильковый ||
|| `sky` | light | Небесный ||
|| `peach` | light | Персиковый ||
|| `frost` | light | Морозный ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "botToken":"my_bot_token",
        "fields":{
          "code":"support_bot",
          "properties":{"name":"Support Bot","workPosition":"AI Assistant"},
          "type":"bot",
          "eventMode":"fetch"
        }
      }' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Bot.register
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "fields":{
          "code":"support_bot",
          "properties":{"name":"Support Bot","workPosition":"AI Assistant"},
          "type":"bot",
          "eventMode":"fetch"
        },
        "auth":"**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Bot.register
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Bot.register', {
        fields: {
          code: 'support_bot',
          properties: {
            name: 'Support Bot',
            workPosition: 'AI Assistant',
          },
          type: 'bot',
          eventMode: 'fetch',
        },
      });

      const { result } = response.getData();
      console.log('result:', result);
    } catch (error) {
      console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imbot.v2.Bot.register',
                [
                    'fields' => [
                        'code' => 'support_bot',
                        'properties' => [
                            'name' => 'Support Bot',
                            'workPosition' => 'AI Assistant',
                        ],
                        'type' => 'bot',
                        'eventMode' => 'fetch',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'result: ' . print_r($result, true);
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.v2.Bot.register',
        {
            fields: {
                code: 'support_bot',
                properties: {
                    name: 'Support Bot',
                    workPosition: 'AI Assistant',
                },
                type: 'bot',
                eventMode: 'fetch',
            },
        },
        function(result) {
            if (result.error()) {
                console.error(result.error().ex);
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'imbot.v2.Bot.register',
        [
            'fields' => [
                'code' => 'support_bot',
                'properties' => [
                    'name' => 'Support Bot',
                    'workPosition' => 'AI Assistant',
                ],
                'type' => 'bot',
                'eventMode' => 'fetch',
            ],
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Bot ID: ' . $result['result']['bot']['id'];
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": {
        "bot": {
            "id": 456,
            "code": "support_bot",
            "type": "bot",
            "isHidden": false,
            "isSupportOpenline": false,
            "isReactionsEnabled": true,
            "backgroundId": null,
            "language": "en",
            "moduleId": "rest",
            "appId": "local.67890abcdef12.34567890",
            "eventMode": "fetch",
            "countMessage": 0,
            "countCommand": 0,
            "countChat": 0,
            "countUser": 0
        },
        "users": [
            {
                "id": 456,
                "active": true,
                "name": "Support Bot",
                "firstName": "Support",
                "lastName": "Bot",
                "workPosition": "AI Assistant",
                "color": "#df532d",
                "avatar": "",
                "gender": "M",
                "bot": true,
                "type": "bot"
            }
        ]
    },
    "time": {
        "start": 1728626400.123,
        "finish": 1728626400.234,
        "duration": 0.111,
        "processing": 0.045,
        "date_start": "2024-10-11T10:00:00+03:00",
        "date_finish": "2024-10-11T10:00:00+03:00"
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`object`](../../../../data-types.md) | Результат регистрации бота ||
|| **result.bot**
[`Bot`](../../entities.md#bot) | Объект бота в расширенном формате (доступен только владельцу). Описание полей объекта — [Bot](../../entities.md#bot) ||
|| **result.users**
[`User[]`](../../entities.md#user) | Массив связанных пользователей. Описание полей объекта — [User](../../entities.md#user) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "BOT_CODE_REQUIRED",
    "error_description": "Bot code is required"
}
```

{% include notitle [Обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `BOT_TOKEN_NOT_SPECIFIED` | Bot token is not specified | Не указан `botToken`. Обязателен при авторизации через вебхук ||
|| `BOT_CODE_REQUIRED` | Bot code is required | Не указан код бота (`fields.code`) ||
|| `BOT_PROPERTIES_REQUIRED` | Bot properties are required | Не указаны свойства бота (имя) ||
|| `BOT_CODE_ALREADY_TAKEN` | Bot code is already taken | Код бота уже занят другим приложением ||
|| `BOT_INVALID_TYPE` | Invalid bot type | Невалидный тип бота ||
|| `BOT_INVALID_EVENT_MODE` | Invalid event mode | Невалидный режим доставки событий ||
|| `BOT_WEBHOOK_URL_REQUIRED` | Webhook URL is required | Не указан `fields.webhookUrl` при `fields.eventMode = webhook` ||
|| `BOT_REGISTER_FAILED` | Bot registration failed | Ошибка регистрации бота ||
|| `BOT_INVALID_CALLBACK` | Invalid callback URL | Невалидный URL обработчика ||
|| `BOT_LIMIT_EXCEEDED` | Bot limit exceeded | Превышен лимит ботов приложения (100 ботов) ||
|| `BOT_AVATAR_INCORRECT_TYPE` | Avatar must be an image | Аватар должен быть изображением (`image/*`) ||
|| `BOT_AVATAR_INCORRECT_SIZE` | Avatar exceeds maximum size | Размер аватара превышает максимум (5000×5000 px) ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./bot-update.md)
- [{#T}](./bot-get.md)
- [{#T}](./bot-list.md)
- [{#T}](./bot-unregister.md)
- [{#T}](../events/event-get.md)
