# Удалить головной товар catalog.product.sku.delete

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Удаление товара», правом на просмотр каталога — «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара» — и правом на удаление элемента инфоблока каталога

Метод `catalog.product.sku.delete` удаляет головной товар вместе со всеми его вариациями.

{% note warning "" %}

Метод не проверяет тип товара: с идентификатором простого товара или вариации он удалит этот товар. Перед вызовом проверьте, что идентификатор принадлежит головному товару, методом [catalog.product.sku.get](./catalog-product-sku-get.md).

{% endnote %}

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.sku.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7679,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.sku.delete
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
        method: 'catalog.product.sku.delete',
        params: {
          id: 7679,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Product SKU deleted:', result)
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
      async function deleteProductSku() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.product.sku.delete',
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

          const result = response.getData().result
          console.info('Product SKU deleted:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', deleteProductSku)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.sku.delete(
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
                'catalog.product.sku.delete',
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
        'catalog.product.sku.delete',
        {
            id: 7679,
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
        'catalog.product.sku.delete',
        [
            'id' => 7679
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.product.sku.delete", b24.Params{
    	"id": 7679,
    })
    if err != nil {
    	return fmt.Errorf("catalog.product.sku.delete: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1793893645,
        "finish": 1793893646.139728,
        "duration": 1.13972806930542,
        "processing": 1,
        "date_start": "2026-11-05T18:47:25+03:00",
        "date_finish": "2026-11-05T18:47:26+03:00",
        "operating_reset_at": 1793893740,
        "operating": 2.513129949569702
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат удаления. `true` — головной товар и его вариации удалены ||
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
|| `400` | `200040300040` | Access Denied | У пользователя нет права «Удаление товара» или права на удаление элемента инфоблока каталога ||
|| `400` | Пустое значение | sku does not exist. | Товар с указанным `id` не найден ||
|| `400` | `100` | Could not find value for parameter {id} | Не передан параметр `id` ||
|| `400` | `100` | Invalid value {abc} to match with parameter {id}. Should be value of type int. | В `id` передано не число ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-sku-add.md)
- [{#T}](./catalog-product-sku-update.md)
- [{#T}](./catalog-product-sku-get.md)
- [{#T}](./catalog-product-sku-list.md)
- [{#T}](./catalog-product-sku-download.md)
- [{#T}](./catalog-product-sku-get-fields-by-filter.md)