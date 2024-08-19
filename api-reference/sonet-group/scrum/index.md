# Скрам

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% note info "" %}

**Scope**: [`task`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Скрам технически является проектом *Битрикс24*. Под «id Скрама» подразумевается `id` проекта/группы и передаётся в параметрах/полях как `groupId`.

Для создания Скрама можно воспользоваться методом для рабочих групп соцсети [sonet_group.create](../sonet-group-create.md), заполнив поле `SCRUM_MASTER_ID`.

REST-методы работы со Скрамом:

#|
|| **Метод** | **Описание** ||
|| **Бэклог** | ||
|| [tasks.api.scrum.backlog.add](backlog/tasks-api-scrum-backlog-add.md) | Метод добавляет бэклог в Скрам. ||
|| [tasks.api.scrum.backlog.delete](backlog/tasks-api-scrum-backlog-delete.md) | Метод удаляет бэклог. ||
|| [tasks.api.scrum.backlog.get](backlog/tasks-api-scrum-backlog-get.md) | Метод возвращает значения полей бэклога по id Скрама. ||
|| [tasks.api.scrum.backlog.getFields](backlog/tasks-api-scrum-backlog-get-fields.md) | Метод возвращает доступные поля бэклога. ||
|| [tasks.api.scrum.backlog.update](backlog/tasks-api-scrum-backlog-update.md) | Метод изменяет бэклог. ||
|| **Канбан** | ||
|| [tasks.api.scrum.kanban.addStage](kanban/tasks-api-scrum-kanban-add-stage.md) | Метод создаёт стадию канбана Скрама. ||
|| [tasks.api.scrum.kanban.addTask](kanban/tasks-api-scrum-kanban-add-task.md) | Метод добавляет задачу в канбан Скрама. ||
|| [tasks.api.scrum.kanban.deleteStage](kanban/tasks-api-scrum-kanban-delete-stage.md) | Метод удаляет стадию. ||
|| [tasks.api.scrum.kanban.deleteTask](kanban/tasks-api-scrum-kanban-delete-task.md) | Метод удаляет задачу из канбана Скрама. ||
|| [tasks.api.scrum.kanban.getFields](kanban/tasks-api-scrum-kanban-get-fields.md) | Метод возвращает доступные поля стадии канбана. ||
|| [tasks.api.scrum.kanban.getStages](kanban/tasks-api-scrum-kanban-get-stages.md) | Метод возвращает стадии канбана по id спринта. ||
|| [tasks.api.scrum.kanban.updateStage](kanban/tasks-api-scrum-kanban-update-stage.md) | Метод изменяет стадию канбана Скрама. ||
|| **Эпики** | ||
|| [tasks.api.scrum.epic.add](epic/tasks-api-scrum-epic-add.md) | Метод добавляет эпик в Скрам. ||
|| [tasks.api.scrum.epic.delete](epic/tasks-api-scrum-epic-delete.md) | Метод удаляет эпик. ||
|| [tasks.api.scrum.epic.get](epic/tasks-api-scrum-epic-get.md) | Метод возвращает значения полей эпика по его id. ||
|| [tasks.api.scrum.epic.getFields](epic/tasks-api-scrum-epic-get-fields.md) | Метод возвращает доступные поля эпика. ||
|| [tasks.api.scrum.epic.list](epic/tasks-api-scrum-epic-list.md) | Метод возвращает список эпиков. ||
|| [tasks.api.scrum.epic.update](epic/tasks-api-scrum-epic-update.md) | Метод изменяет эпик в Скраме. ||
|| **Спринты** | ||
|| [tasks.api.scrum.sprint.add](sprint/tasks-api-scrum-sprint-add.md) | Метод добавляет спринт в Скрам. ||
|| [tasks.api.scrum.sprint.complete](sprint/tasks-api-scrum-sprint-complete.md) | Метод завершает активный спринт выбранного Скрама. ||
|| [tasks.api.scrum.sprint.delete](sprint/tasks-api-scrum-sprint-delete.md) | Метод удаляет спринт. ||
|| [tasks.api.scrum.sprint.get](sprint/tasks-api-scrum-sprint-get.md) | Метод возвращает значения полей спринта по его id. ||
|| [tasks.api.scrum.sprint.getFields](sprint/tasks-api-scrum-sprint-get-fields.md) | Метод возвращает доступные поля спринта. ||
|| [tasks.api.scrum.sprint.list](sprint/tasks-api-scrum-sprint-list.md) | Метод возвращает список спринтов. ||
|| [tasks.api.scrum.sprint.start](sprint/tasks-api-scrum-sprint-start.md) | Метод запускает спринт. ||
|| [tasks.api.scrum.sprint.update](sprint/tasks-api-scrum-sprint-update.md) | Метод изменяет спринт. ||
|| **Задачи Скрама** | ||
|| [tasks.api.scrum.task.get](task/tasks-api-scrum-task-get.md) | Метод возвращает значения полей задачи Скрама по её id. ||
|| [tasks.api.scrum.task.getFields](task/tasks-api-scrum-task-get-fields.md) | Метод возвращает доступные поля задачи Скрама. ||
|| [tasks.api.scrum.task.update](task/tasks-api-scrum-task-update.md) | Метод создает или изменяет задачу Скрама. ||
|#