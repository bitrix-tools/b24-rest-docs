# Таймлайн и дела в CRM: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Таймлайн — это основное рабочее пространство в карточке элемента CRM. В нем фиксируется:

* системная информация о работе с элементом: смена стадии, оплата, создание элементов на основании текущего
* пользовательская информация: дела CRM (задачи, письма, звонки) и записи таймлайна (комментарии, сгенерированные по шаблону документы, лог-записи приложений)

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [таймлайн в Битрикс24](https://helpdesk.bitrix24.ru/open/23960160/), [универсальное дело в Битрикс24](https://helpdesk.bitrix24.ru/open/21064046/)

## Как выбрать раздел

В таймлайне два вида объектов: дела и записи таймлайна. У каждого своя группа методов.

#|
|| **Если вам нужно** | **Открывайте раздел** ||
|| Создать звонок, встречу, письмо или другое дело в карточке элемента | [Дела в CRM](./activities/index.md) ||
|| Оставить в карточке текстовый комментарий с файлами | [Комментарии таймлайна](./comments/index.md) ||
|| Записать в таймлайн служебное сообщение приложения | [Журнал лог-записей](./logmessage/index.md) ||
|| Привязать существующую запись таймлайна к другому элементу CRM | [Связи записей таймлайна](./bindings/index.md) ||
|| Добавить к делу или комментарию короткую заметку | [Заметки к записям таймлайна](./note/index.md) ||
|| Показать в записи таймлайна собственный интерфейс приложения | [Дополнительные контентные блоки](./layout-blocks/index.md) ||
|| Закрепить запись вверху таймлайна | [Действия с записями](./actions/index.md) ||
|#

## Дела

Дела в CRM делятся на входящие и запланированные:

* Входящие — дела, поступившие от клиента, например письмо или звонок. Для таких дел важно верно указать параметр `DIRECTION` = `1`, чтобы сработал счетчик входящих дел CRM
* Запланированные — дела, которые создают сотрудники, например задачи или универсальные дела

Подробнее о делах и методах управления ими — в статье [Дела в CRM: обзор методов](./activities/index.md).

## Записи таймлайна

Записи таймлайна делятся на два типа:

* Комментарии. Добавлять, удалять, изменять, получать комментарии можно через группу методов [crm.timeline.comment.*](./comments/index.md)
* Лог-записи. Добавлять, удалять, изменять, получать лог-записи можно через группу методов [crm.timeline.logmessage.*](./logmessage/index.md)

Управлять связями записей таймлайна с элементами CRM можно методами группы [crm.timeline.bindings.*](./bindings/index.md).

## Как начать работу

1. Определите элемент CRM, в таймлайне которого будете работать: его тип `entityTypeId` смотрите в справочнике [Тип объекта CRM](../data-types.md#object_type), идентификатор `entityId` возвращают методы [crm.item.list](../universal/crm-item-list.md) и [crm.item.add](../universal/crm-item-add.md).
2. Выберите объект: дело — методами [crm.activity.*](./activities/index.md), комментарий — методами [crm.timeline.comment.*](./comments/index.md), лог-запись — методами [crm.timeline.logmessage.*](./logmessage/index.md).
3. Создайте объект и сохраните его идентификатор из ответа.
4. При необходимости дополните запись: заметкой [crm.timeline.note.save](./note/crm-timeline-note-save.md), контентными блоками [crm.timeline.layout.blocks.set](./layout-blocks/crm-timeline-layout-blocks-set.md), закреплением [crm.timeline.item.pin](./actions/crm-timeline-item-pin.md).
5. Подпишитесь на события дел и комментариев, чтобы отслеживать изменения в реальном времени.

## Виджеты

В дела и записи таймлайна можно встроить приложение. Благодаря встройке можно будет использовать приложение и не покидать карточку CRM. Для встраивания используют специальные места, в таймлайне их два:

* [Кнопка над таймлайном карточки элемента](../../widgets/crm/detail-activity.md) `CRM_XXX_DETAIL_ACTIVITY`, `CRM_DYNAMIC_XXX_DETAIL_ACTIVITY`
* [Пункт контекстного меню дела в карточке элемента](../../widgets/crm/activity-timeline-menu.md) `CRM_XXX_ACTIVITY_TIMELINE_MENU`

{% note tip "Частые кейсы и сценарии" %}

- [Механизм встраивания виджетов](../../widgets/index.md)
- [Создать дела из приложений](./activities/app-embedding/activity-app.md)

{% endnote %}

## Дополнительные возможности

**Текстовые заметки** можно добавлять к делам и комментариям таймлайна и удалять их. Используйте группу методов [crm.timeline.note.*](./note/index.md).

**Контентные блоки** можно добавлять к комментариям таймлайна и удалять их. Используйте группу методов [crm.timeline.layout.blocks.*](./layout-blocks/index.md).

* [Доступные контентные блоки](./activities/configurable/structure/content-block.md)

## Обзор методов и событий {#all-methods}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

### Дела CRM

Методы дел раскрыты в разделе [Дела в CRM](./activities/index.md).

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.activity.*](./activities/activity-base/index.md) | Создают, изменяют, получают и удаляют дела всех типов ||
    || [crm.activity.binding.*](./activities/binding/index.md) | Управляют связями дела с элементами CRM ||
    || [crm.activity.type.*](./activities/types/index.md) | Управляют пользовательскими типами дел ||
    || [crm.activity.todo.*](./activities/todo/index.md) | Управляют универсальными делами ||
    || [crm.activity.configurable.*](./activities/configurable/index.md) | Управляют конфигурируемыми делами ||
    || [crm.activity.badge.*](./activities/configurable/badges/index.md) | Управляют бейджами конфигурируемых дел ||
    || [crm.activity.layout.blocks.*](./activities/layout-blocks/index.md) | Управляют контентными блоками в деле ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmActivityAdd](./activities/events/on-crm-activity-add.md) | При создании дела вручную или методом [crm.activity.add](./activities/activity-base/crm-activity-add.md) ||
    || [onCrmActivityUpdate](./activities/events/on-crm-activity-update.md) | При обновлении дела вручную или методом [crm.activity.update](./activities/activity-base/crm-activity-update.md) ||
    || [onCrmActivityDelete](./activities/events/on-crm-activity-delete.md) | При удалении дела вручную или методом [crm.activity.delete](./activities/activity-base/crm-activity-delete.md) ||
    |#

{% endlist %}

### Комментарии таймлайна

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.timeline.comment.add](./comments/crm-timeline-comment-add.md) | Добавляет новый комментарий в таймлайн ||
    || [crm.timeline.comment.update](./comments/crm-timeline-comment-update.md) | Обновляет комментарий ||
    || [crm.timeline.comment.get](./comments/crm-timeline-comment-get.md) | Получает информацию о комментарии ||
    || [crm.timeline.comment.list](./comments/crm-timeline-comment-list.md) | Получает список всех комментариев для элемента CRM ||
    || [crm.timeline.comment.delete](./comments/crm-timeline-comment-delete.md) | Удаляет комментарий ||
    || [crm.timeline.comment.fields](./comments/crm-timeline-comment-fields.md) | Получает список полей комментария таймлайна ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmTimelineCommentAdd](./comments/events/on-Crm-Timeline-Comment-Add.md) | При создании комментария вручную или методом [crm.timeline.comment.add](./comments/crm-timeline-comment-add.md) ||
    || [onCrmTimelineCommentUpdate](./comments/events/on-Crm-Timeline-Comment-Update.md) | При обновлении комментария вручную или методом [crm.timeline.comment.update](./comments/crm-timeline-comment-update.md) ||
    || [onCrmTimelineCommentDelete](./comments/events/on-Crm-Timeline-Comment-Delete.md) | При удалении комментария вручную или методом [crm.timeline.comment.delete](./comments/crm-timeline-comment-delete.md) ||
    |#

{% endlist %}

### Заметки к записи таймлайна

#|
|| **Метод** | **Описание** ||
|| [crm.timeline.note.get](./note/crm-timeline-note-get.md) | Получает информацию о заметке ||
|| [crm.timeline.note.save](./note/crm-timeline-note-save.md) | Сохраняет заметку ||
|| [crm.timeline.note.delete](./note/crm-timeline-note-delete.md) | Удаляет заметку ||
|#

### Управление связями записи таймлайна

#|
|| **Метод** | **Описание** ||
|| [crm.timeline.bindings.bind](./bindings/crm-timeline-bindings-bind.md) | Добавляет связь записи таймлайна с элементом CRM ||
|| [crm.timeline.bindings.list](./bindings/crm-timeline-bindings-list.md) | Получает список связей для записи в таймлайне ||
|| [crm.timeline.bindings.unbind](./bindings/crm-timeline-bindings-unbind.md) | Удаляет связь записи таймлайна с элементом CRM ||
|| [crm.timeline.bindings.fields](./bindings/crm-timeline-bindings-fields.md) | Получает поля связи элемента CRM и записи в таймлайне ||
|#

### Дополнительные контентные блоки

#|
|| **Метод** | **Описание** ||
|| [crm.timeline.layout.blocks.set](./layout-blocks/crm-timeline-layout-blocks-set.md) | Устанавливает набор дополнительных контентных блоков в запись таймлайна ||
|| [crm.timeline.layout.blocks.get](./layout-blocks/crm-timeline-layout-blocks-get.md) | Получает установленный приложением набор дополнительных контентных блоков для записи таймлайна ||
|| [crm.timeline.layout.blocks.delete](./layout-blocks/crm-timeline-layout-blocks-delete.md) | Удаляет установленный приложением набор дополнительных контентных блоков для записи таймлайна ||
|#

### Журнал лог-записей приложения

#|
|| **Метод** | **Описание** ||
|| [crm.timeline.logmessage.add](./logmessage/crm-timeline-logmessage-add.md) | Добавляет новую лог-запись в таймлайн ||
|| [crm.timeline.logmessage.get](./logmessage/crm-timeline-logmessage-get.md) | Получает информацию о лог-записи ||
|| [crm.timeline.logmessage.list](./logmessage/crm-timeline-logmessage-list.md) | Получает список всех лог-записей для определенного элемента ||
|| [crm.timeline.logmessage.delete](./logmessage/crm-timeline-logmessage-delete.md) | Удаляет лог-запись ||
|| [crm.timeline.icon.*](./logmessage/icons/index.md) | Управляют иконками записей ||
|| [crm.timeline.logo.*](./logmessage/logo/index.md) | Управляют логотипами записей ||
|#

### Действия с записями в таймлайне

#|
|| **Метод** | **Описание** ||
|| [crm.timeline.item.pin](./actions/crm-timeline-item-pin.md) | Закрепляет запись в таймлайне ||
|| [crm.timeline.item.unpin](./actions/crm-timeline-item-unpin.md) | Открепляет запись в таймлайне ||
|#
