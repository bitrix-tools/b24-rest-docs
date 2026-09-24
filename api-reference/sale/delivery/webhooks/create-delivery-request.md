# Создать заказ на доставку CREATE_DELIVERY_REQUEST_URL

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Битрикс24 отправляет HTTP-запрос методом `POST` на адрес из параметра `CREATE_DELIVERY_REQUEST_URL`, который передан при создании обработчика доставки методом [sale.delivery.handler.add](../handler/sale-delivery-handler-add.md). Внешняя система должна создать заказ на доставку и вернуть его идентификатор в формате JSON.

## Параметры запроса

#|
|| **Название**
`тип` | **Описание** ||
|| **SHIPMENTS**
[`object[]`](../../../data-types.md) | Информация об отгрузках (подробное описание приведено [ниже](#shipment)) ||
|#

{% include [Ряд таблиц с описанием параметров](./_includes/tables.md) %}

## Примеры

Пример запроса JSON:

```json
{
    "SHIPMENTS":[
        {
            "ID":4063,
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
                    "VALUE":2
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
                        "VALUE":"+79097996162"
                    }
                ]
            }
        }
    ]
}
```

## Параметры ответа

Обработчик должен вернуть HTTP-статус `200` и JSON-объект.

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **SUCCESS***
[`string`](../../../data-types.md) | Результат создания заказа на доставку. Возможные значения:

- `Y` — заказ на доставку создан
- `N` — заказ на доставку не создан
 ||
|| **REQUEST_ID***
[`string`](../../../data-types.md) | Идентификатор созданного заказа на доставку во внешней системе. Обязателен, если `SUCCESS` = `Y` ||
|| **REASON**
[`object`](../../../data-types.md) | Причина, по которой заказ на доставку не создан. Передается, если `SUCCESS` = `N` [(подробное описание)](#reason) ||
|#

### Объект REASON {#reason}

#|
|| **Название**
`тип` | **Описание** ||
|| **TEXT***
[`string`](../../../data-types.md) | Описание ошибки ||
|#

## Пример ответа с успешным созданием заказа на доставку

```json
{
    "SUCCESS": "Y",
    "REQUEST_ID": "4757aca4931a4f029f49c0db4374d13d"
}
```

## Пример ответа с ошибкой создания заказа на доставку

```json
{
    "SUCCESS": "N",
    "REASON": {
        "TEXT": "Delivery is not available for the specified address"
    }
}
```

## Обработка ошибок

Если `SUCCESS` отсутствует или отличается от `Y`, Битрикс24 считает создание заказа неуспешным. Передайте пояснение в `REASON.TEXT`. Если поле `REASON.TEXT` отсутствует или пустое, Битрикс24 использует стандартный текст ошибки.

При `SUCCESS` = `Y` поле `REQUEST_ID` должно содержать непустую строку. Ответ без идентификатора считается ошибочным.

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./calculate.md)
- [{#T}](./cancel-delivery-request.md)
