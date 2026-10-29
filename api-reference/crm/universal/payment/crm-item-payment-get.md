# Получить информацию об оплате crm.item.payment.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на чтение заказа, к которому относится оплата

Метод `crm.item.payment.get` возвращает статус, сумму и платежную систему оплаты по ее идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order_payment.id`](../../../sale/data-types.md#sale_order_payment) | Идентификатор оплаты. Получить идентификаторы оплат объекта CRM можно методом [crm.item.payment.list](./crm-item-payment-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1036}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.payment.get
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1036,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.payment.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type PaymentGetResult = {
      id: number
      accountNumber: string
      paid: 'Y' | 'N'
      datePaid: ISODate | null
      empPaidId: number
      paySystemId: number
      sum: number
      currency: string
      paySystemName: string
    }

    try {
      const response = await $b24.actions.v2.call.make<PaymentGetResult>({
        method: 'crm.item.payment.get',
        params: {
          id: 1036,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.id, result.accountNumber, result.paid, result.sum, result.currency)
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
      async function getPayment() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.item.payment.get',
            params: {
              id: 1036,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.id, result.accountNumber, result.paid, result.sum, result.currency)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getPayment)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.item.payment.get(
            bitrix_id=1036,
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
                'crm.item.payment.get',
                [
                    'id' => 1036,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting payment item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.payment.get', {
            id: 1036,
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
        'crm.item.payment.get',
        [
            'id' => 1036
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.item.payment.get", b24.Params{
    	"id": 1036,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.item.payment.get: %w", err)
    }

    var item struct {
    	ID            b24.ID `json:"id"`
    	AccountNumber string `json:"accountNumber"`
    	Paid          string `json:"paid"`
    	DatePaid      string `json:"datePaid"`
    	EmpPaidID     b24.ID `json:"empPaidId"`
    	PaySystemID   b24.ID `json:"paySystemId"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.AccountNumber)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "id": 1036,
        "accountNumber": "1049/1",
        "paid": "Y",
        "datePaid": "2026-10-28T18:59:33+03:00",
        "empPaidId": 1,
        "paySystemId": 11,
        "sum": 3000,
        "currency": "RUB",
        "paySystemName": "Наличные"
    },
    "time": {
        "start": 1793203175,
        "finish": 1793203175.965445,
        "duration": 0.9654450416564941,
        "processing": 0,
        "date_start": "2026-10-28T18:59:35+03:00",
        "date_finish": "2026-10-28T18:59:35+03:00",
        "operating_reset_at": 1793203740,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`sale_order_payment_crm_simple`](#sale_order_payment_crm_simple) | Данные оплаты [(подробное описание)](#sale_order_payment_crm_simple) ||
|| **time**
[`time`](../../../../api-reference/data-types.md) | Информация о времени выполнения запроса ||
|#

#### sale_order_payment_crm_simple {#sale_order_payment_crm_simple}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`sale_order_payment.id`](../../../sale/data-types.md#sale_order_payment) | Идентификатор оплаты ||
|| **accountNumber**
[`string`](../../../../api-reference/data-types.md) | Номер оплаты в формате `номер заказа/порядковый номер оплаты`, например `1045/1` ||
|| **paid**
[`string`](../../../../api-reference/data-types.md) | Статус оплаты:
- `Y` — оплачена
- `N` — не оплачена ||
|| **datePaid**
[`datetime`](../../../../api-reference/data-types.md) | Дата и время, когда оплату последний раз отметили оплаченной. `null`, если оплату ни разу не проводили.

После [crm.item.payment.unpay](./crm-item-payment-unpay.md) значение сохраняется ||
|| **empPaidId**
[`user.id`](../../../../api-reference/data-types.md) | Идентификатор пользователя, который последним отметил оплату оплаченной. `null`, если оплату ни разу не проводили.

После [crm.item.payment.unpay](./crm-item-payment-unpay.md) значение сохраняется ||
|| **paySystemId**
[`sale_paysystem.id`](../../../sale/data-types.md#sale_paysystem) | Идентификатор платежной системы ||
|| **sum**
[`double`](../../../../api-reference/data-types.md) | Сумма оплаты. Пересчитывается автоматически, когда в оплату добавляют или из нее удаляют товары и доставку ||
|| **currency**
[`string`](../../../../api-reference/data-types.md) | Валюта оплаты ||
|| **paySystemName**
[`string`](../../../../api-reference/data-types.md) | Название платежной системы ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Payment has not been found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | Payment has not been found | Оплата с переданным `id` не найдена ||
|| `400` | `ACCESS_DENIED` | Access denied | Нет права на чтение заказа, к которому относится оплата ||
|| `400` | `100` | Could not find value for parameter {id} | Не передан обязательный параметр `id` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./products-in-payment/index.md)
- [{#T}](./delivery-in-payment/index.md)
- [{#T}](./crm-item-payment-update.md)
- [{#T}](./crm-item-payment-delete.md)
- [{#T}](./crm-item-payment-list.md)
- [{#T}](./crm-item-payment-pay.md)
- [{#T}](./crm-item-payment-unpay.md)
- [{#T}](./crm-item-payment-add.md)