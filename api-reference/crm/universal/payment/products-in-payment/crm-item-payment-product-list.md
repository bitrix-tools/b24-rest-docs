# Получить список товарных позиций оплаты crm.item.payment.product.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Чтение» для объекта CRM, к которому относится оплата

Метод `crm.item.payment.product.list` возвращает все товарные позиции оплаты одним ответом, без постраничной навигации.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **paymentId***
[`sale_order_payment.id`](../../../../sale/data-types.md#sale_order_payment) | Идентификатор оплаты. Получить идентификаторы оплат объекта CRM можно методом [crm.item.payment.list](../crm-item-payment-list.md) ||
|| **filter**
[`object`](../../../../data-types.md) | Фильтр в формате `{"поле": "значение"}`. Доступные поля:
- `id` — идентификатор товарной позиции в оплате
- `quantity` — количество
- `entityId` — идентификатор товара в корзине заказа

К ключу можно добавить префикс оператора:
- `=` — равно, используется по умолчанию
- `!=` — не равно
- `>`, `>=`, `<`, `<=` — больше, больше или равно, меньше, меньше или равно
- `@` — входит в массив значений
- `!@` — не входит в массив значений

Все поля фильтра числовые, поэтому операторы поиска по подстроке `%`, `=%`, `%=` и их отрицания не подходят: метод принимает их без ошибки, но совпадений не находит.

Если передать другое поле, метод вернет ошибку `Internal server error.` По умолчанию фильтр не применяется. В Python SDK `filter` — обязательный аргумент метода: если фильтр не нужен, передайте `{}` ||
|| **order**
[`object`](../../../../data-types.md) | Сортировка в формате `{"поле": "направление"}`. Поля те же, что в `filter`. Направление:
- `ASC` — по возрастанию
- `DESC` — по убыванию

По умолчанию `{"id": "ASC"}` ||
|#

Метод не поддерживает параметр `start`: все позиции оплаты возвращаются в одном ответе.

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"paymentId":1039,"filter":{"\u003E=quantity":2,"@id":[1195,1196]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.payment.product.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"paymentId":1039,"filter":{"\u003E=quantity":2,"@id":[1195,1196]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.payment.product.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each item returned in result[]
    type PaymentProductItem = {
      id: number,
      paymentId: number,
      quantity: number,
      entityId?: number,
      rowId?: number,
    }

    try {
      const response = await $b24.actions.v2.call.make<PaymentProductItem[]>({
        method: 'crm.item.payment.product.list',
        params: {
          paymentId: 1039,
          filter: {
            '>=quantity': 2,
            '@id': [1195, 1196],
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Payment products:', result.length, result)
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
      async function fetchPaymentProductList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.item.payment.product.list',
            params: {
              paymentId: 1039,
              filter: {
                '>=quantity': 2,
                '@id': [1195, 1196],
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
          console.info('Payment products:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchPaymentProductList)
    </script>
    ```

- Python

    Пример

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.item.payment.product.list(
            payment_id=1039,
            filter={
                ">=quantity": 2,
                "@id": [
                    1195,
                    1196,
                ],
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

    Пример `as_list`

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.item.payment.product.list(
            payment_id=1039,
            filter={
                ">=quantity": 2,
                "@id": [
                    1195,
                    1196,
                ],
            },
        ).as_list().response
        result = bitrix_response.result
        for item in result:
            print(item)
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
                'crm.item.payment.product.list',
                [
                    'paymentId' => 1039,
                    'filter'    => [
                        '>=quantity' => 2,
                        '@id'        => [1195, 1196],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching payment product list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.payment.product.list', {
            paymentId: 1039,
            filter: {
                ">=quantity": 2,
                "@id": [1195, 1196],
            },
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.item.payment.product.list',
        [
            'paymentId' => 1039,
            'filter' => [
                ">=quantity" => 2,
                "@id" => [1195, 1196],
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
    res, err := client.Core().Call(ctx, "crm.item.payment.product.list", b24.Params{
    	"paymentId": 1039,
    	"filter": b24.Params{
    		">=quantity": 2,
    		"@id":        []int{1195, 1196},
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.item.payment.product.list: %w", err)
    }

    var items []struct {
        ID        b24.ID  `json:"id"`
        PaymentID b24.ID  `json:"paymentId"`
        Quantity  int     `json:"quantity"`
        EntityID  *b24.ID `json:"entityId"`
        RowID     *b24.ID `json:"rowId"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID, it.PaymentID)
    }

    // Total и Next заполняют списочные методы; для полного
    // обхода списка есть client.Core().Pages и Scan.
    if res.Total != nil {
    	fmt.Println("всего:", *res.Total)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
   "result":[
      {
         "id":433,
         "paymentId":553,
         "quantity":2,
         "entityId":1349
      }
   ],
   "time":{
      "start":1790581835,
      "finish":1790581835.956596,
      "duration":0.9565958976745605,
      "processing":0,
      "date_start":"2026-09-28T10:50:35+03:00",
      "date_finish":"2026-09-28T10:50:35+03:00",
      "operating_reset_at":1790582435,
      "operating":0
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`crm_item_payment_product[]`](#crm_item_payment_product) | Массив товарных позиций оплаты [(подробное описание)](#crm_item_payment_product). Если позиций нет, возвращается пустой массив ||
|| **time**
[`time`](../../../../data-types.md) | Информация о времени выполнения запроса ||
|#

#### crm_item_payment_product {#crm_item_payment_product}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../../data-types.md) | Идентификатор товарной позиции в оплате ||
|| **paymentId**
[`sale_order_payment.id`](../../../../sale/data-types.md#sale_order_payment) | Идентификатор оплаты ||
|| **quantity**
[`double`](../../../../data-types.md) | Количество товара ||
|| **entityId**
[`integer`](../../../../data-types.md) | Идентификатор товарной позиции заказа. Возвращается, если позиция оплаты не сопоставлена с товарной строкой объекта CRM ||
|| **rowId**
[`integer`](../../../../data-types.md) | Идентификатор товарной строки объекта CRM. Возвращается, если позиция оплаты сопоставлена с товарной строкой объекта CRM ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Payment has not been found"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | Payment has not been found | Оплата с переданным `paymentId` не найдена ||
|| `400` | `ACCESS_DENIED` | Access denied | У пользователя нет права на чтение оплаты ||
|| `400` | `100` | Internal server error. | В `filter` или `order` передано неподдерживаемое поле ||
|| `400` | `100` | Could not find value for parameter {paymentId} | Не передан обязательный параметр `paymentId` ||
|#

Код `0` метод возвращает для нескольких разных ошибок. Чтобы определить причину, проверяйте текст в `error_description`.

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-item-payment-product-add.md)
- [{#T}](./crm-item-payment-product-delete.md)
- [{#T}](./crm-item-payment-product-set-quantity.md)
