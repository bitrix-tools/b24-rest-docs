# Обзор событий при работе с задачами

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о добавлении, обновлении или удалении задачи.

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события задач можно через:

- [исходящий вебхук](../../../local-integrations/local-webhooks.md)
- [приложение](../../../settings/app-installation/index.md) и метод [event.bind](../../events/event-bind.md)

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../events/test-handler.md).

## Какие данные приходят в событиях

Обработчик получает идентификатор задачи: в событиях [OnTaskAdd](./on-task-add.md) и [OnTaskUpdate](./on-task-update.md) — в поле `data.FIELDS_AFTER.ID`, в событии [OnTaskDelete](./on-task-delete.md) — в поле `data.FIELDS_BEFORE.ID`.

Все поля задачи получите методом [tasks.task.get](../tasks-task-get.md). После удаления задачи метод уже не вернет ее данные.

## Какие методы вызывают OnTaskUpdate {#on-task-update-methods}

Событие [OnTaskUpdate](./on-task-update.md) вызывают методы:

- [tasks.task.update](../tasks-task-update.md) — изменение задачи
- [tasks.task.start](../status/tasks-task-start.md), [tasks.task.pause](../status/tasks-task-pause.md), [tasks.task.defer](../status/tasks-task-defer.md), [tasks.task.complete](../status/tasks-task-complete.md), [tasks.task.renew](../status/tasks-task-renew.md) — смена статуса задачи
- [tasks.task.delegate](../tasks-task-delegate.md) — делегирование задачи
- [tasks.task.files.attach](../tasks-task-files-attach.md) — прикрепление файла к задаче
- [tasks.task.startwatch](../user-actions/tasks-task-start-watch.md), [tasks.task.stopwatch](../user-actions/tasks-task-stop-watch.md) — включение и отключение наблюдения за задачей
- [task.dependence.add](../task-dependence-add.md) — создание связи между задачами
- [task.stages.movetask](../stages/task-stages-move-task.md) — перемещение задачи по стадиям

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [OnTaskAdd](./on-task-add.md) | При добавлении задачи вручную или методом [tasks.task.add](../tasks-task-add.md) ||
|| [OnTaskUpdate](./on-task-update.md) | При обновлении задачи вручную или методами REST. Список методов — в разделе [Какие методы вызывают OnTaskUpdate](#on-task-update-methods) ||
|| [OnTaskDelete](./on-task-delete.md) | При удалении задачи вручную или методом [tasks.task.delete](../tasks-task-delete.md) ||
|#
