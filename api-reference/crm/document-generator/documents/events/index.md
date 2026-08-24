# Обзор событий при работе с документами

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о создании, обновлении или удалении документов [генератора документов в CRM](../../index.md).

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../../events/index.md).

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Быстрый переход: [все события](#all-events)

## Что приходит в обработчик

Все три события передают один и тот же набор полей в `data.FIELDS`:

- `ID` — идентификатор документа, по нему можно запросить данные методом [crm.documentgenerator.document.get](../crm-document-generator-document-get.md)
- `ENTITY_TYPE_ID` — идентификатор типа CRM-объекта, к которому привязан документ, например `1` — лид
- `ENTITY_ID` — идентификатор самого CRM-объекта

Файл документа и ссылки на него в событие не передаются. Чтобы получить `pdfUrl`, `imageUrl` или публичную ссылку, вызовите [crm.documentgenerator.document.get](../crm-document-generator-document-get.md) по полученному `ID`.

## Как получать события

Подписаться на события документов можно через:

- [исходящий вебхук](../../../../../local-integrations/local-webhooks.md)
- [приложение](../../../../../settings/app-installation/index.md) и метод [event.bind](../../../../events/event-bind.md)

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../../../events/test-handler.md).

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [onCrmDocumentGeneratorDocumentAdd](./on-crm-document-generator-document-add.md) | При генерации документа вручную или методами [crm.documentgenerator.document.add](../crm-document-generator-document-add.md) и [crm.documentgenerator.document.upload](../crm-document-generator-document-upload.md) ||
|| [onCrmDocumentGeneratorDocumentUpdate](./on-crm-document-generator-document-update.md) | При изменении документа вручную или методом [crm.documentgenerator.document.update](../crm-document-generator-document-update.md) ||
|| [onCrmDocumentGeneratorDocumentDelete](./on-crm-document-generator-document-delete.md) | При удалении документа вручную или методом [crm.documentgenerator.document.delete](../crm-document-generator-document-delete.md) ||
|#
