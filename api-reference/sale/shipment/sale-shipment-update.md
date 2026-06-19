# Обновить отгрузку sale.shipment.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод обновляет отгрузку. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order_shipment.id`](../data-types.md) | Идентификатор отгрузки ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для обновления отгрузки ||
|#

### Параметр fields

Общие параметры, актуальные для свойств отгрузки любого типа:

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **allowDelivery***
[`string`](../../data-types.md) | Признак разрешения доставки.
Возможные значения:
- `Y` – да (доставка разрешена)
- `N` – нет (доставка не разрешена) ||
|| **deducted***
[`string`](../../data-types.md) | Признак того, является ли отгрузка отгруженной.
Возможные значения:
- `Y` – да (отгружена)
- `N` – нет (не отгружена) ||
|| **deliveryId***
[`sale_delivery_service`](../data-types.md) | Идентификатор службы доставки ||
|| **statusId**
[`sale_status`](../../data-types.md) | Идентификатор статуса доставки.

Если не передан, то используется статус DN (см. таблицу статусов по умолчанию из документации по [`sale.status.*`](../status/index.md)) ||
|| **deliveryDocDate**
[`datetime`](../../data-types.md) | Дата документа отгрузки ||
|| **deliveryDocNum**
[`string`](../../data-types.md) | Номер документа отгрузки ||
|| **trackingNumber**
[`string`](../../data-types.md) | Идентификатор отправления ||
|| **basePriceDelivery**
[`double`](../../data-types.md) | Базовая стоимость доставки (без скидок / наценок).

Если передана, то используется и для выставления значения `priceDelivery`. Переданное значение `priceDelivery` в этом случае игнорируется.

Если не передана ни basePriceDelivery, ни priceDelivery, то обе цены выставляются в 0 ||
|| **priceDelivery**
[`double`](../../data-types.md) | Стоимость доставки.

Если передана и не выставлена `basePriceDelivery`, то используется и для выставления значения `basePriceDelivery`.

Если не передана ни `basePriceDelivery`, ни `priceDelivery`, то обе цены выставляются в 0 ||
|| **comments**
[`string`](../../data-types.md) | Комментарий менеджера ||
|| **companyId**
[`integer`](../../data-types.md) | Идентификатор компании из модуля «Интернет-магазин».

В настоящий момент не используется ||
|| **responsibleId**
[`user`](../../data-types.md) | Идентификатор пользователя ответственного за отгрузку ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор отгрузки.

Можно использовать для синхронизации отгрузки с внешней системой ||
|#
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":2452,"fields":{"allowDelivery":"N","deducted":"N","deliveryId":3,"statusId":"DD","deliveryDocDate":"2024-02-13T15:05:49","deliveryDocNum":"MyDocumentNumber","trackingNumber":"MyTrackingNumber","basePriceDelivery":1999.99,"comments":"My new comment for manager","responsibleId":1,"xmlId":"myNewXmlId"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.shipment.update
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":2452,"fields":{"allowDelivery":"N","deducted":"N","deliveryId":3,"statusId":"DD","deliveryDocDate":"2024-02-13T15:05:49","deliveryDocNum":"MyDocumentNumber","trackingNumber":"MyTrackingNumber","basePriceDelivery":1999.99,"comments":"My new comment for manager","responsibleId":1,"xmlId":"myNewXmlId"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipment.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ShipmentUpdateResult = {
      shipment: {
        id: number
        orderId: number
        accountNumber: string
        deliveryId: number
        deliveryName: string
        statusId: string
        allowDelivery: string
        deducted: string
        canceled: string
        marked: string
        priceDelivery: number
        basePriceDelivery: number
        discountPrice: number
        currency: string
        comments: string
        trackingNumber: string
        deliveryDocNum: string
        deliveryDocDate: ISODate | null
        xmlId: string
        companyId: number | null
        responsibleId: number | null
        dateInsert: ISODate | null
        dateAllowDelivery: ISODate | null
        dateDeducted: ISODate | null
        shipmentItems: unknown[]
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<ShipmentUpdateResult>({
        method: 'sale.shipment.update',
        params: {
          id: 2452,
          fields: {
            allowDelivery: 'N',
            deducted: 'N',
            deliveryId: 3,
            statusId: 'DD',
            deliveryDocDate: '2024-02-13T15:05:49',
            deliveryDocNum: 'MyDocumentNumber',
            trackingNumber: 'MyTrackingNumber',
            basePriceDelivery: 1999.99,
            comments: 'My new comment for manager',
            responsibleId: 1,
            xmlId: 'myNewXmlId',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated shipment id:', result.shipment.id, 'status:', result.shipment.statusId)
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
      async function updateShipment() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.shipment.update',
            params: {
              id: 2452,
              fields: {
                allowDelivery: 'N',
                deducted: 'N',
                deliveryId: 3,
                statusId: 'DD',
                deliveryDocDate: '2024-02-13T15:05:49',
                deliveryDocNum: 'MyDocumentNumber',
                trackingNumber: 'MyTrackingNumber',
                basePriceDelivery: 1999.99,
                comments: 'My new comment for manager',
                responsibleId: 1,
                xmlId: 'myNewXmlId',
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
          console.info('Updated shipment id:', result.shipment.id, 'status:', result.shipment.statusId)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateShipment)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.shipment.update',
                [
                    'id' => 2452,
                    'fields' => [
                        'allowDelivery'      => 'N',
                        'deducted'           => 'N',
                        'deliveryId'         => 3,
                        'statusId'           => 'DD',
                        'deliveryDocDate'    => '2024-02-13T15:05:49',
                        'deliveryDocNum'     => 'MyDocumentNumber',
                        'trackingNumber'     => 'MyTrackingNumber',
                        'basePriceDelivery'  => 1999.99,
                        'comments'           => 'My new comment for manager',
                        'responsibleId'      => 1,
                        'xmlId'              => 'myNewXmlId',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating shipment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.shipment.update', {
            id: 2452,
            fields: {
                allowDelivery: 'N',
                deducted: 'N',
                deliveryId: 3,
                statusId: 'DD',
                deliveryDocDate: '2024-02-13T15:05:49',
                deliveryDocNum: 'MyDocumentNumber',
                trackingNumber: 'MyTrackingNumber',
                basePriceDelivery: 1999.99,
                comments: 'My new comment for manager',
                responsibleId: 1,
                xmlId: 'myNewXmlId',
            }
        },
        function(result) {
            if (result.error())
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
        'sale.shipment.update',
        [
            'id' => 2452,
            'fields' => [
                'allowDelivery' => 'N',
                'deducted' => 'N',
                'deliveryId' => 3,
                'statusId' => 'DD',
                'deliveryDocDate' => '2024-02-13T15:05:49',
                'deliveryDocNum' => 'MyDocumentNumber',
                'trackingNumber' => 'MyTrackingNumber',
                'basePriceDelivery' => 1999.99,
                'comments' => 'My new comment for manager',
                'responsibleId' => 1,
                'xmlId' => 'myNewXmlId',
            ]
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
         "accountNumber":"2068\/19",
         "allowDelivery":"N",
         "basePriceDelivery":1999.99,
         "canceled":"N",
         "comments":"My new comment for manager",
         "companyId":null,
         "currency":"RUB",
         "customPriceDelivery":"N",
         "dateAllowDelivery":"2024-04-12T10:01:23+03:00",
         "dateCanceled":null,
         "dateDeducted":"2024-04-12T10:01:23+03:00",
         "dateInsert":"2024-04-11T14:17:52+03:00",
         "dateMarked":null,
         "dateResponsibleId":"2024-04-12T10:01:23+03:00",
         "deducted":"N",
         "deliveryDocDate":"2024-02-13T14:05:49+03:00",
         "deliveryDocNum":"MyDocumentNumber",
         "deliveryId":3,
         "deliveryName":"Самовывоз",
         "deliveryXmlId":"",
         "discountPrice":0,
         "empAllowDeliveryId":1,
         "empCanceledId":null,
         "empDeductedId":1,
         "empMarkedId":null,
         "empResponsibleId":1,
         "externalDelivery":"N",
         "id":2452,
         "id1c":"",
         "marked":"N",
         "orderId":2068,
         "priceDelivery":1999.99,
         "reasonMarked":"",
         "reasonUndoDeducted":"",
         "responsibleId":1,
         "shipmentItems":[
            
         ],
         "statusId":"DD",
         "statusXmlId":"",
         "system":"N",
         "trackingDescription":"",
         "trackingLastCheck":"",
         "trackingNumber":"MyTrackingNumber",
         "trackingStatus":"",
         "updated1c":"N",
         "version1c":"",
         "xmlId":"myNewXmlId"
      }
   },
   "time":{
      "start":1712928678.417617,
      "finish":1712928679.68092,
      "duration":1.2633028030395508,
      "processing":1.0808379650115967,
      "date_start":"2024-04-12T16:31:18+03:00",
      "date_finish":"2024-04-12T16:31:19+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **shipment**
[`sale_order_shipment`](../data-types.md) | Объект с информацией об обновленной отгрузке ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":0,
   "error_description":"Required fields: name"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `201140400001` | Отгрузка не найдена ||
|| `200040300020` | Недостаточно прав для обновления отгрузки ||
|| `BX_INVALID_VALUE` | Значение одного из полей не прошло валидацию перед сохранением ||
|| `100` | Не указан параметр `id` ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Не переданы обязательные поля структуры `fields` ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-shipment-add.md)
- [{#T}](./sale-shipment-get.md)
- [{#T}](./sale-shipment-list.md)
- [{#T}](./sale-shipment-delete.md)
- [{#T}](./sale-shipment-get-fields.md)