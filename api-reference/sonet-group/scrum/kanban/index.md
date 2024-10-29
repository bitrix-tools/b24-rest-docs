# Канбан в Скраме: обзор методов

Канбан — это инструмент, который помогает визуально представить работу с задачами в виде колонок и карточек. Колонки — это стадии работы, карточки — задачи. В канбане скрама команда видит все задачи спринта и передвигает их по стадиям в процессе работы.

> Быстрый переход: [все методы и события](#all-methods) 
> 
> Пользовательская документация: [Как работать в Скрам](https://helpdesk.bitrix24.ru/open/14659922/)

## Связь стадий канбана с другими объектами

**Спринт.** Стадия канбана привязывается к спринту по идентификатору спринта `sprintId`. Получить идентификатор можно методом [добавления нового спринта](../sprint/tasks-api-scrum-sprint-add.md) или методом [получения списка спринтов](../sprint/tasks-api-scrum-sprint-list.md).

{% note tip "Пользовательская документация" %}

- [Битрикс24.Скрам](https://helpdesk.bitrix24.ru/open/13660630/)

{% endnote %}

## Особенности

Канбан Скрама обязательно должен содержать в себе стадии с типом новая `NEW` и финальная `FINISH`.

Используйте метод создания стадии канбана только для активных спринтов, то есть с полем `"status": "active"`.

## Задачи в канбане

Задачи в стадии канбана можно добавлять методом [tasks.api.scrum.kanban.addTask](./tasks-api-scrum-kanban-add-task.md). Для этого используются идентификаторы трех объектов:
  - идентификатор спринта `sprintId`. Можно получить методом [получения списка спринтов](../sprint/tasks-api-scrum-sprint-list.md)
  - идентификатор задачи `taskId`. Можно получить методом [создания задачи](../../../tasks/tasks-task-add.md) или методом [получения списка задач](../../../tasks/tasks-task-list.md)
  - идентификатор стадии канбана `stageId`. Можно получить методом [получения стадий канбана](./tasks-api-scrum-kanban-get-stages.md)

Чтобы удалить задачу из канбана используйте метод [tasks.api.scrum.kanban.deleteTask](./tasks-api-scrum-kanban-delete-task.md), указав идентификатор спринта `sprintId` и идентификатор задачи `taskId`. Задача останется в спринте на странице планирования. Метод не перенесет задачу в [бэклог](../backlog/index.md).

## Обзор методов {#all-methods}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [tasks.api.scrum.kanban.addStage](./tasks-api-scrum-kanban-add-stage.md) | Создает стадию канбана Скрама ||
|| [tasks.api.scrum.kanban.updateStage](./tasks-api-scrum-kanban-update-stage.md) | Обновляет стадию канбана Скрама ||
|| [tasks.api.scrum.kanban.getStages](./tasks-api-scrum-kanban-get-stages.md) | Получает стадии канбана по `id` спринта ||
|| [tasks.api.scrum.kanban.deleteStage](./tasks-api-scrum-kanban-delete-stage.md) | Удаляет стадию ||
|| [tasks.api.scrum.kanban.addTask](./tasks-api-scrum-kanban-add-task.md) | Добавляет задачу в канбан Скрама ||
|| [tasks.api.scrum.kanban.deleteTask](./tasks-api-scrum-kanban-delete-task.md) | Удаляет задачу из канбана Скрама ||
|| [tasks.api.scrum.kanban.getFields](./tasks-api-scrum-kanban-get-fields.md) | Получает доступные поля стадии канбана ||
|#