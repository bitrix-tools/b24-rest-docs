# События календаря: обзор методов

События календаря — это запланированные дела или встречи. Они содержат информацию о дате, времени, месте проведения и участниках события. События помогают пользователям управлять расписанием, напоминают о предстоящих делах и встречах.

> Быстрый переход: [все методы и события](#all-methods) 
> 
> Пользовательская документация: [как создать событие в календаре](https://helpdesk.bitrix24.ru/open/5257065/)

## Связь события календаря с другими объектами

**Пользователь.** Событие имеет привязку к пользователю по идентификатору владельца календаря `ownerId` для типа календаря `user`. Если событие — встреча с участниками `is_meeting = 'Y'`, то оно дополнительно привязано к организатору события `host` и участникам `attendees`. Получить идентификатор пользователя можно с помощью метода [user.get](../../user/user-get.md).

**Группа.** Событие имеет привязку к группе по идентификатору владельца календаря `ownerId` для типа календаря `group`. Идентификатор можно получить методом [создания новой группы](../../sonet-group/sonet-group-create.md) или методом [получения списка групп](../../sonet-group/socialnetwork-api-workgroup-list.md).

**Объекты CRM.** К событию можно привязать объекты CRM: компании, контакты, лиды и сделки. Чтобы привязать объекты, перечислите их идентификаторы с [префиксами](../../crm/data-types.md#object_type) в параметре `crm_fields`. Например, `C_3` для контакта с `id = 3`. Получить идентификатор можно методом [создания нового элемента CRM](../../crm/universal/crm-item-add.md) или методом [получения списка элементов](../../crm/universal/crm-item-list.md).

{% note tip "Пользовательская документация" %}

- [Календарь Битрикс24](https://helpdesk.bitrix24.ru/open/17525000/)
- [Как создать группу и проект](https://helpdesk.bitrix24.ru/open/22699004/)

{% endnote %}

## Список событий

Получить список событий календаря можно двумя методами:
- [calendar.event.get](./calendar-event-get.md) — возвращает список любых событий, прошедших и будущих, за указанный период
- [calendar.event.get.nearest](./calendar-event-get-nearest.md) — возвращает список только будущих событий за указанное количество дней

## Участие пользователя в событии
Пользователь решает, участвовать в событии или нет. Решение фиксируется в статусе участия и может иметь значение:
- `Y` — согласен
- `N` — отказался
- `Q` — приглашен, но еще не ответил

Узнать статус участия текущего пользователя в событии можно методом [calendar.meeting.status.get](./calendar-meeting-status-get.md). Установить статус — методом [calendar.meeting.status.set](./calendar-meeting-status-set.md).

Метод [calendar.accessibility.get](./calendar-accessibility-get.md) получает занятость пользователей из списка.

## Обзор методов и событий {#all-methods}

> Scope: [`calendar`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [calendar.event.add](./calendar-event-add.md) | Добавить событие ||
    || [calendar.event.update](./calendar-event-update.md) | Обновить событие ||
    || [calendar.event.getById](./calendar-event-get-by-id.md) | Получить событие по `id` ||
    || [calendar.event.get](./calendar-event-get.md) | Получить список событий календаря ||
    || [calendar.event.getNearest](./calendar-event-get-nearest.md) | Получить список будущих событий ||
    || [calendar.event.delete](./calendar-event-delete.md) | Удалить событие ||
    || [calendar.meeting.status.get](./calendar-meeting-status-get.md) | Получить статус участия текущего пользователя в событии ||
    || [calendar.meeting.status.set](./calendar-meeting-status-set.md) | Установить статус участия в событии для текущего пользователя ||
    || [calendar.accessibility.get](./calendar-accessibility-get.md) | Получить занятость пользователей из списка ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [OnCalendarEntryAdd](./events/on-calendar-entry-add.md) | При добавлении события ||
    || [OnCalendarEntryUpdate](./events/on-calendar-entry-update.md) | При изменении события ||
    || [OnCalendarEntryDelete](./events/on-calendar-entry-delete.md) | При удалении события ||
    |#

{% endlist %}