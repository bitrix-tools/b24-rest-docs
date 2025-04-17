# Онлайн-запись: обзор методов


## Ресурс

#|
|| **Метод** | **Описание** ||
|| [booking.v1.resource.add](./resource/booking-v1-resource-add.md) | Добавляет новый ресурс ||
|| [booking.v1.resource.delete](./resource/booking-v1-resource-delete.md) | Удаляет ресурс ||
|| [booking.v1.resource.get](./resource/booking-v1-resource-get.md) | Получает ресурс ||
|| [booking.v1.resource.list](./resource/booking-v1-resource-list.md) | Получает список ресурсов ||
|| [booking.v1.resource.update](./resource/booking-v1-resource-update.md) | Обновляет ресурс ||
|#

### Тип ресурса

#|
|| **Метод** | **Описание** ||
|| [booking.v1.resourceType.add](./resource/resource-type/booking-v1-resourcetype-add.md) | Добавляет новый тип ресурса ||
|| [booking.v1.resourceType.delete](./resource/resource-type/booking-v1-resourcetype-delete.md) | Удаляет тип ресурса ||
|| [booking.v1.resourceType.get](./resource/resource-type/booking-v1-resourcetype-get.md) | Получает тип ресурса ||
|| [booking.v1.resourceType.list](./resource/resource-type/booking-v1-resourcetype-list.md) | Получает список типов ресурсов ||
|| [booking.v1.resourceType.update](./resource/resource-type/booking-v1-resourcetype-update.md) | Обновляет тип ресурса ||
|#

### Временные слоты для ресурсов

#|
|| **Метод** | **Описание** ||
|| [booking.v1.resource.slots.list](./resource/slots/booking-v1-resource-slots-list.md) | Получает настройку слотов для ресурса ||
|| [booking.v1.resource.slots.set](./resource/slots/booking-v1-resource-slots-set.md) | Устанавливает слоты для ресурса ||
|| [booking.v1.resource.slots.unset](./resource/slots/booking-v1-resource-slots-unset.md) | Удаляет слоты для ресурса ||
|#

## Лист ожидания

#|
|| **Метод** | **Описание** ||
|| [booking.v1.waitlist.add](./waitlist/booking-v1-waitlist-add.md) | Добавляет в лист ожидания ||
|| [booking.v1.waitlist.createfrombooking](./waitlist/booking-v1-waitlist-createfrombooking.md) | Создает запись в листе ожидания из бронирования ||
|| [booking.v1.waitlist.delete](./waitlist/booking-v1-waitlist-delete.md) | Удаляет запись из листа ожидания ||
|| [booking.v1.waitlist.get](./waitlist/booking-v1-waitlist-get.md) | Получает запись из листа ожидания ||
|| [booking.v1.waitlist.list](./waitlist/booking-v1-waitlist-list.md) | Получает список записей из листа ожидания ||
|| [booking.v1.waitlist.update](./waitlist/booking-v1-waitlist-update.md) | Обновляет запись в листе ожидания ||
|#

### Клиент в листе ожидания

#|
|| **Метод** | **Описание** ||
|| [booking.v1.waitlist.client.list](./waitlist/client/booking-v1-waitlist-client-list.md) | Получает список клиентов записи в лист ожидания ||
|| [booking.v1.waitlist.client.set](./waitlist/client/booking-v1-waitlist-client-set.md) | Добавляет клиентов к записи в лист ожидания ||
|| [booking.v1.waitlist.client.unset](./waitlist/client/booking-v1-waitlist-client-unset.md) | Удаляет клиентов из записи в лист ожидания ||
|#

### Связи листа ожидания с дополнительными объектами

#|
|| **Метод** | **Описание** ||
|| [booking.v1.waitList.externalData.list](./waitlist/external-data/booking-v1-waitlist-externaldata-list.md) | Получает связи записи в лист ожидания ||
|| [booking.v1.waitlist.externalData.set](./waitlist/external-data/booking-v1-waitlist-externaldata-set.md) | Устанавливает связи для записи в лист ожидания ||
|| [booking.v1.waitlist.externalData.unset](./waitlist/external-data/booking-v1-waitlist-externaldata-unset.md) | Удаляет связи для записи в лист ожидания ||
|#

## Бронирование

#|
|| **Метод** | **Описание** ||
|| [booking.v1.booking.add](./booking/booking-v1-booking-add.md) | Добавляет бронирование ||
|| [booking.v1.booking.createfromwaitlist](./booking/booking-v1-booking-createfromwaitlist.md) | Создает бронирование из листа ожидания ||
|| [booking.v1.booking.delete](./booking/booking-v1-booking-delete.md) | Удаляет бронирование ||
|| [booking.v1.booking.get](./booking/booking-v1-booking-get.md) | Получает информацию о бронировании ||
|| [booking.v1.booking.list](./booking/booking-v1-booking-list.md) | Получает список бронирований ||
|| [booking.v1.booking.update](./booking/booking-v1-booking-update.md) | Обновляет бронирование ||
|#

### Клиент в бронировании

#|
|| **Метод** | **Описание** ||
|| [booking.v1.booking.client.list](./booking/client/booking-v1-booking-client-list.md) | Получает список клиентов бронирования ||
|| [booking.v1.booking.client.set](./booking/client/booking-v1-booking-client-set.md) | Добавляет клиентав к бронированию ||
|| [booking.v1.booking.client.unset](./booking/client/booking-v1-booking-client-unset.md) | Удаляет клиентов из бронирования ||
|#

### Связи бронирования с дополнительными объектами

#|
|| **Метод** | **Описание** ||
|| [booking.v1.booking.externalData.list](./booking/external-data/booking-v1-booking-externaldata-list.md) | Получает связи бронирования ||
|| [booking.v1.booking.externalData.set](./booking/external-data/booking-v1-booking-externaldata-set.md) | Устанавливает связи для бронирования ||
|| [booking.v1.booking.externalData.unset](./booking/external-data/booking-v1-booking-externaldata-unset.md) | Удаляет связи для бронирования ||
|#

### Вспомогательные методы

#|
|| **Метод** | **Описание** ||
|| [booking.v1.clienttype.list](./booking-v1-clienttype-list.md) | Получает список типов клиентов ||
|#
