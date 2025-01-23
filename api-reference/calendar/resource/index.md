# Бронирование ресурсов: обзор методов

Бронирование ресурсов — это возможность предоставлять услуги на определенное время. Ресурс — это то, что бронируют клиенты, например, автомобиль, переговорная комната или дорожка для боулинга.

> Быстрый переход: [все методы и события](#all-methods) 
> 
> Пользовательская документация: [настраиваем бронирование ресурсов в CRM](https://helpdesk.bitrix24.ru/open/18260410/)

## Как работает бронирование ресурсов

В Битрикс24 бронирование ресурсов осуществляется через пользовательское поле CRM типа `resourcebooking`. Такое поле можно создать в карточках лида и сделки.

Отслеживать занятость ресурсов можно в Календаре CRM. Технически ресурс — это секция календаря, а бронирование — это событие календаря. 

Добавляет новый ресурс метод [calendar.resource.add](./calendar-resource-add.md). Ресурс появится только в системе. Привязать его к пользовательскому полю объекта CRM можно только через карточку объекта в режиме редактирования поля.

Получить бронирования ресурсов можно методом [calendar.resource.booking.list](./calendar-resource-booking-list.md). Бронирование имеет набор полей, аналогичный полям события календаря. Некоторые поля остаются пустыми, так как они неактуальны для бронирования. 

{% note tip "Пользовательская документация" %}

- [Как работать в режиме просмотра Календарь в CRM](https://helpdesk.bitrix24.ru/open/18797220/)
- [Пользовательские поля в CRM](https://helpdesk.bitrix24.ru/open/22048980/)

{% endnote %}

## Связь ресурса с другими объектами

**Пользователь.** Ресурс связан с пользователем через идентификатор в поле `CREATED_BY`. Система автоматически устанавливает идентификатор пользователя, который создал ресурс.

**Пользовательские поля CRM.** Бронирования ресурсов в сделках и лидах привязаны к пользовательским полям типа `resourcebooking`. Получить идентификаторы бронирований можно:
- универсальными методами — [crm.item.get](../../crm/universal/crm-item-get.md), [crm.item.list](../../crm/universal/crm-item-list.md)
- методами для лидов — [crm.lead.get](../../crm/leads/crm-lead-get.md), [crm.lead.list](../../crm/leads/crm-lead-list.md)
- методами для сделок — [crm.deal.get](../../crm/deals/crm-deal-get.md), [crm.deal.list](../../crm/deals/crm-deal-list.md) 

Узнать какие пользовательские поля имеют тип resourcebooking можно методом получения списка полей:
- для лидов — [crm.lead.userfield.list](../../crm/leads/userfield/crm-lead-userfield-list.md) 
- для сделок — [crm.deal.userfield.list](../../crm/deals/user-defined-fields/crm-deal-userfield-list.md)

## Обзор методов {#all-methods}

> Scope: [`calendar`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [calendar.resource.add](./calendar-resource-add.md) | Добавить ресурс ||
|| [calendar.resource.update](./calendar-resource-update.md) | Обновить ресурс ||
|| [calendar.resource.list](./calendar-resource-list.md) | Получить список ресурсов ||
|| [calendar.resource.booking.list](./calendar-resource-booking-list.md) | Получить бронирования ресурсов по фильтру ||
|| [calendar.resource.delete](./calendar-resource-delete.md) | Удалить ресурс ||
|#