# Создать групповой чат imbot.v2.Chat.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец зарегистрированного бота

Метод `imbot.v2.Chat.add` создает групповой чат от имени бота и добавляет бота в участники.

Чтобы отправлять сообщения в созданный чат, передайте `result.chat.dialogId` из ответа в параметр `dialogId` методов группы [Сообщения](../messages/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **botId***
[`integer`](../../../../data-types.md) | ID бота ||
|| **botToken**
[`string`](../../../../data-types.md) | Токен бота. Обязателен при авторизации через вебхук, для OAuth не нужен.

Передавайте тот же `botToken`, который указали при регистрации бота ||
|| **fields**
[`object`](../../../../data-types.md) | Свойства создаваемого чата [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../../../data-types.md) | Тип чата:

- `chat` — закрытый групповой чат, по умолчанию
- `open` — открытый чат, в который может вступить любой сотрудник

С другим значением метод создаст закрытый чат ||
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
[`integer[]`](../../../../data-types.md) | Массив ID участников. Бота передавать не нужно — он добавляется в чат автоматически ||
|| **ownerId**
[`integer`](../../../../data-types.md) | ID владельца чата, по умолчанию — бот. Владелец автоматически добавляется в чат участником и менеджером. Метод не проверяет, существует ли пользователь: с несуществующим ID чат создастся без ошибки и останется без владельца ||
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

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.imbot.v2.chat.add(
            bot_id=456,
            fields={
                "title": "Support Chat",
                "color": "mint",
                "userIds": [
                    1,
                    2,
                ],
            },
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "imbot.v2.Chat.add", b24.Params{
    	"botId":    456,
    	"botToken": "my_bot_token",
    	"fields": b24.Params{
    		"title":   "Support Chat",
    		"color":   "mint",
    		"userIds": []int{1, 2},
    	},
    })
    if err != nil {
    	return fmt.Errorf("imbot.v2.Chat.add: %w", err)
    }

    // Форма ответа показана ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
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
            "entityLink": {
                "type": "",
                "url": "",
                "id": ""
            },
            "diskFolderId": null,
            "role": "owner",
            "permissions": {
                "manageUsersAdd": "member",
                "manageUsersDelete": "manager",
                "manageUi": "member",
                "manageSettings": "owner",
                "manageMessages": "member",
                "manageMessagesAutoDelete": "manager",
                "manageGuestInvites": "manager",
                "manageDelete": "member",
                "canPost": "member"
            },
            "hasManageCapability": false,
            "canHaveThreads": true,
            "muteList": [],
            "parentChatId": null,
            "parentMessageId": null,
            "isNew": false,
            "textFieldEnabled": true,
            "backgroundId": null,
            "dateCreate": "2025-01-15T10:00:00+03:00",
            "lastMessageId": 789,
            "lastMessageViews": {
                "messageId": 789,
                "firstViewers": [],
                "countOfViewers": 0
            },
            "lastId": 0,
            "managerList": [456],
            "markedId": 0,
            "messageCount": 1,
            "public": "",
            "unreadId": 0,
            "userCounter": 3,
            "guestCount": 0
        },
        "users": [
            {
                "id": 456,
                "active": true,
                "name": "Support Bot",
                "firstName": "Support Bot",
                "lastName": "",
                "workPosition": "",
                "color": "#4ba984",
                "avatar": "",
                "gender": "M",
                "birthday": "",
                "extranet": false,
                "bot": true,
                "connector": false,
                "externalAuthId": "bot",
                "status": "online",
                "idle": false,
                "lastActivityDate": false,
                "mobileLastDate": false,
                "desktopLastDate": false,
                "absent": false,
                "departments": [],
                "phones": false,
                "type": "bot",
                "website": "",
                "email": ""
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
`тип` | **Описание** ||
|| **result**
[`object`](../../../../data-types.md) | Результат создания чата ||
|| **result.chat**
[`Chat`](../../entities.md#chat) | Объект созданного чата [(подробное описание)](#chat-object) ||
|| **result.users**
[`User[]`](../../entities.md#user) | Массив с одним элементом — данными бота, от имени которого выполнен запрос. Участников чата возвращает [imbot.v2.Chat.User.list](./chat-user-list.md). Описание полей — [User](../../entities.md#user) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

Кроме `chat` и `users` ответ содержит служебные ключи интерфейса мессенджера: `recentConfig`, `parentChat`, `copilot`, `messagesAutoDeleteConfigs` и `callInfo`. Для работы бота они не нужны, поэтому в примере ответа не показаны.

### Поля объекта Chat {#chat-object}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../../data-types.md) | Идентификатор чата ||
|| **dialogId**
[`string`](../../../../data-types.md) | Идентификатор диалога. Для группового чата — `chat{id}`, например `chat5` ||
|| **name**
[`string`](../../../../data-types.md) | Название чата ||
|| **description**
[`string`](../../../../data-types.md) | Описание чата. Пустая строка, если не задано ||
|| **type**
[`string`](../../../../data-types.md) | Тип чата: `chat`, `open`, `channel`, `openChannel`, `copilot` и другие — [список значений](../../entities.md#chat) ||
|| **messageType**
[`string`](../../../../data-types.md) | Внутренний однобуквенный тип чата, например `C` для группового и `O` для открытого ||
|| **owner**
[`integer`](../../../../data-types.md) | ID владельца чата ||
|| **color**
[`string`](../../../../data-types.md) | Цвет чата в формате HEX ||
|| **avatar**
[`string`](../../../../data-types.md) | URL аватара чата. Пустая строка, если аватар не установлен ||
|| **extranet**
[`boolean`](../../../../data-types.md) | Есть ли в чате экстранет-пользователи ||
|| **containsCollaber**
[`boolean`](../../../../data-types.md) | Есть ли в чате коллаберы ||
|| **entityType**
[`string`](../../../../data-types.md) | Тип связанного объекта, например `LINES` для Открытых линий. Пустая строка, если чат не связан с объектом ||
|| **entityId**
[`string`](../../../../data-types.md) | Идентификатор связанного объекта ||
|| **entityData1**
[`string`](../../../../data-types.md) | Дополнительные данные связанного объекта, поле 1 ||
|| **entityData2**
[`string`](../../../../data-types.md) | Дополнительные данные связанного объекта, поле 2 ||
|| **entityData3**
[`string`](../../../../data-types.md) | Дополнительные данные связанного объекта, поле 3 ||
|| **entityLink**
[`object`](../../../../data-types.md) | Ссылка на связанный объект — объект с ключами `type`, `url` и `id`. Если чат не связан с объектом, значения пустые ||
|| **diskFolderId**
[```integer|null```](../../../../data-types.md) | ID папки на Диске, где хранятся файлы чата ||
|| **role**
[`string`](../../../../data-types.md) | Роль бота в чате: `owner`, `manager`, `member` или `guest`. Роль `guest` — у бота, который не состоит в открытом чате ||
|| **permissions**
[`object`](../../../../data-types.md) | Минимальная роль для действий в чате. Ключи: `manageUsersAdd`, `manageUsersDelete`, `manageUi`, `manageSettings`, `manageMessages`, `manageMessagesAutoDelete`, `manageGuestInvites`, `manageDelete`, `canPost`. Значения: `member`, `manager`, `owner` или `none` — действие недоступно никому ||
|| **canHaveThreads**
[`boolean`](../../../../data-types.md) | Можно ли создавать треды в чате ||
|| **hasManageCapability**
[`boolean`](../../../../data-types.md) | Служебный признак расширенного доступа к управлению чатом ||
|| **muteList**
[`integer[]`](../../../../data-types.md) | Содержит ID бота, если бот отключил уведомления в чате, иначе пустой массив ||
|| **parentChatId**
[```integer|null```](../../../../data-types.md) | ID родительского чата, если это тред ||
|| **parentMessageId**
[```integer|null```](../../../../data-types.md) | ID родительского сообщения, если это тред ||
|| **isNew**
[`boolean`](../../../../data-types.md) | `true` для открытого канала, созданного меньше суток назад. Для остальных чатов — `false` ||
|| **textFieldEnabled**
[`boolean`](../../../../data-types.md) | Включено ли поле ввода сообщений ||
|| **backgroundId**
[```string|null```](../../../../data-types.md) | ID фона чата ||
|| **dateCreate**
[```string|null```](../../../../data-types.md) | Дата создания чата в формате ISO 8601 ||
|| **lastMessageId**
[```integer|null```](../../../../data-types.md) | ID последнего сообщения ||
|| **lastMessageViews**
[`object`](../../../../data-types.md) | Просмотры последнего сообщения: `messageId` — ID сообщения, `firstViewers` — первые просмотревшие, `countOfViewers` — число просмотревших ||
|| **lastId**
[`integer`](../../../../data-types.md) | ID последнего сообщения, прочитанного ботом ||
|| **managerList**
[`integer[]`](../../../../data-types.md) | ID менеджеров чата ||
|| **markedId**
[`integer`](../../../../data-types.md) | ID сообщения, отмеченного ботом как непрочитанное. `0`, если отметки нет ||
|| **messageCount**
[`integer`](../../../../data-types.md) | Количество сообщений в чате ||
|| **public**
[```string|object```](../../../../data-types.md) | Публичная ссылка на чат — объект с полями `code` и `link`. Пустая строка, если ссылки нет ||
|| **unreadId**
[`integer`](../../../../data-types.md) | ID первого непрочитанного ботом сообщения. `0`, если непрочитанных нет ||
|| **userCounter**
[`integer`](../../../../data-types.md) | Количество участников чата ||
|| **guestCount**
[`integer`](../../../../data-types.md) | Количество гостей в чате ||
|#

Какие из этих полей приходят в данных событий — на странице [Объекты и поля — Chat](../../entities.md#chat).

## Обработка ошибок

HTTP-статус: **400**

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
|| `BOT_TOKEN_NOT_SPECIFIED` | Bot token not specified (botToken is required for webhook auth) | Не указан `botToken`. Обязателен при авторизации через вебхук ||
|| `BOT_ID_REQUIRED` | botId is required | Не указан `botId` ||
|| `BOT_NOT_FOUND` | Bot not found | Бот не найден ||
|| `BOT_OWNERSHIP_ERROR` | Bot was installed by another rest application | Бот зарегистрирован другим приложением ||
|| `ACCESS_DENIED` | ACCESS_DENIED | Нет права создавать чаты ||
|| `CREATION_ERROR` | Error creating chat | Не удалось создать чат ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [{#T}](./chat-get.md)
- [{#T}](./chat-update.md)
- [{#T}](./chat-user-add.md)
- [{#T}](./chat-leave.md)
- [{#T}](./index.md)
- [{#T}](../messages/index.md)
- [{#T}](../../migration.md)
