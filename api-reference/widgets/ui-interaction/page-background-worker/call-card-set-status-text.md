# Изменить текст в центре карточки звонка со стороны приложения CallCardSetStatusText

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

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `CallCardSetStatusText` позволяет со стороны приложения изменить текст в центре карточки звонка.

При вызове требуется передать объект со свойством statusText. В функцию обратного вызова ничего не передается.

## Пример

```js
BX24.placement.bindEvent('BackgroundCallCard::initialized', event => {
    BX24.placement.call('CallCardSetStatusText', { statusText: 'hello world! }, () => {
        // some code
    })
});
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}