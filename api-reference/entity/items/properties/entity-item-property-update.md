# Изменить дополнительное свойство элементов хранилища entity.item.property.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`entity`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `entity.item.property.update` обновляет дополнительное свойство элементов хранилища. Пользователь должен обладать правами на управление (**Х**) хранилищем.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **ENTITY^*^**
[`string`](../../../data-types.md) | Обязательный. Строковый идентификатор хранилища. ||
|| **PROPERTY^*^**
[`string`](../../../data-types.md) | Обязательный. Строковый идентификатор свойства. ||
|| **PROPERTY_NEW**
[`string`](../../../data-types.md) | Новый строковый идентификатор свойства. ||
|| **NAME**
[`string`](../../../data-types.md) | Наименование свойства. ||
|| **TYPE**
[`unknown`](../../../data-types.md) | Тип свойства (**S** - строка, **N** - число, **F** - файл). ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.item.property.update',
    		{
    			ENTITY: 'menu_new',
    			PROPERTY: 'new_prop',
    			NAME: 'Уже не новое свойство'
    		}
    	);
    	
    	const result = response.getData().result;
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
                'entity.item.property.update',
                [
                    'ENTITY'   => 'menu_new',
                    'PROPERTY' => 'new_prop',
                    'NAME'     => 'Уже не новое свойство'
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating entity item property: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.item.property.update',
        {
            ENTITY: 'menu_new',
            PROPERTY: 'new_prop',
            NAME: 'Уже не новое свойство'
        }
    );
    ```

- HTTP

    ```http
    https://my.bitrix24.ru/rest/entity.item.property.update.json?ENTITY=menu_new&NAME=%D0%A3%D0%B6%D0%B5%20%D0%BD%D0%B5%20%D0%BD%D0%BE%D0%B2%D0%BE%D0%B5%20%D1%81%D0%B2%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%BE&PROPERTY=new_prop&auth=ad5a6f34f14f644136830eb8a936f07f
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK
```json
{"result":true}
```