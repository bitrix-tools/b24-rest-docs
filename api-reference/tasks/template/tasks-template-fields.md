# Получить список полей шаблона задачи tasks.template.fields

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.template.fields` возвращает описание полей шаблона задачи.

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
    -d '{
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/tasks.template.fields
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'tasks.template.fields',
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
                'tasks.template.fields',
                []
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);

    } catch (Throwable $e) {
        echo 'Ошибка получения полей шаблона: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.template.fields',
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
        'tasks.template.fields',
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
            "title": "ID",
            "type": "integer",
            "primary": true
        },
        "PARENT_ID": {
            "title": "Родительская задача",
            "type": "integer",
            "default": 0
        },
        "TITLE": {
            "title": "Название",
            "type": "string",
            "required": true
        },
        "DESCRIPTION": {
            "title": "Описание",
            "type": "string"
        },
        "PRIORITY": {
            "title": "Приоритет",
            "type": "enum",
            "values": {
                "2": null,
                "1": null,
                "0": null
            },
            "default": 1
        },
        "GROUP_ID": {
            "title": "Проект",
            "type": "integer",
            "default": 0
        },
        "STAGE_ID": {
            "title": "Стадия",
            "type": "integer",
            "default": 0
        },
        "CREATED_BY": {
            "title": "Постановщик",
            "type": "integer",
            "required": true
        },
        "RESPONSIBLE_ID": {
            "title": "Исполнитель",
            "type": "integer",
            "required": true
        },
        "DEPENDS_ON": {
            "title": "Зависимость",
            "type": "integer",
            "required": true
        },
        "RESPONSIBLES": {
            "title": "Исполнители",
            "type": "array"
        },
        "ACCOMPLICES": {
            "title": "Соисполнители",
            "type": "array"
        },
        "AUDITORS": {
            "title": "Наблюдатели",
            "type": "array"
        },
        "STATUS": {
            "title": "Статус",
            "type": "enum",
            "values": {
                "2": null,
                "3": null,
                "4": null,
                "5": null,
                "6": null
            },
            "default": 2
        },
        "MULTITASK": {
            "title": "Множественная задача",
            "type": "enum",
            "values": {
                "Y": "Да",
                "N": "Нет"
            },
            "default": "N"
        },
        "REPLICATE": {
            "title": "Повторяющаяся задача",
            "type": "enum",
            "values": {
                "Y": "Да",
                "N": "Нет"
            },
            "default": "N"
        },
        "SITE_ID": {
            "title": "SITE_ID",
            "type": "string"
        },
        "TASK_CONTROL": {
            "title": "Принять работу",
            "type": "enum",
            "values": {
                "Y": "Да",
                "N": "Нет"
            },
            "default": "N"
        },
        "ADD_IN_REPORT": {
            "title": "Добавить в отчет",
            "type": "enum",
            "values": {
                "Y": "Да",
                "N": "Нет"
            },
            "default": "N"
        },
        "XML_ID": {
            "title": "XML_ID",
            "type": "string",
            "default": null
        },
        "DEADLINE_AFTER": {
            "title": "Крайний срок после",
            "type": "datetime",
            "default": null
        },
        "START_DATE_PLAN_AFTER": {
            "title": "Планируемый старт после",
            "type": "datetime",
            "default": null
        },
        "END_DATE_PLAN_AFTER": {
            "title": "Планируемое завершение после",
            "type": "datetime",
            "default": null
        },
        "TPARAM_TYPE": {
            "title": "Для новых пользователей",
            "type": "enum",
            "values": {
                "1": "Да",
                "0": "Нет"
            },
            "default": 0
        },
        "TPARAM_REPLICATION_COUNT": {
            "title": "Кол-во созданных задач",
            "type": "integer",
            "default": 0
        },
        "REPLICATE_PARAMS": {
            "title": "Параметры постановки задач",
            "type": "string"
        },
        "BASE_TEMPLATE_ID": {
            "title": "Родительский шаблон",
            "type": "integer",
            "default": null
        },
        "TEMPLATE_CHILDREN_COUNT": {
            "title": "Кол-во подшаблонов",
            "type": "integer",
            "default": null
        },
        "UF_CRM_TASK": {
            "title": "Привязка к элементам CRM",
            "type": "crm"
        },
        "UF_TASK_WEBDAV_FILES": {
            "title": "Файл (Диск)",
            "type": "disk_file"
        },
        "UF_AUTO_291715100499": {
            "title": "Строка",
            "type": "string"
        },
        "UF_AUTO_152207278904": {
            "title": "Число",
            "type": "double"
        }
    },
    "time": {
        "start": 1771919518,
        "finish": 1771919518.633086,
        "duration": 0.6330859661102295,
        "processing": 0,
        "date_start": "2026-02-24T10:51:58+03:00",
        "date_finish": "2026-02-24T10:51:58+03:00",
        "operating_reset_at": 1771920118,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с [полями шаблона задачи](./fields.md). Для каждого поля возвращается объект с описанием [(подробное описание)](#field-description) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект описания поля {#field-description}

#|
|| **Название**
`тип` | **Описание** ||
|| **title**
[`string`](../../data-types.md) | Название поля для отображения ||
|| **type**
[`string`](../../data-types.md) | Тип значения поля ||
|| **required**
[`boolean`](../../data-types.md) | Признак обязательного поля. Возвращается не для всех поле ||
|| **default**
[`string`](../../data-types.md) | Значение по умолчанию. Может быть строкой, числом или `null` ||
|| **values**
[`object`](../../data-types.md) | Список допустимых значений для полей типа список `enum`. Ключ объекта — значение, значение объекта — его подпись ||
|| **primary**
[`boolean`](../../data-types.md) | Признак первичного поля ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжить изучение

- [{#T}](./tasks-template-add.md)
- [{#T}](./tasks-template-update.md)
- [{#T}](./tasks-template-get.md)
- [{#T}](./tasks-template-delete.md)
