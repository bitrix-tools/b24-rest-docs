# Эпики в Скраме: обзор методов

Эпик — это тема, контекст или большая цель, к которой относится задача. Прикрепляйте задачи к эпикам и ваш бэклог станет нагляднее.

> Быстрый переход: [все методы и события](#all-methods) 
> 
> Пользовательская документация: [как работать в скраме](https://helpdesk.bitrix24.ru/open/14659922/) 

## Связь эпиков с другими объектами

**Группа.** Эпики привязываются к группе (скраму) по идентификатору группы `groupId`. Получить идентификатор можно методом [создания новой группы](../../sonet-group-create.md) или методом [получения списка групп](../../socialnetwork-api-workgroup-list.md). Группа является скрамом, если заполнено поле `SCRUM_MASTER_ID`.

**Пользователь.** Эпик имеет привязку к пользователям по числовому идентификатору в параметрах `createdBy` и `modifiedBy`. Получить идентификатор пользователя можно с помощью метода [user.get](../../../user/user-get.md).

{% note tip "Пользовательская документация" %}

- [Битрикс24.Скрам](https://helpdesk.bitrix24.ru/open/13660630/)
- [Как создать группу и проект](https://helpdesk.bitrix24.ru/open/22699004/)

{% endnote %}

## Как прикрепить файлы к эпику

К эпику можно прикреплять файлы Диска. Для этого в параметре `files` передайте массив с идентификаторами файлов. Перед каждым идентификатором укажите префикс `n`, например: `"files": ["n428", "n345"]`. Получить идентификаторы файлов можно двумя способами. 

Использовать один из методов загрузки файла:
  - [disk.storage.uploadfile](../../../disk/storage/disk-storage-upload-file.md)
  - [disk.folder.uploadfile](../../../disk/folder/disk-folder-upload-file.md)

Использовать один из методов получения списка файлов:
  - [disk.storage.getchildren](../../../disk/storage/disk-storage-get-children.md)
  - [disk.folder.getchildren ](../../../disk/folder/disk-folder-get-children.md)

## Обзор методов {#all-methods}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [tasks.api.scrum.epic.add](./tasks-api-scrum-epic-add.md) | Добавляет эпик в Скрам ||
|| [tasks.api.scrum.epic.update](./tasks-api-scrum-epic-update.md) | Обновляет эпик в Скраме ||
|| [tasks.api.scrum.epic.get](./tasks-api-scrum-epic-get.md) | Получает значения полей эпика по его `id` ||
|| [tasks.api.scrum.epic.list](./tasks-api-scrum-epic-list.md) | Получает список эпиков ||
|| [tasks.api.scrum.epic.delete](./tasks-api-scrum-epic-delete.md) | Удаляет эпик ||
|| [tasks.api.scrum.epic.getFields](./tasks-api-scrum-epic-get-fields.md) | Получает доступные поля эпика ||
|#
