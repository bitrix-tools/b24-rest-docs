# Пользовательские поля документов складского учета: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Раздел содержит методы для чтения и обновления значений пользовательских полей документов складского учета. Создание и настройка самих пользовательских полей выполняются в отдельном разделе `userfieldconfig.*`.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как начать работу со складским учетом](https://helpdesk.bitrix24.ru/open/17792114/)

## Связь с другими объектами

**Пользовательские поля.** Поля создаются и настраиваются с помощью методов раздела [userfieldconfig.*](../../crm/universal/userfieldconfig/index.md). Для документов складского учета используйте `moduleId = catalog` и `entityId` в формате `CAT_STORE_DOCUMENT_<documentType>`, например `CAT_STORE_DOCUMENT_A`.

**Тип документа складского учета.** В методах раздела используется `documentType`. Допустимые значения можно получить методом [catalog.enum.getStoreDocumentTypes](../enum/catalog-enum-get-store-document-types.md).

**Документ складского учета.** Для обновления значений нужен `documentId`. Идентификатор документа можно получить методом [catalog.document.list](../document/catalog-document-list.md).

{% note tip "Пользовательская документация" %}

- [Складской учет в Битрикс24](https://helpdesk.bitrix24.ru/open/17792018)
- [Как настроить права в CRM для работы с документами складского учета](https://helpdesk.bitrix24.ru/open/15955386)
- [Как создать документ оприходования](https://helpdesk.bitrix24.ru/open/22524122)
- [Как создать документ прихода](https://helpdesk.bitrix24.ru/open/22558126)

{% endnote %}

## Порядок работы с пользовательскими полями документов

1. Создайте пользовательское поле методом [userfieldconfig.add](../../crm/universal/userfieldconfig/userfieldconfig-add.md).
2. Получите `documentType` через [catalog.enum.getStoreDocumentTypes](../enum/catalog-enum-get-store-document-types.md).
3. Получите текущие значения полей методом [catalog.userfield.document.list](./catalog-userfield-document-list.md).
4. Обновите значения методом [catalog.userfield.document.update](./catalog-userfield-document-update.md).

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [catalog.userfield.document.update](./catalog-userfield-document-update.md) | Обновляет значения пользовательских полей документа складского учета ||
|| [catalog.userfield.document.list](./catalog-userfield-document-list.md) | Возвращает список значений пользовательских полей документов складского учета ||
|#
