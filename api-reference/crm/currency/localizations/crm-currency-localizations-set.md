# Установить локализации для валюты crm.currency.localizations.set

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к изменению настроек CRM

Метод обновляет локализации для валюты или добавляет, если локализация для указанного языка не существует.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
||  **Название** /
`тип`| **Описание** ||
|| **id***
[`string`](../../../data-types.md) | Идентификатор валюты.

Соответствует стандарту ISO 4217.

Идентификатор можно получить методом [crm.currency.list](../crm-currency-list.md)
 ||
|| **localizations***
[`object`](../../../data-types.md) | Параметры локализации валюты.
Объект в формате `{"lang_1": "value_1", ... "lang_N": "value_N"}`, где `lang_N` — идентификатор языка, для которого надо добавить/изменить локализацию, а `value` — объект типа [crm_currency_localization](../../data-types.md#crm_currency_localization).

Существующие локализации, которые не переданы в метод, не будут изменены.
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
    -d '{"id":"CLF","localizations":{"en":{"FULL_NAME":"Unidad de Fomento","FORMAT_STRING":"CLF#VALUE#","DEC_POINT":".","THOUSANDS_VARIANT":"C","DECIMALS":4},"ru":{"FULL_NAME":"Единица развития","FORMAT_STRING":"#VALUE# CLF","DEC_POINT":".","THOUSANDS_VARIANT":"B","DECIMALS":4}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.currency.localizations.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"CLF","localizations":{"en":{"FULL_NAME":"Unidad de Fomento","FORMAT_STRING":"CLF#VALUE#","DEC_POINT":".","THOUSANDS_VARIANT":"C","DECIMALS":4},"ru":{"FULL_NAME":"Единица развития","FORMAT_STRING":"#VALUE# CLF","DEC_POINT":".","THOUSANDS_VARIANT":"B","DECIMALS":4}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.currency.localizations.set
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.currency.localizations.set",
    		{
    			id: 'CLF',
    			localizations: {
    				en: {
    					FULL_NAME: 'Unidad de Fomento',
    					FORMAT_STRING: 'CLF#VALUE#',
    					DEC_POINT: '.',
    					THOUSANDS_VARIANT: 'C',
    					DECIMALS: 4,
    				},
    				ru: {
    					FULL_NAME: 'Единица развития',
    					FORMAT_STRING: '#VALUE# CLF',
    					DEC_POINT: '.',
    					THOUSANDS_VARIANT: 'B',
    					DECIMALS: 4,
    				}
    			}
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
                'crm.currency.localizations.set',
                [
                    'id' => 'CLF',
                    'localizations' => [
                        'en' => [
                            'FULL_NAME'        => 'Unidad de Fomento',
                            'FORMAT_STRING'    => 'CLF#VALUE#',
                            'DEC_POINT'        => '.',
                            'THOUSANDS_VARIANT' => 'C',
                            'DECIMALS'         => 4,
                        ],
                        'ru' => [
                            'FULL_NAME'        => 'Единица развития',
                            'FORMAT_STRING'    => '#VALUE# CLF',
                            'DEC_POINT'        => '.',
                            'THOUSANDS_VARIANT' => 'B',
                            'DECIMALS'         => 4,
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
        echo 'Error setting currency localizations: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.currency.localizations.set",
        {
            id: 'CLF',
            localizations: {
                en: {
                    FULL_NAME: 'Unidad de Fomento',
                    FORMAT_STRING: 'CLF#VALUE#',
                    DEC_POINT: '.',
                    THOUSANDS_VARIANT: 'C',
                    DECIMALS: 4,
                },
                ru: {
                    FULL_NAME: 'Единица развития',
                    FORMAT_STRING: '#VALUE# CLF',
                    DEC_POINT: '.',
                    THOUSANDS_VARIANT: 'B',
                    DECIMALS: 4,
                }
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

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.currency.localizations.set',
        [
            'id' => 'CLF',
            'localizations' => [
                'en' => [
                    'FULL_NAME' => 'Unidad de Fomento',
                    'FORMAT_STRING' => 'CLF#VALUE#',
                    'DEC_POINT' => '.',
                    'THOUSANDS_VARIANT' => 'C',
                    'DECIMALS' => 4,
                ],
                'ru' => [
                    'FULL_NAME' => 'Единица развития',
                    'FORMAT_STRING' => '#VALUE# CLF',
                    'DEC_POINT' => '.',
                    'THOUSANDS_VARIANT' => 'B',
                    'DECIMALS' => 4,
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
        "start": 1718122481.837301,
        "finish": 1718122483.141736,
        "duration": 1.3044350147247314,
        "processing": 0.08866286277770996,
        "date_start": "2024-06-11T18:14:41+02:00",
        "date_finish": "2024-06-11T18:14:43+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Возвращает:
- `true` — в случае успеха
- `false` – в случае, когда операцию выполнить не удалось, но ошибки нет, либо ситуация не считается ошибочной. Возможные варианты:
  - отсутствует модуль валют
  - передан пустой объект с локализациями
  - не была добавлена/изменена ни одна локализация
 ||
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

- [{#T}](./crm-currency-localizations-get.md)
- [{#T}](./crm-currency-localizations-delete.md)
- [{#T}](./crm-currency-localizations-fields.md)