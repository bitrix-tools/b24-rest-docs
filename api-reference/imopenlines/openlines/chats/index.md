# Чаты открытых линий и CRM: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Чаты открытых линий хранят переписку с клиентами из онлайн-чата, мессенджеров и социальных сетей. Битрикс24 может привязать диалог с клиентом к лиду, сделке, контакту или компании. Методы `imopenlines.crm.chat.*` находят чаты по объекту CRM, добавляют в них сотрудников и чат-ботов или убирают участников. Например, приложение может подключить к переписке с клиентом менеджера, который ведет сделку.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как работать с чатами в открытых линиях](https://helpdesk.bitrix24.ru/open/28489438/)

## Как чат связан с объектом CRM

Когда диалог открытой линии попадает в CRM, Битрикс24 создает дело в [лиде](../../../crm/leads/index.md), [сделке](../../../crm/deals/index.md), [контакте](../../../crm/contacts/index.md) или [компании](../../../crm/companies/index.md). По этому делу методы и находят чат. Если у объекта такого дела нет, методы чат не найдут.

В запросе объект CRM, чат и участника указывают так:

#|
|| **Параметр** | **Что означает** | **Пример значения** ||
|| `CRM_ENTITY_TYPE` | Тип объекта CRM: `lead`, `deal`, `contact` или `company`. Счета и смарт-процессы методы не поддерживают | `contact` ||
|| `CRM_ENTITY` | Идентификатор объекта CRM. Получить его можно методом [crm.item.list](../../../crm/universal/crm-item-list.md) | `2389` ||
|| `CHAT_ID` | Идентификатор чата. Его возвращают методы [imopenlines.crm.chat.get](./imopenlines-crm-chat-get.md) и [imopenlines.crm.chat.getLastId](./imopenlines-crm-chat-get-last-id.md) | `1971` ||
|| `USER_ID` | Идентификатор участника — сотрудника или чат-бота. Найти сотрудника можно методами [user.get](../../../user/user-get.md) и [user.search](../../../user/user-search.md) | `15` ||
|#

Метод [imopenlines.crm.chat.get](./imopenlines-crm-chat-get.md) по умолчанию возвращает только чаты, в которых оператор принял диалог и еще не завершил его. Чтобы получить все чаты объекта, передайте `ACTIVE_ONLY` со значением `N`. Метод [imopenlines.crm.chat.getLastId](./imopenlines-crm-chat-get-last-id.md) возвращает последний чат объекта, даже если диалог в нем завершен.

Менять участников можно только в тех чатах, которые [imopenlines.crm.chat.get](./imopenlines-crm-chat-get.md) возвращает по умолчанию. Для завершенного чата методы [imopenlines.crm.chat.user.add](./imopenlines-crm-chat-user-add.md) и [imopenlines.crm.chat.user.delete](./imopenlines-crm-chat-user-delete.md) вернут ошибку `CHAT_NOT_IN_CRM`.

## Связь чатов с другими объектами

Кроме CRM, чаты связаны с чат-ботами, историей переписки, открытыми линиями и коннекторами.

**Чат-боты.** Бот в чате может ответить клиенту, перевести диалог на оператора или в очередь и завершить его. Для этого есть методы группы [imopenlines.bot.*](../chat-bots/index.md).

**История переписки.** Ее возвращает метод [imopenlines.session.history.get](../sessions/imopenlines-session-history-get.md) — передайте в него `CHAT_ID`.

**Открытые линии.** Создать, настроить или удалить саму линию можно методами [imopenlines.*](../index.md).

**Коннекторы.** Клиент пишет в открытую линию через коннектор, например Telegram или онлайн-чат на сайте. Подключить и настроить коннектор можно методами [imconnector.*](../../imconnector/index.md).

## Как работать с чатами

1. Найдите чат объекта CRM: передайте `CRM_ENTITY_TYPE` и `CRM_ENTITY` в метод [imopenlines.crm.chat.get](./imopenlines-crm-chat-get.md) без `ACTIVE_ONLY`. Метод вернет чаты, в которых можно менять участников. Сохраните `CHAT_ID`
2. Добавьте в чат сотрудника или чат-бота методом [imopenlines.crm.chat.user.add](./imopenlines-crm-chat-user-add.md): передайте те же `CRM_ENTITY_TYPE` и `CRM_ENTITY`, идентификатор участника — в `USER_ID`, а чат — в `CHAT_ID`. Убрать участника можно методом [imopenlines.crm.chat.user.delete](./imopenlines-crm-chat-user-delete.md) с теми же параметрами
3. Напишите клиенту от имени сотрудника или бота методом [imopenlines.crm.message.add](../messages/imopenlines-crm-message-add.md)

Если диалог еще не привязан к CRM, создайте по нему лид методом [imopenlines.crm.lead.create](../sessions/imopenlines-crm-lead-create.md) — ему тоже нужен `CHAT_ID`. Если диалог уже привязан, метод ничего не создаст, но вернет `true`.

{% note tip "Пользовательская документация" %}

- [Как создать и настроить открытую линию](https://helpdesk.bitrix24.ru/open/25004908/)

- [Контакт-центр в Битрикс24](https://helpdesk.bitrix24.ru/open/27978904/)

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода — [imopenlines.crm.chat.get](./imopenlines-crm-chat-get.md), [imopenlines.crm.chat.user.add](./imopenlines-crm-chat-user-add.md) и [imopenlines.crm.chat.user.delete](./imopenlines-crm-chat-user-delete.md) требуют права на чтение объекта CRM

#|
|| **Метод** | **Описание** ||
|| [imopenlines.crm.chat.get](./imopenlines-crm-chat-get.md) | Получает чаты для объекта CRM ||
|| [imopenlines.crm.chat.getLastId](./imopenlines-crm-chat-get-last-id.md) | Получает идентификатор последнего чата объекта CRM ||
|| [imopenlines.crm.chat.user.add](./imopenlines-crm-chat-user-add.md) | Добавляет пользователя к существующему чату объекта CRM ||
|| [imopenlines.crm.chat.user.delete](./imopenlines-crm-chat-user-delete.md) | Удаляет пользователя из чата объекта CRM ||
|#
