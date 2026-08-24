# Универсальные дела CRM: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Универсальные дела — это тип дел с расширенными настройками. В карточке универсального дела можно синхронизировать дело с календарем, выбрать место встречи с клиентом, добавить коллег, выбрать клиента из элемента CRM, разделить дела по цветам, выбрать переговорную. Часть расширенных настроек доступна сотруднику только на стороне Битрикс24.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [универсальное дело в CRM](https://helpdesk.bitrix24.ru/open/21064046/)

## Связь с элементом CRM

Универсальное дело всегда создается в таймлайне конкретного элемента CRM.

**Элемент CRM.** Связь задают параметры `ownerTypeId` и `ownerId`.

- `ownerTypeId` хранит тип объекта CRM, например `2` для сделки. Значения типов смотрите в справочнике [Тип объекта CRM](../../../data-types.md#object_type).
- `ownerId` хранит идентификатор элемента CRM. Его возвращают методы [crm.item.list](../../../universal/crm-item-list.md) и [crm.item.add](../../../universal/crm-item-add.md).

**Другое дело таймлайна.** Универсальное дело можно связать с уже существующим делом через параметр `parentActivityId` метода [crm.activity.todo.add](./crm-activity-todo-add.md).

**Пользователь.** За дело отвечает сотрудник из параметра `responsibleId`. Ответственного можно сменить методом [crm.activity.todo.updateResponsibleUser](./crm-activity-todo-update-responsible-user.md).

## Как работать с универсальными делами

1. Определите элемент CRM, в таймлайне которого будет храниться дело, и передайте его тип и идентификатор в `ownerTypeId` и `ownerId`.
2. Создайте дело методом [crm.activity.todo.add](./crm-activity-todo-add.md). Крайний срок `deadline` обязателен.
3. Получите дело методом [crm.activity.get](../activity-base/crm-activity-get.md) или список дел элемента методом [crm.activity.list](../activity-base/crm-activity-list.md) с фильтром `PROVIDER_ID` = `CRM_TODO`.
4. Измените дело целиком методом [crm.activity.todo.update](./crm-activity-todo-update.md) или отдельное свойство одним из методов `updateColor`, `updateDeadline`, `updateDescription`, `updateResponsibleUser`.
5. Удалите дело методом [crm.activity.delete](../activity-base/crm-activity-delete.md).

## Какой метод изменения выбрать

#|
|| **Если вам нужно** | **Используйте метод** ||
|| Изменить несколько свойств дела за один вызов | [crm.activity.todo.update](./crm-activity-todo-update.md) ||
|| Изменить только крайний срок | [crm.activity.todo.updateDeadline](./crm-activity-todo-update-deadline.md) ||
|| Изменить только описание | [crm.activity.todo.updateDescription](./crm-activity-todo-update-description.md) ||
|| Изменить только цвет дела в таймлайне | [crm.activity.todo.updateColor](./crm-activity-todo-update-color.md) ||
|| Изменить только ответственного | [crm.activity.todo.updateResponsibleUser](./crm-activity-todo-update-responsible-user.md) ||
|#

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода. Методы `crm.activity.todo.*` доступны пользователю с правом на редактирование элемента CRM, в таймлайне которого находится дело

#|
|| **Метод** | **Описание** ||
|| [crm.activity.todo.add](./crm-activity-todo-add.md) | Добавляет новое универсальное дело в таймлайн ||
|| [crm.activity.todo.update](./crm-activity-todo-update.md) | Обновляет универсальное дело ||
|| [crm.activity.todo.updateColor](./crm-activity-todo-update-color.md) | Обновляет цвет универсального дела ||
|| [crm.activity.todo.updateDeadline](./crm-activity-todo-update-deadline.md) | Обновляет крайний срок универсального дела ||
|| [crm.activity.todo.updateDescription](./crm-activity-todo-update-description.md) | Обновляет описание универсального дела ||
|| [crm.activity.todo.updateResponsibleUser](./crm-activity-todo-update-responsible-user.md) | Обновляет ответственного за универсальное дело ||
|| [crm.activity.get](../activity-base/crm-activity-get.md) | Получает информацию об универсальном деле по идентификатору ||
|| [crm.activity.list](../activity-base/crm-activity-list.md) | Получает список универсальных дел для элемента CRM с фильтром `PROVIDER_ID` = `CRM_TODO` ||
|| [crm.activity.delete](../activity-base/crm-activity-delete.md) | Удаляет универсальное дело по идентификатору ||
|#

## Дополнительно

- [{#T}](../../../data-types.md)
- [{#T}](../index.md)
