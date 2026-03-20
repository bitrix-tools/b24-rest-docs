# Получить комментарий по идентификатору task.commentitem.get

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом доступа на чтение задачи или выше

Метод `task.commentitem.get` получает комментарий по идентификатору.

{% note warning "Развитие метода остановлено с версии модуля `tasks 25.700.0` " %}

Метод `task.commentitem.get` не работает в [новой карточке задач](../tasks-new.md), используйте метод [im.dialog.messages.get](../../chats/messages/im-dialog-messages-get.md) для работы с чатом задач.

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
    -d '{"TASKID":8017,"ITEMID":3157}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.commentitem.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":8017,"ITEMID":3157,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.commentitem.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.commentitem.get',
    		{
    			"TASKID": 8017,
    			"ITEMID": 3157
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
                'task.commentitem.get',
                [
                    'TASKID' => 8017,
                    'ITEMID' => 3157
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
        echo 'Error getting task comments: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.commentitem.get',
        {
            "TASKID": 8017,
            "ITEMID": 3157
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
        'task.commentitem.get',
        [
            'TASKID' => 8017,
            'ITEMID' => 3157
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
        "POST_MESSAGE_HTML": null,
        "ID": "3157",
        "AUTHOR_ID": "503",
        "AUTHOR_NAME": "Иван Иванов",
        "AUTHOR_EMAIL": "",
        "POST_DATE": "2025-07-15T14:30:00+03:00",
        "POST_MESSAGE": "Текст нового комментария к задаче",
        "ATTACHED_OBJECTS": {
            "973": {
                "ATTACHMENT_ID": "973",
                "NAME": "photo1.png",
                "SIZE": "1495700",
                "FILE_ID": "4755",
                "DOWNLOAD_URL": "/bitrix/tools/disk/uf.php?attachedId=973&auth%5Bauth%5D=3edf7ca92&action=download&ncc=1",
                "VIEW_URL": "/bitrix/tools/disk/uf.php?attachedId=973&auth%5Bauth%5D=3edf7ca92&action=show&ncc=1"
            },
            "975": {
                "ATTACHMENT_ID": "975",
                "NAME": "photo2.png",
                "SIZE": "1017053",
                "FILE_ID": "4753",
                "DOWNLOAD_URL": "/bitrix/tools/disk/uf.php?attachedId=975&auth%5Bauth%5D=3edf7ca92&action=download&ncc=1",
                "VIEW_URL": "/bitrix/tools/disk/uf.php?attachedId=975&auth%5Bauth%5D=3edf7ca92&action=show&ncc=1"
            }
        }
    },
    "time": {
        "start": 1753274863.280788,
        "finish": 1753274863.362892,
        "duration": 0.08210396766662598,
        "processing": 0.04009890556335449,
        "date_start": "2025-07-23T15:47:43+03:00",
        "date_finish": "2025-07-23T15:47:43+03:00",
        "operating_reset_at": 1753275463,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с описанием комментария ||
|| **POST_MESSAGE_HTML**
[`string`](../../data-types.md) | HTML-код комментария ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор комментария ||
|| **AUTHOR_ID**
[`string`](../../data-types.md) | Идентификатор автора комментария ||
|| **AUTHOR_NAME**
[`string`](../../data-types.md) | Имя автора комментария ||
|| **AUTHOR_EMAIL**
[`string`](../../data-types.md) | Email автора комментария ||
|| **POST_DATE**
[`string`](../../data-types.md) | Дата и время создания комментария ||
|| **POST_MESSAGE**
[`string`](../../data-types.md) | Текст комментария ||
|| **ATTACHED_OBJECTS**
[`object`](../../data-types.md) | Объект, содержащий информацию о вложениях. Ключ объекта — идентификатор вложения, а значение — объект с [описанием файла](#attached-objects) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект ATTACHED_OBJECTS {#attached-objects}

#|
|| **Название**
`тип` | **Описание** ||
|| **ATTACHMENT_ID**
[`string`](../../data-types.md) | Идентификатор вложения ||
|| **NAME**
[`string`](../../data-types.md) | Имя файла ||
|| **SIZE**
[`string`](../../data-types.md) | Размер файла в байтах ||
|| **FILE_ID**
[`string`](../../data-types.md) | Идентификатор файла на Диске ||
|| **DOWNLOAD_URL**
[`string`](../../data-types.md) | URL для скачивания файла ||
|| **VIEW_URL**
[`string`](../../data-types.md) | URL для просмотра файла ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_CODE",
    "error_description":"TASKS_ERROR_EXCEPTION_#512; Check listitem not found or not accessible; 512/TE/ITEM_NOT_FOUND_OR_NOT_ACCESSIBLE.<br>"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#512; Check listitem not found or not accessible; 512/TE/ITEM_NOT_FOUND_OR_NOT_ACCESSIBLE | Ошибка возвращается в следующих случаях:
- Указан неверный порядок параметров в методе
- Не найдена задача или комментарий с указанным идентификатором
- Нет прав доступа к задаче ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #0 (taskId) for method ctaskcommentitem::get() expected to be of type "integer", but given something else.; 256/TE/WRONG_ARGUMENTS | Указан неверный тип значения для параметра, например, для `TASKID` ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #1 (itemId) expected by method ctaskcommentitem::get(), but not given.; 256/TE/WRONG_ARGUMENTS | Не указан обязательный параметр, например, `ITEMID` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./task-comment-item-add.md)
- [{#T}](./task-comment-item-update.md)
- [{#T}](./task-comment-item-get-list.md)
- [{#T}](./task-comment-item-delete.md)
- [{#T}](../../../tutorials/tasks/how-to-create-comment-with-file.md)