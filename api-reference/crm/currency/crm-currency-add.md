# Добавить валюту crm.currency.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к изменению настроек CRM

Метод добавляет новую валюту.

Для языков, используемых на портале, необходимо указать параметры локализации. Если этого не сделать, будут использованы [параметры по умолчанию](../data-types.md#crm_currency_localization). Для конкретного языка можно задать параметры локализации методом [crm.currency.localizations.set](./localizations/crm-currency-localizations-set.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
||  **Название**
`тип`| **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для добавления новой валюты в виде структуры:

```js
fields: {
    CURRENCY: 'значение',
    BASE: 'значение',
    AMOUNT_CNT: 'значение',
    AMOUNT: 'значение'
    SORT: 'значение'
    LANG: 'значение'
}
```

||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
||  **Название**
`тип`| **Описание** ||
|| **CURRENCY***
[`string`](../../data-types.md) | Идентификатор валюты.

Соответствует стандарту ISO 4217
 ||
|| **BASE**
[`string`](../../data-types.md) | Признак, является ли валюта базовой.

Возможные значения:
 - `Y` — да
 - `N` — нет

Значение по умолчанию — `N`.

{% note warning %}

Не рекомендуется менять базовую валюту через REST. Иначе потребуется изменить курсы всех валют

{% endnote %}

 ||
|| **AMOUNT_CNT***
[`int`](../../data-types.md) | Номинал. В качестве номинала чаще всего используется `1` или число кратное `10`
 ||
|| **AMOUNT***
[`double`](../../data-types.md) | Курс обмена по отношению к базовой валюте ||
|| **SORT**
[`int`](../../data-types.md) | Положение в списке валют.

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
||  **Название**
`тип`| **Описание** ||
|| **DECIMALS***
[`int`](../../data-types.md) | Число десятичных знаков дробной части ||
|| **DEC_POINT**
[`string`](../../data-types.md) | Десятичная точка при выводе ||
|| **FORMAT_STRING**
[`string`](../../data-types.md) | Шаблон формата ||
|| **FULL_NAME**
[`string`](../../data-types.md) | Название валюты на языке, для которого добавляется локализация ||
|| **HIDE_ZERO**
[`string`](../../data-types.md) | Признак, скрывать незначащие нули или нет ||
|| **THOUSANDS_SEP**
[`string`](../../data-types.md) | Разделитель триад ||
|| **THOUSANDS_VARIANT**
[`string`](../../data-types.md) | Код разделителя триад.

Допустимые значения описаны в [справочнике](../data-types.md#crm_currency_localization) ||
|#

## Примеры кода

1. Создание юаня с параметрами локализации (русский и английский языки)

    Базовая валюта — рубль. Курс юаня — 12.2251 руб за 1 юань.

    {% include [Сноска о примерах](../../../_includes/examples.md) %}

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"fields":{"CURRENCY":"CNY","BASE":"N","AMOUNT":12.2251,"AMOUNT_CNT":1,"SORT":9000,"LANG":{"ru":{"DECIMALS":2,"DEC_POINT":".","FORMAT_STRING":"# CNY","FULL_NAME":"юань","HIDE_ZERO":"Y","THOUSANDS_VARIANT":"S"},"en":{"DECIMALS":2,"DEC_POINT":",","FORMAT_STRING":"# CNY","FULL_NAME":"yuan","HIDE_ZERO":"Y","THOUSANDS_SEP":"."}}}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.currency.add
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"fields":{"CURRENCY":"CNY","BASE":"N","AMOUNT":12.2251,"AMOUNT_CNT":1,"SORT":9000,"LANG":{"ru":{"DECIMALS":2,"DEC_POINT":".","FORMAT_STRING":"# CNY","FULL_NAME":"юань","HIDE_ZERO":"Y","THOUSANDS_VARIANT":"S"},"en":{"DECIMALS":2,"DEC_POINT":",","FORMAT_STRING":"# CNY","FULL_NAME":"yuan","HIDE_ZERO":"Y","THOUSANDS_SEP":"."}}},"auth":"**put_access_token_here**"}' \
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
                    FULL_NAME: 'Yuan',
                    HIDE_ZERO: 'Y',
                    THOUSANDS_VARIANT: 'S',
                  },
                  en: {
                    DECIMALS: 2,
                    DEC_POINT: ',',
                    FORMAT_STRING: '# CNY',
                    FULL_NAME: 'Yuan',
                    HIDE_ZERO: 'Y',
                    THOUSANDS_SEP: '.',
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
                        FULL_NAME: 'Yuan',
                        HIDE_ZERO: 'Y',
                        THOUSANDS_VARIANT: 'S',
                      },
                      en: {
                        DECIMALS: 2,
                        DEC_POINT: ',',
                        FORMAT_STRING: '# CNY',
                        FULL_NAME: 'Yuan',
                        HIDE_ZERO: 'Y',
                        THOUSANDS_SEP: '.',
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

    - PHP

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
                            'THOUSANDS_SEP' => '.',
                        ],
                    ],
                ]
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    {% endlist %}

2. Создание индонезийской рупии

    Предполагаем, что базовая валюта — рубль. Валюта имеет очень низкий курс — 1 рупия эквивалентна 0,00548 рубля. В этом случае номинал (AMOUNT_CNT) увеличиваем, чтобы задавать курс с требуемой точностью.

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
                    FULL_NAME: 'Rupee',
                    HIDE_ZERO: 'Y',
                    THOUSANDS_VARIANT: 'C',
                  },
                  en: {
                    DECIMALS: 2,
                    DEC_POINT: '.',
                    FORMAT_STRING: 'Rp#',
                    FULL_NAME: 'Rupee',
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
                        FULL_NAME: 'Rupee',
                        HIDE_ZERO: 'Y',
                        THOUSANDS_VARIANT: 'C',
                      },
                      en: {
                        DECIMALS: 2,
                        DEC_POINT: '.',
                        FORMAT_STRING: 'Rp#',
                        FULL_NAME: 'Rupee',
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

    - PHP

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
|| **Код** | **Описание** | **Значение** ||
|| Пустая строка | Access denied. | Недостаточно прав доступа ||
|| Пустая строка | Модуль "Валюты" не найден! Пожалуйста, установите модуль "Валюты". |  ||
|| `ERROR_CORE` | Undefined array key "#FIELD#" | Не указано обязательное поле #FIELD# (вместо #FIELD# будет подставлен код отсутствующего поля) ||
|| `ERROR_CORE` | Другие ошибки в данных для создания валюты |  ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-currency-update.md)
- [{#T}](./crm-currency-get.md)
- [{#T}](./crm-currency-list.md)
- [{#T}](./crm-currency-delete.md)
- [{#T}](./crm-currency-fields.md)