# Добавить валюту crm.currency.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Разрешить изменять настройки» в CRM

Метод `crm.currency.add` добавляет валюту и возвращает ее код.

Параметры локализации — название валюты и формат суммы на каждом языке Битрикс24 — передайте в поле `LANG`. Для языков, которых в нем нет, будут использованы [параметры по умолчанию](../data-types.md#crm_currency_localization). Параметры для одного языка можно задать и отдельно методом [crm.currency.localizations.set](./localizations/crm-currency-localizations-set.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип`| **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для добавления новой валюты в виде структуры:

```js
fields: {
    CURRENCY: 'значение',
    BASE: 'значение',
    AMOUNT_CNT: 'значение',
    AMOUNT: 'значение',
    SORT: 'значение',
    LANG: 'значение'
}
```

||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип`| **Описание** ||
|| **CURRENCY***
[`string`](../../data-types.md) | Идентификатор валюты.

Соответствует стандарту ISO 4217
 ||
|| **BASE**
[`string`](../../data-types.md) | Признак базовой валюты. Метод не учитывает этот параметр и не возвращает ошибку: сделать валюту базовой этим методом нельзя. Базовую валюту меняет метод [crm.currency.base.set](./crm-currency-base-set.md)
 ||
|| **AMOUNT_CNT***
[`integer`](../../data-types.md) | Номинал — количество единиц валюты, для которого задан курс `AMOUNT`. Обычно `1`, `10`, `100` и так далее
 ||
|| **AMOUNT***
[`double`](../../data-types.md) | Сколько стоит номинал `AMOUNT_CNT` в базовой валюте, например `12.2251` ||
|| **SORT**
[`integer`](../../data-types.md) | Положение в списке валют.

 Значение по умолчанию — `100`
 ||
|| **LANG**
[`object`](../../data-types.md) | Параметры локализации валюты.

Объект в формате `{"lang_1": "value_1", ... "lang_N": "value_N"}`, где `lang_N` — идентификатор языка, а `value` — объект типа [crm_currency_localization](../data-types.md#crm_currency_localization).

Если указать не все языки, для оставшихся будут использоваться [параметры локализации по умолчанию](../data-types.md#crm_currency_localization)
 ||
|#

### Параметр LANG

#|
|| **Название**
`тип`| **Описание** ||
|| **DECIMALS**
[`integer`](../../data-types.md) | Количество знаков после запятой ||
|| **DEC_POINT**
[`string`](../../data-types.md) | Десятичный разделитель ||
|| **FORMAT_STRING***
[`string`](../../data-types.md) | Шаблон вывода суммы, например `# CNY` ||
|| **FULL_NAME**
[`string`](../../data-types.md) | Название валюты на языке, для которого добавляется локализация ||
|| **HIDE_ZERO**
[`string`](../../data-types.md) | Скрывать ли незначащие нули: `Y` — скрывать, `N` — показывать. Другие значения метод сохранит как `N` ||
|| **THOUSANDS_SEP**
[`string`](../../data-types.md) | Разделитель разрядов ||
|| **THOUSANDS_VARIANT**
[`string`](../../data-types.md) | Код разделителя разрядов.

Допустимые значения описаны в [справочнике](../data-types.md#crm_currency_localization) ||
|#

## Примеры кода

1. Создание юаня с параметрами локализации (русский и английский языки)

    Базовая валюта — рубль. Один юань стоит 12,2251 рубля.

    {% include [Сноска о примерах](../../../_includes/examples.md) %}

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"fields":{"CURRENCY":"CNY","BASE":"N","AMOUNT":12.2251,"AMOUNT_CNT":1,"SORT":9000,"LANG":{"ru":{"DECIMALS":2,"DEC_POINT":".","FORMAT_STRING":"# CNY","FULL_NAME":"юань","HIDE_ZERO":"Y","THOUSANDS_VARIANT":"S"},"en":{"DECIMALS":2,"DEC_POINT":",","FORMAT_STRING":"# CNY","FULL_NAME":"yuan","HIDE_ZERO":"Y","THOUSANDS_VARIANT":"D"}}}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.currency.add
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"fields":{"CURRENCY":"CNY","BASE":"N","AMOUNT":12.2251,"AMOUNT_CNT":1,"SORT":9000,"LANG":{"ru":{"DECIMALS":2,"DEC_POINT":".","FORMAT_STRING":"# CNY","FULL_NAME":"юань","HIDE_ZERO":"Y","THOUSANDS_VARIANT":"S"},"en":{"DECIMALS":2,"DEC_POINT":",","FORMAT_STRING":"# CNY","FULL_NAME":"yuan","HIDE_ZERO":"Y","THOUSANDS_VARIANT":"D"}}},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.currency.add
        ```

    - JS (TS)

        ```ts
        // This snippet is an ES module: top-level await requires type="module" or a bundler.
        // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'

        declare const $b24: B24Frame

        try {
          const response = await $b24.actions.v2.call.make<string>({
            method: 'crm.currency.add',
            params: {
              fields: {
                CURRENCY: 'CNY',
                BASE: 'N',
                AMOUNT: 12.2251,
                AMOUNT_CNT: 1,
                SORT: 9000,
                LANG: {
                  ru: {
                    DECIMALS: 2,
                    DEC_POINT: '.',
                    FORMAT_STRING: '# CNY',
                    FULL_NAME: 'юань',
                    HIDE_ZERO: 'Y',
                    THOUSANDS_VARIANT: 'S',
                  },
                  en: {
                    DECIMALS: 2,
                    DEC_POINT: ',',
                    FORMAT_STRING: '# CNY',
                    FULL_NAME: 'yuan',
                    HIDE_ZERO: 'Y',
                    THOUSANDS_VARIANT: 'D',
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
            console.info('Created currency id:', result)
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
          async function addCurrency() {
            try {
              // Initialize the SDK inside a Bitrix24 frame
              const $b24 = await B24Js.initializeB24Frame()

              const response = await $b24.actions.v2.call.make({
                method: 'crm.currency.add',
                params: {
                  fields: {
                    CURRENCY: 'CNY',
                    BASE: 'N',
                    AMOUNT: 12.2251,
                    AMOUNT_CNT: 1,
                    SORT: 9000,
                    LANG: {
                      ru: {
                        DECIMALS: 2,
                        DEC_POINT: '.',
                        FORMAT_STRING: '# CNY',
                        FULL_NAME: 'юань',
                        HIDE_ZERO: 'Y',
                        THOUSANDS_VARIANT: 'S',
                      },
                      en: {
                        DECIMALS: 2,
                        DEC_POINT: ',',
                        FORMAT_STRING: '# CNY',
                        FULL_NAME: 'yuan',
                        HIDE_ZERO: 'Y',
                        THOUSANDS_VARIANT: 'D',
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
              console.info('Created currency id:', result)
            } catch (error) {
              // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
              console.error(error)
            }
          }

          document.addEventListener('DOMContentLoaded', addCurrency)
        </script>
        ```

    - Python

        ```python
        from b24pysdk.errors import BitrixAPIError, BitrixSDKException

        try:
            bitrix_response = client.crm.currency.add(
                fields={
                    "CURRENCY": "CNY",
                    "BASE": "N",
                    "AMOUNT": 12.2251,
                    "AMOUNT_CNT": 1,
                    "SORT": 9000,
                    "LANG": {
                        "ru": {
                            "DECIMALS": 2,
                            "DEC_POINT": ".",
                            "FORMAT_STRING": "# CNY",
                            "FULL_NAME": "юань",
                            "HIDE_ZERO": "Y",
                            "THOUSANDS_VARIANT": "S",
                        },
                        "en": {
                            "DECIMALS": 2,
                            "DEC_POINT": ",",
                            "FORMAT_STRING": "# CNY",
                            "FULL_NAME": "yuan",
                            "HIDE_ZERO": "Y",
                            "THOUSANDS_VARIANT": "D",
                        },
                    },
                },
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
                    'crm.currency.add',
                    [
                        'fields' => [
                            'CURRENCY' => 'CNY',
                            'BASE' => 'N',
                            'AMOUNT' => 12.2251,
                            'AMOUNT_CNT' => 1,
                            'SORT' => 9000,
                            'LANG' => [
                                'ru' => [
                                    'DECIMALS' => 2,
                                    'DEC_POINT' => '.',
                                    'FORMAT_STRING' => '# CNY',
                                    'FULL_NAME' => 'юань',
                                    'HIDE_ZERO' => 'Y',
                                    'THOUSANDS_VARIANT' => 'S',
                                ],
                                'en' => [
                                    'DECIMALS' => 2,
                                    'DEC_POINT' => ',',
                                    'FORMAT_STRING' => '# CNY',
                                    'FULL_NAME' => 'yuan',
                                    'HIDE_ZERO' => 'Y',
                                    'THOUSANDS_VARIANT' => 'D',
                                ],
                            ],
                        ],
                    ]
                );

            $result = $response
                ->getResponseData()
                ->getResult();

            print_r($result);
        } catch (Throwable $e) {
            echo $e->getMessage();
        }
        ```

    - BX24.js

        ```js
        BX24.callMethod(
            "crm.currency.add",
            {
                fields: {
                    CURRENCY: 'CNY',
                    BASE: 'N',
                    AMOUNT: 12.2251,
                    AMOUNT_CNT: 1,
                    SORT: 9000,
                    LANG: {
                        ru: {
                            DECIMALS: 2,
                            DEC_POINT: '.',
                            FORMAT_STRING: '# CNY',
                            FULL_NAME: 'юань',
                            HIDE_ZERO: 'Y',
                            THOUSANDS_VARIANT: 'S'
                        },
                        en: {
                            DECIMALS: 2,
                            DEC_POINT: ',',
                            FORMAT_STRING: '# CNY',
                            FULL_NAME: 'yuan',
                            HIDE_ZERO: 'Y',
                            THOUSANDS_VARIANT: 'D'
                        }
                    }
                }
            },
            function(result)
            {
                if (result.error())
                {
                    console.error(result.error());
                }
                else
                {
                    console.log(result.data());
                }
            }
        );
        ```

    - PHP CRest

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.currency.add',
            [
                'fields' => [
                    'CURRENCY' => 'CNY',
                    'BASE' => 'N',
                    'AMOUNT' => 12.2251,
                    'AMOUNT_CNT' => 1,
                    'SORT' => 9000,
                    'LANG' => [
                        'ru' => [
                            'DECIMALS' => 2,
                            'DEC_POINT' => '.',
                            'FORMAT_STRING' => '# CNY',
                            'FULL_NAME' => 'юань',
                            'HIDE_ZERO' => 'Y',
                            'THOUSANDS_VARIANT' => 'S',
                        ],
                        'en' => [
                            'DECIMALS' => 2,
                            'DEC_POINT' => ',',
                            'FORMAT_STRING' => '# CNY',
                            'FULL_NAME' => 'yuan',
                            'HIDE_ZERO' => 'Y',
                            'THOUSANDS_VARIANT' => 'D',
                        ],
                    ],
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
        res, err := client.Core().Call(ctx, "crm.currency.add", b24.Params{
        	"fields": b24.Params{
        		"CURRENCY":   "CNY",
        		"BASE":       "N",
        		"AMOUNT":     12.2251,
        		"AMOUNT_CNT": 1,
        		"SORT":       9000,
        		"LANG": b24.Params{
        			"ru": b24.Params{
        				"DECIMALS":          2,
        				"DEC_POINT":         ".",
        				"FORMAT_STRING":     "# CNY",
        				"FULL_NAME":         "юань",
        				"HIDE_ZERO":         "Y",
        				"THOUSANDS_VARIANT": "S",
        			},
        			"en": b24.Params{
        				"DECIMALS":      2,
        				"DEC_POINT":     ",",
        				"FORMAT_STRING": "# CNY",
        				"FULL_NAME":     "yuan",
        				"HIDE_ZERO":     "Y",
        				"THOUSANDS_VARIANT": "D",
        			},
        		},
        	},
        })
        if err != nil {
        	return fmt.Errorf("crm.currency.add: %w", err)
        }

        var value string
        if err := json.Unmarshal(res.Result, &value); err != nil {
        	return fmt.Errorf("разбор ответа: %w", err)
        }
        fmt.Println("результат:", value)
        ```

    {% endlist %}

2. Создание индонезийской рупии

    Базовая валюта — рубль. Одна рупия стоит 0,00548 рубля. Чтобы задать такой низкий курс точно, увеличиваем номинал: `AMOUNT` = `54.8738` рубля за `AMOUNT_CNT` = `10000` рупий.

    {% include [Сноска о примерах](../../../_includes/examples.md) %}

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"fields":{"CURRENCY":"IDR","AMOUNT":54.8738,"AMOUNT_CNT":10000,"SORT":8000,"LANG":{"ru":{"DECIMALS":2,"DEC_POINT":".","FORMAT_STRING":"Rp#","FULL_NAME":"рупия","HIDE_ZERO":"Y","THOUSANDS_VARIANT":"C"},"en":{"DECIMALS":2,"DEC_POINT":".","FORMAT_STRING":"Rp#","FULL_NAME":"rupee","HIDE_ZERO":"Y","THOUSANDS_VARIANT":"C"}}}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.currency.add
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"fields":{"CURRENCY":"IDR","AMOUNT":54.8738,"AMOUNT_CNT":10000,"SORT":8000,"LANG":{"ru":{"DECIMALS":2,"DEC_POINT":".","FORMAT_STRING":"Rp#","FULL_NAME":"рупия","HIDE_ZERO":"Y","THOUSANDS_VARIANT":"C"},"en":{"DECIMALS":2,"DEC_POINT":".","FORMAT_STRING":"Rp#","FULL_NAME":"rupee","HIDE_ZERO":"Y","THOUSANDS_VARIANT":"C"}}},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.currency.add
        ```

    - JS (TS)

        ```ts
        // This snippet is an ES module: top-level await requires type="module" or a bundler.
        // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'

        declare const $b24: B24Frame

        try {
          const response = await $b24.actions.v2.call.make<string>({
            method: 'crm.currency.add',
            params: {
              fields: {
                CURRENCY: 'IDR',
                AMOUNT: 54.8738,
                AMOUNT_CNT: 10000,
                SORT: 8000,
                LANG: {
                  ru: {
                    DECIMALS: 2,
                    DEC_POINT: '.',
                    FORMAT_STRING: 'Rp#',
                    FULL_NAME: 'рупия',
                    HIDE_ZERO: 'Y',
                    THOUSANDS_VARIANT: 'C',
                  },
                  en: {
                    DECIMALS: 2,
                    DEC_POINT: '.',
                    FORMAT_STRING: 'Rp#',
                    FULL_NAME: 'rupee',
                    HIDE_ZERO: 'Y',
                    THOUSANDS_VARIANT: 'C',
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
            console.info('Created currency id:', result)
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
          async function addCurrency() {
            try {
              // Initialize the SDK inside a Bitrix24 frame
              const $b24 = await B24Js.initializeB24Frame()

              const response = await $b24.actions.v2.call.make({
                method: 'crm.currency.add',
                params: {
                  fields: {
                    CURRENCY: 'IDR',
                    AMOUNT: 54.8738,
                    AMOUNT_CNT: 10000,
                    SORT: 8000,
                    LANG: {
                      ru: {
                        DECIMALS: 2,
                        DEC_POINT: '.',
                        FORMAT_STRING: 'Rp#',
                        FULL_NAME: 'рупия',
                        HIDE_ZERO: 'Y',
                        THOUSANDS_VARIANT: 'C',
                      },
                      en: {
                        DECIMALS: 2,
                        DEC_POINT: '.',
                        FORMAT_STRING: 'Rp#',
                        FULL_NAME: 'rupee',
                        HIDE_ZERO: 'Y',
                        THOUSANDS_VARIANT: 'C',
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
              console.info('Created currency id:', result)
            } catch (error) {
              // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
              console.error(error)
            }
          }

          document.addEventListener('DOMContentLoaded', addCurrency)
        </script>
        ```

    - Python

        ```python
        from b24pysdk.errors import BitrixAPIError, BitrixSDKException

        try:
            bitrix_response = client.crm.currency.add(
                fields={
                    "CURRENCY": "IDR",
                    "AMOUNT": 54.8738,
                    "AMOUNT_CNT": 10000,
                    "SORT": 8000,
                    "LANG": {
                        "ru": {
                            "DECIMALS": 2,
                            "DEC_POINT": ".",
                            "FORMAT_STRING": "Rp#",
                            "FULL_NAME": "рупия",
                            "HIDE_ZERO": "Y",
                            "THOUSANDS_VARIANT": "C",
                        },
                        "en": {
                            "DECIMALS": 2,
                            "DEC_POINT": ".",
                            "FORMAT_STRING": "Rp#",
                            "FULL_NAME": "rupee",
                            "HIDE_ZERO": "Y",
                            "THOUSANDS_VARIANT": "C",
                        },
                    },
                },
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
                    'crm.currency.add',
                    [
                        'fields' => [
                            'CURRENCY' => 'IDR',
                            'AMOUNT' => 54.8738,
                            'AMOUNT_CNT' => 10000,
                            'SORT' => 8000,
                            'LANG' => [
                                'ru' => [
                                    'DECIMALS' => 2,
                                    'DEC_POINT' => '.',
                                    'FORMAT_STRING' => 'Rp#',
                                    'FULL_NAME' => 'рупия',
                                    'HIDE_ZERO' => 'Y',
                                    'THOUSANDS_VARIANT' => 'C',
                                ],
                                'en' => [
                                    'DECIMALS' => 2,
                                    'DEC_POINT' => '.',
                                    'FORMAT_STRING' => 'Rp#',
                                    'FULL_NAME' => 'rupee',
                                    'HIDE_ZERO' => 'Y',
                                    'THOUSANDS_VARIANT' => 'C',
                                ],
                            ],
                        ],
                    ]
                );

            $result = $response
                ->getResponseData()
                ->getResult();

            print_r($result);
        } catch (Throwable $e) {
            echo $e->getMessage();
        }
        ```

    - BX24.js

        ```js
        BX24.callMethod(
            "crm.currency.add",
            {
                fields: {
                    CURRENCY: 'IDR',
                    AMOUNT: 54.8738,
                    AMOUNT_CNT: 10000,
                    SORT: 8000,
                    LANG: {
                        ru: {
                            DECIMALS: 2,
                            DEC_POINT: '.',
                            FORMAT_STRING: 'Rp#',
                            FULL_NAME: 'рупия',
                            HIDE_ZERO: 'Y',
                            THOUSANDS_VARIANT: 'C'
                        },
                        en: {
                            DECIMALS: 2,
                            DEC_POINT: '.',
                            FORMAT_STRING: 'Rp#',
                            FULL_NAME: 'rupee',
                            HIDE_ZERO: 'Y',
                            THOUSANDS_VARIANT: 'C'
                        }
                    }
                }
            },
            function(result)
            {
                if (result.error())
                {
                    console.error(result.error());
                }
                else
                {
                    console.log(result.data());
                }
            }
        );
        ```

    - PHP CRest

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.currency.add',
            [
                'fields' => [
                    'CURRENCY' => 'IDR',
                    'AMOUNT' => 54.8738,
                    'AMOUNT_CNT' => 10000,
                    'SORT' => 8000,
                    'LANG' => [
                        'ru' => [
                            'DECIMALS' => 2,
                            'DEC_POINT' => '.',
                            'FORMAT_STRING' => 'Rp#',
                            'FULL_NAME' => 'рупия',
                            'HIDE_ZERO' => 'Y',
                            'THOUSANDS_VARIANT' => 'C',
                        ],
                        'en' => [
                            'DECIMALS' => 2,
                            'DEC_POINT' => '.',
                            'FORMAT_STRING' => 'Rp#',
                            'FULL_NAME' => 'rupee',
                            'HIDE_ZERO' => 'Y',
                            'THOUSANDS_VARIANT' => 'C',
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
        res, err := client.Core().Call(ctx, "crm.currency.add", b24.Params{
        	"fields": b24.Params{
        		"CURRENCY":   "IDR",
        		"AMOUNT":     54.8738,
        		"AMOUNT_CNT": 10000,
        		"SORT":       8000,
        		"LANG": b24.Params{
        			"ru": b24.Params{
        				"DECIMALS":          2,
        				"DEC_POINT":         ".",
        				"FORMAT_STRING":     "Rp#",
        				"FULL_NAME":         "рупия",
        				"HIDE_ZERO":         "Y",
        				"THOUSANDS_VARIANT": "C",
        			},
        			"en": b24.Params{
        				"DECIMALS":          2,
        				"DEC_POINT":         ".",
        				"FORMAT_STRING":     "Rp#",
        				"FULL_NAME":         "rupee",
        				"HIDE_ZERO":         "Y",
        				"THOUSANDS_VARIANT": "C",
        			},
        		},
        	},
        })
        if err != nil {
        	return fmt.Errorf("crm.currency.add: %w", err)
        }

        var value string
        if err := json.Unmarshal(res.Result, &value); err != nil {
        	return fmt.Errorf("разбор ответа: %w", err)
        }
        fmt.Println("результат:", value)
        ```

    {% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": "CNY",
    "time": {
        "start": 1717684463.467685,
        "finish": 1717684465.282238,
        "duration": 1.8145530223846436,
        "processing": 0.12580394744873047,
        "date_start": "2024-06-06T16:34:23+02:00",
        "date_finish": "2024-06-06T16:34:25+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`crm_currency.CURRENCY`](../data-types.md#crm_currency) | Идентификатор созданной валюты ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
	"error": "",
	"error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | `Access denied.` | У пользователя нет права «Разрешить изменять настройки» в CRM ||
|| `400` | `ERROR_CORE` | `Идентификатор валюты должен состоять из 3-х символов латинского алфавита` | `CURRENCY` не из трех латинских букв ||
|| `400` | `ERROR_CORE` | `Валюта с таким идентификатором уже существует` | Валюта с таким кодом уже есть ||
|| `400` | `ERROR_CORE` | `Не задан курс по умолчанию` | Не передан `AMOUNT` ||
|| `400` | `ERROR_CORE` | `Не заполнено поле "Формат" для языка ru.` | В локализации из `LANG` не передан `FORMAT_STRING` ||
|| `400` | `ERROR_CORE` | `Десятичная точка совпадает с разделителем тысяч для языка en` | В локализации из `LANG` разделитель разрядов совпадает с `DEC_POINT` ||
|| `400` | `ERROR_CORE` | `Неверный курс по умолчанию` | `AMOUNT` не больше нуля ||
|| `400` | `ERROR_CORE` | `Неверный номинал` | `AMOUNT_CNT` не больше нуля ||
|| `400` | Пустое значение | `Модуль "Валюты" не найден! Пожалуйста, установите модуль "Валюты".` | Не установлен модуль «Валюты» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-currency-update.md)
- [{#T}](./crm-currency-get.md)
- [{#T}](./crm-currency-list.md)
- [{#T}](./crm-currency-delete.md)
- [{#T}](./crm-currency-fields.md)
- [{#T}](./index.md)