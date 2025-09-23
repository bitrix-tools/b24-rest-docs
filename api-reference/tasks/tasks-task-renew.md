# Возобновить задачу после ее завершения tasks.task.renew

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: 
> - любой пользователь с доступом к редактированию задачи
> - постановщик, исполнитель и соисполнители задачи

Метод `tasks.task.renew` возобновляет задачу после ее завершения.

## Параметры метода

{% include [Сноска о параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **taskId***
[`integer`](../data-types.md) | Идентификатор задачи. 

Идентификатор задачи можно получить при [создании новой задачи](./tasks-task-add.md) или методом [получения списка задач](./tasks-task-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/tasks.task.renew
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.task.renew
    ```

- JS

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'tasks.task.renew',
            {
                taskId: 1,
            }
        );
        
        const result = response.getData().result;
        console.log('Deferred task with ID:', result);
        
        processResult(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.task.renew',
                [
                    'taskId' => 1
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deferring task: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.task.renew',
        {
            'taskId': 1
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
        'tasks.task.renew',
        [
            'taskId' => 1
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
        "task": {
            "id": "8017",
            "parentId": "7817",
            "title": "Пример задачи",
            "description": "Описание задачи с [B]форматированием[/B]",
            "mark": "P",
            "priority": "2",
            "multitask": "N",
            "notViewed": "N",
            "replicate": "Y",
            "stageId": "351",
            "sprintId": null,
            "backlogId": "5",
            "createdBy": "503",
            "createdDate": "2025-06-04T16:15:55+03:00",
            "responsibleId": "503",
            "changedBy": "503",
            "changedDate": "2025-09-09T16:31:11+03:00",
            "statusChangedBy": "503",
            "closedBy": "0",
            "closedDate": null,
            "activityDate": "2025-09-09T16:31:11+03:00",
            "dateStart": "2025-09-08T16:45:28+03:00",
            "deadline": "2025-09-19T17:00:00+03:00",
            "startDatePlan": null,
            "endDatePlan": null,
            "guid": "{21e7b78d-498e-4c84-a896-2dbeb26861b8}",
            "xmlId": null,
            "commentsCount": "40",
            "serviceCommentsCount": "24",
            "allowChangeDeadline": "Y",
            "allowTimeTracking": "Y",
            "taskControl": "Y",
            "addInReport": "N",
            "forkedByTemplateId": null,
            "timeEstimate": "101580",
            "timeSpentInLogs": "69963",
            "matchWorkTime": "N",
            "forumTopicId": "1273",
            "forumId": "11",
            "siteId": "s1",
            "subordinate": "Y",
            "exchangeModified": null,
            "exchangeId": null,
            "outlookVersion": "42",
            "viewedDate": "2025-09-09T16:31:11+03:00",
            "sorting": null,
            "durationFact": "1166",
            "isMuted": "Y",
            "isPinned": "N",
            "isPinnedInGroup": "N",
            "flowId": null,
            "descriptionInBbcode": "Y",
            "status": "2",
            "statusChangedDate": "2025-09-09T16:31:11+03:00",
            "durationPlan": "0",
            "durationType": "days",
            "favorite": "Y",
            "groupId": "125",
            "auditors": [
                "61",
                "103",
                "547"
            ],
            "accomplices": [
                "3",
                "11"
            ],
            "checklist": {
                "433": {
                    "id": "433",
                    "taskId": "8017",
                    "createdBy": "503",
                    "parentId": "431",
                    "title": "Первый",
                    "sortIndex": "0",
                    "isComplete": "N",
                    "isImportant": "N",
                    "toggledBy": null,
                    "toggledDate": null,
                    "ufChecklistFiles": false,
                    "members": [],
                    "attachments": [],
                    "entityId": "8017",
                    "action": {
                        "modify": true,
                        "remove": true,
                        "toggle": true,
                        "add": true,
                        "addAccomplice": true
                    }
                },
                "431": {
                    "id": "431",
                    "taskId": "8017",
                    "createdBy": "503",
                    "parentId": 0,
                    "title": "Чек-лист 1",
                    "sortIndex": "0",
                    "isComplete": "N",
                    "isImportant": "N",
                    "toggledBy": null,
                    "toggledDate": null,
                    "ufChecklistFiles": false,
                    "members": [],
                    "attachments": [],
                    "entityId": "8017",
                    "action": {
                        "modify": true,
                        "remove": true,
                        "toggle": true,
                        "add": true,
                        "addAccomplice": true
                    }
                },
                "435": {
                    "id": "435",
                    "taskId": "8017",
                    "createdBy": "503",
                    "parentId": "431",
                    "title": "Второй",
                    "sortIndex": "1",
                    "isComplete": "N",
                    "isImportant": "N",
                    "toggledBy": null,
                    "toggledDate": null,
                    "ufChecklistFiles": false,
                    "members": [],
                    "attachments": [],
                    "entityId": "8017",
                    "action": {
                        "modify": true,
                        "remove": true,
                        "toggle": true,
                        "add": true,
                        "addAccomplice": true
                    }
                }
            },
            "group": {
                "id": "125",
                "name": "Рабочая группа",
                "opened": false,
                "membersCount": 1,
                "image": "\/bitrix\/images\/socialnetwork\/workgroup\/bag.png",
                "additionalData": []
            },
            "creator": {
                "id": "503",
                "name": "Мария Иванова",
                "link": "\/company\/personal\/user\/503\/",
                "icon": "https:\/\/mysite.ru\/b17053\/resize_cache\/45749\/c0120a8d7c10d63c83e32398d1ec4d9e\/main\/c89\/c89c6b7301880958ea704b5a8470635c\/4R5A1256.png",
                "workPosition": "Администратор"
            },
            "responsible": {
                "id": "503",
                "name": "Мария Иванова",
                "link": "\/company\/personal\/user\/503\/",
                "icon": "https:\/\/mysite.ru\/b17053\/resize_cache\/45749\/c0120a8d7c10d63c83e32398d1ec4d9e\/main\/c89\/c89c6b7301880958ea704b5a8470635c\/4R5A1256.png",
                "workPosition": "Администратор"
            },
            "accomplicesData": {
                "3": {
                    "id": "3",
                    "name": "Андрей Карпов",
                    "link": "\/company\/personal\/user\/3\/",
                    "icon": "https:\/\/mysite.ru\/b17053\/resize_cache\/249\/c0120a8d7c10d63c83e32398d1ec4d9e\/main\/cd526b0644e7ff4d794ea41cb36bc423\/odmin.png",
                    "workPosition": "Системный администратор"
                },
                "11": {
                    "id": "11",
                    "name": "Андрей Сергеев",
                    "link": "\/company\/personal\/user\/11\/",
                    "icon": "https:\/\/mysite.ru\/b17053\/resize_cache\/231\/c0120a8d7c10d63c83e32398d1ec4d9e\/main\/026bf59e161a0bd50f401d3796800651\/66b.jpg",
                    "workPosition": "Специалист"
                }
            },
            "auditorsData": {
                "61": {
                    "id": "61",
                    "name": "Иван Петров",
                    "link": "\/company\/personal\/user\/61\/",
                    "icon": "https:\/\/mysite.ru\/b17053\/resize_cache\/8674\/c0120a8d7c10d63c83e32398d1ec4d9e\/main\/7b5\/7b52e4c2304ec0520dab3d4261e9ca1f\/sp.jpg",
                    "workPosition": "Маркетолог"
                },
                "103": {
                    "id": "103",
                    "name": "Светлана Иванова",
                    "link": "\/company\/personal\/user\/103\/",
                    "icon": "https:\/\/mysite.ru\/b17053\/resize_cache\/8644\/c0120a8d7c10d63c83e32398d1ec4d9e\/main\/45f\/45fff10d17d398a5583184c8350cd197\/buh.jpg",
                    "workPosition": "Бухгалтер"
                },
                "547": {
                    "id": "547",
                    "name": "Мария",
                    "link": "\/company\/personal\/user\/547\/",
                    "icon": "\/bitrix\/images\/tasks\/default_avatar.png",
                    "workPosition": "Тестировщик"
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
                "addFavorite": false,
                "deleteFavorite": true,
                "rate": true,
                "take": false,
                "edit.originator": false,
                "checklist.reorder": true,
                "elapsedtime.add": true,
                "dayplan.timer.toggle": true,
                "edit.plan": true,
                "checklist.add": true,
                "favorite.add": false,
                "favorite.delete": true
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
                "descendants": [
                    {
                        "nodeId": 1,
                        "fields": {
                            "id": 431,
                            "copiedId": null,
                            "entityId": 8017,
                            "userId": 503,
                            "createdBy": 503,
                            "parentId": 0,
                            "title": "Чек-лист 1",
                            "sortIndex": 0,
                            "displaySortIndex": "",
                            "isComplete": false,
                            "isImportant": false,
                            "completedCount": 0,
                            "members": [],
                            "attachments": [],
                            "nodeId": null
                        },
                        "action": {
                            "modify": true,
                            "remove": true,
                            "toggle": true,
                            "add": true,
                            "addAccomplice": true
                        },
                        "descendants": [
                            {
                                "nodeId": 2,
                                "fields": {
                                    "id": 433,
                                    "copiedId": null,
                                    "entityId": 8017,
                                    "userId": 503,
                                    "createdBy": 503,
                                    "parentId": 431,
                                    "title": "Первый",
                                    "sortIndex": 0,
                                    "displaySortIndex": "1",
                                    "isComplete": false,
                                    "isImportant": false,
                                    "completedCount": 0,
                                    "members": [],
                                    "attachments": [],
                                    "nodeId": null
                                },
                                "action": {
                                    "modify": true,
                                    "remove": true,
                                    "toggle": true,
                                    "add": true,
                                    "addAccomplice": true
                                },
                                "descendants": []
                            },
                            {
                                "nodeId": 3,
                                "fields": {
                                    "id": 435,
                                    "copiedId": null,
                                    "entityId": 8017,
                                    "userId": 503,
                                    "createdBy": 503,
                                    "parentId": 431,
                                    "title": "Второй",
                                    "sortIndex": 1,
                                    "displaySortIndex": "2",
                                    "isComplete": false,
                                    "isImportant": false,
                                    "completedCount": 0,
                                    "members": [],
                                    "attachments": [],
                                    "nodeId": null
                                },
                                "action": {
                                    "modify": true,
                                    "remove": true,
                                    "toggle": true,
                                    "add": true,
                                    "addAccomplice": true
                                },
                                "descendants": []
                            }
                        ]
                    }
                ]
            },
            "checkListCanAdd": true
        },
        "time": {
            "start": 1757424671.509725,
            "finish": 1757424672.203906,
            "duration": 0.694180965423584,
            "processing": 0.6726489067077637,
            "date_start": "2025-09-09T16:31:11+03:00",
            "date_finish": "2025-09-09T16:31:12+03:00",
            "operating_reset_at": 1757425271,
            "operating": 0.6726338863372803
        }
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
    "error":"1048582",
    "error_description":"Действие над задачей не разрешено"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | wrong task id | В параметре `taskId` указано значение неверного типа ||
|| `1048582` | Действие над задачей не разрешено | Ошибка возвращается в случаях:
- задача с указанным `ID` не существует
- нет доступа к задаче
- нет прав на выполнения действия в задаче ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./tasks-task-start.md)
- [{#T}](./tasks-task-pause.md)
- [{#T}](./tasks-task-defer.md)
- [{#T}](./tasks-task-complete.md)