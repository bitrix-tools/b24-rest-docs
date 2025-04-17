# Варианты свойства заказа типа ENUM в Интернет-магазине: обзор методов

[Свойства заказа](../property/index.md) могут быть разных типов:
- `STRING` — строка,
- `Y/N` — да/нет,
- `NUMBER` — число,
- `ENUM` — перечисление,
- `FILE` — файл,
- `DATE` — дата,
- `LOCATION` — местоположение,
- `ADDRESS` — адрес.

Для свойства заказа типа «список» `ENUM` необходимо указать доступные варианты. Например, создайте свойство заказа «Время доставки» и добавьте варианты «08:00-12:00», «12:00-16:00» и «16:00-20:00».

> Быстрый переход: [все методы](#all-methods)

## Связь вариантов свойства заказа с другими объектами

**Свойства заказа.** Укажите идентификатор свойства заказа. Получить список идентификаторов можно с помощью метода [sale.property.list](../property/sale-property-list.md).

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
