# Получить поля ставки НДС crm.vat.fields

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning "Развитие метода остановлено" %}

Метод `crm.vat.fields` продолжает работать, но у него есть более актуальный аналог [catalog.vat.getFields](../../../catalog/vat/catalog-vat-get-fields.md).

{% endnote %}

Метод `crm.vat.fields` возвращает описание полей ставки НДС.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.vat.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.vat.fields
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.vat.fields",
    		{}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.dir(result);
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
        $response = $b24Service
            ->core
            ->call(
                'crm.vat.fields',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching VAT fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.vat.fields",
        {},
        function(result) {
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
        'crm.vat.fields',
        []
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
        "ID": {
            "type": "integer",
            "size": "11",
            "isRequired": false,
            "isReadOnly": true,
            "title": "ID"
        },
        "TIMESTAMP_X": {
            "type": "datetime",
            "isRequired": false,
            "isReadOnly": true,
            "title": "Дата изменения"
        },
        "ACTIVE": {
            "type": "string",
            "size": "1",
            "isRequired": false,
            "isReadOnly": false,
            "title": "Активность"
        },
        "C_SORT": {
            "type": "integer",
            "size": "18",
            "isRequired": false,
            "isReadOnly": false,
            "title": "Сортировка"
        },
        "NAME": {
            "type": "string",
            "size": "50",
            "isRequired": false,
            "isReadOnly": false,
            "title": "Название"
        },
        "RATE": {
            "type": "double",
            "size": "18,2",
            "isRequired": false,
            "isReadOnly": false,
            "title": "Ставка"
        }
    },
    "time": {
        "start": 1751984389.802849,
        "finish": 1751984389.832249,
        "duration": 0.029399871826171875,
        "processing": 0.0001289844512939453,
        "date_start": "2025-07-08T17:19:49+03:00",
        "date_finish": "2025-07-08T17:19:49+03:00",
        "operating_reset_at": 1751984989,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с описанием полей [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля объекта result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID** 
[`integer`](../../../data-types.md) | Идентификатор ставки НДС ||
|| **TIMESTAMP_X** 
[`datetime`](../../../data-types.md) | Дата изменения ||
|| **ACTIVE**
[`string`](../../../data-types.md) | Активность ставки||
|| **C_SORT**
[`integer`](../../../data-types.md) | Сортировка ||
|| **NAME**
[`string`](../../../data-types.md) | Название ставки ||
|| **RATE**
[`double`](../../../data-types.md) | Значение ставки НДС, % ||
|#

## Обработка ошибок

Метод не возвращает ошибок.

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-vat-list.md)
- [{#T}](./crm-vat-get.md)
- [{#T}](./crm-vat-add.md)
- [{#T}](./crm-vat-update.md)
- [{#T}](./crm-vat-delete.md) 
