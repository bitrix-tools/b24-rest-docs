# Получить значения полей головного товара catalog.product.sku.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод возвращает значения полей головного товара по идентификатору. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_product_sku.id`](../../data-types.md#catalog_product_sku) | Идентификатор головного товара.

Для получения идентификаторов головных товаров необходимо использовать [catalog.product.sku.list](./catalog-product-sku-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1289}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.sku.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1289,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.sku.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type SkuGetResult = {
      sku: {
        active: string
        available: string
        bundle: string
        canBuyZero: string
        code: string
        createdBy: number
        dateActiveFrom: ISODate | null
        dateActiveTo: ISODate | null
        dateCreate: ISODate | null
        detailPicture: { id: string; url: string; urlMachine: string } | null
        detailText: string | null
        detailTextType: string
        height: number
        iblockId: number
        iblockSectionId: number
        id: number
        length: number
        measure: number
        modifiedBy: number
        name: string
        previewPicture: { id: string; url: string; urlMachine: string } | null
        previewText: string | null
        previewTextType: string
        property258: { value: string; valueId: string }
        property259: { value: string; valueId: string }[]
        purchasingCurrency: string
        purchasingPrice: string
        quantity: number
        sort: number
        subscribe: string
        timestampX: ISODate | null
        type: number
        vatId: number
        vatIncluded: string
        weight: number
        width: number
        xmlId: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<SkuGetResult>({
        method: 'catalog.product.sku.get',
        params: {
          id: 1289,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.sku.id, result.sku.name, result.sku.type)
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
      async function getProductSku() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.product.sku.get',
            params: {
              id: 1289,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.sku.id, result.sku.name, result.sku.type)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getProductSku)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.product.sku.get',
                [
                    'id' => 1289
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        echo 'Info: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting product SKU: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.product.sku.get', {
            'id': 1289
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
        'catalog.product.sku.get',
        [
            'id' => 1289
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
        "sku": {
            "active": "Y",
            "available": "N",
            "bundle": "N",
            "canBuyZero": "Y",
            "code": "product_sku",
            "createdBy": 1,
            "dateActiveFrom": "2024-05-28T10:00:00+03:00",
            "dateActiveTo": "2024-05-29T10:00:00+03:00",
            "dateCreate": "2024-05-27T10:00:00+03:00",
            "detailPicture": {
                "id": "6552",
                "url": "\/rest\/catalog.product.download?fields%5BfieldName%5D=detailPicture\u0026fields%5BfileId%5D=6552\u0026fields%5BproductId%5D=1289",
                "urlMachine": "\/rest\/catalog.product.download?fields%5BfieldName%5D=detailPicture\u0026fields%5BfileId%5D=6552\u0026fields%5BproductId%5D=1289"
            },
            "detailText": null,
            "detailTextType": "text",
            "height": 100,
            "iblockId": 23,
            "iblockSectionId": 47,
            "id": 1289,
            "length": 100,
            "measure": 5,
            "modifiedBy": 1,
            "name": "Головной товар",
            "previewPicture": {
                "id": "6551",
                "url": "\/rest\/catalog.product.download?fields%5BfieldName%5D=previewPicture\u0026fields%5BfileId%5D=6551\u0026fields%5BproductId%5D=1289",
                "urlMachine": "\/rest\/catalog.product.download?fields%5BfieldName%5D=previewPicture\u0026fields%5BfileId%5D=6551\u0026fields%5BproductId%5D=1289"
            },
            "previewText": null,
            "previewTextType": "text",
            "property258": {
                "value": "test",
                "valueId": "9877"
            },
            "property259": [
                {
                    "value": "test1",
                    "valueId": "9878"
                },
                {
                    "value": "test2",
                    "valueId": "9879"
                }
            ],
            "purchasingCurrency": "RUB",
            "purchasingPrice": "1000.000000",
            "quantity": 10,
            "sort": 100,
            "subscribe": "Y",
            "timestampX": "2024-06-17T16:03:20+03:00",
            "type": 6,
            "vatId": 1,
            "vatIncluded": "Y",
            "weight": 100,
            "width": 100,
            "xmlId": "1243"
        }
    },
    "time": {
        "start": 1718636890.413679,
        "finish": 1718636891.096817,
        "duration": 0.6831381320953369,
        "processing": 0.27536606788635254,
        "date_start": "2024-06-17T18:08:10+03:00",
        "date_finish": "2024-06-17T18:08:11+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **sku**
[`catalog_product_sku`](../../data-types.md#catalog_product_sku) | Объект с информацией о головном товаре ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":200040300010,
    "error_description":"Access Denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300000` | Информационный блок с указанным идентификатором не существует
|| 
|| `200040300040` | Недостаточно прав для чтения элемента информационного блока
|| 
|| `200040300010` | Недостаточно прав для чтения торгового каталога
|| 
|| `100` | Не указан параметр `id`
|| 
|| `0` | Головной товар не существует
|| 
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-sku-add.md)
- [{#T}](./catalog-product-sku-update.md)
- [{#T}](./catalog-product-sku-list.md)
- [{#T}](./catalog-product-sku-download.md)
- [{#T}](./catalog-product-sku-delete.md)
- [{#T}](./catalog-product-sku-get-fields-by-filter.md)