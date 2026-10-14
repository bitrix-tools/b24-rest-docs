# Доставки в оплатах: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Позиция доставки — строка оплаты CRM, которая показывает, какую доставку оплачивает клиент. Например, если клиент платит сразу за товар и курьерскую доставку, в оплате будут товарная позиция и позиция доставки.

Сама доставка — отдельный документ в заказе сделки или счета. В нем хранятся служба доставки, стоимость и статус отгрузки. Позиция доставки только ссылается на этот документ и берет из него цену. Позициями управляют методы [crm.item.payment.delivery.*](#all-methods), а прочитать документы доставки объекта CRM можно методами [crm.item.delivery.*](../../delivery/index.md).

> Быстрый переход: [все методы](#all-methods)

## Связь доставок в оплатах с другими объектами

**Оплата CRM.** Методы группы работают с позициями конкретной оплаты. Чтобы добавить позицию или получить список позиций, передают `paymentId` оплаты, чтобы удалить или перепривязать позицию — ее `id`. Когда позицию добавляют, перепривязывают к другому документу или удаляют, Битрикс24 пересчитывает сумму оплаты по стоимости ее позиций.

Менять позиции можно только в неоплаченной оплате. Если клиент уже оплатил ее, методы изменения вернут ошибку `ACCESS_DENIED` — такую же, как при нехватке прав.

**Документ доставки.** Метод [crm.item.payment.delivery.add](./crm-item-payment-delivery-add.md) привязывает позицию к документу при создании, а [crm.item.payment.delivery.setDelivery](./crm-item-payment-delivery-set-delivery.md) перепривязывает ее к другому. Документ передают в параметре `deliveryId`, список документов объекта CRM возвращает метод [crm.item.delivery.list](../../delivery/crm-item-delivery-list.md).

**Объект CRM.** Создать оплату методом [crm.item.payment.add](../crm-item-payment-add.md) можно только у сделки или счета, поэтому позиции доставки бывают в оплатах этих объектов.

## Из чего состоит позиция доставки

Позиции доставки в оплате возвращает метод [crm.item.payment.delivery.list](./crm-item-payment-delivery-list.md). У каждой позиции четыре поля:

#|
|| **Поле** | **Описание** ||
|| `id` | Идентификатор позиции. Его передают в методы [crm.item.payment.delivery.setDelivery](./crm-item-payment-delivery-set-delivery.md) и [crm.item.payment.delivery.delete](./crm-item-payment-delivery-delete.md) ||
|| `paymentId` | Идентификатор оплаты, в которую входит позиция ||
|| `deliveryId` | Идентификатор документа доставки — поле `id` из ответа [crm.item.delivery.list](../../delivery/crm-item-delivery-list.md) ||
|| `quantity` | Количество. У позиции доставки всегда `1` ||
|#

{% note warning "" %}

В параметре `deliveryId` методов группы передавайте `id` документа доставки из ответа [crm.item.delivery.list](../../delivery/crm-item-delivery-list.md), а не поле `deliveryId` из того же ответа: там так называется номер службы доставки. Документ должен относиться к тому же заказу, что и оплата. Если такого документа в заказе нет, метод [crm.item.payment.delivery.add](./crm-item-payment-delivery-add.md) вернет ошибку `Доставка не найдена`.

{% endnote %}

## Как работать с доставками в оплате

1. Подготовьте `paymentId` неоплаченной оплаты. Получить его можно основными методами оплат [crm.item.payment.*](../index.md)
2. Получите `id` документа доставки методом [crm.item.delivery.list](../../delivery/crm-item-delivery-list.md)
3. Добавьте позицию доставки методом [crm.item.payment.delivery.add](./crm-item-payment-delivery-add.md)
4. Проверьте состав позиций методом [crm.item.payment.delivery.list](./crm-item-payment-delivery-list.md)
5. При необходимости перепривяжите позицию к другому документу методом [crm.item.payment.delivery.setDelivery](./crm-item-payment-delivery-set-delivery.md) или удалите ее методом [crm.item.payment.delivery.delete](./crm-item-payment-delivery-delete.md)

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [crm.item.payment.delivery.add](./crm-item-payment-delivery-add.md) | Добавляет позицию доставки в оплату ||
|| [crm.item.payment.delivery.list](./crm-item-payment-delivery-list.md) | Возвращает список позиций доставки по конкретной оплате ||
|| [crm.item.payment.delivery.delete](./crm-item-payment-delivery-delete.md) | Удаляет позицию доставки из оплаты ||
|| [crm.item.payment.delivery.setDelivery](./crm-item-payment-delivery-set-delivery.md) | Перепривязывает позицию доставки к другому документу доставки ||
|#

## Продолжите изучение

- [{#T}](../index.md)
- [{#T}](../../delivery/index.md)
- [{#T}](../products-in-payment/index.md)
