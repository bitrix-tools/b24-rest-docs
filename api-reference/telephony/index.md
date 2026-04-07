# Телефония: обзор методов

Телефония Битрикс24 помогает работать со звонками в CRM: принимать и выполнять вызовы, вести историю разговоров, связывать звонки с карточками клиентов и сохранять записи.

Через REST API поддерживаются два сценария работы с телефонией:

- интеграция внешней телефонии — приложение регистрирует линию, сообщает о звонке, управляет карточкой и завершает звонок
- управление встроенной телефонией и SIP-коннектором — приложение работает с SIP-подключениями, исходящими линиями, пользователями и событиями звонков

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [Как начать звонить из Битрикс24: выбираем способ подключения телефонии](https://helpdesk.bitrix24.ru/open/6450911/)

## Как выбрать раздел

#|
|| **Если вам нужно** | **Открывайте раздел** ||
|| Интегрировать внешнюю телефонию через REST | [Методы внешней телефонии](#external-telephony) ||
|| Управлять SIP-подключениями, линиями и SIP-настройками сотрудников | [SIP и встроенная телефония](./voximplant/index.md) ||
|| Подписываться на события внешней телефонии | [События](./events/index.md) ||
|#

## Связь с другими объектами

**Пользователь.** Идентификатор `USER_ID` связывает звонок и SIP-настройки с сотрудником. Получить `USER_ID` можно методом [user.get](../user/user-get.md). Передавайте `USER_ID` в [telephony.externalCall.show](./telephony-external-call-show.md) и методах раздела [Управление пользователями](./voximplant/users/index.md).

**Звонок.** Идентификатор `CALL_ID` создается в [telephony.externalCall.register](./telephony-external-call-register.md) и используется в [telephony.externalCall.show](./telephony-external-call-show.md), [telephony.externalCall.hide](./telephony-external-call-hide.md), [telephony.externalCall.finish](./telephony-external-call-finish.md), [telephony.externalCall.attachRecord](./telephony-external-call-attach-record.md) и [telephony.call.attachTranscription](./telephony-call-attach-transcription.md).

**CRM.** Метод [telephony.externalCall.searchCrmEntities](./telephony-external-call-search-crm-entities.md) ищет объекты CRM по номеру телефона, чтобы связать звонок с карточкой клиента.

**Линия и SIP-подключение.** Для сценариев встроенной телефонии используются `LINE_ID` и `CONFIG_ID`. Получить `LINE_ID` можно методом [voximplant.line.get](./voximplant/lines/voximplant-line-get.md), а `CONFIG_ID` — методами [voximplant.sip.add](./voximplant/sip/voximplant-sip-add.md) и [voximplant.sip.get](./voximplant/sip/voximplant-sip-get.md). Полный контекст смотрите в разделах [Управление линиями](./voximplant/lines/index.md) и [Управление SIP-подключениями](./voximplant/sip/index.md).

## Как начать работу с внешней телефонией

1. Зарегистрируйте линию методом [telephony.externalLine.add](./telephony-external-line-add.md).
2. При начале звонка вызовите [telephony.externalCall.register](./telephony-external-call-register.md).
3. При необходимости откройте карточку звонка через [telephony.externalCall.show](./telephony-external-call-show.md).
4. После завершения звонка вызовите [telephony.externalCall.finish](./telephony-external-call-finish.md) и передайте запись через [telephony.externalCall.attachRecord](./telephony-external-call-attach-record.md).
5. Подпишитесь на [OnExternalCallStart](./events/on-external-call-start.md) и [OnExternalCallBackStart](./events/on-external-call-back-start.md), если нужно обрабатывать запуск звонков из интерфейса CRM.

## Как начать работу со встроенной телефонией и SIP-коннектором

1. Создайте SIP-подключение методом [voximplant.sip.add](./voximplant/sip/voximplant-sip-add.md).
2. Проверьте подключение методами [voximplant.sip.get](./voximplant/sip/voximplant-sip-get.md) и [voximplant.sip.status](./voximplant/sip/voximplant-sip-status.md).
3. Получите список доступных линий методом [voximplant.line.get](./voximplant/lines/voximplant-line-get.md).
4. Назначьте исходящую линию по умолчанию через [voximplant.line.outgoing.set](./voximplant/lines/voximplant-line-outgoing-set.md) или [voximplant.line.outgoing.sip.set](./voximplant/lines/voximplant-line-outgoing-sip-set.md).
5. Для сотрудников получите SIP-настройки методом [voximplant.user.get](./voximplant/users/voximplant-user-get.md) и при необходимости включите SIP-аппарат методом [voximplant.user.activatePhone](./voximplant/users/voximplant-user-activate-phone.md).
6. Подпишитесь на события [OnVoximplantCallInit](./voximplant/events/on-voximplant-call-init.md), [OnVoximplantCallStart](./voximplant/events/on-voximplant-call-start.md), [OnVoximplantCallEnd](./voximplant/events/on-voximplant-call-end.md), если нужно обрабатывать жизненный цикл звонка.

## Виджеты

В карточку звонка можно встроить приложение и показывать интерфейс оператора прямо во время разговора.

- [Вкладка в карточке звонка CALL_CARD](../widgets/telephony/index.md)
- [JS-интерфейс карточки звонка](../widgets/ui-interaction/call-card/index.md)

## Ограничения и проверки

- Методы [telephony.externalCall.register](./telephony-external-call-register.md) и [telephony.externalCall.finish](./telephony-external-call-finish.md) работают только в контексте [приложения](../../settings/app-installation/index.md).
- В [telephony.externalCall.register](./telephony-external-call-register.md) передавайте уникальный `EXTERNAL_CALL_ID` для каждого физического звонка, чтобы не получить уже существующий `CALL_ID` при повторной регистрации в течение 30 минут.
- Вызывайте [telephony.externalCall.attachRecord](./telephony-external-call-attach-record.md) после [telephony.externalCall.finish](./telephony-external-call-finish.md), когда запись уже готова.
- Вызывайте [telephony.call.attachTranscription](./telephony-call-attach-transcription.md) для завершенного звонка.
- После [voximplant.line.outgoing.set](./voximplant/lines/voximplant-line-outgoing-set.md) проверяйте фактическую линию через [voximplant.line.outgoing.get](./voximplant/lines/voximplant-line-outgoing-get.md).

## Обзор методов и событий {#all-methods}

> Scope: [`telephony`](../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Внешняя телефония {#external-telephony}

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [telephony.externalLine.add](./telephony-external-line-add.md) | Регистрирует внешнюю линию ||
    || [telephony.externalLine.update](./telephony-external-line-update.md) | Изменяет внешнюю линию ||
    || [telephony.externalLine.get](./telephony-external-line-get.md) | Возвращает список внешних линий ||
    || [telephony.externalLine.delete](./telephony-external-line-delete.md) | Удаляет внешнюю линию ||
    || [telephony.externalCall.searchCrmEntities](./telephony-external-call-search-crm-entities.md) | Ищет клиентские объекты CRM по номеру телефона ||
    || [telephony.externalCall.register](./telephony-external-call-register.md) | Регистрирует начало звонка ||
    || [telephony.externalCall.show](./telephony-external-call-show.md) | Открывает карточку звонка у пользователя ||
    || [telephony.externalCall.hide](./telephony-external-call-hide.md) | Скрывает карточку звонка у пользователя ||
    || [telephony.externalCall.finish](./telephony-external-call-finish.md) | Завершает звонок ||
    || [telephony.externalCall.attachRecord](./telephony-external-call-attach-record.md) | Прикрепляет запись звонка ||
    || [telephony.call.attachTranscription](./telephony-call-attach-transcription.md) | Добавляет расшифровку записи к звонку ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [OnExternalCallStart](./events/on-external-call-start.md) | При нажатии на телефонный номер в объектах CRM, чтобы совершить исходящий звонок ||
    || [OnExternalCallBackStart](./events/on-external-call-back-start.md) | При заполнении CRM-формы обратного звонка ||
    |#

{% endlist %}

### SIP и встроенная телефония

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [voximplant.callback.start](./voximplant/voximplant-callback-start.md) | Запускает обратный звонок ||
    || [voximplant.infocall.startwithsound](./voximplant/voximplant-infocall-start-with-sound.md) | Запускает автозвонок и воспроизводит MP3-файл по URL ||
    || [voximplant.infocall.startwithtext](./voximplant/voximplant-infocall-start-with-text.md) | Запускает автозвонок и воспроизводит получателю заданный текст с помощью синтеза речи ||
    || [voximplant.tts.voices.get](./voximplant/voximplant-tts-voices-get.md) | Возвращает список доступных голосов для синтеза речи ||
    || [voximplant.url.get](./voximplant/voximplant-url-get.md) | Возвращает ссылки для навигации по страницам телефонии ||
    || [voximplant.statistic.get](./voximplant/voximplant-statistic-get.md) | Возвращает список звонков ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [OnVoximplantCallInit](./voximplant/events/on-voximplant-call-init.md) | При инициализации звонка вручную или методами [voximplant.callback.start](./voximplant/voximplant-callback-start.md), [voximplant.infocall.startwithsound](./voximplant/voximplant-infocall-start-with-sound.md), [voximplant.infocall.startwithtext](./voximplant/voximplant-infocall-start-with-text.md), [telephony.externalCall.register](./telephony-external-call-register.md) ||
    || [OnVoximplantCallStart](./voximplant/events/on-voximplant-call-start.md) | При начале разговора: ответе оператора при входящем и ответе абонента при исходящем звонке ||
    || [OnVoximplantCallEnd](./voximplant/events/on-voximplant-call-end.md) | При окончании разговора и записи в историю или методом [telephony.externalCall.finish](./telephony-external-call-finish.md) ||
    |#

{% endlist %}

### Управление SIP-подключениями

#|
|| **Метод** | **Описание** ||
|| [voximplant.sip.add](./voximplant/sip/voximplant-sip-add.md) | Создает SIP-подключение с привязкой к приложению ||
|| [voximplant.sip.update](./voximplant/sip/voximplant-sip-update.md) | Обновляет существующее SIP-подключение ||
|| [voximplant.sip.get](./voximplant/sip/voximplant-sip-get.md) | Возвращает список SIP-подключений, созданных приложением ||
|| [voximplant.sip.status](./voximplant/sip/voximplant-sip-status.md) | Возвращает статус SIP-регистрации для облачной АТС ||
|| [voximplant.sip.delete](./voximplant/sip/voximplant-sip-delete.md) | Удаляет существующее SIP-подключение ||
|| [voximplant.sip.connector.status](./voximplant/sip/voximplant-sip-connector-status.md) | Возвращает текущий статус SIP-коннектора ||
|#

### Управление линиями

#|
|| **Метод** | **Описание** ||
|| [voximplant.line.get](./voximplant/lines/voximplant-line-get.md) | Возвращает список доступных исходящих линий ||
|| [voximplant.line.outgoing.get](./voximplant/lines/voximplant-line-outgoing-get.md) | Возвращает идентификатор текущей исходящей линии по умолчанию ||
|| [voximplant.line.outgoing.set](./voximplant/lines/voximplant-line-outgoing-set.md) | Устанавливает исходящую линию по умолчанию ||
|| [voximplant.line.outgoing.sip.set](./voximplant/lines/voximplant-line-outgoing-sip-set.md) | Устанавливает исходящую SIP-линию по умолчанию ||
|#

### Управление пользователями

#|
|| **Метод** | **Описание** ||
|| [voximplant.user.get](./voximplant/users/voximplant-user-get.md) | Возвращает настройки пользователей ||
|| [voximplant.user.activatePhone](./voximplant/users/voximplant-user-activate-phone.md) | Устанавливает сотруднику признак наличия SIP-аппарата ||
|#
