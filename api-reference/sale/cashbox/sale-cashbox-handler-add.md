# Добавить обработчик кассы sale.cashbox.handler.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`cashbox`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM (право «Разрешить изменять настройки»)

Метод `sale.cashbox.handler.add` добавляет REST-обработчик кассы.

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
[`integer`](../../data-types.md) | Сортировка.

Значение по умолчанию — `100` ||
|| **SETTINGS***
[`object`](../../data-types.md) | Настройки обработчика [(подробное описание)](#settings) ||
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
[`string`](../../data-types.md) | Версия протокола HTTP для запросов на `PRINT_URL` и `CHECK_URL`. Возможные значения:
- `1.0`
- `1.1`

Другое значение вызывает ошибку. Если параметр не передан, используется HTTP `1.0` ||
|| **SUPPORTS_FFD105**
[`string`](../../data-types.md) | Поддерживает ли касса формат фискальных данных версии 1.05. Возможные значения:
- `Y` — да
- `N` — нет

Значение по умолчанию — `N`.

Передавайте параметр внутри `SETTINGS`: на верхнем уровне запроса он не сохраняется ||
|| **CONFIG***
[`object`](../../data-types.md) | Структура настроек кассы, которые пользователь заполняет в форме кассы или передает в `SETTINGS` метода [sale.cashbox.add](./sale-cashbox-add.md) [(подробное описание)](#settingsconfig).

Ключ объекта — код раздела настроек, значение — описание раздела ||
|#

### Параметр SETTINGS\[CONFIG] {#settingsconfig}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **LABEL***
[`string`](../../data-types.md) | Заголовок раздела ||
|| **ITEMS***
[`object`](../../data-types.md) | Настройки раздела [(подробное описание)](#settingsconfigitems).

Ключ объекта — код настройки, значение — описание настройки. Метод не проверяет, что `ITEMS` передан: раздел без настроек сохраняется ||
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
- `Y/N` — флажок со значениями `Y` или `N`
- `ENUM` — список значений
- `DATE` — дата

Другой тип вызывает ошибку `The config provided in SETTINGS[CONFIG] is not valid` ||
|| **LABEL***
[`string`](../../data-types.md) | Название настройки ||
|| **REQUIRED**
[`string`](../../data-types.md) | Обязательна ли настройка в форме кассы. Возможные значения:
- `Y` — да
- `N` — нет

Значение по умолчанию — `N`. Методы [sale.cashbox.add](./sale-cashbox-add.md) и [sale.cashbox.update](./sale-cashbox-update.md) не проверяют заполнение обязательных настроек ||
||  **DISABLED**
[`string`](../../data-types.md) | Запрещено ли редактировать настройку. Возможные значения:
- `Y` — да
- `N` — нет

Значение по умолчанию — `N` ||
||  **MULTIPLE**
[`string`](../../data-types.md) | Множественная ли настройка. Возможные значения:
- `Y` — да
- `N` — нет

Значение по умолчанию — `N` ||
||  **MULTILINE**
[`string`](../../data-types.md) | Многострочное ли поле. Используется для типа `STRING`. Возможные значения:
- `Y` — да
- `N` — нет

Значение по умолчанию — `N` ||
||  **OPTIONS***
[`object`](../../data-types.md) | Варианты значения. Обязателен для типа `ENUM`.

Ключ объекта — код варианта, значение — название варианта в интерфейсе. Код варианта сохраняется в верхнем регистре ||
||  **TIME**
[`string`](../../data-types.md) | Можно ли выбрать время. Используется для типа `DATE`. Возможные значения:
- `Y` — да
- `N` — нет

Значение по умолчанию — `N` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CODE":"restcashbox01","NAME":"REST-касса 01","SORT":100,"SETTINGS":{"SUPPORTS_FFD105":"Y","PRINT_URL":"http://example.com/rest_print.php","CHECK_URL":"http://example.com/rest_check.php","HTTP_VERSION":"1.1","CONFIG":{"AUTH":{"LABEL":"Авторизация","ITEMS":{"KEYWORD":{"TYPE":"STRING","LABEL":"Кодовое слово"},"PREFERENCE":{"TYPE":"ENUM","LABEL":"Множественный выбор","REQUIRED":"Y","OPTIONS":{"FIRST":"Первый","SECOND":"Второй","THIRD":"Третий"}}}},"INTERACTION":{"LABEL":"Настройки взаимодействия с кассой","ITEMS":{"MODE":{"TYPE":"ENUM","LABEL":"Режим работы с кассой","OPTIONS":{"ACTIVE":"боевой","TEST":"тестовый"}}}}}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.cashbox.handler.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CODE":"restcashbox01","NAME":"REST-касса 01","SORT":100,"SETTINGS":{"SUPPORTS_FFD105":"Y","PRINT_URL":"http://example.com/rest_print.php","CHECK_URL":"http://example.com/rest_check.php","HTTP_VERSION":"1.1","CONFIG":{"AUTH":{"LABEL":"Авторизация","ITEMS":{"KEYWORD":{"TYPE":"STRING","LABEL":"Кодовое слово"},"PREFERENCE":{"TYPE":"ENUM","LABEL":"Множественный выбор","REQUIRED":"Y","OPTIONS":{"FIRST":"Первый","SECOND":"Второй","THIRD":"Третий"}}}},"INTERACTION":{"LABEL":"Настройки взаимодействия с кассой","ITEMS":{"MODE":{"TYPE":"ENUM","LABEL":"Режим работы с кассой","OPTIONS":{"ACTIVE":"боевой","TEST":"тестовый"}}}}}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.cashbox.handler.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'sale.cashbox.handler.add',
        params: {
          CODE: 'restcashbox01',
          NAME: 'REST cashbox 01',
          SORT: 100,
          SETTINGS: {
            PRINT_URL: 'http://example.com/rest_print.php',
            CHECK_URL: 'http://example.com/rest_check.php',
            HTTP_VERSION: '1.1',
            SUPPORTS_FFD105: 'Y',
            CONFIG: {
              AUTH: {
                LABEL: 'Authorization',
                ITEMS: {
                  KEYWORD: {
                    TYPE: 'STRING',
                    LABEL: 'Keyword',
                  },
                  PREFERENCE: {
                    TYPE: 'ENUM',
                    LABEL: 'Multiple choice',
                    REQUIRED: 'Y',
                    OPTIONS: {
                      FIRST: 'First',
                      SECOND: 'Second',
                      THIRD: 'Third',
                    },
                  },
                },
              },
              INTERACTION: {
                LABEL: 'Cash register interaction settings',
                ITEMS: {
                  MODE: {
                    TYPE: 'ENUM',
                    LABEL: 'Cash register operating mode',
                    OPTIONS: {
                      ACTIVE: 'active',
                      TEST: 'test',
                    },
                  },
                },
              },
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('New cashbox handler ID:', result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function addCashboxHandler() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.cashbox.handler.add',
            params: {
              CODE: 'restcashbox01',
              NAME: 'REST cashbox 01',
              SORT: 100,
              SETTINGS: {
                PRINT_URL: 'http://example.com/rest_print.php',
                CHECK_URL: 'http://example.com/rest_check.php',
                HTTP_VERSION: '1.1',
                SUPPORTS_FFD105: 'Y',
                CONFIG: {
                  AUTH: {
                    LABEL: 'Authorization',
                    ITEMS: {
                      KEYWORD: {
                        TYPE: 'STRING',
                        LABEL: 'Keyword',
                      },
                      PREFERENCE: {
                        TYPE: 'ENUM',
                        LABEL: 'Multiple choice',
                        REQUIRED: 'Y',
                        OPTIONS: {
                          FIRST: 'First',
                          SECOND: 'Second',
                          THIRD: 'Third',
                        },
                      },
                    },
                  },
                  INTERACTION: {
                    LABEL: 'Cash register interaction settings',
                    ITEMS: {
                      MODE: {
                        TYPE: 'ENUM',
                        LABEL: 'Cash register operating mode',
                        OPTIONS: {
                          ACTIVE: 'active',
                          TEST: 'test',
                        },
                      },
                    },
                  },
                },
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('New cashbox handler ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addCashboxHandler)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    settings = {
        "PRINT_URL": "http://example.com/rest_print.php",
        "CHECK_URL": "http://example.com/rest_check.php",
        "HTTP_VERSION": "1.1",
        "SUPPORTS_FFD105": "Y",
        "CONFIG": {
            "AUTH": {
                "LABEL": "Авторизация",
                "ITEMS": {
                    "KEYWORD": {
                        "TYPE": "STRING",
                        "LABEL": "Кодовое слово",
                    },
                    "PREFERENCE": {
                        "TYPE": "ENUM",
                        "LABEL": "Множественный выбор",
                        "REQUIRED": "Y",
                        "OPTIONS": {
                            "FIRST": "Первый",
                            "SECOND": "Второй",
                            "THIRD": "Третий",
                        },
                    },
                },
            },
            "INTERACTION": {
                "LABEL": "Настройки взаимодействия с кассой",
                "ITEMS": {
                    "MODE": {
                        "TYPE": "ENUM",
                        "LABEL": "Режим работы с кассой",
                        "OPTIONS": {
                            "ACTIVE": "боевой",
                            "TEST": "тестовый",
                        },
                    },
                },
            },
        },
    }

    try:
        bitrix_response = client.sale.cashbox.handler.add(
            code="restcashbox01",
            name="REST-касса 01",
            sort=100,
            settings=settings,
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
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
                    'SETTINGS'      => [
                        'PRINT_URL'    => 'http://example.com/rest_print.php',
                        'CHECK_URL'    => 'http://example.com/rest_check.php',
                        'HTTP_VERSION' => '1.1',
                        'SUPPORTS_FFD105' => 'Y',
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
            "SETTINGS":
            {
                "PRINT_URL": "http://example.com/rest_print.php",
                "CHECK_URL": "http://example.com/rest_check.php",
                "HTTP_VERSION": "1.1",
                "SUPPORTS_FFD105": "Y",
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
            'SETTINGS' =>
            [
                'PRINT_URL' => 'http://example.com/rest_print.php',
                'CHECK_URL' => 'http://example.com/rest_check.php',
                'HTTP_VERSION' => '1.1',
                'SUPPORTS_FFD105' => 'Y',
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "sale.cashbox.handler.add", b24.Params{
    	"CODE":            "restcashbox01",
    	"NAME":            "REST-касса 01",
    	"SORT":            100,
    	"SETTINGS": b24.Params{
    		"PRINT_URL":    "http://example.com/rest_print.php",
    		"CHECK_URL":    "http://example.com/rest_check.php",
    		"HTTP_VERSION": "1.1",
    		"SUPPORTS_FFD105": "Y",
    		"CONFIG": b24.Params{
    			"AUTH": b24.Params{
    				"LABEL": "Авторизация",
    				"ITEMS": b24.Params{
    					"KEYWORD": b24.Params{
    						"TYPE":  "STRING",
    						"LABEL": "Кодовое слово",
    					},
    					"PREFERENCE": b24.Params{
    						"TYPE":     "ENUM",
    						"LABEL":    "Множественный выбор",
    						"REQUIRED": "Y",
    						"OPTIONS": b24.Params{
    							"FIRST":  "Первый",
    							"SECOND": "Второй",
    							"THIRD":  "Третий",
    						},
    					},
    				},
    			},
    			"INTERACTION": b24.Params{
    				"LABEL": "Настройки взаимодействия с кассой",
    				"ITEMS": b24.Params{
    					"MODE": b24.Params{
    						"TYPE":  "ENUM",
    						"LABEL": "Режим работы с кассой",
    						"OPTIONS": b24.Params{
    							"ACTIVE": "боевой",
    							"TEST":   "тестовый",
    						},
    					},
    				},
    			},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("sale.cashbox.handler.add: %w", err)
    }

    var newID b24.ID
    if err := json.Unmarshal(res.Result, &newID); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("идентификатор:", newID)
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
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
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
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_CHECK_FAILURE` | Parameter CODE is not defined | Не передан параметр `CODE` ||
|| `400` | `ERROR_CHECK_FAILURE` | Parameter NAME is not defined | Не передан параметр `NAME` ||
|| `400` | `ERROR_CHECK_FAILURE` | Parameter SETTINGS is not defined or empty | Не передан параметр `SETTINGS` или передан пустой объект ||
|| `400` | `ERROR_CHECK_FAILURE` | Parameter SETTINGS[PRINT_URL] is not defined | Не передан `SETTINGS.PRINT_URL`. Так же метод сообщает о пропущенных `CHECK_URL` и `CONFIG` ||
|| `400` | `ERROR_CHECK_FAILURE` | The value of SETTINGS[HTTP_VERSION] is not valid | В `SETTINGS.HTTP_VERSION` передано значение, отличное от `1.0` и `1.1` ||
|| `400` | `ERROR_CHECK_FAILURE` | The config provided in SETTINGS[CONFIG] is not valid | В `SETTINGS.CONFIG` передана настройка с неизвестным типом или неверной структурой ||
|| `400` | `ERROR_HANDLER_ALREADY_EXIST` | Handler already exists! | Обработчик с кодом из `CODE` уже существует ||
|| `400` | `ERROR_HANDLER_ADD` | Текст ошибки сохранения | Не удалось сохранить обработчик, текст ошибки — в `error_description` ||
|| `403` | `ACCESS_DENIED` | Access denied! | У пользователя нет прав администратора CRM ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Страница PRINT_URL {#print_url}

Страница `PRINT_URL` — адрес, на который отправляются данные для печати чека.

### Пример данных, отправляемых на PRINT_URL

```json
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
[`string`](../../data-types.md) | Признак прихода или расхода. Значения:
- `income` — приход
- `consumption` — расход ||
|| **calculated_sign**
[`string`](../../data-types.md) | То же значение, что в `operation` ||
|| **unique_id**
[`integer`](../../data-types.md) | Идентификатор чека в Битрикс24 ||
|| **currency**
[`string`](../../data-types.md) | Код валюты чека ||
|| **items**
[`object[]`](../../data-types.md) | Позиции чека: товары и доставка [(подробное описание)](#items) ||
|| **date_create**
[`integer`](../../data-types.md) | Дата создания чека в формате Unix timestamp ||
|| **payments**
[`object[]`](../../data-types.md) | Оплаты [(подробное описание)](#payments) ||
|| **client_email**
[`string`](../../data-types.md) | Email клиента. Передается, если он есть в заказе ||
|| **client_phone**
[`string`](../../data-types.md) | Телефон клиента. Передается, если он есть в заказе ||
|| **total_sum**
[`double`](../../data-types.md) | Общая сумма чека ||
|| **uuid**
[`string`](../../data-types.md) | Идентификатор чека в Битрикс24 в формате ```check|<домен>|<unique_id>``` ||
|| **number_kkm**
[`string`](../../data-types.md) | Внешний идентификатор кассы — поле `NUMBER_KKM` кассы ||
|| **service_email**
[`string`](../../data-types.md) | Email из настроек кассы — поле `EMAIL` кассы ||
|| **cashbox_params**
[`object`](../../data-types.md) | Значения настроек кассы из параметра `SETTINGS` метода [sale.cashbox.add](./sale-cashbox-add.md). Структура соответствует `SETTINGS.CONFIG` обработчика: `{"код раздела": {"код настройки": "значение"}}` ||
|#

#### Параметр items {#items}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md) | Название товара ||
|| **base_price**
[`double`](../../data-types.md) | Цена товара без учета скидок и наценок ||
|| **price**
[`double`](../../data-types.md) | Цена продажи ||
|| **sum**
[`double`](../../data-types.md) | Сумма позиции ||
|| **currency**
[`string`](../../data-types.md) | Код валюты позиции ||
|| **quantity**
[`double`](../../data-types.md) | Количество товара ||
|| **measure_code**
[`string`](../../data-types.md) | Код единицы измерения, например `796` — штука ||
|| **vat**
[`integer`](../../data-types.md) | Идентификатор ставки НДС. Получить данные ставки можно методом [catalog.vat.get](../../catalog/vat/catalog-vat-get.md) ||
|| **vat_sum**
[`double`](../../data-types.md) | Сумма налога ||
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
[`object`](../../data-types.md) | Скидка на позицию. Устаревший ключ.

Содержит `discount` — размер скидки в денежном выражении и `discount_type` — тип скидки ||
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
- `cash` — наличными
- `cashless` — безналичный расчет
- `advance` — зачет аванса
- `credit` — в кредит ||
|| **is_cash**
[`string`](../../data-types.md) | Оплата наличными: `Y` — да, `N` — нет. Устаревший ключ, используйте `type` ||
|| **sum**
[`double`](../../data-types.md) | Сумма оплаты ||
|| **currency**
[`string`](../../data-types.md) | Валюта оплаты ||
|#

## Страница CHECK_URL {#check_url}

Страница `CHECK_URL` — адрес, по которому проверяется успешность печати чека.

Запрос по адресу `CHECK_URL` производится либо по обращению менеджера, либо автоматически спустя некоторое время после успешной печати чека.

### Пример данных, отправляемых на CHECK_URL

```json
{
    "uuid": "00112233-4455-6677-8899-aabbccddeeff"
}
```

### Структура POST-параметров, отправляемых на CHECK_URL

#|
|| **Название**
`тип` | **Описание** ||
|| **uuid**
[`string`](../../data-types.md) | Идентификатор чека, который вернула страница `PRINT_URL` в ключе `UUID` ||
|#

Формат ответов страниц `PRINT_URL` и `CHECK_URL` с примерами описан в туториале [Как подключить кассу к Битрикс24](../../../tutorials/sale/cashbox-add-example.md).

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
