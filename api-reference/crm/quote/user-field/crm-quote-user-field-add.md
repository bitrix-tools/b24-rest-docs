# Создать пользовательское поле для предложений crm.quote.userfield.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.quote.userfield.add` создаёт новое пользовательское поле для предложений.

Системное ограничение на название поля - 20 знаков. К названию пользовательского поля всегда добавляется префикс `UF_CRM_`, то есть реальная длина названия - 13 знаков.

#|
||  **Параметр** / **Тип**| **Описание** ||
|| **fields**
[`unknown`](../../../data-types.md) | Набор полей - массив вида `array("поле"=>"значение"[, ...])`, содержащий описание пользовательского поля. Полное описание полей можно получить вызовом метода [crm.userfield.fields](../../universal/user-defined-fields/crm-userfield-fields.md). 
||
|#

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.quote.userfield.add',
    		{
    			fields:
    			{
    				"FIELD_NAME": "MY_STRING",
    				"EDIT_FORM_LABEL": "Моя строка",
    				"LIST_COLUMN_LABEL": "Моя строка",
    				"USER_TYPE_ID": "string",
    				"XML_ID": "MY_STRING",
    				"SETTINGS": { "DEFAULT_VALUE": "Привет, мир!" }
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    		console.error(result.error());
    	else
    		console.dir(result);
    }
    catch(error)
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
                'crm.quote.userfield.add',
                [
                    'fields' => [
                        'FIELD_NAME'       => 'MY_STRING',
                        'EDIT_FORM_LABEL'  => 'Моя строка',
                        'LIST_COLUMN_LABEL' => 'Моя строка',
                        'USER_TYPE_ID'     => 'string',
                        'XML_ID'           => 'MY_STRING',
                        'SETTINGS'         => ['DEFAULT_VALUE' => 'Привет, мир!'],
                    ],
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
        echo 'Error adding user field: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.quote.userfield.add",
        {
            fields:
            {
                "FIELD_NAME": "MY_STRING",
                "EDIT_FORM_LABEL": "Моя строка",
                "LIST_COLUMN_LABEL": "Моя строка",
                "USER_TYPE_ID": "string",
                "XML_ID": "MY_STRING",
                "SETTINGS": { "DEFAULT_VALUE": "Привет, мир!" }
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}