# Получить поля коммерческого предложения crm.quote.fields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [crm.item.fields](../universal/crm-item-fields.md).

{% endnote %}

Метод `crm.quote.fields` возвращает описание полей коммерческого предложения, в том числе пользовательских.

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
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.quote.fields  
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"auth":"**put_access_token_here**"}' \
         https://**put_your_bitrix24_address**/rest/crm.quote.fields  
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FieldDescription = {
      type: string
      isRequired: boolean
      isReadOnly: boolean
      isImmutable: boolean
      isMultiple: boolean
      isDynamic: boolean
      title: string
      statusType?: string
      isDeprecated?: boolean
      listLabel?: string
      formLabel?: string
      filterLabel?: string
      settings?: Record<string, unknown>
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type QuoteFieldsResult = Record<string, FieldDescription>

    try {
      const response = await $b24.actions.v2.call.make<QuoteFieldsResult>({
        method: 'crm.quote.fields',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Quote fields:', Object.keys(result))
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
      async function getQuoteFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.quote.fields',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Quote fields:', Object.keys(result))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getQuoteFields)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.quote.fields',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching quote fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.quote.fields",
        {},
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.dir(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.quote.fields',
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
      "isRequired": false,
      "isReadOnly": true,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "ID"
    },
    "QUOTE_NUMBER": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": true,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "№ предложения"
    },
    "TITLE": {
      "type": "string",
      "isRequired": true,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Тема"
    },
    "STATUS_ID": {
      "type": "crm_status",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "statusType": "QUOTE_STATUS",
      "title": "Стадия предложения"
    },
    "CURRENCY_ID": {
      "type": "crm_currency",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Валюта"
    },
    "OPPORTUNITY": {
      "type": "double",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Сумма"
    },
    "TAX_VALUE": {
      "type": "double",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Ставка налога"
    },
    "COMPANY_ID": {
      "type": "crm_company",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Компания"
    },
    "MYCOMPANY_ID": {
      "type": "crm_company",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Реквизиты вашей компании"
    },
    "CONTACT_ID": {
      "type": "crm_contact",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "isDeprecated": true,
      "title": "Контакт"
    },
    "CONTACT_IDS": {
      "type": "crm_contact",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": true,
      "isDynamic": false,
      "title": "CONTACT_IDS"
    },
    "BEGINDATE": {
      "type": "date",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Дата выставления"
    },
    "CLOSEDATE": {
      "type": "date",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Срок"
    },
    "ACTUAL_DATE": {
      "type": "date",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "ACTUAL_DATE"
    },
    "OPENED": {
      "type": "char",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Доступно для всех"
    },
    "CLOSED": {
      "type": "char",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Закрыто"
    },
    "COMMENTS": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Комментарий"
    },
    "CONTENT": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Содержание"
    },
    "TERMS": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Условия"
    },
    "CLIENT_TITLE": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Клиент"
    },
    "CLIENT_ADDR": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Адрес"
    },
    "CLIENT_CONTACT": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Контактное лицо"
    },
    "CLIENT_EMAIL": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "E-mail"
    },
    "CLIENT_PHONE": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Телефон"
    },
    "CLIENT_TP_ID": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "ИНН"
    },
    "CLIENT_TPA_ID": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "КПП"
    },
    "ASSIGNED_BY_ID": {
      "type": "user",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Ответственный"
    },
    "CREATED_BY_ID": {
      "type": "user",
      "isRequired": false,
      "isReadOnly": true,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Кем создан"
    },
    "MODIFY_BY_ID": {
      "type": "user",
      "isRequired": false,
      "isReadOnly": true,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Кем изменён"
    },
    "DATE_CREATE": {
      "type": "datetime",
      "isRequired": false,
      "isReadOnly": true,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Дата создания"
    },
    "DATE_MODIFY": {
      "type": "datetime",
      "isRequired": false,
      "isReadOnly": true,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Дата изменения"
    },
    "LEAD_ID": {
      "type": "crm_lead",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Лид"
    },
    "DEAL_ID": {
      "type": "crm_deal",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Сделка"
    },
    "PERSON_TYPE_ID": {
      "type": "integer",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Тип клиента"
    },
    "LOCATION_ID": {
      "type": "location",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Местоположение"
    },
    "UTM_SOURCE": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Рекламная система"
    },
    "UTM_MEDIUM": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Тип трафика"
    },
    "UTM_CAMPAIGN": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Обозначение рекламной кампании"
    },
    "UTM_CONTENT": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Содержание кампании"
    },
    "UTM_TERM": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Условие поиска кампании"
    },
    "LAST_ACTIVITY_TIME": {
      "type": "datetime",
      "isRequired": false,
      "isReadOnly": true,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "LAST_ACTIVITY_TIME"
    },
    "LAST_ACTIVITY_BY": {
      "type": "user",
      "isRequired": false,
      "isReadOnly": true,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "LAST_ACTIVITY_BY"
    },
    "LAST_COMMUNICATION_TIME": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": true,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "LAST_COMMUNICATION_TIME"
    },
    "UF_CRM_6710EFCBAF22C": {
      "type": "date",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": true,
      "title": "UF_CRM_6710EFCBAF22C",
      "listLabel": "Окончание РК",
      "formLabel": "Окончание РК",
      "filterLabel": "Окончание РК",
      "settings": {
        "DEFAULT_VALUE": {
          "TYPE": "NONE",
          "VALUE": ""
        }
      }
    }
  },
  "time": {
    "start": 1750416943.169864,
    "finish": 1750416943.26074,
    "duration": 0.09087610244750977,
    "processing": 0.05633091926574707,
    "date_start": "2025-06-20T13:55:43+03:00",
    "date_finish": "2025-06-20T13:55:43+03:00",
    "operating_reset_at": 1750417543,
    "operating": 0
  }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Объект с описанием полей коммерческого предложения в формате [crm_rest_field_description](../data-types.md#crm_rest_field_description) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Основные поля

#|
|| **Название**
`тип` | **Описание** ||
|| **ASSIGNED_BY_ID**  
[`integer`](../../data-types.md) | Ответственный ||
|| **BEGINDATE**  
[`date`](../../data-types.md) | Дата выставления предложения ||
|| **CLOSED**  
[`char`](../../data-types.md) | Флаг завершения предложения ||
|| **CLOSEDATE**  
[`date`](../../data-types.md) | Дата завершения предложения ||
|| **COMMENTS**  
[`string`](../../data-types.md) | Комментарий ||
|| **COMPANY_ID**  
[`integer`](../../data-types.md) | Идентификатор компании, связанной с предложением ||
|| **CONTACT_IDS**  
[`integer`](../../data-types.md) | Идентификаторы контактов, связанных с предложением. Множественное ||
|| **CONTENT**  
[`string`](../../data-types.md) | Содержание предложения ||
|| **CREATED_BY_ID**  
[`integer`](../../data-types.md) | Идентификатор пользователя, создавшего предложение. Только для чтения ||
|| **CURRENCY_ID**  
[`crm_currency`](../../data-types.md) | Валюта предложения ||
|| **DATE_CREATE**  
[`datetime`](../../data-types.md) | Дата создания предложения. Только для чтения ||
|| **DATE_MODIFY**  
[`datetime`](../../data-types.md) | Дата изменения предложения. Только для чтения ||
|| **DEAL_ID**  
[`integer`](../../data-types.md) | Идентификатор сделки, связанной с предложением ||
|| **ID**  
[`integer`](../../data-types.md) | Идентификатор предложения. Только для чтения ||
|| **LEAD_ID**  
[`integer`](../../data-types.md) | Идентификатор лида, связанного с предложением ||
|| **LOCATION_ID**  
[`integer`](../../data-types.md) | Местоположение клиента ||
|| **MODIFY_BY_ID**  
[`integer`](../../data-types.md) | Идентификатор пользователя, изменившего предложение. Только для чтения ||
|| **MYCOMPANY_ID**  
[`integer`](../../data-types.md) | Идентификатор компании, от которой делается предложение ||
|| **OPENED**  
[`char`](../../data-types.md) | Флаг доступности предложения для всех ||
|| **OPPORTUNITY**  
[`double`](../../data-types.md) | Сумма предложения ||
|| **PERSON_TYPE_ID**  
[`integer`](../../data-types.md) | Тип плательщика ||
|| **QUOTE_NUMBER**  
[`string`](../../data-types.md) | Номер предложения. Только для чтения ||
|| **STATUS_ID**  
[`crm_status`](../../data-types.md) | Стадия предложения. Получить значения справочника можно с помощью метода [crm.status.list](../status/crm-status-list.md) с фильтром по `ENTITY_ID=QUOTE_STATUS` ||
|| **TAX_VALUE**  
[`double`](../../data-types.md) | Ставка налога ||
|| **TERMS**  
[`string`](../../data-types.md) | Условия предложения ||
|| **TITLE**  
[`string`](../../data-types.md) | Название предложения ||
|| **UTM_CAMPAIGN**  
[`string`](../../data-types.md) | Обозначение рекламной кампании ||
|| **UTM_CONTENT**  
[`string`](../../data-types.md) | Содержание рекламной кампании. Например, для контекстных объявлений ||
|| **UTM_MEDIUM**  
[`string`](../../data-types.md) | Тип трафика. Например, CPC для объявлений или CPM для баннеров ||
|| **UTM_SOURCE**  
[`string`](../../data-types.md) | Рекламная система. Например, Yandex-Direct ||
|| **UTM_TERM**  
[`string`](../../data-types.md) | Условие поиска кампании. Например, ключевые слова контекстной рекламы ||
|| **LAST_ACTIVITY_TIME**  
[`datetime`](../../data-types.md) | Время последней активности. Только для чтения ||
|| **LAST_ACTIVITY_BY**  
[`integer`](../../data-types.md) | Идентификатор пользователя, выполнившего последнюю активность. Только для чтения ||
|| **LAST_COMMUNICATION_TIME**  
[`string`](../../data-types.md) | Время последней коммуникации. Только для чтения ||
|| **UF_...**   | Пользовательские поля. Например, `UF_CRM_25534736`. 

Добавить пользовательское поле в предложение можно с помощью метода [crm.quote.userfield.add](./user-field/crm-quote-user-field-add.md) ||
|#

#### Устаревшие поля

Следующие поля сохраняются только для совместимости и не рекомендуются к использованию.

#|
|| **Название**
`тип` | **Описание** ||
|| **CLIENT_ADDR**  
[`string`](../../data-types.md) | Адрес клиента ||
|| **CLIENT_CONTACT**  
[`string`](../../data-types.md) | Контактное лицо клиента ||
|| **CLIENT_EMAIL**  
[`string`](../../data-types.md) | Email клиента ||
|| **CLIENT_PHONE**  
[`string`](../../data-types.md) | Телефон клиента ||
|| **CLIENT_TITLE**  
[`string`](../../data-types.md) | Название клиента ||
|| **CLIENT_TP_ID**  
[`string`](../../data-types.md) | ИНН клиента ||
|| **CLIENT_TPA_ID**  
[`string`](../../data-types.md) | КПП клиента ||
|| **CONTACT_ID**  
[`integer`](../../data-types.md) | Идентификатор контакта, связанного с предложением ||
|#


## Обработка ошибок

 не возвращает ошибки.

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-quote-add.md)
- [{#T}](./crm-quote-get.md)
- [{#T}](./crm-quote-update.md)
- [{#T}](./crm-quote-delete.md)
- [{#T}](./user-field/crm-quote-user-field-add.md)




