# Складской учет в Торговом каталоге: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Складской учет — это инструмент, с помощью которого можно отследить доступное и зарезервированное количество товара на складах.

Чтобы добавить, переместить или удалить товары со склада, используйте документы складского учета.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация:
> - [Складской учет в Битрикс24](https://helpdesk.bitrix24.ru/open/17792018)
> - [Как начать работу со складским учетом](https://helpdesk.bitrix24.ru/open/17792114/)

## Документы складского учета

В складском учете доступны следующие типы документов:

- `A` — приход товара на склад
- `S` — оприходование товара
- `M` — перемещение товара между складами
- `R` — возврат товара
- `D` — списание товара

Настройте права доступа для каждого типа документов. Если у вас не настроены права доступа, то при попытке открыть документы складского учета сотрудник увидит ошибку и не сможет с ними работать.

{% note tip "Пользовательская документация" %}

- [Как настроить права в CRM для работы с документами складского учета](https://helpdesk.bitrix24.ru/open/15955386)
- [Как создать документ оприходования](https://helpdesk.bitrix24.ru/open/22524122)
- [Как создать документ прихода](https://helpdesk.bitrix24.ru/open/22558126)
- [Как работать с документами реализации](https://helpdesk.bitrix24.ru/open/18563126)
- [Как создать документ списания](https://helpdesk.bitrix24.ru/open/23095486/)
- [Как создать документ перемещения](https://helpdesk.bitrix24.ru/open/23094464/)

{% endnote %}

## Актуальная версия API

Для новой разработки используйте методы `catalog.document.*` и `catalog.document.element.*`. Устаревшие методы [catalog.document.confirm](./outdated/catalog-document-confirm.md), [catalog.document.unconfirm](./outdated/catalog-document-unconfirm.md), [catalog.document.fields](./outdated/catalog-document-fields.md) и [catalog.document.element.fields](./outdated/catalog-document-element-fields.md) оставлены только для поддержки старых интеграций.

Актуальные замены:

#|
|| **Если в старой интеграции используется** | **Используйте сейчас** ||
|| `catalog.document.confirm` | [catalog.document.conduct](./catalog-document-conduct.md) ||
|| `catalog.document.unconfirm` | [catalog.document.cancel](./catalog-document-cancel.md) ||
|| `catalog.document.fields` | [catalog.document.getFields](./catalog-document-get-fields.md) ||
|| `catalog.document.element.fields` | [catalog.document.element.getFields](./document-element/catalog-document-element-get-fields.md) ||
|#

## Складской учет в REST 3.0

В [REST 3.0](../../rest-v3.md) для документов складского учета есть методы добавления, изменения, получения, удаления, проведения и отмены проведения, методы режима складского учета, справочник типов документов [catalog.document.type.list](./catalog-document-type-list.md) и методы получения схемы полей `*.field.list` и `*.field.get`. Методы, которые есть в обеих версиях API, помечены в таблицах как `v 3.0`.

Особенности методов новой версии:

- методы [catalog.document.conduct](./catalog-document-conduct-rest-v3.md) и [catalog.document.cancel](./catalog-document-cancel-rest-v3.md) принимают `id` одного документа или массив `documentIds`. Пакет не откатывается: документы без ошибок проводятся, а по остальным метод возвращает ошибку
- методы `catalog.document.confirm` и `catalog.document.unconfirm` в новой версии повторяют `conduct` и `cancel` для одного документа
- права на документы проверяются по типу документа: «Просмотр», «Создание и редактирование», «Проведение документа», «Отмена проведения», «Удаление документа». Метод [catalog.document.list](./catalog-document-list-rest-v3.md) возвращает только документы тех типов, которые пользователь может просматривать
- методы добавления, изменения и удаления недоступны, если складского учета нет на тарифе
- в ответе поле `status` проведенного документа равно `"1"`, непроведенного — пустой строке
- имена методов `deletelist`, `conductlist`, `cancellist` и `mode.statusdetails` пишутся только в нижнем регистре

## Связь документов складского учета с другими объектами

**Товары документа складского учета.** Укажите товары для документа складского учета с помощью методов [catalog.document.element.*](./document-element/index.md).

**Склады.** Укажите склад, для которого создаете документ складского учета. Используйте методы [catalog.store.*](../store/index.md).

**Пользовательские поля документов складского учета.** Для документов складского учета можно создать дополнительные поля методом [userfieldconfig.add](../../crm/universal/userfieldconfig/userfieldconfig-add.md). Передайте `moduleId = catalog`, а в `entityId` укажите тип документа в формате `CAT_STORE_DOCUMENT_<DOC_TYPE>`, например `CAT_STORE_DOCUMENT_A`. Просмотреть дополнительные поля и изменить их значения можно методами [catalog.userfield.document.*](../userfield-document/index.md).

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять методы:
> - администратор — для методов прежней версии API
> - пользователь с правами на документы нужного типа — для методов REST 3.0. Права указаны на странице каждого метода

### Основные

#|
|| **Метод** | **Описание** ||
|| [catalog.document.add](./catalog-document-add.md) | Добавляет документ складского учета ||
|| [catalog.document.add](./catalog-document-add-rest-v3.md) | Добавляет документ складского учета v 3.0 ||
|| [catalog.document.update](./catalog-document-update.md) | Изменяет документ складского учета ||
|| [catalog.document.update](./catalog-document-update-rest-v3.md) | Изменяет документ складского учета v 3.0 ||
|| [catalog.document.list](./catalog-document-list.md) | Возвращает список документов складского учета ||
|| [catalog.document.list](./catalog-document-list-rest-v3.md) | Возвращает список документов складского учета v 3.0 ||
|| [catalog.document.get](./catalog-document-get.md) | Возвращает документ складского учета по идентификатору ||
|| [catalog.document.delete](./catalog-document-delete.md) | Удаляет документ складского учета ||
|| [catalog.document.delete](./catalog-document-delete-rest-v3.md) | Удаляет документ складского учета v 3.0 ||
|| [catalog.document.deleteList](./catalog-document-delete-list.md) | Удаляет группу документов складского учета ||
|| [catalog.document.deletelist](./catalog-document-delete-list-rest-v3.md) | Удаляет группу документов складского учета v 3.0 ||
|| [catalog.document.conduct](./catalog-document-conduct.md) | Проводит документ складского учета ||
|| [catalog.document.conduct](./catalog-document-conduct-rest-v3.md) | Проводит документ складского учета v 3.0 ||
|| [catalog.document.conductList](./catalog-document-conduct-list.md) | Проводит группу документов складского учета ||
|| [catalog.document.conductlist](./catalog-document-conduct-list-rest-v3.md) | Проводит группу документов складского учета v 3.0 ||
|| [catalog.document.cancel](./catalog-document-cancel.md) | Отменяет проведение документа складского учета ||
|| [catalog.document.cancel](./catalog-document-cancel-rest-v3.md) | Отменяет проведение документа складского учета v 3.0 ||
|| [catalog.document.cancelList](./catalog-document-cancel-list.md) | Отменяет проведение группы документов складского учета ||
|| [catalog.document.cancellist](./catalog-document-cancel-list-rest-v3.md) | Отменяет проведение группы документов складского учета v 3.0 ||
|| [catalog.document.confirm](./catalog-document-confirm-rest-v3.md) | Проводит один документ складского учета v 3.0 ||
|| [catalog.document.unconfirm](./catalog-document-unconfirm-rest-v3.md) | Отменяет проведение одного документа v 3.0 ||
|| [catalog.document.mode.status](./catalog-document-mode-status.md) | Проверяет, включен ли складской учет ||
|| [catalog.document.mode.status](./catalog-document-mode-status-rest-v3.md) | Проверяет, включен ли складской учет v 3.0 ||
|| [catalog.document.mode.statusdetails](./catalog-document-mode-status-details.md) | Возвращает состояние и режим складского учета ||
|| [catalog.document.mode.field.list](./catalog-document-mode-field-list.md) | Возвращает список полей состояния складского учета v 3.0 ||
|| [catalog.document.mode.field.get](./catalog-document-mode-field-get.md) | Возвращает описание поля состояния складского учета ||
|| [catalog.document.getFields](./catalog-document-get-fields.md) | Возвращает доступные поля документа складского учета ||
|| [catalog.document.field.list](./catalog-document-field-list.md) | Возвращает список полей документа складского учета v 3.0 ||
|| [catalog.document.field.get](./catalog-document-field-get.md) | Возвращает описание поля документа складского учета ||
|| [catalog.document.type.list](./catalog-document-type-list.md) | Возвращает типы документов складского учета ||
|| [catalog.document.type.field.list](./catalog-document-type-field-list.md) | Возвращает список полей типа документа v 3.0 ||
|| [catalog.document.type.field.get](./catalog-document-type-field-get.md) | Возвращает описание поля типа документа ||
|#

### Товары документа складского учета

#|
|| **Метод** | **Описание** ||
|| [catalog.document.element.add](./document-element/catalog-document-element-add.md) | Добавляет товар документа складского учета ||
|| [catalog.document.element.add](./document-element/catalog-document-element-add-rest-v3.md) | Добавляет товар документа складского учета v 3.0 ||
|| [catalog.document.element.update](./document-element/catalog-document-element-update.md) | Изменяет товар документа складского учета ||
|| [catalog.document.element.update](./document-element/catalog-document-element-update-rest-v3.md) | Изменяет товар документа складского учета v 3.0 ||
|| [catalog.document.element.list](./document-element/catalog-document-element-list.md) | Возвращает список товаров документа складского учета ||
|| [catalog.document.element.list](./document-element/catalog-document-element-list-rest-v3.md) | Возвращает список товаров документа складского учета v 3.0 ||
|| [catalog.document.element.delete](./document-element/catalog-document-element-delete.md) | Удаляет товар документа складского учета ||
|| [catalog.document.element.delete](./document-element/catalog-document-element-delete-rest-v3.md) | Удаляет товар документа складского учета v 3.0 ||
|| [catalog.document.element.getFields](./document-element/catalog-document-element-get-fields.md) | Возвращает список доступных полей товара документа складского учета ||
|| [catalog.document.element.field.list](./document-element/catalog-document-element-field-list.md) | Возвращает список полей товаров для документа складского учета v 3.0 ||
|| [catalog.document.element.field.get](./document-element/catalog-document-element-field-get.md) | Возвращает описание поля товара в документе складского учета ||
|#
