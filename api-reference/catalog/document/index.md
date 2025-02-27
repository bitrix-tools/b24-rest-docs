# Складской учет в Торговом каталоге: обзор методов

Складской учет – это инструмент, с помощью которого можно отследить  доступное и зарезервированное количество товара на складах.

Чтобы добавить, переместить или удалить товары со склада, используйте документы складского учета.

> Быстрый переход: [все методы](#all-methods)
> 
> Пользовательская документация: 
> - [Складской учет в Битрикс24](https://helpdesk.bitrix24.ru/open/17792018)
> - [Как начать работу со складским учетом](https://helpdesk.bitrix24.ru/open/17792114/)

## Документы складского учета

В складском учете доступны следующие типы документов:
- `A` – приход товара на склад,
- `S` – оприходование товара,
- `M` – перемещение товара между складами,
- `R` – возврат товара,
- `D` – списание товара.

Настройте права доступа для каждого типа документов. Если у вас не настроены права доступа, то при попытке открыть документы складского учета сотрудник увидит ошибку и не сможет с ними работать.

{% note tip "Пользовательская документация" %}

- [Как настроить права в CRM для работы с документами складского учета](https://helpdesk.bitrix24.ru/open/15955386)
- [Как создать документ оприходования](https://helpdesk.bitrix24.ru/open/22524122)
- [Как создать документ прихода](https://helpdesk.bitrix24.ru/open/22558126)
- [Как работать с документами реализации](https://helpdesk.bitrix24.ru/open/18563126)
- [Как создать документ списания](https://helpdesk.bitrix24.ru/open/23095486/)
- [Как создать документ перемещения](https://helpdesk.bitrix24.ru/open/23094464/)

{% endnote %}

## Связь документов складского учета с другими объектами

**Товары документа складского учета.** Укажите товары для документа складского учета с помощью методов [catalog.document.element.*](./document-element/index.md).

**Склады.** Укажите склад, для которого создаете документ складского учета. Используйте методы [catalog.store.*](../store/index.md).

**Пользовательские поля документов складского учета.** Для документов складского учета можно создать дополнительные поля с помощью метода [userfieldconfig.add](../../crm/universal/userfieldconfig/userfieldconfig/userfieldconfig-add.md), где `moduleId` — catalog, а `entityId` — CAT_STORE_DOCUMENT_ИдентификаторТипаДокумента. Чтобы просмотреть дополнительные поля или изменить их значения, используйте методы [catalog.userfield.document.*](../userfield-document/index.md).

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять методы: администратор

### Основные

#|
|| **Метод** | **Описание** ||
|| [catalog.document.mode.status](./catalog-document-mode-status.md) | Проверяет, включен ли складской учет ||
|| [catalog.document.add](./catalog-document-add.md) | Добавляет документ складского учета ||
|| [catalog.document.conduct](./catalog-document-conduct.md) | Проводит документ складского учета ||
|| [catalog.document.conductList](./catalog-document-conduct-list.md) | Проводит группу документов складского учета ||
|| [catalog.document.cancel](./catalog-document-cancel.md) | Отменяет проведение документа складского учета по его идентификатору ||
|| [catalog.document.cancelList](./catalog-document-cancel-list.md) | Отменяет проведение группы документов складского учета ||
|| [catalog.document.update](./catalog-document-update.md) | Изменяет документ складского учета ||
|| [catalog.document.list](./catalog-document-list.md) | Возвращает список документов складского учета ||
|| [catalog.document.delete](./catalog-document-delete.md) | Удаляет документ складского учета ||
|| [catalog.document.deleteList](./catalog-document-delete-list.md) | Удаляет группу документов складского учета ||
|| [catalog.document.getFields](./catalog-document-get-fields.md) | Возвращает доступные поля документа складского учета ||
|#

### Товары документа складского учета

#|
|| **Метод** | **Описание** ||
|| [catalog.document.element.add](./document-element/catalog-document-element-add.md) | Добавляет товар документа складского учета ||
|| [catalog.document.element.update](./document-element/catalog-document-element-update.md) | Изменяет товар документа складского учета ||
|| [catalog.document.element.list](./document-element/catalog-document-element-list.md) | Возвращает список товаров документа складского учета ||
|| [catalog.document.element.delete](./document-element/catalog-document-element-delete.md) | Удаляет товар документа складского учета ||
|| [catalog.document.element.getFields](./document-element/catalog-document-element-get-fields.md) | Возвращает список доступных полей товара документа складского учета ||
|#
