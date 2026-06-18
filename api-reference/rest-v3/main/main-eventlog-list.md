# Получить список записей журнала main.eventlog.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

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

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type EventLogItem = {
      id: number
      timestampX: ISODate | null
      severity: string
      auditTypeId: string
      moduleId: string
      itemId: string
      remoteAddr: string
      userAgent: string
      requestUri: string
      siteId: string
      userId: number
      guestId: number
      description: string
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type EventLogListResult = {
      items: EventLogItem[]
    }

    try {
      // main.eventlog.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v3.callList.make() returns every record as one
      // array, $b24.actions.v3.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `pagination` variant when sort matters.
      const response = await $b24.actions.v3.call.make<EventLogListResult>({
        method: 'main.eventlog.list',
        params: {
          select: [
            'id',
            'timestampX',
            'severity',
            'auditTypeId',
            'moduleId',
            'itemId',
            'userId',
            'description',
          ],
          filter: [
            ['timestampX', '>=', '2026-01-30T00:00:00+03:00'],
            ['timestampX', '<', '2026-01-31T00:00:00+03:00'],
          ],
          order: {
            id: 'ASC',
          },
          pagination: {
            page: 1,
            limit: 20,
            offset: 0,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Event log entries:', result.items.length, result.items)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getEventLogList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // main.eventlog.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v3.callList.make() returns every record as one
          // array, $b24.actions.v3.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `pagination` variant when sort matters.
          const response = await $b24.actions.v3.call.make({
            method: 'main.eventlog.list',
            params: {
              select: [
                'id',
                'timestampX',
                'severity',
                'auditTypeId',
                'moduleId',
                'itemId',
                'userId',
                'description',
              ],
              filter: [
                ['timestampX', '>=', '2026-01-30T00:00:00+03:00'],
                ['timestampX', '<', '2026-01-31T00:00:00+03:00'],
              ],
              order: {
                id: 'ASC',
              },
              pagination: {
                page: 1,
                limit: 20,
                offset: 0,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Event log entries:', result.items.length, result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getEventLogList)
    </script>
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


