# Обзор событий при работе с типами цен

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о создании, изменении или удалении типа цены. Методы для работы с типами цен описаны в статье [{#T}](../index.md).

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события типа цены можно через [приложение](../../../../settings/app-installation/index.md) и метод [event.bind](../../../events/event-bind.md).

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../../events/test-handler.md).

В приложение события начинают приходить только после завершения установки. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

## Что приходит в обработчик

Все три события передают в объекте `data.FIELDS` только идентификатор типа цены:

```json
{
    "event": "CATALOG.PRICE.TYPE.ON.UPDATE",
    "event_handler_id": 1,
    "data": {
        "FIELDS": {
            "ID": 1
        }
    },
    "ts": 1714649632
}
```

При добавлении типа цены приходят два события: сначала `CATALOG.PRICE.TYPE.ON.ADD`, затем `CATALOG.PRICE.TYPE.ON.UPDATE` с тем же `ID`. События срабатывают при вызове методов обеих версий API: `catalog.priceType.*` и `catalog.pricetype.*` из [REST 3.0](../../../rest-v3.md).

Значений полей и списка изменений в событии нет. Чтобы узнать, что изменилось, запросите тип цены методом [catalog.priceType.get](../catalog-price-type-get.md) и сравните данные со своей копией. После события `CATALOG.PRICE.TYPE.ON.DELETE` этот метод вернет ошибку `201000000000`: типа цены уже нет.

Кроме того, в запросе приходит ключ `auth`. Он содержит параметры авторизации и данные портала, его структура описана на странице события, например [CATALOG.PRICE.TYPE.ON.ADD](./catalog-price-type-on-add.md#auth).

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [CATALOG.PRICE.TYPE.ON.ADD](./catalog-price-type-on-add.md) | При добавлении типа цены вручную или методами [catalog.priceType.add](../catalog-price-type-add.md), [catalog.pricetype.add](../catalog-price-type-add-rest-v3.md) ||
|| [CATALOG.PRICE.TYPE.ON.UPDATE](./catalog-price-type-on-update.md) | При изменении типа цены вручную или методами [catalog.priceType.update](../catalog-price-type-update.md), [catalog.pricetype.update](../catalog-price-type-update-rest-v3.md), а также при добавлении типа цены ||
|| [CATALOG.PRICE.TYPE.ON.DELETE](./catalog-price-type-on-delete.md) | При удалении типа цены вручную или методами [catalog.priceType.delete](../catalog-price-type-delete.md), [catalog.pricetype.delete](../catalog-price-type-delete-rest-v3.md) ||
|#
