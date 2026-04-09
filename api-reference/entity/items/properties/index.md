# Свойства элементов хранилища данных: обзор методов

Свойства элементов хранилища данных помогают хранить дополнительные данные в элементах приложения. Через них задают собственные поля.

Группа методов `entity.item.property.*` позволяет создавать свойства, получать список свойств, изменять параметры и удалять ненужные.

> Быстрый переход: [все методы](#all-methods)

{% note info "" %}

Методы раздела работают только в контексте [приложения](../../../../settings/app-installation/index.md).

{% endnote %}

## Как начать работу

1. Получите идентификатор хранилища методом [entity.get](../../entities/entity-get.md)
2. Создайте новое свойство методом [entity.item.property.add](./entity-item-property-add.md)
3. Получите список свойств и их коды методом [entity.item.property.get](./entity-item-property-get.md)
4. Измените параметры свойства методом [entity.item.property.update](./entity-item-property-update.md)
5. Удалите ненужное свойство методом [entity.item.property.delete](./entity-item-property-delete.md)

## Связь с другими объектами

**Хранилище данных.** Каждый метод группы работает с конкретным хранилищем данных приложения. В методы передают параметр `ENTITY` — его идентификатор. Его можно получить методом [entity.get](../../entities/entity-get.md).

**Элементы хранилища.** Свойства задают дополнительные поля элементов хранилища данных. Для работы с ними используйте методы [entity.item.*](../index.md).

## Обзор методов {#all-methods}

> Scope: [`entity`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [entity.item.property.add](./entity-item-property-add.md) | Добавляет свойство элементов хранилища данных ||
|| [entity.item.property.update](./entity-item-property-update.md) | Обновляет свойство элементов хранилища данных ||
|| [entity.item.property.get](./entity-item-property-get.md) | Получает список свойств элементов хранилища данных ||
|| [entity.item.property.delete](./entity-item-property-delete.md) | Удаляет свойство элементов хранилища данных ||
|#
