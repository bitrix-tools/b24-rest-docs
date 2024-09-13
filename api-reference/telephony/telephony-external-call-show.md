# Показать карточку звонка пользователю telephony.externalcall.show

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

Метод `telephony.externalcall.show` показывает карточку звонка пользователю.

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **CALL_ID**^*^ 
[`string`](../data-types.md) | Идентификатор звонка из метода [telephony.externalcall.register](telephony-external-call-register.md). ||
|| **USER_ID** 
[`int`](../data-types.md) | Идентификатор, либо массив идентификаторов пользователей в стандартном для PHP формате: `USER_ID[0]=11&USER_ID[1]=24&USER_ID[2]=31`. ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}