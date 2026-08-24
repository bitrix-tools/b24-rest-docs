# Оплаты в Интернет-магазине: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Оплаты содержат информацию о платежах по заказам: платежную систему, статус и дату оплаты, идентификатор плательщика.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Платежные системы в Интернет-магазине](https://helpdesk.bitrix24.ru/open/17121396/)

## Как начать работу с оплатой

1. Получите заказ методом [sale.order.get](../order/sale-order-get.md) или [sale.order.list](../order/sale-order-list.md).
2. Выберите платежную систему методом [sale.paysystem.list](../../pay-system/sale-pay-system-list.md).
3. Создайте оплату методом [sale.payment.add](./sale-payment-add.md).
4. При частичной оплате свяжите оплату с позициями корзины методами [sale.paymentitembasket.*](../payment-item-basket/index.md).
5. Если оплата относится к конкретной отгрузке, создайте связь методами [sale.paymentItemShipment.*](../payment-item-shipment/index.md).
6. Проверяйте состояние оплаты методом [sale.payment.get](./sale-payment-get.md) или отбирайте оплаты через [sale.payment.list](./sale-payment-list.md).

## Связь оплат с другими объектами

**Заказ.** Укажите заказ, для которого создаете оплату. Получить список заказов можно методом [sale.order.list](../order/sale-order-list.md).

**Платежные системы.** Укажите платежную систему. Получить список платежных систем можно методом [sale.paysystem.list](../../pay-system/sale-pay-system-list.md).

**Привязка элемента корзины к оплате.** Выберите элементы корзины, для которых хотите создать оплату. Используйте методы [sale.paymentitembasket.*](../payment-item-basket/index.md).

**Привязка оплат к отгрузкам.** Укажите, какие отгрузки оплачены. Используйте методы [sale.paymentItemShipment.*](../payment-item-shipment/index.md).

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
