# Цены в Торговом каталоге: обзор методов

Товар может иметь одну или несколько цен. Для каждой цены указываются:

- валюта: российский рубль, доллар США, евро,
- тип: розничная, оптовая, партнерская.

Это позволяет настраивать ценообразование в зависимости от типа клиента, региона или условий сотрудничества.

> Быстрый переход: [все методы и события](#all-methods) 
>
> Пользовательская документация: [Право на изменение цены продажи товара в ĸаталоге](https://helpdesk.bitrix24.ru/open/16342446/)

## Связь цен с другими объектами

**Тип цены.** Каждая цена принадлежит к определенному типу цен. Задать и изменить тип цены можно с помощью методов [catalog.priceType.*](../price-type/index.md).

**Валюта.** Цена указывается в выбранной валюте. Работать с валютами можно через методы [crm.currency.*](../../crm/currency/index.md).

**Наценка.** Она влияет на формирование цены. Получить наценку позволяет метод [catalog.extra.get](../extra/catalog-extra-get.md). Использование наценки доступно только в Битрикс24 с активной опцией расширенного управления ценами, устаревший параметр.

**Товар.** Цена всегда привязана к товару. Создать и отредактировать товар можно с помощью групп методов:

- [catalog.product.*](../product/index.md) — для простых товаров

- [catalog.product.service.*](../product/service/index.md) — для услуг

- [catalog.product.sku.*](../product/sku/index.md) — для головных товаров с вариациями

- [catalog.product.offer.*](../product/offer/index.md) — для вариаций товаров

{% note tip "Пользовательская документация" %}

- [Валюты в CRM](https://helpdesk.bitrix24.ru/open/6987305/)

- [Как создать новый товар в каталоге](https://helpdesk.bitrix24.ru/open/11657084/)

- [Услуги в CRM](https://helpdesk.bitrix24.ru/open/16560760/)

- [Работа с вариациями товара](https://helpdesk.bitrix24.ru/open/11657102/)

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
    || [catalog.price.update](./catalog-price-update.md) | Обновляет цену товара ||
    || [catalog.price.modify](./catalog-price-modify.md) | Обновляет коллекцию цен товара ||    
    || [catalog.price.getFields](./catalog-price-get-fields.md) | Возвращает поля цен товаров ||
    || [catalog.price.list](./catalog-price-list.md) | Возвращает список цен товаров по фильтру ||
    || [catalog.price.get](./catalog-price-get.md) | Возвращает значения полей цены товара по идентификатору ||
    || [catalog.price.delete](./catalog-price-delete.md) | Удаляет цену товара ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [CATALOG.PRICE.ON.ADD](./events/catalog-price-on-add.md)| При добавлении цены ||
    || [CATALOG.PRICE.ON.UPDATE](./events/catalog-price-on-update.md)| При обновлении цены ||
    || [CATALOG.PRICE.ON.DELETE](./events/catalog-price-on-delete.md)| При удалении цены ||
    |#

{% endlist %}