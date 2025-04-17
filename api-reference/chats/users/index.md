# О работе с пользователями

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нет контента (в курсе лишь список методов)

{% endnote %}

{% endif %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [im.user.get](./im-user-get.md) | Получает данные о пользователе ||
|| [im.user.list.get](./im-user-list-get.md) | Получает данные о пользователях ||
|| [im.user.status.get](./im-user-status-get.md) | Получает информацию об установленном статусе пользователя ||
|| [im.user.status.idle.end](./im-user-status-idle-end.md) | Отключает автоматический статус «Отошел» ||
|| [im.user.status.idle.start](./im-user-status-idle-start.md) | Устанавливает автоматический статус «Отошел» ||
|| [im.user.status.set](./im-user-status-set.md) | Устанавливает статус пользователя ||
|#
