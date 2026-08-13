# Устаревшие методы task.item.*: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

{% note warning "DEPRECATED" %}

Развитие методов `task.item.*` остановлено. Используйте [актуальные методы задач `tasks.task.*`](../../index.md).

{% endnote %}

Методы `task.item.*` оставлены только для поддержки старых интеграций. Для новой разработки используйте методы [tasks.task.*](../../index.md), которые работают с актуальной карточкой задач.

> Быстрый переход: [все методы](#all-methods)

## Как выбрать версию

Если вы создаете новую интеграцию, используйте методы [tasks.task.*](../../index.md). Они поддерживают актуальные сценарии работы с задачами, комментариями, файлами, результатами и статусами.

Если интеграция уже использует `task.item.*`, оставьте эти методы только для сопровождения существующего кода. При доработках планируйте переход на `tasks.task.*`.

## Связь с другими объектами

**Задача.** Методы `task.item.*` управляют задачей по ее идентификатору. Получить актуальные данные задачи можно методом [task.item.getdata](./task-item-get-data.md) или через новую ветку [tasks.task.get](../../tasks-task-get.md).

**Файлы.** Файлы прикрепляются к задаче устаревшими методами [task.item.addfile](./task-item-add-file.md) и [task.item.deletefile](./task-item-delete-file.md). В новой ветке используйте метод [tasks.task.files.attach](../../tasks-task-files-attach.md).

**История изменений.** Историю изменений задачи возвращает метод [task.logitem.list](./task-log-item-list.md).

## Обзор методов {#all-methods}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

### Основные методы

#|
|| **Метод** | **Описание** ||
|| [task.item.add](./task-item-add.md) | Создает задачу ||
|| [task.item.update](./task-item-update.md) | Обновляет задачу ||
|| [task.item.getdata](./task-item-get-data.md) | Возвращает данные задачи ||
|| [task.item.list](./task-item-list.md) | Возвращает список задач ||
|| [task.item.delete](./task-item-delete.md) | Удаляет задачу ||
|| [task.item.getdescription](./task-item-get-description.md) | Возвращает описание задачи ||
|| [task.item.getfiles](./task-item-get-files.md) | Возвращает ссылки на файлы задачи ||
|| [task.item.getdependson](./task-item-get-dependson.md) | Возвращает идентификаторы задач, от которых зависит задача ||
|| [task.logitem.list](./task-log-item-list.md) | Возвращает историю изменения задачи ||
|#

### Справочные методы

#|
|| **Метод** | **Описание** ||
|| [task.item.getmanifest](./task-item-get-manifest.md) | Возвращает перечень методов `task.item.*` с их описанием ||
|| [task.item.getallowedactions](./task-item-get-allowed-actions.md) | Возвращает идентификаторы допустимых действий над задачей ||
|| [task.item.getallowedtaskactionsasstrings](./task-item-get-allowed-task-actions-as-strings.md) | Возвращает список допустимых действий над задачей ||
|| [task.item.isactionallowed](./task-item-is-action-allowed.md) | Проверяет, разрешено ли действие ||
|#

### Управление статусом

#|
|| **Метод** | **Описание** ||
|| [task.item.delegate](./task-item-delegate.md) | Делегирует задачу новому пользователю ||
|| [task.item.startexecution](./task-item-start-execution.md) | Переводит задачу в статус «выполняется» ||
|| [task.item.defer](./task-item-defer.md) | Переводит задачу в статус «отложена» ||
|| [task.item.complete](./task-item-complete.md) | Переводит задачу в статус «завершена» или «условно завершена» ||
|| [task.item.renew](./task-item-renew.md) | Переводит задачу в статус «не выполняется» ||
|| [task.item.approve](./task-item-approve.md) | Переводит ожидающую контроля задачу в статус «завершена» ||
|| [task.item.disapprove](./task-item-disapprove.md) | Переводит ожидающую контроля задачу в статус «не выполняется» ||
|#

### Избранное и файлы

#|
|| **Метод** | **Описание** ||
|| [task.item.addtofavourite](./task-item-add-to-favourite.md) | Добавляет задачу в Избранное ||
|| [task.item.deletefromfavorite](./task-item-delete-from-favorite.md) | Удаляет задачу из Избранного ||
|| [task.item.addfile](./task-item-add-file.md) | Загружает файл в задачу ||
|| [task.item.deletefile](./task-item-delete-file.md) | Удаляет привязку файла к задаче ||
|#
