# Секционные настройки свойств Торгового каталога: обзор методов

Раздел содержит методы для чтения и изменения секционных настроек свойств товаров и вариаций. Настройки определяют поведение свойства в умном фильтре: показывать ли свойство, как его отображать и какую подсказку выводить.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Свойства товаров в каталоге Битрикс24](https://helpdesk.bitrix24.ru/open/28160394/)

## Связь с другими объектами

**Свойство товара или вариации.** Секционные настройки задаются для свойства по `propertyId`. Идентификатор свойства можно получить методами [catalog.productProperty.list](../product-property/catalog-product-property-list.md) и [catalog.productProperty.get](../product-property/catalog-product-property-get.md).

**Секции каталога.** Настройки связаны с разделами торгового каталога и возвращаются объектом [catalog_product_property_section](../data-types.md#catalog_product_property_section). Поле `sectionId` в этом объекте содержит идентификатор раздела. Для общих настроек возвращается значение `0`.

**Умный фильтр.** Поля секционных настроек определяют, как свойство отображается в фильтре каталога:

- `smartFilter` — показывать ли свойство в фильтре,
- `displayType` — в каком виде показывать свойство: флажки, радиокнопки или выпадающий список,
- `displayExpanded` — раскрывать ли блок свойства в фильтре,
- `filterHint` — какую подсказку показывать пользователю.

## Порядок работы с секционными настройками

1. Получите `propertyId` нужного свойства.
2. Получите текущие настройки через [catalog.productPropertySection.get](./catalog-product-property-section-get.md) или [catalog.productPropertySection.list](./catalog-product-property-section-list.md).
3. Установите новые значения методом [catalog.productPropertySection.set](./catalog-product-property-section-set.md).
4. Повторно проверьте результат методом [catalog.productPropertySection.get](./catalog-product-property-section-get.md).

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров»

#|
|| **Метод** | **Описание** ||
|| [catalog.productPropertySection.set](./catalog-product-property-section-set.md) | Устанавливает секционные настройки свойства товара или вариации ||
|| [catalog.productPropertySection.get](./catalog-product-property-section-get.md) | Возвращает секционные настройки свойства по идентификатору ||
|| [catalog.productPropertySection.list](./catalog-product-property-section-list.md) | Возвращает список секционных настроек свойств по фильтру ||
|#
