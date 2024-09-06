# При оценке качества связи BackgroundCallCard::qualityMeterClick

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры

{% endnote %}

{% endif %}

> Scope: [`telephony`](../../../../scopes/permissions.md)
>
> Кто может подписаться: `любой пользователь`

Событие `BackgroundCallCard::qualityMeterClick` происходит при оценке качества связи. В функцию обратного вызова передается целочисленное значение от 1 до 5.