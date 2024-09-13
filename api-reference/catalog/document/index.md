# Методы работы со складским учётом

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Методы работы со складским учётом:

#|
|| **Метод** | **Описание** | **Примечание** ||
|| [catalog.document.add](./catalog-document-add.md) | Метод добавляет документ складского учёта. | ||
|| [catalog.document.cancel](./catalog-document-cancel.md) | Метод отменяет проведение документа складского учёта по ID. | ||
|| [catalog.document.cancelList](./catalog-document-cancel-list.md) | Метод отменяет проведение группы документов складского учёта. | ||
|| [catalog.document.conduct](./catalog-document-conduct.md) | Метод для проведения документа складского учёта. | ||
|| [catalog.document.conductList](./catalog-document-conduct-list.md) | Метод для группового проведения документов складского учёта. | ||
|| [catalog.document.confirm](./catalog-document-confirm.md) | Метод для проведения документа. | Метод устарел с версии **22.400.0**. Рекомендуется использовать метод [catalog.document.conduct](./catalog-document-conduct.md).||
|| [catalog.document.delete](./catalog-document-delete.md) | Метод удаляет документ складского учёта. | ||
|| [catalog.document.deleteList](./catalog-document-delete-list.md) | Метод для группового удаления документов складского учёта. | ||
|| [catalog.document.fields](./catalog-document-fields.md) | Метод возвращает список полей документов складского учёта. | Метод устарел с версии **22.400.0**. Рекомендуется использовать метод [catalog.document.getFields](./catalog-document-get-fields.md)||
|| [catalog.document.getFields](./catalog-document-get-fields.md) | Метод возвращает список полей документов складского учёта. | ||
|| [catalog.document.list](./catalog-document-list.md) | Метод получает список документов. | ||
|| [catalog.document.mode.status](./catalog-document-mode-status.md) | Метод для получения информации о том, включен ли складской учёт. | ||
|| [catalog.document.unconfirm](./catalog-document-unconfirm.md) | Метод для отмены проведения докуметна. | Метод устарел с версии **22.400.0**. Рекомендуется использовать метод [catalog.document.cancel](./catalog-document-cancel.md).||
|| [catalog.document.update](./catalog-document-update.md) | Метод обновляет документ складского учёта. | ||
|#

{% note info "Внимание!" %}

До версии 22.400.0 модуля catalog входные параметры и результат передавались как UPPER_CASE.

{% endnote %}