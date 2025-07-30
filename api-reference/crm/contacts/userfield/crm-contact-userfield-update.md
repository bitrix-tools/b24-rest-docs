# Изменить существующее пользовательское поле контактов crm.contact.userfield.update

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `crm.contact.userfield.update` обновляет существующее пользовательское поле контактов.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`][1] | Идентификатор пользовательского поля.

Идентификатор можно получить с помощью методов [`crm.contact.userfield.add`](./crm-contact-userfield-add.md) и [`crm.contact.userfield.list`](./crm-contact-userfield-list.md) ||
|| **fields***
[`object`][1] | Объект формата:

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
- `value_n` — новое значение поля

Список доступных полей описан [ниже](#parameter-fields).

Некорректное поле в `fields` будет проигнорировано.

В `fields` нужно передавать только те поля, которые требуется изменить ||
|#

### Параметр fields {#parameter-fields}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **MANDATORY**
[`boolean`][1] | Является ли поле обязательным. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **SHOW_FILTER**
[`boolean`][1] | Показывать ли поле в фильтре. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **XML_ID**
[`string`][1] | Внешний код ||
|| **SETTINGS**
[`object`][1] | Дополнительные параметры поля. Для каждого типа поля (`USER_TYPE_ID`) существует свой пул доступных настроек, они описаны [ниже](#settings).

Поле перезаписывает лишь переданные значения ||
|| **LIST**
[`uf_enum_element[]`](#uf_enum_element) | Список возможных значений для пользовательского поля типа `enumeration`. Для пользовательских полей другого типа данный параметр не несет смысла ||
|| **SORT**
[`integer`][1] | Индекс сортировки. Обязательно больше нуля ||
|| **SHOW_IN_LIST**
[`boolean`][1] | Показывать ли пользовательское поле в списке.

Данный параметр ни на что не влияет в рамках `crm`.

Возможные значения:
- `Y` — да
- `N` — нет
||
|| **EDIT_IN_LIST**
[`boolean`][1] | Разрешать ли редактирование пользователем. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **IS_SEARCHABLE**
[`boolean`][1] | Участвуют ли значения поля в поиске.

Данный параметр ни на что не влияет в рамках `crm`.

Возможные значения:
- `Y` — да
- `N` — нет
||
|| **LIST_FILTER_LABEL**
[`string`][1]\|[`lang_map`](../../data-types.md) | Подпись фильтра в списке.

При передаче строки она устанавливается для каждого языка.

Для языков, у которых явно не указано значение, будет записано `''`.

Поле полностью перезаписывает предыдущее значение ||
|| **LIST_COLUMN_LABEL**
[`string`][1]\|[`lang_map`](../../data-types.md) | Заголовок в списке.

При передаче строки она устанавливается для каждого языка.

Для языков, у которых явно не указано значение, будет записано `''`.

Поле полностью перезаписывает предыдущее значение ||
|| **EDIT_FORM_LABEL**
[`string`][1]\|[`lang_map`](../../data-types.md) | Подпись в форме редактирования.

При передаче строки она устанавливается для каждого языка.

Для языков, у которых явно не указано значение, будет записано `''`.

Поле полностью перезаписывает предыдущее значение ||
|| **ERROR_MESSAGE**
[`string`][1]\|[`lang_map`](../../data-types.md) | Сообщение об ошибке.

При передаче строки она устанавливается для каждого языка.

Для языков, у которых явно не указано значение, будет записано `''`.

Поле полностью перезаписывает предыдущее значение ||
|| **HELP_MESSAGE**
[`string`][1]\|[`lang_map`](../../data-types.md) | Помощь.

При передаче строки она устанавливается для каждого языка.

Для языков, у которых явно не указано значение, будет записано `''`.

Поле полностью перезаписывает предыдущее значение ||
|#

### Параметр SETTINGS {#settings}

У каждого типа пользовательских полей существует свой набор дополнительных настроек. Данный метод поддерживает изменение лишь тех, что описаны ниже.

{% list tabs %}

- string

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`string`][1] | Значение по умолчанию ||
    || **ROWS**
    [`integer`][1] | Количество строк в поле ввода. Обязательно больше 0 и меньше 50.

    Если передавать значение <= 0, то выставится значение `1`.

    Если передавать значение >= 50, то выставиться значение `50`
    ||
    |#

- integer

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`integer`][1] | Значение по умолчанию ||
    |#

- double

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`double`][1] | Значение по умолчанию ||
    || **PRECISION**
    [`integer`][1] | Точность числа. Обязательно больше или равно 0.

    Если передавать невалидное значение, выставится значение `2` ||
    |#

- boolean

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`integer`][1] | Значение по умолчанию, где `1` — да, `0` — нет.

    При передаче значения выставится значение по правилу:
    - `>= 1` -> 1
    - `<= 0` -> 0
    ||
    || **DISPLAY**
    [`string`][1] | Внешний вид. Возможные значения:
    - `CHECKBOX` — флажок
    - `RADIO` — радиокнопки
    - `DROPDOWN` — выпадающий список
    ||
    |#

- datetime

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`object`][1]  | Значение по умолчанию. Объект формата:
    ```
    {
        VALUE: datetime,
        TYPE: 'NONE'|'NOW'|'FIXED',
    }
    ```

    где
    - `VALUE` — значение по умолчанию типа `datetime`
    - `TYPE` — тип значения по умолчанию:
        - `NONE` — не выставлять значение по умолчанию
        - `NOW` — использовать текущее время/дату
        - `FIXED` — использовать время/дату из `VALUE`

    При передаче невалидного значения выставиться:
    ```
        VALUE: '',
        TYPE: 'NONE',
    ```
    ||
    |#

- enumeration

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DISPLAY**
    [`string`][1] | Внешний вид. Возможные значения:
    - `LIST` — список
    - `UI` — набираемый список
    - `CHECKBOX` — флажки
    - `DIALOG` — диалог выбора сущностей
    ||
    || **LIST_HEIGHT** | Высота списка. Обязано быть больше 0 ||
    |#

- iblock_section|iblock_element

    #|
    || **Название**
    `тип` | **Описание** ||
    || **IBLOCK_TYPE_ID**
    [`string`][1] | Идентификатор типа инфоблока ||
    || **IBLOCK_ID**
    [`string`][1] | Идентификатор инфоблока ||
    || **DEFAULT_VALUE**
    [`string`][1] | Значение по умолчанию ||
    || **DISPLAY**
    [`string`][1] | Внешний вид. Возможные значения:
    - `DIALOG` — диалог
    - `UI` — набираемый список
    - `LIST` — список
    - `CHECKBOX` — флажки
    ||
    || **LIST_HEIGHT**
    [`integer`][1] | Высота списка. Обязательно больше 0
    ||
    || **ACTIVE_FILTER**
    [`boolean`][1] | Показывать ли элементы с включенным флагом активности. Возможные значения:
    - `Y` — да
    - `N` — нет
    ||
    |#

- crm_status

    #|
    || **Название**
    `тип` | **Описание** ||
    || **ENTITY_TYPE**
    [`string`][1] | Идентификатор типа справочника.

    Используйте [`crm.status.entity.types`](../../status/crm-status-entity-types.md), чтобы узнать возможные значения ||
    |#

- crm

    Если не передать ни одну из следующих опций, то по умолчанию будет включена привязка к лидам (`LEAD = Y`)

    #|
    || **Название**
    `тип` | **Описание** ||
    || **LEAD**
    [`boolean`][1] | Включена ли привязка к [Лидам](../../leads/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет
    ||
    || **CONTACT**
    [`boolean`][1] | Включена ли привязка к [Контактам](../index.md). Возможные значения:
    - `Y` — да
    - `N` — нет
    ||
    || **COMPANY**
    [`boolean`][1] | Включена ли привязка к [Компаниям](../../companies/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет
    ||
    || **DEAL**
    [`boolean`][1] | Включена ли привязка к [Сделкам](../../deals/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет
    ||
    |#

{% endlist %}

### Тип uf_enum_element {#uf_enum_element}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`][1] | Идентификатор элемента списка. При передаче данного параметра будет изменен соответствующий элемент списка, иначе будет добавлен новый элемент списка.

Идентификатор можно узнать с помощью метода [`crm.contact.userfield.get`](./crm-contact-userfield-get.md#uf_enum_element)
||
|| **DEL**
[`boolean`][1] | Флаг, необходимый для удаления элемента списка. Имеет смысл лишь при передаче `ID`. 

Возможные значения:
`Y` — удалить
`N` — не удалять

По умолчанию `N`
||
|| **VALUE**
[`string`][1] | Значение элемента списка ||
|| **SORT**
[`integer`][1] | Индекс сортировки. Обязательно больше или равно 0 ||
|| **DEF**
[`boolean`][1] | Является ли элемент списка значением по умолчанию. Возможные значения:
- `Y` — да
- `N` — нет

Для множественного поля допустимо несколько `DEF = Y`. Для не множественного значением по умолчанию будет считаться первый переданный элемент списка с `DEF = Y` ||
|| **XML_ID**
[`string`][1] | Внешний код значения. Обязательно уникальный в рамках элементов списка пользовательского поля ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

### Пример изменения пользовательского поля типа Строка

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":536,"fields":{"MANDATORY":"N","SHOW_FILTER":"N","SETTINGS":{"DEFAULT_VALUE":"Привет, мир! Значение по умолчанию (изменено)","ROWS":10},"SORT":2000,"EDIT_IN_LIST":"N","LIST_FILTER_LABEL":"Привет, мир! Фильтр (изменено)","LIST_COLUMN_LABEL":{"en":"Hello, World! Column (changed)","ru":"Привет, мир! Колонка (изменено)","de":"Hallo, Welt! Spalte (geändert)"},"EDIT_FORM_LABEL":{"en":"Hello, World! Edit (changed)","ru":"Привет, мир! Редактировать (изменено)","de":"Hallo, Welt! Bearbeiten (geändert)"},"ERROR_MESSAGE":{"en":"Hello, World! Error (changed)","ru":"Привет, мир! Ошибка (изменено)","de":"Hallo, Welt! Fehler (geändert)"},"HELP_MESSAGE":{"en":"Hello, World! Help (changed)","ru":"Привет, мир! Помощь (изменено)","de":"Hallo, Welt! Hilfe (geändert)"}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.contact.userfield.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":536,"fields":{"MANDATORY":"N","SHOW_FILTER":"N","SETTINGS":{"DEFAULT_VALUE":"Привет, мир! Значение по умолчанию (изменено)","ROWS":10},"SORT":2000,"EDIT_IN_LIST":"N","LIST_FILTER_LABEL":"Привет, мир! Фильтр (изменено)","LIST_COLUMN_LABEL":{"en":"Hello, World! Column (changed)","ru":"Привет, мир! Колонка (изменено)","de":"Hallo, Welt! Spalte (geändert)"},"EDIT_FORM_LABEL":{"en":"Hello, World! Edit (changed)","ru":"Привет, мир! Редактировать (изменено)","de":"Hallo, Welt! Bearbeiten (geändert)"},"ERROR_MESSAGE":{"en":"Hello, World! Error (changed)","ru":"Привет, мир! Ошибка (изменено)","de":"Hallo, Welt! Fehler (geändert)"},"HELP_MESSAGE":{"en":"Hello, World! Help (changed)","ru":"Привет, мир! Помощь (изменено)","de":"Hallo, Welt! Hilfe (geändert)"}}, "auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.userfield.update
    ```

- JS

    ```js
    BX24.callMethod(
        'crm.contact.userfield.update',
        {
            id: 536,
            fields: {
                MANDATORY: "N",
                SHOW_FILTER: "N",
                SETTINGS: {
                    DEFAULT_VALUE: "Привет, мир! Значение по умолчанию (изменено)",
                    ROWS: 10,
                },
                SORT: 2000,
                EDIT_IN_LIST: "N",
                LIST_FILTER_LABEL: "Привет, мир! Фильтр (изменено)",
                LIST_COLUMN_LABEL: {
                    "en": "Hello, World! Column (changed)",
                    "ru": "Привет, мир! Колонка (изменено)",
                    "de": "Hallo, Welt! Spalte (geändert)"
                },
                EDIT_FORM_LABEL: {
                    "en": "Hello, World! Edit (changed)",
                    "ru": "Привет, мир! Редактировать (изменено)",
                    "de": "Hallo, Welt! Bearbeiten (geändert)"
                },
                ERROR_MESSAGE: {
                    "en": "Hello, World! Error (changed)",
                    "ru": "Привет, мир! Ошибка (изменено)",
                    "de": "Hallo, Welt! Fehler (geändert)"
                },
                HELP_MESSAGE: {
                    "en": "Hello, World! Help (changed)",
                    "ru": "Привет, мир! Помощь (изменено)",
                    "de": "Hallo, Welt! Hilfe (geändert)"
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
        'crm.contact.userfield.update',
        [
            'id' => 536,
            'fields' => [
                'MANDATORY' => "N",
                'SHOW_FILTER' => "N",
                'SETTINGS' => [
                    'DEFAULT_VALUE' => "Привет, мир! Значение по умолчанию (изменено)",
                    'ROWS' => 10,
                ],
                'SORT' => 2000,
                'EDIT_IN_LIST' => "N",
                'LIST_FILTER_LABEL' => "Привет, мир! Фильтр (изменено)",
                'LIST_COLUMN_LABEL' => [
                    'en' => "Hello, World! Column (changed)",
                    'ru' => "Привет, мир! Колонка (изменено)",
                    'de' => "Hallo, Welt! Spalte (geändert)"
                ],
                'EDIT_FORM_LABEL' => [
                    'en' => "Hello, World! Edit (changed)",
                    'ru' => "Привет, мир! Редактировать (изменено)",
                    'de' => "Hallo, Welt! Bearbeiten (geändert)"
                ],
                'ERROR_MESSAGE' => [
                    'en' => "Hello, World! Error (changed)",
                    'ru' => "Привет, мир! Ошибка (изменено)",
                    'de' => "Hallo, Welt! Fehler (geändert)"
                ],
                'HELP_MESSAGE' => [
                    'en' => "Hello, World! Help (changed)",
                    'ru' => "Привет, мир! Помощь (изменено)",
                    'de' => "Hallo, Welt! Hilfe (geändert)"
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
        $contactUserfieldItemId = 123; // Example ID
        $userfieldFieldsToUpdate = [
            'FIELD_NAME' => 'New Field Name',
            'USER_TYPE_ID' => 'string',
            'SORT' => '100',
            'MULTIPLE' => 'N',
            'MANDATORY' => 'N',
            'SHOW_FILTER' => 'Y',
            'SHOW_IN_LIST' => 'Y',
            'EDIT_IN_LIST' => 'Y',
            'IS_SEARCHABLE' => 'Y',
            'EDIT_FORM_LABEL' => 'New Label',
            'LIST_COLUMN_LABEL' => 'Column Label',
            'LIST_FILTER_LABEL' => 'Filter Label',
            'ERROR_MESSAGE' => 'Error Message',
            'HELP_MESSAGE' => 'Help Message',
            'LIST' => '',
            'SETTINGS' => '',
        ];

        $result = $serviceBuilder
            ->getCRMScope()
            ->contactUserfield()
            ->update($contactUserfieldItemId, $userfieldFieldsToUpdate);

        if ($result->isSuccess()) {
            print($result->getCoreResponse()->getResponseData()->getResult()[0]);
        } else {
            print("Update failed.");
        }
    } catch (Throwable $e) {
        print("Error: " . $e->getMessage());
    }
    ```

{% endlist %}

### Пример изменения пользовательского поля типа Список

Текущие элементы списка:

```json
[
    {
        "ID": "115",
        "SORT": "100",
        "VALUE": "Элемент списка #1",
        "DEF": "Y",
        "XML_ID": "XML_ID_1"
    },
    {
        "ID": "116",
        "SORT": "200",
        "VALUE": "Элемент списка #2",
        "DEF": "N",
        "XML_ID": "XML_ID_2"
    },
    {
        "ID": "117",
        "SORT": "300",
        "VALUE": "Элемент списка #3",
        "DEF": "N",
        "XML_ID": "XML_ID_3"
    },
    {
        "ID": "118",
        "SORT": "400",
        "VALUE": "Элемент списка #4",
        "DEF": "N",
        "XML_ID": "XML_ID_4"
    }
]
```

Изменить его следующим образом:
- удалить элементы списка с `ID = 115` и `ID = 116`
- изменить элемент списка с `ID  = 117`:
    - `VALUE`: «Элемент списка #3» -> «Элемент списка #3 (изменено)»
    - `SORT`: 300 -> 50
- добавить новый элемент списка «Элемент списка #5»

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"MANDATORY":"N","SHOW_FILTER":"Y","LIST":[{"ID":115,"DEL":"Y"},{"ID":116,"DEL":"Y"},{"ID":117,"VALUE":"Элемент списка #3 (изменено)","SORT":50},{"VALUE":"Элемент списка #5","XML_ID":"XML_ID_5","SORT":500}],"SETTINGS":{"DISPLAY":"DIALOG","LIST_HEIGHT":3},"SORT":1000}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.contact.userfield.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"MANDATORY":"N","SHOW_FILTER":"Y","LIST":[{"ID":115,"DEL":"Y"},{"ID":116,"DEL":"Y"},{"ID":117,"VALUE":"Элемент списка #3 (изменено)","SORT":50},{"VALUE":"Элемент списка #5","XML_ID":"XML_ID_5","SORT":500}],"SETTINGS":{"DISPLAY":"DIALOG","LIST_HEIGHT":3},"SORT":1000},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.userfield.update
    ```

- JS

    ```js
    BX24.callMethod(
        'crm.contact.userfield.update',
        {
            fields: {
                MANDATORY: "N",
                SHOW_FILTER: "Y",
                LIST: [
                    {
                        ID: 115,
                        DEL: "Y"
                    },
                    {
                        ID: 116,
                        DEL: "Y",
                    },
                    {
                        ID: 117,
                        VALUE: "Элемент списка #3 (изменено)",
                        SORT: 50,
                    },
                    {
                        VALUE: "Элемент списка #5",
                        XML_ID: "XML_ID_5",
                        SORT: 500,
                    },
                ],
                SETTINGS: {
                    DISPLAY: "DIALOG",
                    LIST_HEIGHT: 3,
                },
                SORT: 1000,
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
        'crm.contact.userfield.update',
        [
            'fields' => [
                'MANDATORY' => "N",
                'SHOW_FILTER' => "Y",
                'LIST' => [
                    [
                        'ID' => 115,
                        'DEL' => "Y"
                    ],
                    [
                        'ID' => 116,
                        'DEL' => "Y",
                    ],
                    [
                        'ID' => 117,
                        'VALUE' => "Элемент списка #3 (изменено)",
                        'SORT' => 50,
                    ],
                    [
                        'VALUE' => "Элемент списка #5",
                        'XML_ID' => "XML_ID_5",
                        'SORT' => 500,
                    ],
                ],
                'SETTINGS' => [
                    'DISPLAY' => "DIALOG",
                    'LIST_HEIGHT' => 3,
                ],
                'SORT' => 1000,
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
    "result": true,
    "time": {
        "start": 1724419843.518672,
        "finish": 1724419844.120328,
        "duration": 0.6016559600830078,
        "processing": 0.1907808780670166,
        "date_start": "2024-08-23T15:30:43+02:00",
        "date_finish": "2024-08-23T15:30:44+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`][1] | Корневой элемент ответа, содержит `true` в случае успеха ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-`     | `Parameter 'fields' must be array` | Переданный `fields` не является объектом ||
|| `-`     | `ID is not defined or invalid`     | Переданный `id` меньше нуля или не передан вовсе ||
|| `-`     | `Access denied`                    | Возникает в случаях, когда:
- у пользователя нет административных прав
- пользователь пытается удалить пользовательское поле, не привязанное к контактам ||
|| `ERROR_NOT_FOUND` | `The entity with ID 'id' is not found` | Пользовательского поля с переданным `id` не существует ||
|| `ERROR_CORE`               | Элемент списка со значением XML_ID=`XML_ID` уже существует | Переданный `XML_ID` у элемента списка обязан быть уникальным в рамках элементов списка отдельно взятого пользовательского поля ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-contact-userfield-add.md)
- [{#T}](./crm-contact-userfield-get.md)
- [{#T}](./crm-contact-userfield-list.md)
- [{#T}](./crm-contact-userfield-delete.md)

[1]: ../../../data-types.md
