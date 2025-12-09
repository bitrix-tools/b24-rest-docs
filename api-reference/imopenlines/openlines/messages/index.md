# Сообщения открытых линий: обзор методов

Сообщения в чаты открытых линий могут отправлять сотрудники и чат-боты. Отправленные сообщения можно сохранять как шаблоны быстрых ответов и использовать повторно. Каждый чат открытых линий связан с объектом CRM.

> Быстрый переход: [все методы](#all-methods)

## Связь сообщений с другими объектами

**CRM.** Сообщение чата привязано к одному из четырех объектов CRM: [лиду](../../../crm/leads/index.md), [сделке](../../../crm/deals/index.md), [контакту](../../../crm/contacts/index.md) или [компании](../../../crm/companies/index.md).

**Пользователь.** Сотрудник отправляет сообщение в чат открытой линии. Получить идентификатор сотрудника позволяют методы [user.get](../../../user/user-get.md) и [user.search](../../../user/user-search.md).

**Чат-бот.** Сообщение можно отправить от имени чат-бота. Работать с ботами следует с помощью методов [imbot.*](../../../imopenlines/openlines/chat-bots/index.md).

**Диалоги.** По идентификатору чата `CHAT_ID` можно получить историю переписки с помощью метода [imopenlines.session.history.get](../sessions/imopenlines-session-history-get.md).

**Открытые линии.** Чтобы добавить, изменить и удалить линии, используйте методы [imopenlines.*](../index.md).

**Универсальные списки.** Идентификатор списка с быстрыми ответами `QUICK_ANSWERS_IBLOCK_ID` можно получить с помощью метода [imopenlines.config.get](../imopenlines-config-get.md). Указать список при создании линии позволяет метод [imopenlines.config.add](../imopenlines-config-add.md), при редактировании — метод [imopenlines.config.update](../imopenlines-config-update.md).

{% note tip "Пользовательская документация" %}

- [Быстрые ответы в открытых линиях: как создать и настроить](https://helpdesk.bitrix24.ru/open/25839638/)

- [Как создать и настроить открытую линию](https://helpdesk.bitrix24.ru/open/25004908/)

- [Контакт-центр](https://helpdesk.bitrix24.ru/open/7954623/)

{% endnote %}

## Как отправить сообщение из CRM

1. Найдите чат, который привязан к элементу CRM. Используйте метод [imopenlines.crm.chat.get](../chats/imopenlines-crm-chat-get.md) или [imopenlines.dialog.get](../sessions/imopenlines-dialog-get.md).
2. Получите идентификатор сотрудника или чат-бота с помощью методов [user.get](../../../user/user-get.md), [user.search](../../../user/user-search.md) или [imbot.bot.list](../../../chat-bots/imbot-bot-list.md).
3. Передайте данные в метод [imopenlines.crm.message.add](./imopenlines-crm-message-add.md), чтобы отправить сообщение.

## Как сохранить быстрый ответ

1. Получите историю чата методом [imopenlines.session.history.get](../sessions/imopenlines-session-history-get.md) и выберите сообщение, которое нужно сохранить.
2. Передайте идентификаторы `CHAT_ID` и `MESSAGE_ID` в метод [imopenlines.message.quick.save](./imopenlines-message-quick-save.md). Сообщение сохранится в списке быстрых ответов.

## Обзор методов {#all-methods}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [imopenlines.crm.message.add](./imopenlines-crm-message-add.md) | Отправляет сообщение в чат, который связан с элементом CRM ||
|| [imopenlines.message.quick.save](./imopenlines-message-quick-save.md) | Сохраняет сообщение в качестве быстрого ответа ||
|#