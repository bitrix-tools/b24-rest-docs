# Цены в Торговом каталоге: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Товар может иметь одну или несколько цен. Для каждой цены указываются:

- валюта: российский рубль, доллар США, евро
- тип: розничная, оптовая, партнерская

Это позволяет настраивать ценообразование в зависимости от типа клиента, региона или условий сотрудничества.

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [Право на изменение цены продажи товара в каталоге](https://helpdesk.bitrix24.ru/open/16342446/)

## Как начать работу

1. Получите тип цены методом [catalog.priceType.list](../price-type/catalog-price-type-list.md)
2. Получите идентификатор товара или вариации
3. Добавьте цену методом [catalog.price.add](./catalog-price-add.md)
4. Проверьте цену методом [catalog.price.get](./catalog-price-get.md) или [catalog.price.list](./catalog-price-list.md)
5. Отслеживайте изменения через [события цен](./events/index.md)

## Цены в REST 3.0

В [REST 3.0](../../rest-v3.md) для цен есть методы добавления, изменения, получения, удаления и методы получения схемы полей `catalog.price.field.list` и `catalog.price.field.get`. Методы, которые есть в обеих версиях API, помечены в таблице как `v 3.0`.

Особенности методов новой версии:

- метода `catalog.price.modify` в REST 3.0 нет. Чтобы изменить цену и сохранить ее идентификатор, используйте [catalog.price.update](./catalog-price-update-rest-v3.md)
- товар и тип цены задаются при создании цены. Метод `catalog.price.update` не меняет `productId` и `catalogGroupId`, даже если передать их в `fields`
- у цены базового типа наценки нет: `extraId` сбрасывается в `0`. Несуществующий `extraId` тоже сбрасывается в `0`
- для несуществующего товара метод [catalog.price.add](./catalog-price-add-rest-v3.md) возвращает ошибку доступа `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, а не ошибку «не найдено»
- пустые `extraId`, `quantityFrom` и `quantityTo` приходят как `0`

## Связь с другими объектами

**Тип цены.** Каждая цена принадлежит к определенному типу цен. Задать и изменить тип цены можно с помощью методов [catalog.priceType.*](../price-type/index.md).

**Валюта.** Цена указывается в выбранной валюте. Работать с валютами можно через методы [crm.currency.*](../../crm/currency/index.md).

**Наценка.** Наценка влияет на формирование цены. Получить наценку позволяет метод [catalog.extra.get](../extra/catalog-extra-get.md). Использование наценки доступно только в Битрикс24 с активной опцией расширенного управления ценами.

**Товар.** Цена всегда привязана к товару. Создать и отредактировать товар можно с помощью групп методов:

- [catalog.product.*](../product/index.md) — для простых товаров
- [catalog.product.service.*](../product/service/index.md) — для услуг
- [catalog.product.sku.*](../product/sku/index.md) — для головных товаров с вариациями
- [catalog.product.offer.*](../product/offer/index.md) — для вариаций товаров

{% note tip "Пользовательская документация" %}

- [Как добавить и настроить валюты в CRM](https://helpdesk.bitrix24.ru/open/6987305/)
- [Как создать товар в каталоге](https://helpdesk.bitrix24.ru/open/11657084/)
- [Услуги в CRM](https://helpdesk.bitrix24.ru/open/16560760/)
- [Как работать с вариациями товара](https://helpdesk.bitrix24.ru/open/11657102/)

{% endnote %}

## Обзор методов и событий {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [catalog.price.add](./catalog-price-add.md) | Добавляет цену товара ||
    || [catalog.price.add](./catalog-price-add-rest-v3.md) | Добавляет цену товара v 3.0 ||
    || [catalog.price.update](./catalog-price-update.md) | Обновляет цену товара ||
    || [catalog.price.update](./catalog-price-update-rest-v3.md) | Обновляет цену товара v 3.0 ||
    || [catalog.price.get](./catalog-price-get.md) | Возвращает значения полей цены товара по идентификатору ||
    || [catalog.price.get](./catalog-price-get-rest-v3.md) | Возвращает значения полей цены товара по идентификатору v 3.0 ||
    || [catalog.price.list](./catalog-price-list.md) | Возвращает список цен товаров по фильтру ||
    || [catalog.price.list](./catalog-price-list-rest-v3.md) | Возвращает список цен товаров по фильтру v 3.0 ||
    || [catalog.price.delete](./catalog-price-delete.md) | Удаляет цену товара ||
    || [catalog.price.delete](./catalog-price-delete-rest-v3.md) | Удаляет цену товара v 3.0 ||
    || [catalog.price.modify](./catalog-price-modify.md) | Обновляет коллекцию цен товара ||
    || [catalog.price.getFields](./catalog-price-get-fields.md) | Возвращает поля цен товаров ||
    || [catalog.price.field.list](./catalog-price-field-list.md) | Возвращает список полей цены v 3.0 ||
    || [catalog.price.field.get](./catalog-price-field-get.md) | Возвращает описание поля цены ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [CATALOG.PRICE.ON.ADD](./events/catalog-price-on-add.md) | При добавлении цены ||
    || [CATALOG.PRICE.ON.UPDATE](./events/catalog-price-on-update.md) | При обновлении цены ||
    || [CATALOG.PRICE.ON.DELETE](./events/catalog-price-on-delete.md) | При удалении цены ||
    |#

{% endlist %}
