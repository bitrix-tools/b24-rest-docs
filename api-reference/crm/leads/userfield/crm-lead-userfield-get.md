# Получить пользовательское поле лидов по id crm.lead.userfield.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом чтения лидов

Метод `crm.lead.userfield.get` возвращает пользовательское поле лидов по идентификатору.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор пользовательского поля, привязанного к лиду.

Идентификатор можно получить с помощью методов [crm.lead.userfield.add](./crm-lead-userfield-add.md) или [crm.lead.userfield.list](./crm-lead-userfield-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":399}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.lead.userfield.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":399,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.lead.userfield.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (a representative subset of the user field properties)
    type CrmLeadUserField = {
      ID: string
      ENTITY_ID: string
      FIELD_NAME: string
      USER_TYPE_ID: string
      XML_ID: string | null
      SORT: string
      MULTIPLE: string
      MANDATORY: string
      SHOW_IN_LIST: string
      EDIT_FORM_LABEL: Record<string, string>
      LIST_COLUMN_LABEL: Record<string, string>
    }

    try {
      const response = await $b24.actions.v2.call.make<CrmLeadUserField>({
        method: 'crm.lead.userfield.get',
        params: {
          id: 399,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('User field:', result.FIELD_NAME, result.USER_TYPE_ID)
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
      async function getLeadUserField() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.lead.userfield.get',
            params: {
              id: 399,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('User field:', result.FIELD_NAME, result.USER_TYPE_ID)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getLeadUserField)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.lead.userfield.get',
                [
                    'id' => 399,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Data: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting company user field: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.lead.userfield.get',
        {
            id: 399,
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.lead.userfield.get',
        [
            'id' => 399
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
        bitrix_response = client.crm.lead.userfield.get(
            bitrix_id=410,
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
        "ID": "6997",
        "ENTITY_ID": "CRM_LEAD",
        "FIELD_NAME": "UF_CRM_HELLO_WORLD",
        "USER_TYPE_ID": "string",
        "XML_ID": null,
        "SORT": "2000",
        "MULTIPLE": "Y",
        "MANDATORY": "N",
        "SHOW_FILTER": "N",
        "SHOW_IN_LIST": "Y",
        "EDIT_IN_LIST": "N",
        "IS_SEARCHABLE": "N",
        "SETTINGS": {
            "SIZE": 20,
            "ROWS": 10,
            "REGEXP": "",
            "MIN_LENGTH": 0,
            "MAX_LENGTH": 0,
            "DEFAULT_VALUE": "Привет, мир! Значение по умолчанию (изменено)"
        },
        "EDIT_FORM_LABEL": {
            "ar": "",
            "br": "",
            "de": "Hallo, Welt! Bearbeiten (geändert)",
            "en": "Hello, World! Edit (changed)",
            "fr": "",
            "hi": "",
            "id": "",
            "in": "",
            "it": "",
            "ja": "",
            "kz": "",
            "la": "",
            "ms": "",
            "pl": "",
            "ru": "Привет, мир! Редактировать (изменено)",
            "sc": "",
            "tc": "",
            "th": "",
            "tr": "",
            "ua": "",
            "vn": ""
        },
        "LIST_COLUMN_LABEL": {
            "ar": "",
            "br": "",
            "de": "Hallo, Welt! Spalte (geändert)",
            "en": "Hello, World! Column (changed)",
            "fr": "",
            "hi": "",
            "id": "",
            "in": "",
            "it": "",
            "ja": "",
            "kz": "",
            "la": "",
            "ms": "",
            "pl": "",
            "ru": "Привет, мир! Колонка (изменено)",
            "sc": "",
            "tc": "",
            "th": "",
            "tr": "",
            "ua": "",
            "vn": ""
        },
        "LIST_FILTER_LABEL": {
            "ar": "Привет, мир! Фильтр (изменено)",
            "br": "Привет, мир! Фильтр (изменено)",
            "de": "Привет, мир! Фильтр (изменено)",
            "en": "Привет, мир! Фильтр (изменено)",
            "fr": "Привет, мир! Фильтр (изменено)",
            "hi": "Привет, мир! Фильтр (изменено)",
            "id": "Привет, мир! Фильтр (изменено)",
            "in": "Привет, мир! Фильтр (изменено)",
            "it": "Привет, мир! Фильтр (изменено)",
            "ja": "Привет, мир! Фильтр (изменено)",
            "kz": "Привет, мир! Фильтр (изменено)",
            "la": "Привет, мир! Фильтр (изменено)",
            "ms": "Привет, мир! Фильтр (изменено)",
            "pl": "Привет, мир! Фильтр (изменено)",
            "ru": "Привет, мир! Фильтр (изменено)",
            "sc": "Привет, мир! Фильтр (изменено)",
            "tc": "Привет, мир! Фильтр (изменено)",
            "th": "Привет, мир! Фильтр (изменено)",
            "tr": "Привет, мир! Фильтр (изменено)",
            "ua": "Привет, мир! Фильтр (изменено)",
            "vn": "Привет, мир! Фильтр (изменено)"
        },
        "ERROR_MESSAGE": {
            "ar": "",
            "br": "",
            "de": "Hallo, Welt! Fehler (geändert)",
            "en": "Hello, World! Error (changed)",
            "fr": "",
            "hi": "",
            "id": "",
            "in": "",
            "it": "",
            "ja": "",
            "kz": "",
            "la": "",
            "ms": "",
            "pl": "",
            "ru": "Привет, мир! Ошибка (изменено)",
            "sc": "",
            "tc": "",
            "th": "",
            "tr": "",
            "ua": "",
            "vn": ""
        },
        "HELP_MESSAGE": {
            "ar": "",
            "br": "",
            "de": "Hallo, Welt! Hilfe (geändert)",
            "en": "Hello, World! Help (changed)",
            "fr": "",
            "hi": "",
            "id": "",
            "in": "",
            "it": "",
            "ja": "",
            "kz": "",
            "la": "",
            "ms": "",
            "pl": "",
            "ru": "Привет, мир! Помощь (изменено)",
            "sc": "",
            "tc": "",
            "th": "",
            "tr": "",
            "ua": "",
            "vn": ""
        }
    },
    "time": {
        "start": 1753790529.430936,
        "finish": 1753790529.487882,
        "duration": 0.05694580078125,
        "processing": 0.0039789676666259766,
        "date_start": "2025-07-29T15:02:09+03:00",
        "date_finish": "2025-07-29T15:02:09+03:00",
        "operating_reset_at": 1753791129,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа, содержит информацию о полях пользовательского поля. Итоговый перечень полей зависит от типа поля, подробное описание полей можно найти в методе [crm.lead.userfield.add](./crm-lead-userfield-add.md)||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "ID is not defined or invalid."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `403` | Access denied | Возникает в случаях, когда:
- у пользователя нет прав на чтение лидов
- пользователь пытается получить пользовательское поле, не привязанное к лидам ||
|| `400` | ID is not defined or invalid | Переданный `id` меньше или равен нулю, либо же не передан вовсе ||
|| `ERROR_NOT_FOUND` | The entity with ID 'id' is not found | Пользовательское поле с переданным `id` не найдено ||
|#
{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-lead-userfield-add.md)
- [{#T}](./crm-lead-userfield-update.md)
- [{#T}](./crm-lead-userfield-list.md)
- [{#T}](./crm-lead-userfield-delete.md)







