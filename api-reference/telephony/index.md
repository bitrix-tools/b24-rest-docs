# Телефония

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- как это вообще работает, что есть интеграция через рест, а есть управление встроенной телефонией и подключение к SIP-коннектору

{% endnote %}

{% endif %}

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [telephony.externalCall.searchCrmEntities](./telephony-external-call-search-crm-entities.md) | Получает объекты CRM по номеру телефона ||
    || [telephony.externalcall.register](./telephony-external-call-register.md) | Регистрирует новый звонок ||
    || [telephony.externalcall.finish](./telephony-external-call-finish.md) | Завершает звонок ||
    || [telephony.externalcall.show](./telephony-external-call-show.md) | Показывает карточку звонка пользователю ||
    || [telephony.externalcall.hide](./telephony-external-call-hide.md) | Скрывает карточку звонка ||
    || [telephony.call.attachTranscription](./telephony-call-attach-transcription.md) | Прикрепляет расшифровку записи к звонку ||
    || [telephony.externalCall.attachRecord](./telephony-external-call-attach-record.md) | Прикрепляет запись разговора к звонку ||
    || [telephony.externalLine.add](./telephony-external-line-add.md) | Добавляет внешнюю линию ||
    || [telephony.externalLine.update](./telephony-external-line-update.md) | Обновляет информацию о внешней линии ||
    || [telephony.externalLine.get](./telephony-external-line-get.md) | Получает информацию о внешней линии ||
    || [telephony.externalLine.delete](./telephony-external-line-delete.md) | Удаляет внешнюю линию ||
    || [voximplant.statistic.get](./voximplant-statistic-get.md) | Возвращает список истории звонков ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [OnExternalCallStart](./events/on-external-call-start.md) | При нажатии на телефонный номер в объектах CRM для совершения исходящего звонка ||
    || [OnExternalCallBackStart](./events/on-external-call-back-start.md) | При заполнении CRM-формы обратного звонка ||
    |#

{% endlist %}
