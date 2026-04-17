# Устаревшие методы платежных систем

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

{% note warning "" %}

**DEPRECATED**

Методы раздела поддерживают интеграцию со старыми счетами CRM. Развитие методов [crm.invoice.*](../../crm/outdated/invoice/index.md) остановлено.

Используйте раздел [Универсальные методы для счетов](../../crm/universal/invoice.md).

{% endnote %}

> Scope: [`pay_system`](../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

## Методы

#|
|| **Метод** | **Описание** ||
|| [sale.paysystem.pay.invoice](./sale-pay-system-pay-invoice.md) | Запускает оплату счета через конкретную платежную систему ||
|| [sale.paysystem.settings.invoice.get](./sale-pay-system-settings-invoice-get.md) | Возвращает настройки платежной системы для конкретного счета ||
|#
