# Обзор событий при работе со сделками

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о создании, изменении, удалении и перемещении сделок.

Обработчик получает только идентификатор сделки в поле `data.FIELDS.ID`. Значения полей события не передают, поэтому в обработчике запрашивайте сделку методом [crm.deal.get](../crm-deal-get.md). Исключение — событие [onCrmDealMoveToCategory](./on-crm-deal-move-to-category.md): вместе с идентификатором оно передает новую воронку `CATEGORY_ID` и новую стадию `STAGE_ID`.

Перемещение сделки в другую воронку не вызывает событие [onCrmDealUpdate](./on-crm-deal-update.md) — оно отслеживается только событием [onCrmDealMoveToCategory](./on-crm-deal-move-to-category.md). Смена стадии внутри одной воронки, наоборот, приходит как обычное изменение сделки.

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
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [onCrmDealAdd](./on-crm-deal-add.md) | При создании сделки вручную или методом [crm.deal.add](../crm-deal-add.md) ||
|| [onCrmDealUpdate](./on-crm-deal-update.md) | При изменении сделки вручную или методом [crm.deal.update](../crm-deal-update.md) ||
|| [onCrmDealDelete](./on-crm-deal-delete.md) | При удалении сделки вручную или методом [crm.deal.delete](../crm-deal-delete.md) ||
|| [onCrmDealMoveToCategory](./on-crm-deal-move-to-category.md) | При изменении воронки сделки вручную или методом [crm.item.update](../../universal/crm-item-update.md) ||
|#
