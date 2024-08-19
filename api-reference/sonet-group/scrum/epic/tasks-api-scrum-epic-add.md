# Добавление эпика в Скрам

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
 
{% endnote %}

{% endif %}

{% note info "tasks.api.scrum.epic.add" %}

**Scope**: [`task`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `tasks.api.scrum.epic.add` добавляет эпик в Скрам.

## Параметры

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **fields**
[`unknown`](../../../data-types.md) | Поля, соответствующие доступному списку полей [tasks.api.scrum.epic.getFields](./tasks-api-scrum-epic-get-fields.md).

Поля `name` и `groupId` обязательные. 

В поле `files` можно передать массив значений с идентификаторами файлов, указав префикс `n`. ||
|#

## Пример

```js
const groupId = 1;
const name = 'Epic 1';
const description = 'Description text';
const color = '#69dafc';
const files = ['n428'];
BX24.callMethod(
    'tasks.api.scrum.epic.add',
    {
        fields:{
            name: name,
            groupId: groupId,
            color: color,
            files: files
        }
    },
    function(res)
    {
        console.log(res);
    }
);
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}