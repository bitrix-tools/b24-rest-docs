# Свойства корзины в Интернет-магазине: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Свойства корзины — это характеристики [позиций корзины](../basket-item/index.md): размер, цвет, артикул, производитель.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как создать и настроить свойства товаров в CRM](https://helpdesk.bitrix24.ru/open/27632310/)

## Связь свойств корзины с другими объектами

**Корзина.** Укажите позицию корзины, к которой привязано свойство. Список позиций корзины можно получить методом [sale.basketitem.list](../basket-item/sale-basket-item-list.md).

## Как начать работу

1. Получите идентификатор позиции корзины методом [sale.basketitem.list](../basket-item/sale-basket-item-list.md).
2. Создайте свойство позиции методом [sale.basketproperties.add](./sale-basket-properties-add.md).
3. Проверьте значение свойства методом [sale.basketproperties.get](./sale-basket-properties-get.md) или получите список свойств методом [sale.basketproperties.list](./sale-basket-properties-list.md).
4. Если данные изменились, обновите свойство методом [sale.basketproperties.update](./sale-basket-properties-update.md).
5. Удалите неактуальное свойство методом [sale.basketproperties.delete](./sale-basket-properties-delete.md).

## Обзор методов {#all-methods}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [sale.basketproperties.add](./sale-basket-properties-add.md) | Добавляет свойство позиции корзины ||
|| [sale.basketproperties.update](./sale-basket-properties-update.md) | Обновляет поля свойства позиции корзины ||
|| [sale.basketproperties.get](./sale-basket-properties-get.md) | Возвращает значение свойства позиции корзины по идентификатору ||
|| [sale.basketproperties.list](./sale-basket-properties-list.md) | Возвращает список свойств позиций корзины ||
|| [sale.basketproperties.delete](./sale-basket-properties-delete.md) | Удаляет свойство позиции корзины ||
|| [sale.basketproperties.getFields](./sale-basket-properties-get-fields.md) | Возвращает список полей свойства позиции корзины ||
|#
