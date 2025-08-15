# Обновить отгрузку sale.shipment.update

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.shipment.update
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":2452,"fields":{"allowDelivery":"N","deducted":"N","deliveryId":3,"statusId":"DD","deliveryDocDate":"2024-02-13T15:05:49","deliveryDocNum":"MyDocumentNumber","trackingNumber":"MyTrackingNumber","basePriceDelivery":1999.99,"comments":"My new comment for manager","responsibleId":1,"xmlId":"myNewXmlId"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipment.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
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
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error(error.ex);
    }
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