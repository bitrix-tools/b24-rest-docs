# Бронирование: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Бронирование связывает ресурс, время и клиента в одну запись. Ресурсом может быть услуга, сотрудник, помещение или другой доступный для записи объект. Бронь можно создать на выбранный временной интервал, связать с контактом или компанией и дополнить связью со сделкой CRM.

> Быстрый переход: [все методы](#all-methods) 
> 
> Пользовательская документация: [Как записать клиента на услугу](https://helpdesk.bitrix24.ru/open/23661964/)

## Как начать работу

1. Получите или создайте ресурс методами группы [booking.v1.resource.*](../resource/index.md). Его идентификатор понадобится в параметре `resourceIds`
2. Создайте бронь методом [booking.v1.booking.add](./booking-v1-booking-add.md) и передайте идентификаторы ресурсов и временной интервал. Если запись уже находится в листе ожидания, используйте метод [booking.v1.booking.createfromwaitlist](./booking-v1-booking-createfromwaitlist.md)
3. Привяжите к брони контакт или компанию методами [booking.v1.booking.client.*](./client/index.md)
4. При необходимости свяжите бронь со сделкой CRM методами [booking.v1.booking.externalData.*](./external-data/index.md)
5. Получайте и изменяйте бронь методами [booking.v1.booking.get](./booking-v1-booking-get.md), [booking.v1.booking.list](./booking-v1-booking-list.md) и [booking.v1.booking.update](./booking-v1-booking-update.md)

## Постраничная навигация

Метод [booking.v1.booking.list](./booking-v1-booking-list.md) возвращает до 50 бронирований за один вызов. Для перехода к следующей странице передавайте в параметре `start` значения `50`, `100`, `150` и далее.

## Связь бронирования с другими объектами

**Лист ожидания.** Передавайте `id` записи из листа ожидания в параметр `waitListId` метода [booking.v1.booking.createfromwaitlist](./booking-v1-booking-createfromwaitlist.md), чтобы перенести запись клиента в бронирование на конкретное время.

**Ресурс.** Передавайте `id` [ресурсов](../resource/index.md), которые хотите забронировать, в параметре `resourceIds` методов [booking.v1.booking.*](#all-methods). В одной брони может  быть несколько ресурсов с совпадающим временем. Например, можно забронировать одновременно услугу водителя и автомобиль.

**Клиент.** К брони можно прикрепить [контакт](../../crm/contacts/index.md) или [компанию](../../crm/companies/index.md) из CRM. Передавайте `id` контакта или компании в методах [booking.v1.booking.client.*](./client/index.md).

**Сделка.** К брони можно прикрепить [сделку](../../crm/deals/index.md) CRM. Передавайте `id` сделки в методах [booking.v1.booking.externalData.*](./external-data/index.md).

## События

События позволяют приложению реагировать на создание, обновление и удаление брони. Узнайте, как подписаться на них, в разделе [События бронирования](./events/index.md).

## Обзор методов {#all-methods}

> Scope: [`booking`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [booking.v1.booking.add](./booking-v1-booking-add.md) | Добавляет бронирование ||
|| [booking.v1.booking.createfromwaitlist](./booking-v1-booking-createfromwaitlist.md) | Создает бронирование из листа ожидания ||
|| [booking.v1.booking.delete](./booking-v1-booking-delete.md) | Удаляет бронирование ||
|| [booking.v1.booking.get](./booking-v1-booking-get.md) | Получает информацию о бронировании ||
|| [booking.v1.booking.list](./booking-v1-booking-list.md) | Получает список бронирований ||
|| [booking.v1.booking.update](./booking-v1-booking-update.md) | Обновляет бронирование ||
|#
