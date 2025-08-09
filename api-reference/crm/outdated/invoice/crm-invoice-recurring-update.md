# Изменить настройку для регулярного счета crm.invoice.recurring.update

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

Метод устарел. Рекомендуется использовать  [`Универсальные методы для счетов`](../../universal/invoice.md)

{% endnote %}

Метод обновляет существующую настройку для шаблона регулярного счета. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор настройки шаблона регулярного счета ||
|| **fields**
[`array`](../../../data-types.md) | Значения полей для обновления настройки.

Чтобы узнать требуемый формат полей, выполните метод [crm.invoice.recurring.fields](./crm-invoice-recurring-fields.md) и посмотрите формат пришедших значений этих полей ||
|#

## Примеры кода

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"your_recurring_invoice_id","fields":{"SEND_BILL":"Y","EMAIL_ID":136,"PARAMS":{"MODE":"month","TYPE":2,"INTERVAL":3,"WEEKDAY":"Monday","NUM_WEEKDAY_IN_MONTH":4,"DATE_PAY_BEFORE_OFFSET_TYPE":"day","DATE_PAY_BEFORE_OFFSET_VALUE":15}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.invoice.recurring.update
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"your_recurring_invoice_id","fields":{"SEND_BILL":"Y","EMAIL_ID":136,"PARAMS":{"MODE":"month","TYPE":2,"INTERVAL":3,"WEEKDAY":"Monday","NUM_WEEKDAY_IN_MONTH":4,"DATE_PAY_BEFORE_OFFSET_TYPE":"day","DATE_PAY_BEFORE_OFFSET_VALUE":15}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.invoice.recurring.update
    ```

- JS


    ```js
    try
    {
    	const id = prompt("Введите ID");
    	const response = await $b24.callMethod(
    		"crm.invoice.recurring.update",
    		{
    			id: id,
    			fields:
    			{
    				"SEND_BILL": "Y",
    				"EMAIL_ID": 136,
    				"PARAMS": {
    					"MODE": "month",
    					"TYPE": 2,
    					"INTERVAL": 3,
    					"WEEKDAY": "Monday",
    					"NUM_WEEKDAY_IN_MONTH": 4,
    					"DATE_PAY_BEFORE_OFFSET_TYPE": "day",
    					"DATE_PAY_BEFORE_OFFSET_VALUE": 15,
    				}
    			},
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    		console.error(result.error());
    	else
    	{
    		console.info(result);
    	}
    }
    catch(error)
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $id = $_POST['id'];
    
        $response = $b24Service
            ->core
            ->call(
                'crm.invoice.recurring.update',
                [
                    'id' => $id,
                    'fields' => [
                        'SEND_BILL' => 'Y',
                        'EMAIL_ID' => 136,
                        'PARAMS' => [
                            'MODE' => 'month',
                            'TYPE' => 2,
                            'INTERVAL' => 3,
                            'WEEKDAY' => 'Monday',
                            'NUM_WEEKDAY_IN_MONTH' => 4,
                            'DATE_PAY_BEFORE_OFFSET_TYPE' => 'day',
                            'DATE_PAY_BEFORE_OFFSET_VALUE' => 15,
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
        echo 'Error updating recurring invoice: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var id = prompt("Введите ID");
    BX24.callMethod(
        "crm.invoice.recurring.update",
        {
            id: id,
            fields:
            {
                "SEND_BILL": "Y",
                "EMAIL_ID": 136,
                "PARAMS": {
                    "MODE": "month",
                    "TYPE": 2,
                    "INTERVAL": 3,
                    "WEEKDAY": "Monday",
                    "NUM_WEEKDAY_IN_MONTH": 4,
                    "DATE_PAY_BEFORE_OFFSET_TYPE": "day",
                    "DATE_PAY_BEFORE_OFFSET_VALUE": 15,
                }
            },
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $id = 'your_recurring_invoice_id'; // Replace 'your_recurring_invoice_id' with the actual recurring invoice ID

    $result = CRest::call(
        'crm.invoice.recurring.update',
        [
            'id' => $id,
            'fields' => [
                'SEND_BILL' => 'Y',
                'EMAIL_ID' => 136,
                'PARAMS' => [
                    'MODE' => 'month',
                    'TYPE' => 2,
                    'INTERVAL' => 3,
                    'WEEKDAY' => 'Monday',
                    'NUM_WEEKDAY_IN_MONTH' => 4,
                    'DATE_PAY_BEFORE_OFFSET_TYPE' => 'day',
                    'DATE_PAY_BEFORE_OFFSET_VALUE' => 15,
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}