# Получить список задач task.item.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает массив задач, каждая из которых содержит массив полей (аналогичен массиву, возвращаемому [task.item.getdata](task-item-get-data.md)).

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [tasks.task.list](../../tasks-task-list.md).

{% endnote %}

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **ORDER**
[`object`](../../../data-types.md) | Массив вида `{'поле_сортировки': 'направление сортировки' [, ...]}` для сортировки результата. Поле для сортировки может принимать значения: 
- `TITLE` — название задачи 
- `DATE_START` — дата старта 
- `DEADLINE` — крайний срок 
- `STATUS` — статус 
- `PRIORITY` — приоритет 
- `MARK` — оценка 
- `CREATED_BY` — постановщик 
- `RESPONSIBLE_ID` — исполнитель 
- `GROUP_ID` — рабочая группа 

Направление сортировки может принимать значения: 
- `asc` — по возрастанию 
- `desc` — по убыванию 
  
Необязательный параметр. По умолчанию фильтруется по убыванию идентификатора задачи ||
|| **FILTER**
[`object`](../../../data-types.md) | Массив вида `{'фильтруемое_поле': 'значение фильтра' [, ...]}`. Фильтруемое поле может принимать значения:
- `ID` — идентификатор задачи
- `PARENT_ID` — идентификатор родительской задачи
- `GROUP_ID` — идентификатор рабочей группы
- `CREATED_BY` — постановщик
- `STATUS_CHANGED_BY` — пользователь, последним изменивший статус задачи
- `PRIORITY` — приоритет
- `FORUM_TOPIC_ID` — идентификатор темы форума
- `RESPONSIBLE_ID` — исполнитель
- `TITLE` — название задачи (можно искать по шаблону `[%_]`)
- `TAG` — тег
- `REAL_STATUS` — статус задачи. Константы, отражающие статусы задач:
    - `STATE_NEW` = 1
    - `STATE_PENDING` = 2
    - `STATE_IN_PROGRESS` = 3
    - `STATE_SUPPOSEDLY_COMPLETED` = 4
    - `STATE_COMPLETED` = 5
    - `STATE_DEFERRED` = 6
    - `STATE_DECLINED` = 7
- `STATUS` — статус для сортировки. Аналогичен `REAL_STATUS`, но имеет дополнительно два мета-статуса:
    - `-2` — непросмотренная задача
    - `-1` — просроченная задача
- `MARK` — оценка
- `SITE_ID` — идентификатор сайта
- `ADD_IN_REPORT` — задача в отчете (Y\|N)
- `DATE_START` — дата начала выполнения
- `DEADLINE` — крайний срок
- `CREATED_DATE` — дата создания
- `CLOSED_DATE` — дата завершения
- `CHANGED_DATE` — дата последнего изменения
- `ACCOMPLICE` — идентификатор соисполнителя
- `AUDITOR` — идентификатор аудитора
- `DEPENDS_ON` — идентификатор предыдущей задачи
- `ONLY_ROOT_TASKS` — только задачи, которые не являются подзадачами (корневые задачи), а также подзадачи родительской задачи, к которой текущий пользователь доступа не имеет (Y\|N)

Перед названием фильтруемого поля может указать тип фильтрации:
- `!` — не равно
- `<` — меньше
- `<=` — меньше либо равно
- `>` — больше
- `>=` — больше либо равно

Значения фильтра — одиночное значение или массив.

Необязательный параметр. По умолчанию записи не фильтруются.

Для метода `task.item.list` обязательно нужно указывать сортировку для фильтрации. Фильтрация без сортировки возвращает все задачи
||
|| **PARAMS**
[`array`](../../../data-types.md) | Массив для опций вызова. Элементом является массив `NAV_PARAMS` вида `{'опция вызова': 'значение' [, ...]}`, хранящий следующие опции:
- `nPageSize` — количество элементов на странице. В целях ограничения нагрузки на постраничную навигацию наложено ограничение в 50 задач
- `iNumPage` — номер страницы при постраничной навигации ||
|| **SELECT**
[`array`](../../../data-types.md) | Массив полей записей, которые будут возвращены методом. Если в массиве присутствует значение `"*"`, то будут возвращены все доступные поля. 

Значение по умолчанию (пустой массив `array()`) означает, что будут возвращены все поля основной таблицы запроса ||
|#

Соблюдение порядка следования параметров в запросе обязательно. При его нарушении запрос будет выполнен с ошибками.

Однако, если какие-то параметры нужно пропустить, то их все равно нужно передать, но в виде пустых массивов: `ORDER[]=&FILTER[]=&PARAMS[]=&SELECT[]=`.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Получить список всех задач (по умолчанию сработает ограничение — постраничная навигация по 50 элементов).

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.item.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/task.item.list?auth=**put_access_token_here**
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (each task is a map of field values)
    type TaskItemListResult = Record<string, unknown>[]

    try {
      // task.item.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<TaskItemListResult>({
        method: 'task.item.list',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Tasks fetched:', result.length)
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
      async function fetchTaskList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // task.item.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'task.item.list',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Tasks fetched:', result.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchTaskList)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.item.list',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Data: ' . print_r($result, true);
        echo 'Full Result: ' . print_r($response, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching task list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.item.list',
        [],
        function(result)
        {
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'task.item.list',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Получить список задач с идентификаторами 1, 2, 3, 4, 5, 6, причем выбрать только поля `ID` и `TITLE`. Режим постраничной навигации — по 2 элемента на странице, 2-ая страница. Сортировка по ID — по убыванию.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"ID":"desc"},"filter":{"ID":[1,2,3,4,5,6]},"params":{"NAV_PARAMS":{"nPageSize":2,"iNumPage":2}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.item.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"ID":"desc"},"filter":{"ID":[1,2,3,4,5,6]},"params":{"NAV_PARAMS":{"nPageSize":2,"iNumPage":2}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.item.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (each task is a map of field values)
    type TaskItemListResult = Record<string, unknown>[]

    try {
      // task.item.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<TaskItemListResult>({
        method: 'task.item.list',
        params: {
          order: { ID: 'desc' },
          filter: { ID: [1, 2, 3, 4, 5, 6] },
          params: {
            NAV_PARAMS: {
              nPageSize: 2,
              iNumPage: 2,
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Tasks on page:', result.length)
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
      async function fetchFilteredTaskList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // task.item.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'task.item.list',
            params: {
              order: { ID: 'desc' },
              filter: { ID: [1, 2, 3, 4, 5, 6] },
              params: {
                NAV_PARAMS: {
                  nPageSize: 2,
                  iNumPage: 2,
                },
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
          console.info('Tasks on page:', result.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchFilteredTaskList)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.item.list',
                [
                    ['ID' => 'desc'], // Сортировка по ID — по убыванию.
                    ['ID' => [1, 2, 3, 4, 5, 6]], // Фильтр
                    [
                        'NAV_PARAMS' => [ // постраничка
                            'nPageSize' => 2, // по 2 элемента на странице.
                            'iNumPage'  => 2 // страница номер 2
                        ]
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching task list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.item.list',
        [
            {ID : 'desc'},        // Сортировка по ID — по убыванию.
            {ID: [1,2,3,4,5,6]},    // Фильтр
            {    
                NAV_PARAMS: { // постраничка
                    nPageSize : 2,    // по 2 элемента на странице.
                    iNumPage : 2    // страница номер 2        
                }
            }
        ],
        function(result)
        {
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'task.item.list',
        [
            'order' => ['ID' => 'desc'],
            'filter' => ['ID' => [1, 2, 3, 4, 5, 6]],
            'params' => [
                'NAV_PARAMS' => [
                    'nPageSize' => 2,
                    'iNumPage' => 2
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}






