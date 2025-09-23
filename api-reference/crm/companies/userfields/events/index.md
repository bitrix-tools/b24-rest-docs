# Обзор событий при работе с пользовательскими полями компании

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о создании, обновлении или удалении пользоватедьльских полей компании.

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../../events/index.md).

> Быстрый переход: [все события](#all-events) 

## Как получать события

Подписаться на события пользовательских полей компании можно через:

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
|| [onCrmCompanyUserFieldAdd](./on-crm-company-user-field-add.md) | При добавлении пользовательского поля вручную или методом [crm.company.userfield.add](../crm-company-userfield-add.md) ||
|| [onCrmCompanyUserFieldUpdate](./on-crm-company-user-field-update.md) | При изменении пользовательского поля вручную или методом [crm.company.userfield.update](../crm-company-userfield-update.md) ||
|| [onCrmCompanyUserFieldDelete](./on-crm-company-user-field-delete.md) | При удалении пользовательского поля вручную или методом [crm.company.userfield.delete](../crm-company-userfield-delete.md) ||
|| [onCrmCompanyUserFieldSetEnumValues](./on-crm-company-user-field-set-enum-values.md) | При изменении набора значений для пользовательского поля списочного типа вручную или методом [crm.company.userfield.updates](../crm-company-userfield-update.md) ||
|#