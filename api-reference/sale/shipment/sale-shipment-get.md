# Получить поля отгрузки sale.shipment.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод получает значения всех полей отгрузки. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order_shipment.id`](../data-types.md) | Идентификатор отгрузки ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":2465}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.shipment.get
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":2465,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipment.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ShipmentGetResult = {
      shipment: {
        accountNumber: string
        allowDelivery: string
        basePriceDelivery: number
        canceled: string
        comments: string
        companyId: number
        currency: string
        customPriceDelivery: string
        dateAllowDelivery: ISODate | null
        dateCanceled: ISODate | null
        dateDeducted: ISODate | null
        dateInsert: ISODate
        dateMarked: ISODate | null
        dateResponsibleId: ISODate
        deducted: string
        deliveryDocDate: ISODate | null
        deliveryDocNum: string
        deliveryId: number
        deliveryName: string
        deliveryXmlId: string
        discountPrice: number
        empAllowDeliveryId: number | null
        empCanceledId: number | null
        empDeductedId: number | null
        empMarkedId: number | null
        empResponsibleId: number | null
        externalDelivery: string
        id: number
        id1c: string
        marked: string
        orderId: number
        priceDelivery: number
        reasonMarked: string
        reasonUndoDeducted: string
        responsibleId: number
        shipmentItems: Array<{
          basketId: number
          dateInsert: ISODate
          id: number
          orderDeliveryId: number
          quantity: number
          reservedQuantity: number
          xmlId: string
        }>
        statusId: string
        statusXmlId: string
        system: string
        trackingDescription: string
        trackingLastCheck: string
        trackingNumber: string
        trackingStatus: string
        updated1c: string
        version1c: string
        xmlId: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<ShipmentGetResult>({
        method: 'sale.shipment.get',
        params: {
          id: 2465,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.shipment.id, result.shipment.accountNumber, result.shipment.statusId)
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
      async function getShipment() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.shipment.get',
            params: {
              id: 2465,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.shipment.id, result.shipment.accountNumber, result.shipment.statusId)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getShipment)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.shipment.get',
                [
                    'id' => 2465,
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
        echo 'Error getting shipment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.shipment.get", {
            "id": 2465
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
        'sale.shipment.get',
        [
            'id' => 2465
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Ответ в случае успеха

HTTP-статус: **200**

```json
{
   "result":{
      "shipment":{
         "accountNumber":"2069\/2",
         "allowDelivery":"N",
         "basePriceDelivery":600,
         "canceled":"N",
         "comments":"",
         "companyId":0,
         "currency":"RUB",
         "customPriceDelivery":"N",
         "dateAllowDelivery":null,
         "dateCanceled":null,
         "dateDeducted":null,
         "dateInsert":"2024-04-11T15:05:48+03:00",
         "dateMarked":null,
         "dateResponsibleId":"2024-04-11T15:05:48+03:00",
         "deducted":"N",
         "deliveryDocDate":null,
         "deliveryDocNum":"",
         "deliveryId":2,
         "deliveryName":"Доставка курьером",
         "deliveryXmlId":"",
         "discountPrice":0,
         "empAllowDeliveryId":null,
         "empCanceledId":null,
         "empDeductedId":null,
         "empMarkedId":null,
         "empResponsibleId":null,
         "externalDelivery":"N",
         "id":2465,
         "id1c":"",
         "marked":"N",
         "orderId":2069,
         "priceDelivery":600,
         "reasonMarked":"",
         "reasonUndoDeducted":"",
         "responsibleId":0,
         "shipmentItems":[
            {
               "basketId":2721,
               "dateInsert":"2024-04-11T15:05:51+03:00",
               "id":10,
               "orderDeliveryId":2465,
               "quantity":1,
               "reservedQuantity":1,
               "xmlId":"bx_6617e02cb74f9"
            }
         ],
         "statusId":"DN",
         "statusXmlId":"FFdddd",
         "system":"N",
         "trackingDescription":"",
         "trackingLastCheck":"",
         "trackingNumber":"",
         "trackingStatus":"",
         "updated1c":"N",
         "version1c":"",
         "xmlId":"bx_6617e02cae2a1"
      }
   },
   "time":{
      "start":1712840827.02634,
      "finish":1712840827.41618,
      "duration":0.38983988761901855,
      "processing":0.21664810180664062,
      "date_start":"2024-04-11T16:07:07+03:00",
      "date_finish":"2024-04-11T16:07:07+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **property**
[`sale_order_shipment`](../data-types.md) | Информация об отгрузке ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":201140400001,
   "error_description":"shipment is not exists"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `201140400001` | Отгрузка не найдена ||
|| `200040300010` | Недостаточно прав для чтения отгрузки ||
|| `100` | Не указан параметр `id` ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-shipment-add.md)
- [{#T}](./sale-shipment-update.md)
- [{#T}](./sale-shipment-list.md)
- [{#T}](./sale-shipment-delete.md)
- [{#T}](./sale-shipment-get-fields.md)