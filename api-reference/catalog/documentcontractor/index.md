# CRM-поставщики: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

{% note info "" %}

CRM-поставщики доступны с версии модуля Торговый каталог 23.0.0 и REST API 23.100.0.

{% endnote %}

Поставщики — это физические и юридические лица, которые поставляют товары. В CRM их добавляют как контакты и компании, но они не участвуют в сделках, лидах и предложениях. Данные CRM-поставщиков указывают только в документах прихода. К одному документу можно прикрепить несколько контактов и одну компанию.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Поставщики в Складском учете](https://helpdesk.bitrix24.ru/open/16734758)

## Как начать работу

1. Создайте или найдите документ прихода методами [catalog.document.*](../document/index.md)
2. Получите `ID` контакта или компании в CRM
3. Добавьте привязку поставщика методом [catalog.documentcontractor.add](./catalog-documentcontractor-add.md)
4. Проверьте привязки методом [catalog.documentcontractor.list](./catalog-documentcontractor-list.md)

## Связь с другими объектами

**Складской учет.** Поставщиков указывают в документах прихода. Для работы с документами используйте методы [catalog.document.\*](../document/index.md).

**CRM.** Поставщики — это объекты CRM. Для работы с ними используйте универсальные методы [crm.item.\*](../../crm/universal/index.md).

## Поставщики документа в REST 3.0

В [REST 3.0](../../rest-v3.md) методы называются `catalog.document.contractor.*`, а не `catalog.documentcontractor.*`: старые имена по адресу `/rest/api/` возвращают ошибку `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`. Есть методы добавления, получения списка, удаления привязок и методы получения схемы полей. Методы, которые есть в обеих версиях API, помечены в таблице как `v 3.0`.

Особенности методов новой версии:

- поставщика можно привязать только к документу прихода `A`: несколько контактов и одну компанию
- методы работают, только если поставщиков ведет CRM

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [catalog.documentcontractor.add](./catalog-documentcontractor-add.md) | Добавляет привязку поставщика к документу ||
|| [catalog.document.contractor.add](./catalog-documentcontractor-add-rest-v3.md) | Добавляет привязку поставщика к документу v 3.0 ||
|| [catalog.documentcontractor.list](./catalog-documentcontractor-list.md) | Возвращает список привязок поставщиков к документам по фильтру ||
|| [catalog.document.contractor.list](./catalog-documentcontractor-list-rest-v3.md) | Возвращает список привязок поставщиков к документам по фильтру v 3.0 ||
|| [catalog.documentcontractor.delete](./catalog-documentcontractor-delete.md) | Удаляет привязку поставщика к документу по идентификатору привязки ||
|| [catalog.document.contractor.delete](./catalog-documentcontractor-delete-rest-v3.md) | Удаляет привязку поставщика к документу по идентификатору привязки v 3.0 ||
|| [catalog.documentcontractor.getFields](./catalog-documentcontractor-get-fields.md) | Возвращает описание полей привязки поставщика к документу ||
|| [catalog.document.contractor.field.list](./catalog-documentcontractor-field-list.md) | Возвращает список полей привязки поставщика к документу v 3.0 ||
|| [catalog.document.contractor.field.get](./catalog-documentcontractor-field-get.md) | Возвращает описание поля привязки поставщика к документу ||
|#
