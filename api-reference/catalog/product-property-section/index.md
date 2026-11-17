# Секционные настройки свойств Торгового каталога: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Секционные настройки определяют, как свойства товаров и вариаций работают в разделах торгового каталога. Настройки управляют отображением свойства в умном фильтре: показывать ли свойство, как его отображать и какую подсказку выводить.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Свойства товаров в каталоге Битрикс24](https://helpdesk.bitrix24.ru/open/28160394/)

## Связь секционных настроек с другими объектами

**Свойство товара или вариации.** Секционные настройки задаются для свойства по `propertyId`. Идентификатор свойства можно получить методами [catalog.productProperty.list](../product-property/catalog-product-property-list.md) и [catalog.productProperty.get](../product-property/catalog-product-property-get.md).

**Секции каталога.** Настройки связаны с разделами торгового каталога и возвращаются объектом [catalog_product_property_section](../data-types.md#catalog_product_property_section). Поле `sectionId` в этом объекте содержит идентификатор раздела. Для общих настроек возвращается значение `0`.

**Умный фильтр.** Поля секционных настроек определяют, как свойство отображается в фильтре каталога:

- `smartFilter` — показывать ли свойство в фильтре
- `displayType` — в каком виде показывать свойство, например флажки, радиокнопки или выпадающий список. Набор видов зависит от типа свойства
- `displayExpanded` — раскрывать ли блок свойства в фильтре
- `filterHint` — какую подсказку показывать пользователю

## Порядок работы с секционными настройками

1. Получите `propertyId` нужного свойства
2. Получите текущие настройки через [catalog.productPropertySection.get](./catalog-product-property-section-get.md) или [catalog.productPropertySection.list](./catalog-product-property-section-list.md)
3. Установите новые значения методом [catalog.productPropertySection.set](./catalog-product-property-section-set.md)
4. Повторно проверьте результат методом [catalog.productPropertySection.get](./catalog-product-property-section-get.md)

## Секционные настройки в REST 3.0

В [REST 3.0](../../rest-v3.md) у секционных настроек свои методы. Они помечены в таблице как `v 3.0`, кроме [catalog.product.property.section.field.list](./catalog-product-property-section-field-list.md) и [catalog.product.property.section.field.get](./catalog-product-property-section-field-get.md): эти методы возвращают описание полей и есть только в новой версии.

Особенности методов новой версии:

- методы работают с настройками всего каталога и отдельного раздела. Раздел задает параметр `sectionId`, `0` — весь каталог
- в [catalog.product.property.section.set](./catalog-product-property-section-set-rest-v3.md) и [catalog.product.property.section.get](./catalog-product-property-section-get-rest-v3.md) свойство и раздел передаются параметрами `propertyId` и `sectionId`
- признаки `smartFilter` и `displayExpanded` передаются и возвращаются как `true` или `false`. Выключенный признак возвращается как `false`, а не `null`
- неизвестные поля в `fields` вызывают ошибку, а не пропускаются

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять методы:
> - пользователь с правом «Просмотр каталога товаров» — для получения настроек
> - пользователь с правом «Просмотр каталога товаров» и правом на изменение инфоблока свойства — для методов `catalog.productPropertySection.set` и `catalog.product.property.section.set`
> - любой пользователь — для `catalog.product.property.section.field.*`

#|
|| **Метод** | **Описание** ||
|| [catalog.productPropertySection.set](./catalog-product-property-section-set.md) | Устанавливает секционные настройки свойства товара или вариации ||
|| [catalog.product.property.section.set](./catalog-product-property-section-set-rest-v3.md) | Устанавливает секционные настройки свойства товара или вариации v 3.0 ||
|| [catalog.productPropertySection.get](./catalog-product-property-section-get.md) | Возвращает секционные настройки свойства по идентификатору ||
|| [catalog.product.property.section.get](./catalog-product-property-section-get-rest-v3.md) | Возвращает секционные настройки свойства для каталога или раздела v 3.0 ||
|| [catalog.productPropertySection.list](./catalog-product-property-section-list.md) | Возвращает список секционных настроек свойств по фильтру ||
|| [catalog.product.property.section.list](./catalog-product-property-section-list-rest-v3.md) | Возвращает список секционных настроек свойств по фильтру v 3.0 ||
|| [catalog.product.property.section.field.list](./catalog-product-property-section-field-list.md) | Возвращает описание полей секционных настроек свойства ||
|| [catalog.product.property.section.field.get](./catalog-product-property-section-field-get.md) | Возвращает описание поля секционных настроек свойства ||
|#
