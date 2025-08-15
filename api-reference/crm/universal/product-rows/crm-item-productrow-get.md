# Получить информацию о товарной позиции по id crm.item.productrow.get

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: требуется право на чтение объекта, к которому привязаны товарные позиции

Метод получает информацию о товарной позиции объекта CRM.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`crm_item_product_row.id`](../../data-types.md#crm_item_product_row) | Идентификатор товарной позиции ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":17622}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.productrow.get
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":17622,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.productrow.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.item.productrow.get', {
    			id: 17622,
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
                'crm.item.productrow.get',
                [
                    'id' => 17622,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting product row: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.productrow.get', {
            id: 17622,
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
        'crm.item.productrow.get',
        [
            'id' => 17622
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
      "productRow":{
         "id":17622,
         "ownerId":13141,
         "ownerType":"D",
         "productId":9621,
         "productName":"iphone 14",
         "price":79999,
         "priceAccount":79999,
         "priceExclusive":79999,
         "priceNetto":79999,
         "priceBrutto":79999,
         "quantity":11,
         "discountTypeId":2,
         "discountRate":0,
         "discountSum":0,
         "taxRate":null,
         "taxIncluded":"Y",
         "customized":"Y",
         "measureCode":796,
         "measureName":"шт",
         "sort":10,
         "xmlId":"sale_basket_8145",
         "type":4,
         "storeId": 19
      }
   },
   "time":{
      "start":1716821358.26828,
      "finish":1716821358.701454,
      "duration":0.43317389488220215,
      "processing":0.240645170211792,
      "date_start":"2024-05-27T17:49:18+03:00",
      "date_finish":"2024-05-27T17:49:18+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **productRow**
[`crm_item_product_row`](../../data-types.md#crm_item_product_row) | Объект, содержащий информацию о товарной позиции ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":"NOT_FOUND",
   "error_description":"Элемент не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ENTITY_TYPE_NOT_SUPPORTED` | Работа с данным типом объектов не поддерживается ||
|| `ACCESS_DENIED` | Доступ запрещен ||
|| `NOT_FOUND` | Товарная позиция не найдена ||
|| `100` | Не переданы обязательные параметры ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-item-productrow-add.md)
- [{#T}](./crm-item-productrow-update.md)
- [{#T}](./crm-item-productrow-fields.md)
- [{#T}](./crm-item-productrow-set.md)
- [{#T}](./crm-item-productrow-get-available-for-payment.md)
- [{#T}](./crm-item-productrow-list.md)
- [{#T}](./crm-item-productrow-delete.md)