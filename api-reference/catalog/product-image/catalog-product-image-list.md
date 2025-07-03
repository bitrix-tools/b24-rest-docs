# Получить список изображений товара catalog.productImage.list

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод возвращает список изображений товара, головного товара, вариации или услуги.

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
|| **select** 
[`array`](../../data-types.md)| Массив со списком полей, которые необходимо выбрать (смотрите поля объекта [catalog_product_image](../data-types.md#catalog_product_image)) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"productId":1,"select":["id","name","productId","type","createTime","downloadUrl","detailUrl"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.productImage.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"productId":1,"select":["id","name","productId","type","createTime","downloadUrl","detailUrl"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.productImage.list
    ```

- JS

    ```js
    BX24.callMethod(
        'catalog.productImage.list',
        {
            productId: 1,
            select: [
                'id',
                'name',
                'productId',
                'type',
                'createTime',
                'downloadUrl',
                'detailUrl',
            ],
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
            result.next();
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.productImage.list',
        [
            'productId' => 1,
            'select' => [
                'id',
                'name',
                'productId',
                'type',
                'createTime',
                'downloadUrl',
                'detailUrl'
            ]
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
        "productImages": [
            {
                "createTime": "2024-10-17T10:48:05+03:00",
                "detailUrl": "\/upload\/iblock\/6f1\/bkm7jmwso31wisk423gtp28iagy2e8v0\/test.jpeg",
                "downloadUrl": "http:\/\/dev.bx\/rest\/download.json?sessid=ae1ada0e5c85babd18ce4af4c702d1d9\u0026token=catalog%7CaWQ9NzY1MSZfPTEzSk9hR2tKNHBRY1I2cFBPNjhvaTFHNTNiYjVsVmdx%7CImRvd25sb2FkfGNhdGFsb2d8YVdROU56WTFNU1pmUFRFelNrOWhSMnRLTkhCUlkxSTJjRkJQTmpodmFURkhOVE5pWWpWc1ZtZHh8YWUxYWRhMGU1Yzg1YmFiZDE4Y2U0YWY0YzcwMmQxZDki.iC0Yzi9feK8V1Zr0WSlp5GZpcmD0osnJGHN%2FZL%2FkQI4%3D",
                "id": 1,
                "name": "test.jpeg",
                "productId": 1,
                "type": "MORE_PHOTO"
            }
        ]
    },
    "total": 1,
    "time": {
        "start": 1729163241.324569,
        "finish": 1729163241.860237,
        "duration": 0.535667896270752,
        "processing": 0.19502019882202148,
        "date_start": "2024-10-17T14:07:21+03:00",
        "date_finish": "2024-10-17T14:07:21+03:00",
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **productImages**
[`catalog_product_image[]`](../data-types.md#catalog_product_image) | Массив объектов с информацией о выбранных изображениях товара ||
|| **total**
[`integer`](../../data-types.md#time) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":200040300010,
    "error_description":"Access denied"
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
|| `100` | Не указан или пустой параметр `productId`
|| 
|| `0` | Товар с указанным идентификатором не найден
|| 
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-product-image-add.md)
- [{#T}](./catalog-product-image-get.md)
- [{#T}](./catalog-product-image-delete.md)
- [{#T}](./catalog-product-image-get-fields.md)