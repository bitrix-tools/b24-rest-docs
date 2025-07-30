# Создать пользовательское поле для сделок crm.deal.userfield.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM

Метод `crm.deal.userfield.add` создает новое пользовательское поле для сделок.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

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

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

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
[`string`](../../../data-types.md) | Код поля. Уникальное.

Системное ограничение на код поля составляет 20 знаков. К названию пользовательского поля всегда добавляется префикс `UF_CRM_`, то есть реальная длина названия 13 знаков.

Допустимые символы: `A-Z`, `0-9` и `_`||
|| **LABEL**
[`string`](../../../data-types.md) | Название пользовательского поля по умолчанию.

Переданное значение будет выставлено в следующие поля: `LIST_FILTER_LABEL`, `LIST_COLUMN_LABEL`, `EDIT_FORM_LABEL`, `ERROR_MESSAGE`, `HELP_MESSAGE`, если в них не передано значение ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний код ||
|| **LIST_FILTER_LABEL**
[`string`](../../../data-types.md)\|[`lang_map`](../../data-types.md#lang-ids) | Подпись фильтра в списке.

При передаче строки она будет проставлена для всех идентификаторов языка.

При передаче значения типа `lang_map` для всех непереданных языков будет проставлено значение из `LABEL`.

По умолчанию значение, переданное в `LABEL`, проставляется для всех идентификаторов языка ||
|| **LIST_COLUMN_LABEL**
[`string`](../../../data-types.md)\|[`lang_map`](../../data-types.md#lang-ids) | Заголовок в списке.

При передаче строки она будет проставлена для всех идентификаторов языка.

При передаче значения типа `lang_map` для всех непереданных языков будет проставлено значение из `LABEL`.

По умолчанию значение, переданное в `LABEL`, проставляется для всех идентификаторов языка ||
|| **EDIT_FORM_LABEL**
[`string`](../../../data-types.md)\|[`lang_map`](../../data-types.md#lang-ids) | Подпись в форме редактирования.

При передаче строки она будет проставлена для всех идентификаторов языка.

При передаче значения типа `lang_map` для всех непереданных языков будет проставлено значение из `LABEL`.

По умолчанию значение, переданное в `LABEL`, проставляется для всех идентификаторов языка ||
|| **ERROR_MESSAGE**
[`string`](../../../data-types.md)\|[`lang_map`](../../data-types.md#lang-ids) | Сообщение об ошибке||
|| **HELP_MESSAGE**
[`string`](../../../data-types.md)\|[`lang_map`](../../data-types.md#lang-ids) | Помощь||
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

По умолчанию `N` ||
|| **SETTINGS**
[`object`](../../../data-types.md) | Дополнительные параметры поля. Для каждого типа поля `USER_TYPE_ID` существует свой пул доступных настроек, описание [ниже](#settings) ||
|| **LIST**
[`uf_enum_element[]`](#uf_enum_element) | Список возможных значений для пользовательского поля типа `enumeration`, описание [ниже](#uf_enum_element)

По умолчанию `[]` ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки. Обязательно больше нуля.

По умолчанию `100` ||
|| **SHOW_IN_LIST**
[`boolean`](../../../data-types.md) | Показывать ли пользовательское поле в списке.

Данный параметр ни на что не влияет в рамках `crm`.

Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `N` ||
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

    По умолчанию `2` ||
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
    - `DIALOG` — диалог выбора сущностей

    По умолчанию `LIST` ||
    || **LIST_HEIGHT** | Высота списка. Обязательно больше 0.

    Доступен только при `DISPLAY = LIST` или `DISPLAY = UI`.

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
    [`string`](../../../data-types.md) | Идентификатор инфоблока.

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
    [`integer`](../../../data-types.md) | Высота списка. Обязательно больше 0.

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

    Если не передать ни одну из следующих опций, то по умолчанию будет включена привязка к лидам `LEAD = Y`.

    #|
    || **Название**
    `тип` | **Описание** ||
    || **LEAD**
    [`boolean`](../../../data-types.md) | Включена ли привязка к [Лидам](../../leads/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    || **CONTACT**
    [`boolean`](../../../data-types.md) | Включена ли привязка к [Контактам](../index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    || **COMPANY**
    [`boolean`](../../../data-types.md) | Включена ли привязка к [Компаниям](../../companies/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    || **DEAL**
    [`boolean`](../../../data-types.md) | Включена ли привязка к [Сделкам](../index.md). Возможные значения:
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
[`integer`](../../../data-types.md) | Индекс сортировки. Обязательно больше или равно 0.

По умолчанию `0` ||
|| **DEF**
[`boolean`](../../../data-types.md) | Является ли элемент списка значением по умолчанию. Возможные значения:
- `Y` — да
- `N` — нет

Для множественного поля допустимо несколько `DEF = Y`. Для не множественного, дефолтным будет считаться первый переданный элемент списка с `DEF = Y`.

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
    -d '{"fields":{"LABEL":"Поле 'Привет, мир!'","USER_TYPE_ID":"string","FIELD_NAME":"HELLO_WORLD","MULTIPLE":"Y","MANDATORY":"Y","SHOW_FILTER":"Y","SETTINGS":{"DEFAULT_VALUE":"Привет, мир! Значение по умолчанию","ROWS":3},"SORT":1000,"EDIT_IN_LIST":"Y","LIST_FILTER_LABEL":"Привет, мир! Фильтр","LIST_COLUMN_LABEL":{"en":"Hello, World! Column","ru":"Привет, мир! Колонка","de":"Hallo, Welt! Spalte"},"EDIT_FORM_LABEL":{"en":"Hello, World! Edit","ru":"Привет, мир! Редактировать","de":"Hallo, Welt! Bearbeiten"},"ERROR_MESSAGE":{"en":"Hello, World! Error","ru":"Привет, мир! Ошибка","de":"Hallo, Welt! Fehler"},"HELP_MESSAGE":{"en":"Hello, World! Help","ru":"Привет, мир! Помощь","de":"Hallo, Welt! Hilfe"}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.deal.userfield.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"LABEL":"Поле 'Привет, мир!'","USER_TYPE_ID":"string","FIELD_NAME":"HELLO_WORLD","MULTIPLE":"Y","MANDATORY":"Y","SHOW_FILTER":"Y","SETTINGS":{"DEFAULT_VALUE":"Привет, мир! Значение по умолчанию","ROWS":3},"SORT":1000,"EDIT_IN_LIST":"Y","LIST_FILTER_LABEL":"Привет, мир! Фильтр","LIST_COLUMN_LABEL":{"en":"Hello, World! Column","ru":"Привет, мир! Колонка","de":"Hallo, Welt! Spalte"},"EDIT_FORM_LABEL":{"en":"Hello, World! Edit","ru":"Привет, мир! Редактировать","de":"Hallo, Welt! Bearbeiten"},"ERROR_MESSAGE":{"en":"Hello, World! Error","ru":"Привет, мир! Ошибка","de":"Hallo, Welt! Fehler"},"HELP_MESSAGE":{"en":"Hello, World! Help","ru":"Привет, мир! Помощь","de":"Hallo, Welt! Hilfe"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.userfield.add
    ```

- JS

    ```js
    BX24.callMethod(
        'crm.deal.userfield.add',
        {
            fields: {
                LABEL: "Поле 'Привет, мир!'",
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
    require_once('crest.php');

    $result = CRest::call(
        'crm.deal.userfield.add',
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

- PHP (B24PhpSdk)

    ```php
    try {
        $userfieldItemFields = [
            'FIELD_NAME' => 'Test Field',
            'USER_TYPE_ID' => 'string',
            'XML_ID' => 'test_field_1',
            'SORT' => '100',
            'MULTIPLE' => 'N',
            'MANDATORY' => 'N',
            'SHOW_FILTER' => 'Y',
            'SHOW_IN_LIST' => 'Y',
            'EDIT_IN_LIST' => 'Y',
            'IS_SEARCHABLE' => 'Y',
            'EDIT_FORM_LABEL' => 'Test Field Label',
            'LIST_COLUMN_LABEL' => 'Test Field List Label',
            'LIST_FILTER_LABEL' => 'Test Field Filter Label',
            'ERROR_MESSAGE' => 'Error occurred',
            'HELP_MESSAGE' => 'Help message for Test Field',
            'LIST' => '',
            'SETTINGS' => '',
        ];

        $result = $serviceBuilder
            ->getCRMScope()
            ->dealUserfield()
            ->add($userfieldItemFields);

        print($result->getId());
    } catch (Throwable $e) {
        print('Error: ' . $e->getMessage());
    }
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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.deal.userfield.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"LABEL":"Пользовательское поле (список)","USER_TYPE_ID":"enumeration","FIELD_NAME":"ENUMERATION_EXAMPLE","MULTIPLE":"N","MANDATORY":"N","SHOW_FILTER":"Y","LIST":[{"VALUE":"Элемент списка #1","DEF":"Y","XML_ID":"XML_ID_1","SORT":100},{"VALUE":"Элемент списка #2","XML_ID":"XML_ID_2","SORT":200},{"VALUE":"Элемент списка #3","XML_ID":"XML_ID_3","SORT":300},{"VALUE":"Элемент списка #4","XML_ID":"XML_ID_4","SORT":400}],"SETTINGS":{"DISPLAY":"UI","LIST_HEIGHT":2},"SORT":2000},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.userfield.add
    ```

- JS

    ```js
    BX.rest.callMethod(
        'crm.deal.userfield.add',
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

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.deal.userfield.add',
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
|| **Код** | **Описание** | **Значение** ||
|| `400` | `The 'FIELD_NAME' field is not found` | Либо передан пустой `FIELD_NAME`, либо он не передан вовсе ||
|| `400` | `Имя поля слишком длинное (больше 50-ти символов).` | Переданный `FIELD_NAME` содержит более 50 символов ||
|| `400` | `Имя поля содержит недопустимые символы. Допустимыми являются: A-Z, 0-9 и _.` | Переданный `FIELD_NAME` содержит недопустимые символы ||
|| `400` | `The 'USER_TYPE_ID' field is not found` | Либо передан пустой `USER_TYPE_ID`, либо он не передан вовсе ||
|| `400` | `Указан неверный пользовательский тип` | Переданный `USER_TYPE_ID` не существует ||
|| `400` | `Элемент списка со значением XML_ID='XML_ID' уже существует` | Переданные в элементы списка `XML_ID` не уникальны ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-deal-userfield-update.md)
- [{#T}](./crm-deal-userfield-get.md)
- [{#T}](./crm-deal-userfield-list.md)
- [{#T}](./crm-deal-userfield-delete.md)