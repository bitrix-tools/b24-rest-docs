# Привязка оплат к отгрузкам в Интернет-магазине: обзор методов

Заказ может включать несколько товаров, которые необходимо отгрузить частями, то есть в виде нескольких независимых отгрузок. Чтобы распределить оплаты между отгрузками, используйте привязку оплат к отгрузкам.

> Быстрый переход: [все методы](#all-methods)

## Связь привязки оплат к отгрузкам с другими объектами

**Отгрузки.** Укажите идентификатор оплаченной отгрузки. Получить список идентификаторов отгрузки можно методом [sale.shipment.list](../shipment/sale-shipment-list.md).

**Оплаты.** Укажите идентификатор оплаты, которую нужно привязать к отгрузке. Получить список идентификаторов оплат можно методом [sale.payment.list](../payment/sale-payment-list.md).

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
