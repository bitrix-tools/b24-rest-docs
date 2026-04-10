# Привязка типов цен к группам покупателей: обзор методов

Раздел описывает права групп покупателей на типы цен в Торговом каталоге. Привязка определяет, может ли группа покупателей только просматривать цену или покупать товар по этому типу цены.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как настроить права доступа к каталогу товаров](https://helpdesk.bitrix24.ru/open/25376682/)

## Связь с другими объектами

**Тип цены.** Привязка создается для конкретного типа цены в поле `catalogGroupId`. Получить идентификатор типа цены можно методами [catalog.priceType.list](../catalog-price-type-list.md) и [catalog.priceType.get](../catalog-price-type-get.md).

**Группа покупателей.** Привязка создается для конкретной группы покупателей в поле `groupId`. Для существующих привязок `groupId` можно получить через метод [catalog.priceTypeGroup.list](./catalog-price-type-group-list.md).

**Тип доступа.** Поле `access` задает права группы на тип цены.

Доступные значения:

- `Y` — группа может покупать по типу цены,
- `N` — группа может только просматривать тип цены.

## Порядок работы с привязками

1. Получите идентификаторы `catalogGroupId` и `groupId`, затем выберите тип доступа `access`.
2. При необходимости проверьте доступные поля и их типы методом [catalog.priceTypeGroup.getFields](./catalog-price-type-group-get-fields.md).
3. Создайте привязку методом [catalog.priceTypeGroup.add](./catalog-price-type-group-add.md).
4. Проверьте результат методом [catalog.priceTypeGroup.list](./catalog-price-type-group-list.md).
5. Если привязка больше не нужна, удалите ее методом [catalog.priceTypeGroup.delete](./catalog-price-type-group-delete.md).

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [catalog.priceTypeGroup.add](./catalog-price-type-group-add.md) | Добавляет привязку типа цены к группе покупателей ||
|| [catalog.priceTypeGroup.list](./catalog-price-type-group-list.md) | Возвращает список привязок типов цен к группам покупателей ||
|| [catalog.priceTypeGroup.delete](./catalog-price-type-group-delete.md) | Удаляет привязку типа цены к группе покупателей ||
|| [catalog.priceTypeGroup.getFields](./catalog-price-type-group-get-fields.md) | Возвращает поля привязки типов цен к группам покупателей ||
|#
