# Изменить товарную позицию объекта CRM crm.item.productrow.update

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: требуется право на изменение объекта CRM, товарная позиция которого изменяется

Метод изменяет товарную позицию объекта CRM.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`crm_item_product_row.id`](../../data-types.md#crm_item_product_row) | Идентификатор товарной позиции ||
|| **fields***
[`object`](../../../data-types.md) | Объект, содержащий значения полей для обновления товарной позиции объекта CRM ||
|#

### Параметр fields

#|
|| **Название**
`тип` | **Описание** ||
|| **productId**
[`catalog_product.id`](../../../catalog/data-types.md#catalog_product) | Идентификатор товара из каталога ||
|| **productName**
[`string`](../../../data-types.md) | Название товара в товарной позиции ||
|| **price**
[`double`](../../../data-types.md) | Цена за единицу товарной позиции с учетом скидок и налогов ||
|| **quantity**
[`double`](../../../data-types.md) | Количество товара ||
|| **discountTypeId**
[`integer`](../../../data-types.md) | Тип скидки.
Возможные значения:
- `1` — абсолютное значение
- `2` — процентное значение ||
|| **discountRate**
[`double`](../../../data-types.md) | Значение скидки в процентах (если используется тип скидки с процентным значением) ||
|| **discountSum**
[`double`](../../../data-types.md) | Абсолютное значение скидки (если используется тип скидки с абсолютным значением) ||
|| **taxRate**
[`double`](../../../data-types.md) | Ставка налога в процентах ||
|| **taxIncluded**
[`string`](../../../data-types.md) | Индикатор того, включен ли налог в стоимость.
Возможные значения:
- `Y` – налог включен
- `N` – налог не включен  ||
|| **measureCode**
[`catalog_measure.code`](../../../catalog/data-types.md#catalog_measure) | Код единицы измерения ||
|| **sort**
[`integer`](../../../data-types.md) | Сортировка ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":17648,"fields":{"productId":9621,"price":90000,"quantity":3,"discountTypeId":2,"discountRate":10,"taxRate":10,"taxIncluded":"Y","measureCode":796,"sort":20}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.productrow.update
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":17648,"fields":{"productId":9621,"price":90000,"quantity":3,"discountTypeId":2,"discountRate":10,"taxRate":10,"taxIncluded":"Y","measureCode":796,"sort":20},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.productrow.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.item.productrow.update', {
    			id: 17648,
    			fields: {
    				productId: 9621,
    				price: 90000.000000,
    				quantity: 3,
    				discountTypeId: 2,
    				discountRate: 10,
    				taxRate: 10,
    				taxIncluded: 'Y',
    				measureCode: 796,
    				sort: 20,
    			},
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
                'crm.item.productrow.update',
                [
                    'id' => 17648,
                    'fields' => [
                        'productId'      => 9621,
                        'price'          => 90000.000000,
                        'quantity'       => 3,
                        'discountTypeId' => 2,
                        'discountRate'   => 10,
                        'taxRate'        => 10,
                        'taxIncluded'    => 'Y',
                        'measureCode'    => 796,
                        'sort'           => 20,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating product row: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.productrow.update', {
            id: 17648,
            fields: {
                productId: 9621,
                price: 90000.000000,
                quantity: 3,
                discountTypeId: 2,
                discountRate: 10,
                taxRate: 10,
                taxIncluded: 'Y',
                measureCode: 796,
                sort: 20,
            },
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
        'crm.item.productrow.update',
        [
            'id' => 17648,
            'fields' => [
                'productId' => 9621,
                'price' => 90000.000000,
                'quantity' => 3,
                'discountTypeId' => 2,
                'discountRate' => 10,
                'taxRate' => 10,
                'taxIncluded' => 'Y',
                'measureCode' => 796,
                'sort' => 20,
            ]
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
         "id":17649,
         "ownerId":13142,
         "ownerType":"D",
         "productId":9621,
         "productName":"iphone 14",
         "price":90000,
         "priceAccount":90000,
         "priceExclusive":81818.18,
         "priceNetto":90909.09,
         "priceBrutto":100000,
         "quantity":3,
         "discountTypeId":2,
         "discountRate":10,
         "discountSum":9090.91,
         "taxRate":10,
         "taxIncluded":"Y",
         "customized":"Y",
         "measureCode":796,
         "measureName":"шт",
         "sort":20,
         "xmlId":"sale_basket_8147",
         "type":4
      }
   },
   "time":{
      "start":1716890008.714214,
      "finish":1716890010.275307,
      "duration":1.5610928535461426,
      "processing":1.3967258930206299,
      "date_start":"2024-05-28T12:53:28+03:00",
      "date_finish":"2024-05-28T12:53:30+03:00"
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
[`crm_item_product_row`](../../data-types.md#crm_item_product_row) | Объект, содержащий информацию об обновленной товарной позиции ||
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
|| `INVALID_ARG_VALUE` | Неизвестное поле или переданное поле недоступно для обновления ||
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
- [{#T}](./crm-item-productrow-get-available-for-payment.md)
- [{#T}](./crm-item-productrow-list.md)
- [{#T}](./crm-item-productrow-delete.md)