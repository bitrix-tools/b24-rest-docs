# Спринты в Скраме: обзор методов

Спринт — это короткий итерационный цикл, за который команда выполняет определенную работу. Такой формат работы позволяет получать небольшой, но прогнозируемый результат в понятные сроки.

> Быстрый переход: [все методы и события](#all-methods) 
> 
> Пользовательская документация: [Битрикс24.Скрам](https://helpdesk.bitrix24.ru/open/13660630/) 

## Связь спринтов с другими объектами

**Группа.** Спринты привязываются к группе (скраму) по идентификатору группы `groupId`. Получить идентификатор можно методом [создания новой группы](../../sonet-group-create.md) или методом [получения списка групп](../../socialnetwork-api-workgroup-list.md). Группа является скрамом, если заполнено поле `SCRUM_MASTER_ID`.

{% note tip "Пользовательская документация" %}

- [Как создать группу и проект](https://helpdesk.bitrix24.ru/open/22699004/)

{% endnote %}

## Как запустить спринт

Метод [tasks.api.scrum.sprint.start](./tasks-api-scrum-sprint-start.md) запускает спринт по идентификатору спринта `id`. Получить идентификатор спринта можно методом [создания нового спринта](./tasks-api-scrum-sprint-add.md) или методом [получения списка спринтов](./tasks-api-scrum-sprint-list.md). Запустить можно только планируемый спринт, то есть со статусом `planned`. У запущенного спринта статус изменится на `active`.

## Как завершить активный спринт

Метод [tasks.api.scrum.sprint.complete](./tasks-api-scrum-sprint-complete.md) завершает активный спринт по идентификатору группы `id`, а не спринта. Получить идентификатор можно методом [создания новой группы](../../sonet-group-create.md) или методом [получения списка групп](../../socialnetwork-api-workgroup-list.md). У завершенного спринта статус сменится с `active` на `completed`.

## Обзор методов {#all-methods}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [tasks.api.scrum.sprint.add](./tasks-api-scrum-sprint-add.md) | Добавляет спринт в Скрам ||
|| [tasks.api.scrum.sprint.update](./tasks-api-scrum-sprint-update.md) | Обновляет спринт ||
|| [tasks.api.scrum.sprint.start](./tasks-api-scrum-sprint-start.md) | Запускает спринт ||
|| [tasks.api.scrum.sprint.complete](./tasks-api-scrum-sprint-complete.md) | Завершает активный спринт выбранного Скрама ||
|| [tasks.api.scrum.sprint.get](./tasks-api-scrum-sprint-get.md) | Получает значения полей спринта по его `id` ||
|| [tasks.api.scrum.sprint.list](./tasks-api-scrum-sprint-list.md) | Получает список спринтов ||
|| [tasks.api.scrum.sprint.delete](./tasks-api-scrum-sprint-delete.md) | Удаляет спринт ||
|| [tasks.api.scrum.sprint.getFields](./tasks-api-scrum-sprint-get-fields.md) | Получает доступные поля спринта ||
|#
