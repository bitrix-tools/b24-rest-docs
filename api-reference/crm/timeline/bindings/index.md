# Обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

Отсутствует контент

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [crm.timeline.bindings.bind](./crm-timeline-bindings-bind.md) | Добавляет связь записи таймлайна с элементом CRM ||
|| [crm.timeline.bindings.list](./crm-timeline-bindings-list.md) | Получает список связей для записи в таймлайне ||
|| [crm.timeline.bindings.unbind](./crm-timeline-bindings-unbind.md) | Удаляет связь записи таймлайна с элементом CRM ||
|| [crm.timeline.bindings.fields](./crm-timeline-bindings-fields.md) | Получает поля связи элементов CRM и записи в таймлайне таймлайна ||
|#
