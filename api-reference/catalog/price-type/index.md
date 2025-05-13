# Типы цен в Торговом каталоге: обзор методов

Тип цены — объект Торгового каталога, который позволяет управлять различными ценовыми категориями для товаров и услуг. У одного товара может быть несколько типов цен: оптовая, розничная, партнерская.

Один из типов цен обязательно должен быть обозначен как базовый. Базовый тип цены нельзя удалить.

> Быстрый переход: [все методы и события](#all-methods) 

## Связь типа цены с другими объектами

**Цена.** При создании цены обязательно укажите ее тип. Задать и изменить цену можно с помощью методов [catalog.price.*](../price/index.md). 

**Правила округления цен.** Задайте параметры округления для каждого типа цен с помощью методов [catalog.roundingRule.*](../rounding-rule/index.md).

**Переводы названий типов цен.** Укажите названия типа цены для используемых языков в Битрикс24. Воспользуйтесь методами [catalog.priceTypeLang.*](./price-type-lang/index.md).

## Обзор методов и событий {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять методы: администратор

### Основные

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [catalog.priceType.add](./catalog-price-type-add.md) | Добавляет новый тип цены ||
    || [catalog.priceType.update](./catalog-price-type-update.md) | Изменяет значения полей типа цены ||
    || [catalog.priceType.get](./catalog-price-type-get.md) | Возвращает информацию о типе цены по его идентификатору ||
    || [catalog.priceType.list](./catalog-price-type-list.md) | Возвращает список типов цен по фильтру ||
    || [catalog.priceType.delete](./catalog-price-type-delete.md) | Удаляет тип цены ||
    || [catalog.priceType.getFields](./catalog-price-type-get-fields.md) | Возвращает поля типа цены ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [CATALOG.PRICE.TYPE.ON.ADD](./events/catalog-price-type-on-add.md) | При добавлении типа цены ||
    || [CATALOG.PRICE.TYPE.ON.UPDATE](./events/catalog-price-type-on-update.md) | При обновлении типа цены ||
    || [CATALOG.PRICE.TYPE.ON.DELETE](./events/catalog-price-type-on-delete.md) | При удалении типа цены ||
    |#

{% endlist %}

### Переводы названий типов цен

#|
|| **Метод** | **Описание** ||
|| [catalog.priceTypeLang.add](./price-type-lang/catalog-price-type-lang-add.md) | Добавляет перевод названия типа цены ||
|| [catalog.priceTypeLang.update](./price-type-lang/catalog-price-type-lang-update.md) | Обновляет перевод названия типа цены ||
|| [catalog.priceTypeLang.get](./price-type-lang/catalog-price-type-lang-get.md) | Возвращает значения полей перевода названия типа цены ||
|| [catalog.priceTypeLang.list](./price-type-lang/catalog-price-type-lang-list.md) | Возвращает список переводов названий типов цен по фильтру ||
|| [catalog.priceTypeLang.delete](./price-type-lang/catalog-price-type-lang-delete.md) | Удаляет перевод названия типа цены ||
|| [catalog.priceTypeLang.getLanguages](./price-type-lang/catalog-price-type-lang-get-languages.md) | Возвращает доступные для перевода языки ||
|| [catalog.priceTypeLang.getFields](./price-type-lang/catalog-price-type-lang-get-fields.md) | Возвращает поля перевода названия типа цены ||
|#

### Привязка типов цен к группам покупателей

#|
|| **Метод** | **Описание** ||
|| [catalog.priceTypeGroup.add](./price-type-group/catalog-price-type-group-add.md) | Добавляет привязку типа цены к группе покупателей ||
|| [catalog.priceTypeGroup.list](./price-type-group/catalog-price-type-group-list.md) | Возвращает список привязок типов цен к группам покупателей ||
|| [catalog.priceTypeGroup.delete](./price-type-group/catalog-price-type-group-delete.md) | Удаляет привязку типа цены к группе покупателей ||
|| [catalog.priceTypeGroup.getFields](./price-type-group/catalog-price-type-group-get-fields.md) | Возвращает поля привязки типов цен к группам покупателей ||
|#
