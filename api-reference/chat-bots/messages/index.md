# О работе с сообщениями

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нет контента (в курсе только список методов)
- не прописаны ссылки на несозданные ещё страницы

{% endnote %}

{% endif %}

> Scope: [`imbot`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

Данные методы работы с сообщениями обычно применяются, когда пользователь что-то пишет, поэтому нужно обязательно обрабатывать событие [ONIMBOTMESSAGEADD](./events/on-imbot-message-add.md).

{% endnote %}

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [imbot.message.add](./imbot-message-add.md) | Добавляет новое сообщение от чат-бота ||
    || [imbot.message.update](./imbot-message-update.md) | Обновляет существующее сообщение от чат-бота ||
    || [imbot.message.delete](./imbot-message-delete.md) | Удаляет сообщение от чат-бота ||
    || [imbot.message.like](./imbot-message-like.md) | Ставит "лайк" на сообщение от чат-бота ||
    || [imbot.chat.sendTyping](./imbot-chat-send-typing.md) | Отправляет индикатор набора текста в чат ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [ONIMBOTMESSAGEADD](./events/on-imbot-message-add.md) | При отправке сообщения||
    || [ONIMBOTMESSAGEUPDATE](./events/on-imbot-message-update.md) | При обновлении сообщения чат-бота ||
    || [ONIMBOTMESSAGEDELETE](./events/on-imbot-message-delete.md) | При удалении сообщения чат-бота ||
    |#

{% endlist %}