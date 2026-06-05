# Онлайн-продажи: типовые сценарии

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Сценарии помогают выбрать методы для типовых задач Интернет-магазина: добавить позицию в заказ, подключить кассу или настроить доставку для CRM.

Сценарий описывает одну практическую задачу и порядок методов для ее выполнения.

> Быстрый переход: [все сценарии](#choose-tutorial)
>
> Пользовательская документация: [Интернет-магазин в Битрикс24](https://helpdesk.bitrix24.ru/open/26680398/)

## Связь с другими объектами

В сценариях онлайн-продаж один заказ может включать товарные позиции, фискализацию чека и доставку. Для каждой части используются отдельные группы методов.

- **Заказ и корзина.** Позиция корзины — это строка заказа с товаром или услугой. В ней указаны количество, цена и валюта. Позиции добавляют в существующий заказ методом [sale.basketitem.add](../../api-reference/sale/basket-item/sale-basket-item-add.md). Если позиция связана с товаром из каталога, передайте идентификатор товара в поле `productId`. Если товара нет на сайте, передайте `productId: 0` и заполните данные вручную: название, цену, количество и валюту
- **Каталог товаров.** Если добавляете в заказ товар или услугу, нужно заполнить поля позиции. Метод [sale.basketitem.getFields](../../api-reference/sale/basket-item/sale-basket-item-get-fields.md) показывает, какие поля можно передать в `fields` метода [sale.basketitem.add](../../api-reference/sale/basket-item/sale-basket-item-add.md)
- **Кассы и чеки.** Внешнюю кассу подключают в два шага: сначала регистрируют обработчик методом [sale.cashbox.handler.add](../../api-reference/sale/cashbox/sale-cashbox-handler-add.md), затем создают кассу методом [sale.cashbox.add](../../api-reference/sale/cashbox/sale-cashbox-add.md). Результат печати чека можно сохранить методом [sale.cashbox.check.apply](../../api-reference/sale/cashbox/sale-cashbox-check-apply.md)
- **Службы доставки.** Обработчик связывает Битрикс24 с внешней службой доставки. Чтобы доставка появилась в CRM, зарегистрируйте обработчик методом [sale.delivery.handler.add](../../api-reference/sale/delivery/handler/sale-delivery-handler-add.md), создайте службу доставки методом [sale.delivery.add](../../api-reference/sale/delivery/delivery/sale-delivery-add.md), добавьте свойства отгрузки методом [sale.shipmentproperty.add](../../api-reference/sale/shipment-property/sale-shipment-property-add.md) и привяжите свойства к службе доставки методом [sale.propertyRelation.add](../../api-reference/sale/property-relation/sale-property-relation-add.md)

Если цена берется из каталога и ее не нужно задавать вручную, можно добавить товар методами [sale.basketitem.addCatalogProduct](../../api-reference/sale/basket-item/sale-basket-item-add-catalog-product.md) и [sale.basketitem.updateCatalogProduct](../../api-reference/sale/basket-item/sale-basket-item-update-catalog-product.md). Минимальный набор их полей возвращает метод [sale.basketitem.getFieldsCatalogProduct](../../api-reference/sale/basket-item/sale-basket-item-get-catalog-product-fields.md).

## Как начать работу

1. Определите сценарий: товарная позиция, касса или доставка
2. Выберите сценарий в таблице [Как выбрать сценарий](#choose-tutorial)
3. Проверьте права и scopes в выбранном туториале
4. Подготовьте идентификаторы заказа, товара, типа плательщика, группы свойств или службы доставки. Где получить идентификаторы объектов, смотрите в статье [Типы данных и структура объектов в REST API Интернет-магазина](../../api-reference/sale/data-types.md)
5. Выполните методы в порядке, который описан в сценарии
6. Проверьте результат методами `list` или `get`: например, [sale.basketItem.list](../../api-reference/sale/basket-item/sale-basket-item-list.md) для позиций корзины, [sale.cashbox.list](../../api-reference/sale/cashbox/sale-cashbox-list.md) для касс или [sale.delivery.getlist](../../api-reference/sale/delivery/delivery/sale-delivery-get-list.md) для служб доставки

## Как выбрать сценарий {#choose-tutorial}

#|
|| **Если нужно** | **Откройте** ||
|| Подключить внешнюю кассу и передавать данные о печати чеков | [Как подключить кассу к Битрикс24](./cashbox-add-example.md) ||
|| Добавить в заказ товар из каталога и указать произвольную цену | [Создать позицию с товаром из каталога в количестве 4 единиц с произвольной ценой](./example-position-with-custom-price.md) ||
|| Добавить в заказ позицию, которой нет на сайте или в каталоге | [Создать позицию с товаром, которого не существует на сайте](./example-position-that-is-not-on-the-site.md) ||
|| Зарегистрировать внешнюю службу доставки для работы в CRM | [Настроить службу доставки для CRM](./delivery-in-crm.md) ||
|| Посмотреть справочник методов Интернет-магазина | [Интернет-магазин: обзор разделов](../../api-reference/sale/index.md) ||
|#
