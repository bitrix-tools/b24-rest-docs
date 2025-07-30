# Изменить существующее пользовательское поле сделок crm.deal.userfield.update

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM

Метод `crm.deal.userfield.update` обновляет существующее пользовательское поле сделок.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор пользовательского поля.

Идентификатор можно получить с помощью методов [crm.deal.userfield.add](./crm-deal-userfield-add.md) и [crm.deal.userfield.list](./crm-deal-userfield-list.md) ||
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
- `value_n` — новое значение поля

Список доступных полей описан [ниже](#parameter-fields).

Некорректное поле в `fields` будет проигнорировано.

В `fields` нужно передавать только те поля, которые требуется изменить ||
|#

### Параметр fields {#parameter-fields}

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **MANDATORY**
[`boolean`](../../../data-types.md) | Является ли поле обязательным. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **SHOW_FILTER**
[`boolean`](../../../data-types.md) | Показывать ли поле в фильтре. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний код ||
|| **SETTINGS**
[`object`](../../../data-types.md) | Дополнительные параметры поля. Для каждого типа поля `USER_TYPE_ID` существует свой пул доступных настроек, они описаны [ниже](#settings).

Поле перезаписывает лишь переданные значения ||
|| **LIST**
[`uf_enum_element[]`](#uf_enum_element) | Список возможных значений для пользовательского поля типа `enumeration`, описание [ниже](#uf_enum_element) ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки. Обязательно больше нуля ||
|| **SHOW_IN_LIST**
[`boolean`](../../../data-types.md) | Показывать ли пользовательское поле в списке.

Данный параметр ни на что не влияет в рамках `crm`.

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **EDIT_IN_LIST**
[`boolean`](../../../data-types.md) | Разрешать ли редактирование пользователем. Возможные значения:
- `Y` — да
- `N` — нет 
Значение `N` поддерживают не все типы полей в рамках `crm` ||
|| **IS_SEARCHABLE**
[`boolean`](../../../data-types.md) | Участвуют ли значения поля в поиске.

Данный параметр ни на что не влияет в рамках `crm`.

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **LIST_FILTER_LABEL**
[`string`](../../../data-types.md)\|[`lang_map`](../../data-types.md#lang-ids) | Подпись фильтра в списке.

При передаче строки она устанавливается для каждого языка.

Для языков, у которых явно не указано значение, будет записано `''`.

Поле полностью перезаписывает предыдущее значение ||
|| **LIST_COLUMN_LABEL**
[`string`](../../../data-types.md)\|[`lang_map`](../../data-types.md#lang-ids) | Заголовок в списке.

При передаче строки она устанавливается для каждого языка.

Для языков, у которых явно не указано значение, будет записано `''`.

Поле полностью перезаписывает предыдущее значение ||
|| **EDIT_FORM_LABEL**
[`string`](../../../data-types.md)\|[`lang_map`](../../data-types.md#lang-ids) | Подпись в форме редактирования.

При передаче строки она устанавливается для каждого языка.

Для языков, у которых явно не указано значение, будет записано `''`.

Поле полностью перезаписывает предыдущее значение ||
|| **ERROR_MESSAGE**
[`string`](../../../data-types.md)\|[`lang_map`](../../data-types.md#lang-ids) | Сообщение об ошибке ||
|| **HELP_MESSAGE**
[`string`](../../../data-types.md)\|[`lang_map`](../../data-types.md#lang-ids) | Помощь ||
|#

### Параметр SETTINGS {#settings}

У каждого типа пользовательских полей существует свой набор дополнительных настроек. Данный метод поддерживает лишь те, что описаны ниже.

{% list tabs %}

- string

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`string`](../../../data-types.md) | Значение по умолчанию ||
    || **ROWS**
    [`integer`](../../../data-types.md) | Количество строк в поле ввода. Обязательно больше 0 ||
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
    [`integer`](../../../data-types.md) | Точность числа. Обязательно больше или равно 0 ||
    |#

- boolean

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`integer`](../../../data-types.md) | Значение по умолчанию, где `1` — да, `0` — нет.

    Возможные значения:
    - `>= 1` -> 1
    - `<= 0` -> 0 ||
    || **DISPLAY**
    [`string`](../../../data-types.md) | Внешний вид. Возможные значения:
    - `CHECKBOX` — флажок
    - `RADIO` — радиокнопки
    - `DROPDOWN` — выпадающий список ||
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
      - `FIXED` — использовать время/дату из `VALUE` ||
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
    - `DIALOG` — диалог выбора сущностей ||
    || **LIST_HEIGHT** | Высота списка. Обязательно больше 0.

    Доступен только при `DISPLAY = LIST` или `DISPLAY = UI` ||
    |#

- iblock_section|iblock_element

    #|
    || **Название**
    `тип` | **Описание** ||
    || **IBLOCK_TYPE_ID**
    [`string`](../../../data-types.md) | Идентификатор типа инфоблока ||
    || **IBLOCK_ID**
    [`string`](../../../data-types.md) | Идентификатор инфоблока ||
    || **DEFAULT_VALUE**
    [`string`](../../../data-types.md) | Значение по умолчанию ||
    || **DISPLAY**
    [`string`](../../../data-types.md) | Внешний вид. Возможные значения:
    - `DIALOG` — диалог
    - `UI` — набираемый список
    - `LIST` — список
    - `CHECKBOX` — флажки ||
    || **LIST_HEIGHT**
    [`integer`](../../../data-types.md) | Высота списка. Обязательно больше 0 ||
    || **ACTIVE_FILTER**
    [`boolean`](../../../data-types.md) | Показывать ли элементы с включенным флагом активности. Возможные значения:
    - `Y` — да
    - `N` — нет ||
    |#

- crm_status

    #|
    || **Название**
    `тип` | **Описание** ||
    || **ENTITY_TYPE**
    [`string`](../../../data-types.md) | Идентификатор типа справочника.

    Используйте [`crm.status.entity.types`](../../status/crm-status-entity-types.md), чтобы узнать возможные значения ||
    |#

- crm

    #|
    || **Название**
    `тип` | **Описание** ||
    || **LEAD**
    [`boolean`](../../../data-types.md) | Включена ли привязка к [Лидам](../../leads/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет ||
    || **CONTACT**
    [`boolean`](../../../data-types.md) | Включена ли привязка к [Контактам](../index.md). Возможные значения:
    - `Y` — да
    - `N` — нет ||
    || **COMPANY**
    [`boolean`](../../../data-types.md) | Включена ли привязка к [Компаниям](../../companies/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет ||
    || **DEAL**
    [`boolean`](../../../data-types.md) | Включена ли привязка к [Сделкам](../index.md). Возможные значения:
    - `Y` — да
    - `N` — нет ||
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
[`integer`](../../../data-types.md) | Индекс сортировки. Обязательно больше или равно 0 ||
|| **DEF**
[`boolean`](../../../data-types.md) | Является ли элемент списка значением по умолчанию. Возможные значения:
- `Y` — да
- `N` — нет

Для множественного поля допустимо несколько `DEF = Y`. Для не множественного, дефолтным будет считаться первый переданный элемент списка с `DEF = Y` ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний код значения. Обязательно уникальный в рамках элементов списка пользовательского поля ||
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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.deal.userfield.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":536,"fields":{"MANDATORY":"N","SHOW_FILTER":"N","SETTINGS":{"DEFAULT_VALUE":"Привет, мир! Значение по умолчанию (изменено)","ROWS":10},"SORT":2000,"EDIT_IN_LIST":"N","LIST_FILTER_LABEL":"Привет, мир! Фильтр (изменено)","LIST_COLUMN_LABEL":{"en":"Hello, World! Column (changed)","ru":"Привет, мир! Колонка (изменено)","de":"Hallo, Welt! Spalte (geändert)"},"EDIT_FORM_LABEL":{"en":"Hello, World! Edit (changed)","ru":"Привет, мир! Редактировать (изменено)","de":"Hallo, Welt! Bearbeiten (geändert)"},"ERROR_MESSAGE":{"en":"Hello, World! Error (changed)","ru":"Привет, мир! Ошибка (изменено)","de":"Hallo, Welt! Fehler (geändert)"},"HELP_MESSAGE":{"en":"Hello, World! Help (changed)","ru":"Привет, мир! Помощь (изменено)","de":"Hallo, Welt! Hilfe (geändert)"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.userfield.update
    ```

- JS

    ```js
    BX24.callMethod(
        'crm.deal.userfield.update',
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
        'crm.deal.userfield.update',
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

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1753790234.592207,
        "finish": 1753790234.762644,
        "duration": 0.17043709754943848,
        "processing": 0.11566615104675293,
        "date_start": "2025-07-29T14:57:14+03:00",
        "date_finish": "2025-07-29T14:57:14+03:00",
        "operating_reset_at": 1753790834,
        "operating": 0.11564803123474121
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа, содержит `true` в случае успеха ||
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
|| `400`     | `Parameter 'fields' must be array` | Переданный `fields` не является объектом ||
|| `400`     | `ID is not defined or invalid`     | Переданный `id` меньше нуля или не передан вовсе ||
|| `403`     | `Access denied`                    | Возникает в случаях, когда:
- у пользователя нет административных прав
- пользователь пытается изменить пользовательское поле, не привязанное к сделкам ||
|| `ERROR_NOT_FOUND` | `The entity with ID 'id' is not found` | Пользовательского поля с переданным `id` не существует ||
|| `ERROR_CORE`               | `Элемент списка со значением XML_ID='XML_ID' уже существует` | Переданный `XML_ID` у элемента списка обязан быть уникальным в рамках элементов списка отдельно взятого пользовательского поля ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-deal-userfield-add.md)
- [{#T}](./crm-deal-userfield-get.md)
- [{#T}](./crm-deal-userfield-list.md)
- [{#T}](./crm-deal-userfield-delete.md)