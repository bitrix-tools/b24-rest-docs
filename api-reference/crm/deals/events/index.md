# Обзор событий при работе со сделками

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о создании, изменении, удалении и перемещении сделок.

События создания, изменения и удаления передают только идентификатор сделки в поле `data.FIELDS.ID`. Событие [onCrmDealMoveToCategory](./on-crm-deal-move-to-category.md) вместе с идентификатором передает новую воронку `CATEGORY_ID` и новую стадию `STAGE_ID`. Остальные данные сделки запрашивайте в обработчике методом [crm.deal.get](../crm-deal-get.md). После удаления сделка уже недоступна, поэтому нужные данные сохраняйте заранее.

Какое событие придет при смене воронки, зависит от способа:

- перенос из карточки сделки или роботом «Сменить воронку» — только [onCrmDealMoveToCategory](./on-crm-deal-move-to-category.md), без [onCrmDealUpdate](./on-crm-deal-update.md)
- метод [crm.item.update](../../universal/crm-item-update.md) с новым `categoryId` — только [onCrmDealUpdate](./on-crm-deal-update.md)

Смена стадии внутри одной воронки приходит как [onCrmDealUpdate](./on-crm-deal-update.md).

Настройки пользовательских полей и шаблоны регулярных сделок отслеживают отдельные группы событий: [события пользовательских полей сделок](../user-defined-fields/events/index.md) и [события регулярных сделок](../recurring-deals/events/index.md).

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события [onCrmDealAdd](./on-crm-deal-add.md), [onCrmDealUpdate](./on-crm-deal-update.md) и [onCrmDealDelete](./on-crm-deal-delete.md) можно через:

- [исходящий вебхук](../../../../local-integrations/local-webhooks.md)
- [приложение](../../../../settings/app-installation/index.md) и метод [event.bind](../../../events/event-bind.md)

Подписаться на событие [onCrmDealMoveToCategory](./on-crm-deal-move-to-category.md) можно только через [приложение](../../../../settings/app-installation/index.md) и метод [event.bind](../../../events/event-bind.md).

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../../events/test-handler.md).

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь, для офлайн-событий нужны права администратора

#|
|| **Событие** | **Вызывается** ||
|| [onCrmDealAdd](./on-crm-deal-add.md) | При создании сделки вручную или методом [crm.deal.add](../crm-deal-add.md) ||
|| [onCrmDealUpdate](./on-crm-deal-update.md) | При изменении сделки вручную или методами [crm.deal.update](../crm-deal-update.md) и [crm.item.update](../../universal/crm-item-update.md) ||
|| [onCrmDealDelete](./on-crm-deal-delete.md) | При удалении сделки вручную или методом [crm.deal.delete](../crm-deal-delete.md) ||
|| [onCrmDealMoveToCategory](./on-crm-deal-move-to-category.md) | При переносе сделки в другую воронку из карточки сделки или роботом «Сменить воронку» ||
|#
