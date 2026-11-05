# Остатки по складам: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Остатки показывают, сколько товара доступно на каждом складе. Методы `catalog.storeproduct.*` помогают:

- синхронизировать остатки по складам между Битрикс24 и внешними системами
- контролировать движение товаров
- предотвращать продажу, если товар закончился

> Быстрый переход: [все методы](#all-methods)

## Как начать работу

1. Получите идентификатор склада методом [catalog.store.list](../store/catalog-store-list.md)
2. Получите идентификатор товара или вариации методом [catalog.product.list](../product/catalog-product-list.md) или [catalog.product.offer.list](../product/offer/catalog-product-offer-list.md)
3. Получите остатки методом [catalog.storeproduct.list](./catalog-store-product-list.md) с фильтром по `productId` и `storeId`. Метод [catalog.storeproduct.get](./catalog-store-product-get.md) принимает идентификатор записи остатка, а не товара
4. Для изменения остатков используйте документы складского учета методами [catalog.document.*](../document/index.md)

## Связь с другими объектами

**Склады.** Чтобы выбрать остатки на конкретном складе, укажите идентификатор склада в поле `storeId` фильтра метода [catalog.storeproduct.list](./catalog-store-product-list.md). Идентификатор склада можно получить методом [catalog.store.list](../store/catalog-store-list.md).

**Товары каталога.** Чтобы выбрать остатки по конкретному товару, укажите идентификатор товара в поле `productId` фильтра метода [catalog.storeproduct.list](./catalog-store-product-list.md). Идентификатор товара можно получить методами:

- [catalog.product.list](../product/catalog-product-list.md) — для простого товара
- [catalog.product.offer.list](../product/offer/catalog-product-offer-list.md) — для вариации

**Документы складского учета.** Методы `catalog.storeproduct.*` только читают остатки. Чтобы изменить остатки по складам, используйте документы складского учета в методах [catalog.document.*](../document/index.md).

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять методы: пользователь с правом «Просмотр каталога товаров» или «Просмотр и выбор склада». Методы возвращают остатки только тех складов, которые доступны пользователю по праву «Просмотр и выбор склада»

#|
|| **Метод** | **Описание** ||
|| [catalog.storeproduct.get](./catalog-store-product-get.md) | Возвращает запись остатка товара на складе по идентификатору записи ||
|| [catalog.storeproduct.list](./catalog-store-product-list.md) | Возвращает список остатков по складам по фильтру ||
|| [catalog.storeproduct.getFields](./catalog-store-product-get-fields.md) | Возвращает поля остатков по складам ||
|#
