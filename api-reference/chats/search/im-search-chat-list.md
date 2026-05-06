# Найти чаты im.search.chat.list

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.search.chat.list` выполняет поиск чатов, к которым текущий пользователь имеет доступ. Поиск выполняется по заголовку, имени и фамилии участников чата.

Результаты сортируются в порядке убывания идентификаторов.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **FIND**
[`string`](../../data-types.md) | Поисковая фраза для поиска по индексируемым данным чата. Минимальное количество символов для поиска — `3` ||
|| **FIND_LINES**
[`string`](../../data-types.md) | Поисковая фраза для поиска чатов среди Открытых линий. Минимальное количество символов для поиска — `3` ||
|| **OFFSET**
[`integer`](../../data-types.md) | Смещение выборки чатов. По умолчанию `0` ||
|| **LIMIT**
[`integer`](../../data-types.md) | Количество элементов в выборке. По умолчанию `10`. Максимальное значение `50` ||
|#

{% note info "" %}

Нужно передать хотя бы один параметр: `FIND` или `FIND_LINES`.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"FIND":"Проект","FIND_LINES":"Линия","OFFSET":0,"LIMIT":10}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.search.chat.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"FIND":"Проект","FIND_LINES":"Линия","OFFSET":0,"LIMIT":10,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.search.chat.list
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('im.search.chat.list', {
        FIND: 'Проект',
        FIND_LINES: 'Линия',
        OFFSET: 0,
        LIMIT: 10,
      });

      const { result, total, next } = response.getData();
      console.log(result, total, next);
    } catch (error) {
      console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service->core->call(
            'im.search.chat.list',
            [
                'FIND' => 'Проект',
                'FIND_LINES' => 'Линия',
                'OFFSET' => 0,
                'LIMIT' => 10,
            ]
        );

        $result = $response->getResponseData()->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            var_dump($result->data());
        }
    } catch (Throwable $exception) {
        echo $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.search.chat.list',
        {
            FIND: 'Проект',
            FIND_LINES: 'Линия',
            OFFSET: 0,
            LIMIT: 10,
        },
        function(result) {
            if (result.error()) {
                console.error(result.error().ex);
            } else {
                console.log(result.data(), result.total(), result.next());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'im.search.chat.list',
        [
            'FIND' => 'Проект',
            'FIND_LINES' => 'Линия',
            'OFFSET' => 0,
            'LIMIT' => 10,
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        var_dump($result['result']);
    }
    ```
{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": [
        {
            "id": 1137,
            "parent_chat_id": 0,
            "parent_message_id": 0,
            "name": "Проект: \"разработка шаблона\"",
            "description": null,
            "owner": 27,
            "extranet": false,
            "avatar": "",
            "color": "#3e99ce",
            "type": "sonetGroup",
            "counter": 0,
            "user_counter": 2,
            "message_count": 4,
            "unread_id": 0,
            "restrictions": {
                "avatar": false,
                "rename": false,
                "extend": false,
                "call": true,
                "mute": true,
                "leave": false,
                "leave_owner": false,
                "send": true,
                "user_list": true,
                "path": "/workgroups/group/#ID#/",
                "path_title": "Перейти в группу"
            },
            "last_message_id": 80461,
            "last_id": 80461,
            "marked_id": 0,
            "disk_folder_id": 0,
            "entity_type": "SONET_GROUP",
            "entity_id": "121",
            "entity_data_1": "",
            "entity_data_2": "",
            "entity_data_3": "",
            "mute_list": [],
            "date_create": "2024-07-26T15:28:02+03:00",
            "message_type": "C",
            "public": "",
            "role": "owner",
            "entity_link": {
                "type": "SONET_GROUP",
                "url": "/workgroups/group/121/",
                "id": "121"
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
            "is_new": false
        },
        ... // описание для каждого чата
    ],
    "total": 2,
    "time": {
        "start": 1772645157,
        "finish": 1772645157.558317,
        "duration": 0.5583169460296631,
        "processing": 0,
        "date_start": "2026-03-04T20:25:57+03:00",
        "date_finish": "2026-03-04T20:25:57+03:00",
        "operating_reset_at": 1772645757,
        "operating": 0
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Список найденных чатов.

Структура объекта чата подробно описана [ниже](#chat-object) ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных чатов ||
|| **next**
[`integer`](../../data-types.md) | Смещение следующей страницы. Поле возвращается, если есть следующая страница ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект чата {#chat-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор чата ||
|| **parent_chat_id**
[`integer`](../../data-types.md) | Идентификатор родительского чата ||
|| **parent_message_id**
[`integer`](../../data-types.md) | Идентификатор родительского сообщения ||
|| **name**
[`string`](../../data-types.md) | Название чата ||
|| **description**
[`string`](../../data-types.md)
[`null`](../../data-types.md) | Описание чата ||
|| **owner**
[`integer`](../../data-types.md) | Идентификатор владельца чата ||
|| **extranet**
[`boolean`](../../data-types.md) | Признак участия экстранет-пользователей ||
|| **avatar**
[`string`](../../data-types.md)
[`null`](../../data-types.md) | Ссылка на аватар чата ||
|| **color**
[`string`](../../data-types.md) | Цвет чата в формате HEX ||
|| **type**
[`string`](../../data-types.md) | Тип чата ||
|| **counter**
[`integer`](../../data-types.md) | Значение счетчика непрочитанных сообщений для текущего пользователя ||
|| **user_counter**
[`integer`](../../data-types.md) | Количество участников чата ||
|| **message_count**
[`integer`](../../data-types.md) | Количество сообщений чата ||
|| **unread_id**
[`integer`](../../data-types.md) | Идентификатор первого непрочитанного сообщения ||
|| **restrictions**
[`object`](../../data-types.md) | Ограничения действий в чате.

Структура объекта подробно описана [ниже](#restrictions-object) ||
|| **last_message_id**
[`integer`](../../data-types.md) | Идентификатор последнего сообщения ||
|| **last_id**
[`integer`](../../data-types.md) | Идентификатор последнего сообщения в чате, которое отмечено как прочитанное текущим пользователем ||
|| **marked_id**
[`integer`](../../data-types.md) | Идентификатор помеченного сообщения ||
|| **disk_folder_id**
[`integer`](../../data-types.md) | Идентификатор папки Диска, которая связана с чатом ||
|| **entity_type**
[`string`](../../data-types.md) | Тип объекта, к которому привязан чат ||
|| **entity_id**
[`string`](../../data-types.md) | Идентификатор объекта, к которому привязан чат ||
|| **entity_data_1**
[`string`](../../data-types.md) | Дополнительные данные объекта чата — поле 1 ||
|| **entity_data_2**
[`string`](../../data-types.md) | Дополнительные данные объекта чата — поле 2 ||
|| **entity_data_3**
[`string`](../../data-types.md) | Дополнительные данные объекта чата — поле 3 ||
|| **mute_list**
[`array`](../../data-types.md)
[`object`](../../data-types.md) | Список пользователей с выключенными уведомлениями ||
|| **date_create**
[`string`](../../data-types.md) | Дата создания чата в формате ISO 8601 (RFC3339) ||
|| **message_type**
[`string`](../../data-types.md) | Тип сообщения чата из поля `TYPE` таблицы чатов ||
|| **public**
[`object`](../../data-types.md)
[`string`](../../data-types.md) | Публичные данные чата.

Структура объекта подробно описана [ниже](#public-object) ||
|| **role**
[`string`](../../data-types.md) | Роль текущего пользователя в чате ||
|| **entity_link**
[`object`](../../data-types.md) | Ссылка на связанный объект чата.

Структура объекта подробно описана [ниже](#entity-link-object) ||
|| **text_field_enabled**
[`boolean`](../../data-types.md) | Признак доступности поля ввода текста ||
|| **background_id**
[`integer`](../../data-types.md)
[`null`](../../data-types.md) | Идентификатор фона чата ||
|| **permissions**
[`object`](../../data-types.md) | Права текущего пользователя.

Структура объекта подробно описана [ниже](#permissions-object) ||
|| **is_new**
[`boolean`](../../data-types.md) | Признак нового чата ||
|#

### Объект restrictions {#restrictions-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **avatar**
[`boolean`](../../data-types.md) | Разрешено менять аватар чата ||
|| **rename**
[`boolean`](../../data-types.md) | Разрешено менять название чата ||
|| **extend**
[`boolean`](../../data-types.md) | Разрешено расширять функциональность чата ||
|| **call**
[`boolean`](../../data-types.md) | Разрешены звонки в чате ||
|| **mute**
[`boolean`](../../data-types.md) | Разрешено отключать уведомления чата ||
|| **leave**
[`boolean`](../../data-types.md) | Разрешено выйти из чата ||
|| **leave_owner**
[`boolean`](../../data-types.md) | Разрешено выйти из чата владельцу ||
|| **send**
[`boolean`](../../data-types.md) | Разрешено отправлять сообщения ||
|| **user_list**
[`boolean`](../../data-types.md) | Доступен просмотр списка участников ||
|| **path**
[`string`](../../data-types.md) | Системный путь для перехода к связанному объекту, например к рабочей группе ||
|| **path_title**
[`string`](../../data-types.md) | Текст ссылки для перехода по `path`. Поле доступно вместе с `path` ||
|#

### Объект public {#public-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **code**
[`string`](../../data-types.md) | Публичный код чата ||
|| **link**
[`string`](../../data-types.md) | Публичная ссылка на чат ||
|#

### Объект entity_link {#entity-link-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **type**
[`string`](../../data-types.md) | Тип связанного объекта ||
|| **url**
[`string`](../../data-types.md) | URL связанного объекта ||
|| **id**
[`string`](../../data-types.md)
[`integer`](../../data-types.md) | Идентификатор связанного объекта ||
|#

### Объект permissions {#permissions-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **manage_users_add**
[`string`](../../data-types.md) | Право добавлять пользователей ||
|| **manage_users_delete**
[`string`](../../data-types.md) | Право удалять пользователей ||
|| **manage_ui**
[`string`](../../data-types.md) | Право управлять интерфейсными настройками ||
|| **manage_settings**
[`string`](../../data-types.md) | Право управлять настройками чата ||
|| **manage_messages**
[`string`](../../data-types.md) | Право управлять сообщениями ||
|| **can_post**
[`string`](../../data-types.md) | Право писать сообщения ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "FIND_SHORT",
    "error_description": "Too short a search phrase."
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `FIND_SHORT` | Too short a search phrase | Не передан ни один поисковый параметр или фраза меньше трех символов ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-search-department-list.md)
- [{#T}](./im-search-user-list.md)
- [{#T}](./im-search-last-add.md)
- [{#T}](./im-search-last-get.md)
- [{#T}](./im-search-last-delete.md)
