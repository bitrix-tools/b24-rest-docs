# Обзор событий при работе с телефонией

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления при инициализации звонка через объект CRM или по запросу обратного звонка из CRM-виджета.

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на событие [OnExternalCallBackStart](on-external-call-back-start.md) можно через:

- [исходящий вебхук](../../../local-integrations/local-webhooks.md)

- [приложение](../../../settings/app-installation/index.md) и метод [event.bind](../../events/event-bind.md)

Подписаться на событие [OnExternalCallStart](on-external-call-start.md) можно только через [приложение](../../../settings/app-installation/index.md) и метод [event.bind](../../events/event-bind.md).

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../events/test-handler.md).

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`telephony`](../../scopes/permissions.md) 
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [OnExternalCallStart](on-external-call-start.md) | При нажатии на телефонный номер в объектах CRM, чтобы совершить исходящий звонок ||
|| [OnExternalCallBackStart](on-external-call-back-start.md) | При заполнении CRM-формы обратного звонка ||
|#