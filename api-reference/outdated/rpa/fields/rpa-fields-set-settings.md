# Установить полный набора настроек видимости полей rpa.fields.setSettings

> Scope: [`rpa`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод устанавливает полный набор настроек видимости полей на стадии с идентификатором `stageId` процесса с идентификатором `typeId`.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **typeId*** 
[`number`](../../../data-types.md) | Идентификатор процесса ||
|| **stageId** 
[`number`](../../../data-types.md) | Идентификатор стадии.

По умолчанию имеет значение `0`, то есть — общие настройки ||
|| **fields*** 
[`object`](../../../data-types.md) | Массив с настройками видимости полей.

Если передать пустой `fields` — все настройки будут стерты ||
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
    			"typeId": 1,
    			"fields": {
    				"kanban": [
    					"createdBy",
    					"UF_RPA_1_NAME"
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
                    'typeId' => 1,
                    'fields' => [
                        'kanban' => [
                            'createdBy',
                            'UF_RPA_1_NAME'
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
            "typeId": 1,
            "fields": {
                "kanban": [
                    "createdBy",
                    "UF_RPA_1_NAME"
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

Метод вернет результат аналогичный запросу [rpa.fields.getSettings](./rpa-fields-get-settings.md).

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./rpa-fields-get-settings.md)
- [{#T}](./rpa-fields-set-visibility-settings.md)