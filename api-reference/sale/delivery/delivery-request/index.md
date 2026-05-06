# Транспортные заявки служб доставки: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Транспортные заявки синхронизируют заказ в Битрикс24 со статусами и сообщениями внешней службы доставки. Например, можно обновить трек-номер, изменить дату доставки или отправить уведомление клиенту.

Это нужно, чтобы держать в актуальном состоянии информацию о перемещении груза и информировать участников доставки.

> Быстрый переход: [все методы](#all-methods)

## Структура данных заявки

Метод [sale.delivery.request.update](./sale-delivery-request-update.md) обновляет данные заявки через параметры `STATUS`, `PROPERTIES` и `FINALIZE`.

Параметр `PROPERTIES` передает дополнительные данные доставки, а `STATUS` — текущее состояние заявки. Чтобы полностью заменить набор свойств, используйте `OVERWRITE_PROPERTIES=Y`.

Метод [sale.delivery.request.sendmessage](./sale-delivery-request-send-message.md) создает оповещения по заявке. Получателя задавайте параметром `ADDRESSEE`, а текст, заголовок и статус сообщения — в объекте [`MESSAGE`](./sale-delivery-request-send-message.md#parametr-message).

## Связь транспортных заявок с другими объектами

**Службы доставки.** Транспортная заявка привязана к конкретной службе доставки по `DELIVERY_ID`. Управляйте службами через методы [sale.delivery.*](../delivery/index.md).

**Заказ и отгрузки.** Заявка связана с заказом через отгрузки. Идентификатор заявки формируется внешней системой в сценарии [Создание заказа на доставку](../webhooks/create-delivery-request.md).

## Как работать с транспортными заявками

1. Получите `DELIVERY_ID` службы доставки методом [sale.delivery.getlist](../delivery/sale-delivery-get-list.md).
2. Используйте `REQUEST_ID`, который внешняя система возвращает в вебхуке [Создание заказа на доставку](../webhooks/create-delivery-request.md).
3. Обновите статус и свойства заявки методом [sale.delivery.request.update](./sale-delivery-request-update.md)
4. Отправьте оповещения менеджеру или получателю методом [sale.delivery.request.sendmessage](./sale-delivery-request-send-message.md).
5. Удалите неактуальную заявку методом [sale.delivery.request.delete](./sale-delivery-request-delete.md).

## Обзор методов {#all-methods}

> Scope: [`sale, delivery`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: администратор

#|
|| **Метод** | **Описание** ||
|| [sale.delivery.request.update](./sale-delivery-request-update.md) | Обновляет транспортную заявку ||
|| [sale.delivery.request.sendmessage](./sale-delivery-request-send-message.md) | Создает оповещения по транспортной заявке ||
|| [sale.delivery.request.delete](./sale-delivery-request-delete.md) | Удаляет транспортную заявку ||
|#
