# Слоты: обзор методов

Слоты — это промежутки времени, в которые можно забронировать ресурс.

> Быстрый переход: [все методы](#all-methods) 

## Связь слотов  с другими объектами

**Ресурс.** Чтобы задать промежутки времени для бронирования, укажите  `id` ресурса в параметре `resourceId` метода [booking.v1.resource.slots.set](./booking-v1-resource-slots-set.md).

## Особенности слотов

У слотов есть три временных параметра: период доступности ресурса `from` и `to`, длительность записи `slotSize`. Временные параметры принимают и возвращают значение в минутах. Расчет времени производите от начала суток 0:00. Для перевода часов в минуты используйте формулу `часы × 60 = минуты`, 14:00  = 14 × 60 = 840 минут:

- `from: 540` — время для брони доступно с 9:00,

- `to: 1080` — время для брони доступно до 18:00,

- `slotSize: 60` — длительность записи 1 час.

## Обзор методов {#all-methods}

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [booking.v1.resource.slots.set](./booking-v1-resource-slots-set.md) | Устанавливает слоты для ресурса ||
|| [booking.v1.resource.slots.list](./booking-v1-resource-slots-list.md) | Получает настройку слотов для ресурса ||
|| [booking.v1.resource.slots.unset](./booking-v1-resource-slots-unset.md) | Удаляет слоты для ресурса ||
|#

