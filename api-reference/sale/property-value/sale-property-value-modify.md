# Изменить значение свойства sale.propertyvalue.modify

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод обновляет значения свойств заказа. 

**Обратите внимание**, что данный метод принимает на вход **все** значения свойств заказа. Если значения каких-то свойств не будут переданы, то их текущие значения будут удалены из заказа в результате выполнения запроса.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Корневой элемент, в котором передаются параметры запроса в виде структуры:

```json
{
    "order":
    {
        "id": "значение",
        "propertyValues": {
            "orderPropsId": "значение",
            "value": "значение"
        },
    }
}
```

||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **order***
[`object`](../../data-types.md) | Объект, содержащий значения идентификатора заказа и значения свойств заказа в виде структуры:

```json
"id": "значение",
"propertyValues": {
    "orderPropsId": "значение",
    "value": "значение"
},
```

||
|#

### Параметр order

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order.id`](../data-types.md) | Идентификатор заказа ||
|| **propertyValues***
[`object[]`](../../data-types.md) | Массив объектов (смотрите описание объекта `propertyValues` [ниже](#parametr-propertyvalues)), содержащих идентификатор свойства заказа и значение свойства ||
|#

### Параметр propertyValues

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Значение**
`тип` | **Описание** ||
|| **orderPropsId***
[`sale_order_property.id`](../data-types.md) | Идентификатор свойства заказа ||
|| **value***
[`string`](../../data-types.md) | Значение свойства заказа ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"order":{"id":2066,"propertyValues":[{"orderPropsId":20,"value":"John Smith"},{"orderPropsId":21,"value":"johnsmith@example.com"},{"orderPropsId":22,"value":"+10907996161"},{"orderPropsId":25,"value":"0000073738"},{"orderPropsId":26,"value":"900 S Holland Ave, Springfield, MO 65806, United States"},{"orderPropsId":51,"value":"17.04.2024"},{"orderPropsId":52,"value":"Y"},{"orderPropsId":53,"value":"948"},{"orderPropsId":54,"value":"10"}]}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.propertyvalue.modify
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"order":{"id":2066,"propertyValues":[{"orderPropsId":20,"value":"John Smith"},{"orderPropsId":21,"value":"johnsmith@example.com"},{"orderPropsId":22,"value":"+10907996161"},{"orderPropsId":25,"value":"0000073738"},{"orderPropsId":26,"value":"900 S Holland Ave, Springfield, MO 65806, United States"},{"orderPropsId":51,"value":"17.04.2024"},{"orderPropsId":52,"value":"Y"},{"orderPropsId":53,"value":"948"},{"orderPropsId":54,"value":"10"}]}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.propertyvalue.modify
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.propertyvalue.modify', {
    			fields: {
    				order: {
    					id: 2066,
    					propertyValues: [{
    							orderPropsId: 20,
    							value: 'John Smith'
    						},
    						{
    							orderPropsId: 21,
    							value: 'johnsmith@example.com'
    						},
    						{
    							orderPropsId: 22,
    							value: '+10907996161'
    						},
    						{
    							orderPropsId: 25,
    							value: '0000073738'
    						},
    						{
    							orderPropsId: 26,
    							value: '900 S Holland Ave, Springfield, MO 65806, United States'
    						},
    						{
    							orderPropsId: 51,
    							value: '17.04.2024'
    						},
    						{
    							orderPropsId: 52,
    							value: 'Y'
    						},
    						{
    							orderPropsId: 53,
    							value: '948'
    						},
    						{
    							orderPropsId: 54,
    							value: '10'
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
                'sale.propertyvalue.modify',
                [
                    'fields' => [
                        'order' => [
                            'id'            => 2066,
                            'propertyValues' => [
                                [
                                    'orderPropsId' => 20,
                                    'value'        => 'John Smith'
                                ],
                                [
                                    'orderPropsId' => 21,
                                    'value'        => 'johnsmith@example.com'
                                ],
                                [
                                    'orderPropsId' => 22,
                                    'value'        => '+10907996161'
                                ],
                                [
                                    'orderPropsId' => 25,
                                    'value'        => '0000073738'
                                ],
                                [
                                    'orderPropsId' => 26,
                                    'value'        => '900 S Holland Ave, Springfield, MO 65806, United States'
                                ],
                                [
                                    'orderPropsId' => 51,
                                    'value'        => '17.04.2024'
                                ],
                                [
                                    'orderPropsId' => 52,
                                    'value'        => 'Y'
                                ],
                                [
                                    'orderPropsId' => 53,
                                    'value'        => '948'
                                ],
                                [
                                    'orderPropsId' => 54,
                                    'value'        => '10'
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
        echo 'Error modifying sale property value: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.propertyvalue.modify', {
            fields: {
                order: {
                    id: 2066,
                    propertyValues: [{
                            orderPropsId: 20,
                            value: 'John Smith'
                        },
                        {
                            orderPropsId: 21,
                            value: 'johnsmith@example.com'
                        },
                        {
                            orderPropsId: 22,
                            value: '+10907996161'
                        },
                        {
                            orderPropsId: 25,
                            value: '0000073738'
                        },
                        {
                            orderPropsId: 26,
                            value: '900 S Holland Ave, Springfield, MO 65806, United States'
                        },
                        {
                            orderPropsId: 51,
                            value: '17.04.2024'
                        },
                        {
                            orderPropsId: 52,
                            value: 'Y'
                        },
                        {
                            orderPropsId: 53,
                            value: ‘948’
                        },
                        {
                            orderPropsId: 54,
                            value: ‘10’
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
        'sale.propertyvalue.modify',
        [
            'fields' => [
                'order' => [
                    'id' => 2066,
                    'propertyValues' => [
                        [
                            'orderPropsId' => 20,
                            'value' => 'John Smith'
                        ],
                        [
                            'orderPropsId' => 21,
                            'value' => 'johnsmith@example.com'
                        ],
                        [
                            'orderPropsId' => 22,
                            'value' => '+10907996161'
                        ],
                        [
                            'orderPropsId' => 25,
                            'value' => '0000073738'
                        ],
                        [
                            'orderPropsId' => 26,
                            'value' => '900 S Holland Ave, Springfield, MO 65806, United States'
                        ],
                        [
                            'orderPropsId' => 51,
                            'value' => '17.04.2024'
                        ],
                        [
                            'orderPropsId' => 52,
                            'value' => 'Y'
                        ],
                        [
                            'orderPropsId' => 53,
                            'value' => '948' // Corrected quotation marks
                        ],
                        [
                            'orderPropsId' => 54,
                            'value' => '10' // Corrected quotation marks
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

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result":{
        "propertyValues":[
            {
                "code":"DELIVERY_DATE",
                "id":13167,
                "name":"Дата доставки",
                "orderPropsId":51,
                "orderPropsXmlId":null,
                "value":"17.04.2024"
            },
            {
                "code":"DELEVERY_REQUIRED",
                "id":13168,
                "name":"Необходимость доставки",
                "orderPropsId":52,
                "orderPropsXmlId":null,
                "value":"Y"
            },
            {
                "code":"DOC",
                "id":13170,
                "name":"Документ подтверждающий наличие права на покупку товара",
                "orderPropsId":53,
                "orderPropsXmlId":null,
                "value":{
                "contentType":"image\/jpeg",
                "description":"",
                "externalId":"89359a6dc806e5dc5404962d1be0ba42",
                "fileName":"fit.jpeg",
                "fileSize":"84058",
                "handlerId":null,
                "height":"800",
                "id":"948",
                "meta":"",
                "moduleId":"fileman",
                "originalName":"fit.jpeg",
                "src":"\/upload\/medialibrary\/5bd\/ukgwed4vdxe1qaqv85pqrvdgq5moyhqh\/fit.jpeg",
                "subdir":"medialibrary\/5bd\/ukgwed4vdxe1qaqv85pqrvdgq5moyhqh",
                "timestampX":"02.04.2024 09:13:29",
                "versionOriginalId":null,
                "width":"600"
                }
            },
            {
                "code":"MAX_DELIVERY_DAYS",
                "id":13171,
                "name":"Доставить не позднее (дней после заказа)",
                "orderPropsId":54,
                "orderPropsXmlId":null,
                "value":"10"
            },
            {
                "code":"FIO",
                "id":13163,
                "name":"Имя Фамилия",
                "orderPropsId":20,
                "orderPropsXmlId":null,
                "value":"John Smith"
            },
            {
                "code":"EMAIL",
                "id":13164,
                "name":"E-Mail",
                "orderPropsId":21,
                "orderPropsXmlId":null,
                "value":"johnsmith@example.com"
            },
            {
                "code":"PHONE",
                "id":13165,
                "name":"Телефон",
                "orderPropsId":22,
                "orderPropsXmlId":null,
                "value":"+10907996161"
            },
            {
                "code":"LOCATION",
                "id":13166,
                "name":"Местоположение",
                "orderPropsId":25,
                "orderPropsXmlId":"bx_63e3a3b974932",
                "value":"0000073738"
            },
            {
                "code":"ADDRESS",
                "id":13162,
                "name":"Адрес доставки",
                "orderPropsId":26,
                "orderPropsXmlId":null,
                "value":"900 S Holland Ave, Springfield, MO 65806, United States"
            }
        ]
    },
    "time":{
        "start":1712049055.756753,
        "finish":1712049056.823234,
        "duration":1.066481113433838,
        "processing":0.7959079742431641,
        "date_start":"2024-04-02T12:10:55+03:00",
        "date_finish":"2024-04-02T12:10:56+03:00"
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
[`sale_order_property_value[]`](../data-types.md) | Массив объектов, содержащих информацию о значениях свойств заказов ||
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
|| `200040300020` | Недостаточно прав для изменения значений свойств заказа ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Заказ не найден ||
|| `0` | Не указаны обязательные параметры ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-property-value-get.md)
- [{#T}](./sale-property-value-list.md)
- [{#T}](./sale-property-value-delete.md)
- [{#T}](./sale-property-value-get-fields.md)