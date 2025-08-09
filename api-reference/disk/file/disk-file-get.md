# Получить параметры файла по идентификатору disk.file.get

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

Метод `disk.file.get` возвращает файл по идентификатору.

{% note warning %}

Ссылка на загрузку файла из параметра `DOWNLOAD_URL` содержит токен авторизации и предназначена для скачивания файла от имени приложения. Нельзя «раздавать» эту ссылку или использовать для публичных интерфейсов.

{% endnote %}

## Параметры

#|
||  **Параметр** / **Тип**| **Описание** ||
|| **id**
[`unknown`](../../data-types.md) | Идентификатор файла. ||
|#

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"disk.file.get",
    		{
    			id: 10
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.dir(result);
    	}
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
                'disk.file.get',
                [
                    'id' => 10
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
        echo 'Error getting file: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.file.get",
        {
            id: 10
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
    "ID": "10", //идентификатор
    "NAME": "2511.jpg", //название файла
    "CODE": null, //символьный код
    "STORAGE_ID": "4", //идентификатор хранилища
    "TYPE": "file",
    "PARENT_ID": "8", //идентификатор родительской папки
    "DELETED_TYPE": "0", //маркер удаления
    "CREATE_TIME": "2015-04-24T10:41:51+03:00", //время создания
    "UPDATE_TIME": "2015-04-24T15:52:43+03:00", //время изменения
    "DELETE_TIME": null, //время перемещения в корзину
    "CREATED_BY": "1", //идентификатор пользователя, который создал файл
    "UPDATED_BY": "1", //идентификатор пользователя, который изменил файл
    "DELETED_BY": "0", //идентификатор пользователя, который переместил в корзину файл
    "DOWNLOAD_URL": "https://test.bitrix24.ru/disk/downloadFile/10/?&ncc=1&filename=2511.jpg&auth=******",
//возвращает url для скачивания файла приложением
    "DETAIL_URL": "https://test.bitrix24.ru/workgroups/group/3/disk/file/2511.jpg"
//ссылка на страницу детальной информации о файле
}
```