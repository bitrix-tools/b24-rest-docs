# Обзор событий при работе с регулярными сделками

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о создании и удалении [шаблона регулярной сделки](../index.md), об изменении его настроек повторения и о создании новой сделки по шаблону.

Изменение полей сделки-шаблона, например названия или суммы, отслеживает событие [onCrmDealUpdate](../../events/on-crm-deal-update.md).

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события регулярных сделок можно через:

- [исходящий вебхук](../../../../../local-integrations/local-webhooks.md)
- [приложение](../../../../../settings/app-installation/index.md) и метод [event.bind](../../../../events/event-bind.md)

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../../../events/test-handler.md).

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Все события передают в объекте `data.FIELDS` только идентификаторы.

#|
|| **Параметр** | **Что обозначает** | **В каких событиях** ||
|| `ID` | Идентификатор настроек повторения | Во всех четырех событиях ||
|| `RECURRING_DEAL_ID` | Идентификатор сделки-шаблона. Совпадает с полем `DEAL_ID` в ответе метода [crm.deal.recurring.get](../crm-deal-recurring-get.md) | `onCrmDealRecurringAdd`, `onCrmDealRecurringUpdate`, `onCrmDealRecurringExpose` ||
|| `DEAL_ID` | Идентификатор сделки, созданной по шаблону | `onCrmDealRecurringExpose` ||
|#

Полный пример запроса приведен на странице каждого события, например [onCrmDealRecurringExpose](./on-crm-deal-recurring-expose.md).

Настройки повторения возвращает метод [crm.deal.recurring.get](../crm-deal-recurring-get.md), поля сделки-шаблона и созданной сделки — метод [crm.deal.get](../../crm-deal-get.md).

После события `onCrmDealRecurringDelete` настроек уже нет: метод `crm.deal.recurring.get` вернет ошибку `Recurring deal is not found`.

## Порядок событий {#order}

Действия с шаблоном вызывают события в таком порядке:

- создание шаблона: [onCrmDealAdd](../../events/on-crm-deal-add.md) с `ID` сделки-шаблона, затем `onCrmDealRecurringAdd`
- создание сделки по шаблону: [onCrmDealAdd](../../events/on-crm-deal-add.md) с `ID` новой сделки, `onCrmDealRecurringExpose`, затем `onCrmDealRecurringUpdate`
- сделку по расписанию не удалось создать: `onCrmDealRecurringUpdate` без `onCrmDealRecurringExpose`
- удаление сделки-шаблона: `onCrmDealRecurringDelete`, затем [onCrmDealDelete](../../events/on-crm-deal-delete.md)

Чтобы не обработать новую сделку дважды, сверяйте `DEAL_ID` из `onCrmDealRecurringExpose` с `ID` из `onCrmDealAdd`.

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [onCrmDealRecurringAdd](./on-crm-deal-recurring-add.md) | При создании шаблона регулярной сделки вручную или методом [crm.deal.recurring.add](../crm-deal-recurring-add.md) ||
|| [onCrmDealRecurringUpdate](./on-crm-deal-recurring-update.md) | При изменении настроек повторения вручную или методом [crm.deal.recurring.update](../crm-deal-recurring-update.md), после создания сделки по шаблону и когда сделку по расписанию не удалось создать. Порядок вызова описан в блоке [Порядок событий](#order) ||
|| [onCrmDealRecurringDelete](./on-crm-deal-recurring-delete.md) | При удалении сделки-шаблона вручную, методом [crm.deal.delete](../../crm-deal-delete.md) или [crm.item.delete](../../../universal/crm-item-delete.md). Метод [crm.deal.recurring.delete](../crm-deal-recurring-delete.md) удаляет настройки и вызывает событие, только если сделки-шаблона уже нет ||
|| [onCrmDealRecurringExpose](./on-crm-deal-recurring-expose.md) | При создании сделки по шаблону — по расписанию или методом [crm.deal.recurring.expose](../crm-deal-recurring-expose.md) ||
|#
