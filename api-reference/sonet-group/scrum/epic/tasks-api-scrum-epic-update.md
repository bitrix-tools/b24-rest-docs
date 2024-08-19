# Изменение эпика в Скраме

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

{% note info "tasks.api.scrum.epic.update" %}

**Scope**: [`task`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `tasks.api.scrum.epic.update` изменяет эпик в Скраме.

Все поля эпика доступны для обновления. Необновляемые поля можно не передавать.

## Параметры

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **id**
[`unknown`](../../../data-types.md) | Идентификатор эпика. ||
|| **fields**
[`unknown`](../../../data-types.md) | Поля, соответствующие доступному списку полей [tasks.api.scrum.epic.getFields](./tasks-api-scrum-epic-get-fields.md).

В поле `files` можно передать массив значений с идентификаторами файлов, указав префикс `n`.

Если в `files` передать пустой массив, файлы удалятся. ||
|#

## Пример

```js
const epicId = 1;
const name = 'Updated epic name';
const description = 'Updated description text';
const color = '#bbecf1';
const files = ['n429'];
BX24.callMethod(
    'tasks.api.scrum.epic.update',
    {
        id: epicId,
        fields:{
            name: name,
            description: description,
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