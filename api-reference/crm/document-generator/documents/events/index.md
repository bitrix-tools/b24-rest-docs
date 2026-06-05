# Обзор событий при работе с документами

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о создании, обновлении или удалении документов.

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../../events/index.md).

> Быстрый переход: [все события](#all-events) 

## Как получать события

Подписаться на события документов можно через:

- [исходящий вебхук](../../../../../local-integrations/local-webhooks.md)
- [приложение](../../../../../settings/app-installation/index.md) и метод [event.bind](../../../../events/event-bind.md)

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../../../events/test-handler.md).

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`documentgenerator, crm`](../../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [onCrmDocumentGeneratorDocumentAdd](./on-crm-document-generator-document-add.md) | При генерации документа вручную или методом [crm.documentgenerator.document.add](../crm-document-generator-document-add.md) ||
|| [onCrmDocumentGeneratorDocumentUpdate](./on-crm-document-generator-document-update.md) | При изменении документа или методом [crm.documentgenerator.document.update](../crm-document-generator-document-update.md) ||
|| [onCrmDocumentGeneratorDocumentDelete](./on-crm-document-generator-document-delete.md) | При удалении документа или методом [crm.documentgenerator.document.delete](../crm-document-generator-document-delete.md) ||
|#
