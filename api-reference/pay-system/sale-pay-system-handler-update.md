# Обновить REST-обработчик платежной системы sale.paysystem.handler.update

> Scope: [`pay_system `](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM (право «Разрешить изменять настройки»)

Метод обновляет REST-обработчик платежной системы.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`sale_paysystem_handler.ID`](../sale/data-types.md) | Идентификатор REST-обработчика ||
|| **FIELDS***
[`object`](../data-types.md) | Набор значений для обновления (подробное описание приведено [ниже](#parametr-fields)) ||
|#

### Параметр FIELDS

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME**
[`string`](../data-types.md) | Название обработчика ||
|| **CODE**
[`string`](../data-types.md) | Уникальный код обработчика в системе ||
|| **SETTINGS**
[`object`](../data-types.md) | Настройки обработчика. Формат аналогичен формату в [sale.paysystem.handler.add](./sale-pay-system-handler-add.md) ||
|| **SORT**
[`integer`](../data-types.md) | Сортировка ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":3,"FIELDS":{"CODE":"newresthandlercode","NAME":"Новое название обработчика","SORT":200,"SETTINGS":{"CURRENCY":["RUB","BYN"],"FORM_DATA":{"ACTION_URI":"http://example.com/payment_form.php","METHOD":"POST","PARAMS":{"serviceid":"REST_SERVICE_ID_2","invoiceNumber":"PAYMENT_ID_2","Sum":"PAYMENT_SHOULD_PAY_2","customer":"PAYMENT_BUYER_ID_2"},"CODES":{"REST_SERVICE_ID_2":{"NAME":"Номер магазина","DESCRIPTION":"Номер магазина","SORT":"100"},"REST_SERVICE_KEY_2":{"NAME":"Секретный ключ","DESCRIPTION":"Секретный ключ","SORT":"300"},"PAYMENT_ID_2":{"NAME":"Номер оплаты","SORT":"400","GROUP":"PAYMENT","DEFAULT":{"PROVIDER_KEY":"PAYMENT","PROVIDER_VALUE":"ACCOUNT_NUMBER"}},"PAYMENT_SHOULD_PAY_2":{"NAME":"Сумма оплаты","SORT":"600","GROUP":"PAYMENT","DEFAULT":{"PROVIDER_KEY":"PAYMENT","PROVIDER_VALUE":"SUM"}},"PS_CHANGE_STATUS_PAY_2":{"NAME":"Автоматическая смена статуса оплаты","SORT":"700","INPUT":{"TYPE":"Y/N"}},"PAYMENT_BUYER_ID_2":{"NAME":"Код покупателя","SORT":"1000","GROUP":"PAYMENT","DEFAULT":{"PROVIDER_KEY":"ORDER","PROVIDER_VALUE":"USER_ID"}}}}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.paysystem.handler.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":3,"FIELDS":{"CODE":"newresthandlercode","NAME":"Новое название обработчика","SORT":200,"SETTINGS":{"CURRENCY":["RUB","BYN"],"FORM_DATA":{"ACTION_URI":"http://example.com/payment_form.php","METHOD":"POST","PARAMS":{"serviceid":"REST_SERVICE_ID_2","invoiceNumber":"PAYMENT_ID_2","Sum":"PAYMENT_SHOULD_PAY_2","customer":"PAYMENT_BUYER_ID_2"},"CODES":{"REST_SERVICE_ID_2":{"NAME":"Номер магазина","DESCRIPTION":"Номер магазина","SORT":"100"},"REST_SERVICE_KEY_2":{"NAME":"Секретный ключ","DESCRIPTION":"Секретный ключ","SORT":"300"},"PAYMENT_ID_2":{"NAME":"Номер оплаты","SORT":"400","GROUP":"PAYMENT","DEFAULT":{"PROVIDER_KEY":"PAYMENT","PROVIDER_VALUE":"ACCOUNT_NUMBER"}},"PAYMENT_SHOULD_PAY_2":{"NAME":"Сумма оплаты","SORT":"600","GROUP":"PAYMENT","DEFAULT":{"PROVIDER_KEY":"PAYMENT","PROVIDER_VALUE":"SUM"}},"PS_CHANGE_STATUS_PAY_2":{"NAME":"Автоматическая смена статуса оплаты","SORT":"700","INPUT":{"TYPE":"Y/N"}},"PAYMENT_BUYER_ID_2":{"NAME":"Код покупателя","SORT":"1000","GROUP":"PAYMENT","DEFAULT":{"PROVIDER_KEY":"ORDER","PROVIDER_VALUE":"USER_ID"}}}}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.paysystem.handler.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"sale.paysystem.handler.update",
    		{
    			'ID': 3,
    			'FIELDS': {
    				'CODE': 'newresthandlercode',
    				'NAME': 'Новое название обработчика',
    				'SORT': 200,
    				'SETTINGS': {
    					"CURRENCY": [
    						"RUB", "BYN"
    					],
    					"FORM_DATA": {
    						"ACTION_URI": "http://example.com/payment_form.php",
    						"METHOD": "POST",
    						"PARAMS": {
    							"serviceid": "REST_SERVICE_ID_2",
    							"invoiceNumber": "PAYMENT_ID_2",
    							"Sum": "PAYMENT_SHOULD_PAY_2",
    							"customer": "PAYMENT_BUYER_ID_2"
    						}
    					},
    					"CODES": {
    						"REST_SERVICE_ID_2": {
    							"NAME": "Номер магазина",
    							"DESCRIPTION": "Номер магазина",
    							"SORT": "100"
    						},
    						"REST_SERVICE_KEY_2": {
    							"NAME": "Секретный ключ",
    							"DESCRIPTION": "Секретный ключ",
    							"SORT": "300"
    						},
    						"PAYMENT_ID_2": {
    							"NAME": "Номер оплаты",
    							"SORT": "400",
    							"GROUP": "PAYMENT",
    							"DEFAULT": {
    								"PROVIDER_KEY": "PAYMENT",
    								"PROVIDER_VALUE": "ACCOUNT_NUMBER"
    							}
    						},
    						"PAYMENT_SHOULD_PAY_2": {
    							"NAME": "Сумма оплаты",
    							"SORT": "600",
    							"GROUP": "PAYMENT",
    							"DEFAULT": {
    								"PROVIDER_KEY": "PAYMENT",
    								"PROVIDER_VALUE": "SUM"
    							}
    						},
    						"PS_CHANGE_STATUS_PAY_2": {
    							"NAME": "Автоматическая смена статуса оплаты",
    							"SORT": "700",
    							"INPUT": {
    								"TYPE": "Y/N"
    							}
    						},
    						"PAYMENT_BUYER_ID_2": {
    							"NAME": "Код покупателя",
    							"SORT": "1000",
    							"GROUP": "PAYMENT",
    							"DEFAULT": {
    								"PROVIDER_KEY": "ORDER",
    								"PROVIDER_VALUE": "USER_ID"
    							}
    						}
    					}
    				}
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
                'sale.paysystem.handler.update',
                [
                    'ID'     => 3,
                    'FIELDS' => [
                        'CODE'     => 'newresthandlercode',
                        'NAME'     => 'Новое название обработчика',
                        'SORT'     => 200,
                        'SETTINGS' => [
                            'CURRENCY'  => ['RUB', 'BYN'],
                            'FORM_DATA' => [
                                'ACTION_URI' => 'http://example.com/payment_form.php',
                                'METHOD'     => 'POST',
                                'PARAMS'     => [
                                    'serviceid'    => 'REST_SERVICE_ID_2',
                                    'invoiceNumber' => 'PAYMENT_ID_2',
                                    'Sum'          => 'PAYMENT_SHOULD_PAY_2',
                                    'customer'     => 'PAYMENT_BUYER_ID_2',
                                ],
                            ],
                            'CODES'    => [
                                'REST_SERVICE_ID_2' => [
                                    'NAME'        => 'Номер магазина',
                                    'DESCRIPTION' => 'Номер магазина',
                                    'SORT'        => '100',
                                ],
                                'REST_SERVICE_KEY_2' => [
                                    'NAME'        => 'Секретный ключ',
                                    'DESCRIPTION' => 'Секретный ключ',
                                    'SORT'        => '300',
                                ],
                                'PAYMENT_ID_2' => [
                                    'NAME'   => 'Номер оплаты',
                                    'SORT'   => '400',
                                    'GROUP'  => 'PAYMENT',
                                    'DEFAULT' => [
                                        'PROVIDER_KEY'  => 'PAYMENT',
                                        'PROVIDER_VALUE' => 'ACCOUNT_NUMBER',
                                    ],
                                ],
                                'PAYMENT_SHOULD_PAY_2' => [
                                    'NAME'   => 'Сумма оплаты',
                                    'SORT'   => '600',
                                    'GROUP'  => 'PAYMENT',
                                    'DEFAULT' => [
                                        'PROVIDER_KEY'  => 'PAYMENT',
                                        'PROVIDER_VALUE' => 'SUM',
                                    ],
                                ],
                                'PS_CHANGE_STATUS_PAY_2' => [
                                    'NAME'  => 'Автоматическая смена статуса оплаты',
                                    'SORT'  => '700',
                                    'INPUT' => [
                                        'TYPE' => 'Y/N',
                                    ],
                                ],
                                'PAYMENT_BUYER_ID_2' => [
                                    'NAME'   => 'Код покупателя',
                                    'SORT'   => '1000',
                                    'GROUP'  => 'PAYMENT',
                                    'DEFAULT' => [
                                        'PROVIDER_KEY'  => 'ORDER',
                                        'PROVIDER_VALUE' => 'USER_ID',
                                    ],
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
        echo 'Error updating payment system handler: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.paysystem.handler.update",
        {
            'ID': 3,
            'FIELDS': {
                'CODE': 'newresthandlercode',
                'NAME': 'Новое название обработчика',
                'SORT': 200,
                'SETTINGS': {
                    "CURRENCY": [
                        "RUB", "BYN"
                    ],
                    "FORM_DATA": {
                        "ACTION_URI": "http://example.com/payment_form.php",
                        "METHOD": "POST",
                        "PARAMS": {
                            "serviceid": "REST_SERVICE_ID_2",
                            "invoiceNumber": "PAYMENT_ID_2",
                            "Sum": "PAYMENT_SHOULD_PAY_2",
                            "customer": "PAYMENT_BUYER_ID_2"
                        }
                    },
                    "CODES": {
                        "REST_SERVICE_ID_2": {
                            "NAME": "Номер магазина",
                            "DESCRIPTION": "Номер магазина",
                            "SORT": "100"
                        },
                        "REST_SERVICE_KEY_2": {
                            "NAME": "Секретный ключ",
                            "DESCRIPTION": "Секретный ключ",
                            "SORT": "300"
                        },
                        "PAYMENT_ID_2": {
                            "NAME": "Номер оплаты",
                            "SORT": "400",
                            "GROUP": "PAYMENT",
                            "DEFAULT": {
                                "PROVIDER_KEY": "PAYMENT",
                                "PROVIDER_VALUE": "ACCOUNT_NUMBER"
                            }
                        },
                        "PAYMENT_SHOULD_PAY_2": {
                            "NAME": "Сумма оплаты",
                            "SORT": "600",
                            "GROUP": "PAYMENT",
                            "DEFAULT": {
                                "PROVIDER_KEY": "PAYMENT",
                                "PROVIDER_VALUE": "SUM"
                            }
                        },
                        "PS_CHANGE_STATUS_PAY_2": {
                            "NAME": "Автоматическая смена статуса оплаты",
                            "SORT": "700",
                            "INPUT": {
                                "TYPE": "Y/N"
                            }
                        },
                        "PAYMENT_BUYER_ID_2": {
                            "NAME": "Код покупателя",
                            "SORT": "1000",
                            "GROUP": "PAYMENT",
                            "DEFAULT": {
                                "PROVIDER_KEY": "ORDER",
                                "PROVIDER_VALUE": "USER_ID"
                            }
                        }
                    }
                }
            }
        }
        ,
        function (result) {
            if (result.error()) {
                console.error(result.error());
            }
            else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.paysystem.handler.update',
        [
            'ID' => 3,
            'FIELDS' => [
                'CODE' => 'newresthandlercode',
                'NAME' => 'Новое название обработчика',
                'SORT' => 200,
                'SETTINGS' => [
                    'CURRENCY' => ['RUB', 'BYN'],
                    'FORM_DATA' => [
                        'ACTION_URI' => 'http://example.com/payment_form.php',
                        'METHOD' => 'POST',
                        'PARAMS' => [
                            'serviceid' => 'REST_SERVICE_ID_2',
                            'invoiceNumber' => 'PAYMENT_ID_2',
                            'Sum' => 'PAYMENT_SHOULD_PAY_2',
                            'customer' => 'PAYMENT_BUYER_ID_2'
                        ]
                    ],
                    'CODES' => [
                        'REST_SERVICE_ID_2' => [
                            'NAME' => 'Номер магазина',
                            'DESCRIPTION' => 'Номер магазина',
                            'SORT' => '100'
                        ],
                        'REST_SERVICE_KEY_2' => [
                            'NAME' => 'Секретный ключ',
                            'DESCRIPTION' => 'Секретный ключ',
                            'SORT' => '300'
                        ],
                        'PAYMENT_ID_2' => [
                            'NAME' => 'Номер оплаты',
                            'SORT' => '400',
                            'GROUP' => 'PAYMENT',
                            'DEFAULT' => [
                                'PROVIDER_KEY' => 'PAYMENT',
                                'PROVIDER_VALUE' => 'ACCOUNT_NUMBER'
                            ]
                        ],
                        'PAYMENT_SHOULD_PAY_2' => [
                            'NAME' => 'Сумма оплаты',
                            'SORT' => '600',
                            'GROUP' => 'PAYMENT',
                            'DEFAULT' => [
                                'PROVIDER_KEY' => 'PAYMENT',
                                'PROVIDER_VALUE' => 'SUM'
                            ]
                        ],
                        'PS_CHANGE_STATUS_PAY_2' => [
                            'NAME' => 'Автоматическая смена статуса оплаты',
                            'SORT' => '700',
                            'INPUT' => [
                                'TYPE' => 'Y/N'
                            ]
                        ],
                        'PAYMENT_BUYER_ID_2' => [
                            'NAME' => 'Код покупателя',
                            'SORT' => '1000',
                            'GROUP' => 'PAYMENT',
                            'DEFAULT' => [
                                'PROVIDER_KEY' => 'ORDER',
                                'PROVIDER_VALUE' => 'USER_ID'
                            ]
                        ]
                    ]
                ]
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
    "result": true,
    "time": {
        "start": 1712135335.026931,
        "finish": 1712135335.407762,
        "duration": 0.3808310031890869,
        "processing": 0.0336611270904541,
        "date_start": "2024-04-03T11:08:55+02:00",
        "date_finish": "2024-04-03T11:08:55+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | Результат обновления REST-обработчика ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_HANDLER_NOT_FOUND",
    "error_description": "Handler not found"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `ACCESS_DENIED` | Доступ запрещен. Приложение пытается изменить обработчик, добавленный другим приложением, либо недостаточно прав для обновления обработчика | 403 ||
|| `ERROR_CHECK_FAILURE` | Не указано значение поля `ID` либо `FIELDS` | 400 ||
|| `ERROR_HANDLER_NOT_FOUND` | Обработчик с указанным `ID` не найден | 400 ||
|| `ERROR_HANDLER_UPDATE` | Прочие ошибки. Подробную информацию об ошибке смотрите в `error_description` | 400 ||
|| `ERROR_UNEXPECTED_ANSWER` | Неожиданный ответ сервера. Одна из возможных причин — попытка указать обработчику неуникальный параметр `CODE`, уже существующий у другого обработчика | 400 ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-pay-system-handler-add.md)
- [{#T}](./sale-pay-system-handler-list.md)
- [{#T}](./sale-pay-system-handler-delete.md)
- [{#T}](./sale-pay-system-add.md)
- [{#T}](./sale-pay-system-update.md)
- [{#T}](./sale-pay-system-list.md)
- [{#T}](./sale-pay-system-settings-get.md)
- [{#T}](./sale-pay-system-settings-update.md)
- [{#T}](./sale-pay-system-delete.md)
- [{#T}](./sale-pay-system-pay-payment.md)
- [{#T}](./sale-pay-system-pay-invoice.md)
- [{#T}](./sale-pay-system-settings-payment-get.md)
- [{#T}](./sale-pay-system-settings-invoice-get.md)