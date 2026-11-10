# Свойства корзины в Интернет-магазине: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Свойства корзины — это характеристики конкретной [позиции](../basket-item/index.md) в заказе: размер, цвет, артикул. Например, покупатель заказал футболку, и приложение сохраняет у этой позиции свойство «Размер: M». Та же футболка в другом заказе может быть размера L.

Свойство позиции — отдельный объект, а не свойство товара в каталоге: оно относится только к одной позиции заказа. Его название и значение Битрикс24 хранит текстом, даже если скопировал их из характеристик вариации товара.

> Быстрый переход: [все методы](#all-methods)

## Связь свойств корзины с другими объектами

**Позиция корзины и заказ.** Каждое свойство принадлежит одной позиции, ее идентификатор передают в `basketId`. Позиция должна входить в заказ: у нее в ответе [sale.basketitem.list](../basket-item/sale-basket-item-list.md) заполнено поле `orderId`. Для позиции без заказа метод [sale.basketproperties.add](./sale-basket-properties-add.md) вернет ошибку `MAIN_CONTROLLER_22001`.

**Товары каталога.** Свойства товаров и вариаций в каталоге создают и настраивают методы [catalog.productProperty.*](../../catalog/product-property/index.md). Работа с ними в интерфейсе описана в статье [Как создать и настроить свойства товаров в CRM](https://helpdesk.bitrix24.ru/open/27632310/).

## Как устроено свойство

#|
|| **Поле** | **Что хранит** | **Пример** ||
|| `id` | Идентификатор свойства. Его возвращает метод [sale.basketproperties.add](./sale-basket-properties-add.md) | `1009` ||
|| `basketId` | Идентификатор позиции корзины, к которой относится свойство | `1247` ||
|| `name` | Название свойства | `Размер` ||
|| `value` | Значение свойства | `M` ||
|| `code` | Символьный код. По нему свойства ищут методом [sale.basketproperties.list](./sale-basket-properties-list.md) | `MYAPP_SIZE` ||
|| `sort` | Число для сортировки свойств позиции. По умолчанию `100` | `10` ||
|| `xmlId` | Внешний код свойства. Если его не передать, Битрикс24 создаст код сам | `bx_6ab4f0d92abaa` ||
|#

Методы [sale.basketproperties.add](./sale-basket-properties-add.md), [sale.basketproperties.get](./sale-basket-properties-get.md) и [sale.basketproperties.update](./sale-basket-properties-update.md) возвращают свойство в `result.basketProperty`, метод [sale.basketproperties.delete](./sale-basket-properties-delete.md) — `true` в `result`. У метода [sale.basketproperties.list](./sale-basket-properties-list.md) в `result.basketProperties` приходит до 50 свойств за вызов, а в `total` — общее число найденных. Следующую страницу запрашивайте параметром `start`. Без параметра `order` список идет по возрастанию `id`, а не по `sort`.

## Как начать работу

1. Получите позиции заказа методом [sale.basketitem.list](../basket-item/sale-basket-item-list.md) с фильтром по `orderId` и сохраните `id` нужной позиции
2. Добавьте свойство методом [sale.basketproperties.add](./sale-basket-properties-add.md): передайте `basketId`, `name`, `value` и `code`
3. Проверьте свойства позиции методом [sale.basketproperties.list](./sale-basket-properties-list.md) с фильтром по `basketId`. Одно свойство по идентификатору возвращает метод [sale.basketproperties.get](./sale-basket-properties-get.md)
4. Чтобы изменить свойство, вызовите [sale.basketproperties.update](./sale-basket-properties-update.md) и передайте `name`, `value` и `code` вместе, даже если вы меняете только значение
5. Удалите ненужное свойство методом [sale.basketproperties.delete](./sale-basket-properties-delete.md)

## Что важно учитывать

- Поля `name`, `value`, `code` и `xmlId` хранят до 255 символов. Более длинное значение Битрикс24 обрежет без ошибки
- Битрикс24 не проверяет `code` на уникальность: повторный вызов [sale.basketproperties.add](./sale-basket-properties-add.md) с тем же `code` создаст у позиции второе свойство. Чтобы избежать дубля, сначала поищите свойство методом [sale.basketproperties.list](./sale-basket-properties-list.md) по `basketId` и `code`
- В ответе [sale.basketproperties.list](./sale-basket-properties-list.md) могут быть свойства, которые приложение не создавало: служебные `CATALOG.XML_ID` и `PRODUCT.XML_ID` у позиций из каталога или характеристики вариации товара. Чтобы отличать свои свойства, начинайте `code` с префикса приложения, например `MYAPP_SIZE`. Для изменения и удаления сохраняйте `id` из ответа [sale.basketproperties.add](./sale-basket-properties-add.md)

{% note warning "" %}

Перенести свойство на другую позицию нельзя. Метод [sale.basketproperties.update](./sale-basket-properties-update.md) примет новый `basketId` без ошибки, но свойство останется у прежней позиции. Чтобы свойство появилось у нужной позиции, удалите его и создайте заново.

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода — получать свойства может менеджер магазина, описание полей — любой пользователь, добавлять, изменять и удалять свойства — администратор

#|
|| **Метод** | **Описание** ||
|| [sale.basketproperties.add](./sale-basket-properties-add.md) | Добавляет свойство позиции корзины ||
|| [sale.basketproperties.update](./sale-basket-properties-update.md) | Обновляет поля свойства позиции корзины ||
|| [sale.basketproperties.get](./sale-basket-properties-get.md) | Возвращает свойство позиции корзины по идентификатору ||
|| [sale.basketproperties.list](./sale-basket-properties-list.md) | Возвращает список свойств позиций корзины ||
|| [sale.basketproperties.delete](./sale-basket-properties-delete.md) | Удаляет свойство позиции корзины ||
|| [sale.basketproperties.getFields](./sale-basket-properties-get-fields.md) | Возвращает описание полей свойства позиции корзины ||
|#
