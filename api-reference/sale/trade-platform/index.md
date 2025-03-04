# Источники заказов в Интернет-магазине: обзор методов

Заказы можно создать вручную методом [sale.order.add](../order/sale-order-add.md) или получить из внутренних источников:
- счет,
- документ реализации,
- сделка,
- дело,
- лендинг.

Чтобы просмотреть все источники заказов вашего Битрикс24, используйте метод [sale.tradePlatform.list](./sale-trade-platform-list.md).

> Быстрый переход: [все методы](#all-methods)

## Связь источников заказов с другими объектами

**Привязка источников заказов к заказам.** Чтобы просмотреть заказы из конкретного источника, используйте метод [sale.tradeBinding.list](../trade-binding/sale-trade-binding-list.md).

**Заказ.** Получите всю информацию о заказе с помощью метода [sale.order.get](../order/sale-order-get.md).

## Обзор методов {#all-methods}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом «Просмотр каталога товаров»

#|
|| **Метод** | **Описание** ||
|| [sale.tradePlatform.list](./sale-trade-platform-list.md) | Возвращает список источников заказов ||
|| [sale.tradePlatform.getFields](./sale-trade-platform-get-fields.md) | Возвращает доступные поля источников заказов ||
|#
