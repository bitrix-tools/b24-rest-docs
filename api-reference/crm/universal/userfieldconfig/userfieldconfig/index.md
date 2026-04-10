# Пользовательские поля

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`userfieldconfig`](../../../../scopes/permissions.md), scope модуля из `moduleId` (например, [`crm`](../../../../scopes/permissions.md))
>
> Кто может выполнять метод: в зависимости от метода

Методы работы с пользовательскими полями:

#|
|| **Метод** | **Описание** ||
|| [userfieldconfig.add](userfieldconfig-add.md) | Метод добавляет пользовательское поле. ||
|| [userfieldconfig.delete](userfieldconfig-delete.md) | Метод удаляет пользовательское поле. ||
|| [userfieldconfig.get](userfieldconfig-get.md) | Метод для получения данных о настройках пользовательского поля с идентификатором id.. ||
|| [userfieldconfig.getTypes](userfieldconfig-get-types.md) | Метод возвращает набор доступных типов пользовательских полей для модуля moduleId. ||
|| [userfieldconfig.list](userfieldconfig-list.md) | Метод получает список настроек пользовательских полей. ||
|| [userfieldconfig.update](userfieldconfig-update.md) | Метод изменяет значение поля. ||
|#

## Продолжите изучение

- [{#T}](../../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-user-field-to-spa.md)
