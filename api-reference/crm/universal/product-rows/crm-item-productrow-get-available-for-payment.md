# Получить неоплаченные товарные позиции объекта CRM crm.item.productrow.getAvailableForPayment

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: требуется право на чтение объекта CRM, товарные позиции которого выбираются

Метод получает товарные позиции объекта CRM, по которым клиенту еще не была выставлена оплата.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ownerId***
[`integer`](../../../data-types.md) | Идентификатор объекта CRM ||
|| **ownerType***
[`string`](../../../data-types.md) | Идентификатор [`типа объекта CRM`](../../data-types.md#object_type). Передавайте [Краткий символьный код типа](../../data-types.md#object_type) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ownerType":"D","ownerId":13144}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.productrow.getAvailableForPayment
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ownerType":"D","ownerId":13144,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.productrow.getAvailableForPayment
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.item.productrow.getAvailableForPayment', {
    			ownerType: 'D',
    			ownerId: 13144,
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
                'crm.item.productrow.getAvailableForPayment',
                [
                    'ownerType' => 'D',
                    'ownerId'   => 13144,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting available product rows for payment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.productrow.getAvailableForPayment', {
            ownerType: 'D',
            ownerId: 13144,
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.item.productrow.getAvailableForPayment',
        [
            'ownerType' => 'D',
            'ownerId' => 13144
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Ответ в случае успеха

HTTP-статус: **200**

```json
{
   "result":{
      "productRows":[
         {
            "id":17657,
            "ownerId":13144,
            "ownerType":"D",
            "productId":9621,
            "productName":"iphone 14",
            "price":79999,
            "priceAccount":79999,
            "priceExclusive":79999,
            "priceNetto":79999,
            "priceBrutto":79999,
            "quantity":3,
            "discountTypeId":2,
            "discountRate":0,
            "discountSum":0,
            "taxRate":null,
            "taxIncluded":"Y",
            "customized":"Y",
            "measureCode":796,
            "measureName":"шт",
            "sort":10,
            "xmlId":"sale_basket_8149",
            "type":4
         },
         {
            "id":17658,
            "ownerId":13144,
            "ownerType":"D",
            "productId":9623,
            "productName":"iphone 10xs",
            "price":5550,
            "priceAccount":5550,
            "priceExclusive":5550,
            "priceNetto":5550,
            "priceBrutto":5550,
            "quantity":3,
            "discountTypeId":2,
            "discountRate":0,
            "discountSum":0,
            "taxRate":null,
            "taxIncluded":"Y",
            "customized":"Y",
            "measureCode":796,
            "measureName":"шт",
            "sort":20,
            "xmlId":"sale_basket_8150",
            "type":4
         }
      ]
   },
   "time":{
      "start":1716966560.3205,
      "finish":1716966560.742781,
      "duration":0.42228102684020996,
      "processing":0.17676782608032227,
      "date_start":"2024-05-29T10:09:20+03:00",
      "date_finish":"2024-05-29T10:09:20+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **productRows**
[`crm_item_product_row[]`](../../data-types.md#crm_item_product_row) |Массив объектов, содержащий информацию о всех товарных позициях объекта CRM, по которым клиенту еще не была выставлена оплата
 ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":"ACCESS_DENIED",
   "error_description":"Доступ запрещен"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Доступ запрещен ||
|| `100` | Не переданы обязательные параметры ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-item-productrow-add.md)
- [{#T}](./crm-item-productrow-fields.md)
- [{#T}](./crm-item-productrow-get.md)
- [{#T}](./crm-item-productrow-set.md)
- [{#T}](./crm-item-productrow-update.md)
- [{#T}](./crm-item-productrow-list.md)
- [{#T}](./crm-item-productrow-delete.md)