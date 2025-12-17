# Отправить сообщение в чат задачи tasks.task.chat.message.send

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом доступа на чтение задачи или выше

Метод `tasks.task.chat.message.send` отправляет новое сообщение в чат задачи.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект с [параметрами сообщения](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **taskId***
[`integer`](../../data-types.md) | Идентификатор задачи, в чат которой нужно отправить сообщение. 

Идентификатор задачи можно получить при [создании новой задачи](./tasks-task-add.md) или старым методом [получения списка задач](../../tasks/tasks-task-list.md) ||
|| **text***
[`string`](../../data-types.md) | Текст сообщения ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.task.chat.message.send`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"taskId":51,"text":"Сообщение из внешней системы"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webbhook_here**/tasks.task.chat.message.send
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"taskId":51,"text":"Сообщение из внешней системы"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.task.chat.message.send
    ```

- JS

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch. 

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'tasks.task.chat.message.send',
            {
                fields: {
                    taskId: 51,
                    text: 'Сообщение из внешней системы',
                }
            }
        );
        
        const result = response.getData().result;
        console.log('Message sent with ID:', result);
        
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
                'tasks.task.chat.message.send',
                [
                    'fields' =>
                    [
                        'taskId' => 51,
                        'text' => 'Сообщение из внешней системы'
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
        echo 'Error sending chat message: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch. 

    ```js
    BX24.callMethod(
        'tasks.task.chat.message.send',
        {
            'fields': {
                'taskId': 51,
                'text': 'Сообщение из внешней системы'
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
        'tasks.task.chat.message.send',
        [
            'fields' =>
            [
                'taskId' => 51,
                'text' => 'Сообщение из внешней системы'
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
        "start": 1762257254,
        "finish": 1762257254.211513,
        "duration": 0.21151304244995117,
        "processing": 0,
        "date_start": "2025-11-04T15:54:14+04:00",
        "date_finish": "2025-11-04T15:54:14+04:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа.

Содержит объект с ключом `result` и значением `true`, если сообщение отправлено успешно ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта",
        "validation": [
            {
                "message": "Не заполнено обязательное поле \u0022taskId\u0022",
                "field": "taskId"
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
|| `taskId`
`fields`
`text` | Обязательное поле `#FIELD#` не указано | Добавьте указанное поле в тело запроса ||
|| `#FIELD#` | В поле `#FIELD#` требуется тип данных `#TYPE#` для такого запроса | Убедитесь, что передаваемое значение нужного типа ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `taskId` | Доступ запрещен | Нет доступа к задаче ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-task-add.md)
- [{#T}](./tasks-task-update.md)
- [{#T}](../../tasks/tasks-new.md)
