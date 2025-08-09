# Создать новый комментарий в таймлайне rpa.comment.add

> Scope: [`rpa`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод создает новый комментарий в таймлайне элемента с идентификатором `itemId` процесса с идентификатором `typeId`.

#|
|| **Название**
`тип` | **Описание** ||
|| **typeId** 
[`integer`](../../../data-types.md) | Идентификатор процесса ||
|| **itemId** 
[`integer`](../../../data-types.md) | Идентификатор элемента ||
|| **fields** 
[`object`](../../../data-types.md) | Объект, описывающий [поля](#fields) комментария ||
|#

## Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **description** 
[`string`](../../../data-types.md) | Описание записи. Можно использовать HTML и BB-code форматирование ||
|| **files** 
[`array`](../../../data-types.md) | Массив прикрепленных файлов. Каждый элемент — это массив с именем и содержимым, закодированным в base64  ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'rpa.comment.add',
    		{
    			"typeId": 24,
    			"itemId": 10,
    			"fields": {
    				"description": "Упоминание пользователя с ид 1 ",
    				"files": [
    					[
    						"document.pdf", "...base64_decoded_content..."
    					]
    				]    
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log('response', result.answer);
    	if(result.error())
    		alert("Error: " + result.error());
    	else
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
                'rpa.comment.add',
                [
                    'typeId' => 24,
                    'itemId' => 10,
                    'fields' => [
                        'description' => 'Упоминание пользователя с ид 1',
                        'files'      => [
                            [
                                'document.pdf', '...base64_decoded_content...'
                            ]
                        ]
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        echo 'response: ' . $result['answer'];
    
        if ($result['error']) {
            echo 'Error: ' . $result['error'];
        } else {
            echo 'Data: ' . print_r($result['data'], true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding comment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'rpa.comment.add',
        {
            "typeId": 24,
            "itemId": 10,
            "fields": {
                "description": "Упоминание пользователя с ид 1 ",
                "files": [
                    [
                        "document.pdf", "...base64_decoded_content..."
                    ]
                ]    
            }
        },
        function(result) {
            console.log('response', result.answer);
            if(result.error())
                alert("Error: " + result.error());
            else
            console.log(result.data());
        }
    )
    ```

{% endlist %}


## Обработка ответа

HTTP-статус: **200**

```json
{
    "comment": {
        "id": 350,
        "createdTime": "2020-03-27T16:00:59+02:00",
        "isFixed": false,
        "typeId": 24,
        "itemId": 10,
        "action": "comment",
        "description": "Упоминание пользователя с ид 1 ",
        "userId": 1,
        "title": "Комментарий",
        "data": {
            "files": [
                15
            ]
        },
        "createdTimestamp": 1585317659000,
        "htmlDescription": "Упоминание пользователя с ид 1 <a class=\"blog-p-user-name\" id=\"bp_K6r6vvp7\" href=\"/company/personal/user/1/\" bx-tooltip-user-id=\"1\">Anton Gorbylev</a> ",
        "textDescription": "Упоминание пользователя с ид 1 Anton",
        "users": {
            "1": {
                "id": "1",
                "name": "Anton",
                "secondName": "",
                "lastName": "",
                "title": null,
                "workPosition": "",
                "fullName": "Anton",
                "link": "/company/personal/user/1/"
            }
        }
    }
}
```

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./rpa-comment-update.md)
- [{#T}](./rpa-comment-delete.md)