# Расчитать стоимости доставки CALCULATE_URL

Запрос отправляется на адрес указанный в `CALCULATE_URL` при создании обработчика доставки в методе [sale.delivery.handler.add](../handler/sale-delivery-handler-add.md).

## Параметры запроса

#|
|| **Название**
`тип` | **Описание** ||
|| **SHIPMENT**
[`object`](../../../data-types.md) | Информация об отгрузке (подробное описание приведено [ниже](#shipment)) ||
|#

{% include [Ряд таблиц с описанием параметров](./_includes/tables.md) %}

## Пример запроса

```json
{
    "SHIPMENT":{
        "ID":4060,
        "DELIVERY_SERVICE":{
            "ID":225,
            "CONFIG":[
                {
                    "CODE":"PROFILE_TYPE",
                    "VALUE":"CARGO"
                }
            ],
            "PARENT":{
                "ID":223,
                "CONFIG":[
                    {
                        "CODE":"SETTING_1",
                        "VALUE":"String Example Value"
                    }
                ]
            }
        },
        "PRICE":179998,
        "CURRENCY":"RUB",
        "WEIGHT":600,
        "PROPERTY_VALUES":[
            {
                "ID":100,
                "TYPE":"ADDRESS",
                "VALUE":{
                    "LATITUDE":55.726421,
                    "LONGITUDE":37.61187,
                    "FIELDS":{
                        "COUNTRY":"Россия",
                        "ADM_LEVEL_1":"Москва",
                        "ADM_LEVEL_2":"Москва",
                        "ADM_LEVEL_3":"Якиманка",
                        "LOCALITY":"Москва",
                        "SUB_LOCALITY_LEVEL_1":"Центральный административный округ",
                        "STREET":"улица Шаболовка",
                        "BUILDING":"9",
                        "ADDRESS_LINE_1":"улица Шаболовка, 9"
                    }
                }
            },
            {
                "ID":101,
                "TYPE":"ADDRESS",
                "VALUE":{
                    "LATITUDE":55.724779,
                    "LONGITUDE":37.614294,
                    "FIELDS":{
                        "POSTAL_CODE":"115162",
                        "COUNTRY":"Россия",
                        "ADM_LEVEL_1":"Москва",
                        "ADM_LEVEL_2":"район Якиманка",
                        "LOCALITY":"Москва",
                        "STREET":"улица Шаболовка",
                        "BUILDING":"13 с10",
                        "ADDRESS_LINE_1":"улица Шаболовка, 13 с10"
                    }
                }
            }
        ],
        "ITEMS":[
            {
                "NAME":"iPhone 14",
                "PRICE":89999,
                "WEIGHT":300,
                "CURRENCY":"RUB",
                "QUANTITY":2,
                "DIMENSIONS":{
                    "WIDTH":400,
                    "HEIGHT":80,
                    "LENGTH":500
                }
            }
        ],
        "EXTRA_SERVICES_VALUES":[
            {
                "ID":138,
                "CODE":"cargo_type",
                "VALUE":"small_package"
            },
            {
                "ID":137,
                "CODE":"door_delivery",
                "VALUE":"Y"
            },
            {
                "ID":139,
                "CODE":"some_quantity_service",
                "VALUE":3
            }
        ],
        "RESPONSIBLE_CONTACT":{
            "NAME":"Роман Горшков",
            "PHONES":[
                {
                    "TYPE":"MOBILE",
                    "VALUE":"+79097996161"
                }
            ]
        },
        "RECIPIENT_CONTACT":{
            "NAME":"Алексей Миронов",
            "PHONES":[
                {
                    "TYPE":"WORK",
                    "VALUE":"+79097996161"
                }
            ]
        }
    }
}
```

## Параметры ответа

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **SUCCESS***
[`string`](../../../data-types.md) | Индикатор успеха расчета стоимости доставки. Возможные значения:

- `Y` — стоимость успешно рассчитана
- `N` — произошла ошибка при попытке расчета стоимости
 ||
|| **PRICE**
[`double`](../../../data-types.md) | Рассчитанная стоимость доставки в валюте службы доставки ||
|| **REASON**
[`object`](../../../data-types.md) | Причина ошибки. Передается в случае неудачной попытки расчета стоимости (подробное описание приведено [ниже](#reason)) ||
|#

### REASON

#|
|| **Название**
`тип` | **Описание** ||
|| **TEXT***
[`string`](../../../data-types.md) | Описание ошибки ||
|#

## Пример ответа с успешным расчетом стоимости

```json
{
    "SUCCESS": "Y",
    "PRICE": 79.99,
}
```

## Пример ответа с ошибкой при расчете стоимости

```json
{
    "SUCCESS": "N",
    "REASON": {
        "TEXT": "Delivery is not available for the specified address"
    }
}
```

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./create-delivery-request.md)
- [{#T}](./cancel-delivery-request.md)