# Получение списка всех ресурсов

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "calendar.resource.list" %}

**Scope**: [`calendar`](../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `calendar.resource.list` возвращает список (массив) всех ресурсов.

Без параметров.

## Пример

```js
BX24.callMethod("calendar.resource.list")
```

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Ответ в случае успеха

Возвращает массив, каждый элемент которого имеет поля "ID", "NAME", "CREATED_BY".