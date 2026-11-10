# Добавить изображение в товар catalog.productImage.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр товаров каталога» и правом на изменение товара

Метод `catalog.productImage.add` добавляет изображение в товар, головной товар, вариацию или услугу.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями нового изображения [(подробное описание)](#fields) ||
|| **fileContent***
[`array`](../../data-types.md) | Массив из двух элементов:
- первый — название файла с расширением, например `photo.jpg`
- второй — содержимое файла в кодировке [Base64](../../files/how-to-upload-files.md)

Метод проверяет тип файла по расширению в названии: принимаются только расширения изображений ||
|#

### Параметр fields {#fields}

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
|| **type**
[`string`](../../data-types.md) | Тип изображения:
- `DETAIL_PICTURE` — детальное изображение, поле доступно в старой карточке товара. Заменяет текущее детальное изображение
- `PREVIEW_PICTURE` — изображение для анонса, поле доступно в старой карточке товара. Заменяет текущее изображение для анонса
- `MORE_PHOTO` — дополнительное изображение. Добавляется к уже загруженным

По умолчанию — `MORE_PHOTO`. Любое другое значение метод тоже сохраняет как `MORE_PHOTO` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"productId":1,"type":"MORE_PHOTO"},"fileContent":["photo.png","iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP4z8DwHwAFAAH/iZk9HQAAAABJRU5ErkJggg=="]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.productImage.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"productId":1,"type":"MORE_PHOTO"},"fileContent":["photo.png","iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP4z8DwHwAFAAH/iZk9HQAAAABJRU5ErkJggg=="],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.productImage.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ProductImageAddResult = {
      productImage: {
        createTime: ISODate,
        detailUrl: string,
        downloadUrl: string,
        id: number,
        name: string,
        productId: number,
        type: 'DETAIL_PICTURE' | 'PREVIEW_PICTURE' | 'MORE_PHOTO',
      },
    }

    try {
      const response = await $b24.actions.v2.call.make<ProductImageAddResult>({
        method: 'catalog.productImage.add',
        params: {
          fields: {
            productId: 1,
            type: 'MORE_PHOTO',
          },
          fileContent: [
            'photo.png',
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP4z8DwHwAFAAH/iZk9HQAAAABJRU5ErkJggg==',
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.productImage.id, result.productImage.name, result.productImage.type)
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
      async function addProductImage() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.productImage.add',
            params: {
              fields: {
                productId: 1,
                type: 'MORE_PHOTO',
              },
              fileContent: [
                'photo.png',
                'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP4z8DwHwAFAAH/iZk9HQAAAABJRU5ErkJggg==',
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
          console.info(result.productImage.id, result.productImage.name, result.productImage.type)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addProductImage)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product_image.add(
            fields={
                "productId": 1,
                "type": "MORE_PHOTO",
            },
            file_content=[
                "photo.png",
                "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP4z8DwHwAFAAH/iZk9HQAAAABJRU5ErkJggg==",
            ],
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
                'catalog.productImage.add',
                [
                    'fields' => [
                        'productId' => 1,
                        'type' => 'MORE_PHOTO',
                    ],
                    'fileContent' => [
                        'photo.png',
                        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP4z8DwHwAFAAH/iZk9HQAAAABJRU5ErkJggg==',
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
        echo 'Error adding product image: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
    'catalog.productImage.add',
    {
    'fields': {
    'productId': 1,
    'type': 'MORE_PHOTO'
    },
    'fileContent': [
    'photo.png',
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP4z8DwHwAFAAH/iZk9HQAAAABJRU5ErkJggg=='
    ]
    },
    function(result) {
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
        'catalog.productImage.add',
        [
            'fields' => [
                'productId' => 1,
                'type' => 'MORE_PHOTO'
            ],
            'fileContent' => [
                'photo.png',
                'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP4z8DwHwAFAAH/iZk9HQAAAABJRU5ErkJggg=='
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
    res, err := client.Core().Call(ctx, "catalog.productImage.add", b24.Params{
    	"fields": b24.Params{
    		"productId": 1,
    		"type":      "MORE_PHOTO",
    	},
    	"fileContent": []string{"photo.png", "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP4z8DwHwAFAAH/iZk9HQAAAABJRU5ErkJggg=="},
    })
    if err != nil {
    	return fmt.Errorf("catalog.productImage.add: %w", err)
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
        "productImage": {
            "createTime": "2026-11-02T14:23:05+03:00",
            "detailUrl": "https:\/\/cdn-ru.bitrix24.ru\/b1234567\/iblock\/26e\/26e2cde359418039bc36dc25c6c25c88\/photo.png",
            "downloadUrl": "https:\/\/your-domain.bitrix24.ru\/rest\/1\/xxxxxxxxxxxxxxxx\/download\/?token=catalog%7CaWQ9Mzk4NjcmXz1DV3JqWXptcVExY0JxaDVDQWJQa2ZoT29Bak9VSmRWZQ%3D%3D%7C...",
            "id": 39867,
            "name": "photo.png",
            "productId": 533,
            "type": "MORE_PHOTO"
        }
    },
    "time": {
        "start": 1793618585,
        "finish": 1793618585.566613,
        "duration": 0.566612958908081,
        "processing": 0,
        "date_start": "2026-11-02T14:23:05+03:00",
        "date_finish": "2026-11-02T14:23:05+03:00",
        "operating_reset_at": 1793619180,
        "operating": 0.4662008285522461
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **result.productImage**
[`catalog_product_image`](../data-types.md#catalog_product_image) | Объект с информацией о добавленном изображении товара ||
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
|| `400` | `200040300020` | Access Denied | У пользователя нет права «Просмотр товаров каталога» или права на изменение товара ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан обязательный параметр `fields` ||
|| `400` | `100` | Could not find value for parameter {fileContent} | Не передан обязательный параметр `fileContent` ||
|| `400` | `0` | Required fields: productId | В `fields` не передано поле `productId` ||
|| `400` | `0` | Product was not found | Товар с указанным `productId` не найден ||
|| `400` | `0` | Could not save image. | В `fileContent` нет названия или содержимого файла ||
|| `400` | `0` | Неверный тип файла (txt) | Расширение в названии файла не относится к изображениям или название пустое. В скобках — переданное расширение ||
|| `400` | `0` | Имя файла содержит некорректные символы. | В названии файла есть недопустимые символы ||
|| `400` | `0` | Слишком длинное имя файла. | Название файла превышает допустимую длину ||
|| `400` | `0` | Превышен максимальный размер загружаемого файла | Размер файла превышает ограничение Битрикс24 ||
|| `400` | `0` | Превышено ограничение дискового пространства. | На диске Битрикс24 недостаточно места ||
|| `400` | `0` | Image product property does not exists. Create MORE_PHOTO property | В каталоге нет свойства с кодом `MORE_PHOTO` для дополнительных изображений ||
|| `400` | `0` | Image product property does not active. Activate MORE_PHOTO property | Свойство `MORE_PHOTO` неактивно ||
|| `400` | `0` | Image product property is of the wrong type | Свойство `MORE_PHOTO` не является свойством типа «Файл» ||
|| `400` | `0` | Product image was not saved. | Изображение для анонса или детальное изображение не сохранилось в товаре, изменения отменены ||
|| `400` | `0` | Internal error adding product image. Try adding again. | Ошибка базы данных при сохранении. Повторите запрос ||
|| `400` | `0` | Empty image. | После сохранения у товара не найдено дополнительных изображений ||
|#

Тексты ошибок проверки файла приходят на языке Битрикс24.

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-image-get.md)
- [{#T}](./catalog-product-image-list.md)
- [{#T}](./catalog-product-image-delete.md)
- [{#T}](./catalog-product-image-get-fields.md)
