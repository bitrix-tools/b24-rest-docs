# Получить список полей товарных позиций crm.item.productrow.fields

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает список полей товарных позиций.

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.productrow.fields
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/crm.item.productrow.fields?auth=**put_access_token_here**
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.item.productrow.fields', {}
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
                'crm.item.productrow.fields',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching product row fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.productrow.fields', {},
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
        'crm.item.productrow.fields',
        []
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
      "fields":{
         "id":{
            "type":"integer",
            "isRequired":false,
            "isReadOnly":true,
            "isImmutable":false,
            "isMultiple":false,
            "isDynamic":false,
            "title":"ID"
         },
         "ownerId":{
            "type":"integer",
            "isRequired":true,
            "isReadOnly":false,
            "isImmutable":true,
            "isMultiple":false,
            "isDynamic":false,
            "title":"ID владельца"
         },
         "ownerType":{
            "type":"string",
            "isRequired":true,
            "isReadOnly":false,
            "isImmutable":true,
            "isMultiple":false,
            "isDynamic":false,
            "title":"Тип владельца"
         },
         "productId":{
            "type":"integer",
            "isRequired":true,
            "isReadOnly":false,
            "isImmutable":false,
            "isMultiple":false,
            "isDynamic":false,
            "title":"Товар"
         },
         "productName":{
            "type":"string",
            "isRequired":false,
            "isReadOnly":false,
            "isImmutable":false,
            "isMultiple":false,
            "isDynamic":false,
            "title":"Название товара"
         },
         "price":{
            "type":"double",
            "isRequired":false,
            "isReadOnly":false,
            "isImmutable":false,
            "isMultiple":false,
            "isDynamic":false,
            "title":"Цена"
         },
         "priceExclusive":{
            "type":"double",
            "isRequired":false,
            "isReadOnly":true,
            "isImmutable":false,
            "isMultiple":false,
            "isDynamic":false,
            "title":"Цена без налога со скидкой"
         },
         "priceNetto":{
            "type":"double",
            "isRequired":false,
            "isReadOnly":true,
            "isImmutable":false,
            "isMultiple":false,
            "isDynamic":false,
            "title":"PRICE_NETTO"
         },
         "priceBrutto":{
            "type":"double",
            "isRequired":false,
            "isReadOnly":true,
            "isImmutable":false,
            "isMultiple":false,
            "isDynamic":false,
            "title":"PRICE_BRUTTO"
         },
         "quantity":{
            "type":"double",
            "isRequired":false,
            "isReadOnly":false,
            "isImmutable":false,
            "isMultiple":false,
            "isDynamic":false,
            "title":"Количество"
         },
         "discountTypeId":{
            "type":"integer",
            "isRequired":false,
            "isReadOnly":false,
            "isImmutable":false,
            "isMultiple":false,
            "isDynamic":false,
            "title":"Тип скидки"
         },
         "discountRate":{
            "type":"double",
            "isRequired":false,
            "isReadOnly":false,
            "isImmutable":false,
            "isMultiple":false,
            "isDynamic":false,
            "title":"Величина скидки"
         },
         "discountSum":{
            "type":"double",
            "isRequired":false,
            "isReadOnly":false,
            "isImmutable":false,
            "isMultiple":false,
            "isDynamic":false,
            "title":"Сумма скидки"
         },
         "taxRate":{
            "type":"double",
            "isRequired":false,
            "isReadOnly":false,
            "isImmutable":false,
            "isMultiple":false,
            "isDynamic":false,
            "title":"Налог"
         },
         "taxIncluded":{
            "type":"char",
            "isRequired":false,
            "isReadOnly":false,
            "isImmutable":false,
            "isMultiple":false,
            "isDynamic":false,
            "title":"Налог включен в цену"
         },
         "customized":{
            "type":"char",
            "isRequired":false,
            "isReadOnly":false,
            "isImmutable":false,
            "isMultiple":false,
            "isDynamic":false,
            "title":"Изменен"
         },
         "measureCode":{
            "type":"integer",
            "isRequired":false,
            "isReadOnly":false,
            "isImmutable":false,
            "isMultiple":false,
            "isDynamic":false,
            "title":"Код единицы измерения"
         },
         "measureName":{
            "type":"string",
            "isRequired":false,
            "isReadOnly":false,
            "isImmutable":false,
            "isMultiple":false,
            "isDynamic":false,
            "title":"Единица измерения"
         },
         "sort":{
            "type":"integer",
            "isRequired":false,
            "isReadOnly":false,
            "isImmutable":false,
            "isMultiple":false,
            "isDynamic":false,
            "title":"Сортировка"
         },
         "type":{
            "type":"integer",
            "isRequired":false,
            "isReadOnly":true,
            "isImmutable":false,
            "isMultiple":false,
            "isDynamic":false,
            "title":"TYPE"
         },
         "storeId":{
               "type": "integer",
               "isRequired": false,
               "isReadOnly": true,
               "isImmutable": false,
               "isMultiple": false,
               "isDynamic": false,
               "title": "STORE_ID"
         }         
      }
   },
   "time":{
      "start":1716812240.400023,
      "finish":1716812242.151703,
      "duration":1.7516798973083496,
      "processing":0.09682416915893555,
      "date_start":"2024-05-27T15:17:20+03:00",
      "date_finish":"2024-05-27T15:17:22+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **fields**
[`object`](../../../data-types.md) | Объект в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где `field` — идентификатор поля объекта [crm_item_product_row](../../data-types.md#crm_item_product_row), а `value` — объект типа [crm_rest_field_descriptionon](../../data-types.md#crm_rest_field_description) ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":0,
   "error_description":"some error"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-item-productrow-add.md)
- [{#T}](./crm-item-productrow-update.md)
- [{#T}](./crm-item-productrow-get.md)
- [{#T}](./crm-item-productrow-set.md)
- [{#T}](./crm-item-productrow-get-available-for-payment.md)
- [{#T}](./crm-item-productrow-list.md)
- [{#T}](./crm-item-productrow-delete.md)