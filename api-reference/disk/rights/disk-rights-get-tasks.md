# Получить список доступных уровней доступа disk.rights.getTasks

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `disk.rights.getTasks` позволяет получить список уровней доступов, которые можно использовать в назначении прав.
Возвращает доступные уровни доступа. 

## Параметры

#|
||  **Параметр** / **Тип**| **Описание** ||
|| **ID**
[`unknown`](../../data-types.md) | Идентификатор уровня доступа. ||
|| **NAME**
[`unknown`](../../data-types.md) |  Символьный код. ||
|| **TITLE**
[`unknown`](../../data-types.md) |  Название. ||
|| **START** | Порядковый номер элемента списка, начиная с которого необходимо возвращать следующие элементы при вызове текущего метода. Подробности в статье [{#T}](../../how-to-call-rest-api/list-methods-pecularities.md) ||
|#

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"disk.rights.getTasks",
    		{}
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
                'disk.rights.getTasks',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting tasks: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.rights.getTasks",
        {},
        function (result) {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    )
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK

```json
{
    "result": [
        {
            "ID": "42",
            "NAME": "disk_access_full",
            "TITLE": "Полный доступ"
        },
        {
            "ID": "40",
            "NAME": "disk_access_edit",
            "TITLE": "Редактирование"
        },
        {
            "ID": "38",
            "NAME": "disk_access_read",
            "TITLE": "Чтение"
        }
    ]
}
```