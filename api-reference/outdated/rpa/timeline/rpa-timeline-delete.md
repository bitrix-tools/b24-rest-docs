# Удалить запись таймлайна rpa.timeline.delete

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`rpa`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [смарт-процессы](../../../crm/universal/user-defined-object-types/index.md) как аналог функционала.

{% endnote %}

Метод удаляет запись таймлайна с идентификатором `id`.

Метод удаляет только те записи, которые созданы этим же пользователем и с помощью приложения.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор записи ||
|#

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./rpa-timeline-add.md)
- [{#T}](./rpa-timeline-update.md)
- [{#T}](./rpa-timeline-update-is-fixed.md)
- [{#T}](./rpa-timeline-list-for-item.md)




