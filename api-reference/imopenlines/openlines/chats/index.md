# Чаты открытых линий и CRM: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Чаты открытых линий хранят переписку с клиентами из онлайн-чата, мессенджеров и социальных сетей. Методы `imopenlines.crm.chat.*` помогают найти чат по объекту CRM, получить последний активный чат и управлять участниками.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как работать с чатами в открытых линиях](https://helpdesk.bitrix24.ru/open/28489438/)

## Связь чатов с другими объектами

**CRM.** Чат может быть привязан к одному из четырех объектов CRM: [лиду](../../../crm/leads/index.md), [сделке](../../../crm/deals/index.md), [контакту](../../../crm/contacts/index.md) или [компании](../../../crm/companies/index.md). Тип объекта и его идентификатор передаются в метод [imopenlines.crm.chat.get](./imopenlines-crm-chat-get.md).

**Пользователь.** В чат можно добавить сотрудника по `USER_ID`. Получить идентификатор пользователя можно методами [user.get](../../../user/user-get.md) и [user.search](../../../user/user-search.md).

**Чат-бот.** В чат можно добавить бота. Действия чат-ботов в открытых линиях выполняет группа методов [imopenlines.bot.*](../chat-bots/index.md).

{% note info "" %}

Для добавления бота в чат открытой линии он должен иметь скоуп [crm](../../../scopes/permissions.md).

{% endnote %}

**Диалоги.** По идентификатору чата `CHAT_ID` можно получить историю переписки методом [imopenlines.session.history.get](../sessions/imopenlines-session-history-get.md).

**Открытые линии.** Добавлять, изменять и удалять открытые линии помогают методы [imopenlines.*](../index.md).

**Коннектор.** Чаты создаются через коннектор. Каналом связи может быть онлайн-чат, мессенджер или социальная сеть. Чтобы подключить коннектор или изменить настройки, используйте группу методов [imconnector.*](../../imconnector/index.md).

## Как работать с чатами

1. Получите список чатов объекта CRM методом [imopenlines.crm.chat.get](./imopenlines-crm-chat-get.md)
2. Найдите последний активный чат методом [imopenlines.crm.chat.getLastId](./imopenlines-crm-chat-get-last-id.md)
3. Добавьте или удалите участников методами [imopenlines.crm.chat.user.add](./imopenlines-crm-chat-user-add.md) и [imopenlines.crm.chat.user.delete](./imopenlines-crm-chat-user-delete.md)
4. Отправьте сообщение методом [imopenlines.crm.message.add](../messages/imopenlines-crm-message-add.md)
5. Передайте `CHAT_ID` в [imopenlines.crm.lead.create](../sessions/imopenlines-crm-lead-create.md), чтобы создать лид на основании диалога

{% note tip "Пользовательская документация" %}

- [Как создать и настроить открытую линию](https://helpdesk.bitrix24.ru/open/25004908/)

- [Контакт-центр в Битрикс24](https://helpdesk.bitrix24.ru/open/27978904/)

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [imopenlines.crm.chat.get](./imopenlines-crm-chat-get.md) | Получает чаты для объекта CRM ||
|| [imopenlines.crm.chat.getLastId](./imopenlines-crm-chat-get-last-id.md) | Получает идентификатор последнего чата объекта CRM ||
|| [imopenlines.crm.chat.user.add](./imopenlines-crm-chat-user-add.md) | Добавляет пользователя к существующему чату объекта CRM ||
|| [imopenlines.crm.chat.user.delete](./imopenlines-crm-chat-user-delete.md) | Удаляет пользователя из чата объекта CRM ||
|#
