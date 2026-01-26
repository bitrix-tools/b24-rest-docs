# Онлайн-запись: обзор методов

Онлайн-запись — это инструмент для автоматизации бронирования ресурсов: помещений, оборудования, услуг специалистов и так далее. Вы можете переносить клиентов между листом ожидания и бронированием, управлять загруженностью, синхронизировать ресурсы с внешними системами.

> Быстрый переход: [все методы](#all-methods) 
> 
> Пользовательская документация: [Битрикс24 Онлайн-запись: начало работы](https://helpdesk.bitrix24.ru/open/23712054/)

У онлайн-записи есть три группы методов: ресурсы, лист ожидания, бронирование. Методы связаны между собой:

- ресурсы определяют, что можно забронировать
- лист ожидания обрабатывает перегрузку
- методы бронирования фиксируют занятость

{% note info "" %}

В коробочных Битрикс24 методы можно использовать с [версии модуля](../../settings/cloud-and-on-premise/on-premise/versions.md) `booking 25.300.0`.

{% endnote %}

## Настройка ресурсов

Ресурсы – это объекты, которые можно забронировать: помещения, техника, услуги. Методы этой группы позволяют:

- создавать, изменять и удалять ресурсы — [booking.v1.resource.*](./resource/index.md)
- настраивать типы ресурсов, например, «комната», «автомобиль», «специалист» — [booking.v1.resourceType.*](./resource/resource-type/index.md)
- настраивать доступность ресурса по времени — [booking.v1.resource.slots.*](./resource/slots/index.md)

## Работа с листом ожидания

Используйте лист ожидания, когда нужный ресурс временно недоступен. Методы этой группы позволяют:

- добавлять, изменять и удалять записи  в листе ожидания — [booking.v1.waitlist.*](./waitlist/index.md)
- переносить запись из брони в лист ожидания — [booking.v1.waitlist.createfrombooking](./waitlist/booking-v1-waitlist-createfrombooking.md)
- управлять связями записей в листе ожидания с клиентами CRM — [booking.v1.waitlist.client.*](./waitlist/client/index.md) и другими объектами — [booking.v1.waitList.externalData.*](./waitlist/external-data/index.md)

## Бронирование ресурсов

Бронирование — это подтвержденная запись на ресурс. Методы этой группы позволяют:

- создавать, изменять и отменять бронирования — [booking.v1.booking.*](./booking/index.md)
- создавать бронь из записи в лист ожидания — [booking.v1.booking.createfromwaitlist](./booking/booking-v1-booking-createfromwaitlist.md)
- управлять связями брони с клиентами CRM — [booking.v1.booking.client.*](./booking/client/index.md) и другими объектами — [booking.v1.booking.externalData.*](./booking/external-data/index.md)

## Обзор методов {#all-methods}

> Scope: [`booking`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

### Ресурс

#|
|| **Метод** | **Описание** ||
|| [booking.v1.resource.add](./resource/booking-v1-resource-add.md) | Добавляет новый ресурс ||
|| [booking.v1.resource.delete](./resource/booking-v1-resource-delete.md) | Удаляет ресурс ||
|| [booking.v1.resource.get](./resource/booking-v1-resource-get.md) | Получает ресурс ||
|| [booking.v1.resource.list](./resource/booking-v1-resource-list.md) | Получает список ресурсов ||
|| [booking.v1.resource.update](./resource/booking-v1-resource-update.md) | Обновляет ресурс ||
|#

#### Тип ресурса

#|
|| **Метод** | **Описание** ||
|| [booking.v1.resourceType.add](./resource/resource-type/booking-v1-resourcetype-add.md) | Добавляет новый тип ресурса ||
|| [booking.v1.resourceType.delete](./resource/resource-type/booking-v1-resourcetype-delete.md) | Удаляет тип ресурса ||
|| [booking.v1.resourceType.get](./resource/resource-type/booking-v1-resourcetype-get.md) | Получает тип ресурса ||
|| [booking.v1.resourceType.list](./resource/resource-type/booking-v1-resourcetype-list.md) | Получает список типов ресурсов ||
|| [booking.v1.resourceType.update](./resource/resource-type/booking-v1-resourcetype-update.md) | Обновляет тип ресурса ||
|#

#### Временные слоты для ресурсов

#|
|| **Метод** | **Описание** ||
|| [booking.v1.resource.slots.list](./resource/slots/booking-v1-resource-slots-list.md) | Получает настройку слотов для ресурса ||
|| [booking.v1.resource.slots.set](./resource/slots/booking-v1-resource-slots-set.md) | Устанавливает слоты для ресурса ||
|| [booking.v1.resource.slots.unset](./resource/slots/booking-v1-resource-slots-unset.md) | Удаляет слоты для ресурса ||
|#

### Лист ожидания

#|
|| **Метод** | **Описание** ||
|| [booking.v1.waitlist.add](./waitlist/booking-v1-waitlist-add.md) | Добавляет в лист ожидания ||
|| [booking.v1.waitlist.createfrombooking](./waitlist/booking-v1-waitlist-createfrombooking.md) | Создает запись в листе ожидания из бронирования ||
|| [booking.v1.waitlist.delete](./waitlist/booking-v1-waitlist-delete.md) | Удаляет запись из листа ожидания ||
|| [booking.v1.waitlist.get](./waitlist/booking-v1-waitlist-get.md) | Получает запись из листа ожидания ||
|| [booking.v1.waitlist.list](./waitlist/booking-v1-waitlist-list.md) | Получает список записей из листа ожидания ||
|| [booking.v1.waitlist.update](./waitlist/booking-v1-waitlist-update.md) | Обновляет запись в листе ожидания ||
|#

#### Клиент в листе ожидания

#|
|| **Метод** | **Описание** ||
|| [booking.v1.waitlist.client.list](./waitlist/client/booking-v1-waitlist-client-list.md) | Получает список клиентов записи в лист ожидания ||
|| [booking.v1.waitlist.client.set](./waitlist/client/booking-v1-waitlist-client-set.md) | Добавляет клиентов к записи в лист ожидания ||
|| [booking.v1.waitlist.client.unset](./waitlist/client/booking-v1-waitlist-client-unset.md) | Удаляет клиентов из записи в лист ожидания ||
|#

#### Связи листа ожидания с дополнительными объектами

#|
|| **Метод** | **Описание** ||
|| [booking.v1.waitList.externalData.list](./waitlist/external-data/booking-v1-waitlist-externaldata-list.md) | Получает связи записи в лист ожидания ||
|| [booking.v1.waitlist.externalData.set](./waitlist/external-data/booking-v1-waitlist-externaldata-set.md) | Устанавливает связи для записи в лист ожидания ||
|| [booking.v1.waitlist.externalData.unset](./waitlist/external-data/booking-v1-waitlist-externaldata-unset.md) | Удаляет связи для записи в лист ожидания ||
|#

### Бронирование

#|
|| **Метод** | **Описание** ||
|| [booking.v1.booking.add](./booking/booking-v1-booking-add.md) | Добавляет бронирование ||
|| [booking.v1.booking.createfromwaitlist](./booking/booking-v1-booking-createfromwaitlist.md) | Создает бронирование из листа ожидания ||
|| [booking.v1.booking.delete](./booking/booking-v1-booking-delete.md) | Удаляет бронирование ||
|| [booking.v1.booking.get](./booking/booking-v1-booking-get.md) | Получает информацию о бронировании ||
|| [booking.v1.booking.list](./booking/booking-v1-booking-list.md) | Получает список бронирований ||
|| [booking.v1.booking.update](./booking/booking-v1-booking-update.md) | Обновляет бронирование ||
|#

#### Клиент в бронировании

#|
|| **Метод** | **Описание** ||
|| [booking.v1.booking.client.list](./booking/client/booking-v1-booking-client-list.md) | Получает список клиентов бронирования ||
|| [booking.v1.booking.client.set](./booking/client/booking-v1-booking-client-set.md) | Добавляет клиентав к бронированию ||
|| [booking.v1.booking.client.unset](./booking/client/booking-v1-booking-client-unset.md) | Удаляет клиентов из бронирования ||
|#

#### Связи бронирования с дополнительными объектами

#|
|| **Метод** | **Описание** ||
|| [booking.v1.booking.externalData.list](./booking/external-data/booking-v1-booking-externaldata-list.md) | Получает связи бронирования ||
|| [booking.v1.booking.externalData.set](./booking/external-data/booking-v1-booking-externaldata-set.md) | Устанавливает связи для бронирования ||
|| [booking.v1.booking.externalData.unset](./booking/external-data/booking-v1-booking-externaldata-unset.md) | Удаляет связи для бронирования ||
|#

#### Вспомогательные методы

#|
|| **Метод** | **Описание** ||
|| [booking.v1.clienttype.list](./booking-v1-clienttype-list.md) | Получает список типов клиентов ||
|#
