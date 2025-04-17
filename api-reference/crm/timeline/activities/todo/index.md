# Обзор методов

> Быстрый переход: [все методы](#all-methods) 
> 
> Пользовательская документация: [Универсальное дело в CRM](https://helpdesk.bitrix24.ru/open/21064046/)

Универсальные дела — это тип дел с расширенными настройками. В карточке универсального дела можно синхронизировать дело с календарем, выбрать место встречи с клиентом, добавить коллег, выбрать клиента из элемента CRM, разделить дела по цветам, выбрать переговорную. Часть расширенных настроек доступна сотруднику на стороне Битрикс24. 

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с соответствующими правами

## Обзор методов {#all-methods}

#|
|| **Метод** | **Описание** ||
|| [crm.activity.todo.add](./crm-activity-todo-add.md) | Добавляет новое универсальное дело в таймлайн ||
|| [crm.activity.todo.update](./crm-activity-todo-update.md) | Обновляет универсальное дело ||
|| [crm.activity.todo.updateColor](./crm-activity-todo-update-color.md) | Обновляет цвет универсального дела ||
|| [crm.activity.todo.updateDeadline](./crm-activity-todo-update-deadline.md) | Обновляет крайний срок универсального дела ||
|| [crm.activity.todo.updateDescription](./crm-activity-todo-update-description.md) | Обновляет описание универсального дела ||
|| [crm.activity.todo.updateResponsibleUser](./crm-activity-todo-update-responsible-user.md) | Обновляет ответственного за универсальное дело ||
|| [crm.activity.get](../activity-base/crm-activity-get.md) | Получает информацию об универсальном деле по идентификатору ||
|| [crm.activity.list](../activity-base/crm-activity-list.md) | Получает список всех универсалиных дел для элемента CRM с фильтром `PROVIDER_ID` = `"CRM_TODO"` ||
|| [crm.activity.delete](../activity-base/crm-activity-delete.md) | Удаляет универсальное дело по идентификатору ||
|#

## Дополнительно

- [Тип объекта CRM](../../../data-types.md#object_type) 