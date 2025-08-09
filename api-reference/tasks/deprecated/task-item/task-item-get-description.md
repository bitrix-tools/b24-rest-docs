# Получить описание задачи task.item.getdescription

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает описание задачи.

{% note warning %}

Метод устарел и не поддерживается. Рекомендуется использовать методы [tasks.task.*](../../index.md).

{% endnote %}

## Параметры метода

#|
|| **Название** | **Описание** ||
|| **TASKID** | Идентификатор задачи ||
|| **FORMAT** | Допустимые значения:
- `1` (соответствует PHP-константе `CTaskItem::DESCR_FORMAT_RAW`) — описание будет возвращено в том формате, в котором хранится в БД (HTML либо BB-code), обработка санитайзером производиться не будет
- `2` (соответствует PHP-константе `CTaskItem::DESCR_FORMAT_HTML`) — описание будет возвращено в формате HTML, предварительно будет обработано санитайзером (если это включено в настройках модуля задач)
- `3` (соответствует PHP-константе `CTaskItem::DESCR_FORMAT_PLAIN_TEXT`) — описание будет возвращено в виде «плоского» текста (без HTML-тегов) ||
|#

Соблюдение порядка следования параметров в запросе обязательно. При его нарушении запрос будет выполнен с ошибками.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":13,"USERID":1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.item.getdescription
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":13,"USERID":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.item.getdescription
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.item.getdescription',
    		[13, 1]
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
                'task.item.getdescription',
                [13, 1]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting task description: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.item.getdescription',
        [13, 1],
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
        'task.item.getdescription',
        [
            'TASKID' => 13,
            'USERID' => 1
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}
