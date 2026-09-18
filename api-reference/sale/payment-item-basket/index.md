# Привязка элементов корзины к оплатам в Интернет-магазине: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

У заказа может быть несколько оплат — например, если товары оплачиваются через разные платежные системы. Привязка показывает, какие элементы корзины и в каком количестве входят в каждую оплату: она хранит идентификатор оплаты `paymentId`, идентификатор элемента корзины `basketId` и количество `quantity`.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как покупателю оформить заказ в интернет-магазине](https://helpdesk.bitrix24.ru/open/28841930/)

## Как начать работу

1. Получите идентификатор заказа методом [sale.order.list](../order/sale-order-list.md).
2. Получите оплаты заказа методом [sale.payment.list](../payment/sale-payment-list.md) и элементы корзины методом [sale.basketitem.list](../basket-item/sale-basket-item-list.md) — в обоих методах отфильтруйте по `orderId`.
3. Создайте привязку методом [sale.paymentitembasket.add](./sale-payment-item-basket-add.md): передайте `paymentId`, `basketId` и `quantity`.
4. Проверьте, какие элементы корзины связаны с оплатами, методом [sale.paymentitembasket.list](./sale-payment-item-basket-list.md).
5. Идентификатор привязки `id` из ответа методов добавления или списка передавайте в методы [sale.paymentitembasket.get](./sale-payment-item-basket-get.md), [sale.paymentitembasket.update](./sale-payment-item-basket-update.md) и [sale.paymentitembasket.delete](./sale-payment-item-basket-delete.md).

## Связь с другими объектами

Привязка соединяет оплату и элемент корзины одного заказа. Поля объекта привязки описаны в справочнике [sale_payment_item_basket](../data-types.md#sale_payment_item_basket).

**Заказ.** Оплата из `paymentId` и элемент корзины из `basketId` должны принадлежать одному заказу. Если оплата относится к другому заказу, метод [sale.paymentitembasket.add](./sale-payment-item-basket-add.md) вернет ошибку `201240400002` — `payment not exists`.

**Оплата.** Одна оплата может включать несколько элементов корзины, а один элемент — входить в несколько оплат. Пара «оплата + элемент» уникальна: повторная привязка той же пары вернет ошибку `201250000001`. При добавлении оплаты методом [sale.payment.add](../payment/sale-payment-add.md) Битрикс24 может создать привязки для элементов корзины автоматически — проверьте их методом [sale.paymentitembasket.list](./sale-payment-item-basket-list.md), прежде чем добавлять свои. Список оплат заказа возвращает метод [sale.payment.list](../payment/sale-payment-list.md).

**Корзина.** Значение `quantity` не может превышать количество элемента в корзине: на большее значение методы [sale.paymentitembasket.add](./sale-payment-item-basket-add.md) и [sale.paymentitembasket.update](./sale-payment-item-basket-update.md) вернут ошибку с кодом `0` и описанием «Недостаточное количество товара в корзине». Проверка идет по каждой привязке отдельно: сумму количества по всем оплатам Битрикс24 не ограничивает. Количество элемента возвращает метод [sale.basketitem.list](../basket-item/sale-basket-item-list.md) в поле `quantity`.

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
