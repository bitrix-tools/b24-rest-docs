# Добавить пользовательское поле userfieldconfig.add

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`userfieldconfig`](../../../scopes/permissions.md), scope модуля из `moduleId` (например, [`crm`](../../../scopes/permissions.md))
>
> Кто может выполнять метод: пользователь с правом изменения настроек объекта в модуле `moduleId` (для `crm` — право «Разрешить изменять настройки»)

Метод `userfieldconfig.add` добавляет новое пользовательское поле.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **moduleId***
[`string`](../../../data-types.md) | Идентификатор модуля, в котором создается поле ||
|| **field***
[`object`](../../../data-types.md) | Объект с настройками пользовательского поля [(подробное описание)](#field) ||
|#

### Параметр field {#field}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityId***
[`string`](../../../data-types.md) | Идентификатор объекта, для которого создается поле. Формат зависит от модуля, например `CRM_7` для смарт-процесса ||
|| **fieldName***
[`string`](../../../data-types.md) | Код поля в формате `UF_{ИДЕНТИФИКАТОР_ОБЪЕКТА}_{POSTFIX}`. Код должен быть уникальным в рамках объекта. Допустимы символы `A-Z`, `0-9`, `_`. Максимальная длина кода 50 символов ||
|| **userTypeId***
[`string`](../../../data-types.md) | Идентификатор типа поля. Список доступных типов возвращает метод [userfieldconfig.getTypes](./userfieldconfig-get-types.md) ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний идентификатор поля ||
|| **sort**
[`integer`](../../../data-types.md) | Индекс сортировки. По умолчанию `100` ||
|| **multiple**
[`boolean`](../../../data-types.md) | Является ли поле множественным. Возможные значения: `Y` или `N`. По умолчанию `N` ||
|| **mandatory**
[`boolean`](../../../data-types.md) | Является ли поле обязательным. Возможные значения: `Y` или `N`. По умолчанию `N` ||
|| **showFilter**
[`boolean`](../../../data-types.md) | Показывать ли поле в фильтре. Возможные значения: `Y` или `N`. По умолчанию `N` ||
|| **editInList**
[`boolean`](../../../data-types.md) | Разрешать ли редактирование значения в списке. Возможные значения: `Y` или `N` ||
|| **isSearchable**
[`boolean`](../../../data-types.md) | Участвуют ли значения поля в поиске. Возможные значения: `Y` или `N` ||
|| **settings**
[`object`](../../../data-types.md) | Дополнительные настройки поля. Набор ключей зависит от `userTypeId` [(подробное описание)](#settings) ||
|| **editFormLabel**
[`string`](../../../data-types.md)\|[`lang_map`](../../../data-types.md#lang_map) | Подпись в форме редактирования. При передаче строки используется как общее значение, при передаче `lang_map` можно задать подпись по языкам ||
|| **helpMessage**
[`string`](../../../data-types.md)\|[`lang_map`](../../../data-types.md#lang_map) | Текст подсказки. При передаче строки используется как общее значение, при передаче `lang_map` можно задать подсказку по языкам ||
|| **enum**
[`uf_enum_element[]`](#uf_enum_element) | Варианты значений для поля типа `enumeration` ||
|#

Метод использует фиксированный набор ключей в `field` (см. таблицу выше).

Некорректные и неподдерживаемые ключи в `field` игнорируются.

Ключи `showInList`, `listColumnLabel`, `listFilterLabel`, `errorMessage`, `label` не обрабатываются методом `userfieldconfig.add`, даже если переданы в `field`.

### Параметр settings {#settings}

У каждого типа поля существует свой набор ключей в `settings`.

{% list tabs %}

- string

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`string`](../../../data-types.md) | Значение по умолчанию ||
    || **ROWS**
    [`integer`](../../../data-types.md) | Количество строк в поле ввода, должно быть больше 0 ||
    || **SIZE**
    [`integer`](../../../data-types.md) | Ширина поля ввода ||
    || **REGEXP**
    [`string`](../../../data-types.md) | Регулярное выражение для валидации ||
    || **MIN_LENGTH**
    [`integer`](../../../data-types.md) | Минимальная длина строки ||
    || **MAX_LENGTH**
    [`integer`](../../../data-types.md) | Максимальная длина строки ||
    |#

- integer

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`integer`](../../../data-types.md) | Значение по умолчанию ||
    || **SIZE**
    [`integer`](../../../data-types.md) | Ширина поля ввода ||
    || **MIN_VALUE**
    [`integer`](../../../data-types.md) | Минимальное значение ||
    || **MAX_VALUE**
    [`integer`](../../../data-types.md) | Максимальное значение ||
    |#

- double

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`double`](../../../data-types.md) | Значение по умолчанию ||
    || **PRECISION**
    [`integer`](../../../data-types.md) | Точность числа, должна быть больше или равна 0 ||
    || **SIZE**
    [`integer`](../../../data-types.md) | Ширина поля ввода ||
    || **MIN_VALUE**
    [`double`](../../../data-types.md) | Минимальное значение ||
    || **MAX_VALUE**
    [`double`](../../../data-types.md) | Максимальное значение ||
    |#

- boolean

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`integer`](../../../data-types.md) | Значение по умолчанию, где `1` = да и `0` = нет ||
    || **DISPLAY**
    [`string`](../../../data-types.md) | Внешний вид, возможные значения: `CHECKBOX`, `RADIO`, `DROPDOWN` ||
    || **LABEL**
    [`string`](../../../data-types.md) | Подпись значения Да ||
    || **LABEL_CHECKBOX**
    [`string`](../../../data-types.md) | Подпись для режима `CHECKBOX` ||
    |#

- date|datetime

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`object`](../../../data-types.md) | Значение по умолчанию в формате `{VALUE, TYPE}`, где `TYPE`: `NONE`, `NOW`, `FIXED` ||
    || **USE_SECOND**
    [`boolean`](../../../data-types.md) | Использовать секунды в поле `datetime` ||
    || **USE_TIMEZONE**
    [`boolean`](../../../data-types.md) | Использовать часовой пояс в поле `datetime` ||
    |#

- money

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`string`](../../../data-types.md) | Значение по умолчанию в формате `{VALUE}|{CURRENCY}` ||
    |#

- url

    #|
    || **Название**
    `тип` | **Описание** ||
    || **POPUP**
    [`boolean`](../../../data-types.md) | Открывать ссылку в новом окне ||
    || **SIZE**
    [`integer`](../../../data-types.md) | Ширина поля ввода ||
    || **MIN_LENGTH**
    [`integer`](../../../data-types.md) | Минимальная длина значения ||
    || **MAX_LENGTH**
    [`integer`](../../../data-types.md) | Максимальная длина значения ||
    || **DEFAULT_VALUE**
    [`string`](../../../data-types.md) | Значение по умолчанию ||
    || **ROWS**
    [`integer`](../../../data-types.md) | Количество строк в поле ввода ||
    |#

- address

    #|
    || **Название**
    `тип` | **Описание** ||
    || **SHOW_MAP**
    [`boolean`](../../../data-types.md) | Показывать карту для адреса ||
    |#

- file

    #|
    || **Название**
    `тип` | **Описание** ||
    || **SIZE**
    [`integer`](../../../data-types.md) | Ширина поля ввода ||
    || **LIST_WIDTH**
    [`integer`](../../../data-types.md) | Ширина превью в списке ||
    || **LIST_HEIGHT**
    [`integer`](../../../data-types.md) | Высота превью в списке ||
    || **MAX_SHOW_SIZE**
    [`integer`](../../../data-types.md) | Максимальный размер файла для показа ||
    || **MAX_ALLOWED_SIZE**
    [`integer`](../../../data-types.md) | Максимально допустимый размер файла ||
    || **EXTENSIONS**
    [`string[]`](../../../data-types.md) | Список разрешенных расширений ||
    || **TARGET_BLANK**
    [`boolean`](../../../data-types.md) | Открывать файл в новой вкладке ||
    |#

- enumeration

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DISPLAY**
    [`string`](../../../data-types.md) | Внешний вид, возможные значения: `LIST`, `UI`, `CHECKBOX`, `DIALOG` ||
    || **LIST_HEIGHT**
    [`integer`](../../../data-types.md) | Высота списка, должна быть больше 0 ||
    || **CAPTION_NO_VALUE**
    [`string`](../../../data-types.md) | Подпись пустого значения ||
    || **SHOW_NO_VALUE**
    [`boolean`](../../../data-types.md) | Показывать пустое значение ||
    |#

- iblock_section|iblock_element

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DISPLAY**
    [`string`](../../../data-types.md) | Внешний вид, возможные значения: `DIALOG`, `UI`, `LIST`, `CHECKBOX` ||
    || **LIST_HEIGHT**
    [`integer`](../../../data-types.md) | Высота списка, должна быть больше 0 ||
    || **IBLOCK_ID**
    [`integer`](../../../data-types.md) | Идентификатор инфоблока ||
    || **DEFAULT_VALUE**
    [`string`](../../../data-types.md) | Значение по умолчанию ||
    || **ACTIVE_FILTER**
    [`boolean`](../../../data-types.md) | Использовать только активные элементы ||
    |#

- crm_status

    #|
    || **Название**
    `тип` | **Описание** ||
|| **ENTITY_TYPE**
[`string`](../../../data-types.md) | Идентификатор типа справочника CRM. Возможные значения можно получить методом [`crm.status.entity.types`](../../status/crm-status-entity-types.md) ||
    |#

- crm

    #|
    || **Название**
    `тип` | **Описание** ||
    || **LEAD**
    [`boolean`](../../../data-types.md) | Включить привязку к лидам ||
    || **CONTACT**
    [`boolean`](../../../data-types.md) | Включить привязку к контактам ||
    || **COMPANY**
    [`boolean`](../../../data-types.md) | Включить привязку к компаниям ||
    || **DEAL**
    [`boolean`](../../../data-types.md) | Включить привязку к сделкам ||
    || **QUOTE**
    [`boolean`](../../../data-types.md) | Включить привязку к предложениям ||
    || **ORDER**
    [`boolean`](../../../data-types.md) | Включить привязку к заказам ||
    || **SMART_INVOICE**
    [`boolean`](../../../data-types.md) | Включить привязку к счетам ||
    || **DYNAMIC_***
    [`boolean`](../../../data-types.md) | Включить привязку к смарт-процессу с конкретным `typeId` ||
    |#

- employee

    Отдельные настройки в `settings` для типа `employee` не используются

- rest_*

    Настройки определяются обработчиком пользовательского типа поля

{% endlist %}

### Тип uf_enum_element {#uf_enum_element}

#|
|| **Название**
`тип` | **Описание** ||
|| **value***
[`string`](../../../data-types.md) | Значение варианта списка ||
|| **def**
[`boolean`](../../../data-types.md) | Флаг значения по умолчанию (`Y`/`N`) ||
|| **sort**
[`integer`](../../../data-types.md) | Индекс сортировки варианта ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний идентификатор варианта ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "moduleId": "crm",
        "field": {
          "entityId": "CRM_7",
          "fieldName": "UF_CRM_7_NEW_REST_LIST_2026",
          "userTypeId": "enumeration",
          "multiple": "Y",
          "editFormLabel": {
            "ru": "Список характеристик",
            "en": "List of characteristics"
          },
          "enum": [
            { "value": "Характеристика 1", "def": "N", "sort": 100 },
            { "value": "Характеристика 2", "def": "Y", "sort": 200 }
          ]
        }
      }' \
      "https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/userfieldconfig.add"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "moduleId": "crm",
        "field": {
          "entityId": "CRM_7",
          "fieldName": "UF_CRM_7_NEW_REST_LIST_2026",
          "userTypeId": "enumeration",
          "multiple": "Y",
          "editFormLabel": {
            "ru": "Список характеристик",
            "en": "List of characteristics"
          },
          "enum": [
            { "value": "Характеристика 1", "def": "N", "sort": 100 },
            { "value": "Характеристика 2", "def": "Y", "sort": 200 }
          ]
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put_your_bitrix24_address**/rest/userfieldconfig.add"
    ```

- JS

    ```js
    const endpoint = "https://**put_your_bitrix24_address**/rest/userfieldconfig.add.json";

    fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            auth: "**put_access_token_here**",
            moduleId: "crm",
            field: {
                entityId: "CRM_7",
                fieldName: "UF_CRM_7_NEW_REST_LIST_2026",
                userTypeId: "enumeration",
                multiple: "Y",
                editFormLabel: {
                    ru: "Список характеристик",
                    en: "List of characteristics",
                },
                enum: [
                    { value: "Характеристика 1", def: "N", sort: 100 },
                    { value: "Характеристика 2", def: "Y", sort: 200 },
                ],
            },
        }),
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    ```

- PHP

    ```php
    $payload = [
        'auth' => '**put_access_token_here**',
        'moduleId' => 'crm',
        'field' => [
            'entityId' => 'CRM_7',
            'fieldName' => 'UF_CRM_7_NEW_REST_LIST_2026',
            'userTypeId' => 'enumeration',
            'multiple' => 'Y',
            'editFormLabel' => [
                'ru' => 'Список характеристик',
                'en' => 'List of characteristics',
            ],
            'enum' => [
                ['value' => 'Характеристика 1', 'def' => 'N', 'sort' => 100],
                ['value' => 'Характеристика 2', 'def' => 'Y', 'sort' => 200],
            ],
        ],
    ];

    $curl = curl_init('https://**put_your_bitrix24_address**/rest/userfieldconfig.add.json');
    curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode($payload),
    ]);

    $result = curl_exec($curl);
    curl_close($curl);

    print_r($result);
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "userfieldconfig.add",
        {
            moduleId: "crm",
            field: {
                entityId: "CRM_7",
                fieldName: "UF_CRM_7_NEW_REST_LIST_2026",
                userTypeId: "enumeration",
                multiple: "Y",
                editFormLabel: {
                    ru: "Список характеристик",
                    en: "List of characteristics",
                },
                enum: [
                    { value: "Характеристика 1", def: "N", sort: 100 },
                    { value: "Характеристика 2", def: "Y", sort: 200 },
                ],
            },
        },
        (result) => {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'userfieldconfig.add',
        [
            'moduleId' => 'crm',
            'field' => [
                'entityId' => 'CRM_7',
                'fieldName' => 'UF_CRM_7_NEW_REST_LIST_2026',
                'userTypeId' => 'enumeration',
                'multiple' => 'Y',
                'editFormLabel' => [
                    'ru' => 'Список характеристик',
                    'en' => 'List of characteristics',
                ],
                'enum' => [
                    ['value' => 'Характеристика 1', 'def' => 'N', 'sort' => 100],
                    ['value' => 'Характеристика 2', 'def' => 'Y', 'sort' => 200],
                ],
            ],
        ]
    );

    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "field": {
            "id": "6953",
            "entityId": "CRM_7",
            "fieldName": "UF_CRM_7_NEW_REST_LIST_2026",
            "userTypeId": "enumeration",
            "xmlId": null,
            "sort": "100",
            "multiple": "Y",
            "mandatory": "N",
            "showFilter": "N",
            "showInList": "Y",
            "editInList": "Y",
            "isSearchable": "N",
            "settings": {
                "DISPLAY": "LIST",
                "LIST_HEIGHT": 1,
                "CAPTION_NO_VALUE": "",
                "SHOW_NO_VALUE": "Y"
            },
            "languageId": {
                "en": "en",
                "ru": "ru"
            },
            "editFormLabel": {
                "en": "List of characteristics",
                "ru": "Список характеристик"
            },
            "listColumnLabel": {
                "en": null,
                "ru": null
            },
            "listFilterLabel": {
                "en": null,
                "ru": null
            },
            "errorMessage": {
                "en": null,
                "ru": null
            },
            "helpMessage": {
                "en": null,
                "ru": null
            },
            "enum": [
                {
                    "id": "3363",
                    "userFieldId": "6953",
                    "value": "Характеристика 1",
                    "def": "N",
                    "sort": "100",
                    "xmlId": "56dff18efcfe25f3bae0117a6b372567"
                },
                {
                    "id": "3365",
                    "userFieldId": "6953",
                    "value": "Характеристика 2",
                    "def": "Y",
                    "sort": "200",
                    "xmlId": "42e3ebcf5506a65283bf3bf510d8f05a"
                }
            ]
        }
    },
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
[`object`](../../../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **field**
[`object`](../../../data-types.md) | Настройки созданного пользовательского поля [(подробное описание)](#result_field) ||
|#

##### Объект field {#result_field}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор настроек поля ||
|| **entityId**
[`string`](../../../data-types.md) | Идентификатор объекта ||
|| **fieldName**
[`string`](../../../data-types.md) | Код поля ||
|| **userTypeId**
[`string`](../../../data-types.md) | Идентификатор типа поля ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний идентификатор поля ||
|| **sort**
[`integer`](../../../data-types.md) | Индекс сортировки ||
|| **multiple**
[`boolean`](../../../data-types.md) | Флаг множественного значения (`Y`/`N`) ||
|| **mandatory**
[`boolean`](../../../data-types.md) | Флаг обязательного поля (`Y`/`N`) ||
|| **showFilter**
[`boolean`](../../../data-types.md) | Флаг показа поля в фильтре ||
|| **showInList**
[`boolean`](../../../data-types.md) | Флаг показа поля в списке ||
|| **editInList**
[`boolean`](../../../data-types.md) | Флаг редактирования в списке ||
|| **isSearchable**
[`boolean`](../../../data-types.md) | Флаг участия в поиске ||
|| **settings**
[`object`](../../../data-types.md) | Дополнительные настройки поля[(подробное описание)](#settings).

Состав ключей зависит от `userTypeId` ||
|| **languageId**
[`object`](../../../data-types.md) | Языки, для которых заданы подписи поля ||
|| **editFormLabel**
[`lang_map`](../../../data-types.md) | Подписи в форме редактирования ||
|| **listColumnLabel**
[`lang_map`](../../../data-types.md) | Подписи колонки в списке ||
|| **listFilterLabel**
[`lang_map`](../../../data-types.md) | Подписи в фильтре ||
|| **errorMessage**
[`lang_map`](../../../data-types.md) | Текст сообщения об ошибке ||
|| **helpMessage**
[`lang_map`](../../../data-types.md) | Подсказка по полю ||
|| **enum**
[`object[]`](../../../data-types.md) | Варианты значений.

Поле возвращается только для `userTypeId = enumeration` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "The 'FIELD_NAME' field is not found."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | Access denied | Недостаточно прав для создания пользовательского поля ||
|| `-` | Вы не можете создавать пользовательские поля | Ошибка может возвращаться, если `field.fieldName` не начинается с `UF_{entityId}_` ||
|| `-` | The 'USER_TYPE_ID' field is not found | Не передан обязательный `field.userTypeId` ||
|| `-` | The 'FIELD_NAME' field is not found | Не передан обязательный `field.fieldName` ||
|| `-` | Поле ... уже существует | Переданный `field.fieldName` уже используется для этого объекта ||
|| `-` | Fail to create new user field | Ошибка создания поля на стороне сервера ||
|| `-` | Fail to save enumeration field values | Ошибка сохранения значений списка для типа `enumeration` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./userfieldconfig-update.md)
- [{#T}](./userfieldconfig-get.md)
- [{#T}](./userfieldconfig-list.md)
- [{#T}](./userfieldconfig-delete.md)
- [{#T}](./userfieldconfig-get-types.md)
