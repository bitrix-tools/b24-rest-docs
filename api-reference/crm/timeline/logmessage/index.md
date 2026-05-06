# Журнал лог-записей: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Журнал лог-записей — это служебные записи таймлайна для второстепенных событий. В интерфейсе они оформлены с более низким визуальным приоритетом: сдержанная иконка и менее акцентная подача, чем у ключевых событий.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Таймлайн в элементе CRM](https://helpdesk.bitrix24.ru/open/23960160/)

## Как работать с журналом лог-записей

1. Добавьте запись методом [crm.timeline.logmessage.add](./crm-timeline-logmessage-add.md).
2. Получите запись по идентификатору методом [crm.timeline.logmessage.get](./crm-timeline-logmessage-get.md).
3. Выведите список записей для элемента CRM методом [crm.timeline.logmessage.list](./crm-timeline-logmessage-list.md).
4. Удалите запись методом [crm.timeline.logmessage.delete](./crm-timeline-logmessage-delete.md), если она больше не нужна.
5. Настройте внешний вид записи через разделы [иконок](./icons/index.md) и [логотипов](./logo/index.md).

## Ключевые ограничения раздела

- Методы [crm.timeline.logmessage.get](./crm-timeline-logmessage-get.md) и [crm.timeline.logmessage.list](./crm-timeline-logmessage-list.md) возвращают только записи, созданные методом [crm.timeline.logmessage.add](./crm-timeline-logmessage-add.md). Системные записи с помощью этих методов получить нельзя.
- Запись можно удалить методом [crm.timeline.logmessage.delete](./crm-timeline-logmessage-delete.md) только в контексте того приложения, которое эту запись создало.

## Связь с другими объектами

**Элементы CRM.** Лог-запись создается для конкретного элемента CRM через поля `fields.entityTypeId` и `fields.entityId` метода [crm.timeline.logmessage.add](./crm-timeline-logmessage-add.md).

**Иконки лог-записей.** Управлять набором иконок можно методами [crm.timeline.icon.*](./icons/index.md), затем код иконки используется в `fields.iconCode` при создании записи.

**Логотипы лог-записей.** Управлять набором логотипов можно методами [crm.timeline.logo.*](./logo/index.md), чтобы поддерживать единый визуальный стиль лог-записей.

## Как выбрать иконку или логотип

- Используйте [crm.timeline.icon.*](./icons/index.md), когда нужно быстро маркировать тип события в лог-записи через `fields.iconCode`.
- Используйте [crm.timeline.logo.*](./logo/index.md), когда нужен отдельный набор брендированных изображений для лог-записей.
- Перед добавлением записи проверьте доступные коды через [crm.timeline.icon.list](./icons/crm-timeline-icon-list.md) и [crm.timeline.logo.list](./logo/crm-timeline-logo-list.md).

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

### Основные

#|
|| **Метод** | **Описание** ||
|| [crm.timeline.logmessage.add](./crm-timeline-logmessage-add.md) | Добавляет новую лог-запись в таймлайн ||
|| [crm.timeline.logmessage.get](./crm-timeline-logmessage-get.md) | Получает информацию о лог-записи ||
|| [crm.timeline.logmessage.list](./crm-timeline-logmessage-list.md) | Получает список всех лог-записей для определенного элемента ||
|| [crm.timeline.logmessage.delete](./crm-timeline-logmessage-delete.md) | Удаляет лог-запись ||
|#

### Иконки

#|
|| **Метод** | **Описание** ||
|| [crm.timeline.icon.add](./icons/crm-timeline-icon-add.md) | Добавляет новую иконку ||
|| [crm.timeline.icon.get](./icons/crm-timeline-icon-get.md) | Получает информацию об иконке ||
|| [crm.timeline.icon.list](./icons/crm-timeline-icon-list.md) | Получает список всех доступных иконок ||
|| [crm.timeline.icon.delete](./icons/crm-timeline-icon-delete.md) | Удаляет иконку ||
|#

### Логотипы

#|
|| **Метод** | **Описание** ||
|| [crm.timeline.logo.add](./logo/crm-timeline-logo-add.md) | Добавляет новый логотип ||
|| [crm.timeline.logo.get](./logo/crm-timeline-logo-get.md) | Получает информацию о логотипе ||
|| [crm.timeline.logo.list](./logo/crm-timeline-logo-list.md) | Получает список всех доступных логотипов ||
|| [crm.timeline.logo.delete](./logo/crm-timeline-logo-delete.md) | Удаляет логотип ||
|#
