# Корзина в Интернет-магазине: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Позиция корзины — это строка заказа с товаром или услугой: количество, цена, валюта, единица измерения. Сумма заказа пересчитывается при каждом изменении позиций.

Методы `sale.basketitem.*` добавляют, изменяют, читают и удаляют позиции корзины заказов.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как покупателю оформить заказ в интернет-магазине](https://helpdesk.bitrix24.ru/open/8238203/)

## Связь корзины с другими объектами

**Заказ.** Позиция привязана к заказу через поле `orderId` — передайте в него идентификатор заказа. Список заказов можно получить методом [sale.order.list](../order/sale-order-list.md).

**Товары.** Идентификатор товара передайте в поле `productId`. Получить идентификаторы можно методами:

- [catalog.product.list](../../catalog/product/catalog-product-list.md) — для простых товаров
- [catalog.product.service.list](../../catalog/product/service/catalog-product-service-list.md) — для услуг
- [catalog.product.offer.list](../../catalog/product/offer/catalog-product-offer-list.md) — для вариаций товаров, головной товар с вариациями находит метод [catalog.product.sku.list](../../catalog/product/sku/catalog-product-sku-list.md)

**Валюта.** Передайте в `currency` валюту заказа — ее возвращает метод [sale.order.get](../order/sale-order-get.md). Если валюты различаются, метод добавления вернет ошибку. Список валют Битрикс24 возвращает метод [crm.currency.list](../../crm/currency/crm-currency-list.md).

**Единица измерения.** Для товара, которого нет в каталоге, укажите код и название единицы измерения в полях `measureCode` и `measureName`. Коды и названия возвращает метод [catalog.measure.list](../../catalog/measure/catalog-measure-list.md).

**Оплата.** Укажите, какие позиции корзины оплачены, методами [sale.paymentitembasket.*](../payment-item-basket/index.md).

**Отгрузка.** Укажите, какие позиции корзины отправить на отгрузку, методами [sale.shipmentitem.*](../shipment-item/index.md).

**Свойства позиции.** Размер, цвет и другие характеристики конкретной позиции хранятся отдельно и привязаны к ней через `basketId`. Управляйте ими методами [sale.basketproperties.*](../basket-properties/index.md).

## Как начать работу

1. Создайте заказ методом [sale.order.add](../order/sale-order-add.md) или найдите существующий заказ методом [sale.order.list](../order/sale-order-list.md).
2. Добавьте позицию методом [sale.basketitem.addCatalogProduct](./sale-basket-item-add-catalog-product.md) или [sale.basketitem.add](./sale-basket-item-add.md) — как выбрать метод, описано [ниже](#choose-add).
3. Проверьте состав корзины методом [sale.basketitem.list](./sale-basket-item-list.md).
4. При необходимости измените количество или цену: позицию из каталога — методом [sale.basketitem.updateCatalogProduct](./sale-basket-item-update-catalog-product.md), произвольную — методом [sale.basketitem.update](./sale-basket-item-update.md). Затем свяжите позицию с оплатой или отгрузкой.

Пример сценария — туториал [Как добавить позицию в заказ с произвольной ценой](../../../tutorials/sale/add-basket-item-to-order.md).

## Как выбрать метод добавления {#choose-add}

**Товар или услуга из каталога.** Используйте [sale.basketitem.addCatalogProduct](./sale-basket-item-add-catalog-product.md). Название, базовую цену, единицу измерения, вес и НДС метод берет из карточки товара, а переданные значения этих полей пропускает.

**Произвольная позиция без товара в каталоге.** Используйте [sale.basketitem.add](./sale-basket-item-add.md) с `productId` = `0` и передайте название, цену и единицу измерения сами. С реальным `productId` метод `add` тоже берет данные из каталога, но для товаров каталога предназначен `addCatalogProduct`.

## Формат ответа

Методы добавления, изменения и получения возвращают позицию в `result.basketItem`, метод [sale.basketitem.delete](./sale-basket-item-delete.md) — `true` в `result`. У метода [sale.basketitem.list](./sale-basket-item-list.md) в `result.basketItems` приходит до 50 позиций за вызов, в `total` — общее число найденных. Следующую страницу запрашивайте параметром `start`. При ошибке приходят поля `error` и `error_description`, полный перечень кодов — на странице каждого метода. Поля позиции описаны в типе [sale_basket_item](../data-types.md#sale_basket_item).

## Ограничения при работе с позициями

- `orderId`, `productId` и `currency` после добавления не меняются: методы изменения пропускают их без ошибки. Чтобы перенести позицию в другой заказ или заменить товар, удалите позицию и добавьте новую
- Цена, переданная в `price`, фиксируется: позиция перестает брать цену из каталога
- [sale.basketitem.list](./sale-basket-item-list.md) возвращает и позиции без заказа. Чтобы получить корзину одного заказа, фильтруйте по `orderId`

## Обзор методов {#all-methods}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять методы: получать позиции и описание полей — менеджер магазина, добавлять, изменять и удалять позиции — администратор

#|
|| **Метод** | **Описание** ||
|| [sale.basketitem.add](./sale-basket-item-add.md) | Добавляет произвольную позицию в корзину заказа ||
|| [sale.basketitem.update](./sale-basket-item-update.md) | Изменяет позицию корзины заказа ||
|| [sale.basketitem.get](./sale-basket-item-get.md) | Возвращает позицию корзины по идентификатору ||
|| [sale.basketitem.list](./sale-basket-item-list.md) | Возвращает список позиций корзины по фильтру ||
|| [sale.basketitem.delete](./sale-basket-item-delete.md) | Удаляет позицию из корзины заказа ||
|| [sale.basketitem.addCatalogProduct](./sale-basket-item-add-catalog-product.md) | Добавляет позицию с товаром или услугой из каталога в корзину заказа ||
|| [sale.basketitem.updateCatalogProduct](./sale-basket-item-update-catalog-product.md) | Изменяет позицию с товаром из каталога ||
|| [sale.basketitem.getFields](./sale-basket-item-get-fields.md) | Возвращает описание полей позиции корзины ||
|| [sale.basketitem.getFieldsCatalogProduct](./sale-basket-item-get-catalog-product-fields.md) | Возвращает описание полей позиции с товаром из каталога ||
|#
