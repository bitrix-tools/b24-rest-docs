# Изменить пользовательское поле предложений crm.quote.userfield.update

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

Метод `crm.quote.userfield.update` обновляет существующее пользовательское поле предложений.

#|
||  **Параметр** / **Тип**| **Описание** ||
|| **id**
[`unknown`](../../../data-types.md) | Идентификатор пользовательского поля. ||
|| **fields**
[`unknown`](../../../data-types.md) | Набор полей - массив вида `array("обновляемое поле"=>"значение"[, ...])`, где "обновляемое поле" может принимать значения из возвращаемых методом [crm.userfield.fields](../../universal/user-defined-fields/crm-userfield-fields.md).
||
|#

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const id = prompt("Введите ID");
    	const label = prompt("Введите новое название");
    
    	const response = await $b24.callMethod(
    		"crm.quote.userfield.update",
    		{
    			id: id,
    			fields:
    			{
    				"EDIT_FORM_LABEL": label,
    				"LIST_COLUMN_LABEL": label
    			}
    		}
    	);
    
    	const result = response.getData().result;
    	console.dir(result);
    	if(response.more())
    		response.next();
    }
    catch(error)
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    $id = readline("Введите ID");
    $label = readline("Введите новое название");
    
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.quote.userfield.update',
                [
                    'id' => $id,
                    'fields' => [
                        'EDIT_FORM_LABEL'   => $label,
                        'LIST_COLUMN_LABEL' => $label
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
        if ($response->getResponseData()->more()) {
            $response->getResponseData()->next();
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating user field: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var id = prompt("Введите ID");
    var label = prompt("Введите новое название");
    BX24.callMethod(
        "crm.quote.userfield.update",
        {
            id: id,
            fields:
            {
                "EDIT_FORM_LABEL": label,
                "LIST_COLUMN_LABEL": label
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.dir(result.data());
                if(result.more())
                    result.next();
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}