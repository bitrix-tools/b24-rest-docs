# Привязка типов цен к группам покупателей: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Привязки типов цен к группам покупателей управляют доступом групп к типам цен в Торговом каталоге. Привязка определяет, может ли группа покупателей только просматривать цену или покупать товар по этому типу цены.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как настроить права доступа к каталогу товаров](https://helpdesk.bitrix24.ru/open/25376682/)

## Как начать работу

1. Получите идентификаторы `catalogGroupId` и `groupId`, затем выберите тип доступа `access`
2. При необходимости проверьте доступные поля и их типы методом [catalog.priceTypeGroup.getFields](./catalog-price-type-group-get-fields.md)
3. Создайте привязку методом [catalog.priceTypeGroup.add](./catalog-price-type-group-add.md)
4. Проверьте результат методом [catalog.priceTypeGroup.list](./catalog-price-type-group-list.md)
5. Если привязка больше не нужна, удалите ее методом [catalog.priceTypeGroup.delete](./catalog-price-type-group-delete.md)

## Привязки в REST 3.0

В [REST 3.0](../../../rest-v3.md) для привязок есть методы добавления, удаления и методы получения схемы полей `catalog.pricetype.group.field.list` и `catalog.pricetype.group.field.get`. Методы, которые есть в обеих версиях API, помечены в таблице как `v 3.0`.

Особенности методов новой версии:

- метода получения списка привязок в новой версии нет. Идентификатор привязки возвращает метод [catalog.pricetype.group.add](./catalog-price-type-group-add-rest-v3.md) или метод прежней версии [catalog.priceTypeGroup.list](./catalog-price-type-group-list.md)
- привязку нельзя изменить. Чтобы поменять группу или тип доступа, удалите привязку и создайте новую
- при создании типа цены Битрикс24 сам добавляет две привязки к группе `1`: на просмотр и на покупку. Повторная такая привязка вернет ошибку
- имена методов пишутся в нижнем регистре: `catalog.pricetype.group.add`

## Связь с другими объектами

**Тип цены.** Привязка создается для конкретного типа цены в поле `catalogGroupId`. Получить идентификатор типа цены можно методами [catalog.priceType.list](../catalog-price-type-list.md) и [catalog.priceType.get](../catalog-price-type-get.md).

**Группа покупателей.** Привязка создается для конкретной группы покупателей в поле `groupId`. Для существующих привязок `groupId` можно получить через метод [catalog.priceTypeGroup.list](./catalog-price-type-group-list.md).

**Тип доступа.** Поле `access` задает права группы на тип цены.

Доступные значения:

- `Y` — группа может покупать по типу цены
- `N` — группа может только просматривать тип цены

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [catalog.priceTypeGroup.add](./catalog-price-type-group-add.md) | Добавляет привязку типа цены к группе покупателей ||
|| [catalog.pricetype.group.add](./catalog-price-type-group-add-rest-v3.md) | Добавляет привязку типа цены к группе покупателей v 3.0 ||
|| [catalog.priceTypeGroup.list](./catalog-price-type-group-list.md) | Возвращает список привязок типов цен к группам покупателей ||
|| [catalog.priceTypeGroup.delete](./catalog-price-type-group-delete.md) | Удаляет привязку типа цены к группе покупателей ||
|| [catalog.pricetype.group.delete](./catalog-price-type-group-delete-rest-v3.md) | Удаляет привязку типа цены к группе покупателей v 3.0 ||
|| [catalog.priceTypeGroup.getFields](./catalog-price-type-group-get-fields.md) | Возвращает поля привязки типов цен к группам покупателей ||
|| [catalog.pricetype.group.field.list](./catalog-price-type-group-field-list.md) | Возвращает список полей привязки типа цены к группе покупателей v 3.0 ||
|| [catalog.pricetype.group.field.get](./catalog-price-type-group-field-get.md) | Возвращает описание поля привязки типа цены к группе покупателей ||
|#
