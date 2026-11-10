# Привязка заказов к объектам CRM: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Заказы интернет-магазина можно связать с объектами CRM. Это позволяет использовать информацию о заказе в сценариях работы со сделками и счетами.

Привязка — это отдельная запись, а не поле заказа или объекта CRM. У заказа может быть только одна привязка. Новая привязка к другому объекту CRM заменяет прежнюю, а повторное добавление той же привязки возвращает ошибку `Duplicate entry`.

> Быстрый переход: [все методы](#all-methods)

## Связь с другими объектами

**Заказы интернет-магазина.** Идентификатор заказа `orderId` связывает запись заказа с объектом CRM. Самими заказами управляет группа методов [sale.order.*](../../../sale/order/index.md).

**Объекты CRM.** Привязка поддерживается для сделок и счетов с помощью пары параметров `ownerTypeId` и `ownerId`. Первый определяет тип объекта, второй — идентификатор конкретной сделки или счета.

#|
|| **Объект CRM** | **`ownerTypeId`** | **Где взять `ownerId`** ||
|| Сделка | `2` | [crm.deal.list](../../deals/crm-deal-list.md) ||
|| Счет | `31` | [crm.item.list](../crm-item-list.md) с `entityTypeId = 31` ||
|#

## Как начать работу

1. Получите идентификатор заказа `orderId` методом [sale.order.add](../../../sale/order/sale-order-add.md) или [sale.order.list](../../../sale/order/sale-order-list.md).
2. Подготовьте пару `ownerTypeId` и `ownerId` по таблице выше.
3. Проверьте состав полей привязки методом [crm.orderentity.getFields](./crm-order-entity-get-fields.md).
4. Создайте привязку методом [crm.orderentity.add](./crm-order-entity-add.md).
5. Проверьте результат методом [crm.orderentity.list](./crm-order-entity-list.md).
6. Если связь больше не нужна, удалите ее методом [crm.orderentity.deleteByFilter](./crm-order-entity-delete-by-filter.md).

## Особенности и права доступа

Методы [crm.orderentity.list](./crm-order-entity-list.md) и [crm.orderentity.getFields](./crm-order-entity-get-fields.md) требуют права на чтение интернет-магазина. Методы [crm.orderentity.add](./crm-order-entity-add.md) и [crm.orderentity.deleteByFilter](./crm-order-entity-delete-by-filter.md) требуют права на запись.

Для добавления и удаления привязки `orderId` должен соответствовать существующему заказу. Метод удаления возвращает ошибку, если привязка с указанной комбинацией `orderId`, `ownerTypeId` и `ownerId` не существует. Подробные коды ошибок приведены на страницах методов.

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

## Продолжите изучение

- [{#T}](../index.md)
- [{#T}](../invoice.md)
- [{#T}](../../../sale/order/index.md)