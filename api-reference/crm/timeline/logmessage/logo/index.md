# Логотипы лог-записей: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Логотипы лог-записей помогают визуально выделять записи в таймлайне CRM.

С помощью методов раздела можно добавить пользовательский логотип, получить данные по коду, вывести список доступных логотипов и удалить логотип.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Таймлайн в элементе CRM](https://helpdesk.bitrix24.ru/open/23960160/)

## Что учитывать перед вызовом методов

- Методами [crm.timeline.logo.add](./crm-timeline-logo-add.md) и [crm.timeline.logo.delete](./crm-timeline-logo-delete.md) управляет только администратор.
- Методы [crm.timeline.logo.get](./crm-timeline-logo-get.md) и [crm.timeline.logo.list](./crm-timeline-logo-list.md) доступны любому пользователю.
- Для создания логотипа передавайте `fileContent` в `base64`. Используйте файл в формате `PNG` размером `60x60` пикселей с прозрачным фоном.

## Как работать с логотипами

1. Получите список доступных кодов через [crm.timeline.logo.list](./crm-timeline-logo-list.md).
2. Добавьте новый логотип методом [crm.timeline.logo.add](./crm-timeline-logo-add.md).
3. Проверьте логотип по коду методом [crm.timeline.logo.get](./crm-timeline-logo-get.md).
4. Удалите пользовательский логотип методом [crm.timeline.logo.delete](./crm-timeline-logo-delete.md), если он больше не используется.

## Связь с другими объектами

**Журнал лог-записей.** Логотипы относятся к разделу [Журнал лог-записей](../index.md), где собраны методы создания, чтения и удаления лог-записей.

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [crm.timeline.logo.add](./crm-timeline-logo-add.md) | Добавляет новый логотип ||
|| [crm.timeline.logo.get](./crm-timeline-logo-get.md) | Получает информацию о логотипе ||
|| [crm.timeline.logo.list](./crm-timeline-logo-list.md) | Получает список всех доступных логотипов ||
|| [crm.timeline.logo.delete](./crm-timeline-logo-delete.md) | Удаляет логотип ||
|#
