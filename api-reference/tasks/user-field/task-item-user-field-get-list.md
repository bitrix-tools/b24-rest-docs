# Получить список пользовательских полей task.item.userfield.getlist

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `task.item.userfield.getlist` получает список пользовательских полей задач.

В списке будет три системных поля задач для связи с другими объектами:

- `UF_CRM_TASK` — с объектами CRM
- `UF_MAIL_MESSAGE` — с письмом Почты
- `UF_TASK_WEBDAV_FILES` — c файлами Диска

Они созданы на основе пользовательских полей, поэтому есть в списке. Подробнее о связях задачи с другими объектами — в статье [Задачи: обзор методов](../index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ORDER**
[`object`](../../data-types.md) | Объект для сортировки результата вида `{"поле": "значение сортировки", ... }`.

Сортировать можно по полям:
- `ID` — идентификатор пользовательского поля
- `FIELD_NAME` — код пользовательского поля
- `USER_TYPE_ID` — тип пользовательского поля
- `SORT` — значение сортировки

Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию ||
|| **FILTER**
[`object`](../../data-types.md) | Объект для фильтрации результата вида `{"поле": "значение фильтра", ... }`. Значением фильтруемого поля может быть одиночное значение или массив значений.

Фильтровать можно по полям:
- `ID` — идентификатор пользовательского поля
- `FIELD_NAME` — код пользовательского поля
- `USER_TYPE_ID` — тип пользовательского поля
- `XML_ID` — внешний идентификатор
- `MULTIPLE` — множественное, `Y`или `N`
- `MANDATORY` — обязательное, `Y` или `N`
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "ORDER": {
        "SORT": "ASC"
      }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.item.userfield.getlist
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "ORDER": {
        "SORT": "ASC"
      },
      "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/task.item.userfield.getlist
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'task.item.userfield.getlist',
            {
                ORDER: {
                    SORT: 'ASC'
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
                'task.item.userfield.getlist',
                [
                    'ORDER' => [
                        'SORT' => 'ASC'
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
        'task.item.userfield.getlist',
        {
            ORDER: {
                SORT: 'ASC'
            },
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
        'task.item.userfield.getlist',
        [
            'ORDER' => [
                'SORT' => 'ASC'
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
    "result": [
        {
            "ID": "1295",
            "ENTITY_ID": "TASKS_TASK",
            "FIELD_NAME": "UF_CRM_TASK",
            "USER_TYPE_ID": "crm",
            "XML_ID": "",
            "SORT": "100",
            "MULTIPLE": "Y",
            "MANDATORY": "N",
            "SHOW_FILTER": "N",
            "SHOW_IN_LIST": "N",
            "EDIT_IN_LIST": "N",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "LEAD": "Y",
                "CONTACT": "Y",
                "COMPANY": "Y",
                "DEAL": "Y"
            }
        },
        {
            "ID": "662",
            "ENTITY_ID": "TASKS_TASK",
            "FIELD_NAME": "UF_MAIL_MESSAGE",
            "USER_TYPE_ID": "mail_message",
            "XML_ID": "",
            "SORT": "100",
            "MULTIPLE": "N",
            "MANDATORY": "N",
            "SHOW_FILTER": "N",
            "SHOW_IN_LIST": "N",
            "EDIT_IN_LIST": "N",
            "IS_SEARCHABLE": "N",
            "SETTINGS": []
        },
        {
            "ID": "229",
            "ENTITY_ID": "TASKS_TASK",
            "FIELD_NAME": "UF_TASK_WEBDAV_FILES",
            "USER_TYPE_ID": "disk_file",
            "XML_ID": "TASK_WEBDAV_FILES",
            "SORT": "100",
            "MULTIPLE": "Y",
            "MANDATORY": "N",
            "SHOW_FILTER": "N",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "Y",
            "SETTINGS": {
                "IBLOCK_ID": 0,
                "SECTION_ID": 0,
                "UF_TO_SAVE_ALLOW_EDIT": ""
            }
        },
        {
            "ID": "1325",
            "ENTITY_ID": "TASKS_TASK",
            "FIELD_NAME": "UF_TASK_CLIENT_REQUEST",
            "USER_TYPE_ID": "string",
            "XML_ID": "UF_TASK_CLIENT_REQUEST",
            "SORT": "220",
            "MULTIPLE": "N",
            "MANDATORY": "N",
            "SHOW_FILTER": "N",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "SIZE": 20,
                "ROWS": 10,
                "REGEXP": "",
                "MIN_LENGTH": 0,
                "MAX_LENGTH": 0,
                "DEFAULT_VALUE": "Уточнить цель и ожидаемый результат"
            }
        },
        {
            "ID": "1333",
            "ENTITY_ID": "TASKS_TASK",
            "FIELD_NAME": "UF_TASK_PROJECT_BUDGET",
            "USER_TYPE_ID": "double",
            "XML_ID": "UF_TASK_PROJECT_BUDGET",
            "SORT": "230",
            "MULTIPLE": "N",
            "MANDATORY": "N",
            "SHOW_FILTER": "N",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "PRECISION": 0,
                "SIZE": 20,
                "MIN_VALUE": 0,
                "MAX_VALUE": 0,
                "DEFAULT_VALUE": 0
            }
        },
        {
            "ID": "1335",
            "ENTITY_ID": "TASKS_TASK",
            "FIELD_NAME": "UF_TASK_APPROVAL_DEADLINE",
            "USER_TYPE_ID": "datetime",
            "XML_ID": "UF_TASK_APPROVAL_DEADLINE",
            "SORT": "240",
            "MULTIPLE": "N",
            "MANDATORY": "N",
            "SHOW_FILTER": "N",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "DEFAULT_VALUE": {
                    "TYPE": "NONE",
                    "VALUE": ""
                },
                "USE_SECOND": "Y",
                "USE_TIMEZONE": "N"
            }
        },
        {
            "ID": "1337",
            "ENTITY_ID": "TASKS_TASK",
            "FIELD_NAME": "UF_TASK_LEGAL_REVIEW_REQUIRED",
            "USER_TYPE_ID": "boolean",
            "XML_ID": "UF_TASK_LEGAL_REVIEW_REQUIRED",
            "SORT": "250",
            "MULTIPLE": "N",
            "MANDATORY": "N",
            "SHOW_FILTER": "N",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "DEFAULT_VALUE": 0,
                "DISPLAY": "CHECKBOX",
                "LABEL": ["", ""],
                "LABEL_CHECKBOX": ""
            }
        }
    ],
    "total": 0,
    "time": {
        "start": 1772718556,
        "finish": 1772718556.080225,
        "duration": 0.08022499084472656,
        "processing": 0,
        "date_start": "2026-03-05T16:49:16+03:00",
        "date_finish": "2026-03-05T16:49:16+03:00",
        "operating_reset_at": 1772719156,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив объектов пользовательских полей [(подробное описание)](#result) ||
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
[`integer`](../../data-types.md) | Идентификатор пользовательского поля ||
|| **ENTITY_ID**
[`string`](../../data-types.md) | Код объекта, к которому привязано поле ||
|| **FIELD_NAME**
[`string`](../../data-types.md) | Код пользовательского поля ||
|| **USER_TYPE_ID**
[`string`](../../data-types.md) | Тип данных ||
|| **XML_ID**
[`string`](../../data-types.md) | Внешний идентификатор ||
|| **SORT**
[`integer`](../../data-types.md) | Значение сортировки ||
|| **MULTIPLE**
[`char`](../../data-types.md) | Признак множественного значения. Возможные значения:
- `Y` — множественное
- `N` — единственное ||
|| **MANDATORY**
[`char`](../../data-types.md) | Признак обязательного поля. Возможные значения:
- `Y` — обязательное
- `N` — не обязательное ||
|| **SHOW_FILTER**
[`char`](../../data-types.md) | Показ в фильтре списка ||
|| **SHOW_IN_LIST**
[`char`](../../data-types.md) | Показ в списке ||
|| **EDIT_IN_LIST**
[`char`](../../data-types.md) | Разрешено редактирование в списке ||
|| **IS_SEARCHABLE**
[`char`](../../data-types.md) | Значение участвует в поиске ||
|| **SETTINGS**
[`object`](../../data-types.md) | Дополнительные настройки поля, состав зависит от типа `USER_TYPE_ID` ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./task-item-user-field-add.md)
- [{#T}](./task-item-user-field-update.md)
- [{#T}](./task-item-user-field-get.md)
- [{#T}](./task-item-user-field-delete.md)
- [{#T}](./task-item-user-field-get-types.md)
- [{#T}](./task-item-user-field-get-fields.md)
