# Получить список записей о рабочем времени timeman.record.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Чтение в соответствии с настройками субординации» или «Чтение всех записей» 

Метод `timeman.record.list` возвращает список записей о рабочем времени сотрудника.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../../data-types.md) | Условия фильтрации записей в формате:
- `["field", "operator", value]`
- `["field", value]`, оператор по умолчанию `=`

Обязателен параметр `userId`.

Доступные поля:
- `userId` — идентификатор сотрудника
- `startTime` — время начала рабочего интервала

Для `startTime` поддерживаются операторы `=`, `>`, `>=`, `<`, `<=`, `between`.

[Подробнее о работе фильтрации в REST 3.0](../index.md#filter) ||
|| **select**
[`array`](../../data-types.md) | Список полей, которые нужно вернуть в ответе.

Доступные поля:
- `id` — идентификатор записи
- `userId` — идентификатор сотрудника
- `startTime` — время начала рабочего интервала
- `endTime` — время завершения рабочего интервала
- `duration` — длительность рабочего интервала в секундах
- `breakLength` — длительность перерывов в секундах
- `state` — состояние записи
- `isApproved` — признак подтверждения записи ||
|| **order**
[`object`](../../data-types.md) | Сортировка результатов в формате `{ "field": "value" }`.

Доступные значения:
- `ASC` — по возрастанию
- `DESC` — по убыванию

Доступные поля для сортировки:
- `id` — идентификатор записи
- `userId` — идентификатор сотрудника
- `startTime` — время начала рабочего интервала
- `endTime` — время завершения рабочего интервала
- `duration` — длительность рабочего интервала в секундах ||
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

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/timeman.record.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["userId",1],["startTime","between",["2026-06-01T00:00:00+03:00","2026-06-30T23:59:59+03:00"]]],"select":["id","startTime","endTime","duration"],"order":{"startTime":"DESC"},"pagination":{"page":1,"limit":50,"offset":0}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/timeman.record.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["userId",1],["startTime","between",["2026-06-01T00:00:00+03:00","2026-06-30T23:59:59+03:00"]]],"select":["id","startTime","endTime","duration"],"order":{"startTime":"DESC"},"pagination":{"page":1,"limit":50,"offset":0},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/timeman.record.list
    ```

- JS

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'timeman.record.list',
            {
                filter: [
                    ['userId', 1],
                    ['startTime', 'between', ['2026-06-01T00:00:00+03:00', '2026-06-30T23:59:59+03:00']]
                ],
                select: [
                    'id',
                    'startTime',
                    'endTime',
                    'duration'
                ],
                order: {
                    startTime: 'DESC'
                },
                pagination: { 
                    page: 1,
                    limit: 50, 
                    offset: 0 
                }
            }
        );

        const result = response.getData().result;
        console.log('Record list:', result);
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
                'timeman.record.list',
                [
                    'filter' => [
                        ['userId', 1],
                        ['startTime', 'between', ['2026-06-01T00:00:00+03:00', '2026-06-30T23:59:59+03:00']],
                    ],
                    'select' => [
                        'id',
                        'startTime',
                        'endTime',
                        'duration'
                    ],
                    'order' => [
                        'startTime' => 'DESC'
                    ],
                    'pagination' => [
                        'page' => 1, 
                        'limit' => 50, 
                        'offset' => 0
                    ],
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
        'timeman.record.list',
        {
            filter: [
                ['userId', 1],
                ['startTime', 'between', ['2026-06-01T00:00:00+03:00', '2026-06-30T23:59:59+03:00']]
            ],
            select: [
                'id',
                'startTime', 
                'endTime',
                'duration'
                ],
            order: {
                 startTime: 'DESC'
                },
            pagination: { 
                page: 1,
                limit: 50, 
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
        'timeman.record.list',
        [
            'filter' => [
                ['userId', 1],
                ['startTime', 'between', ['2026-06-01T00:00:00+03:00', '2026-06-30T23:59:59+03:00']]
            ],
            'select' => [
                'id',
                'startTime',
                'endTime',
                'duration'
            ],
            'order' => [
                'startTime' => 'DESC'
            ],
            'pagination' => [
                'page' => 1, 
                'limit' => 50, 
                'offset' => 0
            ],
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
                "id": 177,
                "startTime": "2026-06-02T17:38:24+03:00",
                "endTime": "2026-06-02T17:39:06+03:00",
                "duration": 28
            }
        ]
    },
    "time": {
        "start": 1780411219,
        "finish": 1780411219.167315,
        "duration": 0.16731500625610352,
        "processing": 0,
        "date_start": "2026-06-02T17:40:19+03:00",
        "date_finish": "2026-06-02T17:40:19+03:00",
        "operating_reset_at": 1780411819,
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
[`array`](../../data-types.md) | Массив объектов с записями. Структура ответа зависит от `select` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "field": "filter.userId",
                "message": "Обязательное поле `filter.userId` не указано"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.userId` | Доступ запрещен | Проверьте право чтения записей о рабочем времени для указанного сотрудника и scope `timeman` ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.userId` | Обязательное поле `filter.userId` не указано | Передайте фильтр с условием по `userId` ||
|#

#### Ошибки фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.userId` | Передано несколько разных значений `userId` в одном запросе | Передавайте только один идентификатор сотрудника в фильтре ||
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

- [{#T}](./timeman-record-field-list.md)
- [{#T}](./timeman-record-field-get.md)
- [{#T}](./index.md)
