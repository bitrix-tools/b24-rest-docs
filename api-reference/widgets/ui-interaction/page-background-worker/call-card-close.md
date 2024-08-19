# Закрытие карточки звонка со стороны приложения 

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

{% note info "CallCardClose" %}

{% include notitle [Скоуп telephony all](../../../telephony/_includes/scope-telephony-all.md) %}

{% endnote %}

Метод `CallCardClose` позволяет со стороны приложения закрыть карточку звонка.

{% note warning %}

Внимание! После вызова данного метода карточка звонка закрывается и дальнейшие операции с ней произвести не получится.

{% endnote %}

## Пример

```js
BX24.placement.bindEvent('BackgroundCallCard::initialized', event => {
    BX24.placement.call('CallCardClose', {}, () => {
        // some code
    })
});
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}