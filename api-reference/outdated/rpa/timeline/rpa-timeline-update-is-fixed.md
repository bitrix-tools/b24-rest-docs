# Обновить флаг прикрепления записи rpa.timeline.updateIsFixed

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`rpa`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [смарт-процессы](../../../crm/universal/user-defined-object-types/index.md) как аналог функционала.

{% endnote %}

Метод обновляет флаг прикрепления записи.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **id** 
[`integer`](../../../data-types.md) | Идентификатор записи ||
|| **isFixed** 
[`string`](../../../data-types.md) | Флаг прикрепления записи. Возможные значения:
- `Y` — запись будет прикреплена
- `N` — запись не будет прикреплена ||
|#

## Обработка ответа

HTTP-статус: **200**

```json
{
    "timeline": {
        "id": 322,
        ...
    }
}
```

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./rpa-timeline-add.md)
- [{#T}](./rpa-timeline-update.md)
- [{#T}](./rpa-timeline-list-for-item.md)
- [{#T}](./rpa-timeline-delete.md)




