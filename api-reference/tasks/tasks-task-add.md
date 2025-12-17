# Добавить задачу tasks.task.add

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.add` добавляет новую задачу. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../data-types.md) | Значения [полей задачи](./fields.md). Обязательные поля для создания задачи:
- `TITLE` — название задачи
- `RESPONSIBLE_ID` — идентификатор ответственного

{% note warning "" %}

Проверьте, какие обязательные пользовательские поля настроены для задач в вашем Битрикс24. Все обязательные поля нужно передать в метод.

{% endnote %}

В метод можно передать параметр `SE_PARAMETER` — список объектов с дополнительными параметрами задачи. Возможные значения кодов `CODE`:
- `1` — сроки определяются сроками подзадач
- `2` — автоматически завершать задачу при завершении подзадач (и наоборот)
- `3` — не завершать задачу без результата

```js
SE_PARAMETER: [
    {
        VALUE: 'Y',
        CODE: 3
    },
    {
        VALUE: 'Y',
        CODE: 2
    }
]
```
||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

Добавим задачу с файлами и привязками объектов CRM. Чтобы прикрепить файл к задаче, нужно добавить символ `n` перед идентификатором файла.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"TITLE":"Название задачи","DEADLINE":"2025-12-31T23:59:59","CREATED_BY":456,"RESPONSIBLE_ID":123,"UF_CRM_TASK":["L_4","C_7","CO_5","D_10"],"UF_TASK_WEBDAV_FILES":["n12345","n67890"]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/tasks.task.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"TITLE":"Название задачи","DEADLINE":"2025-12-31T23:59:59","CREATED_BY":456,"RESPONSIBLE_ID":123,"UF_CRM_TASK":["L_4","C_7","CO_5","D_10"],"UF_TASK_WEBDAV_FILES":["n12345","n67890"]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.task.add
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            "tasks.task.add",
            {
                fields: {               
                    TITLE: "Название задачи", // Название задачи
                    DEADLINE: "2025-12-31T23:59:59", // Крайний срок
                    CREATED_BY: 456, // Идентификатор постановщика
                    RESPONSIBLE_ID: 123, // Идентификатор исполнителя
                    // Пример передачи нескольких значений в поле UF_CRM_TASK
                    UF_CRM_TASK: [
                        "L_4", // Привязка к лиду
                        "C_7", // Привязка к контакту
                        "CO_5", // Привязка к компании
                        "D_10" // Привязка к сделке
                    ],
                    // Пример передачи нескольких файлов в поле UF_TASK_WEBDAV_FILES
                    UF_TASK_WEBDAV_FILES: [
                        "n12345", // Идентификатор первого файла диска
                        "n67890" // Идентификатор второго файла диска
                    ]
                }
            }
        );
        
        const result = response.getData().result;
        console.info("Задача успешно создана с ID " + result.task.id);
    }
    catch( error )
    {
        console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.task.add',
                [
                    'fields' => [
                        'TITLE'         => 'Название задачи',
                        'DEADLINE'      => '2025-12-31T23:59:59',
                        'CREATED_BY'    => 456,
                        'RESPONSIBLE_ID' => 123,
                        'UF_CRM_TASK'   => [
                            'L_4',
                            'C_7',
                            'CO_5',
                            'D_10',
                        ],
                        'UF_TASK_WEBDAV_FILES' => [
                            'n12345',
                            'n67890',
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Задача успешно создана с ID ' . $result['task']['id'];
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Ошибка при создании задачи: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        "tasks.task.add",
        {
            fields: {               
                TITLE: "Название задачи", // Название задачи
                DEADLINE: "2025-12-31T23:59:59", // Крайний срок
                CREATED_BY: 456, // Идентификатор постановщика
                RESPONSIBLE_ID: 123, // Идентификатор исполнителя
                // Пример передачи нескольких значений в поле UF_CRM_TASK
                UF_CRM_TASK: [
                    "L_4", // Привязка к лиду
                    "C_7", // Привязка к контакту
                    "CO_5", // Привязка к компании
                    "D_10" // Привязка к сделке
                ],
                // Пример передачи нескольких файлов в поле UF_TASK_WEBDAV_FILES
                UF_TASK_WEBDAV_FILES: [
                    "n12345", // Идентификатор первого файла диска
                    "n67890" // Идентификатор второго файла диска
                ]
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info("Задача успешно создана с ID " + result.data().task.id);
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.task.add',
        [
            'fields' => [
                'TITLE' => 'Название задачи', // Название задачи
                'DEADLINE' => '2025-12-31T23:59:59', // Крайний срок
                'CREATED_BY' => 456, // Идентификатор постановщика
                'RESPONSIBLE_ID' => 123, // Идентификатор исполнителя
                // Пример передачи нескольких значений в поле UF_CRM_TASK
                'UF_CRM_TASK' => [
                    'L_4', // Привязка к лиду
                    'C_7', // Привязка к контакту
                    'CO_5', // Привязка к компании
                    'D_10' // Привязка к сделке
                ],
                // Пример передачи нескольких файлов в поле UF_TASK_WEBDAV_FILES
                'UF_TASK_WEBDAV_FILES' => [
                    'n12345', // Идентификатор первого файла диска
                    'n67890' // Идентификатор второго файла диска
                ]
            ]
        ]
    );

    if (isset($result['error'])) {
        echo 'Ошибка: ' . $result['error_description'];
    } else {
        echo 'Задача успешно создана с ID ' . $result['result']['task']['id'];
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "task": {
            "id": "3711",
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
            "createdDate": "2024-11-02T10:06:08+02:00",
            "responsibleId": "1",
            "changedBy": "1",
            "changedDate": "2024-11-02T10:06:08+02:00",
            "statusChangedBy": null,
            "closedBy": null,
            "closedDate": null,
            "activityDate": "2024-11-02T10:06:08+02:00",
            "dateStart": null,
            "deadline": null,
            "startDatePlan": null,
            "endDatePlan": null,
            "guid": "{c2794da9-c7fe-404d-a709-ddab4578717a}",
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
            "statusChangedDate": "2024-11-02T10:06:08+02:00",
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
    "time": {
        "start": 1758188171.142611,
        "finish": 1758188172.101309,
        "duration": 0.958698034286499,
        "processing": 0.9341180324554443,
        "date_start": "2025-09-18T12:36:11+03:00",
        "date_finish": "2025-09-18T12:36:12+03:00",
        "operating_reset_at": 1758188771,
        "operating": 0.9340989589691162
    }
}
```
### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Объект с данными ответа ||
|| **task**
[`object`](../data-types.md) | Объект с [описанием задачи](./fields.md) после выполнения операции ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "Не указано название задачи\u003Cbr\u003E"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `100` | Could not find value for parameter {fields} (internal error) | Не передан параметр `fields` или передан пустой ||
|| `ERROR_CORE` | Пользователь указанный в поле "Исполнитель" не найден | В поле `RESPONSIBLE_ID` указан идентификатор несуществующего пользователя ||
|| `ERROR_CORE` | Не указан исполнитель | Не заполнено поле `RESPONSIBLE_ID` ||
|| `ERROR_CORE` | Не указано название задачи | Не заполнено поле `TITLE` ||
|| `ERROR_CORE` | Не введено значение обязательного поля {название_поля} | Не заполнено обязательное пользовательское поле с указанным названием ||
|| `ERROR_CORE` | Некорректный статус | Указано некорректное значение в поле `STATUS` ||
|| `ERROR_CORE` | Задача указанная в поле "Надзадача" не найдена | В поле `PARENT_ID` указан идентификатор несуществующей задачи ||
|| `ERROR_CORE` | В планировании сроков указана дата окончания меньшая даты старта | Дата и время в поле `END_DATE_PLAN` указано меньше, чем в `START_DATE_PLAN` ||
|| `ERROR_CORE` | В планировании сроков указана слишком большая длительность задачи | В значении поля `END_DATE_PLAN` указана слишком большая дата ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжить изучение

- [{#T}](./index.md)
- [{#T}](./tasks-task-update.md)
- [{#T}](./tasks-task-get.md)
- [{#T}](./tasks-task-list.md)
- [{#T}](./tasks-task-delete.md)
- [{#T}](./tasks-task-get-fields.md)
- [{#T}](../../tutorials/tasks/how-to-create-task-with-file.md)
- [{#T}](../../tutorials/tasks/how-to-connect-task-to-spa.md)
- [{#T}](../../tutorials/tasks/how-to-create-comment-with-file.md)