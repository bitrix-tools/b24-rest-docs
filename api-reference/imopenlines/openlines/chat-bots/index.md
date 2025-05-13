# Чат-боты в открытых линиях: обзор методов

Чат-боты в открытых линиях помогают автоматизировать общение с клиентами:

- автоматически отвечать на сообщения клиентов,

- перенаправлять диалоги на операторов,

- собирать данные о клиентах, например, имена и email.

> Быстрый переход: [все методы](#all-methods)

## Связь чат-ботов с другими объектами

**Пользователь**. Получить идентификатор пользователя позволяют методы [user.get](../../../user/user-get.md) и [user.search](../../../user/user-search.md).

**Чат**. Отправлять, изменять и удалять сообщения помогают методы [imbot.message.*](../../../chat-bots/messages/index.md).

**Открытые линии**. Чат-боты могут перевести разговор на другую линию с помощью [imopenlines.bot.session.transfer](./imopenlines-bot-session-transfer.md). Работать с открытыми линиями следует с помощью группы методов [imopenlines.*](../index.md).

{% note tip "Пользовательская документация" %}

- [Как создать и настроить открытую линию](https://helpdesk.bitrix24.ru/open/25004908/)

{% endnote %}

## Как использовать чат-боты в открытых линиях

1. Зарегистрируйте чат-бот с помощью метода [im.bot.register](../../../chat-bots/imbot-register.md).

2. Настройте автоматические ответы и сценарии.

3. Подключите чат-бот к открытым линиям.

## Обзор методов {#all-methods}

> Scope: [`imopenlines`](../../../scopes/permissions.md), [`imbot`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [imopenlines.bot.session.finish](./imopenlines-bot-session-finish.md) | Завершает диалог ||
|| [imopenlines.bot.session.message.send](./imopenlines-bot-session-message-send.md) | Отправляет приветственное сообщение ||
|| [imopenlines.bot.session.operator](./imopenlines-bot-session-operator.md) | Переключает диалог на свободного оператора ||
|| [imopenlines.bot.session.transfer](./imopenlines-bot-session-transfer.md) | Переключает диалог на оператора по идентификатору ||
|#

## Продолжите изучение

- [Пример создания чат-бота для Открытых линий](../../../../tutorials/chat-bots/open-lines-bot.md)