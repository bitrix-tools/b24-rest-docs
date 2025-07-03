# Бронирование: обзор методов

Методы бронирования позволяют:

- эффективно использовать ресурсы, перенося клиентов между листом ожидания и бронированием
- синхронизировать расписание с внешними системами

> Быстрый переход: [все методы](#all-methods) 
> 
> Пользовательская документация: [Как записать клиента на услугу](https://helpdesk.bitrix24.ru/open/23661964/)

## Связь бронирования  с другими объектами

**Лист ожидания.** Передавайте `id` записи из листа ожидания в параметр `waitListId` метода [booking.v1.booking.createfromwaitlist](./booking-v1-booking-createfromwaitlist.md), чтобы перенести запись клиента в бронирование на конкретное время.

**Ресурс.** Передавайте `id` [ресурсов](../resource/index.md), которые хотите забронировать, в параметре `resourceIds` методов [booking.v1.booking.*](./index.md). В одной брони может  быть несколько ресурсов с совпадающим временем. Например, можно забронировать одновременно услугу водителя и автомобиль.

**Клиент.** К брони можно прикрепить [контакт](../../crm/contacts/index.md) или [компанию](../../crm/companies/index.md) из CRM. Передавайте `id` контакта или компании в методах [booking.v1.booking.client.*](./client/index.md).

**Сделка.** К брони можно прикрепить [сделку](../../crm/deals/index.md) CRM. Передавайте `id` сделки в методах [booking.v1.booking.externalData.*](./external-data/index.md).

## Обзор методов {#all-methods}

> Scope: [`booking`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [booking.v1.booking.add](./booking-v1-booking-add.md) | Добавляет бронирование ||
|| [booking.v1.booking.createfromwaitlist](./booking-v1-booking-createfromwaitlist.md) | Создает бронирование из листа ожидания ||
|| [booking.v1.booking.delete](./booking-v1-booking-delete.md) | Удаляет бронирование ||
|| [booking.v1.booking.get](./booking-v1-booking-get.md) | Получает информацию о бронировании ||
|| [booking.v1.booking.list](./booking-v1-booking-list.md) | Получает список бронирований ||
|| [booking.v1.booking.update](./booking-v1-booking-update.md) | Обновляет бронирование ||
|#
