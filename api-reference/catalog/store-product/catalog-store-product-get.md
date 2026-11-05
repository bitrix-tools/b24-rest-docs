# Получить остатки товара на складе по идентификатору catalog.storeproduct.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Просмотр и выбор склада»

Метод `catalog.storeproduct.get` возвращает остаток и резерв товара на складе по идентификатору записи остатка.

Метод возвращает запись, только если ее склад доступен пользователю по праву «Просмотр и выбор склада». Запись недоступного склада метод не отдает и возвращает ошибку «не найдено».

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_storeproduct.id`](../data-types.md#catalog_storeproduct) | Идентификатор записи остатка — не идентификатор товара.

Получить идентификатор записи по товару и складу можно методом [catalog.storeproduct.list](./catalog-store-product-list.md) с фильтром `{"productId": ..., "storeId": ...}` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":3}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.storeproduct.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":3,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.storeproduct.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type StoreProductGetResult = {
      storeProduct: {
        amount: number | null
        id: number
        productId: number
        quantityReserved: number | null
        storeId: number
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<StoreProductGetResult>({
        method: 'catalog.storeproduct.get',
        params: {
          id: 3,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Amount:', result.storeProduct.amount, 'Reserved:', result.storeProduct.quantityReserved)
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
      async function getStoreProduct() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.storeproduct.get',
            params: {
              id: 3,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Amount:', result.storeProduct.amount, 'Reserved:', result.storeProduct.quantityReserved)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getStoreProduct)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.storeproduct.get(
            bitrix_id=3,
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
                'catalog.storeproduct.get',
                [
                    'id' => 3,
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
        'catalog.storeproduct.get',
        {
            id: 3,
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
        'catalog.storeproduct.get',
        [
            'id' => 3,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.storeproduct.get", b24.Params{
    	"id": 3,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.storeproduct.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "storeProduct".
    raw, ok := b24.Unwrap(res.Result, "storeProduct")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа storeProduct")
    }

    // amount и quantityReserved могут прийти как null, поэтому для них указатели.
    var item struct {
    	ID               b24.ID   `json:"id"`
    	ProductID        b24.ID   `json:"productId"`
    	StoreID          b24.ID   `json:"storeId"`
    	Amount           *float64 `json:"amount"`
    	QuantityReserved *float64 `json:"quantityReserved"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.StoreID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "storeProduct": {
            "amount": 15,
            "id": 3,
            "productId": 6595,
            "quantityReserved": 30,
            "storeId": 1
        }
    },
    "time": {
        "start": 1793874771,
        "finish": 1793874771.975931,
        "duration": 0.97593092918396,
        "processing": 0,
        "date_start": "2026-11-05T13:32:51+03:00",
        "date_finish": "2026-11-05T13:32:51+03:00",
        "operating_reset_at": 1793875320,
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
|| **result.storeProduct**
[`catalog_storeproduct`](../data-types.md#catalog_storeproduct) | Запись остатка: товар, склад, количество на складе и резерв. Если остаток или резерв не заполнены, `amount` и `quantityReserved` приходят со значением `null` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "storeProduct does not exist."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | Access Denied | У пользователя нет ни права «Просмотр каталога товаров», ни права «Просмотр и выбор склада» ||
|| `400` | Пустое значение | storeProduct does not exist. | Записи остатка с таким `id` нет или ее склад недоступен пользователю. Ту же ошибку метод возвращает, если в `id` передана строка, которая не является числом ||
|| `400` | `100` | Could not find value for parameter {id} | Не передан параметр `id` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-store-product-list.md)
- [{#T}](./catalog-store-product-get-fields.md)
