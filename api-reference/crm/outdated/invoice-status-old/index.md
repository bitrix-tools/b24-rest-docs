# Статусы счетов: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

{% note warning "" %}

**DEPRECATED**

Развитие методов crm.invoice.status.* остановлено.
Используйте раздел [Универсальные методы для счетов](../../universal/invoice.md).

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [crm.invoice.status.add](./crm-invoice-status-add.md) | Создает новый статус счета ||
|| [crm.invoice.status.delete](./crm-invoice-status-delete.md) | Удаляет статус счета ||
|| [crm.invoice.status.get](./crm-invoice-status-get.md) | Получает статус счета по идентификатору ||
|| [crm.invoice.status.fields](./crm-invoice-status-fields.md) | Получает поля статуса счета ||
|| [crm.invoice.status.list](./crm-invoice-status-list.md) | Получает список статусов счета ||
|| [crm.invoice.status.update](./crm-invoice-status-update.md) | Изменяет статус счета ||
|#

