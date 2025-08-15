# Изменить заказ sale.order.update

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.order.update` обновляет поля заказа.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order.id`](../data-types.md) | Идентификатор заказа ||
|| **fields***
[`object`](../data-types.md) | Значения полей для изменения заказа ||
|#

## Параметр fields

#|
|| **Название**
`тип` | **Описание** ||
|| **price**
[`double`](../../data-types.md) | Цена ||
|| **discountValue**
[`double`](../../data-types.md) | Значение скидки ||
|| **statusId**
[`sale_status.id`](../data-types.md) | Идентификатор статуса заказа ||
|| **empStatusId**
[`user.id`](../../data-types.md) | Идентификатор пользователя, изменившего статус заказа ||
|| **dateInsert**
[`datetime`](../../data-types.md) | Дата создания заказа ||
|| **marked**
[`string`](../../data-types.md) | Флаг маркировки. Признак того, является ли отгрузка отмеченной как проблемная. Значение `Y` ставится автоматически, если при сохранении произошла ошибка.

- `Y` — да
- `N` — нет

По умолчанию устанавливается `N` ||
|| **empMarkedId**
[`user.id`](../../data-types.md) | Идентификатор пользователя, поставившего маркировку ||
|| **reasonMarked**
[`string`](../../data-types.md) | Причина, по которой заказ был промаркирован ||
|| **userDescription**
[`string`](../../data-types.md) | Комментарий покупателя к заказу ||
|| **additionalInfo**
[`string`](../../data-types.md) | Устаревший.

Дополнительная информация ||
|| **comments**
[`string`](../../data-types.md) | Комментарий менеджера к заказу ||
|| **responsibleId**
[`user.id`](../../data-types.md) | Идентификатор пользователя, ответственного за заказ ||
|| **recurringId**
[`integer`](../../data-types.md) | Идентификатор продления подписки ||
|| **lockedBy**
[`user.id`](../../data-types.md) | Актуально только для коробочной версии.

Идентификатор пользователя, заблокировавшего заказ. Заказ блокируется в административной панели, когда пользователь открывает детальную карточку заказа ||
|| **recountFlag**
[`string`](../../data-types.md) | Устаревший.

Флаг пересчёта.

- `Y` — да
- `N` — нет

По умолчанию устанавливается Y ||
|| **affiliateId**
[`integer`](../../data-types.md) | Актуально только для коробочной версии.

Идентификатор аффилиата ||
|| **updated1c**
[`string`](../../data-types.md) | Обновлён ли через 1С.

- `Y` — да
- `N` — нет

По умолчанию устанавливается `N` ||
|| **orderTopic**
[`string`](../../data-types.md) | Устаревший.

Тема заказа ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор ||
|| **id1c**
[`string`](../../data-types.md) | Идентификатор в 1С ||
|| **version1c**
[`string`](../../data-types.md) | Версия в 1с ||
|| **externalOrder**
[`string`](../../data-types.md) | Заказ из внешней системы или нет.

- `Y` — да
- `N` — нет

По умолчанию устанавливается `N` ||
|| **canceled**
[`string`](../../data-types.md) | Был ли отменен заказ.

- `Y` — да
- `N` — нет

По умолчанию устанавливается `N` ||
|| **empCanceledId**
[`user.id`](../../data-types.md) | Идентификатор пользователя, отменившего заказ ||
|| **reasonCanceled**
[`string`](../../data-types.md) | Причина отмены ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":300,"fields":{"price":100,"discountValue":10,"statusId":"N","empStatusId":1,"dateInsert":"2024-03-01T14:00:00","marked":"Y","empMarkedId":1,"reasonMarked":"","userDescription":"","additionalInfo":"","comments":"","companyId":1,"responsibleId":1,"recurringId":1,"lockedBy":1,"recountFlag":"N","affiliateId":1,"updated1c":"N","orderTopic":"","xmlId":"","id1c":"","version1c":"","externalOrder":"N","canceled":"Y","empCanceledId":1,"reasonCanceled":""}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.order.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":300,"fields":{"price":100,"discountValue":10,"statusId":"N","empStatusId":1,"dateInsert":"2024-03-01T14:00:00","marked":"Y","empMarkedId":1,"reasonMarked":"","userDescription":"","additionalInfo":"","comments":"","companyId":1,"responsibleId":1,"recurringId":1,"lockedBy":1,"recountFlag":"N","affiliateId":1,"updated1c":"N","orderTopic":"","xmlId":"","id1c":"","version1c":"","externalOrder":"N","canceled":"Y","empCanceledId":1,"reasonCanceled":""},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.order.update

    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.order.update',
    		{
    			id: 300,
    			fields: {
    				price: 100,
    				discountValue: 10,
    				statusId: 'N',
    				empStatusId: 1,
    				dateInsert: '2024-03-01T14:00:00',
    				marked: 'Y',
    				empMarkedId: 1,
    				reasonMarked: '',
    				userDescription: '',
    				additionalInfo: '',
    				comments: '',
    				companyId: 1,
    				responsibleId: 1,
    				recurringId: 1,
    				lockedBy: 1,
    				recountFlag: 'N',
    				affiliateId: 1,
    				updated1c: 'N',
    				orderTopic: '',
    				xmlId: '',
    				id1c: '',
    				version1c: '',
    				externalOrder: 'N',
    				canceled: 'Y',
    				empCanceledId: 1,
    				reasonCanceled: '',
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch(error)
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
                'sale.order.update',
                [
                    'id' => 300,
                    'fields' => [
                        'price'           => 100,
                        'discountValue'   => 10,
                        'statusId'        => 'N',
                        'empStatusId'     => 1,
                        'dateInsert'      => '2024-03-01T14:00:00',
                        'marked'          => 'Y',
                        'empMarkedId'     => 1,
                        'reasonMarked'    => '',
                        'userDescription' => '',
                        'additionalInfo'  => '',
                        'comments'        => '',
                        'companyId'       => 1,
                        'responsibleId'   => 1,
                        'recurringId'     => 1,
                        'lockedBy'        => 1,
                        'recountFlag'     => 'N',
                        'affiliateId'     => 1,
                        'updated1c'       => 'N',
                        'orderTopic'      => '',
                        'xmlId'           => '',
                        'id1c'            => '',
                        'version1c'       => '',
                        'externalOrder'   => 'N',
                        'canceled'        => 'Y',
                        'empCanceledId'   => 1,
                        'reasonCanceled'  => '',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating sale order: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.order.update',
        {
            id: 300,
            fields: {
                price: 100,
                discountValue: 10,
                statusId: 'N',
                empStatusId: 1,
                dateInsert: '2024-03-01T14:00:00',
                marked: 'Y',
                empMarkedId: 1,
                reasonMarked: '',
                userDescription: '',
                additionalInfo: '',
                comments: '',
                companyId: 1,
                responsibleId: 1,
                recurringId: 1,
                lockedBy: 1,
                recountFlag: 'N',
                affiliateId: 1,
                updated1c: 'N',
                orderTopic: '',
                xmlId: '',
                id1c: '',
                version1c: '',
                externalOrder: 'N',
                canceled: 'Y',
                empCanceledId: 1,
                reasonCanceled: '',
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.order.update',
        [
            'id' => 300,
            'fields' => [
                'price' => 100,
                'discountValue' => 10,
                'statusId' => 'N',
                'empStatusId' => 1,
                'dateInsert' => '2024-03-01T14:00:00',
                'marked' => 'Y',
                'empMarkedId' => 1,
                'reasonMarked' => '',
                'userDescription' => '',
                'additionalInfo' => '',
                'comments' => '',
                'companyId' => 1,
                'responsibleId' => 1,
                'recurringId' => 1,
                'lockedBy' => 1,
                'recountFlag' => 'N',
                'affiliateId' => 1,
                'updated1c' => 'N',
                'orderTopic' => '',
                'xmlId' => '',
                'id1c' => '',
                'version1c' => '',
                'externalOrder' => 'N',
                'canceled' => 'Y',
                'empCanceledId' => 1,
                'reasonCanceled' => '',
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "order": {
            "accountNumber": "456",
            "additionalInfo": "",
            "affiliateId": 1,
            "canceled": "Y",
            "clients": [],
            "comments": "",
            "companyId": 1,
            "currency": "RUB",
            "dateCanceled": "2024-04-12T14:06:05+03:00",
            "dateInsert": "2024-03-01T13:00:00+03:00",
            "dateLock": null,
            "dateMarked": "2024-04-15T10:21:14+03:00",
            "dateStatus": "2024-04-12T14:06:04+03:00",
            "dateUpdate": "2024-04-15T10:21:15+03:00",
            "deducted": "N",
            "discountValue": 10,
            "empCanceledId": 1,
            "empMarkedId": 1,
            "empStatusId": 1,
            "externalOrder": "N",
            "id": 300,
            "id1c": "",
            "lid": "s1",
            "lockedBy": "1",
            "marked": "N",
            "orderTopic": "",
            "payed": "N",
            "personTypeId": 1,
            "personTypeXmlId": "",
            "price": 100,
            "reasonCanceled": "",
            "reasonMarked": "",
            "recountFlag": "N",
            "recurringId": "1",
            "requisiteLink": [],
            "responsibleId": 1,
            "statusId": "N",
            "statusXmlId": "",
            "taxValue": null,
            "updated1c": "N",
            "userDescription": "",
            "userId": 1,
            "version": 3,
            "version1c": "",
            "xmlId": ""
        }
    },
    "time": {
        "start": 1713169274.29568,
        "finish": 1713169275.698528,
        "duration": 1.4028480052947998,
        "processing": 0.9852678775787354,
        "date_start": "2024-04-15T11:21:14+03:00",
        "date_finish": "2024-04-15T11:21:15+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **order**
[`sale_order`](../data-types.md) | Объект с информацией об обновленном заказе ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":200540400001
    "error_description":"order is not exists"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200540400001` | Обновляемый заказ не найден ||
|| `200040300020` | Недостаточно прав для обновления заказа ||
|| `100` | Не указан параметр `id` ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./sale-order-add.md)
- [{#T}](./sale-order-get.md)
- [{#T}](./sale-order-list.md)
- [{#T}](./sale-order-delete.md)
- [{#T}](./sale-order-get-fields.md)