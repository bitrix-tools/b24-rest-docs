# Загрузить файл к задаче task.item.addfile

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод загружает файл к задаче. Пока реализована загрузка файла через `post` с передачей содержимого файла в параметре `CONTENT`.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **TASK_ID** | Идентификатор задачи ||
|| **NAME**
[`string`](../../../data-types.md) | Имя файла ||
|| **CONTENT** | Содержимое файла в формате `base64` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASK_ID":"140","FILE":{"NAME":"desc.txt","CONTENT":"BASE64_ENCODED_CONTENT_OF_DESC.TXT"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.item.addfile
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASK_ID":"140","FILE":{"NAME":"desc.txt","CONTENT":"BASE64_ENCODED_CONTENT_OF_DESC.TXT"},"auth":"z3eamwwkpgl7u18kx14q1s4c0ffckqsn"}' \
    https://**put_your_bitrix24_address**/rest/task.item.addfile
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"task.item.addfile",
    		{
    			TASK_ID: "140",
    			FILE: {
    				NAME: "desc.txt",
    				CONTENT: "BASE64_ENCODED_CONTENT_OF_DESC.TXT"
    			}
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
                'task.item.addfile',
                [
                    'TASK_ID' => '140',
                    'FILE'    => [
                        'NAME'    => 'desc.txt',
                        'CONTENT' => 'BASE64_ENCODED_CONTENT_OF_DESC.TXT',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding file to task: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "task.item.addfile",
        {
            TASK_ID: "140",
            FILE: {
                NAME: "desc.txt",
                CONTENT: "BASE64_ENCODED_CONTENT_OF_DESC.TXT"
            }
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
        'task.item.addfile',
        [
            'TASK_ID' => "140",
            'FILE' => [
                'NAME' => 'desc.txt',
                'CONTENT' => base64_encode(file_get_contents($_SERVER['DOCUMENT_ROOT'] .'/desc.txt'))
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

