# Получить список дополнительных свойств элементов хранилища entity.item.property.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`entity`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `entity.item.property.get` получает список дополнительных свойств элементов хранилища.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **ENTITY^*^**
[`string`](../../../data-types.md) | Обязательный. Строковый идентификатор хранилища. ||
|| **PROPERTY**
[`string`](../../../data-types.md) | Строковый идентификатор требуемого свойства. ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.item.property.get',
    		{
    			ENTITY: 'menu_new'
    		}
    	);
    	
    	const result = response.getData().result;
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
                'entity.item.property.get',
                [
                    'ENTITY' => 'menu_new',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting entity item properties: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.item.property.get',
        {
            ENTITY: 'menu_new'
        },
        function(r){
            console.log(r.data());
        }
    );
    ```

- HTTP

    ```http
    https://my.bitrix24.ru/rest/entity.item.property.get.json?ENTITY=menu_new&auth=340bf57f35ee95e0debf98399632999c
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK
```json
{
    "result":
    [
        {
            "PROPERTY":"test",
            "NAME":"Тестовое свойство",
            "TYPE":"S"
        },
        {
            "PROPERTY":"test1",
            "NAME":"Второе тестовое свойство",
            "TYPE":"N"
        },
        {
            "PROPERTY":"test_file",
            "NAME":"Файло",
            "TYPE":"F"
        }
    ]
}
```