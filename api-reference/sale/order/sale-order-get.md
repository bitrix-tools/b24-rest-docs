# Получить значения полей заказа и связанных объектов sale.order.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.order.get` возвращает все поля заказа вместе со связанными объектами, например позициями корзины, оплатами, отгрузками, значениями свойств и клиентами CRM. Чтобы получить только поля самого заказа или несколько заказов сразу, используйте [sale.order.list](./sale-order-list.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order.id`](../data-types.md#sale_order) | Идентификатор заказа. Его возвращают методы [sale.order.add](./sale-order-add.md) и [sale.order.list](./sale-order-list.md). Не путайте с номером заказа `accountNumber` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":236}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.order.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":236,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.order.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type OrderGetResult = {
      order: {
        id: number
        accountNumber: string
        currency: string
        price: number
        payed: string
        canceled: string
        statusId: string
        userId: number
        personTypeId: number
        dateInsert: ISODate | null
        dateUpdate: ISODate | null
        basketItems: Record<string, unknown>[]
        payments: Record<string, unknown>[]
        shipments: Record<string, unknown>[]
        propertyValues: Record<string, unknown>[]
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<OrderGetResult>({
        method: 'sale.order.get',
        params: {
          id: 236,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Order #' + result.order.accountNumber, 'status:', result.order.statusId, 'total:', result.order.price, result.order.currency)
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
      async function getOrder() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.order.get',
            params: {
              id: 236,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Order #' + result.order.accountNumber, 'status:', result.order.statusId, 'total:', result.order.price, result.order.currency)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getOrder)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.sale.order.get(
            bitrix_id=236,
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
                'sale.order.get',
                [
                    'id' => 236
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        // SDK throws an exception on API errors, so here the call has succeeded
        echo 'Order data: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting order: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.order.get", {
            "id": 236
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
        'sale.order.get',
        [
            'id' => 236
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "sale.order.get", b24.Params{
    	"id": 236,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("sale.order.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "order".
    raw, ok := b24.Unwrap(res.Result, "order")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа order")
    }

    var item struct {
    	AccountNumber  string `json:"accountNumber"`
    	AdditionalInfo string `json:"additionalInfo"`
    	Canceled       string `json:"canceled"`
    	Comments       string `json:"comments"`
    	CompanyID      b24.ID `json:"companyId"`
    	Currency       string `json:"currency"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.AccountNumber, item.AdditionalInfo)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "order": {
            "accountNumber": "392",
            "additionalInfo": "",
            "affiliateId": null,
            "basketItems": [
                {
                    "barcodeMulti": "N",
                    "basePrice": 980,
                    "canBuy": "Y",
                    "catalogXmlId": "cbc2957f-09fc-4b2a-b9de-6f925c4c9047",
                    "currency": "RUB",
                    "customPrice": "N",
                    "dateInsert": "2024-02-28T17:35:06+03:00",
                    "dateRefresh": null,
                    "dateUpdate": "2024-02-28T17:37:08+03:00",
                    "detailPageUrl": "",
                    "dimensions": "a:3:{s:5:\u0022WIDTH\u0022;N;s:6:\u0022HEIGHT\u0022;N;s:6:\u0022LENGTH\u0022;N;}",
                    "discountCoupon": "",
                    "discountName": "",
                    "discountPrice": 0,
                    "discountValue": "",
                    "fuserId": 4,
                    "id": "255",
                    "lid": "s1",
                    "measureCode": "796",
                    "measureName": "шт",
                    "module": "catalog",
                    "name": "Футболка Мужской Огонь",
                    "notes": "BASE",
                    "orderId": "236",
                    "price": 980,
                    "priceTypeId": 1,
                    "productId": 348,
                    "productPriceId": 112,
                    "productProviderClass": "\\Bitrix\\Catalog\\Product\\CatalogProvider",
                    "productXmlId": "1000000386",
                    "properties": [
                        {
                            "basketId": 255,
                            "code": "CATALOG.XML_ID",
                            "id": 139,
                            "name": "Catalog XML_ID",
                            "sort": 100,
                            "value": "cbc2957f-09fc-4b2a-b9de-6f925c4c9047",
                            "xmlId": "bx_65df52a9ac502"
                        },
                        {
                            "basketId": 255,
                            "code": "PRODUCT.XML_ID",
                            "id": 140,
                            "name": "Product XML_ID",
                            "sort": 100,
                            "value": "1000000386",
                            "xmlId": "bx_65df52a9ace55"
                        }
                    ],
                    "quantity": 1,
                    "recommendation": "",
                    "reservations": [
                        {
                            "basketId": 255,
                            "dateReserve": "2024-02-28T17:36:51+03:00",
                            "dateReserveEnd": "2024-03-01T23:00:00+03:00",
                            "id": 39,
                            "quantity": 1,
                            "reservedBy": null,
                            "storeId": 1
                        }
                    ],
                    "setParentId": "",
                    "sort": 100,
                    "subscribe": "N",
                    "type": "",
                    "vatIncluded": "Y",
                    "vatRate": 0.2,
                    "weight": 0,
                    "xmlId": "bx_65df52a9ab47f"
                }
            ],
            "canceled": "N",
            "clients": [
                {
                    "entityId": 6,
                    "entityTypeId": 3,
                    "id": 901,
                    "isPrimary": "Y",
                    "orderId": 236,
                    "roleId": 0,
                    "sort": 0
                }
            ],
            "comments": "",
            "companyId": 0,
            "currency": "RUB",
            "dateCanceled": null,
            "dateInsert": "2024-02-28T17:36:55+03:00",
            "dateLock": null,
            "dateMarked": null,
            "dateStatus": "2024-02-28T17:36:38+03:00",
            "dateUpdate": "2024-02-28T17:37:11+03:00",
            "deducted": "N",
            "discountValue": 0,
            "empCanceledId": null,
            "empMarkedId": null,
            "empStatusId": 1,
            "externalOrder": "N",
            "id": 236,
            "id1c": "",
            "lid": "s1",
            "lockedBy": "",
            "marked": "N",
            "orderTopic": "",
            "payed": "N",
            "payments": [
                {
                    "accountNumber": "392\/1",
                    "comments": "",
                    "companyId": 0,
                    "currency": "RUB",
                    "dateBill": "2024-02-28T17:36:44+03:00",
                    "dateMarked": null,
                    "datePaid": null,
                    "datePayBefore": null,
                    "dateResponsibleId": null,
                    "empMarkedId": null,
                    "empPaidId": null,
                    "empResponsibleId": null,
                    "empReturnId": null,
                    "externalPayment": "N",
                    "id": 123,
                    "id1c": "",
                    "isReturn": "N",
                    "marked": "N",
                    "orderId": 236,
                    "paid": "N",
                    "payReturnComment": "",
                    "payReturnDate": null,
                    "payReturnNum": "",
                    "paySystemId": 48,
                    "paySystemIsCash": "N",
                    "paySystemName": "Оплата картой",
                    "paySystemXmlId": "bx_65df3d512af59",
                    "payVoucherDate": null,
                    "payVoucherNum": "",
                    "priceCod": "0",
                    "psCurrency": "",
                    "psInvoiceId": 2,
                    "psResponseDate": null,
                    "psStatus": "",
                    "psStatusCode": "",
                    "psStatusDescription": "",
                    "psStatusMessage": "",
                    "psSum": null,
                    "reasonMarked": "",
                    "responsibleId": null,
                    "sum": 1480,
                    "updated1c": "N",
                    "version1c": "",
                    "xmlId": "bx_65df530c472fa"
                }
            ],
            "personTypeId": 3,
            "personTypeXmlId": "",
            "price": 1480,
            "propertyValues": [
                {
                    "code": "FIO",
                    "id": 1514,
                    "name": "Имя Фамилия",
                    "orderPropsId": 20,
                    "orderPropsXmlId": null,
                    "value": "Иван Иванов"
                },
                {
                    "code": "EMAIL",
                    "id": 1515,
                    "name": "E-Mail1",
                    "orderPropsId": 21,
                    "orderPropsXmlId": "bx_63a082af0d250",
                    "value": "email@mail.ru"
                },
                {
                    "code": "PHONE",
                    "id": 1516,
                    "name": "Телефон1",
                    "orderPropsId": 22,
                    "orderPropsXmlId": "bx_63a082a06864d",
                    "value": "79814561312"
                },
                {
                    "code": "CONTACT_ADDRESS",
                    "id": 1517,
                    "name": "Адрес",
                    "orderPropsId": 42,
                    "orderPropsXmlId": null,
                    "value": null
                },
                {
                    "code": "ADDRESS",
                    "id": 1518,
                    "name": "Адрес доставки",
                    "orderPropsId": 26,
                    "orderPropsXmlId": null,
                    "value": "test"
                }
            ],
            "reasonCanceled": "",
            "reasonMarked": "",
            "recountFlag": "Y",
            "recurringId": "",
            "requisiteLink": {
                "bankDetailId": 0,
                "mcBankDetailId": 0,
                "mcRequisiteId": 0,
                "requisiteId": 3
            },
            "responsibleId": 1,
            "shipments": [
                {
                    "accountNumber": "392\/2",
                    "allowDelivery": "N",
                    "basePriceDelivery": 500,
                    "canceled": "N",
                    "comments": "",
                    "companyId": 0,
                    "currency": "RUB",
                    "customPriceDelivery": "N",
                    "dateAllowDelivery": null,
                    "dateCanceled": null,
                    "dateDeducted": null,
                    "dateInsert": "2024-02-28T17:36:41+03:00",
                    "dateMarked": null,
                    "dateResponsibleId": null,
                    "deducted": "N",
                    "deliveryDocDate": null,
                    "deliveryDocNum": "",
                    "deliveryId": 1,
                    "deliveryName": "Доставка курьером",
                    "deliveryXmlId": "",
                    "discountPrice": 0,
                    "empAllowDeliveryId": null,
                    "empCanceledId": null,
                    "empDeductedId": null,
                    "empMarkedId": null,
                    "empResponsibleId": null,
                    "externalDelivery": "N",
                    "id": 338,
                    "id1c": "",
                    "marked": "N",
                    "orderId": 236,
                    "priceDelivery": 500,
                    "reasonMarked": "",
                    "reasonUndoDeducted": "",
                    "responsibleId": null,
                    "shipmentItems": [
                        {
                            "basketId": 255,
                            "dateInsert": "2024-02-28T17:36:53+03:00",
                            "id": 320,
                            "orderDeliveryId": 338,
                            "quantity": 1,
                            "reservedQuantity": 1,
                            "xmlId": "bx_65df5309cf490"
                        }
                    ],
                    "statusId": "DN",
                    "statusXmlId": "",
                    "system": "N",
                    "trackingDescription": "",
                    "trackingLastCheck": "",
                    "trackingNumber": "",
                    "trackingStatus": "",
                    "updated1c": "N",
                    "version1c": "",
                    "xmlId": "bx_65df5309939b8"
                }
            ],
            "statusId": "N",
            "statusXmlId": "",
            "taxValue": 163.33,
            "tradeBindings": [
                {
                    "externalOrderId": "236",
                    "id": 224,
                    "orderId": 236,
                    "params": null,
                    "tradingPlatformId": "9",
                    "tradingPlatformXmlId": "bx_659ff72864c8f",
                    "xmlId": "bx_65df53067ac59"
                }
            ],
            "updated1c": "N",
            "userDescription": "",
            "userId": 1,
            "version": 1,
            "version1c": "",
            "xmlId": "bx_65df53063d56d"
        }
    },
    "time": {
        "start": 1712938174.436428,
        "finish": 1712938175.432068,
        "duration": 0.9956400394439697,
        "processing": 0.5710320472717285,
        "date_start": "2024-04-12T19:09:34+03:00",
        "date_finish": "2024-04-12T19:09:35+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **order**
[`sale_order`](../data-types.md#sale_order) | Поля заказа и связанные объекты [(подробное описание)](#order-related) ||
|#

#### Связанные объекты в order {#order-related}

#|
|| **Название**
`тип` | **Описание** ||
|| **basketItems**
[`sale_basket_item[]`](../data-types.md#sale_basket_item) | Позиции корзины заказа. Каждая позиция содержит свойства `properties` и резервы `reservations` ||
|| **payments**
[`sale_order_payment[]`](../data-types.md#sale_order_payment) | Оплаты заказа ||
|| **shipments**
[`sale_order_shipment[]`](../data-types.md#sale_order_shipment) | Отгрузки заказа. Состав отгрузки — в массиве `shipmentItems`, где `basketId` — это `id` позиции из `basketItems` ||
|| **propertyValues**
[`sale_order_property_value[]`](../data-types.md#sale_order_property_value) | Значения свойств заказа, например имя и телефон покупателя. Набор свойств зависит от типа плательщика `personTypeId` ||
|| **clients**
[`sale_order_crm_client[]`](../data-types.md#sale_order_crm_client) | Контакты и компании CRM, привязанные к заказу ||
|| **requisiteLink**
[`object`](../../data-types.md) | Реквизиты, выбранные для заказа: `requisiteId` и `bankDetailId` — клиента, `mcRequisiteId` и `mcBankDetailId` — вашей компании ||
|| **tradeBindings**
[`sale_order_trade_binding[]`](../data-types.md#sale_order_trade_binding) | Привязки заказа к источникам — торговым платформам ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "200540400001",
    "error_description": "order is not exists"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200540400001` | `order is not exists` | Заказа с таким `id` нет. Эту же ошибку метод вернет, если в `id` передать не число, например `"abc"` ||
|| `400` | `100` | `Bitrix\Sale\Order constructor must be is public` | Не передан параметр `id` ||
|| `400` | `200040300010` | `Access Denied` | Недостаточно прав для чтения заказа ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-order-add.md)
- [{#T}](./sale-order-update.md)
- [{#T}](./sale-order-list.md)
- [{#T}](./sale-order-delete.md)
- [{#T}](./sale-order-get-fields.md)