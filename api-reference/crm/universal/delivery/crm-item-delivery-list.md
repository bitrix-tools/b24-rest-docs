# Получить список доставок объекта CRM crm.item.delivery.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на чтение объекта CRM, из которого выбираются доставки

Метод `crm.item.delivery.list` возвращает список доставок конкретного объекта CRM. Доставка — это отгрузка заказа, привязанного к объекту CRM.

Метод не поддерживает постраничную навигацию: все доставки объекта приходят одним ответом, параметр `start` не работает, полей `next` и `total` в ответе нет.

Каждый элемент списка содержит тот же краткий набор полей, что возвращает метод [crm.item.delivery.get](./crm-item-delivery-get.md). Набор фиксированный — параметра `select` у метода нет.

Список будет пустым, если у объекта нет привязанных заказов или его тип не поддерживает доставки. Какие объекты CRM поддерживают доставки, описано в [обзоре методов раздела](./index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityId***
[`integer`](../../../data-types.md) | Идентификатор объекта CRM, доставки которого нужно получить. Например, идентификатор сделки ||
|| **entityTypeId***
[`integer`](../../../data-types.md) | Идентификатор [типа объекта CRM](../../data-types.md#object_type). Доставки есть только у сделок и счетов: для них `entityTypeId` равен `2` и `31` соответственно ||
|| **filter**
[`object`](../../../data-types.md) | Фильтр, который сужает выборку доставок объекта CRM [(подробное описание)](#filter) ||
|| **order**
[`object`](../../../data-types.md) | Порядок сортировки в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Допустимые значения `order_N`:
- `asc` — по возрастанию
- `desc` — по убыванию

Сортировать можно по полям объекта [sale_order_shipment](../../../sale/data-types.md#sale_order_shipment). По умолчанию список сортируется по `id` в порядке возрастания ||
|#

### Параметр filter {#filter}

Ключи фильтра — поля объекта [sale_order_shipment](../../../sale/data-types.md#sale_order_shipment), записанные в camelCase. Чаще всего доставки отбирают по полям, которые метод возвращает в ответе, — они перечислены в [описании элемента массива result](#result). Фильтровать можно и по другим полям отгрузки, например по `orderId`.

Ключу можно задать префикс, который уточняет поведение фильтра:

- `=` — равно, работает и с массивами
- `@` — значение входит в переданный массив
- `!=` — не равно
- `>` — больше
- `>=` — больше либо равно
- `<` — меньше
- `<=` — меньше либо равно
- `%` — LIKE, поиск подстроки. Символ `%` в значении передавать не нужно
- `!%` — NOT LIKE, поиск подстроки. Символ `%` в значении передавать не нужно
- `=%` и `%=` — LIKE, символ `%` нужно передавать в значении, например `"мол%"`
- `!=%` и `!%=` — NOT LIKE, символ `%` нужно передавать в значении

Метод всегда добавляет к фильтру собственные условия и игнорирует переданные значения этих ключей. По `=orderId` он берет отгрузки только тех заказов, которые привязаны к объекту CRM. По `=system` и `!deliveryId` он отбрасывает служебные отгрузки и отгрузки без службы доставки. Остальные условия метод применяет вместе со своими, и они могут только сузить выборку.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityId":13127,"entityTypeId":2,"filter":{"@id":[4077,4078]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.delivery.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityId":13127,"entityTypeId":2,"filter":{"@id":[4077,4078]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.delivery.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each DeliveryItem returned in result[]
    type DeliveryItem = {
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
      // crm.item.delivery.list has no pagination: it returns every delivery of the CRM item
      // in one response, so the list helpers (callList/fetchList) are not needed here.
      const response = await $b24.actions.v2.call.make<DeliveryItem[]>({
        method: 'crm.item.delivery.list',
        params: {
          entityId: 13127,
          entityTypeId: 2,
          filter: {
            '@id': [4077, 4078],
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Deliveries fetched:', result.length, result)
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
      async function listDeliveries() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // crm.item.delivery.list has no pagination: it returns every delivery of the CRM item
          // in one response, so the list helpers (callList/fetchList) are not needed here.
          const response = await $b24.actions.v2.call.make({
            method: 'crm.item.delivery.list',
            params: {
              entityId: 13127,
              entityTypeId: 2,
              filter: {
                '@id': [4077, 4078],
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
          console.info('Deliveries fetched:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listDeliveries)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.item.delivery.list(
            entity_id=13127,
            entity_type_id=2,
            filter={
                "@id": [
                    4077,
                    4078,
                ],
            },
        ).response
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
                'crm.item.delivery.list',
                [
                    'entityId'     => 13127,
                    'entityTypeId' => 2,
                    'filter'       => [
                        '@id' => [4077, 4078]
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching delivery list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.delivery.list', {
            entityId: 13127,
            entityTypeId: 2,
            filter: {
                "@id": [4077, 4078]
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
        'crm.item.delivery.list',
        [
            'entityId' => 13127,
            'entityTypeId' => 2,
            'filter' => [
                "@id" => [4077, 4078]
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
    res, err := client.Core().Call(ctx, "crm.item.delivery.list", b24.Params{
    	"entityId":     13127,
    	"entityTypeId": 2,
    	"filter": b24.Params{
    		"@id": []int{4077, 4078},
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.item.delivery.list: %w", err)
    }

    var items []struct {
    	ID            b24.ID  `json:"id"`
    	AccountNumber string  `json:"accountNumber"`
    	Deducted      string  `json:"deducted"`
    	DateDeducted  *string `json:"dateDeducted"`
    	DeliveryID    b24.ID  `json:"deliveryId"`
    	PriceDelivery float64 `json:"priceDelivery"`
    	Currency      string  `json:"currency"`
    	DeliveryName  string  `json:"deliveryName"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    // Метод отдает все доставки объекта сразу, поэтому res.Total и res.Next
    // не заполняются и обходить страницы через client.Core().Pages не нужно.
    for _, it := range items {
    	fmt.Println(it.ID, it.AccountNumber, it.DeliveryName)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
   "result":[
      {
         "id":4077,
         "accountNumber":"3657\/2",
         "deducted":"N",
         "dateDeducted":null,
         "deliveryId":228,
         "priceDelivery":79.99,
         "currency":"RUB",
         "deliveryName":"Uber Taxi (Cargo)"
      },
      {
         "id":4078,
         "accountNumber":"3657\/3",
         "deducted":"N",
         "dateDeducted":null,
         "deliveryId":228,
         "priceDelivery":79.99,
         "currency":"RUB",
         "deliveryName":"Uber Taxi (Cargo)"
      }
   ],
   "time":{
      "start":1716369036.246855,
      "finish":1716369036.734466,
      "duration":0.4876110553741455,
      "processing":0.18442106246948242,
      "date_start":"2024-05-22T12:10:36+03:00",
      "date_finish":"2024-05-22T12:10:36+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../data-types.md) | Массив объектов с краткой информацией о выбранных доставках [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент массива result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`sale_order_shipment.id`](../../../sale/data-types.md#sale_order_shipment) | Идентификатор доставки. С ним работает метод [crm.item.delivery.get](./crm-item-delivery-get.md) ||
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
   "error":"100",
   "error_description":"Could not find value for parameter {entityId}"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {entityId} | Не передан обязательный параметр `entityId` ||
|| `400` | `100` | Could not find value for parameter {entityTypeId} | Не передан обязательный параметр `entityTypeId` ||
|| `400` | `100` | Invalid value {value} to match with parameter {entityId}. Should be value of type int | Значение `entityId` или `entityTypeId` не приводится к целому числу. В тексте ошибки указано имя конкретного параметра ||
|| `400` | `100` | Invalid value {value} to match with parameter {filter}. Should be value of type array | Значение `filter` или `order` передано не объектом. В тексте ошибки указано имя конкретного параметра ||
|| `400` | `ACCESS_DENIED` | Access denied | У пользователя нет права на чтение объекта CRM, доставки которого запрашиваются. Эту же ошибку метод возвращает, если пара `entityId` и `entityTypeId` не указывает на объект CRM — например, когда `entityId` равен `0` ||
|#

{% include notitle [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-item-delivery-get.md)
- [{#T}](./index.md)
- [{#T}](../payment/delivery-in-payment/index.md)
- [{#T}](../../../sale/shipment/sale-shipment-list.md)
