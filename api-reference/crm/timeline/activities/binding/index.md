# Связи дел с элементами CRM: обзор методов

Группа методов `crm.activity.binding.*` работает со связями существующего дела с элементами CRM: добавляет связь, возвращает список, переносит связь на другой элемент или удаляет ее.

Например, нужно перенести письмо клиента из таймлайна лида в карточку компании. Для этого добавляют связь с компанией — дело появится в ее таймлайне. Затем удаляют связь с лидом.

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Таймлайн в карточке CRM](https://helpdesk.bitrix24.ru/open/23960160/)

## Как начать работу

1. Получите `activityId` дела
2. Определите `entityTypeId` и `entityId` элемента CRM
3. Добавьте связь дела с элементом CRM методом [crm.activity.binding.add](./crm-activity-binding-add.md)
4. Чтобы проверить текущие связи дела, используйте метод [crm.activity.binding.list](./crm-activity-binding-list.md)
5. Если нужно перенести связь на другой элемент того же типа, используйте метод [crm.activity.binding.move](./crm-activity-binding-move.md)
6. Удалите нужную связь методом [crm.activity.binding.delete](./crm-activity-binding-delete.md)

## Особенности работы

**Несколько карточек.** Одно дело можно связать с несколькими элементами CRM, но не более 100 — оно будет отображаться в таймлайне каждой связанной карточки.

**Перенос связи.** Метод [crm.activity.binding.move](./crm-activity-binding-move.md) меняет связь только между элементами одного типа: из одной сделки в другую, но не из сделки в контакт.

**Удаление связи.** Нельзя удалить связь, если она единственная у дела.

## Связь с другими объектами

**Дела CRM.** Все методы раздела принимают идентификатор дела `activityId`. Возьмите `activityId` из ответа метода [crm.activity.add](../activity-base/crm-activity-add.md) или получите из списка методом [crm.activity.list](../activity-base/crm-activity-list.md).

**Элементы CRM.** Для связи дела с элементом CRM передают `entityTypeId` и `entityId`. Типовые значения `entityTypeId` для лидов, сделок, контактов и компаний возвращает метод [crm.enum.ownertype](../../../auxiliary/enum/crm-enum-owner-type.md). Для смарт-процессов `entityTypeId` получают при создании типа методом [crm.type.add](../../../universal/user-defined-object-types/crm-type-add.md) или из списка методом [crm.type.list](../../../universal/user-defined-object-types/crm-type-list.md). Идентификатор нужного элемента `entityId` получают универсальным методом [crm.item.list](../../../universal/crm-item-list.md).

**Универсальные дела.** Универсальное дело — расширенный тип дела, в котором есть синхронизация с календарем, выбор места встречи и переговорной. Универсальное дело создают методом [crm.activity.todo.add](../todo/crm-activity-todo-add.md). Метод возвращает идентификатор созданного дела, который передают в методы `crm.activity.binding.*` как `activityId`.

{% note tip "Частые кейсы и сценарии" %}

- [Как перенести дело из одного типа объекта в другой](../../../../../tutorials/crm/how-to-edit-crm-objects/how-to-move-activity.md)
- [Как перенести дело между объектами CRM](../../../../../tutorials/crm/how-to-edit-crm-objects/how-to-move-activity-between-objects.md)

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [crm.activity.binding.add](./crm-activity-binding-add.md) | Добавляет связь дела с элементом CRM ||
|| [crm.activity.binding.move](./crm-activity-binding-move.md) | Переносит связь дела на другой элемент CRM того же типа ||
|| [crm.activity.binding.list](./crm-activity-binding-list.md) | Возвращает список связей дела ||
|| [crm.activity.binding.delete](./crm-activity-binding-delete.md) | Удаляет связь дела с элементом CRM ||
|#
