# Варианты свойства заказа типа ENUM в Интернет-магазине: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

[Свойства заказа](../property/index.md) могут быть разных типов:

- `STRING` — строка
- `Y/N` — да/нет
- `NUMBER` — число
- `ENUM` — перечисление
- `FILE` — файл
- `DATE` — дата
- `LOCATION` — местоположение
- `ADDRESS` — адрес

Для свойства заказа типа «список» `ENUM` необходимо указать доступные варианты. Например, создайте свойство заказа «Время доставки» и добавьте варианты «08:00-12:00», «12:00-16:00» и «16:00-20:00».

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как покупателю оформить заказ в интернет-магазине](https://helpdesk.bitrix24.ru/open/28841930/)

## Связь вариантов свойства заказа с другими объектами

**Свойства заказа.** Укажите идентификатор свойства заказа. Получить список идентификаторов можно с помощью метода [sale.property.list](../property/sale-property-list.md).

## Как начать работу

1. Создайте свойство заказа типа `ENUM` методом [sale.property.add](../property/sale-property-add.md) или найдите существующее свойство методом [sale.property.list](../property/sale-property-list.md).
2. Добавьте варианты свойства методом [sale.propertyvariant.add](./sale-property-variant-add.md).
3. Проверьте созданные варианты методом [sale.propertyvariant.list](./sale-property-variant-list.md).
4. При необходимости измените порядок или название варианта методом [sale.propertyvariant.update](./sale-property-variant-update.md).

## Обзор методов {#all-methods}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять методы: администратор

#|
|| **Метод** | **Описание** ||
|| [sale.propertyvariant.add](./sale-property-variant-add.md) | Добавляет вариант свойства ||
|| [sale.propertyvariant.update](./sale-property-variant-update.md) | Обновляет поля варианта свойства ||
|| [sale.propertyvariant.get](./sale-property-variant-get.md) | Получает вариант свойства по id ||
|| [sale.propertyvariant.list](./sale-property-variant-list.md) | Получает список вариантов свойства ||
|| [sale.propertyvariant.delete](./sale-property-variant-delete.md) | Удаляет вариант свойства ||
|| [sale.propertyvariant.getFields](./sale-property-variant-get-fields.md) | Возвращает доступные поля варианта свойства ||
|#
