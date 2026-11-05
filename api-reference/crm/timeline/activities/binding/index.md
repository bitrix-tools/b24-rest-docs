# Связи дел с элементами CRM: обзор методов

Дело видно в таймлайне элемента CRM, с которым оно связано. Методы `crm.activity.binding.*` добавляют, переносят и удаляют связи уже созданного дела и возвращают их список.

Например, чтобы перенести письмо клиента из таймлайна лида в карточку компании, свяжите дело с компанией, а потом удалите связь с лидом.

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Таймлайн в карточке CRM](https://helpdesk.bitrix24.ru/open/23960160/)

## Как начать работу

1. Получите `activityId` дела методом [crm.activity.list](../activity-base/crm-activity-list.md)
2. Определите `entityTypeId` и `entityId` элемента CRM
3. Добавьте связь дела с элементом CRM методом [crm.activity.binding.add](./crm-activity-binding-add.md)
4. Проверьте связи дела методом [crm.activity.binding.list](./crm-activity-binding-list.md)
5. Если нужно, перенесите связь на другой элемент того же типа методом [crm.activity.binding.move](./crm-activity-binding-move.md)
6. Удалите лишнюю связь методом [crm.activity.binding.delete](./crm-activity-binding-delete.md)

## Особенности работы

**Несколько карточек.** Одно дело можно связать с несколькими элементами CRM — оно будет отображаться в таймлайне каждой связанной карточки.

**Лимит связей.** По умолчанию у дела может быть не больше 100 связей. Если добавить связь сверх лимита, Битрикс24 без ошибки удалит связь с элементом, у которого наименьший идентификатор. Метод [crm.activity.binding.list](./crm-activity-binding-list.md) показывает только связи с элементами, которые пользователь может читать.

**Перенос связи.** Метод [crm.activity.binding.move](./crm-activity-binding-move.md) переносит связь только на элемент того же типа: из одной сделки в другую, но не из сделки в контакт.

**Удаление связи.** Единственную связь дела удалить нельзя. Чтобы перенести такое дело на элемент другого типа, сначала добавьте связь с новым элементом.

## Связь с другими объектами

**Дела CRM.** Все методы раздела принимают идентификатор дела `activityId`. Возьмите `activityId` из ответа метода [crm.activity.todo.add](../todo/crm-activity-todo-add.md) или получите из списка методом [crm.activity.list](../activity-base/crm-activity-list.md).

**Элементы CRM.** Элемент CRM задают два параметра: тип объекта `entityTypeId` и идентификатор элемента `entityId`. Где их взять:

- `entityTypeId` лида, сделки, контакта и компании — метод [crm.enum.ownertype](../../../auxiliary/enum/crm-enum-owner-type.md)
- `entityTypeId` смарт-процесса — метод [crm.type.add](../../../universal/user-defined-object-types/crm-type-add.md) при создании типа или метод [crm.type.list](../../../universal/user-defined-object-types/crm-type-list.md)
- `entityId` — метод [crm.item.list](../../../universal/crm-item-list.md)

**Универсальные дела.** Универсальное дело — расширенный тип дела, в котором есть синхронизация с календарем, выбор места встречи и переговорной. Его идентификатор из ответа [crm.activity.todo.add](../todo/crm-activity-todo-add.md) передают в методы раздела как `activityId`.

**REST 3.0.** Те же операции в REST 3.0 выполняют методы [crm.activity.binding.bind](../../../rest-v3/activities/crm-activity-binding-bind-rest-v3.md), [unbind](../../../rest-v3/activities/crm-activity-binding-unbind-rest-v3.md), [move](../../../rest-v3/activities/crm-activity-binding-move-rest-v3.md) и [list](../../../rest-v3/activities/crm-activity-binding-list-rest-v3.md).

{% note tip "Частые кейсы и сценарии" %}

- [Как перенести дело между элементами одного типа](../../../../../tutorials/crm/how-to-edit-crm-objects/how-to-move-activity.md)
- [Как перенести дело из одного типа объекта в другой](../../../../../tutorials/crm/how-to-edit-crm-objects/how-to-move-activity-between-objects.md)

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
