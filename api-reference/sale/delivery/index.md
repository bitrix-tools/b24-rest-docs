# Службы доставки в Интернет-магазине: обзор методов

В Битрикс24 по умолчанию доступно два варианта доставки: самовывоз и доставка курьером. Настройте другие способы, чтобы клиент мог выбрать удобный вариант. Для этого:

1. создайте обработчик службы доставки,
2. создайте службу доставки,
3. создайте свойства отгрузки и привяжите их к службе доставки,
4. добавьте дополнительные услуги при необходимости.

Чтобы внешняя система могла сообщать статус заказа, настройте транспортные заявки.

> Быстрый переход: [все методы](#all-methods)
> 
> Пользовательская документация: [Службы доставки](https://helpdesk.bitrix24.ru/open/17225250/)

{% note tip "Частые кейсы и сценарии" %}

- [Настроить доставку для использования в CRM](../../../tutorials/sale/delivery-in-crm.md)
- [Рассчитать стоимости доставки](./webhooks/calculate.md)
- [Создать заказ на доставку](./webhooks/create-delivery-request.md)
- [Отменить заказ на доставку](./webhooks/cancel-delivery-request.md)

{% endnote %}

## Связь служб доставки с другими объектами

**Заказ.** Создайте или измените заказ с помощью методов [sale.order.*](../order/index.md).

**Отгрузки.** Контролируйте отправку товаров клиентам с помощью методов [sale.shipment.*](../shipment/index.md).

**Свойства отгрузки.** Если в одном заказе несколько отгрузок, создайте свойства отгрузки с помощью методов [sale.shipmentproperty.*](../shipment-property/index.md). Например, в заказе три книги, которые нужно отправить по разным адресам. Чтобы указать адрес для каждой отправки, создайте свойства отгрузки.

**Привязка свойства.** Задайте условия, при которых покупатель увидит конкретное свойство отгрузки. Для этого привяжите свойство к службе доставки методом [sale.propertyRelation.add](../property-relation/sale-property-relation-add.md).

## Обзор методов {#all-methods}

### Обработчики служб доставки

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять методы: администратор

#|
|| **Метод** | **Описание** ||
|| [sale.delivery.handler.add](./handler/sale-delivery-handler-add.md) | Добавляет обработчик службы доставки ||
|| [sale.delivery.handler.update](./handler/sale-delivery-handler-update.md) | Изменяет обработчик службы доставки ||
|| [sale.delivery.handler.delete](./handler/sale-delivery-handler-delete.md) | Удаляет обработчик службы доставки ||
|| [sale.delivery.handler.list](./handler/sale-delivery-handler-list.md) | Получает список обработчиков служб доставки ||
|#

### Службы доставки

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять методы: администратор

#|
|| **Метод** | **Описание** ||
|| [sale.delivery.add](./delivery/sale-delivery-add.md) | Добавляет службу доставки ||
|| [sale.delivery.update](./delivery/sale-delivery-update.md) | Изменяет службу доставки ||
|| [sale.delivery.delete](./delivery/sale-delivery-delete.md) | Удаляет службу доставки ||
|| [sale.delivery.config.update](./delivery/sale-delivery-config-update.md) | Обновляет настройки службы доставки ||
|| [sale.delivery.config.get](./delivery/sale-delivery-config-get.md) | Получает настройки службы доставки ||
|| [sale.delivery.getlist](./delivery/sale-delivery-get-list.md) | Получает список служб доставки ||
|#

### Дополнительные услуги

> Scope: [`sale, delivery`](../../scopes/permissions.md)
>
> Кто может выполнять методы: администратор

#|
|| **Метод** | **Описание** ||
|| [sale.delivery.extra.service.add](./extra-service/sale-delivery-extra-service-add.md) | Добавляет услугу службы доставки ||
|| [sale.delivery.extra.service.update](./extra-service/sale-delivery-extra-service-update.md) | Изменяет услугу службы доставки ||
|| [sale.delivery.extra.service.get](./extra-service/sale-delivery-extra-service-get.md) | Возвращает информацию обо всех услугах конкретной службы доставки ||
|| [sale.delivery.extra.service.delete](./extra-service/sale-delivery-extra-service-delete.md) | Удаляет услугу службы доставки ||
|#

### Транспортные заявки

> Scope: [`sale, delivery`](../../scopes/permissions.md)
>
> Кто может выполнять методы: администратор

#|
|| **Метод** | **Описание** ||
|| [sale.delivery.request.update](./delivery-request/sale-delivery-request-update.md) | Обновляет транспортную заявку ||
|| [sale.delivery.request.sendmessage](./delivery-request/sale-delivery-request-send-message.md) | Создает оповещения по транспортной заявке ||
|| [sale.delivery.request.delete](./delivery-request/sale-delivery-request-delete.md) | Удаляет транспортную заявку ||
|#
