# Добавить обработчик кассы sale.cashbox.handler.add

> Scope: [`sale, cashbox`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM (право «Разрешить изменять настройки»)

Метод добавляет REST-обработчик кассы.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CODE***
[`string`](../../data-types.md) | Код REST-обработчика. Должен быть уникальным среди всех обработчиков ||
|| **NAME***
[`string`](../../data-types.md) | Название REST-обработчика ||
|| **SORT**
[`integer`](../../data-types.md) | Сортировка. Значение по умолчанию: `100` ||
|| **SUPPORTS_FFD105**
[`string`](../../data-types.md) | Поддерживает ли касса формат фискальных данных версии 1.05. Возможные значения:
- `Y` — да
- `N` — нет
  
Значение по умолчанию: `N` ||
|| **SETTINGS***
[`object`](../../data-types.md) | Настройки обработчика (подробное описание приведено [ниже](#settings)) ||
|#

### Параметр SETTINGS {#settings}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **PRINT_URL***
[`string`](../../data-types.md) | Адрес, на который отправляются данные для печати чека ||
|| **CHECK_URL***
[`string`](../../data-types.md) | Адрес, по которому происходит проверка статуса чека ||
|| **HTTP_VERSION**
[`string`](../../data-types.md) | Версия протокола HTTP, используемая для запросов. Возможные значения: `1.0`, `1.1`. 

Если параметр не заполнен, то для запросов используется HTTP `1.0` ||
|| **CONFIG***
[`object`](../../data-types.md) | Структура настроек (подробное описание приведено [ниже](#settingsconfig)), которые пользователь сможет устанавливать и изменять на странице редактирования кассы, а также при добавлении или обновлении кассы через REST. 

Каждый ключ в этом параметре задает один раздел на странице настроек, ключ является кодом раздела. Значения объекта описывают раздел и содержащиеся в нем настройки
||
|#

### Параметр SETTINGS\[CONFIG] {#settingsconfig}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **LABEL***
[`string`](../../data-types.md) | Заголовок раздела ||
|| **ITEMS***
[`object`](../../data-types.md) | Список настроек раздела (подробное описание приведено [ниже](#settingsconfigitems)). 

Ключ является кодом настройки, значение — описанием настройки 
||
|#

### Параметр SETTINGS\[CONFIG]\[код раздела]\[ITEMS] {#settingsconfigitems}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TYPE***
[`string`](../../data-types.md) | Тип настройки. Возможные значения:

- `STRING` — строка
- `NUMBER` — число с плавающей точкой
- `Y/N` — строка, принимающая значения `Y` или `N`
- `ENUM` — список строковых значений
- `DATE` — дата ||
|| **LABEL***
[`string`](../../data-types.md) | Название настройки ||
|| **REQUIRED***
[`string`](../../data-types.md) | Является ли настройка обязательной. Возможные значения:

- `Y` — да
- `N` — нет
||
||  **DISABLED**
[`string`](../../data-types.md) | Отключена ли возможность редактирования настройки. Возможные значения:

- `Y` — да
- `N` — нет

Значение по умолчанию: `N` ||
||  **MULTIPLE**
[`string`](../../data-types.md) | Является ли настройка множественной. Возможные значения:

- `Y` — да
- `N` — нет

Значение по умолчанию: `N` ||
||  **MULTILINE**
[`string`](../../data-types.md) | Является ли поле многострочным. Используется для типа `STRING`. Возможные значения:

- `Y` — да
- `N` — нет

Значение по умолчанию: `N` ||
||  **OPTIONS***
[`object`](../../data-types.md) | Список возможных значений свойства. Используется для типа `ENUM`. 

Ключ объекта — значение свойства, значение ключа — название значения, отображаемое в интерфейсе ||
||  **TIME**
[`string`](../../data-types.md) | Есть ли возможность выбрать время. Используется для типа `DATE`. Возможные значения:

- `Y` — да
- `N` — нет

Значение по умолчанию: `N`
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CODE":"restcashbox01","NAME":"REST-касса 01","SORT":100,"SUPPORTS_FFD105":"Y","SETTINGS":{"PRINT_URL":"http://example.com/rest_print.php","CHECK_URL":"http://example.com/rest_check.php","HTTP_VERSION":"1.1","CONFIG":{"AUTH":{"LABEL":"Авторизация","ITEMS":{"KEYWORD":{"TYPE":"STRING","LABEL":"Кодовое слово"},"PREFERENCE":{"TYPE":"ENUM","LABEL":"Множественный выбор","REQUIRED":"Y","OPTIONS":{"FIRST":"Первый","SECOND":"Второй","THIRD":"Третий"}}}},"INTERACTION":{"LABEL":"Настройки взаимодействия с кассой","ITEMS":{"MODE":{"TYPE":"ENUM","LABEL":"Режим работы с кассой","OPTIONS":{"ACTIVE":"боевой","TEST":"тестовый"}}}}}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.cashbox.handler.add
    ```

- cURL (OAuth)

    ```bash
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CODE":"restcashbox01","NAME":"REST-касса 01","SORT":100,"SUPPORTS_FFD105":"Y","SETTINGS":{"PRINT_URL":"http://example.com/rest_print.php","CHECK_URL":"http://example.com/rest_check.php","HTTP_VERSION":"1.1","CONFIG":{"AUTH":{"LABEL":"Авторизация","ITEMS":{"KEYWORD":{"TYPE":"STRING","LABEL":"Кодовое слово"},"PREFERENCE":{"TYPE":"ENUM","LABEL":"Множественный выбор","REQUIRED":"Y","OPTIONS":{"FIRST":"Первый","SECOND":"Второй","THIRD":"Третий"}}}},"INTERACTION":{"LABEL":"Настройки взаимодействия с кассой","ITEMS":{"MODE":{"TYPE":"ENUM","LABEL":"Режим работы с кассой","OPTIONS":{"ACTIVE":"боевой","TEST":"тестовый"}}}}}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.cashbox.handler.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"sale.cashbox.handler.add",
    		{
    			"CODE": "restcashbox01",
    			"NAME": "REST-касса 01",
    			"SORT": 100,
    			"SUPPORTS_FFD105": "Y",
    			"SETTINGS":
    			{
    				"PRINT_URL": "http://example.com/rest_print.php",
    				"CHECK_URL": "http://example.com/rest_check.php",
    				"HTTP_VERSION": "1.1",
    				"CONFIG":
    				{
    					"AUTH": {
    						"LABEL": "Авторизация",
    						"ITEMS": {
    							"KEYWORD": {
    								"TYPE": "STRING",
    								"LABEL": "Кодовое слово"
    							},
    							"PREFERENCE": {
    								"TYPE": "ENUM",
    								"LABEL": "Множественный выбор",
    								"REQUIRED": "Y",
    								"OPTIONS": {
    									"FIRST": "Первый",
    									"SECOND": "Второй",
    									"THIRD": "Третий",
    								}
    							}
    						}
    					},
    					"INTERACTION": {
    						"LABEL": "Настройки взаимодействия с кассой",
    						"ITEMS": {
    							"MODE": {
    								"TYPE": "ENUM",
    								"LABEL": "Режим работы с кассой",
    								"OPTIONS": {
    									"ACTIVE": "боевой",
    									"TEST": "тестовый"
    								}
    							}
    						}
    					}
    				}
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
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
                'sale.cashbox.handler.add',
                [
                    'CODE'          => 'restcashbox01',
                    'NAME'          => 'REST-касса 01',
                    'SORT'          => 100,
                    'SUPPORTS_FFD105' => 'Y',
                    'SETTINGS'      => [
                        'PRINT_URL'    => 'http://example.com/rest_print.php',
                        'CHECK_URL'    => 'http://example.com/rest_check.php',
                        'HTTP_VERSION' => '1.1',
                        'CONFIG'       => [
                            'AUTH'       => [
                                'LABEL' => 'Авторизация',
                                'ITEMS' => [
                                    'KEYWORD'    => [
                                        'TYPE'  => 'STRING',
                                        'LABEL' => 'Кодовое слово',
                                    ],
                                    'PREFERENCE' => [
                                        'TYPE'     => 'ENUM',
                                        'LABEL'    => 'Множественный выбор',
                                        'REQUIRED' => 'Y',
                                        'OPTIONS'  => [
                                            'FIRST'  => 'Первый',
                                            'SECOND' => 'Второй',
                                            'THIRD'  => 'Третий',
                                        ],
                                    ],
                                ],
                            ],
                            'INTERACTION' => [
                                'LABEL' => 'Настройки взаимодействия с кассой',
                                'ITEMS' => [
                                    'MODE' => [
                                        'TYPE'    => 'ENUM',
                                        'LABEL'   => 'Режим работы с кассой',
                                        'OPTIONS' => [
                                            'ACTIVE' => 'боевой',
                                            'TEST'   => 'тестовый',
                                        ],
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
        console.dir($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding cashbox handler: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.cashbox.handler.add",
        {
            "CODE": "restcashbox01",
            "NAME": "REST-касса 01",
            "SORT": 100,
            "SUPPORTS_FFD105": "Y",
            "SETTINGS":
            {
                "PRINT_URL": "http://example.com/rest_print.php",
                "CHECK_URL": "http://example.com/rest_check.php",
                "HTTP_VERSION": "1.1",
                "CONFIG":
                {
                    "AUTH": {
                        "LABEL": "Авторизация",
                        "ITEMS": {
                            "KEYWORD": {
                                "TYPE": "STRING",
                                "LABEL": "Кодовое слово"
                            },
                            "PREFERENCE": {
                                "TYPE": "ENUM",
                                "LABEL": "Множественный выбор",
                                "REQUIRED": "Y",
                                "OPTIONS": {
                                    "FIRST": "Первый",
                                    "SECOND": "Второй",
                                    "THIRD": "Третий",
                                }
                            }
                        }
                    },
                    "INTERACTION": {
                        "LABEL": "Настройки взаимодействия с кассой",
                        "ITEMS": {
                            "MODE": {
                                "TYPE": "ENUM",
                                "LABEL": "Режим работы с кассой",
                                "OPTIONS": {
                                    "ACTIVE": "боевой",
                                    "TEST": "тестовый"
                                }
                            }
                        }
                    }
                }
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.cashbox.handler.add',
        [
            'CODE' => 'restcashbox01',
            'NAME' => 'REST-касса 01',
            'SORT' => 100,
            'SUPPORTS_FFD105' => 'Y',
            'SETTINGS' =>
            [
                'PRINT_URL' => 'http://example.com/rest_print.php',
                'CHECK_URL' => 'http://example.com/rest_check.php',
                'HTTP_VERSION' => '1.1',
                'CONFIG' =>
                [
                    'AUTH' =>
                    [
                        'LABEL' => 'Авторизация',
                        'ITEMS' =>
                        [
                            'KEYWORD' =>
                            [
                                'TYPE' => 'STRING',
                                'LABEL' => 'Кодовое слово'
                            ],
                            'PREFERENCE' =>
                            [
                                'TYPE' => 'ENUM',
                                'LABEL' => 'Множественный выбор',
                                'REQUIRED' => 'Y',
                                'OPTIONS' =>
                                [
                                    'FIRST' => 'Первый',
                                    'SECOND' => 'Второй',
                                    'THIRD' => 'Третий',
                                ]
                            ]
                        ]
                    ],
                    'INTERACTION' =>
                    [
                        'LABEL' => 'Настройки взаимодействия с кассой',
                        'ITEMS' =>
                        [
                            'MODE' =>
                            [
                                'TYPE' => 'ENUM',
                                'LABEL' => 'Режим работы с кассой',
                                'OPTIONS' =>
                                [
                                    'ACTIVE' => 'боевой',
                                    'TEST' => 'тестовый'
                                ]
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

{% note tip "Частые кейсы и сценарии" %}

- [{#T}](../../../tutorials/sale/cashbox-add-example.md)

{% endnote %}

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
[`sale_cashbox_handler.ID`](../data-types.md#sale_cashbox_handler) | Идентификатор созданного обработчика ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_HANDLER_ALREADY_EXIST",
    "error_description": "Handler already exists!"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `ACCESS_DENIED` | Недостаточно прав для добавления обработчика | 403 ||
|| `ERROR_CHECK_FAILURE` | Не указано значение обязательного поля либо значение одного из полей указано неверно | 400 ||
|| `ERROR_HANDLER_ALREADY_EXIST` | Обработчик с кодом, указанным в параметре `CODE`, уже существует в системе | 400 ||
|| `ERROR_HANDLER_ADD` | Прочие ошибки. Более подробную информацию об ошибке можно найти в `error_description` | 400 ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Страница PRINT_URL {#print_url}

Страница `PRINT_URL` — адрес, на который отправляются данные для печати чека.

### Пример данных, отправляемых на PRINT_URL

```
{
    "type": "sell",
    "calculated_sign": "income",
    "unique_id": 85,
    "items": [
        {
            "name": "Товар",
            "base_price": 12000.0,
            "price": 9600.0,
            "sum": 9600.0,
            "currency": "RUB",
            "quantity": 1,
            "measure_code": "796",
            "vat": 3,
            "vat_sum": 1600.0,
            "payment_object": "commodity_marking",
            "nomenclature_code": "DM �Yߠ�Q:4H7/3f^7fZ1",
            "marking_code": "011390002199781321Q:4H7/3f^7fZ1",
            "barcode": "1234567890",
            "discount": {
                "discount": 2400.0
            },
            "payment_method": "full_payment"
        }
    ],
    "date_create": 1712235417,
    "payments": [
        {
            "type": "cash",
            "is_cash": "Y",
            "sum": 1000,
            "currency": "RUB"
        }
    ],
    "client_email": "client@example.com",
    "client_phone": "+123456789",
    "total_sum": 9600.0,
    "uuid": "check|example.com|85",
    "operation": "income",
    "number_kkm": "",
    "service_email": "admin@example.com",
    "cashbox_params": {
        "AUTH": {
            "LOGIN": "user123",
            "PASSWORD": "top_secret!"
        },
        "COMPANY": {
            "INN": "123"
        },
        "INTERACTION": {
            "MODE": "ACTIVE"
        }
    }
}
```

### Структура POST-параметров, отправляемых на PRINT_URL

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../data-types.md) | Тип чека. Значения:
- `sell` — полная оплата
- `sellreturncash` — полный возврат наличными
- `sellreturn` — полный возврат безналичными
- `advancepayment` — аванс
- `advancereturn` — возврат аванса безналичными
- `advancereturncash` — возврат аванса наличными
- `creditpayment` — оплата кредита
- `creditpaymentreturn` — возврат оплаты кредита безналичными
- `creditpaymentreturncash` — возврат оплаты кредита наличными
- `credit` — покупка в кредит
- `creditreturn` — возврат покупки в кредит
- `prepayment` — частичная предоплата
- `prepaymentreturn` — возврат частичной предоплаты безналичными
- `prepaymentreturncash` — возврат частичной предоплаты наличными
- `fullprepayment` — 100% предоплата
- `fullprepaymentreturn` — возврат 100% предоплаты безналичными
- `fullprepaymentreturncash` — возврат 100% предоплаты наличными ||
|| **operation**
[`string`](../../data-types.md) | Признак прихода/расхода. Значения:
- `income` — приход
- `consumption` — расход ||
|| **calculated**
[`string`](../../data-types.md) | Аналогично `operation` (для совместимости) ||
|| **unique_id**
[`integer`](../../data-types.md) | ID чека в базе данных портала ||
|| **items**
[`object`](../../data-types.md) | Массив товаров в чеке (подробное описание приведено [ниже](#items)) ||
|| **date_create**
[`integer`](../../data-types.md) | Дата создания чека (`timestamp`) ||
|| **payments**
[`object`](../../data-types.md) | Массив оплат (подробное описание приведено [ниже](#payments)) ||
|| **client_email**
[`string`](../../data-types.md) | E-mail клиента (при наличии) ||
|| **client_phone**
[`string`](../../data-types.md) | Номер телефона клиента (при наличии) ||
|| **total_sum**
[`float`](../../data-types.md) | Общая сумма по чеку ||
|| **uuid**
[`string`](../../data-types.md) | Идентификатор документа во внешней системе (портал *Битрикс24*) ||
|| **service_email**
[`string`](../../data-types.md) | Email (из настроек кассы) ||
|#

#### Параметр items {#items}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md) | Название товара ||
|| **base_price**
[`float`](../../data-types.md) | Цена товара без учета скидок и наценок ||
|| **price**
[`float`](../../data-types.md) | Цена продажи ||
|| **sum**
[`float`](../../data-types.md) | Сумма позиции ||
|| **quantity**
[`float`](../../data-types.md) | Количество товара ||
|| **vat**
[`int`](../../data-types.md) | Идентификатор налога. Он может быть использован в методе [catalog.vat.get](../../catalog/vat/catalog-vat-get.md) для получения информации по налогу ||
|| **vat_sum**
[`float`](../../data-types.md) | Cумма налога ||
|| **barcode**
[`string`](../../data-types.md) | Штрихкод. Используется при включенном складском учете и передаче товара с уникальным штрихкодом ||
|| **nomenclature_code**
[`string`](../../data-types.md) | Код товарной номенклатуры в двоичном представлении (при наличии) ||
|| **marking_code**
[`string`](../../data-types.md) | Код товарной номенклатуры (при наличии) ||
|| **payment_object**
[`string`](../../data-types.md) | Признак предмета расчета. Стандартные значения: 
- `commodity` — товар
- `commodity_marking` — товар, подлежащий маркировке и имеющий код маркировки
- `service` — услуга
- `payment` — платеж
||
|| **payment_method**
[`string`](../../data-types.md) | Признак способа расчета. Значения:
- `full_payment` — полный расчет
- `advance` — аванс
- `prepayment` — предоплата
- `full_prepayment` — 100% предоплата
- `credit` — покупка в кредит
- `credit_payment` — оплата кредита
||
|| **supplier_info**
[`array`](../../data-types.md) | Агентские реквизиты при использовании агентских схем (подробное описание приведено [ниже](#supplier_info)) ||
|| **discount**
[`array`](../../data-types.md) | Скидка на товар. Ключ является устаревшим и больше не используется. 
В массиве передается параметр `discount` ([`float`](../../data-types.md)) — размер скидки в денежном выражении ||
|#

##### Параметр supplier_info {#supplier_info}

#|
|| **Название**
`тип` | **Описание** ||
|| **phones**
[`string[]`](../../data-types.md) | Номера телефонов ||
|| **name**
[`string`](../../data-types.md) | Название поставщика ||
|| **inn**
[`string`](../../data-types.md) | ИНН поставщика ||
|#

#### Параметр payments {#payments}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../data-types.md) | Тип оплаты. Значения:
- `cash` — оплата наличными
- `cashless` — безналичный расчет ||
|| **is_cash**
[`string`](../../data-types.md) | Производится ли оплата наличными (`Y/N`). Ключ является устаревшим, вместо него рекомендуется использовать `type` ||
|| **sum**
[`float`](../../data-types.md) | Сумма оплаты ||
|| **currency**
[`string`](../../data-types.md) | Валюта оплаты ||
|#

## Страница CHECK_URL {#check_url}

Страница `CHECK_URL` — адрес, по которому проверяется успешность печати чека.

Запрос по адресу `CHECK_URL` производится либо по обращению менеджера, либо автоматически спустя некоторое время после успешной печати чека.

### Пример данных, отправляемых на CHECK_URL

```
{
    "uuid": "00112233-4455-6677-8899-aabbccddeeff"
}
```

### Структура POST-параметров, отправляемых на CHECK_URL

#|
|| **Название**
`тип` | **Описание** ||
|| **uuid**
[`string`](../../data-types.md) | Идентификатор чека ||
|#

## Продолжите изучение

- [{#T}](./sale-cashbox-handler-update.md)
- [{#T}](./sale-cashbox-handler-list.md)
- [{#T}](./sale-cashbox-handler-delete.md)
- [{#T}](./sale-cashbox-add.md)
- [{#T}](./sale-cashbox-update.md)
- [{#T}](./sale-cashbox-list.md)
- [{#T}](./sale-cashbox-delete.md)
- [{#T}](./sale-cashbox-check-apply.md)
- [{#T}](../../../tutorials/sale/cashbox-add-example.md)