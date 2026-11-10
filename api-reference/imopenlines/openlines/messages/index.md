# Сообщения открытых линий: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Битрикс24 может привязать чат открытой линии к лиду, сделке, контакту или компании. В такой чат приложение пишет клиенту от имени сотрудника или чат-бота — например, от имени менеджера, который ведет сделку. Удачную формулировку оператора можно сохранить как быстрый ответ и использовать повторно.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Быстрые ответы в открытых линиях: как создать и настроить](https://helpdesk.bitrix24.ru/open/25839638/)

## Связь сообщений с другими объектами

**CRM.** Сообщение отправляют в чат, который привязан к [лиду](../../../crm/leads/index.md), [сделке](../../../crm/deals/index.md), [контакту](../../../crm/contacts/index.md) или [компании](../../../crm/companies/index.md). Тип объекта и его идентификатор передают в параметрах `CRM_ENTITY_TYPE` и `CRM_ENTITY` метода [imopenlines.crm.message.add](./imopenlines-crm-message-add.md). Как чат связан с объектом CRM, описано в обзоре [чатов открытых линий](../chats/index.md).

**Пользователь.** Идентификатор сотрудника, от имени которого уходит сообщение, передают в `USER_ID`. Найти сотрудника можно методами [user.get](../../../user/user-get.md) и [user.search](../../../user/user-search.md).

**Чат-бот.** Сообщение можно отправить и от имени чат-бота: тогда в `USER_ID` передают идентификатор бота. Для других действий бота в диалоге есть методы группы [imopenlines.bot.*](../chat-bots/index.md).

**История переписки.** Ее возвращает метод [imopenlines.session.history.get](../sessions/imopenlines-session-history-get.md) — передайте в него `CHAT_ID`.

**Открытые линии.** Чтобы добавить, изменить и удалить линии, используйте методы [imopenlines.config.*](../index.md).

**Универсальные списки.** Идентификатор списка с быстрыми ответами `QUICK_ANSWERS_IBLOCK_ID` можно получить с помощью метода [imopenlines.config.get](../imopenlines-config-get.md). Указать список при создании линии позволяет метод [imopenlines.config.add](../imopenlines-config-add.md), при редактировании — метод [imopenlines.config.update](../imopenlines-config-update.md).

{% note tip "Пользовательская документация" %}

- [Как создать и настроить открытую линию](https://helpdesk.bitrix24.ru/open/25004908/)
- [Контакт-центр](https://helpdesk.bitrix24.ru/open/7954623/)

{% endnote %}

## Как отправить сообщение из CRM

1. Найдите чат объекта CRM методом [imopenlines.crm.chat.get](../chats/imopenlines-crm-chat-get.md) без `ACTIVE_ONLY`. Метод вернет чаты, в которых диалог еще идет, — только в них можно отправить сообщение
2. Получите идентификатор автора: сотрудника — методами [user.get](../../../user/user-get.md) и [user.search](../../../user/user-search.md), чат-бота — методом [imbot.v2.Bot.list](../../../chat-bots/chat-bots-v2/imbot.v2/bots/bot-list.md). Автор должен быть участником чата. Если его нет в чате, добавьте методом [imopenlines.crm.chat.user.add](../chats/imopenlines-crm-chat-user-add.md)
3. Отправьте сообщение методом [imopenlines.crm.message.add](./imopenlines-crm-message-add.md): передайте объект CRM, чат, автора и текст. Метод вернет идентификатор нового сообщения

## Как сохранить быстрый ответ

1. Получите историю чата методом [imopenlines.session.history.get](../sessions/imopenlines-session-history-get.md) и выберите сообщение, которое нужно сохранить
2. Передайте идентификаторы `CHAT_ID` и `MESSAGE_ID` в метод [imopenlines.message.quick.save](./imopenlines-message-quick-save.md). Сообщение сохранится в списке быстрых ответов

## Формат ответа и ошибки

При успешном вызове в `result` приходит:

- у [imopenlines.crm.message.add](./imopenlines-crm-message-add.md) — идентификатор нового сообщения
- у [imopenlines.message.quick.save](./imopenlines-message-quick-save.md) — `true`

Рядом с `result` приходит `time` — время выполнения запроса:

```json
{
    "result": 41625,
    "time": {
        "start": 1790201451,
        "finish": 1790201452.158646,
        "duration": 1.1586461067199707,
        "processing": 0,
        "date_start": "2026-09-24T01:10:51+03:00",
        "date_finish": "2026-09-24T01:10:52+03:00",
        "operating_reset_at": 1790202052,
        "operating": 0.13654208183288574
    }
}
```

При ошибке метод возвращает код в `error` и описание в `error_description`:

```json
{
    "error": "CHAT_NOT_IN_CRM",
    "error_description": "Chat does not belong to the CRM entity being checked"
}
```

Чаще всего встречаются такие ошибки:

#|
|| **Код** | **Когда возникает** ||
|| `CHAT_NOT_IN_CRM` | [imopenlines.crm.message.add](./imopenlines-crm-message-add.md): диалог в чате завершен или чат не относится к указанному объекту CRM ||
|| `CANCELED` | [imopenlines.crm.message.add](./imopenlines-crm-message-add.md): автора из `USER_ID` нет в чате ||
|| `ERROR_ARGUMENT` | Не передан обязательный параметр, например `MESSAGE` или `USER_ID` ||
|| `CHAT_TYPE` | [imopenlines.message.quick.save](./imopenlines-message-quick-save.md): сообщение не из чата открытой линии ||
|| `CANT_SAVE_QUICK_ANSWER` | [imopenlines.message.quick.save](./imopenlines-message-quick-save.md): быстрый ответ не удалось сохранить, например не передан `MESSAGE_ID` ||
|#

Полный список ошибок с причинами — на страницах методов [imopenlines.crm.message.add](./imopenlines-crm-message-add.md) и [imopenlines.message.quick.save](./imopenlines-message-quick-save.md), раздел «Обработка ошибок».

## Обзор методов {#all-methods}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода — для [imopenlines.crm.message.add](./imopenlines-crm-message-add.md) и вызывающему, и автору сообщения нужно право чтения объекта CRM, к которому привязан чат; [imopenlines.message.quick.save](./imopenlines-message-quick-save.md) вызывает администратор или оператор открытой линии

#|
|| **Метод** | **Описание** ||
|| [imopenlines.crm.message.add](./imopenlines-crm-message-add.md) | Отправляет сообщение в чат, который привязан к объекту CRM ||
|| [imopenlines.message.quick.save](./imopenlines-message-quick-save.md) | Сохраняет сообщение в качестве быстрого ответа ||
|#
