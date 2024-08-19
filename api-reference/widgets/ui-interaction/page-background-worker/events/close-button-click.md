# По нажатию на кнопку завершения звонка

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры

{% endnote %}

{% endif %}

{% note info "BackgroundCallCard::closeButtonClick" %}

{% include notitle [Скоуп telephony all](../../../../telephony/_includes/scope-telephony-all.md) %}

{% endnote %}

Событие `BackgroundCallCard::closeButtonClick` происходит по нажатию на кнопку завершения звонка. В функцию обратного вызова ничего не передается.