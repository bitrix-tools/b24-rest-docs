# Получить описание полей папки disk.folder.getfields

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

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

Метод `disk.folder.getfields` возвращает описание полей папки.

- `TYPE` — тип поля;
- `USE_IN_FILTER` — возможность использовать поле при фильтрации выборки;
- `USE_IN_SHOW` — доступно ли это поле при получении ответа.

## Параметры

Без параметров.

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"disk.folder.getfields",
    		{}
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
                'disk.folder.getfields',
                []
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
        echo 'Error getting folder fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.folder.getfields",
        {},
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
    "ID": {
        "TYPE": "integer",
        "USE_IN_FILTER": true,
        "USE_IN_SHOW": true
    },
    "NAME": {
        "TYPE": "string",
        "USE_IN_FILTER": true,
        "USE_IN_SHOW": true
    },
    "TYPE": {
        "TYPE": "enum",
        "USE_IN_FILTER": true,
        "USE_IN_SHOW": true
    },
    "CODE": {
        "TYPE": "string",
        "USE_IN_FILTER": true,
        "USE_IN_SHOW": true
    },
    "STORAGE_ID": {
        "TYPE": "integer",
        "USE_IN_FILTER": true,
        "USE_IN_SHOW": true
    },
    "REAL_OBJECT_ID": {
        "TYPE": "integer",
        "USE_IN_FILTER": false,
        "USE_IN_SHOW": true
    },
    "PARENT_ID": {
        "TYPE": "integer",
        "USE_IN_FILTER": true,
        "USE_IN_SHOW": true
    },
    "CREATE_TIME": {
        "TYPE": "datetime",
        "USE_IN_FILTER": true,
        "USE_IN_SHOW": true
    },
    "UPDATE_TIME": {
        "TYPE": "datetime",
        "USE_IN_FILTER": true,
        "USE_IN_SHOW": true
    },
    "DELETE_TIME": {
        "TYPE": "datetime",
        "USE_IN_FILTER": true,
        "USE_IN_SHOW": true
    },
    "CREATED_BY": {
        "TYPE": "integer",
        "USE_IN_FILTER": false,
        "USE_IN_SHOW": true
    },
    "UPDATED_BY": {
        "TYPE": "integer",
        "USE_IN_FILTER": false,
        "USE_IN_SHOW": true
    },
    "DELETED_BY": {
        "TYPE": "integer",
        "USE_IN_FILTER": false,
        "USE_IN_SHOW": true
    },
    "DELETED_TYPE": {
        "TYPE": "enum",
        "USE_IN_FILTER": true,
        "USE_IN_SHOW": true
    }
}
```