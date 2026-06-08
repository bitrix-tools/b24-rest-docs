# Получить список полей шаблона регулярной сделки crm.deal.recurring.fields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «чтения» сделок

Метод `crm.deal.recurring.fields` возвращает описание полей шаблона регулярной сделки.

## Параметры метода

Без параметров

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.deal.recurring.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.recurring.fields
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CrmDealRecurringFields = Record<string, CrmDealRecurringFieldDescription>

    type CrmDealRecurringFieldDescription = {
      type: string
      isRequired: boolean
      isReadOnly: boolean
      isImmutable: boolean
      isMultiple: boolean
      isDynamic: boolean
      title: string
      definition?: Record<string, unknown>
    }

    try {
      const response = await $b24.actions.v2.call.make<CrmDealRecurringFields>({
        method: 'crm.deal.recurring.fields',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Recurring fields:', Object.keys(result))
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
      async function getRecurringDealFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.deal.recurring.fields',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Recurring fields:', Object.keys(result))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getRecurringDealFields)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.deal.recurring.fields',
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
        echo 'Error fetching recurring deal fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'crm.deal.recurring.fields',
        {},
        result => {
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
        'crm.deal.recurring.fields',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Python

    Пример

    ```python
    from b24pysdk.client import BaseClient
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    client: BaseClient

    try:
        bitrix_response = client.crm.deal.recurring.fields().response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```
{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "id"
        },
        "DEAL_ID": {
            "type": "integer",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": true,
            "isMultiple": false,
            "isDynamic": false,
            "title": "id регулярной сделки"
        },
        "BASED_ID": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Создано на основании"
        },
        "ACTIVE": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Активен"
        },
        "NEXT_EXECUTION": {
            "type": "datetime",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дата следующего выполнения"
        },
        "LAST_EXECUTION": {
            "type": "datetime",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дата последнего выполнения"
        },
        "COUNTER_REPEAT": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Количество выполнений"
        },
        "START_DATE": {
            "type": "date",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дата начала расчета"
        },
        "CATEGORY_ID": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Категория новой сделки"
        },
        "IS_LIMIT": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Тип ограничений выполнения"
        },
        "LIMIT_REPEAT": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Ограничение по количеству выполнения"
        },
        "LIMIT_DATE": {
            "type": "date",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Ограничение по дате"
        },
        "PARAMS": {
            "type": "recurring_params",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "definition": {
                "MODE": {
                    "type": "string",
                    "isRequired": false,
                    "isReadOnly": false,
                    "isImmutable": false,
                    "isMultiple": false,
                    "isDynamic": false,
                    "title": "Режим повторения"
                },
                "SINGLE_BEFORE_START_DATE_VALUE": {
                    "type": "integer",
                    "isRequired": false,
                    "isReadOnly": false,
                    "isImmutable": false,
                    "isMultiple": false,
                    "isDynamic": false,
                    "title": "Смещение до даты расчета"
                },
                "SINGLE_BEFORE_START_DATE_TYPE": {
                    "type": "string",
                    "isRequired": false,
                    "isReadOnly": false,
                    "isImmutable": false,
                    "isMultiple": false,
                    "isDynamic": false,
                    "title": "Тип смещения до даты расчета"
                },
                "MULTIPLE_TYPE": {
                    "type": "string",
                    "isRequired": false,
                    "isReadOnly": false,
                    "isImmutable": false,
                    "isMultiple": false,
                    "isDynamic": false,
                    "title": "Тип повторения"
                },
                "MULTIPLE_INTERVAL": {
                    "type": "integer",
                    "isRequired": false,
                    "isReadOnly": false,
                    "isImmutable": false,
                    "isMultiple": false,
                    "isDynamic": false,
                    "title": "Интервал повторения"
                },
                "OFFSET_BEGINDATE_TYPE": {
                    "type": "string",
                    "isRequired": false,
                    "isReadOnly": false,
                    "isImmutable": false,
                    "isMultiple": false,
                    "isDynamic": false,
                    "title": "Тип смещения для даты начала в новой сделке"
                },
                "OFFSET_BEGINDATE_VALUE": {
                    "type": "integer",
                    "isRequired": false,
                    "isReadOnly": false,
                    "isImmutable": false,
                    "isMultiple": false,
                    "isDynamic": false,
                    "title": "Смещение для даты начала в новой сделке"
                },
                "OFFSET_CLOSEDATE_TYPE": {
                    "type": "string",
                    "isRequired": false,
                    "isReadOnly": false,
                    "isImmutable": false,
                    "isMultiple": false,
                    "isDynamic": false,
                    "title": "Тип смещения для даты завершения в новой сделке"
                },
                "OFFSET_CLOSEDATE_VALUE": {
                    "type": "integer",
                    "isRequired": false,
                    "isReadOnly": false,
                    "isImmutable": false,
                    "isMultiple": false,
                    "isDynamic": false,
                    "title": "Смещение для даты завершения в новой сделке"
                }
            },
            "title": "Параметры для расчета даты следующего выполнения"
        }
    },
    "time": {
        "start": 1772690452,
        "finish": 1772690452.454308,
        "duration": 0.45430803298950195,
        "processing": 0,
        "date_start": "2026-03-05T09:00:52+03:00",
        "date_finish": "2026-03-05T09:00:52+03:00",
        "operating_reset_at": 1772691052,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа. Содержит описание [полей шаблона](#all-fields) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Обзор полей шаблона регулярной сделки {#all-fields}

#|
|| **Поле** `тип` | **Описание** | **Примечание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор записи в таблице настроек регулярной сделки | Только для чтения ||
|| **DEAL_ID**
[`integer`](../../../data-types.md) | id регулярной сделки | Неизменяемое ||
|| **BASED_ID**
[`integer`](../../../data-types.md) | id сделки, на основании которой был создан шаблон | Только для чтения ||
|| **ACTIVE**
[`char`](../../../data-types.md) | Флаг активности | Значения: `Y` / `N` ||
|| **NEXT_EXECUTION**
[`datetime`](../../../data-types.md) | Дата и время следующего создания сделки из шаблона | Только для чтения ||
|| **LAST_EXECUTION**
[`datetime`](../../../data-types.md) | Дата и время последнего создания сделки из шаблона | Только для чтения ||
|| **COUNTER_REPEAT**
[`integer`](../../../data-types.md) | Количество созданных из шаблона сделок | Только для чтения ||
|| **START_DATE**
[`date`](../../../data-types.md) | Дата начала расчета следующего запуска | Если не указана, расчет идет от текущей даты ||
|| **CATEGORY_ID**
[`char`](../../../data-types.md) | id воронки для создаваемых сделок | ||
|| **IS_LIMIT**
[`char`](../../../data-types.md) | Тип ограничения на создание сделок | `N` — без ограничений, `D` — по дате, `T` — по количеству ||
|| **LIMIT_REPEAT**
[`integer`](../../../data-types.md) | Максимальное число создаваемых сделок | Используется при `IS_LIMIT = T` ||
|| **LIMIT_DATE**
[`date`](../../../data-types.md) | Дата окончания генерации сделок | Используется при `IS_LIMIT = D` ||
|| **PARAMS**
[`recurring_params`](../../../data-types.md) | Параметры для расчета даты следующего выполнения | Структура полей — [ниже](#params-fields) ||
|#

#### Поля объекта PARAMS {#params-fields}

#|
|| **Поле** `тип` | **Описание** | **Примечание** ||
|| **MODE**
[`string`](../../../data-types.md) | Режим повторения | `single` — одиночный, `multiple` — множественный ||
|| **MULTIPLE_TYPE**
[`string`](../../../data-types.md) | Тип периода для `MODE = multiple` | `day`, `week`, `month`, `year` ||
|| **MULTIPLE_INTERVAL**
[`integer`](../../../data-types.md) | Интервал повторения для `MODE = multiple` | ||
|| **SINGLE_BEFORE_START_DATE_TYPE**
[`string`](../../../data-types.md) | Тип смещения для `MODE = single` | `day`, `week`, `month`, `year` ||
|| **SINGLE_BEFORE_START_DATE_VALUE**
[`integer`](../../../data-types.md) | Значение смещения для `MODE = single` | ||
|| **OFFSET_BEGINDATE_TYPE**
[`string`](../../../data-types.md) | Тип смещения даты начала создаваемой сделки | `day`, `week`, `month`, `year` ||
|| **OFFSET_BEGINDATE_VALUE**
[`integer`](../../../data-types.md) | Значение смещения даты начала создаваемой сделки | ||
|| **OFFSET_CLOSEDATE_TYPE**
[`string`](../../../data-types.md) | Тип смещения даты завершения создаваемой сделки | `day`, `week`, `month`, `year` ||
|| **OFFSET_CLOSEDATE_VALUE**
[`integer`](../../../data-types.md) | Значение смещения даты завершения создаваемой сделки | ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `Access denied` | Недостаточно прав для доступа к CRM ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-deal-recurring-add.md)
- [{#T}](./crm-deal-recurring-get.md)
- [{#T}](./crm-deal-recurring-list.md)
- [{#T}](./crm-deal-recurring-update.md)
- [{#T}](./crm-deal-recurring-delete.md)
- [{#T}](./crm-deal-recurring-expose.md)
