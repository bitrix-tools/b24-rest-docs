# Чаты в Битрикс24: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Чат в Битрикс24 помогает:
- общаться один на один
- обсуждать задачи в группе
- работать с уведомлениями, файлами и сообщениями в едином интерфейсе мессенджера

Для работы с чатами используйте методы `im.*`. В разделе есть методы управления чатами и подразделы для отдельных сценариев: участники, сообщения, уведомления, поиск, файлы и специальные операции.

Для новой разработки учитывайте, что часть сценариев уже переведена в `im.v2`. Это особенно важно для работы с файлами и событиями мессенджера.

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [Чаты в Битрикс24: интерфейс и возможности](https://helpdesk.bitrix24.ru/open/21912520/)

## Основные части чата

Чат в Битрикс24 можно рассматривать как объект из нескольких блоков:

- тип диалога и идентификаторы
- настройки и оформление чата
- участники и роли
- сообщения и история
- файлы
- уведомления и специальные действия

### Тип диалога и идентификаторы

Групповой чат и личный диалог различаются по идентификатору `DIALOG_ID`:

- `XXX` — личный чат с пользователем, где `XXX` — это идентификатор пользователя
- `chatXXX` — групповой чат
- `sgXXX` — чат группы или проекта

Групповые чаты создаются методом [im.chat.add](./im-chat-add.md). В параметре `TYPE` можно выбрать:

- `CHAT` — закрытый чат
- `OPEN` — открытый чат

Если нужно найти уже существующий чат по связи с внешним объектом, используйте [im.chat.get](./im-chat-get.md). Для чатов, связанных с CRM, задачами, календарем, открытыми линиями и другими объектами, используются параметры `ENTITY_TYPE` и `ENTITY_ID`.

### Настройки и оформление чата

При создании чата можно задать название, описание, цвет, аватар и первое сообщение через [im.chat.add](./im-chat-add.md).

Если при создании чата не передать `TITLE`, система сформирует название автоматически. В рабочих сценариях задавайте понятное название и при необходимости связывайте чат с внешним объектом.

После создания чата оформление и владельца можно менять методами раздела [Обновление чата](./chat-update/index.md).

### Участники и роли

Владелец чата появляется автоматически при создании чата. Пользователь, который вызвал [im.chat.add](./im-chat-add.md), добавляется в чат в роли владельца.

Идентификатор владельца, роль текущего пользователя, список менеджеров и ограничения на действия в чате возвращают методы [im.dialog.get](./im-dialog-get.md), [im.recent.get](./im-recent-get.md) и [im.recent.list](./im-recent-list.md).

Для работы с участниками используйте методы раздела [Участники чата](./chat-users/index.md):

- [im.chat.user.add](./chat-users/im-chat-user-add.md) — добавить участников
- [im.chat.user.delete](./chat-users/im-chat-user-delete.md) — исключить участников
- [im.chat.user.list](./chat-users/im-chat-user-list.md) — получить идентификаторы участников
- [im.dialog.users.list](./chat-users/im-dialog-users-list.md) — получить подробный список участников

Передать права другому участнику можно методом [im.chat.setOwner](./chat-update/im-chat-set-owner.md).

### Сообщения и история

Основной сценарий работы с перепиской начинается с методов раздела [Сообщения](./messages/index.md).

Для отправки сообщений используйте [im.message.add](./messages/im-message-add.md), для чтения истории — [im.dialog.messages.get](./messages/im-dialog-messages-get.md), для поиска по истории — [im.dialog.messages.search](./messages/im-dialog-messages-search.md).

Состояние прочтения и служебные действия с перепиской управляются методами [im.dialog.read](./messages/im-dialog-read.md), [im.dialog.unread](./messages/im-dialog-unread.md) и [im.dialog.writing](./messages/im-dialog-writing.md).

### Файлы

В чат можно отправлять файлы. Чтобы работать с файлами в новых интеграциях используйте методы `im.v2` раздела [Файлы](../chat-bots/chat-bots-v2/im.v2/files/index.md).

Методы группы [im.disk.*](./files/index.md) используйте только для существующих интеграций со старым сценарием. 

### Уведомления и специальные действия

Уведомление в мессенджере — сообщение с информацией от системы или пользователя. С уведомлениями работает группа методов [im.notify.*](./notifications/index.md).

 Методы служебных действий с чатами и списков последних диалогов находятся в разделе [Специальные операции](./special-operations/index.md). Чат можно закрепить, отметить прочитанным и скрыть из списка последних.

## Как начать работу

1. Создайте чат методом [im.chat.add](./im-chat-add.md) или получите существующий идентификатор через [im.chat.get](./im-chat-get.md)
2. Получите базовые данные диалога методом [im.dialog.get](./im-dialog-get.md) и при необходимости список последних чатов через [im.recent.list](./im-recent-list.md)
3. Добавьте участников в чат методом [im.chat.user.add](./chat-users/im-chat-user-add.md)
4. Настройте чат при необходимости: измените название, цвет, аватар или владельца методами раздела [Обновление чата](./chat-update/index.md)
5. Отправьте сообщение через [im.message.add](./messages/im-message-add.md) или уведомление через [im.notify](./notifications/im-notify.md)

## Связь с другими объектами

**Пользователь.** Большинство методов работают от имени текущего пользователя или используют идентификаторы `USER_ID`, `USERS`. Получить идентификатор пользователя можно методом [user.get](../user/user-get.md). Работать с пользователями можно методами раздела [Пользователи](./users/index.md).

**Подразделения компании.** Методы поиска и работы с подразделениями используют идентификатор подразделения `ID`. Получить идентификатор подразделения можно методом [получения списка подразделений](../departments/department-get.md) или методом [поиска подразделений по названию](./search/im-search-department-list.md).

**Файлы.** Старые сценарии загрузки файлов используют методы `im.disk.*`, а новые сценарии вынесены в `im.v2`. Подробности собраны в разделе [Файлы](./files/index.md).

## Актуальная версия API

Для новых интеграций используйте текущие разделы `im.*` и новые методы `im.v2`, если сценарий уже переведен на новое поколение API.

- Для файлов используйте [im.v2.File.upload](../chat-bots/chat-bots-v2/im.v2/files/file-upload.md) и [im.v2.File.download](../chat-bots/chat-bots-v2/im.v2/files/file-download.md)
- Для пользовательских событий мессенджера используйте раздел [im.v2: события](../chat-bots/chat-bots-v2/im.v2/events/index.md)
- Методы из разделов [Файлы](./files/index.md), [Поиск](./search/index.md) и [Пользователи](./users/index.md) содержат пометки о сценариях предыдущей версии чата, которые работают с ограничениями в интерфейсе М1

## Виджеты

В интерфейс чата можно встроить приложение. Благодаря встраиванию можно добавить действие рядом с полем ввода, отдельный пункт в сайдбаре чата или действие в контекстном меню сообщения.

- [Пункт в панели над полем ввода](../widgets/im/textarea.md) `IM_TEXTAREA`
- [Пункт в сайдбаре чата](../widgets/im/sidebar.md) `IM_SIDEBAR`
- [Пункт в контекстном меню сообщения](../widgets/im/context-menu.md) `IM_CONTEXT_MENU`

Для регистрации точки встраивания используйте метод [placement.bind](../widgets/placement-bind.md) и передавайте нужный код в параметре `PLACEMENT`.

## Обзор методов и событий {#all-methods}

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
|| [im.chat.updateAvatar](./chat-update/im-chat-update-avatar.md) | Меняет аватар чата ||
|| [im.chat.updateColor](./chat-update/im-chat-update-color.md) | Меняет цвет чата ||
|| [im.chat.updateTitle](./chat-update/im-chat-update-title.md) | Меняет название чата ||
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
|| [im.message.share](./messages/im-message-share.md) | Создает объект на основании сообщения ||
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
|| [im.notify.read.all](./notifications/im-notify-read-all.md) | Отмечает прочитанным все уведомления ||
|| [im.notify.answer](./notifications/im-notify-answer.md) | Отвечает на уведомление с быстрым ответом ||
|| [im.notify.confirm](./notifications/im-notify-confirm.md) | Взаимодействует с кнопками уведомлений ||
|| [im.notify.delete](./notifications/im-notify-delete.md) | Удаляет уведомления ||
|| [im.notify.history.search](./notifications/im-notify-history-search.md) | Выполняет поиск по истории уведомлений ||
|#

### Поиск

#|
|| **Метод** | **Описание** ||
|| [im.search.chat.list](./search/im-search-chat-list.md) | Ищет чаты по названию ||
|| [im.search.department.list](./search/im-search-department-list.md) | Ищет подразделения ||
|| [im.search.user.list](./search/im-search-user-list.md) | Ищет пользователей ||
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
|| [im.user.status.idle.start](./users/im-user-status-idle-start.md) | Устанавливает автоматический статус «Отошел» ||
|| [im.user.status.idle.end](./users/im-user-status-idle-end.md) | Отключает автоматический статус «Отошел» ||
|#

### Специальные операции

#|
|| **Метод** | **Описание** ||
|| [im.recent.pin](./special-operations/im-recent-pin.md) | Закрепляет чат вверху списка ||
|| [im.recent.unread](./special-operations/im-recent-unread.md) | Устанавливает или снимает признак «прочитано» у чата ||
|| [im.dialog.read.all](./special-operations/im-dialog-read-all.md) | Устанавливает признак «прочитано» для всех чатов пользователя ||
|| [im.chat.mute](./special-operations/im-chat-mute.md) | Отключает уведомления от чата ||
|| [im.recent.hide](./special-operations/im-recent-hide.md) | Удаляет чат из списка последних ||
|#

### Файлы

#|
|| **Метод** | **Описание** ||
|| [im.v2.File.upload](../chat-bots/chat-bots-v2/im.v2/files/file-upload.md) | Загружает файл в чат ||
|| [im.v2.File.download](../chat-bots/chat-bots-v2/im.v2/files/file-download.md) | Возвращает ссылку для скачивания файла ||
|| [im.disk.file.commit](./files/im-disk-file-commit.md) | Добавляет файл в чат ||
|| [im.disk.file.save](./files/im-disk-file-save.md) | Сохраняет файл на свой диск ||
|| [im.disk.file.delete](./files/im-disk-file-delete.md) | Удаляет файл из папки чата ||
|| [im.disk.folder.get](./files/im-disk-folder-get.md) | Получает папку хранения файлов чата ||
|#

### События нового API

#|
|| **Метод** | **Описание** ||
|| [im.v2.Event.subscribe](../chat-bots/chat-bots-v2/im.v2/events/event-subscribe.md) | Подписывает текущего пользователя на запись событий ||
|| [im.v2.Event.get](../chat-bots/chat-bots-v2/im.v2/events/event-get.md) | Возвращает накопленные события ||
|| [im.v2.Event.unsubscribe](../chat-bots/chat-bots-v2/im.v2/events/event-unsubscribe.md) | Останавливает запись событий ||
|#
