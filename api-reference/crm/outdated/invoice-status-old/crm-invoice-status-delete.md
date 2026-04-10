# Удалить статус счета crm.invoice.status.delete

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [Универсальные методы для счетов](../../universal/invoice.md).

{% endnote %}

Метод `crm.invoice.status.delete` удаляет статус счета.

{% note warning %}

С версии 19.0.0 рекомендуется использовать метод [crm.status.delete](../../../crm/status/crm-status-delete.md)

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор статуса счета ||
|#





