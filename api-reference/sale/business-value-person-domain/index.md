# Статусы типов плательщиков в Интернет-магазине: обзор методов

При создании [типа плательщика](../person-type/index.md) можно указать любое название, но нужно определить статус: 
- `I` — физическое лицо,
- `E` — юридическое лицо.

> Быстрый переход: [все методы](#all-methods)

## Связь статусов типов плательщиков с другими объектами

**Типы плательщиков.** Укажите тип плательщика, для которого настраиваете соответствие физическому или юридическому лицу. Получить доступные типы плательщиков можно с помощью метода [sale.persontype.list](../person-type/sale-person-type-list.md).

## Обзор методов {#all-methods}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

#|
|| **Метод** | **Описание** ||
|| [sale.businessValuePersonDomain.add](./sale-business-value-person-domain-add.md) | Добавляет соответствие физическому или юридическому лицу ||
|| [sale.businessValuePersonDomain.list](./sale-business-value-person-domain-list.md) | Возвращает список соответствий физическому или юридическому лицу ||
|| [sale.businessValuePersonDomain.deleteByFilter](./sale-business-value-person-domain-delete-by-filter.md) | Удаляет соответствие физическому или юридическому лицу ||
|| [sale.businessValuePersonDomain.getFields](./sale-business-value-person-domain-get-fields.md) | Возвращает поля соответствия физическому или юридическому лицу ||
|#
