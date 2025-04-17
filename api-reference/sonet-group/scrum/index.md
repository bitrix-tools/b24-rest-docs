# Скрам: обзор методов

Скрам — это гибкий способ организации работы с задачами. Команда может разбить на части крупный проект и выполнять его постепенно, по одному фрагменту.

> Быстрый переход: [все методы и события](#all-methods) 
> 
> Пользовательская документация: [Битрикс24.Скрам](https://helpdesk.bitrix24.ru/open/13660630/)

## Скрам в Битрикс24

Технически Скрам является группой. Идентификатор Скрама `groupId` в параметрах методов и полях элементов Скрама — это идентификатор `id` группы.

Чтобы создать Скрам, используйте метод [создания новой группы](../sonet-group-create.md). Группа является Скрамом, если заполнено поле `SCRUM_MASTER_ID`.

{% note tip "Пользовательская документация" %}

- [Как создать группу и проект](https://helpdesk.bitrix24.ru/open/22699004/)

{% endnote %}

## Элементы Скрама

Задачи в Скраме — это стандартные задачи Битрикс24 с расширенными возможностями для работы по методологии Скрам. Для создания или изменения задач используется группа методов [tasks.api.scrum.task.*](./task/index.md).

Команда Скрама собирает все задачи проекта в одном месте — в бэклоге. Задачи, пожелания, идеи, обратная связь записываются и приоритизируются.  Работать с бэклогом можно с помощью группы методов [tasks.api.scrum.backlog.*](./backlog/index.md).

Чтобы сделать бэклог нагляднее, задачи прикрепляются к эпикам. Эпик — это тема, контекст или большая цель, к которой относится задача. Для создания, изменения, получения или удаления эпиков используется группа методов [tasks.api.scrum.epic.*](./epic/index.md).

Участники команды просматривают бэклог и решают, какие задачи брать в спринт. Спринт — это короткий итерационный цикл, за который команда выполняет определенную работу. Управлять спринтами можно с помощью группы методов [tasks.api.scrum.sprint.*](./sprint/index.md).

Команда передвигает задачи по стадиям канбана, работая  над задачами спринта. Канбан — это инструмент, который помогает визуально представить работу с задачами в виде колонок и карточек. Колонки — это стадии работы, карточки — задачи. Работа со стадиями и управление задачами в канбане выполняется методами [tasks.api.scrum.kanban.*](./kanban/index.md).

## Обзор методов {#all-methods} 

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

### Бэклог

#|
|| **Метод** | **Описание** ||
|| [tasks.api.scrum.backlog.add](./backlog/tasks-api-scrum-backlog-add.md) | Добавляет бэклог в Скрам ||
|| [tasks.api.scrum.backlog.update](./backlog/tasks-api-scrum-backlog-update.md) | Обновляет бэклог ||
|| [tasks.api.scrum.backlog.get](./backlog/tasks-api-scrum-backlog-get.md) | Получает значения полей бэклога по идентификатору Скрама ||
|| [tasks.api.scrum.backlog.delete](./backlog/tasks-api-scrum-backlog-delete.md) | Удаляет бэклог ||
|| [tasks.api.scrum.backlog.getFields](./backlog/tasks-api-scrum-backlog-get-fields.md) | Получает доступные поля бэклога ||
|#

### Канбан

#|
|| **Метод** | **Описание** ||
|| [tasks.api.scrum.kanban.addStage](./kanban/tasks-api-scrum-kanban-add-stage.md) | Создает стадию канбана Скрама ||
|| [tasks.api.scrum.kanban.updateStage](./kanban/tasks-api-scrum-kanban-update-stage.md) | Обновляет стадию канбана Скрама ||
|| [tasks.api.scrum.kanban.getStages](./kanban/tasks-api-scrum-kanban-get-stages.md) | Получает стадии канбана по `id` спринта ||
|| [tasks.api.scrum.kanban.deleteStage](./kanban/tasks-api-scrum-kanban-delete-stage.md) | Удаляет стадию ||
|| [tasks.api.scrum.kanban.addTask](./kanban/tasks-api-scrum-kanban-add-task.md) | Добавляет задачу в канбан Скрама ||
|| [tasks.api.scrum.kanban.deleteTask](./kanban/tasks-api-scrum-kanban-delete-task.md) | Удаляет задачу из канбана Скрама ||
|| [tasks.api.scrum.kanban.getFields](./kanban/tasks-api-scrum-kanban-get-fields.md) | Получает доступные поля стадии канбана ||
|#

### Эпики

#|
|| **Метод** | **Описание** ||
|| [tasks.api.scrum.epic.add](./epic/tasks-api-scrum-epic-add.md) | Добавляет эпик в Скрам ||
|| [tasks.api.scrum.epic.update](./epic/tasks-api-scrum-epic-update.md) | Обновляет эпик в Скраме ||
|| [tasks.api.scrum.epic.get](./epic/tasks-api-scrum-epic-get.md) | Получает значения полей эпика по его `id` ||
|| [tasks.api.scrum.epic.list](./epic/tasks-api-scrum-epic-list.md) | Получает список эпиков ||
|| [tasks.api.scrum.epic.delete](./epic/tasks-api-scrum-epic-delete.md) | Удаляет эпик ||
|| [tasks.api.scrum.epic.getFields](./epic/tasks-api-scrum-epic-get-fields.md) | Получает доступные поля эпика ||
|#

### Спринты

#|
|| **Метод** | **Описание** ||
|| [tasks.api.scrum.sprint.add](./sprint/tasks-api-scrum-sprint-add.md) | Добавляет спринт в Скрам ||
|| [tasks.api.scrum.sprint.update](./sprint/tasks-api-scrum-sprint-update.md) | Обновляет спринт ||
|| [tasks.api.scrum.sprint.start](./sprint/tasks-api-scrum-sprint-start.md) | Запускает спринт ||
|| [tasks.api.scrum.sprint.complete](./sprint/tasks-api-scrum-sprint-complete.md) | Завершает активный спринт выбранного Скрама ||
|| [tasks.api.scrum.sprint.get](./sprint/tasks-api-scrum-sprint-get.md) | Получает значения полей спринта по его `id` ||
|| [tasks.api.scrum.sprint.list](./sprint/tasks-api-scrum-sprint-list.md) | Получает список спринтов ||
|| [tasks.api.scrum.sprint.delete](./sprint/tasks-api-scrum-sprint-delete.md) | Удаляет спринт ||
|| [tasks.api.scrum.sprint.getFields](./sprint/tasks-api-scrum-sprint-get-fields.md) | Получает доступные поля спринта ||
|#

### Задачи Скрама

#|
|| **Метод** | **Описание** ||
|| [tasks.api.scrum.task.update](./task/tasks-api-scrum-task-update.md) | Создает или обновляет задачу Скрама ||
|| [tasks.api.scrum.task.get](./task/tasks-api-scrum-task-get.md) | Получает значения полей задачи Скрама по `id` ||
|| [tasks.api.scrum.task.getFields](./task/tasks-api-scrum-task-get-fields.md) | Получает доступные поля задачи Скрама ||
|#
