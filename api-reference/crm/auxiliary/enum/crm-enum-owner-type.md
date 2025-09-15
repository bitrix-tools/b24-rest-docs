# Получить типы объектов CRM crm.enum.ownertype

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.enum.ownertype` возвращает идентификаторы типов объектов CRM и смарт-процессов. `ID` типа объекта используйте в значении параметра `entityTypeId` методов [crm.item.*](../../universal/index.md), [crm.activity.*](../../timeline/activities/index.md).

{% note info " " %}

Идентификаторы смарт-процессов в каждом Битрикс24 уникальны и могут отличаться от указанных в примере.

{% endnote %}

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
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.enum.ownertype
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"auth":"**put_access_token_here**"}' \
         https://**put_your_bitrix24_address**/rest/crm.enum.ownertype
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.enum.ownertype',
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
                'crm.enum.ownertype',
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
        echo 'Error calling crm.enum.ownertype: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.enum.ownertype",
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
        'crm.enum.ownertype',
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
"result": [
    {
     "ID": 1,
     "NAME": "Лид",
     "SYMBOL_CODE": "LEAD",
     "SYMBOL_CODE_SHORT": "L"
    },
    {
     "ID": 2,
     "NAME": "Сделка",
     "SYMBOL_CODE": "DEAL",
     "SYMBOL_CODE_SHORT": "D"
    },
    {
     "ID": 3,
     "NAME": "Контакт",
     "SYMBOL_CODE": "CONTACT",
     "SYMBOL_CODE_SHORT": "C"
    },
    {
     "ID": 4,
     "NAME": "Компания",
     "SYMBOL_CODE": "COMPANY",
     "SYMBOL_CODE_SHORT": "CO"
    },
    {
     "ID": 5,
     "NAME": "Счёт (старая версия)",
     "SYMBOL_CODE": "INVOICE",
     "SYMBOL_CODE_SHORT": "I"
    },
    {
     "ID": 31,
     "NAME": "Счёт",
     "SYMBOL_CODE": "SMART_INVOICE",
     "SYMBOL_CODE_SHORT": "SI"
    },
    {
     "ID": 7,
     "NAME": "Предложение",
     "SYMBOL_CODE": "QUOTE",
     "SYMBOL_CODE_SHORT": "Q"
    },
    {
     "ID": 8,
     "NAME": "Реквизиты",
     "SYMBOL_CODE": "REQUISITE",
     "SYMBOL_CODE_SHORT": "RQ"
    },
    {
     "ID": 36,
     "NAME": "Документ",
     "SYMBOL_CODE": "SMART_DOCUMENT",
     "SYMBOL_CODE_SHORT": "DO"
    },
    {
     "ID": 39,
     "NAME": "Документ компании",
     "SYMBOL_CODE": "SMART_B2E_DOC",
     "SYMBOL_CODE_SHORT": "SBD"
    },
    {
     "ID": 177,
     "NAME": "Закупка оборудования",
     "SYMBOL_CODE": "DYNAMIC_177",
     "SYMBOL_CODE_SHORT": "Tb1"
    },
    {
     "ID": 156,
     "NAME": "Закупка",
     "SYMBOL_CODE": "DYNAMIC_156",
     "SYMBOL_CODE_SHORT": "T9c"
    },
],
"time": {
    "start": 1750153184.228934,
    "finish": 1750153184.262921,
    "duration": 0.03398704528808594,
    "processing": 0.0008471012115478516,
    "date_start": "2025-06-17T12:39:44+03:00",
    "date_finish": "2025-06-17T12:39:44+03:00",
    "operating_reset_at": 1750153784,
    "operating": 0
}
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../data-types.md) | Массив с типами владельцев [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля массива result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор типа владельца ||
|| **NAME**
[`string`](../../../data-types.md) | Название типа владельца ||
|| **SYMBOL_CODE**
[`string`](../../../data-types.md) | Символьный код ||
|| **SYMBOL_CODE_SHORT**
[`string`](../../../data-types.md) | Краткий символьный код ||
|#

## Обработка ошибок

Метод не возвращает ошибки.

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](../../../../tutorials/tasks/how-to-connect-task-to-spa.md)