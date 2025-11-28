# Получить задачу по идентификатору tasks.task.get

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.get` возвращает информацию о задаче по идентификатору.

Доступ к данным зависит от прав:
- администратор видит все задачи,
- руководитель — задачи своих сотрудников,
- остальные видят только доступные им задачи.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **taskId**
[`integer`](../data-types.md) | Идентификатор задачи. 

Идентификатор задачи можно получить при [создании новой задачи](./tasks-task-add.md) или методом [получения списка задач](./tasks-task-list.md) ||
|| **select**
[`array`](../data-types.md) | Массив полей записей, которые будут возвращены методом. Можно указать только те поля, которые необходимы. Если в массиве присутствует значение `"*"`, то будут возвращены все доступные поля. 

По умолчанию возвращает все поля, кроме пользовательских. Рекомендуем указывать конкретные поля в выборке, там как поля по умолчанию могут быть изменены.

Чтобы получить системные `UF_CRM_TASK`, `UF_TASK_WEBDAV_FILES`, `UF_MAIL_MESSAGE` и пользовательские поля, укажите их в `SELECT`. Узнать названия пользовательских полей можно методом [tasks.task.getFields](./tasks-task-get-fields.md) 

Укажите `CHAT_ID` в select, чтобы получить идентификатор чата для [новой карточки задачи](tasks-new.md)||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":8017,"select":["ID","TITLE","DESCRIPTION","CREATED_BY","RESPONSIBLE_ID","DEADLINE","UF_CRM_TASK","UF_TASK_WEBDAV_FILES"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/tasks.task.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":8017,"select":["ID","TITLE","DESCRIPTION","CREATED_BY","RESPONSIBLE_ID","DEADLINE","UF_CRM_TASK","UF_TASK_WEBDAV_FILES"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.task.get
    ```

- JS

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'tasks.task.get',
            {
                taskId: 8017,
                select: [
                    'ID',
                    'TITLE',
                    'DESCRIPTION',
                    'CREATED_BY',
                    'RESPONSIBLE_ID',
                    'DEADLINE',
                    'UF_CRM_TASK',
                    'UF_TASK_WEBDAV_FILES'
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

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.task.get',
                [
                    'taskId' => 8017,
                    'select' => [
                        'ID',
                        'TITLE',
                        'DESCRIPTION',
                        'CREATED_BY',
                        'RESPONSIBLE_ID',
                        'DEADLINE',
                        'UF_CRM_TASK',
                        'UF_TASK_WEBDAV_FILES'
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching task: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.task.get',
        {
            taskId: 8017,
            select: [
                'ID',
                'TITLE',
                'DESCRIPTION',
                'CREATED_BY',
                'RESPONSIBLE_ID',
                'DEADLINE',
                'UF_CRM_TASK',
                'UF_TASK_WEBDAV_FILES'
            ]
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
        'tasks.task.get',
        [
            'taskId' => 8017,
            'select' => [
                'ID',
                'TITLE',
                'DESCRIPTION',
                'CREATED_BY',
                'RESPONSIBLE_ID',
                'DEADLINE',
                'UF_CRM_TASK',
                'UF_TASK_WEBDAV_FILES'
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
        "task": {
            "id": "8017",
            "title": "Пример задачи",
            "description": "Описание задачи с [B]форматированием[/B]",
            "createdBy": "503",
            "responsibleId": "547",
            "deadline": "2025-10-24T19:00:00+03:00",
            "ufCrmTask": ["C_627", "CO_591", "L_1177", "T88_3", "D_1723"],
            "ufTaskWebdavFiles": [1065, 1077],
            "ufMailMessage": null,
            "descriptionInBbcode": "Y",
            "favorite": "Y",
            "group": [],
            "creator": {
                "id": "503",
                "name": "Мария Иванова",
                "link": "/company/personal/user/503/",
                "icon": "https://mysite.ru/b17053/resize_cache/45749/c0120a8d7c10d63c83e32398d1ec4d9e/main/c89/c89c6b7301880958ea704b5a8470635c/4R5A1256.png",
                "workPosition": "админ"
            },
            "responsible": {
                "id": "547",
                "name": "Мария",
                "link": "/company/personal/user/547/",
                "icon": "/bitrix/images/tasks/default_avatar.png",
                "workPosition": "Тестировщик"
            },
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
            }
        }
    },
    "time": {
        "start": 1759759363,
        "finish": 1759759363.155413,
        "duration": 0.15541291236877441,
        "processing": 0,
        "date_start": "2025-10-06T17:02:43+03:00",
        "date_finish": "2025-10-06T17:02:43+03:00",
        "operating_reset_at": 1759759963,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Объект с данными ответа.

Возвращает пустой массив `"result":[],` если задачи не существует или у пользователя нет прав доступа к задаче ||
|| **task**
[`object`](../data-types.md) | Объект с [описанием задачи](./fields.md) после выполнения операции ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Invalid value {} to match with parameter {select}. Should be value of type array. (internal error)"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `0` | wrong task id | В параметре `taskId` указано значение неверного типа ||
|| `100` | CTaskItem All parameters in the constructor must have real class type (internal error) | Не передан обязательный параметр `taskId` ||
|| `100` | Invalid value {} to match with parameter {select}. Should be value of type array. (internal error) | Параметр `select` передан пустым или в нем указаны неверные значения ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжить изучение

- [{#T}](./index.md)
- [{#T}](./tasks-task-add.md)
- [{#T}](./tasks-task-update.md)
- [{#T}](./tasks-task-list.md)
- [{#T}](./tasks-task-delete.md)
- [{#T}](./tasks-task-get-fields.md)
- [{#T}](../../tutorials/tasks/how-to-create-task-with-file.md)
- [{#T}](../../tutorials/tasks/how-to-connect-task-to-spa.md)