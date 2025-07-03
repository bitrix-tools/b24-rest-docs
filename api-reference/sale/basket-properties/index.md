# Свойства корзины в Интернет-магазине: обзор методов

Свойства корзины — это характеристики [позиций корзины](../basket-item/index.md): размер, цвет, артикул, производитель.

> Быстрый переход: [все методы](#all-methods)

## Связь свойств корзины с другими объектами

**Корзина.** Укажите позицию корзины, к которой привязано свойство. Список позиций корзины можно получить методом [sale.basketitem.list](../basket-item/sale-basket-item-list.md).

## Обзор методов {#all-methods}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [sale.basketproperties.add](./sale-basket-properties-add.md) | Добавляет свойство позиции корзины ||
|| [sale.basketproperties.update](./sale-basket-properties-update.md) | Обновляет поля свойства позиции корзины ||
|| [sale.basketproperties.get](./sale-basket-properties-get.md) | Возвращает значение свойства позиции корзины по идентификатору ||
|| [sale.basketproperties.list](./sale-basket-properties-list.md) | Возвращает список свойств позиций корзины ||
|| [sale.basketproperties.delete](./sale-basket-properties-delete.md) | Удаляет свойство позиции корзины ||
|| [sale.basketproperties.getFields](./sale-basket-properties-get-fields.md) | Возвращает список полей свойства позиции корзины ||
|#