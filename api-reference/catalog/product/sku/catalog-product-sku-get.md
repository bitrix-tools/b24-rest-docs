# Получить значения полей головного товара catalog.product.sku.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара» и правом на чтение элемента инфоблока каталога

Метод `catalog.product.sku.get` возвращает значения полей головного товара по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_product_sku.id`](../../data-types.md#catalog_product_sku) | Идентификатор головного товара.

Получить идентификаторы головных товаров можно методом [catalog.product.sku.list](./catalog-product-sku-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7679}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.sku.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7679,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.sku.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type PropertyValue = { value: string; valueId: string }
    type Picture = { id: string; url: string; urlMachine: string }

    type SkuItem = {
      active: string
      available: string
      bundle: string
      code: string | null
      createdBy: number
      dateActiveFrom: ISODate | null
      dateActiveTo: ISODate | null
      dateCreate: ISODate
      detailPicture: Picture | null
      detailText: string | null
      detailTextType: string
      iblockId: number
      iblockSection: number[] | null
      iblockSectionId: number | null
      id: number
      modifiedBy: number
      name: string
      previewPicture: Picture | null
      previewText: string | null
      previewTextType: string
      property303: PropertyValue | null
      property305: PropertyValue[] | null
      sort: number | null
      timestampX: ISODate
      type: number
      xmlId: string | null
    }

    // Shape of the payload returned in result (match the "response handling" section of the page).
    // For a simple product or a variation the method returns an empty array.
    type SkuGetResult = {
      sku: SkuItem | []
    }

    try {
      const response = await $b24.actions.v2.call.make<SkuGetResult>({
        method: 'catalog.product.sku.get',
        params: {
          id: 7679,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const sku = response.getData()!.result.sku
        if (Array.isArray(sku)) {
          console.warn('The ID does not belong to a parent product')
        } else {
          console.info('SKU product:', sku.id, sku.name)
        }
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
      async function getSkuProduct() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.product.sku.get',
            params: {
              id: 7679,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const sku = response.getData().result.sku
          if (Array.isArray(sku)) {
            console.warn('The ID does not belong to a parent product')
            return
          }
          console.info('SKU product:', sku.id, sku.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getSkuProduct)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.sku.get(
            bitrix_id=7679,
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
        $response = $b24Service
            ->core
            ->call(
                'catalog.product.sku.get',
                [
                    'id' => 7679,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.product.sku.get',
        {
            id: 7679,
        },
        function(result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.product.sku.get',
        [
            'id' => 7679,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.product.sku.get", b24.Params{
    	"id": 7679,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.sku.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "sku".
    // Для простого товара или вариации в "sku" приходит пустой массив.
    raw, ok := b24.Unwrap(res.Result, "sku")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа sku")
    }
    if string(raw) == "[]" {
    	return fmt.Errorf("товар не является головным")
    }

    // Необязательные поля могут прийти как null, поэтому для них указатели.
    type propertyValue struct {
    	Value   string `json:"value"`
    	ValueID string `json:"valueId"`
    }
    var item struct {
    	ID              b24.ID          `json:"id"`
    	IblockID        int             `json:"iblockId"`
    	Name            string          `json:"name"`
    	Active          string          `json:"active"`
    	Code            *string         `json:"code"`
    	Sort            *int            `json:"sort"`
    	Type            int             `json:"type"`
    	IblockSectionID *int            `json:"iblockSectionId"`
    	PreviewText     *string         `json:"previewText"`
    	Property303     *propertyValue  `json:"property303"`
    	Property305     []propertyValue `json:"property305"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name)
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
            "code": "futbolka-bazovaya",
            "createdBy": 1269,
            "dateActiveFrom": null,
            "dateActiveTo": null,
            "dateCreate": "2026-11-05T18:38:10+03:00",
            "detailPicture": null,
            "detailText": "<p>Футболка из 100% хлопка</p>",
            "detailTextType": "html",
            "iblockId": 25,
            "iblockSection": [
                31
            ],
            "iblockSectionId": 31,
            "id": 7679,
            "modifiedBy": 1269,
            "name": "Футболка базовая",
            "previewPicture": null,
            "previewText": "Футболка свободного кроя из хлопка",
            "previewTextType": "text",
            "property303": {
                "value": "Хлопковый двор",
                "valueId": "4117"
            },
            "property305": [
                {
                    "value": "Хлопок",
                    "valueId": "4119"
                }
            ],
            "sort": 300,
            "timestampX": "2026-11-05T18:38:23+03:00",
            "type": 6,
            "xmlId": "tshirt-basic-01"
        }
    },
    "time": {
        "start": 1793893104,
        "finish": 1793893104.8058,
        "duration": 0.8057999610900879,
        "processing": 0,
        "date_start": "2026-11-05T18:38:24+03:00",
        "date_finish": "2026-11-05T18:38:24+03:00",
        "operating_reset_at": 1793893680,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **result.sku**
[`catalog_product_sku`](../../data-types.md#catalog_product_sku) | Объект с полями головного товара. Пустые поля приходят со значением `null`.

В ответе приходят все свойства инфоблока в виде ключей `propertyN`: у заполненного свойства — объект `{"value": ..., "valueId": ...}`, у множественного — массив таких объектов. В примере показаны только свойства `property303` и `property305`.

Поля торгового каталога, например `canBuyZero` и `vatId`, метод не возвращает. Получить их можно методом [catalog.product.sku.list](./catalog-product-sku-list.md), если перечислить поля в `select`.

Если `id` принадлежит простому товару или вариации, в `sku` приходит пустой массив `[]` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "sku does not exist."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | Access Denied | У пользователя нет права на просмотр каталога ||
|| `400` | `200040300040` | Access Denied | У пользователя нет права на чтение элемента инфоблока каталога ||
|| `400` | Пустое значение | sku does not exist. | Товар с указанным `id` не найден. Ту же ошибку метод возвращает, если в `id` передан `0` или строка, которая не является числом ||
|| `400` | `100` | Could not find value for parameter {id} | Не передан параметр `id` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-sku-add.md)
- [{#T}](./catalog-product-sku-update.md)
- [{#T}](./catalog-product-sku-list.md)
- [{#T}](./catalog-product-sku-download.md)
- [{#T}](./catalog-product-sku-delete.md)
- [{#T}](./catalog-product-sku-get-fields-by-filter.md)
