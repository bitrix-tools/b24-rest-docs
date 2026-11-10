# Получить список изображений товара catalog.productImage.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Просмотр товаров каталога» и правом на чтение товара

Метод `catalog.productImage.list` возвращает все изображения товара, головного товара, вариации или услуги одним ответом, без постраничной навигации.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **productId***
[`catalog_product.id`](../data-types.md#catalog_product)\|
[`catalog_product_sku.id`](../data-types.md#catalog_product_sku)\|
[`catalog_product_offer.id`](../data-types.md#catalog_product_offer)\|
[`catalog_product_service.id`](../data-types.md#catalog_product_service) | Идентификатор товара, головного товара, вариации или услуги.

Чтобы получить существующие идентификаторы, используйте следующие методы:
- для товаров — [catalog.product.list](../product/catalog-product-list.md)
- для головных товаров — [catalog.product.sku.list](../product/sku/catalog-product-sku-list.md)
- для вариаций товара — [catalog.product.offer.list](../product/offer/catalog-product-offer-list.md)
- для услуг — [catalog.product.service.list](../product/service/catalog-product-service-list.md)
||
|| **select**
[`array`](../../data-types.md) | Массив полей, которые нужно вернуть:
- `id` — идентификатор изображения
- `name` — название файла
- `productId` — идентификатор товара
- `type` — тип изображения
- `createTime` — дата создания
- `downloadUrl` — ссылка для скачивания
- `detailUrl` — ссылка на изображение

Названия полей передавайте в camelCase, как в списке. Неизвестные поля и названия в другом регистре, например `ID`, метод пропускает без ошибки.

Если `select` не передан, возвращаются все поля ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"productId":1,"select":["id","name","productId","type","createTime","downloadUrl","detailUrl"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.productImage.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"productId":1,"select":["id","name","productId","type","createTime","downloadUrl","detailUrl"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.productImage.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ProductImageListResult = {
      productImages: {
        id: number
        name: string
        productId: number
        type: 'DETAIL_PICTURE' | 'PREVIEW_PICTURE' | 'MORE_PHOTO'
        createTime: ISODate
        downloadUrl: string
        detailUrl: string
      }[]
    }

    try {
      // catalog.productImage.list returns all images of the product in one response, without pagination
      const response = await $b24.actions.v2.call.make<ProductImageListResult>({
        method: 'catalog.productImage.list',
        params: {
          productId: 1,
          select: [
            'id',
            'name',
            'productId',
            'type',
            'createTime',
            'downloadUrl',
            'detailUrl',
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Product images:', result.productImages, 'Count:', result.productImages.length)
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
      async function listProductImages() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // catalog.productImage.list returns all images of the product in one response, without pagination
          const response = await $b24.actions.v2.call.make({
            method: 'catalog.productImage.list',
            params: {
              productId: 1,
              select: [
                'id',
                'name',
                'productId',
                'type',
                'createTime',
                'downloadUrl',
                'detailUrl',
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
          console.info('Product images:', result.productImages, 'Count:', result.productImages.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listProductImages)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product_image.list(
            product_id=1,
            select=[
                "id",
                "name",
                "productId",
                "type",
                "createTime",
                "downloadUrl",
                "detailUrl",
            ],
            start=0,
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
                'catalog.productImage.list',
                [
                    'productId' => 1,
                    'select'    => [
                        'id',
                        'name',
                        'productId',
                        'type',
                        'createTime',
                        'downloadUrl',
                        'detailUrl',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error listing product images: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.productImage.list',
        {
            productId: 1,
            select: [
                'id',
                'name',
                'productId',
                'type',
                'createTime',
                'downloadUrl',
                'detailUrl',
            ],
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
            result.next();
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.productImage.list',
        [
            'productId' => 1,
            'select' => [
                'id',
                'name',
                'productId',
                'type',
                'createTime',
                'downloadUrl',
                'detailUrl'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.productImage.list", b24.Params{
    	"productId": 1,
    	"select":    []string{"id", "name", "productId", "type", "createTime", "downloadUrl", "detailUrl"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.productImage.list: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "productImages": [
            {
                "createTime": "2023-08-21T12:12:19+03:00",
                "detailUrl": "https:\/\/cdn-ru.bitrix24.ru\/b1234567\/iblock\/c3e\/c3e6943a5f28fb70dc0051fc74352d4f\/FTTH.jpg",
                "downloadUrl": "https:\/\/your-domain.bitrix24.ru\/rest\/1\/xxxxxxxxxxxxxxxx\/download\/?token=catalog%7CaWQ9MjI0MjEmXz1nYXc0RVlHaWo2cHJZTGNCS2VBa21lQTZkdVJwZ0tpNw%3D%3D%7C...",
                "id": 22421,
                "name": "FTTH.jpg",
                "productId": 533,
                "type": "MORE_PHOTO"
            }
        ]
    },
    "total": 1,
    "time": {
        "start": 1793615807,
        "finish": 1793615807.756784,
        "duration": 0.7567839622497559,
        "processing": 0,
        "date_start": "2026-11-02T13:36:47+03:00",
        "date_finish": "2026-11-02T13:36:47+03:00",
        "operating_reset_at": 1793616360,
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
|| **result.productImages**
[`catalog_product_image[]`](../data-types.md#catalog_product_image) | Массив изображений товара. Если изображений нет, возвращается пустой массив ||
|| **total**
[`integer`](../../data-types.md) | Количество изображений товара ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Product was not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | Access Denied | У пользователя нет права «Просмотр каталога товаров» или «Просмотр товаров каталога» либо права на чтение товара ||
|| `400` | `100` | Could not find value for parameter {productId} | Не передан обязательный параметр `productId` ||
|| `400` | `0` | Empty productID | В `productId` передан `0` или отрицательное число ||
|| `400` | `0` | Product was not found | Товар с указанным `productId` не найден ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-image-add.md)
- [{#T}](./catalog-product-image-get.md)
- [{#T}](./catalog-product-image-delete.md)
- [{#T}](./catalog-product-image-get-fields.md)