# Создать пользовательское поле для лидов crm.lead.userfield.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Разрешить изменять настройки» в CRM

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте метод REST 3.0 [crm.lead.field.custom.add](../../rest-v3/fields/crm-entity-field-custom-add-rest-v3.md). Поля типов «Список» `enumeration` и «Файл» `file` метод REST 3.0 не создает, для них используйте этот метод.

{% endnote %}

Метод `crm.lead.userfield.add` создает новое пользовательское поле для лидов.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields**
[`object`](../../../data-types.md) | Объект формата:
```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

- `field_n` — название поля
- `value_n` — значение поля

Список доступных полей описан [ниже](#parameter-fields).

Неизвестный ключ в `fields` будет проигнорирован.

Если `fields` не передан, параметры поля можно передать на верхнем уровне запроса ||
|#

### Параметр fields {#parameter-fields}

Тип `lang_map` — [объект с подписями по языкам](../../data-types.md#lang-ids).

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **USER_TYPE_ID***
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
- `iblock_section` — привязка к разделам инф. блоков
- `iblock_element` — привязка к элементам инф. блоков
- `crm` — привязка к элементам CRM
- [пользовательские типы полей](../../universal/user-defined-fields/userfield-type.md)
||
|| **FIELD_NAME***
[`string`](../../../data-types.md) | Код поля. Уникальный в пределах лидов.

Система формирует полное имя поля с префиксом `UF_CRM_`:
- `MANAGER_NOTE` превращается в `UF_CRM_MANAGER_NOTE`
- `UF_MANAGER_NOTE` превращается в `UF_CRM_MANAGER_NOTE` — префикс `UF_` заменяется на `UF_CRM_`
- `UF_CRM_MANAGER_NOTE` остается без изменений

Полное имя поля вместе с префиксом `UF_CRM_` может содержать до `50` символов, а часть имени после префикса — до `43` символов; при превышении лимита метод вернет ошибку `ERROR_CORE`.

Допустимые символы: `A-Z`, `0-9` и `_`. Строчные буквы приводятся к заглавным, остальные символы вызывают ошибку `ERROR_CORE`||
|| **LABEL**
[`string`](../../../data-types.md) | Название пользовательского поля по умолчанию. Если не передать или передать пустую строку, используется полное имя поля с префиксом `UF_CRM_`.

Переданное значение будет выставлено в следующие поля: `LIST_FILTER_LABEL`, `LIST_COLUMN_LABEL`, `EDIT_FORM_LABEL`, `ERROR_MESSAGE`, `HELP_MESSAGE`, если в них не передано значение ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний код ||
|| **LIST_FILTER_LABEL**
```string | lang_map``` | Подпись фильтра в списке.

При передаче строки она будет проставлена для всех идентификаторов языка.

При передаче значения типа `lang_map` для всех непереданных языков будет проставлено значение из `LABEL` ||
|| **LIST_COLUMN_LABEL**
```string | lang_map``` | Заголовок в списке.

При передаче строки она будет проставлена для всех идентификаторов языка.

При передаче значения типа `lang_map` для всех непереданных языков будет проставлено значение из `LABEL` ||
|| **EDIT_FORM_LABEL**
```string | lang_map``` | Подпись в форме редактирования.

При передаче строки она будет проставлена для всех идентификаторов языка.

При передаче значения типа `lang_map` для всех непереданных языков будет проставлено значение из `LABEL` ||
|| **ERROR_MESSAGE**
```string | lang_map``` | Сообщение об ошибке||
|| **HELP_MESSAGE**
```string | lang_map``` | Помощь||
|| **MULTIPLE**
[`boolean`](../../../data-types.md) | Является ли поле множественным. Возможные значения:
- `Y` — да
- `N` — нет

Поля типа `boolean` не могут быть множественными.

По умолчанию `N` ||
|| **MANDATORY**
[`boolean`](../../../data-types.md) | Является ли поле обязательным. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `N` ||
|| **SHOW_FILTER**
[`boolean`](../../../data-types.md) | Показывать ли поле в фильтре. Возможные значения:
- `Y` — да
- `N` — нет

Для типов `money`, `url`, `address`, `file` и пользовательских типов значение `Y` игнорируется: фильтр отключается.

По умолчанию `N` ||
|| **SETTINGS**
[`object`](../../../data-types.md) | Дополнительные параметры поля. Для каждого типа поля `USER_TYPE_ID` существует свой пул доступных настроек, описание [ниже](#settings) ||
|| **LIST**
[`uf_enum_element[]`](#uf_enum_element) | Список возможных значений для пользовательского поля типа `enumeration`, описание [ниже](#uf_enum_element)

По умолчанию `[]` ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки. По умолчанию и при значении меньше либо равном нулю — `100` ||
|| **SHOW_IN_LIST**
[`boolean`](../../../data-types.md) | Показывать ли пользовательское поле в списке.

Данный параметр ни на что не влияет в рамках `crm`.

Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `Y` ||
|| **EDIT_IN_LIST**
[`boolean`](../../../data-types.md) | Разрешать ли редактирование пользователем. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `Y`. Значение `N` поддерживают не все типы полей в рамках `crm` ||
|| **IS_SEARCHABLE**
[`boolean`](../../../data-types.md) | Участвуют ли значения поля в поиске.

Данный параметр ни на что не влияет в рамках `crm`.

Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `N` ||
|#

### Параметр SETTINGS {#settings}

У каждого типа пользовательских полей существует свой набор дополнительных настроек. Данный метод поддерживает лишь те, что описаны ниже.

{% list tabs %}

- string

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`string`](../../../data-types.md) | Значение по умолчанию.

    По умолчанию `''` ||
    || **ROWS**
    [`integer`](../../../data-types.md) | Количество строк в поле ввода от `1` до `50`. Значения вне диапазона приводятся к его границам.

    По умолчанию `1` ||
    |#

- integer

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`integer`](../../../data-types.md) | Значение по умолчанию ||
    |#

- double

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`double`](../../../data-types.md) | Значение по умолчанию ||
    || **PRECISION**
    [`integer`](../../../data-types.md) | Количество знаков после запятой от `0` до `12`.

    По умолчанию `0`. При отрицательном значении используется `2` ||
    |#

- boolean

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`integer`](../../../data-types.md) | Значение по умолчанию, где `1` — да, `0` — нет.

    Возможные значения:
    - `> 0` → `1`
    - `<= 0` → `0`

    По умолчанию `0` ||
    || **DISPLAY**
    [`string`](../../../data-types.md) | Внешний вид. Возможные значения:
    - `CHECKBOX` — флажок
    - `RADIO` — радиокнопки
    - `DROPDOWN` — выпадающий список

    По умолчанию `CHECKBOX` ||
    |#

- date|datetime

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`object`](../../../data-types.md)  | Значение по умолчанию.
    Объект формата:
    ```
    {
        VALUE: datetime|date,
        TYPE: 'NONE'|'NOW'|'FIXED',
    }
    ```
    где:
    - `VALUE` — значение по умолчанию типа `datetime` или `date`
    - `TYPE` — тип значения по умолчанию:
      - `NONE` — не выставлять значение по умолчанию
      - `NOW` — использовать текущее время/дату
      - `FIXED` — использовать время/дату из `VALUE`

    Значение по умолчанию:
    ```
    {
        VALUE: '',
        TYPE: 'NONE',
    }
    ``` ||
    |#

- enumeration

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DISPLAY**
    [`string`](../../../data-types.md) | Внешний вид. Возможные значения:
    - `LIST` — список
    - `UI` — набираемый список
    - `CHECKBOX` — флажки
    - `DIALOG` — диалог выбора элементов

    По умолчанию `LIST` ||
    || **LIST_HEIGHT**
    [`integer`](../../../data-types.md) | Высота списка. Значения меньше `1` заменяются на `1`.

    По умолчанию `1` ||
    |#

- iblock_section|iblock_element

    #|
    || **Название**
    `тип` | **Описание** ||
    || **IBLOCK_TYPE_ID**
    [`string`](../../../data-types.md) | Идентификатор типа инфоблока.

    По умолчанию `''` ||
    || **IBLOCK_ID**
    [`integer`](../../../data-types.md) | Идентификатор инфоблока. Если не передать, привязка к инфоблоку не задана ||
    || **DEFAULT_VALUE**
    [`integer`](../../../data-types.md) | Идентификатор элемента или раздела по умолчанию. Если не передать, значение по умолчанию не задано ||
    || **DISPLAY**
    [`string`](../../../data-types.md) | Внешний вид. Возможные значения:
    - `DIALOG` — диалог
    - `UI` — набираемый список
    - `LIST` — список
    - `CHECKBOX` — флажки

    По умолчанию `LIST` ||
    || **LIST_HEIGHT**
    [`integer`](../../../data-types.md) | Высота списка. Значения меньше `1` заменяются на `1`.

    По умолчанию `1` ||
    || **ACTIVE_FILTER**
    [`boolean`](../../../data-types.md) | Показывать ли элементы с включенным флагом активности. Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    |#

- crm_status

    #|
    || **Название**
    `тип` | **Описание** ||
    || **ENTITY_TYPE**
    [`string`](../../../data-types.md) | Идентификатор типа справочника.

    Используйте [`crm.status.entity.types`](../../status/crm-status-entity-types.md), чтобы узнать возможные значения.

    По умолчанию `''` ||
    |#

- crm

    Если ни одна из следующих опций не равна `Y`, то по умолчанию будет включена привязка к лидам `LEAD = Y`.

    #|
    || **Название**
    `тип` | **Описание** ||
    || **LEAD**
    [`boolean`](../../../data-types.md) | Включена ли привязка к [Лидам](../index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N`, если включена другая привязка. Если ни одна привязка не включена — `Y` ||
    || **CONTACT**
    [`boolean`](../../../data-types.md) | Включена ли привязка к [Контактам](../../contacts/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    || **COMPANY**
    [`boolean`](../../../data-types.md) | Включена ли привязка к [Компаниям](../../companies/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    || **DEAL**
    [`boolean`](../../../data-types.md) | Включена ли привязка к [Сделкам](../../deals/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    |#

{% endlist %}

### Параметр LIST {#uf_enum_element}

#|
|| **Название**
`тип` | **Описание** ||
|| **VALUE**
[`string`](../../../data-types.md) | Значение элемента списка.

Элементы списка с пустым или отсутствующим `VALUE` будут проигнорированы ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки. Передавайте положительное целое число.

По умолчанию `500` ||
|| **DEF**
[`boolean`](../../../data-types.md) | Является ли элемент списка значением по умолчанию. Возможные значения:
- `Y` — да
- `N` — нет

Для множественного поля допустимо несколько `DEF = Y`. Для одиночного поля значением по умолчанию будет первый переданный элемент списка с `DEF = Y`.

По умолчанию `N` ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний код значения. Обязательно уникальный в рамках элементов списка пользовательского поля ||
|#


## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

### Пример создания пользовательского поля типа Строка

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"LABEL":"Поле Привет, мир!","USER_TYPE_ID":"string","FIELD_NAME":"HELLO_WORLD","MULTIPLE":"Y","MANDATORY":"Y","SHOW_FILTER":"Y","SETTINGS":{"DEFAULT_VALUE":"Привет, мир! Значение по умолчанию","ROWS":3},"SORT":1000,"EDIT_IN_LIST":"Y","LIST_FILTER_LABEL":"Привет, мир! Фильтр","LIST_COLUMN_LABEL":{"en":"Hello, World! Column","ru":"Привет, мир! Колонка","de":"Hallo, Welt! Spalte"},"EDIT_FORM_LABEL":{"en":"Hello, World! Edit","ru":"Привет, мир! Редактировать","de":"Hallo, Welt! Bearbeiten"},"ERROR_MESSAGE":{"en":"Hello, World! Error","ru":"Привет, мир! Ошибка","de":"Hallo, Welt! Fehler"},"HELP_MESSAGE":{"en":"Hello, World! Help","ru":"Привет, мир! Помощь","de":"Hallo, Welt! Hilfe"}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.lead.userfield.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"LABEL":"Поле Привет, мир!","USER_TYPE_ID":"string","FIELD_NAME":"HELLO_WORLD","MULTIPLE":"Y","MANDATORY":"Y","SHOW_FILTER":"Y","SETTINGS":{"DEFAULT_VALUE":"Привет, мир! Значение по умолчанию","ROWS":3},"SORT":1000,"EDIT_IN_LIST":"Y","LIST_FILTER_LABEL":"Привет, мир! Фильтр","LIST_COLUMN_LABEL":{"en":"Hello, World! Column","ru":"Привет, мир! Колонка","de":"Hallo, Welt! Spalte"},"EDIT_FORM_LABEL":{"en":"Hello, World! Edit","ru":"Привет, мир! Редактировать","de":"Hallo, Welt! Bearbeiten"},"ERROR_MESSAGE":{"en":"Hello, World! Error","ru":"Привет, мир! Ошибка","de":"Hallo, Welt! Fehler"},"HELP_MESSAGE":{"en":"Hello, World! Help","ru":"Привет, мир! Помощь","de":"Hallo, Welt! Hilfe"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.lead.userfield.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'crm.lead.userfield.add',
        params: {
          fields: {
            LABEL: 'Hello World field',
            USER_TYPE_ID: 'string',
            FIELD_NAME: 'HELLO_WORLD',
            MULTIPLE: 'Y',
            MANDATORY: 'Y',
            SHOW_FILTER: 'Y',
            SETTINGS: {
              DEFAULT_VALUE: 'Hello, World! Default value',
              ROWS: 3,
            },
            SORT: 1000,
            EDIT_IN_LIST: 'Y',
            LIST_FILTER_LABEL: 'Hello, World! Filter',
            LIST_COLUMN_LABEL: {
              en: 'Hello, World! Column',
              ru: 'Привет, мир! Колонка',
              de: 'Hallo, Welt! Spalte',
            },
            EDIT_FORM_LABEL: {
              en: 'Hello, World! Edit',
              ru: 'Привет, мир! Редактировать',
              de: 'Hallo, Welt! Bearbeiten',
            },
            ERROR_MESSAGE: {
              en: 'Hello, World! Error',
              ru: 'Привет, мир! Ошибка',
              de: 'Hallo, Welt! Fehler',
            },
            HELP_MESSAGE: {
              en: 'Hello, World! Help',
              ru: 'Привет, мир! Помощь',
              de: 'Hallo, Welt! Hilfe',
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created user field id:', result)
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
      async function addLeadUserField() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.lead.userfield.add',
            params: {
              fields: {
                LABEL: 'Hello World field',
                USER_TYPE_ID: 'string',
                FIELD_NAME: 'HELLO_WORLD',
                MULTIPLE: 'Y',
                MANDATORY: 'Y',
                SHOW_FILTER: 'Y',
                SETTINGS: {
                  DEFAULT_VALUE: 'Hello, World! Default value',
                  ROWS: 3,
                },
                SORT: 1000,
                EDIT_IN_LIST: 'Y',
                LIST_FILTER_LABEL: 'Hello, World! Filter',
                LIST_COLUMN_LABEL: {
                  en: 'Hello, World! Column',
                  ru: 'Привет, мир! Колонка',
                  de: 'Hallo, Welt! Spalte',
                },
                EDIT_FORM_LABEL: {
                  en: 'Hello, World! Edit',
                  ru: 'Привет, мир! Редактировать',
                  de: 'Hallo, Welt! Bearbeiten',
                },
                ERROR_MESSAGE: {
                  en: 'Hello, World! Error',
                  ru: 'Привет, мир! Ошибка',
                  de: 'Hallo, Welt! Fehler',
                },
                HELP_MESSAGE: {
                  en: 'Hello, World! Help',
                  ru: 'Привет, мир! Помощь',
                  de: 'Hallo, Welt! Hilfe',
                },
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Created user field id:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addLeadUserField)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.lead.userfield.add(
            fields={
                "LABEL": "Поле Привет, мир!",
                "USER_TYPE_ID": "string",
                "FIELD_NAME": "HELLO_WORLD",
                "MULTIPLE": "Y",
                "MANDATORY": "Y",
                "SHOW_FILTER": "Y",
                "SETTINGS": {
                    "DEFAULT_VALUE": "Привет, мир! Значение по умолчанию",
                    "ROWS": 3,
                },
                "SORT": 1000,
                "EDIT_IN_LIST": "Y",
                "LIST_FILTER_LABEL": "Привет, мир! Фильтр",
                "LIST_COLUMN_LABEL": {
                    "en": "Hello, World! Column",
                    "ru": "Привет, мир! Колонка",
                    "de": "Hallo, Welt! Spalte",
                },
                "EDIT_FORM_LABEL": {
                    "en": "Hello, World! Edit",
                    "ru": "Привет, мир! Редактировать",
                    "de": "Hallo, Welt! Bearbeiten",
                },
                "ERROR_MESSAGE": {
                    "en": "Hello, World! Error",
                    "ru": "Привет, мир! Ошибка",
                    "de": "Hallo, Welt! Fehler",
                },
                "HELP_MESSAGE": {
                    "en": "Hello, World! Help",
                    "ru": "Привет, мир! Помощь",
                    "de": "Hallo, Welt! Hilfe",
                },
            },
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
        $userfieldItemFields = [
            'FIELD_NAME' => 'HELLO_WORLD',
            'USER_TYPE_ID' => 'string',
            'LABEL' => 'Поле Привет, мир!',
            'SORT' => 1000,
            'MULTIPLE' => 'Y',
            'MANDATORY' => 'Y',
            'SHOW_FILTER' => 'Y',
            'EDIT_IN_LIST' => 'Y',
            'LIST_FILTER_LABEL' => 'Привет, мир! Фильтр',
            'LIST_COLUMN_LABEL' => [
                'en' => 'Hello, World! Column',
                'ru' => 'Привет, мир! Колонка',
                'de' => 'Hallo, Welt! Spalte',
            ],
            'EDIT_FORM_LABEL' => [
                'en' => 'Hello, World! Edit',
                'ru' => 'Привет, мир! Редактировать',
                'de' => 'Hallo, Welt! Bearbeiten',
            ],
            'ERROR_MESSAGE' => [
                'en' => 'Hello, World! Error',
                'ru' => 'Привет, мир! Ошибка',
                'de' => 'Hallo, Welt! Fehler',
            ],
            'HELP_MESSAGE' => [
                'en' => 'Hello, World! Help',
                'ru' => 'Привет, мир! Помощь',
                'de' => 'Hallo, Welt! Hilfe',
            ],
            'SETTINGS' => [
                'DEFAULT_VALUE' => 'Привет, мир! Значение по умолчанию',
                'ROWS' => 3,
            ],
        ];

        $result = $serviceBuilder
            ->getCRMScope()
            ->leadUserfield()
            ->add($userfieldItemFields);

        print($result->getId());
    } catch (Throwable $e) {
        print('Error: ' . $e->getMessage());
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.lead.userfield.add',
        {
            fields: {
                LABEL: 'Поле Привет, мир!',
                USER_TYPE_ID: 'string',
                FIELD_NAME: 'HELLO_WORLD',
                MULTIPLE: 'Y',
                MANDATORY: 'Y',
                SHOW_FILTER: 'Y',
                SETTINGS: {
                    DEFAULT_VALUE: 'Привет, мир! Значение по умолчанию',
                    ROWS: 3,
                },
                SORT: 1000,
                EDIT_IN_LIST: 'Y',
            },
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.lead.userfield.add',
        [
            'fields' => [
                'LABEL' => 'Поле Привет, мир!',
                'USER_TYPE_ID' => 'string',
                'FIELD_NAME' => 'HELLO_WORLD',
                'MULTIPLE' => 'Y',
                'MANDATORY' => 'Y',
                'SHOW_FILTER' => 'Y',
                'SETTINGS' => [
                    'DEFAULT_VALUE' => 'Привет, мир! Значение по умолчанию',
                    'ROWS' => 3,
                ],
                'SORT' => 1000,
                'EDIT_IN_LIST' => 'Y',
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.lead.userfield.add", b24.Params{
    	"fields": b24.Params{
    		"LABEL":        "Поле Привет, мир!",
    		"USER_TYPE_ID": "string",
    		"FIELD_NAME":   "HELLO_WORLD",
    		"MULTIPLE":     "Y",
    		"MANDATORY":    "Y",
    		"SHOW_FILTER":  "Y",
    		"SETTINGS": b24.Params{
    			"DEFAULT_VALUE": "Привет, мир! Значение по умолчанию",
    			"ROWS":          3,
    		},
    		"SORT":              1000,
    		"EDIT_IN_LIST":      "Y",
    		"LIST_FILTER_LABEL": "Привет, мир! Фильтр",
    		"LIST_COLUMN_LABEL": b24.Params{
    			"en": "Hello, World! Column",
    			"ru": "Привет, мир! Колонка",
    			"de": "Hallo, Welt! Spalte",
    		},
    		"EDIT_FORM_LABEL": b24.Params{
    			"en": "Hello, World! Edit",
    			"ru": "Привет, мир! Редактировать",
    			"de": "Hallo, Welt! Bearbeiten",
    		},
    		"ERROR_MESSAGE": b24.Params{
    			"en": "Hello, World! Error",
    			"ru": "Привет, мир! Ошибка",
    			"de": "Hallo, Welt! Fehler",
    		},
    		"HELP_MESSAGE": b24.Params{
    			"en": "Hello, World! Help",
    			"ru": "Привет, мир! Помощь",
    			"de": "Hallo, Welt! Hilfe",
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.lead.userfield.add: %w", err)
    }

    var newID b24.ID
    if err := json.Unmarshal(res.Result, &newID); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("идентификатор:", newID)
    ```

{% endlist %}

### Пример создания пользовательского поля типа Список

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"LABEL":"Пользовательское поле (список)","USER_TYPE_ID":"enumeration","FIELD_NAME":"ENUMERATION_EXAMPLE","MULTIPLE":"N","MANDATORY":"N","SHOW_FILTER":"Y","LIST":[{"VALUE":"Элемент списка #1","DEF":"Y","XML_ID":"XML_ID_1","SORT":100},{"VALUE":"Элемент списка #2","XML_ID":"XML_ID_2","SORT":200},{"VALUE":"Элемент списка #3","XML_ID":"XML_ID_3","SORT":300},{"VALUE":"Элемент списка #4","XML_ID":"XML_ID_4","SORT":400}],"SETTINGS":{"DISPLAY":"UI","LIST_HEIGHT":2},"SORT":2000}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.lead.userfield.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"LABEL":"Пользовательское поле (список)","USER_TYPE_ID":"enumeration","FIELD_NAME":"ENUMERATION_EXAMPLE","MULTIPLE":"N","MANDATORY":"N","SHOW_FILTER":"Y","LIST":[{"VALUE":"Элемент списка #1","DEF":"Y","XML_ID":"XML_ID_1","SORT":100},{"VALUE":"Элемент списка #2","XML_ID":"XML_ID_2","SORT":200},{"VALUE":"Элемент списка #3","XML_ID":"XML_ID_3","SORT":300},{"VALUE":"Элемент списка #4","XML_ID":"XML_ID_4","SORT":400}],"SETTINGS":{"DISPLAY":"UI","LIST_HEIGHT":2},"SORT":2000},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.lead.userfield.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'crm.lead.userfield.add',
        params: {
          fields: {
            LABEL: 'Custom field (list)',
            USER_TYPE_ID: 'enumeration',
            FIELD_NAME: 'ENUMERATION_EXAMPLE',
            MULTIPLE: 'N',
            MANDATORY: 'N',
            SHOW_FILTER: 'Y',
            LIST: [
              { VALUE: 'List item #1', DEF: 'Y', XML_ID: 'XML_ID_1', SORT: 100 },
              { VALUE: 'List item #2', XML_ID: 'XML_ID_2', SORT: 200 },
              { VALUE: 'List item #3', XML_ID: 'XML_ID_3', SORT: 300 },
              { VALUE: 'List item #4', XML_ID: 'XML_ID_4', SORT: 400 },
            ],
            SETTINGS: {
              DISPLAY: 'UI',
              LIST_HEIGHT: 2,
            },
            SORT: 2000,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created user field id:', result)
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
      async function addLeadUserField() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.lead.userfield.add',
            params: {
              fields: {
                LABEL: 'Custom field (list)',
                USER_TYPE_ID: 'enumeration',
                FIELD_NAME: 'ENUMERATION_EXAMPLE',
                MULTIPLE: 'N',
                MANDATORY: 'N',
                SHOW_FILTER: 'Y',
                LIST: [
                  { VALUE: 'List item #1', DEF: 'Y', XML_ID: 'XML_ID_1', SORT: 100 },
                  { VALUE: 'List item #2', XML_ID: 'XML_ID_2', SORT: 200 },
                  { VALUE: 'List item #3', XML_ID: 'XML_ID_3', SORT: 300 },
                  { VALUE: 'List item #4', XML_ID: 'XML_ID_4', SORT: 400 },
                ],
                SETTINGS: {
                  DISPLAY: 'UI',
                  LIST_HEIGHT: 2,
                },
                SORT: 2000,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Created user field id:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addLeadUserField)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.lead.userfield.add(
            fields={
                "LABEL": "Пользовательское поле (список)",
                "USER_TYPE_ID": "enumeration",
                "FIELD_NAME": "ENUMERATION_EXAMPLE",
                "MULTIPLE": "N",
                "MANDATORY": "N",
                "SHOW_FILTER": "Y",
                "LIST": [
                    {
                        "VALUE": "Элемент списка #1",
                        "DEF": "Y",
                        "XML_ID": "XML_ID_1",
                        "SORT": 100,
                    },
                    {
                        "VALUE": "Элемент списка #2",
                        "XML_ID": "XML_ID_2",
                        "SORT": 200,
                    },
                    {
                        "VALUE": "Элемент списка #3",
                        "XML_ID": "XML_ID_3",
                        "SORT": 300,
                    },
                    {
                        "VALUE": "Элемент списка #4",
                        "XML_ID": "XML_ID_4",
                        "SORT": 400,
                    },
                ],
                "SETTINGS": {
                    "DISPLAY": "UI",
                    "LIST_HEIGHT": 2,
                },
                "SORT": 2000,
            },
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
        $userfieldItemFields = [
            'LABEL' => 'Пользовательское поле (список)',
            'USER_TYPE_ID' => 'enumeration',
            'FIELD_NAME' => 'ENUMERATION_EXAMPLE',
            'MULTIPLE' => 'N',
            'MANDATORY' => 'N',
            'SHOW_FILTER' => 'Y',
            'LIST' => [
                ['VALUE' => 'Элемент списка #1', 'DEF' => 'Y', 'XML_ID' => 'XML_ID_1', 'SORT' => 100],
                ['VALUE' => 'Элемент списка #2', 'XML_ID' => 'XML_ID_2', 'SORT' => 200],
                ['VALUE' => 'Элемент списка #3', 'XML_ID' => 'XML_ID_3', 'SORT' => 300],
                ['VALUE' => 'Элемент списка #4', 'XML_ID' => 'XML_ID_4', 'SORT' => 400],
            ],
            'SETTINGS' => ['DISPLAY' => 'UI', 'LIST_HEIGHT' => 2],
            'SORT' => 2000,
        ];

        $result = $serviceBuilder
            ->getCRMScope()
            ->leadUserfield()
            ->add($userfieldItemFields);

        print($result->getId());
    } catch (Throwable $e) {
        print('Error: ' . $e->getMessage());
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.lead.userfield.add',
        {
            fields: {
                LABEL: 'Пользовательское поле (список)',
                USER_TYPE_ID: 'enumeration',
                FIELD_NAME: 'ENUMERATION_EXAMPLE',
                MULTIPLE: 'N',
                MANDATORY: 'N',
                SHOW_FILTER: 'Y',
                LIST: [
                    { VALUE: 'Элемент списка #1', DEF: 'Y', XML_ID: 'XML_ID_1', SORT: 100 },
                    { VALUE: 'Элемент списка #2', XML_ID: 'XML_ID_2', SORT: 200 },
                    { VALUE: 'Элемент списка #3', XML_ID: 'XML_ID_3', SORT: 300 },
                    { VALUE: 'Элемент списка #4', XML_ID: 'XML_ID_4', SORT: 400 },
                ],
                SETTINGS: { DISPLAY: 'UI', LIST_HEIGHT: 2 },
                SORT: 2000,
            },
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.lead.userfield.add',
        [
            'fields' => [
                'LABEL' => 'Пользовательское поле (список)',
                'USER_TYPE_ID' => 'enumeration',
                'FIELD_NAME' => 'ENUMERATION_EXAMPLE',
                'MULTIPLE' => 'N',
                'MANDATORY' => 'N',
                'SHOW_FILTER' => 'Y',
                'LIST' => [
                    ['VALUE' => 'Элемент списка #1', 'DEF' => 'Y', 'XML_ID' => 'XML_ID_1', 'SORT' => 100],
                    ['VALUE' => 'Элемент списка #2', 'XML_ID' => 'XML_ID_2', 'SORT' => 200],
                    ['VALUE' => 'Элемент списка #3', 'XML_ID' => 'XML_ID_3', 'SORT' => 300],
                    ['VALUE' => 'Элемент списка #4', 'XML_ID' => 'XML_ID_4', 'SORT' => 400],
                ],
                'SETTINGS' => [
                    'DISPLAY' => 'UI',
                    'LIST_HEIGHT' => 2,
                ],
                'SORT' => 2000,
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.lead.userfield.add", b24.Params{
    	"fields": b24.Params{
    		"LABEL":        "Пользовательское поле (список)",
    		"USER_TYPE_ID": "enumeration",
    		"FIELD_NAME":   "ENUMERATION_EXAMPLE",
    		"MULTIPLE":     "N",
    		"MANDATORY":    "N",
    		"SHOW_FILTER":  "Y",
    		"LIST": []b24.Params{
    			{
    				"VALUE":  "Элемент списка #1",
    				"DEF":    "Y",
    				"XML_ID": "XML_ID_1",
    				"SORT":   100,
    			},
    			{
    				"VALUE":  "Элемент списка #2",
    				"XML_ID": "XML_ID_2",
    				"SORT":   200,
    			},
    			{
    				"VALUE":  "Элемент списка #3",
    				"XML_ID": "XML_ID_3",
    				"SORT":   300,
    			},
    			{
    				"VALUE":  "Элемент списка #4",
    				"XML_ID": "XML_ID_4",
    				"SORT":   400,
    			},
    		},
    		"SETTINGS": b24.Params{
    			"DISPLAY":     "UI",
    			"LIST_HEIGHT": 2,
    		},
    		"SORT": 2000,
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.lead.userfield.add: %w", err)
    }

    var newID b24.ID
    if err := json.Unmarshal(res.Result, &newID); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("идентификатор:", newID)
    ```

{% endlist %}


## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 6997,
    "time": {
        "start": 1753789240.8146,
        "finish": 1753789241.058695,
        "duration": 0.2440950870513916,
        "processing": 0.19217395782470703,
        "date_start": "2025-07-29T14:40:40+03:00",
        "date_finish": "2025-07-29T14:40:41+03:00",
        "operating_reset_at": 1753789840,
        "operating": 0.19216084480285645
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Корневой элемент ответа, содержит идентификатор созданного пользовательского поля ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "The 'USER_TYPE_ID' field is not found."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | Access denied. | Нет права «Разрешить изменять настройки» в CRM ||
|| `400` | Пустое значение | The 'FIELD_NAME' field is not found. | Либо передан пустой `FIELD_NAME`, либо он не передан вовсе ||
|| `400` | `ERROR_CORE` | Имя поля слишком длинное (больше 50-ти символов). | Полное имя поля после добавления или замены префикса содержит более 50 символов ||
|| `400` | `ERROR_CORE` | Имя поля содержит недопустимые символы. Допустимыми являются: A-Z, 0-9 и _. | Переданный `FIELD_NAME` содержит символы, кроме латинских букв, цифр и `_` ||
|| `400` | Пустое значение | The 'USER_TYPE_ID' field is not found. | Либо передан пустой `USER_TYPE_ID`, либо он не передан вовсе ||
|| `400` | `ERROR_CORE` | Указан неверный пользовательский тип. | Переданный `USER_TYPE_ID` не существует ||
|| `400` | `ERROR_CORE` | Элемент списка со значением XML_ID=xml_id уже существует. | `XML_ID` элементов списка совпадают, в том числе созданные автоматически для одинаковых `VALUE` ||
|| `400` | `ERROR_CORE` | Поле UF_CRM_EXAMPLE для объекта CRM_LEAD уже существует. | Поле с таким полным именем у лидов уже есть. Укажите другой `FIELD_NAME` ||
|#

Если при сохранении элементов списка возникла ошибка, поле может остаться созданным без элементов списка: перед повторной попыткой проверьте его методом [crm.lead.userfield.list](./crm-lead-userfield-list.md) и при необходимости удалите методом [crm.lead.userfield.delete](./crm-lead-userfield-delete.md).

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-lead-userfield-update.md)
- [{#T}](./crm-lead-userfield-get.md)
- [{#T}](./crm-lead-userfield-list.md)
- [{#T}](./crm-lead-userfield-delete.md)
