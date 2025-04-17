# Добавить товарную позицию в объект CRM crm.item.productrow.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: требуется право на изменение объекта CRM, в который добавляется товарная позиция

Метод добавляет товарную позицию в объект CRM.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Объект, содержащий значения полей для добавления товарной позиции в объект CRM ||
|#

### Параметр fields

#|
|| **Название**
`тип` | **Описание** ||
|| **ownerId***
[`integer`](../../../data-types.md) | Идентификатор объекта CRM ||
|| **ownerType***
[`string`](../../../data-types.md) | Идентификатор [`типа объекта CRM`](../../data-types.md#object_type). Передавайте [Краткий символьный код типа](../../data-types.md#object_type) ||
|| **productId**
[`catalog_product.id`](../../../catalog/data-types.md#catalog_product) | Идентификатор товара из каталога ||
|| **productName**
[`string`](../../../data-types.md) | Название товара в товарной позиции.
Если не передано, но передано значение `productId`, то используется название товара из каталога товаров ||
|| **price**
[`double`](../../../data-types.md) | Цена за единицу товарной позиции с учетом скидок и налогов ||
|| **quantity**
[`double`](../../../data-types.md) | Количество товара. 
По умолчанию — 1 ||
|| **discountTypeId**
[`integer`](../../../data-types.md) | Тип скидки.
Возможные значения:
- `1` — абсолютное значение
- `2` — процентное значение
По умолчанию — 2 ||
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
- `N` – налог не включен
По умолчанию - N ||
|| **measureCode**
[`catalog_measure.code`](../../../catalog/data-types.md#catalog_measure) | Код единицы измерения
Если не передано и передано значение `productId`, то используется единица измерения из каталога товаров ||
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
    -d '{"fields":{"ownerId":13142,"ownerType":"D","productId":9621,"price":80000,"quantity":2,"discountTypeId":2,"discountRate":20,"taxRate":20,"taxIncluded":"Y","measureCode":796,"sort":10}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.productrow.add
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"ownerId":13142,"ownerType":"D","productId":9621,"price":80000,"quantity":2,"discountTypeId":2,"discountRate":20,"taxRate":20,"taxIncluded":"Y","measureCode":796,"sort":10},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.productrow.add
    ```

- JS

    ```js
    BX24.callMethod(
        'crm.item.productrow.add', {
            fields: {
                ownerId: 13142,
                ownerType: 'D',
                productId: 9621,
                price: 80000.000000,
                quantity: 2,
                discountTypeId: 2,
                discountRate: 20,
                taxRate: 20,
                taxIncluded: 'Y',
                measureCode: 796,
                sort: 10,
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

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.item.productrow.add',
        [
            'fields' => [
                'ownerId' => 13142,
                'ownerType' => 'D',
                'productId' => 9621,
                'price' => 80000.000000,
                'quantity' => 2,
                'discountTypeId' => 2,
                'discountRate' => 20,
                'taxRate' => 20,
                'taxIncluded' => 'Y',
                'measureCode' => 796,
                'sort' => 10,
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
         "id":17647,
         "ownerId":13142,
         "ownerType":"D",
         "productId":9621,
         "price":80000,
         "quantity":2,
         "discountTypeId":2,
         "discountRate":20,
         "taxRate":20,
         "taxIncluded":"Y",
         "measureCode":796,
         "sort":10,
         "type":4,
         "productName":"iphone 14",
         "priceAccount":80000,
         "priceExclusive":66666.67,
         "priceNetto":83333.34,
         "priceBrutto":100000.01,
         "discountSum":16666.67,
         "customized":"Y",
         "measureName":"шт",
         "xmlId":""
      }
   },
   "time":{
      "start":1716887721.77879,
      "finish":1716887723.259695,
      "duration":1.4809050559997559,
      "processing":1.2986550331115723,
      "date_start":"2024-05-28T12:15:21+03:00",
      "date_finish":"2024-05-28T12:15:23+03:00"
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
[`crm_item_product_row`](../../data-types.md#crm_item_product_row) | Объект, содержащий информацию о добавленной товарной позиции ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":"OWNER_NOT_FOUND",
   "error_description":"Owner was not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ENTITY_TYPE_NOT_SUPPORTED` | Работа с данным типом объектов не поддерживается ||
|| `ACCESS_DENIED` | Доступ запрещен ||
|| `OWNER_NOT_FOUND` | Переданный объект CRM не найден ||
|| `100` | Не переданы обязательные параметры ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-item-productrow-update.md)
- [{#T}](./crm-item-productrow-fields.md)
- [{#T}](./crm-item-productrow-get.md)
- [{#T}](./crm-item-productrow-set.md)
- [{#T}](./crm-item-productrow-get-available-for-payment.md)
- [{#T}](./crm-item-productrow-list.md)
- [{#T}](./crm-item-productrow-delete.md)