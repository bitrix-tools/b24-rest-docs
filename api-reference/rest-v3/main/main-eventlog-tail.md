# Получить новые записи журнала main.eventlog.tail

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`main`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `main.eventlog.tail` возвращает новые записи журнала, которые появились после заданной точки отсчета `cursor`, с учетом фильтра.

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
|| **cursor**
[`object`](../../data-types.md) | Точка отсчета для получения новых записей: 

- `field` — поле сортировки, по умолчанию `id`
- `order` — направление сортировки `ASC` или `DESC`, по умолчанию `ASC`
- `value` — стартовое значение, по умолчанию `0`
- `limit` — лимит записей, по умолчанию `50`
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/main.eventlog.tail`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","timestampX","severity","auditTypeId","moduleId","itemId","userId","description"],"filter":[],"cursor":{"field":"id","value":446313,"order":"ASC"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/main.eventlog.tail
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","timestampX","severity","auditTypeId","moduleId","itemId","userId","description"],"filter":[],"cursor":{"field":"id","value":446313,"order":"ASC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/main.eventlog.tail
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type EventLogEntry = {
      id: number
      timestampX: ISODate
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
    type EventLogTailResult = {
      items: EventLogEntry[]
    }

    try {
      const response = await $b24.actions.v3.call.make<EventLogTailResult>({
        method: 'main.eventlog.tail',
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
          filter: [],
          cursor: {
            field: 'id',
            value: 446313,
            order: 'ASC',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Received entries:', result.items.length, result.items[0]?.id)
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
      async function fetchEventLogTail() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'main.eventlog.tail',
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
              filter: [],
              cursor: {
                field: 'id',
                value: 446313,
                order: 'ASC',
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
          console.info('Received entries:', result.items.length, result.items[0]?.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchEventLogTail)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'main.eventlog.tail',
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
                    'filter' => [],
                    'cursor' => [
                        'field' => 'id',
                        'value' => 446313,
                        'order' => 'ASC'
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
        'main.eventlog.tail',
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
            filter: [],
            cursor: {
                field: 'id',
                value: 446313,
                order: 'ASC'
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
        'main.eventlog.tail',
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
            'filter' => [],
            'cursor' => [
                'field' => 'id',
                'value' => 446313,
                'order' => 'ASC'
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
                "id": 446315,
                "timestampX": "2026-01-30T14:05:38+03:00",
                "severity": "SECURITY",
                "auditTypeId": "USER_AUTHORIZE",
                "moduleId": "main",
                "itemId": "1463",
                "userId": 1463,
                "description": "{\"userId\":1463,\"applicationId\":\"mobile\",\"applicationPasswordId\":977,\"requestId\":\"1649cc2c8540e12c1f3aeb1e670c13f8\\\"-\\\"0\",\"method\":\"appPassword\"}"
            },
            // ....
            {
                "id": 446325,
                "timestampX": "2026-01-30T15:03:02+03:00",
                "severity": "SECURITY",
                "auditTypeId": "USER_AUTHORIZE",
                "moduleId": "rest",
                "itemId": "971",
                "userId": 971,
                "description": "{\"userId\":971,\"method\":\"rest\",\"applicationType\":\"apauth\",\"applicationId\":383,\"timePeriod\":\"2026-01-30 15\"}"
            }
        ]
    },
    "time": {
        "start": 1769774582,
        "finish": 1769774583.014603,
        "duration": 1.0146028995513916,
        "processing": 0,
        "date_start": "2026-01-30T15:03:02+03:00",
        "date_finish": "2026-01-30T15:03:03+03:00",
        "operating_reset_at": 1769775183,
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
        "code": "BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION",
        "message": "Не удается распознать выражение фильтра `Cursor field id cannot be used at filter.`"
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

#### Ошибки фильтрации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `#FILTER#` | Уберите из `filter` поле, указанное в `cursor.field` ||
|#

#### Ошибки пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `cursor.limit` | Не удается распознать параметр пагинации `#PAGE#` | Передайте числовой `limit` больше `0` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./main-eventlog-list.md)
- [{#T}](./main-eventlog-get.md)
- [{#T}](./index.md)
