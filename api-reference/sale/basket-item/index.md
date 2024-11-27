# Корзина в Интернет-магазине: обзор методов

Корзина — это временное хранилище, куда покупатели добавляют товары и услуги, которые планируют приобрести. В корзине можно изменять количество товаров, удалять ненужные позиции и просматривать общую стоимость покупки. Когда покупатель завершает покупку, корзина привязывается к заказу.

В этом разделе собраны методы для работы с позициями корзины в созданных заказах.

> Быстрый переход: [все методы](#all-methods)

## Связь корзины с другими объектами

**Заказ.** Укажите заказ, к которому привязана корзина. Список заказов можно получить методом [sale.order.list](../order/sale-order-list.md).

**Товары.** Добавьте в корзину товары, указав их идентификаторы. Получить идентификаторы можно с помощью методов:
- [catalog.product.list](../../catalog/product/catalog-product-list.md) — для простых товаров
- [catalog.product.service.list](../../catalog/product/service/catalog-product-service-list.md) — для услуг
- [catalog.product.sku.list](../../catalog/product/sku/catalog-product-sku-list.md) — для головных товаров у товаров с вариациями
- [catalog.product.offer.list](../../catalog/product/offer/catalog-product-offer-list.md) — для вариаций товаров

**Валюта.** Выберите валюту, в которой указана цена. Список валют можно получить методом [crm.currency.list](../../crm/currency/crm-currency-list.md).

**Единица измерения.** Если вы добавляете в корзину товар, которого еще нет на сайте, укажите код и название единицы измерения. Эти данные можно получить в списке единиц измерения методом [catalog.measure.list](../../catalog/measure/catalog-measure-list.md).

**Привязка элемента корзины к оплате.** С помощью методов [sale.paymentitembasket.*](../payment-item-basket/index.md) укажите, какие позиции корзины оплачены.

**Табличная часть отгрузки.** С помощью методов [sale.shipmentitem.*](../shipment-item/index.md) укажите, какие позиции корзины отправить на отгрузку. 

## Обзор методов {#all-methods}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [sale.basketitem.add](./sale-basket-item-add.md) | Добавляет позицию в корзину существующего заказа ||
|| [sale.basketitem.update](./sale-basket-item-update.md) | Изменяет позицию корзины существующего заказа ||
|| [sale.basketitem.get](./sale-basket-item-get.md) | Получает информацию о позиции корзины заказа ||
|| [sale.basketItem.list](./sale-basket-item-list.md) | Возвращает набор позиций корзины по фильтру ||
|| [sale.basketitem.delete](./sale-basket-item-delete.md) | Удаляет позицию корзины из заказа ||
|| [sale.basketitem.getFields](./sale-basket-item-get-fields.md) | Возвращает доступные поля позиции корзины ||
|| [sale.basketitem.addCatalogProduct](./sale-basket-item-add-catalog-product.md) | Добавляет элемент с товаром или услугой из модуля catalog в корзину существующего заказа ||
|| [sale.basketitem.updateCatalogProduct](./sale-basket-item-update-catalog-product.md) | Изменяет товар каталога в существующем заказе ||
|| [sale.basketItem.getCatalogProductFields](./sale-basket-item-get-catalog-product-fields.md) | Возвращает доступные поля товара каталога в корзине ||
|#