# Типы ресурсов: обзор методов

Типы ресурсов нужны для категоризации объектов бронирования. Например, тип Переговорные объединяет комнаты для встреч, тип Chery — автомобили определенной марки.

С помощью типов ресурсов можно:
- группировать похожие объекты,
- настраивать шаблоны уведомлений для клиентов,
- фильтровать бронирования.

> Быстрый переход: [все методы](#all-methods) 

## Связь типов ресурсов  с другими объектами

**Ресурс.** Используйте `id` типа ресурса в параметре `typeId` методов [booking.v1.resource.*](../index.md).

## Особенности работы с типами ресурсов

Создать типы ресурсов можно через интерфейс Битрикс24 или методом [booking.v1.resourceType.add](./booking-v1-resourcetype-add.md). Изменить и удалить — только методами [booking.v1.resourceType.update](./booking-v1-resourcetype-update.md) и [booking.v1.resourceType.delete](./booking-v1-resourcetype-delete.md).

## Обзор методов {#all-methods}

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [booking.v1.resourceType.add](./booking-v1-resourcetype-add.md) | Добавляет новый тип ресурса ||
|| [booking.v1.resourceType.update](./booking-v1-resourcetype-update.md) | Обновляет тип ресурса ||
|| [booking.v1.resourceType.get](./booking-v1-resourcetype-get.md) | Получает тип ресурса ||
|| [booking.v1.resourceType.list](./booking-v1-resourcetype-list.md) | Получает список типов ресурсов ||
|| [booking.v1.resourceType.delete](./booking-v1-resourcetype-delete.md) | Удаляет тип ресурса ||
|#
