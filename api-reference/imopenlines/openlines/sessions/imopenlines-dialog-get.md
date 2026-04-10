# Получить информацию о диалоге оператора imopenlines.dialog.get

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом на доступ к диалогу

Метод `imopenlines.dialog.get` возвращает данные чата открытой линии. Достаточно передать один из параметров.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID**
[`integer`](../../../data-types.md) | Идентификатор чата открытой линии.

Идентификатор можно получить методом [imopenlines.session.open](./imopenlines-session-open.md) или [imopenlines.session.history.get](./imopenlines-session-history-get.md) ||
|| **DIALOG_ID**
[`string`](../../../data-types.md) | Идентификатор диалога в формате `chat<ID>`, где `<ID>` — индентификатор чата открытой линии ||
|| **SESSION_ID**
[`integer`](../../../data-types.md) | Идентификатор сессии. 

Идентификатор можно получить методом [imopenlines.session.history.get](./imopenlines-session-history-get.md) в поле `sessionId` ||
|| **USER_CODE**
[`string`](../../../data-types.md) | Строковый код пользователя для канала внешней системы. 

Формат кода: ```<connector>|<LINE_ID>|<CONNECTOR_CHAT_ID>|<CONNECTOR_USER_ID>```, где:
- `<connector>` — идентификатор коннектора: `livechat`, `telegram` и другие
- `<LINE_ID>` — идентификатор открытой линии
- `<CONNECTOR_CHAT_ID>` — идентификатор чата в канале
- `<CONNECTOR_USER_ID>` — идентификатор пользователя в канале

Значение можно получить методом [imopenlines.session.history.get](./imopenlines-session-history-get.md) из `result.chat.<chatId>.entityId` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"USER_CODE":"livechat|1|1373|211"}' \
      https://your-domain.bitrix24.ru/rest/1/webhook_key/imopenlines.dialog.get.json
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"USER_CODE":"livechat|1|1373|211","auth":"<access_token>"}' \
      https://your-domain.bitrix24.ru/rest/imopenlines.dialog.get.json
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod(
            'imopenlines.dialog.get',
            {
                USER_CODE: 'livechat|1|1373|211',
            }
        );

        const { result } = response.getData();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imopenlines.dialog.get',
                [
                    'USER_CODE' => 'livechat|1|1373|211',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error getting dialog: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imopenlines.dialog.get',
        {
            USER_CODE: 'livechat|1|1373|211',
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
        'imopenlines.dialog.get',
        [
            'USER_CODE' => 'livechat|1|1373|211',
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Success: ' . print_r($result['result'], true);
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "id": 1777,
        "parent_chat_id": 0,
        "parent_message_id": 0,
        "name": "Салатовый гость №17 - Документация Битрикс24",
        "description": null,
        "owner": 27,
        "extranet": false,
        "avatar": "",
        "color": "#58cc47",
        "type": "lines",
        "counter": 0,
        "user_counter": 2,
        "message_count": 104,
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
        "last_message_id": 86313,
        "last_id": 86313,
        "marked_id": 0,
        "disk_folder_id": 0,
        "entity_type": "LINES",
        "entity_id": "livechat|22|1775|599",
        "entity_data_1": "Y|LEAD|1209|N|N|343|1773682918|0|0|0",
        "entity_data_2": "LEAD|1209|COMPANY|0|CONTACT|0|DEAL|0",
        "entity_data_3": "N",
        "mute_list": [],
        "date_create": "2026-03-13T16:50:15+03:00",
        "message_type": "L",
        "public": "",
        "role": "owner",
        "entity_link": {
            "type": "LINES",
            "url": "",
            "id": "livechat|22|1775|599"
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
                "user_id": 599,
                "user_name": "Гость",
                "message_id": 86101,
                "date": null
            }
        ],
        "manager_list": [27],
        "last_message_views": {
            "message_id": 86313,
            "first_viewers": [
                {
                    "user_id": 27,
                    "user_name": "Светлана Иванова",
                    "date": "2026-03-16T20:50:37+03:00"
                }
            ],
            "count_of_viewers": 0
        },
        "dialog_id": "chat1777"
    },
    "time": {
        "start": 1773683678,
        "finish": 1773683678.423382,
        "duration": 0.423382043838501,
        "processing": 0,
        "date_start": "2026-03-16T20:54:38+03:00",
        "date_finish": "2026-03-16T20:54:38+03:00",
        "operating_reset_at": 1773684278,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект данных чата [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор чата ||
|| **parent_chat_id**
[`integer`](../../../data-types.md) | Идентификатор родительского чата ||
|| **parent_message_id**
[`integer`](../../../data-types.md) | Идентификатор родительского сообщения ||
|| **name**
[`string`](../../../data-types.md) | Название чата ||
|| **description**
[`string`](../../../data-types.md) | Описание чата или `null` ||
|| **owner**
[`integer`](../../../data-types.md) | Идентификатор владельца чата ||
|| **extranet**
[`boolean`](../../../data-types.md) | Признак экстранет-чата ||
|| **avatar**
[`string`](../../../data-types.md) | URL аватара чата или пустая строка ||
|| **color**
[`string`](../../../data-types.md) | Цвет чата в формате HEX ||
|| **dialog_id**
[`string`](../../../data-types.md) | Идентификатор диалога в формате `chat<ID>` ||
|| **type**
[`string`](../../../data-types.md) | Тип чата, для открытых линий значение `lines` ||
|| **counter**
[`integer`](../../../data-types.md) | Количество непрочитанных сообщений для текущего пользователя ||
|| **user_counter**
[`integer`](../../../data-types.md) | Количество участников, у которых есть непрочитанные сообщения ||
|| **message_count**
[`integer`](../../../data-types.md) | Общее количество сообщений в чате ||
|| **unread_id**
[`integer`](../../../data-types.md) | Идентификатор первого непрочитанного сообщения или `0` ||
|| **restrictions**
[`object`](../../../data-types.md) | Права на действия с чатом [(подробное описание)](#restrictions) ||
|| **last_message_id**
[`integer`](../../../data-types.md) | Идентификатор последнего сообщения ||
|| **last_id**
[`integer`](../../../data-types.md) | Служебный идентификатор последнего сообщения ||
|| **marked_id**
[`integer`](../../../data-types.md) | Идентификатор помеченного сообщения или `0` ||
|| **disk_folder_id**
[`integer`](../../../data-types.md) | Идентификатор папки Диска для файлов чата ||
|| **entity_type**
[`string`](../../../data-types.md) | Тип канала чата, для открытых линий значение `LINES` ||
|| **entity_id**
[`string`](../../../data-types.md) | Код пользователя открытой линии в формате ```<connector>|<LINE_ID>|<CONNECTOR_CHAT_ID>|<CONNECTOR_USER_ID>```, где:
- `<connector>` — идентификатор коннектора: `livechat`, `telegram` и другие
- `<LINE_ID>` — идентификатор открытой линии
- `<CONNECTOR_CHAT_ID>` — идентификатор чата в канале
- `<CONNECTOR_USER_ID>` — идентификатор пользователя в канале ||
|| **entity_data_1**
[`string`](../../../data-types.md) | Строка с данными сессии открытой линии ||
|| **entity_data_2**
[`string`](../../../data-types.md) | Строка с привязками CRM ||
|| **entity_data_3**
[`string`](../../../data-types.md) | Дополнительный служебный флаг ||
|| **mute_list**
[`array`](../../../data-types.md) | Список идентификаторов пользователей с выключенными уведомлениями ||
|| **date_create**
[`datetime`](../../../data-types.md) | Дата и время создания чата в формате ISO 8601 (RFC3339) ||
|| **message_type**
[`string`](../../../data-types.md) | Тип сообщений в чате ||
|| **public**
[`string`](../../../data-types.md) | Публичный флаг чата ||
|| **role**
[`string`](../../../data-types.md) | Роль текущего пользователя в чате ||
|| **entity_link**
[`object`](../../../data-types.md) | Связь с каналом внешней системы [(подробное описание)](#entity-link) ||
|| **text_field_enabled**
[`boolean`](../../../data-types.md) | Доступно ли поле ввода сообщений ||
|| **background_id**
[`integer`](../../../data-types.md) | Идентификатор фона чата или `null` ||
|| **permissions**
[`object`](../../../data-types.md) | Права текущего пользователя в чате [(подробное описание)](#permissions) ||
|| **is_new**
[`boolean`](../../../data-types.md) | Признак нового чата ||
|| **readed_list**
[`array`](../../../data-types.md) | Список данных о прочтении сообщений [(подробное описание)](#readed-list) ||
|| **manager_list**
[`array`](../../../data-types.md) | Список идентификаторов операторов, назначенных менеджерами ||
|| **last_message_views**
[`object`](../../../data-types.md) | Данные о просмотре последнего сообщения [(подробное описание)](#last-message-views) ||
|#

### Объект restrictions {#restrictions}

#|
|| **Название**
`тип` | **Описание** ||
|| **avatar**
[`boolean`](../../../data-types.md) | Разрешено менять аватар чата ||
|| **rename**
[`boolean`](../../../data-types.md) | Разрешено менять название чата ||
|| **extend**
[`boolean`](../../../data-types.md) | Разрешено расширять настройки чата ||
|| **call**
[`boolean`](../../../data-types.md) | Разрешены звонки в чате ||
|| **mute**
[`boolean`](../../../data-types.md) | Разрешено выключать уведомления ||
|| **leave**
[`boolean`](../../../data-types.md) | Разрешено выходить из чата ||
|| **leave_owner**
[`boolean`](../../../data-types.md) | Разрешено выходить владельцу чата ||
|| **send**
[`boolean`](../../../data-types.md) | Разрешено отправлять сообщения ||
|| **user_list**
[`boolean`](../../../data-types.md) | Разрешено просматривать список участников ||
|#

### Объект entityLink {#entity-link}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../../data-types.md) | Тип канала, для открытых линий значение `LINES` ||
|| **url**
[`string`](../../../data-types.md) | Ссылка на внешний объект канала или пустая строка ||
|| **id**
[`string`](../../../data-types.md) | Внешний идентификатор диалога в канале ||
|#

### Объект permissions {#permissions}

#|
|| **Название**
`тип` | **Описание** ||
|| **manage_users_add**
[`string`](../../../data-types.md) | Право на добавление участников ||
|| **manage_users_delete**
[`string`](../../../data-types.md) | Право на удаление участников ||
|| **manage_ui**
[`string`](../../../data-types.md) | Право на управление интерфейсом чата ||
|| **manage_settings**
[`string`](../../../data-types.md) | Право на управление настройками чата ||
|| **manage_messages**
[`string`](../../../data-types.md) | Право на управление сообщениями ||
|| **can_post**
[`string`](../../../data-types.md) | Право на отправку сообщений ||
|#

### Объект readedListItem {#readed-list}

#|
|| **Название**
`тип` | **Описание** ||
|| **user_id**
[`integer`](../../../data-types.md) | Идентификатор пользователя ||
|| **user_name**
[`string`](../../../data-types.md) | Имя пользователя ||
|| **message_id**
[`integer`](../../../data-types.md) | Идентификатор последнего прочитанного сообщения ||
|| **date**
[`datetime`](../../../data-types.md) | Дата и время прочтения в формате ISO 8601 (RFC3339) или `null` ||
|#

### Объект lastMessageViews {#last-message-views}

#|
|| **Название**
`тип` | **Описание** ||
|| **message_id**
[`integer`](../../../data-types.md) | Идентификатор сообщения, для которого собрана статистика просмотров ||
|| **first_viewers**
[`array`](../../../data-types.md) | Список пользователей, которые первыми просмотрели сообщение [(подробное описание)](#first-viewer-item) ||
|| **count_of_viewers**
[`integer`](../../../data-types.md) | Количество остальных пользователей, просмотревших сообщение ||
|#

### Объект firstViewerItem {#first-viewer-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **user_id**
[`integer`](../../../data-types.md) | Идентификатор пользователя ||
|| **user_name**
[`string`](../../../data-types.md) | Имя пользователя ||
|| **date**
[`datetime`](../../../data-types.md) | Дата и время просмотра в формате ISO 8601 (RFC3339) ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_ERROR",
    "error_description": "You do not have access to the specified dialog"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ACCESS_ERROR` | You do not have access to the specified dialog | Диалог не найден или нет доступа к нему ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imopenlines-session-open.md)
- [{#T}](./imopenlines-session-start.md)
- [{#T}](./imopenlines-session-join.md)
- [{#T}](./imopenlines-session-history-get.md)
- [{#T}](./imopenlines-session-intercept.md)
- [{#T}](./imopenlines-session-mode-pin.md)
- [{#T}](./imopenlines-session-mode-pin-all.md)
- [{#T}](./imopenlines-session-mode-unpin-all.md)
- [{#T}](./imopenlines-session-mode-silent.md)
- [{#T}](./imopenlines-session-head-vote.md)
- [{#T}](./imopenlines-message-session-start.md)
- [{#T}](./imopenlines-crm-lead-create.md)
