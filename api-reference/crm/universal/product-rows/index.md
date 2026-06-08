# Товарные позиции в объектах CRM: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Товарные позиции — это строки с товарами или услугами в карточке CRM. В них хранится состав продажи: название, цена, количество, скидки и налоги. По этим данным CRM рассчитывает итоговую сумму лида, сделки, предложения, счета или смарт-процесса.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как добавить товары в карточку CRM](https://helpdesk.bitrix24.ru/open/27964692/)

## Как работать с товарными позициями

Каждая товарная позиция относится к объекту CRM: лиду, сделке, предложению, новому счету или смарт-процессу. Чтобы добавить товар, заменить список товаров или получить товары объекта CRM, укажите `ownerType` и `ownerId`.

Например, для сделки с ID `13142` передайте `ownerType: "D"` и `ownerId: 13142`. Код `D` означает сделку, остальные коды смотрите в справочнике [типов объектов CRM](../../data-types.md#object_type). Идентификатор объекта можно получить методом [crm.item.list](../crm-item-list.md) или из ответа метода [crm.item.add](../crm-item-add.md).

1. Получите описание полей товарной позиции методом [crm.item.productrow.fields](./crm-item-productrow-fields.md). Метод поможет понять, какие значения можно передавать при добавлении и изменении позиции
2. Добавьте одну товарную позицию методом [crm.item.productrow.add](./crm-item-productrow-add.md). Если нужно заменить весь список товаров в объекте CRM, используйте метод [crm.item.productrow.set](./crm-item-productrow-set.md)
3. Получите товарные позиции объекта CRM методом [crm.item.productrow.list](./crm-item-productrow-list.md). Если нужна одна позиция, передайте ее идентификатор в метод [crm.item.productrow.get](./crm-item-productrow-get.md)
4. Измените товарную позицию методом [crm.item.productrow.update](./crm-item-productrow-update.md) или удалите ее методом [crm.item.productrow.delete](./crm-item-productrow-delete.md), если товар больше не нужен в объекте CRM

## Что важно учитывать

- Доступ к товарным позициям зависит от доступа к объекту CRM, в котором они находятся. Если пользователь не может открыть сделку, счет или смарт-процесс, он не сможет получить или изменить их товарные позиции
- Методы [crm.item.productrow.*](#all-methods) не работают со старыми счетами. Для новых интеграций со счетами используйте методы [crm.item.*](../invoice.md)
- Метод [crm.item.productrow.set](./crm-item-productrow-set.md) заменяет весь список товарных позиций объекта CRM на переданный набор. Если нужно добавить одну позицию, используйте [crm.item.productrow.add](./crm-item-productrow-add.md)

## Связь с другими объектами

**Элементы CRM.** Товарные позиции относятся к конкретному элементу CRM. Связь задается через `ownerType` и `ownerId` в методах [crm.item.productrow.add](./crm-item-productrow-add.md), [crm.item.productrow.set](./crm-item-productrow-set.md), [crm.item.productrow.list](./crm-item-productrow-list.md) и [crm.item.productrow.getAvailableForPayment](./crm-item-productrow-get-available-for-payment.md).

**Каталог товаров.** Товарная позиция может быть связана с товаром каталога через поле `productId` в методах [crm.item.productrow.add](./crm-item-productrow-add.md) и [crm.item.productrow.set](./crm-item-productrow-set.md). Если передать `productId`, но не передать `productName` или `measureCode`, CRM использует название товара и единицу измерения из каталога.

**Оплата.** Метод [crm.item.productrow.getAvailableForPayment](./crm-item-productrow-get-available-for-payment.md) получает товарные позиции объекта CRM, по которым клиенту еще не была выставлена оплата. Объект CRM указывается через `ownerType` и `ownerId`.

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [crm.item.productrow.add](./crm-item-productrow-add.md) | Добавляет товарную позицию ||
|| [crm.item.productrow.update](./crm-item-productrow-update.md) | Обновляет товарную позицию ||
|| [crm.item.productrow.get](./crm-item-productrow-get.md) | Получает информацию о товарной позиции ||
|| [crm.item.productrow.list](./crm-item-productrow-list.md) | Получает список товарных позиций ||
|| [crm.item.productrow.delete](./crm-item-productrow-delete.md) | Удаляет товарную позицию ||
|| [crm.item.productrow.set](./crm-item-productrow-set.md) | Сохраняет набор товарных позиций объекта CRM ||
|| [crm.item.productrow.getAvailableForPayment](./crm-item-productrow-get-available-for-payment.md) | Получает товарные позиции без выставленной оплаты ||
|| [crm.item.productrow.fields](./crm-item-productrow-fields.md) | Получает описание полей товарных позиций ||
|#
