# Получить данные о чате imbot.dialog.get

> Scope: [`imbot`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к чату

Метод `imbot.dialog.get` возвращает данные чата.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **DIALOG_ID***
[`string`](../../data-types.md) | Идентификатор объекта.

Поддерживаемые форматы:
- `XXX` — идентификатор пользователя, который можно получить через [user.get](../../user/user-get.md) или [user.search](../../user/user-search.md). Используется для получения данных о личных чатах.
- `chatXXX`, где `XXX` — идентификатор группового чата, который можно получить через [imbot.chat.get](../chats/imbot-chat-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2725"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.dialog.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2725","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/imbot.dialog.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'imbot.dialog.get',
            {
                DIALOG_ID: 'chat2725',
            }
        );
        
        const result = response.getData().result;
        console.log('Dialog data:', result);
        
        processResult(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imbot.dialog.get',
                [
                    'DIALOG_ID' => 'chat2725'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting dialog: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.dialog.get',
        {
            DIALOG_ID: 'chat2725'
        },
        function (result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'imbot.dialog.get',
        [
            'DIALOG_ID' => 'chat2725'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "id": 2725,
        "parent_chat_id": 0,
        "parent_message_id": 0,
        "name": "Новое имя для чата",
        "description": "Важные новости",
        "owner": 1291,
        "extranet": false,
        "avatar": "https://cdn-ru.bitrix24.ru/b13743910/resize_cache/33079/ff58db95aecdfa09ae61b51b5fd8f63f/im/708/70810b67c7c206ca3477933063b8ebbc/zuc0242aflwpzacvndxwnfhuxhzvgjaq",
        "color": "#f76187",
        "type": "chat",
        "counter": 0,
        "user_counter": 2,
        "message_count": 11,
        "unread_id": 0,
        "restrictions": {
            "avatar": true,
            "rename": true,
            "extend": true,
            "call": true,
            "mute": true,
            "leave": true,
            "leave_owner": true,
            "send": true,
            "user_list": true
            },
        "last_message_id": 33807,
        "last_id": 33807,
        "marked_id": 0,
        "disk_folder_id": 0,
        "entity_type": "CHAT",
        "entity_id": "13",
        "entity_data_1": "",
        "entity_data_2": "",
        "entity_data_3": "",
        "mute_list": [],
        "date_create": "2026-02-24T13:19:39+03:00",
        "message_type": "C",
        "public": "",
        "role": "member",
        "entity_link": {
            "type": "CHAT",
            "url": "",
            "id": "13"
            },
        "text_field_enabled": true,
        "background_id": null,
        "permissions": {
            "manage_users_add": "member",
            "manage_users_delete": "manager",
            "manage_ui": "member",
            "manage_settings": "owner",
            "manage_messages": "member",
            "can_post": "member"
            },
        "is_new": false,
        "readed_list": [
        {
            "user_id": 1291,
            "user_name": "MyBot",
            "message_id": 33807,
            "date": null
        }
        ],
        "manager_list": [1291],
        "last_message_views": {
            "message_id": 33807,
            "first_viewers": [
                {
                "user_id": 1271,
                "user_name": "Сотрудник",
                "date": "2026-02-24T15:41:17+03:00"
                }
            ],
            "count_of_viewers": 0
            },
        "dialog_id": "chat2725"
    },
    "time": {
        "start": 1771937178,
        "finish": 1771937178.934208,
        "duration": 0.9342079162597656,
        "processing": 0,
        "date_start": "2026-02-24T15:46:18+03:00",
        "date_finish": "2026-02-24T15:46:18+03:00",
        "operating_reset_at": 1771937778,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с [описанием чата](./fields.md) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "DIALOG_ID_EMPTY",
    "error_description": "Dialog ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `DIALOG_ID_EMPTY` | Dialog ID can't be empty | Не передан или передан некорректный `DIALOG_ID` ||
|| `ACCESS_ERROR` | You do not have access to the specified dialog | Нет доступа к указанному диалогу ||
|| `ACCESS_ERROR` | You don't have access to this chat | Нет доступа к указанному чату ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imbot-chat-add.md)
- [{#T}](./imbot-chat-user-add.md)
- [{#T}](./imbot-chat-update-title.md)
- [{#T}](./imbot-chat-update-avatar.md)
- [{#T}](./imbot-chat-update-color.md)
- [{#T}](./imbot-chat-get.md)
- [{#T}](./imbot-chat-user-list.md)
- [{#T}](./imbot-chat-user-delete.md)
- [{#T}](./imbot-chat-leave.md)
