# Календарь: обзор методов

Календарь  помогает пользователям планировать встречи, задачи и мероприятия. Управлять календарями можно с помощью группы методов [calendar.section.*](#base).

События календаря — это запланированные дела или встречи. Для создания, изменения, получения или удаления событий используется группа методов [calendar.event.*](./calendar-event/index.md).

> Быстрый переход: [все методы и события](#all-methods) 
> 
> Пользовательская документация: [календарь Битрикс24](https://helpdesk.bitrix24.ru/open/17525000/)

## Связь календаря с другими объектами

**Пользователь.** Календарь имеет привязку к пользователю по идентификатору владельца календаря `ownerId` для типа календаря `user`. Получить идентификатор пользователя можно с помощью метода [user.get](../user/user-get.md).

**Группа.** Календарь имеет привязку к группе по идентификатору владельца календаря `ownerId` для типа календаря `group`. Идентификатор можно получить методом [создания новой группы](../sonet-group/sonet-group-create.md) или методом [получения списка групп](../sonet-group/socialnetwork-api-workgroup-list.md).

{% note tip "Пользовательская документация" %}

- [Как создать группу и проект](https://helpdesk.bitrix24.ru/open/22699004/)

{% endnote %}

## Настройки календаря

В основных настройках календаря указывается рабочий график компании, выходные и праздничные дни. Получить настройки можно методом [calendar.settings.get](./calendar-settings-get.md).

В пользовательских настройках сотрудник может указать персональные особенности, например, часовой пояс или показ номеров недель. Получить пользовательские настройки можно методом [calendar.user.settings.get](./calendar-user-settings-get.md), установить — методом [calendar.user.settings.set.](./calendar-user-settings-set.md)

{% note tip "Пользовательская документация" %}

-  [Настройки календаря](https://helpdesk.bitrix24.ru/open/7397539/)

{% endnote %}

## Бронирование ресурсов

В Битрикс24 бронирование ресурсов осуществляется через пользовательское поле CRM типа `resourcebooking`. Такое поле можно создать в карточках [лида](../crm/leads/userfield/index.md) и [сделки](../crm/deals/user-defined-fields/index.md).

Отслеживать занятость ресурсов можно в Календаре CRM. Технически ресурс — это секция календаря, а бронирование — это событие календаря.

Управляет ресурсами группа методов [calendar.resource.\*.](./resource/index.md)

{% note tip "Пользовательская документация" %}

-  [Настраиваем бронирование ресурсов в CRM](https://helpdesk.bitrix24.ru/open/18260410/)

{% endnote %}

## **Виджеты**

В календарь можно встроить приложение. В списке видов отображения календаря есть место для встройки `CALENDAR_GRIDVIEW`, куда можно добавить [свой пункт](../widgets/calendar.md).

{% note tip "Частые кейсы и сценарии" %}

-  [{#T}](../widgets/index.md)
-  [{#T}](./calendar-grid-veiw.md)

{% endnote %}

## Обзор методов и событий {#all-methods}

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Основные {#base}

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [calendar.section.add](./calendar-section-add.md) | Добавить новый календарь ||
    || [calendar.section.update](./calendar-section-update.md) | Обновить календарь ||
    || [calendar.section.get](./calendar-section-get.md) | Получить список календарей ||
    || [calendar.section.delete](./calendar-section-delete.md) | Удалить календарь ||
    || [calendar.settings.get](./calendar-settings-get.md) | Получить основные настройки календаря ||
    || [calendar.user.settings.get](./calendar-user-settings-get.md) | Получить пользовательские настройки календаря ||
    || [calendar.user.settings.set](./calendar-user-settings-set.md) | Установить пользовательские настройки календаря ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [OnCalendarSectionAdd](./events/on-calendar-section-add.md) | При добавлении секции календаря или ресурса ||
    || [OnCalendarSectionUpdate](./events/on-calendar-section-update.md) | При изменении секции календаря или ресурса ||
    || [OnCalendarSectionDelete](./events/on-calendar-section-delete.md) | При удалении секции календаря или ресурса ||
    |#

{% endlist %}

## События календаря

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [calendar.event.add](./calendar-event/calendar-event-add.md) | Добавить событие ||
    || [calendar.event.update](./calendar-event/calendar-event-update.md) | Обновить событие ||
    || [calendar.event.getById](./calendar-event/calendar-event-get-by-id.md) | Получить событие по `id` ||
    || [calendar.event.get](./calendar-event/calendar-event-get.md) | Получить список событий календаря ||
    || [calendar.event.getNearest](./calendar-event/calendar-event-get-nearest.md) | Получить список будущих событий ||
    || [calendar.event.delete](./calendar-event/calendar-event-delete.md) | Удалить событие ||
    || [calendar.meeting.status.get](./calendar-event/calendar-meeting-status-get.md) | Получить статус участия текущего пользователя в событии ||
    || [calendar.meeting.status.set](./calendar-event/calendar-meeting-status-set.md) | Установить статус участия в событии для текущего пользователя ||
    || [calendar.accessibility.get](./calendar-event/calendar-accessibility-get.md) | Получить занятость пользователей из списка ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [OnCalendarEntryAdd](./calendar-event/events/on-calendar-entry-add.md) | При добавлении события ||
    || [OnCalendarEntryUpdate](./calendar-event/events/on-calendar-entry-update.md) | При изменении события ||
    || [OnCalendarEntryDelete](./calendar-event/events/on-calendar-entry-delete.md) | При удалении события ||
    |#

{% endlist %}

## Бронирование ресурсов

#|
|| **Метод** | **Описание** ||
|| [calendar.resource.add](./resource/calendar-resource-add.md) | Добавить ресурс ||
|| [calendar.resource.update](./resource/calendar-resource-update.md) | Обновить ресурс ||
|| [calendar.resource.list](./resource/calendar-resource-list.md) | Получить список ресурсов ||
|| [calendar.resource.booking.list](./resource/calendar-resource-booking-list.md) | Получить бронирования ресурсов по фильтру ||
|| [calendar.resource.delete](./resource/calendar-resource-delete.md) | Удалить ресурс ||
|#