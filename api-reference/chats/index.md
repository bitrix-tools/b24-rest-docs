# Чаты в Битрикс24: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Чат в Битрикс24 помогает:

- общаться один на один
- обсуждать задачи в группе
- работать с уведомлениями, файлами и сообщениями в едином интерфейсе мессенджера

Управляют чатами методы `im.*`. Отдельные сценарии — участники, сообщения, уведомления, поиск, файлы и специальные операции — вынесены в подразделы.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Чаты в Битрикс24: интерфейс и возможности](https://helpdesk.bitrix24.ru/open/21912520/)

## Как выбрать подраздел

#|
|| **Если вам нужно** | **Открывайте подраздел** ||
|| Изменить заголовок, цвет, аватар или владельца чата | [Обновление чата](./chat-update/index.md) ||
|| Добавить, получить или исключить участников | [Участники чата](./chat-users/index.md) ||
|| Отправлять, изменять и читать сообщения | [Сообщения](./messages/index.md) ||
|| Форматировать сообщение, собрать вложение, клавиатуру или контекстное меню | [Форматирование](./messages/formatting.md), [Вложения](./messages/attachments.md), [Клавиатуры](./messages/keyboards.md), [Контекстное меню](./messages/menu.md) ||
|| Отправлять уведомления и управлять их прочтением | [Уведомления](./notifications/index.md) ||
|| Загружать и скачивать файлы чата | [Файлы](./files/index.md) ||
|| Искать чаты, сотрудников и подразделения | [Поиск](./search/index.md) ||
|| Получать данные пользователей и управлять статусом | [Пользователи](./users/index.md) ||
|| Получать состав подразделений компании | [Подразделения](./departments/index.md) ||
|| Закреплять, скрывать и заглушать чаты | [Специальные операции](./special-operations/index.md) ||
|| Разобраться в механизмах приложений для чата предыдущего поколения | [Устаревшее](./outdated/index.md) ||
|#

## Идентификаторы чата

Групповой чат и личный диалог различаются по идентификатору `DIALOG_ID`:

#|
|| **Формат** | **Что означает** | **Пример** ||
|| `XXX` | Личный диалог, где `XXX` — идентификатор пользователя | `47` ||
|| `chatXXX` | Групповой чат, где `XXX` — идентификатор чата | `chat2935` ||
|| `sgXXX` | Чат рабочей группы или проекта, где `XXX` — идентификатор группы | `sg17` ||
|#

Часть методов принимает не `DIALOG_ID`, а числовой `CHAT_ID` — то же значение без префикса `chat`.

Чаты, связанные с CRM, задачами, календарем и открытыми линиями, находят по паре `ENTITY_TYPE` и `ENTITY_ID` методом [im.chat.get](./im-chat-get.md).

## Авторизация и лимиты

- методы `im.*` и `im.v2.*` работают в scope `im`. Исключение — методы `imbot.app.*` из подраздела [Устаревшее](./outdated/index.md), им нужен scope `imbot`
- методы отправки уведомлений [im.notify](./notifications/im-notify.md), [im.notify.personal.add](./notifications/im-notify-personal-add.md) и [im.notify.system.add](./notifications/im-notify-system-add.md) нельзя вызвать с сессионной авторизацией — вызывайте их через вебхук или с токеном приложения
- при вызове через вебхук теги `TAG` и `SUB_TAG` передаются вместе с `CLIENT_ID`
- размер сериализованного вложения `ATTACH` ограничен 60 000 символов
- в методах поиска поисковая фраза — не короче двух символов, `LIMIT` — максимум 50
- аватар чата передается строкой Base64, максимальный размер изображения — 5000×5000 пикселей
- содержимое файла для загрузки в чат передается строкой Base64, максимальный размер — 100 МБ

## Как начать работу

1. Создайте чат методом [im.chat.add](./im-chat-add.md) или получите существующий идентификатор через [im.chat.get](./im-chat-get.md)
2. Получите базовые данные диалога методом [im.dialog.get](./im-dialog-get.md) и при необходимости список последних чатов через [im.recent.list](./im-recent-list.md)
3. Добавьте участников в чат методом [im.chat.user.add](./chat-users/im-chat-user-add.md)
4. Настройте чат при необходимости: измените заголовок, цвет, аватар или владельца методами подраздела [Обновление чата](./chat-update/index.md)
5. Отправьте сообщение через [im.message.add](./messages/im-message-add.md) или уведомление через [im.notify](./notifications/im-notify.md)

## Связь с другими объектами

**Пользователь.** Большинство методов работают от имени текущего пользователя или используют идентификаторы `USER_ID`, `USERS`. Получить идентификатор пользователя можно методом [user.get](../user/user-get.md). Работать с пользователями можно методами подраздела [Пользователи](./users/index.md).

**Подразделения компании.** Методы поиска и работы с подразделениями используют идентификатор подразделения `ID`. Получить идентификатор подразделения можно методом [получения списка подразделений](../departments/department-get.md) или методом [поиска подразделений по названию](./search/im-search-department-list.md).

**Файлы.** Файл чата хранится на Диске и привязывается к сообщению. Как загрузить и скачать файл, описано в подразделе [Файлы](./files/index.md).

**CRM, задачи и календарь.** Чат можно связать с внешним объектом. Связь задается парой `ENTITY_TYPE` и `ENTITY_ID` при создании чата методом [im.chat.add](./im-chat-add.md), а найти связанный чат по этой паре можно методом [im.chat.get](./im-chat-get.md).

**Чат-боты.** Те же операции от имени бота выполняют методы раздела [Чат-боты](../chat-bots/index.md).

## Актуальная версия API

Для новых интеграций используйте методы `im.*` из этого раздела и методы `im.v2` там, где сценарий уже переведен на новое поколение API.

Что чем заменяется:

#|
|| **Устаревший путь** | **Актуальная замена** ||
|| [im.disk.folder.get](./files/im-disk-folder-get.md) + загрузка через методы Диска + [im.disk.file.commit](./files/im-disk-file-commit.md) | [im.v2.File.upload](../chat-bots/chat-bots-v2/im.v2/files/file-upload.md) — один вызов вместо цепочки ||
|| [im.disk.file.save](./files/im-disk-file-save.md), [im.disk.file.delete](./files/im-disk-file-delete.md) | Замены пока нет, используйте эти методы ||
|| [im.search.last.add](./search/im-search-last-add.md), [im.search.last.get](./search/im-search-last-get.md), [im.search.last.delete](./search/im-search-last-delete.md) | Замены нет: методы работают, но результат не отображается в интерфейсе чата М1 ||
|| [im.user.status.idle.start](./users/im-user-status-idle-start.md), [im.user.status.idle.end](./users/im-user-status-idle-end.md) | Замены нет: методы работают, но результат не отображается в интерфейсе чата М1 ||
|| Приложения для чата предыдущего поколения — раздел [Устаревшее](./outdated/index.md) | [Чат-боты](../chat-bots/index.md) и [виджеты мессенджера](../widgets/im/index.md) ||
|#

Пользовательские события мессенджера собраны в разделе [im.v2: события](../chat-bots/chat-bots-v2/im.v2/events/index.md).

Остальные методы `im.*` из этого раздела актуальны, устаревших вариантов у них нет.

## Виджеты

В интерфейс чата можно встроить приложение. Встройка добавляет действие рядом с полем ввода, пункт в сайдбаре чата, действие в контекстном меню сообщения или свой раздел в меню навигации мессенджера.

- [Пункт в панели над полем ввода](../widgets/im/textarea.md) `IM_TEXTAREA`
- [Пункт в сайдбаре чата](../widgets/im/sidebar.md) `IM_SIDEBAR`
- [Пункт в контекстном меню сообщения](../widgets/im/context-menu.md) `IM_CONTEXT_MENU`
- [Пункт в меню навигации мессенджера](../widgets/im/navigation.md) `IM_NAVIGATION`

Для регистрации точки встраивания используйте метод [placement.bind](../widgets/placement-bind.md) и передавайте нужный код в параметре `PLACEMENT`. Все точки раздела с порядком работы и контекстом вызова собраны в обзоре [{#T}](../widgets/im/index.md).

## Обзор методов {#all-methods}

> Scope: [`im`](../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Основные методы чатов

#|
|| **Метод** | **Описание** ||
|| [im.chat.add](./im-chat-add.md) | Создает чат ||
|| [im.chat.get](./im-chat-get.md) | Получает идентификатор чата ||
|| [im.dialog.get](./im-dialog-get.md) | Получает данные о чате ||
|| [im.recent.get](./im-recent-get.md) | Получает сокращенный список последних чатов ||
|| [im.recent.list](./im-recent-list.md) | Получает список чатов ||
|| [im.counters.get](./im-counters-get.md) | Получает счетчики сообщений и уведомлений ||
|| [im.revision.get](./im-revision-get.md) | Получает ревизии API модуля IM ||
|#

### Обновление чата

#|
|| **Метод** | **Описание** ||
|| [im.chat.setOwner](./chat-update/im-chat-set-owner.md) | Меняет владельца чата ||
|| [im.chat.updateTitle](./chat-update/im-chat-update-title.md) | Меняет заголовок чата ||
|| [im.chat.updateAvatar](./chat-update/im-chat-update-avatar.md) | Меняет аватар чата ||
|| [im.chat.updateColor](./chat-update/im-chat-update-color.md) | Меняет цвет чата ||
|#

### Участники чата

#|
|| **Метод** | **Описание** ||
|| [im.chat.user.add](./chat-users/im-chat-user-add.md) | Добавляет участников в чат ||
|| [im.chat.user.list](./chat-users/im-chat-user-list.md) | Получает идентификаторы участников чата ||
|| [im.dialog.users.list](./chat-users/im-dialog-users-list.md) | Получает список участников ||
|| [im.chat.user.delete](./chat-users/im-chat-user-delete.md) | Исключает участников из чата ||
|| [im.chat.leave](./chat-users/im-chat-leave.md) | Позволяет текущему пользователю покинуть чат ||
|#

### Сообщения

#|
|| **Метод** | **Описание** ||
|| [im.message.add](./messages/im-message-add.md) | Добавляет сообщение ||
|| [im.message.update](./messages/im-message-update.md) | Изменяет отправленное сообщение ||
|| [im.message.delete](./messages/im-message-delete.md) | Удаляет сообщение ||
|| [im.message.like](./messages/im-message-like.md) | Изменяет статус «Мне нравится» у сообщения ||
|| [im.message.share](./messages/im-message-share.md) | Создает на основании сообщения чат, задачу, пост или событие календаря ||
|| [im.message.command](./messages/im-message-command.md) | Выполняет команду чат-бота ||
|| [im.dialog.messages.get](./messages/im-dialog-messages-get.md) | Получает список последних сообщений ||
|| [im.dialog.messages.search](./messages/im-dialog-messages-search.md) | Ищет сообщения в чате ||
|| [im.dialog.read](./messages/im-dialog-read.md) | Устанавливает признак «прочитано» у сообщений ||
|| [im.dialog.unread](./messages/im-dialog-unread.md) | Устанавливает признак «не прочитано» у сообщений ||
|| [im.dialog.writing](./messages/im-dialog-writing.md) | Отправляет признак «Пользователь пишет» ||
|#

### Уведомления

#|
|| **Метод** | **Описание** ||
|| [im.notify](./notifications/im-notify.md) | Отправляет уведомление ||
|| [im.notify.personal.add](./notifications/im-notify-personal-add.md) | Отправляет персональное уведомление ||
|| [im.notify.system.add](./notifications/im-notify-system-add.md) | Отправляет системное уведомление ||
|| [im.notify.get](./notifications/im-notify-get.md) | Возвращает уведомления пользователя ||
|| [im.notify.schema.get](./notifications/im-notify-schema-get.md) | Возвращает схему типов уведомлений ||
|| [im.notify.read.list](./notifications/im-notify-read-list.md) | Отмечает прочитанным список уведомлений ||
|| [im.notify.read](./notifications/im-notify-read.md) | Отмечает прочитанным уведомление или возвращает его в непрочитанные ||
|| [im.notify.read.all](./notifications/im-notify-read-all.md) | Отмечает прочитанными все уведомления ||
|| [im.notify.answer](./notifications/im-notify-answer.md) | Отвечает на уведомление с быстрым ответом ||
|| [im.notify.confirm](./notifications/im-notify-confirm.md) | Взаимодействует с кнопками уведомлений ||
|| [im.notify.delete](./notifications/im-notify-delete.md) | Удаляет уведомления ||
|| [im.notify.history.search](./notifications/im-notify-history-search.md) | Выполняет поиск по истории уведомлений ||
|#

### Поиск

#|
|| **Метод** | **Описание** ||
|| [im.search.chat.list](./search/im-search-chat-list.md) | Ищет чаты по названиям ||
|| [im.search.department.list](./search/im-search-department-list.md) | Ищет подразделения ||
|| [im.search.user.list](./search/im-search-user-list.md) | Ищет пользователей ||
|#

#### Методы предыдущей версии чата

#|
|| **Метод** | **Описание** ||
|| [im.search.last.add](./search/im-search-last-add.md) | Добавляет поиск в историю ||
|| [im.search.last.get](./search/im-search-last-get.md) | Получает историю поиска ||
|| [im.search.last.delete](./search/im-search-last-delete.md) | Удаляет поиск из истории ||
|#

### Подразделения

#|
|| **Метод** | **Описание** ||
|| [im.department.get](./departments/im-department-get.md) | Получает информацию о подразделении ||
|| [im.department.managers.get](./departments/im-department-managers-get.md) | Получает список руководителей подразделений ||
|| [im.department.employees.get](./departments/im-department-employees-get.md) | Получает список сотрудников подразделений ||
|| [im.department.colleagues.list](./departments/im-department-colleagues-list.md) | Получает список коллег текущего пользователя ||
|#

### Пользователи

#|
|| **Метод** | **Описание** ||
|| [im.user.get](./users/im-user-get.md) | Получает данные о пользователе ||
|| [im.user.list.get](./users/im-user-list-get.md) | Получает данные о списке пользователей ||
|| [im.user.status.set](./users/im-user-status-set.md) | Устанавливает статус пользователя в чате ||
|| [im.user.status.get](./users/im-user-status-get.md) | Получает установленный статус пользователя ||
|#

#### Методы предыдущей версии чата

#|
|| **Метод** | **Описание** ||
|| [im.user.status.idle.start](./users/im-user-status-idle-start.md) | Устанавливает автоматический статус «Отошел» ||
|| [im.user.status.idle.end](./users/im-user-status-idle-end.md) | Отключает автоматический статус «Отошел» ||
|#

### Специальные операции

#|
|| **Метод** | **Описание** ||
|| [im.recent.pin](./special-operations/im-recent-pin.md) | Закрепляет чат вверху списка ||
|| [im.recent.unread](./special-operations/im-recent-unread.md) | Ставит или снимает у чата метку «не прочитано» ||
|| [im.dialog.read.all](./special-operations/im-dialog-read-all.md) | Устанавливает признак «прочитано» для всех чатов пользователя ||
|| [im.chat.mute](./special-operations/im-chat-mute.md) | Отключает уведомления от чата ||
|| [im.recent.hide](./special-operations/im-recent-hide.md) | Удаляет чат из списка последних ||
|#

### Файлы

#|
|| **Метод** | **Описание** ||
|| [im.v2.File.upload](../chat-bots/chat-bots-v2/im.v2/files/file-upload.md) | Загружает файл в чат ||
|| [im.v2.File.download](../chat-bots/chat-bots-v2/im.v2/files/file-download.md) | Возвращает ссылку для скачивания файла ||
|| [im.disk.file.save](./files/im-disk-file-save.md) | Сохраняет файл на свой Диск ||
|| [im.disk.file.delete](./files/im-disk-file-delete.md) | Удаляет файл из папки чата ||
|#

#### Методы предыдущего поколения API

#|
|| **Метод** | **Описание** ||
|| [im.disk.file.commit](./files/im-disk-file-commit.md) | Добавляет файл в чат. Заменен методом [im.v2.File.upload](../chat-bots/chat-bots-v2/im.v2/files/file-upload.md) ||
|| [im.disk.folder.get](./files/im-disk-folder-get.md) | Получает папку хранения файлов чата. Для загрузки файла папка больше не нужна ||
|#

### Приложения для чата предыдущего поколения

Методы работают в scope `imbot` и оставлены только для поддержки существующих интеграций. Для новой разработки используйте [чат-боты](../chat-bots/index.md) и [виджеты мессенджера](../widgets/im/index.md).

#|
|| **Метод** | **Описание** ||
|| [imbot.app.register](./outdated/create-app/imbot-app-register.md) | Регистрирует приложение для чата ||
|| [imbot.app.update](./outdated/create-app/imbot-app-update.md) | Обновляет данные приложения для чата ||
|| [imbot.app.unregister](./outdated/create-app/imbot-app-unregister.md) | Удаляет приложение для чата ||
|#

### Работа с событиями мессенджера

#|
|| **Метод** | **Описание** ||
|| [im.v2.Event.subscribe](../chat-bots/chat-bots-v2/im.v2/events/event-subscribe.md) | Подписывает текущего пользователя на запись событий ||
|| [im.v2.Event.get](../chat-bots/chat-bots-v2/im.v2/events/event-get.md) | Возвращает накопленные события ||
|| [im.v2.Event.unsubscribe](../chat-bots/chat-bots-v2/im.v2/events/event-unsubscribe.md) | Останавливает запись событий ||
|#
