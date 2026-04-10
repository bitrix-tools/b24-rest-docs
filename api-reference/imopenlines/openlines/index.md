# Открытые линии: обзор методов и событий

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Открытые линии в Битрикс24 объединяют обращения из внешних каналов в единый поток и направляют их сотрудникам. Линия хранит правила маршрутизации, очередь операторов, сценарии автоответов, рабочее время и интеграцию с CRM.

Работа строится по цепочке: клиент пишет в подключенный канал, система создает чат и открывает сессию, после чего диалог попадает сотруднику по правилам линии. В рамках сессии оператор отвечает клиенту, передает диалог, подключает коллегу или завершает обращение.

Раздел описывает управление каждым шагом этой цепочки: настройку линий, работу с чатами и сессиями, действия операторов, сообщения, чат-боты и события. 

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [Как создать и настроить открытую линию](https://helpdesk.bitrix24.ru/open/25004908/)

## Как выбрать подраздел

#|
|| **Сценарий** | **Что использовать** ||
|| Создать линию, получить список линий, обновить или удалить настройки | Методы `imopenlines.config.*` ||
|| Подключить к текущему порталу внешнюю открытую линию с другого Битрикс24 | Метод [imopenlines.network.join](./imopenlines-network-join.md) ||
|| Открыть диалог, работать с сессией и получить историю сообщений | Методы раздела [Диалоги](./sessions/index.md) ||
|| Принять диалог, передать его другому сотруднику или завершить | Методы раздела [Операторы](./operators/index.md) ||
|| Отправить сообщение в диалог или сохранить быстрый ответ | Методы раздела [Сообщения](./messages/index.md) ||
|| Управлять чатом, связанным с CRM | Методы раздела [Чаты CRM](./chats/index.md) ||
|| Автоматизировать диалог с помощью чат-бота | Методы раздела [Чат-боты](./chat-bots/index.md) ||
|| Подписаться на события по сообщениям и сессиям | [События](./events/index.md) ||
|#

## Связь открытых линий с другими объектами

**Чат.** Обращение в открытую линию обрабатывается в чате. Чтобы найти чат и получить его данные, используйте методы [imopenlines.session.open](./sessions/imopenlines-session-open.md) и [imopenlines.dialog.get](./sessions/imopenlines-dialog-get.md). Для операций с CRM-чатами используйте раздел [Чаты CRM](./chats/index.md). Основной идентификатор — `CHAT_ID`.

**Сессия.** Внутри чата обращения проходят как сессии. В разделе [Диалоги](./sessions/index.md) доступны методы запуска сессии, подключения оператора, чтения истории и управления режимами. Основной идентификатор — `SESSION_ID`.

**Сотрудник.** Линия распределяет обращения между сотрудниками из очереди. Очередь и правила распределения настраиваются через `imopenlines.config.*`, а работа сотрудника в активном диалоге выполняется через раздел [Операторы](./operators/index.md).

**Внешний пользователь.** Сообщения клиента из внешнего канала создают чат и сессию в линии. Для связи с пользователем используется `USER_CODE`.

**Сообщение.** Обмен сообщениями в открытой линии выполняется методами раздела [Сообщения](./messages/index.md). Сообщения связаны с чатом, сессией и участвуют в [событиях](./events/index.md).

**Чат-бот.** Для автоматизации диалога используйте методы раздела [Чат-боты](./chat-bots/index.md). Чат-бот может отправлять сообщения, переводить диалог и завершать сессию.

**CRM.** Открытые линии связаны с CRM. С помощью методов раздела [Чаты CRM](./chats/index.md) можно получить чат, который привязан к объекту CRM. Создать лид по итогам диалога позволяет метод [imopenlines.crm.lead.create](./sessions/imopenlines-crm-lead-create.md).

## Как начать работу

1. Подключите источник обращений:
   - внешний канал через коннектор по сценарию из статьи [Открытые линии Битрикс24: API линий и коннекторов](../index.md),
   - внешнюю открытую линию другого Битрикс24 методом [imopenlines.network.join](./imopenlines-network-join.md).
2. Откройте диалог и получите идентификаторы `CHAT_ID` и `SESSION_ID` в разделе [Диалоги](./sessions/index.md).
3. Настройте обработку диалога сотрудниками в разделе [Операторы](./operators/index.md).
4. Для дополнительных сценариев используйте разделы [Сообщения](./messages/index.md), [Чат-боты](./chat-bots/index.md) и [События](./events/index.md).

{% note tip "Пользовательская документация" %}

- [Как работать с чатами в Открытых линиях](https://helpdesk.bitrix24.ru/open/25743776/)
- [Быстрые ответы в открытых линиях: как создать и настроить](https://helpdesk.bitrix24.ru/open/25839638/)
- [Открытые линии: как получить согласие на обработку персональных данных](https://helpdesk.bitrix24.ru/open/26873178/)

{% endnote %}

## Лимиты и формат ответа

**Лимиты.** Для методов действуют общие ограничения REST и ограничения открытых линий, например, лимит на незакрытые диалоги у операторов. Подробности читайте в статье [Лимит на незакрытые диалоги у операторов открытых линий](https://helpdesk.bitrix24.ru/open/26928654/).

**Формат ответа.** Успешный ответ обычно содержит `result` и `time`, ошибки возвращаются в формате `error` и `error_description`. Примеры структуры ответа и коды ошибок есть на странице конкретного метода.

## Обзор методов и событий {#all-methods}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода и прав доступа к открытым линиям

### Настройка открытых линий и интеграции

#|
|| **Метод** | **Описание** ||
|| [imopenlines.config.add](./imopenlines-config-add.md) | Добавляет новую открытую линию ||
|| [imopenlines.config.update](./imopenlines-config-update.md) | Изменяет настройки открытой линии ||
|| [imopenlines.config.get](./imopenlines-config-get.md) | Получает открытую линию по идентификатору ||
|| [imopenlines.config.list.get](./imopenlines-config-list-get.md) | Получает список открытых линий ||
|| [imopenlines.config.delete](./imopenlines-config-delete.md) | Удаляет открытую линию ||
|| [imopenlines.config.path.get](./imopenlines-config-path-get.md) | Получает ссылку на публичную страницу открытых линий портала ||
|| [imopenlines.network.join](./imopenlines-network-join.md) | Подключает внешнюю открытую линию к порталу ||
|| [imopenlines.network.message.add](./imopenlines-network-message-add.md) | Отправляет сообщение пользователю от имени открытой линии ||
|| [imopenlines.revision.get](./imopenlines-revision-get.md) | Получает информацию о ревизиях API ||
|#

### Чат-боты в открытых линиях

#|
|| **Метод** | **Описание** ||
|| [imopenlines.bot.session.message.send](./chat-bots/imopenlines-bot-session-message-send.md) | Отправляет автоматическое сообщение в диалог ||
|| [imopenlines.bot.session.operator](./chat-bots/imopenlines-bot-session-operator.md) | Переключает диалог на свободного оператора ||
|| [imopenlines.bot.session.transfer](./chat-bots/imopenlines-bot-session-transfer.md) | Переводит диалог на оператора или очередь ||
|| [imopenlines.bot.session.finish](./chat-bots/imopenlines-bot-session-finish.md) | Завершает диалог ||
|#

### Чаты CRM в открытых линиях

#|
|| **Метод** | **Описание** ||
|| [imopenlines.crm.chat.get](./chats/imopenlines-crm-chat-get.md) | Получает чат по объекту CRM ||
|| [imopenlines.crm.chat.getLastId](./chats/imopenlines-crm-chat-get-last-id.md) | Получает идентификатор последнего чата ||
|| [imopenlines.crm.chat.user.add](./chats/imopenlines-crm-chat-user-add.md) | Добавляет пользователя в существующий чат ||
|| [imopenlines.crm.chat.user.delete](./chats/imopenlines-crm-chat-user-delete.md) | Удаляет пользователя из чата ||
|#

### Сообщения в открытых линиях

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [imopenlines.crm.message.add](./messages/imopenlines-crm-message-add.md) | Отправляет сообщение в открытую линию ||
    || [imopenlines.message.quick.save](./messages/imopenlines-message-quick-save.md) | Сохраняет сообщение как быстрый ответ ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [OnOpenLineMessageAdd](./events/on-open-line-message-add.md) | При добавлении сообщения в чат ||
    || [OnOpenLineMessageUpdate](./events/on-open-line-message-update.md) | При изменении сообщения в чате ||
    || [OnOpenLineMessageDelete](./events/on-open-line-message-delete.md) | При удалении сообщения в чате ||
    |#

{% endlist %}

### Операторы открытых линий

#|
|| **Метод** | **Описание** ||
|| [imopenlines.operator.answer](./operators/imopenlines-operator-answer.md) | Передает диалог текущему оператору ||
|| [imopenlines.operator.finish](./operators/imopenlines-operator-finish.md) | Завершает диалог от имени текущего оператора ||
|| [imopenlines.operator.another.finish](./operators/imopenlines-operator-another-finish.md) | Завершает диалог другого оператора ||
|| [imopenlines.operator.skip](./operators/imopenlines-operator-skip.md) | Передает диалог следующему оператору в очереди ||
|| [imopenlines.operator.spam](./operators/imopenlines-operator-spam.md) | Отмечает диалог как спам ||
|| [imopenlines.operator.transfer](./operators/imopenlines-operator-transfer.md) | Передает диалог другому оператору или в другую линию ||
|#

### Диалоги открытых линий

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [imopenlines.session.open](./sessions/imopenlines-session-open.md) | Получает идентификатор чата по коду пользователя ||
    || [imopenlines.dialog.get](./sessions/imopenlines-dialog-get.md) | Получает данные диалога оператора ||
    || [imopenlines.session.start](./sessions/imopenlines-session-start.md) | Запускает новую сессию в чате ||
    || [imopenlines.message.session.start](./sessions/imopenlines-message-session-start.md) | Запускает новую сессию на основании сообщения ||
    || [imopenlines.session.history.get](./sessions/imopenlines-session-history-get.md) | Получает историю сообщений и данные сессии ||
    || [imopenlines.session.join](./sessions/imopenlines-session-join.md) | Присоединяет оператора к диалогу ||
    || [imopenlines.session.intercept](./sessions/imopenlines-session-intercept.md) | Переводит диалог на текущего оператора ||
    || [imopenlines.session.mode.pin](./sessions/imopenlines-session-mode-pin.md) | Закрепляет или открепляет выбранный диалог ||
    || [imopenlines.session.mode.pinAll](./sessions/imopenlines-session-mode-pin-all.md) | Закрепляет все доступные диалоги за оператором ||
    || [imopenlines.session.mode.unpinAll](./sessions/imopenlines-session-mode-unpin-all.md) | Открепляет все закрепленные диалоги оператора ||
    || [imopenlines.session.mode.silent](./sessions/imopenlines-session-mode-silent.md) | Включает или выключает скрытый режим диалога ||
    || [imopenlines.session.head.vote](./sessions/imopenlines-session-head-vote.md) | Сохраняет оценку руководителя по завершенной сессии ||
    || [imopenlines.crm.lead.create](./sessions/imopenlines-crm-lead-create.md) | Создает лид CRM по диалогу ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [OnSessionStart](./events/on-session-start.md) | При создании чата ||
    || [OnSessionFinish](./events/on-session-finish.md) | При закрытии чата ||
    |#

{% endlist %}
