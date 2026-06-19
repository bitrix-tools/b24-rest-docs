# Сохранить товарную позицию объекта CRM crm.item.productrow.set

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: требуется право на изменение объекта CRM, товарная позиция которого устанавливается

Метод сохраняет товарную позицию объекта CRM.  Обратите внимание, что метод перезапишет все уже существующие товарные позиции, привязанные к объекту. Таким образом, метод заменяет уже существующие товарные позиции на те, что были присланы.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ownerId***
[`integer`](../../../data-types.md) | Идентификатор объекта CRM ||
|| **ownerType***
[`string`](../../../data-types.md) | Идентификатор [`типа объекта CRM`](../../data-types.md#object_type). Передавайте [Краткий символьный код типа](../../data-types.md#object_type) ||
|| **productRows***
[`object[]`](../../../data-types.md) | Массив объектов с информацией о товарных позициях, которые нужно сохранить в объекте ||
|#


### Параметр productRows

#|
|| **Название**
`тип` | **Описание** ||
|| **productId**
[`catalog_product.id`](../../../catalog/data-types.md#catalog_product) | Идентификатор товара из каталога ||
|| **productName**
[`string`](../../../data-types.md) | Название товара в товарной позиции.
Если не передано и передано значение **productId**, то используется название товара из каталога товаров  ||
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
[`catalog_measure.code`](../../../catalog/data-types.md#catalog_measure) | Код единицы измерения.
Если не передано и передано значение **productId**, то используется единица измерения из каталога товаров
||
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
    -d '{"ownerType":"D","ownerId":13143,"productRows":[{"productId":9621,"price":99999.99,"quantity":1,"sort":10},{"productId":9623,"price":15900,"quantity":2,"sort":10}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.productrow.set
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ownerType":"D","ownerId":13143,"productRows":[{"productId":9621,"price":99999.99,"quantity":1,"sort":10},{"productId":9623,"price":15900,"quantity":2,"sort":10}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.productrow.set
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ProductRowsResult = {
      productRows: {
        id: number
        ownerId: number
        ownerType: string
        productId: number
        productName: string
        price: number
        priceAccount: number
        priceExclusive: number
        priceNetto: number
        priceBrutto: number
        quantity: number
        discountTypeId: number
        discountRate: number
        discountSum: number
        taxRate: number | null
        taxIncluded: string
        customized: string
        measureCode: number
        measureName: string
        sort: number
        xmlId: string
        type: number
      }[]
    }

    try {
      const response = await $b24.actions.v2.call.make<ProductRowsResult>({
        method: 'crm.item.productrow.set',
        params: {
          ownerType: 'D',
          ownerId: 13143,
          productRows: [
            {
              productId: 9621,
              price: 99999.99,
              quantity: 1,
              sort: 10,
            },
            {
              productId: 9623,
              price: 15900.00,
              quantity: 2,
              sort: 10,
            },
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.productRows)
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
      async function setProductRows() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.item.productrow.set',
            params: {
              ownerType: 'D',
              ownerId: 13143,
              productRows: [
                {
                  productId: 9621,
                  price: 99999.99,
                  quantity: 1,
                  sort: 10,
                },
                {
                  productId: 9623,
                  price: 15900.00,
                  quantity: 2,
                  sort: 10,
                },
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.productRows)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setProductRows)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.item.productrow.set',
                [
                    'ownerType'   => 'D',
                    'ownerId'     => 13143,
                    'productRows' => [
                        [
                            'productId' => 9621,
                            'price'     => 99999.99,
                            'quantity'  => 1,
                            'sort'      => 10,
                        ],
                        [
                            'productId' => 9623,
                            'price'     => 15900.00,
                            'quantity'  => 2,
                            'sort'      => 10,
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting product rows: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.productrow.set', {
            ownerType: 'D',
            ownerId: 13143,
            productRows: [{
                    productId: 9621,
                    price: 99999.99,
                    quantity: 1,
                    sort: 10,
                },
                {
                    productId: 9623,
                    price: 15900.00,
                    quantity: 2,
                    sort: 10,
                },

            ],
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
        'crm.item.productrow.set',
        [
            'ownerType' => 'D',
            'ownerId' => 13143,
            'productRows' => [
                [
                    'productId' => 9621,
                    'price' => 99999.99,
                    'quantity' => 1,
                    'sort' => 10,
                ],
                [
                    'productId' => 9623,
                    'price' => 15900.00,
                    'quantity' => 2,
                    'sort' => 10,
                ]
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
      "productRows":[
         {
            "id":17654,
            "ownerId":13143,
            "ownerType":"D",
            "productId":9621,
            "productName":"iphone 14",
            "price":99999.99,
            "priceAccount":99999.99,
            "priceExclusive":99999.99,
            "priceNetto":99999.99,
            "priceBrutto":99999.99,
            "quantity":1,
            "discountTypeId":2,
            "discountRate":0,
            "discountSum":0,
            "taxRate":null,
            "taxIncluded":"N",
            "customized":"Y",
            "measureCode":796,
            "measureName":"шт",
            "sort":10,
            "xmlId":"",
            "type":4
         },
         {
            "id":17655,
            "ownerId":13143,
            "ownerType":"D",
            "productId":9623,
            "productName":"iphone 10xs",
            "price":15900,
            "priceAccount":15900,
            "priceExclusive":15900,
            "priceNetto":15900,
            "priceBrutto":15900,
            "quantity":2,
            "discountTypeId":2,
            "discountRate":0,
            "discountSum":0,
            "taxRate":null,
            "taxIncluded":"N",
            "customized":"Y",
            "measureCode":796,
            "measureName":"шт",
            "sort":10,
            "xmlId":"",
            "type":4
         }
      ]
   },
   "time":{
      "start":1716895718.887229,
      "finish":1716895719.316293,
      "duration":0.4290640354156494,
      "processing":0.20114707946777344,
      "date_start":"2024-05-28T14:28:38+03:00",
      "date_finish":"2024-05-28T14:28:39+03:00"
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
[`crm_item_product_row[]`](../../data-types.md#crm_item_product_row) | Массив объектов, содержащий информацию о всех товарных позициях объекта CRM ||
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
- [{#T}](./crm-item-productrow-add.md)
- [{#T}](./crm-item-productrow-fields.md)
- [{#T}](./crm-item-productrow-get.md)
- [{#T}](./crm-item-productrow-update.md)
- [{#T}](./crm-item-productrow-get-available-for-payment.md)
- [{#T}](./crm-item-productrow-list.md)
- [{#T}](./crm-item-productrow-delete.md)