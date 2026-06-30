# Получить список задач tasks.task.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.list` возвращает список задач по заданным условиям.

Доступ к данным зависит от прав:
- администратор видит все задачи
- руководитель — задачи своих сотрудников
- остальные видят только доступные им задачи

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Список полей, которые нужно вернуть в ответе. Если `select` не задан, метод возвращает только `id` задачи.

Названия полей для `select` совпадают с ключами объекта задачи из блока [Объект задачи](./fields.md#taskdto) ||
|| **filter**
[`array`](../../data-types.md) | Условия фильтрации задач в формате:
- `["field", "operator", value]`
- `["field", value]`, оператор по умолчанию `=`

В REST 3.0 для задач поддержана фильтрация по полю `id`.

[Подробнее о работе фильтрации в REST 3.0](../index.md#filter) ||
|| **order**
[`object`](../../data-types.md) | Сортировка результатов в формате `{ "field": "value" }`.

Доступные значения:
- `ASC` — по возрастанию
- `DESC` — по убыванию

Доступные поля для сортировки: `id`, `title`, `creatorId`, `created`, `responsibleId`, `deadline`, `startPlan`, `endPlan`, `groupId`, `priority`, `status`, `started`, `estimatedTime`, `changed`, `closed`, `activity`, `mark`, `allowsChangeDeadline`, `allowsTimeTracking`.

Описание полей смотрите в блоке [Объект задачи](./fields.md#taskdto)

По умолчанию задачи сортируются по `id` по возрастанию ||
|| **pagination**
[`object`](../../data-types.md) | Параметры постраничной навигации:
- `page` — номер страницы
- `limit` — количество задач на страницу, по умолчанию `50`, максимум `1000`
- `offset` — смещение задач. Если переданы `page` и `limit`, смещение вычисляется автоматически ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.task.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","title","responsibleId","deadline","status"],"filter":[["id",">",1000]],"order":{"id":"ASC"},"pagination":{"page":1,"limit":20,"offset":0}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.task.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","title","responsibleId","deadline","status"],"filter":[["id",">",1000]],"order":{"id":"ASC"},"pagination":{"page":1,"limit":20,"offset":0},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.task.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type TaskListItem = {
      id: number
      title: string
      responsibleId: number
      deadline: ISODate | null
      status: string
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TaskListResult = {
      items: TaskListItem[]
    }

    try {
      // tasks.task.list returns a single page. For the whole result set
      // use a list helper: $b24.actions.v3.callList.make() returns every record as one
      // array, $b24.actions.v3.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `pagination` variant when sort matters.
      const response = await $b24.actions.v3.call.make<TaskListResult>({
        method: 'tasks.task.list',
        params: {
          select: [
            'id',
            'title',
            'responsibleId',
            'deadline',
            'status',
          ],
          filter: [
            ['id', '>', 1000],
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
        console.info('Tasks:', result.items)
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
      async function listTasks() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'tasks.task.list',
            params: {
              select: [
                'id',
                'title',
                'responsibleId',
                'deadline',
                'status',
              ],
              filter: [
                ['id', '>', 1000],
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
          console.info('Tasks:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listTasks)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.task.list',
                [
                    'select' => [
                        'id',
                        'title',
                        'responsibleId',
                        'deadline',
                        'status',
                    ],
                    'filter' => [
                        ['id', '>', 1000],
                    ],
                    'order' => [
                        'id' => 'ASC',
                    ],
                    'pagination' => [
                        'page' => 1,
                        'limit' => 20,
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
        echo 'Error fetching tasks: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'tasks.task.list',
        {
            select: [
                'id',
                'title',
                'responsibleId',
                'deadline',
                'status'
            ],
            filter: [
                ['id', '>', 1000]
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
        'tasks.task.list',
        [
            'select' => [
                'id',
                'title',
                'responsibleId',
                'deadline',
                'status'
            ],
            'filter' => [
                ['id', '>', 1000]
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
                "id": 3835,
                "title": "Собрать обратную связь",
                "responsibleId": 93,
                "deadline": "2026-12-25T23:00:00+03:00",
                "status": "pending"
            },
            {
                "id": 3836,
                "title": "Подготовить договор",
                "responsibleId": 29,
                "deadline": null,
                "status": "in_progress"
            },
            {
                "id": 3837,
                "title": "Согласовать смету",
                "responsibleId": 171,
                "deadline": "2025-12-27T18:00:00+03:00",
                "status": "completed"
            }
        ]
    },
    "time": {
        "start": 1765445133,
        "finish": 1765445134.139558,
        "duration": 1.1395580768585205,
        "processing": 1,
        "date_start": "2026-06-17T12:25:33+03:00",
        "date_finish": "2026-06-17T12:25:34+03:00",
        "operating_reset_at": 1765445733,
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
[`array`](../../data-types.md) | Массив объектов задач ||
|| **items[]**
[`object`](../../data-types.md) | Объект задачи. Набор полей зависит от параметра `select`. Если `select` не задан, метод возвращает только `id`.

Описание полей смотрите в блоке [Объект задачи](./fields.md#taskdto) ||
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
|| `-` | Доступ запрещен | Проверьте права пользователя и scope `tasks` ||
|#

#### Ошибки фильтрации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `#FIELD#` | В DTO `TaskDto` в поле `#FIELD#` требуется наличие атрибута `Filterable` для такого запроса | Используйте в фильтре только поле `id` ||
|#

#### Ошибки сортировки

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `order` | Не удается распознать параметр сортировки `#ORDER#` | Передайте направление `ASC` или `DESC` и поле, доступное для сортировки ||
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

- [{#T}](./tasks-task-get.md)
- [{#T}](./tasks-task-update.md)
- [{#T}](./tasks-task-delete.md)
- [{#T}](./tasks-task-field-list.md)
- [{#T}](./fields.md)
