# Добавить отгрузку sale.shipment.add

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.shipment.add
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"orderId":2068,"allowDelivery":"Y","deducted":"Y","deliveryId":2,"statusId":"DN","deliveryDocDate":"2024-02-13T14:05:48","deliveryDocNum":"DocumentNumber123456","trackingNumber":"trackingNumber","basePriceDelivery":999.99,"comments":"My comment for manager","responsibleId":25,"xmlId":"myXmlId"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipment.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
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
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch( error )
    {
    	console.error(error);
    }
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