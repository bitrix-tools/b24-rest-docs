# Создать папку в корне хранилища disk.storage.addfolder

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- не хватает подробного описания параметра data
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

Метод `disk.storage.addfolder` создает папку в корне хранилища.

## Параметры

#|
||  **Параметр** / **Тип**| **Описание** ||
|| **id**
[`unknown`](../../data-types.md) | Идентификатор хранилища. ||
|| **data**
[`unknown`](../../data-types.md) | Массив, описывающий папку. Обязательное поле `NAME` — имя новой папки. ||
|#

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"disk.storage.addfolder",
    		{
    			id: 4,
    			data: {'NAME': 'New'}
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
                'disk.storage.addfolder',
                [
                    'id'   => 4,
                    'data' => ['NAME' => 'New'],
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
        echo 'Error adding folder: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.storage.addfolder",
        {
            id: 4,
            data: {'NAME': 'New'}
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

Возвращаемая структура аналогична приведенной в [disk.folder.get](../folder/disk-folder-get.md).

```json
"result":{
    "ID": "13",
    "NAME": "New",
    "CODE": null,
    "STORAGE_ID": "4",
    "TYPE": "folder",
    "PARENT_ID": "8",
    "DELETED_TYPE": "0",
    "CREATE_TIME": "2015-04-24T12:39:35+03:00",
    "UPDATE_TIME": "2015-04-24T12:39:35+03:00",
    "DELETE_TIME": null,
    "CREATED_BY": "1",
    "UPDATED_BY": "1",
    "DELETED_BY": "0",
    "DETAIL_URL": "https://test.bitrix24.ru/workgroups/group/3/disk/path/New/"
}
```