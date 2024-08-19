# Изменение ресурса

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "calendar.resource.update" %}

**Scope**: [`calendar`](../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `calendar.resource.update` изменяет ресурс.

#|
|| **Параметр** | **Описание** ||
|| **resourceId** | Идентификатор ресурса. ||
|| **name**^*^ | Имя ресурса. ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

## Пример

```js
BX24.callMethod("calendar.resource.update",
    {
        resourceId: 325,
        name: 'Changed Resource Name'
    }
);
```

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Ответ в случае успеха

Возвращает ID измененного раздела.