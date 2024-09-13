# Получить пользовательские настройки календаря calendar.user.settings.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `calendar.user.settings.get` возвращает пользовательские настройки календаря.

Без параметров.

## Пример

```js
BX24.callMethod("calendar.user.settings.get", {});
```

{% include [Сноска о примерах](../../_includes/examples.md) %}