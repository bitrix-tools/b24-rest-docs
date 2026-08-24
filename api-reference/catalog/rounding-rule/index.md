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

## Связь с другими объектами

**Типы цен.** Правило округления применяется к типу цены. Получить и настроить типы цен можно методами [catalog.priceType.*](../price-type/index.md).

## Обзор методов и событий {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять методы: администратор

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [catalog.roundingRule.add](./catalog-rounding-rule-add.md) | Добавляет правило округления цен ||
    || [catalog.roundingRule.update](./catalog-rounding-rule-update.md) | Изменяет правило округления цен ||
    || [catalog.roundingRule.get](./catalog-rounding-rule-get.md) | Возвращает информацию о правиле округления цен по его идентификатору ||
    || [catalog.roundingRule.list](./catalog-rounding-rule-list.md) | Возвращает список правил округления цен ||
    || [catalog.roundingRule.delete](./catalog-rounding-rule-delete.md) | Удаляет правило округления цен ||
    || [catalog.roundingRule.getFields](./catalog-rounding-rule-get-fields.md) | Возвращает поля правила округления цен ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [CATALOG.ROUNDING.ON.ADD](./events/catalog-rounding-on-add.md) | При добавлении правила округления цен ||
    || [CATALOG.ROUNDING.ON.UPDATE](./events/catalog-rounding-on-update.md) | При обновлении правила округления цен ||
    || [CATALOG.ROUNDING.ON.DELETE](./events/catalog-rounding-on-delete.md) | При удалении правила округления цен ||
    |#

{% endlist %}
