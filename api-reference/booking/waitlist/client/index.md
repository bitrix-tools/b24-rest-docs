# Клиент в листе ожидания: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Клиенты записи в листе ожидания — контакты и компании CRM. Например, приложение может связать заявку на услугу с контактом клиента и компанией, которую он представляет.

> Быстрый переход: [все методы](#all-methods)

## Связь с другими объектами

**Лист ожидания.** Передайте `ID` записи в параметре `waitListId`, чтобы [установить список клиентов](./booking-v1-waitlist-client-set.md), [получить его](./booking-v1-waitlist-client-list.md) или [удалить все привязки](./booking-v1-waitlist-client-unset.md). Получить `ID` записи можно методами [booking.v1.waitlist.add](../booking-v1-waitlist-add.md) или [booking.v1.waitlist.list](../booking-v1-waitlist-list.md).

**Контакт.** В массиве `clients` метода [booking.v1.waitlist.client.set](./booking-v1-waitlist-client-set.md) передайте объект с `id` контакта и типом `type: {"module": "crm", "code": "CONTACT"}`. Получить `id` контакта можно методом [crm.item.list](../../../crm/universal/crm-item-list.md) с параметром `entityTypeId = 3`.

**Компания.** В массиве `clients` метода [booking.v1.waitlist.client.set](./booking-v1-waitlist-client-set.md) передайте объект с `id` компании и типом `type: {"module": "crm", "code": "COMPANY"}`. Получить `id` компании можно методом [crm.item.list](../../../crm/universal/crm-item-list.md) с параметром `entityTypeId = 4`.

{% note info "" %}

Если клиент новый, предварительно добавьте его в CRM методом [crm.item.add](../../../crm/universal/crm-item-add.md) с параметром `entityTypeId = 3` для контакта или `entityTypeId = 4` для компании.

{% endnote %}

## Как начать работу

1. Создайте запись в листе ожидания методом [booking.v1.waitlist.add](../booking-v1-waitlist-add.md) или найдите существующую методом [booking.v1.waitlist.list](../booking-v1-waitlist-list.md)
2. Найдите клиентов в CRM методом [crm.item.list](../../../crm/universal/crm-item-list.md)
3. Передайте `waitListId` и массив `clients` в метод [booking.v1.waitlist.client.set](./booking-v1-waitlist-client-set.md)
4. Проверьте привязки методом [booking.v1.waitlist.client.list](./booking-v1-waitlist-client-list.md)

{% note warning "" %}

Метод [booking.v1.waitlist.client.set](./booking-v1-waitlist-client-set.md) заменяет весь список клиентов записи переданным набором. Ранее привязанные клиенты, которых нет в новом списке, потеряют связь с записью.

Если список уже пуст, а к записи привязана [сделка](../external-data/index.md), метод [booking.v1.waitlist.client.unset](./booking-v1-waitlist-client-unset.md) и вызов [booking.v1.waitlist.client.set](./booking-v1-waitlist-client-set.md#empty-clients) с `clients: []` привяжут к записи контакты и компанию этой сделки.

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [booking.v1.waitlist.client.set](./booking-v1-waitlist-client-set.md) | Устанавливает список клиентов записи ||
|| [booking.v1.waitlist.client.list](./booking-v1-waitlist-client-list.md) | Возвращает список клиентов записи ||
|| [booking.v1.waitlist.client.unset](./booking-v1-waitlist-client-unset.md) | Удаляет все привязки клиентов к записи ||
|#
