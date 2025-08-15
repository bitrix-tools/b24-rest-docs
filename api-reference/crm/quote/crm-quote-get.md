# Получить коммерческое предложение по идентификатору crm.quote.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.quote.get` возвращает коммерческое предложение по идентификатору.

#|
||  **Параметр** / **Тип**| **Описание** ||
|| **id**
[`unknown`](../../data-types.md) | Идентификатор предложения. ||
|#

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const id = prompt("Введите ID");
    	const response = await $b24.callMethod(
    		"crm.quote.get",
    		{ id: id }
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
    $id = $_POST['id'];
    
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.quote.get',
                [
                    'id' => $id,
                ]
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
        echo 'Error getting quote: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    var id = prompt("Введите ID");
    BX24.callMethod(
        "crm.quote.get",
        { id: id },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}