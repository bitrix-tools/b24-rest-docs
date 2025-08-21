# Добавить единицу измерения crm.measure.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод добавляет новую единицу измерения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`array`](../../data-types.md) | Набор полей — массив вида `array("поле"=>"значение"[, ...])`, содержащий значения полей единицы измерения. 

Чтобы узнать требуемый формат полей, выполните метод [crm.measure.fields](./crm-measure-fields.md) и посмотрите формат пришедших значений этих полей 
||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CODE***
[`integer`](../../data-types.md) | Код ||
|| **MEASURE_TITLE***
[`string`](../../data-types.md) | Наименование единицы измерения ||
|| **SYMBOL_RUS**
[`string`](../../data-types.md) | Условное обозначение ||
|| **SYMBOL_INTL**
[`string`](../../data-types.md) | Условное обозначение (международное) ||
|| **SYMBOL_LETTER_INTL**
[`string`](../../data-types.md) | Кодовое буквенное обозначение (международное) ||
|| **IS_DEFAULT**
[`char`](../../data-types.md) | По умолчанию ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"CODE":"212","MEASURE_TITLE":"Ватт","SYMBOL_RUS":"Вт","SYMBOL_INTL":"W","SYMBOL_LETTER_INTL":"WTT","IS_DEFAULT":"N"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.measure.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"CODE":"212","MEASURE_TITLE":"Ватт","SYMBOL_RUS":"Вт","SYMBOL_INTL":"W","SYMBOL_LETTER_INTL":"WTT","IS_DEFAULT":"N"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.measure.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.measure.add',
    		{
    			fields: {
    				"CODE": "212",
    				"MEASURE_TITLE": "Ватт",
    				"SYMBOL_RUS": "Вт",
    				"SYMBOL_INTL": "W",
    				"SYMBOL_LETTER_INTL": "WTT",
    				"IS_DEFAULT": "N"
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info('Создана единица измерения с ID ' + result);
    }
    catch(error)
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.measure.add',
                [
                    'fields' => [
                        'CODE'              => '212',
                        'MEASURE_TITLE'     => 'Ватт',
                        'SYMBOL_RUS'        => 'Вт',
                        'SYMBOL_INTL'       => 'W',
                        'SYMBOL_LETTER_INTL' => 'WTT',
                        'IS_DEFAULT'        => 'N',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Создана единица измерения с ID ' . $result;
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Ошибка при создании единицы измерения: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.measure.add",
        {
            fields: {
                "CODE": "212",
                "MEASURE_TITLE": "Ватт",
                "SYMBOL_RUS": "Вт",
                "SYMBOL_INTL": "W",
                "SYMBOL_LETTER_INTL": "WTT",
                "IS_DEFAULT": "N"
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info("Создана единица измерения с ID " + result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.measure.add',
        [
            'fields' =>
            [
                'CODE' => '212',
                'MEASURE_TITLE' => 'Ватт',
                'SYMBOL_RUS' => 'Вт',
                'SYMBOL_INTL' => 'W',
                'SYMBOL_LETTER_INTL' => 'WTT',
                'IS_DEFAULT' => 'N'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./crm-measure-update.md)
- [{#T}](./crm-measure-get.md)
- [{#T}](./crm-measure-list.md)
- [{#T}](./crm-measure-delete.md)
- [{#T}](./crm-measure-fields.md)