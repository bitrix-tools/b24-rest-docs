# Изменить запись таймлайна rpa.comment.update

> Scope: [`rpa`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод обновляет запись таймлайна с идентификатором `id`. Он обновляет только поля `title` и `description`.

Метод позволяет изменить только те комментарии, которые были добавлены этим же пользователем.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **id** 
[`integer`](../../../data-types.md) | Идентификатор комментария ||
|| **fields** 
[`object`](../../../data-types.md) | Объект, описывающий [поля](#fields) комментария ||
|#

## Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **description** 
[`integer`](../../../data-types.md) | Описание записи. Можно использовать HTML и BB-code форматирование ||
|| **files** 
[`integer`](../../../data-types.md) | Массив прикрепленных файлов. Каждый элемент — это массив с именем и содержимым, закодированным в base64

Чтобы дописать новый файл, в качестве записи о старом файле необходимо передать список, где по ключу `id` будет идентификатор прикрепленного к этому комментарию файла.

Для загрузки новых надо также передать массив с именем и содержимым файла в base64. ||
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
    					{
    						"id": 15 // идентификатор старого файла
    					},
    					[
    						"another_document.pdf", "...base64_decoded_content..."
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
                                'id' => 15 // идентификатор старого файла
                            ],
                            [
                                'another_document.pdf', '...base64_decoded_content...'
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
                    {
                        "id": 15 // идентификатор старого файла
                    },
                    [
                        "another_document.pdf", "...base64_decoded_content..."
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

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./rpa-comment-add.md)
- [{#T}](./rpa-comment-delete.md)