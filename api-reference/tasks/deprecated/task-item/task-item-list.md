# Получить список задач task.item.list

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает массив задач, каждая из которых содержит массив полей (аналогичен массиву, возвращаемому [task.item.getdata](task-item-get-data.md)).

{% note warning %}

Метод устарел и не поддерживается. Рекомендуется использовать методы [tasks.task.*](../../index.md).

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

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'task.item.list',
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
      const generator = $b24.fetchListMethod('task.item.list', {}, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('task.item.list', {}, 0)
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

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'task.item.list',
        [
          {ID: 'desc'},        // Сортировка по ID — по убыванию.
          {ID: [1, 2, 3, 4, 5, 6]},    // Фильтр
          {
            NAV_PARAMS: { // постраничка
              nPageSize: 2,    // по 2 элемента на странице.
              iNumPage: 2    // страница номер 2        
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
      const generator = $b24.fetchListMethod('task.item.list', [
        {ID: 'desc'},        // Сортировка по ID — по убыванию.
        {ID: [1, 2, 3, 4, 5, 6]},    // Фильтр
        {
          NAV_PARAMS: { // постраничка
            nPageSize: 2,    // по 2 элемента на странице.
            iNumPage: 2    // страница номер 2        
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
      const response = await $b24.callMethod('task.item.list', [
        {ID: 'desc'},        // Сортировка по ID — по убыванию.
        {ID: [1, 2, 3, 4, 5, 6]},    // Фильтр
        {
          NAV_PARAMS: { // постраничка
            nPageSize: 2,    // по 2 элемента на странице.
            iNumPage: 2    // страница номер 2        
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