# Настроить службу доставки для CRM

> Scope: [`sale`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: администратор

К Битрикс24 можно подключать внешние сервисы доставки. Это позволяет менеджеру работать со службой доставки в карточках CRM: рассчитывать стоимость и отслеживать статус.

Чтобы настроить службу доставки, последовательно выполним методы:

1. [sale.delivery.handler.add](../../api-reference/sale/delivery/handler/sale-delivery-handler-add.md) — зарегистрируем обработчик доставки,

2. [sale.delivery.add](../../api-reference/sale/delivery/delivery/sale-delivery-add.md) — создадим родительскую службу и профили, которые привязаны к обработчику,

3. [sale.shipmentproperty.add](../../api-reference/sale/shipment-property/sale-shipment-property-add.md) — добавим свойства отгрузки для адресов,

4. [sale.propertyrelation.add](../../api-reference/sale/property-relation/sale-property-relation-add.md) — привяжем свойства к профилям доставки.

5. [sale.delivery.extra.service.add](../../api-reference/sale/delivery/extra-service/sale-delivery-extra-service-add.md) — подключим дополнительные услуги.

## 1\. Создадим обработчик службы доставки

Зарегистрируем обработчик с помощью [sale.delivery.handler.add](../../api-reference/sale/delivery/handler/sale-delivery-handler-add.md). В метод передадим четыре параметра.

- `CODE` — символьный код обработчика службы доставки. Укажем, например, `uber`.

- `NAME` — название обработчика службы доставки. Передадим `Uber`.

- `SETTINGS` — объект с информацией о настройках обработчика.

    - `CALCULATE_URL` — URL расчета стоимости доставки, например `https://gateway.bx/calculate.php`.

    - `CREATE_DELIVERY_REQUEST_URL` — URL оформления доставки. Укажем `https://gateway.bx/create_delivery_request.php`.

    - `CANCEL_DELIVERY_REQUEST_URL` — URL отмены доставки, например `https://gateway.bx/cancel_delivery_request.php`.

    - `HAS_CALLBACK_TRACKING_SUPPORT` — индикатор, будет ли служба присылать оповещения. Зададим `Y`. Создать оповещения можно с помощью [sale.delivery.request.sendmessage](../../api-reference/sale/delivery/delivery-request/sale-delivery-request-send-message.md).

    - `CONFIG` — список настроек. Укажем `MY_FIRST_SETTING` и `MY_SECOND_SETTING` с типом `STRING`.

- `PROFILES` — массив профилей доставки. Обработчик должен иметь хотя бы один профиль. Зададим `Taxi` и `Cargo`.

Сервис доставки по указанным URL должен принять запрос, обработать его и выдать ответ в формате, который ожидает CRM.

Подробнее о формате запросов и ответов читайте в разделе [Вебхуки при работе с доставками](../../api-reference/sale/delivery/webhooks/index.md).

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

Если обработчик успешно добавлен, метод вернет его идентификатор. Если получили ошибку `error`, изучите описание возможных ошибок в документации метода [sale.delivery.handler.add](../../api-reference/sale/delivery/handler/sale-delivery-handler-add.md).

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

## 2\. Создадим службу доставки {#second}

Создадим службу доставки с помощью метода [sale.delivery.add](../../api-reference/sale/delivery/delivery/sale-delivery-add.md). В метод передадим следующие параметры:

- `REST_CODE` — символьный код обработчика службы доставки. Укажем `uber`, который задали на первом шаге.

- `NAME` — название службы доставки, например, `Uber Taxi`.

- `CURRENCY` — символьный код валюты. Передадим `RUB`. Получить список валют можно с помощью метода [crm.currency.list](../../api-reference/crm/currency/crm-currency-list.md).

- `ACTIVE` — флаг активности службы доставки. Укажем `Y`.

- `CONFIG` — значения настроек обработчика. Передаем значения для `MY_FIRST_SETTING` и `MY_SECOND_SETTING`, которые задали на первом шаге.

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
    );
    
    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Если служба доставки успешно создана, метод вернет объект родительской службы и массив профилей. Если получили ошибку `error`, изучите описание возможных ошибок в документации метода [sale.delivery.add](../../api-reference/sale/delivery/delivery/sale-delivery-add.md).

```json
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

## 3\. Создадим свойства отгрузки {#third}

В отгрузке менеджер указывает адрес отправки и адрес доставки. Последовательно создадим два свойства `Address From` и `Address To` с помощью метода [sale.shipmentproperty.add](../../api-reference/sale/shipment-property/sale-shipment-property-add.md).

### Свойство Address From

В метод передадим объект `fields` со значениями полей свойства `Address From`.

- `personTypeId` — идентификатор типа плательщика. Передадим `3`. Список типов можно получить с помощью метода [sale.persontype.list](../../api-reference/sale/person-type/sale-person-type-list.md).

- `propsGroupId` — идентификатор группы свойств. Укажем `6`. Список групп можно получить методом [sale.propertygroup.list](../../api-reference/sale/property-group/sale-property-group-list.md).

- `name` — название свойства отгрузки. Укажем `Address From`.

- `active` — флаг активности. Передадим `Y`.

- `sort` — сортировка.

- `type` — тип свойства отгрузки. Передадим `ADDRESS`. Список возможных значений смотрите в документации метода [sale.shipmentproperty.add](../../api-reference/sale/shipment-property/sale-shipment-property-add.md).

- `required` — флаг, обязательное ли свойство. Укажем `Y`.

- `isAddressFrom` — флаг, используется ли свойство отгрузки как адрес отправителя. Передадим `Y`.

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

Если свойство успешно добавлено, метод вернет объект `property` с идентификатором свойства. Если получили ошибку `error`, изучите описание возможных ошибок в документации метода [sale.shipmentproperty.add](../../api-reference/sale/shipment-property/sale-shipment-property-add.md).

```json
{
"result":{
    "property":{
        "active":"Y",
        "code":"",
        "defaultValue":"",
        "description":"",
        "id":102,
        "isAddressFrom":"Y",
        "isAddressTo":"N",
        "maxLength":"",
        "name":"Address From",
        "personTypeId":3,
        "propsGroupId":6,
        "required":"Y",
        "settings":[],
        "sort":100,
        "type":"ADDRESS",
        "xmlId":""
    }
},
"time":{
    "start":1714741422.531968,
    "finish":1714741422.644666,
    "duration":0.11269783973693848,
    "processing":0.06191205978393555,
    "date_start":"2024-05-03T15:43:42+03:00",
    "date_finish":"2024-05-03T15:43:42+03:00"
}
}
```

### Свойство Address To

В объекте `fields` для свойства `Address To` передаем название `Address To`. Остальные параметры — аналогично `Address From`.

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

Если свойство успешно добавлено, метод вернет объект `property` с идентификатором свойства. Если получили ошибку `error`, изучите описание возможных ошибок в документации метода [sale.shipmentproperty.add](../../api-reference/sale/shipment-property/sale-shipment-property-add.md).

```json
{
"result":{
    "property":{
        "active":"Y",
        "code":"",
        "defaultValue":"",
        "description":"",
        "id":103,
        "isAddressFrom":"N",
        "isAddressTo":"Y",
        "maxLength":"",
        "name":"Address To",
        "personTypeId":3,
        "propsGroupId":6,
        "required":"Y",
        "settings":[],
        "sort":100,
        "type":"ADDRESS",
        "xmlId":""
    }
},
"time":{
    "start":1714741719.195657,
    "finish":1714741719.368018,
    "duration":0.17236113548278809,
    "processing":0.0712430477142334,
    "date_start":"2024-05-03T15:48:39+03:00",
    "date_finish":"2024-05-03T15:48:39+03:00"
}
}
```

## 4\. Привяжем свойства отгрузки к службе доставки

Чтобы привязать свойства `Address From` и `Address To` к профилям `Taxi` и `Cargo`, вызовем метод [sale.propertyrelation.add](../../api-reference/sale/property-relation/sale-property-relation-add.md) четыре раза. В метод передадим объект `fields` со значениями полей для привязки свойств.

- `entityId` — идентификатор профиля доставки. Для профиля `Taxi` передадим `227`, для `Cargo` — `228`, которые были получены [на втором шаге](#second).

- `entityType` — тип объекта. Возможные значения: `P` — платежная система, `D` — доставка, `L` — лендинг, `T` — торговая платформа. Укажем значение `D`.

- `propertyId` — идентификатор свойства. Для `Address From` укажем `102`, для `Address To` — `103`, которые были получены [на третьем шаге](#third).

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
    ```

{% endlist %}

Вызываем метод [sale.propertyrelation.add](../../api-reference/sale/property-relation/sale-property-relation-add.md) по очереди.

1. Служба `Taxi`, свойство `Address From` — передаем `entityId: 227, propertyId: 102`.

2. Служба `Taxi`, свойство `Address To` — передаем `entityId: 227, propertyId: 103`.

3. Служба `Cargo`, свойство `Address From` — передаем `entityId: 228, propertyId: 102`.

4. Служба `Cargo`, свойство `Address To` — передаем `entityId: 228, propertyId: 103`.

Если привязки успешно добавлены, метод вернет объекты с информацией о них. Если получили ошибку `error`, изучите описание возможных ошибок в документации метода [sale.propertyrelation.add](../../api-reference/sale/property-relation/sale-property-relation-add.md).

```json
{
    "result": {
        "propertyRelation": {
            "entityId": 227,
            "entityType": "D",
            "propertyId": 102
        }
    },
    "time": {
        "start": 1712244475.495277,
        "finish": 1712244476.402808,
        "duration": 0.9075310230255127,
        "processing": 0.08538603782653809,
        "date_start": "2024-05-03T18:27:55+03:00",
        "date_finish": "2024-05-03T18:27:56+03:00"
    }
}
```

## 5\. Добавим услуги в службы доставки

Чтобы добавить дополнительную услугу в службу доставки, вызовем метод [sale.delivery.extra.service.add](../../api-reference/sale/delivery/extra-service/sale-delivery-extra-service-add.md). В него передадим следующие параметры:

- `DELIVERY_ID` — идентификатор службы доставки, к которой будет привязана услуга. Для профиля `Taxi` укажем идентификатор `227`, который получен [на втором шаге](#second). Для других профилей подставьте собственный идентификатор. Получить список идентификаторов служб доставки можно с помощью метода [sale.delivery.getlist](../../api-reference/sale/delivery/delivery/sale-delivery-get-list.md).

- `ACTIVE` — флаг активности услуги. Возможные значения: `Y` — да, `N` — нет. Передадим `Y`.

- `CODE` — символьный код услуги. Укажем `door_delivery`.

- `NAME` — название услуги, например, `Door Delivery`.

- `TYPE` — тип услуги. Возможные значения: `enum` — список, `checkbox` — единичная услуга, `quantity` — количественная услуга. Укажем `checkbox`.

- `PRICE` — стоимость услуги типа в валюте службы доставки. Укажем `1000`.

    {% note info "" %}

    Для услуг типа `enum` стоимость указывается с помощью параметра `ITEMS`. Подробнее читайте в документации к методу [sale.delivery.extra.service.add](../../api-reference/sale/delivery/extra-service/sale-delivery-extra-service-add.md).

    {% endnote %}

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
            PRICE: 1000
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
            'PRICE' => 1000,
        ]
    );
    
    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Если услуга добавлена, метод вернет идентификатор в параметре `result`. Если получили ошибку `error`, изучите описание возможных ошибок в документации метода [sale.delivery.extra.service.add](../../api-reference/sale/delivery/extra-service/sale-delivery-extra-service-add.md).

```json
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

## Оповещения о статусах доставки

Чтобы отправлять уведомления о ходе доставки, можно использовать методы группы [sale.delivery.request.\*](../../api-reference/sale/delivery/delivery-request/index.md).

#|
|| **Метод** | **Описание** ||
|| [sale.delivery.request.update](../../api-reference/sale/delivery/delivery-request/sale-delivery-request-update.md) | Обновляет объект заказа на доставку: статус и набор его свойств ||
|| [sale.delivery.request.sendmessage](../../api-reference/sale/delivery/delivery-request/sale-delivery-request-send-message.md) | Посылает сообщение менеджеру или грузополучателю о текущем статусе заказа на доставку ||
|| [sale.delivery.request.delete](../../api-reference/sale/delivery/delivery-request/sale-delivery-request-delete.md) | Сообщает об отмене заказа на доставку на стороне внешней системы и пытается отменить заказ на доставку на стороне Битрикс24 ||
|#