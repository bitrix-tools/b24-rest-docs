# Платежные системы: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Платежные системы принимают оплату от покупателей. Например, можно подключить банковский эквайринг или сервис онлайн-платежей. Покупатель выбирает способ оплаты при оформлении заказа, после чего система обрабатывает транзакцию.

Раздел объединяет методы для регистрации обработчика, создания платежной системы, настройки параметров и запуска оплаты.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Платежные системы – приложения для Битрикс24](https://helpdesk.bitrix24.ru/open/14945142/)

## Связь с другими объектами

Платежная система работает в связке с типом плательщика, оплатой, заказом и обработчиком. Эти связи определяют доступность системы и внешний сервис, через который проходит платеж.

**Тип плательщика.** Параметр `PERSON_TYPE_ID` определяет, для какого типа плательщика работает платежная система.

**Оплата.** Пара `PAYMENT_ID` и `PAY_SYSTEM_ID` связывает оплату с конкретной платежной системой. Настройки оплаты возвращает метод [sale.paysystem.settings.payment.get](./sale-pay-system-settings-payment-get.md), оплату запускает [sale.paysystem.pay.payment](./sale-pay-system-pay-payment.md).

**Заказ.** В сценарии счета CRM оплата выполняется через связанный заказ на уровне API. При оплате счета система изменяет статус оплаты этого заказа. Связку счета с заказом возвращает метод [crm.orderentity.list](../crm/universal/order-entity/crm-order-entity-list.md).

**REST-обработчик.** Код `BX_REST_HANDLER` связывает платежную систему с внешним платежным провайдером.

## Как начать работу

1. Получите идентификатор типа плательщика `PERSON_TYPE_ID` методом [sale.persontype.list](../sale/person-type/sale-person-type-list.md).
2. Зарегистрируйте REST-обработчик методом [sale.paysystem.handler.add](./sale-pay-system-handler-add.md).
3. Создайте платежную систему методом [sale.paysystem.add](./sale-pay-system-add.md). Передайте `PERSON_TYPE_ID` и код обработчика `BX_REST_HANDLER`.
4. Проверьте результат методом [sale.paysystem.list](./sale-pay-system-list.md). При необходимости обновите данные методом [sale.paysystem.update](./sale-pay-system-update.md).
5. Настройте параметры работы методами [sale.paysystem.settings.get](./sale-pay-system-settings-get.md) и [sale.paysystem.settings.update](./sale-pay-system-settings-update.md).
6. Для оплаты заказа получите `PAYMENT_ID` методом [sale.payment.list](../sale/payment/sale-payment-list.md), затем запустите оплату через [sale.paysystem.pay.payment](./sale-pay-system-pay-payment.md).
7. Для счета CRM используйте отдельный сценарий: получите `orderId` через [crm.orderentity.list](../crm/universal/order-entity/crm-order-entity-list.md), затем найдите `PAYMENT_ID` в [sale.payment.list](../sale/payment/sale-payment-list.md) с фильтром `{"=orderId": <orderId>}` и передайте этот идентификатор в [crm.item.payment.pay](../crm/universal/payment/crm-item-payment-pay.md).

## Обзор методов {#all-methods}

> Scope: [`pay_system`](../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

### REST-обработчики платежной системы

#|
|| **Метод** | **Описание** ||
|| [sale.paysystem.handler.add](./sale-pay-system-handler-add.md) | Добавляет REST-обработчик платежной системы ||
|| [sale.paysystem.handler.update](./sale-pay-system-handler-update.md) | Обновляет REST-обработчик платежной системы ||
|| [sale.paysystem.handler.list](./sale-pay-system-handler-list.md) | Возвращает список REST-обработчиков платежной системы ||
|| [sale.paysystem.handler.delete](./sale-pay-system-handler-delete.md) | Удаляет REST-обработчик платежной системы ||
|#

### Платежные системы

#|
|| **Метод** | **Описание** ||
|| [sale.paysystem.add](./sale-pay-system-add.md) | Добавляет платежную систему ||
|| [sale.paysystem.update](./sale-pay-system-update.md) | Изменяет платежную систему ||
|| [sale.paysystem.list](./sale-pay-system-list.md) | Возвращает список платежных систем ||
|| [sale.paysystem.delete](./sale-pay-system-delete.md) | Удаляет платежную систему ||
|| [sale.paysystem.settings.get](./sale-pay-system-settings-get.md) | Возвращает настройки платежной системы ||
|| [sale.paysystem.settings.update](./sale-pay-system-settings-update.md) | Обновляет настройки платежной системы ||
|| [sale.paysystem.settings.payment.get](./sale-pay-system-settings-payment-get.md) | Возвращает настройки платежной системы для конкретной оплаты ||
|| [sale.paysystem.pay.payment](./sale-pay-system-pay-payment.md) | Запускает оплату заказа через выбранную платежную систему ||
|#
