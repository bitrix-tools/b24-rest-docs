# При выборе оператора, на которого текущий оператор хочет перевести звонок

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры

{% endnote %}

{% endif %}

{% note info "BackgroundCallCard::transferButtonClick" %}

{% include notitle [Скоуп telephony all](../../../../telephony/_includes/scope-telephony-all.md) %}

{% endnote %}

Событие `BackgroundCallCard::transferButtonClick` происходит при выборе оператора, на которого текущий оператор хочет перевести звонок. В функцию обратного вызова передается объект со свойствами `phoneNumber` - номер текущего звонка и `target` - идентификатор пользователя Битрикс24.
