# Обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- Отсутствует контент
- Заменить ссылку

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Конфигурируемые дела — это тип дел, создать который можно только из приложения. Для этого типа можно настроить внешний вид карточки дела и ее функционал. Методы работы с пользовательскими типами дел в [таймлайне](../../index.md)

#|
|| **Метод** | **Описание** ||
|| [crm.activity.configurable.add](./crm-activity-configurable-add.md) | Добавляет новое конфигурируемое дело в таймлайн ||
|| [crm.activity.configurable.update](./crm-activity-configurable-update.md) | Обновляет конфигурируемое дело ||
|| [crm.activity.configurable.get](./crm-activity-configurable-get.md) | Получает информацию о деле ||
|| [crm.activity.delete](../activity-base/crm-activity-delete.md) | Удаляет конфигурируемое дело по идентификатору ||
|| [crm.activity.list](../activity-base/crm-activity-list.md) | Получает список всех конфигурируемых дел для элемента CRM с фильтром по `PROVIDER_ID` = `CONFIGURABLE_REST_APP` ||
|#

{% note warning %}

Вызов методов `crm.activity.configurable.add`, `crm.activity.configurable.update`, `crm.activity.configurable.get` возможен только в контексте [приложения](https://helpdesk.bitrix24.ru/examples/app.zip).

{% endnote %}

## Дополнительно

- [{#T}](./structure/layout.md)
- [{#T}](./badges/index.md)
