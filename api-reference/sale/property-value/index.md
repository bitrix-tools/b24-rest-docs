# Значения свойств заказа в Интернет-магазине: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Значение свойства — это фактические данные, которые передаются в поле заказа при оформлении. Например, телефон, адрес доставки, дата доставки или комментарий покупателя. Эти значения нужны, чтобы обработать конкретный заказ, передать данные в доставку и оплату, а также сохранить корректную информацию в карточке заказа.

Каждое значение свойства задается набором полей:

- `id` — идентификатор значения свойства
- `name` — название свойства
- `orderId` — идентификатор заказа
- `code` — символьный код свойства
- `orderPropsId` — идентификатор свойства заказа
- `orderPropsXmlId` — внешний идентификатор свойства заказа
- `value` — значение свойства заказа

> Быстрый переход: [все методы](#all-methods)

## Что учитывать перед вызовом методов

- Методы `sale.propertyvalue.*` доступны только администратору.
- Поле `value` передается в формате, который соответствует типу свойства заказа. Для типа `FILE` используется объект [`sale_order_property_value_file_value`](../data-types.md#sale_order_property_value_file_value), для остальных типов — [`string`](../../data-types.md). Тип свойства можно получить методами [sale.property.get](../property/sale-property-get.md) и [sale.property.list](../property/sale-property-list.md).
- Метод [sale.propertyvalue.modify](./sale-property-value-modify.md) принимает полный набор значений свойств заказа. Если часть значений не передать, текущие значения этих свойств будут удалены.

## Как начать работу со значениями свойств

1. Получите `orderId` методом [sale.order.get](../order/sale-order-get.md) или [sale.order.list](../order/sale-order-list.md).
2. Получите `orderPropsId` методом [sale.property.list](../property/sale-property-list.md).
3. Проверьте доступные поля методом [sale.propertyvalue.getFields](./sale-property-value-get-fields.md).
4. Просмотрите текущие значения через [sale.propertyvalue.list](./sale-property-value-list.md) или [sale.propertyvalue.get](./sale-property-value-get.md).
5. Подготовьте полный набор значений свойства заказа и обновите его методом [sale.propertyvalue.modify](./sale-property-value-modify.md).
6. При необходимости удалите конкретное значение свойства методом [sale.propertyvalue.delete](./sale-property-value-delete.md).

## Связь с другими объектами

**Заказ.** Значения свойства всегда привязаны к конкретному заказу через `orderId`. Для работы с заказом используйте методы раздела [sale.order.*](../order/index.md).

**Свойства заказа.** Значение относится к конкретному свойству по `orderPropsId`. Для работы со свойствами заказа используйте методы раздела [sale.property.*](../property/index.md).

**Привязка свойств.** Видимость и условия показа свойства в оформлении заказа настраиваются отдельно методами раздела [sale.propertyRelation.*](../property-relation/index.md).

## Обзор методов {#all-methods}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять методы: администратор

#|
|| **Метод** | **Описание** ||
|| [sale.propertyvalue.modify](./sale-property-value-modify.md) | Изменяет значение свойства ||
|| [sale.propertyvalue.get](./sale-property-value-get.md) | Получает значение свойства по идентификатору ||
|| [sale.propertyvalue.list](./sale-property-value-list.md) | Получает список значений свойств ||
|| [sale.propertyvalue.delete](./sale-property-value-delete.md) | Удаляет значения свойства ||
|| [sale.propertyvalue.getFields](./sale-property-value-get-fields.md) | Возвращает доступные поля значения свойства ||
|#
