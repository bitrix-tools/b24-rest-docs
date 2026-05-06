# Удалить робота из процесса rpa.task.delete

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`rpa`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [смарт-процессы](../../../crm/universal/user-defined-object-types/index.md) как аналог функционала.

{% endnote %}

Метод удаляет робота с именем `robotName` из процесса с идентификатором `typeId` со стадии с идентификатором `stageId`.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **typeId** 
[`integer`](../../../data-types.md) | Идентификатор процесса ||
|| **stageId** 
[`integer`](../../../data-types.md) | Идентификатор стадии ||
|| **robotName** 
[`string`](../../../data-types.md) | Имя робота ||
|#

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./rpa-task-add-user.md)
- [{#T}](./rpa-task-do.md)




