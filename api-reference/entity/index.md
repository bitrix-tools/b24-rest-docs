# Хранилище данных: обзор методов

Хранилища позволяют разработчикам создавать приложения, которые расширяют возможности Битрикс24. В них можно хранить разнообразную информацию: записи о клиентах, сведения об инвентаризации, информацию о товарах и другие данные.

Каждое хранилище представляет собой [информационный блок](*iblock) и доступно после регистрации приложения в Битрикс24. Визуального интерфейса хранилища не имеют.

Хранилищами приложений можно управлять с помощью группы методов [entity.*](./entities/index.md).

> Быстрый переход: [все методы](#all-methods) 

## Структура хранилищ

**Разделы**. Предназначены для группировки данных и построения удобной иерархии. Разделами можно управлять с помощью методов [entity.section.*](./sections/index.md).

**Элементы**. Хранят данные приложений. Создавать, изменять и удалять элементы можно с помощью методов [entity.item.*](./items/index.md). 

## Дополнительные свойства

Любое хранилище позволяет настроить дополнительные свойства элементов. Чтобы управлять ими, используйте методы [entity.item.property.*](./items/properties/index.md).

## Обзор методов {#all-methods}

> Scope: [`entity`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

### Хранилища

#|
|| **Метод** | **Описание** ||
|| [entity.add](./entities/entity-add.md) | Создает хранилище данных ||
|| [entity.update](./entities/entity-update.md) | Изменяет параметры хранилища данных ||
|| [entity.rights](./entities/entity-rights.md) | Получает или изменяет прав доступа к хранилищу ||
|| [entity.get](./entities/entity-get.md) | Получает параметры хранилища или список всех хранилищ приложения ||
|| [entity.delete](./entities/entity-delete.md) | Удаляет хранилище ||
|#

### Разделы

#|
|| **Метод** | **Описание** ||
|| [entity.section.get](./sections/entity-section-get.md) | Получает список разделов хранилища ||
|| [entity.section.add](./sections/entity-section-add.md) | Добавляет раздел хранилища ||
|| [entity.section.update](./sections/entity-section-update.md) | Изменяет раздел хранилища ||
|| [entity.section.delete](./sections/entity-section-delete.md) | Удаляет раздел хранилища ||
|#

### Элементы

#|
|| **Метод** | **Описание** ||
|| [entity.item.get](./items/entity-item-get.md) | Получает список элементов хранилища ||
|| [entity.item.add](./items/entity-item-add.md) | Добавляет элемент хранилища ||
|| [entity.item.update](./items/entity-item-update.md) | Изменяет элемент хранилища ||
|| [entity.item.delete](./items/entity-item-delete.md) | Удаляет элемент хранилища ||
|#

### Свойства элементов

#|
|| **Метод** | **Описание** ||
|| [entity.item.property.get](./items/properties/entity-item-property-get.md) | Получает список дополнительных свойств элементов хранилища ||
|| [entity.item.property.add](./items/properties/entity-item-property-add.md) | Добавляет дополнительное свойство элементов хранилища ||
|| [entity.item.property.update](./items/properties/entity-item-property-update.md) | Изменяет дополнительное свойство элементов хранилища ||
|| [entity.item.property.delete](./items/properties/entity-item-property-delete.md) | Удаляет дополнительное свойство элементов хранилища ||
|#

[*iblock]: Информационный блок — это специальный объект для хранения новостей, услуг, статей, каталогов товаров и других данных, имеющих четкую структуру.