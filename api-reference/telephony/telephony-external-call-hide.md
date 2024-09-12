# Скрыть карточку звонка у пользователя telephony.externalcall.hide

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

{% include notitle [Скоуп telephony all](./_includes/scope-telephony-all.md) %}

Метод `telephony.externalcall.hide` скрывает карточку звонка у пользователя.

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **CALL_ID**^*^ 
[`string`](../data-types.md) | Идентификатор звонка из метода [telephony.externalcall.register](telephony-external-call-register.md). ||
|| **USER_ID**^*^ 
[`int`](../data-types.md) | Идентификатор, либо массив идентификаторов пользователей, у которых надо скрыть звонок, если карточка показывается не у одного пользователя. ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}