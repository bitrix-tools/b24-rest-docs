# Добавить комментарий task.commentitem.add

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом доступа на чтение задачи или выше

Метод `task.commentitem.add` добавляет новый комментарий к задаче.

{% note warning "Развитие метода остановлено с версии модуля `tasks 25.700.0` " %}

Метод `task.commentitem.add` продолжает работать, но у него есть более актуальный аналог [tasks.task.chat.message.send](../../rest-v3/tasks/tasks-task-chat-message-send.md).

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TASKID***
[`integer`](../../data-types.md) | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](../tasks-task-add.md) или методом [получения списка задач](../tasks-task-list.md) ||
|| **FIELDS***
[`object`](../../data-types.md) | Объект с [полями комментария](#fields) ||
|#

### Параметр FIELDS {#fields}

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **POST_MESSAGE***
[`string`](../../data-types.md) | Текст сообщения ||
|| **AUTHOR_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, от имени которого нужно создать комментарий.

Получить идентификатор пользователя можно с помощью метода [user.get](../../user/user-get.md).

{% note alert "" %}

Метод `task.commentitem.add` позволяет любому пользователю добавить комментарий от чужого имени

{% endnote %}

 ||
|| **POST_DATE**
[`string`](../../data-types.md) | Дата сообщения ||
|| **UF_FORUM_MESSAGE_DOC**
[`array`](../../data-types.md) | Массив с идентификаторами файлов с Диска. Перед каждым идентификатором укажите префикс `n`, например, `['n123', 'n456', ... ]`.

У автора комментария должен быть доступ к прикрепляемым файлам, иначе метод вернет ошибку ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":8017,"FIELDS":{"POST_MESSAGE":"Текст нового комментария к задаче","AUTHOR_ID":503,"POST_DATE":"2025-07-15T14:30:00+03:00","UF_FORUM_MESSAGE_DOC":["n4755","n4753"]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.commentitem.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":8017,"FIELDS":{"POST_MESSAGE":"Текст нового комментария к задаче","AUTHOR_ID":503,"POST_DATE":"2025-07-15T14:30:00+03:00","UF_FORUM_MESSAGE_DOC":["n4755","n4753"]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.commentitem.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.commentitem.add',
    		{
    			"TASKID": 8017,
    			"FIELDS": {
    				"POST_MESSAGE": "Текст нового комментария к задаче",
    				"AUTHOR_ID": 503,
    				"POST_DATE": "2025-07-15T14:30:00+03:00",
    				"UF_FORUM_MESSAGE_DOC": ["n4755", "n4753"]
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
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
                'task.commentitem.add',
                [
                    'TASKID' => 8017,
                    'FIELDS' => [
                        'POST_MESSAGE'         => 'Текст нового комментария к задаче',
                        'AUTHOR_ID'            => 503,
                        'POST_DATE'            => '2025-07-15T14:30:00+03:00',
                        'UF_FORUM_MESSAGE_DOC' => ['n4755', 'n4753'],
                    ],
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
        echo 'Error adding task comment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.commentitem.add',
        {
            "TASKID": 8017,
            "FIELDS": {
                "POST_MESSAGE": "Текст нового комментария к задаче",
                "AUTHOR_ID": 503,
                "POST_DATE": "2025-07-15T14:30:00+03:00",
                "UF_FORUM_MESSAGE_DOC": ["n4755", "n4753"]
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
        'task.commentitem.add',
        [
            'TASKID' => 8017,
            'FIELDS' => [
                'POST_MESSAGE' => 'Текст нового комментария к задаче',
                'AUTHOR_ID' => 503,
                'POST_DATE' => '2025-07-15T14:30:00+03:00',
                'UF_FORUM_MESSAGE_DOC' => ['n4755', 'n4753']
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
    "result": 3141,
    "time": {
        "start": 1753262861.683775,
        "finish": 1753262862.001611,
        "duration": 0.31783604621887207,
        "processing": 0.27428317070007324,
        "date_start": "2025-07-23T12:27:41+03:00",
        "date_finish": "2025-07-23T12:27:42+03:00",
        "operating_reset_at": 1753263461,
        "operating": 0.2742629051208496
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор нового комментария ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#


## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_CODE",
    "error_description":"Недостаточно прав для добавления комментария.<br>"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение**  ||
|| `ERROR_CORE` | Не указан текст комментария | Обязательный параметр `POST_MESSAGE` не передан или пустой ||
|| `ERROR_CORE` | Недостаточно прав для добавления комментария | Нет прав доступа к задаче ||
|| `ERROR_CORE` | Не удалось найти файл | Файл из параметра `UF_FORUM_MESSAGE_DOC` не найден или у автора нет к нему доступа ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #1 (arFields) for method ctaskcommentitem::add() must not contain key `<FIELD_NAME>`.; 256/TE/WRONG_ARGUMENTS | Поле `<FIELD_NAME>` нельзя использовать в методе ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #0 (taskId) for method ctaskcommentitem::add() expected to be of type "integer", but given something else.; 256/TE/WRONG_ARGUMENTS | Указан неверный тип значения для параметра, например, для `TASKID` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./task-comment-item-update.md)
- [{#T}](./task-comment-item-get.md)
- [{#T}](./task-comment-item-get-list.md)
- [{#T}](./task-comment-item-delete.md)
- [{#T}](../../../tutorials/tasks/how-to-create-comment-with-file.md)