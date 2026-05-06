# Привязка заказов к объектам CRM: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Заказы интернет-магазина можно связать с объектами CRM. Это позволяет использовать информацию о заказе в сценариях работы со сделками и счетами.

> Быстрый переход: [все методы](#all-methods)

## Связь с другими объектами

**Заказы интернет-магазина.** Идентификатор заказа `orderId` связывает запись заказа с объектом CRM.

**Объекты CRM.** Привязка поддерживается для сделок и счетов с помощью пары параметров `ownerTypeId` и `ownerId`. Первый определяет тип объекта, второй — идентификатор конкретной сделки или счета.

## Как начать работу

1. Получите идентификатор заказа `orderId` методом [sale.order.add](../../../sale/order/sale-order-add.md) или [sale.order.list](../../../sale/order/sale-order-list.md).
2. Определите тип объекта `ownerTypeId` методом [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md): `2` — сделка, `31` — счет.
3. Получите `ownerId` методом [crm.deal.list](../../deals/crm-deal-list.md) для сделок или [crm.item.list](../crm-item-list.md) с `entityTypeId = 31` для счетов.
4. Создайте привязку методом [crm.orderentity.add](./crm-order-entity-add.md).
5. Проверьте результат методом [crm.orderentity.list](./crm-order-entity-list.md).
6. При необходимости удалите привязку методом [crm.orderentity.deleteByFilter](./crm-order-entity-delete-by-filter.md).
7. Чтобы получить структуру полей привязки, используйте [crm.orderentity.getFields](./crm-order-entity-get-fields.md).

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [crm.orderentity.add](./crm-order-entity-add.md) | Создает привязку заказа к объекту CRM ||
|| [crm.orderentity.list](./crm-order-entity-list.md) | Возвращает список привязок заказов к объектам CRM ||
|| [crm.orderentity.deleteByFilter](./crm-order-entity-delete-by-filter.md) | Удаляет привязку заказа к объекту CRM ||
|| [crm.orderentity.getFields](./crm-order-entity-get-fields.md) | Возвращает поля привязки заказа ||
|#
