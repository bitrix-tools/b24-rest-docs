# Обновить значения свойств отгрузки sale.shipmentpropertyvalue.modify

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод обновляет значения свойств отгрузки. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Корневой элемент, в котором передаются параметры запроса ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **shipment***
[`object`](../../data-types.md) | Объект, содержащий значения идентификатора отгрузки и значения свойств отгрузки (подробное описание приведено [ниже](#shipment)) ||
|#

### Параметр shipment {#shipment}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order_shipment.id`](../data-types.md#sale_order_shipment) | Идентификатор отгрузки ||
|| **propertyValues***
[`object[]`](../../data-types.md) | Массив объектов, содержащих идентификатор свойства отгрузки и значение свойства (подробное описание приведено [ниже](#propertyvalues)) ||
|#

### Параметр propertyValues {#propertyvalues}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **shipmentPropsId***
[`sale_shipment_property.id`](../data-types.md#sale_shipment_property) | Идентификатор свойства отгрузки ||
|| **value***
[`string`](../../data-types.md) | Значение свойства ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"shipment":{"id":4120,"propertyValues":[{"shipmentPropsId":105,"value":"Comments value"},{"shipmentPropsId":106,"value":"Description value"}]}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.shipmentpropertyvalue.modify
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"shipment":{"id":4120,"propertyValues":[{"shipmentPropsId":105,"value":"Comments value"},{"shipmentPropsId":106,"value":"Description value"}]}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipmentpropertyvalue.modify
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.shipmentpropertyvalue.modify', {
    			fields: {
    				shipment: {
    					id: 4120,
    					propertyValues: [{
    							shipmentPropsId: 105,
    							value: 'Comments value'
    						},
    						{
    							shipmentPropsId: 106,
    							value: 'Description value'
    						},
    					],
    				},
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
                'sale.shipmentpropertyvalue.modify',
                [
                    'fields' => [
                        'shipment' => [
                            'id'            => 4120,
                            'propertyValues' => [
                                [
                                    'shipmentPropsId' => 105,
                                    'value'           => 'Comments value'
                                ],
                                [
                                    'shipmentPropsId' => 106,
                                    'value'           => 'Description value'
                                ],
                            ],
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error modifying shipment property value: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.shipmentpropertyvalue.modify', {
            fields: {
                shipment: {
                    id: 4120,
                    propertyValues: [{
                            shipmentPropsId: 105,
                            value: 'Comments value'
                        },
                        {
                            shipmentPropsId: 106,
                            value: 'Description value'
                        },
                    ],
                },
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
        'sale.shipmentpropertyvalue.modify',
        [
            'fields' => [
                'shipment' => [
                    'id' => 4120,
                    'propertyValues' => [
                        [
                            'shipmentPropsId' => 105,
                            'value' => 'Comments value'
                        ],
                        [
                            'shipmentPropsId' => 106,
                            'value' => 'Description value'
                        ],
                    ],
                ],
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
        "propertyValues":[
            {
                "code":null,
                "id":38164,
                "name":"Comments",
                "value":"Comments value"
            },
            {
                "code":null,
                "id":38165,
                "name":"Description",
                "value":"Description value"
            }
        ]
    },
    "time":{
        "start":1718022201.149589,
        "finish":1718022201.726496,
        "duration":0.5769069194793701,
        "processing":0.38397693634033203,
        "date_start":"2024-06-10T15:23:21+03:00",
        "date_finish":"2024-06-10T15:23:21+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **propertyValues**
[`sale_shipment_property_value[]`](../data-types.md#sale_shipment_property_value) | Массив объектов, содержащих информацию о значениях свойств отгрузок ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":100,
    "error_description":"Could not find value for parameter {fields}"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300020` | Недостаточно прав для изменения значений свойств ||
|| `100` | Не указаны обязательные параметры ||
|| `201040400006` | Некорректный идентификатор отгрузки ||
|| `201040400007` | Отгрузка не найдена ||
|| `201040400008` | Ошибка сохранения заказа ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-shipment-property-value-get.md)
- [{#T}](./sale-shipment-property-value-list.md)
- [{#T}](./sale-shipment-propertyvalue-delete.md)
- [{#T}](./sale-shipment-property-value-get-fields.md)