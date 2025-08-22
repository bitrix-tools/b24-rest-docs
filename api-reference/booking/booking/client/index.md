# Клиент в бронировании: обзор методов

К бронированию ресурса можно добавить клиента: контакт или компанию. На телефонный номер клиента отправляются сообщения о записи: подтверждение, напоминания, запрос обратной связи.

> Быстрый переход: [все методы](#all-methods) 

## Связь с другими объектами

**Бронирование.** Используйте `ID` брони в параметре `bookingId` методов [booking.v1.booking.client.*](./index.md), чтобы добавить или заменить клиента. Получить `ID` брони можно методами [создания](../booking-v1-booking-add.md) или [фильтрации](../booking-v1-booking-list.md).

**Контакт.** Чтобы прикрепить к брони контакт, передайте `ID` контакта в методе [booking.v1.booking.client.set](./booking-v1-booking-client-set). Получить `ID` контакта можно методом [crm.item.list](../../../crm/universal/crm-item-list.md) с параметром `entityTypeId = 3`.

**Компания.** Чтобы прикрепить к брони компанию, передайте `ID` компании в методе [booking.v1.booking.client.set](./booking-v1-booking-client-set). Получить `ID` компании можно методом [crm.item.list](../../../crm/universal/crm-item-list.md) с параметром `entityTypeId = 4`.

{% note info "" %}

Если клиент новый, предварительно добавьте его в CRM методом [crm.item.add](../../../crm/universal/crm-item-add.md) с параметром `entityTypeId = 3` для контакта или `entityTypeId = 4` для компании.

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| [booking.v1.booking.client.list](./booking-v1-booking-client-list.md) | Возвращает контакт и компанию, привязанные к бронированию ||
|| [booking.v1.booking.client.set](./booking-v1-booking-client-set.md) | Добавляет контакт или компанию к бронированию ||
|| [booking.v1.booking.client.unset](./booking-v1-booking-client-unset.md) | Удаляет контакт или компанию из бронирования ||
|#
