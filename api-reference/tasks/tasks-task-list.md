# Получить список задач tasks.task.list

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют curl-примеры 
- отсутствует ответ в случае ошибки
 
{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.list` возвращает массив задач, каждая из которых содержит массив полей. В отличие от [task.item.list](./deprecated/task-item/task-item-list.md), параметры в запросе `tasks.task.list` можно указывать в любом порядке, а также можно не указывать ненужные параметры.

Для получения данных по всем задачам пользователь должен обладать админскими правами. Руководитель подразделения получит доступ только к задачам в своей ветке иерархии.

Также можно получить задачи в "Избранном", установив фильтрацию по параметру `$filter[::SUBFILTER-PARAMS][FAVORITE]=Y`.

{% note warning %}

Необходимо указать поля в `select`, так как поля по умолчанию могут быть изменены в будущем.

{% endnote %}

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **order**
[`unknown`](../data-types.md) | Массив для сортировки результата. Массив вида `{"поле_сортировки": 'направление сортировки' [, ...]}`.
Поле для сортировки может принимать значения: 
- **ID** — Идентификатор задачи.
- **TITLE** — Название задачи.
- **TIME_SPENT_IN_LOGS** — Затраченное время, зафиксированное в истории изменений.
- **DATE_START** — Дата старта задачи.
- **CREATED_DATE** — Дата создания задачи.
- **CHANGED_DATE** — Дата последнего изменения задачи.
- **CLOSED_DATE** — Дата завершения задачи.
- **START_DATE_PLAN** — Плановая дата начала выполнения задачи.
- **END_DATE_PLAN** — Плановая дата завершения выполнения задачи.
- **DEADLINE** — Крайний срок выполнения задачи.
- **REAL_STATUS** — Статус задачи. Константы, отражающие статусы задач: 
    - STATE_NEW = 1;
    - STATE_PENDING = 2;
    - STATE_IN_PROGRESS = 3;
    - STATE_SUPPOSEDLY_COMPLETED = 4;
    - STATE_COMPLETED = 5;
    - STATE_DEFERRED = 6;
    - STATE_DECLINED = 7;
- **STATUS_COMPLETE** — Флаг завершенности задачи.
- **PRIORITY** — Приоритет задачи.
- **MARK** — Оценка за выполнение задачи.
- **CREATED_BY_LAST_NAME** — Фамилия постановщика задачи.
- **RESPONSIBLE_LAST_NAME** — Фамилия исполнителя задачи.
- **GROUP_ID** — Идентификатор рабочей группы.
- **TIME_ESTIMATE** — Время, выделенное на задачу.
- **ALLOW_CHANGE_DEADLINE** — Флаг, разрешающий исполнителю менять крайний срок.
- **ALLOW_TIME_TRACKING** — Флаг, включающий учёт затраченного времени по задаче.
- **MATCH_WORK_TIME** — Флаг, указывающий на необходимость пропускать выходные дни.
- **FAVORITE** — Флаг, указывающий, что задача добавлена в избранное.
- **SORTING** — Индекс сортировки.
- **MESSAGE_ID** — Идентификатор поискового индекса.

{% note info %}

В коробочной версии список полей для сортировки можно получить с помощью метода `CTasks::getAvailableOrderFields()`.

{% endnote %}

Направление сортировки может принимать значения: 

- **asc** — по возрастанию;
- **desc** — по убыванию;

Необязательный. По умолчанию фильтруется по убыванию идентификатора задачи. 
 ||
|| **filter**
[`unknown`](../data-types.md) | 	Массив вида `{"фильтруемое_поле": "значение фильтра" [, ...]}`. Фильтруемое поле может принимать значения:
- **ID** - идентификатор задачи;
- **PARENT_ID** - идентификатор родительской задачи;
- **GROUP_ID** - идентификатор рабочей группы;
- **CREATED_BY** - постановщик;
- **STATUS_CHANGED_BY** - пользователь, последним изменивший статус задачи;
- **PRIORITY** - приоритет;
- **FORUM_TOPIC_ID** - идентификатор темы форума;
- **RESPONSIBLE_ID** - исполнитель;
- **TITLE** - название задачи (можно искать по шаблону [\%_]);
- **REAL_STATUS** - статус задачи. Соответствует полю `status` в ответе. Константы, отражающие статусы задач:
    - STATE_NEW = 1;
    - STATE_PENDING = 2;
    - STATE_IN_PROGRESS = 3;
    - STATE_SUPPOSEDLY_COMPLETED = 4;
    - STATE_COMPLETED = 5;
    - STATE_DEFERRED = 6;
    - STATE_DECLINED = 7;
- **STATUS** - статус для сортировки. Соответствует полю `subStatus` в ответе. Аналогичен **REAL_STATUS**, но имеет три дополнительных мета-статуса:
    - **-3** - задача почти просрочена;
    - **-2** - не просмотренная задача;
    - **-1** - просроченная задача.
- **MARK** - оценка;
- **SITE_ID** - идентификатор сайта;
- **ADD_IN_REPORT** - задача в отчете (Y\|N);
- **DATE_START** - дата начала выполнения;
- **DEADLINE** - крайний срок;
- **CREATED_DATE** - дата создания;
- **CLOSED_DATE** - дата завершения;
- **CHANGED_DATE** - дата последнего изменения;
- **ACCOMPLICE** - идентификатор соисполнителя;
- **AUDITOR** - идентификатор наблюдателя;
- **DEPENDS_ON** - идентификатор предыдущей задачи;
- **ONLY_ROOT_TASKS** - только задачи, которые не являются подзадачами (корневые задачи), а также подзадачи родительской задачи, к которой текущий пользователь доступа не имеет (Y\|N).
- **STAGE_ID** - стадия;
- **UF_CRM_TASK** - элементы CRM;

Перед названием фильтруемого поля может указать тип фильтрации:
- "!" - не равно
- "<" - меньше
- "<=" - меньше либо равно
- ">" - больше
- ">=" - больше либо равно 

*"значения фильтра"* - одиночное значение или массив.

Необязательный. По умолчанию записи не фильтруются. ||
|| **select**
[`unknown`](../data-types.md) | Массив полей записей, которые будут возвращены методом. Можно указать только те поля, которые необходимы.

Доступные поля: 
- **ID** - идентификатор задачи;
- **PARENT_ID** - идентификатор родительской задачи;
- **TITLE** - название задачи;
- **DESCRIPTION** - описание;
- **MARK** - оценка;
- **PRIORITY** - приоритет:
    - **0** - низкий;
    - **1** - средний;
    - **2** - высокий.
- **STATUS** - статус. Вернет обычный статус `status` и мета-статус `subStatus`;
- **MULTITASK** - множественная задача;
- **NOT_VIEWED** - непросмотренная задача;
- **REPLICATE** - повторяемая задача;
- **GROUP_ID** - рабочая группа;
- **STAGE_ID** - стадия;
- **CREATED_BY** - постановщик;
- **CREATED_DATE** - дата создания;
- **RESPONSIBLE_ID** - исполнитель;
- **ACCOMPLICES** - идентификатор соисполнителя;
- **AUDITORS** - идентификатор аудитора;
- **CHANGED_BY** - кем изменена задача;
- **CHANGED_DATE** - дата изменения;
- **STATUS_CHANGED_DATE** - дата изменения статуса;
- **CLOSED_BY** - кто закрыл задачу;
- **CLOSED_DATE** - дата закрытия задачи;
- **DATE_START** - дата начала;
- **DEADLINE** - крайний срок;
- **START_DATE_PLAN** - плановое начало;
- **END_DATE_PLAN** - плановое завершение;
- **GUID** - GUID (статистически уникальный 128-битный идентификатор);
- **XML_ID** - внешний код;
- **COMMENTS_COUNT** - количество комментариев;
- **NEW_COMMENTS_COUNT** - количество новых комментариев;
- **TASK_CONTROL** - принять в работу;
- **ADD_IN_REPORT** - добавить в отчет;
- **FORKED_BY_TEMPLATE_ID** - создано из шаблона;
- **TIME_ESTIMATE** - время, выделенное на задачу;
- **TIME_SPENT_IN_LOGS** - затраченное время из истории изменений;
- **MATCH_WORK_TIME** - пропустить выходные дни;
- **FORUM_TOPIC_ID** - идентификатор темы форума;
- **FORUM_ID** - идентификатор форума;
- **SITE_ID** - идентификатор сайта;
- **SUBORDINATE** - задача подчиненного;
- **FAVORITE** - Избранное;
- **VIEWED_DATE** - дата последнего просмотра;
- **SORTING** - индекс сортировки;
- **DURATION_PLAN** - затрачено (план);
- **DURATION_FACT** - затрачено (фактически);
- **DURATION_TYPE** - тип единицы измерения в планируемой длительности: days, hours или minutes.

По умолчанию будут возвращены все **невычисляемые** поля основной таблицы запроса.

Список полей можно уточнить, отправив запрос [tasks.task.getFields](tasks-task-get-fields.md). ||
|| **limit**
[`unknown`](../data-types.md) | Число записей. Параметр указывается, если нужно получить число записей более значения по умолчанию (50). Все записи одним запросом вернуть нет возможности, это ограничение всех методов REST API. Вы можете несколькими запросами по 50 записей в ответе получить все лиды. Для этого просто передавайте параметр start со значением, кратным 50. Пример: 
```js
start=0
start=50
start=100
```
||
|| **start**
[`unknown`](../data-types.md) | Сколько первых записей пропускать в результате. В связи с техническими ограничениями значение этого параметра всегда должно быть кратно 50. Например, при значении 50 в результате будут отображаться 51-я запись и последующие, а первые 50 записей будут пропущены.

При значении `-1` будет отключён подсчёт количества. 

Работает для https запросов. Пример:
```js
BX24.callMethod('tasks.task.list',{start: 1150})
```
||
|#

## Пример 1

Вывод всех неповторяющихся задач, добавленных в "Избранное", у которых статус больше 2:

{% list tabs %}

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'tasks.task.list',
        {
          filter: {
            '>STATUS': 2,
            'REPLICATE': 'N',
            '::SUBFILTER-PARAMS': {
              FAVORITE: 'Y'
            }
          }
        },
        (progress) => { console.log('Progress:', progress) }
      );
      const items = response.getData().result || [];
      for (const entity of items) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('tasks.task.list', {
        filter: {
          '>STATUS': 2,
          'REPLICATE': 'N',
          '::SUBFILTER-PARAMS': {
            FAVORITE: 'Y'
          }
        }
      }, 'ID');
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity); }
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('tasks.task.list', {
        filter: {
          '>STATUS': 2,
          'REPLICATE': 'N',
          '::SUBFILTER-PARAMS': {
            FAVORITE: 'Y'
          }
        }
      }, 0);
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
                'tasks.task.list',
                [
                    'filter' => [
                        '>STATUS'           => 2,
                        'REPLICATE'         => 'N',
                        '::SUBFILTER-PARAMS' => [
                            'FAVORITE' => 'Y',
                        ],
                    ],
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
        'tasks.task.list',
        {
            filter:{
                '>STATUS':2,
                'REPLICATE':'N',
                '::SUBFILTER-PARAMS':{
                    FAVORITE:'Y'
                }
            }
        },
        function(res){console.log(res.answer.result);}
    );
    ```

{% endlist %}

## Ответ в случае успеха

> 200 OK

```js
{
    "result": {
        "tasks": [
            {
                "id": "434",
                "parentId": "0",
                "title": "test task 1",
                "description": "",
                "mark": null,
                "priority": "1",
                "multitask": "N",
                "notViewed": "N",
                "replicate": "N",
                "stageId": "0",
                "createdBy": "1",
                "createdDate": "2024-11-22T13:58:17+02:00",
                "responsibleId": "1",
                "changedBy": "1",
                "changedDate": "2024-11-26T13:43:28+02:00",
                "statusChangedBy": "1",
                "closedBy": "0",
                "closedDate": null,
                "activityDate": "2024-11-22T13:58:17+02:00",
                "dateStart": "2024-11-26T13:43:28+02:00",
                "deadline": null,
                "startDatePlan": null,
                "endDatePlan": null,
                "guid": "{8a261464-64eb-4d04-827b-37ded5433e85}",
                "xmlId": null,
                "commentsCount": null,
                "serviceCommentsCount": null,
                "allowChangeDeadline": "Y",
                "allowTimeTracking": "N",
                "taskControl": "Y",
                "addInReport": "N",
                "forkedByTemplateId": null,
                "timeEstimate": "0",
                "timeSpentInLogs": null,
                "matchWorkTime": "N",
                "forumTopicId": null,
                "forumId": null,
                "siteId": "s1",
                "subordinate": "N",
                "exchangeModified": null,
                "exchangeId": null,
                "outlookVersion": "2",
                "viewedDate": "2024-11-26T13:40:45+02:00",
                "sorting": null,
                "durationFact": null,
                "isMuted": "N",
                "isPinned": "N",
                "isPinnedInGroup": "N",
                "flowId": null,
                "descriptionInBbcode": "Y",
                "status": "3",
                "statusChangedDate": "2024-11-26T13:43:28+02:00",
                "durationPlan": null,
                "durationType": "days",
                "favorite": "N",
                "groupId": "0",
                "auditors": [],
                "accomplices": [],
                "newCommentsCount": 0,
                "group": [],
                "creator": {
                    "id": "1",
                    "name": "Admin Adminov",
                    "link": "/company/personal/user/1/",
                    "icon": "/bitrix/images/tasks/default_avatar.png",
                    "workPosition": "Chief"
                },
                "responsible": {
                    "id": "1",
                    "name": "Admin Adminov",
                    "link": "/company/personal/user/1/",
                    "icon": "/bitrix/images/tasks/default_avatar.png",
                    "workPosition": "Chief"
                },
                "accomplicesData": [],
                "auditorsData": [],
                "subStatus": "3"
            }
        ]
    },
    "time": {
        "start": 1552382093.81029,
        "finish": 1552382093.927268,
        "duration": 0.11697793006896973,
        "processing": 0.018744230270385742,
        "date_start": "2019-03-12T11:14:53+02:00",
        "date_finish": "2019-03-12T11:14:53+02:00"
    }
}
```

## Пример 2

Вывод всех задач с названием "task for test", отбор по полям `ID`, `TITLE`, `STATUS`, сортировка по полю `ID` (сортировка по возрастанию):

{% list tabs %}

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'tasks.task.list',
        {filter:{TITLE:'task for test'}, select: ['ID','TITLE','STATUS'], order:{ID:'asc'}},
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('tasks.task.list', {filter:{TITLE:'task for test'}, select: ['ID','TITLE','STATUS'], order:{ID:'asc'}}, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('tasks.task.list', {filter:{TITLE:'task for test'}, select: ['ID','TITLE','STATUS'], order:{ID:'asc'}}, 0)
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
                'tasks.task.list',
                [
                    'filter' => ['TITLE' => 'task for test'],
                    'select' => ['ID', 'TITLE', 'STATUS'],
                    'order'  => ['ID' => 'asc'],
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
        'tasks.task.list',
        {filter:{TITLE:'task for test'}, select: ['ID','TITLE','STATUS'], order:{ID:'asc'}},
        function(res){console.log(res.answer.result);}
    );
    ```

{% endlist %}

![Результат](_images/tasks_task_list-2.png =873x)

## Пример 3

Пример отключения постраничной навигации:

{% list tabs %}

- PHP CRest

    ```php
    $result = CRest::call(
        'tasks.task.list',
        [
            'filter' => [
                '>ID' => 50
            ],
            'start' => -1,
        ]
    );
    ```

{% endlist %}

## Пример 4

### Как через http запрос получить отфильтрованный список задач?

Фильтры задач по ID, дате, статусу. Для фильтра `'=ID' => 3` рекомендуется использовать [tasks.task.get](.) так как в нём нет постраничной навигации.

{% list tabs %}

- PHP CRest

    ```php
    $filter = [];
    //by id
    $filter = [
        '>ID' => 3
    ];
    $filter = [
        '=ID' => 3//recommend: CRest::call('tasks.task.get');
    ];
    //by date
    $filter = [
        '<CREATED_DATE' => date(DATE_ATOM, mktime(12, 22, 37, 7, 25, 2019))
    ];
    //by status
    $filter = [
        '>STATUS' => 2 // 2 is enum value. for current client: CRest::call( 'tasks.task.getFields');
    ];
    $result = CRest::call(
        'tasks.task.list',
        [
            'filter' => $filter,
            'select' => [
                'ID',
                'TITLE',
                'CREATED_DATE'
            ]
        ]
    );
    //all fields
    $fields = CRest::call( 'tasks.task.getFields');
    echo '<pre>';
    print_r([$filter, $result, $fields]);
    echo '</pre>';
    $result = CRest::call(
        'tasks.task.get',
        [
            'taskId' => 3,
            'select' => [
                'ID',
                'TITLE',
                'CREATED_DATE'
            ]
        ]
    );
    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Продолжите изучение

- [{#T}](../../tutorials/tasks/how-to-create-comment-with-file.md)
- [{#T}](../../tutorials/tasks/how-to-upload-file-to-task.md)
- [{#T}](../../tutorials/tasks/how-to-create-task-with-file.md)