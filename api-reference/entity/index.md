# Методы работы с хранилищем данных

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

Данное право позволяет создавать на сервере **Битрикс24** собственные хранилища произвольных данных (инфоблоки).

> Scope: [`entity`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| **Хранилища** | ||
|| [entity.add](./entities/entity-add.md) | Создает хранилище данных. ||
|| [entity.update](./entities/entity-update.md) | Обновляет параметры хранилища данных. ||
|| [entity.rights](./entities/entity-rights.md) | Получение или изменение прав доступа к хранилищу. ||
|| [entity.get](./entities/entity-get.md) | Получение параметров хранилища или списка всех хранилищ приложения. ||
|| [entity.delete](./entities/entity-delete.md) | Удаление хранилища. ||
|| **Разделы** | ||
|| [entity.section.get](./sections/entity-section-get.md) | Получение списка разделов хранилища (секций инфоблока). Списочный метод. ||
|| [entity.section.add](./sections/entity-section-add.md) | Добавление раздела хранилища. ||
|| [entity.section.update](./sections/entity-section-update.md) | Обновление раздела хранилища. ||
|| [entity.section.delete](./sections/entity-section-delete.md) | Удаление раздела хранилища. ||
|| **Элементы** | ||
|| [entity.item.get](./items/entity-item-get.md) | Получение списка элементов хранилища. Списочный метод. ||
|| [entity.item.add](./items/entity-item-add.md) | Добавление элемента хранилища. ||
|| [entity.item.update](./items/entity-item-update.md) | Обновление элемента хранилища. ||
|| [entity.item.delete](./items/entity-item-delete.md) | Удаление элемента хранилища. ||
|| **Свойства элементов** | ||
|| [entity.item.property.get](./items/properties/entity-item-property-get.md) | Получение списка дополнительных свойств элементов хранилища. ||
|| [entity.item.property.add](./items/properties/entity-item-property-add.md) | Добавление дополнительного свойства элементов хранилища. ||
|| [entity.item.property.update](./items/properties/entity-item-property-update.md) | Обновление дополнительного свойства элементов хранилища. ||
|| [entity.item.property.delete](./items/properties/entity-item-property-delete.md) | Удаление дополнительного свойства элементов хранилища. ||
|#