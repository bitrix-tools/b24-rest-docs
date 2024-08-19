# Создание новой записи таймлайна у элемента с идентификатором itemId процесса с идентификатором typeId

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "rpa.timeline.add" %}

**Scope**: [`rpa`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `rpa.timeline.add` создаст новую запись таймлайна у элемента с идентификатором itemId процесса с идентификатором typeId.

Этот метод позволяет изменять только поля title и description.

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **typeId** 
[`number`](../../../data-types.md) | Идентификатор процесса. ||
|| **itemId** 
[`number`](../../../data-types.md) | Идентификатор элемента. ||
|| **fields** 
[`array`](../../../data-types.md) | Поля записи. ||
|#

## Параметры fields

#|
|| **Параметр** | **Описание** ||
|| **title** | Заголовок записи. ||
|| **description** | Описание записи (можно использовать html). ||
|#

## Пример

```json
{
    "timeline": {
        "id": 325,
        "typeId": 24,
        "itemId": 10,
        "createdTime": "2020-03-26T21:55:25+02:00",
        "userId": 1,
        "title": "rest update",
        "description": "<h5>small header</h5>",
        "action": false,
        "isFixed": false,
        "data": {
            "scope": "rest"
        },
        "createdTimestamp": 1585252525000,
        "users": {
            "1": {
                "id": "1",
                "name": "Anton",
                "secondName": "",
                "lastName": "",
                "title": null,
                "workPosition": "",
                "fullName": "Anton",
                "link": "/company/personal/user/1/"
            }
        }
    }
}
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}