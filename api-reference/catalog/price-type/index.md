# Типы цен в Торговом каталоге: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Тип цены — объект Торгового каталога, который позволяет управлять различными ценовыми категориями для товаров и услуг. У одного товара может быть несколько типов цен: оптовая, розничная, партнерская.

Один из типов цен обязательно должен быть обозначен как базовый. Базовый тип цены нельзя удалить.

> Быстрый переход: [все методы и события](#all-methods)

## Как начать работу

1. Создайте тип цены методом [catalog.priceType.add](./catalog-price-type-add.md)
2. При необходимости добавьте переводы названия методами [catalog.priceTypeLang.*](./price-type-lang/index.md)
3. Настройте доступ групп покупателей методами [catalog.priceTypeGroup.*](./price-type-group/index.md)
4. Используйте тип цены при создании цены методом [catalog.price.add](../price/catalog-price-add.md)

## Форма результатов

Методы возвращают данные в следующих полях:

- `catalog.priceType.add`, `catalog.priceType.get` и `catalog.priceType.update` — объект типа цены в `result.priceType`
- `catalog.priceType.list` — массив объектов в `result.priceTypes` и общее количество записей в `total`
- `catalog.priceType.delete` — результат удаления в `result`
- `catalog.priceType.getFields` — описание полей в `result.priceType`

## Типы цен в REST 3.0

В [REST 3.0](../../rest-v3.md) для типов цен, привязок к группам покупателей и переводов названий есть свои методы, в том числе методы получения схемы полей `*.field.list` и `*.field.get`. Методы, которые есть в обеих версиях API, помечены в таблицах как `v 3.0`.

Особенности методов новой версии:

- имена методов пишутся в нижнем регистре: `catalog.pricetype.list`, `catalog.pricetype.group.add`, `catalog.pricetype.lang.getlanguages`. Вызов `catalog.priceType.list` по адресу `/rest/api/` вернет ошибку `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`
- поле `base` принимает `true` или `false`. Значение `true` у другого типа снимает признак с прежнего базового типа, а `false` у базового типа оставляет Битрикс24 без базового типа цены
- новый тип цены открыт для просмотра и покупки только группе администраторов. Доступ другим группам открывают методы `catalog.pricetype.group.*`
- метод [catalog.pricetype.delete](./catalog-price-type-delete-rest-v3.md) удаляет вместе с типом цены цены этого типа, привязки к группам покупателей, переводы названия и правила округления. Базовый тип удалить нельзя
- методов получения привязок и переводов в новой версии нет. Используйте методы [catalog.priceTypeGroup.list](./price-type-group/catalog-price-type-group-list.md) и [catalog.priceTypeLang.list](./price-type-lang/catalog-price-type-lang-list.md)

## Связь с другими объектами

**Цена.** При создании цены обязательно укажите ее тип. Задать и изменить цену можно с помощью методов [catalog.price.*](../price/index.md).

**Правила округления цен.** Задайте параметры округления для каждого типа цен с помощью методов [catalog.roundingRule.*](../rounding-rule/index.md).

**Переводы названий типов цен.** Укажите названия типа цены для используемых языков в Битрикс24. Воспользуйтесь методами [catalog.priceTypeLang.*](./price-type-lang/index.md).

## Обзор методов и событий {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять методы: зависит от метода

### Основные

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [catalog.priceType.add](./catalog-price-type-add.md) | Добавляет новый тип цены ||
    || [catalog.pricetype.add](./catalog-price-type-add-rest-v3.md) | Добавляет новый тип цены v 3.0 ||
    || [catalog.priceType.update](./catalog-price-type-update.md) | Изменяет значения полей типа цены ||
    || [catalog.pricetype.update](./catalog-price-type-update-rest-v3.md) | Изменяет значения полей типа цены v 3.0 ||
    || [catalog.priceType.get](./catalog-price-type-get.md) | Возвращает информацию о типе цены по его идентификатору ||
    || [catalog.pricetype.get](./catalog-price-type-get-rest-v3.md) | Возвращает информацию о типе цены по его идентификатору v 3.0 ||
    || [catalog.priceType.list](./catalog-price-type-list.md) | Возвращает список типов цен по фильтру ||
    || [catalog.pricetype.list](./catalog-price-type-list-rest-v3.md) | Возвращает список типов цен по фильтру v 3.0 ||
    || [catalog.priceType.delete](./catalog-price-type-delete.md) | Удаляет тип цены ||
    || [catalog.pricetype.delete](./catalog-price-type-delete-rest-v3.md) | Удаляет тип цены v 3.0 ||
    || [catalog.priceType.getFields](./catalog-price-type-get-fields.md) | Возвращает поля типа цены ||
    || [catalog.pricetype.field.list](./catalog-price-type-field-list.md) | Возвращает список полей типа цены v 3.0 ||
    || [catalog.pricetype.field.get](./catalog-price-type-field-get.md) | Возвращает описание поля типа цены ||
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
|| [catalog.pricetype.lang.add](./price-type-lang/catalog-price-type-lang-add-rest-v3.md) | Добавляет перевод названия типа цены v 3.0 ||
|| [catalog.priceTypeLang.update](./price-type-lang/catalog-price-type-lang-update.md) | Обновляет перевод названия типа цены ||
|| [catalog.pricetype.lang.update](./price-type-lang/catalog-price-type-lang-update-rest-v3.md) | Обновляет перевод названия типа цены v 3.0 ||
|| [catalog.priceTypeLang.get](./price-type-lang/catalog-price-type-lang-get.md) | Возвращает значения полей перевода названия типа цены ||
|| [catalog.priceTypeLang.list](./price-type-lang/catalog-price-type-lang-list.md) | Возвращает список переводов названий типов цен по фильтру ||
|| [catalog.priceTypeLang.delete](./price-type-lang/catalog-price-type-lang-delete.md) | Удаляет перевод названия типа цены ||
|| [catalog.pricetype.lang.delete](./price-type-lang/catalog-price-type-lang-delete-rest-v3.md) | Удаляет перевод названия типа цены v 3.0 ||
|| [catalog.priceTypeLang.getLanguages](./price-type-lang/catalog-price-type-lang-get-languages.md) | Возвращает доступные для перевода языки ||
|| [catalog.pricetype.lang.getlanguages](./price-type-lang/catalog-price-type-lang-get-languages-rest-v3.md) | Возвращает доступные для перевода языки v 3.0 ||
|| [catalog.priceTypeLang.getFields](./price-type-lang/catalog-price-type-lang-get-fields.md) | Возвращает поля перевода названия типа цены ||
|| [catalog.pricetype.lang.field.list](./price-type-lang/catalog-price-type-lang-field-list.md) | Возвращает список полей перевода названия типа цены v 3.0 ||
|| [catalog.pricetype.lang.field.get](./price-type-lang/catalog-price-type-lang-field-get.md) | Возвращает описание поля перевода названия типа цены ||
|#

### Привязка типов цен к группам покупателей

#|
|| **Метод** | **Описание** ||
|| [catalog.priceTypeGroup.add](./price-type-group/catalog-price-type-group-add.md) | Добавляет привязку типа цены к группе покупателей ||
|| [catalog.pricetype.group.add](./price-type-group/catalog-price-type-group-add-rest-v3.md) | Добавляет привязку типа цены к группе покупателей v 3.0 ||
|| [catalog.priceTypeGroup.list](./price-type-group/catalog-price-type-group-list.md) | Возвращает список привязок типов цен к группам покупателей ||
|| [catalog.priceTypeGroup.delete](./price-type-group/catalog-price-type-group-delete.md) | Удаляет привязку типа цены к группе покупателей ||
|| [catalog.pricetype.group.delete](./price-type-group/catalog-price-type-group-delete-rest-v3.md) | Удаляет привязку типа цены к группе покупателей v 3.0 ||
|| [catalog.priceTypeGroup.getFields](./price-type-group/catalog-price-type-group-get-fields.md) | Возвращает поля привязки типов цен к группам покупателей ||
|| [catalog.pricetype.group.field.list](./price-type-group/catalog-price-type-group-field-list.md) | Возвращает список полей привязки типа цены к группе покупателей v 3.0 ||
|| [catalog.pricetype.group.field.get](./price-type-group/catalog-price-type-group-field-get.md) | Возвращает описание поля привязки типа цены к группе покупателей ||
|#
