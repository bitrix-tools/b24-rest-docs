# Получить список статусов счета crm.invoice.status.list

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [Универсальные методы для счетов](../../universal/invoice.md).

{% endnote %}
{% note warning %}

С версии 19.0.0 рекомендуется использовать метод [crm.status.list](../../../crm/status/crm-status-list.md)

{% endnote %}

Метод `crm.invoice.status.list` возвращает список статусов счета по фильтру. Является реализацией списочных методов для статусов счета.

## Параметры метода

Cм. описание [списочных методов](../../../../settings/how-to-call-rest-api/list-methods-pecularities.md)



