# Получить пользовательское поле контактов по ID crm.contact.userfield.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом «чтения» контактов

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте метод REST 3.0 [crm.contact.field.custom.get](../../rest-v3/fields/crm-entity-field-custom-get-rest-v3.md).

{% endnote %}

Метод `crm.contact.userfield.get` возвращает пользовательское поле контактов по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор пользовательского поля контактов.

Идентификатор можно получить с помощью методов [`crm.contact.userfield.add`](./crm-contact-userfield-add.md) или [`crm.contact.userfield.list`](./crm-contact-userfield-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Получить пользовательское поле с `id = 399`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":399}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.contact.userfield.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":399,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.userfield.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CrmContactUserfield = {
      ID: string
      ENTITY_ID: string
      FIELD_NAME: string
      USER_TYPE_ID: string
      XML_ID: string | null
      SORT: string
      MULTIPLE: string
      MANDATORY: string
    }

    try {
      const response = await $b24.actions.v2.call.make<CrmContactUserfield>({
        method: 'crm.contact.userfield.get',
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
        console.info('Userfield:', result.ID, result.FIELD_NAME)
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
      async function getContactUserfield() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.contact.userfield.get',
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
          console.info('Userfield:', result.ID, result.FIELD_NAME)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getContactUserfield)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.contact.userfield.get(bitrix_id=399).response
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
                'crm.contact.userfield.get',
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
        'crm.contact.userfield.get',
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
        'crm.contact.userfield.get',
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
    res, err := client.Core().Call(ctx, "crm.contact.userfield.get", b24.Params{
    	"id": 399,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.contact.userfield.get: %w", err)
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
        "ENTITY_ID": "CRM_CONTACT",
        "FIELD_NAME": "UF_CRM_HELLO_WORLD",
        "USER_TYPE_ID": "string",
        "XML_ID": null,
        "SORT": "1000",
        "MULTIPLE": "Y",
        "MANDATORY": "Y",
        "SHOW_FILTER": "E",
        "SHOW_IN_LIST": "Y",
        "EDIT_IN_LIST": "Y",
        "IS_SEARCHABLE": "Y",
        "SETTINGS": {
            "SIZE": 20,
            "ROWS": 3,
            "REGEXP": "",
            "MIN_LENGTH": 0,
            "MAX_LENGTH": 0,
            "DEFAULT_VALUE": "Привет, мир! Значение по умолчанию"
        },
        "EDIT_FORM_LABEL": {
            "ar": "Поле \u0027Привет, мир!\u0027",
            "br": "Поле \u0027Привет, мир!\u0027",
            "en": "Hello, World! Edit",
            "fr": "Поле \u0027Привет, мир!\u0027",
            "id": "Поле \u0027Привет, мир!\u0027",
            "it": "Поле \u0027Привет, мир!\u0027",
            "ja": "Поле \u0027Привет, мир!\u0027",
            "la": "Поле \u0027Привет, мир!\u0027",
            "ms": "Поле \u0027Привет, мир!\u0027",
            "pl": "Поле \u0027Привет, мир!\u0027",
            "ru": "Привет, мир! Редактировать",
            "sc": "Поле \u0027Привет, мир!\u0027",
            "tc": "Поле \u0027Привет, мир!\u0027",
            "th": "Поле \u0027Привет, мир!\u0027",
            "tr": "Поле \u0027Привет, мир!\u0027",
            "vn": "Поле \u0027Привет, мир!\u0027"
        },
        "LIST_COLUMN_LABEL": {
            "ar": "Поле \u0027Привет, мир!\u0027",
            "br": "Поле \u0027Привет, мир!\u0027",
            "en": "Hello, World! Column",
            "fr": "Поле \u0027Привет, мир!\u0027",
            "id": "Поле \u0027Привет, мир!\u0027",
            "it": "Поле \u0027Привет, мир!\u0027",
            "ja": "Поле \u0027Привет, мир!\u0027",
            "la": "Поле \u0027Привет, мир!\u0027",
            "ms": "Поле \u0027Привет, мир!\u0027",
            "pl": "Поле \u0027Привет, мир!\u0027",
            "ru": "Привет, мир! Колонка",
            "sc": "Поле \u0027Привет, мир!\u0027",
            "tc": "Поле \u0027Привет, мир!\u0027",
            "th": "Поле \u0027Привет, мир!\u0027",
            "tr": "Поле \u0027Привет, мир!\u0027",
            "vn": "Поле \u0027Привет, мир!\u0027"
        },
        "LIST_FILTER_LABEL": {
            "ar": "Привет, мир! Фильтр",
            "br": "Привет, мир! Фильтр",
            "en": "Привет, мир! Фильтр",
            "fr": "Привет, мир! Фильтр",
            "id": "Привет, мир! Фильтр",
            "it": "Привет, мир! Фильтр",
            "ja": "Привет, мир! Фильтр",
            "la": "Привет, мир! Фильтр",
            "ms": "Привет, мир! Фильтр",
            "pl": "Привет, мир! Фильтр",
            "ru": "Привет, мир! Фильтр",
            "sc": "Привет, мир! Фильтр",
            "tc": "Привет, мир! Фильтр",
            "th": "Привет, мир! Фильтр",
            "tr": "Привет, мир! Фильтр",
            "vn": "Привет, мир! Фильтр"
        },
        "ERROR_MESSAGE": {
            "ar": "Поле \u0027Привет, мир!\u0027",
            "br": "Поле \u0027Привет, мир!\u0027",
            "en": "Hello, World! Error",
            "fr": "Поле \u0027Привет, мир!\u0027",
            "id": "Поле \u0027Привет, мир!\u0027",
            "it": "Поле \u0027Привет, мир!\u0027",
            "ja": "Поле \u0027Привет, мир!\u0027",
            "la": "Поле \u0027Привет, мир!\u0027",
            "ms": "Поле \u0027Привет, мир!\u0027",
            "pl": "Поле \u0027Привет, мир!\u0027",
            "ru": "Привет, мир! Ошибка",
            "sc": "Поле \u0027Привет, мир!\u0027",
            "tc": "Поле \u0027Привет, мир!\u0027",
            "th": "Поле \u0027Привет, мир!\u0027",
            "tr": "Поле \u0027Привет, мир!\u0027",
            "vn": "Поле \u0027Привет, мир!\u0027"
        },
        "HELP_MESSAGE": {
            "ar": "Поле \u0027Привет, мир!\u0027",
            "br": "Поле \u0027Привет, мир!\u0027",
            "en": "Hello, World! Help",
            "fr": "Поле \u0027Привет, мир!\u0027",
            "id": "Поле \u0027Привет, мир!\u0027",
            "it": "Поле \u0027Привет, мир!\u0027",
            "ja": "Поле \u0027Привет, мир!\u0027",
            "la": "Поле \u0027Привет, мир!\u0027",
            "ms": "Поле \u0027Привет, мир!\u0027",
            "pl": "Поле \u0027Привет, мир!\u0027",
            "ru": "Привет, мир! Помощь",
            "sc": "Поле \u0027Привет, мир!\u0027",
            "tc": "Поле \u0027Привет, мир!\u0027",
            "th": "Поле \u0027Привет, мир!\u0027",
            "tr": "Поле \u0027Привет, мир!\u0027",
            "vn": "Поле \u0027Привет, мир!\u0027"
        }
    },
    "time": {
        "start": 1724318753.341079,
        "finish": 1724318753.621247,
        "duration": 0.2801680564880371,
        "processing": 0.023567914962768555,
        "date_start": "2024-08-22T11:25:53+02:00",
        "date_finish": "2024-08-22T11:25:53+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`userfield`](#userfield) | Корневой элемент ответа, содержит информацию о пользовательском поле ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект userfield {#userfield}

Числовые значения `ID` и `SORT` приходят строками, в том числе у элементов `LIST`.

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../../data-types.md) | Идентификатор пользовательского поля ||
|| **ENTITY_ID**
[`string`](../../../data-types.md) | Строковый идентификатор привязки пользовательского поля к объекту.

Для полей контактов всегда `CRM_CONTACT` ||
|| **FIELD_NAME**
[`string`](../../../data-types.md) | Имя поля с префиксом `UF_CRM_`, уникальное в пределах контактов. По этому имени значение поля записывают и читают в методах контактов, например [crm.contact.update](../crm-contact-update.md) и [crm.contact.get](../crm-contact-get.md). Сам метод значения полей в контактах не возвращает ||
|| **USER_TYPE_ID**
[`string`](../../../data-types.md) | Тип данных пользовательского поля. Возможные значения:
- `string` — строка
- `integer` — целое число
- `double` — число
- `boolean` — да/нет
- `datetime` — дата/время
- `date` — дата
- `money` — деньги
- `url` — ссылка
- `address` — адрес
- `enumeration` — список
- `file` — файл
- `employee` — привязка к сотруднику
- `crm_status` — привязка к справочнику CRM
- `iblock_section` — привязка к разделам информационных блоков
- `iblock_element` — привязка к элементам информационных блоков
- `crm` — привязка к элементам CRM
- [пользовательские типы полей](../../universal/user-defined-fields/userfield-type.md)
||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний код. Если не задан — `null` ||
|| **SORT**
[`string`](../../../data-types.md) | Индекс сортировки ||
|| **MULTIPLE**
[`char`](../../../data-types.md) | Является ли поле множественным. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **MANDATORY**
[`char`](../../../data-types.md) | Является ли поле обязательным. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **SHOW_FILTER**
[`char`](../../../data-types.md) | Режим отображения поля в фильтре. Возможные значения:
- `N` — не показывать
- `I` — точное совпадение
- `E` — маска
- `S` — подстрока
||
|| **SHOW_IN_LIST**
[`char`](../../../data-types.md) | Показывать ли пользовательское поле в списке.

Влияет на набор колонок списка контактов по умолчанию. Пользователь может настроить колонки сам

Возможные значения:
- `Y` — да
- `N` — нет
||
|| **EDIT_IN_LIST**
[`char`](../../../data-types.md) | Разрешать ли редактирование пользователем. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **IS_SEARCHABLE**
[`char`](../../../data-types.md) | Участвуют ли значения поля в поиске.

Параметр ни на что не влияет в рамках `crm`.

Возможные значения:
- `Y` — да
- `N` — нет
||
|| **SETTINGS**
[`object`](../../../data-types.md) | Дополнительные параметры поля зависят от `USER_TYPE_ID`. Настройки, доступные при создании поля, описаны в разделе [Параметр SETTINGS](./crm-contact-userfield-add.md#settings). Ответ может содержать дополнительные настройки типа поля ||
|| **LIST**
[`uf_enum_element[]`](#uf_enum_element) | Список возможных значений. Возвращается для поля типа `enumeration` ||
|| **EDIT_FORM_LABEL**
[`lang_map`](../../data-types.md#lang-ids) | Подпись в форме редактирования на всех языках Битрикс24 ||
|| **LIST_COLUMN_LABEL**
[`lang_map`](../../data-types.md#lang-ids) | Заголовок в списке на всех языках Битрикс24 ||
|| **LIST_FILTER_LABEL**
[`lang_map`](../../data-types.md#lang-ids) | Подпись фильтра в списке на всех языках Битрикс24 ||
|| **ERROR_MESSAGE**
[`lang_map`](../../data-types.md#lang-ids) | Сообщение об ошибке на всех языках Битрикс24 ||
|| **HELP_MESSAGE**
[`lang_map`](../../data-types.md#lang-ids) | Помощь на всех языках Битрикс24 ||
|| **USER_TYPE_OWNER**
[`string`](../../../data-types.md) | `CLIENT_ID` приложения, которое обслуживает этот тип поля. Возвращается, если тип поля пользовательский. Если приложение не найдено — `null` ||
|#

#### Тип uf_enum_element {#uf_enum_element}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../../data-types.md) | Идентификатор элемента списка ||
|| **VALUE**
[`string`](../../../data-types.md) | Значение элемента списка ||
|| **SORT**
[`string`](../../../data-types.md) | Индекс сортировки ||
|| **DEF**
[`char`](../../../data-types.md) | Является ли элемент списка значением по умолчанию. Возможные значения:
- `Y` — да
- `N` — нет
||
|#

Внешний код элемента `XML_ID` метод не возвращает, его отдает [crm.contact.userfield.list](./crm-contact-userfield-list.md)

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
|| `400` | Пустое значение | `Access denied.` | У пользователя нет права чтения контактов или поле не привязано к контактам ||
|| `400` | Пустое значение | `ID is not defined or invalid.` | Параметр `id` не передан, не является числом или меньше либо равен нулю ||
|| `400` | `ERROR_NOT_FOUND` | `The entity with ID 'id' is not found.` | Пользовательское поле с переданным `id` не найдено ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-contact-userfield-add.md)
- [{#T}](./crm-contact-userfield-update.md)
- [{#T}](./crm-contact-userfield-list.md)
- [{#T}](./crm-contact-userfield-delete.md)
