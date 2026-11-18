# Получить пользовательское поле лидов по ID crm.lead.userfield.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом чтения лидов

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте метод REST 3.0 [crm.lead.field.custom.get](../../rest-v3/fields/crm-entity-field-custom-get-rest-v3.md).

{% endnote %}

Метод `crm.lead.userfield.get` возвращает пользовательское поле лидов по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Положительный идентификатор пользовательского поля лидов.

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
      EDIT_FORM_LABEL?: Record<string, string | null>
      LIST_COLUMN_LABEL?: Record<string, string | null>
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

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.lead.userfield.get(
            bitrix_id=399,
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

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.lead.userfield.get", b24.Params{
    	"id": 399,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.lead.userfield.get: %w", err)
    }

    var item struct {
    	ID         b24.ID `json:"ID"`
    	EntityID   string `json:"ENTITY_ID"`
    	FieldName  string `json:"FIELD_NAME"`
    	UserTypeID string `json:"USER_TYPE_ID"`
    	Sort       string `json:"SORT"`
    	Multiple   string `json:"MULTIPLE"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.EntityID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": "399",
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
            "en": "Hello, World! Edit (changed)",
            "ru": "Привет, мир! Редактировать (изменено)"
        },
        "LIST_COLUMN_LABEL": {
            "en": "Hello, World! Column (changed)",
            "ru": "Привет, мир! Колонка (изменено)"
        },
        "LIST_FILTER_LABEL": {
            "en": "Привет, мир! Фильтр (изменено)",
            "ru": "Привет, мир! Фильтр (изменено)"
        },
        "ERROR_MESSAGE": {
            "en": "Hello, World! Error (changed)",
            "ru": "Привет, мир! Ошибка (изменено)"
        },
        "HELP_MESSAGE": {
            "en": "Hello, World! Help (changed)",
            "ru": "Привет, мир! Помощь (изменено)"
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
[`object`](../../../data-types.md) | Описание пользовательского поля [(подробное описание)](#result)||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Описание result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
```integer | string``` | Идентификатор поля ||
|| **ENTITY_ID**
[`string`](../../../data-types.md) | Объект поля: `CRM_LEAD` ||
|| **FIELD_NAME**
[`string`](../../../data-types.md) | Полный код поля с префиксом `UF_CRM_` ||
|| **USER_TYPE_ID**
[`string`](../../../data-types.md) | Идентификатор типа поля. Доступные типы возвращает [crm.userfield.types](../../universal/user-defined-fields/crm-userfield-types.md) ||
|| **XML_ID**
```string | null``` | Внешний код ||
|| **SORT**
```integer | string``` | Индекс сортировки ||
|| **MULTIPLE**
[`char`](../../../data-types.md) | Множественность: `Y` — да, `N` — нет ||
|| **MANDATORY**
[`char`](../../../data-types.md) | Обязательность: `Y` — да, `N` — нет ||
|| **SHOW_FILTER**
[`char`](../../../data-types.md) | Режим фильтра: `N` — не показывать, `I` — точное совпадение, `E` — маска, `S` — подстрока ||
|| **SHOW_IN_LIST**
[`char`](../../../data-types.md) | Показывать в списке: `Y` — да, `N` — нет ||
|| **EDIT_IN_LIST**
[`char`](../../../data-types.md) | Разрешать редактирование в списке: `Y` — да, `N` — нет ||
|| **IS_SEARCHABLE**
[`char`](../../../data-types.md) | Участие значений в поиске: `Y` — да, `N` — нет ||
|| **SETTINGS**
```object | array | null``` | Настройки зависят от типа поля. При отсутствии настроек может вернуться пустой массив или `null`. Список настроек возвращает [crm.userfield.settings.fields](../../universal/user-defined-fields/crm-userfield-settings-fields.md) ||
|| **EDIT_FORM_LABEL**
[`object`](../../../data-types.md) | Подписи в форме редактирования по языкам ||
|| **LIST_COLUMN_LABEL**
[`object`](../../../data-types.md) | Заголовки в списке по языкам ||
|| **LIST_FILTER_LABEL**
[`object`](../../../data-types.md) | Подписи фильтра по языкам ||
|| **ERROR_MESSAGE**
[`object`](../../../data-types.md) | Сообщения об ошибке по языкам ||
|| **HELP_MESSAGE**
[`object`](../../../data-types.md) | Подсказки по языкам ||
|| **LIST**
[`object[]`](../../../data-types.md) | Только для `enumeration`: варианты списка [(подробное описание)](#list) ||
|| **USER_TYPE_OWNER**
```string | null``` | Только для типа поля приложения: идентификатор приложения, которому принадлежит тип. Если приложение не найдено, возвращается `null` ||
|#

Языковые подписи — объекты с [кодами языков](../../data-types.md#lang-ids) в ключах и строками или `null` в значениях. Например, `{"ru": "Метка", "en": "Label"}`. Если подписи не заданы, соответствующие свойства могут отсутствовать.

### Элемент LIST {#list}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
```integer | string``` | Идентификатор варианта ||
|| **SORT**
```integer | string``` | Индекс сортировки. Варианты упорядочены по `SORT` по возрастанию ||
|| **VALUE**
[`string`](../../../data-types.md) | Текст варианта ||
|| **DEF**
[`char`](../../../data-types.md) | Значение по умолчанию: `Y` — да, `N` — нет ||
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
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | Access denied. | Возникает в случаях, когда:
- у пользователя нет прав на чтение лидов
- пользователь пытается получить пользовательское поле, не привязанное к лидам ||
|| `400` | Пустое значение | ID is not defined or invalid. | Параметр `id` не передан или его значение после приведения к целому числу меньше либо равно нулю ||
|| `400` | `ERROR_NOT_FOUND` | The entity with ID 'id' is not found. | Пользовательское поле с переданным `id` не найдено ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-lead-userfield-add.md)
- [{#T}](./crm-lead-userfield-update.md)
- [{#T}](./crm-lead-userfield-list.md)
- [{#T}](./crm-lead-userfield-delete.md)
