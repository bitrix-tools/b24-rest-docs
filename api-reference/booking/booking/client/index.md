# Клиент в бронировании: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

К бронированию ресурса можно добавить клиента: контакт или компанию. На телефонный номер клиента отправляются сообщения о записи: подтверждение, напоминания, запрос обратной связи.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как записать клиента на услугу из карточки CRM](https://helpdesk.bitrix24.ru/open/23758612/)

## Связь с другими объектами

**Бронирование.** Используйте `ID` брони в параметре `bookingId` методов [booking.v1.booking.client.*](./index.md), чтобы добавить или заменить клиента. Получить `ID` брони можно методами [создания](../booking-v1-booking-add.md) или [фильтрации](../booking-v1-booking-list.md).

**Контакт.** Чтобы прикрепить к брони контакт, передайте `ID` контакта в методе [booking.v1.booking.client.set](./booking-v1-booking-client-set.md). Получить `ID` контакта можно методом [crm.item.list](../../../crm/universal/crm-item-list.md) с параметром `entityTypeId = 3`.

**Компания.** Чтобы прикрепить к брони компанию, передайте `ID` компании в методе [booking.v1.booking.client.set](./booking-v1-booking-client-set.md). Получить `ID` компании можно методом [crm.item.list](../../../crm/universal/crm-item-list.md) с параметром `entityTypeId = 4`.

{% note info "" %}

Если клиент новый, предварительно добавьте его в CRM методом [crm.item.add](../../../crm/universal/crm-item-add.md) с параметром `entityTypeId = 3` для контакта или `entityTypeId = 4` для компании.

{% endnote %}

## Как начать работу

1. Получите `ID` брони методом [booking.v1.booking.add](../booking-v1-booking-add.md) или [booking.v1.booking.list](../booking-v1-booking-list.md)
2. Найдите контакт или компанию в CRM методом [crm.item.list](../../../crm/universal/crm-item-list.md)
3. Если клиента нет в CRM, создайте контакт или компанию методом [crm.item.add](../../../crm/universal/crm-item-add.md)
4. Передайте `ID` брони и клиента в метод [booking.v1.booking.client.set](./booking-v1-booking-client-set.md)
5. Проверьте привязку методом [booking.v1.booking.client.list](./booking-v1-booking-client-list.md)
6. При необходимости удалите клиента из брони методом [booking.v1.booking.client.unset](./booking-v1-booking-client-unset.md)

## Обзор методов {#all-methods}

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| [booking.v1.booking.client.list](./booking-v1-booking-client-list.md) | Возвращает контакт и компанию, привязанные к бронированию ||
|| [booking.v1.booking.client.set](./booking-v1-booking-client-set.md) | Добавляет контакт или компанию к бронированию ||
|| [booking.v1.booking.client.unset](./booking-v1-booking-client-unset.md) | Удаляет контакт или компанию из бронирования ||
|#
