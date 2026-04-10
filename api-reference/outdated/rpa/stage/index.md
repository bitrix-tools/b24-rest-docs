# Стадии: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

{% note warning "" %}

**DEPRECATED**

Развитие методов rpa.stage.* остановлено.
Используйте раздел [Смарт-процессы CRM](../../../crm/universal/user-defined-object-types/index.md).

{% endnote %}

> Scope: [`rpa`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [rpa.stage.add](./rpa-stage-add.md) | Добавлет новую стадию ||
|| [rpa.stage.update](./rpa-stage-update.md) | Обновляет стадию по `id` ||
|| [rpa.stage.get](./rpa-stage-get.md) | Получает информацию о стадии по ее `id` ||
|| [rpa.stage.listForType](./rpa-stage-list-for-type.md) | Получает список стадий процесса, отсотированный в порядке сортировки, с финальными стадиями в конце ||
|| [rpa.stage.delete](./rpa-stage-delete.md) | Удаляет стадию ||
|#

