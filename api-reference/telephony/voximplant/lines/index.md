# Управление линиями: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Раздел описывает работу с исходящими линиями в телефонии:

- как получить список доступных линий
- как узнать текущую исходящую линию по умолчанию
- как установить обычную или SIP-линию для исходящих звонков

Для вызова методов нужно право `Управление номерами — изменение`.

> Быстрый переход: [все методы](#all-methods)

## Связь с другими объектами

**Исходящая линия.** В методах используется идентификатор линии `LINE_ID`. Его можно получить через [voximplant.line.get](./voximplant-line-get.md), а затем передать в [voximplant.line.outgoing.set](./voximplant-line-outgoing-set.md), чтобы изменить линию по умолчанию.

**SIP-линия.** Для установки SIP-линии по умолчанию используется `CONFIG_ID` в [voximplant.line.outgoing.sip.set](./voximplant-line-outgoing-sip-set.md). Идентификатор `CONFIG_ID` можно получить методом [voximplant.sip.get](../sip/voximplant-sip-get.md).

{% note tip "Пользовательская документация" %}

- [Как настроить права доступа в телефонии](https://helpdesk.bitrix24.ru/open/18177766/)

{% endnote %}

## Как начать работу

1. Получите список доступных исходящих линий через [voximplant.line.get](./voximplant-line-get.md)
2. Проверьте текущую исходящую линию методом [voximplant.line.outgoing.get](./voximplant-line-outgoing-get.md)
3. Установите нужную линию через [voximplant.line.outgoing.set](./voximplant-line-outgoing-set.md) или SIP-линию через [voximplant.line.outgoing.sip.set](./voximplant-line-outgoing-sip-set.md)
4. Повторно вызовите [voximplant.line.outgoing.get](./voximplant-line-outgoing-get.md), чтобы проверить фактически установленную исходящую линию

## Обзор методов {#all-methods}

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Управление номерами — изменение

#|
|| **Метод** | **Описание** ||
|| [voximplant.line.get](./voximplant-line-get.md) | Возвращает список доступных исходящих линий ||
|| [voximplant.line.outgoing.get](./voximplant-line-outgoing-get.md) | Возвращает идентификатор текущей исходящей линии по умолчанию ||
|| [voximplant.line.outgoing.set](./voximplant-line-outgoing-set.md) | Устанавливает исходящую линию по умолчанию ||
|| [voximplant.line.outgoing.sip.set](./voximplant-line-outgoing-sip-set.md) | Устанавливает исходящую SIP-линию по умолчанию ||
|#
