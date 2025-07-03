# Привязка элементов корзины к оплатам в Интернет-магазине: обзор методов

У одной корзины может быть несколько оплат — например, если товары оплачиваются через разные платежные системы. Определите, какие позиции корзины относятся к каждой из оплат.

> Быстрый переход: [все методы](#all-methods)

## Связь привязки элементов корзины к оплатам с другими объектами

**Оплаты.** Укажите идентификатор оплаты, к которой хотите привязать позицию корзины. Список идентификаторов оплат можно получить методом [sale.payment.list](../payment/sale-payment-list.md).

**Корзина.** Укажите идентификатор позиции корзины для оплаты. Список идентификаторов позиций корзины можно получить методом [sale.basketitem.list](../basket-item/sale-basket-item-list.md).

## Обзор методов {#all-methods}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять методы: администратор

#|
|| **Метод** | **Описание** ||
|| [sale.paymentitembasket.add](./sale-payment-item-basket-add.md) | Добавляет привязку элемента корзины к оплате ||
|| [sale.paymentitembasket.update](./sale-payment-item-basket-update.md) | Изменяет привязку элемента корзины к оплате ||
|| [sale.paymentitembasket.get](./sale-payment-item-basket-get.md) | Возвращает значения всех полей привязки элемента корзины к оплате ||
|| [sale.paymentitembasket.list](./sale-payment-item-basket-list.md) | Возвращает список привязок элементов корзины к оплатам ||
|| [sale.paymentitembasket.delete](./sale-payment-item-basket-delete.md) | Удаляет привязку элемента корзины к оплате ||
|| [sale.paymentitembasket.getfields](./sale-payment-item-basket-get-fields.md) | Возвращает доступные поля привязок элементов корзины к оплатам ||
|#
