# Обзор событий при работе со звонками

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления при инициализации звонка, о начале или завершении разговора.

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события звонков можно через:

- [исходящий вебхук](../../../../local-integrations/local-webhooks.md)

- [приложение](../../../../settings/app-installation/index.md) и метод [event.bind](../../../events/event-bind.md)

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../../events/test-handler.md).

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`telephony`](../../../scopes/permissions.md) 
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [OnVoximplantCallInit](on-voximplant-call-init.md) | При инициализации звонка вручную или методами [voximplant.callback.start](../voximplant-callback-start.md), [voximplant.infocall.startwithsound](../voximplant-infocall-start-with-sound.md), [voximplant.infocall.startwithtext](../voximplant-infocall-start-with-text.md), [telephony.externalCall.register](../../telephony-external-call-register.md) ||
|| [OnVoximplantCallStart](on-voximplant-call-start.md) | При начале разговора: ответе оператора при входящем и ответе абонента при исходящем звонке ||
|| [OnVoximplantCallEnd](on-voximplant-call-end.md) | При окончании разговора и записи в историю или методом [telephony.externalCall.finish](../../telephony-external-call-finish.md) ||
|#
