# Добавить отгрузку sale.shipment.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод добавляет отгрузку. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для создания отгрузки ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **orderId***
[`sale_order.id`](../data-types.md) | Идентификатор заказа ||
|| **allowDelivery***
[`string`](../../data-types.md) | Признак разрешения доставки
Возможные значения:
- `Y` – да (доставка разрешена)
- `N` – нет (доставка не разрешена) ||
|| **deducted***
[`string`](../../data-types.md) | Признак того, является ли отгрузка отгруженной
Возможные значения:
- `Y` – да (отгружена)
- `N` – нет (не отгружена) ||
|| **deliveryId***
[`sale_delivery_service.id`](../data-types.md) | Идентификатор службы доставки ||
|| **statusId**
[`sale_status`](../data-types.md) | Идентификатор статуса доставки

Если не передан, то используется статус DN (см. таблицу статусов по умолчанию из документации по [`sale.status.*`](../status/index.md)) ||
|| **deliveryDocDate**
[`datetime`](../../data-types.md) | Дата документа отгрузки ||
|| **deliveryDocNum**
[`string`](../../data-types.md) | Номер документа отгрузки ||
|| **trackingNumber**
[`string`](../../data-types.md) | Идентификатор отправления ||
|| **basePriceDelivery**
[`double`](../../data-types.md) | Базовая стоимость доставки (без скидок / наценок).

Если передана, то значение будет использовано и в качестве стоимости доставки (поле отгрузки `priceDelivery`).

Если не передана, то и базовая стоимость доставки, и стоимость доставки будут рассчитаны автоматически на основе выбранной службы доставки ||
|| **comments**
[`string`](../../data-types.md) | Комментарий менеджера ||
|| **companyId**
[`integer`](../../data-types.md) | Идентификатор компании из модуля «Интернет-магазин».

В настоящий момент не используется ||
|| **responsibleId**
[`user`](../../data-types.md) | Идентификатор пользователя, ответственного за отгрузку ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор отгрузки.

Можно использовать для синхронизации отгрузки с внешней системой ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"orderId":2068,"allowDelivery":"Y","deducted":"Y","deliveryId":2,"statusId":"DN","deliveryDocDate":"2024-02-13T14:05:48","deliveryDocNum":"DocumentNumber123456","trackingNumber":"trackingNumber","basePriceDelivery":999.99,"comments":"My comment for manager","responsibleId":25,"xmlId":"myXmlId"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.shipment.add
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"orderId":2068,"allowDelivery":"Y","deducted":"Y","deliveryId":2,"statusId":"DN","deliveryDocDate":"2024-02-13T14:05:48","deliveryDocNum":"DocumentNumber123456","trackingNumber":"trackingNumber","basePriceDelivery":999.99,"comments":"My comment for manager","responsibleId":25,"xmlId":"myXmlId"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipment.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ShipmentAddResult = {
      shipment: {
        accountNumber: string
        allowDelivery: string
        basePriceDelivery: number
        canceled: string
        comments: string
        currency: string
        customPriceDelivery: string
        dateAllowDelivery: ISODate | null
        dateDeducted: ISODate | null
        dateInsert: ISODate | null
        dateResponsibleId: ISODate | null
        deducted: string
        deliveryDocDate: ISODate | null
        deliveryDocNum: string
        deliveryId: number
        deliveryName: string
        deliveryXmlId: string
        empAllowDeliveryId: number
        empDeductedId: number
        empResponsibleId: number
        id: number
        marked: string
        orderId: number
        priceDelivery: number
        responsibleId: number
        shipmentItems: unknown[]
        statusId: string
        statusXmlId: string
        system: string
        trackingNumber: string
        xmlId: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<ShipmentAddResult>({
        method: 'sale.shipment.add',
        params: {
          fields: {
            orderId: 2068,
            allowDelivery: 'Y',
            deducted: 'Y',
            deliveryId: 2,
            statusId: 'DN',
            deliveryDocDate: '2024-02-13T14:05:48',
            deliveryDocNum: 'DocumentNumber123456',
            trackingNumber: 'trackingNumber',
            basePriceDelivery: 999.99,
            comments: 'My comment for manager',
            responsibleId: 25,
            xmlId: 'myXmlId',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Added shipment id:', result.shipment.id, result.shipment)
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
      async function addShipment() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.shipment.add',
            params: {
              fields: {
                orderId: 2068,
                allowDelivery: 'Y',
                deducted: 'Y',
                deliveryId: 2,
                statusId: 'DN',
                deliveryDocDate: '2024-02-13T14:05:48',
                deliveryDocNum: 'DocumentNumber123456',
                trackingNumber: 'trackingNumber',
                basePriceDelivery: 999.99,
                comments: 'My comment for manager',
                responsibleId: 25,
                xmlId: 'myXmlId',
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
          console.info('Added shipment id:', result.shipment.id, result.shipment)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addShipment)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.shipment.add',
                [
                    'fields' => [
                        'orderId'           => 2068,
                        'allowDelivery'     => 'Y',
                        'deducted'          => 'Y',
                        'deliveryId'        => 2,
                        'statusId'          => 'DN',
                        'deliveryDocDate'   => '2024-02-13T14:05:48',
                        'deliveryDocNum'    => 'DocumentNumber123456',
                        'trackingNumber'    => 'trackingNumber',
                        'basePriceDelivery' => 999.99,
                        'comments'          => 'My comment for manager',
                        'responsibleId'     => 25,
                        'xmlId'             => 'myXmlId',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding shipment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.shipment.add', {
            fields: {
                orderId: 2068,
                allowDelivery: 'Y',
                deducted: 'Y',
                deliveryId: 2,
                statusId: 'DN',
                deliveryDocDate: '2024-02-13T14:05:48',
                deliveryDocNum: 'DocumentNumber123456',
                trackingNumber: 'trackingNumber',
                basePriceDelivery: 999.99,
                comments: 'My comment for manager',
                responsibleId: 25,
                xmlId: 'myXmlId',
            }
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
        'sale.shipment.add',
        [
            'fields' => [
                'orderId' => 2068,
                'allowDelivery' => 'Y',
                'deducted' => 'Y',
                'deliveryId' => 2,
                'statusId' => 'DN',
                'deliveryDocDate' => '2024-02-13T14:05:48',
                'deliveryDocNum' => 'DocumentNumber123456',
                'trackingNumber' => 'trackingNumber',
                'basePriceDelivery' => 999.99,
                'comments' => 'My comment for manager',
                'responsibleId' => 25,
                'xmlId' => 'myXmlId',
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
         "allowDelivery":"Y",
         "basePriceDelivery":999.99,
         "canceled":"N",
         "comments":"My comment for manager",
         "currency":"RUB",
         "customPriceDelivery":"N",
         "dateAllowDelivery":"2024-04-11T14:17:52+03:00",
         "dateDeducted":"2024-04-11T14:17:52+03:00",
         "dateInsert":"2024-04-11T14:17:52+03:00",
         "dateResponsibleId":"2024-04-11T14:17:52+03:00",
         "deducted":"Y",
         "deliveryDocDate":"2024-02-13T13:05:48+03:00",
         "deliveryDocNum":"DocumentNumber123456",
         "deliveryId":2,
         "deliveryName":"Доставка курьером",
         "deliveryXmlId":"",
         "empAllowDeliveryId":1,
         "empDeductedId":1,
         "empResponsibleId":1,
         "id":2452,
         "marked":"N",
         "orderId":2068,
         "priceDelivery":999.99,
         "responsibleId":25,
         "shipmentItems":[
            
         ],
         "statusId":"DN",
         "statusXmlId":"FFdddd",
         "system":"N",
         "trackingNumber":"trackingNumber",
         "xmlId":"myXmlId"
      }
   },
   "time":{
      "start":1712837872.459187,
      "finish":1712837873.462857,
      "duration":1.0036699771881104,
      "processing":0.8182649612426758,
      "date_start":"2024-04-11T15:17:52+03:00",
      "date_finish":"2024-04-11T15:17:53+03:00"
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
[`sale_order_shipment`](../data-types.md) | Объект с информацией о добавленной отгрузке ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":0,
   "error_description":"Не удается загрузить заказ"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300020` | Недостаточно прав для добавления отгрузки ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Заказ не найден ||
|| `SALE_SHIPMENT_WRONG_DELIVERY_SERVICE` | Не найдена служба доставки ||
|| `BX_INVALID_VALUE` | Значение одного из полей не прошло валидацию перед сохранением ||
|| `0` | Не переданы обязательные поля ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-shipment-update.md)
- [{#T}](./sale-shipment-get.md)
- [{#T}](./sale-shipment-list.md)
- [{#T}](./sale-shipment-delete.md)
- [{#T}](./sale-shipment-get-fields.md)