# События

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [onCrmProductAdd](./on-crm-product-add.md) | при создании товара ||
|| [onCrmProductUpdate](./on-crm-product-update.md) | при обновлении товара ||
|| [onCrmProductDelete](./on-crm-product-delete.md) | при удалении товара ||
|| [onCrmProductPropertyAdd](./on-crm-product-property-add.md) | при создании свойства товара ||
|| [onCrmProductPropertyUpdate](./on-crm-product-property-update.md) | при обновлении свойства товара ||
|| [onCrmProductPropertyDelete](./on-crm-product-property-delete.md) | при удалении свойства товара ||
|#