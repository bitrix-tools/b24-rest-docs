# Нажатие на кнопку "ответить"

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры

{% endnote %}

{% endif %}

{% note info "BackgroundCallCard::answerButtonClick" %}

{% include notitle [Скоуп telephony all](../../../../telephony/_includes/scope-telephony-all.md) %}

{% endnote %}

Событие `BackgroundCallCard::answerButtonClick` – нажатие на кнопку "ответить". В функцию обратного вызова ничего не передается.