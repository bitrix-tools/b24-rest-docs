# Получить данные о полях списка lists.field.get

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

Метод `lists.field.get` позволяет получить данные о поле или полях списка. В случае успеха будет возвращен список полей с данными, иначе пустой массив.

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
[`unknown`](../../data-types.md) | `ID` поля (Если поле свойство инфоблока, то формат: "PROPERTY_propertyId". Если не указан, в ответе будут данные по всем полям указанного списка) ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'lists.field.get',
    		{
    			'IBLOCK_TYPE_ID': 'lists_socnet',
    			'IBLOCK_CODE': 'rest_1'
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	alert("Error: " + error);
    }
    ```

- PHP


    ```php
    try {
        $params = [
            'IBLOCK_TYPE_ID' => 'lists_socnet',
            'IBLOCK_CODE'    => 'rest_1',
        ];
    
        $response = $b24Service
            ->core
            ->call(
                'lists.field.get',
                $params
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling lists.field.get: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var params = {
        'IBLOCK_TYPE_ID': 'lists_socnet',
        'IBLOCK_CODE': 'rest_1'
    };
    BX24.callMethod(
        'lists.field.get',
        params,
        function(result)
        {
            if(result.error())
                alert("Error: " + result.error());
            else
                console.log(result.data());
        }
    );
    ```

{% endlist %}



{% include [Сноска о примерах](../../../_includes/examples.md) %}