# Обзор событий при работе с коннектором

События позволяют приложениям реагировать на изменения в коннекторах открытых линий: получать уведомления о новых сообщениях, их изменении, удалении, а также о завершении диалогов и отключении линий.

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события коннектора можно через [приложение](../../../../settings/app-installation/index.md) и метод [event.bind](../../../events/event-bind.md).

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../../events/test-handler.md).

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`imconnector`](../../../scopes/permissions.md), [`imopenlines`](../../../scopes/permissions.md)  
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [OnImConnectorMessageAdd](on-im-connector-message-add.md) | При получении новых сообщений вручную или методом [imconnector.send.messages](../imconnector-send-messages.md) ||
|| [OnImConnectorDialogStart](on-im-connector-dialog-start.md) | При создании диалога вручную ||
|| [OnImConnectorMessageUpdate](on-im-connector-message-update.md) | При изменении сообщения вручную или методом [imconnector.update.messages](../imconnector-update-messages.md) ||
|| [OnImConnectorMessageDelete](on-im-connector-message-delete.md) | При удалении сообщения вручную или методом [imconnector.delete.messages](../imconnector-delete-messages.md) ||
|| [OnImConnectorDialogFinish](on-im-connector-dialog-finish.md) | При закрытии диалога вручную ||
|| [OnImConnectorStatusDelete](on-im-connector-status-delete.md) | При отключении открытой линии вручную ||
|| [OnImConnectorLineDelete](on-im-connector-line-delete.md) | При удалении открытой линии вручную ||
|#