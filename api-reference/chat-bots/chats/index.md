# О чатах

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нет контента (в курсе только список методов)
- из файла Сергея: индивидуальные, групповые, владелец чата

{% endnote %}

{% endif %}

> Scope: [`imbot`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [imbot.chat.add](./imbot-chat-add.md) | Создает новый чат ||
    || [imbot.chat.get](./imbot-chat-get.md) | Возвращает информацию о чате ||
    || [imbot.chat.leave](./imbot-chat-leave.md) | Выполняет выход чат-бота из указанного чата ||
    || [imbot.chat.setOwner](./imbot-chat-set-owner.md) | Устанавливает нового владельца чата ||
    || [imbot.chat.updateAvatar](./imbot-chat-update-avatar.md) | Обновляет аватар чата ||
    || [imbot.chat.updateColor](./imbot-chat-update-color.md) | Обновляет цвет чата ||
    || [imbot.chat.updateTitle](./imbot-chat-update-title.md) | Обновляет название чата ||
    || [imbot.chat.user.add](./imbot-chat-user-add.md) | Добавляет пользователя в чат ||
    || [imbot.chat.user.list](./imbot-chat-user-list.md) | Возвращает список пользователей в чате ||
    || [imbot.chat.user.delete](./imbot-chat-user-delete.md) | Удаляет пользователя из чата ||
    || [imbot.dialog.get](./imbot-dialog-get.md) | Возвращает информацию о диалоге ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [ONIMBOTDELETE](./events/on-imbot-delete.md) | При удалении чат-бота ||
    || [ONIMBOTJOINCHAT](./events/on-imbot-join-chat.md) | При получении информации чат-ботом о включении его в чат (или личную переписку) ||
    |#

{% endlist %}