# Обзор событий при работе с правилами округления цен

События позволяют приложениям мгновенно реагировать на изменения. Приложения получают уведомления о создании, обновлении или удалении правил округления цен.

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события правила округления можно через [приложение](./../../../../settings/app-installation/index.md) и метод [event.bind](./../../../events/event-bind.md).

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../../events/test-handler.md).

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../../_includes/events-index.md) %}

## Обзор событий

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [CATALOG.ROUNDING.ON.ADD](catalog-rounding-on-add.md) | При добавлении правила округления вручную или методом [catalog.roundingRule.add](../catalog-rounding-rule-add.md) ||
|| [CATALOG.ROUNDING.ON.UPDATE](catalog-rounding-on-update.md) | При обновлении правила округления вручную или методом [catalog.roundingRule.update](../catalog-rounding-rule-update.md) ||
|| [CATALOG.ROUNDING.ON.DELETE](catalog-rounding-on-delete.md) | При удалении правила округления вручную или методом [catalog.roundingRule.delete](../catalog-rounding-rule-delete.md) ||
|#