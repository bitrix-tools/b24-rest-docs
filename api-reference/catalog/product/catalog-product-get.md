# Получить товар по идентификатору catalog.product.get

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод получает информацию о товаре торгового каталога по его `ID`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id*** 
[`catalog_product.id`](../data-types.md#catalog_product)| Идентификатор товара.

Для получения идентификаторов товаров необходимо использовать [catalog.product.list](./catalog-product-list.md)
 ||
|#

{% note warning "Работа с ценой товара" %}

Чтобы получить цены товара, используйте методы [catalog.price.*](../price/index.md).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1243}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1243,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.product.get',
    		{
    			'id': 1243
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP

    ```php       
    try {
        $productId = 123; // Replace with the actual product ID you want to retrieve
        $productResult = $serviceBuilder->getCatalogScope()
            ->product()
            ->get($productId);
        $itemResult = $productResult->product();
        print("Active: " . ($itemResult->active ? 'Yes' : 'No') . PHP_EOL);
        print("Available: " . ($itemResult->available ? 'Yes' : 'No') . PHP_EOL);
        print("Bundle: " . ($itemResult->bundle ? 'Yes' : 'No') . PHP_EOL);
        print("Code: " . $itemResult->code . PHP_EOL);
        print("Created By: " . $itemResult->createdBy . PHP_EOL);
        print("Date Active From: " . ($itemResult->dateActiveFrom ? $itemResult->dateActiveFrom->format(DATE_ATOM) : 'N/A') . PHP_EOL);
        print("Date Active To: " . ($itemResult->dateActiveTo ? $itemResult->dateActiveTo->format(DATE_ATOM) : 'N/A') . PHP_EOL);
        print("Date Created: " . $itemResult->dateCreate->format(DATE_ATOM) . PHP_EOL);
        print("Name: " . $itemResult->name . PHP_EOL);
        print("ID: " . $itemResult->id . PHP_EOL);
        print("Iblock ID: " . $itemResult->iblockId . PHP_EOL);
        print("Iblock Section ID: " . $itemResult->iblockSectionId . PHP_EOL);
        print("Modified By: " . $itemResult->modifiedBy . PHP_EOL);
        print("Timestamp: " . $itemResult->timestampX->format(DATE_ATOM) . PHP_EOL);
        print("XML ID: " . $itemResult->xmlId . PHP_EOL);
    } catch (Throwable $e) {
        print("An error occurred: " . $e->getMessage() . PHP_EOL);
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.product.get',
        {
            'id': 1243
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.product.get',
        [
            'id' => 1243
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
        "product": {
            "active": "Y",
            "available": "Y",
            "bundle": "N",
            "canBuyZero": "Y",
            "code": "Tovar",
            "createdBy": 1,
            "dateActiveFrom": "2024-05-28T10:00:00+03:00",
            "dateActiveTo": "2024-05-29T10:00:00+03:00",
            "dateCreate": "2024-05-27T10:00:00+03:00",
            "detailPicture": {
                "id": "6455",
                "url": "\/rest\/catalog.product.download?fields%5BfieldName%5D=detailPicture\u0026fields%5BfileId%5D=6455\u0026fields%5BproductId%5D=1243",
                "urlMachine": "\/rest\/catalog.product.download?fields%5BfieldName%5D=detailPicture\u0026fields%5BfileId%5D=6455\u0026fields%5BproductId%5D=1243"
            },
            "detailText": null,
            "detailTextType": "text",
            "height": 100,
            "iblockId": 23,
            "iblockSectionId": 47,
            "id": 1243,
            "length": 100,
            "measure": 5,
            "modifiedBy": 1,
            "name": "Товар",
            "previewPicture": {
                "id": "6454",
                "url": "\/rest\/catalog.product.download?fields%5BfieldName%5D=previewPicture\u0026fields%5BfileId%5D=6454\u0026fields%5BproductId%5D=1243",
                "urlMachine": "\/rest\/catalog.product.download?fields%5BfieldName%5D=previewPicture\u0026fields%5BfileId%5D=6454\u0026fields%5BproductId%5D=1243"
            },
            "previewText": null,
            "previewTextType": "text",
            "property258": {
                "value": "test",
                "valueId": "9743"
            },
            "property259": [
                {
                    "value": "test1",
                    "valueId": "9744"
                },
                {
                    "value": "test2",
                    "valueId": "9745"
                }
            ],
            "purchasingCurrency": "RUB",
            "purchasingPrice": "1000.000000",
            "quantity": 10,
            "quantityReserved": 1,
            "quantityTrace": "Y",
            "sort": 100,
            "subscribe": "Y",
            "timestampX": "2024-06-06T16:45:35+03:00",
            "type": 1,
            "vatId": 1,
            "vatIncluded": "Y",
            "weight": 100,
            "width": 100,
            "xmlId": "1243"
        }
    },
    "time": {
        "start": 1717745698.684563,
        "finish": 1717745699.571344,
        "duration": 0.8867809772491455,
        "processing": 0.47261500358581543,
        "date_start": "2024-06-07T10:34:58+03:00",
        "date_finish": "2024-06-07T10:34:59+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **product**
[`catalog_product`](../data-types.md#catalog_product) | Объект с информацией о товаре ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":200040300010,
    "error_description":"Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300000` | Информационный блок с указанным идентификатором не существует ||
|| `200040300040` | Недостаточно прав для чтения элемента информационного блока ||
|| `200040300010` | Недостаточно прав для чтения торгового каталога ||
|| `100` | Не указан параметр `id` ||
|| `0` | Товар не существует ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-product-add.md)
- [{#T}](./catalog-product-update.md)
- [{#T}](./catalog-product-list.md)
- [{#T}](./catalog-product-download.md)
- [{#T}](./catalog-product-delete.md)
- [{#T}](./catalog-product-get-fields-by-filter.md)