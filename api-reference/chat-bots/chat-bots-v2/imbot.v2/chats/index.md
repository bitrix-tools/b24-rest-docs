# Чаты: обзор методов

Раздел описывает методы для создания групповых чатов от имени бота и управления участниками, владельцем и менеджерами.

> Быстрый переход: [все методы](#all-methods)

## Что можно делать с чатами

- создавать новый групповой чат
- получать данные чата
- изменять свойства чата
- добавлять и удалять участников
- передавать права владельца
- управлять списком менеджеров

## Обзор методов {#all-methods}

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять методы: владелец зарегистрированного бота

#|
|| **Метод** | **Описание** ||
|| [imbot.v2.Chat.add](./chat-add.md) | Создает групповой чат ||
|| [imbot.v2.Chat.get](./chat-get.md) | Возвращает информацию о чате ||
|| [imbot.v2.Chat.update](./chat-update.md) | Обновляет свойства чата ||
|| [imbot.v2.Chat.User.add](./chat-user-add.md) | Добавляет участников в чат ||
|| [imbot.v2.Chat.User.delete](./chat-user-delete.md) | Удаляет участника из чата ||
|| [imbot.v2.Chat.leave](./chat-leave.md) | Выходит из чата ||
|| [imbot.v2.Chat.User.list](./chat-user-list.md) | Возвращает список участников чата ||
|| [imbot.v2.Chat.Manager.add](./chat-manager-add.md) | Добавляет менеджеров чата ||
|| [imbot.v2.Chat.Manager.delete](./chat-manager-delete.md) | Удаляет менеджеров чата ||
|| [imbot.v2.Chat.setOwner](./chat-set-owner.md) | Назначает нового владельца чата ||
|#

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [{#T}](../../index.md)
- [Сообщения imbot.v2](../messages/index.md)
