# Получить сокращенный список последних чатов im.recent.get

> Scope: [`im`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.recent.get` получает список последних чатов пользователя.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **SKIP_OPENLINES**
[`string`](../data-types.md) | Пропустить чаты открытых линий.

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **SKIP_CHAT**
[`string`](../data-types.md) | Пропустить групповые чаты.

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **SKIP_DIALOG**
[`string`](../data-types.md) | Пропустить диалоги один-на-один.

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **LAST_UPDATE**
[`datetime`](../data-types.md) | Сделать выборку с указанной даты в формате [ATOM](https://www.php.net/manual/ru/class.datetimeinterface.php#datetimeinterface.constants.atom) (ISO-8601) ||
|| **ONLY_OPENLINES**
[`string`](../data-types.md) | Выбрать только чаты открытых линий.

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **LAST_SYNC_DATE**
[`datetime`](../data-types.md) | Дата предыдущей выборки в формате [ATOM](https://www.php.net/manual/ru/class.datetimeinterface.php#datetimeinterface.constants.atom) (ISO-8601) для загрузки изменений, которые произошли в списке с указанной даты.

Выборка возвращает данные не старше 7 дней ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"SKIP_OPENLINES":"Y","LAST_UPDATE":"2026-02-25T18:30:00+01:00"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.recent.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"SKIP_OPENLINES":"Y","LAST_UPDATE":"2026-02-25T18:30:00+01:00","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.recent.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.recent.get',
            {
                SKIP_OPENLINES: 'Y',
                LAST_UPDATE: '2026-02-25T18:30:00+01:00'
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
                'im.recent.get',
                [
                    'SKIP_OPENLINES' => 'Y',
                    'LAST_UPDATE' => '2026-02-25T18:30:00+01:00',
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
        'im.recent.get',
        {
            SKIP_OPENLINES: 'Y',
            LAST_UPDATE: '2026-02-25T18:30:00+01:00'
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
        'im.recent.get',
        [
            'SKIP_OPENLINES' => 'Y',
            'LAST_UPDATE' => '2026-02-25T18:30:00+01:00',
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
    "result": [
        {
            "id": "chat1451",
            "chat_id": 1451,
            "type": "chat",
            "avatar": {
                "url": "",
                "color": "#df532d"
            },
            "title": "Максимально полный шаблон задачи",
            "message": {
                "id": 84501,
                "text": "Иван Иванов создал задачу [Вложение]",
                "file": false,
                "author_id": 0,
                "attach": true,
                "sticker": null,
                "date": "2026-02-26T00:01:26+03:00",
                "status": "received",
                "uuid": null
            },
            "counter": 0,
            "last_id": 84501,
            "pinned": false,
            "unread": false,
            "has_reminder": false,
            "date_update": "2026-02-26T00:01:26+03:00",
            "date_last_activity": "2026-02-26T00:01:26+03:00",
            "chat": {
                "id": 1451,
                "parent_chat_id": 0,
                "parent_message_id": 0,
                "name": "Максимально полный шаблон задачи",
                "owner": 503,
                "extranet": false,
                "contains_collaber": false,
                "avatar": "",
                "color": "#df532d",
                "type": "tasksTask",
                "entity_type": "TASKS_TASK",
                "entity_id": "8293",
                "entity_data_1": "",
                "entity_data_2": "",
                "entity_data_3": "",
                "mute_list": [],
                "manager_list": [
                    503
                ],
                "date_create": "2026-02-26T00:01:26+03:00",
                "message_type": "X",
                "user_counter": 4,
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
                "role": "OWNER",
                "text_field_enabled": true,
                "background_id": null,
                "entity_link": {
                    "type": "TASKS",
                    "url": "/company/personal/user/503/tasks/task/view/8293/?ta_sec=chat_tasks&ta_el=view_button",
                    "id": "8293"
                },
                "permissions": {
                    "manage_users_add": "member",
                    "manage_users_delete": "manager",
                    "manage_ui": "member",
                    "manage_settings": "owner",
                    "manage_messages": "member",
                    "can_post": "member"
                },
                "public": ""
            },
            "user": {
                "id": 0
            },
            "options": []
        },
        {
            "id": "chat1449",
            "chat_id": 1449,
            "type": "chat",
            "avatar": {
                "url": "",
                "color": "#ab7761"
            },
            "title": "Максимально полный шаблон задачи",
            "message": {
                "id": 84499,
                "text": "Иван Иванов создал задачу [Вложение]",
                "file": false,
                "author_id": 0,
                "attach": true,
                "sticker": null,
                "date": "2026-02-26T00:01:25+03:00",
                "status": "received",
                "uuid": null
            },
            "counter": 0,
            "last_id": 84499,
            "pinned": false,
            "unread": false,
            "has_reminder": false,
            "date_update": "2026-02-26T00:01:25+03:00",
            "date_last_activity": "2026-02-26T00:01:25+03:00",
            "chat": {
                "id": 1449,
                "parent_chat_id": 0,
                "parent_message_id": 0,
                "name": "Максимально полный шаблон задачи",
                "owner": 503,
                "extranet": false,
                "contains_collaber": false,
                "avatar": "",
                "color": "#ab7761",
                "type": "tasksTask",
                "entity_type": "TASKS_TASK",
                "entity_id": "8291",
                "entity_data_1": "",
                "entity_data_2": "",
                "entity_data_3": "",
                "mute_list": [],
                "manager_list": [
                    503
                ],
                "date_create": "2026-02-26T00:01:25+03:00",
                "message_type": "X",
                "user_counter": 4,
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
                "role": "OWNER",
                "text_field_enabled": true,
                "background_id": null,
                "entity_link": {
                    "type": "TASKS",
                    "url": "/company/personal/user/503/tasks/task/view/8291/?ta_sec=chat_tasks&ta_el=view_button",
                    "id": "8291"
                },
                "permissions": {
                    "manage_users_add": "member",
                    "manage_users_delete": "manager",
                    "manage_ui": "member",
                    "manage_settings": "owner",
                    "manage_messages": "member",
                    "can_post": "member"
                },
                "public": ""
            },
            "user": {
                "id": 0
            },
            "options": []
        }
    ],
    "time": {
        "start": 1772086038,
        "finish": 1772086038.652287,
        "duration": 0.6522870063781738,
        "processing": 0,
        "date_start": "2026-02-26T09:07:18+03:00",
        "date_finish": "2026-02-26T09:07:18+03:00",
        "operating_reset_at": 1772086638,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Список последних диалогов [(подробное описание)](#result-item) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result-item {#result-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../data-types.md) | Идентификатор диалога: число для пользователя, `chatXXX` для чата ||
|| **type**
[`string`](../data-types.md) | Тип записи: `user` для пользователя, `chat` для чата ||
|| **avatar**
[`object`](../data-types.md) | Объект описания аватара записи [(подробное описание)](#avatar) ||
|| **title**
[`string`](../data-types.md) | Заголовок записи: имя и фамилия для пользователя, название чата для чата ||
|| **message**
[`object`](../data-types.md) | Объект описания последнего сообщения [(подробное описание)](#message) ||
|| **counter**
[`integer`](../data-types.md) | Счетчик непрочитанных сообщений ||
|| **chat_id**
[`integer`](../data-types.md) | Идентификатор чата ||
|| **last_id**
[`integer`](../data-types.md) | Идентификатор последнего прочитанного сообщения ||
|| **pinned**
[`boolean`](../data-types.md) | Признак закрепленного диалога ||
|| **unread**
[`boolean`](../data-types.md) | Признак ручной отметки «не прочитано» ||
|| **has_reminder**
[`boolean`](../data-types.md) | Признак установленного напоминания ||
|| **date_update**
[`datetime`](../data-types.md) | Дата обновления записи в списке recent в формате ATOM ||
|| **date_last_activity**
[`datetime`](../data-types.md) | Дата последней активности в диалоге в формате ATOM ||
|| **user**
[`object`](../data-types.md) | Объект описания пользователя. Недоступен для записей типа `chat`. [(подробное описание)](#user) ||
|| **chat**
[`object`](../data-types.md) | Объект описания чата. Недоступен для записей типа `user`. [(подробное описание)](#chat) ||
|| **options**
[`array`](../data-types.md) | Дополнительные параметры записи ||
|#

#### Объект avatar {#avatar}

#|
|| **Название**
`тип` | **Описание** ||
|| **url**
[`string`](../data-types.md) | Ссылка на аватар. Если пусто, аватар не задан ||
|| **color**
[`string`](../data-types.md) | Цвет диалога в формате HEX ||
|#

#### Объект message {#message}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор сообщения ||
|| **text**
[`string`](../data-types.md) | Текст сообщения без BB-кодов и переносов строк ||
|| **file**
[`boolean`](../data-types.md) | Признак наличия файлов ||
|| **attach**
[`boolean`](../data-types.md) | Признак наличия вложений ||
|| **author_id**
[`integer`](../data-types.md) | Идентификатор автора сообщения ||
|| **date**
[`datetime`](../data-types.md) | Дата сообщения в формате ATOM ||
|| **sticker**
[`integer`](../data-types.md) | Идентификатор стикера. Если стикера нет, значение `null` ||
|| **status**
[`string`](../data-types.md) | Статус доставки сообщения ||
|| **uuid**
[`string`](../data-types.md) | Внешний идентификатор сообщения. Если не задан, значение `null` ||
|#

#### Объект user {#user}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор пользователя ||
|| **name**
[`string`](../data-types.md) | Имя и фамилия пользователя ||
|| **first_name**
[`string`](../data-types.md) | Имя пользователя ||
|| **last_name**
[`string`](../data-types.md) | Фамилия пользователя ||
|| **work_position**
[`string`](../data-types.md) | Должность пользователя ||
|| **color**
[`string`](../data-types.md) | Цвет пользователя в формате HEX ||
|| **avatar**
[`string`](../data-types.md) | Ссылка на аватар. Если пусто, аватар не задан ||
|| **gender**
[`string`](../data-types.md) | Пол пользователя ||
|| **birthday**
[`string`](../data-types.md) | День рождения в формате `DD-MM`. Если пусто, не задан ||
|| **extranet**
[`boolean`](../data-types.md) | Признак внешнего экстранет-пользователя ||
|| **network**
[`boolean`](../data-types.md) | Признак пользователя Битрикс24.Network ||
|| **bot**
[`boolean`](../data-types.md) | Признак бота ||
|| **connector**
[`boolean`](../data-types.md) | Признак пользователя открытых линий ||
|| **external_auth_id**
[`string`](../data-types.md) | Код внешней авторизации ||
|| **status**
[`string`](../data-types.md) | Выбранный статус пользователя ||
|| **idle**
[`datetime`](../data-types.md) | Дата, когда пользователь отошел от компьютера, в формате ATOM. Если не задано, `false` ||
|| **last_activity_date**
[`datetime`](../data-types.md) | Дата последнего действия пользователя в формате ATOM ||
|| **mobile_last_date**
[`datetime`](../data-types.md) | Дата последнего действия в мобильном приложении в формате ATOM. Если не задано, `false` ||
|| **absent**
[`datetime`](../data-types.md) | Дата, по какое число у пользователя отпуск, в формате ATOM. Если не задано, `false` ||
|#

#### Объект chat {#chat}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор чата ||
|| **title**
[`string`](../data-types.md) | Название чата ||
|| **name**
[`string`](../data-types.md) | Название чата (поле из ответа) ||
|| **owner**
[`integer`](../data-types.md) | Идентификатор владельца чата ||
|| **extranet**
[`boolean`](../data-types.md) | Признак участия в чате внешнего экстранет-пользователя ||
|| **parent_chat_id**
[`integer`](../data-types.md) | Идентификатор родительского чата ||
|| **parent_message_id**
[`integer`](../data-types.md) | Идентификатор родительского сообщения ||
|| **contains_collaber**
[`boolean`](../data-types.md) | Признак участия коллаб-пользователей ||
|| **color**
[`string`](../data-types.md) | Цвет чата в формате HEX ||
|| **avatar**
[`string`](../data-types.md) | Ссылка на аватар. Если пусто, аватар не задан ||
|| **type**
[`string`](../data-types.md) | Тип чата: групповой, для звонка, открытой линии и так далее ||
|| **entity_type**
[`string`](../data-types.md) | Внешний код для чата: тип ||
|| **entity_id**
[`string`](../data-types.md) | Внешний код для чата: идентификатор ||
|| **entity_data_1**
[`string`](../data-types.md) | Внешние данные для чата ||
|| **entity_data_2**
[`string`](../data-types.md) | Внешние данные для чата ||
|| **entity_data_3**
[`string`](../data-types.md) | Внешние данные для чата ||
|| **date_create**
[`datetime`](../data-types.md) | Дата создания чата в формате ATOM ||
|| **message_type**
[`string`](../data-types.md) | Тип сообщений чата ||
|| **mute_list**
[`array`](../data-types.md) | Список пользователей, отключивших уведомления ||
|| **manager_list**
[`array`](../data-types.md) | Список идентификаторов менеджеров чата ||
|| **user_counter**
[`integer`](../data-types.md) | Количество участников чата ||
|| **restrictions**
[`object`](../data-types.md) | Ограничения действий в чате [(подробное описание)](#chat-restrictions) ||
|| **role**
[`string`](../data-types.md) | Роль текущего пользователя в чате ||
|| **text_field_enabled**
[`boolean`](../data-types.md) | Доступность поля ввода сообщений ||
|| **background_id**
[`integer`](../data-types.md) | Идентификатор фона чата. Если не задан, значение `null` ||
|| **entity_link**
[`object`](../data-types.md) | Ссылка на связанный объект [(подробное описание)](#chat-entity-link) ||
|| **permissions**
[`object`](../data-types.md) | Права действий в чате [(подробное описание)](#chat-permissions) ||
|| **public**
[`string`](../data-types.md) | Признак публичности чата ||
|#

#### Объект restrictions {#chat-restrictions}

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
|#

#### Объект entity_link {#chat-entity-link}

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

#### Объект permissions {#chat-permissions}

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

## Обработка ошибок

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-recent-list.md)
- [{#T}](./im-dialog-get.md)
- [{#T}](./im-counters-get.md)
