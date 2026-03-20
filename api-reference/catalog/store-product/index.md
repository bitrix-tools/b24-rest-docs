# Остатки по складам: обзор методов

Остатки показывают, сколько товара доступно на каждом складе. Методы `catalog.storeproduct.*` помогают:

- синхронизировать остатки по складам между Битрикс24 и внешними системами,

- контролировать движение товаров,

- предотвращать продажу, если товар закончился.

> Быстрый переход: [все методы](#all-methods)

## Связь с другими объектами

**Склады.** Чтобы выбрать остатки на конкретном складе, укажите `ID` склада в фильтре метода [catalog.storeproduct.list](./catalog-store-product-list.md). `ID` склада можно получить методом [catalog.store.list](../store/catalog-store-list.md).

**Товары каталога.** Чтобы выбрать остатки по конкретному товару, укажите `ID` товара в фильтре метода [catalog.storeproduct.list](./catalog-store-product-list.md). `ID` товара можно получить методами:

- [catalog.product.list](../product/catalog-product-list.md) — для простого товара,

- [catalog.product.offer.list](../product/offer/catalog-product-offer-list.md) — для вариации.

**Документы складского учета.** Чтобы изменять остатки по складам, используйте документы складского учета в методах [catalog.document.*](../document/index.md).

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров»

#|
|| **Метод** | **Описание** ||
|| [catalog.storeproduct.list](./catalog-store-product-list.md) | Возвращает список остатков по складам по фильтру ||
|| [catalog.storeproduct.get](./catalog-store-product-get.md) | Возвращает запись остатка товара по идентификатору ||
|| [catalog.storeproduct.getFields](./catalog-store-product-get-fields.md) | Возвращает поля остатков по складам ||
|#