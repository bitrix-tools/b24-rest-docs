# Обновить комментарий task.commentitem.update

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `task.commentitem.update` обновляет комментарий.

{% note warning "Развитие метода остановлено с версии модуля `tasks 25.700.0` " %}

Метод `task.commentitem.update` не работает в [новой карточке задач](../tasks-new.md), используйте метод [im.message.update](../../chats/messages/im-message-update.md) для работы с чатом задач.

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
|| **UF_FORUM_MESSAGE_DOC**
[`array`](../../data-types.md) | Массив с идентификаторами файлов с Диска. Перед каждым идентификатором укажите префикс `n`, например, `['n123', 'n456', ... ]`.

У автора комментария должен быть доступ к прикрепляемым файлам, иначе метод вернет ошибку.

{% note info "" %}

Поле перезаписывается полностью. Чтобы добавить файл к уже загруженным, передайте в массиве идентификаторы всех файлов — как старых, так и новых

{% endnote %}
||

|#

## Примеры кода

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":8017,"ITEMID":3167,"FIELDS":{"POST_MESSAGE":"Комментарий обновлен","UF_FORUM_MESSAGE_DOC":["n4755"]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.comm

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":8017,"ITEMID":3167,"FIELDS":{"POST_MESSAGE":"Комментарий обновлен","UF_FORUM_MESSAGE_DOC":["n4755"]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.commentitem.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.commentitem.update',
    		{
    			"TASKID": 8017,
    			"ITEMID": 3167,
    			"FIELDS": {
    				"POST_MESSAGE": "Комментарий обновлен",
    				"UF_FORUM_MESSAGE_DOC": ["n4755"]
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
                'task.commentitem.update',
                [
                    'TASKID' => 8017,
                    'ITEMID' => 3167,
                    'FIELDS' => [
                        'POST_MESSAGE'         => 'Комментарий обновлен',
                        'UF_FORUM_MESSAGE_DOC' => ['n4755'],
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
        echo 'Error updating task comment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.commentitem.update',
        {
            "TASKID": 8017,
            "ITEMID": 3167,
            "FIELDS": {
                "POST_MESSAGE": "Комментарий обновлен",
                "UF_FORUM_MESSAGE_DOC": ["n4755"]
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
        'task.commentitem.update',
        [
            'TASKID' => 8017,
            'ITEMID' => 3167,
            'FIELDS' => [
                'POST_MESSAGE' => 'Комментарий обновлен',
                'UF_FORUM_MESSAGE_DOC' => ['n4755']
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
    "result": true,
    "time": {
        "start": 1753338761.030934,
        "finish": 1753338761.389114,
        "duration": 0.35817980766296387,
        "processing": 0.16595101356506348,
        "date_start": "2025-07-24T09:32:41+03:00",
        "date_finish": "2025-07-24T09:32:41+03:00",
        "operating_reset_at": 1753339361,
        "operating": 0.16593098640441895
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true` если комментарий обновлен успешно ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_CODE",
    "error_description":"Не указан текст комментария.<br>"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_CORE` | Не указан текст комментария. | Обязательный параметр `POST_MESSAGE` не передан или пустой ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#4; Action is not allowed; 4/TE/ACTION_NOT_ALLOWED | Ошибка возвращается в следующих случаях:
- Указан неверный порядок параметров в методе
- Нет прав доступа к задаче
- При попытке обновить комментарий другого пользователя
- Если указанной задачи или комментария не существует ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #0 (taskId) for method ctaskcommentitem::delete() expected to be of type "integer", but given something else.; 256/TE/WRONG_ARGUMENTS | Ошибка возвращается в следующих случаях:
- Не указан обязательный параметр, например, `TASKID`
- Указан неверный тип значения для параметра, например, для `TASKID` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./task-comment-item-add.md)
- [{#T}](./task-comment-item-get.md)
- [{#T}](./task-comment-item-get-list.md)
- [{#T}](./task-comment-item-delete.md)