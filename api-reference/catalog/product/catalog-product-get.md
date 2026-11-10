# Получить товар по идентификатору catalog.product.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара» и правом на чтение товара в инфоблоке

Метод `catalog.product.get` возвращает поля и значения свойств товара торгового каталога по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_product.id`](../data-types.md#catalog_product) | Идентификатор товара.

Метод возвращает элемент торгового каталога любого типа: простой товар, товар с вариациями, вариацию, услугу. Тип приходит в поле `type`.

Получить идентификаторы товаров можно методом [catalog.product.list](./catalog-product-list.md) ||
|#

{% note warning "Работа с ценой товара" %}

Чтобы получить цены товара, используйте методы [catalog.price.*](../price/index.md).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1243}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1243,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ProductGetResult = {
      product: {
        id: number
        name: string
        active: string
        available: string
        bundle: string
        canBuyZero: string
        code: string
        sort: number
        iblockId: number
        iblockSectionId: number
        type: number
        vatId: number
        vatIncluded: string
        weight: number
        width: number
        height: number
        length: number
        measure: number
        quantity: number
        quantityReserved: number
        quantityTrace: string
        purchasingPrice: string
        purchasingCurrency: string
        subscribe: string
        xmlId: string
        createdBy: number
        modifiedBy: number
        dateCreate: ISODate | null
        dateActiveFrom: ISODate | null
        dateActiveTo: ISODate | null
        timestampX: ISODate | null
        detailPicture: { id: string; url: string; urlMachine: string } | null
        previewPicture: { id: string; url: string; urlMachine: string } | null
        detailText: string | null
        detailTextType: string
        previewText: string | null
        previewTextType: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<ProductGetResult>({
        method: 'catalog.product.get',
        params: {
          id: 1243,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.product.id, result.product.name, result.product.active)
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
      async function getProduct() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.product.get',
            params: {
              id: 1243,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.product.id, result.product.name, result.product.active)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getProduct)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.get(
            bitrix_id=1243,
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    ```php
    try {
        $productId = 1243;
        $productResult = $serviceBuilder->getCatalogScope()
            ->product()
            ->get($productId);
        $itemResult = $productResult->product();
        print("Active: " . ($itemResult->active ? 'Yes' : 'No') . PHP_EOL);
        print("Available: " . ($itemResult->available ? 'Yes' : 'No') . PHP_EOL);
        print("Bundle: " . ($itemResult->bundle ? 'Yes' : 'No') . PHP_EOL);
        print("Code: " . $itemResult->code . PHP_EOL);
        print("Created By: " . $itemResult->createdBy . PHP_EOL);
        print("Date Active From: " . ($itemResult->dateActiveFrom ? $itemResult->dateActiveFrom->format(DATE_ATOM) : 'N/A') . PHP_EOL);
        print("Date Active To: " . ($itemResult->dateActiveTo ? $itemResult->dateActiveTo->format(DATE_ATOM) : 'N/A') . PHP_EOL);
        print("Date Created: " . $itemResult->dateCreate->format(DATE_ATOM) . PHP_EOL);
        print("Name: " . $itemResult->name . PHP_EOL);
        print("ID: " . $itemResult->id . PHP_EOL);
        print("Iblock ID: " . $itemResult->iblockId . PHP_EOL);
        print("Iblock Section ID: " . $itemResult->iblockSectionId . PHP_EOL);
        print("Modified By: " . $itemResult->modifiedBy . PHP_EOL);
        print("Timestamp: " . $itemResult->timestampX->format(DATE_ATOM) . PHP_EOL);
        print("XML ID: " . $itemResult->xmlId . PHP_EOL);
    } catch (Throwable $e) {
        print("An error occurred: " . $e->getMessage() . PHP_EOL);
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.product.get',
        {
            'id': 1243
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
        'catalog.product.get',
        [
            'id' => 1243
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.product.get", b24.Params{
    	"id": 1243,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "product".
    raw, ok := b24.Unwrap(res.Result, "product")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа product")
    }

    var item struct {
    	Active     string `json:"active"`
    	Available  string `json:"available"`
    	Bundle     string `json:"bundle"`
    	CanBuyZero string `json:"canBuyZero"`
    	Code       string `json:"code"`
    	CreatedBy  int    `json:"createdBy"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Active, item.Available)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "product": {
            "active": "Y",
            "available": "Y",
            "barcodeMulti": "N",
            "bundle": "N",
            "canBuyZero": "Y",
            "code": "skameyka_java_120_sm",
            "createdBy": 1,
            "dateActiveFrom": null,
            "dateActiveTo": null,
            "dateCreate": "2026-10-12T13:12:22+03:00",
            "detailPicture": {
                "id": "6455",
                "url": "\/rest\/catalog.product.download?fields%5BfieldName%5D=detailPicture&fields%5BfileId%5D=6455&fields%5BproductId%5D=1243",
                "urlMachine": "\/rest\/catalog.product.download?fields%5BfieldName%5D=detailPicture&fields%5BfileId%5D=6455&fields%5BproductId%5D=1243"
            },
            "detailText": "Скамейка садовая Java, тик, 120x61x92 см",
            "detailTextType": "text",
            "height": 920,
            "iblockId": 25,
            "iblockSection": [
                85
            ],
            "iblockSectionId": 85,
            "id": 1243,
            "length": 610,
            "measure": 9,
            "modifiedBy": 1,
            "name": "Скамейка Java, 120 см",
            "previewPicture": null,
            "previewText": null,
            "previewTextType": "text",
            "property301": {
                "value": "1001",
                "valueId": "2967"
            },
            "property305": [
                {
                    "value": "Тик",
                    "valueId": "2969"
                }
            ],
            "property309": [
                {
                    "value": {
                        "id": "8303",
                        "url": "\/rest\/catalog.product.download?fields%5BfieldName%5D=property309&fields%5BfileId%5D=8303&fields%5BproductId%5D=1243",
                        "urlMachine": "\/rest\/catalog.product.download?fields%5BfieldName%5D=property309&fields%5BfileId%5D=8303&fields%5BproductId%5D=1243"
                    },
                    "valueId": "2973"
                }
            ],
            "property311": null,
            "purchasingCurrency": "RUB",
            "purchasingPrice": "4500.00000000",
            "quantity": 10,
            "quantityReserved": 1,
            "quantityTrace": "Y",
            "recurSchemeLength": null,
            "recurSchemeType": "D",
            "sort": 500,
            "subscribe": "Y",
            "timestampX": "2026-11-05T16:08:15+03:00",
            "trialPriceId": null,
            "type": 1,
            "vatId": 1,
            "vatIncluded": "Y",
            "weight": 12000,
            "width": 1200,
            "withoutOrder": "N",
            "xmlId": "1243"
        }
    },
    "time": {
        "start": 1793891754,
        "finish": 1793891754.838614,
        "duration": 0.8386139869689941,
        "processing": 0,
        "date_start": "2026-11-05T18:15:54+03:00",
        "date_finish": "2026-11-05T18:15:54+03:00",
        "operating_reset_at": 1793892300,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **result.product**
[`catalog_product`](../data-types.md#catalog_product) | Поля товара и значения всех его свойств. Пустые поля приходят со значением `null`.

Свойства приходят в ключах `propertyN`, где `N` — идентификатор свойства. Значение одиночного свойства — объект `{"value": ..., "valueId": ...}`, множественного — массив таких объектов. Для свойства типа «Файл» в `value` приходит объект с идентификатором файла и ссылками на скачивание.

Поля `purchasingPrice` и `purchasingCurrency` приходят, только если у пользователя есть право на просмотр закупочной цены ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "200040300010",
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300000` | `Iblock Not Found` | Инфоблок товара не найден ||
|| `400` | `200040300040` | `Access Denied` | Нет права на чтение товара в инфоблоке ||
|| `400` | `200040300010` | `Access Denied` | Нет ни одного из прав «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара» ||
|| `400` | `100` | `Could not find value for parameter {id}` | Не передан обязательный параметр `id` ||
|| `400` | Пустое значение | `product does not exist.` | Товар с указанным `id` не найден или `id` не является положительным целым числом ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-add.md)
- [{#T}](./catalog-product-update.md)
- [{#T}](./catalog-product-list.md)
- [{#T}](../../../tutorials/catalog/index.md)
- [{#T}](./catalog-product-download.md)
- [{#T}](./catalog-product-delete.md)
- [{#T}](./catalog-product-get-fields-by-filter.md)
