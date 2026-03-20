# Получить список записей журнала main.eventlog.list

> Scope: [`main`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `main.eventlog.list` возвращает список записей журнала событий по заданным условиям.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Список полей, которые нужно вернуть в ответе.

Доступные поля:
- `id` — идентификатор записи журнала
- `timestampX` — дата и время события
- `severity` — уровень важности события
- `auditTypeId` — тип события
- `moduleId` — идентификатор модуля
- `itemId` — идентификатор объекта
- `remoteAddr` — IP-адрес
- `userAgent` — User-Agent запроса
- `requestUri` — URI запроса
- `siteId` — идентификатор сайта
- `userId` — идентификатор пользователя
- `guestId` — идентификатор гостя
- `description` — описание события ||
|| **filter**
[`array`](../../data-types.md) | Условия фильтрации записей в формате: 
- `["field", "operator", value]`
- `["field", value]`, оператор по умолчанию `=`

Доступные поля аналогичны полям в `select`.
  
[Подробнее о работе фильтрации в REST 3.0](../index.md#filter) ||
|| **order**
[`object`](../../data-types.md) | Сортировка результатов в формате `{ "field": "value" }`.

Доступные значения:
- `ASC` — по возрастанию
- `DESC` — по убыванию

Доступные поля для сортировки аналогичны полям в `select`. ||
|| **pagination**
[`object`](../../data-types.md) | Параметры постраничной навигации:  
- `page` — номер страницы 
- `limit` — количество записей на страницу, по умолчанию `50`
- `offset` — смещение записей. Если переданы `page` и `limit`, смещение вычисляется автоматически ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/main.eventlog.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","timestampX","severity","auditTypeId","moduleId","itemId","userId","description"],"filter":[["timestampX",">=","2026-01-30T00:00:00+03:00"],["timestampX","<","2026-01-31T00:00:00+03:00"]],"order":{"id":"ASC"},"pagination":{"page":1,"limit":20,"offset":0}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/main.eventlog.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","timestampX","severity","auditTypeId","moduleId","itemId","userId","description"],"filter":[["timestampX",">=","2026-01-30T00:00:00+03:00"],["timestampX","<","2026-01-31T00:00:00+03:00"]],"order":{"id":"ASC"},"pagination":{"page":1,"limit":20,"offset":0},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/main.eventlog.list
    ```

- JS

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'main.eventlog.list',
            {
                select: [
                    'id',
                    'timestampX',
                    'severity',
                    'auditTypeId',
                    'moduleId',
                    'itemId',
                    'userId',
                    'description'
                ],
                filter: [
                    ['timestampX', '>=', '2026-01-30T00:00:00+03:00'],
                    ['timestampX', '<', '2026-01-31T00:00:00+03:00']
                ],
                order: {
                    id: 'ASC'
                },
                pagination: {
                    page: 1,
                    limit: 20,
                    offset: 0
                }
            }
        );

        const result = response.getData().result;
        console.log('Event log list:', result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'main.eventlog.list',
                [
                    'select' => [
                        'id',
                        'timestampX',
                        'severity',
                        'auditTypeId',
                        'moduleId',
                        'itemId',
                        'userId',
                        'description'
                    ],
                    'filter' => [
                        ['timestampX', '>=', '2026-01-30T00:00:00+03:00'],
                        ['timestampX', '<', '2026-01-31T00:00:00+03:00']
                    ],
                    'order' => [
                        'id' => 'ASC'
                    ],
                    'pagination' => [
                        'page' => 1,
                        'limit' => 20,
                        'offset' => 0
                    ]
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

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'main.eventlog.list',
        {
            select: [
                'id',
                'timestampX',
                'severity',
                'auditTypeId',
                'moduleId',
                'itemId',
                'userId',
                'description'
            ],
            filter: [
                ['timestampX', '>=', '2026-01-30T00:00:00+03:00'],
                ['timestampX', '<', '2026-01-31T00:00:00+03:00']
            ],
            order: {
                id: 'ASC'
            },
            pagination: {
                page: 1,
                limit: 20,
                offset: 0
            }
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'main.eventlog.list',
        [
            'select' => [
                'id',
                'timestampX',
                'severity',
                'auditTypeId',
                'moduleId',
                'itemId',
                'userId',
                'description'
            ],
            'filter' => [
                ['timestampX', '>=', '2026-01-30T00:00:00+03:00'],
                ['timestampX', '<', '2026-01-31T00:00:00+03:00']
            ],
            'order' => [
                'id' => 'ASC'
            ],
            'pagination' => [
                'page' => 1,
                'limit' => 20,
                'offset' => 0
            ]
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
                "id": 443585,
                "timestampX": "2026-01-22T02:52:25+03:00",
                "severity": "SECURITY",
                "auditTypeId": "USER_AUTHORIZE",
                "moduleId": "main",
                "itemId": "751",
                "userId": 751,
                "description": "{\u0022userId\u0022:751,\u0022requestId\u0022:\u00225636cd3e45c524c55a68a19dccb72c3b-0\u0022,\u0022method\u0022:\u0022external\u0022}"
            },
            // ...
            {
                "id": 443623,
                "timestampX": "2026-01-22T05:21:51+03:00",
                "severity": "SECURITY",
                "auditTypeId": "USER_AUTHORIZE",
                "moduleId": "main",
                "itemId": "751",
                "userId": 751,
                "description": "{\u0022userId\u0022:751,\u0022requestId\u0022:\u002239aae4ca278ad75ca3dc631c7b4f8fe2-0\u0022,\u0022method\u0022:\u0022external\u0022}"
            }
        ]
    },
    "time": {
        "start": 1769773532,
        "finish": 1769773532.960023,
        "duration": 0.9600229263305664,
        "processing": 0,
        "date_start": "2026-01-30T14:45:32+03:00",
        "date_finish": "2026-01-30T14:45:32+03:00",
        "operating_reset_at": 1769774132,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **items**
[`array`](../../data-types.md) | Массив объектов записей журнала ||
|| **items[]**
[`object`](../../data-types.md) | Объект записи журнала ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор записи журнала ||
|| **timestampX**
[`datetime`](../../data-types.md#datetime) | Дата и время события ||
|| **severity**
[`string`](../../data-types.md) | Уровень важности события ||
|| **auditTypeId**
[`string`](../../data-types.md) | Тип события ||
|| **moduleId**
[`string`](../../data-types.md) | Идентификатор модуля ||
|| **itemId**
[`string`](../../data-types.md) | Идентификатор объекта ||
|| **remoteAddr**
[`string`](../../data-types.md) | IP-адрес ||
|| **userAgent**
[`string`](../../data-types.md) | User-Agent запроса ||
|| **requestUri**
[`string`](../../data-types.md) | URI запроса ||
|| **siteId**
[`string`](../../data-types.md) | Идентификатор сайта ||
|| **userId**
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|| **guestId**
[`integer`](../../data-types.md) | Идентификатор гостя ||
|| **description**
[`string`](../../data-types.md) | Описание события ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION",
        "message": "Не удается распознать параметр пагинации `{\"limit\":\"abc\"}`"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Нет прав администратора или не хватает scope main ||
|#

#### Ошибки пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `limit`
`offset`
`page` | Не удается распознать параметр пагинации `#PAGE#` | Передайте числовые значения. `limit` не должен быть равен `0` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./main-eventlog-get.md)
- [{#T}](./main-eventlog-tail.md)
- [{#T}](./index.md)


