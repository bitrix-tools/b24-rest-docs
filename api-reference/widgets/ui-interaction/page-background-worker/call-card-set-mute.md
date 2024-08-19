# Выключение микрофона оператора со стороны приложения

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

{% note info "CallCardSetMute" %}

{% include notitle [Скоуп telephony all](../../../telephony/_includes/scope-telephony-all.md) %}

{% endnote %}

Метод `CallCardSetMute` позволяет со стороны приложения выключить микрофон оператора.

Приложение должно передавать в метод объект со свойством muted, в котором находится булево значение: true - микрофон должен быть выключен, false - включен. В функцию обратного вызова не передаются какие-либо данные.

## Пример

```js
BX24.placement.bindEvent('BackgroundCallCard::initialized', event => {
    BX24.placement.call('CallCardSetMute', { muted: true }, () => {
// some code
    });
});
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}