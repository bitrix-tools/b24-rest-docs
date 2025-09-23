# Обзор событий при работе с валютами

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о создании, обновлении или удалении валют в CRM.

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события валют можно через:

- [исходящий вебхук](../../../../local-integrations/local-webhooks.md)

- [приложение](../../../../settings/app-installation/index.md) и метод [event.bind](../../../events/event-bind.md)

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../../events/test-handler.md).

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [onCrmCurrencyAdd](./on-crm-currency-add.md) | При добавлении валюты вручную или методом [crm.currency.add](../crm-currency-add.md) ||
|| [onCrmCurrencyUpdate](./on-crm-currency-update.md) | При изменении валюты вручную или методом [crm.currency.update](../crm-currency-update.md) ||
|| [onCrmCurrencyDelete](./on-crm-currency-delete.md) | При удалении валюты вручную или методом [crm.currency.delete](../crm-currency-delete.md) ||
|#