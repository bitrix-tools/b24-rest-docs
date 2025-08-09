# Получить информацию об изображении товара catalog.productImage.get

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод возвращает информацию о конкретном изображении товара, головного товара, вариации или услуги.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **productId***
[`catalog_product.id`](../data-types.md#catalog_product)\|
[`catalog_product_sku.id`](../data-types.md#catalog_product_sku)\|
[`catalog_product_offer.id`](../data-types.md#catalog_product_offer)\|
[`catalog_product_service.id`](../data-types.md#catalog_product_service) | Идентификатор товара, головного товара, вариации или услуги.

Чтобы получить существующие идентификаторы, используйте следующие методы:
- для товаров — [catalog.product.list](../product/catalog-product-list.md)
- для головных товаров — [catalog.product.sku.list](../product/sku/catalog-product-sku-list.md)
- для вариаций товара — [catalog.product.offer.list](../product/offer/catalog-product-offer-list.md)
- для услуг — [catalog.product.service.list](../product/service/catalog-product-service-list.md)
||
|| **id***
[`catalog_product_image.id`](../data-types.md#catalog_product_image) | Идентификатор изображения ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"productId":1,"id":1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.productImage.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"productId":1,"id":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.productImage.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.productImage.get', 
    		{
    			productId: 1,
    			id: 1,
    		}
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
                'catalog.productImage.get',
                [
                    'productId' => 1,
                    'id'        => 1,
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
        echo 'Error getting product image: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.productImage.get', 
        {
            productId: 1,
            id: 1,
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
        'catalog.productImage.get',
        [
            'productId' => 1,
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
        "productImage": {
            "createTime": "2024-10-17T10:48:05+03:00",
            "detailUrl": "\/upload\/iblock\/6f1\/bkm7jmwso31wisk423gtp28iagy2e8v0\/test.jpeg",
            "downloadUrl": "http:\/\/dev.bx\/rest\/download.json?sessid=ae1ada0e5c85babd18ce4af4c702d1d9\u0026token=catalog%7CaWQ9NzY1MSZfPTZWZFhwSDRZRFRvcmNmYWtGMVRQbE4wdjZRcHA5QXBY%7CImRvd25sb2FkfGNhdGFsb2d8YVdROU56WTFNU1pmUFRaV1pGaHdTRFJaUkZSdmNtTm1ZV3RHTVZSUWJFNHdkalpSY0hBNVFYQll8YWUxYWRhMGU1Yzg1YmFiZDE4Y2U0YWY0YzcwMmQxZDki.8jeG4p%2BO6LZSDNqaRR3XdTAM6jSSD4Gtye8zm6Q5Y14%3D",
            "id": 1,
            "name": "test.jpeg",
            "productId": 1,
            "type": "MORE_PHOTO"
        }
    },
    "time": {
        "start": 1729162290.040193,
        "finish": 1729162290.63512,
        "duration": 0.5949268341064453,
        "processing": 0.20079898834228516,
        "date_start": "2024-10-17T13:51:30+03:00",
        "date_finish": "2024-10-17T13:51:30+03:00",
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **productImage**
[`catalog_product_image`](../data-types.md#catalog_product_image) | Объект с информацией об изображении ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
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
|| `200040300010` | Недостаточно прав для просмотра торгового каталога
||
|| `200040300010` | Недостаточно прав для просмотра товара 
||
|| `100` | Не указан параметр `productId`
|| 
|| `100` | Не указан параметр `id`
|| 
|| `0` | Товар с указанным идентификатором не найден
|| 
|| `0` | Изображение с указанным идентификатором не найдено
|| 
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-product-image-add.md)
- [{#T}](./catalog-product-image-list.md)
- [{#T}](./catalog-product-image-delete.md)
- [{#T}](./catalog-product-image-get-fields.md)