# Добавить комментарий к задаче task.comment.add

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод добавляет комментарии к задаче.

{% note warning %}

Вместо данного метода следует использовать методы [`task.commentitem.*`](../comment-item/index.md).

{% endnote %}

## Параметры метода

#|
|| **Название** | **Описание** ||
|| **TASKID** | Идентификатор задачи ||
|| **COMMENTTEXT** | Комментарий ||
|#

Соблюдение порядка следования параметров в запросе обязательно. При его нарушении запрос будет выполнен с ошибками.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":1,"FIELDS":{"POST_MESSAGE":"текст комментария"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.comment.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":1,"FIELDS":{"POST_MESSAGE":"текст комментария"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.comment.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.comment.add',
    		[1, 'текст комментария']
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
                'task.comment.add',
                [
                    1,
                    'текст комментария',
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
        'task.comment.add',
        [1, 'текст комментария'],
        function(result)
        {
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'task.comment.add',
        [
            'TASKID' => 1,
            'FIELDS' => [
                'POST_MESSAGE' => 'текст комментария'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}
