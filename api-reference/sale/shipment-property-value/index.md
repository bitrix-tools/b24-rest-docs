# Значения свойств отгрузки в Интернет-магазине: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

При создании [свойства отгрузки](../shipment-property/index.md) можно сразу задать значения. В заказе три книги, которые нужно отправить по разным адресам. Создайте свойство отгрузки «Адрес доставки» с тремя значениями. Если адрес доставки поменялся, измените значение свойства отгрузки с помощью методов `sale.shipmentpropertyvalue.*`.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Что такое персональный раздел покупателя в интернет-магазине](https://helpdesk.bitrix24.ru/open/28803756/)

## Связь значений свойств отгрузки с другими объектами

**Отгрузки.** Укажите идентификатор отгрузки. Список идентификаторов можно получить методом [sale.shipment.list](../shipment/sale-shipment-list.md).

**Свойства отгрузки.** Создайте свойства отгрузки с помощью методов [sale.shipmentproperty.*](../shipment-property/index.md).

## Как начать работу

1. Получите идентификатор отгрузки методом [sale.shipment.list](../shipment/sale-shipment-list.md).
2. Получите идентификатор свойства отгрузки методом [sale.shipmentproperty.list](../shipment-property/sale-shipment-property-list.md).
3. Измените значения свойства методом [sale.shipmentpropertyvalue.modify](./sale-shipment-property-value-modify.md).
4. Проверьте значения методом [sale.shipmentpropertyvalue.get](./sale-shipment-property-value-get.md) или [sale.shipmentpropertyvalue.list](./sale-shipment-property-value-list.md).

## Обзор методов {#all-methods}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять методы: администратор

#|
|| **Метод** | **Описание** ||
|| [sale.shipmentpropertyvalue.modify](./sale-shipment-property-value-modify.md) | Обновляет значения свойства отгрузки ||
|| [sale.shipmentpropertyvalue.get](./sale-shipment-property-value-get.md) | Возвращает значения свойства отгрузки ||
|| [sale.shipmentpropertyvalue.list](./sale-shipment-property-value-list.md) | Возвращает список значений свойства отгрузки ||
|| [sale.shipmentpropertyvalue.delete](./sale-shipment-propertyvalue-delete.md) | Удаляет значения свойства отгрузки ||
|| [sale.shipmentpropertyvalue.getFields](./sale-shipment-property-value-get-fields.md) | Возвращает доступные поля значений свойства отгрузки ||
|#
