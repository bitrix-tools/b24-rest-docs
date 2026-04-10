# Шаблоны документов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужно вступление, соответствующее заголовку

{% endnote %}

{% endif %}

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом "изменения" шаблонов генератора документов

#|
|| **Метод** | **Описание** ||
|| [crm.documentgenerator.template.add](./crm-document-generator-template-add.md) | Добавляет новый шаблон ||
|| [crm.documentgenerator.template.update](./crm-document-generator-template-update.md) | Обновляет существующий шаблон ||
|| [crm.documentgenerator.template.get](./crm-document-generator-template-get.md) | Возвращает информацию о шаблоне по ID ||
|| [crm.documentgenerator.template.list](./crm-document-generator-template-list.md) | Возвращает список шаблонов ||
|| [crm.documentgenerator.template.delete](./crm-document-generator-template-delete.md) | Удаляет шаблон ||
|| [crm.documentgenerator.template.getfields](./crm-document-generator-template-get-fields.md) | Возвращает поля шаблона ||
|#
