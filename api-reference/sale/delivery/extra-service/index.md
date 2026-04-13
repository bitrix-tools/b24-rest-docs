# Дополнительные услуги служб доставки: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Дополнительные услуги расширяют варианты доставки для конкретной службы. Например, можно добавить опцию Подъем на этаж или Страховка груза.

Это нужно, чтобы покупатель мог выбрать дополнительные опции при оформлении заказа. Битрикс24 учитывает стоимость этих услуг в итоговой сумме доставки.

> Быстрый переход: [все методы](#all-methods)
> 
> Пользовательская документация: [Службы доставки](https://helpdesk.bitrix24.ru/open/17225250/)

## Связь дополнительных услуг с другими объектами

**Служба доставки.** Идентификатор службы `DELIVERY_ID` связывает услугу с конкретным перевозчиком или способом доставки.

**Тип услуги.** Параметр `TYPE` определяет логику выбора услуги покупателем:
- `enum` — список вариантов
- `checkbox` — единичная услуга
- `quantity` — количественная услуга

**Стоимость услуги.** Способ указания цены зависит от типа. Для `checkbox` и `quantity` используйте поле `PRICE`. Для типа `enum` указывайте цену в `ITEMS[].PRICE` для каждого отдельного варианта.

## Как работать с дополнительными услугами

1. Получите идентификатор службы доставки методом [sale.delivery.getlist](../delivery/sale-delivery-get-list.md).
2. Создайте новую услугу методом [sale.delivery.extra.service.add](./sale-delivery-extra-service-add.md). Укажите тип услуги и привязку к службе через параметр `DELIVERY_ID`.
3. Проверьте результат методом [sale.delivery.extra.service.get](./sale-delivery-extra-service-get.md). Он вернет список всех услуг выбранной службы. Используйте `ID` из ответа в следующем шаге.
4. Если нужно изменить услугу, вызовите метод [sale.delivery.extra.service.update](./sale-delivery-extra-service-update.md). Если нужно удалить услугу, используйте метод [sale.delivery.extra.service.delete](./sale-delivery-extra-service-delete.md).

## Обзор методов {#all-methods}

> Scope: [`sale, delivery`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: администратор

#|
|| **Метод** | **Описание** ||
|| [sale.delivery.extra.service.add](./sale-delivery-extra-service-add.md) | Добавляет услугу службы доставки ||
|| [sale.delivery.extra.service.update](./sale-delivery-extra-service-update.md) | Обновляет услугу службы доставки ||
|| [sale.delivery.extra.service.get](./sale-delivery-extra-service-get.md) | Возвращает список услуг конкретной службы доставки ||
|| [sale.delivery.extra.service.delete](./sale-delivery-extra-service-delete.md) | Удаляет услугу службы доставки ||
|#
