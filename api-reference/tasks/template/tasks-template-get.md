# Получить шаблон задачи по идентификатору tasks.template.get

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом просмотра шаблона

Метод `tasks.template.get` возвращает данные шаблона задачи по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateId***
[`integer`](../../data-types.md) | Идентификатор шаблона задачи.

Идентификатор шаблона задачи можно получить при [создании нового шаблона](./tasks-template-add.md) ||
|| **params**
[`object`](../../data-types.md) | Дополнительные параметры выборки [(подробное описание)](#params) ||
|#

### Параметр params {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив полей, которые нужно вернуть. 

По умолчанию используются `['*', 'UF_*']` — выбрать все поля и пользовательские поля ||
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
      "templateId": 139
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "templateId": 139,
      "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/tasks.template.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'tasks.template.get',
            {
                templateId: 139
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
                'tasks.template.get',
                [
                    'templateId' => 139
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);

    } catch (Throwable $e) {
        echo 'Ошибка получения шаблона: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.template.get',
        {
            templateId: 139
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
        'tasks.template.get',
        [
            'templateId' => 139
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": "139",
        "TITLE": "Подготовка еженедельного статуса по проекту",
        "DESCRIPTION": "Шаблон задачи для подготовки и согласования еженедельного статуса по проекту с командой и руководителем",
        "DESCRIPTION_IN_BBCODE": "Y",
        "PRIORITY": "2",
        "STATUS": "1",
        "STAGE_ID": "0",
        "RESPONSIBLE_ID": "102",
        "DEADLINE_AFTER": null,
        "START_DATE_PLAN_AFTER": "32400",
        "END_DATE_PLAN_AFTER": "97200",
        "REPLICATE": "Y",
        "CREATED_BY": "101",
        "XML_ID": null,
        "ALLOW_CHANGE_DEADLINE": "Y",
        "ALLOW_TIME_TRACKING": "Y",
        "TASK_CONTROL": "N",
        "ADD_IN_REPORT": "N",
        "GROUP_ID": "0",
        "PARENT_ID": "8131",
        "MULTITASK": "N",
        "SITE_ID": "s1",
        "ACCOMPLICES": "a:0:{}",
        "AUDITORS": "a:0:{}",
        "RESPONSIBLES": "a:1:{i:0;s:3:\"102\";}",
        "FILES": null,
        "TAGS": null,
        "DEPENDS_ON": null,
        "MATCH_WORK_TIME": "Y",
        "TASK_ID": null,
        "TPARAM_TYPE": "0",
        "TPARAM_REPLICATION_COUNT": "0",
        "REPLICATE_PARAMS": "a:19:{s:6:\"PERIOD\";s:6:\"weekly\";s:12:\"WORKDAY_ONLY\";s:1:\"N\";s:9:\"WEEK_DAYS\";a:1:{i:0;i:2;}s:4:\"TIME\";s:5:\"11:00\";s:15:\"TIMEZONE_OFFSET\";i:0;s:11:\"REPEAT_TILL\";s:7:\"endless\";s:10:\"START_DATE\";s:19:\"16.03.2026 00:00:00\";s:9:\"EVERY_DAY\";i:1;s:10:\"EVERY_WEEK\";i:1;s:15:\"MONTHLY_DAY_NUM\";i:1;s:19:\"MONTHLY_MONTH_NUM_1\";i:1;s:19:\"MONTHLY_MONTH_NUM_2\";i:1;s:14:\"YEARLY_DAY_NUM\";i:1;s:8:\"END_DATE\";N;s:12:\"MONTHLY_TYPE\";i:1;s:11:\"YEARLY_TYPE\";i:1;s:14:\"DEADLINE_AFTER\";i:0;s:15:\"DEADLINE_OFFSET\";i:0;s:19:\"NEXT_EXECUTION_TIME\";s:19:\"17.03.2026 11:00:00\";}",
        "BASE_TEMPLATE_ID": "0",
        "TEMPLATE_CHILDREN_COUNT": "0",
        "CREATED_BY_NAME": "Иван",
        "CREATED_BY_LAST_NAME": "Иванов",
        "CREATED_BY_SECOND_NAME": "Иванович",
        "CREATED_BY_LOGIN": "ivan.ivanov@example.ru",
        "CREATED_BY_WORK_POSITION": "Сотрудник",
        "CREATED_BY_PHOTO": "10001",
        "RESPONSIBLE_NAME": "Петр",
        "RESPONSIBLE_LAST_NAME": "Петров",
        "RESPONSIBLE_SECOND_NAME": "Петрович",
        "RESPONSIBLE_LOGIN": "petr.petrov@example.ru",
        "RESPONSIBLE_WORK_POSITION": "Сотрудник",
        "RESPONSIBLE_PHOTO": "10002",
        "SCENARIO": "default",
        "UF_CRM_TASK": [
            "L_1179",
            "D_1833"
        ],
        "UF_TASK_WEBDAV_FILES": [
            1117
        ]
    },
    "time": {
        "start": 1773219184,
        "finish": 1773219184.579376,
        "duration": 0.5793759822845459,
        "processing": 0,
        "date_start": "2026-03-11T11:53:04+03:00",
        "date_finish": "2026-03-11T11:53:04+03:00",
        "operating_reset_at": 1773219784,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Данные шаблона задачи [(подробное описание)](#result).

Возвращает `false`:
- если `templateId` передан пустым
- шаблона с указанным `templateId` не существует
- у пользователя нет прав на просмотр шаблона ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор шаблона задачи ||
|| **TITLE**
[`string`](../../data-types.md) | Название шаблона ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Описание шаблона ||
|| **DESCRIPTION_IN_BBCODE**
[`string`](../../data-types.md) | Признак, что описание хранится в формате BBCode ||
|| **PRIORITY**
[`integer`](../../data-types.md) | Приоритет задачи ||
|| **STATUS**
[`integer`](../../data-types.md) | Статус шаблона ||
|| **STAGE_ID**
[`integer`](../../data-types.md) | Идентификатор стадии ||
|| **RESPONSIBLE_ID**
[`integer`](../../data-types.md) | Идентификатор ответственного ||
|| **DEADLINE_AFTER**
[`datetime`](../../data-types.md) | Смещение крайнего срока относительно даты создания задачи по шаблону ||
|| **START_DATE_PLAN_AFTER**
[`string`](../../data-types.md) | Смещение планируемой даты начала в секундах ||
|| **END_DATE_PLAN_AFTER**
[`string`](../../data-types.md) | Смещение планируемой даты завершения в секундах ||
|| **REPLICATE**
[`string`](../../data-types.md) | Признак повторяющейся задачи ||
|| **CREATED_BY**
[`integer`](../../data-types.md) | Идентификатор постановщика ||
|| **XML_ID**
[`string`](../../data-types.md) | Внешний идентификатор шаблона ||
|| **ALLOW_CHANGE_DEADLINE**
[`string`](../../data-types.md) | Признак, что исполнитель может менять крайний срок ||
|| **ALLOW_TIME_TRACKING**
[`string`](../../data-types.md) | Признак учета времени для задач по шаблону ||
|| **TASK_CONTROL**
[`string`](../../data-types.md) | Признак необходимости принять работу ||
|| **ADD_IN_REPORT**
[`string`](../../data-types.md) | Признак включения задачи в отчет по эффективности ||
|| **GROUP_ID**
[`integer`](../../data-types.md) | Идентификатор проекта ||
|| **PARENT_ID**
[`integer`](../../data-types.md) | Идентификатор родительского шаблона ||
|| **MULTITASK**
[`string`](../../data-types.md) | Признак множественной задачи ||
|| **SITE_ID**
[`string`](../../data-types.md) | Идентификатор сайта ||
|| **ACCOMPLICES**
[`string`](../../data-types.md) | Сериализованный список соисполнителей ||
|| **AUDITORS**
[`string`](../../data-types.md) | Сериализованный список наблюдателей ||
|| **RESPONSIBLES**
[`string`](../../data-types.md) | Сериализованный список ответственных ||
|| **FILES**
[`array`](../../data-types.md) | Список файлов шаблона ||
|| **TAGS**
[`array`](../../data-types.md) | Список тегов шаблона ||
|| **DEPENDS_ON**
[`array`](../../data-types.md) | Список зависимостей шаблона ||
|| **MATCH_WORK_TIME**
[`string`](../../data-types.md) | Признак учета рабочего времени при расчете сроков ||
|| **TASK_ID**
[`integer`](../../data-types.md) | Идентификатор связанной задачи ||
|| **TPARAM_TYPE**
[`integer`](../../data-types.md) | Тип дополнительных параметров шаблона ||
|| **TPARAM_REPLICATION_COUNT**
[`integer`](../../data-types.md) | Количество уже созданных задач по правилу повторения ||
|| **REPLICATE_PARAMS**
[`string`](../../data-types.md) | Сериализованные параметры повторения ||
|| **BASE_TEMPLATE_ID**
[`integer`](../../data-types.md) | Идентификатор базового шаблона ||
|| **TEMPLATE_CHILDREN_COUNT**
[`integer`](../../data-types.md) | Количество дочерних шаблонов ||
|| **CREATED_BY_NAME**
[`string`](../../data-types.md) | Имя постановщика ||
|| **CREATED_BY_LAST_NAME**
[`string`](../../data-types.md) | Фамилия постановщика ||
|| **CREATED_BY_SECOND_NAME**
[`string`](../../data-types.md) | Отчество постановщика ||
|| **CREATED_BY_LOGIN**
[`string`](../../data-types.md) | Логин постановщика ||
|| **CREATED_BY_WORK_POSITION**
[`string`](../../data-types.md) | Должность постановщика ||
|| **CREATED_BY_PHOTO**
[`integer`](../../data-types.md) | Идентификатор фотографии постановщика ||
|| **RESPONSIBLE_NAME**
[`string`](../../data-types.md) | Имя ответственного ||
|| **RESPONSIBLE_LAST_NAME**
[`string`](../../data-types.md) | Фамилия ответственного ||
|| **RESPONSIBLE_SECOND_NAME**
[`string`](../../data-types.md) | Отчество ответственного ||
|| **RESPONSIBLE_LOGIN**
[`string`](../../data-types.md) | Логин ответственного ||
|| **RESPONSIBLE_WORK_POSITION**
[`string`](../../data-types.md) | Должность ответственного ||
|| **RESPONSIBLE_PHOTO**
[`integer`](../../data-types.md) | Идентификатор фотографии ответственного ||
|| **SCENARIO**
[`string`](../../data-types.md) | Сценарий создания шаблона ||
|| **UF_CRM_TASK**
[`array`](../../data-types.md) | Привязки к объектам CRM ||
|| **UF_TASK_WEBDAV_FILES**
[`array`](../../data-types.md) | Идентификаторы файлов диска, привязанных к шаблону ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Could not find value for parameter {templateId}"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {templateId} | Не передан обязательный параметр `templateId` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжить изучение

- [{#T}](./tasks-template-add.md)
- [{#T}](./tasks-template-update.md)
- [{#T}](./tasks-template-delete.md)
- [{#T}](./tasks-template-fields.md)
