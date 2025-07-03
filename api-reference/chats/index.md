# О чатах в Битрикс24

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- из файла Сергея: индивидуальные, групповые, владелец чата. где они появляются, какие сценарии для реста есть

{% endnote %}

{% endif %}

#|
|| **Метод** | **Описание** ||
|| [im.chat.add](./im-chat-add.md) | Создает чат ||
|| [im.chat.get](./im-chat-get.md) | Получает идентификатор чата ||
|| [im.counters.get](./im-counters-get.md) | Получает счетчики ||
|| [im.dialog.get](./im-dialog-get.md) | Получает данные о чате ||
|| [im.recent.get](./im-recent-get.md) | Получает сокращенный список последних чатов ||
|| [im.recent.list](./im-recent-list.md) | Получает список чатов ||
|#

## Изменение чата

#|
|| **Метод** | **Описание** ||
|| [im.chat.setOwner](./chat-update/im-chat-set-owner.md) | Изменяет владельца чата ||
|| [im.chat.updateAvatar](./chat-update/im-chat-update-avatar.md) | Изменяет аватарку чата ||
|| [im.chat.updateColor](./chat-update/im-chat-update-color.md) | Изменяет цвет чата ||
|| [im.chat.updateTitle](./chat-update/im-chat-update-title.md) | Изменяет заголовок чата ||
|#

## Участники чата 

#|
|| **Метод** | **Описание** ||
|| [im.chat.leave](./chat-users/im-chat-leave.md) | Покидает чат ||
|| [im.chat.user.add](./chat-users/im-chat-user-add.md) | Приглашает участников в чат ||
|| [im.chat.user.delete](./chat-users/im-chat-user-delete.md) | Исключает участников из чата ||
|| [im.chat.user.list](./chat-users/im-chat-user-list.md) | Получает идентификаторы участников чата ||
|| [im.dialog.users.list](./chat-users/im-dialog-users-list.md) | Получает список участников ||
|#

## Работа с подразделениями

#|
|| **Метод** | **Описание** ||
|| [im.department.colleagues.list](./departments/im-department-colleagues-list.md) | Получает список пользователей, состоящих в вашем отделе ||
|| [im.department.employees.get](./departments/im-department-employees-get.md) | Получает список сотрудников подразделения ||
|| [im.department.get](./departments/im-department-get.md) | Получает информацию о подразделении ||
|| [im.department.managers.get](./departments/im-department-managers-get.md) | Получает список руководителей подразделений ||
|#

## Работа с файлами в чатах

#|
|| **Метод** | **Описание** ||
|| [im.disk.file.commit](./files/im-disk-file-commit.md) | Добавляет файл в чат ||
|| [im.disk.file.delete](./files/im-disk-file-delete.md) | Удаляет файл из папки чата ||
|| [im.disk.file.save](./files/im-disk-file-save.md) | Сохраняет файл на свой диск ||
|| [im.disk.folder.get](./files/im-disk-folder-get.md) | Получает папку хранения файлов указанного чата ||
|#

## Сообщения

#|
|| **Метод** | **Описание** ||
|| [im.dialog.messages.get](./messages/im-dialog-messages-get.md) | Получает список последних сообщений ||
|| [im.dialog.read](./messages/im-dialog-read.md) | Устанавливает признак «прочитано» у сообщений ||
|| [im.dialog.unread](./messages/im-dialog-unread.md) | Устанавливает признак «не прочитано» у сообщений ||
|| [im.dialog.writing](./messages/im-dialog-writing.md) | Отправляет признак «вам пишут...» ||
|| [im.message.add](./messages/im-message-add.md) | Добавляет сообщение ||
|| [im.message.command](./messages/im-message-command.md) | Использует команду бота ||
|| [im.message.delete](./messages/im-message-delete.md) | Удаляет сообщение чат-бота ||
|| [im.message.like](./messages/im-message-like.md) | Изменяет статус «Мне нравится» у сообщения ||
|| [im.message.share](./messages/im-message-share.md) | Создает объект на основании сообщения ||
|| [im.message.update](./messages/im-message-update.md) | Изменяет отправленное сообщение ||
|#

## Уведомления

#|
|| **Метод** | **Описание** ||
|| [im.notify.answer](./notifications/im-notify-answer.md) | Отвечает на уведомление, поддерживающее быстрый ответ ||
|| [im.notify.confirm](./notifications/im-notify-confirm.md) | Взаимодействует с кнопками нотификаций ||
|| [im.notify.delete](./notifications/im-notify-delete.md) | Удаляет уведомления ||
|| [im.notify.personal.add](./notifications/im-notify-personal-add.md) | Отправляет персональное уведомление ||
|| [im.notify.read.list](./notifications/im-notify-read-list.md) | Читает список уведомлений (кроме CONFIRM) ||
|| [im.notify.read](./notifications/im-notify-read.md) | Устанавливает отмену прочитанных уведомлений ||
|| [im.notify.system.add](./notifications/im-notify-system-add.md) | Отправляет системное уведомление ||
|#

## Поиск

#|
|| **Метод** | **Описание** ||
|| [im.search.chat.list](./search/im-search-chat-list.md) | Находит чаты по названиям ||
|| [im.search.department.list](./search/im-search-department-list.md) | Находит подразделения ||
|| [im.search.last.add](./search/im-search-last-add.md) | Добавляет поиск в историю ||
|| [im.search.last.delete](./search/im-search-last-delete.md) | Удаляет поиск из истории ||
|| [im.search.last.get](./search/im-search-last-get.md) | Получает историю поиска ||
|| [im.search.user.list](./search/im-search-user-list.md) | Находит пользователей ||
|#

## Специальные операции в чатах

#|
|| **Метод** | **Описание** ||
|| [im.chat.mute](./special-operations/im-chat-mute.md) | Отключает уведомления от чата ||
|| [im.dialog.read.all](./special-operations/im-dialog-read-all.md) | Устанавливает признак «прочитано» у всех чатов ||
|| [im.recent.hide](./special-operations/im-recent-hide.md) | Удаляет чат из списка последних ||
|| [im.recent.pin](./special-operations/im-recent-pin.md) | Закрепляет чат в избранном ||
|| [im.recent.unread](./special-operations/im-recent-unread.md) | Устанавливает или снимает признак «прочитано» у чата ||
|#

## Пользователи

#|
|| **Метод** | **Описание** ||
|| [im.user.get](./users/im-user-get.md) | Получает данные о пользователе ||
|| [im.user.list.get](./users/im-user-list-get.md) | Получает данные о пользователях ||
|| [im.user.status.get](./users/im-user-status-get.md) | Получает информацию об установленном статусе пользователя ||
|| [im.user.status.idle.end](./users/im-user-status-idle-end.md) | Отключает автоматический статус «Отошел» ||
|| [im.user.status.idle.start](./users/im-user-status-idle-start.md) | Устанавливает автоматический статус «Отошел» ||
|| [im.user.status.set](./users/im-user-status-set.md) | Устанавливает статус пользователя ||
|#
