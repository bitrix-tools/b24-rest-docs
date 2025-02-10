# Открытые линии в Битрикс24

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- из файла Сергея: как они работают, какая связь между ними и коннекторами, какие сценарии в рест реализованы

{% endnote %}

{% endif %}

## Обзор методов

#|
|| **Метод** | **Описание** ||
|| [imopenlines.config.add](./imopenlines-config-add.md) | Добавляет новую открытую линию ||
|| [imopenlines.config.delete](./imopenlines-config-delete.md) | Удаляет открытую линию ||
|| [imopenlines.config.get](./imopenlines-config-get.md) | Получает открытую линию по Id ||
|| [imopenlines.config.list.get](./imopenlines-config-list-get.md) | Получает список открытых линий ||
|| [imopenlines.config.path.get](./imopenlines-config-path-get.md) | Получает ссылку на публичную страницу открытых линий портала ||
|| [imopenlines.config.update](./imopenlines-config-update.md) | Изменяет открытую линию ||
|| [imopenlines.network.join](./imopenlines-network-join.md) | Подключает внешнюю открытую линию к порталу ||
|| [imopenlines.revision.get](./imopenlines-revision-get.md) | Получает информацию о ревизиях API ||
|#

###  Чат-боты в открытых линиях

#|
|| **Метод** | **Описание** ||
|| [imopenlines.bot.session.finish](./chat-bots/imopenlines-bot-session-finish.md) | Завершает диалог ||
|| [imopenlines.bot.session.message.send](./chat-bots/imopenlines-bot-session-message-send.md) | Отправляет приветственное сообщение ||
|| [imopenlines.bot.session.operator](./chat-bots/imopenlines-bot-session-operator.md) | Переключает диалог на свободного оператора ||
|| [imopenlines.bot.session.transfer](./chat-bots/imopenlines-bot-session-transfer.md) | Переключает диалог на оператора по Id ||
|#

### Чаты в открытых линиях

#|
|| **Метод** | **Описание** ||
|| [imopenlines.crm.chat.getLastId](./chats/imopenlines-crm-chat-get-last-id.md) | Получает Id последнего чата ||
|| [imopenlines.crm.chat.get](./chats/imopenlines-crm-chat-get.md) | Получает чат для объекта CRM ||
|| [imopenlines.crm.chat.user.add](./chats/imopenlines-crm-chat-user-add.md) | Добавляет пользователя к существующему чату ||
|| [imopenlines.crm.chat.user.delete](./chats/imopenlines-crm-chat-user-delete.md) | Удаляет пользователя из чата ||
|#

### Сообщения в открытых линиях

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [imopenlines.crm.message.add](./messages/imopenlines-crm-message-add.md) | Отправляет сообщение в открытую линию ||
    || [imopenlines.message.quick.save](./messages/imopenlines-message-quick-save.md) | Сохраняет сообщение в качестве быстрого ответа ||
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
|| [imopenlines.operator.another.finish](./operators/imopenlines-operator-another-finish.md) | Завершает диалог другого оператора ||
|| [imopenlines.operator.answer](./operators/imopenlines-operator-answer.md) | Забирает диалог себе ||
|| [imopenlines.operator.finish](./operators/imopenlines-operator-finish.md) | Завершает свой диалог ||
|| [imopenlines.operator.skip](./operators/imopenlines-operator-skip.md) | Пропускает диалог ||
|| [imopenlines.operator.spam](./operators/imopenlines-operator-spam.md) | Отмечает диалог в качестве «спама» ||
|| [imopenlines.operator.transfer](./operators/imopenlines-operator-transfer.md) | Передает диалог другому оператору или в другую линию ||
|#

### Диалоги открытых линий

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [imopenlines.crm.lead.create](./sessions/imopenlines-crm-lead-create.md) | Создает лид на основании диалога ||
    || [imopenlines.dialog.get](./sessions/imopenlines-dialog-get.md) | Получает информацию о диалоге (чате) оператора открытой линии ||
    || [imopenlines.message.session.start](./sessions/imopenlines-message-session-start.md) | Начинает новый диалог на основании сообщения ||
    || [imopenlines.session.head.vote](./sessions/imopenlines-session-head-vote.md) | Ставит оценку работе сотрудника в диалоге ||
    || [imopenlines.session.history.get](./sessions/imopenlines-session-history-get.md) | Получает сообщения чата и диалога ||
    || [imopenlines.session.intercept](./sessions/imopenlines-session-intercept.md) | Забирает диалог у текущего оператора ||
    || [imopenlines.session.join](./sessions/imopenlines-session-join.md) | Присоединяется к диалогу ||
    || [imopenlines.session.mode.pinAll](./sessions/imopenlines-session-mode-pin-all.md) | Закрепляет все доступные диалоги за оператором ||
    || [imopenlines.session.mode.pin](./sessions/imopenlines-session-mode-pin.md) | Закрепляет или открепляет диалог ||
    || [imopenlines.session.mode.silent](./sessions/imopenlines-session-mode-silent.md) | Переключает диалог в «скрытый» режим ||
    || [imopenlines.session.mode.unpinAll](./sessions/imopenlines-session-mode-unpin-all.md) | Открепляет все диалоги от оператора ||
    || [imopenlines.session.open](./sessions/imopenlines-session-open.md) | Получает чат по символьному коду ||
    || [imopenlines.session.start](./sessions/imopenlines-session-start.md) | Начинает новый диалог ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [OnSessionStart](./events/on-session-start.md) | При создании чата ||
    || [OnSessionFinish](./events/on-session-finish.md) | При закрытии чата ||
    |#

{% endlist %}


