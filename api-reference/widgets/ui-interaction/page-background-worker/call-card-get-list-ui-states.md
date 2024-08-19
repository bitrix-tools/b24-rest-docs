# Получение списка доступных состояний интерфейса карточки звонка

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

{% note info "CallCardGetListUiStates" %}

{% include notitle [Скоуп telephony all](../../../telephony/_includes/scope-telephony-all.md) %}

{% endnote %}

Метод `CallCardGetListUiStates` позволяет получить список доступных состояний интерфейса карточки звонка.

При вызове в функцию обратного вызова передается объект со всеми возможными состояниями интерфейса карточки.

## Пример

```js
BX24.placement.bindEvent('BackgroundCallCard::initialized', event => {
    BX24.placement.call('CallCardGetListUiStates', data => {
        // some code
    })
});
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}