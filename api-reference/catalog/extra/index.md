# Наценки в Торговом каталоге: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Наценка используется при расчете цены товара. В объекте наценки используются идентификатор `id`, название `name` и значение процента `percentage`.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как назначать цены и работать со скидками](https://helpdesk.bitrix24.ru/open/25601698/)

## Как работать с наценками

1. Получите список наценок методом [catalog.extra.list](./catalog-extra-list.md).
2. Получите нужную наценку по идентификатору методом [catalog.extra.get](./catalog-extra-get.md).
3. При необходимости проверьте структуру полей методом [catalog.extra.getFields](./catalog-extra-get-fields.md).

## Связь с другими объектами

**Цена товара.** Наценка связана с ценой через поле `extraId` в объекте цены. Получить цены и их поля можно методами [catalog.price.list](../price/catalog-price-list.md), [catalog.price.get](../price/catalog-price-get.md) и [catalog.price.getFields](../price/catalog-price-get-fields.md).

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

#|
|| **Метод** | **Описание** ||
|| [catalog.extra.get](./catalog-extra-get.md) | Возвращает информацию о наценке по идентификатору ||
|| [catalog.extra.list](./catalog-extra-list.md) | Возвращает список наценок по фильтру ||
|| [catalog.extra.getFields](./catalog-extra-get-fields.md) | Возвращает поля наценки ||
|#
