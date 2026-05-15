# Доставки в оплатах: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Методы раздела управляют позициями доставки внутри оплаты CRM. Позиция доставки хранит параметры услуги и связывает оплату с конкретным документом доставки.

Это нужно, чтобы учитывать стоимость логистики в общем счете. Например, можно добавить доставку к оплате за товар и привязать ее к накладной транспортной компании.

> Быстрый переход: [все методы](#all-methods)

## Связь доставок в оплатах с другими объектами

**Оплата CRM.** Все методы раздела работают с конкретной оплатой по идентификатору `paymentId`.

**Документ доставки.** Метод [crm.item.payment.delivery.setDelivery](./crm-item-payment-delivery-set-delivery.md) связывает позицию доставки с нужным документом через `deliveryId`.

## Как работать с доставками в оплате

1. Подготовьте `paymentId` нужной оплаты. Получить его можно основными методами оплат [crm.item.payment.*](../index.md).
2. Добавьте позицию доставки методом [crm.item.payment.delivery.add](./crm-item-payment-delivery-add.md).
3. Проверьте состав позиций методом [crm.item.payment.delivery.list](./crm-item-payment-delivery-list.md).
4. При необходимости измените привязку к другому документу через [crm.item.payment.delivery.setDelivery](./crm-item-payment-delivery-set-delivery.md) или удалите позицию методом [crm.item.payment.delivery.delete](./crm-item-payment-delivery-delete.md).

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [crm.item.payment.delivery.add](./crm-item-payment-delivery-add.md) | Добавляет позицию доставки в оплату ||
|| [crm.item.payment.delivery.list](./crm-item-payment-delivery-list.md) | Возвращает список позиций доставки по конкретной оплате ||
|| [crm.item.payment.delivery.delete](./crm-item-payment-delivery-delete.md) | Удаляет позицию доставки из оплаты ||
|| [crm.item.payment.delivery.setDelivery](./crm-item-payment-delivery-set-delivery.md) | Перепривязывает позицию доставки к другому документу доставки ||
|#
