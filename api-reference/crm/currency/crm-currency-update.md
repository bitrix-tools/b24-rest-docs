# Обновить валюту crm.currency.update

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к изменению настроек CRM

Метод обновляет существующую валюту.

## Параметры

#|
||  **Название**
`тип`| **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор валюты. 

Соответствует стандарту ISO 4217.

Идентификатор можно получить методом [crm.currency.list](./crm-currency-list.md)
 ||
|| **fields**
[`object`](../../data-types.md) | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для обновления валюты в виде структуры:

```js
fields: {
    SORT: 'значение'
    AMOUNT_CNT: 'значение',
    AMOUNT: 'значение'
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
||  **Название**
`тип`| **Описание** ||
|| **SORT**
[`integer`](../../data-types.md) | Положение в списке валют.

 Значение по умолчанию — `100`
 ||
|| **AMOUNT_CNT***
[`integer`](../../data-types.md) | Номинал. В качестве номинала чаще всего используется `1` или число кратное `10`
 ||
|| **AMOUNT***
[`double`](../../data-types.md) | Курс обмена по отношению к базовой валюте ||
|| **BASE**
[`string`](../../data-types.md) | Признак, является ли валюта базовой.

Возможные значения:
 - `Y` — да
 - `N` — нет

Значение по умолчанию — `N`.

{% note warning %}

Не рекомендуется менять базовую валюту через REST. Иначе необходимо будет изменить курсы всех валют

{% endnote %}

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

Допустимые значения смотрите в справочнике [crm_currency_localization](../data-types.md#crm_currency_localization) ||
|#

## Примеры

1. Изменение курса юаня по отношению к базовой валюте

    {% include [Сноска о примерах](../../../_includes/examples.md) %}

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"ID":"CNY","fields":{"AMOUNT":15.3449}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.currency.update
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"ID":"CNY","fields":{"AMOUNT":15.3449},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.currency.update
        ```

    - JS

        ```js
        BX24.callMethod(
            "crm.currency.update",
            {
                ID: 'CNY',
                fields: {
                    AMOUNT: 15.3449,
                }
            },
        )
        .then(
            function(result)
            {
                if (result.error())
                {
                    console.error(result.error());
                }
                else
                {
                    console.log(result);
                }
            },
            function(error)
            {
                console.info(error);
            }
        );
        ```

    - PHP

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

    {% endlist %}

2. Изменение локализаций валюты (на примере доллара США)

    После выполнения этого примера для валюты USD будут изменены (либо добавлены) локализации только для английского и немецкого языков. Локализации для остальных языков, если они были, не изменятся.

    Данный пример аналогичен работе метода [crm.currency.localizations.set](./localizations/crm-currency-localizations-set.md)

    {% include [Сноска о примерах](../../../_includes/examples.md) %}

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"ID":"USD","fields":{"LANG":{"en":{"DECIMALS":2,"DEC_POINT":".","FORMAT_STRING":"$#","FULL_NAME":"доллар США","HIDE_ZERO":"Y","THOUSANDS_VARIANT":"S"},"de":{"DECIMALS":2,"DEC_POINT":".","FORMAT_STRING":"# $","FULL_NAME":"US-Dollar","HIDE_ZERO":"Y","THOUSANDS_VARIANT":"C"}}}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.currency.update
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"ID":"USD","fields":{"LANG":{"en":{"DECIMALS":2,"DEC_POINT":".","FORMAT_STRING":"$#","FULL_NAME":"доллар США","HIDE_ZERO":"Y","THOUSANDS_VARIANT":"S"},"de":{"DECIMALS":2,"DEC_POINT":".","FORMAT_STRING":"# $","FULL_NAME":"US-Dollar","HIDE_ZERO":"Y","THOUSANDS_VARIANT":"C"}}},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.currency.update
        ```

    - JS

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
                            FULL_NAME: 'доллар США',
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
            }
        )
        .then(
            function(result)
            {
                if (result.error())
                {
                    console.error(result.error());
                }
                else
                {
                    console.log(result);
                }
            },
            function(error)
            {
                console.info(error);
            }
        );
        ```

    - PHP

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
                            'FULL_NAME' => 'доллар США',
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
[`boolean`](../../data-types.md) | Результат обновления валюты ||
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
|| `ERROR_CODE` | Другие ошибки в данных для изменения валюты |  ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-currency-add.md)
- [{#T}](./crm-currency-get.md)
- [{#T}](./crm-currency-list.md)
- [{#T}](./crm-currency-delete.md)
- [{#T}](./crm-currency-fields.md)