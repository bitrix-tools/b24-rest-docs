# Получить информацию о ревизиях API im.revision.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`im`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.revision.get` получает информацию о ревизиях API.

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'im.revision.get',
    		{}
    	);
    	
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
                'im.revision.get',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error()->ex);
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting IM revision: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'im.revision.get',
        {},
        function(result){
            if(result.error())
            {
                console.error(result.error().ex);
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    {% include [Пояснение о restCommand](./_includes/rest-command.md) %}

    ```php
    $result = restCommand(
        'im.revision.get',
        Array(

        ),
        $_REQUEST[
            "auth"
        ]
    );
    ```

- cURL

    // пример для cURL

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{    
    "result": {
        "rest": 18,
        "web": 117,
        "mobile": 9,
    }
}
```

### Описание ключей

- `rest` – ревизия API для REST клиентов.
- `web` – ревизия API для веб/десктоп клиента.
- `mobile` – ревизия API для мобильного клиента.