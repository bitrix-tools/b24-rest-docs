# Получить список задач tasks.task.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.list` получает список задач с постраничной навигацией.

Доступ к данным зависит от прав:
- администратор видит все задачи,
- руководитель — задачи своих сотрудников,
- остальные видят только доступные им задачи.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **order**
[`object`](../data-types.md) | Объект для сортировки списка задач в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Направление сортировки может принимать значения: 

- `asc` — по возрастанию
- `desc` — по убыванию

По умолчанию — по убыванию `ID`.

Поле для сортировки может принимать значения: 
- `ID` — идентификатор задачи  
- `TITLE` — название задачи  
- `TIME_SPENT_IN_LOGS` — затраченное время, зафиксированное в истории изменений  
- `DATE_START` — дата старта задачи  
- `CREATED_DATE` — дата создания задачи  
- `CHANGED_DATE` — дата последнего изменения задачи  
- `CLOSED_DATE` — дата завершения задачи  
- `ACTIVITY_DATE` — дата последней активности  
- `START_DATE_PLAN` — плановая дата начала выполнения задачи  
- `END_DATE_PLAN` — плановая дата завершения выполнения задачи  
- `DEADLINE` — крайний срок выполнения задачи  
- `REAL_STATUS` — статус задачи  
- `STATUS_COMPLETE` — флаг завершённости задачи  
- `PRIORITY` — приоритет задачи  
- `MARK` — оценка за выполнение задачи  
- `CREATED_BY_LAST_NAME` — фамилия постановщика задачи  
- `RESPONSIBLE_LAST_NAME` — фамилия исполнителя задачи  
- `GROUP_ID` — идентификатор рабочей группы  
- `TIME_ESTIMATE` — время, выделенное на задачу  
- `ALLOW_CHANGE_DEADLINE` — флаг, разрешающий исполнителю менять крайний срок  
- `ALLOW_TIME_TRACKING` — флаг, включающий учёт затраченного времени по задаче  
- `MATCH_WORK_TIME` — флаг, указывающий на необходимость пропускать выходные дни  
- `FAVORITE` — флаг, указывающий, что задача добавлена в избранное  
- `SORTING` — индекс сортировки  
- `IS_PINNED` — признак «закреплено»  
- `IS_PINNED_IN_GROUP` — признак «закреплена в группе»

||
|| **filter**
[`object`](../data-types.md) | 	Объект для фильтрации списка задач в формате `{"field_1": "value_1", ... "field_N": "value_N"}`. Фильтруемое поле может принимать значения:

- `ID` — идентификатор задачи  
- `PARENT_ID` — идентификатор родительской задачи  
- `GROUP_ID` — идентификатор рабочей группы  
- `CREATED_BY` — постановщик  
- `STATUS_CHANGED_BY` — пользователь, последним изменивший статус задачи  
- `PRIORITY` — приоритет  
- `FORUM_TOPIC_ID` — идентификатор темы форума  
- `RESPONSIBLE_ID` — исполнитель  
- `TITLE` — название задачи (можно искать по шаблону [\%_])  
- `TAG` — тег задачи  
- `REAL_STATUS` — статус задачи. Соответствует полю `status` в ответе.
    - `2` — ждет выполнения
    - `3` — выполняется
    - `4` — ожидает контроля
    - `5` — завершена
    - `6` — отложена  
- `STATUS` — статус для сортировки. Соответствует полю `subStatus` в ответе. Аналогичен `REAL_STATUS`, но имеет три дополнительных мета-статуса:
    - `-3` — задача почти просрочена
    - `-2` — не просмотренная задача
    - `-1` — просроченная задача
- `MARK` — оценка  
- `SITE_ID` — идентификатор сайта  
- `ADD_IN_REPORT` — задача в отчёте  
- `DATE_START` — дата начала выполнения  
- `DEADLINE` — крайний срок  
- `CREATED_DATE` — дата создания  
- `CLOSED_DATE` — дата завершения  
- `CHANGED_DATE` — дата последнего изменения  
- `ACCOMPLICE` — идентификатор соисполнителя  
- `AUDITOR` — идентификатор наблюдателя  
- `DEPENDS_ON` — идентификатор предыдущей задачи  
- `ONLY_ROOT_TASKS` — только корневые задачи и подзадачи без доступа к родителю  
- `STAGE_ID` — стадия  
- `SPRINT_ID` — идентификатор спринта  
- `BACKLOG_ID` — идентификатор бэклога  
- `UF_CRM_TASK` — привязка к элементам CRM

Чтобы получить задачи из Избранного, добавьте в фильтр параметр `$filter[::SUBFILTER-PARAMS][FAVORITE]=Y`.

Перед названием фильтруемого поля можно указать тип фильтрации:
- `!` — не равно
- `<` — меньше
- `<=` — меньше либо равно
- `>` — больше
- `>=` — больше либо равно

По умолчанию записи не фильтруются ||
|| **select**
[`array`](../data-types.md) | Массив содержит [список полей](./fields.md), которые необходимо выбрать. 

По умолчанию система возвращает только те поля, которые хранятся в записи — без дополнительных данных, рассчитываемых на лету.

{% note warning %}

Всегда указывайте поля в `select`. Набор полей по умолчанию может измениться.

{% endnote %}
||
|| **params**
[`object`](../data-types.md) | Дополнительная информация, которую можно получить по задаче:
- `WITH_RESULT_INFO` — информация о результате в задаче
- `WITH_TIMER_INFO` — данные о затраченном времени
- `WITH_PARSED_DESCRIPTION` — описание с HTML-разметкой
||
|| **start**
[`integer`](../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N - 1) * 50`, где `N` — номер нужной страницы ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"DEADLINE":"asc","PRIORITY":"desc"},"filter":{"!STATUS":6,">=DEADLINE":"'"$(date +%Y-%m-%d)"'","RESPONSIBLE_ID":547,"::SUBFILTER-PARAMS":{"FAVORITE":"Y"}},"select":["ID","TITLE","DESCRIPTION","STATUS","subStatus","DEADLINE","CREATED_DATE","RESPONSIBLE_ID","ACCOMPLICES","AUDITORS","TAGS","COUNTERS","PRIORITY","MARK"],"params":{"WITH_TIMER_INFO":true,"WITH_RESULT_INFO":true,"WITH_PARSED_DESCRIPTION":true}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.task.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"DEADLINE":"asc","PRIORITY":"desc"},"filter":{"!STATUS":6,">=DEADLINE":"'"$(date +%Y-%m-%d)"'","RESPONSIBLE_ID":547,"::SUBFILTER-PARAMS":{"FAVORITE":"Y"}},"select":["ID","TITLE","DESCRIPTION","STATUS","subStatus","DEADLINE","CREATED_DATE","RESPONSIBLE_ID","ACCOMPLICES","AUDITORS","TAGS","COUNTERS","PRIORITY","MARK"],"params":{"WITH_TIMER_INFO":true,"WITH_RESULT_INFO":true,"WITH_PARSED_DESCRIPTION":true},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.task.list
    ```

- TS

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of a single task in result.tasks. Only the fields read below are typed here;
    // the request selects more — add them to this type as you start using them.
    type TaskListItem = {
      id: string
      title: string
      status: string
      deadline: ISODate | null
      responsibleId: string
    }

    try {
      // tasks.task.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<{ tasks: TaskListItem[] }>({
        method: 'tasks.task.list',
        params: {
          // Sorting: nearest deadline first, then higher priority
          order: { DEADLINE: 'asc', PRIORITY: 'desc' },
          filter: {
            '!STATUS': 6, // exclude deferred tasks
            '>=DEADLINE': new Date().toISOString().split('T')[0], // not overdue (UTC date; adjust to the portal time zone if needed)
            RESPONSIBLE_ID: 547, // tasks of a specific responsible person
            '::SUBFILTER-PARAMS': { FAVORITE: 'Y' } // favorites only
          },
          // Request only the fields you need
          select: [
            'ID', 'TITLE', 'DESCRIPTION', 'STATUS', 'subStatus',
            'DEADLINE', 'CREATED_DATE', 'RESPONSIBLE_ID',
            'ACCOMPLICES', 'AUDITORS', 'TAGS', 'COUNTERS',
            'PRIORITY', 'MARK'
          ],
          // Extra computed data
          params: {
            WITH_TIMER_INFO: true,
            WITH_RESULT_INFO: true,
            WITH_PARSED_DESCRIPTION: true
          },
          // Page offset (not the page number): the page size is fixed at 50, so the
          // Nth page is start = (N - 1) * 50.
          start: 0
        },
        requestId: Text.getUuidRfc4122() // optional unique tracking id for this request
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const tasks = response.getData()!.result.tasks
        // getTotal() is deprecated (removed in SDK 2.0); for the full match count fetch
        // everything via a list helper (see above) and read its length.
        console.info(`Loaded ${tasks.length} tasks (one page)`)
        for (const task of tasks) {
          console.info(`#${task.id}: ${task.title}`)
        }
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- UMD

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function listTasks() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // tasks.task.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'tasks.task.list',
            params: {
              // Sorting: nearest deadline first, then higher priority
              order: { DEADLINE: 'asc', PRIORITY: 'desc' },
              filter: {
                '!STATUS': 6, // exclude deferred tasks
                '>=DEADLINE': new Date().toISOString().split('T')[0], // not overdue (UTC date; adjust to the portal time zone if needed)
                RESPONSIBLE_ID: 547, // tasks of a specific responsible person
                '::SUBFILTER-PARAMS': { FAVORITE: 'Y' } // favorites only
              },
              // Request only the fields you need
              select: [
                'ID', 'TITLE', 'DESCRIPTION', 'STATUS', 'subStatus',
                'DEADLINE', 'CREATED_DATE', 'RESPONSIBLE_ID',
                'ACCOMPLICES', 'AUDITORS', 'TAGS', 'COUNTERS',
                'PRIORITY', 'MARK'
              ],
              // Extra computed data
              params: {
                WITH_TIMER_INFO: true,
                WITH_RESULT_INFO: true,
                WITH_PARSED_DESCRIPTION: true
              },
              // Page offset (not the page number): the page size is fixed at 50, so the
              // Nth page is start = (N - 1) * 50.
              start: 0
            },
            requestId: B24Js.Text.getUuidRfc4122() // optional unique tracking id for this request
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const tasks = response.getData().result.tasks
          // getTotal() is deprecated (removed in SDK 2.0); for the full match count fetch
          // everything via a list helper (see above) and read its length.
          console.info(`Loaded ${tasks.length} tasks (one page)`)
          for (const task of tasks) {
            console.info(`#${task.id}: ${task.title}`)
          }
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listTasks)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.task.list',
                [
                    'order' => [
                        'DEADLINE' => 'asc',
                        'PRIORITY' => 'desc'
                    ],
                    'filter' => [
                        '!STATUS' => 6,
                        '>=DEADLINE' => date('Y-m-d'),
                        'RESPONSIBLE_ID' => 547,
                        '::SUBFILTER-PARAMS' => ['FAVORITE' => 'Y']
                    ],
                    'select' => [
                        'ID', 'TITLE', 'DESCRIPTION', 'STATUS', 'subStatus',
                        'DEADLINE', 'CREATED_DATE', 'RESPONSIBLE_ID',
                        'ACCOMPLICES', 'AUDITORS', 'TAGS', 'COUNTERS',
                        'PRIORITY', 'MARK'
                    ],
                    'params' => [
                        'WITH_TIMER_INFO' => true,
                        'WITH_RESULT_INFO' => true,
                        'WITH_PARSED_DESCRIPTION' => true,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching tasks: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.task.list',
        {
            // Сортировка
            order: {
                'DEADLINE': 'asc',
                'PRIORITY': 'desc'
            },
            // Фильтрация
            filter: {
                '!STATUS': 6, // Исключить отложенные
                '>=DEADLINE': new Date().toISOString().split('T')[0], // Не просроченные
                'RESPONSIBLE_ID': 547, // Задачи конкретного исполнителя
                '::SUBFILTER-PARAMS': { 'FAVORITE': 'Y' } // Задачи из избранного
            },
            // Поля для выборки
            select: [
                'ID',
                'TITLE',
                'DESCRIPTION',
                'STATUS',
                'subStatus',
                'DEADLINE',
                'CREATED_DATE',
                'RESPONSIBLE_ID',
                'ACCOMPLICES',
                'AUDITORS',
                'TAGS',
                'COUNTERS',
                'PRIORITY',
                'MARK'
            ],
            // Дополнительные параметры
            params: {
                'WITH_TIMER_INFO': true,
                'WITH_RESULT_INFO': true,
                'WITH_PARSED_DESCRIPTION': true,
            },
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.task.list',
        [
            'order' => [
                'DEADLINE' => 'asc',
                'PRIORITY' => 'desc'
            ],
            'filter' => [
                '!STATUS' => 6,
                '>=DEADLINE' => date('Y-m-d'),
                'RESPONSIBLE_ID' => 547,
                '::SUBFILTER-PARAMS' => ['FAVORITE' => 'Y']
            ],
            'select' => [
                'ID', 'TITLE', 'DESCRIPTION', 'STATUS', 'subStatus',
                'DEADLINE', 'CREATED_DATE', 'RESPONSIBLE_ID',
                'ACCOMPLICES', 'AUDITORS', 'TAGS', 'COUNTERS',
                'PRIORITY', 'MARK'
            ],
            'params' => [
                'WITH_TIMER_INFO' => true,
                'WITH_RESULT_INFO' => true,
                'WITH_PARSED_DESCRIPTION' => true,
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
        "tasks": [
            {
                "id": "8017",
                "title": "Пример задачи",
                "description": "Описание задачи с [B]форматированием[/B]",
                "deadline": "2025-10-24T19:00:00+03:00",
                "createdDate": "2025-06-04T16:15:55+03:00",
                "responsibleId": "547",
                "priority": "2",
                "mark": "",
                "descriptionInBbcode": "Y",
                "lengthDeadline": "1",
                "status": "2",
                "auditors": [
                    "13",
                    "103"
                ],
                "accomplices": [],
                "group": [],
                "responsible": {
                    "id": "547",
                    "name": "Мария",
                    "link": "/company/personal/user/547/",
                    "icon": "/bitrix/images/tasks/default_avatar.png",
                    "workPosition": "Тестировщик"
                },
                "accomplicesData": [],
                "auditorsData": {
                    "13": {
                        "id": "13",
                        "name": "Иван Иванов",
                        "link": "/company/personal/user/13/",
                        "icon": "https://mysite.ru/b17053/resize_cache/209/c0120a8d7c10d63c83e32398d1ec4d9e/main/c8dd225a1c6ea0a25722d01644b90fe4/8b.jpg",
                        "workPosition": "Системный администратор"
                    },
                    "103": {
                        "id": "103",
                        "name": "Светлана Иванова",
                        "link": "/company/personal/user/103/",
                        "icon": "https://mysite.ru/b17053/resize_cache/8644/c0120a8d7c10d63c83e32398d1ec4d9e/main/45f/45fff10d17d398a5583184c8350cd197/buh.jpg",
                        "workPosition": "Бухгалтер"
                    }
                },
                "taskRequireResult": "Y",
                "taskHasOpenResult": "N",
                "taskHasResult": "Y",
                "timeElapsed": null,
                "timerIsRunningForCurrentUser": "N",
                "parsedDescription": "Описание задачи с [B]форматированием[/B]",
                "counter": {
                    "counters": {
                        "expired": 0,
                        "newComments": 0,
                        "projectExpired": 0,
                        "projectNewComments": 0,
                        "mutedExpired": 0,
                        "mutedNewComments": 0
                    },
                    "color": "gray",
                    "value": 0
                },
                "tags": {
                    "35": {
                        "id": 35,
                        "title": "арпар"
                    }
                },
                "subStatus": "2"
            }
        ]
    },
    "total": 1,
    "time": {
        "start": 1761054322,
        "finish": 1761054322.348041,
        "duration": 0.3480410575866699,
        "processing": 0,
        "date_start": "2025-10-21T16:45:22+03:00",
        "date_finish": "2025-10-21T16:45:22+03:00",
        "operating_reset_at": 1761054922,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Объект с данными ответа ||
|| **tasks**
[`object`](../data-types.md) | Массив объектов, где каждый объект содержит [описание задачи](./fields.md).

Набор полей зависит от параметра `select` ||
|| **total**
[`integer`](../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Неверный ключ сортировки (internal error)"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Неверный ключ сортировки (internal error) | В параметре `order` указано поле задачи, по которому нельзя сортировать, или несуществующее поле ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./tasks-task-add.md)
- [{#T}](./tasks-task-update.md)
- [{#T}](./tasks-task-get.md)
- [{#T}](./tasks-task-delete.md)
- [{#T}](./tasks-task-get-fields.md)
- [{#T}](../../tutorials/tasks/how-to-create-comment-with-file.md)
- [{#T}](../../tutorials/tasks/how-to-upload-file-to-task.md)
- [{#T}](../../tutorials/tasks/how-to-create-task-with-file.md)
- 
