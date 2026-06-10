# Изменить цену товара catalog.price.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Изменение цены продажи товара»

Метод `catalog.price.update` изменяет цену товара.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_price.id`](../data-types.md#catalog_price) | Идентификатор цены товара ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для обновления цены товара ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **price***
[`double`](../../data-types.md) | Значение цены ||
|| **currency***
[`string`](../../data-types.md) | Идентификатор валюты, можно получить методом [crm.currency.list](../../crm/currency/crm-currency-list.md) ||
|#

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
    
        if ($result->error()) {
            error_log($result->error()->ex);
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating price: ' . $e->getMessage();
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
|| **price**
[`catalog_price`](../data-types.md#catalog_price) | Объект с информацией о цене товара ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 0,
    "error_description":"Required fields: price, currency"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `200040300020` | Access Denied | Недостаточно прав на редактирование цены ||
|| `200040300030` | Access Denied | Недостаточно прав на редактирование товара ||
|| `100` | Could not find value for parameter {fields} | Не указан или пустой параметр `fields` ||
|| `100` | Could not find value for parameter {id} | Не указан параметр `id` || 
|| `-` | Price is not exists | Цены товара с таким идентификатором не существует || 
|| `0` | Required fields:  | Не переданы обязательные поля ||
|| `0` | | Другие ошибки || 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-add.md)
- [{#T}](./catalog-price-get.md)
- [{#T}](./catalog-price-list.md)
- [{#T}](./catalog-price-delete.md)
- [{#T}](./catalog-price-get-fields.md)
- [{#T}](./catalog-price-modify.md)

