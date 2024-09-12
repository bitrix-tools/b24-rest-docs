# Сохранить пользовательские настройки календаря calendar.user.settings.set

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

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `calendar.user.settings.set` сохраняет пользовательские настройки календаря.

#|
|| **Параметр** | **Описание** ||
|| **settings**^*^ | Список пользовательских настроек.||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

## Пример

```js
BX24.callMethod("calendar.user.settings.set",
    {
        settings: {
            tabId: 'month',
            meetSection: '23',
            blink: true,
            showDeclined: false,
            showMuted: true
        }
    }
);
```

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Ответ в случае успеха

Возвращает **true** в случае успешного выполнения.