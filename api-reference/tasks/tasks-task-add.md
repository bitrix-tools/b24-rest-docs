# Добавить задачу tasks.task.add

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

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.add` создает задачу. 

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **fields**
[`unknown`](../data-types.md) | Поля, соответствующие доступному списку полей [tasks.task.getfields](./tasks-task-get-fields.md). ||
|#

## Примеры

```js
BX24.callMethod(
    'tasks.task.add',
    {fields:{TITLE:'task for test', RESPONSIBLE_ID:1}},
    function(res){console.log(res.answer.result);}
);
```

Для прикрепления файла к задаче перед идентификатором файла должен быть символ `n`

```js
{
    "taskId":"76",
    "fields": {
        "UF_TASK_WEBDAV_FILES": [
            "n96"
        ]
    }
}
```

**С версии 22.1300.0** в метод можно передать параметр `SE_PARAMETER` — список объектов с дополнительными параметрами задачи.

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