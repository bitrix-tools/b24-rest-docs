# Типы ресурсов: обзор методов и событий

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Типы ресурсов нужны для категоризации объектов бронирования. Например, один тип может объединять комнаты для встреч, другой — служебный транспорт.

С помощью типов ресурсов можно:

- группировать похожие объекты
- настраивать шаблоны уведомлений для клиентов
- фильтровать бронирования

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [Онлайн-запись: как создать новый ресурс](https://helpdesk.bitrix24.ru/open/23661822/)

## Как начать работу

1. Создайте тип ресурса методом [booking.v1.resourceType.add](./booking-v1-resourcetype-add.md)
2. Получите `id` типа методом [booking.v1.resourceType.list](./booking-v1-resourcetype-list.md)
3. Передайте `id` типа в параметре `typeId` метода [booking.v1.resource.add](../booking-v1-resource-add.md)

## Связь типов ресурсов с другими объектами

**Ресурс.** Используйте `id` типа ресурса в параметре `typeId` методов [booking.v1.resource.*](../index.md).

## Код типа ресурса

У каждого типа есть символьный код `code` — по нему внешние интеграции находят тип, не зная его числового идентификатора. Код уникален среди типов модуля `booking`.

#|
|| **Код** | **Тип ресурса** ||
|| `doctor` | Врач ||
|| `equipment` | Оборудование ||
|| `expert` | Специалист ||
|| `car` | Автомобиль ||
|| `room` | Помещение ||
|#

Эти типы создаются при установке модуля.

Типы ресурсов есть и у других модулей Битрикс24. Чтобы получить только свои, передавайте в [booking.v1.resourceType.list](./booking-v1-resourcetype-list.md) фильтр `moduleId` со значением `booking`.

## Особенности работы с типами ресурсов

Создавать и изменять типы ресурсов можно и через интерфейс Битрикс24, и методами [booking.v1.resourceType.add](./booking-v1-resourcetype-add.md), [booking.v1.resourceType.update](./booking-v1-resourcetype-update.md).

При обновлении код обязателен, причем его значение должно отличаться от кодов всех существующих типов, включая код самого обновляемого типа — подробности на странице [booking.v1.resourceType.update](./booking-v1-resourcetype-update.md).

Удалить тип можно только методом [booking.v1.resourceType.delete](./booking-v1-resourcetype-delete.md) и только если к нему не привязан ни один ресурс.

Настройки уведомлений типа не переносятся в ресурсы: ресурс при создании получает собственные значения по умолчанию.

## Обзор методов и событий {#all-methods}

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

### Тип ресурса

#|
|| **Метод** | **Описание** ||
|| [booking.v1.resourceType.add](./booking-v1-resourcetype-add.md) | Добавляет новый тип ресурса ||
|| [booking.v1.resourceType.update](./booking-v1-resourcetype-update.md) | Обновляет тип ресурса ||
|| [booking.v1.resourceType.get](./booking-v1-resourcetype-get.md) | Получает тип ресурса ||
|| [booking.v1.resourceType.list](./booking-v1-resourcetype-list.md) | Получает список типов ресурсов ||
|| [booking.v1.resourceType.delete](./booking-v1-resourcetype-delete.md) | Удаляет тип ресурса ||
|#

### События

Как подписаться — в разделе [События типов ресурсов](./events/index.md).

#|
|| **Событие** | **Вызывается** ||
|| [onBookingResourceTypeAdd](./events/on-booking-resource-type-add.md) | При создании типа ресурса вручную или методом [booking.v1.resourceType.add](./booking-v1-resourcetype-add.md) ||
|| [onBookingResourceTypeUpdate](./events/on-booking-resource-type-update.md) | При обновлении типа ресурса вручную или методом [booking.v1.resourceType.update](./booking-v1-resourcetype-update.md) ||
|| [onBookingResourceTypeDelete](./events/on-booking-resource-type-delete.md) | При удалении типа ресурса методом [booking.v1.resourceType.delete](./booking-v1-resourcetype-delete.md) ||
|#
