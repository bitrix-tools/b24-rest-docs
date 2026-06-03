# Создать групповой чат imbot.v2.Chat.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец зарегистрированного бота

Метод `imbot.v2.Chat.add` создает новый групповой чат от имени бота. Если владелец не указан — им становится бот.

## Параметры метода

{% include [Сноска о параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **botId***
[`integer`](../../../../data-types.md) | ID бота ||
|| **botToken**
[`string`](../../../../data-types.md) | Уникальный токен авторизации бота. Обязателен при авторизации через вебхук, не нужен для OAuth.

Передавайте тот же botToken, который был указан при регистрации чат-бота ||
|| **fields**
[`object`](../../../../data-types.md) | Свойства создаваемого чата. Структура объекта описана [ниже](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`Тип` | **Описание** ||
|| **title**
[`string`](../../../../data-types.md) | Название чата ||
|| **description**
[`string`](../../../../data-types.md) | Описание чата ||
|| **color**
[`string`](../../../../data-types.md) | Цвет чата — [доступные цвета](#available-colors).

Если не указан или некорректен — назначается автоматически ||
|| **avatar**
[`file`](../../../../data-types.md) | Аватар чата в формате [Base64](../../../../files/how-to-upload-files.md) ||
|| **userIds**
[`integer[]`](../../../../data-types.md) | Массив ID участников ||
|| **ownerId**
[`integer`](../../../../data-types.md) | ID владельца чата. Если не указан — владельцем становится бот ||
|| **message**
[`string`](../../../../data-types.md) | Первое сообщение в чате ||
|#

### Доступные цвета {#available-colors}

#|
|| **Код** | **HEX** ||
|| `red` | `#df532d` ||
|| `green` | `#64a513` ||
|| `mint` | `#4ba984` ||
|| `lightBlue` | `#4ba5c3` ||
|| `darkBlue` | `#3e99ce` ||
|| `purple` | `#8474c8` ||
|| `aqua` | `#1eb4aa` ||
|| `pink` | `#f76187` ||
|| `lime` | `#58cc47` ||
|| `brown` | `#ab7761` ||
|| `azure` | `#29619b` ||
|| `khaki` | `#728f7a` ||
|| `sand` | `#ba9c7b` ||
|| `marengo` | `#556574` ||
|| `gray` | `#909090` ||
|| `graphite` | `#5e5f5e` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"my_bot_token","fields":{"title":"Support Chat","color":"mint","userIds":[1,2]}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Chat.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"fields":{"title":"Support Chat","color":"mint","userIds":[1,2]},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Chat.add
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Chat.add', {
        botId: 456,
        fields: {
          title: 'Support Chat',
          color: 'mint',
          userIds: [1, 2],
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
                'imbot.v2.Chat.add',
                [
                    'botId' => 456,
                    'fields' => [
                        'title' => 'Support Chat',
                        'color' => 'mint',
                        'userIds' => [1, 2],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'result: '. print_r($result, true);
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error: '. $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.v2.Chat.add',
        {
            botId: 456,
            fields: {
                title: 'Support Chat',
                color: 'mint',
                userIds: [1, 2],
            },
        },
        function(result) {
            if (result.error()) {
                console.error(result.error().ex);
            } else {
                console.log('Chat ID:', result.data().chat.id);
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'imbot.v2.Chat.add',
        [
            'botId' => 456,
            'fields' => [
                'title' => 'Support Chat',
                'color' => 'mint',
                'userIds' => [1, 2],
            ],
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: '. $result['error_description'];
    } else {
        echo 'Chat ID: '. $result['result']['chat']['id'];
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "chat": {
            "id": 5,
            "dialogId": "chat5",
            "name": "Support Chat",
            "description": "",
            "type": "chat",
            "messageType": "C",
            "owner": 456,
            "color": "#4ba984",
            "avatar": "",
            "extranet": false,
            "containsCollaber": false,
            "entityType": "",
            "entityId": "",
            "entityData1": "",
            "entityData2": "",
            "entityData3": "",
            "entityLink": {},
            "diskFolderId": 42,
            "role": "owner",
            "permissions": {},
            "muteList": [],
            "parentChatId": null,
            "parentMessageId": null,
            "isNew": true,
            "textFieldEnabled": "Y",
            "backgroundId": null,
            "dateCreate": "2025-01-15T10:00:00+03:00",
            "lastMessageId": 789,
            "lastMessageViews": "{}",
            "lastId": null,
            "managerList": [],
            "markedId": null,
            "messageCount": 1,
            "public": "",
            "unreadId": null,
            "userCounter": 3
        },
        "users": [
            {
                "id": 1,
                "active": true,
                "name": "John Smith",
                "firstName": "John",
                "lastName": "Smith",
                "workPosition": "Developer",
                "color": "#ab7761",
                "avatar": "",
                "gender": "M",
                "birthday": "15-03",
                "extranet": false,
                "bot": false,
                "connector": false,
                "externalAuthId": "default",
                "status": "online",
                "idle": false,
                "lastActivityDate": "2025-01-15T14:25:00+03:00",
                "absent": false,
                "departments": [7],
                "phones": false,
                "type": "employee"
            },
            {
                "id": 2,
                "active": true,
                "name": "Anna Davis",
                "firstName": "Anna",
                "lastName": "Davis",
                "workPosition": "Manager",
                "color": "#5b7e91",
                "avatar": "",
                "gender": "F",
                "birthday": "22-08",
                "extranet": false,
                "bot": false,
                "connector": false,
                "externalAuthId": "default",
                "status": "online",
                "idle": false,
                "lastActivityDate": "2025-01-15T14:20:00+03:00",
                "absent": false,
                "departments": [12],
                "phones": false,
                "type": "employee"
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
[`object`](../../../../data-types.md) | Результат создания чата ||
|| **result.chat**
[`Chat`](../../entities.md#chat) | Объект созданного чата [(подробное описание)](#chat-object) ||
|| **result.users**
[`User[]`](../../entities.md#user) | Массив участников чата [(подробное описание)](#user-object) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Поля объекта Chat {#chat-object}

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../../../data-types.md) | Уникальный идентификатор чата ||
|| **dialogId**
[`string`](../../../../data-types.md) | Идентификатор диалога: `chat5` для групповых, `123` для личных ||
|| **name**
[`string`](../../../../data-types.md) | Название чата ||
|| **description**
[`string`](../../../../data-types.md) | Описание чата ||
|| **type**
[`string`](../../../../data-types.md) | Тип чата: `chat`, `open`, `channel` и другие ||
|| **owner**
[`integer`](../../../../data-types.md) | ID владельца чата ||
|| **color**
[`string\|null`](../../../../data-types.md) | Цвет чата в формате HEX ||
|| **avatar**
[`string`](../../../../data-types.md) | URL аватара чата. Пустая строка, если не установлен ||
|| **role**
[`string`](../../../../data-types.md) | Роль текущего пользователя: `owner`, `manager`, `member`, `guest`, `none` ||
|| **dateCreate**
[`string\|null`](../../../../data-types.md) | Дата создания чата в формате ISO 8601 ||
|| **lastMessageId**
[`integer\|null`](../../../../data-types.md) | ID последнего сообщения ||
|| **muteList**
[`array`](../../../../data-types.md) | Список ID пользователей, отключивших уведомления ||
|| **managerList**
[`array`](../../../../data-types.md) | Массив ID менеджеров чата ||
|#

Полное описание всех полей — на странице [Объекты и поля — Chat](../../entities.md#chat).

### Поля объекта User {#user-object}

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../../../data-types.md) | Уникальный идентификатор пользователя ||
|| **active**
[`boolean`](../../../../data-types.md) | Активен ли пользователь в системе ||
|| **name**
[`string`](../../../../data-types.md) | Полное имя ||
|| **type**
[`string`](../../../../data-types.md) | Тип пользователя: `employee`, `extranet`, `bot` и другие ||
|#

Полное описание всех полей — на странице [Объекты и поля — User](../../entities.md#user).

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "BOT_NOT_FOUND",
    "error_description": "Bot not found"
}
```

{% include notitle [Обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `BOT_TOKEN_NOT_SPECIFIED` | Bot token is not specified | Не указан `botToken`. Обязателен при авторизации через вебхук ||
|| `BOT_ID_REQUIRED` | Bot ID is required | Не указан `botId` ||
|| `BOT_NOT_FOUND` | Bot not found | Бот не найден ||
|| `BOT_OWNERSHIP_ERROR` | Bot is registered by another application | Бот зарегистрирован другим приложением ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [{#T}](./chat-get.md)
- [{#T}](./chat-update.md)
- [{#T}](./chat-user-add.md)
- [{#T}](./chat-leave.md)
