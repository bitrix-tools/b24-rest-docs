# Устаревшие методы задач: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

{% note warning "" %}

**DEPRECATED**

Развитие методов task.item.* остановлено.
Используйте раздел [Актуальные методы задач (`tasks.task.*`)](../index.md).

{% endnote %}

> Быстрый переход: [все методы](#all-methods)

## Как выбрать актуальный раздел

Методы `task.item.*`, `task.items.*` и `task.comment.*` оставлены только для поддержки существующих интеграций. Для новой разработки используйте актуальный раздел [Задачи](../index.md) с методами `tasks.task.*`.

#|
|| **Если нужно** | **Используйте** ||
|| Создать, изменить, получить или удалить задачу в новой интеграции | [Актуальные методы задач](../index.md) ||
|| Поддерживать старую интеграцию на `task.item.*` | Методы этого раздела ||
|| Проверить, какие старые методы доступны на портале | [task.item.getmanifest](./task-item/task-item-get-manifest.md) ||
|#

## Обзор методов {#all-methods}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

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

