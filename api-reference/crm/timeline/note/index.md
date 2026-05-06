# Заметки к записям таймлайна: обзор методов

Группа методов `crm.timeline.note.*` работает с текстовой заметкой к записи таймлайна. Заметку можно сохранить, получить или удалить.

Например, нужно сохранить расшифровку звонка к его записи в таймлайне сделки — ее добавляют как заметку и при необходимости получают или удаляют.

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Таймлайн в карточке CRM](https://helpdesk.bitrix24.ru/open/23960160/)

## Как начать работу

1. Определите элемент CRM: `ownerTypeId` и `ownerId`
2. Определите тип записи `itemType`
3. Получите `itemId` записи в зависимости от `itemType`
4. Сохраните заметку методом [crm.timeline.note.save](./crm-timeline-note-save.md)
5. Чтобы прочитать заметку, используйте метод [crm.timeline.note.get](./crm-timeline-note-get.md)
6. Удалите ненужную заметку методом [crm.timeline.note.delete](./crm-timeline-note-delete.md)

## Связь с другими объектами

**Элементы CRM.** Заметка привязана к конкретному элементу CRM: тип элемента передают в `ownerTypeId`, идентификатор — в `ownerId`. Типовые значения `ownerTypeId` приведены в статье [Тип объекта CRM](../../data-types.md#object_type). Идентификатор `ownerId` получите универсальным методом [crm.item.list](../../universal/crm-item-list.md).

**Записи истории таймлайна.** Заметку добавляют к комментарию в таймлайне элемента CRM. Для привязки передают `itemType = 1` и идентификатор записи `itemId`. Чтобы получить `itemId`, используйте метод [crm.timeline.comment.add](../comments/crm-timeline-comment-add.md) при создании комментария или метод [crm.timeline.comment.list](../comments/crm-timeline-comment-list.md) для существующих записей.

**Дела CRM.** К делу в таймлайне — звонку, письму, встрече или задаче — также добавляют заметку. Для привязки передают `itemType = 2` и идентификатор дела `itemId`. Возьмите `itemId` из ответа метода [crm.activity.add](../activities/activity-base/crm-activity-add.md) или из списка методом [crm.activity.list](../activities/activity-base/crm-activity-list.md).

**Универсальные дела CRM.** Универсальное дело — расширенный тип дела, в котором есть синхронизация с календарем, выбор места встречи и переговорной. Для привязки, как и для обычного дела, передают `itemType = 2` и идентификатор `itemId`. Возьмите `itemId` из ответа метода [crm.activity.todo.add](../activities/todo/crm-activity-todo-add.md) или из списка методом [crm.activity.list](../activities/activity-base/crm-activity-list.md).

{% note tip "Частые кейсы и сценарии" %}

- [Как добавить комментарий в таймлайн смарт-процесса](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-comment-to-spa.md)

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [crm.timeline.note.save](./crm-timeline-note-save.md) | Сохраняет заметку ||
|| [crm.timeline.note.get](./crm-timeline-note-get.md) | Возвращает информацию о заметке ||
|| [crm.timeline.note.delete](./crm-timeline-note-delete.md) | Удаляет заметку ||
|#
