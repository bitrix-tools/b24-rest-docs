# Сохранить результат печати чека sale.cashbox.check.apply

> Scope: [`sale, cashbox`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM (право «Разрешить изменять настройки»)

Метод сохраняет результат печати чека, напечатанного на REST-кассе. UUID чека сохраняется при его печати из ответа `PRINT_URL`, указанного при добавлении обработчика (см. [пример реализации простой кассы на REST API](../../../tutorials/sale/cashbox-add-example.md)).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **UUID***
[`string`](../../data-types.md) | UUID чека ||
|| **PRINT_END_TIME**
[`string`](../../data-types.md) | Время окончания печати чека ||
|| **REG_NUMBER_KKT**
[`string`](../../data-types.md) | Регистрационный номер ККТ ||
|| **FISCAL_DOC_ATTR**
[`string`](../../data-types.md) | Фискальный признак документа ||
|| **FISCAL_DOC_NUMBER**
[`string`](../../data-types.md) | Номер фискального документа ||
|| **FISCAL_RECEIPT_NUMBER**
[`string`](../../data-types.md) | Фискальный номер чека ||
|| **FN_NUMBER**
[`string`](../../data-types.md) | Номер фискального накопителя ||
|| **SHIFT_NUMBER**
[`string`](../../data-types.md) | Номер смены ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"UUID":"check|example.com|1","PRINT_END_TIME":"1609459200","REG_NUMBER_KKT":"1234567891011121","FISCAL_DOC_ATTR":"1234567890","FISCAL_DOC_NUMBER":"12345","FISCAL_RECEIPT_NUMBER":"123","FN_NUMBER":"1234567891011121","SHIFT_NUMBER":"1"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.cashbox.check.apply
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"UUID":"check|example.com|1","PRINT_END_TIME":"1609459200","REG_NUMBER_KKT":"1234567891011121","FISCAL_DOC_ATTR":"1234567890","FISCAL_DOC_NUMBER":"12345","FISCAL_RECEIPT_NUMBER":"123","FN_NUMBER":"1234567891011121","SHIFT_NUMBER":"1","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.cashbox.check.apply
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"sale.cashbox.check.apply",
    		{
    			'UUID':'check|example.com|1',
    			'PRINT_END_TIME':'1609459200',
    			'REG_NUMBER_KKT':'1234567891011121',
    			'FISCAL_DOC_ATTR':'1234567890',
    			'FISCAL_DOC_NUMBER':'12345',
    			'FISCAL_RECEIPT_NUMBER':'123',
    			'FN_NUMBER':'1234567891011121',
    			'SHIFT_NUMBER':'1'
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    		console.error(result.error());
    	else
    		console.dir(result);
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
                'sale.cashbox.check.apply',
                [
                    'UUID'                => 'check|example.com|1',
                    'PRINT_END_TIME'      => '1609459200',
                    'REG_NUMBER_KKT'      => '1234567891011121',
                    'FISCAL_DOC_ATTR'     => '1234567890',
                    'FISCAL_DOC_NUMBER'   => '12345',
                    'FISCAL_RECEIPT_NUMBER' => '123',
                    'FN_NUMBER'           => '1234567891011121',
                    'SHIFT_NUMBER'        => '1',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
            // Нужная вам логика обработки данных
            processData($result->data());
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error applying cashbox check: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.cashbox.check.apply",
        {
            'UUID':'check|example.com|1',
            'PRINT_END_TIME':'1609459200',
            'REG_NUMBER_KKT':'1234567891011121',
            'FISCAL_DOC_ATTR':'1234567890',
            'FISCAL_DOC_NUMBER':'12345',
            'FISCAL_RECEIPT_NUMBER':'123',
            'FN_NUMBER':'1234567891011121',
            'SHIFT_NUMBER':'1'
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
        'sale.cashbox.check.apply',
        [
            'UUID' => 'check|example.com|1',
            'PRINT_END_TIME' => '1609459200',
            'REG_NUMBER_KKT' => '1234567891011121',
            'FISCAL_DOC_ATTR' => '1234567890',
            'FISCAL_DOC_NUMBER' => '12345',
            'FISCAL_RECEIPT_NUMBER' => '123',
            'FN_NUMBER' => '1234567891011121',
            'SHIFT_NUMBER' => '1'
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
[`boolean`](../../data-types.md) | Результат сохранения печати чека ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{ 
    "error": "ERROR_CHECK_NOT_FOUND", 
    "error_description": "Check not found" 
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `ACCESS_DENIED` | Недостаточно прав для сохранения результата печати чека | 403 ||
|| `ERROR_CHECK_FAILURE` | Не указано значение поля `UUID` | 400 ||
|| `ERROR_CHECK_NOT_FOUND` | Не найден чек с указанным `UUID` | 400 ||
|| `ERROR_CHECK_APPLY` | Прочие ошибки. Более подробную информацию об ошибке можно найти в `error_description` | 400 ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-cashbox-handler-add.md)
- [{#T}](./sale-cashbox-handler-update.md)
- [{#T}](./sale-cashbox-handler-list.md)
- [{#T}](./sale-cashbox-handler-delete.md)
- [{#T}](./sale-cashbox-add.md)
- [{#T}](./sale-cashbox-update.md)
- [{#T}](./sale-cashbox-list.md)
- [{#T}](./sale-cashbox-delete.md)
- [{#T}](../../../tutorials/sale/cashbox-add-example.md)