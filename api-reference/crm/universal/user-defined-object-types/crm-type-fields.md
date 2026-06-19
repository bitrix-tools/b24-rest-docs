# Получить поля пользовательского типа crm.type.fields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с административным доступом к разделу CRM

Метод получает информацию о собственных полях настроек смарт-процесса.

Без параметров.

## Примеры

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Получить информацию о полях смарт-процесса

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.type.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/crm.type.fields?auth=**put_access_token_here**
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each field descriptor returned in result.fields
    type FieldInfo = {
      type: string
      isRequired: boolean
      isReadOnly: boolean
      isImmutable: boolean
      isMultiple: boolean
      isDynamic: boolean
      title: string
      upperName: string
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CrmTypeFieldsResult = {
      fields: Record<string, FieldInfo>
    }

    try {
      const response = await $b24.actions.v2.call.make<CrmTypeFieldsResult>({
        method: 'crm.type.fields',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('CRM type fields:', Object.keys(result.fields))
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
      async function getCrmTypeFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.type.fields',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('CRM type fields:', Object.keys(result.fields))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getCrmTypeFields)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.type.fields',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            return;
        }
    
        echo 'Success: ' . print_r($result->data(), true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching CRM type fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.type.fields',
        {},
        (result) => {
            if (result.error()) 
            {
                console.error(result.error());

                return;
            } 

            console.info(result.data());
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.type.fields',
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
        "fields": {
            "id": {
                "type": "integer",
                "isRequired": false,
                "isReadOnly": true,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "ID",
                "upperName": "ID"
            },
            "title": {
                "type": "string",
                "isRequired": true,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Название",
                "upperName": "TITLE"
            },
            "code": {
                "type": "string",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Символьный код",
                "upperName": "CODE"
            },
            "createdBy": {
                "type": "user",
                "isRequired": false,
                "isReadOnly": true,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Кем создан",
                "upperName": "CREATED_BY"
            },
            "entityTypeId": {
                "type": "integer",
                "isRequired": true,
                "isReadOnly": false,
                "isImmutable": true,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Идентификатор типа",
                "upperName": "ENTITY_TYPE_ID"
            },
            "customSectionId": {
                "type": "integer",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": true,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Цифровое рабочее место",
                "upperName": "CUSTOM_SECTION_ID"
            },
            "isCategoriesEnabled": {
                "type": "boolean",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Использовать в смарт-процессе свои воронки и туннели продаж",
                "upperName": "IS_CATEGORIES_ENABLED"
            },
            "isStagesEnabled": {
                "type": "boolean",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Использовать в смарт-процессе свои стадии и канбан",
                "upperName": "IS_STAGES_ENABLED"
            },
            "isBeginCloseDatesEnabled": {
                "type": "boolean",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Поля \"Дата начала\" и \"Дата завершения\"",
                "upperName": "IS_BEGIN_CLOSE_DATES_ENABLED"
            },
            "isClientEnabled": {
                "type": "boolean",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Поле \"Клиент\"",
                "upperName": "IS_CLIENT_ENABLED"
            },
            "isUseInUserfieldEnabled": {
                "type": "boolean",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Использовать в пользовательском поле",
                "upperName": "IS_USE_IN_USERFIELD_ENABLED"
            },
            "isLinkWithProductsEnabled": {
                "type": "boolean",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Привязка товаров каталога",
                "upperName": "IS_LINK_WITH_PRODUCTS_ENABLED"
            },
            "isMycompanyEnabled": {
                "type": "boolean",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Поле \"Реквизиты вашей компании\"",
                "upperName": "IS_MYCOMPANY_ENABLED"
            },
            "isDocumentsEnabled": {
                "type": "boolean",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Печать документов",
                "upperName": "IS_DOCUMENTS_ENABLED"
            },
            "isSourceEnabled": {
                "type": "boolean",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Поля \"Источник\" и \"Дополнительно об источнике\"",
                "upperName": "IS_SOURCE_ENABLED"
            },
            "isObserversEnabled": {
                "type": "boolean",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Поле \"Наблюдатели\"",
                "upperName": "IS_OBSERVERS_ENABLED"
            },
            "isRecyclebinEnabled": {
                "type": "boolean",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Использовать корзину",
                "upperName": "IS_RECYCLEBIN_ENABLED"
            },
            "isAutomationEnabled": {
                "type": "boolean",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Использовать в смарт-процессе роботы и триггеры",
                "upperName": "IS_AUTOMATION_ENABLED"
            },
            "isBizProcEnabled": {
                "type": "boolean",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Использовать в смарт-процессе дизайнер бизнес-процессов",
                "upperName": "IS_BIZ_PROC_ENABLED"
            },
            "isSetOpenPermissions": {
                "type": "boolean",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Делать новые воронки доступными для всех",
                "upperName": "IS_SET_OPEN_PERMISSIONS"
            },
            "createdTime": {
                "type": "datetime",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Дата создания",
                "upperName": "CREATED_TIME"
            },
            "updatedTime": {
                "type": "datetime",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Дата изменения",
                "upperName": "UPDATED_TIME"
            },
            "updatedBy": {
                "type": "user",
                "isRequired": false,
                "isReadOnly": true,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Кем изменён",
                "upperName": "UPDATED_BY"
            }
        }
    },
    "time": {
        "start": 1720436891.554676,
        "finish": 1720436894.393655,
        "duration": 2.8389790058135986,
        "processing": 0.20139384269714355,
        "date_start": "2024-07-08T13:08:11+02:00",
        "date_finish": "2024-07-08T13:08:14+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`][1] | Корневой элемент ответа. Содержит объект с единственным ключом `fields` ||
|| **fields**
[`object`][1] | Объект в формате: `{ field_1: value_1, field_2: value_2, ... , field_n: value_n }`, где `field_n` — поля настроек смарт-процесса, а `value_n` — объект типа [`crm_rest_field_description`](../../data-types.md#crm_rest_field_description) ||
|| **time**
[`time`][1] | Объект, содержащий в себе информацию о времени выполнения запроса  ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Доступ запрещен"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `allowed_only_intranet_user` | Действие разрешено только интранет-пользователям  | Возникает, если пользователь не является интранет-пользователем ||
|| `400` | `ACCESS_DENIED` | Доступ запрещен | Возникает, если у пользователя нет административных прав CRM ||
|#

{% include [системные ошибки](./../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-type-add.md)
- [{#T}](./crm-type-update.md)
- [{#T}](./crm-type-get.md)
- [{#T}](./crm-type-get-by-entity-type-id.md)
- [{#T}](./crm-type-list.md)
- [{#T}](./crm-type-delete.md)

[1]: ../../../data-types.md