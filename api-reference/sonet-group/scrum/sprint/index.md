# Спринты в Скраме: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Спринт — короткий итерационный цикл Скрама, за который команда выполняет набор задач. Методы `tasks.api.scrum.sprint.*` создают, изменяют, запускают, завершают и удаляют спринты и возвращают их данные.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как работать в Скрам](https://helpdesk.bitrix24.ru/open/14659922/)

## Связь спринтов с другими объектами

**Группа.** Спринты привязываются к группе (Скраму) по идентификатору группы `groupId`. Получить идентификатор можно методом [создания новой группы](../../sonet-group-create.md) или методом [получения списка групп](../../socialnetwork-api-workgroup-list.md). Группа является Скрамом, если заполнено поле `SCRUM_MASTER_ID`.

**Задача.** Задача попадает в спринт, когда в ее поле `entityId` указан идентификатор спринта. Изменить поле можно методом [tasks.api.scrum.task.update](../task/tasks-api-scrum-task-update.md).

**Бэклог.** При завершении спринта его незавершенные задачи переходят в [бэклог](../backlog/index.md) Скрама, при удалении спринта — все его задачи.

## Как начать работу

1. Получите идентификатор Скрама методом [socialnetwork.api.workgroup.list](../../socialnetwork-api-workgroup-list.md).
2. Создайте спринт со статусом `planned` методом [tasks.api.scrum.sprint.add](./tasks-api-scrum-sprint-add.md).
3. Добавьте задачи в спринт методом [tasks.api.scrum.task.update](../task/tasks-api-scrum-task-update.md).
4. Запустите спринт методом [tasks.api.scrum.sprint.start](./tasks-api-scrum-sprint-start.md).
5. Завершите активный спринт методом [tasks.api.scrum.sprint.complete](./tasks-api-scrum-sprint-complete.md).

## Жизненный цикл спринта

Спринт проходит статусы `planned` → `active` → `completed`. В Скраме может быть только один активный спринт: перед запуском следующего завершите текущий.

- [tasks.api.scrum.sprint.start](./tasks-api-scrum-sprint-start.md) запускает запланированный спринт по идентификатору спринта
- [tasks.api.scrum.sprint.complete](./tasks-api-scrum-sprint-complete.md) завершает активный спринт по идентификатору группы, а не спринта
- [tasks.api.scrum.sprint.delete](./tasks-api-scrum-sprint-delete.md) удаляет спринт в любом статусе

## Обзор методов {#all-methods}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: `tasks.api.scrum.sprint.list` и `tasks.api.scrum.sprint.getFields` — любой пользователь, `tasks.api.scrum.sprint.start` и `tasks.api.scrum.sprint.complete` — владелец или модератор Скрама, администратор Битрикс24, остальные методы — любой пользователь, имеющий доступ к Скраму

#|
|| **Метод** | **Описание** ||
|| [tasks.api.scrum.sprint.add](./tasks-api-scrum-sprint-add.md) | Добавляет спринт в Скрам ||
|| [tasks.api.scrum.sprint.update](./tasks-api-scrum-sprint-update.md) | Изменяет спринт ||
|| [tasks.api.scrum.sprint.get](./tasks-api-scrum-sprint-get.md) | Получает спринт по идентификатору ||
|| [tasks.api.scrum.sprint.list](./tasks-api-scrum-sprint-list.md) | Получает список спринтов ||
|| [tasks.api.scrum.sprint.delete](./tasks-api-scrum-sprint-delete.md) | Удаляет спринт ||
|| [tasks.api.scrum.sprint.start](./tasks-api-scrum-sprint-start.md) | Запускает спринт ||
|| [tasks.api.scrum.sprint.complete](./tasks-api-scrum-sprint-complete.md) | Завершает активный спринт выбранного Скрама ||
|| [tasks.api.scrum.sprint.getFields](./tasks-api-scrum-sprint-get-fields.md) | Получает доступные поля спринта ||
|#
