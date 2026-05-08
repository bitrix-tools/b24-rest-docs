# Связи записей таймлайна с элементами CRM: обзор методов

Группа методов `crm.timeline.bindings.*` управляет связями записи таймлайна с элементами CRM.

Например, комментарий нужно показывать в таймлайне сделки вместо лида. Для этого вы получаете идентификатор комментария, узнаете структуру полей связи, добавляете связь со сделкой, удаляете связь с лидом и при необходимости проверяете текущие связи записи.

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную документацию.

{% endnote %}

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Таймлайн в карточке CRM](https://helpdesk.bitrix24.ru/open/23960160/)

## Как начать работу

1. Получите `OWNER_ID` записи таймлайна
2. Определите `ENTITY_TYPE` и `ENTITY_ID` элемента CRM
3. Для проверки структуры полей связи используйте метод [crm.timeline.bindings.fields](./crm-timeline-bindings-fields.md)
4. Добавьте связь записи таймлайна с элементом CRM методом [crm.timeline.bindings.bind](./crm-timeline-bindings-bind.md)
5. Чтобы проверить текущие связи записи таймлайна, используйте метод [crm.timeline.bindings.list](./crm-timeline-bindings-list.md) с фильтром `OWNER_ID`
6. Удалите нужную связь методом [crm.timeline.bindings.unbind](./crm-timeline-bindings-unbind.md)

## Связь с другими объектами

**Комментарии таймлайна.** Все методы раздела принимают идентификатор записи таймлайна `OWNER_ID`. Возьмите `OWNER_ID` из ответа метода [crm.timeline.comment.add](../comments/crm-timeline-comment-add.md) или получите из списка методом [crm.timeline.comment.list](../comments/crm-timeline-comment-list.md).

**Элементы CRM.** Для связи записи таймлайна с элементом CRM передают строковый тип `ENTITY_TYPE` и идентификатор `ENTITY_ID`. Допустимые значения `ENTITY_TYPE`: `lead`, `deal`, `contact`, `company`, `order`. Идентификатор нужного элемента `ENTITY_ID` получают универсальным методом [crm.item.list](../../universal/crm-item-list.md).

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [crm.timeline.bindings.bind](./crm-timeline-bindings-bind.md) | Добавляет связь записи таймлайна с элементом CRM ||
|| [crm.timeline.bindings.list](./crm-timeline-bindings-list.md) | Возвращает список связей записи таймлайна ||
|| [crm.timeline.bindings.unbind](./crm-timeline-bindings-unbind.md) | Удаляет связь записи таймлайна с элементом CRM ||
|| [crm.timeline.bindings.fields](./crm-timeline-bindings-fields.md) | Возвращает описание полей связи ||
|#
