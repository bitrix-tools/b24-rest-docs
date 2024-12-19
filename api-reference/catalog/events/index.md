# Обзор событий

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Когда вызывается исходящий вебхук, в момент возникновения зарегистрированного события в ссылку вебхука добавляются следующие параметры:

```php
'FIELDS' => [
    'ID' => $id // id объекта
],
```

## Единицы измерения

#|
|| **Событие** | **Вызывается** ||
|| [CATALOG.MEASURE.ON.ADD](catalog-measure-on-add.md) | При добавлении единицы измерения ||
|| [CATALOG.MEASURE.ON.UPDATE](catalog-measure-on-update.md)| При обновлении единицы измерения ||
|| [CATALOG.MEASURE.ON.DELETE](catalog-measure-on-delete.md)| При удалении единицы измерения ||
|#

## Цена

#|
|| **Событие** | **Вызывается** ||
|| [CATALOG.PRICE.ON.ADD](catalog-price-on-add.md)| При добавлении цены ||
|| [CATALOG.PRICE.ON.UPDATE](catalog-price-on-update.md)| При обновлении цены ||
|| [CATALOG.PRICE.ON.DELETE](catalog-price-on-delete.md)| При удалении цены ||
|#

## Тип цены

#|
|| **Событие** | **Вызывается** ||
|| [CATALOG.PRICE.TYPE.ON.ADD](catalog-price-type-on-add.md)| При добавлении типа цены ||
|| [CATALOG.PRICE.TYPE.ON.UPDATE](catalog-price-type-on-update.md)| При обновлении типа цены ||
|| [CATALOG.PRICE.TYPE.ON.DELETE](catalog-price-type-on-delete.md)| При удалении типа цены ||
|#

## Товар

#|
|| **Событие** | **Вызывается** ||
|| [CATALOG.PRODUCT.ON.ADD](catalog-product-on-add.md)| При добавлении товара ||
|| [CATALOG.PRODUCT.ON.UPDATE](catalog-product-on-update.md)| При обновлении товара ||
|| [CATALOG.PRODUCT.ON.DELETE](catalog-product-on-delete.md)| При удалении товара ||
|#

## Правило округления цен

#|
|| **Событие** | **Вызывается** ||
|| [CATALOG.ROUNDING.ON.ADD](catalog-rounding-on-add.md)| При добавлении правила округления цен ||
|| [CATALOG.ROUNDING.ON.UPDATE](catalog-rounding-on-update.md)| При обновлении правила округления цен ||
|| [CATALOG.ROUNDING.ON.DELETE](catalog-rounding-on-delete.md)| При удалении правила округления цен ||
|#
