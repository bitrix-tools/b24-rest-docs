# Получить список типов округления catalog.enum.getRoundTypes

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `catalog.enum.getRoundTypes` возвращает список типов округления, доступных в каталоге.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.enum.getRoundTypes
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.enum.getRoundTypes
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.enum.getRoundTypes',
    		{}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
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
                'catalog.enum.getRoundTypes',
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
        echo 'Error getting round types: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.enum.getRoundTypes',
        {},
        function(result) {
            if (result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.enum.getRoundTypes',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "enum": [
        {
            "id": 1,
            "name": "Математическое"
        },
        {
            "id": 2,
            "name": "В пользу магазина"
        },
        {
            "id": 4,
            "name": "В пользу клиента"
        }
        ]
    },
    "time": {
        "start": 1774267910,
        "finish": 1774267910.959061,
        "duration": 0.9590609073638916,
        "processing": 0,
        "date_start": "2026-03-23T15:11:50+03:00",
        "date_finish": "2026-03-23T15:11:50+03:00",
        "operating_reset_at": 1774268510,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **enum**
[`catalog_enum[]`](../data-types.md#catalog_enum) | Массив элементов перечисления типов округления ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-enum-get-store-document-types.md)
