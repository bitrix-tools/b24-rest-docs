# Обновить валюту crm.currency.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Разрешить изменять настройки» в CRM

Метод `crm.currency.update` меняет курс, сортировку и локализации валюты.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип`| **Описание** ||
|| **ID***
[`string`](../../data-types.md) | Идентификатор валюты.

Соответствует стандарту ISO 4217.

Идентификатор можно получить методом [crm.currency.list](./crm-currency-list.md)
 ||
|| **fields**
[`object`](../../data-types.md) | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для обновления валюты в виде структуры:

```js
fields: {
    SORT: 'значение',
    AMOUNT_CNT: 'значение',
    AMOUNT: 'значение',
    BASE: 'значение',
    LANG: {
        lang_1: {
            DECIMALS: 'значение',
            DEC_POINT: 'значение',
            ...
        },
        ...
        lang_N: {
            ...
        }
    }
}
```
||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип`| **Описание** ||
|| **SORT**
[`integer`](../../data-types.md) | Положение в списке валют.

Если не передать, значение не изменится
 ||
|| **AMOUNT_CNT**
[`integer`](../../data-types.md) | Номинал — количество единиц валюты, для которого задан курс `AMOUNT`. Обычно `1`, `10`, `100` и так далее
 ||
|| **AMOUNT**
[`double`](../../data-types.md) | Сколько стоит номинал `AMOUNT_CNT` в базовой валюте, например `15.3449` ||
|| **BASE**
[`string`](../../data-types.md) | Признак базовой валюты. Метод не учитывает этот параметр и не возвращает ошибку: сделать валюту базовой этим методом нельзя. Базовую валюту меняет метод [crm.currency.base.set](./crm-currency-base-set.md)
 ||
|| **LANG**
[`object`](../../data-types.md) | Параметры локализации валюты.

Объект в формате `{"lang_1": "value_1", ... "lang_N": "value_N"}`, где `lang_N` — идентификатор языка, а `value` — объект типа [crm_currency_localization](../data-types.md#crm_currency_localization).

Метод меняет локализации только для языков, переданных в `LANG`. Остальные остаются прежними
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
|| **FORMAT_STRING**
[`string`](../../data-types.md) | Шаблон вывода суммы, например `$#`. Обязателен, если для языка еще нет локализации ||
|| **FULL_NAME**
[`string`](../../data-types.md) | Название валюты на языке, для которого добавляется локализация ||
|| **HIDE_ZERO**
[`string`](../../data-types.md) | Скрывать ли незначащие нули: `Y` — скрывать, `N` — показывать ||
|| **THOUSANDS_SEP**
[`string`](../../data-types.md) | Разделитель разрядов ||
|| **THOUSANDS_VARIANT**
[`string`](../../data-types.md) | Код разделителя разрядов.

Допустимые значения смотрите в справочнике [crm_currency_localization](../data-types.md#crm_currency_localization) ||
|#

## Примеры кода

1. Изменение курса юаня по отношению к базовой валюте

    {% include [Сноска о примерах](../../../_includes/examples.md) %}

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"ID":"CNY","fields":{"AMOUNT":15.3449}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.currency.update
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"ID":"CNY","fields":{"AMOUNT":15.3449},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.currency.update
        ```

    - JS (TS)

        ```ts
        // This snippet is an ES module: top-level await requires type="module" or a bundler.
        // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'

        declare const $b24: B24Frame

        try {
          const response = await $b24.actions.v2.call.make<boolean>({
            method: 'crm.currency.update',
            params: {
              ID: 'CNY',
              fields: {
                AMOUNT: 15.3449,
              },
            },
            requestId: Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
          } else {
            const result = response.getData()!.result
            console.info('Currency updated:', result)
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
          async function updateCurrency() {
            try {
              // Initialize the SDK inside a Bitrix24 frame
              const $b24 = await B24Js.initializeB24Frame()

              const response = await $b24.actions.v2.call.make({
                method: 'crm.currency.update',
                params: {
                  ID: 'CNY',
                  fields: {
                    AMOUNT: 15.3449,
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
              console.info('Currency updated:', result)
            } catch (error) {
              // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
              console.error(error)
            }
          }

          document.addEventListener('DOMContentLoaded', updateCurrency)
        </script>
        ```

    - Python

        ```python
        from b24pysdk.errors import BitrixAPIError, BitrixSDKException

        try:
            bitrix_response = client.crm.currency.update(
                bitrix_id="CNY",
                fields={
                    "AMOUNT": 15.3449,
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
                    'crm.currency.update',
                    [
                        'ID' => 'CNY',
                        'fields' => [
                            'AMOUNT' => 15.3449,
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
            "crm.currency.update",
            {
                ID: 'CNY',
                fields: {
                    AMOUNT: 15.3449
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
            'crm.currency.update',
            [
                'ID' => 'CNY',
                'fields' => [
                    'AMOUNT' => 15.3449,
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
        res, err := client.Core().Call(ctx, "crm.currency.update", b24.Params{
        	"ID": "CNY",
        	"fields": b24.Params{
        		"AMOUNT": 15.3449,
        	},
        })
        if err != nil {
        	return fmt.Errorf("crm.currency.update: %w", err)
        }

        var ok bool
        if err := json.Unmarshal(res.Result, &ok); err != nil {
        	return fmt.Errorf("разбор ответа: %w", err)
        }
        fmt.Println("выполнено:", ok)
        ```

    {% endlist %}

2. Изменение локализаций валюты (на примере доллара США)

    Пример меняет или добавляет локализации доллара США `USD` только для английского и немецкого языков. Локализации на остальных языках, если они были, не изменятся.

    Похожим образом работает метод [crm.currency.localizations.set](./localizations/crm-currency-localizations-set.md).

    {% include [Сноска о примерах](../../../_includes/examples.md) %}

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"ID":"USD","fields":{"LANG":{"en":{"DECIMALS":2,"DEC_POINT":".","FORMAT_STRING":"$#","FULL_NAME":"US Dollar","HIDE_ZERO":"Y","THOUSANDS_VARIANT":"S"},"de":{"DECIMALS":2,"DEC_POINT":".","FORMAT_STRING":"# $","FULL_NAME":"US-Dollar","HIDE_ZERO":"Y","THOUSANDS_VARIANT":"C"}}}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.currency.update
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"ID":"USD","fields":{"LANG":{"en":{"DECIMALS":2,"DEC_POINT":".","FORMAT_STRING":"$#","FULL_NAME":"US Dollar","HIDE_ZERO":"Y","THOUSANDS_VARIANT":"S"},"de":{"DECIMALS":2,"DEC_POINT":".","FORMAT_STRING":"# $","FULL_NAME":"US-Dollar","HIDE_ZERO":"Y","THOUSANDS_VARIANT":"C"}}},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.currency.update
        ```

    - JS (TS)

        ```ts
        // This snippet is an ES module: top-level await requires type="module" or a bundler.
        // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'

        declare const $b24: B24Frame

        try {
          const response = await $b24.actions.v2.call.make<boolean>({
            method: 'crm.currency.update',
            params: {
              ID: 'USD',
              fields: {
                LANG: {
                  en: {
                    DECIMALS: 2,
                    DEC_POINT: '.',
                    FORMAT_STRING: '$#',
                    FULL_NAME: 'US Dollar',
                    HIDE_ZERO: 'Y',
                    THOUSANDS_VARIANT: 'S',
                  },
                  de: {
                    DECIMALS: 2,
                    DEC_POINT: '.',
                    FORMAT_STRING: '# $',
                    FULL_NAME: 'US-Dollar',
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
            console.info('Currency updated:', result)
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
          async function updateCurrency() {
            try {
              // Initialize the SDK inside a Bitrix24 frame
              const $b24 = await B24Js.initializeB24Frame()

              const response = await $b24.actions.v2.call.make({
                method: 'crm.currency.update',
                params: {
                  ID: 'USD',
                  fields: {
                    LANG: {
                      en: {
                        DECIMALS: 2,
                        DEC_POINT: '.',
                        FORMAT_STRING: '$#',
                        FULL_NAME: 'US Dollar',
                        HIDE_ZERO: 'Y',
                        THOUSANDS_VARIANT: 'S',
                      },
                      de: {
                        DECIMALS: 2,
                        DEC_POINT: '.',
                        FORMAT_STRING: '# $',
                        FULL_NAME: 'US-Dollar',
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
              console.info('Currency updated:', result)
            } catch (error) {
              // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
              console.error(error)
            }
          }

          document.addEventListener('DOMContentLoaded', updateCurrency)
        </script>
        ```

    - Python

        ```python
        from b24pysdk.errors import BitrixAPIError, BitrixSDKException

        try:
            bitrix_response = client.crm.currency.update(
                bitrix_id="USD",
                fields={
                    "LANG": {
                        "en": {
                            "DECIMALS": 2,
                            "DEC_POINT": ".",
                            "FORMAT_STRING": "$#",
                            "FULL_NAME": "US Dollar",
                            "HIDE_ZERO": "Y",
                            "THOUSANDS_VARIANT": "S",
                        },
                        "de": {
                            "DECIMALS": 2,
                            "DEC_POINT": ".",
                            "FORMAT_STRING": "# $",
                            "FULL_NAME": "US-Dollar",
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
                    'crm.currency.update',
                    [
                        'ID' => 'USD',
                        'fields' => [
                            'LANG' => [
                                'en' => [
                                    'DECIMALS' => 2,
                                    'DEC_POINT' => '.',
                                    'FORMAT_STRING' => '$#',
                                    'FULL_NAME' => 'US Dollar',
                                    'HIDE_ZERO' => 'Y',
                                    'THOUSANDS_VARIANT' => 'S',
                                ],
                                'de' => [
                                    'DECIMALS' => 2,
                                    'DEC_POINT' => '.',
                                    'FORMAT_STRING' => '# $',
                                    'FULL_NAME' => 'US-Dollar',
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
            "crm.currency.update",
            {
                ID: 'USD',
                fields: {
                    LANG: {
                        en: {
                            DECIMALS: 2,
                            DEC_POINT: '.',
                            FORMAT_STRING: '$#',
                            FULL_NAME: 'US Dollar',
                            HIDE_ZERO: 'Y',
                            THOUSANDS_VARIANT: 'S'
                        },
                        de: {
                            DECIMALS: 2,
                            DEC_POINT: '.',
                            FORMAT_STRING: '# $',
                            FULL_NAME: 'US-Dollar',
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
            'crm.currency.update',
            [
                'ID' => 'USD',
                'fields' => [
                    'LANG' => [
                        'en' => [
                            'DECIMALS' => 2,
                            'DEC_POINT' => '.',
                            'FORMAT_STRING' => '$#',
                            'FULL_NAME' => 'US Dollar',
                            'HIDE_ZERO' => 'Y',
                            'THOUSANDS_VARIANT' => 'S',
                        ],
                        'de' => [
                            'DECIMALS' => 2,
                            'DEC_POINT' => '.',
                            'FORMAT_STRING' => '# $',
                            'FULL_NAME' => 'US-Dollar',
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
        res, err := client.Core().Call(ctx, "crm.currency.update", b24.Params{
        	"ID": "USD",
        	"fields": b24.Params{
        		"LANG": b24.Params{
        			"en": b24.Params{
        				"DECIMALS":          2,
        				"DEC_POINT":         ".",
        				"FORMAT_STRING":     "$#",
        				"FULL_NAME":         "US Dollar",
        				"HIDE_ZERO":         "Y",
        				"THOUSANDS_VARIANT": "S",
        			},
        			"de": b24.Params{
        				"DECIMALS":          2,
        				"DEC_POINT":         ".",
        				"FORMAT_STRING":     "# $",
        				"FULL_NAME":         "US-Dollar",
        				"HIDE_ZERO":         "Y",
        				"THOUSANDS_VARIANT": "C",
        			},
        		},
        	},
        })
        if err != nil {
        	return fmt.Errorf("crm.currency.update: %w", err)
        }

        var ok bool
        if err := json.Unmarshal(res.Result, &ok); err != nil {
        	return fmt.Errorf("разбор ответа: %w", err)
        }
        fmt.Println("выполнено:", ok)
        ```

    {% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1717764521.938284,
        "finish": 1717764522.516576,
        "duration": 0.5782921314239502,
        "processing": 0.07656002044677734,
        "date_start": "2024-06-07T14:48:41+02:00",
        "date_finish": "2024-06-07T14:48:42+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если валюта обновлена ||
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
|| `400` | Пустое значение | `ID is not defined or invalid.` | `ID` не передан ||
|| `400` | Пустое значение | `The parameter id is not string.` | `ID` передан не строкой ||
|| `400` | Пустое значение | `Parameter 'fields' must be array.` | `fields` передан не объектом ||
|| `400` | Пустое значение | `Access denied.` | У пользователя нет права «Разрешить изменять настройки» в CRM ||
|| `400` | Пустое значение | `Currency is not found` | Валюты с таким кодом нет ||
|| `400` | `ERROR_CORE` | `Неверный курс по умолчанию` | `AMOUNT` не больше нуля ||
|| `400` | `ERROR_CORE` | `Неверный номинал` | `AMOUNT_CNT` не больше нуля ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-currency-add.md)
- [{#T}](./crm-currency-get.md)
- [{#T}](./crm-currency-list.md)
- [{#T}](./crm-currency-delete.md)
- [{#T}](./crm-currency-fields.md)
- [{#T}](./index.md)