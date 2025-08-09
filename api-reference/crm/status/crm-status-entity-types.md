# Получить типы справочников crm.status.entity.types

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.status.entity.types` возвращает список всех поддерживаемых типов справочников, объектов `ENTITY_ID`.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.status.entity.types
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.status.entity.types
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.status.entity.types',
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
                'crm.status.entity.types',
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
        echo 'Error calling crm.status.entity.types: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.status.entity.types",
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
        'crm.status.entity.types',
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
      "ID": "STATUS",
      "NAME": "Стадии лида",
      "SEMANTIC_INFO": {
        "START_FIELD": "NEW",
        "FINAL_SUCCESS_FIELD": "CONVERTED",
        "FINAL_UNSUCCESS_FIELD": "JUNK",
        "FINAL_SORT": 0
      },
      "ENTITY_TYPE_ID": 1
    },
    {
      "ID": "SOURCE",
      "NAME": "Источники"
    },
    {
      "ID": "CONTACT_TYPE",
      "NAME": "Тип контакта"
    },
    {
      "ID": "COMPANY_TYPE",
      "NAME": "Тип компании"
    },
    {
      "ID": "EMPLOYEES",
      "NAME": "Кол-во сотрудников"
    },
    {
      "ID": "INDUSTRY",
      "NAME": "Сфера деятельности"
    },
    {
      "ID": "DEAL_TYPE",
      "NAME": "Тип сделки"
    },
    {
      "ID": "SMART_INVOICE_STAGE_5",
      "NAME": "Стадии счёта",
      "SEMANTIC_INFO": [],
      "PREFIX": "DT31_5",
      "FIELD_ATTRIBUTE_SCOPE": "category_5",
      "ENTITY_TYPE_ID": 31,
      "IS_ENABLED": true,
      "CATEGORY_ID": 5
    },
    {
      "ID": "DEAL_STAGE_1",
      "NAME": "Стадии сделки Newest",
      "PARENT_ID": "DEAL_STAGE",
      "SEMANTIC_INFO": {
        "START_FIELD": "C1:NEW",
        "FINAL_SUCCESS_FIELD": "C1:WON",
        "FINAL_UNSUCCESS_FIELD": "C1:LOSE",
        "FINAL_SORT": 0
      },
      "PREFIX": "C1",
      "FIELD_ATTRIBUTE_SCOPE": "category_1",
      "ENTITY_TYPE_ID": 2,
      "CATEGORY_ID": "1"
    },
    {
      "ID": "DEAL_STAGE",
      "NAME": "Стадии сделки Общая",
      "SEMANTIC_INFO": {
        "START_FIELD": "NEW",
        "FINAL_SUCCESS_FIELD": "WON",
        "FINAL_UNSUCCESS_FIELD": "LOSE",
        "FINAL_SORT": 0
      },
      "FIELD_ATTRIBUTE_SCOPE": "",
      "ENTITY_TYPE_ID": 2,
      "CATEGORY_ID": 0
    },
    {
      "ID": "QUOTE_STATUS",
      "NAME": "Стадии предложения",
      "SEMANTIC_INFO": {
        "START_FIELD": "DRAFT",
        "FINAL_SUCCESS_FIELD": "APPROVED",
        "FINAL_UNSUCCESS_FIELD": "DECLAINED",
        "FINAL_SORT": 0
      },
      "ENTITY_TYPE_ID": 7
    },
    {
      "ID": "HONORIFIC",
      "NAME": "Обращения"
    },
    {
      "ID": "CALL_LIST",
      "NAME": "Статусы обзвона"
    },
    {
      "ID": "SMART_DOCUMENT_STAGE_13",
      "NAME": "Стадии документа",
      "SEMANTIC_INFO": [],
      "PREFIX": "DT36_13",
      "FIELD_ATTRIBUTE_SCOPE": "category_13",
      "ENTITY_TYPE_ID": 36,
      "IS_ENABLED": true,
      "CATEGORY_ID": 13
    },
    {
      "ID": "DYNAMIC_177_STAGE_7",
      "NAME": "Закупка оборудования (Общее)",
      "SEMANTIC_INFO": [],
      "PREFIX": "DT177_7",
      "FIELD_ATTRIBUTE_SCOPE": "category_7",
      "ENTITY_TYPE_ID": 177,
      "IS_ENABLED": true,
      "CATEGORY_ID": 7,
      "CATEGORY_NAME": "Общее",
      "CATEGORY_SORT": 500,
      "IS_DEFAULT_CATEGORY": true
    },
    {
      "ID": "DYNAMIC_177_STAGE_9",
      "NAME": "Закупка оборудования (Вторая воронка)",
      "SEMANTIC_INFO": [],
      "PREFIX": "DT177_9",
      "FIELD_ATTRIBUTE_SCOPE": "category_9",
      "ENTITY_TYPE_ID": 177,
      "IS_ENABLED": true,
      "CATEGORY_ID": 9,
      "CATEGORY_NAME": "Вторая воронка",
      "CATEGORY_SORT": 500,
      "IS_DEFAULT_CATEGORY": false
    },
  ],
  "time": {
    "start": 1752142616.128453,
    "finish": 1752142616.215683,
    "duration": 0.08722996711730957,
    "processing": 0.018637895584106445,
    "date_start": "2025-07-10T13:16:56+03:00",
    "date_finish": "2025-07-10T13:16:56+03:00",
    "operating_reset_at": 1752143216,
    "operating": 0
  }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив объектов с описанием типов справочников [(подробное описание полей)](#result)||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля объекта result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор объекта, используйте значение в поле `ENTITY_ID` методов [crm.status.*](./index.md) ||
|| **NAME**
[`string`](../../data-types.md) | Название ||
|| **ENTITY_TYPE_ID**
[`integer`](../../data-types.md) | [Тип объекта CRM](../data-types.md#object_type#), к которому относится статус ||
|| **SEMANTIC_INFO**
[`object`](../../data-types.md) | Информация о семантике статусов-стадий ||
|| **PREFIX**
[`string`](../../data-types.md) | Префикс для кода стадии воронки ||
|| **FIELD_ATTRIBUTE_SCOPE**
[`string`](../../data-types.md) | Область применения поля, воронка ||
|| **IS_ENABLED**
[`boolean`](../../data-types.md) | Активность ||
|| **CATEGORY_ID**
[`integer`](../../data-types.md) | Идентификатор воронки ||
|| **PARENT_ID**
[`string`](../../data-types.md) | ID родительского элемента ||
|| **CATEGORY_NAME**
[`string`](../../data-types.md) | Название воронки ||
|| **CATEGORY_SORT**
[`integer`](../../data-types.md) | Сортировка воронки ||
|| **IS_DEFAULT_CATEGORY**
[`boolean`](../../data-types.md) | Воронка по умолчанию ||
|#

## Обработка ошибок

Метод не возвращает ошибок.

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-status-fields.md)
- [{#T}](./crm-status-list.md)
- [{#T}](./crm-status-add.md)
- [{#T}](./crm-status-update.md)
- [{#T}](./crm-status-delete.md) 