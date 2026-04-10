# Шаблоны задач: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Шаблоны задач помогают заранее описать типовой сценарий работы и использовать единый набор настроек для новых задач. В шаблоне можно сохранить название и описание задачи, участников, сроки, проект, повторение, чек-лист и другие поля.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как работать с шаблонами задач](https://helpdesk.bitrix24.ru/open/27889912/)

## Как начать работу

1. Определите состав полей шаблона на странице [Поля шаблона задачи](./fields.md) или получите их описание методом [tasks.template.fields](./tasks-template-fields.md)
2. Если шаблон должен создавать повторяющиеся задачи, настройте поля `REPLICATE` и `REPLICATE_PARAMS`
3. Получите идентификаторы пользователей, групп и объектов CRM, если привязки к перечисленным объектам нужны в шаблоне
4. Создайте шаблон методом [tasks.template.add](./tasks-template-add.md)
5. Получите шаблон методом [tasks.template.get](./tasks-template-get.md), если нужно проверить сохраненные значения
6. Измените шаблон методом [tasks.template.update](./tasks-template-update.md), если нужно скорректировать параметры
7. Добавьте пункты чек-листа методами раздела [Чек-листы шаблонов задач](./checklist/index.md), если задача состоит из повторяющихся шагов
8. Удалите шаблон методом [tasks.template.delete](./tasks-template-delete.md), если он больше не нужен

## Права доступа

Права на работу с шаблонами задачи зависят от настроек доступа в задачах.

{% note tip "Пользовательская документация" %}

- [Как настроить права доступа в задачах Битрикс24](https://helpdesk.bitrix24.ru/open/27846332/)

{% endnote %}

## Связь с другими объектами

**Задачи.** Шаблон хранит настройки будущей задачи: название, описание, сроки, ответственных, наблюдателей, чек-лист и другие параметры. Для работы с задачами используйте методы раздела [Задачи](../index.md).

**Пользователи.** В шаблоне можно задать постановщика, основного исполнителя, соисполнителей и наблюдателей через поля `CREATED_BY`, `RESPONSIBLE_ID`, `RESPONSIBLES`, `ACCOMPLICES`, `AUDITORS`. Идентификаторы пользователей можно получить методами [user.get](../../user/user-get.md) и [user.search](../../user/user-search.md).

**Группы и проекты.** Чтобы привязать шаблон к группе или проекту, используйте поле `GROUP_ID`. Это позволяет создавать задачи в нужном рабочем пространстве. Идентификатор группы или проекта можно получить методами [sonet_group.get](../../sonet-group/sonet-group-get.md) и [socialnetwork.api.workgroup.list](../../sonet-group/socialnetwork-api-workgroup-list.md).

**CRM.** В шаблоне можно заранее сохранить привязку к объектам CRM. В поле `UF_CRM_TASK` укажите идентификаторы объектов CRM c префиксом, например `L_15` для лида или `D_27` для сделки. Идентификаторы существующих элементов можно получить методом [crm.item.list](../../crm/universal/crm-item-list.md). Если объект нужно сначала создать, используйте [crm.item.add](../../crm/universal/crm-item-add.md).

**Чек-листы.** Если типовая задача состоит из повторяющихся шагов, добавьте их в шаблон через методы подраздела [Чек-листы шаблонов задач](./checklist/index.md).

## Обзор методов {#all-methods}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Основные методы

#|
|| **Метод** | **Описание** ||
|| [tasks.template.add](./tasks-template-add.md) | Добавляет шаблон задачи ||
|| [tasks.template.update](./tasks-template-update.md) | Изменяет шаблон задачи ||
|| [tasks.template.get](./tasks-template-get.md) | Получает шаблон задачи по `id` ||
|| [tasks.template.delete](./tasks-template-delete.md) | Удаляет шаблон задачи ||
|| [tasks.template.fields](./tasks-template-fields.md) | Получает описание полей шаблона задачи ||
|#

### Чек-листы шаблонов задач

#|
|| **Метод** | **Описание** ||
|| [tasks.template.checklist.add](./checklist/tasks-template-checklist-add.md) | Добавляет пункт чек-листа ||
|| [tasks.template.checklist.update](./checklist/tasks-template-checklist-update.md) | Обновляет пункт чек-листа ||
|| [tasks.template.checklist.get](./checklist/tasks-template-checklist-get.md) | Получает пункт чек-листа по `id` ||
|| [tasks.template.checklist.list](./checklist/tasks-template-checklist-list.md) | Получает список пунктов чек-листа ||
|| [tasks.template.checklist.delete](./checklist/tasks-template-checklist-delete.md) | Удаляет пункт чек-листа ||
|| [tasks.template.checklist.moveAfter](./checklist/tasks-template-checklist-move-after.md) | Перемещает пункт после указанного ||
|| [tasks.template.checklist.moveBefore](./checklist/tasks-template-checklist-move-before.md) | Перемещает пункт перед указанным ||
|| [tasks.template.checklist.complete](./checklist/tasks-template-checklist-complete.md) | Отмечает пункт как выполненный ||
|| [tasks.template.checklist.renew](./checklist/tasks-template-checklist-renew.md) | Возвращает пункт в невыполненное состояние ||
|| [tasks.template.checklist.addAttachmentByContent](./checklist/tasks-template-checklist-add-attachment-by-content.md) | Добавляет вложение из содержимого ||
|| [tasks.template.checklist.addAttachmentsFromDisk](./checklist/tasks-template-checklist-add-attachments-from-disk.md) | Добавляет вложения из Диска ||
|| [tasks.template.checklist.removeAttachments](./checklist/tasks-template-checklist-remove-attachments.md) | Удаляет вложения пункта чек-листа ||
|#
