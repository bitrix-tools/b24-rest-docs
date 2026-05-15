# События

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

{% note info "Права" %}

**Scope**: [`crm`](../../../../scopes/permissions.md) | **Кто может подписаться**: `любой пользователь`

{% endnote %}

#|
|| **Событие** | **Вызывается** ||
|| [onCrmInvoiceAdd](./on-crm-invoice-add.md) | при создании счета ||
|| [onCrmInvoiceDelete](./on-crm-invoice-delete.md) | при удалении счета ||
|| [onCrmInvoiceSetStatus](./on-crm-invoice-set-status.md) | при изменении статуса счета ||
|| [onCrmInvoiceUpdate](./on-crm-invoice-update.md) | при обновлении счета ||
|| [onCrmInvoiceUserFieldAdd](./on-crm-invoice-user-field-add.md) | при добавлении пользовательского поля ||
|| [onCrmInvoiceUserFieldUpdate](./on-crm-invoice-user-field-update.md) | при изменении пользовательского поля ||
|| [onCrmInvoiceUserFieldDelete](./on-crm-invoice-recurring-delete.md) | при удалении пользовательского поля ||
|| [onCrmInvoiceUserFieldSetEnumValues](./on-crm-invoice-user-field-set-enum-values.md) | при изменении набора значений для пользовательского поля списочного типа ||
|| [onCrmInvoiceRecurringAdd](./on-crm-invoice-recurring-add.md) | при создании нового регулярного счета ||
|| [onCrmInvoiceRecurringUpdate](./on-crm-invoice-recurring-update.md) | при обновлении регулярного счета ||
|| [onCrmInvoiceRecurringDelete](./on-crm-invoice-recurring-delete.md) | при удалении регулярного счета ||
|| [onCrmInvoiceRecurringExpose](./on-crm-invoice-recurring-expose.md) | при выставлении нового счета из регулярного счета ||
|#