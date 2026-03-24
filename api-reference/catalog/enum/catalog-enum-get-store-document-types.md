# Получить типы документов складского учета catalog.enum.getStoreDocumentTypes

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `catalog.enum.getStoreDocumentTypes` возвращает типы документов складского учета, доступные для REST.

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.enum.getStoreDocumentTypes
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.enum.getStoreDocumentTypes
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.enum.getStoreDocumentTypes',
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
                'catalog.enum.getStoreDocumentTypes',
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
        echo 'Error getting store document types: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.enum.getStoreDocumentTypes',
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
        'catalog.enum.getStoreDocumentTypes',
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
            "id": "A",
            "name": "Приход товара на склад"
        },
        {
            "id": "S",
            "name": "Оприходование товара"
        },
        {
            "id": "M",
            "name": "Перемещение товара между складами"
        },
        {
            "id": "R",
            "name": "Возврат товара"
        },
        {
            "id": "D",
            "name": "Списание товара"
        }
        ]
    },
    "time": {
        "start": 1774268098,
        "finish": 1774268098.509955,
        "duration": 0.5099549293518066,
        "processing": 0,
        "date_start": "2026-03-23T15:14:58+03:00",
        "date_finish": "2026-03-23T15:14:58+03:00",
        "operating_reset_at": 1774268698,
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
[`catalog_enum[]`](../data-types.md#catalog_enum) | Массив элементов перечисления типов документов складского учета ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-enum-get-round-types.md)
