# Изменить задачу tasks.task.update

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: 
> - любой пользователь с доступом к редактированию задачи
> - постановщик задачи

Метод `tasks.task.update` обновляет задачу.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **taskId***
[`integer`](../data-types.md) | Идентификатор задачи. 

Идентификатор задачи можно получить при [создании новой задачи](./tasks-task-add.md) или методом [получения списка задач](./tasks-task-list.md) ||
|| **fields***
[`object`](../data-types.md) | Значения [полей задачи](./fields.md). В параметре нужно передать хотя бы одно поле, иначе метод вернет ошибку.

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

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":11,"fields":{"UF_CRM_TASK":["L_4","C_7","CO_5","D_10"],"UF_TASK_WEBDAV_FILES":["n12345","n67890"],"RESPONSIBLE_ID":123}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/tasks.task.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":11,"fields":{"UF_CRM_TASK":["L_4","C_7","CO_5","D_10"],"UF_TASK_WEBDAV_FILES":["n12345","n67890"],"RESPONSIBLE_ID":123},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.task.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"tasks.task.update",
    		{
    			taskId: 11, // Идентификатор задачи, которую вы хотите обновить
    			fields: {
    				// Пример передачи нескольких значений в поле UF_CRM_TASK
    				UF_CRM_TASK: [
    					"L_4", // Привязка к лиду с id 4
    					"C_7", // Привязка к контакту с id 7
    					"CO_5", // Привязка к компании с id 5
    					"D_10" // Привязка к сделке с id 10
    				],
    				// Пример передачи нескольких файлов в поле UF_TASK_WEBDAV_FILES
    				UF_TASK_WEBDAV_FILES: [
    					"n12345", // Идентификатор первого файла диска
    					"n67890" // Идентификатор второго файла диска
    				],
    				RESPONSIBLE_ID: 123 // Идентификатор нового исполнителя
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info("Задача успешно обновлена");
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
                'tasks.task.update',
                [
                    'taskId' => 11, // Идентификатор задачи, которую вы хотите обновить
                    'fields' => [
                        // Пример передачи нескольких значений в поле UF_CRM_TASK
                        'UF_CRM_TASK' => [
                            'L_4', // Привязка к лиду с id 4
                            'C_7', // Привязка к контакту с id 7
                            'CO_5', // Привязка к компании с id 5
                            'D_10' // Привязка к сделке с id 10
                        ],
                        // Пример передачи нескольких файлов в поле UF_TASK_WEBDAV_FILES
                        'UF_TASK_WEBDAV_FILES' => [
                            'n12345', // Идентификатор первого файла диска
                            'n67890' // Идентификатор второго файла диска
                        ],
                        'RESPONSIBLE_ID' => 123 // Идентификатор нового исполнителя
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Задача успешно обновлена';
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Ошибка при обновлении задачи: ' . $e->getMessage();
    }
    ```

- BX24.js

   ```javascript
    BX24.callMethod(
        "tasks.task.update",
        {
            taskId: 11, // Идентификатор задачи, которую вы хотите обновить
            fields: {
                // Пример передачи нескольких значений в поле UF_CRM_TASK
                UF_CRM_TASK: [
                    "L_4", // Привязка к лиду с id 4
                    "C_7", // Привязка к контакту с id 7
                    "CO_5", // Привязка к компании с id 5
                    "D_10" // Привязка к сделкес id 10
                ],
                // Пример передачи нескольких файлов в поле UF_TASK_WEBDAV_FILES
                UF_TASK_WEBDAV_FILES: [
                    "n12345", // Идентификатор первого файла диска
                    "n67890" // Идентификатор второго файла диска
                ],
                RESPONSIBLE_ID: 123 // Идентификатор нового исполнителя
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info("Задача успешно обновлена");
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.task.update',
        [
            'taskId' => 11, // Идентификатор задачи, которую вы хотите обновить
            'fields' => [
                // Пример передачи нескольких значений в поле UF_CRM_TASK
                'UF_CRM_TASK' => [
                    'L_4', // Привязка к лиду с id 4
                    'C_7', // Привязка к контакту с id 7
                    'CO_5', // Привязка к компании с id 5
                    'D_10' // Привязка к сделке с id 10
                ],
                // Пример передачи нескольких файлов в поле UF_TASK_WEBDAV_FILES
                'UF_TASK_WEBDAV_FILES' => [
                    'n12345', // Идентификатор первого файла диска
                    'n67890' // Идентификатор второго файла диска
                ],
                'RESPONSIBLE_ID' => 123 // Идентификатор нового исполнителя
            ]
        ]
    );

    if (isset($result['error'])) {
        echo 'Ошибка: ' . $result['error_description'];
    } else {
        echo 'Задача успешно обновлена';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "task": {
            "id": "8157",
            "title": "Пример задачи",
            "description": "Описание задачи с [B]форматированием[/B]",
            "description": "",
            "mark": null,
            "priority": "1",
            "multitask": "N",
            "notViewed": "N",
            "replicate": "N",
            "stageId": "0",
            "sprintId": null,
            "backlogId": null,
            "createdBy": "503",
            "createdDate": "2025-10-06T17:40:12+03:00",
            "responsibleId": "503",
            "changedBy": "503",
            "changedDate": "2025-10-07T16:32:02+03:00",
            "statusChangedBy": "503",
            "closedBy": "0",
            "closedDate": null,
            "activityDate": "2025-10-07T16:29:55+03:00",
            "dateStart": null,
            "deadline": "2025-12-31T23:59:00+03:00",
            "startDatePlan": "2024-11-02T11:06:00+03:00",
            "endDatePlan": "2024-11-02T19:06:00+03:00",
            "guid": "{1a90e51d-5423-4c1e-b1a2-664a519b4612}",
            "xmlId": null,
            "commentsCount": "4",
            "serviceCommentsCount": "4",
            "allowChangeDeadline": "N",
            "allowTimeTracking": "N",
            "taskControl": "N",
            "addInReport": "N",
            "forkedByTemplateId": null,
            "timeEstimate": "0",
            "timeSpentInLogs": null,
            "matchWorkTime": "N",
            "forumTopicId": "1439",
            "forumId": "11",
            "siteId": "s1",
            "subordinate": "Y",
            "exchangeModified": null,
            "exchangeId": null,
            "outlookVersion": "8",
            "viewedDate": "2025-10-07T16:30:34+03:00",
            "sorting": null,
            "durationFact": null,
            "isMuted": "N",
            "isPinned": "N",
            "isPinnedInGroup": "N",
            "flowId": null,
            "descriptionInBbcode": "Y",
            "status": "2",
            "statusChangedDate": "2025-10-07T16:22:24+03:00",
            "durationPlan": "0",
            "durationType": "days",
            "favorite": "N",
            "groupId": "0",
            "auditors": ["503", "547"],
            "accomplices": [],
            "checklist": [],
            "group": [],
            "creator": {
                "id": "503",
                "name": "Мария Иванова",
                "link": "/company/personal/user/503/",
                "icon": "https://mysite.ru/b17053/resize_cache/45749/c0120a8d7c10d63c83e32398d1ec4d9e/main/c89/c89c6b7301880958ea704b5a8470635c/4R5A1256.png",
                "workPosition": "Администратор"
            },
            "responsible": {
                "id": "503",
                "name": "Мария Иванова",
                "link": "/company/personal/user/503/",
                "icon": "https://mysite.ru/b17053/resize_cache/45749/c0120a8d7c10d63c83e32398d1ec4d9e/main/c89/c89c6b7301880958ea704b5a8470635c/4R5A1256.png",
                "workPosition": "Администратор"
            },
            "accomplicesData": [],
            "auditorsData": {
                "547": {
                    "id": "547",
                    "name": "Елена",
                    "link": "/company/personal/user/547/",
                    "icon": "/bitrix/images/tasks/default_avatar.png",
                    "workPosition": "Юрист"
                }
            },
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
                    "userId": 503,
                    "createdBy": null,
                    "parentId": null,
                    "title": "",
                    "sortIndex": null,
                    "displaySortIndex": "",
                    "isComplete": false,
                    "isImportant": false,
                    "completedCount": 0,
                    "members": [],
                    "attachments": [],
                    "nodeId": null
                },
                "action": [],
                "descendants": []
            },
            "checkListCanAdd": true
        }
    },
    "time": {
        "start": 1759843922,
        "finish": 1759843922.725389,
        "duration": 0.7253890037536621,
        "processing": 0,
        "date_start": "2025-10-07T16:32:02+03:00",
        "date_finish": "2025-10-07T16:32:02+03:00",
        "operating_reset_at": 1759844522,
        "operating": 0.4929828643798828
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
    "error_description": "Невозможно привязать узел к самому себе\u003Cbr\u003E"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | wrong task id | В параметре `taskId` указано значение неверного типа ||
|| `100` | CTaskItem All parameters in the constructor must have real class type (internal error) | Не передан обязательный параметр `taskId` ||
|| `0` | Действие над задачей не разрешено (internal error) | У пользователя нет прав обновление задачи или нет доступа к задаче ||
|| `100` | Could not find value for parameter {fields} (internal error) | Не передан параметр `fields` или передан пустой ||
|| `ERROR_CORE` | Пользователь указанный в поле \u0026quot;Исполнитель\u0026quot; не найден\u003Cbr\u003E | В поле `RESPONSIBLE_ID` указан идентификатор несуществующего пользователя ||
|| `ERROR_CORE` | Некорректный статус\u003Cbr\u003E | Указано некорректное значение в поле `STATUS` ||
|| `ERROR_CORE` | Задача указанная в поле \u0026quot;Надзадача\u0026quot; не найдена\u003Cbr\u003E | В поле `PARENT_ID` указан идентификатор несуществующей задачи ||
|| `ERROR_CORE` | Невозможно привязать узел к самому себе\u003Cbr\u003E | В поле `PARENT_ID` указан идентификатор той же задачи, что и в параметре `taskId` ||
|| `ERROR_CORE` | Создание зацикленных связей в задачах запрещено\u003Cbr\u003E | В поле `PARENT_ID` указан идентификатор подзадачи `taskId`. Подзадача не может стать базовой задачей ||
|| `ERROR_CORE` | В планировании сроков указана дата окончания меньшая даты старта\u003Cbr\u003E | Дата и время в поле `END_DATE_PLAN` указано меньше, чем в `START_DATE_PLAN` ||
|| `ERROR_CORE` | В планировании сроков указана слишком большая длительность задачи\u003Cbr\u003E | В значении поля `END_DATE_PLAN` указана слишком большая дата ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжить изучение

- [{#T}](./index.md)
- [{#T}](./tasks-task-add.md)
- [{#T}](./tasks-task-get.md)
- [{#T}](./tasks-task-list.md)
- [{#T}](./tasks-task-delete.md)
- [{#T}](./tasks-task-get-fields.md)
- [{#T}](../../tutorials/tasks/how-to-upload-file-to-task.md)
- [{#T}](../../tutorials/tasks/how-to-connect-task-to-spa.md)
- [{#T}](../../tutorials/tasks/how-to-create-comment-with-file.md)