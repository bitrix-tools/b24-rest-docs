# Обновить данные обработчика кассы sale.cashbox.handler.update

> Scope: [`sale, cashbox`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM (право «Разрешить изменять настройки»)

Метод обновляет данные REST-обработчика кассы.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID*** 
[`sale_cashbox_handler.ID`](../data-types.md#sale_cashbox_handler) | Идентификатор обновляемого обработчика ||
|| **FIELDS*** 
[`object`](../../data-types.md) | Значения обновляемых полей.

Поля, доступные к обновлению: `NAME`, `SORT`, `SETTINGS` (смотрите поля [sale_cashbox_handler](../data-types.md#sale_cashbox_handler)) 
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":1,"FIELDS":{"NAME":"Моя REST-касса с новым именем","SORT":200,"SETTINGS":{"PRINT_URL":"http://setagaya.bx/receipt_print.php","CHECK_URL":"http://setagaya.bx/receipt_check.php","CONFIG":{"AUTH":{"LABEL":"Авторизация","ITEMS":{"LOGIN":{"TYPE":"STRING","REQUIRED":"Y","LABEL":"Логин"},"PASSWORD":{"TYPE":"STRING","REQUIRED":"Y","LABEL":"Пароль"}}},"COMPANY":{"LABEL":"Данные об организации","ITEMS":{"INN":{"TYPE":"STRING","REQUIRED":"Y","LABEL":"ИНН организации"}}},"INTERACTION":{"LABEL":"Настройки взаимодействия с кассой","ITEMS":{"MODE":{"TYPE":"ENUM","LABEL":"Режим работы с кассой","OPTIONS":{"ACTIVE":"боевой","TEST":"тестовый"}}}}},"SUPPORTS_FFD105":"N"}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.cashbox.handler.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":1,"FIELDS":{"NAME":"Моя REST-касса с новым именем","SORT":200,"SETTINGS":{"PRINT_URL":"http://setagaya.bx/receipt_print.php","CHECK_URL":"http://setagaya.bx/receipt_check.php","CONFIG":{"AUTH":{"LABEL":"Авторизация","ITEMS":{"LOGIN":{"TYPE":"STRING","REQUIRED":"Y","LABEL":"Логин"},"PASSWORD":{"TYPE":"STRING","REQUIRED":"Y","LABEL":"Пароль"}}},"COMPANY":{"LABEL":"Данные об организации","ITEMS":{"INN":{"TYPE":"STRING","REQUIRED":"Y","LABEL":"ИНН организации"}}},"INTERACTION":{"LABEL":"Настройки взаимодействия с кассой","ITEMS":{"MODE":{"TYPE":"ENUM","LABEL":"Режим работы с кассой","OPTIONS":{"ACTIVE":"боевой","TEST":"тестовый"}}}}},"SUPPORTS_FFD105":"N"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.cashbox.handler.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"sale.cashbox.handler.update",
    		{
    			"ID": 1,
    			"FIELDS":
    			{
    				"NAME": "Моя REST-касса с новым именем",
    				"SORT": 200,
    				"SETTINGS": {
    					"PRINT_URL": "http://setagaya.bx/receipt_print.php",
    					"CHECK_URL": "http://setagaya.bx/receipt_check.php",
    					"CONFIG": {
    						"AUTH": {
    							"LABEL": "Авторизация",
    							"ITEMS": {
    								"LOGIN": {
    									"TYPE": "STRING",
    									"REQUIRED": "Y",
    									"LABEL": "Логин"
    								},
    								"PASSWORD": {
    									"TYPE": "STRING",
    									"REQUIRED": "Y",
    									"LABEL": "Пароль"
    								}
    							}
    						},
    						"COMPANY": {
    							"LABEL": "Данные об организации",
    							"ITEMS": {
    								"INN": {
    									"TYPE": "STRING",
    									"REQUIRED": "Y",
    									"LABEL": "ИНН организации"
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
    					},
    					"SUPPORTS_FFD105": "N"
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
                'sale.cashbox.handler.update',
                [
                    'ID'     => 1,
                    'FIELDS' => [
                        'NAME'     => 'Моя REST-касса с новым именем',
                        'SORT'     => 200,
                        'SETTINGS' => [
                            'PRINT_URL'      => 'http://setagaya.bx/receipt_print.php',
                            'CHECK_URL'      => 'http://setagaya.bx/receipt_check.php',
                            'CONFIG'         => [
                                'AUTH'        => [
                                    'LABEL' => 'Авторизация',
                                    'ITEMS' => [
                                        'LOGIN'    => [
                                            'TYPE'     => 'STRING',
                                            'REQUIRED' => 'Y',
                                            'LABEL'    => 'Логин',
                                        ],
                                        'PASSWORD' => [
                                            'TYPE'     => 'STRING',
                                            'REQUIRED' => 'Y',
                                            'LABEL'    => 'Пароль',
                                        ],
                                    ],
                                ],
                                'COMPANY'      => [
                                    'LABEL' => 'Данные об организации',
                                    'ITEMS' => [
                                        'INN' => [
                                            'TYPE'     => 'STRING',
                                            'REQUIRED' => 'Y',
                                            'LABEL'    => 'ИНН организации',
                                        ],
                                    ],
                                ],
                                'INTERACTION'  => [
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
                            'SUPPORTS_FFD105' => 'N',
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating cashbox handler: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod( 
    "sale.cashbox.handler.update", 
    { 
        "ID": 1, 
        "FIELDS": 
        { 
            "NAME": "Моя REST-касса с новым именем",
            "SORT": 200,
            "SETTINGS": {
                "PRINT_URL": "http://setagaya.bx/receipt_print.php",
                "CHECK_URL": "http://setagaya.bx/receipt_check.php",
                "CONFIG": {
                    "AUTH": {
                        "LABEL": "Авторизация",
                        "ITEMS": {
                            "LOGIN": {
                                "TYPE": "STRING",
                                "REQUIRED": "Y",
                                "LABEL": "Логин"
                            },
                            "PASSWORD": {
                                "TYPE": "STRING",
                                "REQUIRED": "Y",
                                "LABEL": "Пароль"
                            }
                        }
                    },
                    "COMPANY": {
                        "LABEL": "Данные об организации",
                        "ITEMS": {
                            "INN": {
                                "TYPE": "STRING",
                                "REQUIRED": "Y",
                                "LABEL": "ИНН организации"
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
                },
                "SUPPORTS_FFD105": "N"
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
        'sale.cashbox.handler.update',
        [
            'ID' => 1,
            'FIELDS' =>
            [
                'NAME' => 'Моя REST-касса с новым именем',
                'SORT' => 200,
                'SETTINGS' =>
                [
                    'PRINT_URL' => 'http://setagaya.bx/receipt_print.php',
                    'CHECK_URL' => 'http://setagaya.bx/receipt_check.php',
                    'CONFIG' =>
                    [
                        'AUTH' =>
                        [
                            'LABEL' => 'Авторизация',
                            'ITEMS' =>
                            [
                                'LOGIN' =>
                                [
                                    'TYPE' => 'STRING',
                                    'REQUIRED' => 'Y',
                                    'LABEL' => 'Логин'
                                ],
                                'PASSWORD' =>
                                [
                                    'TYPE' => 'STRING',
                                    'REQUIRED' => 'Y',
                                    'LABEL' => 'Пароль'
                                ]
                            ]
                        ],
                        'COMPANY' =>
                        [
                            'LABEL' => 'Данные об организации',
                            'ITEMS' =>
                            [
                                'INN' =>
                                [
                                    'TYPE' => 'STRING',
                                    'REQUIRED' => 'Y',
                                    'LABEL' => 'ИНН организации'
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
                    ],
                    'SUPPORTS_FFD105' => 'N'
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
[`boolean`](../../data-types.md) | Результат обновления полей REST-обработчика кассы ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_HANDLER_NOT_FOUND",
    "error_description": "Handler not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `ACCESS_DENIED` | Недостаточно прав для обновления обработчика либо приложение пытается изменить обработчик, добавленный другим приложением | 403 ||
|| `ERROR_CHECK_FAILURE` | Не указано значение полей `ID` или `FIELDS` | 400 ||
|| `ERROR_HANDLER_NOT_FOUND` | Обработчик с указанным `ID` не найден | 400 ||
|| `ERROR_HANDLER_UPDATE` | Прочие ошибки. Более подробную информацию об ошибке можно найти в `error_description` | 400 ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-cashbox-handler-add.md)
- [{#T}](./sale-cashbox-handler-list.md)
- [{#T}](./sale-cashbox-handler-delete.md)
- [{#T}](./sale-cashbox-add.md)
- [{#T}](./sale-cashbox-update.md)
- [{#T}](./sale-cashbox-list.md)
- [{#T}](./sale-cashbox-delete.md)
- [{#T}](./sale-cashbox-check-apply.md)