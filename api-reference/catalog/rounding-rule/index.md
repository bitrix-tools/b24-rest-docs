# Правила округления цен в Торговом каталоге: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Правило округления цен — это набор настроек, которые определяют, как изменять цену товара или услуги в корзине. Они помогают автоматически округлять цены, например до ближайшего целого числа или до определенной дробной части.

Есть три типа округления цен:

- математическое округление
- округление вверх: цена увеличивается, что выгодно магазину
- округление вниз: цена уменьшается, что выгодно клиенту

> Быстрый переход: [все методы и события](#all-methods)

## Как начать работу

1. Получите тип цены методом [catalog.priceType.list](../price-type/catalog-price-type-list.md)
2. Проверьте доступные поля правила методом [catalog.roundingRule.getFields](./catalog-rounding-rule-get-fields.md)
3. Создайте правило округления методом [catalog.roundingRule.add](./catalog-rounding-rule-add.md)
4. Проверьте правило методом [catalog.roundingRule.get](./catalog-rounding-rule-get.md) или [catalog.roundingRule.list](./catalog-rounding-rule-list.md)
5. Отслеживайте изменения через [события правил округления](./events/index.md)

## Правила округления в REST 3.0

В [REST 3.0](../../rest-v3.md) для правил округления есть методы добавления, изменения, получения, удаления и методы получения схемы полей `catalog.roundingrule.field.list` и `catalog.roundingrule.field.get`. Методы, которые есть в обеих версиях API, помечены в таблице как `v 3.0`.

Особенности методов новой версии:

- имена методов пишутся в нижнем регистре: `catalog.roundingrule.list`. Вызов `catalog.roundingRule.list` по адресу `/rest/api/` вернет ошибку `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`
- значение `price` должно быть уникальным в пределах типа цены
- метод [catalog.roundingrule.update](./catalog-rounding-rule-update-rest-v3.md) меняет только переданные поля, в том числе тип цены `catalogGroupId`

## Связь с другими объектами

**Типы цен.** Правило округления применяется к типу цены. Получить и настроить типы цен можно методами [catalog.priceType.*](../price-type/index.md).

## Обзор методов и событий {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять методы:
> - администратор — для методов прежней версии API
> - пользователь с правом «Просмотр каталога товаров» или «Управление типами цен» — для получения правил в REST 3.0. Для добавления, изменения и удаления нужно право «Управление типами цен»

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [catalog.roundingRule.add](./catalog-rounding-rule-add.md) | Добавляет правило округления цен ||
    || [catalog.roundingrule.add](./catalog-rounding-rule-add-rest-v3.md) | Добавляет правило округления цен v 3.0 ||
    || [catalog.roundingRule.update](./catalog-rounding-rule-update.md) | Изменяет правило округления цен ||
    || [catalog.roundingrule.update](./catalog-rounding-rule-update-rest-v3.md) | Изменяет правило округления цен v 3.0 ||
    || [catalog.roundingRule.get](./catalog-rounding-rule-get.md) | Возвращает информацию о правиле округления цен по его идентификатору ||
    || [catalog.roundingrule.get](./catalog-rounding-rule-get-rest-v3.md) | Возвращает информацию о правиле округления цен по его идентификатору v 3.0 ||
    || [catalog.roundingRule.list](./catalog-rounding-rule-list.md) | Возвращает список правил округления цен ||
    || [catalog.roundingrule.list](./catalog-rounding-rule-list-rest-v3.md) | Возвращает список правил округления цен v 3.0 ||
    || [catalog.roundingRule.delete](./catalog-rounding-rule-delete.md) | Удаляет правило округления цен ||
    || [catalog.roundingrule.delete](./catalog-rounding-rule-delete-rest-v3.md) | Удаляет правило округления цен v 3.0 ||
    || [catalog.roundingRule.getFields](./catalog-rounding-rule-get-fields.md) | Возвращает поля правила округления цен ||
    || [catalog.roundingrule.field.list](./catalog-rounding-rule-field-list.md) | Возвращает список полей правила округления цен v 3.0 ||
    || [catalog.roundingrule.field.get](./catalog-rounding-rule-field-get.md) | Возвращает описание поля правила округления цен ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [CATALOG.ROUNDING.ON.ADD](./events/catalog-rounding-on-add.md) | При добавлении правила округления цен ||
    || [CATALOG.ROUNDING.ON.UPDATE](./events/catalog-rounding-on-update.md) | При обновлении правила округления цен ||
    || [CATALOG.ROUNDING.ON.DELETE](./events/catalog-rounding-on-delete.md) | При удалении правила округления цен ||
    |#

{% endlist %}
