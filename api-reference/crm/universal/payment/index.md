# Оплаты в универсальных объектах CRM: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Методы раздела работают с оплатами, привязанными к универсальным объектам CRM. Например, можно создать оплату для сделки, отметить поступление средств или сформировать ссылку для оплаты клиентом.

Это нужно, чтобы синхронизировать статус и параметры оплаты в CRM с внешними платежными системами. Битрикс24 хранит данные об оплате отдельно от основных полей объекта, но связывает их через идентификаторы.

> Быстрый переход: [все методы](#all-methods)

## Связь оплат с другими объектами

**Объект CRM.** Для создания и получения списка оплат используйте пару параметров `entityTypeId` и `entityId`. Первый указывает на [тип объекта CRM](../../data-types.md#object_type), второй — на конкретный элемент этого типа.

**Платежные системы.** В данных оплаты возвращаются `paySystemId` и `paySystemName`. Получить доступные платежные системы можно методом [sale.paysystem.list](../../../pay-system/sale-pay-system-list.md).

**Товарные позиции оплаты.** Каждая оплата может содержать набор товарных позиций. Для управления составом оплаты используйте методы раздела [Товарные позиции в составе оплаты](./products-in-payment/index.md).

**Позиции доставки.** Оплата может быть связана с позициями доставки. Для работы с ними используйте методы раздела [Доставки в оплатах](./delivery-in-payment/index.md).

## Как работать с оплатами в CRM

1. Определите тип объекта CRM `entityTypeId` и его идентификатор `entityId`.
2. Создайте оплату методом [crm.item.payment.add](./crm-item-payment-add.md).
3. При необходимости добавьте в оплату товары методами раздела [Товарные позиции в составе оплаты](./products-in-payment/index.md) или услуги доставки методами раздела [Доставки в оплатах](./delivery-in-payment/index.md).
5. Получите список оплат объекта методом [crm.item.payment.list](./crm-item-payment-list.md) и выберите нужную оплату по `id`.
6. Получите детали конкретной оплаты методом [crm.item.payment.get](./crm-item-payment-get.md) и при необходимости обновите данные методом [crm.item.payment.update](./crm-item-payment-update.md).
7. Измените статус оплаты методами [crm.item.payment.pay](./crm-item-payment-pay.md) или [crm.item.payment.unpay](./crm-item-payment-unpay.md).
8. Если нужна ссылка для оплаты клиентом, используйте [salescenter.payment.getPublicUrl](./salescenter-payment-get-public-url.md).
9. Если оплата не нужна, удалите ее методом [crm.item.payment.delete](./crm-item-payment-delete.md).

## Ограничения и особенности

- Для методов `crm.item.payment.*` обязательна корректная пара `entityTypeId` и `entityId` объекта CRM.
- Методы [crm.item.payment.product.*](./products-in-payment/index.md) и [crm.item.payment.delivery.*](./delivery-in-payment/index.md) работают только с существующей оплатой по `paymentId`.
- В списочных методах применяйте `filter` и `order` в формате, совместимом с [sale.payment.list](../../../sale/payment/sale-payment-list.md).
- Метод [salescenter.payment.getPublicUrl](./salescenter-payment-get-public-url.md) работает в scope `salescenter` и используется только для генерации публичной ссылки.

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md), [`salescenter`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

### Основные методы оплаты

#|
|| **Метод** | **Описание** ||
|| [crm.item.payment.add](./crm-item-payment-add.md) | Создает оплату для объекта CRM ||
|| [crm.item.payment.update](./crm-item-payment-update.md) | Изменяет набор полей оплаты ||
|| [crm.item.payment.get](./crm-item-payment-get.md) | Возвращает краткую информацию об оплате ||
|| [crm.item.payment.list](./crm-item-payment-list.md) | Возвращает список оплат конкретного объекта CRM ||
|| [crm.item.payment.delete](./crm-item-payment-delete.md) | Удаляет оплату ||
|| [crm.item.payment.pay](./crm-item-payment-pay.md) | Изменяет статус оплаты на «Оплачено» ||
|| [crm.item.payment.unpay](./crm-item-payment-unpay.md) | Изменяет статус оплаты на «Не оплачено» ||
|#

### Публичная ссылка на оплату

#|
|| **Метод** | **Описание** ||
|| [salescenter.payment.getPublicUrl](./salescenter-payment-get-public-url.md) | Генерирует публичную ссылку на оплату ||
|#

### Товарные позиции в составе оплаты

#|
|| **Метод** | **Описание** ||
|| [crm.item.payment.product.add](./products-in-payment/crm-item-payment-product-add.md) | Добавляет товарную позицию в оплату ||
|| [crm.item.payment.product.list](./products-in-payment/crm-item-payment-product-list.md) | Возвращает список товарных позиций в оплате ||
|| [crm.item.payment.product.delete](./products-in-payment/crm-item-payment-product-delete.md) | Удаляет товарную позицию из оплаты ||
|| [crm.item.payment.product.setQuantity](./products-in-payment/crm-item-payment-product-set-quantity.md) | Изменяет количество товара в товарной позиции оплаты ||
|#

### Доставки в оплатах

#|
|| **Метод** | **Описание** ||
|| [crm.item.payment.delivery.add](./delivery-in-payment/crm-item-payment-delivery-add.md) | Добавляет позицию доставки в оплату ||
|| [crm.item.payment.delivery.list](./delivery-in-payment/crm-item-payment-delivery-list.md) | Возвращает список позиций доставки по конкретной оплате ||
|| [crm.item.payment.delivery.delete](./delivery-in-payment/crm-item-payment-delivery-delete.md) | Удаляет позицию доставки из оплаты ||
|| [crm.item.payment.delivery.setDelivery](./delivery-in-payment/crm-item-payment-delivery-set-delivery.md) | Перепривязывает позицию доставки к другому документу доставки ||
|#
