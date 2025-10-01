# Получить список полей tasks.task.getFields

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.getFields` возвращает описание стандартных и пользовательских полей задачи.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/tasks.task.getFields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.task.getFields
    ```

- JS

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'tasks.task.getFields',
            {}
        );
        
        const result = response.getData().result;
        console.log('Task fields:', result);
        
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
                'tasks.task.getFields',
                []
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching task fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.task.getFields',
        {},
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.task.getFields',
        []
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
        "fields": {
            "ID": {
                "title": "ID",
                "type": "integer",
                "primary": true
            },
            "PARENT_ID": {
                "title": "ID базовой задачи",
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
            "MARK": {
                "title": "Оценка",
                "type": "enum",
                "values": {
                    "N": "Отрицательная",
                    "P": "Положительная"
                },
                "default": null
            },
            "PRIORITY": {
                "title": "Приоритет",
                "type": "enum",
                "values": {
                    "2": "Высокий",
                    "1": "Средний",
                    "0": "Низкий"
                },
                "default": 1
            },
            "STATUS": {
                "title": "Статус",
                "type": "enum",
                "values": {
                    "2": "Ждёт выполнения",
                    "3": "Выполняется",
                    "4": "Ожидает контроля",
                    "5": "Завершена",
                    "6": "Отложена"
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
            "NOT_VIEWED": {
                "title": null,
                "type": "enum",
                "values": {
                    "Y": "Да",
                    "N": "Нет"
                },
                "default": "N"
            },
            "REPLICATE": {
                "title": "Повторяемая задача",
                "type": "enum",
                "values": {
                    "Y": "Да",
                    "N": "Нет"
                },
                "default": "N"
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
            "SPRINT_ID": {
                "title": "Спринт",
                "type": "integer",
                "default": 0
            },
            "BACKLOG_ID": {
                "title": "Бэклог",
                "type": "integer",
                "default": 0
            },
            "CREATED_BY": {
                "title": "Постановщик",
                "type": "integer",
                "required": true
            },
            "CREATED_DATE": {
                "title": null,
                "type": "datetime"
            },
            "RESPONSIBLE_ID": {
                "title": "Исполнитель",
                "type": "integer",
                "required": true
            },
            "ACCOMPLICES": {
                "title": null,
                "type": "array"
            },
            "AUDITORS": {
                "title": null,
                "type": "array"
            },
            "CHANGED_BY": {
                "title": "Изменил",
                "type": "integer"
            },
            "CHANGED_DATE": {
                "title": "Дата изменения",
                "type": "datetime"
            },
            "STATUS_CHANGED_BY": {
                "title": "Изменил статус",
                "type": "integer"
            },
            "STATUS_CHANGED_DATE": {
                "title": "Дата изменения статуса",
                "type": "datetime"
            },
            "CLOSED_BY": {
                "title": "Закрыл задачу",
                "type": "integer",
                "default": null
            },
            "CLOSED_DATE": {
                "title": "Дата закрытия",
                "type": "datetime",
                "default": null
            },
            "ACTIVITY_DATE": {
                "title": null,
                "type": "datetime",
                "default": null
            },
            "DATE_START": {
                "title": "Дата начала",
                "type": "datetime",
                "default": null
            },
            "DEADLINE": {
                "title": "Крайний срок",
                "type": "datetime",
                "default": null
            },
            "START_DATE_PLAN": {
                "title": "Плановое начало",
                "type": "datetime",
                "default": null
            },
            "END_DATE_PLAN": {
                "title": "Плановое завершение",
                "type": "datetime",
                "default": null
            },
            "GUID": {
                "title": "GUID",
                "type": "string",
                "default": null
            },
            "XML_ID": {
                "title": "XML_ID",
                "type": "string",
                "default": null
            },
            "COMMENTS_COUNT": {
                "title": "Кол-во комментариев",
                "type": "integer",
                "default": 0
            },
            "SERVICE_COMMENTS_COUNT": {
                "title": null,
                "type": "integer",
                "default": 0
            },
            "NEW_COMMENTS_COUNT": {
                "title": null,
                "type": "integer",
                "default": 0
            },
            "ALLOW_CHANGE_DEADLINE": {
                "title": null,
                "type": "enum",
                "values": {
                    "Y": "Да",
                    "N": "Нет"
                },
                "default": "N"
            },
            "ALLOW_TIME_TRACKING": {
                "title": null,
                "type": "enum",
                "values": {
                    "Y": "Да",
                    "N": "Нет"
                },
                "default": "N"
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
            "FORKED_BY_TEMPLATE_ID": {
                "title": "Создано из шаблона",
                "type": "enum",
                "values": {
                    "Y": "Да",
                    "N": "Нет"
                },
                "default": "N"
            },
            "TIME_ESTIMATE": {
                "title": "Затраченое время",
                "type": "integer"
            },
            "TIME_SPENT_IN_LOGS": {
                "title": "Затраченое время из истории изменений",
                "type": "integer"
            },
            "MATCH_WORK_TIME": {
                "title": "Пропустить выходные дни",
                "type": "integer"
            },
            "FORUM_TOPIC_ID": {
                "title": "FORUM_TOPIC_ID",
                "type": "integer"
            },
            "FORUM_ID": {
                "title": "FORUM_ID",
                "type": "integer"
            },
            "SITE_ID": {
                "title": "SITE_ID",
                "type": "string"
            },
            "SUBORDINATE": {
                "title": "Задача подчиненного",
                "type": "enum",
                "values": {
                    "Y": "Да",
                    "N": "Нет"
                },
                "default": null
            },
            "FAVORITE": {
                "title": null,
                "type": "enum",
                "values": {
                    "Y": "Да",
                    "N": "Нет"
                },
                "default": null
            },
            "EXCHANGE_MODIFIED": {
                "title": "EXCHANGE_MODIFIED",
                "type": "datetime",
                "default": null
            },
            "EXCHANGE_ID": {
                "title": "EXCHANGE_ID",
                "type": "integer",
                "default": null
            },
            "OUTLOOK_VERSION": {
                "title": "OUTLOOK_VERSION",
                "type": "integer",
                "default": null
            },
            "VIEWED_DATE": {
                "title": "Дата последнего просмотра",
                "type": "datetime"
            },
            "SORTING": {
                "title": "Индекс сортировки",
                "type": "double"
            },
            "DURATION_PLAN": {
                "title": "Затрачено (план)",
                "type": "integer"
            },
            "DURATION_FACT": {
                "title": "Затрачено (фактически)",
                "type": "integer"
            },
            "CHECKLIST": {
                "title": null,
                "type": "array"
            },
            "DURATION_TYPE": {
                "title": "DURATION_TYPE",
                "type": "enum",
                "values": [
                    "secs",
                    "mins",
                    "hours",
                    "days",
                    "weeks",
                    "monts",
                    "years"
                ],
                "default": "days"
            },
            "IS_MUTED": {
                "title": null,
                "type": "enum",
                "values": {
                    "Y": "Да",
                    "N": "Нет"
                },
                "default": "N"
            },
            "IS_PINNED": {
                "title": null,
                "type": "enum",
                "values": {
                    "Y": "Да",
                    "N": "Нет"
                },
                "default": "N"
            },
            "IS_PINNED_IN_GROUP": {
                "title": null,
                "type": "enum",
                "values": {
                    "Y": "Да",
                    "N": "Нет"
                },
                "default": "N"
            },
            "FLOW_ID": {
                "title": "Поток",
                "type": "integer",
                "default": 0
            },
            "UF_CRM_TASK": {
                "title": "Элементы CRM",
                "type": "crm"
            },
            "UF_TASK_WEBDAV_FILES": {
                "title": "Загрузить файлы",
                "type": "disk_file"
            },
            "UF_MAIL_MESSAGE": {
                "title": null,
                "type": "mail_message"
            },
            "UF_NEW_TASKS_FIELD": {
                "title": "Новое поле задач",
                "type": "string"
            }
        }
    },
    "time": {
        "start": 1758790899,
        "finish": 1758790899.809331,
        "duration": 0.809330940246582,
        "processing": 0,
        "date_start": "2025-09-25T12:01:39+03:00",
        "date_finish": "2025-09-25T12:01:39+03:00",
        "operating_reset_at": 1758791499,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Объект с [описанием полей задачи](./fields.md) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./tasks-task-get.md)
- [{#T}](./tasks-task-list.md)



