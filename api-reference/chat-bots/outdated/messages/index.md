# О работе с сообщениями

{% note warning "" %}

**DEPRECATED**

Развитие методов `imbot.message.*` остановлено.
Используйте раздел [Сообщения (`imbot.v2.Chat.Message.*`)](../../chat-bots-v2/imbot.v2/messages/index.md).

{% endnote %}

> Scope: [`imbot`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Методы

#|
|| **Метод** | **Описание** ||
|| [imbot.message.add](./imbot-message-add.md) | Добавляет новое сообщение от чат-бота ||
|| [imbot.message.update](./imbot-message-update.md) | Обновляет существующее сообщение от чат-бота ||
|| [imbot.message.delete](./imbot-message-delete.md) | Удаляет сообщение от чат-бота ||
|| [imbot.message.like](./imbot-message-like.md) | Ставит "лайк" на сообщение от чат-бота ||
|#

## События

#|
|| **Событие** | **Вызывается** ||
|| [ONIMBOTMESSAGEADD](./events/on-imbot-message-add.md) | При отправке сообщения ||
|| [ONIMBOTMESSAGEUPDATE](./events/on-imbot-message-update.md) | При обновлении сообщения чат-бота ||
|| [ONIMBOTMESSAGEDELETE](./events/on-imbot-message-delete.md) | При удалении сообщения чат-бота ||
|#
