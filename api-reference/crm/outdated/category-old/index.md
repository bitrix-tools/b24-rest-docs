# Направления сделок

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

{% note warning "" %}

**DEPRECATED**

Развитие методов crm.deal.category.* остановлено.
Используйте раздел [Воронки (`crm.category.*`)](../../universal/category/index.md).

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [crm.deal.category.add](./crm-deal-category-add.md) | Создает новое направление сделок ||
|| [crm.deal.category.delete](./crm-deal-category-delete.md) | Удаляет направление сделок ||
|| [crm.deal.category.get](./crm-deal-category-get.md) | Получает направление сделок по идентификатору ||
|| [crm.deal.category.fields](./crm-deal-category-fields.md) | Получает поля статуса счёта ||
|| [crm.deal.category.list](./crm-deal-category-list.md) | Получает описание полей направления сделок ||
|| [crm.deal.category.update](./crm-deal-category-update.md) | Обновляет существующее направление сделок ||
|| [crm.deal.category.default.get](./crm-deal-category-default-get.md) | Получает настройки общего направления сделок ||
|| [crm.deal.category.default.set](./crm-deal-category-default-set.md) | Устанавливает настройки общего направления сделок ||
|| [crm.deal.category.status](./crm-deal-category-status.md) | Возвращает идентификатор справочника, где хранятся стадии сделок ||
|| [crm.deal.category.stage.list](./crm-deal-category-stage-list.md) | Возвращает список стадий сделок для направления ||
|#


