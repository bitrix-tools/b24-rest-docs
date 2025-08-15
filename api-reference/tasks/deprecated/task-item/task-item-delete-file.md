# Удалить привязку файла к задаче task.item.deletefile

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод удаляет привязку файла к задаче.

## Параметры метода

#|
|| **Название** | **Описание** ||
|| **auth** | Токен авторизации ||
|| **TASK_ID** | Идентификатор задачи ||
|| **ATTACHMENT_ID** | Идентификатор прикрепленного файла ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASK_ID":3,"ATTACHMENT_ID":28}' \
    https://your-domain.ru/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.item.deletefile
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASK_ID":3,"ATTACHMENT_ID":28,"auth":"1iqeuq94vzfxu01bouws3voja2lsezfq"}' \
    https://your-domain.ru/rest/task.item.deletefile
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.item.deletefile',
    		{
    			TASK_ID: 3,
    			ATTACHMENT_ID: 28
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.item.deletefile',
                [
                    'TASK_ID'       => 3,
                    'ATTACHMENT_ID' => 28
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting file: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.item.deletefile',
        {
            TASK_ID: 3,
            ATTACHMENT_ID: 28
        },
        function(result) {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'task.item.deletefile',
        [
            'TASK_ID' => 3,
            'ATTACHMENT_ID' => 28
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}
