# Канбан в Скраме: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Канбан — это инструмент, который помогает визуально представить работу с задачами в виде колонок и карточек. Колонки — это стадии работы, карточки — задачи. В канбане скрама команда видит все задачи спринта и передвигает их по стадиям в процессе работы.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как работать в Скрам](https://helpdesk.bitrix24.ru/open/14659922/)

## Связь стадий канбана с другими объектами

**Спринт.** Стадия канбана привязывается к спринту по идентификатору спринта `sprintId`. Получить идентификатор можно методом [добавления нового спринта](../sprint/tasks-api-scrum-sprint-add.md) или методом [получения списка спринтов](../sprint/tasks-api-scrum-sprint-list.md).

**Задача.** Задача связывается со стадией по идентификаторам `taskId`, `stageId` и `sprintId`. Задача и спринт должны относиться к одной группе Скрама.

## Данные стадии канбана

Метод [tasks.api.scrum.kanban.getStages](./tasks-api-scrum-kanban-get-stages.md) возвращает массив стадий, отсортированный по полю `sort`.

#|
|| **Поле** | **Описание** | **Пример** ||
|| `id` | Идентификатор стадии | `58` ||
|| `name` | Название стадии | `Новые` ||
|| `sort` | Порядок сортировки | `100` ||
|| `type` | Тип стадии: `NEW`, `WORK` или `FINISH` | `NEW` ||
|| `sprintId` | Идентификатор спринта | `5` ||
|| `color` | Цвет стадии в виде шестизначного HEX-кода без символа `#` | `00C4FB` ||
|#

```json
{
    "result": [
        {
            "id": "58",
            "name": "Новые",
            "sort": "100",
            "type": "NEW",
            "sprintId": "5",
            "color": "00C4FB"
        }
    ]
}
```

## Как начать работу

1. Получите идентификатор активного спринта методом [tasks.api.scrum.sprint.list](../sprint/tasks-api-scrum-sprint-list.md).
2. Проверьте существующие стадии методом [tasks.api.scrum.kanban.getStages](./tasks-api-scrum-kanban-get-stages.md).
3. Создайте или измените стадии методами [tasks.api.scrum.kanban.addStage](./tasks-api-scrum-kanban-add-stage.md) и [tasks.api.scrum.kanban.updateStage](./tasks-api-scrum-kanban-update-stage.md).
4. Добавьте задачу в канбан методом [tasks.api.scrum.kanban.addTask](./tasks-api-scrum-kanban-add-task.md).

## Особенности

Методы принимают три типа стадий: новая `NEW`, рабочая `WORK` и финальная `FINISH`. Если при создании стадии не передать `type`, метод установит `WORK`. Значения по умолчанию для `sort` и `color` — `100` и `00C4FB`. Для `color` нет фиксированного списка значений: передайте шестизначный HEX-код без символа `#`.

## Доступ к методам

Для [получения стадий](./tasks-api-scrum-kanban-get-stages.md) требуется право просматривать задачи группы Скрама. Для создания, изменения и удаления стадий, а также добавления и удаления задач требуется право редактировать задачи группы. Метод [tasks.api.scrum.kanban.getFields](./tasks-api-scrum-kanban-get-fields.md) возвращает справочник полей без проверки прав на конкретную группу.

## Задачи в канбане

Задачи в стадии канбана можно добавлять методом [tasks.api.scrum.kanban.addTask](./tasks-api-scrum-kanban-add-task.md). Для этого используются идентификаторы трех объектов:

- идентификатор спринта `sprintId`. Можно получить методом [получения списка спринтов](../sprint/tasks-api-scrum-sprint-list.md)
- идентификатор задачи `taskId`. Можно получить методом [создания задачи](../../../tasks/tasks-task-add.md) или методом [получения списка задач](../../../tasks/tasks-task-list.md)
- идентификатор стадии канбана `stageId`. Можно получить методом [получения стадий канбана](./tasks-api-scrum-kanban-get-stages.md)

Чтобы удалить задачу из канбана используйте метод [tasks.api.scrum.kanban.deleteTask](./tasks-api-scrum-kanban-delete-task.md), указав идентификатор спринта `sprintId` и идентификатор задачи `taskId`. Задача останется в спринте на странице планирования. Метод не перенесет задачу в [бэклог](../backlog/index.md).

## Обзор методов {#all-methods}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: зависит от метода

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
