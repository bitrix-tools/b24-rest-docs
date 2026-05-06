# Значения списочных свойств товаров: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

У свойства типа `Список` есть набор допустимых значений. Каждое значение хранится как отдельный элемент:

- `id` — идентификатор значения списка
- `propertyId` — идентификатор свойства, к которому относится значение
- `value` — текстовое значение элемента списка
- `xmlId` — внешний код значения списка
- `def` — признак значения по умолчанию
- `sort` — индекс сортировки

> Быстрый переход: [все методы](#all-methods)

## Что учитывать перед вызовом методов

- Методы работают только для свойств типа `Список`. Если при добавлении значения указать свойство другого типа, метод [catalog.productPropertyEnum.add](./catalog-product-property-enum-add.md) вернет ошибку `Only list properties are supported`.

- Поле `xmlId` обязательно и должно быть уникальным в рамках одного свойства.

- Для чтения значений списочных свойств и удаления нужно право «Просмотр каталога товаров». Для создания и обновления дополнительно нужно право на изменение инфоблока свойства.

## Как работать со значениями списочных свойств

1. Проверьте структуру полей через [catalog.productPropertyEnum.getFields](./catalog-product-property-enum-get-fields.md).
2. Определите `propertyId` свойства типа `Список` методом [catalog.productProperty.list](../product-property/catalog-product-property-list.md).
3. Запросите текущие значения списка методом [catalog.productPropertyEnum.list](./catalog-product-property-enum-list.md) с фильтром по `propertyId`.
4. Добавьте значение методом [catalog.productPropertyEnum.add](./catalog-product-property-enum-add.md) или измените существующее методом [catalog.productPropertyEnum.update](./catalog-product-property-enum-update.md).
5. Получите значение по `id` методом [catalog.productPropertyEnum.get](./catalog-product-property-enum-get.md) или удалите его методом [catalog.productPropertyEnum.delete](./catalog-product-property-enum-delete.md).

## Связь с другими объектами

**Свойство товара или вариации.** Значение списка связано со свойством через `propertyId`. Для работы со свойствами используйте методы раздела [catalog.productProperty.*](../product-property/index.md).

**Карточка товара.** Если у товара или вариации есть свойство типа `Список`, в поле этого свойства передается `id` нужного значения.

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [catalog.productPropertyEnum.add](./catalog-product-property-enum-add.md) | Добавляет значение списочного свойства ||
|| [catalog.productPropertyEnum.update](./catalog-product-property-enum-update.md) | Изменяет значение списочного свойства ||
|| [catalog.productPropertyEnum.get](./catalog-product-property-enum-get.md) | Возвращает значение списочного свойства по идентификатору ||
|| [catalog.productPropertyEnum.list](./catalog-product-property-enum-list.md) | Возвращает список значений списочных свойств по фильтру ||
|| [catalog.productPropertyEnum.delete](./catalog-product-property-enum-delete.md) | Удаляет значение списочного свойства ||
|| [catalog.productPropertyEnum.getFields](./catalog-product-property-enum-get-fields.md) | Возвращает описание полей значения списочного свойства ||
|#
