# Получить историю поиска im.search.last.get

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.search.last.get` возвращает список диалогов из истории последнего поиска.

Метод разработан для предыдущей версии чата. В текущей версии чата М1 он работает, но результаты не отображаются в интерфейсе.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **SKIP_OPENLINES**
[`string`](../../data-types.md) | Пропустить чаты Открытых линий.

Возможные значения:
- `Y` — да
- `N` — нет 

Значение по умолчанию — `N` ||
|| **SKIP_CHAT**
[`string`](../../data-types.md) | Пропустить групповые чаты.

Возможные значения:
- `Y` — да
- `N` — нет 

Значение по умолчанию — `N` ||
|| **SKIP_DIALOG**
[`string`](../../data-types.md) | Пропустить личные диалоги. 

Возможные значения:
- `Y` — да
- `N` — нет 

Значение по умолчанию — `N` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"SKIP_OPENLINES":"N","SKIP_CHAT":"N","SKIP_DIALOG":"N"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.search.last.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"SKIP_OPENLINES":"N","SKIP_CHAT":"N","SKIP_DIALOG":"N","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.search.last.get
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('im.search.last.get', {
        SKIP_OPENLINES: 'N',
        SKIP_CHAT: 'N',
        SKIP_DIALOG: 'N',
      });

      const { result } = response.getData();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service->core->call(
            'im.search.last.get',
            [
                'SKIP_OPENLINES' => 'N',
                'SKIP_CHAT' => 'N',
                'SKIP_DIALOG' => 'N',
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
        'im.search.last.get',
        {
            SKIP_OPENLINES: 'N',
            SKIP_CHAT: 'N',
            SKIP_DIALOG: 'N',
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
        'im.search.last.get',
        [
            'SKIP_OPENLINES' => 'N',
            'SKIP_CHAT' => 'N',
            'SKIP_DIALOG' => 'N',
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
            "id": "chat1157",
            "type": "chat",
            "avatar": {
                "url": "",
                "color": "#ab7761"
            },
            "title": "Бурый чат №18",
            "chat": {
                "id": 1157,
                "name": "Бурый чат №18",
                "owner": 27,
                "extranet": false,
                "avatar": "",
                "color": "#ab7761",
                "type": "thread",
                "entity_type": "THREAD",
                "entity_id": "",
                "entity_data_1": "",
                "entity_data_2": "",
                "entity_data_3": "",
                "mute_list": [],
                "date_create": "2025-01-30T00:41:03+03:00",
                "message_type": "C"
            }
        },
        {
            "id": 103,
            "type": "user",
            "avatar": {
                "url": "https://example.bitrix24.ru/upload/main/avatar.png",
                "color": "#4ba984"
            },
            "title": "Светлана Иванова",
            "user": {
                "id": 103,
                "active": true,
                "name": "Светлана Иванова",
                "first_name": "Светлана",
                "last_name": "Иванова",
                "work_position": "Руководитель ИТ-отдела",
                "color": "#4ba984",
                "avatar": "https://example.bitrix24.ru/upload/main/avatar.png",
                "avatar_hr": "https://example.bitrix24.ru/upload/main/avatar.png",
                "gender": "F",
                "birthday": "08-03",
                "extranet": false,
                "network": false,
                "bot": false,
                "connector": false,
                "external_auth_id": "socservices",
                "status": "online",
                "idle": false,
                "last_activity_date": "2026-03-05T10:19:37+03:00",
                "mobile_last_date": false,
                "desktop_last_date": false,
                "absent": false,
                "departments": [1, 7],
                "phones": {
                    "personal_mobile": "81234567890",
                    "work_phone": "79123456789",
                    "inner_phone": "78"
                },
                "bot_data": null,
                "type": "user",
                "website": "",
                "email": "svetlana@example.ru"
            }
        },
        ... // описание для каждого чата, пользователя
    ],
    "time": {
        "start": 1772695649,
        "finish": 1772695649.89509,
        "duration": 0.8950901031494141,
        "processing": 0,
        "date_start": "2026-03-05T10:27:29+03:00",
        "date_finish": "2026-03-05T10:27:29+03:00",
        "operating_reset_at": 1772696249,
        "operating": 0
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Список элементов истории поиска.

Структура объекта элемента подробно описана [ниже](#last-item-object) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Элемент истории поиска {#last-item-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) 
[`integer`](../../data-types.md) | Идентификатор чата или идентификатор пользователя для личного диалога ||
|| **type**
[`string`](../../data-types.md) | Тип записи: `chat` или `user` ||
|| **avatar**
[`object`](../../data-types.md) | Данные аватара записи.

Структура объекта подробно описана [ниже](#avatar-object) ||
|| **title**
[`string`](../../data-types.md) | Заголовок записи ||
|| **user**
[`object`](../../data-types.md) | Данные пользователя для записи типа `user`.

Структура объекта подробно описана [ниже](#user-object) ||
|| **chat**
[`object`](../../data-types.md) | Данные чата для записи типа `chat`.

Структура объекта подробно описана [ниже](#chat-object) ||
|#

### Объект avatar {#avatar-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **url**
[`string`](../../data-types.md) | Ссылка на аватар ||
|| **color**
[`string`](../../data-types.md) | Цвет в формате HEX ||
|#

### Объект user {#user-object}

{% include [Таблицы объекта пользователя](../_includes/user-object-tables.md) %}

### Объект chat {#chat-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор чата ||
|| **name**
[`string`](../../data-types.md) | Название чата ||
|| **owner**
[`integer`](../../data-types.md) | Идентификатор владельца чата ||
|| **extranet**
[`boolean`](../../data-types.md) | Признак участия в чате экстранет-пользователей ||
|| **avatar**
[`string`](../../data-types.md) 
[`null`](../../data-types.md) | Ссылка на аватар чата ||
|| **color**
[`string`](../../data-types.md) | Цвет чата в формате HEX ||
|| **type**
[`string`](../../data-types.md) | Тип чата ||
|| **entity_type**
[`string`](../../data-types.md) | Тип объекта, к которому привязан чат ||
|| **entity_id**
[`string`](../../data-types.md) | Идентификатор объекта, к которому привязан чат||
|| **entity_data_1**
[`string`](../../data-types.md) | Дополнительные данные объекта чата — поле 1 ||
|| **entity_data_2**
[`string`](../../data-types.md) | Дополнительные данные объекта чата — поле 2 ||
|| **entity_data_3**
[`string`](../../data-types.md) | Дополнительные данные объекта чата — поле 3 ||
|| **mute_list**
[`object`](../../data-types.md) | Список пользователей с выключенными уведомлениями ||
|| **date_create**
[`string`](../../data-types.md) | Дата создания чата в формате ISO 8601 (RFC3339) ||
|| **message_type**
[`string`](../../data-types.md) | Тип сообщения ||
|#

## Обработка ошибок

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-search-chat-list.md)
- [{#T}](./im-search-department-list.md)
- [{#T}](./im-search-user-list.md)
- [{#T}](./im-search-last-add.md)
- [{#T}](./im-search-last-delete.md)
