# Клиент в листе ожидания: обзор методов

К записи в лист ожидания можно добавить клиента: контакт или компанию. Клиенту придет уведомление, когда его запись перенесут на конкретное время.

> Быстрый переход: [все методы](#all-methods) 

## Связь с другими объектами

**Лист ожидания**. Чтобы добавить или заменить клиента, используйте `ID` записи в лист ожидания в параметре `waitListId` методов  [booking.v1.waitlist.client.*](./index.md). Получить `ID` записи можно методами [создания](../booking-v1-waitlist-add.md) или [фильтрации](../booking-v1-waitlist-list.md).

**Контакт.** Чтобы прикрепить к записи в лист ожидания контакт, передайте `ID` контакта в методе [booking.v1.waitlist.client.set](./booking-v1-waitlist-client-set). Получить `ID` контакта можно методом [crm.item.list](../../../crm/universal/crm-item-list.md) с параметром `entityTypeId = 3`.

**Компания.** Чтобы прикрепить к записи в лист ожидания компанию, передайте `ID` компании в методе [booking.v1.waitlist.client.set](./booking-v1-waitlist-client-set). Получить `ID` компании можно методом [crm.item.list](../../../crm/universal/crm-item-list.md) с параметром `entityTypeId = 4`.

{% note info "" %}

Если клиент новый, предварительно добавьте его в CRM методом [crm.item.add](../../../crm/universal/crm-item-add.md) с параметром `entityTypeId = 3` для контакта или `entityTypeId = 4` для компании.

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| [booking.v1.waitlist.client.list](./booking-v1-waitlist-client-list.md) | Возвращает контакт и компанию, привязанные к записи в лист ожидания ||
|| [booking.v1.waitlist.client.set](./booking-v1-waitlist-client-set.md) | Добавляет контакт или компанию к записи в лист ожидания ||
|| [booking.v1.waitlist.client.unset](./booking-v1-waitlist-client-unset.md) | Удаляет контакт или компанию из записи в лист ожидания ||
|#
