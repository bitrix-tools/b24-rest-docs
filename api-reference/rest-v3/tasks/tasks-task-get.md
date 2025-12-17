# Получить задачу tasks.task.get

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.get` возвращает информацию о задаче по идентификатору.

Доступ к данным зависит от прав:
- администратор видит все задачи,
- руководитель — задачи своих сотрудников,
- остальные видят только доступные им задачи.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](./tasks-task-add.md) или старым методом [получения списка задач](../../tasks/tasks-task-list.md) ||
|| **select** 
[`array`](../../data-types.md) | Массив полей, которые вернет метод. Если `select` не задан, приходит базовый набор полей задачи без связанных объектов.

Для связанных объектов используйте вложенный путь через точку, например `["responsible.name","responsible.email"]` - в ответе появится объект `responsible` с запрошенными полями. [Перечень полей со связанными объектами](./fields.md)
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.task.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8017,"select":["responsible.name","responsible.email"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webbhook_here**/tasks.task.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8017,"select":["responsible.name","responsible.email"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.task.get
    ```

- JS

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch. 

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'tasks.task.get',
            {
                id: 8017,
                select: [
                    'responsible.name',
                    'responsible.email'
                ]
            }
        );
        
        const result = response.getData().result;
        console.log('Fetched task:', result);
        processResult(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch. 

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.task.get',
                [
                    'id' => 8017,
                    'select' => [
                        'responsible.name',
                        'responsible.email'
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching task: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch. 

    ```js
    BX24.callMethod(
        'tasks.task.get',
        {
            id: 8017,
            select: [
                'responsible.name',
                'responsible.email'
            ]
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
        'tasks.task.get',
        [
            'id' => 8017,
            'select' => [
                'responsible.name',
                'responsible.email'
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
            "id": 3835,
            "title": "название",
            "description": "описание",
            "responsible": {
                "name": "Саша",
                "email": "mail@bitrix.ru"
            },
            "deadline": "2025-12-25T23:00:00+03:00",
            "needsControl": false,
            "startPlan": null,
            "endPlan": null,
            "fileIds": null,
            "checklist": [
                153,
                165
            ],
            "epicId": null,
            "storyPoints": null,
            "priority": "average",
            "status": "pending",
            "statusChanged": "2025-11-24T06:00:00+03:00",
            "parentId": null,
            "containsChecklist": true,
            "containsSubTasks": false,
            "containsRelatedTasks": false,
            "containsGanttLinks": false,
            "containsPlacements": true,
            "containsResults": false,
            "numberOfReminders": 0,
            "chatId": 2537,
            "plannedDuration": 0,
            "actualDuration": 0,
            "durationType": "days",
            "started": null,
            "estimatedTime": 0,
            "replicate": false,
            "changed": "2025-12-10T16:04:54+03:00",
            "closed": null,
            "activity": "2025-12-10T16:04:42+03:00",
            "guid": "{99502976-b2a2-4246-8d35-c6943b5ff242}",
            "xmlId": null,
            "exchangeId": null,
            "exchangeModified": null,
            "outlookVersion": 12,
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
            "link": "/company/personal/user/1/tasks/task/view/3835/",
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
            "archiveLink": "/bitrix/tools/disk/uf.php?entityId=3835&entity=TASKS_TASK&fieldName=UF_TASK_WEBDAV_FILES&signature=516ff0b54563ff935bbdf891590bed09bf4216db4fdf2df4df20425b7dd341e1&action=downloadArchiveByEntity&ncc=1",
            "crmItemIds": [
                "D_6529"
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
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `2` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса  

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Добавьте `id` в тело запроса ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Убедитесь, что значение — число, а не строка ||
|#

#### Ошибки нахождения данных

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `2` не найдена | Укажите `id` существующей задачи ||
|#


Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `status` для сущности `TaskDto` | Укажите в `select` существующие поля для выборки полей связанных объектов ||
|#


{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-task-update.md)
- [{#T}](./tasks-task-chat-message-send.md)
- [{#T}](./tasks-task-delete.md)