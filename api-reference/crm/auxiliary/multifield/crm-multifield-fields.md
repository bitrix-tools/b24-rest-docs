# Получить описание множественных полей crm.multifield.fields

> Scope: [`crm`](../../../scopes/permissions.md)
> 
> Кто может выполнять метод: любой пользователь

Метод `crm.multifield.fields` возвращает описание множественных полей, используемых для хранения телефонов, email-адресов и другой контактной информации в лидах, контактах и компаниях.

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
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.multifield.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"auth":"**put_access_token_here**"}' \
         https://**put_your_bitrix24_address**/rest/crm.multifield.fields
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.multifield.fields',
    		{}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
    }
    catch( error )
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
                'crm.multifield.fields',
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
        echo 'Error fetching multifield fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.multifield.fields",
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
        'crm.multifield.fields',
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
            "type": "int",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ID"
        },
        "TYPE_ID": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Тип поля"
        },
        "VALUE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Значение"
        },
        "VALUE_TYPE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Тип значения"
        }
    },
    "time": {
        "start": 1750684622.069806,
        "finish": 1750684622.120529,
        "duration": 0.05072283744812012,
        "processing": 0.00037217140197753906,
        "date_start": "2025-06-23T16:17:02+03:00",
        "date_finish": "2025-06-23T16:17:02+03:00",
        "operating_reset_at": 1750685222,
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
[`integer`](../../../data-types.md) | Идентификатор ||
|| **TYPE_ID**
[`string`](../../../data-types.md) | Тип поля ||
|| **VALUE**
[`string`](../../../data-types.md) | Значение ||
|| **VALUE_TYPE**
[`string`](../../../data-types.md) | Тип значения ||
|#

## Обработка ошибок

Метод не возвращает ошибки.

{% include [системные ошибки](./../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](../index.md)
