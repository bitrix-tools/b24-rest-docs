# Документы

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
> Кто может выполнять метод: пользователь с правом "изменения" документов генератора документов

#|
|| **Метод** | **Описание** ||
|| [crm.documentgenerator.document.add](./crm-document-generator-document-add.md) | Создает новый документ ||
|| [crm.documentgenerator.document.update](./crm-document-generator-document-update.md) | Обновляет документ ||
|| [crm.documentgenerator.document.get](./crm-document-generator-document-get.md) | Возвращает информацию о документе по ID ||
|| [crm.documentgenerator.document.list](./crm-document-generator-document-list.md) | Возвращает список документов ||
|| [crm.documentgenerator.document.delete](./crm-document-generator-document-delete.md) | Удаляет документ ||
|| [crm.documentgenerator.document.enablepublicurl](./crm-document-generator-document-enable-public-url.md) | Включает или выключает публичную ссылку на документ ||
|| [crm.documentgenerator.document.upload](./crm-document-generator-document-upload.md) | Загружает готовый документ и прикрепляет его к CRM-объекту ||
|| [crm.documentgenerator.document.getfields](./crm-document-generator-document-get-fields.md) | Возвращает поля документа ||
|#
