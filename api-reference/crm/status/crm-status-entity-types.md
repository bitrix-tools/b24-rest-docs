# Получить типы справочников crm.status.entity.types

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

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
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.status.entity.types
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.status.entity.types
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each entity type returned in result[]
    type CrmStatusEntityType = {
      ID: string
      NAME: string
      ENTITY_TYPE_ID?: number
      SEMANTIC_INFO?: {
        START_FIELD: string
        FINAL_SUCCESS_FIELD: string
        FINAL_UNSUCCESS_FIELD: string
        FINAL_SORT: number
      } | unknown[]
      PREFIX?: string
      FIELD_ATTRIBUTE_SCOPE?: string
      IS_ENABLED?: boolean
      CATEGORY_ID?: number | string
      PARENT_ID?: string
      CATEGORY_NAME?: string
      CATEGORY_SORT?: number
      IS_DEFAULT_CATEGORY?: boolean
    }

    try {
      const response = await $b24.actions.v2.call.make<CrmStatusEntityType[]>({
        method: 'crm.status.entity.types',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Entity types:', result.length, result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getStatusEntityTypes() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.status.entity.types',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Entity types:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getStatusEntityTypes)
    </script>
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