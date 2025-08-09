# Удалить элемент хранилища entity.item.delete

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`entity`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `entity.item.delete` удаляет элемент хранилища. Пользователь должен обладать хотя бы правами на запись (**W**) в хранилище.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **ENTITY^*^**
[`string`](../../data-types.md) | Обязательный. Строковый идентификатор хранилища. ||
|| **ID^*^**
[`integer`](../../data-types.md) | Обязательный. Идентификатор элемента. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.item.delete',
    		{
    			ENTITY: 'menu_new',
    			ID: 842
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
                'entity.item.delete',
                [
                    'ENTITY' => 'menu_new',
                    'ID'     => 842
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting entity item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.item.delete',
        {
            ENTITY: 'menu_new',
            ID: 842
        }
    );
    ```

- HTTP

    ```http
    https://my.bitrix24.ru/rest/entity.item.delete.json?ENTITY=menu_new&ID=842&auth=340bf57f35ee95e0debf98399632999c
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK
```json
{"result":true}
```