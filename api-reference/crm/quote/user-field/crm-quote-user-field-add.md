# Создать пользовательское поле для предложений crm.quote.userfield.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Разрешить изменять настройки» в CRM

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте метод REST 3.0 [crm.quote.field.custom.add](../../rest-v3/fields/crm-entity-field-custom-add-rest-v3.md). Поля типов «Список» `enumeration` и «Файл» `file` метод REST 3.0 не создает, для них используйте этот метод.

{% endnote %}

Метод `crm.quote.userfield.add` создает пользовательское поле во всех предложениях Битрикс24 и возвращает его идентификатор. Тип `USER_TYPE_ID`, код `FIELD_NAME` и множественность `MULTIPLE` после создания изменить нельзя.

В REST 3.0 поле создает метод [crm.quote.field.custom.add](../../rest-v3/fields/crm-entity-field-custom-add-rest-v3.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
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

Некорректное поле в `fields` будет проигнорировано ||
|#

### Параметр fields {#parameter-fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **USER_TYPE_ID***
[`string`](../../../data-types.md) | Тип данных пользовательского поля. Список типов, доступных в Битрикс24, возвращает метод [crm.userfield.types](../../universal/user-defined-fields/crm-userfield-types.md). Возможные значения:
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
|| **FIELD_NAME***
[`string`](../../../data-types.md) | Код поля, уникальный среди полей предложений. Из кода Битрикс24 собирает полное имя с префиксом `UF_CRM_`:
- `MANAGER_NOTE` превращается в `UF_CRM_MANAGER_NOTE`
- `UF_MANAGER_NOTE` превращается в `UF_CRM_MANAGER_NOTE` — префикс `UF_` заменяется на `UF_CRM_`
- `UF_CRM_MANAGER_NOTE` остается без изменений

Значение поля записывают и читают универсальные методы [crm.item.update](../../universal/crm-item-update.md) и [crm.item.get](../../universal/crm-item-get.md) с `entityTypeId = 7`. В них имя поля пишется в camelCase: `UF_CRM_MANAGER_NOTE` превращается в `ufCrmManagerNote`. Методы [crm.quote.update](../crm-quote-update.md) и [crm.quote.get](../crm-quote-get.md) работают с полным именем, но их развитие остановлено.

Полное имя — до `50` символов вместе с префиксом, то есть код без префикса — до `43` символов. Если код длиннее, метод вернет ошибку `ERROR_CORE`.

В коде допустимы `A-Z`, `0-9` и `_`. Строчные буквы метод переведет в заглавные, на остальные символы вернет ошибку `ERROR_CORE` ||
|| **LABEL**
[`string`](../../../data-types.md) | Название поля. Если `LIST_FILTER_LABEL`, `LIST_COLUMN_LABEL`, `EDIT_FORM_LABEL`, `ERROR_MESSAGE` или `HELP_MESSAGE` не переданы, метод запишет в них `LABEL`.

Если `LABEL` не передан, вместо него используется полное имя поля, например `UF_CRM_MANAGER_NOTE` ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний код ||
|| **LIST_FILTER_LABEL**
[`string`](../../../data-types.md)\|[`lang_map`](../../data-types.md#lang-ids) | Подпись фильтра в списке.

Что запишет метод:
- строка — одна подпись для всех языков
- `lang_map` — подписи на переданных языках, на остальных — значение `LABEL`
- параметр не передан — значение `LABEL` на всех языках ||
|| **LIST_COLUMN_LABEL**
[`string`](../../../data-types.md)\|[`lang_map`](../../data-types.md#lang-ids) | Заголовок в списке.

Что запишет метод:
- строка — одна подпись для всех языков
- `lang_map` — подписи на переданных языках, на остальных — значение `LABEL`
- параметр не передан — значение `LABEL` на всех языках ||
|| **EDIT_FORM_LABEL**
[`string`](../../../data-types.md)\|[`lang_map`](../../data-types.md#lang-ids) | Подпись в форме редактирования.

Что запишет метод:
- строка — одна подпись для всех языков
- `lang_map` — подписи на переданных языках, на остальных — значение `LABEL`
- параметр не передан — значение `LABEL` на всех языках ||
|| **ERROR_MESSAGE**
[`string`](../../../data-types.md)\|[`lang_map`](../../data-types.md#lang-ids) | Сообщение об ошибке. Строка и `lang_map` обрабатываются так же, как у `LIST_FILTER_LABEL` ||
|| **HELP_MESSAGE**
[`string`](../../../data-types.md)\|[`lang_map`](../../data-types.md#lang-ids) | Помощь. Строка и `lang_map` обрабатываются так же, как у `LIST_FILTER_LABEL` ||
|| **MULTIPLE**
[`char`](../../../data-types.md) | Множественное ли поле — хранит ли оно несколько значений. Возможные значения:
- `Y` — да
- `N` — нет

Поля типа `boolean` не могут быть множественными: если передать `MULTIPLE = Y`, метод без ошибки сохранит `N`.

По умолчанию `N` ||
|| **MANDATORY**
[`char`](../../../data-types.md) | Является ли поле обязательным. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `N` ||
|| **SHOW_FILTER**
[`char`](../../../data-types.md) | Показывать ли поле в фильтре. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `N`.

Вместо `Y` метод сохранит режим фильтра — его вернут [crm.quote.userfield.get](./crm-quote-user-field-get.md) и [crm.quote.userfield.list](./crm-quote-user-field-list.md):
- тип `employee` — `I`, точное совпадение
- типы `money`, `url`, `address`, `file` и [пользовательские типы](../../universal/user-defined-fields/userfield-type.md) — всегда `N`
- остальные типы — `E`, маска ||
|| **SETTINGS**
[`object`](../../../data-types.md) | Дополнительные параметры поля. Набор настроек зависит от типа поля `USER_TYPE_ID`, описание [ниже](#settings) ||
|| **LIST**
[`uf_enum_element[]`](#uf_enum_element) | Список возможных значений для пользовательского поля типа `enumeration`, описание [ниже](#uf_enum_element)

По умолчанию `[]` ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки. Обязательно больше нуля.

По умолчанию `100` ||
|| **SHOW_IN_LIST**
[`char`](../../../data-types.md) | Показывать ли поле в списке.

В CRM параметр не используется.

Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `Y` ||
|| **EDIT_IN_LIST**
[`char`](../../../data-types.md) | Разрешать ли редактирование пользователем. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `Y`. Значение `N` поддерживают не все типы полей в рамках `crm` ||
|| **IS_SEARCHABLE**
[`char`](../../../data-types.md) | Участвуют ли значения поля в поиске.

В CRM параметр не используется.

Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `N` ||
|#

### Параметр SETTINGS {#settings}

Набор настроек зависит от типа поля. Метод сохраняет только настройки из вкладок ниже, остальные ключи `SETTINGS` пропускает. Для типов `money`, `url`, `address`, `file`, `employee` и пользовательских типов метод не учитывает `SETTINGS` вовсе, и поле получает настройки типа по умолчанию.

Метод [crm.quote.userfield.get](./crm-quote-user-field-get.md) возвращает сохраненные настройки поля, метод [crm.userfield.settings.fields](../../universal/user-defined-fields/crm-userfield-settings-fields.md) — перечень настроек типа. Передать в `SETTINGS` можно только настройки из вкладок ниже.

{% list tabs %}

- string

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`string`](../../../data-types.md) | Значение по умолчанию.

    По умолчанию `''` ||
    || **ROWS**
    [`integer`](../../../data-types.md) | Количество строк в поле ввода. Обязательно больше нуля.

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
    [`integer`](../../../data-types.md) | Точность числа. Обязательно больше или равно 0.

    По умолчанию `0` ||
    |#

- boolean

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`integer`](../../../data-types.md) | Значение по умолчанию: `1` — да, `0` — нет. Число от `1` и больше метод сохранит как `1`, от `0` и меньше — как `0`.

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
    [`object`](../../../data-types.md) | Значение по умолчанию.
    Объект формата:
    ```
    {
        VALUE: datetime|date,
        TYPE: 'NONE'|'NOW'|'FIXED',
    }
    ```
    где:
    - `VALUE` — значение по умолчанию типа `datetime` или `date` в формате ISO 8601, например `2026-10-28T10:00:00+03:00`
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
    [`integer`](../../../data-types.md) | Высота списка. Обязательно больше нуля.

    Доступен только при `DISPLAY = LIST` или `DISPLAY = UI`.

    По умолчанию `1` ||
    |#

- iblock_section|iblock_element

    #|
    || **Название**
    `тип` | **Описание** ||
    || **IBLOCK_TYPE_ID**
    [`string`](../../../data-types.md) | Идентификатор типа информационного блока.

    По умолчанию `''` ||
    || **IBLOCK_ID**
    [`string`](../../../data-types.md) | Идентификатор информационного блока.

    По умолчанию `0` ||
    || **DEFAULT_VALUE**
    [`string`](../../../data-types.md) | Значение по умолчанию.

    По умолчанию `''` ||
    || **DISPLAY**
    [`string`](../../../data-types.md) | Внешний вид. Возможные значения:
    - `DIALOG` — диалог
    - `UI` — набираемый список
    - `LIST` — список
    - `CHECKBOX` — флажки

    По умолчанию `LIST` ||
    || **LIST_HEIGHT**
    [`integer`](../../../data-types.md) | Высота списка. Обязательно больше нуля.

    По умолчанию `1` ||
    || **ACTIVE_FILTER**
    [`char`](../../../data-types.md) | Показывать ли элементы с включенным флагом активности. Возможные значения:
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

    Если все привязки выключены, Битрикс24 включит привязку к лидам `LEAD = Y`.

    #|
    || **Название**
    `тип` | **Описание** ||
    || **LEAD**
    [`char`](../../../data-types.md) | Включена ли привязка к [лидам](../../leads/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    || **CONTACT**
    [`char`](../../../data-types.md) | Включена ли привязка к [контактам](../../contacts/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    || **COMPANY**
    [`char`](../../../data-types.md) | Включена ли привязка к [компаниям](../../companies/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    || **DEAL**
    [`char`](../../../data-types.md) | Включена ли привязка к [сделкам](../../deals/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    |#

{% endlist %}

### Параметр LIST {#uf_enum_element}

{% note warning %}

Если элементы `LIST` не сохранились, например из-за повторяющегося `XML_ID`, метод ответит ошибкой, но поле уже будет создано — без элементов списка. Перед повторным вызовом найдите поле методом [crm.quote.userfield.list](./crm-quote-user-field-list.md) и добавьте элементы методом [crm.quote.userfield.update](./crm-quote-user-field-update.md) или удалите поле.

{% endnote %}

#|
|| **Название**
`тип` | **Описание** ||
|| **VALUE**
[`string`](../../../data-types.md) | Значение элемента списка.

Элементы списка с пустым или отсутствующим `VALUE` будут проигнорированы ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки. Значение `0` и меньше не сохраняется, вместо него элемент получает `500`.

По умолчанию `500` ||
|| **DEF**
[`char`](../../../data-types.md) | Является ли элемент списка значением по умолчанию. Возможные значения:
- `Y` — да
- `N` — нет

У множественного поля значений по умолчанию может быть несколько. У поля с `MULTIPLE = N` значением по умолчанию станет первый переданный элемент с `DEF = Y`.

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.quote.userfield.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"LABEL":"Поле Привет, мир!","USER_TYPE_ID":"string","FIELD_NAME":"HELLO_WORLD","MULTIPLE":"Y","MANDATORY":"Y","SHOW_FILTER":"Y","SETTINGS":{"DEFAULT_VALUE":"Привет, мир! Значение по умолчанию","ROWS":3},"SORT":1000,"EDIT_IN_LIST":"Y","LIST_FILTER_LABEL":"Привет, мир! Фильтр","LIST_COLUMN_LABEL":{"en":"Hello, World! Column","ru":"Привет, мир! Колонка","de":"Hallo, Welt! Spalte"},"EDIT_FORM_LABEL":{"en":"Hello, World! Edit","ru":"Привет, мир! Редактировать","de":"Hallo, Welt! Bearbeiten"},"ERROR_MESSAGE":{"en":"Hello, World! Error","ru":"Привет, мир! Ошибка","de":"Hallo, Welt! Fehler"},"HELP_MESSAGE":{"en":"Hello, World! Help","ru":"Привет, мир! Помощь","de":"Hallo, Welt! Hilfe"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.quote.userfield.add
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
        method: 'crm.quote.userfield.add',
        params: {
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
            LIST_FILTER_LABEL: 'Привет, мир! Фильтр',
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
        console.info('Created userfield ID:', result)
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
      async function addStringQuoteUserfield() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.quote.userfield.add',
            params: {
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
                LIST_FILTER_LABEL: 'Привет, мир! Фильтр',
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
          console.info('Created userfield ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addStringQuoteUserfield)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.quote.userfield.add(
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
            'SORT' => 1000,
            'MULTIPLE' => 'Y',
            'MANDATORY' => 'Y',
            'SHOW_FILTER' => 'Y',
            'EDIT_IN_LIST' => 'Y',
            'LIST_FILTER_LABEL' => 'Привет, мир! Фильтр',
            'LABEL' => 'Поле Привет, мир!',
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
            ->quoteUserfield()
            ->add($userfieldItemFields);

        print($result->getId());
    } catch (Throwable $e) {
        print('Error: ' . $e->getMessage());
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.quote.userfield.add',
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
                LIST_FILTER_LABEL: 'Привет, мир! Фильтр',
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
        'crm.quote.userfield.add',
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
    res, err := client.Core().Call(ctx, "crm.quote.userfield.add", b24.Params{
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
    	return fmt.Errorf("crm.quote.userfield.add: %w", err)
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
    -d '{"fields":{"LABEL":"Пользовательское поле (список)","USER_TYPE_ID":"enumeration","FIELD_NAME":"ENUM_EXAMPLE","MULTIPLE":"N","MANDATORY":"N","SHOW_FILTER":"Y","LIST":[{"VALUE":"Элемент списка #1","DEF":"Y","XML_ID":"XML_ID_1","SORT":100},{"VALUE":"Элемент списка #2","XML_ID":"XML_ID_2","SORT":200},{"VALUE":"Элемент списка #3","XML_ID":"XML_ID_3","SORT":300},{"VALUE":"Элемент списка #4","XML_ID":"XML_ID_4","SORT":400}],"SETTINGS":{"DISPLAY":"UI","LIST_HEIGHT":2},"SORT":2000}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.quote.userfield.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"LABEL":"Пользовательское поле (список)","USER_TYPE_ID":"enumeration","FIELD_NAME":"ENUM_EXAMPLE","MULTIPLE":"N","MANDATORY":"N","SHOW_FILTER":"Y","LIST":[{"VALUE":"Элемент списка #1","DEF":"Y","XML_ID":"XML_ID_1","SORT":100},{"VALUE":"Элемент списка #2","XML_ID":"XML_ID_2","SORT":200},{"VALUE":"Элемент списка #3","XML_ID":"XML_ID_3","SORT":300},{"VALUE":"Элемент списка #4","XML_ID":"XML_ID_4","SORT":400}],"SETTINGS":{"DISPLAY":"UI","LIST_HEIGHT":2},"SORT":2000},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.quote.userfield.add
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
        method: 'crm.quote.userfield.add',
        params: {
          fields: {
            LABEL: 'Пользовательское поле (список)',
            USER_TYPE_ID: 'enumeration',
            FIELD_NAME: 'ENUM_EXAMPLE',
            MULTIPLE: 'N',
            MANDATORY: 'N',
            SHOW_FILTER: 'Y',
            LIST: [
              {
                VALUE: 'Элемент списка #1',
                DEF: 'Y',
                XML_ID: 'XML_ID_1',
                SORT: 100,
              },
              {
                VALUE: 'Элемент списка #2',
                XML_ID: 'XML_ID_2',
                SORT: 200,
              },
              {
                VALUE: 'Элемент списка #3',
                XML_ID: 'XML_ID_3',
                SORT: 300,
              },
              {
                VALUE: 'Элемент списка #4',
                XML_ID: 'XML_ID_4',
                SORT: 400,
              },
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
        console.info('Created userfield ID:', result)
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
      async function addEnumerationQuoteUserfield() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.quote.userfield.add',
            params: {
              fields: {
                LABEL: 'Пользовательское поле (список)',
                USER_TYPE_ID: 'enumeration',
                FIELD_NAME: 'ENUM_EXAMPLE',
                MULTIPLE: 'N',
                MANDATORY: 'N',
                SHOW_FILTER: 'Y',
                LIST: [
                  {
                    VALUE: 'Элемент списка #1',
                    DEF: 'Y',
                    XML_ID: 'XML_ID_1',
                    SORT: 100,
                  },
                  {
                    VALUE: 'Элемент списка #2',
                    XML_ID: 'XML_ID_2',
                    SORT: 200,
                  },
                  {
                    VALUE: 'Элемент списка #3',
                    XML_ID: 'XML_ID_3',
                    SORT: 300,
                  },
                  {
                    VALUE: 'Элемент списка #4',
                    XML_ID: 'XML_ID_4',
                    SORT: 400,
                  },
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
          console.info('Created userfield ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addEnumerationQuoteUserfield)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.quote.userfield.add(
            fields={
                "LABEL": "Пользовательское поле (список)",
                "USER_TYPE_ID": "enumeration",
                "FIELD_NAME": "ENUM_EXAMPLE",
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
            // PHP SDK принимает код поля не длиннее 13 символов
            'FIELD_NAME' => 'ENUM_EXAMPLE',
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
            ->quoteUserfield()
            ->add($userfieldItemFields);

        print($result->getId());
    } catch (Throwable $e) {
        print('Error: ' . $e->getMessage());
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.quote.userfield.add',
        {
            fields: {
                LABEL: 'Пользовательское поле (список)',
                USER_TYPE_ID: 'enumeration',
                FIELD_NAME: 'ENUM_EXAMPLE',
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
        'crm.quote.userfield.add',
        [
            'fields' => [
                'LABEL' => 'Пользовательское поле (список)',
                'USER_TYPE_ID' => 'enumeration',
                'FIELD_NAME' => 'ENUM_EXAMPLE',
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
    res, err := client.Core().Call(ctx, "crm.quote.userfield.add", b24.Params{
    	"fields": b24.Params{
    		"LABEL":        "Пользовательское поле (список)",
    		"USER_TYPE_ID": "enumeration",
    		"FIELD_NAME":   "ENUM_EXAMPLE",
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
    	return fmt.Errorf("crm.quote.userfield.add: %w", err)
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

Если не переданы и `USER_TYPE_ID`, и `FIELD_NAME`, обе ошибки приходят в одном `error_description` через перевод строки.

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | `Access denied.` | У пользователя нет права «Разрешить изменять настройки» в CRM ||
|| `400` | Пустое значение | `The 'FIELD_NAME' field is not found.` | `FIELD_NAME` не передан или пустой ||
|| `400` | `ERROR_CORE` | `Имя поля слишком длинное (больше 50-ти символов).` | Полное имя поля вместе с префиксом `UF_CRM_` содержит более 50 символов, то есть код без префикса длиннее 43 символов ||
|| `400` | `ERROR_CORE` | `Имя поля содержит недопустимые символы. Допустимыми являются: A-Z, 0-9 и _.` | Переданный `FIELD_NAME` содержит символы, кроме `A-Z`, `0-9` и `_` ||
|| `400` | Пустое значение | `The 'USER_TYPE_ID' field is not found.` | `USER_TYPE_ID` не передан или пустой ||
|| `400` | `ERROR_CORE` | `Указан неверный пользовательский тип.` | Переданный `USER_TYPE_ID` не существует ||
|| `400` | `ERROR_CORE` | `Поле UF_CRM_CODE для объекта CRM_QUOTE уже существует.` | Поле с таким `FIELD_NAME` у предложений уже есть ||
|| `400` | `ERROR_CORE` | `Элемент списка со значением XML_ID=xml_id уже существует.` | `XML_ID` повторяется у элементов `LIST` ||
|| `500` | `INTERNAL_SERVER_ERROR` | Текст зависит от причины | У предложений уже 1016 пользовательских полей или создание поля не уложилось в `max_execution_time`. Подробнее — в разделе [Ошибки при работе с пользовательскими полями](./index.md#errors) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-quote-user-field-update.md)
- [{#T}](./crm-quote-user-field-get.md)
- [{#T}](./crm-quote-user-field-list.md)
- [{#T}](./crm-quote-user-field-delete.md)
- [{#T}](../../universal/crm-item-update.md)
- [{#T}](./index.md)
