# Удалить комментарий task.commentitem.delete

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `task.commentitem.delete` удаляет комментарий. 

{% note warning "Развитие метода остановлено с версии модуля `tasks 25.700.0` " %}

Метод `task.commentitem.delete` не работает в [новой карточке задач](../tasks-new.md), используйте метод [im.message.delete](../../chats/messages/im-message-delete.md) для работы с чатом задач.

{% endnote %}

## Параметры метода

{% note warning "" %}

Передавайте параметры в запросе в соответствии с порядком в таблице. Если нарушить порядок, запрос вернет ошибку.

{% endnote %}

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TASKID***
[`integer`](../../data-types.md) | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](../tasks-task-add.md) или методом [получения списка задач](../tasks-task-list.md) ||
|| **ITEMID***
[`integer`](../../data-types.md) | Идентификатор комментария.

Идентификатор комментария можно получить при [добавлении нового комментария](./task-comment-item-add.md) или методом [получения списка комментариев](./task-comment-item-get-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":8017,"ITEMID":3155}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.commentitem.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":8017,"ITEMID":3155,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.commentitem.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.commentitem.delete',
    		{
    			"TASKID": 8017,
    			"ITEMID": 3155
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
                'task.commentitem.delete',
                [
                    'TASKID' => 8017,
                    'ITEMID' => 3155
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
        echo 'Error deleting task comment item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.commentitem.delete',
        {
            "TASKID": 8017,
            "ITEMID": 3155
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
        'task.commentitem.delete',
        [
            'TASKID' => 8017,
            'ITEMID' => 3155
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
    "result": true,
    "time": {
        "start": 1753274713.135909,
        "finish": 1753274713.503945,
        "duration": 0.36803603172302246,
        "processing": 0.32417798042297363,
        "date_start": "2025-07-23T15:45:13+03:00",
        "date_finish": "2025-07-23T15:45:13+03:00",
        "operating_reset_at": 1753275313,
        "operating": 0.32415318489074707
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true` если комментарий удален успешно ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_CORE",
    "error_description":"TASKS_ERROR_EXCEPTION_#4; Action is not allowed; 4/TE/ACTION_NOT_ALLOWED.<br>"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #1 (itemId) expected by method ctaskcommentitem::delete(), but not given.; 256/TE/WRONG_ARGUMENTS | Не указан обязательный параметр, например, `ITEMID` ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#4; Action is not allowed; 4/TE/ACTION_NOT_ALLOWED | Ошибка возвращается в нескольких случаях:
- Неверный порядок параметров
- Нет прав доступа к задаче
- Нельзя удалить комментарий другого пользователя, если вы не администратор
- Указанной задачи или комментария не существует ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #0 (taskId) for method ctaskcommentitem::delete() expected to be of type "integer", but given something else.; 256/TE/WRONG_ARGUMENTS | Указан неверный тип значения для параметра, например, для `TASKID` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./task-comment-item-add.md)
- [{#T}](./task-comment-item-update.md)
- [{#T}](./task-comment-item-get.md)
- [{#T}](./task-comment-item-get-list.md)