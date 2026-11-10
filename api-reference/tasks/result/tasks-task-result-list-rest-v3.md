# Получить список результатов задачи v 3.0 tasks.task.result.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к задаче

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `tasks.task.result.list` возвращает список результатов задачи.

Метод с таким же именем есть в прежней версии API: [tasks.task.result.list](./tasks-task-result-list.md) возвращает те же результаты в другом формате и без постраничной навигации.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки списка результатов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

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
[`array`](../../data-types.md) | Массив условий для фильтрации списка результатов. Обязательно передайте условие по `taskId`, например `["taskId", 51]`.

Каждое условие — массив с названием поля, оператором и значением. Для оператора `=` можно передать только название поля и значение.

Форматы условий:
- `["taskId", 51]`
- `["id", ">=", 17]`
- `["id", "in", [17, 18, 19]]`

Операторы:

- `=` — равно
- `>` — больше
- `<` — меньше
- `<=` — меньше либо равно
- `>=` — больше либо равно
- `!=` — не равно
- `in` — входит в список значений
- `between` — находится в диапазоне значений

Фильтруемое поле может принимать значения:
- `taskId` — идентификатор задачи, только с оператором `=`: на `in`, `>` и другие операторы метод вернет ошибку `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION`
- `id` — идентификатор результата
- `authorId` — идентификатор автора результата
- `status` — статус результата: `open` или `closed`
- `messageId` — идентификатор сообщения чата, из которого создан результат ||
|| **select**
[`array`](../../data-types.md) | Массив полей, которые нужно выбрать.

Если параметр не передан, метод вернет все поля, кроме `author`.

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
[`object`](../../data-types.md) | Объект для управления постраничной навигацией.

Параметры постраничной навигации:
- `page` — номер страницы, начиная с `1`
- `limit` — количество элементов на странице, по умолчанию `50`. Значение больше `1000` метод уменьшит до `1000`, на `0` и отрицательное значение вернет ошибку `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`
- `offset` — смещение от начала списка. Если передать `page` и `limit`, метод сам вычислит смещение ||
|#

{% note warning "" %}

Фильтр по `status` принимает только `open` и `closed`. Другое значение метод пропустит без ошибки и вернет результаты с любым статусом.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

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

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    filter = [
        [
            "taskId",
            51,
        ],
    ]

    select = [
        "id",
        "taskId",
        "text",
        "authorId",
        "createdAt",
        "status",
        "messageId",
    ]

    order = {
        "createdAt": "DESC",
    }

    pagination = {
        "limit": 10,
        "offset": 0,
    }

    try:
        bitrix_response = client.tasks.task.result.list(
            filter=filter,
            select=select,
            order=order,
            pagination=pagination,
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "tasks.task.result.list", b24.Params{
    	"filter": []any{
    		[]any{"taskId", 51},
    	},
    	"select": []string{"id", "taskId", "text", "authorId", "createdAt", "status", "messageId"},
    	"order": b24.Params{
    		"createdAt": "DESC",
    	},
    	"pagination": b24.Params{
    		"limit":  10,
    		"offset": 0,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("tasks.task.result.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "items".
    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа items")
    }

    var items []struct {
    	ID        b24.ID `json:"id"`
    	TaskID    b24.ID `json:"taskId"`
    	Text      string `json:"text"`
    	AuthorID  b24.ID `json:"authorId"`
    	CreatedAt string `json:"createdAt"`
    	Status    string `json:"status"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID)
    }
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
        "start": 1777533300,
        "finish": 1777533300.123456,
        "duration": 0.123456,
        "processing": 0.1,
        "date_start": "2026-04-30T10:15:00+03:00",
        "date_finish": "2026-04-30T10:15:00+03:00",
        "operating_reset_at": 1777533900,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **items**
[`array`](../../data-types.md) | Массив результатов задачи [(подробное описание)](#item). Набор полей зависит от параметра `select` ||
|#

#### Элемент items {#item}

Поле `id` приходит всегда, даже если его нет в `select`.

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор результата ||
|| **taskId**
[`integer`](../../data-types.md) | Идентификатор задачи ||
|| **text**
[`string`](../../data-types.md) | Текст результата ||
|| **authorId**
[`integer`](../../data-types.md) | Идентификатор автора результата ||
|| **author**
[`object`](../../data-types.md) | Данные автора [(подробное описание)](#author). Метод вернет поле, только если указать его в `select` ||
|| **createdAt**
[`datetime`](../../data-types.md) | Дата и время создания результата в формате ISO 8601 ||
|| **updatedAt**
[`datetime`](../../data-types.md) | Дата и время последнего изменения результата в формате ISO 8601 ||
|| **status**
[`string`](../../data-types.md) | Статус результата: `open` — открыт, `closed` — закрыт ||
|| **fileIds**
[`array`](../../data-types.md) | Идентификаторы файлов результата. Если файлов нет, метод вернет `null` или пустой массив — проверяйте оба значения ||
|| **rights**
[`object`](../../data-types.md) | Права текущего пользователя на результат [(подробное описание)](#rights) ||
|| **messageId**
[`integer`](../../data-types.md) | Идентификатор сообщения чата, из которого создан результат. `null`, если результат создан не из сообщения ||
|#

#### Объект author {#author}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|| **name**
[`string`](../../data-types.md) | Имя и фамилия пользователя ||
|| **role**
[`string`](../../data-types.md) | Роль пользователя. Может быть `null` ||
|| **gender**
[`string`](../../data-types.md) | Пол: `M` или `F` ||
|| **email**
[`string`](../../data-types.md) | Электронная почта пользователя ||
|| **externalAuthId**
[`string`](../../data-types.md) | Код внешней авторизации. `null` для обычных сотрудников ||
|| **rights**
[`array`](../../data-types.md) | Права пользователя. В ответе этого метода — пустой массив ||
|#

#### Объект rights {#rights}

#|
|| **Название**
`тип` | **Описание** ||
|| **edit**
[`boolean`](../../data-types.md) | Возвращает `true`, если текущий пользователь может изменить результат ||
|| **remove**
[`boolean`](../../data-types.md) | Возвращает `true`, если текущий пользователь может удалить результат ||
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

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Значение поля не может быть пустым | Передайте фильтр в виде массива условий ||
|| `taskId` | В поле `taskId` требуется тип данных `int` для такого запроса | Передайте `taskId` как число ||
|| `#FIELD#` | В DTO `ResultDto` в поле `#FIELD#` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по полям `taskId`, `id`, `authorId`, `status`, `messageId` ||
|| `#FIELD#` | В DTO `ResultDto` в поле `#FIELD#` требуется наличие атрибута `Sortable` для такого запроса | Сортируйте только по полям `id`, `authorId`, `createdAt`, `updatedAt`, `status`, `messageId` ||
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

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-task-result-add.md)
- [{#T}](./tasks-task-result-addfromchatmessage.md)
- [{#T}](./tasks-task-result-update.md)
- [{#T}](./tasks-task-result-delete.md)
