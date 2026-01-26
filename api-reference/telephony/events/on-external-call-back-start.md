# Когда посетитель заполняет crm-форму обратного звонка OnExternalCallBackStart

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

Событие `OnExternalCallBackStart` вызывается, когда посетитель заполняет crm-форму обратного звонка. В настройках формы должно быть выбрано ваше приложение, как линия, через которую будет совершаться обратный звонок.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

#|
|| **Поле** / **Тип** | **Описание** ||
|| **PHONE_NUMBER** 
[`string`](../../data-types.md) | Номер телефона. ||
|| **TEXT** 
[`string`](../../data-types.md) | Текст, который должен быть произнесен пользователю при начале звонка (из настроек формы). ||
|| **VOICE** 
[`string`](../../data-types.md) | Идентификатор голоса, которым должен быть произнесен текст (из настроек формы). Для получения списка идентификаторов голосов см. [voximplant.tts.voices.get](../voximplant/voximplant-tts-voices-get.md). ||
|| **CRM_ENTITY_TYPE** 
[`string`](../../data-types.md) | Тип связанной сущности CRM. ||
|| **CRM_ENTITY_ID** 
[`integer`](../../data-types.md) | Идентификатор сущности CRM, тип которого указан в CRM_ENTITY_TYPE. ||
|| **LINE_NUMBER** 
[`string`](../../data-types.md) | Номер внешней линии, через которую запрошен обратный звонок. ||
|#