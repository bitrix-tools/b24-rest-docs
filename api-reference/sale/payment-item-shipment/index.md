# Привязка оплат к отгрузкам в Интернет-магазине: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Заказ может включать несколько независимых отгрузок. Чтобы указать, к каким отгрузкам относится оплата, используйте привязки оплат к отгрузкам.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как принять оплату по ссылке и оформить доставку в карточке сделки](https://helpdesk.bitrix24.ru/open/28102982/)

## Как начать работу с привязкой оплаты к отгрузке

1. Получите идентификатор оплаты методом [sale.payment.list](../payment/sale-payment-list.md).
2. Получите идентификатор отгрузки методом [sale.shipment.list](../shipment/sale-shipment-list.md).
3. Проверьте доступные поля привязки методом [sale.paymentItemShipment.getFields](./sale-payment-item-shipment-get-fields.md).
4. Создайте привязку методом [sale.paymentItemShipment.add](./sale-payment-item-shipment-add.md).
5. Используйте [sale.paymentItemShipment.list](./sale-payment-item-shipment-list.md), чтобы проверить связи оплат с отгрузками.

## Как устроена привязка

Привязка хранит идентификатор оплаты `paymentId`, идентификатор отгрузки `shipmentId` и необязательный внешний идентификатор `xmlId`. Поля суммы или количества в привязке нет: она указывает на связь оплаты и отгрузки, но не хранит распределенную между ними сумму.

Чтобы связать одну оплату с двумя отгрузками, создайте две привязки с одинаковым `paymentId` и разными `shipmentId`:

```json
[
    { "fields": { "paymentId": 1025, "shipmentId": 2471 } },
    { "fields": { "paymentId": 1025, "shipmentId": 2472 } }
]
```

Каждый элемент примера передайте отдельным вызовом [sale.paymentItemShipment.add](./sale-payment-item-shipment-add.md), а не одним массивом. Идентификаторы оплат получите методом [sale.payment.list](../payment/sale-payment-list.md), идентификаторы отгрузок — методом [sale.shipment.list](../shipment/sale-shipment-list.md). Одна и та же пара `paymentId` + `shipmentId` может существовать только один раз.

## Обзор методов {#all-methods}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять методы: администратор

#|
|| **Метод** | **Описание** ||
|| [sale.paymentItemShipment.add](./sale-payment-item-shipment-add.md) | Добавляет привязку оплаты к отгрузке ||
|| [sale.paymentItemShipment.update](./sale-payment-item-shipment-update.md) | Изменяет привязку оплаты к отгрузке ||
|| [sale.paymentItemShipment.get](./sale-payment-item-shipment-get.md) | Возвращает значения полей привязки оплаты к отгрузке по ее идентификатору ||
|| [sale.paymentItemShipment.list](./sale-payment-item-shipment-list.md) | Возвращает список привязок оплат к отгрузкам по фильтру ||
|| [sale.paymentItemShipment.delete](./sale-payment-item-shipment-delete.md) | Удаляет привязку оплаты к отгрузке ||
|| [sale.paymentItemShipment.getFields](./sale-payment-item-shipment-get-fields.md) | Возвращает поля привязки оплаты к отгрузке ||
|#
