# Получить лид по Id crm.lead.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на чтение запрашиваемого лида

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [crm.item.get](../universal/crm-item-get.md).

{% endnote %}

Метод `crm.lead.get` возвращает лид по идентификатору.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** || 
|| **id***
[`integer`](../../data-types.md) | Идентификатор лида.

Идентификатор можно получить с помощью методов [crm.lead.list](./crm-lead-list.md) или [crm.lead.add](./crm-lead-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":123}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.lead.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":123,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.lead.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CrmLeadMultifield = {
      ID: string
      VALUE_TYPE: string
      VALUE: string
      TYPE_ID: string
    }

    // Shape of the payload returned in result (a representative subset of the documented lead fields)
    type CrmLead = {
      ID: string
      TITLE: string
      NAME: string | null
      LAST_NAME: string | null
      STATUS_ID: string
      SOURCE_ID: string
      CURRENCY_ID: string
      OPPORTUNITY: string
      ASSIGNED_BY_ID: string
      OPENED: string
      DATE_CREATE: ISODate | null
      DATE_MODIFY: ISODate | null
      PHONE?: CrmLeadMultifield[]
    }

    try {
      const response = await $b24.actions.v2.call.make<CrmLead>({
        method: 'crm.lead.get',
        params: {
          id: 123,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Lead title:', result.TITLE, 'status:', result.STATUS_ID)
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
      async function getLead() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.lead.get',
            params: {
              id: 123,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Lead title:', result.TITLE, 'status:', result.STATUS_ID)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getLead)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.lead.get',
                [
                    'id' => 123,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            return;
        }
    
        echo 'Lead data: ' . print_r($result->data(), true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting lead data: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript 
    BX24.callMethod(
      'crm.lead.get',
      { id: 123 },
      (result) => {
        if(result.error())
        {
          console.error(result.error());
  
          return;
        }
        
        console.info(result.data());
      }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.lead.get',
        [
            'ID' => 123
        ]
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
        bitrix_response = client.crm.lead.get(
            bitrix_id=1201,
        ).response
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
    "ID": "123",
    "TITLE": "Лид #1591",
    "HONORIFIC": null,
    "NAME": "",
    "SECOND_NAME": null,
    "LAST_NAME": null,
    "COMPANY_TITLE": null,
    "COMPANY_ID": null,
    "CONTACT_ID": null,
    "IS_RETURN_CUSTOMER": "N",
    "BIRTHDATE": "",
    "SOURCE_ID": "1",
    "SOURCE_DESCRIPTION": null,
    "STATUS_ID": "IN_PROCESS",
    "STATUS_DESCRIPTION": null,
    "POST": null,
    "COMMENTS": null,
    "CURRENCY_ID": "RUB",
    "OPPORTUNITY": "0.00",
    "IS_MANUAL_OPPORTUNITY": "N",
    "HAS_PHONE": "N",
    "HAS_EMAIL": "N",
    "HAS_IMOL": "N",
    "ASSIGNED_BY_ID": "1",
    "CREATED_BY_ID": "1",
    "MODIFY_BY_ID": "1",
    "DATE_CREATE": "2024-05-23T18:18:25+03:00",
    "DATE_MODIFY": "2024-05-23T18:18:25+03:00",
    "DATE_CLOSED": "",
    "STATUS_SEMANTIC_ID": "P",
    "OPENED": "Y",
    "ORIGINATOR_ID": null,
    "ORIGIN_ID": null,
    "MOVED_BY_ID": "1",
    "MOVED_TIME": "2024-05-23T18:18:25+03:00",
    "ADDRESS": null,
    "ADDRESS_2": null,
    "ADDRESS_CITY": null,
    "ADDRESS_POSTAL_CODE": null,
    "ADDRESS_REGION": null,
    "ADDRESS_PROVINCE": null,
    "ADDRESS_COUNTRY": null,
    "ADDRESS_COUNTRY_CODE": null,
    "ADDRESS_LOC_ADDR_ID": null,
    "UTM_SOURCE": null,
    "UTM_MEDIUM": null,
    "UTM_CAMPAIGN": null,
    "UTM_CONTENT": null,
    "UTM_TERM": null,
    "LAST_ACTIVITY_BY": "1",
    "LAST_ACTIVITY_TIME": "2024-05-23T18:18:25+03:00",
    "PHONE": [
      {
        "ID": "11658",
        "VALUE_TYPE": "OTHER",
        "VALUE": "+5454777777",
        "TYPE_ID": "PHONE"
      }
    ],
    "IM": [
      {
        "ID": "11660",
        "VALUE_TYPE": "OPENLINE",
        "VALUE": "imol|livechat|1|67|21",
        "TYPE_ID": "IM"
      }
    ]
  },
  "time": {
      "start": 1705764932.998683,
      "finish": 1705764937.173995,
      "duration": 4.1753120422363281,
      "processing": 3.3076529502868652,
      "date_start": "2024-01-20T18:35:32+03:00",
      "date_finish": "2024-01-20T18:35:37+03:00",
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
[`lead`](#lead) | Корневой элемент ответа. Содержит информацию о полях лида. Структура описана [ниже](#lead) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип lead {#lead}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Целочисленный идентификатор лида ||
|| **TITLE**
[`string`](../../data-types.md) | Название лида ||
|| **HONORIFIC**
[`crm_status`](../data-types.md) | Вид обращения. Статус из справочника. Список возможных идентификаторов можно получить методом [crm.status.list](../status/crm-status-list.md) с фильтром `filter[ENTITY_ID]=HONORIFIC` ||
|| **NAME**
[`string`](../../data-types.md) |  Имя контакта ||
|| **SECOND_NAME**
[`string`](../../data-types.md) |  Отчество контакта ||
|| **LAST_NAME**
[`string`](../../data-types.md) |  Фамилия контакта ||
|| **COMPANY_ID**
[`crm_company`](../data-types.md) | Привязка лида к компании ||
|| **COMPANY_TITLE**
[`string`](../../data-types.md) | Название компании ||
|| **CONTACT_ID**
[`crm_contact`](../data-types.md) | Привязка лида к контакту ||
|| **IS_RETURN_CUSTOMER**
[`char`](../../data-types.md) | Признак повторного лида. Допустимые значения Y или N ||
|| **BIRTHDATE**
[`date`](../../data-types.md) | Дата рождения ||
|| **SOURCE_ID**
[`crm_status`](../data-types.md) | Идентификатор источника. Статус из справочника. Список возможных идентификаторов можно получить методом [crm.status.list](../status/crm-status-list.md) с фильтром `filter[ENTITY_ID]=SOURCE` ||
|| **SOURCE_DESCRIPTION**
[`string`](../../data-types.md) | Описание источника ||
|| **STATUS_ID**
[`crm_status`](../data-types.md) | Идентификатор стадии лида. Статус из справочника. Список возможных идентификаторов можно получить методом [crm.status.list](../status/crm-status-list.md) с фильтром `filter[ENTITY_ID]=STATUS` ||
|| **STATUS_DESCRIPTION**
[`string`](../../data-types.md) | Дополнительно о стадии ||
|| **POST**
[`string`](../../data-types.md) | Должность ||
|| **COMMENTS**
[`string`](../../data-types.md) | Комментарии ||
|| **CURRENCY_ID**
[`crm_currency`](../data-types.md) | Идентификатор валюты ||
|| **OPPORTUNITY**
[`double`](../../data-types.md) | Предполагаемая сумма ||
|| **IS_MANUAL_OPPORTUNITY**
[`char`](../../data-types.md) | Признак ручного расчёта суммы. Допустимые значения Y или N ||
|| **HAS_PHONE**
[`char`](../../data-types.md) | Признак заполненности поля телефон. Допустимые значения Y или N ||
|| **HAS_EMAIL**
[`char`](../../data-types.md) | Признак заполненности поля электронной почты. Допустимые значения Y или N ||
|| **HAS_IMOL**
[`char`](../../data-types.md) | Признак наличия привязанной открытой линии. Допустимые значения Y или N ||
|| **ASSIGNED_BY_ID**
[`user`](../../data-types.md) | Идентификатор пользователя ответственного за лид ||
|| **CREATED_BY_ID**
[`user`](../../data-types.md) | Идентификатор пользователя создавшего лид ||
|| **MODIFY_BY_ID**
[`user`](../../data-types.md) | Идентификатор пользователя-автора последнего изменения ||
|| **MOVED_BY_ID**
[`user`](../../data-types.md) | Идентификатор пользователя-автора перемещения элемента на текущую стадию ||
|| **DATE_CREATE**
[`datetime`](../../data-types.md) | Дата создания ||
|| **DATE_MODIFY**
[`datetime`](../../data-types.md) | Дата изменения ||
|| **DATE_CLOSED**
[`datetime`](../../data-types.md) | Дата закрытия ||
|| **STATUS_SEMANTIC_ID**
[`string`](../../data-types.md) |
- F (failed) – обработан неуспешно
- S (success) – обработан успешно
- P (processing) – лид в обработке ||
|| **OPENED**
[`char`](../../data-types.md) | Признак доступности лида для всех. Допустимые значения Y или N ||
|| **ORIGINATOR_ID**
[`string`](../../data-types.md) | Идентификатор источника данных. Используется только для привязки к внешнему источнику ||
|| **ORIGIN_ID**
[`string`](../../data-types.md) | Идентификатор элемента в источнике данных. Используется только для привязки к внешнему источнику ||
|| **MOVED_TIME**
[`datetime`](../../data-types.md) | Дата перемещения элемента на текущую стадию ||
|| **ADDRESS**
[`string`](../../data-types.md) | Адрес контакта ||
|| **ADDRESS_2**
[`string`](../../data-types.md) | Вторая страница адреса. В некоторых странах принято разбивать адрес на 2 части ||
|| **ADDRESS_CITY**
[`string`](../../data-types.md) | Город ||
|| **ADDRESS_POSTAL_CODE**
[`string`](../../data-types.md) | Почтовый индекс ||
|| **ADDRESS_REGION**
[`string`](../../data-types.md) | Район ||
|| **ADDRESS_PROVINCE**
[`string`](../../data-types.md) | Область ||  
|| **ADDRESS_COUNTRY**
[`string`](../../data-types.md) | Страна ||
|| **ADDRESS_COUNTRY_CODE**
[`string`](../../data-types.md) | Код страны || 
|| **ADDRESS_LOC_ADDR_ID**
[`string`](../../data-types.md) | Используется для служебных целей ||
|| **UTM_SOURCE**
[`string`](../../data-types.md) | Рекламная система. Yandex-Direct, Google-Adwords и другие ||
|| **UTM_MEDIUM**
[`string`](../../data-types.md) | Тип трафика. CPC (объявления), CPM (баннеры) ||
|| **UTM_CAMPAIGN**
[`string`](../../data-types.md) | Обозначение рекламной кампании ||
|| **UTM_CONTENT**
[`string`](../../data-types.md) | Содержание кампании. Например, для контекстных объявлений ||
|| **UTM_TERM**
[`string`](../../data-types.md) | Условие поиска кампании. Например, ключевые слова контекстной рекламы ||
|| **LAST_ACTIVITY_BY**
[`string`](../../data-types.md) | Идентификатор пользователя ответственного за последнюю активность в этом лиде (например, создавшего новое дело в лиде) ||
|| **LAST_ACTIVITY_TIME**
[`datetime`](../../data-types.md) | Время последней активности ||
||**UF_...** | Пользовательские поля. Например, `UF_CRM_25534736`.  

В зависимости от настроек портала у лидов может быть набор пользовательских полей определенных типов. 

Для создания, изменения или удаления пользовательских полей в лидах используйте методы [crm.lead.userfield.*](./userfield/index.md) ||
|| **PHONE**
[`crm_multifield`](../data-types.md) | Массив телефонов ||
|| **IM**
 [`crm_multifield`](../data-types.md) | Массив мессенджеров ||
|#

## Обработка ошибок

> 40x, 50x Error

```json
{
    "error": "",
    "error_description": "Not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные ошибки

#|  
|| **Текст ошибки** | **Описание** ||
|| `ID is not defined or invalid` |  В параметр `id` либо не передано значение, либо оно является не целым числом больше нуля ||
|| `Not found`  | Лид с указанным `id` не найден ||
|| `Access denied` | У пользователя нет прав на чтение лида ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](../../../tutorials/crm/how-to-add-crm-objects/how-to-add-objects-with-crm-mode.md)





