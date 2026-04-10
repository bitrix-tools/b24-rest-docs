# Обновить пользовательское поле userfieldconfig.update

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`userfieldconfig`](../../../../scopes/permissions.md), scope модуля из `moduleId` (например, [`crm`](../../../../scopes/permissions.md))
>
> Кто может выполнять метод: пользователь с правом изменения настроек объекта в модуле `moduleId` (для `crm` — право «Разрешить изменять настройки»)

Метод `userfieldconfig.update` обновляет настройки существующего пользовательского поля.

## Параметры метода

{% include [Сноска о параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **moduleId***
[`string`](../../../data-types.md) | Идентификатор модуля, в котором находится поле ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор настроек пользовательского поля ||
|| **field***
[`object`](../../../data-types.md) | Объект с новыми настройками поля [(подробное описание)](#field) ||
|#

### Параметр field {#field}

#|
|| **Название**
`тип` | **Описание** ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний идентификатор поля ||
|| **sort**
[`integer`](../../../data-types.md) | Индекс сортировки ||
|| **mandatory**
[`boolean`](../../../data-types.md) | Флаг обязательного поля (`Y`/`N`) ||
|| **showFilter**
[`boolean`](../../../data-types.md) | Флаг показа поля в фильтре (`Y`/`N`) ||
|| **isSearchable**
[`boolean`](../../../data-types.md) | Флаг участия поля в поиске (`Y`/`N`) ||
|| **editFormLabel**
[`lang_map`](../../../data-types.md) | Подписи в форме редактирования по языкам ||
|| **helpMessage**
[`lang_map`](../../../data-types.md) | Текст подсказки по языкам ||
|| **settings**
[`object`](../../../data-types.md) | Дополнительные настройки поля. Набор ключей зависит от типа поля [(подробное описание)](#settings) ||
|| **enum**
[`uf_enum_element[]`](#uf_enum_element) | Список вариантов значений для поля типа `enumeration`.

Чтобы изменения `enum` применились, в `field.userTypeId` нужно передать `enumeration` ||
|| **userTypeId**
[`string`](../../../data-types.md) | Тип поля.

Используется при обновлении `enum`, в этом случае передайте `enumeration` ||
|#

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
    [`string`](../../../data-types.md) | Идентификатор типа справочника CRM. Возможные значения можно получить методом [`crm.status.entity.types`](../../../status/crm-status-entity-types.md) ||
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
|| **id**
[`integer`](../../../data-types.md) | Идентификатор существующего варианта. Используется для обновления или удаления ||
|| **value**
[`string`](../../../data-types.md) | Значение варианта ||
|| **def**
[`boolean`](../../../data-types.md) | Флаг значения по умолчанию (`Y`/`N`) ||
|| **sort**
[`integer`](../../../data-types.md) | Индекс сортировки ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний идентификатор варианта ||
|| **del**
[`boolean`](../../../data-types.md) | Флаг удаления существующего варианта (`Y`/`N`) ||
|#

{% note info "" %}

Некоторые параметры поля нельзя изменить после создания. Если передать их в `field`, изменение не будет применено

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"moduleId":"crm","id":7095,"field":{"mandatory":"Y","editFormLabel":{"ru":"Список характеристик (обновлено)","en":"List of characteristics (updated)"}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/userfieldconfig.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"moduleId":"crm","id":7095,"field":{"mandatory":"Y","editFormLabel":{"ru":"Список характеристик (обновлено)","en":"List of characteristics (updated)"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/userfieldconfig.update
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'userfieldconfig.update',
    		{
    			moduleId: 'crm',
    			id: 7095,
    			field: {
    				mandatory: 'Y',
    				editFormLabel: {
    					ru: 'Список характеристик (обновлено)',
    					en: 'List of characteristics (updated)',
    				},
    			},
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch (error)
    {
    	console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'userfieldconfig.update',
                [
                    'moduleId' => 'crm',
                    'id' => 7095,
                    'field' => [
                        'mandatory' => 'Y',
                        'editFormLabel' => [
                            'ru' => 'Список характеристик (обновлено)',
                            'en' => 'List of characteristics (updated)',
                        ],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Result: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'userfieldconfig.update',
        {
            moduleId: 'crm',
            id: 7095,
            field: {
                mandatory: 'Y',
                editFormLabel: {
                    ru: 'Список характеристик (обновлено)',
                    en: 'List of characteristics (updated)',
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

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'userfieldconfig.update',
        [
            'moduleId' => 'crm',
            'id' => 7095,
            'field' => [
                'mandatory' => 'Y',
                'editFormLabel' => [
                    'ru' => 'Список характеристик (обновлено)',
                    'en' => 'List of characteristics (updated)',
                ],
            ],
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
    "result": {
        "field": {
            "id": "7095",
            "entityId": "CRM_7",
            "fieldName": "UF_CRM_7_NEW_REST_LIST_2026",
            "userTypeId": "enumeration",
            "xmlId": null,
            "sort": "100",
            "multiple": "Y",
            "mandatory": "Y",
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
                "en": "List of characteristics (updated)",
                "ru": "Список характеристик (обновлено)"
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
                    "id": "3671",
                    "userFieldId": "7095",
                    "value": "Характеристика 1",
                    "def": "N",
                    "sort": "100",
                    "xmlId": "38a8c98a5de02f8ccdca2244e5065ecd"
                },
                {
                    "id": "3673",
                    "userFieldId": "7095",
                    "value": "Характеристика 2",
                    "def": "Y",
                    "sort": "200",
                    "xmlId": "9520e17b39f3525b820b809914b52207"
                }
            ]
        }
    },
    "time": {
        "start": 1774356026,
        "finish": 1774356026.949068,
        "duration": 0.9490680694580078,
        "processing": 0,
        "date_start": "2026-03-24T15:40:26+03:00",
        "date_finish": "2026-03-24T15:40:26+03:00",
        "operating_reset_at": 1774356626,
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
[`object`](../../../data-types.md) | Настройки обновленного пользовательского поля [(подробное описание)](#result_field) ||
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
[`object`](../../../data-types.md) | Дополнительные настройки поля. См. [Параметр settings](#settings).

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
    "error_description": "Вы не можете изменить настройки пользьовательского поля"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | Вы не можете изменить настройки пользовательского поля | Недостаточно прав на изменение поля. Эта же ошибка возвращается, если поле с переданным `id` уже удалено или недоступно в контексте `moduleId` ||
|| `-` | The current method required more scopes. (crm) | У приложения нет нужного scope для модуля из `moduleId` ||
|| `-` | No settings for UserFieldAccess | Для переданного `moduleId` не настроен доступ к пользовательским полям ||
|| `-` | Ошибка при попытке изменения настроек пользовательских полей | Общая ошибка изменения поля ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./userfieldconfig-add.md)
- [{#T}](./userfieldconfig-get.md)
- [{#T}](./userfieldconfig-list.md)
- [{#T}](./userfieldconfig-delete.md)
- [{#T}](./userfieldconfig-get-types.md)
