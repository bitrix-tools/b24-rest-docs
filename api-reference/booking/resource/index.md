# Ресурсы: обзор методов и событий

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Ресурсы — это объекты, которые можно забронировать: помещения, техника или услуги. Методы раздела создают, изменяют, находят и удаляют ресурсы, а доступное время и типы настраиваются в дочерних подразделах.

{% note info "" %}

Методы работают, только когда в настройках Битрикс24 включен инструмент «Бронирование». Иначе любой метод раздела вернет ошибку `Booking tool is disabled. Please contact your administrator.`

{% endnote %}

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [Онлайн-запись: как создать новый ресурс](https://helpdesk.bitrix24.ru/open/23661822/)

## Как начать работу

1. Создайте или получите тип ресурса методами [booking.v1.resourceType.*](./resource-type/index.md)
2. Создайте ресурс методом [booking.v1.resource.add](./booking-v1-resource-add.md)
3. Настройте доступное время методами [booking.v1.resource.slots.*](./slots/index.md)
4. Передайте `id` ресурса в параметре `resourceIds` методов [booking.v1.booking.*](../booking/index.md), чтобы ресурс участвовал в бронировании

## Связь ресурсов с другими объектами

**Бронь.** Передавайте `id` ресурсов в параметре `resourceIds` методов [booking.v1.booking.*](../booking/index.md). Одно бронирование может включать несколько ресурсов.

**Тип ресурса.** У типа есть собственные настройки уведомлений, но ресурс их не наследует: при создании ресурс получает свои значения по умолчанию. Настройки уведомлений задавайте прямо в [booking.v1.resource.add](./booking-v1-resource-add.md).

**Слоты.** Слоты задают время, когда ресурс доступен для бронирования: например, только по вторникам и четвергам с 11:00 до 15:00. Слоты хранятся в самом ресурсе, поэтому их изменение вызывает событие [onBookingResourceUpdate](./events/on-booking-resource-update.md), как и обновление ресурса.

## Обзор методов и событий {#all-methods}

> Scope: [`booking`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

### Ресурс

#|
|| **Метод** | **Описание** ||
|| [booking.v1.resource.add](./booking-v1-resource-add.md) | Добавляет новый ресурс ||
|| [booking.v1.resource.update](./booking-v1-resource-update.md) | Обновляет ресурс ||
|| [booking.v1.resource.get](./booking-v1-resource-get.md) | Получает ресурс ||
|| [booking.v1.resource.list](./booking-v1-resource-list.md) | Получает список ресурсов ||
|| [booking.v1.resource.delete](./booking-v1-resource-delete.md) | Удаляет ресурс ||
|#

### Тип ресурса

Подробнее — в разделе [Типы ресурсов](./resource-type/index.md).

#|
|| **Метод** | **Описание** ||
|| [booking.v1.resourceType.add](./resource-type/booking-v1-resourcetype-add.md) | Добавляет новый тип ресурса ||
|| [booking.v1.resourceType.update](./resource-type/booking-v1-resourcetype-update.md) | Обновляет тип ресурса ||
|| [booking.v1.resourceType.get](./resource-type/booking-v1-resourcetype-get.md) | Получает тип ресурса ||
|| [booking.v1.resourceType.list](./resource-type/booking-v1-resourcetype-list.md) | Получает список типов ресурсов ||
|| [booking.v1.resourceType.delete](./resource-type/booking-v1-resourcetype-delete.md) | Удаляет тип ресурса ||
|#

### Слоты

Подробнее — в разделе [Слоты](./slots/index.md).

#|
|| **Метод** | **Описание** ||
|| [booking.v1.resource.slots.set](./slots/booking-v1-resource-slots-set.md) | Устанавливает слоты для ресурса ||
|| [booking.v1.resource.slots.list](./slots/booking-v1-resource-slots-list.md) | Получает настройку слотов для ресурса ||
|| [booking.v1.resource.slots.unset](./slots/booking-v1-resource-slots-unset.md) | Удаляет слоты для ресурса ||
|#

### События

Как подписаться на события — в разделах [События ресурсов](./events/index.md) и [События типов ресурсов](./resource-type/events/index.md).

#|
|| **Событие** | **Вызывается** ||
|| [onBookingResourceAdd](./events/on-booking-resource-add.md) | При создании ресурса вручную или методом [booking.v1.resource.add](./booking-v1-resource-add.md) ||
|| [onBookingResourceUpdate](./events/on-booking-resource-update.md) | При обновлении ресурса вручную или методами [booking.v1.resource.update](./booking-v1-resource-update.md), [booking.v1.resource.slots.set](./slots/booking-v1-resource-slots-set.md), [booking.v1.resource.slots.unset](./slots/booking-v1-resource-slots-unset.md) ||
|| [onBookingResourceDelete](./events/on-booking-resource-delete.md) | При удалении ресурса вручную или методом [booking.v1.resource.delete](./booking-v1-resource-delete.md) ||
|| [onBookingResourceTypeAdd](./resource-type/events/on-booking-resource-type-add.md) | При создании типа ресурса вручную или методом [booking.v1.resourceType.add](./resource-type/booking-v1-resourcetype-add.md) ||
|| [onBookingResourceTypeUpdate](./resource-type/events/on-booking-resource-type-update.md) | При обновлении типа ресурса вручную или методом [booking.v1.resourceType.update](./resource-type/booking-v1-resourcetype-update.md) ||
|| [onBookingResourceTypeDelete](./resource-type/events/on-booking-resource-type-delete.md) | При удалении типа ресурса методом [booking.v1.resourceType.delete](./resource-type/booking-v1-resourcetype-delete.md) ||
|#
