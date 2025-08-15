# Удалить раздел хранилища entity.section.delete

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

Метод `entity.section.delete` удаляет раздел хранилища. Пользователь должен обладать хотя бы правами на запись (**W**) в хранилище.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **ENTITY^*^**
[`string`](../../data-types.md) | Обязательный. Строковой идентификатор хранилища. ||
|| **ID**^*^
[`integer`](../../data-types.md) | Обязательный. Идентификатор удаляемого раздела. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.section.delete',
    		{
    			ENTITY: 'menu_new',
    			ID: 220
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
                'entity.section.delete',
                [
                    'ENTITY' => 'menu_new',
                    'ID'     => 220
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting entity section: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'entity.section.delete',
        {
            ENTITY: 'menu_new',
            ID: 220
        }
    );
    ```

- HTTP

    ```http
    https://my.bitrix24.ru/rest/entity.section.delete.json?ENTITY=menu_new&ID=220&auth=9affe382af74d9c5caa588e28096e872
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK
```json
{"result":true}
```