# Использование SIP и встроенной телефонии

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- вводное слово о том, что есть встроенная телефония и sip-коннектор, о том, какие именно сценарии доступны через рест в этих вариантах работы с телефонией

{% endnote %}

{% endif %}

При создании приложений учтите, что методы доступны пользователям в соответствии с заданными для пользователей [правами](https://helpdesk.bitrix24.ru/open/18177766/). Уровень требуемых прав указан в описании метода.

{% endnote %}

{% list tabs %}

- Методы

    #|
    || [voximplant.callback.start](./voximplant-callback-start.md) | Запускает обратный звонок ||
    || [voximplant.infocall.startwithsound](./voximplant-infocall-start-with-sound.md) | Осуществляет звонок на указанный номер с проигрыванием файла формата mp3 по URL ||
    || [voximplant.infocall.startwithtext](./voximplant-infocall-start-with-text.md) | Осуществляет звонок на указанный номер с автоматическим произнесением заданного текста ||
    || [voximplant.tts.voices.get](./voximplant-tts-voices-get.md) | Получает массив доступных голосов для синтеза речи ||
    || [voximplant.url.get](./voximplant-url-get.md) | Получает набор ссылок для навигации по страницам телефонии ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [OnVoximplantCallInit](./events/on-voximplant-call-init.md) | При инициализации звонка (о поступлении или начале исходящего звонка). ||
    || [OnVoximplantCallStart](./events/on-voximplant-call-start.md) | При начале разговора (ответе оператора при входящем и ответе абонента при исходящем). ||
    || [OnVoximplantCallEnd](./events/on-voximplant-call-end.md) | При окончании разговора (запись в историю). ||
    |#

{% endlist %}

## Управление пользователями 

#|
|| [voximplant.user.activatePhone](./users/voximplant-user-activate-phone.md) | Устанавливает сотруднику признаки наличия sip-аппарата ||
|| [voximplant.user.deactivatePhone](./users/voximplant-user-deactivate-phone.md) | Отключает сотруднику признаки наличия sip-аппарата ||
|| [voximplant.user.get](./users/voximplant-user-get.md) | Получает настройки пользователей ||
|#

## Управление SIP-подключениями

#|
|| [voximplant.sip.add](./sip/voximplant-sip-add.md) | Создает новую sip-линию с привязкой к приложению ||
|| [voximplant.sip.connector.status](./sip/voximplant-sip-connector-status.md) | Получает текущий статус SIP-Коннектора ||
|| [voximplant.sip.delete](./sip/voximplant-sip-delete.md) | Удаляет существующую sip-линию ||
|| [voximplant.sip.get](./sip/voximplant-sip-get.md) | Получает список всех sip-линий, созданных приложением ||
|| [voximplant.sip.status](./sip/voximplant-sip-status.md) | Получает текущий статус sip-регистрации (только для облачных АТС) ||
|| [voximplant.sip.update](./sip/voximplant-sip-update.md) | Изменяет существующую sip-линию ||
|#

# Управление линиями

#|
|| [voximplant.line.get](./lines/voximplant-line-get.md) | Получает список всех доступных исходящих линий ||
|| [voximplant.line.outgoing.get](./lines/voximplant-line-outgoing-get.md) | Получает текущую выбранную линию в качестве исходящей линии по умолчанию ||
|| [voximplant.line.outgoing.set](./lines/voximplant-line-outgoing-set.md) | Устанавливает выбранную линию в качестве исходящей линии по умолчанию ||
|| [voximplant.line.outgoing.sip.set](./lines/voximplant-line-outgoing-sip-set.md) | Устанавливает выбранную sip-линию в качестве исходящей линии по умолчанию ||
|#