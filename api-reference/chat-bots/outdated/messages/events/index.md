# Обзор событий при работе с сообщениями

{% note warning "" %}

**DEPRECATED**

Развитие событий старого раздела остановлено.
Используйте [События `imbot.v2`](../../../chat-bots-v2/imbot.v2/events/events.md).

{% endnote %}

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

## События

#|
|| **Событие** | **Вызывается** ||
|| [ONIMBOTMESSAGEADD](./on-imbot-message-add.md) | При отправке сообщения в диалоге с чат-ботом вручную или методом [imbot.message.add](../imbot-message-add.md) ||
|| [ONIMBOTMESSAGEUPDATE](./on-imbot-message-update.md) | При редактировании сообщения в диалоге с чат-ботом вручную или методом [imbot.message.update](../imbot-message-update.md) ||
|| [ONIMBOTMESSAGEDELETE](./on-imbot-message-delete.md) | При удалении сообщения в диалоге с чат-ботом вручную или методом [imbot.message.delete](../imbot-message-delete.md) ||
|#
