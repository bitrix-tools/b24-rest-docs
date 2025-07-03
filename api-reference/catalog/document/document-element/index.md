# Методы работы с товарами документа складского учёта

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Методы работы со складами:

#|
|| **Метод** | **Описание** ||
|| [catalog.document.element.add](./catalog-document-element-add.md) | Добавляет товар документа складского учета ||
|| [catalog.document.element.delete](./catalog-document-element-delete.md) | Удаляет товар документа складского учета ||
|| [catalog.document.element.getFields](./catalog-document-element-get-fields.md) | Возвращает список полей товаров документа складского учета ||
|| [catalog.document.element.list](./catalog-document-element-list.md) | Получает список товаров в документах складского учета ||
|| [catalog.document.element.update](./catalog-document-element-update.md) | Обновляет товар документа складского учета ||
|#

{% note info "Внимание!" %}

До версии 22.400.0 модуля catalog входные параметры и результат передавались как UPPER_CASE.

{% endnote %}