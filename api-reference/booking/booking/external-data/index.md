# Привязка объектов к бронированию: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

К бронированию можно привязать дополнительные объекты. Это помогает синхронизировать продажи и использовать автоматизацию, например роботов в сделке.

> Быстрый переход: [все методы](#all-methods)

## Как начать работу

1. Получите `ID` брони методом [booking.v1.booking.add](../booking-v1-booking-add.md) или [booking.v1.booking.list](../booking-v1-booking-list.md)
2. Получите `ID` сделки методом [crm.deal.add](../../../crm/deals/crm-deal-add.md) или [crm.deal.list](../../../crm/deals/crm-deal-list.md)
3. Установите связь методом [booking.v1.booking.externalData.set](./booking-v1-booking-externaldata-set.md). Передайте полный набор нужных связей: `ID` брони в `bookingId`, `ID` сделки в `value`, а также фиксированные значения `moduleId = crm` и `entityTypeId = DEAL`
4. Проверьте связь методом [booking.v1.booking.externalData.list](./booking-v1-booking-externaldata-list.md)
   
## Связь с другими объектами

**Бронирование.** Чтобы создать новую связь для бронирования, укажите `ID` брони в параметре `bookingId`. Получить `ID` можно методами [создания](../booking-v1-booking-add.md) или [фильтрации](../booking-v1-booking-list.md).

**Сделка.** Чтобы создать связь со сделкой, передайте `ID` сделки в параметр `value`. Получить `ID` можно методами [создания](../../../crm/deals/crm-deal-add.md) или [фильтрации](../../../crm/deals/crm-deal-list.md). Тип связанного объекта задают параметры `moduleId` и `entityTypeId`.

{% note warning "" %}

Метод `booking.v1.booking.externalData.set` заменяет весь текущий набор связей. Чтобы сохранить существующие связи, сначала получите их методом `booking.v1.booking.externalData.list` и передайте вместе с новыми.

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [booking.v1.booking.externalData.list](./booking-v1-booking-externaldata-list.md) | Получает все связи бронирования ||
|| [booking.v1.booking.externalData.set](./booking-v1-booking-externaldata-set.md) | Заменяет набор связей бронирования ||
|| [booking.v1.booking.externalData.unset](./booking-v1-booking-externaldata-unset.md) | Удаляет все связи бронирования ||
|#
