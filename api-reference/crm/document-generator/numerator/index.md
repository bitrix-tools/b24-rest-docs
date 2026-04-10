# Нумераторы

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
|| [crm.documentgenerator.numerator.add](./crm-document-generator-numerator-add.md) | Добавляет новый нумератор ||
|| [crm.documentgenerator.numerator.update](./crm-document-generator-numerator-update.md) | Обновляет существующий нумератор ||
|| [crm.documentgenerator.numerator.get](./crm-document-generator-numerator-get.md) | Возвращает информацию о нумераторе по ID ||
|| [crm.documentgenerator.numerator.list](./crm-document-generator-numerator-list.md) | Возвращает список нумераторов ||
|| [crm.documentgenerator.numerator.delete](./crm-document-generator-numerator-delete.md) | Удаляет нумератор ||
|#

