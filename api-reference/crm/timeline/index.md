# Таймлайн и дела в CRM: обзор методов

Таймлайн — это основное рабочее пространство в карточке элемента CRM. В нем фиксируется:

* системная информация о работе с элементом: смена стадии,  оплата, создание элементов на основании текущего
* пользовательская информация: дела CRM (задачи, письма, звонки) и записи таймлайна (комментарии, сгенерированные по шаблону документы, лог-записи приложений)

> Быстрый переход: [все методы и события](#all-methods) 
> 
> Пользовательская документация: [таймлайн в Битрикс24](https://helpdesk.bitrix24.ru/open/23960160/), [универсальное дело в Битрикс24](https://helpdesk.bitrix24.ru/open/21064046/)

## Дела

Дела в CRM делятся на входящие и запланированные:

* Входящие — дела, поступившие от клиента, например письмо или звонок. Для таких дел важно верно указать параметр `DIRECTION` = `1`, чтобы сработал счетчик входящих дел CRM
* Запланированные — дела, которые создают сотрудники, например задачи или универсальные дела
  
Подробнее о делах и методах управления ими — в статье [Дела в CRM: обзор методов](./activities/index.md).

## Таймлайн

Записи таймлайна делятся на два типа: 

* Комментарии. Добавлять, удалять, изменять, получать комментарии можно через группу методов [crm.timeline.comment.*](./comments/index.md)
* Лог-записи. Добавлять, удалять, изменять, получать лог-записи можно через группу методов [crm.timeline.logmessage.*](./logmessage/index.md)
  
Управлять связями записей таймлайна с элементами CRM можно методами группы [crm.timeline.bindings.*.](./bindings/index.md) 

## Виджеты

В дела и записи таймлайна можно встроить приложение. Благодаря встройке можно будет использовать приложение и не покидать карточку CRM. Для встраивания используют специальные места, в таймлайне их два:

* [Кнопка над таймлайном карточки элемента](../../widgets/crm/detail-activity.md) `CRM_XXX_DETAIL_ACTIVITY`, `CRM_DYNAMIC_XXX_DETAIL_ACTIVITY`
* [Пункт контекстного меню дела в карточке элемента](../../widgets/crm/activity-timeline-menu.md) `CRM_XXX_ACTIVITY_TIMELINE_MENU`

{% note tip "Частые кейсы и сценарии" %}

- [Механизм встройки виджетов](../../widgets/index.md)
- [Создать дела из приложений](./activities/app-embedding/activity-app.md)

{% endnote %}

## Дополнительные возможности 

**Текстовые заметки** можно добавлять к делам и комментариям таймлайна и  удалять их. Используйте группу методов [crm.timeline.note.*](./note/index.md).

**Контентные блоки** можно добавлять к комментариям таймлайна и удалять их. Используйте группу методов [crm.timeline.layout.blocks.*](./layout-blocks/index.md).

* [Доступные контентные блоки](./activities/configurable/structure/body.md#contentblockdto)


## Обзор методов и событий {#all-methods}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

### Комментарии таймлайна

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.timeline.comment.add](./comments/crm-timeline-comment-add.md)   | Добавляет новый комментарий в таймлайн ||
    || [crm.timeline.comment.update](./comments/crm-timeline-comment-update.md)  |  Обновляет комментарий ||
    || [crm.timeline.comment.get](./comments/crm-timeline-comment-get.md)   |  Получает информацию о комментарии ||
    || [crm.timeline.comment.list](./comments/crm-timeline-comment-list.md) |  Получает список всех комментариев для элемента CRM ||
    || [crm.timeline.comment.delete](./comments/crm-timeline-comment-delete.md)  |  Удаляет комментарий ||
    || [crm.timeline.comment.fields](./comments/crm-timeline-comment-fields.md)  | Получает список полей комментария таймлайна ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmTimelineCommentAdd](./comments/events/on-Crm-Timeline-Comment-Add.md) | При созданиии нового комментария в таймлайн ||
    || [onCrmTimelineCommentUpdate](./comments/events/on-Crm-Timeline-Comment-Update.md) | При обновление комментария в таймлайн  ||
    || [onCrmTimelineCommentDelete](./comments/events/on-Crm-Timeline-Comment-Delete.md) | При удалении комментария в таймлайн  ||
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
|| [crm.timeline.bindings.fields](./bindings/crm-timeline-bindings-fields.md) | Получает поля связи элементов CRM и записи в таймлайне таймлайна ||
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
