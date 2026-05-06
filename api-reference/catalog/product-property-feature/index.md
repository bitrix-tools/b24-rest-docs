# Параметры свойств товаров и вариаций: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Параметры свойства управляют тем, как конкретное свойство товара или вариации используется в каталоге.

В объекте параметра используются:

- `id` — идентификатор параметра свойства
- `propertyId` — идентификатор свойства, к которому относится параметр
- `moduleId` — идентификатор модуля, которому принадлежит параметр
- `featureId` — код параметра свойства
- `isEnabled` — признак активности параметра

> Быстрый переход: [все методы](#all-methods)

## Какие бывают параметры свойств

Набор параметров зависит от конкретного свойства. Актуальный список для выбранного `propertyId` возвращает метод [catalog.productPropertyFeature.getAvailableFeaturesByProperty](./catalog-product-property-feature-get-available-features-by-property.md).

Примеры сочетаний `moduleId + featureId`:

- `moduleId = iblock` и `featureId = LIST_PAGE_SHOW` — показывать свойство на странице списка элементов
- `moduleId = iblock` и `featureId = DETAIL_PAGE_SHOW` — показывать свойство на детальной странице элемента

## Что учитывать перед вызовом методов

- Для чтения параметров свойств нужно право «Просмотр каталога товаров». Для создания и обновления дополнительно нужно право на изменение инфоблока свойства.

- Комбинация `propertyId + moduleId + featureId` должна быть уникальной. Если запись уже существует, метод [catalog.productPropertyFeature.add](./catalog-product-property-feature-add.md) вернет ошибку `Duplicate entry ... for key ...`.

## Как работать с параметрами свойств

1. Получите `propertyId` свойства методом [catalog.productProperty.list](../product-property/catalog-product-property-list.md).
2. Получите доступные для свойства коды `moduleId` и `featureId` методом [catalog.productPropertyFeature.getAvailableFeaturesByProperty](./catalog-product-property-feature-get-available-features-by-property.md).
3. Получите текущие параметры методом [catalog.productPropertyFeature.list](./catalog-product-property-feature-list.md) с фильтром по `propertyId`.
4. Если параметр уже есть, измените его методом [catalog.productPropertyFeature.update](./catalog-product-property-feature-update.md). Если параметра нет, добавьте его методом [catalog.productPropertyFeature.add](./catalog-product-property-feature-add.md).
5. Проверьте параметр по `id` методом [catalog.productPropertyFeature.get](./catalog-product-property-feature-get.md).
6. При необходимости получите структуру полей через [catalog.productPropertyFeature.getFields](./catalog-product-property-feature-get-fields.md).

## Связь параметров с другими объектами

**Свойство товара или вариации.** Параметр связан со свойством через `propertyId`. Для работы со свойствами используйте методы раздела [catalog.productProperty.*](../product-property/index.md).

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [catalog.productPropertyFeature.add](./catalog-product-property-feature-add.md) | Добавляет параметр свойства товара или вариации ||
|| [catalog.productPropertyFeature.update](./catalog-product-property-feature-update.md) | Изменяет параметр свойства товара или вариации ||
|| [catalog.productPropertyFeature.get](./catalog-product-property-feature-get.md) | Возвращает параметр свойства по идентификатору ||
|| [catalog.productPropertyFeature.list](./catalog-product-property-feature-list.md) | Возвращает список параметров свойств товаров и вариаций ||
|| [catalog.productPropertyFeature.getAvailableFeaturesByProperty](./catalog-product-property-feature-get-available-features-by-property.md) | Возвращает доступные параметры для указанного свойства ||
|| [catalog.productPropertyFeature.getFields](./catalog-product-property-feature-get-fields.md) | Возвращает описание полей параметра свойства ||
|#
