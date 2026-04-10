# Получить поля пользовательского поля task.item.userfield.getfields

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `task.item.userfield.getfields` получает список полей для пользовательских полей задач.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.item.userfield.getfields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/task.item.userfield.getfields
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'task.item.userfield.getfields',
            {}
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
                'task.item.userfield.getfields',
                []
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
        'task.item.userfield.getfields',
        {},
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
        'task.item.userfield.getfields',
        []
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": {
            "type": "int",
            "title": "Ид",
            "isReadOnly": true
        },
        "ENTITY_ID": {
            "type": "string",
            "title": "Объект",
            "isImmutable": true
        },
        "FIELD_NAME": {
            "type": "string",
            "title": "Код",
            "isImmutable": true
        },
        "USER_TYPE_ID": {
            "type": "string",
            "title": "Тип данных",
            "isImmutable": true
        },
        "XML_ID": {
            "type": "string",
            "title": "Внешний Ид (XML ID)"
        },
        "SORT": {
            "type": "int",
            "title": "Сортировка"
        },
        "MULTIPLE": {
            "type": "char",
            "title": "Множественное"
        },
        "MANDATORY": {
            "type": "char",
            "title": "Обязательное"
        },
        "SHOW_FILTER": {
            "type": "char",
            "title": "Показывать в фильтре списка"
        },
        "SHOW_IN_LIST": {
            "type": "char",
            "title": "Показывать в списке"
        },
        "EDIT_IN_LIST": {
            "type": "char",
            "title": "Разрешать редактирование пользователем"
        },
        "IS_SEARCHABLE": {
            "type": "char",
            "title": "Значения поля участвуют в поиске"
        },
        "EDIT_FORM_LABEL": {
            "type": "string",
            "title": "Подпись в форме редактирования"
        },
        "LIST_COLUMN_LABEL": {
            "type": "string",
            "title": "Заголовок в списке"
        },
        "LIST_FILTER_LABEL": {
            "type": "string",
            "title": "Подпись фильтра в списке"
        },
        "ERROR_MESSAGE": {
            "type": "string",
            "title": "Сообщение об ошибке"
        },
        "HELP_MESSAGE": {
            "type": "string",
            "title": "Помощь"
        },
        "LIST": {
            "type": "uf_enum_element",
            "title": "Элементы списка",
            "isMultiple": true
        },
        "SETTINGS": {
            "type": "object",
            "title": "Дополнительные настройки (зависят от типа)"
        }
    },
    "total": 0,
    "time": {
        "start": 1772710591,
        "finish": 1772710591.142614,
        "duration": 0.14261388778686523,
        "processing": 0,
        "date_start": "2026-03-05T14:36:31+03:00",
        "date_finish": "2026-03-05T14:36:31+03:00",
        "operating_reset_at": 1772711191,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Описание доступных полей пользовательского поля. Каждый ключ объекта содержит описание поля [(подробное описание)](#result) ||
|| **total**
[`integer`](../../data-types.md) | Сейчас возвращает `0` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор. Только для чтения ||
|| **ENTITY_ID**
[`string`](../../data-types.md) | Объект ||
|| **FIELD_NAME**
[`string`](../../data-types.md) | Код. Неизменяемое ||
|| **USER_TYPE_ID**
[`string`](../../data-types.md) | Тип данных. Неизменяемое ||
|| **XML_ID**
[`string`](../../data-types.md) | Внешний идентификатор ||
|| **SORT**
[`integer`](../../data-types.md) | Сортировка ||
|| **MULTIPLE**
[`char`](../../data-types.md) | Множественное ||
|| **MANDATORY**
[`char`](../../data-types.md) | Обязательное ||
|| **SHOW_FILTER**
[`char`](../../data-types.md) | Показывать в фильтре списка ||
|| **SHOW_IN_LIST**
[`char`](../../data-types.md) | Показывать в списке ||
|| **EDIT_IN_LIST**
[`char`](../../data-types.md) | Разрешать редактирование пользователем ||
|| **IS_SEARCHABLE**
[`char`](../../data-types.md) | Значения поля участвуют в поиске ||
|| **EDIT_FORM_LABEL**
[`string`](../../data-types.md) | Подпись в форме редактирования ||
|| **LIST_COLUMN_LABEL**
[`string`](../../data-types.md) | Заголовок в списке ||
|| **LIST_FILTER_LABEL**
[`string`](../../data-types.md) | Подпись фильтра в списке ||
|| **ERROR_MESSAGE**
[`string`](../../data-types.md) | Сообщение об ошибке ||
|| **HELP_MESSAGE**
[`string`](../../data-types.md) | Подсказка ||
|| **LIST**
[`uf_enum_element`](../../data-types.md) | Элементы списка. Множественное ||
|| **SETTINGS**
[`object`](../../data-types.md) | Дополнительные настройки ||
|#

#### Объект описания поля {#field-description}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../data-types.md) | Тип данных поля ||
|| **title**
[`string`](../../data-types.md) | Название поля ||
|| **isReadOnly**
[`boolean`](../../data-types.md) | Признак поля только для чтения ||
|| **isImmutable**
[`boolean`](../../data-types.md) | Признак неизменяемого поля ||
|| **isMultiple**
[`boolean`](../../data-types.md) | Признак множественного поля ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./task-item-user-field-add.md)
- [{#T}](./task-item-user-field-update.md)
- [{#T}](./task-item-user-field-get.md)
- [{#T}](./task-item-user-field-get-list.md)
- [{#T}](./task-item-user-field-delete.md)
- [{#T}](./task-item-user-field-get-types.md)
