# Получить остатки товара на складе по идентификатору catalog.storeproduct.get

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров»

Метод `catalog.storeproduct.get` возвращает информацию об остатках товара на складе по идентификатору записи.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_storeproduct.id`](../data-types.md#catalog_storeproduct) | Идентификатор записи остатков, можно получить методом [catalog.storeproduct.list](./catalog-store-product-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.storeproduct.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.storeproduct.get
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.storeproduct.get',
    		{
    			id: 1
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch(error)
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
                'catalog.storeproduct.get',
                [
                    'id' => 1
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
        echo 'Error getting store product: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.storeproduct.get',
        {
            id: 1
        },
        function(result)
        {
            if(result.error())
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
        'catalog.storeproduct.get',
        [
            'id' => 1
        ]
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
        "storeProduct": {
            "amount": 14,
            "id": 13,
            "productId": 6973,
            "quantityReserved": null,
            "storeId": 11
        }
    },
    "time": {
        "start": 1758089295.545724,
        "finish": 1758089295.586371,
        "duration": 0.040647029876708984,
        "processing": 0.0036160945892333984,
        "date_start": "2025-09-17T09:08:15+03:00",
        "date_finish": "2025-09-17T09:08:15+03:00",
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
|| **storeProduct**
[`catalog_storeproduct`](../data-types.md#catalog_storeproduct) | Объект с информацией об остатках товара по складам с заданным идентификатором ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 200040300010,
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `200040300010` | Access Denied | Недостаточно прав для чтения ||
|| `-` | Store product is not exists | Остатков товара по складам с таким идентификатором не существует ||
|| `100` | Could not find value for parameter {id} | Не указан параметр `id` || 
|| `0` | | Другие ошибки || 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-store-product-list.md)
- [{#T}](./catalog-store-product-get-fields.md)