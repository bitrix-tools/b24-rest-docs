# Найти сообщение в чате im.dialog.messages.search

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: участник чата

Метод `im.dialog.messages.search` выполняет поиск сообщений в чате.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID^*^**
[`integer`](../../data-types.md) | Идентификатор чата, в котором выполняется поиск ||
|| **SEARCH_MESSAGE**
[`string`](../../data-types.md) | Строка поиска по тексту сообщения.

Поиск по этому параметру выполняется для строк длиной более 2 символов ||
|| **DATE_FROM**
[`datetime`](../../data-types.md) | Начало периода поиска в формате ISO 8601 (RFC3339) ||
|| **DATE_TO**
[`datetime`](../../data-types.md) | Конец периода поиска в формате ISO 8601 (RFC3339) ||
|| **DATE**
[`datetime`](../../data-types.md) | Поиск сообщений за конкретную дату в формате ISO 8601 (RFC3339).

Если параметр передан, поиск выполняется в пределах суток от указанной даты ||
|| **ORDER**
[`object`](../../data-types.md) | Параметры сортировки.

Поддерживаемое поле:
- `ID` — сортировка по идентификатору сообщения, значения `ASC` или `DESC`

По умолчанию: `{"ID": "DESC"}` ||
|| **LIMIT**
[`integer`](../../data-types.md) | Количество возвращаемых сообщений.

Значение по умолчанию: `50`.
Максимальное значение: `200` ||
|| **LAST_ID**
[`integer`](../../data-types.md) | Идентификатор последнего сообщения из предыдущей выборки для пагинации ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":3,"SEARCH_MESSAGE":"test","ORDER":{"ID":"DESC"},"LIMIT":20}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.dialog.messages.search
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":3,"SEARCH_MESSAGE":"test","ORDER":{"ID":"DESC"},"LIMIT":20,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.dialog.messages.search
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.dialog.messages.search',
            {
                CHAT_ID: 3,
                SEARCH_MESSAGE: 'test',
                ORDER: { ID: 'DESC' },
                LIMIT: 20
            }
        );

        const result = response.getData().result;
        console.log('Search result:', result);
    }
    catch (error)
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
                'im.dialog.messages.search',
                [
                    'CHAT_ID' => 3,
                    'SEARCH_MESSAGE' => 'test',
                    'ORDER' => ['ID' => 'DESC'],
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
        'im.dialog.messages.search',
        {
            CHAT_ID: 3,
            SEARCH_MESSAGE: 'test',
            ORDER: { ID: 'DESC' },
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
        'im.dialog.messages.search',
        [
            'CHAT_ID' => 3,
            'SEARCH_MESSAGE' => 'test',
            'ORDER' => ['ID' => 'DESC'],
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
        "users": [
            {
                "id": 1,
                "active": true,
                "name": "Алекс",
                "firstName": "Алекс",
                "lastName": "",
                "workPosition": "",
                "color": "#df532d",
                "avatar": "https://cdn-ru.bitrix24.ru/path/avatar.jpg",
                "avatarHr": "https://cdn-ru.bitrix24.ru/path/avatar.jpg",
                "gender": "F",
                "birthday": "",
                "extranet": false,
                "network": false,
                "bot": false,
                "connector": false,
                "externalAuthId": "socservices",
                "status": "online",
                "idle": false,
                "lastActivityDate": "2026-02-13T14:27:33+03:00",
                "mobileLastDate": false,
                "desktopLastDate": false,
                "absent": false,
                "departments": [1, 107, 47, 3],
                "phones": {
                    "personal_mobile": "79998887766",
                    "inner_phone": "111"
                },
                "botData": null,
                "type": "user",
                "website": "",
                "email": "user@example.com"
            }
        ],
        "files": [],
        "additionalMessages": [],
        "copilot": null,
        "stickers": [],
        "reactions": [],
        "tariffRestrictions": {
            "isHistoryLimitExceeded": false
        },
        "usersShort": [],
        "messages": [
            {
                "id": 33653,
                "chat_id": 2421,
                "author_id": 1,
                "date": "2026-02-13T14:28:00+03:00",
                "text": "test message",
                "isSystem": false,
                "uuid": "18533186-232b-4423-8438-64501da182f5",
                "forward": null,
                "params": [],
                "viewedByOthers": false,
                "unread": false,
                "viewed": true
            }
        ]
    },
    "time": {
        "start": 1770982150,
        "finish": 1770982150.503861,
        "duration": 0.5038609504699707,
        "processing": 0,
        "date_start": "2026-02-13T14:29:10+03:00",
        "date_finish": "2026-02-13T14:29:10+03:00",
        "operating_reset_at": 1770982750,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **result.messages**
[`array`](../../data-types.md) | Массив найденных сообщений [(подробное описание)](#message) ||
|| **result.users**
[`array`](../../data-types.md) | Пользователи, связанные с найденными сообщениями [(подробное описание)](#user) ||
|| **result.files**
[`array`](../../data-types.md) | Файлы из найденных сообщений ||
|| **result.additionalMessages**
[`array`](../../data-types.md) | Дополнительные сообщения, связанные с найденными, например пересылаемые или цитируемые [(подробное описание)](#message) ||
|| **result.copilot**
[`object`](../../data-types.md) | Данные BitrixGPT, если присутствуют в ответе. Может быть `null` ||
|| **result.stickers**
[`array`](../../data-types.md) | Стикеры, связанные с найденными сообщениями ||
|| **result.reactions**
[`array`](../../data-types.md) | Реакции на найденные сообщения [(подробное описание)](#reactions) ||
|| **result.tariffRestrictions**
[`object`](../../data-types.md) | Информация о тарифных ограничениях истории.

Содержит флаг `isHistoryLimitExceeded` — признак превышения лимита истории сообщений по тарифу ||
|| **result.usersShort**
[`array`](../../data-types.md) | Краткая информация о пользователях, поставивших реакции.

Используется как дополняющий справочник к `result.reactions.reactionUsers`, содержит `id`, `name`, `avatar` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Сообщение {#message}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор сообщения ||
|| **chat_id**
[`integer`](../../data-types.md) | Идентификатор чата ||
|| **author_id**
[`integer`](../../data-types.md) | Идентификатор автора сообщения ||
|| **date**
[`datetime`](../../data-types.md) | Дата и время создания сообщения ||
|| **text**
[`string`](../../data-types.md) | Текст сообщения ||
|| **isSystem**
[`boolean`](../../data-types.md) | Признак системного сообщения ||
|| **uuid**
[`string`](../../data-types.md) | Внешний UUID сообщения. Может быть `null` ||
|| **forward**
[`object`](../../data-types.md) | Информация о пересылке. Может быть `null` ||
|| **params**
[`array`](../../data-types.md) | Параметры сообщения ||
|| **viewedByOthers**
[`boolean`](../../data-types.md) | Признак, что сообщение просмотрено другими участниками ||
|| **unread**
[`boolean`](../../data-types.md) | Признак непрочитанного сообщения для текущего пользователя ||
|| **viewed**
[`boolean`](../../data-types.md) | Признак, что сообщение просмотрено текущим пользователем ||
|#

#### Пользователь {#user}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|| **active**
[`boolean`](../../data-types.md) | Пользователь активен ||
|| **name**
[`string`](../../data-types.md) | Полное имя ||
|| **firstName**
[`string`](../../data-types.md) | Имя ||
|| **lastName**
[`string`](../../data-types.md) | Фамилия ||
|| **workPosition**
[`string`](../../data-types.md) | Должность ||
|| **color**
[`string`](../../data-types.md) | Цвет профиля в формате hex ||
|| **avatar**
[`string`](../../data-types.md) | URL аватара ||
|| **avatarHr**
[`string`](../../data-types.md) | URL аватара в высоком разрешении ||
|| **gender**
[`string`](../../data-types.md) | Пол ||
|| **birthday**
[`string`](../../data-types.md) | День рождения ||
|| **extranet**
[`boolean`](../../data-types.md) | Признак экстранет-пользователя ||
|| **network**
[`boolean`](../../data-types.md) | Признак пользователя Bitrix24 Network ||
|| **bot**
[`boolean`](../../data-types.md) | Признак бота ||
|| **connector**
[`boolean`](../../data-types.md) | Признак пользователя-коннектора ||
|| **externalAuthId**
[`string`](../../data-types.md) | Код внешней авторизации ||
|| **status**
[`string`](../../data-types.md) | Статус пользователя ||
|| **idle**
[`boolean`](../../data-types.md) | Признак неактивности ||
|| **lastActivityDate**
[`datetime`](../../data-types.md) | Дата и время последней активности ||
|| **mobileLastDate**
[`datetime`](../../data-types.md) | Последняя активность в мобильном приложении. Может быть `false` ||
|| **desktopLastDate**
[`datetime`](../../data-types.md) | Последняя активность в десктоп-приложении. Может быть `false` ||
|| **absent**
[`boolean`](../../data-types.md) | Признак отсутствия ||
|| **departments**
[`array`](../../data-types.md) | Массив идентификаторов подразделений ||
|| **phones**
[`object`](../../data-types.md) | Телефоны пользователя ||
|| **botData**
[`object`](../../data-types.md) | Дополнительные данные бота. Для обычного пользователя `null` ||
|| **type**
[`string`](../../data-types.md) | Тип пользователя ||
|| **website**
[`string`](../../data-types.md) | Веб-сайт пользователя ||
|| **email**
[`string`](../../data-types.md) | E-mail пользователя ||
|#

#### Реакции {#reactions}

#|
|| **Название**
`тип` | **Описание** ||
|| **messageId**
[`integer`](../../data-types.md) | Идентификатор сообщения ||
|| **reactionCounters**
[`object`](../../data-types.md) | Количество реакций по каждому типу ||
|| **reactionUsers**
[`object`](../../data-types.md) | Пользователи по типам реакций ||
|| **ownReactions**
[`array`](../../data-types.md) | Реакции текущего пользователя ||
|#


## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "CHAT_ID_EMPTY",
    "error_description": "CHAT_ID can`t be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `CHAT_ID_EMPTY` | CHAT_ID cant be empty | Не передан обязательный параметр `CHAT_ID` ||
|| `ACCESS_ERROR` | You do not have access to this chat | Нет доступа к указанному чату ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-dialog-messages-get.md)
- [{#T}](./im-dialog-read.md)
- [{#T}](./im-dialog-unread.md)
- [{#T}](./im-dialog-writing.md)
- [{#T}](./im-message-add.md)
- [{#T}](./im-message-update.md)
- [{#T}](./im-message-delete.md)
