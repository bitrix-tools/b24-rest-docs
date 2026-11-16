# Изменить существующее пользовательское поле контактов crm.contact.userfield.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Разрешить изменять настройки» в CRM

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте метод REST 3.0 [crm.contact.field.custom.update](../../rest-v3/fields/crm-entity-field-custom-update-rest-v3.md). Значения поля типа «Список» `enumeration` в REST 3.0 изменяют методы [crm.contact.field.custom.enum.*](../../rest-v3/fields/crm-entity-field-custom-enum-list-rest-v3.md).

{% endnote %}

Метод `crm.contact.userfield.update` обновляет существующее пользовательское поле контактов.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор пользовательского поля.

Идентификатор можно получить с помощью методов [`crm.contact.userfield.add`](./crm-contact-userfield-add.md) и [`crm.contact.userfield.list`](./crm-contact-userfield-list.md) ||
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
- `value_n` — новое значение поля

Список доступных полей описан [ниже](#parameter-fields).

Некорректное поле в `fields` будет проигнорировано. Изменить `FIELD_NAME`, `USER_TYPE_ID` и `MULTIPLE` этим методом нельзя: переданные значения не применяются.

В `fields` нужно передавать только те поля, которые требуется изменить ||
|#

### Параметр fields {#parameter-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **MANDATORY**
[`char`](../../../data-types.md) | Является ли поле обязательным. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **SHOW_FILTER**
[`char`](../../../data-types.md) | Показывать ли поле в фильтре. Возможные значения:
- `Y` — да
- `N` — нет

При передаче `Y` сохраняется `E` — фильтрация по маске; для поля типа `employee` сохраняется `I` — точное совпадение. При передаче `N` сохраняется `N`
||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний код ||
|| **SETTINGS**
[`object`](../../../data-types.md) | Дополнительные параметры поля. Переданные настройки объединяются с сохраненными и затем нормализуются обработчиком типа поля. Доступные настройки описаны [ниже](#settings) ||
|| **LIST**
[`uf_enum_element[]`](#uf_enum_element) | Список возможных значений для пользовательского поля типа `enumeration`. Для полей других типов параметр не используется ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки ||
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
|| **LIST_FILTER_LABEL**
```string | lang_map``` | Подпись фильтра в списке.

При передаче строки она устанавливается для каждого языка.

Для языков, у которых явно не указано значение, будет записано `''`.

Поле полностью перезаписывает предыдущее значение ||
|| **LIST_COLUMN_LABEL**
```string | lang_map``` | Заголовок в списке. Строка и `lang_map` обрабатываются так же, как у `LIST_FILTER_LABEL` ||
|| **EDIT_FORM_LABEL**
```string | lang_map``` | Подпись в форме редактирования. Строка и `lang_map` обрабатываются так же, как у `LIST_FILTER_LABEL` ||
|| **ERROR_MESSAGE**
```string | lang_map``` | Сообщение об ошибке. Строка и `lang_map` обрабатываются так же, как у `LIST_FILTER_LABEL` ||
|| **HELP_MESSAGE**
```string | lang_map``` | Помощь. Строка и `lang_map` обрабатываются так же, как у `LIST_FILTER_LABEL` ||
|#

### Параметр SETTINGS {#settings}

Метод изменяет только настройки, описанные ниже. Настройки полей типа `date` и типов без вкладки ниже метод не меняет и ошибку не возвращает.

{% list tabs %}

- string

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`string`](../../../data-types.md) | Значение по умолчанию ||
    || **ROWS**
    [`integer`](../../../data-types.md) | Количество строк в поле ввода. Значение ограничивается диапазоном от `1` до `50` включительно
    ||
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
    [`integer`](../../../data-types.md) | Точность числа. При отрицательном значении сохраняется `2`, при значении больше `12` — `12` ||
    |#

- boolean

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`integer`](../../../data-types.md) | Значение по умолчанию, где `1` — да, `0` — нет.

    Переданное значение приводится к `1` или `0`:
    - `>= 1` -> 1
    - `<= 0` -> 0
    ||
    || **DISPLAY**
    [`string`](../../../data-types.md) | Внешний вид. Возможные значения:
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
    [`object`](../../../data-types.md)  | Значение по умолчанию. Объект формата:
    ```
    {
        VALUE: datetime,
        TYPE: 'NONE'|'NOW'|'FIXED',
    }
    ```

    где:
    - `VALUE` — значение по умолчанию типа `datetime`
    - `TYPE` — тип значения по умолчанию:
        - `NONE` — не выставлять значение по умолчанию
        - `NOW` — использовать текущее время/дату
        - `FIXED` — использовать время/дату из `VALUE`

    Если `VALUE` не передан, используется пустая строка. Если `TYPE` не передан или пустой, используется `NONE`
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
    ||
    || **LIST_HEIGHT**
    [`integer`](../../../data-types.md) | Высота списка. Обязательно больше 0 ||
    |#

- iblock_section|iblock_element

    #|
    || **Название**
    `тип` | **Описание** ||
    || **IBLOCK_ID**
    [`integer`](../../../data-types.md) | Идентификатор инфоблока. Если передать значение не больше `0`, метод вернет ошибку `ERROR_CORE` ||
    || **DEFAULT_VALUE**
    [`string`](../../../data-types.md) | Значение по умолчанию ||
    || **DISPLAY**
    [`string`](../../../data-types.md) | Внешний вид. Возможные значения:
    - `DIALOG` — диалог
    - `UI` — набираемый список
    - `LIST` — список
    - `CHECKBOX` — флажки
    ||
    || **LIST_HEIGHT**
    [`integer`](../../../data-types.md) | Высота списка. Обязательно больше 0
    ||
    || **ACTIVE_FILTER**
    [`char`](../../../data-types.md) | Показывать ли элементы с включенным флагом активности. Возможные значения:
    - `Y` — да
    - `N` — нет
    ||
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

    Переданные настройки объединяются с сохраненными. Если после обновления не осталось включенных привязок, автоматически устанавливается `LEAD = Y`.

    #|
    || **Название**
    `тип` | **Описание** ||
    || **LEAD**
    [`char`](../../../data-types.md) | Включена ли привязка к [Лидам](../../leads/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет
    ||
    || **CONTACT**
    [`char`](../../../data-types.md) | Включена ли привязка к [Контактам](../index.md). Возможные значения:
    - `Y` — да
    - `N` — нет
    ||
    || **COMPANY**
    [`char`](../../../data-types.md) | Включена ли привязка к [Компаниям](../../companies/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет
    ||
    || **DEAL**
    [`char`](../../../data-types.md) | Включена ли привязка к [Сделкам](../../deals/index.md). Возможные значения:
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
[`string`](../../../data-types.md) | Идентификатор элемента списка. Для изменения существующего элемента передайте его `ID` и непустое `VALUE`. Если передать `ID` без `VALUE` или с пустым `VALUE`, элемент будет удален. Без `ID` добавляется новый элемент

Идентификатор можно узнать с помощью метода [`crm.contact.userfield.get`](./crm-contact-userfield-get.md#uf_enum_element)
||
|| **DEL**
[`char`](../../../data-types.md) | Флаг, необходимый для удаления элемента списка. Имеет смысл лишь при передаче `ID`.

Возможные значения:
- `Y` — удалить
- `N` — не удалять

По умолчанию `N`
||
|| **VALUE**
[`string`](../../../data-types.md) | Значение элемента списка ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки. Если не передан или меньше единицы, новый элемент получает `500` ||
|| **DEF**
[`char`](../../../data-types.md) | Является ли элемент списка значением по умолчанию. Возможные значения:
- `Y` — да
- `N` — нет

Для множественного поля допустимо несколько `DEF = Y`. Для немножественного поля значением по умолчанию считается первый переданный элемент списка с `DEF = Y` ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний код значения, уникальный в рамках элементов поля. Чтобы сохранить внешний код изменяемого элемента, передайте его явно: иначе для непустого `VALUE` будет сформирован новый код. Текущий `XML_ID` элементов возвращает метод [crm.contact.userfield.list](./crm-contact-userfield-list.md), метод `crm.contact.userfield.get` его не возвращает ||
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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.contact.userfield.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":536,"fields":{"MANDATORY":"N","SHOW_FILTER":"N","SETTINGS":{"DEFAULT_VALUE":"Привет, мир! Значение по умолчанию (изменено)","ROWS":10},"SORT":2000,"EDIT_IN_LIST":"N","LIST_FILTER_LABEL":"Привет, мир! Фильтр (изменено)","LIST_COLUMN_LABEL":{"en":"Hello, World! Column (changed)","ru":"Привет, мир! Колонка (изменено)","de":"Hallo, Welt! Spalte (geändert)"},"EDIT_FORM_LABEL":{"en":"Hello, World! Edit (changed)","ru":"Привет, мир! Редактировать (изменено)","de":"Hallo, Welt! Bearbeiten (geändert)"},"ERROR_MESSAGE":{"en":"Hello, World! Error (changed)","ru":"Привет, мир! Ошибка (изменено)","de":"Hallo, Welt! Fehler (geändert)"},"HELP_MESSAGE":{"en":"Hello, World! Help (changed)","ru":"Привет, мир! Помощь (изменено)","de":"Hallo, Welt! Hilfe (geändert)"}}, "auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.userfield.update
    ```

- BX24.js

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
    try {
        $contactUserfieldItemId = 536; // Example ID
        $userfieldFieldsToUpdate = [
            'SORT' => '100',
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
            'SETTINGS' => ['DEFAULT_VALUE' => 'Привет, мир!', 'ROWS' => 10],
        ];

        $result = $serviceBuilder
            ->getCRMScope()
            ->contactUserfield()
            ->update($contactUserfieldItemId, $userfieldFieldsToUpdate);

        if ($result->isSuccess()) {
            var_export($result->getCoreResponse()->getResponseData()->getResult());
        } else {
            print("Update failed.");
        }
    } catch (Throwable $e) {
        print("Error: " . $e->getMessage());
    }
    ```

- PHP CRest

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

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.contact.userfield.update(
            bitrix_id=536,
            fields={
                "MANDATORY": "N",
                "SHOW_FILTER": "N",
                "SETTINGS": {
                    "DEFAULT_VALUE": "Привет, мир! Значение по умолчанию (изменено)",
                    "ROWS": 10,
                },
                "SORT": 2000,
                "EDIT_IN_LIST": "N",
                "LIST_FILTER_LABEL": "Привет, мир! Фильтр (изменено)",
                "LIST_COLUMN_LABEL": {
                    "en": "Hello, World! Column (changed)",
                    "ru": "Привет, мир! Колонка (изменено)",
                    "de": "Hallo, Welt! Spalte (geändert)",
                },
                "EDIT_FORM_LABEL": {
                    "en": "Hello, World! Edit (changed)",
                    "ru": "Привет, мир! Редактировать (изменено)",
                    "de": "Hallo, Welt! Bearbeiten (geändert)",
                },
                "ERROR_MESSAGE": {
                    "en": "Hello, World! Error (changed)",
                    "ru": "Привет, мир! Ошибка (изменено)",
                    "de": "Hallo, Welt! Fehler (geändert)",
                },
                "HELP_MESSAGE": {
                    "en": "Hello, World! Help (changed)",
                    "ru": "Привет, мир! Помощь (изменено)",
                    "de": "Hallo, Welt! Hilfe (geändert)",
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.contact.userfield.update", b24.Params{
        "id": 536,
    	"fields": b24.Params{
    		"MANDATORY":   "N",
    		"SHOW_FILTER": "N",
    		"SETTINGS": b24.Params{
    			"DEFAULT_VALUE": "Привет, мир! Значение по умолчанию (изменено)",
    			"ROWS":          10,
    		},
    		"SORT":              2000,
    		"EDIT_IN_LIST":      "N",
    		"LIST_FILTER_LABEL": "Привет, мир! Фильтр (изменено)",
    		"LIST_COLUMN_LABEL": b24.Params{
    			"en": "Hello, World! Column (changed)",
    			"ru": "Привет, мир! Колонка (изменено)",
    			"de": "Hallo, Welt! Spalte (geändert)",
    		},
    		"EDIT_FORM_LABEL": b24.Params{
    			"en": "Hello, World! Edit (changed)",
    			"ru": "Привет, мир! Редактировать (изменено)",
    			"de": "Hallo, Welt! Bearbeiten (geändert)",
    		},
    		"ERROR_MESSAGE": b24.Params{
    			"en": "Hello, World! Error (changed)",
    			"ru": "Привет, мир! Ошибка (изменено)",
    			"de": "Hallo, Welt! Fehler (geändert)",
    		},
    		"HELP_MESSAGE": b24.Params{
    			"en": "Hello, World! Help (changed)",
    			"ru": "Привет, мир! Помощь (изменено)",
    			"de": "Hallo, Welt! Hilfe (geändert)",
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.contact.userfield.update: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

### Пример изменения пользовательского поля типа Список

Текущие элементы списка из ответа `crm.contact.userfield.list`:

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

Изменить список так:
- удалить элементы списка с `ID = 115` и `ID = 116`
- изменить элемент списка с `ID  = 117`:
    - `VALUE`: «Элемент списка #3» -> «Элемент списка #3 (изменено)»
    - `SORT`: 300 -> 50
- добавить новый элемент списка «Элемент списка #5»

Замените `536` на идентификатор пользовательского поля типа Список.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":536,"fields":{"MANDATORY":"N","SHOW_FILTER":"Y","LIST":[{"ID":115,"DEL":"Y"},{"ID":116,"DEL":"Y"},{"ID":117,"XML_ID":"XML_ID_3","VALUE":"Элемент списка #3 (изменено)","SORT":50},{"VALUE":"Элемент списка #5","XML_ID":"XML_ID_5","SORT":500}],"SETTINGS":{"DISPLAY":"DIALOG","LIST_HEIGHT":3},"SORT":1000}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.contact.userfield.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":536,"fields":{"MANDATORY":"N","SHOW_FILTER":"Y","LIST":[{"ID":115,"DEL":"Y"},{"ID":116,"DEL":"Y"},{"ID":117,"XML_ID":"XML_ID_3","VALUE":"Элемент списка #3 (изменено)","SORT":50},{"VALUE":"Элемент списка #5","XML_ID":"XML_ID_5","SORT":500}],"SETTINGS":{"DISPLAY":"DIALOG","LIST_HEIGHT":3},"SORT":1000},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.userfield.update
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.contact.userfield.update',
        {
            id: 536,
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
                        XML_ID: "XML_ID_3",
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

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.contact.userfield.update',
        [
            'id' => 536,
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
                        'XML_ID' => "XML_ID_3",
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

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.contact.userfield.update(
            bitrix_id=536,
            fields={
                "MANDATORY": "N",
                "SHOW_FILTER": "Y",
                "SETTINGS": {
                    "DISPLAY": "DIALOG",
                    "LIST_HEIGHT": 3,
                },
                "SORT": 1000,
                "LIST": [
                    {
                        "ID": 115,
                        "DEL": "Y",
                    },
                    {
                        "ID": 116,
                        "DEL": "Y",
                    },
                    {
                        "ID": 117,
                        "XML_ID": "XML_ID_3",
                        "VALUE": "Элемент списка #3 (изменено)",
                        "SORT": 50,
                    },
                    {
                        "VALUE": "Элемент списка #5",
                        "XML_ID": "XML_ID_5",
                        "SORT": 500,
                    },
                ],
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
    res, err := client.Core().Call(ctx, "crm.contact.userfield.update", b24.Params{
        "id": 536,
    	"fields": b24.Params{
    		"MANDATORY":   "N",
    		"SHOW_FILTER": "Y",
    		"LIST": []b24.Params{
    			{
    				"ID":  115,
    				"DEL": "Y",
    			},
    			{
    				"ID":  116,
    				"DEL": "Y",
    			},
    			{
    				"ID":    117,
    				"XML_ID": "XML_ID_3",
    				"VALUE": "Элемент списка #3 (изменено)",
    				"SORT":  50,
    			},
    			{
    				"VALUE":  "Элемент списка #5",
    				"XML_ID": "XML_ID_5",
    				"SORT":   500,
    			},
    		},
    		"SETTINGS": b24.Params{
    			"DISPLAY":     "DIALOG",
    			"LIST_HEIGHT": 3,
    		},
    		"SORT": 1000,
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.contact.userfield.update: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
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

Тексты ошибок проверки поля приходят с HTML-тегом `<br>` в конце, в таблице он опущен.

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | `Parameter 'fields' must be array.` | Переданный `fields` не является объектом ||
|| `400` | Пустое значение | `ID is not defined or invalid.`     | Переданный `id` меньше или равен нулю либо не передан ||
|| `400` | Пустое значение | `Access denied.`                    | У пользователя нет права «Разрешить изменять настройки» в CRM или поле с переданным `id` не относится к контактам ||
|| `400` | `ERROR_NOT_FOUND` | `The entity with ID 'id' is not found.` | Пользовательского поля с переданным `id` не существует ||
|| `400` | `ERROR_CORE`               | `Элемент списка со значением XML_ID=xml_id уже существует.` | Переданные `XML_ID` элементов списка не уникальны ||
|| `400` | `ERROR_CORE` | `Выберите инфоблок, с которым нужно связать поле` | Для поля типа `iblock_section` или `iblock_element` в `SETTINGS.IBLOCK_ID` передано значение не больше `0` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-contact-userfield-add.md)
- [{#T}](./crm-contact-userfield-get.md)
- [{#T}](./crm-contact-userfield-list.md)
- [{#T}](./crm-contact-userfield-delete.md)
