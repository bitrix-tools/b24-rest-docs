# Получить данные о задаче task.item.getdata

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает массив данных о задаче (`TITLE`, `DESCRIPTION` и так далее). Доступны следующие [поля](./index.md).

{% note warning %}

Метод устарел и не поддерживается. Рекомендуется использовать методы [tasks.task.*](../../index.md).

{% endnote %}

## Параметры метода

#|
|| **Название** | **Описание** ||
|| **TASKID** | Идентификатор задачи ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":2}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.item.getdata
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":2,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.item.getdata
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.item.getdata',
    		[2]
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
                'task.item.getdata',
                [2]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result->data(), true);
        echo 'Full Result: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting task data: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.item.getdata',
        [2],
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
        'task.item.getdata',
        [
            'TASKID' => 2
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}
