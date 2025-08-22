# Добавить REST-обработчик платежной системы sale.paysystem.handler.add

> Scope: [`pay_system `](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM (право «Разрешить изменять настройки»)

Метод добавляет REST-обработчик платежной системы.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME***
[`string`](../data-types.md) | Название REST-обработчика ||
|| **SORT**
[`integer`](../data-types.md) | Сортировка. По умолчанию `100` ||
|| **CODE***
[`string`](../data-types.md) | Код REST-обработчика. Должен быть уникальным среди всех обработчиков ||
|| **SETTINGS***
[`object`](../data-types.md) | Настройки обработчика (подробное описание приведено [ниже](#parametr-settings)) ||
|#

### Параметр SETTINGS

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

В зависимости от используемого режима работы обязательно наличие одного из следующих параметров: `FORM_DATA`, `CHECKOUT_DATA`, `IFRAME_DATA`.

#|
|| **Название**
`тип` | **Описание** ||
|| **CODES***
[`object`](../data-types.md) | Список параметров обработчика. Ключами являются коды параметров (`string`), значениями — описания параметров (подробное описание приведено [ниже](#parametr-codes)).

Значения параметров будут доступны администратору для заполнения в настройках созданной платежной системы. Их можно задать при добавлении платежной системы в методе [sale.paysystem.add](./sale-pay-system-add.md) в параметре `SETTINGS` и изменить при помощи метода [sale.paysystem.settings.update](./sale-pay-system-settings-update.md) ||
|| **FORM_DATA**
[`object`](../data-types.md) | Настройки формы при использовании режима работы в [форме](#form) ||
|| **CHECKOUT_DATA**
[`object`](../data-types.md) | Настройки режима [Checkout](#checkout) (создание заказа на стороне сервиса и переход покупателя на эту страницу для оплаты) ||
|| **IFRAME_DATA**
[`object`](../data-types.md) | Настройки страницы, выводимой в [iframe](#iframe) на сайте продавца на странице оплаты ||
|| **CLIENT_TYPE**
[`string`](../data-types.md) | Тип покупателей, с которыми может работать обработчик. Доступные значения:
- `b2c` — физические лица
- `b2b` — юридические лица

Значение по умолчанию `b2c`
||
|| **CURRENCY**
[`crm_currency.CURRENCY[]`](../crm/data-types.md) | Список валют, работа с которыми поддерживается платежной системой. По умолчанию пуст ||
|#

### Параметр CODES

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME**
[`string`](../data-types.md) | Название параметра ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание параметра ||
|| **SORT**
[`int`](../data-types.md) | Сортировка ||
|| **GROUP**
[`string`](../data-types.md) | Код группы, к которой относится параметр ||
|| **DEFAULT**
[`object`](../data-types.md) | Описание значения по умолчанию (подробное описание приведено [ниже](#parametr-default))
||
|| **INPUT**
[`object`](../data-types.md) | Объект, описывающий поле ввода. Структура объекта содержит параметр `TYPE` — тип поля. Поддерживаемые поля: 
- `STRING` — строка
- `Y/N` — флажок
- `ENUM` — список
 ||
|#

### Параметр DEFAULT

#|
|| **Название**
`тип` | **Описание** ||
|| **PROVIDER_KEY**
[`string`](../data-types.md) | Ключ провайдера, из которого будет браться значение по умолчанию. Возможные значения ключа приведены [ниже](#vozmozhnye-znacheniya-klyucha-provider_key) ||
|| **PROVIDER_VALUE**
[`string`](../data-types.md) | Код значения, которое будет взято у провайдера. Возможные значения ключа приведены [ниже](#vozmozhnye-znacheniya-klyucha-provider_value) ||
|#

### Возможные значения ключа PROVIDER_KEY 

#|
|| **Название** | **Описание** ||
|| **ORDER** | Заказ ||
|| **PROPERTY** | Свойства счета ||
|| **PAYMENT** | Оплата ||
|| **USER** | Пользователь ||
|| **VALUE** | Произвольное значение типа строка ||
|| **Y\N** | Флажок ||
|#

### Возможные значения ключа PROVIDER_VALUE 

#|
|| **Название** | **Описание** ||
|| **ORDER** | 
- `ID` — идентификатор (для счетов соответствует `ID` счета)
- `ACCOUNT_NUMBER` — номер заказа (для счетов соответствует номеру счета)
- `ORDER_TOPIC` — тема
- `DATE_INSERT` — дата заказа (для счетов соответствует дате счета)
- `DATE_INSERT_DATE` — дата заказа без времени (для счетов соответствует дате счета)
- `DATE_BILL` — дата и время выставления
- `DATE_BILL_DATE` — дата выставления
- `DATE_PAY_BEFORE` — срок оплаты
- `SHOULD_PAY` — сумма счета (для счетов соответствует сумме счета)
- `CURRENCY` — валюта
- `PRICE` — стоимость заказа (для счетов соответствует стоимости счета)
- `PRICE_DELIVERY` — стоимость доставки
- `DISCOUNT_VALUE` — величина скидки
- `USER_ID` — код покупателя
- `PAY_SYSTEM_ID` — код платежной системы
- `DELIVERY_ID` — код службы доставки
- `TAX_VALUE` — налог
- `USER_DESCRIPTION` — комментарий
||
|| **PAYMENT** | 
- `ID` — идентификатор
- `ACCOUNT_NUMBER` — номер оплаты
- `DATE_BILL` — дата и время выставления
- `DATE_BILL_DATE` — дата выставления без времени
- `SUM` — сумма счета
- `CURRENCY` — валюта
- `PAID` — оплачено
- `DATE_PAID` — дата оплаты
- `PAY_SYSTEM_ID` — код платежной системы
- `PAY_VOUCHER_NUM` — номер ваучера
- `PAY_VOUCHER_DATE` — дата ваучера
- `DATE_PAY_BEFORE` — оплатить до
- `XML_ID` — индентификатор XML
- `PAY_SYSTEM_NAME` — название платежной системы
- `COMPANY_ID` — код компании
- `PAY_RETURN_NUM` — номер возврата
- `PAY_RETURN_DATE` — дата возврата
- `PAY_RETURN_COMMENT` — коментарий возврата
||
|| **USER** | 
- `ID` — код покупателя,
- `LOGIN` — логин
- `NAME` — имя
- `SECOND_NAME` — отчество
- `LAST_NAME` — фамилия
- `EMAIL` — EMail
- `PERSONAL_PROFESSION` — профессия
- `PERSONAL_WWW` — персональный веб-сайт
- `PERSONAL_ICQ` — номер ICQ
- `PERSONAL_GENDER` — пол
- `PERSONAL_FAX` — номер факса
- `PERSONAL_MOBILE` — номер телефона
- `PERSONAL_STREET` — адрес
- `PERSONAL_MAILBOX` — почтовый ящик
- `PERSONAL_CITY` — город
- `PERSONAL_STATE` — штат
- `PERSONAL_ZIP` — индекс
- `PERSONAL_COUNTRY` — страна
- `WORK_COMPANY` — компания
- `WORK_DEPARTMENT` — отдел
- `WORK_POSITION` — должность
- `WORK_WWW` — сайт компании
- `WORK_PHONE` — рабочий телефон
- `WORK_FAX` — рабочий факс
- `WORK_STREET` — адрес компании
- `WORK_MAILBOX` — рабочий почтовый ящик
- `WORK_CITY` — город компании
- `WORK_STATE` — штат компании
- `WORK_ZIP` — индекс компании
- `WORK_COUNTRY` — страна компании
||
|#

## Режим работы в форме {#form}

При добавлении обработчика в параметре `SETTINGS` нужно передать параметр `FORM_DATA`. Способ подходит, если от покупателя ничего не нужно запрашивать либо же нужно запросить небольшой набор данных.

Поля формы автоматически выводятся в соответствии с дизайном страницы оплаты.

Данные формы (значения `FIELDS` из `FORM_DATA`) будут отправлены на `ACTION_URI`. Помимо данных, определенных в `FORM_DATA`, с формой также будут отправлены два системных ключа:

#|
|| **Название**
`тип` | **Описание** ||
|| **BX_PAYSYSTEM_ID**
[`sale_paysystem.ID`](../sale/data-types.md) | Идентификатор платежной системы, через которую совершается оплата. Может быть использован для вызова метода оплаты [sale.paysystem.pay.payment](./sale-pay-system-pay-payment.md) ||
|| **BX_RETURN_URL**
[`string`](../data-types.md) | Адрес сайта магазина, на который будет перенаправлен пользователь ||
|#

### Параметры, передаваемые при добавлении обработчика в массиве FORM_DATA

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ACTION_URI***
[`string`](../data-types.md) | URL, на который отправляется форма ||
|| **METHOD**
[`string`](../data-types.md) | HTTP-метод, используемый при отправке формы. По умолчанию пусто, при этом используется метод [GET](https://htmlbook.ru/html/form/method) ||
|| **FIELDS**
[`object`](../data-types.md) | Описание полей формы (подробное описание приведено [ниже](#parametr-fields)) ||
|| **PARAMS**
[`object`](../data-types.md) | Описание полей формы. Параметр является устаревшим, рекомендуется использовать параметр `FIELDS`.

Представляет собой карту соответствия между названиями полей в форме (`string`) и кодами параметров обработчика (`string`): `[код_поля => код_параметра_обработчика, ...]`

Поля добавляются в форму как элементы типа `hidden`.

Если передавать и `FIELDS`, и `PARAMS`, то будет использоваться только `FIELDS`
||
|#

### Параметр FIELDS

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

Представляет собой массив описаний полей, выводимых в форме и отправляемых на `ACTION_URI`. Ключом является код поля, используемый в качестве названия поля в форме. В качестве значений используется объект параметров поля.

#|
|| **Название**
`тип` | **Описание** ||
|| **CODE***
[`string`\|`object`](../data-types.md) | Если значение ключа `CODE` имеет тип `string`, то это значение будет использоваться для поиска соответствия между полями формы и параметрами обработчика (`CODES`). Название и значение будут получены из параметров обработчика.

Если в ключе `CODE` передан `object`, то в форме оплаты будет добавлено поле согласно описанию в содержимом массива (подробное описание приведено [ниже](#parametr-code))
||
|| **VISIBLE**
[`string`](../data-types.md) | Показывается ли поле в форме для ввода. Доступные значения: 
- `Y` — да
- `N` — нет

По умолчанию значение `N`, поле выводится в форме как `hidden` ||
|#

### Параметр CODE

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME**
[`string`](../data-types.md) | Название поля ||
|| **INPUT**
[`object`](../data-types.md) | Описание поля ввода. Содержит ключ `TYPE` — тип поля, который может принимать значения: 
- `STRING` — строка
- `Y/N` — флажок
||
|#

### Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"NAME":"Обработчик.Rest FORM","CODE":"resthandlerform","SORT":100,"SETTINGS":{"CURRENCY":["RUB"],"CLIENT_TYPE":"b2c","FORM_DATA":{"ACTION_URI":"http://example.com/payment_form.php","METHOD":"POST","FIELDS":{"phone":{"VISIBLE":"Y","CODE":{"NAME":"Номер телефона","TYPE":"STRING"}},"selection":{"VISIBLE":"Y","CODE":{"NAME":"Иллюзия выбора","INPUT":{"TYPE":"Y/N"}}},"paymentId":{"CODE":"PAYMENT_ID","VISIBLE":"Y"},"serviceid":{"CODE":"REST_SERVICE_ID"}}},"CODES":{"REST_SERVICE_ID":{"NAME":"Номер магазина","DESCRIPTION":"Номер магазина","SORT":"100"},"REST_SERVICE_KEY":{"NAME":"Секретный ключ","DESCRIPTION":"Секретный ключ","SORT":"300"},"PAYMENT_ID":{"NAME":"Номер оплаты","SORT":"400","GROUP":"PAYMENT","DEFAULT":{"PROVIDER_KEY":"PAYMENT","PROVIDER_VALUE":"ACCOUNT_NUMBER"}},"PAYMENT_SHOULD_PAY":{"NAME":"Сумма оплаты","SORT":"600","GROUP":"PAYMENT","DEFAULT":{"PROVIDER_KEY":"PAYMENT","PROVIDER_VALUE":"SUM"}},"PS_CHANGE_STATUS_PAY":{"NAME":"Автоматическая смена статуса оплаты","SORT":"700","INPUT":{"TYPE":"Y/N"}},"PAYMENT_BUYER_ID":{"NAME":"Код покупателя","SORT":"1000","GROUP":"PAYMENT","DEFAULT":{"PROVIDER_KEY":"ORDER","PROVIDER_VALUE":"USER_ID"}},"PS_WORK_MODE":{"NAME":"Режим работы платёжной системы","SORT":"1100","INPUT":{"TYPE":"ENUM","OPTIONS":{"TEST":"Тестовый","REGULAR":"Рабочий"}}}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.paysystem.handler.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"NAME":"Обработчик.Rest FORM","CODE":"resthandlerform","SORT":100,"SETTINGS":{"CURRENCY":["RUB"],"CLIENT_TYPE":"b2c","FORM_DATA":{"ACTION_URI":"http://example.com/payment_form.php","METHOD":"POST","FIELDS":{"phone":{"VISIBLE":"Y","CODE":{"NAME":"Номер телефона","TYPE":"STRING"}},"selection":{"VISIBLE":"Y","CODE":{"NAME":"Иллюзия выбора","INPUT":{"TYPE":"Y/N"}}},"paymentId":{"CODE":"PAYMENT_ID","VISIBLE":"Y"},"serviceid":{"CODE":"REST_SERVICE_ID"}}},"CODES":{"REST_SERVICE_ID":{"NAME":"Номер магазина","DESCRIPTION":"Номер магазина","SORT":"100"},"REST_SERVICE_KEY":{"NAME":"Секретный ключ","DESCRIPTION":"Секретный ключ","SORT":"300"},"PAYMENT_ID":{"NAME":"Номер оплаты","SORT":"400","GROUP":"PAYMENT","DEFAULT":{"PROVIDER_KEY":"PAYMENT","PROVIDER_VALUE":"ACCOUNT_NUMBER"}},"PAYMENT_SHOULD_PAY":{"NAME":"Сумма оплаты","SORT":"600","GROUP":"PAYMENT","DEFAULT":{"PROVIDER_KEY":"PAYMENT","PROVIDER_VALUE":"SUM"}},"PS_CHANGE_STATUS_PAY":{"NAME":"Автоматическая смена статуса оплаты","SORT":"700","INPUT":{"TYPE":"Y/N"}},"PAYMENT_BUYER_ID":{"NAME":"Код покупателя","SORT":"1000","GROUP":"PAYMENT","DEFAULT":{"PROVIDER_KEY":"ORDER","PROVIDER_VALUE":"USER_ID"}},"PS_WORK_MODE":{"NAME":"Режим работы платёжной системы","SORT":"1100","INPUT":{"TYPE":"ENUM","OPTIONS":{"TEST":"Тестовый","REGULAR":"Рабочий"}}}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.paysystem.handler.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"sale.paysystem.handler.add",
    		{
    			"NAME": "Обработчик.Rest FORM",
    			"CODE": "resthandlerform",
    			"SORT": 100,
    			"SETTINGS": {
    				"CURRENCY": [
    					"RUB"
    				],
    				"CLIENT_TYPE": "b2c",
    				"FORM_DATA": {
    					"ACTION_URI": "http://example.com/payment_form.php",
    					"METHOD": "POST",
    					"FIELDS": {
    						"phone": {
    							"VISIBLE": "Y",
    							"CODE": {
    								"NAME": "Номер телефона",
    								"TYPE": "STRING"
    							}
    						},
    						"selection": {
    							"VISIBLE": "Y",
    							"CODE": {
    								"NAME": "Иллюзия выбора",
    								"INPUT": {
    									"TYPE": "Y/N"
    								}
    							}
    						},
    						"paymentId": {
    							"CODE": "PAYMENT_ID",
    							"VISIBLE": "Y"
    						},
    						"serviceid": {
    							"CODE": "REST_SERVICE_ID"
    						}
    					}
    				},
    				"CODES": {
    					"REST_SERVICE_ID": {
    						"NAME": "Номер магазина",
    						"DESCRIPTION": "Номер магазина",
    						"SORT": "100"
    					},
    					"REST_SERVICE_KEY": {
    						"NAME": "Секретный ключ",
    						"DESCRIPTION": "Секретный ключ",
    						"SORT": "300"
    					},
    					"PAYMENT_ID": {
    						"NAME": "Номер оплаты",
    						"SORT": "400",
    						"GROUP": "PAYMENT",
    						"DEFAULT": {
    							"PROVIDER_KEY": "PAYMENT",
    							"PROVIDER_VALUE": "ACCOUNT_NUMBER"
    						}
    					},
    					"PAYMENT_SHOULD_PAY": {
    						"NAME": "Сумма оплаты",
    						"SORT": "600",
    						"GROUP": "PAYMENT",
    						"DEFAULT": {
    							"PROVIDER_KEY": "PAYMENT",
    							"PROVIDER_VALUE": "SUM"
    						}
    					},
    					"PS_CHANGE_STATUS_PAY": {
    						"NAME": "Автоматическая смена статуса оплаты",
    						"SORT": "700",
    						"INPUT": {
    							"TYPE": "Y/N"
    						}
    					},
    					"PAYMENT_BUYER_ID": {
    						"NAME": "Код покупателя",
    						"SORT": "1000",
    						"GROUP": "PAYMENT",
    						"DEFAULT": {
    							"PROVIDER_KEY": "ORDER",
    							"PROVIDER_VALUE": "USER_ID"
    						}
    					},
    					"PS_WORK_MODE": {
    						"NAME": "Режим работы платёжной системы",
    						"SORT": "1100",
    						"INPUT": {
    							"TYPE": "ENUM",
    							"OPTIONS": {
    								"TEST": "Тестовый",
    								"REGULAR": "Рабочий"
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
                'sale.paysystem.handler.add',
                [
                    'NAME'     => 'Обработчик.Rest FORM',
                    'CODE'     => 'resthandlerform',
                    'SORT'     => 100,
                    'SETTINGS' => [
                        'CURRENCY'    => ['RUB'],
                        'CLIENT_TYPE' => 'b2c',
                        'FORM_DATA'   => [
                            'ACTION_URI' => 'http://example.com/payment_form.php',
                            'METHOD'     => 'POST',
                            'FIELDS'     => [
                                'phone'     => [
                                    'VISIBLE' => 'Y',
                                    'CODE'    => [
                                        'NAME' => 'Номер телефона',
                                        'TYPE' => 'STRING',
                                    ],
                                ],
                                'selection' => [
                                    'VISIBLE' => 'Y',
                                    'CODE'    => [
                                        'NAME' => 'Иллюзия выбора',
                                        'INPUT' => [
                                            'TYPE' => 'Y/N',
                                        ],
                                    ],
                                ],
                                'paymentId' => [
                                    'CODE'    => 'PAYMENT_ID',
                                    'VISIBLE' => 'Y',
                                ],
                                'serviceid' => [
                                    'CODE' => 'REST_SERVICE_ID',
                                ],
                            ],
                        ],
                        'CODES'      => [
                            'REST_SERVICE_ID'    => [
                                'NAME'        => 'Номер магазина',
                                'DESCRIPTION' => 'Номер магазина',
                                'SORT'        => '100',
                            ],
                            'REST_SERVICE_KEY'   => [
                                'NAME'        => 'Секретный ключ',
                                'DESCRIPTION' => 'Секретный ключ',
                                'SORT'        => '300',
                            ],
                            'PAYMENT_ID'         => [
                                'NAME'    => 'Номер оплаты',
                                'SORT'    => '400',
                                'GROUP'   => 'PAYMENT',
                                'DEFAULT' => [
                                    'PROVIDER_KEY'   => 'PAYMENT',
                                    'PROVIDER_VALUE' => 'ACCOUNT_NUMBER',
                                ],
                            ],
                            'PAYMENT_SHOULD_PAY' => [
                                'NAME'    => 'Сумма оплаты',
                                'SORT'    => '600',
                                'GROUP'   => 'PAYMENT',
                                'DEFAULT' => [
                                    'PROVIDER_KEY'   => 'PAYMENT',
                                    'PROVIDER_VALUE' => 'SUM',
                                ],
                            ],
                            'PS_CHANGE_STATUS_PAY' => [
                                'NAME'  => 'Автоматическая смена статуса оплаты',
                                'SORT'  => '700',
                                'INPUT' => [
                                    'TYPE' => 'Y/N',
                                ],
                            ],
                            'PAYMENT_BUYER_ID'     => [
                                'NAME'    => 'Код покупателя',
                                'SORT'    => '1000',
                                'GROUP'   => 'PAYMENT',
                                'DEFAULT' => [
                                    'PROVIDER_KEY'   => 'ORDER',
                                    'PROVIDER_VALUE' => 'USER_ID',
                                ],
                            ],
                            'PS_WORK_MODE'        => [
                                'NAME'  => 'Режим работы платёжной системы',
                                'SORT'  => '1100',
                                'INPUT' => [
                                    'TYPE'    => 'ENUM',
                                    'OPTIONS' => [
                                        'TEST'    => 'Тестовый',
                                        'REGULAR' => 'Рабочий',
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
        echo 'Error adding payment system handler: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.paysystem.handler.add",
        {
            "NAME": "Обработчик.Rest FORM",
            "CODE": "resthandlerform",
            "SORT": 100,
            "SETTINGS": {
                "CURRENCY": [
                    "RUB"
                ],
                "CLIENT_TYPE": "b2c",
                "FORM_DATA": {
                    "ACTION_URI": "http://example.com/payment_form.php",
                    "METHOD": "POST",
                    "FIELDS": {
                        "phone": {
                            "VISIBLE": "Y",
                            "CODE": {
                                "NAME": "Номер телефона",
                                "TYPE": "STRING"
                            }
                        },
                        "selection": {
                            "VISIBLE": "Y",
                            "CODE": {
                                "NAME": "Иллюзия выбора",
                                "INPUT": {
                                    "TYPE": "Y/N"
                                }
                            }
                        },
                        "paymentId": {
                            "CODE": "PAYMENT_ID",
                            "VISIBLE": "Y"
                        },
                        "serviceid": {
                            "CODE": "REST_SERVICE_ID"
                        }
                    }
                },
                "CODES": {
                    "REST_SERVICE_ID": {
                        "NAME": "Номер магазина",
                        "DESCRIPTION": "Номер магазина",
                        "SORT": "100"
                    },
                    "REST_SERVICE_KEY": {
                        "NAME": "Секретный ключ",
                        "DESCRIPTION": "Секретный ключ",
                        "SORT": "300"
                    },
                    "PAYMENT_ID": {
                        "NAME": "Номер оплаты",
                        "SORT": "400",
                        "GROUP": "PAYMENT",
                        "DEFAULT": {
                            "PROVIDER_KEY": "PAYMENT",
                            "PROVIDER_VALUE": "ACCOUNT_NUMBER"
                        }
                    },
                    "PAYMENT_SHOULD_PAY": {
                        "NAME": "Сумма оплаты",
                        "SORT": "600",
                        "GROUP": "PAYMENT",
                        "DEFAULT": {
                            "PROVIDER_KEY": "PAYMENT",
                            "PROVIDER_VALUE": "SUM"
                        }
                    },
                    "PS_CHANGE_STATUS_PAY": {
                        "NAME": "Автоматическая смена статуса оплаты",
                        "SORT": "700",
                        "INPUT": {
                            "TYPE": "Y/N"
                        }
                    },
                    "PAYMENT_BUYER_ID": {
                        "NAME": "Код покупателя",
                        "SORT": "1000",
                        "GROUP": "PAYMENT",
                        "DEFAULT": {
                            "PROVIDER_KEY": "ORDER",
                            "PROVIDER_VALUE": "USER_ID"
                        }
                    },
                    "PS_WORK_MODE": {
                        "NAME": "Режим работы платёжной системы",
                        "SORT": "1100",
                        "INPUT": {
                            "TYPE": "ENUM",
                            "OPTIONS": {
                                "TEST": "Тестовый",
                                "REGULAR": "Рабочий"
                            }
                        }
                    }
                }
            }
        }
        ,
        function (result) {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.paysystem.handler.add',
        [
            'NAME' => 'Обработчик.Rest FORM',
            'CODE' => 'resthandlerform',
            'SORT' => 100,
            'SETTINGS' => [
                'CURRENCY' => ['RUB'],
                'CLIENT_TYPE' => 'b2c',
                'FORM_DATA' => [
                    'ACTION_URI' => 'http://example.com/payment_form.php',
                    'METHOD' => 'POST',
                    'FIELDS' => [
                        'phone' => [
                            'VISIBLE' => 'Y',
                            'CODE' => [
                                'NAME' => 'Номер телефона',
                                'TYPE' => 'STRING'
                            ]
                        ],
                        'selection' => [
                            'VISIBLE' => 'Y',
                            'CODE' => [
                                'NAME' => 'Иллюзия выбора',
                                'INPUT' => [
                                    'TYPE' => 'Y/N'
                                ]
                            ]
                        ],
                        'paymentId' => [
                            'CODE' => 'PAYMENT_ID',
                            'VISIBLE' => 'Y'
                        ],
                        'serviceid' => [
                            'CODE' => 'REST_SERVICE_ID'
                        ]
                    ]
                ],
                'CODES' => [
                    'REST_SERVICE_ID' => [
                        'NAME' => 'Номер магазина',
                        'DESCRIPTION' => 'Номер магазина',
                        'SORT' => '100'
                    ],
                    'REST_SERVICE_KEY' => [
                        'NAME' => 'Секретный ключ',
                        'DESCRIPTION' => 'Секретный ключ',
                        'SORT' => '300'
                    ],
                    'PAYMENT_ID' => [
                        'NAME' => 'Номер оплаты',
                        'SORT' => '400',
                        'GROUP' => 'PAYMENT',
                        'DEFAULT' => [
                            'PROVIDER_KEY' => 'PAYMENT',
                            'PROVIDER_VALUE' => 'ACCOUNT_NUMBER'
                        ]
                    ],
                    'PAYMENT_SHOULD_PAY' => [
                        'NAME' => 'Сумма оплаты',
                        'SORT' => '600',
                        'GROUP' => 'PAYMENT',
                        'DEFAULT' => [
                            'PROVIDER_KEY' => 'PAYMENT',
                            'PROVIDER_VALUE' => 'SUM'
                        ]
                    ],
                    'PS_CHANGE_STATUS_PAY' => [
                        'NAME' => 'Автоматическая смена статуса оплаты',
                        'SORT' => '700',
                        'INPUT' => [
                            'TYPE' => 'Y/N'
                        ]
                    ],
                    'PAYMENT_BUYER_ID' => [
                        'NAME' => 'Код покупателя',
                        'SORT' => '1000',
                        'GROUP' => 'PAYMENT',
                        'DEFAULT' => [
                            'PROVIDER_KEY' => 'ORDER',
                            'PROVIDER_VALUE' => 'USER_ID'
                        ]
                    ],
                    'PS_WORK_MODE' => [
                        'NAME' => 'Режим работы платёжной системы',
                        'SORT' => '1100',
                        'INPUT' => [
                            'TYPE' => 'ENUM',
                            'OPTIONS' => [
                                'TEST' => 'Тестовый',
                                'REGULAR' => 'Рабочий'
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

## Режим работы Checkout {#checkout}

При добавлении обработчика в параметр `SETTINGS` нужно передать `CHECKOUT_DATA`.

По адресу из `ACTION_URI` должен располагаться скрипт, который обработает полученные данные, создаст оплату и вернет идентификатор созданной оплаты и URL страницы оплаты.

На `ACTION_URI` будут передаваться данные для оплаты в виде массива. Он содержит массив системных параметров в ключе `BX_SYSTEM_PARAMS` и значения `FIELDS` из `CHECKOUT_DATA`, каждое отдельным ключом на верхнем уровне массива. 

Структура массива `BX_SYSTEM_PARAMS`:

#|
|| **Название**
`тип` | **Описание** ||
|| **RETURN_URL**
[`string`](../data-types.md) | Текущая страница ||
|| **PAYSYSTEM_ID**
[`sale_paysystem.ID`](../sale/data-types.md) | Идентификатор платежной системы ||
|| **PAYMENT_ID**
[`sale_order_payment.id`](../sale/data-types.md) | Идентификатор оплаты ||
|| **SUM**
[`double`](../data-types.md) | Сумма платежа ||
|| **CURRENCY**
[`string`](../data-types.md) | Валюта ||
|| **EXTERNAL_PAYMENT_ID**
[`string`](../data-types.md) | Идентификатор платежа в платежной системе (если он есть). Например, если для текущей оплаты уже отправлялся запрос на `ACTION_URI` ||
|#

В ответ на запрос к `ACTION_URI` скрипт должен вернуть идентификатор созданной оплаты и URL страницы оплаты.

#|
|| **Название**
`тип` | **Описание** ||
|| **PAYMENT_URL**
[`string`](../data-types.md) | URL страницы оплаты ||
|| **PAYMENT_ID**
[`string`](../data-types.md) | Идентификатор платежа в платежной системе ||
|#

Покупатель перейдет по ссылке из `PAYMENT_URL` автоматически или по клику на кнопку «Купить». Если в `FIELDS` среди прочих переданы поля, предназначенные для заполнения через форму, то покупателю будет выведена форма.

В результате можно вернуть массив ошибок в ключе `PAYMENT_ERRORS`. Менеджер увидит ошибки в таймлайне или на странице оплаты (зависит от используемого шаблона).

#|
|| **Название**
`тип` | **Описание** ||
|| **PAYMENT_ERRORS**
[`string[]`](../data-types.md) | Список ошибок, возникших при создании оплаты ||
|#

Если ничего не возвращать, то будет использоваться ошибка по умолчанию `Ошибка регистрации заказа в платёжной системе (Error registering order in payment system)`.

### Параметры, передаваемые при добавлении обработчика в массиве CHECKOUT_DATA

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ACTION_URI***
[`string`](../data-types.md) | URL, на который отправляется запрос на создание оплаты ||
|| **FIELDS**
[`object`](../data-types.md) | Описание полей, передаваемых на `ACTION_URI`. Формат аналогичен полю [FIELDS](#parametr-fields) в режиме работы в форме (`FORM_DATA`) ||
|#

### Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"NAME":"Обработчик.Rest CHECKOUT","CODE":"resthandlercheckout","SORT":100,"SETTINGS":{"CURRENCY":["RUB"],"CLIENT_TYPE":"b2c","CHECKOUT_DATA":{"ACTION_URI":"http://example.com/payment_checkout.php","FIELDS":{"serviceKey":{"CODE":"REST_SERVICE_KEY_CHECKOUT"},"serviceid":{"CODE":"REST_SERVICE_ID_CHECKOUT"}}},"CODES":{"REST_SERVICE_ID_CHECKOUT":{"NAME":"Номер магазина","DESCRIPTION":"Номер магазина","SORT":"100"},"REST_SERVICE_KEY_CHECKOUT":{"NAME":"Секретный ключ","DESCRIPTION":"Секретный ключ","SORT":"300"},"PS_WORK_MODE_CHECKOUT":{"NAME":"Режим работы платёжной системы","SORT":"1100","INPUT":{"TYPE":"ENUM","OPTIONS":{"TEST":"Тестовый","REGULAR":"Рабочий"}}}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.paysystem.handler.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"NAME":"Обработчик.Rest CHECKOUT","CODE":"resthandlercheckout","SORT":100,"SETTINGS":{"CURRENCY":["RUB"],"CLIENT_TYPE":"b2c","CHECKOUT_DATA":{"ACTION_URI":"http://example.com/payment_checkout.php","FIELDS":{"serviceKey":{"CODE":"REST_SERVICE_KEY_CHECKOUT"},"serviceid":{"CODE":"REST_SERVICE_ID_CHECKOUT"}}},"CODES":{"REST_SERVICE_ID_CHECKOUT":{"NAME":"Номер магазина","DESCRIPTION":"Номер магазина","SORT":"100"},"REST_SERVICE_KEY_CHECKOUT":{"NAME":"Секретный ключ","DESCRIPTION":"Секретный ключ","SORT":"300"},"PS_WORK_MODE_CHECKOUT":{"NAME":"Режим работы платёжной системы","SORT":"1100","INPUT":{"TYPE":"ENUM","OPTIONS":{"TEST":"Тестовый","REGULAR":"Рабочий"}}}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.paysystem.handler.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"sale.paysystem.handler.add",
    		{
    			"NAME": "Обработчик.Rest CHECKOUT",
    			"CODE": "resthandlercheckout",
    			"SORT": 100,
    			"SETTINGS": {
    				"CURRENCY": [
    					"RUB"
    				],
    				"CLIENT_TYPE": "b2c",
    				"CHECKOUT_DATA": {
    					"ACTION_URI": "http://example.com/payment_checkout.php",
    					"FIELDS": {
    						"serviceKey": {
    							"CODE": "REST_SERVICE_KEY_CHECKOUT",
    						},
    						"serviceid": {
    							"CODE": "REST_SERVICE_ID_CHECKOUT"
    						}
    					}
    				},
    				"CODES": {
    					"REST_SERVICE_ID_CHECKOUT": {
    						"NAME": "Номер магазина",
    						"DESCRIPTION": "Номер магазина",
    						"SORT": "100"
    					},
    					"REST_SERVICE_KEY_CHECKOUT": {
    						"NAME": "Секретный ключ",
    						"DESCRIPTION": "Секретный ключ",
    						"SORT": "300"
    					},
    					"PS_WORK_MODE_CHECKOUT": {
    						"NAME": "Режим работы платёжной системы",
    						"SORT": "1100",
    						"INPUT": {
    							"TYPE": "ENUM",
    							"OPTIONS": {
    								"TEST": "Тестовый",
    								"REGULAR": "Рабочий"
    							}
    						}
    					}
    				}
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info("Обработчик добавлен с ID " + result);
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
                'sale.paysystem.handler.add',
                [
                    'NAME'     => 'Обработчик.Rest CHECKOUT',
                    'CODE'     => 'resthandlercheckout',
                    'SORT'     => 100,
                    'SETTINGS' => [
                        'CURRENCY'    => ['RUB'],
                        'CLIENT_TYPE' => 'b2c',
                        'CHECKOUT_DATA' => [
                            'ACTION_URI' => 'http://example.com/payment_checkout.php',
                            'FIELDS'     => [
                                'serviceKey' => [
                                    'CODE' => 'REST_SERVICE_KEY_CHECKOUT',
                                ],
                                'serviceid'  => [
                                    'CODE' => 'REST_SERVICE_ID_CHECKOUT'
                                ]
                            ]
                        ],
                        'CODES' => [
                            'REST_SERVICE_ID_CHECKOUT' => [
                                'NAME'        => 'Номер магазина',
                                'DESCRIPTION' => 'Номер магазина',
                                'SORT'        => '100'
                            ],
                            'REST_SERVICE_KEY_CHECKOUT' => [
                                'NAME'        => 'Секретный ключ',
                                'DESCRIPTION' => 'Секретный ключ',
                                'SORT'        => '300'
                            ],
                            'PS_WORK_MODE_CHECKOUT'     => [
                                'NAME'  => 'Режим работы платёжной системы',
                                'SORT'  => '1100',
                                'INPUT' => [
                                    'TYPE'    => 'ENUM',
                                    'OPTIONS' => [
                                        'TEST'    => 'Тестовый',
                                        'REGULAR' => 'Рабочий'
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Обработчик добавлен с ID ' . $result;
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding paysystem handler: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.paysystem.handler.add",
        {
            "NAME": "Обработчик.Rest CHECKOUT",
            "CODE": "resthandlercheckout",
            "SORT": 100,
            "SETTINGS": {
                "CURRENCY": [
                    "RUB"
                ],
                "CLIENT_TYPE": "b2c",
                "CHECKOUT_DATA": {
                    "ACTION_URI": "http://example.com/payment_checkout.php",
                    "FIELDS": {
                        "serviceKey": {
                            "CODE": "REST_SERVICE_KEY_CHECKOUT",
                        },
                        "serviceid": {
                            "CODE": "REST_SERVICE_ID_CHECKOUT"
                        }
                    }
                },
                "CODES": {
                    "REST_SERVICE_ID_CHECKOUT": {
                        "NAME": "Номер магазина",
                        "DESCRIPTION": "Номер магазина",
                        "SORT": "100"
                    },
                    "REST_SERVICE_KEY_CHECKOUT": {
                        "NAME": "Секретный ключ",
                        "DESCRIPTION": "Секретный ключ",
                        "SORT": "300"
                    },
                    "PS_WORK_MODE_CHECKOUT": {
                        "NAME": "Режим работы платёжной системы",
                        "SORT": "1100",
                        "INPUT": {
                            "TYPE": "ENUM",
                            "OPTIONS": {
                                "TEST": "Тестовый",
                                "REGULAR": "Рабочий"
                            }
                        }
                    }
                }
            }
        }
        ,
        function (result) {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info("Обработчик добавлен с ID " + result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.paysystem.handler.add',
        [
            'NAME' => 'Обработчик.Rest CHECKOUT',
            'CODE' => 'resthandlercheckout',
            'SORT' => 100,
            'SETTINGS' => [
                'CURRENCY' => ['RUB'],
                'CLIENT_TYPE' => 'b2c',
                'CHECKOUT_DATA' => [
                    'ACTION_URI' => 'http://example.com/payment_checkout.php',
                    'FIELDS' => [
                        'serviceKey' => [
                            'CODE' => 'REST_SERVICE_KEY_CHECKOUT',
                        ],
                        'serviceid' => [
                            'CODE' => 'REST_SERVICE_ID_CHECKOUT'
                        ]
                    ]
                ],
                'CODES' => [
                    'REST_SERVICE_ID_CHECKOUT' => [
                        'NAME' => 'Номер магазина',
                        'DESCRIPTION' => 'Номер магазина',
                        'SORT' => '100'
                    ],
                    'REST_SERVICE_KEY_CHECKOUT' => [
                        'NAME' => 'Секретный ключ',
                        'DESCRIPTION' => 'Секретный ключ',
                        'SORT' => '300'
                    ],
                    'PS_WORK_MODE_CHECKOUT' => [
                        'NAME' => 'Режим работы платёжной системы',
                        'SORT' => '1100',
                        'INPUT' => [
                            'TYPE' => 'ENUM',
                            'OPTIONS' => [
                                'TEST' => 'Тестовый',
                                'REGULAR' => 'Рабочий'
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

## Режим работы IFrame {#iframe}

При добавлении обработчика в параметр `SETTINGS` нужно передать `IFRAME_DATA`.

По адресу из `ACTION_URI` должна располагаться страница, которая будет загружена в iframe на сайт продавца.

При загрузке iframe через метод [Window.postMessage()](https://developer.mozilla.org/ru/docs/Web/API/Window/postMessage) на `ACTION_URI` будут переданы значения `FIELDS` из `IFRAME_DATA` (каждое отдельным ключом на верхнем уровне массива), а также следующие данные:

#|
|| **Название**
`тип` | **Описание** ||
|| **BX_SYSTEM_PARAMS**
[`object`](../data-types.md) | Системные параметры ||
|| **BX_COMPUTED_STYLE**
[`object`](../data-types.md) | Cтили родительского элемента iframe, полученные методом [window.getComputedStyle()](https://developer.mozilla.org/ru/docs/Web/API/Window/getComputedStyle) ||
|#

Данные, передаваемые в `BX_SYSTEM_PARAMS`:

#|
|| **Название**
`тип` | **Описание** ||
|| **RETURN_URL**
[`string`](../data-types.md) | Текущая страница ||
|| **PAYSYSTEM_ID**
[`sale_paysystem.ID`](../sale/data-types.md) | Идентификатор платежной системы ||
|| **PAYMENT_ID**
[`sale_order_payment.id`](../sale/data-types.md) | Идентификатор оплаты ||
|| **SUM**
[`string`](../data-types.md) | Сумма платежа ||
|| **CURRENCY**
[`string`](../data-types.md) | Валюта ||
|#

Получить значения в iframe можно через обработчик события `message`, например:

```js
document.addEventListener("DOMContentLoaded", function() {
	window.addEventListener("message", function (event) {
		// получение данных от сайта (от платёжной системы)
		var paymentData = event.data;
		// работа с BX_SYSTEM_PARAMS
		if (paymentData.BX_SYSTEM_PARAMS)
		{
			// ...
		}
		// использование стилей сайта
		if (paymentData.BX_COMPUTED_STYLE)
		{
			document.body.style.background = paymentData.BX_COMPUTED_STYLE.background;
			document.body.style.color = paymentData.BX_COMPUTED_STYLE.color;
		}
	}, false);
});
```

По умолчанию ширина iframe — 100% родительского элемента, а высота — 350px.

Размеры iframe можно изменить. Для этого нужно из iframe передать высоту и/или ширину на сайт продавца. Например:

```js
document.addEventListener("DOMContentLoaded", function() {
	var size = {
		width: document.body.scrollWidth,
		height: document.body.scrollHeight
	};
	// отправка данных на сайт продавца
	parent.postMessage(size, "*");
});
```
`width` и `height` — зарезервированные названия переменных, и на сайте продавца обрабатываются только они.

### Параметры, передаваемые при добавлении обработчика в массиве IFRAME_DATA

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ACTION_URI***
[`string`](../data-types.md) | URL страницы, которая будет выведена в элементе iframe ||
|| **FIELDS**
[`object`](../data-types.md) | Описание полей, передаваемых в `iframe`. Формат аналогичен полю [FIELDS](#parametr-fields) в режиме работы в форме (`FORM_DATA`) ||
|#

### Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"NAME":"Обработчик.Rest IFrame","CODE":"resthandleriframe","SORT":100,"SETTINGS":{"CURRENCY":["RUB"],"CLIENT_TYPE":"b2c","IFRAME_DATA":{"ACTION_URI":"http://example.com/payment_iframe.php","FIELDS":{"serviceKey":{"CODE":"REST_SERVICE_KEY_IFRAME"},"serviceid":{"CODE":"REST_SERVICE_ID_IFRAME"}}},"CODES":{"REST_SERVICE_ID_IFRAME":{"NAME":"Номер магазина","DESCRIPTION":"Номер магазина","SORT":"100"},"REST_SERVICE_KEY_IFRAME":{"NAME":"Секретный ключ","DESCRIPTION":"Секретный ключ","SORT":"300"},"PS_WORK_MODE_IFRAME":{"NAME":"Режим работы платёжной системы","SORT":"1100","INPUT":{"TYPE":"ENUM","OPTIONS":{"TEST":"Тестовый","REGULAR":"Рабочий"}}}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.paysystem.handler.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"NAME":"Обработчик.Rest IFrame","CODE":"resthandleriframe","SORT":100,"SETTINGS":{"CURRENCY":["RUB"],"CLIENT_TYPE":"b2c","IFRAME_DATA":{"ACTION_URI":"http://example.com/payment_iframe.php","FIELDS":{"serviceKey":{"CODE":"REST_SERVICE_KEY_IFRAME"},"serviceid":{"CODE":"REST_SERVICE_ID_IFRAME"}}},"CODES":{"REST_SERVICE_ID_IFRAME":{"NAME":"Номер магазина","DESCRIPTION":"Номер магазина","SORT":"100"},"REST_SERVICE_KEY_IFRAME":{"NAME":"Секретный ключ","DESCRIPTION":"Секретный ключ","SORT":"300"},"PS_WORK_MODE_IFRAME":{"NAME":"Режим работы платёжной системы","SORT":"1100","INPUT":{"TYPE":"ENUM","OPTIONS":{"TEST":"Тестовый","REGULAR":"Рабочий"}}}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.paysystem.handler.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"sale.paysystem.handler.add",
    		{
    			"NAME": "Обработчик.Rest IFrame",
    			"CODE": "resthandleriframe",
    			"SORT": 100,
    			"SETTINGS": {
    				"CURRENCY": [
    					"RUB"
    				],
    				"CLIENT_TYPE": "b2c",
    				"IFRAME_DATA": {
    					"ACTION_URI": "http://example.com/payment_iframe.php",
    					"FIELDS": {
    						"serviceKey": {
    							"CODE": "REST_SERVICE_KEY_IFRAME",
    						},
    						"serviceid": {
    							"CODE": "REST_SERVICE_ID_IFRAME"
    						}
    					}
    				},
    				"CODES": {
    					"REST_SERVICE_ID_IFRAME": {
    						"NAME": "Номер магазина",
    						"DESCRIPTION": "Номер магазина",
    						"SORT": "100"
    					},
    					"REST_SERVICE_KEY_IFRAME": {
    						"NAME": "Секретный ключ",
    						"DESCRIPTION": "Секретный ключ",
    						"SORT": "300"
    					},
    					"PS_WORK_MODE_IFRAME": {
    						"NAME": "Режим работы платёжной системы",
    						"SORT": "1100",
    						"INPUT": {
    							"TYPE": "ENUM",
    							"OPTIONS": {
    								"TEST": "Тестовый",
    								"REGULAR": "Рабочий"
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
                'sale.paysystem.handler.add',
                [
                    'NAME'     => 'Обработчик.Rest IFrame',
                    'CODE'     => 'resthandleriframe',
                    'SORT'     => 100,
                    'SETTINGS' => [
                        'CURRENCY'    => ['RUB'],
                        'CLIENT_TYPE' => 'b2c',
                        'IFRAME_DATA' => [
                            'ACTION_URI' => 'http://example.com/payment_iframe.php',
                            'FIELDS'     => [
                                'serviceKey' => [
                                    'CODE' => 'REST_SERVICE_KEY_IFRAME',
                                ],
                                'serviceid'  => [
                                    'CODE' => 'REST_SERVICE_ID_IFRAME'
                                ]
                            ]
                        ],
                        'CODES'      => [
                            'REST_SERVICE_ID_IFRAME' => [
                                'NAME'        => 'Номер магазина',
                                'DESCRIPTION' => 'Номер магазина',
                                'SORT'        => '100'
                            ],
                            'REST_SERVICE_KEY_IFRAME' => [
                                'NAME'        => 'Секретный ключ',
                                'DESCRIPTION' => 'Секретный ключ',
                                'SORT'        => '300'
                            ],
                            'PS_WORK_MODE_IFRAME'     => [
                                'NAME'  => 'Режим работы платёжной системы',
                                'SORT'  => '1100',
                                'INPUT' => [
                                    'TYPE'    => 'ENUM',
                                    'OPTIONS' => [
                                        'TEST'    => 'Тестовый',
                                        'REGULAR' => 'Рабочий'
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding payment system handler: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.paysystem.handler.add",
        {
            "NAME": "Обработчик.Rest IFrame",
            "CODE": "resthandleriframe",
            "SORT": 100,
            "SETTINGS": {
                "CURRENCY": [
                    "RUB"
                ],
                "CLIENT_TYPE": "b2c",
                "IFRAME_DATA": {
                    "ACTION_URI": "http://example.com/payment_iframe.php",
                    "FIELDS": {
                        "serviceKey": {
                            "CODE": "REST_SERVICE_KEY_IFRAME",
                        },
                        "serviceid": {
                            "CODE": "REST_SERVICE_ID_IFRAME"
                        }
                    }
                },
                "CODES": {
                    "REST_SERVICE_ID_IFRAME": {
                        "NAME": "Номер магазина",
                        "DESCRIPTION": "Номер магазина",
                        "SORT": "100"
                    },
                    "REST_SERVICE_KEY_IFRAME": {
                        "NAME": "Секретный ключ",
                        "DESCRIPTION": "Секретный ключ",
                        "SORT": "300"
                    },
                    "PS_WORK_MODE_IFRAME": {
                        "NAME": "Режим работы платёжной системы",
                        "SORT": "1100",
                        "INPUT": {
                            "TYPE": "ENUM",
                            "OPTIONS": {
                                "TEST": "Тестовый",
                                "REGULAR": "Рабочий"
                            }
                        }
                    }
                }
            }
        }
        ,
        function (result) {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.paysystem.handler.add',
        [
            'NAME' => 'Обработчик.Rest IFrame',
            'CODE' => 'resthandleriframe',
            'SORT' => 100,
            'SETTINGS' => [
                'CURRENCY' => ['RUB'],
                'CLIENT_TYPE' => 'b2c',
                'IFRAME_DATA' => [
                    'ACTION_URI' => 'http://example.com/payment_iframe.php',
                    'FIELDS' => [
                        'serviceKey' => [
                            'CODE' => 'REST_SERVICE_KEY_IFRAME',
                        ],
                        'serviceid' => [
                            'CODE' => 'REST_SERVICE_ID_IFRAME'
                        ]
                    ]
                ],
                'CODES' => [
                    'REST_SERVICE_ID_IFRAME' => [
                        'NAME' => 'Номер магазина',
                        'DESCRIPTION' => 'Номер магазина',
                        'SORT' => '100'
                    ],
                    'REST_SERVICE_KEY_IFRAME' => [
                        'NAME' => 'Секретный ключ',
                        'DESCRIPTION' => 'Секретный ключ',
                        'SORT' => '300'
                    ],
                    'PS_WORK_MODE_IFRAME' => [
                        'NAME' => 'Режим работы платёжной системы',
                        'SORT' => '1100',
                        'INPUT' => [
                            'TYPE' => 'ENUM',
                            'OPTIONS' => [
                                'TEST' => 'Тестовый',
                                'REGULAR' => 'Рабочий'
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
    "result": 5,
    "time": {
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00",
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
[`sale_paysystem_handler.ID`](../sale/data-types.md#sale_paysystem_handler) | Идентификатор созданного обработчика, используемый в дальнейшем для его обновления и удаления ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_HANDLER_ALREADY_EXIST",
    "error_description": "Handler already exists!"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `ACCESS_DENIED` | Недостаточно прав для добавления обработчика | 403 ||
|| `ERROR_CHECK_FAILURE` | Не указано значение обязательного поля либо значение одного из полей указано неверно | 400 ||
|| `ERROR_HANDLER_ALREADY_EXIST` | Обработчик с кодом, указанным в параметре `CODE`, уже существует в системе | 400 ||
|| `ERROR_HANDLER_ADD` | Прочие ошибки. Подробную информацию об ошибке смотрите в `error_description` | 400 ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-pay-system-handler-update.md)
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


