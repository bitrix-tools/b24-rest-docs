# Бронирование ресурсов: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Бронирование ресурсов позволяет записывать клиентов на услугу в определенное время. Ресурс — это то, что бронируют клиенты, например автомобиль, кабинет специалиста или дорожка для боулинга. Переговорные комнаты Календаря бронируют иначе: через параметр `location` методов [calendar.event.*](../calendar-event/index.md).

В Битрикс24 есть и [Онлайн-запись](../../booking/index.md) — самостоятельный инструмент со своими ресурсами, бронированиями и методами `booking.v1.*`. Ресурсы `calendar.resource.*` с ним не связаны.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как настроить бронирование ресурсов в CRM для записи клиентов](https://helpdesk.bitrix24.ru/open/18260410/)

## Как работает бронирование ресурсов

Ресурсы бронируют через пользовательское поле CRM типа `resourcebooking`. Такое поле можно создать в карточках лида и сделки. Методов `calendar.resource.*` для создания бронирований нет.

Технически ресурс — это календарь типа `resource`, а бронирование — событие в этом календаре. Поэтому метод `calendar.resource.booking.list` возвращает бронирования с полями [события календаря](../calendar-event/index.md).

## Как начать работу

1. Создайте ресурс методом [calendar.resource.add](./calendar-resource-add.md). Создать ресурс может администратор или пользователь с правом редактировать календари ресурсов.
2. Выберите ресурс в настройках поля `resourcebooking` в карточке лида или сделки. Через REST привязать ресурс к полю нельзя.
3. Когда клиентов запишут через поле, получите бронирования методом [calendar.resource.booking.list](./calendar-resource-booking-list.md): по ресурсам за период или по идентификаторам бронирований из поля.

{% note tip "Пользовательская документация" %}

- [Как работать в режиме просмотра Календарь в CRM](https://helpdesk.bitrix24.ru/open/18797220/)
- [Пользовательские поля в CRM](https://helpdesk.bitrix24.ru/open/22048980/)

{% endnote %}

## Связь ресурса с другими объектами

Ресурс связан с пользователем, который его создал, с пользовательскими полями CRM и с событиями REST.

**Пользователь.** В поле `CREATED_BY` ответа [calendar.resource.list](./calendar-resource-list.md) хранится идентификатор пользователя, который создал ресурс. Данные пользователя можно получить методом [user.get](../../user/user-get.md).

**Пользовательские поля CRM.** Идентификаторы бронирований хранятся в значении поля `resourcebooking`. Передайте их в параметр `filter.resourceIdList` метода [calendar.resource.booking.list](./calendar-resource-booking-list.md). Получить идентификаторы можно:
- универсальными методами — [crm.item.get](../../crm/universal/crm-item-get.md), [crm.item.list](../../crm/universal/crm-item-list.md)
- методами для лидов — [crm.lead.get](../../crm/leads/crm-lead-get.md), [crm.lead.list](../../crm/leads/crm-lead-list.md)
- методами для сделок — [crm.deal.get](../../crm/deals/crm-deal-get.md), [crm.deal.list](../../crm/deals/crm-deal-list.md)

Узнать, какие пользовательские поля имеют тип `resourcebooking`, можно методом получения списка полей:
- для лидов — [crm.lead.userfield.list](../../crm/leads/userfield/crm-lead-userfield-list.md)
- для сделок — [crm.deal.userfield.list](../../crm/deals/user-defined-fields/crm-deal-userfield-list.md)

**События REST.** При добавлении, изменении и удалении ресурса приходят события [OnCalendarSectionAdd](../events/on-calendar-section-add.md), [OnCalendarSectionUpdate](../events/on-calendar-section-update.md) и [OnCalendarSectionDelete](../events/on-calendar-section-delete.md). Как отличить ресурс от обычного календаря в обработчике, описано в [обзоре событий календаря](../events/index.md#section-or-resource).

## Обзор методов {#all-methods}

> Scope: [`calendar`](../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [calendar.resource.add](./calendar-resource-add.md) | Добавляет ресурс ||
|| [calendar.resource.update](./calendar-resource-update.md) | Меняет название ресурса ||
|| [calendar.resource.list](./calendar-resource-list.md) | Получает список ресурсов ||
|| [calendar.resource.delete](./calendar-resource-delete.md) | Удаляет ресурс вместе с бронированиями ||
|| [calendar.resource.booking.list](./calendar-resource-booking-list.md) | Получает бронирования ресурсов по фильтру ||
|#
