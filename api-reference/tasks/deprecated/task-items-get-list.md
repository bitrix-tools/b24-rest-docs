# Получить список задач task.items.getlist

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает массив задач, каждая из которых содержит массив полей (аналогичен массиву, возвращаемому [task.item.getdata](task-item/task-item-get-data.md)).

{% note warning %}

Вместо данного метода следует использовать методы [`task.item.*`](task-item/index.md).

{% endnote %}

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **ORDER**
[`object`](../../data-types.md) | Массив вида `{'поле_сортировки': 'направление сортировки' [, ...]}` для сортировки результата. Поле для сортировки может принимать значения: 
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
  
Необязательный параметр. По умолчанию фильтруется по убыванию идентификатора задачи. 

Допускается сортировка по пользовательским полям 
||
|| **FILTER**
[`object`](../../data-types.md) | Массив вида `{'фильтруемое_поле': "значение фильтра" [, ...]}`. Фильтруемое поле может принимать значения: 
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
- `REAL_STATUS` — статус задачи с возможными значениями:
    - `STATE_NEW` = 1
    - `STATE_PENDING` = 2
    - `STATE_IN_PROGRESS` = 3
    - `STATE_SUPPOSEDLY_COMPLETED` = 4
    - `STATE_COMPLETED` = 5
    - `STATE_DEFERRED` = 6
    - `STATE_DECLINED` = 7
- `STATUS` — статус для сортировки. Аналогичен `REAL_STATUS`, но также включает мета-статусы:
    - `-2` — непросмотренная задача
    - `-1` — просроченная задача
- `MARK` — оценка
- `XML_ID` — внешний код
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
- `SUBORDINATE_TASKS` — задачи текущего пользователя и его подчиненных (Y\|N)
- `OVERDUED` — были просрочены (Y\|N)
- `DEPARTMENT_ID` — идентификатор отдела

Перед названием фильтруемого поля можно указать тип фильтрации:
- `!` — не равно
- `<` — меньше
- `<=` — меньше либо равно
- `>` — больше
- `>=` — больше либо равно
  
Значения фильтра — одиночное значение или массив. 

Необязательный параметр. По умолчанию записи не фильтруются ||
|| **TASKDATA**
[`array`](../../data-types.md) | Массив возвращаемых полей задачи ||
|| **NAV_PARAMS**
[`array`](../../data-types.md) | Постраничная навигация. Доступна опция `iNumPage` — номер страницы ||
|#

Соблюдение порядка следования параметров в запросе обязательно. При его нарушении запрос будет выполнен с ошибками.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Получить список всех задач (по умолчанию сработает ограничение — постраничная навигация по 50 элементов).

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.items.getlist
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/task.items.getlist?auth=**put_access_token_here**
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'task.items.getlist',
        {},
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('task.items.getlist', {}, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('task.items.getlist', {}, 0)
      const result = response.getData().result || []
      for (const entity of result) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.items.getlist',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting task items list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.items.getlist',
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
        'task.items.getlist',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Получить список задач с идентификаторами 1, 2, 3, 4, 5, 6, причем выбрать только поля `ID` и `TITLE`. Режим постраничной навигации — по 2 элемента на странице, 2-я страница. Сортировка по `ID` — по убыванию.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"ID":"desc"},"filter":{"ID":[1,2,3,4,5,6]},"select":["ID","TITLE"],"NAV_PARAMS":{"iNumPage":2}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.items.getlist
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"ID":"desc"},"filter":{"ID":[1,2,3,4,5,6]},"select":["ID","TITLE"],"NAV_PARAMS":{"iNumPage":2},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.items.getlist
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'task.items.getlist',
        [
          {ID: 'desc'},        // Сортировка по ID — по убыванию.
          {ID: [1, 2, 3, 4, 5, 6]},    // Фильтр
          ['ID', 'TITLE'],    // Выбираемые поля
          {
            NAV_PARAMS: {        // постраничка
              iNumPage: 2        // страница номер 2
            }
          }
        ],
        (progress) => { console.log('Progress:', progress) }
      );
      const items = response.getData() || [];
      for (const entity of items) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('task.items.getlist', [
        {ID: 'desc'},        // Сортировка по ID — по убыванию.
        {ID: [1, 2, 3, 4, 5, 6]},    // Фильтр
        ['ID', 'TITLE'],    // Выбираемые поля
        {
          NAV_PARAMS: {        // постраничка
            iNumPage: 2        // страница номер 2
          }
        }
      ], 'ID');
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity); }
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('task.items.getlist', [
        {ID: 'desc'},        // Сортировка по ID — по убыванию.
        {ID: [1, 2, 3, 4, 5, 6]},    // Фильтр
        ['ID', 'TITLE'],    // Выбираемые поля
        {
          NAV_PARAMS: {        // постраничка
            iNumPage: 2        // страница номер 2
          }
        }
      ], 0);
      const result = response.getData().result || [];
      for (const entity of result) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.items.getlist',
                [
                    ['ID' => 'desc'], // Сортировка по ID — по убыванию.
                    ['ID' => [1, 2, 3, 4, 5, 6]], // Фильтр
                    ['ID', 'TITLE'], // Выбираемые поля
                    [
                        'NAV_PARAMS' => [ // постраничка
                            'iNumPage' => 2 // страница номер 2
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
        echo 'Error getting task items list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.items.getlist',
        [
            {ID : 'desc'},        // Сортировка по ID — по убыванию.
            {ID: [1,2,3,4,5,6]},    // Фильтр
            ['ID', 'TITLE'],    // Выбираемые поля
            {
                NAV_PARAMS: {        // постраничка
                    iNumPage : 2        // страница номер 2
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
        'task.items.getlist',
        [
            'order' => ['ID' => 'desc'],
            'filter' => ['ID' => [1, 2, 3, 4, 5, 6]],
            'select' => ['ID', 'TITLE'],
            'NAV_PARAMS' => ['iNumPage' => 2]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

В целях ограничения нагрузки на постраничную навигацию наложено ограничение в 50 задач.

