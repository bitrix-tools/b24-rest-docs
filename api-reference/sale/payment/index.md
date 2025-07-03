# Оплаты в Интернет-магазине: обзор методов

Оплаты содержат информацию о платежах по заказам: платежную систему, статус и дату оплаты, идентификатор плательщика.

> Быстрый переход: [все методы](#all-methods)
> 
> Пользовательская документация: [Как отследить статус оплаты, доставки и СМС](https://helpdesk.bitrix24.ru/open/18291172)

## Связь оплат с другими объектами

**Заказ.** Укажите заказ, для которого создаете оплату. Получить список заказов можно с помощью метода [sale.order.list](../order/sale-order-list.md).

**Платежные системы.** Укажите платежную систему. Получить список платежных систем можно с помощью метода [sale.paysystem.list](../../pay-system/sale-pay-system-list.md).

**Привязка элемента корзины к оплате.** Выберите элементы корзины, для которых хотите создать оплату. Используйте методы [sale.paymentitembasket.*](../payment-item-basket/index.md).

**Привязка оплат к отгрузкам.** Укажите, какие отгрузки оплачены. Используйте методы [sale.paymentItemShipment.*](../payment-item-shipment/index.md).

## Обзор методов {#all-methods}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять методы: администратор

#|
|| **Метод** | **Описание** ||
|| [sale.payment.add](./sale-payment-add.md) | Добавляет оплату ||
|| [sale.payment.update](./sale-payment-update.md) | Изменяет оплату ||
|| [sale.payment.get](./sale-payment-get.md) | Возвращает информацию об оплате ||
|| [sale.payment.list](./sale-payment-list.md) | Возвращает список оплат ||
|| [sale.payment.delete](./sale-payment-delete.md) | Удаляет оплату ||
|| [sale.payment.getFields](./sale-payment-get-fields.md) | Возвращает доступные поля оплаты ||
|#
