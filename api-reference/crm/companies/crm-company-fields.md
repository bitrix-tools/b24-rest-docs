# Получить описание полей компании crm.company.fields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом чтения хотя бы одного типа объектов CRM или смарт-процесса в цифровом рабочем месте

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте метод REST 3.0 [crm.company.field.list](../rest-v3/fields/crm-entity-field-list-rest-v3.md). Варианты значений полей-списков возвращает метод [crm.company.field.custom.enum.list](../rest-v3/fields/crm-entity-field-custom-enum-list-rest-v3.md).

{% endnote %}

Метод `crm.company.fields` возвращает описание полей компании, в том числе [пользовательских](./userfields/index.md).

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.company.fields
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CrmCompanyFields = Record<string, CrmCompanyFieldDescription>

    type CrmCompanyFieldDescription = {
      type: string
      isRequired: boolean
      isReadOnly: boolean
      isImmutable: boolean
      isMultiple: boolean
      isDynamic: boolean
      title: string
    }

    try {
      const response = await $b24.actions.v2.call.make<CrmCompanyFields>({
        method: 'crm.company.fields',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Company fields:', Object.keys(result))
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
      async function getCompanyFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.company.fields',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Company fields:', Object.keys(result))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getCompanyFields)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.company.fields',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching company fields: ' . $e->getMessage();
    }
    ```
- BX24.js

    ```js
    BX24.callMethod(
        "crm.company.fields",
        {},
        function(result)
        {
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
        'crm.company.fields',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.company.fields", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.company.fields: %w", err)
    }

    keys, ok := b24.Keys(res.Result)
    if !ok {
    	return fmt.Errorf("ожидался объект в ответе")
    }
    fmt.Println("полей в ответе:", len(keys))
    ```

{% endlist %}

## Обработка ответа

Описание системного поля не возвращается, если поле закрыто для пользователя [настройкой видимости системных полей](../index.md#system-field-visibility) хотя бы в одной воронке или категории типа объекта.

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
        "TITLE": {
            "type": "string",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Название компании"
        },
        "COMPANY_TYPE": {
            "type": "crm_status",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "statusType": "COMPANY_TYPE",
            "title": "Тип компании"
        },
        "LOGO": {
            "type": "file",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Логотип"
        },
        "ADDRESS": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Фактический адрес"
        },
        "ADDRESS_2": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Адрес (стр. 2)"
        },
        "ADDRESS_CITY": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Город"
        },
        "ADDRESS_POSTAL_CODE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Почтовый индекс"
        },
        "ADDRESS_REGION": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Район"
        },
        "ADDRESS_PROVINCE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Область"
        },
        "ADDRESS_COUNTRY": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Страна"
        },
        "ADDRESS_COUNTRY_CODE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Код страны"
        },
        "ADDRESS_LOC_ADDR_ID": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Идентификатор адреса местоположения"
        },
        "ADDRESS_LEGAL": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Юридический адрес"
        },
        "REG_ADDRESS": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Юридический адрес"
        },
        "REG_ADDRESS_2": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Юридический адрес (стр. 2)"
        },
        "REG_ADDRESS_CITY": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Юридический адрес город"
        },
        "REG_ADDRESS_POSTAL_CODE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Юридический адрес почтовый индекс "
        },
        "REG_ADDRESS_REGION": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Юридический адрес район"
        },
        "REG_ADDRESS_PROVINCE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Юридический адрес область"
        },
        "REG_ADDRESS_COUNTRY": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Юридический адрес страна"
        },
        "REG_ADDRESS_COUNTRY_CODE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Юридический адрес код страны"
        },
        "REG_ADDRESS_LOC_ADDR_ID": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Юридический адрес идентификатор адреса местоположения"
        },
        "BANKING_DETAILS": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Банковские реквизиты"
        },
        "INDUSTRY": {
            "type": "crm_status",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "statusType": "INDUSTRY",
            "title": "Сфера деятельности"
        },
        "EMPLOYEES": {
            "type": "crm_status",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "statusType": "EMPLOYEES",
            "title": "Кол-во сотрудников"
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
        "REVENUE": {
            "type": "double",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Годовой оборот"
        },
        "OPENED": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Доступна для всех"
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
        "HAS_PHONE": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Задан телефон"
        },
        "HAS_EMAIL": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Задан e-mail"
        },
        "HAS_IMOL": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Задана открытая линия"
        },
        "IS_MY_COMPANY": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Моя компания"
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
            "title": "Кем создана"
        },
        "MODIFY_BY_ID": {
            "type": "user",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Кем изменена"
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
        "CONTACT_ID": {
            "type": "crm_contact",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": true,
            "isDynamic": false,
            "title": "Контакт"
        },
        "LEAD_ID": {
            "type": "crm_lead",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Лид",
            "settings": {
                "parentEntityTypeId": 1
            }
        },
        "ORIGINATOR_ID": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Внешний источник"
        },
        "ORIGIN_ID": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Идентификатор элемента во внешнем источнике"
        },
        "ORIGIN_VERSION": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Версия оригинала"
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
        "PARENT_ID_156": {
            "type": "crm_entity",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Закупка",
            "settings": {
                "parentEntityTypeId": 156
            }
        },
        "LAST_ACTIVITY_TIME": {
            "type": "datetime",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Последняя активность"
        },
        "LAST_ACTIVITY_BY": {
            "type": "user",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Автор последней активности в таймлайне"
        },
        "LAST_COMMUNICATION_TIME": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дата последней коммуникации"
        },
        "PHONE": {
            "type": "crm_multifield",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": true,
            "isDynamic": false,
            "title": "Телефон"
        },
        "EMAIL": {
            "type": "crm_multifield",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": true,
            "isDynamic": false,
            "title": "E-mail"
        },
        "WEB": {
            "type": "crm_multifield",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": true,
            "isDynamic": false,
            "title": "Сайт"
        },
        "IM": {
            "type": "crm_multifield",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": true,
            "isDynamic": false,
            "title": "Мессенджер"
        },
        "LINK": {
            "type": "crm_multifield",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": true,
            "isDynamic": false,
            "title": "LINK"
        },
        "UF_CRM_1687188367": {
            "type": "crm",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": true,
            "title": "UF_CRM_1687188367",
            "listLabel": "Дочерняя компания",
            "formLabel": "Дочерняя компания",
            "filterLabel": "Дочерняя компания",
            "settings": {
                "COMPANY": "Y",
                "LEAD": null
            }
        },
        "UF_CRM_64A29A1CD5CC2": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": true,
            "title": "UF_CRM_64A29A1CD5CC2",
            "listLabel": "Новое поле",
            "formLabel": "Новое поле",
            "filterLabel": "Новое поле",
            "settings": {
                "SIZE": 20,
                "ROWS": 1,
                "REGEXP": "",
                "MIN_LENGTH": 0,
                "MAX_LENGTH": 0,
                "DEFAULT_VALUE": ""
            }
        }
    },
    "time": {
        "start": 1769494687,
        "finish": 1769494687.641697,
        "duration": 0.6416969299316406,
        "processing": 0,
        "date_start": "2026-01-27T09:18:07+03:00",
        "date_finish": "2026-01-27T09:18:07+03:00",
        "operating_reset_at": 1769495287,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект: ключ — код поля компании, значение — его описание ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

#### Описание поля

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../data-types.md) | Тип поля. Подробнее — в справочниках [общих типов](../../data-types.md) и [типов CRM](../data-types.md) ||
|| **isRequired**
[`boolean`](../../data-types.md) | `true` — поле обязательное ||
|| **isReadOnly**
[`boolean`](../../data-types.md) | `true` — поле доступно только для чтения ||
|| **isImmutable**
[`boolean`](../../data-types.md) | `true` — значение можно задать только при создании ||
|| **isMultiple**
[`boolean`](../../data-types.md) | `true` — поле множественное ||
|| **isDynamic**
[`boolean`](../../data-types.md) | `true` — пользовательское поле ||
|| **title**
[`string`](../../data-types.md) | Название поля ||
|| **statusType**
[`string`](../../data-types.md) | Идентификатор справочника для типа `crm_status` ||
|| **items**
[`object[]`](../../data-types.md) | Варианты списка для типа `enumeration`: `ID` — идентификатор, `VALUE` — название ||
|| **settings**
[`object`](../../data-types.md) | Настройки поля, если заданы. Состав зависит от поля и его типа ||
|| **listLabel**, **formLabel**, **filterLabel**
[`string`](../../data-types.md) | Подписи пользовательского поля для списка, формы и фильтра, если заданы ||
|| **isDeprecated**
[`boolean`](../../data-types.md) | `true` — поле устарело. Возвращается только для устаревших полей ||
|#

Поля компании описаны в методе [crm.company.add](crm-company-add.md#parameter-fields). Пример значений полей возвращает метод [crm.company.get](crm-company-get.md).

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | `Access denied.` | Нет права чтения ни одного типа объектов CRM и смарт-процессов цифровых рабочих мест ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-company-add.md)
- [{#T}](./crm-company-update.md)
- [{#T}](./crm-company-get.md)
- [{#T}](./crm-company-list.md)
- [{#T}](./crm-company-delete.md)
