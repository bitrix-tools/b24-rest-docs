# Значения свойств отгрузки в Интернет-магазине: обзор методов

При создании [свойства отгрузки](../shipment-property/index.md) можно сразу задать значения. В заказе три книги, которые нужно отправить по разным адресам. Создайте свойство отгрузки «Адрес доставки» с тремя значениями. Если адрес доставки поменялся, измените значение свойства отгрузки с помощью методов `sale.shipmentpropertyvalue.*`.

> Быстрый переход: [все методы](#all-methods)

## Связь значений свойств отгрузки с другими объектами

**Отгрузки.** Укажите идентификатор отгрузки. Список идентификаторов можно получить методом [sale.shipment.list](../shipment/sale-shipment-list.md).

**Свойства отгрузки.** Создайте свойства отгрузки с помощью методов [sale.shipmentproperty.*](../shipment-property/index.md).

## Обзор методов {#all-methods}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять методы: администратор

#|
|| **Метод** | **Описание** ||
|| [sale.shipmentpropertyvalue.modify](./sale-shipment-property-value-modify.md) | Обновляет значения свойства отгрузки ||
|| [sale.shipmentpropertyvalue.get](./sale-shipment-property-value-get.md) | Возвращает значения свойства отгрузки ||
|| [sale.shipmentpropertyvalue.list](./sale-shipment-property-value-list.md) | Возвращает список значений свойства отгрузки ||
|| [sale.shipmentpropertyvalue.delete](./sale-shipment-propertyvalue-delete.md) | Удаляет значения свойства отгрузки ||
|| [sale.shipmentpropertyvalue.getfields](./sale-shipment-property-value-get-fields.md) | Возвращает доступные поля значений свойства отгрузки ||
|#
