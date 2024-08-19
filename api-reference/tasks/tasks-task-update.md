# Изменение задачи

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- Нужен доп. пример с пояснением по привязке задачи к crm
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
 
{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% note info "tasks.task.update" %}

**Scope**: [`task`](../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `tasks.task.update` обновляет задачу.

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **taskId**
[`unknown`](../data-types.md) | Идентификатор задачи. ||
|| **fields**
[`unknown`](../data-types.md) | Поля, соответствующие доступному списку полей [tasks.task.getfields](./tasks-task-get-fields.md). ||
|#

## Пример

```js
BX24.callMethod(
    'tasks.task.update',
    {taskId:1, fields:{TITLE:'task for test', RESPONSIBLE_ID:1}},
    function(res){console.log(res.answer.result);}
);
```

Параметры метода для прикрепления файла к задаче из диска:

```json
{"taskId": "77", "fields": {"UF_TASK_WEBDAV_FILES": ["n111"]}}
```

где "111" - id файла на диске.

{% note warning %}

Нужно добавлять букву `n` в начале.

{% endnote %}

**С версии 22.1300.0** в метод можно передать параметр `SE_PARAMETER` - список объектов с дополнительными параметрами задачи.

```js
BX.ajax.runAction("tasks.task.add", {
    data: {
        fields: {
            "TITLE": 'REST',
            "RESPONSIBLE_ID": 1,
            "SE_PARAMETER": [
                {
                    'VALUE': 'Y',
                    'CODE': 3
                },
                {
                    'VALUE': 'Y',
                    'CODE': 2
                },
            ]
        }
    }
}).then(function (response) { console.log(response);});
```

Значения кодов:

1. сроки определяются сроками подзадач
2. автоматически завершать задачу при завершении подзадач (и наоборот)
3. обязательный отчет при завершении задачи

{% include [Сноска о примерах](../../_includes/examples.md) %}