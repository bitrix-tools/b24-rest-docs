# Телефония

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- как это вообще работает, что есть интеграция через рест, а есть управление встроенной телефонией и подключение к SIP-коннектору
- добавь ссылки на виджеты телефонии

{% endnote %}

{% endif %}

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [telephony.externalLine.add](./telephony-external-line-add.md) | Регистрирует внешнюю линию ||
    || [telephony.externalLine.update](./telephony-external-line-update.md) | Изменяет внешнюю линию ||
    || [telephony.externalLine.get](./telephony-external-line-get.md) | Возвращает список внешних линий ||
    || [telephony.externalLine.delete](./telephony-external-line-delete.md) | Удаляет внешнюю линию ||
    || [telephony.externalCall.searchCrmEntities](./telephony-external-call-search-crm-entities.md) | Ищет клиента в CRM по номеру телефона ||
    || [telephony.externalCall.register](./telephony-external-call-register.md) | Регистрирует начало звонка ||
    || [telephony.externalCall.show](./telephony-external-call-show.md) | Открывает карточку звонка у пользователя ||
    || [telephony.externalCall.hide](./telephony-external-call-hide.md) | Скрывает карточку звонка у пользователя ||
    || [telephony.externalCall.finish](./telephony-external-call-finish.md) | Завершает звонок ||
    || [telephony.externalCall.attachRecord](./telephony-external-call-attach-record.md) | Прикрепляет запись звонка ||
    || [telephony.call.attachTranscription](./telephony-call-attach-transcription.md) | Добавляет расшифровку записи к звонку ||
    || [voximplant.statistic.get](./voximplant-statistic-get.md) | Возвращает список звонков ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [OnExternalCallStart](./events/on-external-call-start.md) | При нажатии на телефонный номер в объектах CRM для совершения исходящего звонка ||
    || [OnExternalCallBackStart](./events/on-external-call-back-start.md) | При заполнении CRM-формы обратного звонка ||
    |#

{% endlist %}
