# Отправить сообщение в чат задачи tasks.task.chat.message.send

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом доступа на чтение задачи или выше

Метод `tasks.task.chat.message.send` отправляет новое сообщение в чат задачи.

## Параметры метода

{% include [Сноска о параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../data-types.md) | Объект с [параметрами сообщения](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска о параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **taskId***
[`integer`](../data-types.md) | Идентификатор задачи, в чат которой нужно отправить сообщение. 

Идентификатор задачи можно получить при [создании новой задачи](./tasks-task-add.md) или методом [получения списка задач](./tasks-task-list.md) ||
|| **text***
[`string`](../data-types.md) | Текст сообщения ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра /api/ в запрос. 

Старая версия:

`https://{адрес_установки}/rest/{id_пользователя}/{пароль_rest-приложения}/tasks.task.get`

Новая версия:

`https://{адрес_установки}/rest/api/{id_пользователя}/{пароль_rest-приложения}/tasks.task.get`

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
[`object`](../data-types.md) | Корневой элемент ответа.

Содержит объект с ключом `result` и значением `true`, если сообщение отправлено успешно ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "Bad Request",
    "error_description": "Ошибка при валидации объекта"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** |**Код** | **Описание** | **Значение** ||
|| `400` | Bad Request | Ошибка при валидации объекта | Обязательное поле не передано или в нем передано пустое значение ||
|| `403` | Нет доступа к задаче |  | У пользователя нет прав доступа к задаче ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./tasks-task-add.md)
- [{#T}](./tasks-task-update.md)
