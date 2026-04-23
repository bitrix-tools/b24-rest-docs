# Дела CRM в таймлайне: обзор методов

Дело CRM — запись в таймлайне, которая фиксирует взаимодействие с клиентом. Оно привязано к элементу CRM и отображается в его карточке.

Методы раздела работают с делами CRM: создают и обновляют универсальные дела, возвращают дело по идентификатору, получают список по фильтру, удаляют дело и описывают поля.

Например, нужно убрать из таймлайна сделки звонок. Для этого получите список дел по сделке и удалите нужное дело.

{% note warning "" %}

**DEPRECATED**

Развитие методов [crm.activity.add](./crm-activity-add.md) и [crm.activity.update](./crm-activity-update.md) остановлено.
Используйте методы [crm.activity.todo.add](../todo/crm-activity-todo-add.md) и [crm.activity.todo.update](../todo/crm-activity-todo-update.md).

{% endnote %}

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Таймлайн в карточке CRM](https://helpdesk.bitrix24.ru/open/23960160/)

## Как начать работу

1. Определите элемент CRM: `ownerTypeId` и `ownerId`
2. Создайте универсальное дело методом [crm.activity.todo.add](../todo/crm-activity-todo-add.md)
3. Проверьте созданное дело методом [crm.activity.get](./crm-activity-get.md)
4. Для изменения универсального дела используйте метод [crm.activity.todo.update](../todo/crm-activity-todo-update.md)
5. Чтобы найти дела по фильтру, используйте метод [crm.activity.list](./crm-activity-list.md)
6. Удалите нужное дело методом [crm.activity.delete](./crm-activity-delete.md)
7. Для проверки структуры полей дела используйте метод [crm.activity.fields](./crm-activity-fields.md)
8. Проверьте структуру полей коммуникации методом [crm.activity.communication.fields](./crm-activity-communication-fields.md)

## Связь с другими объектами

**Элементы CRM.** Дело привязывается к элементу CRM через параметры `ownerTypeId` и `ownerId`. Типовые значения `ownerTypeId` для лидов, сделок, контактов и компаний возвращает метод [crm.enum.ownertype](../../../auxiliary/enum/crm-enum-owner-type.md). Для смарт-процессов используйте метод [crm.type.list](../../../universal/user-defined-object-types/crm-type-list.md). Идентификатор `ownerId` получите через универсальный метод [crm.item.list](../../../universal/crm-item-list.md).

**Связи дела.** Одно дело можно привязать к нескольким элементам CRM. Для управления связями — добавления, переноса и удаления — используйте методы группы [crm.activity.binding.*](../binding/index.md).

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [crm.activity.todo.add](../todo/crm-activity-todo-add.md) | Добавляет универсальное дело в таймлайн ||
|| [crm.activity.todo.update](../todo/crm-activity-todo-update.md) | Обновляет универсальное дело ||
|| [crm.activity.get](./crm-activity-get.md) | Возвращает дело по идентификатору ||
|| [crm.activity.list](./crm-activity-list.md) | Возвращает список дел по фильтру ||
|| [crm.activity.delete](./crm-activity-delete.md) | Удаляет дело ||
|| [crm.activity.fields](./crm-activity-fields.md) | Возвращает описание полей дела ||
|| [crm.activity.communication.fields](./crm-activity-communication-fields.md) | Возвращает описание полей коммуникации дела ||
|#

### Устаревшие методы

#|
|| **Метод** | **Описание** ||
|| [crm.activity.add](./crm-activity-add.md) | Создает системное дело ||
|| [crm.activity.update](./crm-activity-update.md) | Обновляет системное дело ||
|#
