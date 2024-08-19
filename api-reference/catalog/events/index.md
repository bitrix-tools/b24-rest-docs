# События торгового каталога

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

Для всех событий входящий параметр - идентификатор (ID) сущности, по которой сработало событие.

#|
|| **Событие** | **Вызывается** ||
|| [CATALOG.MEASURE.ON.ADD](catalog-measure-on-add.md) | При добавлении единицы измерения. ||
|| [CATALOG.MEASURE.ON.DELETE](catalog-measure-on-delete.md)| При удалении единицы измерения. ||
|| [CATALOG.MEASURE.ON.UPDATE](catalog-measure-on-update.md)| При обновлении единицы измерения. ||
|| [CATALOG.PRICE.ON.ADD](catalog-price-on-add.md)| При добавлении цены. ||
|| [CATALOG.PRICE.ON.DELETE](catalog-price-on-delete.md)| При удалении цены. ||
|| [CATALOG.PRICE.ON.UPDATE](catalog-price-on-update.md)| При обновлении цены. ||
|| [CATALOG.PRICE.TYPE.ON.ADD](catalog-price-type-on-add.md)| При добавлении типа цен. ||
|| [CATALOG.PRICE.TYPE.ON.DELETE](catalog-price-type-on-delete.md)| При удалении типа цен. ||
|| [CATALOG.PRICE.TYPE.ON.UPDATE](catalog-price-type-on-update.md)| При обновлении типа цен. ||
|| [CATALOG.PRODUCT.ON.ADD](catalog-product-on-add.md)| При добавлении товара. ||
|| [CATALOG.PRODUCT.ON.DELETE](catalog-product-on-delete.md)| При удалении товара. ||
|| [CATALOG.PRODUCT.ON.UPDATE](catalog-product-on-update.md)| При обновлении товара. ||
|| [CATALOG.ROUNDING.ON.ADD](catalog-rounding-on-add.md)| При добавлении правила округления цен. ||
|| [CATALOG.ROUNDING.ON.DELETE](catalog-rounding-on-delete.md)| При удалении правила округления цен. ||
|| [CATALOG.ROUNDING.ON.UPDATE](catalog-rounding-on-update.md)| При обновлении правила округления цен. ||
|| [CATALOG.STORE.ON.ADD](catalog-store-on-add.md)| При добавлении склада. ||
|| [CATALOG.STORE.ON.DELETE](catalog-store-on-delete.md)| При удалении склада. ||
|| [CATALOG.STORE.ON.UPDATE](catalog-store-on-update.md)| При обновлении склада. ||
|#

В результате вызова исходящего веб-хука в момент возникновения зарегистрированного события, ссылка в веб-хуке обогащается следующими параметрами:

```php
'FIELDS' => [
    'ID' => $id // id сущности
],
```
