# Добавить задачу tasks.task.add

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- Нужен доп. пример с пояснением по привязке задачи к crm
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
 
{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.add` создает задачу. 

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **fields**
[`unknown`](../data-types.md) | Поля, соответствующие доступному списку полей [tasks.task.getfields](./tasks-task-get-fields.md). ||
|#

## Примеры

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"TITLE":"Название задачи","DEADLINE":"2023-12-31T23:59:59","CREATED_BY":456,"RESPONSIBLE_ID":123,"UF_CRM_TASK":["L_4","C_7","CO_5","D_10"],"UF_TASK_WEBDAV_FILES":["n12345","n67890"]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/tasks.task.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"TITLE":"Название задачи","DEADLINE":"2023-12-31T23:59:59","CREATED_BY":456,"RESPONSIBLE_ID":123,"UF_CRM_TASK":["L_4","C_7","CO_5","D_10"],"UF_TASK_WEBDAV_FILES":["n12345","n67890"]},"auth":"**put_access_token_here**"}' \
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
    				DEADLINE: "2023-12-31T23:59:59", // Крайний срок
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
                        'DEADLINE'      => '2023-12-31T23:59:59',
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
                DEADLINE: "2023-12-31T23:59:59", // Крайний срок
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
                'DEADLINE' => '2023-12-31T23:59:59', // Крайний срок
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

- HTTP

    ```bash
    POST /rest/tasks.task.add.json
    Host: your_bitrix24_domain
    Authorization: Bearer your_access_token
    Content-Type: application/x-www-form-urlencoded

    fields[TITLE]=Название задачи&
    fields[DEADLINE]=2023-12-31T23:59:59&
    fields[CREATED_BY]=456&
    fields[RESPONSIBLE_ID]=123&
    fields[UF_CRM_TASK][0]=L_4&
    fields[UF_CRM_TASK][1]=C_7&
    fields[UF_CRM_TASK][2]=CO_5&
    fields[UF_CRM_TASK][3]=D_10&
    fields[UF_TASK_WEBDAV_FILES][0]=n12345&
    fields[UF_TASK_WEBDAV_FILES][1]=n67890
    ```

{% endlist %}

Для прикрепления файла к задаче перед идентификатором файла должен быть символ `n`

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.item.update',
    		{
    			taskId: '76',
    			fields: {
    				UF_TASK_WEBDAV_FILES: [
    					'n96'
    				]
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log('Updated task with ID:', result);
    	// Нужная вам логика обработки данных
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
                'tasks.task.update',
                [
                    'taskId' => '76',
                    'fields' => [
                        'UF_TASK_WEBDAV_FILES' => [
                            'n96'
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
        echo 'Error updating task: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    {
        "taskId":"76",
        "fields": {
            "UF_TASK_WEBDAV_FILES": [
                "n96"
            ]
        }
    }
    ```

{% endlist %}

**С версии 22.1300.0** в метод можно передать параметр `SE_PARAMETER` — список объектов с дополнительными параметрами задачи.

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'tasks.task.add',
    		{
    			data: {
    				fields: {
    					"TITLE": 'REST',
    					"RESPONSIBLE_ID": 1,
    					"SE_PARAMETER": [
    						{
    							'VALUE': 'Y',
    							'CODE': 3
    						},
    						{
    							'VALUE': 'Y',
    							'CODE': 2
    						},
    					]
    				}
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
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
                'tasks.task.add',
                [
                    'data' => [
                        'fields' => [
                            'TITLE'          => 'REST',
                            'RESPONSIBLE_ID' => 1,
                            'SE_PARAMETER'   => [
                                [
                                    'VALUE' => 'Y',
                                    'CODE'  => 3
                                ],
                                [
                                    'VALUE' => 'Y',
                                    'CODE'  => 2
                                ],
                            ]
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
        echo 'Error adding task: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX.ajax.runAction("tasks.task.add", {
        data: {
            fields: {
                "TITLE": 'REST',
                "RESPONSIBLE_ID": 1,
                "SE_PARAMETER": [
                    {
                        'VALUE': 'Y',
                        'CODE': 3
                    },
                    {
                        'VALUE': 'Y',
                        'CODE': 2
                    },
                ]
            }
        }
    }).then(function (response) { console.log(response);});
    ```

{% endlist %}

Значения кодов:

1. сроки определяются сроками подзадач
2. автоматически завершать задачу при завершении подзадач (и наоборот)
3. обязательный отчет при завершении задачи

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
    }
}
```

## Продолжить изучение

- [{#T}](../../tutorials/tasks/how-to-create-task-with-file.md)
- [{#T}](../../tutorials/tasks/how-to-connect-task-to-spa.md)
- [{#T}](../../tutorials/tasks/how-to-create-comment-with-file.md)