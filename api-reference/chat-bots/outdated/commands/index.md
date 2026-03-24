# О командах чат-ботов

{% note warning "" %}

**DEPRECATED**

Развитие методов `imbot.command.*` остановлено.
Используйте раздел [Команды (`imbot.v2.Command.*`)](../../chat-bots-v2/imbot.v2/commands/index.md).

{% endnote %}

> Scope: [`imbot`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Методы

#|
|| **Метод** | **Описание** ||
|| [imbot.command.register](./imbot-command-register.md) | Регистрирует новую команду для чат-бота ||
|| [imbot.command.unregister](./imbot-command-unregister.md) | Удаляет зарегистрированную команду чат-бота ||
|| [imbot.command.update](./imbot-command-update.md) | Обновляет информацию о зарегистрированной команде чат-бота ||
|| [imbot.command.answer](./imbot-command-answer.md) | Публикует ответ на команду чат-бота ||
|#

## События

#|
|| **Событие** | **Вызывается** ||
|| [ONIMCOMMANDADD](./events/on-im-command-add.md) | При добавлении новой команды чат-ботом ||
|#
