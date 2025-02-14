# Табличная часть отгрузки в Интернет-магазине: обзор методов

Табличная часть отгрузки содержит информацию о каждом товаре, включенном в отгрузку: наименование, количество, цену.

> Быстрый переход: [все методы](#all-methods)

## Связь табличной части отгрузки с другими объектами

**Отгрузки.** Укажите идентификатор отгрузки. Список идентификаторов можно получить методом [sale.shipment.list](../shipment/sale-shipment-list.md).

**Корзина.** Укажите идентификатор элемента корзины. Список идентификаторов можно получить методом [sale.basketitem.list](../basket-item/sale-basket-item-list.md).

## Обзор методов {#all-methods}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

#|
|| **Метод** | **Описание** ||
|| [sale.shipmentitem.add](./sale-shipment-item-add.md) | Добавляет элемент табличной части отгрузки ||
|| [sale.shipmentitem.update](./sale-shipment-item-update.md) | Изменяет элемент табличной части отгрузки ||
|| [sale.shipmentitem.get](./sale-shipment-item-get.md) | Возвращает поля элемента табличной части отгрузки по его идентификатору ||
|| [sale.shipmentitem.list](./sale-shipment-item-list.md) | Возвращает список элементов табличной части отгрузки ||
|| [sale.shipmentitem.delete](./sale-shipment-item-delete.md) | Удаляет элемент табличной части отгрузки ||
|| [sale.shipmentitem.getFields](./sale-shipment-item-get-fields.md) | Возвращает доступные поля элемента табличной части отгрузки ||
|#
