# Пользовательские поля документов складского учета: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Методы `catalog.userfield.document.*` читают и обновляют значения пользовательских полей документов складского учета. Создание и настройка самих пользовательских полей выполняются методами `userfieldconfig.*`.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как начать работу со складским учетом](https://helpdesk.bitrix24.ru/open/17792114/)

## Связь с другими объектами

**Пользовательские поля.** Поля создаются и настраиваются методами [userfieldconfig.*](../../crm/universal/userfieldconfig/index.md). Для документов складского учета используйте `moduleId = catalog` и `entityId` в формате `CAT_STORE_DOCUMENT_<documentType>`, например `CAT_STORE_DOCUMENT_A`.

**Тип документа складского учета.** В методах раздела используется `documentType`. Допустимые значения можно получить методом [catalog.enum.getStoreDocumentTypes](../enum/catalog-enum-get-store-document-types.md).

**Документ складского учета.** Для обновления значений нужен `documentId`. Идентификатор документа можно получить методом [catalog.document.list](../document/catalog-document-list.md).

{% note tip "Пользовательская документация" %}

- [Складской учет в Битрикс24](https://helpdesk.bitrix24.ru/open/17792018)
- [Как настроить права в CRM для работы с документами складского учета](https://helpdesk.bitrix24.ru/open/15955386)
- [Как создать документ оприходования](https://helpdesk.bitrix24.ru/open/22524122)
- [Как создать документ прихода](https://helpdesk.bitrix24.ru/open/22558126)

{% endnote %}

## Как начать работу

1. Создайте пользовательское поле методом [userfieldconfig.add](../../crm/universal/userfieldconfig/userfieldconfig-add.md)
2. Получите `documentType` через [catalog.enum.getStoreDocumentTypes](../enum/catalog-enum-get-store-document-types.md)
3. Получите текущие значения полей методом [catalog.userfield.document.list](./catalog-userfield-document-list.md)
4. Обновите значения методом [catalog.userfield.document.update](./catalog-userfield-document-update.md)

## Пользовательские поля в REST 3.0

В [REST 3.0](../../rest-v3.md) методы называются `catalog.document.userfield.*`, а не `catalog.userfield.document.*`: старые имена по адресу `/rest/api/` возвращают ошибку `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`. Есть методы получения значений, изменения значений и методы получения схемы полей. Методы, которые есть в обеих версиях API, помечены в таблице как `v 3.0`.

Особенности методов новой версии:

- метод [catalog.document.userfield.list](./catalog-userfield-document-list-rest-v3.md) требует в `filter` условие по `docType` с оператором `=`
- метод [catalog.document.userfield.update](./catalog-userfield-document-update-rest-v3.md) требует в `fields.docType` тип самого документа
- в ответе `list` ключи значений — `UF_*`, в `update` значение можно передать по ключу `UF_*` или `FIELD_{id}`

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [catalog.userfield.document.list](./catalog-userfield-document-list.md) | Возвращает список значений пользовательских полей документов складского учета ||
|| [catalog.document.userfield.list](./catalog-userfield-document-list-rest-v3.md) | Возвращает список значений пользовательских полей документов складского учета v 3.0 ||
|| [catalog.document.userfield.field.list](./catalog-userfield-document-field-list.md) | Возвращает список полей для пользовательских полей документов v 3.0 ||
|| [catalog.document.userfield.field.get](./catalog-userfield-document-field-get.md) | Возвращает описание поля для пользовательских полей документов ||
|| [catalog.userfield.document.update](./catalog-userfield-document-update.md) | Обновляет значения пользовательских полей документа складского учета ||
|| [catalog.document.userfield.update](./catalog-userfield-document-update-rest-v3.md) | Обновляет значения пользовательских полей документа складского учета v 3.0 ||
|#
