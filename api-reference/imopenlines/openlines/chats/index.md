# Чаты открытых линий и CRM: обзор методов

Чаты открытых линий — это пространство внутри Битрикс24 для общения с клиентами через внешние системы: онлайн-чат на сайте, мессенджеры и социальные сети. Они позволяют привязывать диалоги к карточкам CRM, в диалоги добавлять пользователей или чат-ботов.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как работать с чатами в Открытых линиях](https://helpdesk.bitrix24.ru/open/25743776/)

## Связь чатов с другими объектами

**CRM**. Каждый чат привязан к одному из четырех объектов CRM: [лидам](../../../crm/leads/index.md), [сделкам](../../../crm/deals/index.md), [контактам](../../../crm/contacts/index.md) или [компаниям](../../../crm/companies/index.md).

**Пользователь**. В чат можно добавить пользователя. Получить идентификатор пользователя позволяют методы [user.get](../../../user/user-get.md) и [user.search](../../../user/user-search.md).

**Чат-бот**. В чат можно добавить бота. Работать с ботами следует с помощью методов [imopenlines.bot.\*](../../../imopenlines/openlines/chat-bots/index.md).

{% note info"" %}

Для добавления бота в чат открытой линии он должен иметь скоуп [crm](../../../scopes/permissions.md).

{% endnote %}

**Диалоги**. По идентификатору чата `CHAT_ID` можно получить историю переписки с помощью метода [imopenlines.session.history.get](../../../imopenlines/openlines/sessions/imopenlines-session-history-get.md).

**Открытые линии**. Добавлять, изменять и удалять открытые линии помогают методы [imopenlines.\*](../../../imopenlines/openlines/index.md).

**Коннектор**. Чаты создаются через коннектор. Каналом связи может быть онлайн-чат, мессенджер или социальная сеть. Чтобы подключить коннектор или изменить настройки, используйте группу методов [imconnector.\*](../../../imopenlines/imconnector/index.md).

## Как работать с чатами

1. С помощью [imopenlines.crm.chat.get](./imopenlines-crm-chat-get.md) получите список чатов, которые привязаны к объекту CRM.

2. Через [imopenlines.crm.chat.getLastId](./imopenlines-crm-chat-get-last-id.md) найдите последний активный чат.

3. С помощью методов [imopenlines.crm.chat.user.add](./imopenlines-crm-chat-user-add.md) и [imopenlines.crm.chat.user.delete](./imopenlines-crm-chat-user-delete.md) добавьте или удалите участников чата.

4. Для отправки сообщения используйте метод [imopenlines.crm.message.add](../../../imopenlines/openlines/messages/imopenlines-crm-message-add.md).

5. В [imopenlines.crm.lead.create](../../../imopenlines/openlines/sessions/imopenlines-crm-lead-create.md) передайте идентификатор чата `CHAT_ID` и создайте лид на основании диалога.

{% note tip "Пользовательская документация" %}

- [Как создать и настроить открытую линию](https://helpdesk.bitrix24.ru/open/25004908/)

- [Контакт-центр](https://helpdesk.bitrix24.ru/open/7954623/)

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [imopenlines.crm.chat.getLastId](./imopenlines-crm-chat-get-last-id.md) | Получает идентификатор последнего чата ||
|| [imopenlines.crm.chat.get](./imopenlines-crm-chat-get.md) | Получает чат для объекта CRM ||
|| [imopenlines.crm.chat.user.add](./imopenlines-crm-chat-user-add.md) | Добавляет пользователя к существующему чату ||
|| [imopenlines.crm.chat.user.delete](./imopenlines-crm-chat-user-delete.md) | Удаляет пользователя из чата ||
|#
