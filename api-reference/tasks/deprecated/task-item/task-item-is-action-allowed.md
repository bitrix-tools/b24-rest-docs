# Проверить, разрешено ли действие task.item.isactionallowed

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает `true` в случае, если действие разрешено. В противном случае вернется `false`.

{% note warning %}

Метод устарел и не поддерживается. Рекомендуется использовать методы [tasks.task.*](../../index.md).

{% endnote %}

## Параметры метода

#|
|| **Название** | **Описание** ||
|| **TASKID** | Идентификатор задачи ||
|| **ACTIONID** | Идентификатор проверяемого действия (смотрите константы метода [task.item.getallowedactions](./task-item-get-allowed-actions.md)) ||
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
    -d '{"TASKID":13,"ACTION":6}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.item.isactionallowed
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":13,"ACTION":6,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.item.isactionallowed
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.item.isactionallowed',
    		[13, 6]
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
                'task.item.isactionallowed',
                [13, 6]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error checking if action is allowed: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.item.isactionallowed',
        [13, 6],
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
        'task.item.isactionallowed',
        [
            'TASKID' => 13,
            'ACTION' => 6
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}