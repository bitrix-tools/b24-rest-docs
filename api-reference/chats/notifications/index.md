# Об уведомлениях

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нет контента (в курсе лишь список методов)
- из файла Сергея: как применять, где полезно

{% endnote %}

{% endif %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [im.notify.answer](./im-notify-answer.md) | Отвечает на уведомление, поддерживающее быстрый ответ ||
|| [im.notify.confirm](./im-notify-confirm.md) | Взаимодействует с кнопками нотификаций ||
|| [im.notify.delete](./im-notify-delete.md) | Удаляет уведомления ||
|| [im.notify.personal.add](./im-notify-personal-add.md) | Отправляет персональное уведомление ||
|| [im.notify.read.list](./im-notify-read-list.md) | Читает список уведомлений (кроме CONFIRM) ||
|| [im.notify.read](./im-notify-read.md) | Устанавливает отмену прочитанных уведомлений ||
|| [im.notify.system.add](./im-notify-system-add.md) | Отправляет системное уведомление ||
|#
