# Боты: обзор методов

Раздел содержит методы жизненного цикла чат-бота: регистрация, изменение свойств, получение данных, просмотр списка и удаление.

> Быстрый переход: [все методы](#all-methods)

## Как работать с ботами

1. Зарегистрируйте бота через [imbot.v2.Bot.register](./bot-register.md).
2. При необходимости обновите свойства методом [imbot.v2.Bot.update](./bot-update.md).
3. Получайте данные по одному боту через [imbot.v2.Bot.get](./bot-get.md) или список через [imbot.v2.Bot.list](./bot-list.md).
4. Удалите бота методом [imbot.v2.Bot.unregister](./bot-unregister.md), если он больше не нужен.

## Обзор методов {#all-methods}

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять методы: владелец зарегистрированного бота

#|
|| **Метод** | **Описание** ||
|| [imbot.v2.Bot.register](./bot-register.md) | Регистрирует нового бота ||
|| [imbot.v2.Bot.update](./bot-update.md) | Обновляет свойства бота ||
|| [imbot.v2.Bot.get](./bot-get.md) | Возвращает информацию о боте ||
|| [imbot.v2.Bot.list](./bot-list.md) | Возвращает список ботов приложения ||
|| [imbot.v2.Bot.unregister](./bot-unregister.md) | Удаляет бота ||
|#

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [{#T}](../../index.md)
- [Чаты imbot.v2](../chats/index.md)
