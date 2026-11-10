# Чат-боты в открытых линиях: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Чат-боты в открытых линиях помогают автоматизировать обработку диалогов. Бот может отправить сообщение клиенту, переключить диалог на свободного оператора, передать обращение конкретному сотруднику или завершить сессию.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Чат-боты для Открытых линий](https://helpdesk.bitrix24.ru/open/17361656/)

## Связь чат-ботов с другими объектами

**Пользователь.** Идентификатор сотрудника `USER_ID` нужен, чтобы передать диалог конкретному оператору. Получить его можно методами [user.get](../../../user/user-get.md) и [user.search](../../../user/user-search.md).

**Чат.** Бот работает внутри чата открытой линии. Самого бота регистрируют и настраивают методами бот-платформы [Чат-боты 2.0](../../../chat-bots/chat-bots-v2/index.md). Те же методы подходят для обычного чат-бота вне открытых линий. Для нового бота используйте Чат-боты 2.0: устаревшие методы `imbot.*` сохранены только для существующих интеграций, порядок перехода описан в статье [Миграция с imbot на imbot.v2](../../../chat-bots/chat-bots-v2/migration.md).

**Открытые линии.** Чат-боты используют текущую сессию открытой линии. Перевести диалог конкретному оператору или в очередь можно методом [imopenlines.bot.session.transfer](./imopenlines-bot-session-transfer.md), завершить сессию — методом [imopenlines.bot.session.finish](./imopenlines-bot-session-finish.md).

{% note tip "Пользовательская документация" %}

- [Как создать и настроить открытую линию](https://helpdesk.bitrix24.ru/open/25004908/)

{% endnote %}

## Как использовать чат-боты в открытых линиях

1. Зарегистрируйте чат-бота с поддержкой открытых линий методом [imbot.v2.Bot.register](../../../chat-bots/chat-bots-v2/imbot.v2/bots/bot-register.md) — в объекте `fields` передайте `isSupportOpenline: true` или тип бота `openline`
2. Подключите чат-бота к открытой линии в настройках линии
3. Примите событие [ONIMBOTV2MESSAGEADD](../../../chat-bots/chat-bots-v2/imbot.v2/events/events.md#onimbotv2messageadd) — из него бот получает идентификатор чата открытой линии для методов сессии
4. Отправляйте сообщения и управляйте диалогом методами `imopenlines.bot.session.*`

## Обзор методов {#all-methods}

> Scope: [`imopenlines`](../../../scopes/permissions.md), [`imbot`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: [imopenlines.bot.session.message.send](./imopenlines-bot-session-message-send.md) и [imopenlines.bot.session.operator](./imopenlines-bot-session-operator.md) — любой пользователь; [imopenlines.bot.session.transfer](./imopenlines-bot-session-transfer.md) и [imopenlines.bot.session.finish](./imopenlines-bot-session-finish.md) — пользователь приложения с зарегистрированным чат-ботом

#|
|| **Метод** | **Описание** ||
|| [imopenlines.bot.session.message.send](./imopenlines-bot-session-message-send.md) | Отправляет автоматическое сообщение в диалог ||
|| [imopenlines.bot.session.operator](./imopenlines-bot-session-operator.md) | Переключает диалог на свободного оператора ||
|| [imopenlines.bot.session.transfer](./imopenlines-bot-session-transfer.md) | Переводит диалог на оператора по идентификатору или очередь ||
|| [imopenlines.bot.session.finish](./imopenlines-bot-session-finish.md) | Завершает диалог ||
|#

## Продолжите изучение

- [Как создать чат-бота для Открытых линий](../../../../tutorials/chat-bots/open-lines-bot.md)
- [Чат-боты 2.0](../../../chat-bots/chat-bots-v2/index.md)
