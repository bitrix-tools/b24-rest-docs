# Обзор методов и событий

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

## Методы

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [catalog.price.add](./catalog-price-add.md) | Метод добавляет цену товара. ||
|| [catalog.price.delete](./catalog-price-delete.md) | Метод удаляет цену товара. ||
|| [catalog.price.get](./catalog-price-get.md) | Метод для получения значений полей цены товара по ID. ||
|| [catalog.price.getFields](./catalog-price-get-fields.md) | Метод возвращает поля цен товаров. ||
|| [catalog.price.list](./catalog-price-list.md) | Метод получает список цен товаров по фильтру. ||
|| [catalog.price.modify](./catalog-price-modify.md) | Метод изменяет элементы коллекции цен товара. ||
|| [catalog.price.update](./catalog-price-update.md) | Метод обновляет поля цены товара. ||
|#

## События

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [CATALOG.PRICE.ON.ADD](../events/catalog-price-on-add.md)| При добавлении цены ||
|| [CATALOG.PRICE.ON.UPDATE](../events/catalog-price-on-update.md)| При обновлении цены ||
|| [CATALOG.PRICE.ON.DELETE](../events/catalog-price-on-delete.md)| При удалении цены ||
|#
