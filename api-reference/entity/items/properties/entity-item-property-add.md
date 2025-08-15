# Добавить дополнительное свойство элементов хранилища entity.item.property.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`entity`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `entity.item.property.add` добавляет дополнительное свойство элементов хранилища. Пользователь должен обладать правами на управление (**Х**) хранилищем.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **ENTITY^*^**
[`string`](../../../data-types.md) | Обязательный. Строковый идентификатор хранилища. ||
|| **PROPERTY^*^**
[`string`](../../../data-types.md) | Обязательный. Строковый идентификатор свойства. ||
|| **NAME^*^**
[`string`](../../../data-types.md) | Обязательный. Наименование свойства. ||
|| **TYPE^*^**
[`unknown`](../../../data-types.md) | Обязательный. Тип свойства (**S** - строка, **N** - число, **F** - файл). ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.item.property.add',
    		{
    			ENTITY: 'menu_new',
    			PROPERTY: 'new_prop',
    			NAME: 'Новое свойство',
    			TYPE: 'S'
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log('Created element with ID:', result);
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
                'entity.item.property.add',
                [
                    'ENTITY'   => 'menu_new',
                    'PROPERTY' => 'new_prop',
                    'NAME'     => 'Новое свойство',
                    'TYPE'     => 'S',
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
        echo 'Error adding entity item property: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.item.property.add',
        {
            ENTITY: 'menu_new',
            PROPERTY: 'new_prop',
            NAME: 'Новое свойство',
            TYPE: 'S'
        }
    );
    ```

- HTTP

    ```http
    https://my.bitrix24.ru/rest/entity.item.property.add.json?ENTITY=menu_new&NAME=%D0%9D%D0%BE%D0%B2%D0%BE%D0%B5%20%D1%81%D0%B2%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%BE&PROPERTY=new_prop&TYPE=S&auth=e690b44d2b3827d2eb9d4dbe59406dbb
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK
```json
{"result":true}
```