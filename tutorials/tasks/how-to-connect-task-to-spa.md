# Как прикрепить задачу к смарт-процессу

> Scope: [`crm, tasks`](../../api-reference/scopes/permissions.md)
> 
> Кто может выполнять метод: пользователи с доступом к разделам CRM и задачи

Ключевой параметр для прикрепления задачи к элементу CRM — [идентификатор типа объекта](../../api-reference/crm/data-types.md#object_type). Идентификатор показывает, в какой тип объекта связь будет добавлена: в сделку, в лид, в определенный смарт-процесс.

Чтобы создать задачу и прикрепить ее к смарт-процессу, последовательно выполним три метода:

1. [crm.enum.ownertype](../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md) — получим `entityTypeId` и `SYMBOL_CODE_SHORT` смарт-процесса

2. [crm.item.list](../../api-reference/crm/universal/crm-item-list.md) — получим элемент смарт-процесса с параметром `entityTypeId`

3. [tasks.task.add](../../api-reference/tasks/tasks-task-add.md) — создадим задачу и свяжем ее с элементом смарт-процесса при помощи `SYMBOL_CODE_SHORT`
   
## 1. Получаем идентификаторы смарт-процесса {#SPA-ids}

Чтобы получить идентификатор смарт-процесса, используем метод [crm.enum.ownertype](../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md). Метод вызывается без параметров и возвращает перечисление всех типов объектов CRM.

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```JavaScript
    BX24.callMethod(
    "crm.enum.ownertype",
    {},
    );     
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.enum.ownertype',
        []
    );
    ```

{% endlist %}

Метод возвращает четыре разных идентификатора:

```JSON
     "ID": 130, // entityTypeId — получаем, чтобы найти элемент CRM по фильтру
     "NAME": "Всё включено", // название
     "SYMBOL_CODE": "DYNAMIC_130", // символьный код
     "SYMBOL_CODE_SHORT": "T82" // краткий символьный код — получаем, чтобы привязать элемент CRM к задаче
```

`ID` получаем, чтобы найти элемент CRM по фильтру.

`SYMBOL_CODE_SHORT` получаем, чтобы привязать элемент CRM к задаче.

```JSON
{
    "result": [
        {
            "ID": 1,
            "NAME": "Лид",
            "SYMBOL_CODE": "LEAD",
            "SYMBOL_CODE_SHORT": "L"
        },
        {
            "ID": 2,
            "NAME": "Сделка",
            "SYMBOL_CODE": "DEAL",
            "SYMBOL_CODE_SHORT": "D"
        },
        {
            "ID": 3,
            "NAME": "Контакт",
            "SYMBOL_CODE": "CONTACT",
            "SYMBOL_CODE_SHORT": "C"
        },
        {
            "ID": 4,
            "NAME": "Компания",
            "SYMBOL_CODE": "COMPANY",
            "SYMBOL_CODE_SHORT": "CO"
        },
        {
            "ID": 5,
            "NAME": "Счёт (старая версия)",
            "SYMBOL_CODE": "INVOICE",
            "SYMBOL_CODE_SHORT": "I"
        },
        {
            "ID": 31,
            "NAME": "Счёт",
            "SYMBOL_CODE": "SMART_INVOICE",
            "SYMBOL_CODE_SHORT": "SI"
        },
        {
            "ID": 7,
            "NAME": "Предложение",
            "SYMBOL_CODE": "QUOTE",
            "SYMBOL_CODE_SHORT": "Q"
        },
        {
            "ID": 8,
            "NAME": "Реквизиты",
            "SYMBOL_CODE": "REQUISITE",
            "SYMBOL_CODE_SHORT": "RQ"
        },
        {
            "ID": 36,
            "NAME": "Документ",
            "SYMBOL_CODE": "SMART_DOCUMENT",
            "SYMBOL_CODE_SHORT": "DO"
        },
        {
            "ID": 39,
            "NAME": "Документ компании",
            "SYMBOL_CODE": "SMART_B2E_DOC",
            "SYMBOL_CODE_SHORT": "SBD"
        },
        {
            "ID": 177,
            "NAME": "Закупка оборудования",
            "SYMBOL_CODE": "DYNAMIC_177",
            "SYMBOL_CODE_SHORT": "Tb1"
        },
        {
            "ID": 156,
            "NAME": "Закупка",
            "SYMBOL_CODE": "DYNAMIC_156",
            "SYMBOL_CODE_SHORT": "T9c"
        },
    ],
}
```

В результате получили перечень всех типов объектов CRM в Битрикс24 с идентификаторами. Для следующих запросов используем `ID`: `177` и `SYMBOL_CODE_SHORT`: `Tb1` смарт-процесса «Закупка оборудования».

## 2. Получаем ID элемента смарт-процесса {#element-id}

Для получения ID элемента смарт-процесса используем метод [crm.item.list](../../api-reference/crm/universal/crm-item-list.md) с параметрами:

-  `entityTypeId` — `177`, значение равно `ID` из результата предыдущего метода

-  `filter[title]` — укажем название элемента для поиска  

{% list tabs %}

- JS
  
    ```javascript
       BX24.callMethod(
        'crm.item.list',
        {
            entityTypeId: 177, // ID из результата  crm.enum.ownertype
            select: [
                "id", // выбираемые поля
                "title",
            ],
            filter: {
                "title": "Стиральная машина", // название элемента
            },
        },
    );
    ```

- PHP
  
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.item.list',
        [
            'entityTypeId' => 177, // ID из результата crm.enum.ownertype
            'select' => [
                'id', // выбираемые поля
                'title',
            ],
            'filter' => [
                'title' => 'Стиральная машина', // название элемента
            ],
        ]
    );
    ```

{% endlist %}

В результате получили ID элемента смарт-процесса — параметр, необходимый для следующего запроса.

```JSON
{
    "result": {
        "items": [
            {
                "id": 29,
                "title": "Стиральная машина"
            }
        ]
    },
    "total": 1,
}
```

## 3. Создаем задачу с привязкой к элементу смарт-процесса

Для создания задачи используем метод [tasks.task.add](../../api-reference/tasks/tasks-task-add.md) с параметрами:

-  `UF_CRM_TASK` — укажем значение `Tb1_29`. Это краткий символьный код типа `SYMBOL_CODE_SHORT`: `Tb1` из результатов [crm.enum.ownertype](./how-to-connect-task-to-spa.md#SPA-ids) и ID элемента смарт-процесса `id`: `29` из результатов [crm.item.list](./how-to-connect-task-to-spa.md#element-id)

-  `TITLE` — название задачи, обязательное поле. Без названия задача не будет создана

-  `CREATED_BY` — ID постановщика задачи, поле не может быть пустым. Если его не заполнить, постановщиком автоматически станет тот, кто отправляет запрос

-  `RESPONSIBLE_ID` — ID исполнителя задачи, обязательное поле. Без исполнителя задача не будет создана
  

{% list tabs %}

- JS
  
    ```javascript
    BX24.callMethod(
        'tasks.task.add',
        {
            fields: {
                TITLE: 'task for test', // название задачи
                RESPONSIBLE_ID: 1, // исполнитель
                UF_CRM_TASK: [ // массив элементов CRM
                    "Tb1_29"
                ]
            }
        }
    );
    ```

- PHP
  
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.task.add',
        [
            'fields' => [
                'TITLE' => 'task for test', // название задачи
                'RESPONSIBLE_ID' => 1, // исполнитель
                'UF_CRM_TASK' => [ // массив элементов CRM
                    'Tb1_29'
                ]
            ]
        ]
    );
    ```

{% endlist %}

В результате создали задачу с ID `3731`.

```JSON
{
    "result": {
        "task": {
            "id": "3731",
            "parentId": null,
            "title": "task for test",
            "description": "",
            "mark": null,
            "priority": "1",
            "multitask": "N",
            "notViewed": "N",
            "replicate": "N",
            "stageId": "0",
            "createdBy": "1",
            "createdDate": "2025-01-20T14:30:58+02:00",
            "responsibleId": "1",
            "changedBy": "1",
            "changedDate": "2025-01-20T14:30:58+02:00",
            "statusChangedBy": null,
            "closedBy": null,
            "closedDate": null,
            "activityDate": "2025-01-20T14:30:58+02:00",
            "dateStart": null,
            "deadline": null,
            "startDatePlan": null,
            "endDatePlan": null,
            "guid": "{34429425-80c6-4927-83bd-220e67bcc202}",
            "xmlId": null,
            "commentsCount": null,
            "serviceCommentsCount": null,
            "allowChangeDeadline": "N",
            "allowTimeTracking": "N",
            "taskControl": "N",
            "addInReport": "N",
            "forkedByTemplateId": null,
            "timeEstimate": "0",
            "timeSpentInLogs": null,
            "matchWorkTime": "N",
            "forumTopicId": null,
            "forumId": null,
            "siteId": "s1",
            "subordinate": "Y",
            "exchangeModified": null,
            "exchangeId": null,
            "outlookVersion": "1",
            "viewedDate": null,
            "sorting": null,
            "durationFact": null,
            "isMuted": "N",
            "isPinned": "N",
            "isPinnedInGroup": "N",
            "flowId": null,
            "descriptionInBbcode": "Y",
            "status": "2",
            "statusChangedDate": "2025-01-20T14:30:58+02:00",
            "durationPlan": null,
            "durationType": "days",
            "favorite": "N",
            "groupId": "0",
            "auditors": [],
            "accomplices": [],
            "checklist": [],
            "group": [],
            "creator": {
                "id": "1",
                "name": "Viola",
                "link": "/company/personal/user/1/",
                "icon": "https://your-domain.bitrix24.com/b13743910/resize_cache/2267/c0120a8d7c10d63c83e32398d1ec4d9e/main/c7b/c7bd44b1babaa5448125dd97d038ce1b/d5fb56b94dc2c3cd8c006a2c595a4895.jpg",
                "workPosition": ""
            },
            "responsible": {
                "id": "1",
                "name": "Viola",
                "link": "/company/personal/user/1/",
                "icon": "https://your-domain.bitrix24.com/b13743910/resize_cache/2267/c0120a8d7c10d63c83e32398d1ec4d9e/main/c7b/c7bd44b1babaa5448125dd97d038ce1b/d5fb56b94dc2c3cd8c006a2c595a4895.jpg",
                "workPosition": ""
            },
            "accomplicesData": [],
            "auditorsData": [],
            "newCommentsCount": 0,
            "action": {
                "accept": false,
                "decline": false,
                "complete": true,
                "approve": false,
                "disapprove": false,
                "start": true,
                "pause": false,
                "delegate": true,
                "remove": true,
                "edit": true,
                "defer": true,
                "renew": false,
                "create": true,
                "changeDeadline": true,
                "checklistAddItems": true,
                "addFavorite": true,
                "deleteFavorite": false,
                "rate": true,
                "take": false,
                "edit.originator": false,
                "checklist.reorder": true,
                "elapsedtime.add": true,
                "dayplan.timer.toggle": false,
                "edit.plan": true,
                "checklist.add": true,
                "favorite.add": true,
                "favorite.delete": false
            },
            "checkListTree": {
                "nodeId": 0,
                "fields": {
                    "id": null,
                    "copiedId": null,
                    "entityId": null,
                    "userId": 1,
                    "createdBy": null,
                    "parentId": null,
                    "title": "",
                    "sortIndex": null,
                    "displaySortIndex": "",
                    "isComplete": false,
                    "isImportant": false,
                    "completedCount": 0,
                    "members": [],
                    "attachments": []
                },
                "action": [],
                "descendants": []
            },
            "checkListCanAdd": true
        }
    },
}
```

## Проверка созданной задачи

В полученном результате нет информации о связанных элементах CRM. Чтобы проверить, успешно ли прикреплен элемент смарт-процесса к задаче, выполним метод  [tasks.task.get](../../api-reference/tasks/tasks-task-get.md) с параметрами:

-  `taskId` — `3731`, ID созданной задачи из результата предыдущего метода

-  `select` — `UF_CRM_TASK`, поле «Привязка к элементам CRM». Метод [tasks.task.get](../../api-reference/tasks/tasks-task-get.md) не вернет поле привязки без `UF_CRM_TASK` в `select`
  
{% list tabs %}

- JS
  
    ```javascript
    BX24.callMethod(
        'tasks.task.get',
        {
            taskId: 3731, // ID задачи
            select: ['ID', 'UF_CRM_TASK'] // выбираемые поля
        },
    );
    ```

- PHP
  
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.task.get',
        [
            'taskId' => 3731, // ID задачи
            'select' => ['ID', 'UF_CRM_TASK'] // выбираемые поля
        ]
    );
    ```

{% endlist %}

В результате получили значение поля `ufCrmTask`: `Tb1_29`. Элемент смарт-процесса прикреплен успешно.

```JSON
{
    "result": {
        "task": {
            "id": "3731",
            "ufCrmTask": ["Tb1_29"],
            "ufTaskWebdavFiles": false,
            "ufMailMessage": null,
            "ufAuto615763798639": null,
            "ufAuto885808697713": null,
            "ufAuto168639979930": null,
            "ufAuto441714695872": null,
            "ufAuto179124361273": null,
            "favorite": "N",
            "group": [],
            "action": {
                "accept": false,
                "decline": false,
                "complete": true,
                "approve": false,
                "disapprove": false,
                "start": true,
                "pause": false,
                "delegate": true,
                "remove": true,
                "edit": true,
                "defer": true,
                "renew": false,
                "create": true,
                "changeDeadline": true,
                "checklistAddItems": true,
                "addFavorite": true,
                "deleteFavorite": false,
                "rate": true,
                "take": false,
                "edit.originator": false,
                "checklist.reorder": true,
                "elapsedtime.add": true,
                "dayplan.timer.toggle": false,
                "edit.plan": true,
                "checklist.add": true,
                "favorite.add": true,
                "favorite.delete": false
            }
        }
    },
}
```

## Пример кода

{% list tabs %}

- JS
    
    ```JavaScript
    // Переменные для ввода данных пользователем
    var smartProcessName = 'название_смарт_процесса'; // Название смарт-процесса
    var itemName = 'название_элемента'; // Название элемента смарт-процесса
    var responsibleId = 'ID_ответственного'; // ID ответственного за задачу
    var taskTitle = 'название_задачи'; // Название задачи

    // Функция для создания задачи с привязкой к элементу смарт-процесса
    function createTaskWithSmartProcess() {
        // Получение идентификаторов типов сущностей и смарт-процессов
        BX24.callMethod(
            'crm.enum.ownertype',
            {},
            function(result) {
                if (result.error()) {
                    console.error('Ошибка при получении типов сущностей:', result.error());
                    return;
                }

                // Поиск нужного смарт-процесса
                var smartProcess = result.data().find(function(process) {
                    return process.NAME === smartProcessName;
                });

                if (!smartProcess) {
                    console.error('Смарт-процесс не найден');
                    return;
                }

                var symbolCodeShort = smartProcess.SYMBOL_CODE_SHORT;

                // Поиск элемента смарт-процесса с использованием фильтра по названию
                BX24.callMethod(
                    'crm.item.list',
                    {
                        entityTypeId: smartProcess.ID,
                        select: ["id", "title"],
                        filter: { "title": itemName }
                    },
                    function(itemResult) {
                        if (itemResult.error()) {
                            console.error('Ошибка при получении элементов смарт-процесса:', itemResult.error());
                            return;
                        }

                        if (itemResult.data().items.length === 0) {
                            console.error('Элемент смарт-процесса не найден');
                            return;
                        }

                        var itemId = itemResult.data().items[0].id;

                        // Создание задачи
                        BX24.callMethod(
                            'tasks.task.add',
                            {
                                fields: {
                                    TITLE: taskTitle, // Используем введенное название задачи
                                    RESPONSIBLE_ID: responsibleId, // Добавляем ID ответственного
                                    UF_CRM_TASK: [symbolCodeShort + '_' + itemId]
                                }
                            },
                            function(taskResult) {
                                if (taskResult.error()) {
                                    console.error('Ошибка при создании задачи:', taskResult.error());
                                } else {
                                    console.log('Задача успешно создана!', taskResult.data());
                                }
                            }
                        );
                    }
                );
            }
        );
    }

    // Вызов функции для создания задачи
    createTaskWithSmartProcess();
    ```

- PHP
  
    ```php
    require_once('crest.php');

    // Переменные для ввода данных пользователем
    $smartProcessName = 'название_смарт_процесса'; // Название смарт-процесса
    $itemName = 'название_элемента'; // Название элемента смарт-процесса
    $responsibleId = 'ID_ответственного'; // ID ответственного за задачу
    $taskTitle = 'название_задачи'; // Название задачи

    // Функция для создания задачи с привязкой к элементу смарт-процесса
    function createTaskWithSmartProcess($smartProcessName, $itemName, $responsibleId, $taskTitle) {
        // Получение идентификаторов типов сущностей и смарт-процессов
        $result = CRest::call('crm.enum.ownertype', []);

        if (isset($result['error'])) {
            echo 'Ошибка при получении типов сущностей: ' . $result['error_description'];
            return;
        }

        // Поиск нужного смарт-процесса
        $smartProcess = null;
        foreach ($result['result'] as $process) {
            if ($process['NAME'] === $smartProcessName) {
                $smartProcess = $process;
                break;
            }
        }

        if (!$smartProcess) {
            echo 'Смарт-процесс не найден';
            return;
        }

        $symbolCodeShort = $smartProcess['SYMBOL_CODE_SHORT'];

        // Поиск элемента смарт-процесса с использованием фильтра по названию
        $itemResult = CRest::call('crm.item.list', [
            'entityTypeId' => $smartProcess['ID'],
            'select' => ['id', 'title'],
            'filter' => ['title' => $itemName]
        ]);

        if (isset($itemResult['error'])) {
            echo 'Ошибка при получении элементов смарт-процесса: ' . $itemResult['error_description'];
            return;
        }

        if (count($itemResult['result']['items']) === 0) {
            echo 'Элемент смарт-процесса не найден';
            return;
        }

        $itemId = $itemResult['result']['items'][0]['id'];

        // Создание задачи
        $taskResult = CRest::call('tasks.task.add', [
            'fields' => [
                'TITLE' => $taskTitle, // Используем введенное название задачи
                'RESPONSIBLE_ID' => $responsibleId, // Добавляем ID ответственного
                'UF_CRM_TASK' => [$symbolCodeShort . '_' . $itemId]
            ]
        ]);

        if (isset($taskResult['error'])) {
            echo 'Ошибка при создании задачи: ' . $taskResult['error_description'];
        } else {
            echo 'Задача успешно создана!';
            print_r($taskResult['result']);
        }
    }

    // Вызов функции для создания задачи
    createTaskWithSmartProcess($smartProcessName, $itemName, $responsibleId, $taskTitle);
    ```

{% endlist %}