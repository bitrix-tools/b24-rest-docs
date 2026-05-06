# Документы: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

{% note warning "" %}

**DEPRECATED**

Развитие методов раздела остановлено.
Используйте раздел [Документы складского учета (`catalog.document.*`)](../index.md).

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: администратор

#|
|| **Метод** | **Описание** ||
|| [catalog.document.confirm](./catalog-document-confirm.md) | Проводит документ складского учета ||
|| [catalog.document.unconfirm](./catalog-document-unconfirm.md) | Отменяет проведение документа ||
|| [catalog.document.fields](./catalog-document-fields.md) | Возвращает список полей документов ||
|| [catalog.document.element.fields](./catalog-document-element-fields.md) | Возвращает список полей товаров документа складского учета ||
|#



