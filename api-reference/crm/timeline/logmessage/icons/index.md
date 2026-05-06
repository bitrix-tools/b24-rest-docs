# Иконки лог-записей: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Иконки лог-записей помогают визуально отличать записи в таймлайне CRM.

С помощью методов раздела можно добавить пользовательскую иконку, получить данные по коду, вывести список доступных иконок и удалить иконку.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Таймлайн в элементе CRM](https://helpdesk.bitrix24.ru/open/23960160/)

## Что учитывать перед вызовом методов

- Методами [crm.timeline.icon.add](./crm-timeline-icon-add.md) и [crm.timeline.icon.delete](./crm-timeline-icon-delete.md) управляет только администратор.
- Методы [crm.timeline.icon.get](./crm-timeline-icon-get.md) и [crm.timeline.icon.list](./crm-timeline-icon-list.md) доступны любому пользователю.
- Для создания иконки передавайте `fileContent` в `base64`. Используйте файл в формате `PNG` размером `24x24` пикселя с прозрачным фоном.
- В ответах методов [crm.timeline.icon.get](./crm-timeline-icon-get.md) и [crm.timeline.icon.list](./crm-timeline-icon-list.md) поле `isSystem` показывает тип иконки: `true` — системная, `false` — пользовательская.

## Как работать с иконками

1. Получите список доступных кодов через [crm.timeline.icon.list](./crm-timeline-icon-list.md).
2. Добавьте новую иконку методом [crm.timeline.icon.add](./crm-timeline-icon-add.md).
3. Проверьте иконку по коду методом [crm.timeline.icon.get](./crm-timeline-icon-get.md).
4. Удалите пользовательскую иконку методом [crm.timeline.icon.delete](./crm-timeline-icon-delete.md), если она больше не используется.

## Связь с другими объектами

**Журнал лог-записей.** Код иконки передается в поле `fields.iconCode` метода [crm.timeline.logmessage.add](../crm-timeline-logmessage-add.md). 

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [crm.timeline.icon.add](./crm-timeline-icon-add.md) | Добавляет новую иконку ||
|| [crm.timeline.icon.get](./crm-timeline-icon-get.md) | Получает информацию об иконке ||
|| [crm.timeline.icon.list](./crm-timeline-icon-list.md) | Получает список всех доступных иконок ||
|| [crm.timeline.icon.delete](./crm-timeline-icon-delete.md) | Удаляет иконку ||
|#
