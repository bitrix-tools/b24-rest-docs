# Получить поля элементов перечислений crm.enum.fields

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.enum.fields` возвращает информацию о полях элементов перечислений.

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
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.enum.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"auth":"**put_access_token_here**"}' \
         https://**put_your_bitrix24_address**/rest/crm.enum.fields
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.enum.fields",
    		{}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.dir(result);
    	}
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
                'crm.enum.fields',
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
        echo 'Error calling crm.enum.fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.enum.fields",
        {},
        function(result) {
            if (result.error())
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
        'crm.enum.fields',
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
    "NAME": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": true,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Название"
    },
    "SYMBOL_CODE": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": true,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Символьный код"
    },
    "SYMBOL_CODE_SHORT": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": true,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Краткий символьный код"
    }
},
"time": {
    "start": 1750152521.485259,
    "finish": 1750152521.526358,
    "duration": 0.041098833084106445,
    "processing": 0.00034499168395996094,
    "date_start": "2025-06-17T12:28:41+03:00",
    "date_finish": "2025-06-17T12:28:41+03:00",
    "operating_reset_at": 1750153121,
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
[`object`](../../../data-types.md) | Идентификатор ||
|| **NAME**
[`object`](../../../data-types.md) | Название ||
|| **SYMBOL_CODE**
[`object`](../../../data-types.md) | Символьный код ||
|| **SYMBOL_CODE_SHORT**
[`object`](../../../data-types.md) | Краткий символьный код ||
|#

#### Описание характеристик полей

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../../data-types.md) | Тип данных поля ||
|| **isRequired**
[`boolean`](../../../data-types.md) | Обязательное ||
|| **isReadOnly**
[`boolean`](../../../data-types.md) | Доступно только для чтения ||
|| **isImmutable**
[`boolean`](../../../data-types.md) | Неизменяемое ||
|| **isMultiple**
[`boolean`](../../../data-types.md) | Множественное ||
|| **isDynamic**
[`boolean`](../../../data-types.md) | Динамичное ||
|| **title**
[`string`](../../../data-types.md) | Название поля ||
|#

## Обработка ошибок

Метод не возвращает ошибки.

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
