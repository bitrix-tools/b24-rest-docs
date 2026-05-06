# SIP и встроенная телефония: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Раздел описывает сценарий работы со встроенной телефонией и SIP-коннектором в Битрикс24.

- Встроенная телефония — базовый режим телефонии Битрикс24 для работы со звонками внутри платформы. Через API в этом режиме можно запускать звонки, получать события по звонкам, управлять исходящими линиями и настраивать SIP-параметры пользователей.
- SIP-коннектор — режим интеграции Битрикс24 с внешними SIP-провайдерами и АТС. Через API в этом режиме можно создавать, обновлять и удалять SIP-подключения приложения, проверять их статус регистрации и назначать SIP-линию по умолчанию для исходящих звонков.

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [Как выбрать и подключить SIP АТС в Битрикс24](https://helpdesk.bitrix24.ru/open/19420080/)

## Как выбрать подраздел

#|
|| **Если вам нужно** | **Открывайте раздел** ||
|| Реагировать на начало и завершение звонков | [События](./events/index.md) ||
|| Управлять SIP-подключениями приложения | [Управление SIP-подключениями](./sip/index.md) ||
|| Управлять исходящими линиями по умолчанию | [Управление линиями](./lines/index.md) ||
|| Получать SIP-настройки пользователя и включать SIP-аппарат | [Управление пользователями](./users/index.md) ||
|#

## Связь с другими объектами

**Пользователь.** Для SIP-настроек сотрудника нужен идентификатор пользователя `USER_ID`. Получить `USER_ID` можно методом [user.get](../../user/user-get.md).

**SIP-подключение.** Для работы с внешней SIP-конфигурацией нужен идентификатор настройки SIP-подключения `CONFIG_ID`. Идентификатор можно получить в ответе [voximplant.sip.add](./sip/voximplant-sip-add.md) и в списке [voximplant.sip.get](./sip/voximplant-sip-get.md).

**Исходящая линия.** В сценариях исходящих звонков применяется идентификатор исходящей линии `LINE_ID`. Получить `LINE_ID` можно методом [voximplant.line.get](./lines/voximplant-line-get.md).

## Права доступа

Доступ к методам телефонии зависит от прав пользователя и его роли в Битрикс24. При недостаточных правах метод вернет ошибку доступа.

Конкретные требования к правам смотрите в описании каждого метода.

{% note tip "Пользовательская документация" %}

- [Как настроить права доступа в телефонии](https://helpdesk.bitrix24.ru/open/18177766/)

{% endnote %}

## Как начать работу

1. Выберите, с чем вы будете работать: исходящий звонок, SIP-подключение, исходящие линии, SIP-настройки пользователей или события звонков.
2. Для исходящего звонка используйте [voximplant.callback.start](./voximplant-callback-start.md), [voximplant.infocall.startwithsound](./voximplant-infocall-start-with-sound.md) или [voximplant.infocall.startwithtext](./voximplant-infocall-start-with-text.md).
3. Для SIP-сценария создайте подключение через [voximplant.sip.add](./sip/voximplant-sip-add.md), затем проверьте его через [voximplant.sip.get](./sip/voximplant-sip-get.md) и [voximplant.sip.status](./sip/voximplant-sip-status.md).
4. Назначьте исходящую линию через [voximplant.line.outgoing.set](./lines/voximplant-line-outgoing-set.md) или [voximplant.line.outgoing.sip.set](./lines/voximplant-line-outgoing-sip-set.md). После [voximplant.line.outgoing.set](./lines/voximplant-line-outgoing-set.md) проверьте фактическую линию методом [voximplant.line.outgoing.get](./lines/voximplant-line-outgoing-get.md).
5. Для работы с SIP-настройками сотрудников используйте [voximplant.user.get](./users/voximplant-user-get.md) и [voximplant.user.activatePhone](./users/voximplant-user-activate-phone.md).
6. Подпишитесь на события в разделе [События](./events/index.md), если нужна обработка жизненного цикла звонка.

## Обзор методов и событий {#all-methods}

> Scope: [`telephony`](../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

### Основные

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [voximplant.callback.start](./voximplant-callback-start.md) | Запускает обратный звонок ||
    || [voximplant.infocall.startwithsound](./voximplant-infocall-start-with-sound.md) | Запускает автозвонок и воспроизводит MP3-файл по URL ||
    || [voximplant.infocall.startwithtext](./voximplant-infocall-start-with-text.md) | Запускает автозвонок и воспроизводит получателю заданный текст с помощью синтеза речи ||
    || [voximplant.tts.voices.get](./voximplant-tts-voices-get.md) | Возвращает список доступных голосов для синтеза речи ||
    || [voximplant.statistic.get](./voximplant-statistic-get.md) | Возвращает список звонков ||
    || [voximplant.url.get](./voximplant-url-get.md) | Возвращает ссылки для навигации по страницам телефонии ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [OnVoximplantCallInit](./events/on-voximplant-call-init.md) | При инициализации звонка вручную или методами [voximplant.callback.start](./voximplant-callback-start.md), [voximplant.infocall.startwithsound](./voximplant-infocall-start-with-sound.md), [voximplant.infocall.startwithtext](./voximplant-infocall-start-with-text.md), [telephony.externalCall.register](../telephony-external-call-register.md) ||
    || [OnVoximplantCallStart](./events/on-voximplant-call-start.md) | При начале разговора: ответе оператора при входящем и ответе абонента при исходящем звонке ||
    || [OnVoximplantCallEnd](./events/on-voximplant-call-end.md) | При окончании разговора и записи в историю или методом [telephony.externalCall.finish](../telephony-external-call-finish.md) ||
    |#

{% endlist %}

### Управление SIP-подключениями

#|
|| **Метод** | **Описание** ||
|| [voximplant.sip.add](./sip/voximplant-sip-add.md) | Создает SIP-подключение с привязкой к приложению ||
|| [voximplant.sip.update](./sip/voximplant-sip-update.md) | Обновляет существующее SIP-подключение ||
|| [voximplant.sip.get](./sip/voximplant-sip-get.md) | Возвращает список SIP-подключений, созданных приложением ||
|| [voximplant.sip.status](./sip/voximplant-sip-status.md) | Возвращает статус SIP-регистрации для облачной АТС ||
|| [voximplant.sip.delete](./sip/voximplant-sip-delete.md) | Удаляет существующее SIP-подключение ||
|| [voximplant.sip.connector.status](./sip/voximplant-sip-connector-status.md) | Возвращает текущий статус SIP-коннектора ||
|#

### Управление линиями

#|
|| **Метод** | **Описание** ||
|| [voximplant.line.get](./lines/voximplant-line-get.md) | Возвращает список доступных исходящих линий ||
|| [voximplant.line.outgoing.get](./lines/voximplant-line-outgoing-get.md) | Возвращает идентификатор текущей исходящей линии по умолчанию ||
|| [voximplant.line.outgoing.set](./lines/voximplant-line-outgoing-set.md) | Устанавливает исходящую линию по умолчанию ||
|| [voximplant.line.outgoing.sip.set](./lines/voximplant-line-outgoing-sip-set.md) | Устанавливает исходящую SIP-линию по умолчанию ||
|#

### Управление пользователями

#|
|| **Метод** | **Описание** ||
|| [voximplant.user.get](./users/voximplant-user-get.md) | Возвращает настройки пользователей ||
|| [voximplant.user.activatePhone](./users/voximplant-user-activate-phone.md) | Устанавливает сотруднику признак наличия SIP-аппарата ||
|#
