# Возвращение набора доступных типов пользовательских полей для модуля moduleId

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствует ответ в случае ошибки
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

{% note info "userfieldconfig.getTypes" %}

**Scope**: [`userfieldconfig, scope модуля`](../../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

## Описание

```js
userfieldconfig.getTypes({moduleId: string})
```

Метод вернет набор доступных типов пользовательских полей для модуля moduleId.

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **moduleId^*^** | Идентификатор модуля.  | ||
|#

{% include [Сноска о параметрах](../../../../../_includes/required.md) %}

## Примеры

Пример ответа

```json
{
    "types": {
        "employee": {
            "userTypeId": "employee",
            "description": "Привязка к сотруднику"
        },
        "money": {
            "userTypeId": "money",
            "description": "Деньги"
        },
        "string": {
            "userTypeId": "string",
            "description": "Строка"
        },
        "integer": {
            "userTypeId": "integer",
            "description": "Целое число"
        }
    }
}
```

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}
