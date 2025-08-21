# Получить параметры папки по идентификатору disk.folder.get

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

Метод `disk.folder.get` возвращает папку по идентификатору.

## Параметры

#|
||  **Параметр** / **Тип**| **Описание** ||
|| **id**
[`unknown`](../../data-types.md) | Идентификатор папки. ||
|#

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"disk.folder.get",
    		{
    			id: 8
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
                'disk.folder.get',
                [
                    'id' => 8,
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
        echo 'Error getting folder: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.folder.get",
        {
            id: 8
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
    "ID": "8", //идентификатор
    "NAME": "newfolder", //название папки
    "CODE": null, //символьный код
    "STORAGE_ID": "4", //идентификатор хранилища
    "TYPE": "folder",
    "PARENT_ID": "12", //идентификатор родительской папки
    "DELETED_TYPE": "0", //маркер удаления
    "CREATE_TIME": "2015-04-24T10:41:51+03:00", //время создания
    "UPDATE_TIME": "2015-04-24T15:52:43+03:00", //время изменения
    "DELETE_TIME": null, //время перемещения в корзину
    "CREATED_BY": "1", //идентификатор пользователя, который создал файл
    "UPDATED_BY": "1", //идентификатор пользователя, который изменил файл
    "DELETED_BY": "0", //идентификатор пользователя, который переместил в корзину файл
    "DETAIL_URL": "https://test.bitrix24.ru/workgroups/group/3/disk/path/newfolder" //ссылка на просмотр списка файлов папки
}
```