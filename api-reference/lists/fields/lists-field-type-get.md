# Получить доступные типы полей для списка lists.field.type.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`lists`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `lists.field.type.get` позволяет получить список доступных типов полей для указанного списка. В случае успеха будет возвращен список доступных типов полей, иначе пустой массив.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **IBLOCK_TYPE_ID**^*^
[`unknown`](../../data-types.md) | `id` типа инфоблока (обязательно):
- **lists** - тип инфоблока списка
- **bitrix_processes** - тип инфоблока процессов
- **lists_socnet** - тип инфоблока списков групп ||
|| **IBLOCK_CODE/IBLOCK_ID**^*^
[`unknown`](../../data-types.md) | код или `id` инфоблока (обязательно) ||
|| **SOCNET_GROUP_ID**^*^
[`unknown`](../../data-types.md) | `id` группы (обязательно, если список создается для группы) ||
|| **FIELD_ID**
[`unknown`](../../data-types.md) | `ID` поля (Если поле свойство инфоблока, то формат: `PROPERTY_propertyId`. Если указан, то возвращает доступные типы, с типом указанного поля) ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'lists.field.type.get',
    		params
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    	{
    		alert("getFieldTypes: " + result.error());
    	}
    	else
    	{
    		var types = result.data(), html = '';
    		for(var typeId in types)
    		{
    			if(!types.hasOwnProperty(typeId)) continue;
    			html += ''+types[typeId]+'';
    		}
    		$('#field-type').html(html);
    	}
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $params = [
            'IBLOCK_TYPE_ID' => 'lists_socnet',
            'IBLOCK_CODE'    => 'rest_1',
        ];
    
        if (!empty($params['IBLOCK_CODE']) || !empty($params['IBLOCK_ID'])) {
            $response = $b24Service
                ->core
                ->call(
                    'lists.field.type.get',
                    $params
                );
    
            $result = $response
                ->getResponseData()
                ->getResult();
    
            $html = '';
            foreach ($result as $typeId => $type) {
                $html .= '' . $type . '';
            }
    
            echo 'Success: ' . $html;
            $('#field-type').html($html);
        }
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting field types: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var params = {
        'IBLOCK_TYPE_ID': 'lists_socnet',
        'IBLOCK_CODE': 'rest_1'
    };
    if(!params.IBLOCK_CODE && !params.IBLOCK_ID)
        return;
    BX24.callMethod(
        'lists.field.type.get',
        params,
        function(result)
        {
            if(result.error())
            {
                alert("getFieldTypes: " + result.error());
            }
            else
            {
                var types = result.data(), html = '';
                for(var typeId in types)
                {
                    if(!types.hasOwnProperty(typeId)) continue;
                        html += ''+types[typeId]+'';
                }
                $('#field-type').html(html);
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}