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

## Остатки в REST 3.0

В [REST 3.0](../../rest-v3.md) имена методов пишутся с точкой между `store` и `product`: `catalog.store.product.*` вместо прежних `catalog.storeproduct.*`. Остатки можно получить списком или по идентификатору записи. Описание полей остатка возвращают методы `catalog.store.product.field.list` и `catalog.store.product.field.get`. Методы, которые есть в обеих версиях API, помечены в таблице как `v 3.0`.

Особенности методов новой версии:

- фильтр передается в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`, например `[["productId", "=", 6595]]`
- общее количество записей не возвращается. Если в ответе меньше записей, чем `limit`, страница последняя
- остатки, как и в прежней версии, только читаются. Изменить их можно документами складского учета

## Связь с другими объектами

**Склады.** Чтобы выбрать остатки на конкретном складе, укажите идентификатор склада в поле `storeId` фильтра метода [catalog.storeproduct.list](./catalog-store-product-list.md). Идентификатор склада можно получить методом [catalog.store.list](../store/catalog-store-list.md).

**Товары каталога.** Чтобы выбрать остатки по конкретному товару, укажите идентификатор товара в поле `productId` фильтра метода [catalog.storeproduct.list](./catalog-store-product-list.md). Идентификатор товара можно получить методами:

- [catalog.product.list](../product/catalog-product-list.md) — для простого товара
- [catalog.product.offer.list](../product/offer/catalog-product-offer-list.md) — для вариации

**Документы складского учета.** Методы `catalog.storeproduct.*` только читают остатки. Чтобы изменить остатки по складам, используйте документы складского учета в методах [catalog.document.*](../document/index.md).

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять методы:
> - чтение остатков — пользователь с правом «Просмотр каталога товаров» или «Просмотр и выбор склада». Методы возвращают остатки только тех складов, которые доступны пользователю по праву «Просмотр и выбор склада»
> - `catalog.store.product.field.list` и `catalog.store.product.field.get` — любой пользователь

#|
|| **Метод** | **Описание** ||
|| [catalog.storeproduct.get](./catalog-store-product-get.md) | Возвращает запись остатка товара на складе по идентификатору записи ||
|| [catalog.store.product.get](./catalog-store-product-get-rest-v3.md) | Возвращает запись остатка товара на складе по идентификатору записи v 3.0 ||
|| [catalog.storeproduct.list](./catalog-store-product-list.md) | Возвращает список остатков по складам по фильтру ||
|| [catalog.store.product.list](./catalog-store-product-list-rest-v3.md) | Возвращает список остатков по складам по фильтру v 3.0 ||
|| [catalog.storeproduct.getFields](./catalog-store-product-get-fields.md) | Возвращает поля остатков по складам ||
|| [catalog.store.product.field.list](./catalog-store-product-field-list.md) | Возвращает список полей остатков по складам v 3.0 ||
|| [catalog.store.product.field.get](./catalog-store-product-field-get.md) | Возвращает описание поля остатков по складам ||
|#
