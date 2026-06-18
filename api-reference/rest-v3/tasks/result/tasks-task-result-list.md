# Получить список результатов задачи tasks.task.result.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к задаче

Метод `tasks.task.result.list` возвращает список результатов задачи.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **order**
[`object`](../../../data-types.md) | Объект для сортировки списка результатов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Направление сортировки может принимать значения:

- `ASC` — по возрастанию
- `DESC` — по убыванию

Поле для сортировки может принимать значения:
- `id` — идентификатор результата
- `authorId` — идентификатор автора результата
- `createdAt` — дата создания результата
- `updatedAt` — дата обновления результата
- `status` — статус результата
- `messageId` — идентификатор сообщения чата ||
|| **filter***
[`array`](../../../data-types.md) | Массив условий для фильтрации списка результатов. Обязательно передайте условие по `taskId`.

Каждое условие — массив с названием поля, оператором и значением. Для оператора `=` можно передать только название поля и значение.

Форматы условий:
- `["taskId", 51]`
- `["id", ">=", 17]`
- `["id", "in", [17, 18, 19]]`

Доступные операторы фильтра: `=`, `>`, `<`, `<=`, `>=`, `!=`, `in`, `between`.

- `=` — равно
- `>` — больше
- `<` — меньше
- `<=` — меньше либо равно
- `>=` — больше либо равно
- `!=` — не равно
- `in` — входит в список значений
- `between` — находится в диапазоне значений

Фильтруемое поле может принимать значения:
- `taskId` — идентификатор задачи. Обязательное поле
- `id` — идентификатор результата
- `authorId` — идентификатор автора результата
- `status` — статус результата. Возможные значения: `open`, `closed`
- `messageId` — идентификатор сообщения чата, из которого создан результат ||
|| **select**
[`array`](../../../data-types.md) | Массив полей, которые нужно выбрать.

Если параметр не передан, метод вернет поля по умолчанию.

Поле может принимать значения:
- `id` — идентификатор результата
- `taskId` — идентификатор задачи
- `text` — текст результата
- `authorId` — идентификатор автора результата
- `author` — данные автора
- `createdAt` — дата создания результата
- `updatedAt` — дата обновления результата
- `status` — статус результата
- `fileIds` — идентификаторы файлов результата
- `rights` — права текущего пользователя на результат
- `messageId` — идентификатор сообщения чата ||
|| **pagination**
[`object`](../../../data-types.md) | Объект для управления постраничной навигацией.

Параметры постраничной навигации:
- `page` — номер страницы
- `limit` — количество элементов на странице
- `offset` — смещение от начала списка ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.task.result.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["taskId",51]],"select":["id","taskId","text","authorId","createdAt","status","messageId"],"order":{"createdAt":"DESC"},"pagination":{"limit":10,"offset":0}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.task.result.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["taskId",51]],"select":["id","taskId","text","authorId","createdAt","status","messageId"],"order":{"createdAt":"DESC"},"pagination":{"limit":10,"offset":0},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.task.result.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TaskResultListResult = {
      items: {
        id: number
        taskId: number
        text: string
        authorId: number
        createdAt: ISODate
        status: string
        messageId: number | null
      }[]
    }

    try {
      const response = await $b24.actions.v3.call.make<TaskResultListResult>({
        method: 'tasks.task.result.list',
        params: {
          filter: [
            ['taskId', 51],
          ],
          select: ['id', 'taskId', 'text', 'authorId', 'createdAt', 'status', 'messageId'],
          order: {
            createdAt: 'DESC',
          },
          pagination: {
            limit: 10,
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
        console.info(result.items)
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
      async function fetchTaskResults() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'tasks.task.result.list',
            params: {
              filter: [
                ['taskId', 51],
              ],
              select: ['id', 'taskId', 'text', 'authorId', 'createdAt', 'status', 'messageId'],
              order: {
                createdAt: 'DESC',
              },
              pagination: {
                limit: 10,
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
          console.info(result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchTaskResults)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.task.result.list',
                [
                    'filter' => [
                        ['taskId', 51],
                    ],
                    'select' => ['id', 'taskId', 'text', 'authorId', 'createdAt', 'status', 'messageId'],
                    'order' => [
                        'createdAt' => 'DESC',
                    ],
                    'pagination' => [
                        'limit' => 10,
                        'offset' => 0,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'tasks.task.result.list',
        {
            filter: [
                ['taskId', 51]
            ],
            select: ['id', 'taskId', 'text', 'authorId', 'createdAt', 'status', 'messageId'],
            order: {
                createdAt: 'DESC'
            },
            pagination: {
                limit: 10,
                offset: 0
            }
        },
        function(result){
            console.info(result.data());
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.task.result.list',
        [
            'filter' => [
                ['taskId', 51],
            ],
            'select' => ['id', 'taskId', 'text', 'authorId', 'createdAt', 'status', 'messageId'],
            'order' => [
                'createdAt' => 'DESC',
            ],
            'pagination' => [
                'limit' => 10,
                'offset' => 0,
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
                "id": 17,
                "taskId": 51,
                "text": "Работа по задаче выполнена",
                "authorId": 1,
                "createdAt": "2026-04-30T10:15:00+03:00",
                "status": "open",
                "messageId": null
            }
        ]
    },
    "time": {
        "start": 1777529700,
        "finish": 1777529700.123456,
        "duration": 0.123456,
        "processing": 0.1,
        "date_start": "2026-04-30T10:15:00+03:00",
        "date_finish": "2026-04-30T10:15:00+03:00",
        "operating_reset_at": 1777530300,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **items**
[`array`](../../../data-types.md) | Массив результатов задачи.

Поля элементов зависят от параметра `select` и совпадают с полями объекта результата в методе [tasks.task.result.add](./tasks-task-result-add.md#item) ||
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
                "field": "filter",
                "message": "Значение поля не может быть пустым"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Значение поля не может быть пустым | Передайте фильтр в виде массива условий ||
|| `taskId` | В поле `taskId` требуется тип данных `int` для такого запроса | Передайте `taskId` как число ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.taskId` | Требуется указать фильтр по обязательному полю `taskId` | Передайте условие по `taskId` в параметре `filter` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра | Передайте фильтр в виде массива условий ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Неизвестный оператор фильтра | Используйте операторы `=`, `>`, `<`, `<=`, `>=`, `!=`, `in`, `between` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации | Передайте `page`, `limit` или `offset` как числа ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter`
`select`
`order` | Неизвестное поле `#FIELD#` для сущности `ResultDto` | Передайте только поля из списка: `id`, `taskId`, `text`, `authorId`, `author`, `createdAt`, `updatedAt`, `status`, `fileIds`, `rights`, `messageId` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `order` | Не удается распознать выражение сортировки | Передайте направление сортировки `ASC` или `DESC` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `taskId` | Доступ запрещен | Проверьте права пользователя на чтение задачи ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-task-result-add.md)
- [{#T}](./tasks-task-result-addfromchatmessage.md)
- [{#T}](./tasks-task-result-update.md)
- [{#T}](./tasks-task-result-delete.md)
