# Создать пользовательское поле для контактов crm.contact.userfield.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Разрешить изменять настройки» в CRM

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте метод REST 3.0 [crm.contact.field.custom.add](../../rest-v3/fields/crm-entity-field-custom-add-rest-v3.md). Поля типов «Список» `enumeration`, «Файл» `file` и [пользовательских типов](../../universal/user-defined-fields/userfield-type.md) метод REST 3.0 не создает, для них используйте этот метод.

{% endnote %}

Метод `crm.contact.userfield.add` создает новое пользовательское поле для контактов.

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

где:
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
[`string`](../../../data-types.md) | Тип данных пользовательского поля. Список типов, доступных в Битрикс24, возвращает метод [crm.userfield.types](../../universal/user-defined-fields/crm-userfield-types.md).

Возможные значения:
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
[`string`](../../../data-types.md) | Код поля. Уникальный в пределах контактов.

Полное имя поля с префиксом — ключ, по которому значение записывают методом [crm.contact.update](../crm-contact-update.md) и читают методом [crm.contact.get](../crm-contact-get.md).

К коду всегда добавляется префикс `UF_CRM_`, полное имя поля система собирает сама:
- `MANAGER_NOTE` превращается в `UF_CRM_MANAGER_NOTE`
- `UF_MANAGER_NOTE` превращается в `UF_CRM_MANAGER_NOTE` — префикс `UF_` заменяется на `UF_CRM_`
- `UF_CRM_MANAGER_NOTE` остается без изменений

Ограничение длины — до `50` символов вместе с префиксом `UF_CRM_`, то есть до `43` символов после префикса. Если полное имя длиннее, метод вернет ошибку `ERROR_CORE`.

Допустимые символы: `A-Z`, `0-9` и `_`. Строчные буквы приводятся к заглавным, остальные символы вызывают ошибку `ERROR_CORE`
||
|| **LABEL**
[`string`](../../../data-types.md) | Название пользовательского поля по умолчанию. Если `LABEL` не передан или пуст, используется полное имя поля с префиксом `UF_CRM_`.

Переданное значение будет выставлено в следующие поля: `LIST_FILTER_LABEL`, `LIST_COLUMN_LABEL`, `EDIT_FORM_LABEL`, `ERROR_MESSAGE`, `HELP_MESSAGE`, если в них не передано значение ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний код ||
|| **LIST_FILTER_LABEL**
```string | lang_map``` | Подпись фильтра в списке.

При передаче строки она будет проставлена для всех идентификаторов языка.

При передаче значения типа `lang_map` для всех непереданных языков будет проставлено значение из `LABEL`.

По умолчанию значение, переданное в `LABEL`, проставляется для всех идентификаторов языка ||
|| **LIST_COLUMN_LABEL**
```string | lang_map``` | Заголовок в списке. Строка и `lang_map` обрабатываются так же, как у `LIST_FILTER_LABEL` ||
|| **EDIT_FORM_LABEL**
```string | lang_map``` | Подпись в форме редактирования. Строка и `lang_map` обрабатываются так же, как у `LIST_FILTER_LABEL` ||
|| **ERROR_MESSAGE**
```string | lang_map``` | Сообщение об ошибке. Строка и `lang_map` обрабатываются так же, как у `LIST_FILTER_LABEL` ||
|| **HELP_MESSAGE**
```string | lang_map``` | Помощь. Строка и `lang_map` обрабатываются так же, как у `LIST_FILTER_LABEL` ||
|| **MULTIPLE**
[`char`](../../../data-types.md) | Является ли поле множественным. Возможные значения:
- `Y` — да
- `N` — нет

Поля типа `boolean` не могут быть множественными.

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

При передаче `Y` сохраняется `E` — фильтрация по маске; для поля типа `employee` сохраняется `I` — точное совпадение. Для типов `money`, `url`, `address`, `file` и пользовательских типов метод устанавливает `N`, даже если передано `Y`.

По умолчанию `N` ||
|| **SETTINGS**
[`object`](../../../data-types.md) | Дополнительные параметры поля. Для каждого типа поля (`USER_TYPE_ID`) существует свой набор настроек, они описаны [ниже](#settings) ||
|| **LIST**
[`uf_enum_element[]`](#uf_enum_element) | Список возможных значений для пользовательского поля типа `enumeration`. Для полей других типов параметр не используется.

По умолчанию `[]` ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки. Если значение не передано или не больше нуля, используется `100` ||
|| **SHOW_IN_LIST**
[`char`](../../../data-types.md) | Показывать ли пользовательское поле в списке.

Влияет на набор колонок списка контактов по умолчанию. Пользователь может настроить колонки сам

Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `Y` ||
|| **EDIT_IN_LIST**
[`char`](../../../data-types.md) | Разрешать ли редактирование пользователем. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `Y` ||
|| **IS_SEARCHABLE**
[`char`](../../../data-types.md) | Участвуют ли значения поля в поиске.

Параметр ни на что не влияет в рамках `crm`.

Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `N` ||
|#

### Параметр SETTINGS {#settings}

Метод поддерживает только настройки, описанные ниже.

{% list tabs %}

- string

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`string`](../../../data-types.md) | Значение по умолчанию.

    По умолчанию `''` ||
    || **ROWS**
    [`integer`](../../../data-types.md) | Количество строк в поле ввода. Обязательно больше 0.

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

    По умолчанию `0`. Значение больше `12` ограничивается до `12`, отрицательное заменяется на `2` ||
    |#

- boolean

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`integer`](../../../data-types.md) | Значение по умолчанию, где `1` — да, `0` — нет.

    Возможные значения:
    - `>= 1` -> 1
    - `<= 0` -> 0

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
    ```
    ||
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
    - `DIALOG` — диалог выбора объектов

    По умолчанию `LIST` ||
    || **LIST_HEIGHT**
    [`integer`](../../../data-types.md) | Высота списка. Значение должно быть больше 0.

    Доступен только при `DISPLAY = LIST` или `DISPLAY = UI`.

    По умолчанию `1` ||
    |#

- iblock_section|iblock_element

    #|
    || **Название**
    `тип` | **Описание** ||
    || **IBLOCK_ID**
    [`integer`](../../../data-types.md) | Идентификатор инфоблока. Обязательный для типов `iblock_section` и `iblock_element`. Если значение не передано или не больше `0`, метод вернет ошибку `ERROR_CORE` ||
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
    [`integer`](../../../data-types.md) | Высота списка. Обязательно больше 0.

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

    Если не передать ни одну из следующих опций, то по умолчанию будет включена привязка к лидам (`LEAD = Y`).

    #|
    || **Название**
    `тип` | **Описание** ||
    || **LEAD**
    [`char`](../../../data-types.md) | Включена ли привязка к [Лидам](../../leads/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N`. Если не включена привязка ни к одному типу, используется `Y` ||
    || **CONTACT**
    [`char`](../../../data-types.md) | Включена ли привязка к [Контактам](../index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    || **COMPANY**
    [`char`](../../../data-types.md) | Включена ли привязка к [Компаниям](../../companies/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    || **DEAL**
    [`char`](../../../data-types.md) | Включена ли привязка к [Сделкам](../../deals/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    |#

{% endlist %}

### Тип uf_enum_element {#uf_enum_element}

#|
|| **Название**
`тип` | **Описание** ||
|| **VALUE**
[`string`](../../../data-types.md) | Значение элемента списка.

Элементы списка с пустым или отсутствующим `VALUE` будут проигнорированы ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки. Если значение не передано или не больше нуля, используется `500` ||
|| **DEF**
[`char`](../../../data-types.md) | Является ли элемент списка значением по умолчанию. Возможные значения:
- `Y` — да
- `N` — нет

Для множественного поля допустимо несколько `DEF = Y`. Для немножественного поля значением по умолчанию считается первый переданный элемент списка с `DEF = Y`.

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.contact.userfield.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"LABEL":"Поле Привет, мир!","USER_TYPE_ID":"string","FIELD_NAME":"HELLO_WORLD","MULTIPLE":"Y","MANDATORY":"Y","SHOW_FILTER":"Y","SETTINGS":{"DEFAULT_VALUE":"Привет, мир! Значение по умолчанию","ROWS":3},"SORT":1000,"EDIT_IN_LIST":"Y","LIST_FILTER_LABEL":"Привет, мир! Фильтр","LIST_COLUMN_LABEL":{"en":"Hello, World! Column","ru":"Привет, мир! Колонка","de":"Hallo, Welt! Spalte"},"EDIT_FORM_LABEL":{"en":"Hello, World! Edit","ru":"Привет, мир! Редактировать","de":"Hallo, Welt! Bearbeiten"},"ERROR_MESSAGE":{"en":"Hello, World! Error","ru":"Привет, мир! Ошибка","de":"Hallo, Welt! Fehler"},"HELP_MESSAGE":{"en":"Hello, World! Help","ru":"Привет, мир! Помощь","de":"Hallo, Welt! Hilfe"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.userfield.add
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.contact.userfield.add',
        {
            fields: {
                LABEL: "Поле \'Привет, мир!\'",
                USER_TYPE_ID: "string",
                FIELD_NAME: "HELLO_WORLD",
                MULTIPLE: "Y",
                MANDATORY: "Y",
                SHOW_FILTER: "Y",
                SETTINGS: {
                    DEFAULT_VALUE: "Привет, мир! Значение по умолчанию",
                    ROWS: 3,
                },
                SORT: 1000,
                EDIT_IN_LIST: "Y",
                LIST_FILTER_LABEL: "Привет, мир! Фильтр",
                LIST_COLUMN_LABEL: {
                    "en": "Hello, World! Column",
                    "ru": "Привет, мир! Колонка",
                    "de": "Hallo, Welt! Spalte"
                },
                EDIT_FORM_LABEL: {
                    "en": "Hello, World! Edit",
                    "ru": "Привет, мир! Редактировать",
                    "de": "Hallo, Welt! Bearbeiten"
                },
                ERROR_MESSAGE: {
                    "en": "Hello, World! Error",
                    "ru": "Привет, мир! Ошибка",
                    "de": "Hallo, Welt! Fehler"
                },
                HELP_MESSAGE: {
                    "en": "Hello, World! Help",
                    "ru": "Привет, мир! Помощь",
                    "de": "Hallo, Welt! Hilfe"
                },
            },
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP

    ```php
    try {
        $userfieldItemFields = [
            'FIELD_NAME' => 'UF_CRM_example',
            'USER_TYPE_ID' => 'string',
            'XML_ID' => 'xml_example',
            'SORT' => '100',
            'MULTIPLE' => 'N',
            'MANDATORY' => 'Y',
            'SHOW_FILTER' => 'Y',
            'SHOW_IN_LIST' => 'Y',
            'EDIT_IN_LIST' => 'Y',
            'IS_SEARCHABLE' => 'Y',
            'EDIT_FORM_LABEL' => 'Example Field',
            'LIST_COLUMN_LABEL' => 'Example Column',
            'LIST_FILTER_LABEL' => 'Example Filter',
            'ERROR_MESSAGE' => 'Error occurred',
            'HELP_MESSAGE' => 'Help message',
            'SETTINGS' => ['DEFAULT_VALUE' => 'Example value', 'ROWS' => 3],
        ];

        $result = $serviceBuilder
            ->getCRMScope()
            ->contactUserfield()
            ->add($userfieldItemFields);

        print($result->getId());
    } catch (Throwable $e) {
        print('Error: ' . $e->getMessage());
    }
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.contact.userfield.add',
        [
            'fields' => [
                'LABEL' => "Поле 'Привет, мир!'",
                'USER_TYPE_ID' => "string",
                'FIELD_NAME' => "HELLO_WORLD",
                'MULTIPLE' => "Y",
                'MANDATORY' => "Y",
                'SHOW_FILTER' => "Y",
                'SETTINGS' => [
                    'DEFAULT_VALUE' => "Привет, мир! Значение по умолчанию",
                    'ROWS' => 3,
                ],
                'SORT' => 1000,
                'EDIT_IN_LIST' => "Y",
                'LIST_FILTER_LABEL' => "Привет, мир! Фильтр",
                'LIST_COLUMN_LABEL' => [
                    'en' => "Hello, World! Column",
                    'ru' => "Привет, мир! Колонка",
                    'de' => "Hallo, Welt! Spalte"
                ],
                'EDIT_FORM_LABEL' => [
                    'en' => "Hello, World! Edit",
                    'ru' => "Привет, мир! Редактировать",
                    'de' => "Hallo, Welt! Bearbeiten"
                ],
                'ERROR_MESSAGE' => [
                    'en' => "Hello, World! Error",
                    'ru' => "Привет, мир! Ошибка",
                    'de' => "Hallo, Welt! Fehler"
                ],
                'HELP_MESSAGE' => [
                    'en' => "Hello, World! Help",
                    'ru' => "Привет, мир! Помощь",
                    'de' => "Hallo, Welt! Hilfe"
                ],
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.contact.userfield.add(
            fields={
                "LABEL": "Поле 'Привет, мир!'",
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

{% endlist %}

### Пример создания пользовательского поля типа Список

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"LABEL":"Пользовательское поле (список)","USER_TYPE_ID":"enumeration","FIELD_NAME":"ENUMERATION_EXAMPLE","MULTIPLE":"N","MANDATORY":"N","SHOW_FILTER":"Y","LIST":[{"VALUE":"Элемент списка #1","DEF":"Y","XML_ID":"XML_ID_1","SORT":100},{"VALUE":"Элемент списка #2","XML_ID":"XML_ID_2","SORT":200},{"VALUE":"Элемент списка #3","XML_ID":"XML_ID_3","SORT":300},{"VALUE":"Элемент списка #4","XML_ID":"XML_ID_4","SORT":400}],"SETTINGS":{"DISPLAY":"UI","LIST_HEIGHT":2},"SORT":2000}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.contact.userfield.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"LABEL":"Пользовательское поле (список)","USER_TYPE_ID":"enumeration","FIELD_NAME":"ENUMERATION_EXAMPLE","MULTIPLE":"N","MANDATORY":"N","SHOW_FILTER":"Y","LIST":[{"VALUE":"Элемент списка #1","DEF":"Y","XML_ID":"XML_ID_1","SORT":100},{"VALUE":"Элемент списка #2","XML_ID":"XML_ID_2","SORT":200},{"VALUE":"Элемент списка #3","XML_ID":"XML_ID_3","SORT":300},{"VALUE":"Элемент списка #4","XML_ID":"XML_ID_4","SORT":400}],"SETTINGS":{"DISPLAY":"UI","LIST_HEIGHT":2},"SORT":2000},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.userfield.add
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.contact.userfield.add',
        {
            fields: {
                LABEL: "Пользовательское поле (список)",
                USER_TYPE_ID: "enumeration",
                FIELD_NAME: "ENUMERATION_EXAMPLE",
                MULTIPLE: "N",
                MANDATORY: "N",
                SHOW_FILTER: "Y",
                LIST: [
                    {
                        VALUE: "Элемент списка #1",
                        DEF: "Y",
                        XML_ID: "XML_ID_1",
                        SORT: 100,
                    },
                    {
                        VALUE: "Элемент списка #2",
                        XML_ID: "XML_ID_2",
                        SORT: 200,
                    },
                    {
                        VALUE: "Элемент списка #3",
                        XML_ID: "XML_ID_3",
                        SORT: 300,
                    },
                    {
                        VALUE: "Элемент списка #4",
                        XML_ID: "XML_ID_4",
                        SORT: 400,
                    },
                ],
                SETTINGS: {
                    DISPLAY: "UI",
                    LIST_HEIGHT: 2,
                },
                SORT: 2000,
            },
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
        'crm.contact.userfield.add',
        [
            'fields' => [
                'LABEL' => "Пользовательское поле (список)",
                'USER_TYPE_ID' => "enumeration",
                'FIELD_NAME' => "ENUMERATION_EXAMPLE",
                'MULTIPLE' => "N",
                'MANDATORY' => "N",
                'SHOW_FILTER' => "Y",
                'LIST' => [
                    [
                        'VALUE' => "Элемент списка #1",
                        'DEF' => "Y",
                        'XML_ID' => "XML_ID_1",
                        'SORT' => 100,
                    ],
                    [
                        'VALUE' => "Элемент списка #2",
                        'XML_ID' => "XML_ID_2",
                        'SORT' => 200,
                    ],
                    [
                        'VALUE' => "Элемент списка #3",
                        'XML_ID' => "XML_ID_3",
                        'SORT' => 300,
                    ],
                    [
                        'VALUE' => "Элемент списка #4",
                        'XML_ID' => "XML_ID_4",
                        'SORT' => 400,
                    ],
                ],
                'SETTINGS' => [
                    'DISPLAY' => "UI",
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

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.contact.userfield.add(
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.contact.userfield.add", b24.Params{
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
    	return fmt.Errorf("crm.contact.userfield.add: %w", err)
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
    "result": 399,
    "time": {
        "start": 1724239307.903115,
        "finish": 1724239308.567422,
        "duration": 0.6643068790435791,
        "processing": 0.20090818405151367,
        "date_start": "2024-08-21T13:21:47+02:00",
        "date_finish": "2024-08-21T13:21:48+02:00",
        "operating": 0
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

Тексты ошибок проверки поля приходят с HTML-тегом `<br>` в конце, в таблице он опущен. Если ошибок несколько, они идут в одном `error_description` через `<br>`.

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | `Access denied.` | У пользователя нет права «Разрешить изменять настройки» в CRM ||
|| `400` | Пустое значение | `The 'FIELD_NAME' field is not found.` | Либо передан пустой `FIELD_NAME`, либо он не передан вовсе ||
|| `400` | `ERROR_CORE` | `Имя поля слишком длинное (больше 50-ти символов).` | Полное имя поля вместе с префиксом `UF_CRM_` содержит более 50 символов ||
|| `400` | `ERROR_CORE` | `Имя поля содержит недопустимые символы. Допустимыми являются: A-Z, 0-9 и _.` | Переданный `FIELD_NAME` содержит символы, кроме `A-Z`, `0-9` и `_` ||
|| `400` | Пустое значение | `The 'USER_TYPE_ID' field is not found.` | Либо передан пустой `USER_TYPE_ID`, либо он не передан вовсе ||
|| `400` | `ERROR_CORE` | `Указан неверный пользовательский тип.` | Переданный `USER_TYPE_ID` не существует ||
|| `400` | `ERROR_CORE` | `Поле UF_CRM_CODE для объекта CRM_CONTACT уже существует.` | Поле с таким `FIELD_NAME` у контактов уже есть ||
|| `400` | `ERROR_CORE` | `Элемент списка со значением XML_ID=xml_id уже существует.` | Переданные в элементы списка `XML_ID` не уникальны. Поле при этом уже создано без элементов списка: найдите его методом `crm.contact.userfield.list` и измените или удалите перед повторной попыткой ||
|| `400` | `ERROR_CORE` | `Выберите инфоблок, с которым нужно связать поле` | Для поля типа `iblock_section` или `iblock_element` не передан `SETTINGS.IBLOCK_ID` больше `0` ||
|| `400` | `ERROR_CORE` | `Это действие недоступно на вашем тарифе` | Достигнут лимит пользовательских полей контактов на тарифе Битрикс24 ||
|| `500` | `INTERNAL_SERVER_ERROR` | Текст зависит от причины | У контактов уже 1016 пользовательских полей или создание поля не уложилось в `max_execution_time`. Подробнее — в разделе [Ошибки при работе с пользовательскими полями](./index.md#errors) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-contact-userfield-update.md)
- [{#T}](./crm-contact-userfield-get.md)
- [{#T}](./crm-contact-userfield-list.md)
- [{#T}](./crm-contact-userfield-delete.md)
