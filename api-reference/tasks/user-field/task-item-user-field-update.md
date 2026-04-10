# Обновить пользовательское поле task.item.userfield.update

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `task.item.userfield.update` обновляет параметры пользовательского поля задачи.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`integer`](../../data-types.md) | Идентификатор пользовательского поля.

Идентификатор пользовательского поля задачи можно получить при [создании поля](./task-item-user-field-add.md) или методом [получения списка полей](./task-item-user-field-get-list.md) ||
|| **DATA***
[`object`](../../data-types.md) | Набор обновляемых параметров поля [(подробное описание)](#data) ||
|#

### Параметр DATA {#data}

#|
|| **Название**
`тип` | **Описание** ||
|| **XML_ID**
[`string`](../../data-types.md) | Внешний идентификатор ||
|| **EDIT_FORM_LABEL**
[`object`](../../data-types.md) | Подпись в форме редактирования [(подробное описание)](#edit_form_label) ||
|| **LABEL**
[`string`](../../data-types.md) | Название пользовательского поля ||
|| **SORT**
[`integer`](../../data-types.md) | Сортировка
||
|| **MULTIPLE**
[`string`](../../data-types.md) | Множественное значение. Возможные значения:
- `Y` — множественное
- `N` — единственное

Применяется для типов `string`, `double`, `datetime`. Для типа `boolean` всегда используется `N` ||
|| **MANDATORY**
[`string`](../../data-types.md) | Обязательное значение. Возможные значения:
- `Y` — обязательно
- `N` — не обязательное
||
|| **SETTINGS**
[`object`](../../data-types.md) | Дополнительные настройки типа поля [(подробное описание)](#settings) ||
|#

### Параметр EDIT_FORM_LABEL {#edit_form_label}

#|
|| **Название**
`тип` | **Описание** ||
|| **ru**
[`string`](../../data-types.md) | Подпись на русском языке ||
|| **en**
[`string`](../../data-types.md) | Подпись на английском языке ||
|#

### Параметр SETTINGS {#settings}

Поля объекта `SETTINGS` зависят от типа `USER_TYPE_ID`.

{% list tabs %}

- string

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`string`](../../data-types.md) | Значение по умолчанию ||
    || **ROWS**
    [`integer`](../../data-types.md) | Количество строк в поле ввода ||
    |#

- double

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`double`](../../data-types.md) | Значение по умолчанию ||
    |#

- datetime

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
     | Значение по умолчанию. Описывается как объект с двумя параметрами:
    1. `TYPE` [`string`](../../data-types.md) —  режим заполнения значения по умолчанию
        - `NONE` — значение по умолчанию не задается
        - `FIXED` — используется значение из `VALUE`
        - `NOW` — используется текущее время
    2. `VALUE` [`datetime`](../../data-types.md) — значение для типа `FIXED`
    
    ```js
    DEFAULT_VALUE: {
        TYPE: 'NOW',
        VALUE: ''
    },
    ```
    
    ||
    |#

- boolean

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`integer`](../../data-types.md) | Значение по умолчанию:
    - `0` — нет
    - `1` — да ||
    || **DISPLAY**
    [`string`](../../data-types.md) | Вариант отображения значения:
    - `CHECKBOX` — флажок
    - `RADIO` — радиокнопки
    - `DROPDOWN` — выпадающий список ||
    |#

{% endlist %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "ID": 1325,
      "DATA": {
        "EDIT_FORM_LABEL": {
          "ru": "Описание запроса клиента",
          "en": "Description of client request"
        },
        "MANDATORY": "N"
      }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.item.userfield.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "ID": 1325,
      "DATA": {
        "EDIT_FORM_LABEL": {
          "ru": "Описание запроса клиента",
          "en": "Description of client request"
        },
        "MANDATORY": "N"
      },
      "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/task.item.userfield.update
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'task.item.userfield.update',
            {
                ID: 1325,
                DATA: {
                    EDIT_FORM_LABEL: {
                        ru: 'Описание запроса клиента',
                        en: 'Description of client request'
                    },
                    MANDATORY: 'N'
                }
            }
        );

        const result = response.getData().result;
        console.log(result);
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
                'task.item.userfield.update',
                [
                    'ID' => 1325,
                    'DATA' => [
                        'EDIT_FORM_LABEL' => [
                            'ru' => 'Описание запроса клиента',
                            'en' => 'Description of client request'
                        ],
                        'MANDATORY' => 'N',
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.item.userfield.update',
        {
            ID: 1325,
            DATA: {
                EDIT_FORM_LABEL: {
                    ru: 'Описание запроса клиента',
                    en: 'Description of client request'
                },
                MANDATORY: 'N'
            }
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'task.item.userfield.update',
        [
            'ID' => 1325,
            'DATA' => [
                'EDIT_FORM_LABEL' => [
                    'ru' => 'Описание запроса клиента',
                    'en' => 'Description of client request'
                ],
                'MANDATORY' => 'N',
            ]
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1740000000.000000,
        "finish": 1740000000.100000,
        "duration": 0.100000,
        "processing": 0.080000,
        "date_start": "2025-02-20T10:00:00+03:00",
        "date_finish": "2025-02-20T10:00:00+03:00",
        "operating_reset_at": 1740003600,
        "operating": 0.080000
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`, если поле успешно обновлено ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "ID is not defined or invalid."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#0; Invalid arguments for Bitrix\Tasks\Integration\Rest\Task\UserField::update; 0/TE | Не переданы обязательные параметры `ID` и `DATA` ||
|| `400` | `ERROR_CORE` | ID is not defined or invalid | В параметр `ID` передано нечисловое значение или значение `<= 0` ||
|| `400` | `ERROR_NOT_FOUND` | The entity with ID '{ID}' is not found | Пользовательское поле с указанным `ID` не найдено ||
|| `400` | `ERROR_CORE` | Access denied | Недостаточно прав для изменения пользовательского поля ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./task-item-user-field-add.md)
- [{#T}](./task-item-user-field-get.md)
- [{#T}](./task-item-user-field-get-list.md)
- [{#T}](./task-item-user-field-delete.md)
- [{#T}](./task-item-user-field-get-types.md)
- [{#T}](./task-item-user-field-get-fields.md)
