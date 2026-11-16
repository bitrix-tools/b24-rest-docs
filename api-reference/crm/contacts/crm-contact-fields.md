# Получить поля контакта crm.contact.fields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом чтения хотя бы одного типа объектов CRM или смарт-процесса в цифровом рабочем месте

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте метод REST 3.0 [crm.contact.field.list](../rest-v3/fields/crm-entity-field-list-rest-v3.md). Варианты значений полей-списков возвращает метод [crm.contact.field.custom.enum.list](../rest-v3/fields/crm-entity-field-custom-enum-list-rest-v3.md).

{% endnote %}

Метод `crm.contact.fields` возвращает описание полей контакта, в том числе пользовательских.

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.contact.fields
    ```


- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.fields
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CrmContactFields = Record<string, CrmContactFieldDescription>

    type CrmContactFieldDescription = {
      type: string
      isRequired: boolean
      isReadOnly: boolean
      isImmutable: boolean
      isMultiple: boolean
      isDynamic: boolean
      title: string
    }

    try {
      const response = await $b24.actions.v2.call.make<CrmContactFields>({
        method: 'crm.contact.fields',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Contact fields:', Object.keys(result))
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
      async function getContactFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.contact.fields',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Contact fields:', Object.keys(result))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getContactFields)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.contact.fields',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Поля контакта: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching contact fields: ' . $e->getMessage();
    }
    ```
- BX24.js

    ```js
    BX24.callMethod(
        "crm.contact.fields",
        {},
        (result) => {
            if(result.error())
                console.error(result.error());
            else
                console.info("Поля контакта", result.data());
        }
    );    
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.contact.fields',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.contact.fields", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.contact.fields: %w", err)
    }

    keys, ok := b24.Keys(res.Result)
    if !ok {
    	return fmt.Errorf("ожидался объект в ответе")
    }
    fmt.Println("полей в ответе:", len(keys))
    ```

{% endlist %}

## Обработка ответа

Пример сокращен; набор полей и их характеристики зависят от настроек Битрикс24.

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
        "HONORIFIC": {
            "type": "crm_status",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "statusType": "HONORIFIC",
            "title": "Обращение"
        },
        "NAME": {
            "type": "string",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Имя"
        },
        "SECOND_NAME": {
            "type": "string",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Отчество"
        },
        "LAST_NAME": {
            "type": "string",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Фамилия"
        },
        "PHOTO": {
            "type": "file",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Фотография"
        },
        "BIRTHDATE": {
            "type": "date",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дата рождения"
        },
        "TYPE_ID": {
            "type": "crm_status",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "statusType": "CONTACT_TYPE",
            "title": "Тип контакта"
        },
        "SOURCE_ID": {
            "type": "crm_status",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "statusType": "SOURCE",
            "title": "Источник"
        },
        "SOURCE_DESCRIPTION": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дополнительно об источнике"
        },
        "POST": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Должность"
        },
        "ADDRESS": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Адрес"
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
        "COMMENTS": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Комментарий"
        },
        "OPENED": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Доступен для всех"
        },
        "EXPORT": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Участвует ли контакт в экспорте"
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
            "title": "Задана ли открытая линия"
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
            "title": "Кем изменен"
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
        "COMPANY_ID": {
            "type": "crm_company",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "isDeprecated": true,
            "title": "Компания"
        },
        "COMPANY_IDS": {
            "type": "crm_company",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": true,
            "isDynamic": false,
            "title": "COMPANY_IDS"
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
        "UF_CRM_64A29A1CC5CCF": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": true,
            "title": "UF_CRM_64A29A1CC5CCF",
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
        },
        "UF_CRM_1689930044129": {
            "type": "enumeration",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": true,
            "items": [
                {
                    "ID": "3211",
                    "VALUE": "Африка"
                },
                {
                    "ID": "3213",
                    "VALUE": "Европа"
                },
                {
                    "ID": "3215",
                    "VALUE": "Юг"
                },
                {
                    "ID": "3217",
                    "VALUE": "Восток"
                }
            ],
            "title": "UF_CRM_1689930044129",
            "listLabel": "Список",
            "formLabel": "Список",
            "filterLabel": "Список",
            "settings": {
                "DISPLAY": "UI",
                "LIST_HEIGHT": 1,
                "CAPTION_NO_VALUE": "",
                "SHOW_NO_VALUE": "Y"
            }
        }
    },
    "time": {
        "start": 1715004755.782705,
        "finish": 1715004756.118899,
        "duration": 0.3361940383911133,
        "processing": 0.10344505310058594,
        "date_start": "2024-05-06T17:12:35+03:00",
        "date_finish": "2024-05-06T17:12:36+03:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

В `result` возвращается объект: ключ — код поля контакта, значение — его описание.

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Описания полей контакта ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

#### Описание поля

У признаков `is...` значение `false` означает, что признак выключен.

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

#### Поля контакта

#|
|| **Название**
`тип` | **Описание** ||
||**ID**
[`integer`](../../data-types.md) | Идентификатор контакта. Только для чтения ||
||**HONORIFIC**
[`crm_status`](../data-types.md) | Обращение.

Получить значения справочника можно с помощью метода [crm.status.list](../status/crm-status-list.md) с фильтром по `ENTITY_ID=HONORIFIC` ||
||**NAME**
[`string`](../../data-types.md) | Имя ||
||**SECOND_NAME**
[`string`](../../data-types.md) | Отчество ||
||**LAST_NAME**
[`string`](../../data-types.md) | Фамилия ||
||**PHOTO**
[`file`](../../data-types.md) | Фотография ||
||**BIRTHDATE**
[`date`](../../data-types.md) | Дата рождения ||
||**TYPE_ID**
[`crm_status`](../data-types.md)| Тип контакта.

Получить значения справочника можно с помощью метода [crm.status.list](../status/crm-status-list.md) с фильтром по `ENTITY_ID=CONTACT_TYPE` ||
||**SOURCE_ID**
[`crm_status`](../data-types.md) | Источник.

Получить значения справочника можно с помощью метода [crm.status.list](../status/crm-status-list.md) с фильтром по `ENTITY_ID=SOURCE`||
||**SOURCE_DESCRIPTION**
[`string`](../../data-types.md) | Дополнительно об источнике ||
||**POST**
[`string`](../../data-types.md) | Должность ||
||**COMMENTS**
[`string`](../../data-types.md) | Комментарий. Поддерживает bb-коды ||
||**OPENED**
[`char`](../../data-types.md) | Доступен ли для всех. Возможные значения:
- `Y` — да
- `N` — нет 

Учитывается в работе прав доступа для ролей с уровнем доступа «Все открытые» ||
||**EXPORT**
[`char`](../../data-types.md) | Участвует ли контакт в экспорте. Возможные значения:
- `Y` — да
- `N` — нет ||
||**HAS_PHONE**
[`char`](../../data-types.md) | Задан ли телефон. Возможные значения:
- `Y` — да
- `N` — нет

Только для чтения ||
||**HAS_EMAIL**
[`char`](../../data-types.md) | Задан ли e-mail. Возможные значения:
- `Y` — да
- `N` — нет

Только для чтения  ||
||**HAS_IMOL**
[`char`](../../data-types.md) | Задана ли открытая линия. Возможные значения:
- `Y` — да
- `N` — нет

Только для чтения ||
||**ASSIGNED_BY_ID**
[`user`](../../data-types.md) | Ответственный ||
||**CREATED_BY_ID**
[`user`](../../data-types.md) | Кем создан. Только для чтения ||
||**MODIFY_BY_ID**
[`user`](../../data-types.md) | Кем изменен. Только для чтения ||
||**DATE_CREATE**
[`datetime`](../../data-types.md) | Дата создания. Только для чтения ||
||**DATE_MODIFY**
[`datetime`](../../data-types.md) | Дата изменения. Только для чтения ||
||**COMPANY_ID**
[`crm_company`](../data-types.md) | Основная компания контакта. Устаревшее поле, в описании приходит с `isDeprecated: true`. Для привязки к нескольким компаниям используйте `COMPANY_IDS` ||
||**COMPANY_IDS**
[`crm_company`](../data-types.md) | Привязка контакта к компаниям. Множественное. 

В методах [`crm.contact.update`](./crm-contact-update.md) и [`crm.contact.add`](./crm-contact-add.md) принимает массив идентификаторов компаний.

В методах [`crm.contact.list`](./crm-contact-list.md) и [`crm.contact.get`](./crm-contact-get.md) поля нет: список компаний возвращает метод [`crm.contact.company.items.get`](./company/crm-contact-company-items-get.md)  ||
||**LEAD_ID**
[`crm_lead`](../data-types.md) | Идентификатор лида, связанного с контактом. Только для чтения ||
||**UTM_SOURCE**
[`string`](../../data-types.md) | Рекламная система (Yandex-Direct, Google-Adwords и другие) ||
||**UTM_MEDIUM**
[`string`](../../data-types.md) | Тип трафика. Например, `CPC` — объявления, `CPM` — баннеры ||
||**UTM_CAMPAIGN**
[`string`](../../data-types.md) | Обозначение рекламной кампании ||
||**UTM_CONTENT**
[`string`](../../data-types.md) | Содержание кампании. Например, для контекстных объявлений ||
||**UTM_TERM**
[`string`](../../data-types.md) | Условие поиска кампании. Например, ключевые слова контекстной рекламы ||
||**LAST_ACTIVITY_TIME**
[`datetime`](../../data-types.md) | Дата последней активности в таймлайне ||
||**LAST_ACTIVITY_BY**
[`user`](../../data-types.md) | Автор последней активности в таймлайне ||
||**LAST_COMMUNICATION_TIME**
[`string`](../../data-types.md) | Дата и время последней коммуникации с контактом. Приходит строкой в формате даты Битрикс24, а не ISO 8601, например `09/23/2026 06:27:48 pm`. Только для чтения ||
||**PHONE**
[`crm_multifield`](../data-types.md) | Телефоны. Множественное ||
||**EMAIL**
[`crm_multifield`](../data-types.md) | E-mail. Множественное ||
||**WEB**
[`crm_multifield`](../data-types.md) | Сайты. Множественное ||
||**IM**
[`crm_multifield`](../data-types.md) | Мессенджеры. Множественное ||
||**LINK**
[`crm_multifield`](../data-types.md) | Ссылки. Множественное. Служебное ||
||**UF_...**
[`any`](../../data-types.md) | Пользовательские поля. Например, `UF_CRM_25534736`.

В зависимости от настроек Битрикс24 у контактов может быть набор пользовательских полей определенных типов.

Добавить пользовательское поле в контакт можно с помощью метода [crm.contact.userfield.add](./userfield/crm-contact-userfield-add.md)  ||
||**PARENT_ID_...**
[`crm_entity`](../data-types.md) | Поля связей.

Если смарт-процесс связан с контактами как родительский, поле `PARENT_ID_...` хранит идентификатор его элемента. Например, `PARENT_ID_153` — идентификатор элемента родительского смарт-процесса с `entityTypeId=153` ||
|#

**Поля связи с внешними источниками данных**

Поля заполняются, если контакт создан внешней системой.

#|
|| **Название**
`тип` | **Описание** ||
||**ORIGINATOR_ID**
[`string`](../../data-types.md) | Идентификатор внешней системы, являющейся источником данных об этом контакте ||
||**ORIGIN_ID**
[`string`](../../data-types.md) | Идентификатор контакта во внешней системе ||
||**ORIGIN_VERSION**
[`string`](../../data-types.md) | Версия данных контакта во внешней системе. 

Защищает от случайной перезаписи: если контакт импортирован и во внешней системе не менялся, его можно редактировать в CRM, следующая выгрузка не перезапишет изменения ||
|#

**Устаревшие поля**

Поля адреса в контакте устарели и работают только в режиме совместимости. Для работы с адресом используйте [реквизиты](../requisites/index.md).

#|
|| **Название**
`тип` | **Описание** ||
||**ADDRESS**
[`string`](../../data-types.md) | Адрес ||
||**ADDRESS_2**
[`string`](../../data-types.md) | Вторая строка адреса ||
||**ADDRESS_CITY**
[`string`](../../data-types.md) | Город ||
||**ADDRESS_POSTAL_CODE**
[`string`](../../data-types.md) | Почтовый индекс ||
||**ADDRESS_REGION**
[`string`](../../data-types.md) | Район ||
||**ADDRESS_PROVINCE**
[`string`](../../data-types.md) | Область ||
||**ADDRESS_COUNTRY**
[`string`](../../data-types.md) | Страна ||
||**ADDRESS_COUNTRY_CODE**
[`string`](../../data-types.md) | Код страны ||
||**ADDRESS_LOC_ADDR_ID**
[`integer`](../../data-types.md) | Идентификатор адреса местоположения ||
|#

## Обработка ошибок

HTTP-статус: **400**

Пример ошибки, если у пользователя нет права чтения ни одного типа объектов CRM и смарт-процессов цифровых рабочих мест:

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

- [{#T}](./crm-contact-add.md)
- [{#T}](./crm-contact-update.md)
- [{#T}](./crm-contact-get.md)
- [{#T}](./crm-contact-list.md)
- [{#T}](./crm-contact-delete.md)
