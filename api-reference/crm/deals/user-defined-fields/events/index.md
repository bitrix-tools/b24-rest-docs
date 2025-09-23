# Обзор событий при работе с пользовательскими полями сделок

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о создании, обновлении или удалении пользовательских полей сделок.

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события пользовательских полей сделок можно через:

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
|| [onCrmDealUserFieldAdd](./on-crm-deal-user-field-add.md) | При добавлении пользовательского поля вручную или методом [crm.deal.userfield.add](../crm-deal-userfield-add.md) ||
|| [onCrmDealUserFieldUpdate](./on-crm-deal-user-field-update.md) | При изменении пользовательского поля вручную или методом [crm.deal.userfield.update](../crm-deal-userfield-update.md) ||
|| [onCrmDealUserFieldDelete](./on-crm-deal-user-field-delete.md) | При удалении пользовательского поля вручную или методом [crm.deal.userfield.delete](../crm-deal-userfield-delete.md) ||
|| [onCrmDealUserFieldSetEnumValues](./on-crm-deal-user-field-set-enum-values.md) | При изменении набора значений для пользовательского поля списочного типа вручную или методом [crm.deal.userfield.update](../crm-deal-userfield-update.md) ||
|#