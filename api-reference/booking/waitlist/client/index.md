# Клиент в листе ожидания: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

К записи в листе ожидания можно добавить клиента: контакт или компанию. Клиенту придет уведомление, когда его запись перенесут на конкретное время.

> Быстрый переход: [все методы](#all-methods)

## Как начать работу

1. Создайте или найдите запись в листе ожидания методами [booking.v1.waitlist.*](../index.md)
2. Получите `ID` контакта или компании в CRM
3. Добавьте клиента методом [booking.v1.waitlist.client.set](./booking-v1-waitlist-client-set.md)
4. Проверьте привязанных клиентов методом [booking.v1.waitlist.client.list](./booking-v1-waitlist-client-list.md)

## Связь с другими объектами

**Лист ожидания.** Чтобы добавить или заменить клиента, используйте `ID` записи в листе ожидания в параметре `waitListId` методов [booking.v1.waitlist.client.*](./index.md). Получить `ID` записи можно методами [booking.v1.waitlist.add](../booking-v1-waitlist-add.md) или [booking.v1.waitlist.list](../booking-v1-waitlist-list.md).

**Контакт.** Чтобы прикрепить к записи в листе ожидания контакт, передайте `ID` контакта в методе [booking.v1.waitlist.client.set](./booking-v1-waitlist-client-set.md). Получить `ID` контакта можно методом [crm.item.list](../../../crm/universal/crm-item-list.md) с параметром `entityTypeId = 3`.

**Компания.** Чтобы прикрепить к записи в листе ожидания компанию, передайте `ID` компании в методе [booking.v1.waitlist.client.set](./booking-v1-waitlist-client-set.md). Получить `ID` компании можно методом [crm.item.list](../../../crm/universal/crm-item-list.md) с параметром `entityTypeId = 4`.

{% note info "" %}

Если клиент новый, предварительно добавьте его в CRM методом [crm.item.add](../../../crm/universal/crm-item-add.md) с параметром `entityTypeId = 3` для контакта или `entityTypeId = 4` для компании.

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [booking.v1.waitlist.client.set](./booking-v1-waitlist-client-set.md) | Добавляет контакт или компанию к записи в листе ожидания ||
|| [booking.v1.waitlist.client.list](./booking-v1-waitlist-client-list.md) | Возвращает контакт и компанию, привязанные к записи в листе ожидания ||
|| [booking.v1.waitlist.client.unset](./booking-v1-waitlist-client-unset.md) | Удаляет контакт или компанию из записи в листе ожидания ||
|#
