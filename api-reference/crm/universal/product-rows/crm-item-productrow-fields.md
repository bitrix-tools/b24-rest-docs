# Получить список полей товарных позиций crm.item.productrow.fields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

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

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FieldItem = {
      type: string
      isRequired: boolean
      isReadOnly: boolean
      isImmutable: boolean
      isMultiple: boolean
      isDynamic: boolean
      title: string
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ProductRowFieldsResult = {
      fields: Record<string, FieldItem>
    }

    try {
      const response = await $b24.actions.v2.call.make<ProductRowFieldsResult>({
        method: 'crm.item.productrow.fields',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(Object.keys(result.fields))
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getProductRowFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.item.productrow.fields',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(Object.keys(result.fields))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getProductRowFields)
    </script>
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