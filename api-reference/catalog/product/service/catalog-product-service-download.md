# Скачать файлы услуги catalog.product.service.download

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с одним из прав «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара» и правом на чтение элементов инфоблока каталога

Метод `catalog.product.service.download` скачивает файл услуги.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Параметры файла услуги [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fileId***
[`integer`](../../../data-types.md) | Идентификатор файла. Получить его можно методом [catalog.product.service.get](./catalog-product-service-get.md) или [catalog.product.service.list](./catalog-product-service-list.md): поле `id` в `detailPicture`, `previewPicture` или в значении файлового свойства ||
|| **productId***
[`catalog_product_service.id`](../../data-types.md#catalog_product_service) | Идентификатор услуги. Идентификатор можно получить методом [catalog.product.service.list](./catalog-product-service-list.md) ||
|| **fieldName***
[`string`](../../../data-types.md) | Имя поля (свойства или поля элемента информационного блока), в котором хранится файл. Возможные значения:
- `detailPicture` — детальная картинка
- `previewPicture` — картинка для анонса
- `propertyN` — файловое свойство, где `N` — идентификатор или символьный код свойства, например `property258` или `propertyMorePhoto`

Получить идентификаторы и символьные коды свойств услуги можно методом [catalog.productProperty.list](../../product-property/catalog-product-property-list.md). Для скачивания подходят только свойства файлового типа
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"fileId":40055,"productId":7623,"fieldName":"previewPicture"}}' \
    -o service-picture.png \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.service.download
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"fileId":40055,"productId":7623,"fieldName":"previewPicture"},"auth":"**put_access_token_here**"}' \
    -o service-picture.png \
    https://**put_your_bitrix24_address**/rest/catalog.product.service.download
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'catalog.product.service.download',
        params: {
          fields: {
            fileId: 40055,
            productId: 7623,
            fieldName: 'previewPicture',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('File downloaded successfully:', result)
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
      async function downloadServiceFile() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.product.service.download',
            params: {
              fields: {
                fileId: 40055,
                productId: 7623,
                fieldName: 'previewPicture',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('File downloaded successfully:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', downloadServiceFile)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.service.download(
            fields={
                "fileId": 40055,
                "productId": 7623,
                "fieldName": "previewPicture",
            },
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
                'catalog.product.service.download',
                [
                    'fields' => [
                        'fileId'    => 40055,
                        'productId' => 7623,
                        'fieldName' => 'previewPicture',
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
        echo 'Error downloading product service: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.product.service.download',
        {
            fields: {
                fileId: 40055,
                productId: 7623,
                fieldName: 'previewPicture',
            }
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
        'catalog.product.service.download',
        [
            'fields' => [
                'fileId' => 40055,
                'productId' => 7623,
                'fieldName' => 'previewPicture'
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
    res, err := client.Core().Call(ctx, "catalog.product.service.download", b24.Params{
    	"fields": b24.Params{
    		"fileId":    40055,
    		"productId": 7623,
    		"fieldName": "previewPicture",
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.product.service.download: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Метод возвращает сам файл, а не JSON. Тип содержимого в заголовке `Content-Type` соответствует файлу, например `image/png`, имя файла передается в заголовке `Content-Disposition`, например `attachment; filename="ac.png"`.

### Возвращаемые данные

Содержимое файла. Сохраните тело ответа в файл с именем из заголовка `Content-Disposition`. Идентификатор файла можно получить из `detailPicture`, `previewPicture` или файлового свойства в ответе [catalog.product.service.get](./catalog-product-service-get.md).

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"0",
    "error_description":"Required fields: fileId"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | Access Denied | У пользователя нет ни одного из прав «Просмотр каталога товаров», «Просмотр товаров каталога», «Изменение цены продажи товара» ||
|| `400` | `200040300040` | Access Denied | У пользователя нет права на чтение элемента инфоблока каталога ||
|| `400` | Пустое значение | service does not exist. | Услуга с указанным `productId` не найдена ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан параметр `fields` ||
|| `400` | `0` | Required fields: fileId | Не передано обязательное поле. В тексте перечислены недостающие поля ||
|| `400` | `0` | Name file field is not available | В `fieldName` передано поле, которое не хранит файлы ||
|| `400` | `0` | Product file wrong | Файла с указанным `fileId` нет в поле `fieldName` услуги ||
|| `400` | `0` | Product is empty | Файл не найден в хранилище ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-service-add.md)
- [{#T}](./catalog-product-service-update.md)
- [{#T}](./catalog-product-service-get.md)
- [{#T}](./catalog-product-service-list.md)
- [{#T}](./catalog-product-service-delete.md)
- [{#T}](./catalog-product-service-get-fields-by-filter.md)
