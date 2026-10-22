# Переводы названий типов цен в Торговом каталоге: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Перевод названия типа цены позволяет задать локализованное имя для каждого языка в Битрикс24. Это нужно, чтобы один и тот же тип цены корректно отображался в интерфейсе на разных языках.

В переводе используются:

- `id` — идентификатор перевода
- `catalogGroupId` — идентификатор типа цены
- `lang` — код языка
- `name` — локализованное название типа цены

> Быстрый переход: [все методы](#all-methods)

## Что учитывать перед вызовом методов

- Для чтения переводов нужно право «Просмотр каталога товаров» или «Управление типами цен». Для создания, изменения и удаления — право «Управление типами цен»
- Для одного типа цены можно создать только один перевод на конкретный язык. Пара `catalogGroupId + lang` должна быть уникальной. Перед созданием или обновлением проверьте существующий перевод через [catalog.priceTypeLang.list](./catalog-price-type-lang-list.md) с фильтром по `catalogGroupId` и `lang`

## Как начать работу

1. Получите список доступных языков через [catalog.priceTypeLang.getLanguages](./catalog-price-type-lang-get-languages.md)
2. Проверьте структуру полей через [catalog.priceTypeLang.getFields](./catalog-price-type-lang-get-fields.md)
3. Добавьте перевод методом [catalog.priceTypeLang.add](./catalog-price-type-lang-add.md)
4. Для изменения перевода используйте [catalog.priceTypeLang.update](./catalog-price-type-lang-update.md), для удаления — [catalog.priceTypeLang.delete](./catalog-price-type-lang-delete.md)
5. Для чтения одного перевода по `id` используйте [catalog.priceTypeLang.get](./catalog-price-type-lang-get.md), для получения списка переводов по фильтру — [catalog.priceTypeLang.list](./catalog-price-type-lang-list.md)

## Переводы в REST 3.0

В [REST 3.0](../../../rest-v3.md) для переводов есть методы добавления, изменения, удаления, получения доступных языков и методы получения схемы полей `catalog.pricetype.lang.field.list` и `catalog.pricetype.lang.field.get`. Методы, которые есть в обеих версиях API, помечены в таблице как `v 3.0`.

Особенности методов новой версии:

- методов получения перевода и списка переводов в новой версии нет. Идентификатор перевода возвращает метод [catalog.pricetype.lang.add](./catalog-price-type-lang-add-rest-v3.md) или метод прежней версии [catalog.priceTypeLang.list](./catalog-price-type-lang-list.md)
- второй перевод на тот же язык и смена `lang` на язык, для которого перевод уже есть, возвращают ошибку сервера с HTTP-статусом `500`. Перед добавлением проверьте переводы типа цены методом [catalog.priceTypeLang.list](./catalog-price-type-lang-list.md)
- имена методов пишутся в нижнем регистре: `catalog.pricetype.lang.getlanguages`

## Связь переводов с другими объектами

**Тип цены.** Перевод привязывается к типу цены через поле `catalogGroupId`. Идентификатор типа цены можно получить методами [catalog.priceType.list](../catalog-price-type-list.md) и [catalog.priceType.get](../catalog-price-type-get.md).

**Язык интерфейса.** Для перевода используется код языка в поле `lang`. В `lang` передавайте значение поля `lid` из ответа метода [catalog.priceTypeLang.getLanguages](./catalog-price-type-lang-get-languages.md).

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [catalog.priceTypeLang.add](./catalog-price-type-lang-add.md) | Добавляет перевод названия типа цены ||
|| [catalog.pricetype.lang.add](./catalog-price-type-lang-add-rest-v3.md) | Добавляет перевод названия типа цены v 3.0 ||
|| [catalog.priceTypeLang.update](./catalog-price-type-lang-update.md) | Обновляет перевод названия типа цены ||
|| [catalog.pricetype.lang.update](./catalog-price-type-lang-update-rest-v3.md) | Обновляет перевод названия типа цены v 3.0 ||
|| [catalog.priceTypeLang.get](./catalog-price-type-lang-get.md) | Возвращает значения полей перевода названия типа цены ||
|| [catalog.priceTypeLang.list](./catalog-price-type-lang-list.md) | Возвращает список переводов названий типов цен по фильтру ||
|| [catalog.priceTypeLang.delete](./catalog-price-type-lang-delete.md) | Удаляет перевод названия типа цены ||
|| [catalog.pricetype.lang.delete](./catalog-price-type-lang-delete-rest-v3.md) | Удаляет перевод названия типа цены v 3.0 ||
|| [catalog.priceTypeLang.getLanguages](./catalog-price-type-lang-get-languages.md) | Возвращает доступные для перевода языки ||
|| [catalog.pricetype.lang.getlanguages](./catalog-price-type-lang-get-languages-rest-v3.md) | Возвращает доступные для перевода языки v 3.0 ||
|| [catalog.priceTypeLang.getFields](./catalog-price-type-lang-get-fields.md) | Возвращает поля перевода названия типа цены ||
|| [catalog.pricetype.lang.field.list](./catalog-price-type-lang-field-list.md) | Возвращает список полей перевода названия типа цены v 3.0 ||
|| [catalog.pricetype.lang.field.get](./catalog-price-type-lang-field-get.md) | Возвращает описание поля перевода названия типа цены ||
|#
