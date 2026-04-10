# Открытые линии Битрикс24: API линий и коннекторов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Раздел описывает два связанных направления API.
- [Открытые линии](./openlines/index.md) — правила обработки обращений внутри Битрикс24: очереди операторов, сессии, сообщения, чат-боты, события, связь с CRM.
- [Коннекторы](./imconnector/index.md) — подключение и обслуживание внешних каналов связи, через которые клиенты пишут в открытые линии.

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [Контакт-центр и открытые линии](https://helpdesk.bitrix24.ru/open/7954623/)

## Как выбрать раздел

#|
|| **Сценарий** | **Что использовать** ||
|| Настроить линию, очереди операторов и правила обработки обращений | Методы раздела [Открытые линии](./openlines/index.md) ||
|| Подключить собственный внешний канал связи к Битрикс24 | Методы раздела [Коннекторы открытых линий](./imconnector/index.md) ||
|| Подключить к текущему порталу внешнюю открытую линию с другого Битрикс24 | Метод [imopenlines.network.join](./openlines/imopenlines-network-join.md) ||
|| Подписаться на события сообщений, диалогов и статусов | События из разделов [События коннекторов](./imconnector/events/index.md) и [События открытых линий](./openlines/events/index.md) ||
|#

## Как связаны открытые линии и коннекторы

Для собственного внешнего канала используются оба набора методов: `imconnector.*` для регистрации и обслуживания коннектора и `imopenlines.*` для настройки линии и обработки диалогов. Если нужно подключить к порталу внешнюю открытую линию другого Битрикс24 без регистрации своего коннектора, используйте метод [imopenlines.network.join](./openlines/imopenlines-network-join.md).

## Связи открытых линий и коннекторов с другими объектами

**Чат.** Система обрабатывает обращение как чат открытой линии. Через чат выполняются операции с сообщениями, операторами и сессиями.

**Сессия.** Внутри чата обращение проходит как сессия. Для запуска сессии, чтения истории, подключения оператора и управления режимами используйте группу методов [imopenlines.session.*](./openlines/sessions/index.md).

**Оператор.** Линия распределяет обращения между операторами из очереди. Настройка очереди выполняется через `imopenlines.config.*`, а действия оператора в активном диалоге — через группу методов [imopenlines.operator.*](./openlines/operators/index.md). Для перевода диалога на оператора используется `USER_ID`, который можно получить методами [user.get](../user/user-get.md) и [user.search](../user/user-search.md).

**Внешний пользователь.** Клиент внешнего канала связан с диалогом через `USER_CODE`. По этому идентификатору система определяет, к какому чату и сессии относится обращение.

**Сообщение.** Переписка клиента и оператора связана с чатом и сессией. Для отправки сообщений и сохранения быстрых ответов используйте методы раздела [Сообщения](./openlines/messages/index.md), для реакции на изменения сообщений — раздел [События](./openlines/events/index.md).

**Чат-бот.** Бот может отправлять сообщения, переключать диалог на оператора и завершать сессию с помощью методов группы [imopenlines.bot.*](./openlines/chat-bots/index.md).

**CRM.** Диалоги открытых линий можно связывать с объектами CRM. Для получения CRM-чатов используйте группу методов [imopenlines.crm.chat.*](./openlines/chats/index.md), для создания лида по итогам диалога — метод [imopenlines.crm.lead.create](./openlines/sessions/imopenlines-crm-lead-create.md).

**Универсальные списки.** Быстрые ответы связаны с идентификатором `QUICK_ANSWERS_IBLOCK_ID`. Получить его можно методом [imopenlines.config.get](./openlines/imopenlines-config-get.md), а задать при создании или обновлении линии — методами [imopenlines.config.add](./openlines/imopenlines-config-add.md) и [imopenlines.config.update](./openlines/imopenlines-config-update.md).

## Ключевые идентификаторы

#|
|| **Идентификатор** | **Описание** | **Как получить** ||
|| `CHAT_ID` | Идентификатор чата открытой линии. Нужен для действий с диалогом, сообщениями, операторами и чат-ботами | [imopenlines.session.open](./openlines/sessions/imopenlines-session-open.md), [imopenlines.dialog.get](./openlines/sessions/imopenlines-dialog-get.md) ||
|| `SESSION_ID` | Идентификатор сессии внутри чата. Нужен для чтения истории и управления ходом обработки обращения | [imopenlines.session.history.get](./openlines/sessions/imopenlines-session-history-get.md) ||
|| `USER_CODE` | Внешний код пользователя канала связи. Нужен, чтобы однозначно связать внешнего клиента с чатом и сессией в линии | Формируется внешним каналом, используется в [imopenlines.session.open](./openlines/sessions/imopenlines-session-open.md) ||
|| `USER_ID` | Идентификатор пользователя Битрикс24. Нужен для маршрутизации диалога между операторами и операторских действий | [user.get](../user/user-get.md), [user.search](../user/user-search.md) ||
|| `LINE`/`CONFIG_ID` | Идентификатор открытой линии. В методах `imconnector.*` обычно используется параметр `LINE`, в методах `imopenlines.config.*` — `CONFIG_ID`. Идентификатор нужен, чтобы получать данные линии, изменять настройки и связывать с ней сообщения коннектора | [imopenlines.config.get](./openlines/imopenlines-config-get.md), [imopenlines.config.list.get](./openlines/imopenlines-config-list-get.md), [imopenlines.config.update](./openlines/imopenlines-config-update.md) ||
|| `CONNECTOR` | Идентификатор коннектора. Нужен, чтобы методы `imconnector.*` работали с правильным подключенным коннектором | Задается при регистрации в [imconnector.register](./imconnector/imconnector-register.md) в параметре `ID`, затем передается, например, в [imconnector.activate](./imconnector/imconnector-activate.md) и [imconnector.send.messages](./imconnector/imconnector-send-messages.md) ||
|#

## Как начать работу

### Подключить собственный внешний канал через коннектор

1. Зарегистрируйте и активируйте коннектор: [imconnector.register](./imconnector/imconnector-register.md), [imconnector.activate](./imconnector/imconnector-activate.md)
2. Создайте открытую линию и свяжите ее с каналом: [imopenlines.config.add](./openlines/imopenlines-config-add.md), [imconnector.connector.data.set](./imconnector/imconnector-connector-data-set.md)
3. Проверьте отправку сообщений и статус коннектора: [imconnector.send.messages](./imconnector/imconnector-send-messages.md), [imconnector.status](./imconnector/imconnector-status.md)

### Подключить внешнюю открытую линию другого Битрикс24

1. Подключите линию методом [imopenlines.network.join](./openlines/imopenlines-network-join.md)
2. Проверьте обработку диалога: [imopenlines.session.open](./openlines/sessions/imopenlines-session-open.md), [imopenlines.operator.answer](./openlines/operators/imopenlines-operator-answer.md), [imopenlines.crm.message.add](./openlines/messages/imopenlines-crm-message-add.md)

Для автоматизации подключите события: [События открытых линий](./openlines/events/index.md), [События коннекторов](./imconnector/events/index.md)

## Обзор методов и событий {#all-methods}

> Scope: [`imopenlines`](../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода и прав доступа к открытым линиям

### Открытые линии

#|
|| **Раздел** | **Когда использовать** | **Ключевые методы** ||
|| Настройки линии | Создать линию, обновить настройки и получить параметры | [imopenlines.config.add](./openlines/imopenlines-config-add.md), [imopenlines.config.update](./openlines/imopenlines-config-update.md), [imopenlines.config.get](./openlines/imopenlines-config-get.md)

 [Все методы раздела](./openlines/index.md) ||
|| Диалоги и сессии | Найти чат, запустить сессию, прочитать историю и управлять режимами | [imopenlines.session.open](./openlines/sessions/imopenlines-session-open.md), [imopenlines.session.start](./openlines/sessions/imopenlines-session-start.md), [imopenlines.session.history.get](./openlines/sessions/imopenlines-session-history-get.md)

[Все методы раздела](./openlines/sessions/index.md) ||
|| Операторы | Передать и завершить диалог, распределить обращения между операторами | [imopenlines.operator.answer](./openlines/operators/imopenlines-operator-answer.md), [imopenlines.operator.transfer](./openlines/operators/imopenlines-operator-transfer.md), [imopenlines.operator.finish](./openlines/operators/imopenlines-operator-finish.md)

[Все методы раздела](./openlines/operators/index.md) ||
|| Сообщения | Отправить сообщение и сохранить быстрый ответ | [imopenlines.crm.message.add](./openlines/messages/imopenlines-crm-message-add.md), [imopenlines.message.quick.save](./openlines/messages/imopenlines-message-quick-save.md)

[Все методы раздела](./openlines/messages/index.md) ||
|| Чаты CRM | Найти CRM-чат и добавить участников | [imopenlines.crm.chat.get](./openlines/chats/imopenlines-crm-chat-get.md), [imopenlines.crm.chat.user.add](./openlines/chats/imopenlines-crm-chat-user-add.md)

[Все методы раздела](./openlines/chats/index.md) ||
|| Чат-боты | Автоматизировать диалог с помощью чат-бота | [imopenlines.bot.session.message.send](./openlines/chat-bots/imopenlines-bot-session-message-send.md), [imopenlines.bot.session.transfer](./openlines/chat-bots/imopenlines-bot-session-transfer.md)

[Все методы раздела](./openlines/chat-bots/index.md) ||
|#

События: [События открытых линий](./openlines/events/index.md)

### Коннекторы открытых линий

#|
|| **Раздел** | **Когда использовать** | **Ключевые методы** ||
|| Регистрация и подключение | Зарегистрировать канал и активировать его в портале | [imconnector.register](./imconnector/imconnector-register.md), [imconnector.activate](./imconnector/imconnector-activate.md), [imconnector.connector.data.set](./imconnector/imconnector-connector-data-set.md) ||
|| Обмен сообщениями | Передать, изменить и удалить сообщения внешнего канала | [imconnector.send.messages](./imconnector/imconnector-send-messages.md), [imconnector.update.messages](./imconnector/imconnector-update-messages.md), [imconnector.delete.messages](./imconnector/imconnector-delete-messages.md) ||
|| Служебные операции | Проверить статус коннектора, получить список и отключить каналы | [imconnector.status](./imconnector/imconnector-status.md), [imconnector.list](./imconnector/imconnector-list.md), [imconnector.unregister](./imconnector/imconnector-unregister.md) ||
|#

Все методы коннекторов: [Коннекторы открытых линий](./imconnector/index.md)

События: [События коннекторов](./imconnector/events/index.md)
