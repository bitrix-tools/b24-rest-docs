# Методы работы с товарами документа складского учёта

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% note info "" %}

**Scope**: [`catalog `](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Методы работы со складами:

#|
|| **Метод** | **Описание** | **Примечание** ||
|| [catalog.document.element.add](./catalog-document-element-add.md) | Метод добавляет товар документа складского учёта. |  ||
|| [catalog.document.element.delete](./catalog-document-element-delete.md) | Метод удаляет товар документа складского учёта. |  ||
|| [catalog.document.element.fields](./catalog-document-element-fields.md) | Метод для получения значений полей склада по ID.| Метод устарел с версии **22.400.0**. Рекомендуется использовать метод [catalog.document.element.getFields](./catalog-document-element-get-fields.md). ||
|| [catalog.document.element.getFields](./catalog-document-element-get-fields.md) | Метод возвращает список полей товаров документа складского учёта.  | ||
|| [catalog.document.element.list](./catalog-document-element-list.md) | Метод получает список товаров в документах складского учёта.  | ||
|| [catalog.document.element.update](./catalog-document-element-update.md) | Метод обновляет товар документа складского учёта. |  ||
|#

{% note info "Внимание!" %}

До версии 22.400.0 модуля catalog входные параметры и результат передавались как UPPER_CASE.

{% endnote %}