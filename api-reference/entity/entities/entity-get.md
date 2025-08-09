# Получить параметры хранилища или список всех хранилищ entity.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`entity`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `entity.get` получает параметры хранилища или список всех хранилищ приложения.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **ENTITY**
[`string`](../../data-types.md) | Строковой идентификатор требуемого хранилища. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod('entity.get');
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
                'entity.get',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling entity.get: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod('entity.get');
    ```

- HTTP

    ```http
    https://my.bitrix24.ru/rest/entity.get.json?auth=59efe32d01c0e9dc5732e8dfa68a4baa
    ```

{% endlist %}

Пример корректного получения списка всех доступных хранилищ:

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.get',
    		{}
    	);
    	
    	const result = response.getData().result;
    	console.info('Список созданных хранилищ:', result);
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
                'entity.get',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Список созданных хранилищ: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling entity.get: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        "entity.get",
        {},
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.info("Список созданных хранилищ:", result.data());
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK
```json
{"result":
    [
        {
            "ENTITY":"dish",
            "NAME":"Dishes"
        },
        {
            "ENTITY":"menu",
            "NAME":"Menu"
        }
    ]
}
```

