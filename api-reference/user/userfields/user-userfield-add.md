# Добавить пользовательское поле user.userfield.add

> Scope: [`user.userfield`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `user.userfield.add` добавляет пользовательское поле.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md)| Значения полей для добавления нового пользовательского поля ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **FIELD_NAME***
[`string`](../../data-types.md)| Название (код) поля. Дополняется префиксом `UF_USR_`
 ||
|| **USER_TYPE_ID***
[`string`](../../data-types.md)| Тип пользовательского поля. Возможные значения:
- `string` — строка
- `integer` — целое число
- `double` — число
- `date` — дата
- `datetime` — дата со временем
- `boolean` — Да / Нет
- `file` — файл
- `enumeration` — список
- `url` — ссылка
- `address` — адрес Google карты
- `money` — деньги
- `iblock_section` — Привязка к разделу инфоблока
- `iblock_element` — Привязка к элементу инфоблока
- `employee` — Привязка к пользователю
- `crm` — Привязка к элементу CRM
- `crm_status` — Привязка к справочнику CRM ||
|| **XML_ID**
[`string`](../../data-types.md)| Внешний код ||
|| **SORT**
[`integer`](../../data-types.md)| Порядок сортировки ||
|| **MULTIPLE**
[`boolean`](../../data-types.md)| Является ли поле множественным. Возможные значения:
- `Y` — да
- `N` — нет
 ||
|| **MANDATORY**
[`boolean`](../../data-types.md)| Является ли пользовательское поле обязательным. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **SHOW_FILTER**
[`boolean`](../../data-types.md)| Показывать ли поле в фильтре списка. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **SHOW_IN_LIST**
[`boolean`](../../data-types.md)| Показывать ли поле в списке. Возможные значения:
- `Y` — да
- `N` — нет ||
- || **EDIT_IN_LIST**
[`boolean`](../../data-types.md)| Редактировать ли поле в списке. Возможные значения:
- `Y` — да
- `N` — нет ||
- || **IS_SEARCHABLE**
[`boolean`](../../data-types.md)| Участвует ли поле в поиске. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **SETTINGS**
[`object`](../../data-types.md)| Объект в формате `{"field_1": "value_1", ... "field_N": "value_N"}` для передачи дополнительных настроек пользовательских полей. Настройки описаны [ниже](#settings) ||
|| **EDIT_FORM_LABEL**
[`string`](../../data-types.md)| Подпись в форме редактирования. Можно передать строку или объект с подписями по языкам в формате `{"ru": "...", "en": "..."}`. При передаче строки значение будет выставлено для всех языков ||
|| **LIST_COLUMN_LABEL**
[`string`](../../data-types.md)| Заголовок столбца в списке. Можно передать строку или объект с подписями по языкам в формате `{"ru": "...", "en": "..."}`. При передаче строки значение будет выставлено для всех языков ||
|| **LIST_FILTER_LABEL**
[`string`](../../data-types.md)| Заголовок фильтра в списке. Можно передать строку или объект с подписями по языкам в формате `{"ru": "...", "en": "..."}`. При передаче строки значение будет выставлено для всех языков ||
|| **ERROR_MESSAGE**
[`string`](../../data-types.md)| Сообщение об ошибке при невалидном вводе. Можно передать строку или объект с текстами по языкам в формате `{"ru": "...", "en": "..."}`. При передаче строки значение будет выставлено для всех языков ||
|| **HELP_MESSAGE**
[`string`](../../data-types.md)| Текст подсказки к полю. Можно передать строку или объект с текстами по языкам в формате `{"ru": "...", "en": "..."}`. При передаче строки значение будет выставлено для всех языков ||
|| **LABEL**
[`string`](../../data-types.md)| Название пользовательского поля по умолчанию. 

Значение будет выставлено в поля `LIST_FILTER_LABEL`, `LIST_COLUMN_LABEL`, `EDIT_FORM_LABEL`, `ERROR_MESSAGE`, `HELP_MESSAGE`, если в них не передано значение ||
|#

### Параметр SETTINGS {#settings}

У каждого типа пользовательских полей существует свой набор дополнительных настроек.

{% list tabs %}

- string

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`string`](../../data-types.md) | Значение по умолчанию.

    По умолчанию `''` ||
    || **ROWS**
    [`integer`](../../data-types.md) | Количество строк в поле ввода. Обязательно больше 0.

    По умолчанию `1` ||
    |#

- integer

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`integer`](../../data-types.md) | Значение по умолчанию ||
    |#

- double

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`double`](../../data-types.md) | Значение по умолчанию ||
    || **PRECISION**
    [`integer`](../../data-types.md) | Точность числа. Обязательно больше или равно 0.

    По умолчанию `2` ||
    |#

- boolean

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`integer`](../../data-types.md) | Значение по умолчанию, где `1` — да, `0` — нет.

    Возможные значения:
    - `>= 1` -> 1
    - `<= 0` -> 0

    По умолчанию `0` ||
    || **DISPLAY**
    [`string`](../../data-types.md) | Внешний вид. Возможные значения:
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
    [`object`](../../data-types.md)  | Значение по умолчанию.

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
    ```
    ||
    |#

- enumeration

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DISPLAY**
    [`string`](../../data-types.md) | Внешний вид. Возможные значения:
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
    [`string`](../../data-types.md) | Идентификатор типа инфоблока.

    По умолчанию `''` ||
    || **IBLOCK_ID**
    [`string`](../../data-types.md) | Идентификатор инфоблока.

    По умолчанию `0` ||
    || **DEFAULT_VALUE**
    [`string`](../../data-types.md) | Значение по умолчанию.

    По умолчанию `''` ||
    || **DISPLAY**
    [`string`](../../data-types.md) | Внешний вид. Возможные значения:
    - `DIALOG` — диалог
    - `UI` — набираемый список
    - `LIST` — список
    - `CHECKBOX` — флажки

    По умолчанию `LIST` ||
    || **LIST_HEIGHT**
    [`integer`](../../data-types.md) | Высота списка. Обязательно больше 0.

    По умолчанию `1` ||
    || **ACTIVE_FILTER**
    [`boolean`](../../data-types.md) | Показывать ли элементы с включенным флагом активности. Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    |#

- crm_status

    #|
    || **Название**
    `тип` | **Описание** ||
    || **ENTITY_TYPE**
    [`string`](../../data-types.md) | Идентификатор типа справочника.

    Используйте [`crm.status.entity.types`](../../crm/status/crm-status-entity-types.md), чтобы узнать возможные значения.

    По умолчанию `''` ||
    |#

- crm

    Если не передать ни одну из следующих опций, то по умолчанию будет включена привязка к лидам (`LEAD = Y`).

    #|
    || **Название**
    `тип` | **Описание** ||
    || **LEAD**
    [`boolean`](../../data-types.md) | Включена ли привязка к [Лидам](../../crm/leads/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    || **CONTACT**
    [`boolean`](../../data-types.md) | Включена ли привязка к [Контактам](../../crm/contacts/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    || **COMPANY**
    [`boolean`](../../data-types.md) | Включена ли привязка к [Компаниям](../../crm/companies/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    || **DEAL**
    [`boolean`](../../data-types.md) | Включена ли привязка к [Сделкам](../../crm/deals/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    |#

{% endlist %}

{% note info "" %}

Если необходимо через API создать пользовательское поле с добавленным пользовательским типом, в поле `USER_TYPE_ID` необходимо указывать `rest_<номер приложения>_<USER_TYPE_ID добавленного типа>`. Например `rest_436278_test_type`.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields": {
            "FIELD_NAME": "UF_USER_DEALS",
            "USER_TYPE_ID": "crm",
            "XML_ID": "UF_CRM_DEALS",
            "SORT": 100,
            "MULTIPLE": "Y",
            "MANDATORY": "N",
            "SHOW_FILTER": "N",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "SETTINGS": {
                "DEAL": "Y"
            },
            "LABEL": "Привязка к сделкам CRM",
            "EDIT_FORM_LABEL": {
                "ru": "Привязка к сделкам CRM"
            }
        }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/user.userfield.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields": {
            "FIELD_NAME": "UF_USER_DEALS",
            "USER_TYPE_ID": "crm",
            "XML_ID": "UF_CRM_DEALS",
            "SORT": 100,
            "MULTIPLE": "Y",
            "MANDATORY": "N",
            "SHOW_FILTER": "N",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "SETTINGS": {
                "DEAL": "Y"
            },
            "LABEL": "Привязка к сделкам CRM",
            "EDIT_FORM_LABEL": {
                "ru": "Привязка к сделкам CRM"
            }
        },
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/user.userfield.add
    ```
    
- JS

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'user.userfield.add',
            {
                fields: {
                    FIELD_NAME: 'UF_USER_DEALS',
                    USER_TYPE_ID: 'crm',
                    XML_ID: 'UF_CRM_DEALS',
                    SORT: 100,
                    MULTIPLE: 'Y',
                    MANDATORY: 'N',
                    SHOW_FILTER: 'N',
                    SHOW_IN_LIST: 'Y',
                    EDIT_IN_LIST: 'Y',
                    SETTINGS: {
                        DEAL: 'Y',
                    },
                    LABEL: 'Привязка к сделкам CRM',
                    EDIT_FORM_LABEL: {
                        ru: 'Привязка к сделкам CRM'
                    },
                }
            }
        );

        const result = response.getData().result;
        console.log('Created element with ID:', result);
        processResult(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'user.userfield.add',
                [
                    'fields' => [
                        'FIELD_NAME' => 'UF_USER_DEALS',
                        'USER_TYPE_ID' => 'crm',
                        'XML_ID' => 'UF_CRM_DEALS',
                        'SORT' => 100,
                        'MULTIPLE' => 'Y',
                        'MANDATORY' => 'N',
                        'SHOW_FILTER' => 'N',
                        'SHOW_IN_LIST' => 'Y',
                        'EDIT_IN_LIST' => 'Y',
                        'SETTINGS' => [
                            'DEAL' => 'Y',
                        ],
                        'LABEL' => 'Привязка к сделкам CRM',
                        'EDIT_FORM_LABEL' => [
                            'ru' => 'Привязка к сделкам CRM'
                        ],
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding user field: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'user.userfield.add', 
        {
            fields: {
                FIELD_NAME: "UF_USER_DEALS",
                USER_TYPE_ID: "crm",
                XML_ID: "UF_CRM_DEALS",
                SORT: 100,
                MULTIPLE: "Y",
                MANDATORY: "N",
                SHOW_FILTER: "N",
                SHOW_IN_LIST: "Y",
                EDIT_IN_LIST: "Y",
                SETTINGS: {
                    DEAL: "Y",
                },
                LABEL: "Привязка к сделкам CRM",
                EDIT_FORM_LABEL: {
                    ru: "Привязка к сделкам CRM"
                },
            },
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'user.userfield.add',
        [
            'fields' => [
                'FIELD_NAME' => 'UF_USER_DEALS',
                'USER_TYPE_ID' => 'crm',
                'XML_ID' => 'UF_CRM_DEALS',
                'SORT' => 100,
                'MULTIPLE' => 'Y',
                'MANDATORY' => 'N',
                'SHOW_FILTER' => 'N',
                'SHOW_IN_LIST' => 'Y',
                'EDIT_IN_LIST' => 'Y',
                'SETTINGS' => [
                    'DEAL' => 'Y',
                ],
                'LABEL' => 'Привязка к сделкам CRM',
                'EDIT_FORM_LABEL' => [
                    'ru' => 'Привязка к сделкам CRM'
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
    "result":177,
    "time":{
        "start":1747301035.550121,
        "finish":1747301037.514112,
        "duration":1.9639909267425537,
        "processing":0.5865437984466553,
        "date_start":"2025-05-15T11:23:55+02:00",
        "date_finish":"2025-05-15T11:23:57+02:00",
        "operating":0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор созданного пользовательского поля ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":"",
   "error_description":"The \u0027FIELD_NAME\u0027 field is not found."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| ERROR_ARGUMENT | Argument 'USER_TYPE_ID' is null or empty | Не задан `USER_TYPE_ID` ||
|| ERROR_ARGUMENT | Argument 'HANDLER' is null or empty | Не задан `HANDLER` ||
|| ERROR_CORE | Поле \*** для объекта USER уже существует | Поле \*** для объекта `USER` уже существует ||
|| ERROR_CORE | Fail to create new user field | Ошибка при создании поля ||
|| Пустая строка | The \u0027FIELD_NAME\u0027 field is not found. | Не задано обязательное поле `FIELD_NAME` ||
|| Пустая строка | The \u0027USER_TYPE_ID\u0027 field is not found. | Не задано обязательное поле `USER_TYPE_ID` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./user-userfield-update.md)
- [{#T}](./user-userfield-list.md)
- [{#T}](./user-userfield-delete.md)
