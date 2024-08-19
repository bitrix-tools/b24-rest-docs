# При оценке качества связи

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры

{% endnote %}

{% endif %}

{% note info "BackgroundCallCard::qualityMeterClick" %}

{% include notitle [Скоуп telephony all](../../../../telephony/_includes/scope-telephony-all.md) %}

{% endnote %}

Событие `BackgroundCallCard::qualityMeterClick` происходит при оценке качества связи. В функцию обратного вызова передается целочисленное значение от 1 до 5.