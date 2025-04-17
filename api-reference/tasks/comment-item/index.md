# Комментарии в задачах: обзор методов

В комментариях задачи участники задают вопросы, обсуждают задачу и следят за выполнением. Здесь можно оставлять важные заметки и фиксировать результаты.

> Быстрый переход: [все методы и события](#all-methods) 
> 
> Пользовательская документация: [как работать с задачами](https://helpdesk.bitrix24.ru/open/17962240/)

## Связь комментариев с другими объектами

**Задача.** Комментарии привязаны к задаче по идентификатору `TASKID`. Получить его можно методом [создания новой задачи](../tasks-task-add.md) или методом [получения списка задач](../tasks-task-list.md).

**Пользователь.** Комментарий имеет привязку к пользователю по числовому идентификатору в параметре `AUTHOR_ID`. Получить идентификатор пользователя можно с помощью метода [user.get](../../user/user-get.md).

{% note tip "Пользовательская документация" %}

- [Задачи Битрикс24](https://helpdesk.bitrix24.ru/open/17962166/)

{% endnote %}

## Файлы Диска

К комментарию задачи можно прикрепить файлы Диска. В параметре `UF_FORUM_MESSAGE_DOC` передайте массив с идентификаторами файлов Диска. Перед каждым идентификатором укажите префикс `n`, например: `"UF_FORUM_MESSAGE_DOC": ["n428", "n345"]`. Получить идентификаторы файлов можно двумя способами.

Использовать один из методов загрузки файла:
  - [disk.storage.uploadfile](../../disk/storage/disk-storage-upload-file.md)
  - [disk.folder.uploadfile](../../disk/folder/disk-folder-upload-file.md)

Использовать один из методов получения списка файлов:
  - [disk.storage.getchildren](../../disk/storage/disk-storage-get-children.md)
  - [disk.folder.getchildren ](../../disk/folder/disk-folder-get-children.md)

{% note tip "Частые кейсы и сценарии" %}

- [{#T}](../../../tutorials/tasks/how-to-create-comment-with-file.md)

{% endnote %}

## Кто может добавлять или менять комментарий

Чтобы добавить, изменить или удалить комментарий, нужны права доступа к задаче и комментарию. Проверить права можно методом [task.commentitem.isactionallowed](./task-comment-item-is-action-allowed.md).

## Справочная информация о методах

Узнать актуальную информацию о методах работы с комментариями задачи вы можете с помощью метода [task.commentitem.getmanifest](./task-comment-item-get-manifest.md). Рекомендуем использовать его только в качестве справочника, так как структуру ответа метода разработчик может изменить в любой момент.

## Результаты выполнения задачи

Комментарий можно закрепить как результат выполнения задачи. Управляйте результатами задачи группой методов [tasks.task.result.*](../result/index.md).

Метод [task.commentitem.delete](./task-comment-item-delete.md) удалит комментарий с результатом. 

## Обзор методов и событий {#all-methods}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [task.commentitem.add](./task-comment-item-add.md) | Добавить комментарий к задаче ||
    || [task.commentitem.update](./task-comment-item-update.md) | Обновить комментарий ||
    || [task.commentitem.get](./task-comment-item-get.md) | Получить комментарий задачи по `id` ||
    || [task.commentitem.getlist](./task-comment-item-get-list.md) | Получить список комментариев к задаче ||
    || [task.commentitem.delete](./task-comment-item-delete.md) | Удалить комментарий ||
    || [task.commentitem.isactionallowed](./task-comment-item-is-action-allowed.md) | Проверить, разрешено ли действие с комментарием ||
    || [task.commentitem.getmanifest](./task-comment-item-get-manifest.md) | Получить список методов работы с комментариями и их описание ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [OnTaskCommentAdd](./events-comment/on-task-comment-add.md) | При добавлении комментария к задаче ||
    || [OnTaskCommentUpdate](./events-comment/on-task-comment-update.md) | При обновления комментария в задаче ||
    || [OnTaskCommentDelete](./events-comment/on-task-comment-delete.md) | При удалении комментария из задачи ||
    |#

{% endlist %}
