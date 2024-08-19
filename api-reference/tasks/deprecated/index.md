# Устаревшие методы задач

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

В этом разделе содержится информация об устаревших методах. Их использование в работе крайне не рекомендуется.

{% endnote %}

#|
|| **Метод** | **Описание** ||
|| **Задачи (item)** | ||
|| [task.item.add](./task-item/task-item-add.md) | Создает новую задачу ||
|| [task.item.delete](./task-item/task-item-delete.md) | Удаляет задачу ||
|| [task.item.getdata](./task-item/task-item-get-data.md) | Возвращает массив данных о задаче ||
|| [task.item.getmanifest](./task-item/task-item-get-manifest.md) | Возвращает перечень методов `task.item.*` с их описанием ||
|| [task.item.list](./task-item/task-item-list.md) | Возвращает список задач ||
|| [task.item.update](./task-item/task-item-update.md) | Обновляет данные по задаче ||
|| [task.item.getdescription](./task-item/task-item-get-description.md) | Возвращает описание задачи ||
|| [task.item.getfiles](./task-item/task-item-get-files.md) | Возвращает массив с ссылками на файлы, прикрепленные к задаче ||
|| [task.item.getdependson](./task-item/task-item-get-dependson.md) | Возвращает массив с идентификаторами задач, от которых зависит задача ||
|| [task.item.getallowedactions](./task-item/task-item-get-allowed-actions.md) | Возвращает массив идентификаторов допустимых действий над задачей ||
|| [task.item.getallowedtaskactionsasstrings](./task-item/task-item-get-allowed-task-actions-as-strings.md) | Возвращает список допустимых действий над задачей ||
|| [task.item.isactionallowed](./task-item/task-item-is-action-allowed.md) | Проверяет, разрешено ли действие ||
|| [task.item.delegate](./task-item/task-item-delegate.md) | Делегирует задачу новому пользователю ||
|| [task.item.startexecution](./task-item/task-item-start-execution.md) | Переводит задачу в статус «выполняется» ||
|| [task.item.defer](./task-item/task-item-defer.md) | Переводит задачу в статус «отложена» ||
|| [task.item.complete](./task-item/task-item-complete.md) | Переводит задачу в статус «завершена» или «условно завершена (ждет контроля исполнителя)» ||
|| [task.item.renew](./task-item/task-item-renew.md) | Переводит задачу в статус «не выполняется» ||
|| [task.item.approve](./task-item/task-item-approve.md) | Переводит ожидающую контроля задачу в статус «завершена» ||
|| [task.item.disapprove](./task-item/task-item-disapprove.md) | Переводит ожидающую контроля задачу в статус «не выполняется» ||
|| [task.item.addtofavourite](./task-item/task-item-add-to-favourite.md) | Добавляет задачу в Избранное ||
|| [task.item.deletefromfavorite](./task-item/task-item-delete-from-favorite.md) | Удаляет задачу из Избранного ||
|| [task.item.addfile](./task-item/task-item-add-file.md) | Загружает файл в задачу ||
|| [task.item.deletefile](./task-item/task-item-delete-file.md) | Удаляет привязку файла к задаче ||
|| [task.logitem.list](./task-item/task-log-item-list.md) | Возвращает историю изменения задачи ||
|| **items** | ||
|| [task.items.getlist](./task-items-get-list.md) | Возвращает массив задач, каждая из которых содержит массив полей ||
|| **comment** | ||
|| [task.comment.add](./task-comment-add.md) | Добавляет комментарий к задаче ||
|#