# Переименовать хранилище disk.storage.rename

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `disk.storage.rename` переименовывает хранилище. Допустимо переименование только хранилища приложения (см. [disk.storage.getforapp](./disk-storage-get-for-app.md)).

## Параметры

#|
||  **Параметр** / **Тип**| **Описание** ||
|| **id**
[`unknown`](../../data-types.md) | Идентификатор хранилища. ||
|| **newName**
[`unknown`](../../data-types.md) | Новое имя. ||
|#

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"disk.storage.rename",
    		{
    			id: 2,
    			newName: 'New name for storage'
    		}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'disk.storage.rename',
                [
                    'id'     => 2,
                    'newName' => 'New name for storage',
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
        echo 'Error renaming storage: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.storage.rename",
        {
            id: 2,
            newName: 'New name for storage'
        },
        function (result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK

```json
"result": {
    "ID": "2", //идентификатор
    "NAME": "Маркетинг и реклама", //название
    "CODE": null, //символьный код
    "MODULE_ID": "disk",
    "ENTITY_TYPE": "group", //тип сущности (см. disk.storage.gettypes)
    "ENTITY_ID": "1", //идентификатор сущности
    "ROOT_OBJECT_ID": "2" //идентификатор корневой папки
}
```