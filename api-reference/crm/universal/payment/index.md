# Обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [crm.item.payment.add](./crm-item-payment-add.md) | Создает оплату для объекта CRM ||
|| [crm.item.payment.update](./crm-item-payment-update.md) | Изменяет набор полей оплаты ||
|| [crm.item.payment.get](./crm-item-payment-get.md) | Получает краткую информацию об оплате ||
|| [crm.item.payment.list](./crm-item-payment-list.md) | Получает список оплат конкретного объекта CRM ||
|| [crm.item.payment.delete](./crm-item-payment-delete.md) | Удаляет оплату   ||
|| [crm.item.payment.pay](./crm-item-payment-pay.md) | Изменяет статус оплаты на «Оплачено» ||
|| [crm.item.payment.unpay](./crm-item-payment-unpay.md) | Изменяет статус оплаты на «Не оплачено» ||
|#

