# Лист ожидания: обзор методов

Добавляйте клиентов в лист ожидания, когда все слоты для бронирования заняты. Это помогает:

- сохранять контакты клиента и его пожелания
- при отмене записи оперативно предлагать клиентам освободившееся время

> Быстрый переход: [все методы](#all-methods) 
> 
> Пользовательская документация: [Онлайн-запись: как внести клиента в лист ожидания](https://helpdesk.bitrix24.ru/open/24846212/)

## Связь листа ожидания  с другими объектами

**Бронь.** Передавайте `id` [брони](../booking/booking-v1-booking-list.md) в параметр `bookingId` метода [booking.v1.waitlist.createfrombooking](./booking-v1-waitlist-createfrombooking.md), чтобы перенести клиента из брони в лист ожидания. 

**Клиент.** К записи в листе ожидания можно прикрепить [контакт](../../crm/contacts/index.md) или [компанию](../../crm/companies/index.md) из CRM. Передавайте `id` контакта или компании в методах [booking.v1.waitlist.client.*](./client/index.md).

**Сделка.** К записи в листе ожидания можно прикрепить [сделку](../../crm/deals/index.md) CRM. Передавайте `id` сделки в методах [booking.v1.waitlist.externalData.*](./external-data/index.md).

## Обзор методов {#all-methods}

> Scope: [`booking`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [booking.v1.waitlist.add](./booking-v1-waitlist-add.md) | Добавляет запись в лист ожидания ||
|| [booking.v1.waitlist.createfrombooking](./booking-v1-waitlist-createfrombooking.md) | Создает запись в листе ожидания из бронирования ||
|| [booking.v1.waitlist.delete](./booking-v1-waitlist-delete.md) | Удаляет запись из листа ожидания ||
|| [booking.v1.waitlist.get](./booking-v1-waitlist-get.md) | Получает запись из листа ожидания ||
|| [booking.v1.waitlist.list](./booking-v1-waitlist-list.md) | Получает список записей из листа ожидания ||
|| [booking.v1.waitlist.update](./booking-v1-waitlist-update.md) | Обновляет запись в листе ожидания ||
|#
