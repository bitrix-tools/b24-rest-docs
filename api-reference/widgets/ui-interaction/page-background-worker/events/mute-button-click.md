# По нажатию на кнопку выключения микрофона

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры

{% endnote %}

{% endif %}

{% note info "BackgroundCallCard::muteButtonClick" %}

{% include notitle [Скоуп telephony all](../../../../telephony/_includes/scope-telephony-all.md) %}

{% endnote %}

Событие `BackgroundCallCard::muteButtonClick` происходит по нажатию на кнопку выключения микрофона. В функцию обратного вызова передается булево значение: true - ожидается выключение, false - ожидается включение.
