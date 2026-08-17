# Платежные системы: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Платежные системы принимают оплату от покупателей. Например, можно подключить банковский эквайринг или сервис онлайн-платежей. Покупатель выбирает способ оплаты при оформлении заказа, после чего система обрабатывает транзакцию.

Через REST API можно зарегистрировать обработчик внешнего платежного сервиса, создать платежную систему, настроить ее параметры и запустить оплату.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Платежные системы – приложения для Битрикс24](https://helpdesk.bitrix24.ru/open/14945142/)

## Связь с другими объектами

Платежная система работает в связке с типом плательщика, оплатой, заказом и обработчиком. Эти связи определяют доступность системы и внешний сервис, через который проходит платеж.

**Тип плательщика.** Параметр `PERSON_TYPE_ID` определяет, для какого типа плательщика работает платежная система.

**Оплата.** Пара `PAYMENT_ID` и `PAY_SYSTEM_ID` связывает оплату с конкретной платежной системой. Настройки оплаты возвращает метод [sale.paysystem.settings.payment.get](./sale-pay-system-settings-payment-get.md), оплату запускает [sale.paysystem.pay.payment](./sale-pay-system-pay-payment.md).

**Заказ.** В сценарии счета CRM оплата выполняется через связанный заказ на уровне API. При оплате счета система изменяет статус оплаты этого заказа. Связку счета с заказом возвращает метод [crm.orderentity.list](../crm/universal/order-entity/crm-order-entity-list.md).

**REST-обработчик.** Код `BX_REST_HANDLER` связывает платежную систему с внешним платежным провайдером.

## Типы привязки платежной системы

Параметр `ENTITY_REGISTRY_TYPE` определяет, где будет доступна платежная система.

#|
|| **Значение** | **Где работает платежная система** ||
|| `ORDER` | Заказы магазина, сделки, смарт-процессы ||
|| `CRM_INVOICE` | Счета CRM ||
|| `CRM_QUOTE` | Коммерческие предложения CRM ||
|#

Тип привязки задается один раз при создании платежной системы методом [sale.paysystem.add](./sale-pay-system-add.md). Если параметр не передан, платежная система создается с типом `CRM_INVOICE`. Тип плательщика `PERSON_TYPE_ID` должен относиться к тому же типу привязки, иначе метод вернет ошибку `ERROR_PERSON_TYPE_NOT_FOUND`.

## Режимы работы REST-обработчика

Режим определяет, как покупатель попадает на оплату. Режим задается при регистрации обработчика методом [sale.paysystem.handler.add](./sale-pay-system-handler-add.md): в параметре `SETTINGS` нужно передать один из трех объектов.

#|
|| **Режим** | **Что происходит при оплате** | **Когда использовать** ||
|| `FORM_DATA` | Битрикс24 показывает форму и отправляет ее данные на адрес `ACTION_URI` платежного сервиса | От покупателя нужно немного данных или не нужно ничего ||
|| `CHECKOUT_DATA` | Битрикс24 отправляет данные оплаты на `ACTION_URI`, сервис создает платеж и возвращает ссылку на свою страницу оплаты | Оплата проходит на стороне платежного сервиса ||
|| `IFRAME_DATA` | Битрикс24 загружает страницу платежного сервиса в iframe на странице оплаты | Оплата проходит на стороне сервиса, но без ухода со страницы Битрикс24 ||
|#

## Как начать работу

1. Получите идентификатор типа плательщика `PERSON_TYPE_ID` методом [sale.persontype.list](../sale/person-type/sale-person-type-list.md).
2. Зарегистрируйте REST-обработчик методом [sale.paysystem.handler.add](./sale-pay-system-handler-add.md). Выберите режим работы обработчика. Настраивать обработчики и платежные системы может администратор CRM с правом «Разрешить изменять настройки».
3. Создайте платежную систему методом [sale.paysystem.add](./sale-pay-system-add.md). Передайте `PERSON_TYPE_ID`, код обработчика `BX_REST_HANDLER` и тип привязки `ENTITY_REGISTRY_TYPE`.
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
