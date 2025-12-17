# Добавить задачу tasks.task.add

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.add` добавляет новую задачу.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Поля задачи. Для создания задачи заполните [обязательные поля](#fields), без них операция создания не будет выполнена
||
|#

### Параметр fields {#fields}

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **title***
[`string`](../../data-types.md) | Название задачи ||
|| **creatorId***
[`integer`](../../data-types.md)  | Идентификатор постановщика. 
Идентификатор сотрудника можно получить методом [user.get](../../user/user-get.md) ||
|| **responsibleId***
[`integer`](../../data-types.md)  | Идентификатор исполнителя.
Идентификатор сотрудника можно получить методом [user.get](../../user/user-get.md) ||
|#

{% note info "" %}

[Описание всех полей задачи](./fields.md)

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.task.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"title":"Название задачи","deadline":"2025-12-31T23:59:59+02:00","creatorId":29,"responsibleId":1,"crmItemIds":["L_1000959"]}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webbhook_here**/tasks.task.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"title":"Название задачи","deadline":"2025-12-31T23:59:59+02:00","creatorId":29,"responsibleId":1,"crmItemIds":["L_1000959"]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.task.add
    ```

- JS

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch. 

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'tasks.task.add',
            {
                fields: {
                    title: 'Название задачи',
                    deadline: '2025-12-31T23:59:59+02:00',
                    creatorId: 29,
                    responsibleId: 1,
                    crmItemIds: ['L_1000959']
                }
            }
        );
        
        const result = response.getData().result;
        console.info('Task created with ID', result.item?.id);
    }
    catch( error )
    {
        console.error(error);
    }
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch. 

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.task.add',
                [
                    'fields' => [
                        'title' => 'Название задачи',
                        'deadline' => '2025-12-31T23:59:59+02:00',
                        'creatorId' => 29,
                        'responsibleId' => 1,
                        'crmItemIds' => ['L_1000959'],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error creating task: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch. 

    ```js
    BX24.callMethod(
        'tasks.task.add',
        {
            fields: {
                title: 'Название задачи',
                deadline: '2025-12-31T23:59:59+02:00',
                creatorId: 29,
                responsibleId: 1,
                crmItemIds: ['L_1000959']
            }
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch. 

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.task.add',
        [
            'fields' => [
                'title' => 'Название задачи',
                'deadline' => '2025-12-31T23:59:59+02:00',
                'creatorId' => 29,
                'responsibleId' => 1,
                'crmItemIds' => ['L_1000959']
            ]
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
        "item": {
            "id": 3839,
            "title": "Название задачи",
            "description": "",
            "deadline": "2026-01-01T00:59:59+03:00",
            "needsControl": false,
            "startPlan": null,
            "endPlan": null,
            "fileIds": null,
            "checklist": [],
            "epicId": null,
            "storyPoints": null,
            "priority": "average",
            "status": "pending",
            "statusChanged": null,
            "parentId": null,
            "containsChecklist": false,
            "containsSubTasks": false,
            "containsRelatedTasks": false,
            "containsGanttLinks": false,
            "containsPlacements": true,
            "containsResults": false,
            "numberOfReminders": 0,
            "chatId": 2603,
            "plannedDuration": 0,
            "actualDuration": 0,
            "durationType": "days",
            "started": null,
            "estimatedTime": 0,
            "replicate": false,
            "changed": "2025-12-11T12:25:33+03:00",
            "closed": null,
            "activity": "2025-12-11T12:25:33+03:00",
            "guid": "{13d2c44c-730e-45dd-b99c-fdaad4e3c1fa}",
            "xmlId": null,
            "exchangeId": null,
            "exchangeModified": null,
            "outlookVersion": 1,
            "mark": "none",
            "allowsChangeDeadline": false,
            "allowsTimeTracking": false,
            "matchesWorkTime": false,
            "addInReport": null,
            "isMultitask": false,
            "siteId": "s1",
            "deadlineCount": null,
            "declineReason": null,
            "forumTopicId": null,
            "link": "\/company\/personal\/user\/1\/tasks\/task\/view\/3839\/",
            "rights": {
                "read": true,
                "watch": true,
                "mute": true,
                "createResult": true,
                "edit": true,
                "remove": true,
                "complete": true,
                "approve": false,
                "disapprove": false,
                "start": true,
                "take": false,
                "delegate": true,
                "defer": true,
                "renew": false,
                "deadline": true,
                "datePlan": true,
                "changeDirector": false,
                "changeResponsible": true,
                "changeAccomplices": true,
                "pause": false,
                "timeTracking": false,
                "mark": true,
                "changeStatus": true,
                "reminder": true,
                "addAuditors": true,
                "elapsedTime": true,
                "favorite": true,
                "checklistAdd": true,
                "checklistEdit": true,
                "checklistSave": true,
                "checklistToggle": true,
                "automate": true,
                "resultEdit": false,
                "completeResult": true,
                "removeResult": false,
                "resultRead": false,
                "admin": true,
                "createSubtask": true,
                "copy": true,
                "saveAsTemplate": true,
                "attachFile": true,
                "detachFile": true,
                "detachParent": true,
                "createGanttDependence": true,
                "sort": false
            },
            "archiveLink": "\/bitrix\/tools\/disk\/uf.php?entityId=3839\u0026entity=TASKS_TASK\u0026fieldName=UF_TASK_WEBDAV_FILES\u0026signature=89f4f46e33905bcb0899c8cb9613a62cf8e104b182824e799d2aeb9d1e5bf526\u0026action=downloadArchiveByEntity\u0026ncc=1",
            "crmItemIds": [
                "L_1000959"
            ],
            "requireResult": false,
            "matchesSubTasksTime": false,
            "autocompleteSubTasks": false,
            "allowsChangeDatePlan": false,
            "maxDeadlineChangeDate": null,
            "maxDeadlineChanges": null,
            "requireDeadlineChangeReason": false,
            "inFavorite": [],
            "inPin": [],
            "inGroupPin": [],
            "inMute": [],
            "dependsOn": [],
            "scenarios": [
                "default"
            ]
        }
    },
    "time": {
        "start": 1765445133,
        "finish": 1765445134.139558,
        "duration": 1.1395580768585205,
        "processing": 1,
        "date_start": "2025-12-11T12:25:33+03:00",
        "date_finish": "2025-12-11T12:25:34+03:00",
        "operating_reset_at": 1765445733,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **item**
[`object`](../../data-types.md) | Объект со значениями полей задачи. [Описание полей задачи со связанными объектами](./fields.md) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#


## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "В поле `deadline` требуется тип данных `DateTime` для такого запроса",
                "field": "deadline"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса  

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `title`
`responsibleId`
`creatorId`
`fields` | Обязательное поле `#FIELD#` не указано | Добавьте указанное поле в тело запроса ||
|| `#FIELD#` | В поле `#FIELD#` требуется тип данных `#TYPE#` для такого запроса | Убедитесь, что передаваемое значение нужного типа ||
|| `responsibleId` | Пользователь указанный в поле \"Исполнитель\" не найден | Укажите идентификатор существующего пользователя в поле `responsibleId` ||
|| `creatorId` | "" | Укажите идентификатор существующего пользователя в поле `creatorId` ||
|| `parentId` | Задача указанная в поле \"Надзадача\" не найдена | Укажите идентификатор существующей задачи в поле `parentId` ||
|| `endPlan` | В планировании сроков указана дата окончания меньшая даты старта | Укажите дату `endPlan` больше `startPlan` ||
|| `endPlan` | В планировании сроков указана слишком большая длительность задачи | Уменьшите дату в поле `endPlan` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-task-update.md)
- [{#T}](./tasks-task-chat-message-send.md)
- [{#T}](./tasks-task-delete.md)
- [{#T}](./tasks-task-file-attach.md)
