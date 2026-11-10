# Получить информацию о доставке по id crm.item.delivery.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на чтение заказа, к которому относится доставка

Метод `crm.item.delivery.get` возвращает краткую информацию о доставке.

Доставка — это отгрузка заказа, привязанного к объекту CRM. Метод возвращает фиксированный набор полей — выбрать другие поля отгрузки нельзя. Полный набор возвращает метод [sale.shipment.get](../../../sale/shipment/sale-shipment-get.md), но он доступен только администратору.

Как доставки связаны с объектами CRM, описано в [обзоре методов раздела](./index.md).

Метод не проверяет, к какому объекту CRM относится доставка, и вернет любую доставку, доступную пользователю по правам. Метод `crm.item.delivery.list` не включает в список служебные отгрузки и отгрузки без службы доставки, а `crm.item.delivery.get` их возвращает.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order_shipment.id`](../../../sale/data-types.md#sale_order_shipment) | Идентификатор доставки.

Получить идентификаторы доставок объекта CRM можно методом [crm.item.delivery.list](./crm-item-delivery-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":4077}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.delivery.get
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":4077,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.delivery.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type DeliveryGetResult = {
      id: number
      accountNumber: string
      deducted: string
      dateDeducted: ISODate | null
      deliveryId: number
      priceDelivery: number
      currency: string
      deliveryName: string
    }

    try {
      const response = await $b24.actions.v2.call.make<DeliveryGetResult>({
        method: 'crm.item.delivery.get',
        params: {
          id: 4077,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.id, result.deliveryName, result.priceDelivery, result.currency)
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
      async function getDelivery() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.item.delivery.get',
            params: {
              id: 4077,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.id, result.deliveryName, result.priceDelivery, result.currency)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getDelivery)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.item.delivery.get(
            bitrix_id=4077,
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
                'crm.item.delivery.get',
                [
                    'id' => 4077,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting delivery item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.delivery.get', {
            id: 4077,
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
        'crm.item.delivery.get',
        [
            'id' => 4077
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.item.delivery.get", b24.Params{
    	"id": 4077,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.item.delivery.get: %w", err)
    }

    var item struct {
    	ID            b24.ID  `json:"id"`
    	AccountNumber string  `json:"accountNumber"`
    	Deducted      string  `json:"deducted"`
    	DateDeducted  *string `json:"dateDeducted"`
    	DeliveryID    b24.ID  `json:"deliveryId"`
    	PriceDelivery float64 `json:"priceDelivery"`
    	Currency      string  `json:"currency"`
    	DeliveryName  string  `json:"deliveryName"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.AccountNumber, item.DeliveryName)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
   "result":{
      "id":4077,
      "accountNumber":"3657\/2",
      "deducted":"N",
      "dateDeducted":null,
      "deliveryId":228,
      "priceDelivery":79.99,
      "currency":"RUB",
      "deliveryName":"Uber Taxi (Cargo)"
   },
   "time":{
      "start":1716369295.614557,
      "finish":1716369296.143089,
      "duration":0.5285320281982422,
      "processing":0.2371680736541748,
      "date_start":"2024-05-22T12:14:55+03:00",
      "date_finish":"2024-05-22T12:14:56+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с краткой информацией о доставке [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`sale_order_shipment.id`](../../../sale/data-types.md#sale_order_shipment) | Идентификатор доставки ||
|| **accountNumber**
[`string`](../../../data-types.md) | Системный номер доставки. Например, `3657/2` ||
|| **deducted**
[`string`](../../../data-types.md) | Признак того, отгружена ли доставка.

Возможные значения:
- `Y` — отгружена
- `N` — не отгружена ||
|| **dateDeducted**
[`datetime`](../../../data-types.md) | Дата и время последнего изменения признака `deducted`. Поле возвращает `null`, если признак ни разу не меняли ||
|| **deliveryId**
[`sale_delivery_service.id`](../../../sale/data-types.md#sale_delivery_service) | Идентификатор службы доставки. Получить список служб доставки можно методом [sale.delivery.getlist](../../../sale/delivery/delivery/sale-delivery-get-list.md) ||
|| **priceDelivery**
[`double`](../../../data-types.md) | Стоимость доставки ||
|| **currency**
[`string`](../../../data-types.md) | Символьный код валюты доставки. Например, `RUB` ||
|| **deliveryName**
[`string`](../../../data-types.md) | Название службы доставки. Например, `Uber Taxi (Cargo)` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":"0",
   "error_description":"Delivery has not been found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | Delivery has not been found | Доставки с таким `id` нет в Битрикс24 ||
|| `400` | `100` | Could not find value for parameter {id} | Не передан обязательный параметр `id` ||
|| `400` | `100` | Invalid value {value} to match with parameter {id}. Should be value of type int | Значение `id` не приводится к целому числу ||
|| `400` | `ACCESS_DENIED` | Access denied | У пользователя нет права на чтение заказа, к которому относится доставка. Право на чтение объекта CRM, в котором видна эта доставка, ошибку не снимает ||
|#

{% include notitle [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-item-delivery-list.md)
- [{#T}](./index.md)
- [{#T}](../payment/delivery-in-payment/index.md)
- [{#T}](../../../sale/delivery/delivery/sale-delivery-get-list.md)
