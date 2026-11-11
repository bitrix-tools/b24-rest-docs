# Дела CRM в таймлайне: обзор методов

Дело CRM — запись в таймлайне, которая фиксирует взаимодействие с клиентом. Оно привязано к элементу CRM и отображается в его карточке.

Методы работы с делами CRM создают и обновляют универсальные дела, возвращают дело по идентификатору, получают список по фильтру, удаляют дело, возвращают расшифровку звонка и описывают поля.

Например, нужно убрать из таймлайна сделки звонок. Для этого получите список дел по сделке и удалите нужное дело.

{% note warning "" %}

**DEPRECATED**

Развитие методов [crm.activity.add](./crm-activity-add.md) и [crm.activity.update](./crm-activity-update.md) остановлено.
Для универсальных дел используйте методы [crm.activity.todo.add](../todo/crm-activity-todo-add.md) и [crm.activity.todo.update](../todo/crm-activity-todo-update.md). Для конфигурируемых дел используйте [методы конфигурируемых дел](../configurable/index.md).

{% endnote %}

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Таймлайн в карточке CRM](https://helpdesk.bitrix24.ru/open/23960160/)

## Как начать работу

1. Определите тип `ownerTypeId` и идентификатор `ownerId` элемента CRM, а также крайний срок дела `deadline`
2. Создайте универсальное дело методом [crm.activity.todo.add](../todo/crm-activity-todo-add.md)
3. Получите созданное универсальное дело методом [crm.activity.get](./crm-activity-get.md)
4. Для изменения универсального дела используйте метод [crm.activity.todo.update](../todo/crm-activity-todo-update.md)
5. Чтобы найти дела по фильтру, используйте метод [crm.activity.list](./crm-activity-list.md)
6. Удалите нужное дело методом [crm.activity.delete](./crm-activity-delete.md)

Чтобы получить расшифровку звонка или описание полей дела и коммуникации, выберите метод в [обзоре методов](#all-methods).

## Связь с другими объектами

**Элементы CRM.** При создании универсального дела укажите тип и идентификатор элемента CRM в параметрах `ownerTypeId` и `ownerId`. Типовые значения `ownerTypeId` для лидов, сделок, контактов и компаний возвращает метод [crm.enum.ownertype](../../../auxiliary/enum/crm-enum-owner-type.md). Для смарт-процессов используйте метод [crm.type.list](../../../universal/user-defined-object-types/crm-type-list.md). Идентификатор `ownerId` получите через универсальный метод [crm.item.list](../../../universal/crm-item-list.md).

**Связи дела.** Одно дело можно привязать к нескольким элементам CRM. Для управления связями — добавления, переноса и удаления — используйте методы группы [crm.activity.binding.*](../binding/index.md).

**Конфигурируемые дела.** Внешний вид записи в таймлайне настраивает приложение через параметр `layout`. Чтобы получить такое дело, используйте [crm.activity.configurable.get](../configurable/crm-activity-configurable-get.md). Другие дела получайте методом [crm.activity.get](./crm-activity-get.md).

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [crm.activity.todo.add](../todo/crm-activity-todo-add.md) | Добавляет универсальное дело в таймлайн ||
|| [crm.activity.todo.update](../todo/crm-activity-todo-update.md) | Обновляет универсальное дело ||
|| [crm.activity.get](./crm-activity-get.md) | Возвращает дело по идентификатору, кроме конфигурируемых дел ||
|| [crm.activity.list](./crm-activity-list.md) | Возвращает список дел по фильтру ||
|| [crm.activity.delete](./crm-activity-delete.md) | Удаляет дело ||
|| [crm.activity.call.getTranscript](./crm-activity-call-get-transcript.md) | Возвращает готовую расшифровку звонка ||
|| [crm.activity.fields](./crm-activity-fields.md) | Возвращает описание полей дела ||
|| [crm.activity.communication.fields](./crm-activity-communication-fields.md) | Возвращает описание полей коммуникации дела ||
|#

### Устаревшие методы

#|
|| **Метод** | **Описание** ||
|| [crm.activity.add](./crm-activity-add.md) | Создает системное дело ||
|| [crm.activity.update](./crm-activity-update.md) | Обновляет системное дело ||
|#
