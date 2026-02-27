# Получить данные о чате im.dialog.get

> Scope: [`im`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь — участник чата

Метод `im.dialog.get` получает информацию о чате.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **DIALOG_ID***
[`string`](../data-types.md) | Идентификатор чата в формате:
- `chatXXX` — чат
- `sgXXX` — чат группы или проекта
- `XXX` — идентификатор пользователя личного чата

Примеры: `chat1435`, `sg103` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"DIALOG_ID":"chat1435"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.dialog.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"DIALOG_ID":"chat1435","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.dialog.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.dialog.get',
            {
                DIALOG_ID: 'chat1435'
            }
        );

        console.log(response.getData().result);
    }
    catch (error)
    {
        console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'im.dialog.get',
                [
                    'DIALOG_ID' => 'chat1435',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.dialog.get',
        {
            DIALOG_ID: 'chat1435'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'im.dialog.get',
        [
            'DIALOG_ID' => 'chat1435',
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
        "id": 1439,
        "parent_chat_id": 0,
        "parent_message_id": 0,
        "name": "Чат по сделке",
        "description": "Здесь обсуждаем сделку",
        "owner": 503,
        "extranet": false,
        "avatar": "",
        "color": "#f76187",
        "type": "crm",
        "counter": 0,
        "user_counter": 3,
        "message_count": 3,
        "unread_id": 0,
        "restrictions": {
            "avatar": false,
            "rename": false,
            "extend": true,
            "call": true,
            "mute": true,
            "leave": true,
            "leave_owner": false,
            "send": true,
            "user_list": true,
            "path": "",
            "path_title": ""
        },
        "last_message_id": 84477,
        "last_id": 84477,
        "marked_id": 0,
        "disk_folder_id": 0,
        "entity_type": "CRM",
        "entity_id": "DEAL|1663",
        "entity_data_1": "",
        "entity_data_2": "",
        "entity_data_3": "",
        "mute_list": [],
        "date_create": "2026-02-25T16:50:58+03:00",
        "message_type": "C",
        "public": "",
        "role": "owner",
        "entity_link": {
            "type": "DEAL",
            "url": "/crm/deal/details/1663/",
            "id": "DEAL|1663"
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
                "user_id": 103,
                "user_name": "Иван Иванов",
                "message_id": 0,
                "date": null
            },
            {
                "user_id": 547,
                "user_name": "Петр Петров",
                "message_id": 0,
                "date": null
            }
        ],
        "manager_list": [
            503
        ],
        "last_message_views": {
            "message_id": 84477,
            "first_viewers": [],
            "count_of_viewers": 0
        },
        "dialog_id": "chat1439"
    },
    "time": {
        "start": 1772030091,
        "finish": 1772030091.165223,
        "duration": 0.1652228832244873,
        "processing": 0,
        "date_start": "2026-02-25T17:34:51+03:00",
        "date_finish": "2026-02-25T17:34:51+03:00",
        "operating_reset_at": 1772030691,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой объект с данными чата [(подробное описание)](#result-item) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result-item {#result-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор чата ||
|| **parent_chat_id**
[`integer`](../data-types.md) | Идентификатор родительского чата ||
|| **parent_message_id**
[`integer`](../data-types.md) | Идентификатор родительского сообщения ||
|| **name**
[`string`](../data-types.md) | Название чата ||
|| **description**
[`string`](../data-types.md) | Описание чата ||
|| **owner**
[`integer`](../data-types.md) | Идентификатор владельца чата ||
|| **extranet**
[`boolean`](../data-types.md) | Признак участия внешнего экстранет-пользователя ||
|| **avatar**
[`string`](../data-types.md) | Ссылка на аватар чата ||
|| **color**
[`string`](../data-types.md) | Цвет чата в формате HEX ||
|| **type**
[`string`](../data-types.md) | Тип чата ||
|| **counter**
[`integer`](../data-types.md) | Счетчик непрочитанных сообщений ||
|| **user_counter**
[`integer`](../data-types.md) | Количество участников чата ||
|| **message_count**
[`integer`](../data-types.md) | Количество сообщений в чате ||
|| **unread_id**
[`integer`](../data-types.md) | Идентификатор первого непрочитанного сообщения ||
|| **restrictions**
[`object`](../data-types.md) | Ограничения действий в чате [(подробное описание)](#restrictions) ||
|| **last_message_id**
[`integer`](../data-types.md) | Идентификатор последнего сообщения ||
|| **last_id**
[`integer`](../data-types.md) | Идентификатор последнего прочитанного сообщения ||
|| **marked_id**
[`integer`](../data-types.md) | Идентификатор помеченного сообщения ||
|| **disk_folder_id**
[`integer`](../data-types.md) | Идентификатор папки чата на Диске ||
|| **entity_type**
[`string`](../data-types.md) | Внешний код чата: тип ||
|| **entity_id**
[`string`](../data-types.md) | Внешний код чата: идентификатор ||
|| **entity_data_1**
[`string`](../data-types.md) | Внешние данные 1 для чата ||
|| **entity_data_2**
[`string`](../data-types.md) | Внешние данные 2 для чата ||
|| **entity_data_3**
[`string`](../data-types.md) | Внешние данные 3 для чата ||
|| **mute_list**
[`array`](../data-types.md) | Список пользователей с отключенными уведомлениями ||
|| **date_create**
[`datetime`](../data-types.md) | Дата создания чата в формате ATOM ||
|| **message_type**
[`string`](../data-types.md) | Тип сообщений чата ||
|| **public**
[`string`](../data-types.md) | Признак публичности чата ||
|| **role**
[`string`](../data-types.md) | Роль текущего пользователя в чате ||
|| **entity_link**
[`object`](../data-types.md) | Ссылка на связанный объект [(подробное описание)](#entity-link) ||
|| **text_field_enabled**
[`boolean`](../data-types.md) | Доступность поля ввода сообщений ||
|| **background_id**
[`integer`](../data-types.md) | Идентификатор фона чата. Если не задан, значение `null` ||
|| **permissions**
[`object`](../data-types.md) | Права действий в чате [(подробное описание)](#permissions) ||
|| **is_new**
[`boolean`](../data-types.md) | Признак нового диалога ||
|| **readed_list**
[`array`](../data-types.md) | Список пользователей и статусов прочтения [(подробное описание)](#readed-list-item) ||
|| **manager_list**
[`array`](../data-types.md) | Список идентификаторов менеджеров чата ||
|| **last_message_views**
[`object`](../data-types.md) | Информация о просмотрах последнего сообщения [(подробное описание)](#last-message-views) ||
|| **dialog_id**
[`string`](../data-types.md) | Идентификатор диалога, переданный в параметре `DIALOG_ID` ||
|#

#### Объект restrictions {#restrictions}

#|
|| **Название**
`тип` | **Описание** ||
|| **avatar**
[`boolean`](../data-types.md) | Доступность изменения аватара ||
|| **rename**
[`boolean`](../data-types.md) | Доступность изменения названия ||
|| **extend**
[`boolean`](../data-types.md) | Доступность расширения чата ||
|| **call**
[`boolean`](../data-types.md) | Доступность звонков ||
|| **mute**
[`boolean`](../data-types.md) | Доступность отключения уведомлений ||
|| **leave**
[`boolean`](../data-types.md) | Доступность выхода из чата ||
|| **leave_owner**
[`boolean`](../data-types.md) | Доступность выхода владельца из чата ||
|| **send**
[`boolean`](../data-types.md) | Доступность отправки сообщений ||
|| **user_list**
[`boolean`](../data-types.md) | Доступность просмотра списка участников ||
|| **path**
[`string`](../data-types.md) | Ссылка на чат ||
|| **path_title**
[`string`](../data-types.md) | Текст ссылки на чат ||
|#

#### Объект entity_link {#entity-link}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../data-types.md) | Тип связанного объекта ||
|| **url**
[`string`](../data-types.md) | Ссылка на связанный объект ||
|| **id**
[`string`](../data-types.md) | Идентификатор связанного объекта ||
|#

#### Объект permissions {#permissions}

#|
|| **Название**
`тип` | **Описание** ||
|| **manage_users_add**
[`string`](../data-types.md) | Право на добавление участников ||
|| **manage_users_delete**
[`string`](../data-types.md) | Право на удаление участников ||
|| **manage_ui**
[`string`](../data-types.md) | Право на управление интерфейсом чата ||
|| **manage_settings**
[`string`](../data-types.md) | Право на управление настройками чата ||
|| **manage_messages**
[`string`](../data-types.md) | Право на управление сообщениями ||
|| **can_post**
[`string`](../data-types.md) | Право на отправку сообщений ||
|#

#### Объект readed_list {#readed-list-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **user_id**
[`integer`](../data-types.md) | Идентификатор пользователя ||
|| **user_name**
[`string`](../data-types.md) | Имя пользователя ||
|| **message_id**
[`integer`](../data-types.md) | Идентификатор последнего прочитанного сообщения ||
|| **date**
[`datetime`](../data-types.md) | Дата прочтения. Если не задана, значение `null` ||
|#

#### Объект last_message_views {#last-message-views}

#|
|| **Название**
`тип` | **Описание** ||
|| **message_id**
[`integer`](../data-types.md) | Идентификатор сообщения ||
|| **first_viewers**
[`array`](../data-types.md) | Список первых просмотревших пользователей ||
|| **count_of_viewers**
[`integer`](../data-types.md) | Количество просмотров ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "DIALOG_ID_EMPTY",
    "error_description": "Dialog ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `DIALOG_ID_EMPTY` | Dialog ID can't be empty | Не передан обязательный параметр `DIALOG_ID` ||
|| `403` | `ACCESS_ERROR` | You do not have access to the specified dialog | Недостаточно прав на просмотр диалога ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-chat-add.md)
- [{#T}](./im-chat-get.md)
- [{#T}](./im-recent-get.md)
- [{#T}](./im-recent-list.md)
