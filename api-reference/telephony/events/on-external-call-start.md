# Когда пользователь нажимает на телефонный номер в объектах CRM для совершения исходящего звонка OnExternalCallStart

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность полей
- отсутствуют примеры

{% endnote %}

{% endif %}

{% include notitle [Скоуп telephony events](../_includes/scope-telephony-events.md) %}

Событие `OnExternalCallStart` вызывается, когда пользователь нажимает на телефонный номер в объектах CRM для совершения исходящего звонка.

Чтобы событие срабатывало, надо зайти в Телефония > Настройки телефонии и в поле **Номер для исходящего звонка по умолчанию** выбрать свое приложение.

Либо выбрать это приложение как номер по умолчанию в настройках пользователя. Событие будет срабатывать только для выбранного приложения.

#|
|| **Поле** / **Тип** | **Описание** ||
|| **USER_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя. ||
|| **PHONE_NUMBER**
[`string`](../../data-types.md) | Номер исходящего звонка. ||
|| **CRM_ENTITY_TYPE**
[`string`](../../data-types.md) | Тип объекта CRM, из карточки которого совершается звонок - CONTACT \| COMPANY \| LEAD. ||
|| **CRM_ENTITY_ID**
[`integer`](../../data-types.md) | Идентификатор объекта CRM, тип которого указан в CRM_ENTITY_TYPE. ||
|| **CALL_LIST_ID**
[`integer`](../../data-types.md) | Идентификатор списка обзвона, в случае если звонок совершается из списка обзвона. ||
|| **LINE_NUMBER**
[`string`](../../data-types.md) | Номер внешней линии, через которую запрошен звонок. ||
|| **CALL_ID**
[`string`](../../data-types.md) | Идентификатор звонка из метода [telephony.externalcall.register](../telephony-external-call-register.md). ||
|| **IS_MOBILE**
[`integer`](../../data-types.md) | (Y\|N) Признак того, что звонок инициирован из мобильного приложения. ||
|#
