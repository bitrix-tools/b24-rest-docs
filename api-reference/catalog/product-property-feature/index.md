# Параметры свойств товаров и вариаций: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Параметры свойства управляют тем, как конкретное свойство товара или вариации используется в каталоге.

В объекте параметра используются:

- `id` — идентификатор параметра свойства
- `propertyId` — идентификатор свойства, к которому относится параметр
- `moduleId` — идентификатор модуля, которому принадлежит параметр
- `featureId` — код параметра свойства
- `isEnabled` — признак активности параметра

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как работать со свойствами товаров](https://helpdesk.bitrix24.ru/open/28160394/)

## Какие бывают параметры свойств

Набор параметров зависит от конкретного свойства. Актуальный список для выбранного `propertyId` возвращает метод [catalog.productPropertyFeature.getAvailableFeaturesByProperty](./catalog-product-property-feature-get-available-features-by-property.md).

Примеры сочетаний `moduleId + featureId`:

- `moduleId = iblock` и `featureId = LIST_PAGE_SHOW` — показывать свойство на странице списка элементов
- `moduleId = iblock` и `featureId = DETAIL_PAGE_SHOW` — показывать свойство на детальной странице элемента

## Что учитывать перед вызовом методов

- Для чтения параметров свойств нужно право «Просмотр каталога товаров». Для создания и обновления дополнительно нужно право на изменение инфоблока свойства

- Комбинация `propertyId + moduleId + featureId` должна быть уникальной. Если запись уже существует, метод [catalog.productPropertyFeature.add](./catalog-product-property-feature-add.md) вернет ошибку `Internal server error.`
- Метод [catalog.productPropertyFeature.update](./catalog-product-property-feature-update.md) ищет параметр по `propertyId`, `moduleId` и `featureId`, а не по `id`, и требует все четыре поля
- Методы не проверяют, что `moduleId` и `featureId` есть в списке доступных параметров свойства
- Метода удаления параметра нет. Параметры удаляются вместе со свойством

## Как работать с параметрами свойств

1. Получите `propertyId` свойства методом [catalog.productProperty.list](../product-property/catalog-product-property-list.md)
2. Получите доступные для свойства коды `moduleId` и `featureId` методом [catalog.productPropertyFeature.getAvailableFeaturesByProperty](./catalog-product-property-feature-get-available-features-by-property.md)
3. Получите текущие параметры методом [catalog.productPropertyFeature.list](./catalog-product-property-feature-list.md) с фильтром по `propertyId`
4. Если параметр уже есть, измените его методом [catalog.productPropertyFeature.update](./catalog-product-property-feature-update.md). Если параметра нет, добавьте его методом [catalog.productPropertyFeature.add](./catalog-product-property-feature-add.md)
5. Проверьте параметр по `id` методом [catalog.productPropertyFeature.get](./catalog-product-property-feature-get.md)
6. При необходимости получите структуру полей через [catalog.productPropertyFeature.getFields](./catalog-product-property-feature-get-fields.md)

## Связь параметров с другими объектами

**Свойство товара или вариации.** Параметр связан со свойством через `propertyId`. Свойствами товара или вариации управляйте методами [catalog.productProperty.*](../product-property/index.md).

## Параметры в REST 3.0

В [REST 3.0](../../rest-v3.md) у параметров свойств свои методы. Методы, которые есть в обеих версиях API, помечены в таблице как `v 3.0`. Описание полей возвращают два метода: [catalog.product.property.feature.field.list](./catalog-product-property-feature-field-list.md) — всех полей, аналог [catalog.productPropertyFeature.getFields](./catalog-product-property-feature-get-fields.md), и [catalog.product.property.feature.field.get](./catalog-product-property-feature-field-get.md) — одного поля по имени.

Особенности методов новой версии:

- метод [catalog.product.property.feature.update](./catalog-product-property-feature-update-rest-v3.md) находит параметр по `id` и меняет только `isEnabled`. Поля `propertyId`, `moduleId` и `featureId` изменить нельзя
- признак `isEnabled` передается и возвращается как `true` или `false`, а не `Y` или `N`
- если параметр у свойства уже есть, метод [catalog.product.property.feature.add](./catalog-product-property-feature-add-rest-v3.md) вернет ошибку `The feature is already assigned to the property`
- метод [catalog.product.property.feature.available.list](./catalog-product-property-feature-available-list.md) с фильтром по `propertyId` возвращает параметры, доступные свойству. Описание его полей возвращают методы [catalog.product.property.feature.available.field.list](./catalog-product-property-feature-available-field-list.md) и [catalog.product.property.feature.available.field.get](./catalog-product-property-feature-available-field-get.md)
- метода удаления параметра нет и в новой версии. Чтобы параметр перестал действовать, выключите его: `isEnabled: false`

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять методы:
> - пользователь с правом «Просмотр каталога товаров» — для получения параметров, доступных параметров и описания полей
> - пользователь с правом «Просмотр каталога товаров» и правом на изменение инфоблока свойства — для добавления и изменения
> - любой пользователь — для описания полей в REST 3.0: `catalog.product.property.feature.field.*` и `catalog.product.property.feature.available.field.*`

#|
|| **Метод** | **Описание** ||
|| [catalog.productPropertyFeature.add](./catalog-product-property-feature-add.md) | Добавляет параметр свойства товара или вариации ||
|| [catalog.product.property.feature.add](./catalog-product-property-feature-add-rest-v3.md) | Добавляет параметр свойства товара или вариации v 3.0 ||
|| [catalog.productPropertyFeature.update](./catalog-product-property-feature-update.md) | Изменяет параметр свойства товара или вариации ||
|| [catalog.product.property.feature.update](./catalog-product-property-feature-update-rest-v3.md) | Изменяет параметр свойства товара или вариации v 3.0 ||
|| [catalog.productPropertyFeature.get](./catalog-product-property-feature-get.md) | Возвращает параметр свойства по идентификатору ||
|| [catalog.product.property.feature.get](./catalog-product-property-feature-get-rest-v3.md) | Возвращает параметр свойства по идентификатору v 3.0 ||
|| [catalog.productPropertyFeature.list](./catalog-product-property-feature-list.md) | Возвращает список параметров свойств товаров и вариаций ||
|| [catalog.product.property.feature.list](./catalog-product-property-feature-list-rest-v3.md) | Возвращает список параметров свойств товаров и вариаций v 3.0 ||
|| [catalog.productPropertyFeature.getAvailableFeaturesByProperty](./catalog-product-property-feature-get-available-features-by-property.md) | Возвращает доступные параметры для указанного свойства ||
|| [catalog.product.property.feature.available.list](./catalog-product-property-feature-available-list.md) | Возвращает доступные параметры для указанного свойства v 3.0 ||
|| [catalog.productPropertyFeature.getFields](./catalog-product-property-feature-get-fields.md) | Возвращает описание полей параметра свойства ||
|| [catalog.product.property.feature.field.list](./catalog-product-property-feature-field-list.md) | Возвращает описание полей параметра свойства v 3.0 ||
|| [catalog.product.property.feature.field.get](./catalog-product-property-feature-field-get.md) | Возвращает описание поля параметра свойства ||
|| [catalog.product.property.feature.available.field.list](./catalog-product-property-feature-available-field-list.md) | Возвращает описание полей доступного параметра свойства ||
|| [catalog.product.property.feature.available.field.get](./catalog-product-property-feature-available-field-get.md) | Возвращает описание поля доступного параметра свойства ||
|#
