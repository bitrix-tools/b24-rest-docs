# Получить локализации валюты crm.currency.localizations.get

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к настройкам CRM

Метод получает существующие локализации валюты.

## Параметры метода

#|
||  **Название**
`тип`| **Описание** ||
|| **id**
[`string`](../../../data-types.md) | Идентификатор валюты. 

Соответствует стандарту ISO 4217.

Идентификатор можно получить методом [crm.currency.list](../crm-currency-list.md)
 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"RUB"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.currency.localizations.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"RUB","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.currency.localizations.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.currency.localizations.get',
    		{
    			id: 'RUB'
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
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
                'crm.currency.localizations.get',
                [
                    'id' => 'RUB',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting currency localizations: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.currency.localizations.get",
        {
            id: "RUB"
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

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.currency.localizations.get',
        [
            'id' => 'RUB'
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
    "result": {
        "en": {
            "FORMAT_STRING": "&#8381;#",
            "FULL_NAME": "Russian Ruble",
            "DEC_POINT": ".",
            "THOUSANDS_SEP": null,
            "DECIMALS": "2",
            "THOUSANDS_VARIANT": "C",
            "HIDE_ZERO": "Y"
        },
        "ru": {
            "FORMAT_STRING": "# &#8381;",
            "FULL_NAME": "Российский рубль",
            "DEC_POINT": ".",
            "THOUSANDS_SEP": "&nbsp;",
            "DECIMALS": "2",
            "THOUSANDS_VARIANT": "B",
            "HIDE_ZERO": "Y"
        }
    },
    "time": {
        "start": 1718114356.076467,
        "finish": 1718114356.682042,
        "duration": 0.6055748462677002,
        "processing": 0.03888106346130371,
        "date_start": "2024-06-11T15:59:16+02:00",
        "date_finish": "2024-06-11T15:59:16+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект в формате `{"lang_1": "value_1", ... "lang_N": "value_N"}`, где `lang_N` — идентификатор языка, а `value` — объект типа [crm_currency_localization](../../data-types.md#crm_currency_localization). ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
	"error": "",
	"error_description": "The parameter id is invalid or not defined."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| Пустая строка | Access denied. | Недостаточно прав доступа ||
|| Пустая строка | The parameter id is invalid or not defined. | Пустой идентификатор валюты ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-currency-localizations-set.md)
- [{#T}](./crm-currency-localizations-delete.md)
- [{#T}](./crm-currency-localizations-fields.md)