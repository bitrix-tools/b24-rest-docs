# Ставки НДС в Торговом каталоге: обзор методов

Ставку НДС можно задать для всего каталога или для конкретного товара. Приоритет отдается ставке НДС товара. Ставка каталога применяется, если ставка товара не задана.

Если у товара или каталога есть ставка НДС, общие налоги CRM к ним не применяются.

> Быстрый переход: [все методы](#all-methods)
> 
> Пользовательская документация: [Налоги и НДС в CRM](https://helpdesk.bitrix24.ru/open/15955806)

## Связь ставок НДС с другими объектами

**Торговый каталог.** Узнайте, какая ставка НДС установлена для торгового каталога, с помощью метода [catalog.catalog.get](../catalog/catalog-catalog-get.md).

**Товары.** Укажите НДС товара, используя следующие группы методов:
- [catalog.product.*](../product/index.md) — для простых товаров
- [catalog.product.service.*](../product/service/index.md) — для услуг
- [catalog.product.sku.*](../product/sku/index.md) — для головных товаров у товаров с вариациями
- [catalog.product.offer.*](../product/offer/index.md) — для вариаций товаров

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

#|
|| **Метод** | **Описание** ||
|| [catalog.vat.add](./catalog-vat-add.md) | Добавляет ставку НДС ||
|| [catalog.vat.update](./catalog-vat-update.md) | Изменяет ставку НДС ||
|| [catalog.vat.get](./catalog-vat-get.md) | Возвращает значения полей ставки НДС по идентификатору ||
|| [catalog.vat.list](./catalog-vat-list.md) | Возвращает список ставок НДС по фильтру ||
|| [catalog.vat.delete](./catalog-vat-delete.md) | Удаляет ставку НДС ||
|| [catalog.vat.getFields](./catalog-vat-get-fields.md) | Возвращает поля ставки НДС ||
|#
