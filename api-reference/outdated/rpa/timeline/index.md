# Записи таймлайна: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

{% note warning "" %}

**DEPRECATED**

Развитие методов rpa.timeline.* остановлено.
Используйте раздел [Смарт-процессы CRM](../../../crm/universal/user-defined-object-types/index.md).

{% endnote %}

> Scope: [`rpa`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Набор методов для работы с записями таймлайна.

#|
|| **Метод** | **Описание** ||
|| [rpa.timeline.add](./rpa-timeline-add.md) | Создает новую запись таймлайна у элемента ||
|| [rpa.timeline.update](./rpa-timeline-update.md) | Обновляет запись таймлайна с идентификатором `id` ||
|| [rpa.timeline.updateIsFixed](./rpa-timeline-update-is-fixed.md) | Обновляет флаг прикрепления записи ||
|| [rpa.timeline.listForItem](./rpa-timeline-list-for-item.md) | Получает массив записей таймлайна для элемента ||
|| [rpa.timeline.delete](./rpa-timeline-delete.md) | Удаляет запись таймлайна ||
|#

