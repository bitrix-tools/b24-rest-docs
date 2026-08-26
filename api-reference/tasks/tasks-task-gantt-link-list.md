# Получить список Gantt-связей задачи tasks.task.gantt.link.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к задаче

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../rest-v3.md).

{% endnote %}

Метод `tasks.task.gantt.link.list` возвращает список исходящих Gantt-связей задачи. В ответе есть идентификатор связанной задачи и тип связи: Start-Start, Start-Finish, Finish-Start или Finish-Finish.

Метод не создает и не удаляет связи. Для создания связей используйте [task.dependence.add](./task-dependence-add.md), для удаления — [task.dependence.delete](./task-dependence-delete.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../data-types.md) | Фильтр для выбора Gantt-связей задачи.

Передайте обязательное условие по полю `taskId` в формате `["taskId", 101]`.

Доступное поле фильтра:
- `taskId` — идентификатор задачи. Метод проверяет право на чтение этой задачи ||
|| **select**
[`array`](../data-types.md) | Массив полей, которые нужно вернуть.

Если параметр не передан, метод вернет все поля Gantt-связи.

Доступные поля:
- `taskId` — идентификатор задачи
- `dependentId` — идентификатор задачи, с которой связана задача `taskId`
- `type` — тип Gantt-связи
- `creatorId` — идентификатор пользователя, который создал связь ||
|| **pagination**
[`object`](../data-types.md) | Объект для управления постраничной навигацией.

Параметры постраничной навигации:
- `page` — номер страницы. Если значение меньше единицы, используется первая страница
- `limit` — количество элементов на странице. По умолчанию `50`, максимальное значение `1000`
- `offset` — смещение от начала списка. По умолчанию `0`

Если переданы `page` и `offset`, применяется смещение, рассчитанное по `page`.

Список сортируется по `dependentId` по возрастанию. Параметр `order` не поддерживается ||
|#

### Типы Gantt-связей {#link-types}

#|
|| **Значение** | **Описание** ||
|| `start_start` | Start-Start: начало задачи зависит от начала связанной задачи ||
|| `start_finish` | Start-Finish: начало задачи зависит от завершения связанной задачи ||
|| `finish_start` | Finish-Start: завершение задачи зависит от начала связанной задачи ||
|| `finish_finish` | Finish-Finish: завершение задачи зависит от завершения связанной задачи ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.task.gantt.link.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":["taskId",101],"select":["taskId","dependentId","type","creatorId"],"pagination":{"limit":10,"offset":0}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.task.gantt.link.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":["taskId",101],"select":["taskId","dependentId","type","creatorId"],"pagination":{"limit":10,"offset":0},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.task.gantt.link.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type GanttLinkType = 'start_start' | 'start_finish' | 'finish_start' | 'finish_finish'

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type GanttLinkListResult = {
      items: {
        taskId: number
        dependentId: number
        type: GanttLinkType
        creatorId: number
      }[]
    }

    try {
      const response = await $b24.actions.v3.call.make<GanttLinkListResult>({
        method: 'tasks.task.gantt.link.list',
        params: {
          filter: ['taskId', 101],
          select: ['taskId', 'dependentId', 'type', 'creatorId'],
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
      async function fetchGanttLinks() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'tasks.task.gantt.link.list',
            params: {
              filter: ['taskId', 101],
              select: ['taskId', 'dependentId', 'type', 'creatorId'],
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

      document.addEventListener('DOMContentLoaded', fetchGanttLinks)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    filter = [
        "taskId",
        101,
    ]

    select = [
        "taskId",
        "dependentId",
        "type",
        "creatorId",
    ]

    pagination = {
        "limit": 10,
        "offset": 0,
    }

    try:
        bitrix_response = client.tasks.task.gantt.link.list(
            filter=filter,
            select=select,
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
                'tasks.task.gantt.link.list',
                [
                    'filter' => ['taskId', 101],
                    'select' => ['taskId', 'dependentId', 'type', 'creatorId'],
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
        'tasks.task.gantt.link.list',
        {
            filter: ['taskId', 101],
            select: ['taskId', 'dependentId', 'type', 'creatorId'],
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
        'tasks.task.gantt.link.list',
        [
            'filter' => ['taskId', 101],
            'select' => ['taskId', 'dependentId', 'type', 'creatorId'],
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
    res, err := client.Core().Call(ctx, "tasks.task.gantt.link.list", b24.Params{
    	"filter": []any{"taskId", 101},
    	"select": []string{"taskId", "dependentId", "type", "creatorId"},
    	"pagination": b24.Params{
    		"limit":  10,
    		"offset": 0,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("tasks.task.gantt.link.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "items".
    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа items")
    }

    var items []struct {
    	TaskID      b24.ID `json:"taskId"`
    	DependentID b24.ID `json:"dependentId"`
    	Type        string `json:"type"`
    	CreatorID   b24.ID `json:"creatorId"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.DependentID, it.Type)
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
                "taskId": 101,
                "dependentId": 205,
                "type": "finish_start",
                "creatorId": 1
            }
        ]
    },
    "time": {
        "start": 1787754442,
        "finish": 1787754442.612709,
        "duration": 0.6127090454101562,
        "processing": 0,
        "date_start": "2026-08-26T17:27:22+03:00",
        "date_finish": "2026-08-26T17:27:22+03:00",
        "operating_reset_at": 1787755042,
        "operating": 0
    }
}
```

Если у задачи нет исходящих Gantt-связей, метод вернет пустой массив `items`.

```json
{
    "result": {
        "items": []
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Объект с данными ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **items**
[`array`](../data-types.md) | Массив Gantt-связей задачи.

Поля элементов зависят от параметра `select` ||
|#

#### Объект Gantt-связи {#gantt-link}

#|
|| **Название**
`тип` | **Описание** ||
|| **taskId**
[`integer`](../data-types.md) | Идентификатор задачи ||
|| **dependentId**
[`integer`](../data-types.md) | Идентификатор задачи, с которой связана задача `taskId` ||
|| **type**
[`string`](../data-types.md) | Тип связи. Возможные значения описаны в таблице [Типы Gantt-связей](#link-types) ||
|| **creatorId**
[`integer`](../data-types.md) | Идентификатор пользователя, который создал связь ||
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

{% include notitle [обработка ошибок](../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Значение поля не может быть пустым | Передайте фильтр `["taskId", 101]`, где `101` — идентификатор задачи ||
|| `taskId` | В поле `taskId` требуется тип данных `int` для такого запроса | Передайте `taskId` как число больше нуля ||
|| `filter`
`order` | Поле не поддерживает фильтрацию или сортировку | В `filter` передайте только `taskId`. Не передавайте параметр `order`, порядок фиксирован ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.taskId` | Требуется указать фильтр по обязательному полю `taskId` | Передайте фильтр `["taskId", 101]` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра | Передайте фильтр как массив, например `["taskId", 101]`. Объект `{"taskId": 101}` не поддерживается ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter`
`select`
`order` | Неизвестное поле `#FIELD#` для объекта `GanttLinkDto` | Передайте только поля `taskId`, `dependentId`, `type`, `creatorId`. В `filter` доступен только `taskId` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `#SELECT#` | Передайте `select` как массив строк, например `["taskId","dependentId","type"]` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации | Передайте `page`, `limit` или `offset` как числа. `limit` должен быть больше нуля, `offset` — не меньше нуля ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `taskId` | Доступ запрещен | Проверьте права пользователя на чтение задачи ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-task-get-rest-v3.md)
- [{#T}](./tasks-task-list-rest-v3.md)
- [{#T}](./task-dependence-add.md)
- [{#T}](./task-dependence-delete.md)
