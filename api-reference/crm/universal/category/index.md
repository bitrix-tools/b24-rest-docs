# Воронки CRM: обзор методов

Методы `crm.category.*` управляют воронками CRM-объектов, которые поддерживают категории: создают новые воронки, изменяют настройки, получают данные по `id` или список воронок, удаляют воронку и возвращают состав полей.

Воронки используют, чтобы разделить работу по отделам или типам продаж. Чаще всего их настраивают для сделок и смарт-процессов. Например, чтобы добавить сделку в конкретную воронку, получают `id` воронки методом [crm.category.list](./crm-category-list.md) и передают его как `categoryId` в [crm.item.add](../crm-item-add.md).

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Воронки продаж: как в CRM разделить работу по отделам](https://helpdesk.bitrix24.ru/open/20732764/)

## Как начать работу

1. Создайте воронку методом [crm.category.add](./crm-category-add.md)

2. Привяжите воронку к нужному CRM-объекту в методах [crm.item.add](../crm-item-add.md) или [crm.item.update](../crm-item-update.md), передав `id` воронки как `categoryId`

3. Чтобы проверить настройки конкретной воронки, получите ее данные по `id` методом [crm.category.get](./crm-category-get.md)

4. Если нужно изменить параметры воронки, используйте метод [crm.category.update](./crm-category-update.md)

5. Получить список воронок помогает метод [crm.category.list](./crm-category-list.md)

6. Состав доступных полей возвращает метод [crm.category.fields](./crm-category-fields.md)

7. Для удаления воронки используйте метод [crm.category.delete](./crm-category-delete.md)

{% note tip "Частые кейсы и сценарии" %}

- [Как создать новую воронку со стадиями в смарт-процессе](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-category-to-spa.md)
- [Как отфильтровать элементы по названию стадии](../../../../tutorials/crm/how-to-get-lists/how-to-get-elements-by-stage-filter.md)
- [Как создать поставщика](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-contractor.md)
- [Как получить список поставщиков](../../../../tutorials/crm/how-to-get-lists/how-to-get-contractors.md)

{% endnote %}

## Что важно учитывать

**Права доступа.** Метод [crm.category.list](./crm-category-list.md) доступен любому пользователю, но возвращает только те воронки, к которым у пользователя есть права на чтение. Методы создания, изменения и удаления требуют административного доступа к CRM.

**Воронка по умолчанию.** Поле `isDefault` ведет себя по-разному в зависимости от объекта. В сделках его нельзя изменять. В смарт-процессах можно назначить новую воронку по умолчанию — тогда старая потеряет этот статус. Убрать флаг `isDefault` с текущей воронки по умолчанию нельзя.

**Удаление воронки.** Метод [crm.category.delete](./crm-category-delete.md) вернет ошибку, если воронка является воронкой по умолчанию или содержит элементы.

## Связь с другими объектами

**Сделки.** Метод [crm.category.list](./crm-category-list.md) работает с воронками [сделок](../../deals/index.md). В сделках воронка привязывается к элементу через поле `categoryId`.

**Смарт-процессы.** Воронки в смарт-процессе работают, если у типа объекта включена опция `isCategoriesEnabled`. Проверить настройку и получить `entityTypeId` смарт-процесса можно методом [crm.type.list](../user-defined-object-types/crm-type-list.md).

**Стадии.** Каждая воронка определяет свой справочник стадий с уникальным `ENTITY_ID`. Для работы со стадиями используйте методы раздела [Справочники в CRM](../../status/index.md). Идентификаторы справочников возвращает метод [crm.status.entity.types](../../status/crm-status-entity-types.md).

**Карточки сделок.** Настройки карточек сделок зависят от воронки. Чтобы настроить карточку для конкретной воронки, передайте `id` воронки как `dealCategoryId` в методах [crm.deal.details.configuration.get](../../deals/custom-form/crm-deal-details-configuration-get.md) и [crm.deal.details.configuration.set](../../deals/custom-form/crm-deal-details-configuration-set.md).

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [crm.category.add](./crm-category-add.md) | Создает новую воронку ||
|| [crm.category.update](./crm-category-update.md) | Обновляет воронку ||
|| [crm.category.get](./crm-category-get.md) | Возвращает воронку по `id` ||
|| [crm.category.list](./crm-category-list.md) | Возвращает список воронок ||
|| [crm.category.delete](./crm-category-delete.md) | Удаляет воронку ||
|| [crm.category.fields](./crm-category-fields.md) | Возвращает описание полей воронки ||
|#
