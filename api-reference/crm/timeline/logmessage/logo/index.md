# Логотипы записей таймлайна: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Логотипы помогают визуально выделять конфигурируемые дела в таймлайне CRM.

С помощью методов раздела можно добавить пользовательский логотип, получить данные по коду, вывести список доступных логотипов и удалить логотип.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Таймлайн в элементе CRM](https://helpdesk.bitrix24.ru/open/23960160/)

## Что учитывать перед вызовом методов

- Методами [crm.timeline.logo.add](./crm-timeline-logo-add.md) и [crm.timeline.logo.delete](./crm-timeline-logo-delete.md) управляет только администратор.
- Методы [crm.timeline.logo.get](./crm-timeline-logo-get.md) и [crm.timeline.logo.list](./crm-timeline-logo-list.md) доступны любому пользователю.
- Для создания логотипа передавайте `fileContent` в `base64`. Используйте файл в формате `PNG` размером `60x60` пикселей.

## Как работать с логотипами

1. Получите список доступных кодов через [crm.timeline.logo.list](./crm-timeline-logo-list.md).
2. Добавьте новый логотип методом [crm.timeline.logo.add](./crm-timeline-logo-add.md).
3. Проверьте логотип по коду методом [crm.timeline.logo.get](./crm-timeline-logo-get.md).
4. Удалите пользовательский логотип методом [crm.timeline.logo.delete](./crm-timeline-logo-delete.md), если он больше не используется.

## Связь с другими объектами

**Конфигурируемые дела.** Код логотипа передается в поле `layout.body.logo.code` методов [crm.activity.configurable.add](../../activities/configurable/crm-activity-configurable-add.md) и [crm.activity.configurable.update](../../activities/configurable/crm-activity-configurable-update.md). Структура поля описана в объекте [LogoDto](../../activities/configurable/structure/body.md#logo-dto).

**Иконки лог-записей.** Логотип и иконка относятся к разным элементам таймлайна. Для поля `fields.iconCode` метода [crm.timeline.logmessage.add](../crm-timeline-logmessage-add.md) получайте коды методами [crm.timeline.icon.*](../icons/index.md).

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
