# Значения списочных свойств товаров: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

У свойства типа `Список` есть набор допустимых значений. Каждое значение хранится как отдельный элемент:

- `id` — идентификатор значения списка
- `propertyId` — идентификатор свойства, к которому относится значение
- `value` — текстовое значение элемента списка
- `xmlId` — внешний код значения списка
- `def` — признак значения по умолчанию
- `sort` — индекс сортировки

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как работать со свойствами товаров](https://helpdesk.bitrix24.ru/open/28160394/)

## Что учитывать перед вызовом методов

- Методы работают только для свойств типа `Список`. Если при добавлении значения указать свойство другого типа, метод [catalog.productPropertyEnum.add](./catalog-product-property-enum-add.md) вернет ошибку `Only list properties are supported`

- Поле `xmlId` обязательно и должно быть уникальным в рамках одного свойства

- Для чтения значений нужно право «Просмотр каталога товаров». Для создания, изменения и удаления дополнительно нужно право на изменение инфоблока свойства
- Метод `catalog.productPropertyEnum.update` требует `propertyId`, `value` и `xmlId` при каждом вызове. Перенести значение в другое свойство нельзя

## Как работать со значениями списочных свойств

1. Проверьте структуру полей через [catalog.productPropertyEnum.getFields](./catalog-product-property-enum-get-fields.md)
2. Определите `propertyId` свойства типа `Список` методом [catalog.productProperty.list](../product-property/catalog-product-property-list.md)
3. Запросите текущие значения списка методом [catalog.productPropertyEnum.list](./catalog-product-property-enum-list.md) с фильтром по `propertyId`
4. Добавьте значение методом [catalog.productPropertyEnum.add](./catalog-product-property-enum-add.md) или измените существующее методом [catalog.productPropertyEnum.update](./catalog-product-property-enum-update.md)
5. Получите значение по `id` методом [catalog.productPropertyEnum.get](./catalog-product-property-enum-get.md) или удалите его методом [catalog.productPropertyEnum.delete](./catalog-product-property-enum-delete.md)

## Связь с другими объектами

**Свойство товара или вариации.** Значение списка связано со свойством через `propertyId`. Свойствами товара или вариации управляйте методами [catalog.productProperty.*](../product-property/index.md).

**Карточка товара.** Если у товара или вариации есть свойство типа `Список`, в поле этого свойства передается `id` нужного значения.

## Значения в REST 3.0

В [REST 3.0](../../rest-v3.md) у значений списочных свойств свои методы. Методы, которые есть в обеих версиях API, помечены в таблице как `v 3.0`. Описание полей возвращают два метода: [catalog.product.property.enum.field.list](./catalog-product-property-enum-field-list.md) — всех полей, аналог [catalog.productPropertyEnum.getFields](./catalog-product-property-enum-get-fields.md), и [catalog.product.property.enum.field.get](./catalog-product-property-enum-field-get.md) — одного поля по имени.

Особенности методов новой версии:

- метод [catalog.product.property.enum.update](./catalog-product-property-enum-update-rest-v3.md) меняет только переданные поля: `value` и `xmlId` при каждом вызове передавать не нужно. Перенести значение в другое свойство нельзя: если передать `propertyId`, метод вернет ошибку
- признак `def` передается как `true` или `false`, а не `Y` или `N`. Методы не снимают признак с других значений свойства, поэтому значений по умолчанию может оказаться несколько
- внешний код `xmlId` должен быть уникальным среди значений всех списочных свойств Битрикс24, а не только одного свойства
- метод [catalog.product.property.enum.list](./catalog-product-property-enum-list-rest-v3.md) не принимает в фильтре отрицание по `propertyId` и не сортирует по `def`

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять методы:
> - пользователь с правом «Просмотр каталога товаров» — для получения значений и описания полей
> - пользователь с правом «Просмотр каталога товаров» и правом на изменение инфоблока свойства — для добавления, изменения и удаления
> - любой пользователь — для описания полей в REST 3.0, методов `catalog.product.property.enum.field.*`

#|
|| **Метод** | **Описание** ||
|| [catalog.productPropertyEnum.add](./catalog-product-property-enum-add.md) | Добавляет значение списочного свойства ||
|| [catalog.product.property.enum.add](./catalog-product-property-enum-add-rest-v3.md) | Добавляет значение списочного свойства v 3.0 ||
|| [catalog.productPropertyEnum.update](./catalog-product-property-enum-update.md) | Изменяет значение списочного свойства ||
|| [catalog.product.property.enum.update](./catalog-product-property-enum-update-rest-v3.md) | Изменяет значение списочного свойства v 3.0 ||
|| [catalog.productPropertyEnum.get](./catalog-product-property-enum-get.md) | Возвращает значение списочного свойства по идентификатору ||
|| [catalog.product.property.enum.get](./catalog-product-property-enum-get-rest-v3.md) | Возвращает значение списочного свойства по идентификатору v 3.0 ||
|| [catalog.productPropertyEnum.list](./catalog-product-property-enum-list.md) | Возвращает список значений списочных свойств по фильтру ||
|| [catalog.product.property.enum.list](./catalog-product-property-enum-list-rest-v3.md) | Возвращает список значений списочных свойств по фильтру v 3.0 ||
|| [catalog.productPropertyEnum.delete](./catalog-product-property-enum-delete.md) | Удаляет значение списочного свойства ||
|| [catalog.product.property.enum.delete](./catalog-product-property-enum-delete-rest-v3.md) | Удаляет значение списочного свойства v 3.0 ||
|| [catalog.productPropertyEnum.getFields](./catalog-product-property-enum-get-fields.md) | Возвращает описание полей значения списочного свойства ||
|| [catalog.product.property.enum.field.list](./catalog-product-property-enum-field-list.md) | Возвращает описание полей значения списочного свойства v 3.0 ||
|| [catalog.product.property.enum.field.get](./catalog-product-property-enum-field-get.md) | Возвращает описание поля значения списочного свойства ||
|#
