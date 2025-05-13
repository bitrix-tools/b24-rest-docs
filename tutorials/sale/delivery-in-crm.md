# Настроить доставку для использования в CRM

## Создание обработчика службы доставки

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'sale.delivery.handler.add',
        {
            CODE: "uber",
            NAME: "Uber",
            SETTINGS: {
                CALCULATE_URL: "https://gateway.bx/calculate.php",
                CREATE_DELIVERY_REQUEST_URL: "https://gateway.bx/create_delivery_request.php",
                CANCEL_DELIVERY_REQUEST_URL: "https://gateway.bx/cancel_delivery_request.php",
                HAS_CALLBACK_TRACKING_SUPPORT: "Y",
                CONFIG: [
                    {
                        TYPE: "STRING",
                        CODE: "MY_FIRST_SETTING",
                        NAME: "My first setting",
                    },
                    {
                        TYPE: "STRING",
                        CODE: "MY_SECOND_SETTING",
                        NAME: "My second setting",
                    },
                ],
            },
            PROFILES: [
                {
                    NAME: "Taxi",
                    CODE: "TAXI",
                    DESCRIPTION: "Taxi Delivery",
                },
                {
                    NAME: "Cargo",
                    CODE: "CARGO",
                    DESCRIPTION: "Cargo Delivery",
                },
            ],
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

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.delivery.handler.add',
        [
            'CODE' => 'uber',
            'NAME' => 'Uber',
            'SETTINGS' => [
                'CALCULATE_URL' => 'https://gateway.bx/calculate.php',
                'CREATE_DELIVERY_REQUEST_URL' => 'https://gateway.bx/create_delivery_request.php',
                'CANCEL_DELIVERY_REQUEST_URL' => 'https://gateway.bx/cancel_delivery_request.php',
                'HAS_CALLBACK_TRACKING_SUPPORT' => 'Y',
                'CONFIG' => [
                    [
                        'TYPE' => 'STRING',
                        'CODE' => 'MY_FIRST_SETTING',
                        'NAME' => 'My first setting',
                    ],
                    [
                        'TYPE' => 'STRING',
                        'CODE' => 'MY_SECOND_SETTING',
                        'NAME' => 'My second setting',
                    ],
                ],
            ],
            'PROFILES' => [
                [
                    'NAME' => 'Taxi',
                    'CODE' => 'TAXI',
                    'DESCRIPTION' => 'Taxi Delivery',
                ],
                [
                    'NAME' => 'Cargo',
                    'CODE' => 'CARGO',
                    'DESCRIPTION' => 'Cargo Delivery',
                ],
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Пример ответа:

```json
{
    "result": 23,
    "time": {
        "start": 1714736790.260814,
        "finish": 1714736791.896773,
        "duration": 1.6359591484069824,
        "processing": 0.03880000114440918,
        "date_start": "2024-05-03T14:46:30+03:00",
        "date_finish": "2024-05-03T14:46:31+03:00"
    }
}
```

Мы создали обработчик службы доставки с идентификатором `23`. Обработчик службы доставки — это шаблон, по которому в дальнейшем мы создадим конкретные службы доставки.

Подробнее о методе [sale.delivery.handler.add](../../api-reference/sale/delivery/handler/sale-delivery-handler-add.md).

## Создание службы доставки

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'sale.delivery.add',
        {
            REST_CODE: "uber",
            NAME: "Uber Taxi",
            CURRENCY: "RUB",
            ACTIVE: "Y",
            CONFIG: [
                {
                    CODE: "MY_FIRST_SETTING",
                    VALUE: "My first setting value",
                },
                {
                    CODE: "MY_SECOND_SETTING",
                    VALUE: "My second setting value",
                },
            ]
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

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.delivery.add',
        [
            'FIELDS' => [
                'REST_CODE' => 'uber',
                'NAME' => 'Uber Taxi',
                'CURRENCY' => 'RUB',
                'ACTIVE' => 'Y',
                'CONFIG' => [
                    [
                        'CODE' => 'MY_FIRST_SETTING',
                        'VALUE' => 'My first setting value',
                    ],
                    [
                        'CODE' => 'MY_SECOND_SETTING',
                        'VALUE' => 'My second setting value',
                    ],
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Пример ответа:

```js
{
"result":{
    "parent":{
        "NAME":"Uber Taxi",
        "ACTIVE":"Y",
        "DESCRIPTION":"",
        "CURRENCY":"RUB",
        "ID":226,
        "PARENT_ID":null,
        "SORT":100,
        "LOGOTYPE":null
    },
    "profiles":[
        {
            "NAME":"Taxi",
            "ACTIVE":"Y",
            "DESCRIPTION":"Taxi Delivery",
            "CURRENCY":"RUB",
            "ID":227,
            "PARENT_ID":226,
            "SORT":100,
            "LOGOTYPE":null
        },
        {
            "NAME":"Cargo",
            "ACTIVE":"Y",
            "DESCRIPTION":"Cargo Delivery",
            "CURRENCY":"RUB",
            "ID":228,
            "PARENT_ID":226,
            "SORT":100,
            "LOGOTYPE":null
        }
    ]
},
"time":{
    "start":1714737122.600765,
    "finish":1714737122.894801,
    "duration":0.2940359115600586,
    "processing":0.0942530632019043,
    "date_start":"2024-05-03T14:52:02+03:00",
    "date_finish":"2024-05-03T14:52:02+03:00"
}
}
```

Мы создали службу доставки с идентификатором `226`. У этой службы доставки есть две дочернихе службы доставки, профили доставки, с идентификаторами `227` и `228`.

Подробнее о методе [sale.delivery.add](../../api-reference/sale/delivery/delivery/sale-delivery-add.md).

## Создание свойств отгрузки

Чтобы при выборе службы доставки в интерфейсе менеджера была возможность выбрать адреса «Откуда» и «Куда» будет осуществляться доставка, нужно создать соответствующие свойства отгрузки. Если такие свойства ранее уже создавались, можно сразу перейти к следующему шагу привязки свойств отгрузки к службе доставки.

Создаем свойство `Address From`. 

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'sale.shipmentproperty.add', {
            fields: {
                personTypeId: 3,
                propsGroupId: 6,
                name: "Address From",
                active: "Y",
                sort: "100",
                type: "ADDRESS",
                required: "Y",
                isAddressFrom: "Y"
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

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.shipmentproperty.add',
        [
            'fields' => [
                'personTypeId' => 3,
                'propsGroupId' => 6,
                'name' => 'Address From',
                'active' => 'Y',
                'sort' => '100',
                'type' => 'ADDRESS',
                'required' => 'Y',
                'isAddressFrom' => 'Y'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Ответ:

```json
{
"result":{
    "property":{
        "active":"Y",
        "code":"",
        "defaultValue":"",
        "description":"",
        "id":102,
        "inputFieldLocation":"0",
        "isAddress":"N",
        "isAddressFrom":"Y",
        "isAddressTo":"N",
        "isEmail":"N",
        "isFiltered":"N",
        "isLocation":"N",
        "isLocation4tax":"N",
        "isPayer":"N",
        "isPhone":"N",
        "isProfileName":"N",
        "isZip":"N",
        "multiple":"N",
        "name":"Address From",
        "personTypeId":3,
        "propsGroupId":6,
        "required":"Y",
        "settings":[
            
        ],
        "sort":100,
        "type":"ADDRESS",
        "userProps":"N",
        "util":"N",
        "xmlId":"bx_6634d350b3f83"
    }
},
"time":{
    "start":1714737999.671308,
    "finish":1714738000.799885,
    "duration":1.1285769939422607,
    "processing":0.8807950019836426,
    "date_start":"2024-05-03T15:06:39+03:00",
    "date_finish":"2024-05-03T15:06:40+03:00"
}
}
```

Создаем свойство `Address To`. 

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'sale.shipmentproperty.add', {
            fields: {
                personTypeId: 3,
                propsGroupId: 6,
                name: "Address To",
                active: "Y",
                sort: "100",
                type: "ADDRESS",
                required: "Y",
                isAddressTo: "Y"
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

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.shipmentproperty.add',
        [
            'fields' => [
                'personTypeId' => 3,
                'propsGroupId' => 6,
                'name' => 'Address To',
                'active' => 'Y',
                'sort' => '100',
                'type' => 'ADDRESS',
                'required' => 'Y',
                'isAddressTo' => 'Y'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Ответ:

```json
{
"result":{
    "property":{
        "active":"Y",
        "code":"",
        "defaultValue":"",
        "description":"",
        "id":103,
        "inputFieldLocation":"0",
        "isAddress":"N",
        "isAddressFrom":"N",
        "isAddressTo":"Y",
        "isEmail":"N",
        "isFiltered":"N",
        "isLocation":"N",
        "isLocation4tax":"N",
        "isPayer":"N",
        "isPhone":"N",
        "isProfileName":"N",
        "isZip":"N",
        "multiple":"N",
        "name":"Address To",
        "personTypeId":3,
        "propsGroupId":6,
        "required":"Y",
        "settings":[
            
        ],
        "sort":100,
        "type":"ADDRESS",
        "userProps":"N",
        "util":"N",
        "xmlId":"bx_6634d380a68e5"
    }
},
"time":{
    "start":1714738048.347586,
    "finish":1714738048.713083,
    "duration":0.3654971122741699,
    "processing":0.18678808212280273,
    "date_start":"2024-05-03T15:07:28+03:00",
    "date_finish":"2024-05-03T15:07:28+03:00"
}
}
```

Мы создали два свойства отгрузки: `Address From` с идентификатором `102` и `Address To` с идентификатором `103`.

По аналогии можно создать и свойства другого типа для специфических нужд. К примеру, если нужно, чтобы менеджер мог написать комментарий для транспортной компании, то можно по аналогии создать свойство отгрузки с типом `STRING` и назвать его соответствующе «Комментарий для транспортной компании». В этом случае свойство будет отображаться у менеджера в пользовательском интерфейсе и он сможет заполнить его.

Подробнее о методе [sale.shipmentproperty.add](../../api-reference/sale/shipment-property/sale-shipment-property-add.md).

## Привязка свойств отгрузки к службе доставки

После создания свойств нужно их привязать к ранее созданным службам доставки. К настоящему моменту мы имеем две службы доставки с идентификаторами `227` и `228` и два свойства с идентификаторами `102` и `103`. К родительской службе доставки привязывать свойства не нужно.

Привязываем свойства к службе доставки с идентификатором `227`. 

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'sale.propertyrelation.add',
        {
            fields: {
                entityId: 227,
                entityType: 'D',
                propertyId: 102
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

    BX24.callMethod(
        'sale.propertyrelation.add', {
            fields: {
                entityId: 227,
                entityType: 'D',
                propertyId: 103
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

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.propertyrelation.add',
        [
            'fields' => [
                'entityId' => 227,
                'entityType' => 'D',
                'propertyId' => 102
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';

        $result = CRest::call(
        'sale.propertyrelation.add',
        [
            'fields' => [
                'entityId' => 227,
                'entityType' => 'D',
                'propertyId' => 103
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Привязываем свойства к службе доставки с идентификатором `228`. 

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'sale.propertyrelation.add', {
            fields: {
                entityId: 228,
                entityType: 'D',
                propertyId: 102
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

    BX24.callMethod(
        'sale.propertyrelation.add', {
            fields: {
                entityId: 228,
                entityType: 'D',
                propertyId: 103
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

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.propertyrelation.add',
        [
            'fields' => [
                'entityId' => 228,
                'entityType' => 'D',
                'propertyId' => 102
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';

        $result = CRest::call(
        'sale.propertyrelation.add',
        [
            'fields' => [
                'entityId' => 228,
                'entityType' => 'D',
                'propertyId' => 103
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Подробнее о методе [sale.propertyrelation.add](../../api-reference/sale/property-relation/sale-property-relation-add.md).

## Добавление услуг службам доставки

В некоторых случаях требуется дать менеджеру возможность выбора тех или иных услуг, которые могут быть доступны для службы доставки. К примеру, стоимость доставки может отличаться, если требуется доставка до двери. В этом случае можно создать услугу, которую менеджер сможет указать при расчете или оформлении доставки.

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'sale.delivery.extra.service.add', {
            DELIVERY_ID: 227,
            ACTIVE: "Y",
            CODE: "door_delivery",
            NAME: "Door Delivery",
            TYPE: "checkbox",
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

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.delivery.extra.service.add',
        [
            'DELIVERY_ID' => 227,
            'ACTIVE' => 'Y',
            'CODE' => 'door_delivery',
            'NAME' => 'Door Delivery',
            'TYPE' => 'checkbox',
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Ответ:

```js
{
    "result": 140,
    "time": {
        "start": 1714739042.228152,
        "finish": 1714739042.50093,
        "duration": 0.2727780342102051,
        "processing": 0.09131193161010742,
        "date_start": "2024-05-03T15:24:02+03:00",
        "date_finish": "2024-05-03T15:24:02+03:00"
    }
}
```

В данном примере мы создали услугу доставки до двери с символьным кодом `door_delivery` и идентификатором `140`.

Подробнее о методе [sale.delivery.extra.service.add](../../api-reference/sale/delivery/extra-service/sale-delivery-extra-service-add.md).

## Обработка запросов, поступающих на вебхуки

К данному моменту мы сделали все необходимые настройки со стороны *Битрикс24*, и менеджер уже может пользоваться созданной нами службой доставки в полной мере. Он может осуществлять предварительный расчет стоимости, оформлять заказ на доставку, а также иметь возможность отменить доставку. При создании обработчика мы указали для этого конкретные URL в параметрах.

#|
|| **Назначение** |	**Параметр** | **URL** ||
|| Предварительный расчет стоимости доставки | `CALCULATE_URL` | https://gateway.bx/calculate.php ||
|| Запрос на оформление реального заказа на доставку | `CREATE_DELIVERY_REQUEST_URL` | https://gateway.bx/create_delivery_request.php ||
|| Запрос на отмену ранее сформированного заказа на доставку | `CANCEL_DELIVERY_REQUEST_URL` | https://gateway.bx/cancel_delivery_request.php ||
|#

При поступлении запросов на данные URL внешняя система должна обрабатывать запрос и отдавать ответ в требуемом формате.

Подробнее о вебхуках в разделе [Вебхуки при работе с доставками](../../api-reference/sale/delivery/webhooks/index.md).

## Оповещения в процессе выполнения заказа на доставку

В процессе выполнения заказа на доставку внешняя система может нуждаться в возможности сообщить менеджеру или грузополучателю какую-то информацию о статусе заказа. Для этого существуют методы семейства [sale.delivery.request.*](../../api-reference/sale/delivery/delivery-request/index.md). 

#|
|| **Метод** |	**Назначение** ||
|| [sale.delivery.request.update](../../api-reference/sale/delivery/delivery-request/sale-delivery-request-update.md) | Обновляет сущность заказа на доставку: статус и набор его свойств ||

|| [sale.delivery.request.delete](../../api-reference/sale/delivery/delivery-request/sale-delivery-request-delete.md) | Сообщает об отмене заказа на доставку на стороне внешней системы и пытается отменить заказ на доставку на стороне Битрикс24 ||

|| [sale.delivery.request.sendmessage](../../api-reference/sale/delivery/delivery-request/sale-delivery-request-send-message.md) | Посылает сообщение менеджеру или грузополучателю о текущем статусе заказа на доставку ||
|#
