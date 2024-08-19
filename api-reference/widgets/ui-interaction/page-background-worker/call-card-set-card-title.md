# Изменение титульника карточки звонка со стороны приложения

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

{% note info "CallCardSetCardTitle" %}

{% include notitle [Скоуп telephony all](../../../telephony/_includes/scope-telephony-all.md) %}

{% endnote %}

Метод `CallCardSetCardTitle` позволяет изменить со стороны приложения титульник карточки звонка.

При вызове требуется передать объект со свойством title. В функцию обратного вызова ничего не передается.

## Пример

```js
BX24.placement.bindEvent('BackgroundCallCard::initialized', event => {
    BX24.placement.call('CallCardSetCardTitle', { title: 'hello world! }, () => {
        // some code
    })
});
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}