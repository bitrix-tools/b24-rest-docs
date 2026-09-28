# Чаты: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Методы позволяют создавать групповые чаты от имени бота и управлять участниками, владельцем и менеджерами. Они заменяют методы `imbot.chat.*` первой версии API. Соответствие старых и новых методов — в [таблице миграции](../../migration.md).

> Быстрый переход: [все методы](#all-methods)

## Порядок работы с чатом {#how-to-start}

1. Создайте групповой чат методом [imbot.v2.Chat.add](./chat-add.md).
2. Добавьте участников методом [imbot.v2.Chat.User.add](./chat-user-add.md) или сразу передайте их в `fields.userIds` при создании.
3. При необходимости измените свойства чата методом [imbot.v2.Chat.update](./chat-update.md). Назначить менеджеров можно методом [imbot.v2.Chat.Manager.add](./chat-manager-add.md), снять — методом [imbot.v2.Chat.Manager.delete](./chat-manager-delete.md).
4. Отправляйте сообщения в чат методами группы [Сообщения](../messages/index.md).
5. Когда бот больше не нужен в чате, выведите его методом [imbot.v2.Chat.leave](./chat-leave.md).

Полное описание полей объекта Chat — [Объекты и поля](../../entities.md#chat).

## Идентификаторы чата {#identifiers}

Методы раздела используют два разных идентификатора.

#|
|| **Идентификатор** | **Где используется** | **Пример** ||
|| `dialogId` | Входной параметр методов работы с чатом, сообщениями и файлами. Для групповых чатов — строка `chat{chatId}`, для личных — строка с ID пользователя | `"chat142"`, `"5"` ||
|| `chatId` | Числовой ID чата в ответах методов и в данных событий. Из него собирается `dialogId` группового чата | `142` ||
|#

Подробнее о формате — [Формат dialogId](../../index.md#dialog-id).

## Роли в чате {#roles}

#|
|| **Роль** | **Какие методы доступны боту с этой ролью по умолчанию** | **Как назначить** ||
|| Владелец | [imbot.v2.Chat.update](./chat-update.md), [imbot.v2.Chat.setOwner](./chat-set-owner.md), [imbot.v2.Chat.Manager.add](./chat-manager-add.md), [imbot.v2.Chat.Manager.delete](./chat-manager-delete.md) и все методы менеджера | `fields.ownerId` в [imbot.v2.Chat.add](./chat-add.md) или [imbot.v2.Chat.setOwner](./chat-set-owner.md) ||
|| Менеджер | [imbot.v2.Chat.User.delete](./chat-user-delete.md) и все методы участника | [imbot.v2.Chat.Manager.add](./chat-manager-add.md) ||
|| Участник | [imbot.v2.Chat.get](./chat-get.md), [imbot.v2.Chat.User.list](./chat-user-list.md), [imbot.v2.Chat.User.add](./chat-user-add.md), [imbot.v2.Chat.leave](./chat-leave.md) | `fields.userIds` в [imbot.v2.Chat.add](./chat-add.md) или [imbot.v2.Chat.User.add](./chat-user-add.md) ||
|#

Минимальную роль для каждого действия задают в настройках конкретного чата. Исключения: [imbot.v2.Chat.update](./chat-update.md) всегда требует роли владельца, а [imbot.v2.Chat.get](./chat-get.md), [imbot.v2.Chat.User.list](./chat-user-list.md) и [imbot.v2.Chat.leave](./chat-leave.md) доступны любому участнику чата. Текущие значения возвращает поле `permissions` в ответе [imbot.v2.Chat.get](./chat-get.md). Если у бота не хватает роли, метод вернет ошибку `ACCESS_DENIED`.

## Связь с другими объектами {#relations}

Чат связан с ботом, от имени которого работают методы, с сообщениями и файлами, с событиями, с индикатором набора и с пользователями.

**Бот.** Все методы раздела выполняются от имени зарегистрированного бота: в каждом вызове передается `botId`, а при авторизации через вебхук — еще и `botToken`. `botId` возвращает метод регистрации бота, а `botToken` вы задаете сами в `fields.botToken` при регистрации — [Боты](../bots/index.md).

**Сообщения и файлы.** Чат — адресат сообщений бота. Идентификатор чата в формате `dialogId` передается в методы группы [Сообщения](../messages/index.md) и [Файлы](../files/index.md).

**События.** Когда бота добавляют в групповой чат, он получает событие [ONIMBOTV2JOINCHAT](../events/events.md#onimbotv2joinchat). Типовая реакция на него — отправить в чат приветственное сообщение.

**Индикатор набора.** Пока бот готовит ответ, в чате можно показать статус «печатает» методом [imbot.v2.Chat.InputAction.notify](../ui/chat-input-action-notify.md) — в него передается тот же `dialogId` чата.

**Пользователи.** Участники и менеджеры задаются массивами ID пользователей Битрикс24. Описание полей объекта User — [Объекты и поля](../../entities.md#user).

## Обзор методов {#all-methods}

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять методы: владелец зарегистрированного бота

### Чат

#|
|| **Метод** | **Описание** ||
|| [imbot.v2.Chat.add](./chat-add.md) | Создает групповой чат ||
|| [imbot.v2.Chat.update](./chat-update.md) | Обновляет свойства чата ||
|| [imbot.v2.Chat.get](./chat-get.md) | Возвращает информацию о чате ||
|| [imbot.v2.Chat.setOwner](./chat-set-owner.md) | Назначает нового владельца чата ||
|| [imbot.v2.Chat.leave](./chat-leave.md) | Выводит бота из чата ||
|#

### Участники

#|
|| **Метод** | **Описание** ||
|| [imbot.v2.Chat.User.add](./chat-user-add.md) | Добавляет участников в чат ||
|| [imbot.v2.Chat.User.list](./chat-user-list.md) | Возвращает список участников чата ||
|| [imbot.v2.Chat.User.delete](./chat-user-delete.md) | Удаляет участника из чата ||
|#

### Менеджеры

#|
|| **Метод** | **Описание** ||
|| [imbot.v2.Chat.Manager.add](./chat-manager-add.md) | Добавляет менеджеров чата ||
|| [imbot.v2.Chat.Manager.delete](./chat-manager-delete.md) | Удаляет менеджеров чата ||
|#

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [{#T}](../../index.md)
- [{#T}](../../entities.md)
- [{#T}](../../migration.md)
- [Боты imbot.v2](../bots/index.md)
- [Сообщения imbot.v2](../messages/index.md)
- [События imbot.v2](../events/index.md)
