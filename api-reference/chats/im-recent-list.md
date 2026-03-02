# Получить список чатов im.recent.list

> Scope: [`im`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.recent.list` получает список последних диалогов пользователя с поддержкой пагинации.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **SKIP_OPENLINES**
[`string`](../data-types.md) | Пропускать чаты открытых линий.

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **SKIP_DIALOG**
[`string`](../data-types.md) | Пропускать диалоги один-на-один.

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **SKIP_CHAT**
[`string`](../data-types.md) | Пропускать групповые чаты.

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **LAST_MESSAGE_DATE**
[`datetime`](../data-types.md) | Дата последнего элемента предыдущей выборки в формате [ATOM](https://www.php.net/manual/ru/class.datetimeinterface.php#datetimeinterface.constants.atom) (ISO-8601) ||
|| **UNREAD_ONLY**
[`string`](../data-types.md) | Возвращать только диалоги с непрочитанными сообщениями.

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **PARSE_TEXT**
[`string`](../data-types.md) | Парсить текст последнего сообщения.

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **GET_ORIGINAL_TEXT**
[`string`](../data-types.md) | Вернуть оригинальный текст сообщения без преобразований.

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **SKIP_UNDISTRIBUTED_OPENLINES**
[`string`](../data-types.md) | Пропускать нераспределенные чаты открытых линий.

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **ONLY_COPILOT**
[`string`](../data-types.md) | Возвращать только чаты BitrixGPT.

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **ONLY_CHANNEL**
[`string`](../data-types.md) | Возвращать только каналы.

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **CAN_MANAGE_MESSAGES**
[`string`](../data-types.md) | Возвращать только чаты с правом управления сообщениями.

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **OFFSET**
[`integer`](../data-types.md) | Смещение для постраничной выборки. По умолчанию: `0` ||
|| **LIMIT**
[`integer`](../data-types.md) | Количество элементов на страницу. По умолчанию: `50`. Максимальное значение: `200` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"LAST_MESSAGE_DATE":"2026-02-25T18:30:00+03:00","SKIP_OPENLINES":"N","SKIP_DIALOG":"N","SKIP_CHAT":"N","UNREAD_ONLY":"Y","PARSE_TEXT":"Y","GET_ORIGINAL_TEXT":"N","SKIP_UNDISTRIBUTED_OPENLINES":"Y","ONLY_COPILOT":"N","ONLY_CHANNEL":"N","CAN_MANAGE_MESSAGES":"Y","OFFSET":0,"LIMIT":20}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.recent.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"LAST_MESSAGE_DATE":"2026-02-25T18:30:00+03:00","SKIP_OPENLINES":"N","SKIP_DIALOG":"N","SKIP_CHAT":"N","UNREAD_ONLY":"Y","PARSE_TEXT":"Y","GET_ORIGINAL_TEXT":"N","SKIP_UNDISTRIBUTED_OPENLINES":"Y","ONLY_COPILOT":"N","ONLY_CHANNEL":"N","CAN_MANAGE_MESSAGES":"Y","OFFSET":0,"LIMIT":20,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.recent.list
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.recent.list',
            {
                LAST_MESSAGE_DATE: '2026-02-25T18:30:00+03:00',
                SKIP_OPENLINES: 'N',
                SKIP_DIALOG: 'N',
                SKIP_CHAT: 'N',
                UNREAD_ONLY: 'Y',
                PARSE_TEXT: 'Y',
                GET_ORIGINAL_TEXT: 'N',
                SKIP_UNDISTRIBUTED_OPENLINES: 'Y',
                ONLY_COPILOT: 'N',
                ONLY_CHANNEL: 'N',
                CAN_MANAGE_MESSAGES: 'Y',
                OFFSET: 0,
                LIMIT: 20
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
                'im.recent.list',
                [
                    'LAST_MESSAGE_DATE' => '2026-02-25T18:30:00+03:00',
                    'SKIP_OPENLINES' => 'N',
                    'SKIP_DIALOG' => 'N',
                    'SKIP_CHAT' => 'N',
                    'UNREAD_ONLY' => 'Y',
                    'PARSE_TEXT' => 'Y',
                    'GET_ORIGINAL_TEXT' => 'N',
                    'SKIP_UNDISTRIBUTED_OPENLINES' => 'Y',
                    'ONLY_COPILOT' => 'N',
                    'ONLY_CHANNEL' => 'N',
                    'CAN_MANAGE_MESSAGES' => 'Y',
                    'OFFSET' => 0,
                    'LIMIT' => 20,
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
        'im.recent.list',
        {
            LAST_MESSAGE_DATE: '2026-02-25T18:30:00+03:00',
            SKIP_OPENLINES: 'N',
            SKIP_DIALOG: 'N',
            SKIP_CHAT: 'N',
            UNREAD_ONLY: 'Y',
            PARSE_TEXT: 'Y',
            GET_ORIGINAL_TEXT: 'N',
            SKIP_UNDISTRIBUTED_OPENLINES: 'Y',
            ONLY_COPILOT: 'N',
            ONLY_CHANNEL: 'N',
            CAN_MANAGE_MESSAGES: 'Y',
            OFFSET: 0,
            LIMIT: 20
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
        'im.recent.list',
        [
            'LAST_MESSAGE_DATE' => '2026-02-25T18:30:00+03:00',
            'SKIP_OPENLINES' => 'N',
            'SKIP_DIALOG' => 'N',
            'SKIP_CHAT' => 'N',
            'UNREAD_ONLY' => 'Y',
            'PARSE_TEXT' => 'Y',
            'GET_ORIGINAL_TEXT' => 'N',
            'SKIP_UNDISTRIBUTED_OPENLINES' => 'Y',
            'ONLY_COPILOT' => 'N',
            'ONLY_CHANNEL' => 'N',
            'CAN_MANAGE_MESSAGES' => 'Y',
            'OFFSET' => 0,
            'LIMIT' => 20,
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
        "items": [
            {
                "id": 547,
                "chat_id": 1231,
                "type": "user",
                "avatar": {
                    "url": "",
                    "color": "#1eb4aa"
                },
                "title": "Иван Иванов",
                "message": {
                    "id": 84415,
                    "text": "ntcn",
                    "file": false,
                    "author_id": 547,
                    "attach": false,
                    "sticker": null,
                    "date": "2026-02-25T12:07:10+03:00",
                    "status": "received",
                    "uuid": "0c3c5ad6-a1b8-4d4d-9234-f137ef862a77"
                },
                "counter": 1,
                "last_id": 82363,
                "pinned": false,
                "unread": false,
                "has_reminder": false,
                "date_update": "2026-02-25T12:07:10+03:00",
                "date_last_activity": "2026-02-25T12:07:10+03:00",
                "user": {
                    "id": 547,
                    "active": true,
                    "name": "Иван Иванов",
                    "first_name": "Иван",
                    "last_name": "Иванов",
                    "work_position": "Тестировщик",
                    "color": "#1eb4aa",
                    "avatar": "",
                    "avatar_hr": "/bitrix/js/im/images/blank.gif",
                    "gender": "M",
                    "birthday": "",
                    "extranet": false,
                    "network": false,
                    "bot": false,
                    "connector": false,
                    "external_auth_id": "socservices",
                    "status": "online",
                    "idle": false,
                    "last_activity_date": "2026-02-25T17:42:27+03:00",
                    "mobile_last_date": false,
                    "desktop_last_date": false,
                    "absent": false,
                    "departments": [
                        1,
                        667
                    ],
                    "phones": false,
                    "bot_data": null,
                    "type": "user",
                    "website": "",
                    "email": "ivan.ivanov@mysite.ru"
                },
                "chat": {
                    "text_field_enabled": true,
                    "background_id": null,
                    "mute_list": []
                },
                "options": []
            },
            {
                "id": "chat1317",
                "chat_id": 1317,
                "type": "chat",
                "avatar": {
                    "url": "https://cdn-ru.bitrix24.ru/b17053/resize_cache/54309/ff58db95aecdfa09ae61b51b5fd8f63f/im/553/5539ce72ef842ca40efd35b54322d828/7qd8lz4rsqwubjru086fst8tx6uhkxa9",
                    "color": "#4ba984"
                },
                "title": "Хочу зеленый чат",
                "message": {
                    "id": 84413,
                    "text": "ntcn",
                    "file": false,
                    "author_id": 547,
                    "attach": false,
                    "sticker": null,
                    "date": "2026-02-25T12:07:05+03:00",
                    "status": "received",
                    "uuid": "f4721d3d-68c6-473e-a899-3b96b0ee18db"
                },
                "counter": 1,
                "last_id": 82447,
                "pinned": false,
                "unread": false,
                "has_reminder": false,
                "date_update": "2026-02-25T12:07:05+03:00",
                "date_last_activity": "2026-02-25T12:07:05+03:00",
                "chat": {
                    "id": 1317,
                    "parent_chat_id": 0,
                    "parent_message_id": 0,
                    "name": "Хочу зеленый чат",
                    "owner": 547,
                    "extranet": false,
                    "contains_collaber": false,
                    "avatar": "https://cdn-ru.bitrix24.ru/b17053/resize_cache/54309/ff58db95aecdfa09ae61b51b5fd8f63f/im/553/5539ce72ef842ca40efd35b54322d828/7qd8lz4rsqwubjru086fst8tx6uhkxa9",
                    "color": "#4ba984",
                    "type": "chat",
                    "entity_type": "",
                    "entity_id": "",
                    "entity_data_1": "",
                    "entity_data_2": "",
                    "entity_data_3": "",
                    "mute_list": {
                        "503": true
                    },
                    "manager_list": [],
                    "date_create": "2025-08-12T16:14:00+03:00",
                    "message_type": "C",
                    "user_counter": 2,
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
                    "role": "MEMBER",
                    "text_field_enabled": true,
                    "background_id": null,
                    "entity_link": {
                        "type": "",
                        "url": "",
                        "id": ""
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
                    "id": 547,
                    "active": true,
                    "name": "Иван Иванов",
                    "first_name": "Иван",
                    "last_name": "Иванов",
                    "work_position": "Тестировщик",
                    "color": "#1eb4aa",
                    "avatar": "",
                    "avatar_hr": "/bitrix/js/im/images/blank.gif",
                    "gender": "M",
                    "birthday": "",
                    "extranet": false,
                    "network": false,
                    "bot": false,
                    "connector": false,
                    "external_auth_id": "socservices",
                    "status": "online",
                    "idle": false,
                    "last_activity_date": "2026-02-25T17:42:27+03:00",
                    "mobile_last_date": false,
                    "desktop_last_date": false,
                    "absent": false,
                    "departments": [
                        1,
                        667
                    ],
                    "phones": false,
                    "bot_data": null,
                    "type": "user",
                    "website": "",
                    "email": "ivan.ivanov@mysite.ru"
                },
                "options": []
            }
        ],
        "hasMorePages": false,
        "hasMore": false,
        "copilot": {
            "chats": null,
            "messages": null,
            "roles": {
                "copilot_assistant": {
                    "code": "copilot_assistant",
                    "name": "BitrixGPT",
                    "desc": "Готов отвечать на все вопросы в общем формате",
                    "avatar": {
                        "small": "https://preview.bitrix24.site/upload/ai/avatars/5f72dd53304450356e0eaf09c0fcda7b_64x64.png",
                        "medium": "https://preview.bitrix24.site/upload/ai/avatars/f62609ab98ede5b3d4bff7675cc9f1f5_128x128.png",
                        "large": "https://preview.bitrix24.site/upload/ai/avatars/0a89c642ed5f1c2a292f7c3a1eab99d3_256x256.png"
                    },
                    "default": true,
                    "prompts": [
                        {
                            "code": "universal_how_to_properly_write_a_business_letter",
                            "promptType": "default",
                            "title": "Как правильно составить деловое письмо?",
                            "text": "Как правильно составить деловое письмо?",
                            "isNew": false
                        },
                        {
                            "code": "universal_effective_methods_to_combat_procrastination_in_the_workplace",
                            "promptType": "default",
                            "title": "Как бороться с прокрастинацией?",
                            "text": "Расскажи про эффективные методы борьбы с прокрастинацией на рабочем месте",
                            "isNew": false
                        },
                        {
                            "code": "universal_ideas_on_how_to_make_meetings_more_concise_and_substantive",
                            "promptType": "default",
                            "title": "Идеи для совещаний",
                            "text": "Есть идеи, как сделать совещания более компактными и содержательными?",
                            "isNew": false
                        },
                        {
                            "code": "universal_ideas_for_short_breaks_for_physical_exercises",
                            "promptType": "default",
                            "title": "Идеи для коротких перерывов",
                            "text": "Предложи идеи для коротких перерывов на физические упражнения в офисе",
                            "isNew": false
                        }
                    ]
                },
                ... // описание других ролей
            },
            "recommendedRoles": [
                "copilot_assistant",
                "smm_manager",
                "seo_copywriter",
                "prompt_generator",
                "marketing_specialist"
            ]
        },
        "messagesAutoDeleteConfigs": []
    },
    "total": -1,
    "time": {
        "start": 1772089843,
        "finish": 1772089843.789026,
        "duration": 0.7890260219573975,
        "processing": 0,
        "date_start": "2026-02-26T10:10:43+03:00",
        "date_finish": "2026-02-26T10:10:43+03:00",
        "operating_reset_at": 1772090443,
        "operating": 0.2634410858154297
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой объект результата [(подробное описание)](#result-item) ||
|| **total**
[`integer`](../data-types.md) | Общее количество элементов. В текущей реализации обычно `-1` ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result-item {#result-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **items**
[`array`](../data-types.md) | Список последних диалогов [(подробное описание)](#items-item) ||
|| **hasMorePages**
[`boolean`](../data-types.md) | Устаревающий алиас поля `hasMore` ||
|| **hasMore**
[`boolean`](../data-types.md) | Признак наличия следующей страницы выборки ||
|| **copilot**
[`object`](../data-types.md) | Дополнительные данные для элементов BitrixGPT [(подробное описание)](#copilot) ||
|| **messagesAutoDeleteConfigs**
[`array`](../data-types.md) | Настройки автоудаления сообщений по чатам ||
|#

#### Объект items {#items-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../data-types.md) | Идентификатор диалога: число для пользователя, `chatXXX` для чата ||
|| **chat_id**
[`integer`](../data-types.md) | Идентификатор чата ||
|| **type**
[`string`](../data-types.md) | Тип записи: `user` или `chat` ||
|| **avatar**
[`object`](../data-types.md) | Объект аватара [(подробное описание)](#items-item-avatar) ||
|| **title**
[`string`](../data-types.md) | Заголовок записи: имя пользователя или название чата ||
|| **message**
[`object`](../data-types.md) | Последнее сообщение в диалоге [(подробное описание)](#items-item-message) ||
|| **counter**
[`integer`](../data-types.md) | Счетчик непрочитанных сообщений ||
|| **last_id**
[`integer`](../data-types.md) | Идентификатор последнего прочитанного сообщения ||
|| **pinned**
[`boolean`](../data-types.md) | Признак закрепленного диалога ||
|| **unread**
[`boolean`](../data-types.md) | Признак ручной метки «не прочитано» ||
|| **has_reminder**
[`boolean`](../data-types.md) | Признак установленного напоминания ||
|| **date_update**
[`datetime`](../data-types.md) | Дата последнего изменения диалога в формате ISO 8601 ||
|| **date_last_activity**
[`datetime`](../data-types.md) | Дата последней активности в диалоге в формате ISO 8601 ||
|| **user**
[`object`](../data-types.md) | Данные пользователя [(подробное описание)](#items-item-user) ||
|| **chat**
[`object`](../data-types.md) | Данные чата [(подробное описание)](#items-item-chat) ||
|| **lines**
[`object`](../data-types.md) | Данные открытой линии [(подробное описание)](#items-item-lines) ||
|| **options**
[`array`](../data-types.md) | Дополнительные параметры записи ||
|#

#### Объект avatar {#items-item-avatar}

#|
|| **Название**
`тип` | **Описание** ||
|| **url**
[`string`](../data-types.md) | Ссылка на аватар. Если пусто, аватар не задан ||
|| **color**
[`string`](../data-types.md) | Цвет диалога в формате HEX ||
|#

#### Объект message {#items-item-message}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор сообщения ||
|| **text**
[`string`](../data-types.md) | Текст сообщения ||
|| **file**
[`boolean`](../data-types.md) | Признак наличия файлов ||
|| **author_id**
[`integer`](../data-types.md) | Идентификатор автора сообщения ||
|| **attach**
[`boolean`](../data-types.md) | Признак наличия вложений ||
|| **date**
[`datetime`](../data-types.md) | Дата сообщения в формате ATOM ||
|| **status**
[`string`](../data-types.md) | Статус доставки сообщения ||
|| **sticker**
[`integer`](../data-types.md) | Идентификатор стикера. Если стикера нет, значение `null` ||
|| **uuid**
[`string`](../data-types.md) | Внешний идентификатор сообщения. Если не задан, значение `null` ||
|#

#### Объект user {#items-item-user}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор пользователя ||
|| **active**
[`boolean`](../data-types.md) | Признак активного пользователя ||
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
[`string`](../data-types.md) | Ссылка на аватар ||
|| **avatar_hr**
[`string`](../data-types.md) | Ссылка на avatar высокого разрешения ||
|| **gender**
[`string`](../data-types.md) | Пол пользователя ||
|| **birthday**
[`string`](../data-types.md) | День рождения в формате `DD-MM` или пустая строка ||
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
[`string`](../data-types.md) | Статус пользователя ||
|| **idle**
[`datetime`](../data-types.md) | Дата, когда пользователь отошел от компьютера. Если не задано, `false` ||
|| **last_activity_date**
[`datetime`](../data-types.md) | Дата последней активности пользователя ||
|| **mobile_last_date**
[`datetime`](../data-types.md) | Дата последней активности в мобильном приложении. Если не задано, `false` ||
|| **desktop_last_date**
[`datetime`](../data-types.md) | Дата последней активности в десктоп-приложении. Если не задано, `false` ||
|| **absent**
[`datetime`](../data-types.md) | Дата отпуска пользователя. Если не задано, `false` ||
|| **departments**
[`array`](../data-types.md) | Список идентификаторов отделов пользователя ||
|| **phones**
[`object`](../data-types.md) | Контактные телефоны пользователя. Может быть `false` ||
|| **bot_data**
[`object`](../data-types.md) | Данные бота. Для обычного пользователя может быть `null` ||
|| **type**
[`string`](../data-types.md) | Тип пользователя ||
|| **website**
[`string`](../data-types.md) | Сайт пользователя ||
|| **email**
[`string`](../data-types.md) | Email пользователя ||
|#

#### Объект chat {#items-item-chat}

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
|| **owner**
[`integer`](../data-types.md) | Идентификатор владельца чата ||
|| **extranet**
[`boolean`](../data-types.md) | Признак участия внешнего экстранет-пользователя ||
|| **contains_collaber**
[`boolean`](../data-types.md) | Признак участия коллаб-пользователей ||
|| **avatar**
[`string`](../data-types.md) | Ссылка на аватар. Если пусто, аватар не задан ||
|| **color**
[`string`](../data-types.md) | Цвет чата в формате HEX ||
|| **type**
[`string`](../data-types.md) | Тип чата ||
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
|| **manager_list**
[`array`](../data-types.md) | Список идентификаторов менеджеров чата ||
|| **date_create**
[`datetime`](../data-types.md) | Дата создания чата в формате ATOM ||
|| **message_type**
[`string`](../data-types.md) | Тип сообщений чата ||
|| **user_counter**
[`integer`](../data-types.md) | Количество участников чата ||
|| **restrictions**
[`object`](../data-types.md) | Ограничения действий в чате [(подробное описание)](#items-item-chat-restrictions) ||
|| **role**
[`string`](../data-types.md) | Роль текущего пользователя в чате ||
|| **text_field_enabled**
[`boolean`](../data-types.md) | Доступность поля ввода сообщений ||
|| **background_id**
[`integer`](../data-types.md) | Идентификатор фона чата. Если не задан, значение `null` ||
|| **entity_link**
[`object`](../data-types.md) | Ссылка на связанный объект [(подробное описание)](#items-item-chat-entity-link) ||
|| **permissions**
[`object`](../data-types.md) | Права действий в чате [(подробное описание)](#items-item-chat-permissions) ||
|| **public**
[`string`](../data-types.md) | Признак публичности чата ||
|#

#### Объект lines {#items-item-lines}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор открытой линии ||
|| **status**
[`integer`](../data-types.md) | Статус открытой линии ||
|| **date_create**
[`datetime`](../data-types.md) | Дата создания открытой линии в формате ATOM ||
|#

#### Объект restrictions {#items-item-chat-restrictions}

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

#### Объект entity_link {#items-item-chat-entity-link}

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

#### Объект permissions {#items-item-chat-permissions}

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

### Объект copilot {#copilot}

#|
|| **Название**
`тип` | **Описание** ||
|| **chats**
[`object`](../data-types.md) | Данные BitrixGPT-чатов. Может быть `null` ||
|| **messages**
[`object`](../data-types.md) | Данные BitrixGPT-сообщений. Может быть `null` ||
|| **roles**
[`object`](../data-types.md) | Описание доступных ролей BitrixGPT ||
|| **recommendedRoles**
[`array`](../data-types.md) | Список рекомендуемых ролей BitrixGPT ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-recent-get.md)
- [{#T}](./im-dialog-get.md)
- [{#T}](./im-counters-get.md)
