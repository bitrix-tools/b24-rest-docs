# Изменить цену товара catalog.price.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Изменение цены продажи товара» и правом изменять цены товара в инфоблоке каталога

Метод `catalog.price.update` изменяет цену товара.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_price.id`](../data-types.md#catalog_price) | Идентификатор цены товара, можно получить методом [catalog.price.list](./catalog-price-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для обновления цены товара ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

Передавайте только поля, которые нужно изменить. Остальные значения метод берет из текущей цены.

#|
|| **Название**
`тип` | **Описание** ||
|| **price**
[`double`](../../data-types.md) | Значение цены. Отрицательное значение вызывает ошибку ||
|| **currency**
[`string`](../../data-types.md) | Код валюты, например `RUB`. Коды валют можно получить методом [crm.currency.list](../../crm/currency/crm-currency-list.md) ||
|| **extraId**
[`catalog_extra.id`](../data-types.md#catalog_extra) | Идентификатор наценки. Идентификатор можно получить методом [catalog.extra.list](../extra/catalog-extra-list.md).

Наценка сохраняется в цене, но цену не пересчитывает. У цены базового типа наценка не сохраняется. Несуществующий идентификатор вызывает ошибку ||
|| **quantityFrom**
[`integer`](../../data-types.md) | Нижняя граница диапазона количества товара. Диапазоны у всех типов цен товара должны совпадать с диапазонами базовой цены ||
|| **quantityTo**
[`integer`](../../data-types.md) | Верхняя граница диапазона количества товара ||
|#

Поля `productId` и `catalogGroupId` изменить нельзя: если передать их в `fields`, метод выполнится без ошибки, но значения не изменятся. Чтобы перенести цену на другой товар или тип цены, удалите ее методом [catalog.price.delete](./catalog-price-delete.md) и создайте новую методом [catalog.price.add](./catalog-price-add.md).

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"fields":{"currency":"RUB","price":5000}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.price.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"fields":{"currency":"RUB","price":5000},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.price.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type PriceUpdateResult = {
      price: {
        catalogGroupId: number
        currency: string
        extraId: number | null
        id: number
        price: number
        productId: number
        quantityFrom: number | null
        quantityTo: number | null
        timestampX: ISODate | null
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<PriceUpdateResult>({
        method: 'catalog.price.update',
        params: {
          id: 1,
          fields: {
            currency: 'RUB',
            price: 5000,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.price.id, result.price.currency, result.price.price)
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
      async function updatePrice() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.price.update',
            params: {
              id: 1,
              fields: {
                currency: 'RUB',
                price: 5000,
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
          console.info(result.price.id, result.price.currency, result.price.price)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updatePrice)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.price.update(
            bitrix_id=1,
            fields={
                "currency": "RUB",
                "price": 5000,
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
                'catalog.price.update',
                [
                    'id' => 1,
                    'fields' => [
                        'currency'       => "RUB",
                        'price'          => 5000
                    ]
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
        'catalog.price.update',
        {
            id: 1,
            fields: {
                currency: "RUB",
                price: 5000
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error().ex);
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.price.update',
        [
            'id' => 1,
            'fields' => [
                'currency' => 'RUB',
                'price' => 5000
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
    res, err := client.Core().Call(ctx, "catalog.price.update", b24.Params{
    	"id": 1,
    	"fields": b24.Params{
    		"currency": "RUB",
    		"price":    5000,
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.price.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "price".
    raw, ok := b24.Unwrap(res.Result, "price")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа price")
    }

    var item struct {
    	CatalogGroupID b24.ID  `json:"catalogGroupId"`
    	Currency       string  `json:"currency"`
    	ID             b24.ID  `json:"id"`
    	Price          float64 `json:"price"`
    	ProductID      b24.ID  `json:"productId"`
    	TimestampX     string  `json:"timestampX"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.CatalogGroupID, item.Currency)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "price": {
            "catalogGroupId": 1,
            "currency": "USD",
            "extraId": null,
            "id": 1,
            "price": 120.75,
            "priceScale": 120.75,
            "productId": 1,
            "quantityFrom": null,
            "quantityTo": null,
            "timestampX": "2024-05-27T12:29:35+02:00"
        }
    },
    "time": {
        "start": 1712327086.69665,
        "finish": 1712327086.95303,
        "duration": 0.256376028060913,
        "processing": 0.0112268924713135,
        "date_start": "2024-05-27T12:29:35+02:00",
        "date_finish": "2024-05-27T12:29:35+02:00",
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
|| **result.price**
[`catalog_price`](../data-types.md#catalog_price) | Объект с информацией о цене товара ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Price is not exists"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300020` | Access Denied | Нет права «Изменение цены продажи товара» ||
|| `400` | `200040300030` | Access Denied | Нет права изменять цены этого товара в инфоблоке каталога ||
|| `400` | `100` | Could not find value for parameter {id} | Не передан обязательный параметр `id` ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан обязательный параметр `fields` ||
|| `400` | `0` | Price is not exists | Цены с указанным `id` нет ||
|| `400` | `0` | Validate price error. Ranges of base price are not equal to another price group range | Переданы `quantityFrom` и `quantityTo`, а у базовой цены товара нет такого же диапазона количества ||
|| `400` | `BX_ERROR` | Неверная цена | В `price` передано отрицательное число ||
|| `400` | `BX_ERROR` | Неверная валюта | Валюты с кодом из `currency` нет ||
|| `400` | `BX_ERROR` | Неверный ID наценки | Наценки с указанным `extraId` нет ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-add.md)
- [{#T}](./catalog-price-get.md)
- [{#T}](./catalog-price-list.md)
- [{#T}](./catalog-price-delete.md)
- [{#T}](./catalog-price-get-fields.md)
- [{#T}](./catalog-price-modify.md)

