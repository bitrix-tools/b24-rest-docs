# Обновить задачу tasks.task.update

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: постановщик задачи или пользователь с доступом к редактированию задачи

Метод `tasks.task.update` обновляет задачу.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md)  | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](./tasks-task-add.md) или старым методом [получения списка задач](../../tasks/tasks-task-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Значения полей задачи для обновления.
[Описание всех полей задачи](./fields.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.task.update`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":11,"fields":{"title":"Название задачи","deadline":"2025-12-31T23:59:59+02:00","creatorId":29,"responsibleId":1,"crmItemIds":["L_1000959"]}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webbhook_here**/tasks.task.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":11,"fields":{"title":"Название задачи","deadline":"2025-12-31T23:59:59+02:00","creatorId":29,"responsibleId":1,"crmItemIds":["L_1000959"]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.task.update
    ```

- JS

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch. 

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'tasks.task.update',
            {
                id: 11,
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
        console.info('Task updated:', result);
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
                'tasks.task.update',
                [
                    'id' => 11,
                    'fields' => [
                        'title' => 'Название задачи',
                        'deadline' => '2025-12-31T23:59:59+02:00',
                        'creatorId' => 29,
                        'responsibleId' => 1,
                        'crmItemIds' => ['L_1000959'],
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating task: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch. 

    ```js
    BX24.callMethod(
        'tasks.task.update',
        {
            id: 11,
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
        'tasks.task.update',
        [
            'id' => 11,
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
        "result": true
    },
    "time": {
        "start": 1765452441,
        "finish": 1765452442.17818,
        "duration": 1.1781799793243408,
        "processing": 1,
        "date_start": "2025-12-11T14:27:21+03:00",
        "date_finish": "2025-12-11T14:27:22+03:00",
        "operating_reset_at": 1765453041,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Корневой элемент ответа.

Содержит объект с ключом `result` и значением `true`, если задача обновлена успешно  ||
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
                "message": "В DTO `TaskDto` в поле `creatorId` требуется наличие атрибута `Editable` для такого запроса",
                "field": "creatorId"
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
|| `id`
`fields` | Обязательное поле `#FIELD#` не указано | Добавьте указанное поле в тело запроса ||
|| `#FIELD#` | В поле `#FIELD#` требуется тип данных `#TYPE#` для такого запроса | Убедитесь, что передаваемое значение нужного типа ||
|| `responsibleId` | Пользователь указанный в поле \"Исполнитель\" не найден | Укажите идентификатор существующего пользователя в поле `responsibleId` ||
|| `parentId` | Задача указанная в поле \"Надзадача\" не найдена | Укажите идентификатор существующей задачи в поле `parentId` ||
|| `parentId` | Невозможно привязать узел к самому себе | Укажите идентификатор задачи в поле `parentId` отличный от поля `id` ||
|| `endPlan` | В планировании сроков указана дата окончания меньшая даты старта | Укажите дату `endPlan` больше `startPlan` ||
|| `endPlan` | В планировании сроков указана слишком большая длительность задачи | Уменьшите дату в поле `endPlan` ||
|| `creatorId` | В DTO `TaskDto` в поле `creatorId` требуется наличие атрибута `Editable` для такого запроса | Удалите поле `creatorId` из запроса, оно не может быть изменено ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Доступ запрещен | Нет доступа к задаче или задача не существует ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-task-access-get.md)
- [{#T}](./tasks-task-chat-message-send.md)
- [{#T}](./tasks-task-delete.md)