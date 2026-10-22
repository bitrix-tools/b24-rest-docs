# Товары в документе складского учета: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Методы `catalog.document.element.*` добавляют, изменяют или удаляют товарные позиции в документах складского учета. Можно указать количество и закупочную цену товара, склад поступления или списания.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация:
> - [Как создать документ прихода](https://helpdesk.bitrix24.ru/open/22558126)
> - [Как создать документ перемещения](https://helpdesk.bitrix24.ru/open/23094464/)

## Как начать работу

1. Создайте или найдите документ складского учета методами [catalog.document.*](../index.md)
2. Получите `id` товара или вариации
3. Укажите склад поступления или списания в зависимости от типа документа
4. Добавьте товарную позицию методом [catalog.document.element.add](./catalog-document-element-add.md)
5. Проверьте позиции документа методом [catalog.document.element.list](./catalog-document-element-list.md)

## Связь с другими объектами

**Документы складского учета.** Укажите идентификатор документа в поле `docId`, чтобы оформить:
- приход товара на склад
- оприходование товара
- перемещение товара между складами
- возврат товара
- списание товара со склада

Чтобы получить идентификатор документа, используйте метод [catalog.document.list](../catalog-document-list.md). Внести изменения в перечень товарных позиций можно только в документ, который еще не проведен.

**Товары каталога.** Укажите идентификатор простого товара или вариации в поле `elementId`.
Услуги в складском учете не поддерживаются.

Чтобы получить идентификаторы товаров, используйте методы:
- [catalog.product.list](../../product/catalog-product-list.md) для простых товаров
- [catalog.product.offer.list](../../product/offer/catalog-product-offer-list.md) для вариаций

**Склады.** Укажите идентификатор склада поступления в поле `storeTo` или склада списания в поле `storeFrom`. Выбирайте поле в зависимости от типа документа складского учета:

- приход — `storeTo`
- оприходование — `storeTo`
- перемещение — `storeTo` и `storeFrom`
- возврат — `storeFrom`
- списание — `storeFrom`

Чтобы получить идентификаторы складов, используйте метод [catalog.store.list](../../store/catalog-store-list.md).

## Товары документа в REST 3.0

В [REST 3.0](../../../rest-v3.md) для товаров документа есть методы добавления, изменения, получения списка, удаления и методы получения схемы полей `catalog.document.element.field.list` и `catalog.document.element.field.get`. Методы, которые есть в обеих версиях API, помечены в таблице как `v 3.0`.

Методы добавления, изменения и удаления работают только с непроведенным документом. Чтобы изменить товары проведенного документа, сначала отмените проведение методом [catalog.document.cancel](../catalog-document-cancel-rest-v3.md).

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [catalog.document.element.add](./catalog-document-element-add.md) | Добавляет товарную позицию в документ складского учета ||
|| [catalog.document.element.add](./catalog-document-element-add-rest-v3.md) | Добавляет товарную позицию в документ складского учета v 3.0 ||
|| [catalog.document.element.update](./catalog-document-element-update.md) | Изменяет существующую товарную позицию в документе складского учета ||
|| [catalog.document.element.update](./catalog-document-element-update-rest-v3.md) | Изменяет существующую товарную позицию в документе складского учета v 3.0 ||
|| [catalog.document.element.list](./catalog-document-element-list.md) | Возвращает товарные позиции документов по фильтру ||
|| [catalog.document.element.list](./catalog-document-element-list-rest-v3.md) | Возвращает товарные позиции документов по фильтру v 3.0 ||
|| [catalog.document.element.delete](./catalog-document-element-delete.md) | Удаляет товарную позицию из документа до проведения ||
|| [catalog.document.element.delete](./catalog-document-element-delete-rest-v3.md) | Удаляет товарную позицию из документа до проведения v 3.0 ||
|| [catalog.document.element.getFields](./catalog-document-element-get-fields.md) | Возвращает описание полей товара из документа складского учета ||
|| [catalog.document.element.field.list](./catalog-document-element-field-list.md) | Возвращает список полей товаров для документа складского учета v 3.0 ||
|| [catalog.document.element.field.get](./catalog-document-element-field-get.md) | Возвращает описание поля товара в документе складского учета ||
|#
