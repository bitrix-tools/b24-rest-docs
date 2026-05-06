# Переводы названий типов цен в Торговом каталоге: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Перевод названия типа цены позволяет задать локализованное имя для каждого языка в Битрикс24. Это нужно, чтобы один и тот же тип цены корректно отображался в интерфейсе на разных языках.

В переводе используются:

- `id` — идентификатор перевода
- `catalogGroupId` — идентификатор типа цены
- `lang` — код языка
- `name` — локализованное название типа цены

> Быстрый переход: [все методы](#all-methods)

## Что учитывать перед вызовом методов

- Методы `catalog.priceTypeLang.*` доступны только администратору.

- Для одного типа цены можно создать только один перевод на конкретный язык. Пара `catalogGroupId + lang` должна быть уникальной. Перед созданием или обновлением проверьте существующий перевод через [catalog.priceTypeLang.list](./catalog-price-type-lang-list.md) с фильтром по `catalogGroupId` и `lang`.

## Как работать с переводами названий типов цен

1. Получите список доступных языков через [catalog.priceTypeLang.getLanguages](./catalog-price-type-lang-get-languages.md).
2. Проверьте структуру полей через [catalog.priceTypeLang.getFields](./catalog-price-type-lang-get-fields.md).
3. Добавьте перевод методом [catalog.priceTypeLang.add](./catalog-price-type-lang-add.md).
4. Для изменения перевода используйте [catalog.priceTypeLang.update](./catalog-price-type-lang-update.md), для удаления — [catalog.priceTypeLang.delete](./catalog-price-type-lang-delete.md).
5. Для чтения одного перевода по `id` используйте [catalog.priceTypeLang.get](./catalog-price-type-lang-get.md), для получения списка переводов по фильтру — [catalog.priceTypeLang.list](./catalog-price-type-lang-list.md).

## Связь переводов с другими объектами

**Тип цены.** Перевод привязывается к типу цены через поле `catalogGroupId`. Идентификатор типа цены можно получить методами [catalog.priceType.list](../catalog-price-type-list.md) и [catalog.priceType.get](../catalog-price-type-get.md).

**Язык интерфейса.** Для перевода используется код языка в поле `lang`. В `lang` передавайте значение поля `lid` из ответа метода [catalog.priceTypeLang.getLanguages](./catalog-price-type-lang-get-languages.md).

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

#|
|| **Метод** | **Описание** ||
|| [catalog.priceTypeLang.add](./catalog-price-type-lang-add.md) | Добавляет перевод названия типа цены ||
|| [catalog.priceTypeLang.update](./catalog-price-type-lang-update.md) | Обновляет перевод названия типа цены ||
|| [catalog.priceTypeLang.get](./catalog-price-type-lang-get.md) | Возвращает значения полей перевода названия типа цены ||
|| [catalog.priceTypeLang.list](./catalog-price-type-lang-list.md) | Возвращает список переводов названий типов цен по фильтру ||
|| [catalog.priceTypeLang.delete](./catalog-price-type-lang-delete.md) | Удаляет перевод названия типа цены ||
|| [catalog.priceTypeLang.getLanguages](./catalog-price-type-lang-get-languages.md) | Возвращает доступные для перевода языки ||
|| [catalog.priceTypeLang.getFields](./catalog-price-type-lang-get-fields.md) | Возвращает поля перевода названия типа цены ||
|#
