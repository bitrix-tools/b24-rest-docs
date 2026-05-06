# Операторы открытых линий: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Операторы открытых линий работают с диалогами: принимают их в обработку, передают, завершают или помечают как спам.

> Быстрый переход: [все методы](#all-methods)

## Связь операторов с другими объектами

**Чаты.** Действия оператора применяются к чату по идентификатору `CHAT_ID`. Идентификатор можно получить методами [imopenlines.session.open](../sessions/imopenlines-session-open.md) и [imopenlines.dialog.get](../sessions/imopenlines-dialog-get.md).

**Пользователь.** Оператор переключает диалог на сотрудника с идентификатором `USER_ID`. Идентификатор пользователя можно получить методами [user.get](../../../user/user-get.md) и [user.search](../../../user/user-search.md).

**Открытые линии.** Оператор передает диалог в очередь другой открытой линии по идентификатору `QUEUE_ID` или строке вида `queue<QUEUE_ID>`. Идентификатор очереди можно получить методом [imopenlines.config.list.get](../imopenlines-config-list-get.md).

{% note tip "Пользовательская документация" %}

- [Как настроить очередь сотрудников в открытых линиях](https://helpdesk.bitrix24.ru/open/26228062/)
- [Для чего нужна проверка доступности оператора в открытой линии](https://helpdesk.bitrix24.ru/open/25115040/)
- [Лимит на незакрытые диалоги у операторов открытых линий](https://helpdesk.bitrix24.ru/open/26928654/)

{% endnote %}

## Как использовать методы

Выбирайте метод по рабочему сценарию:
- начать обработку нового обращения — [imopenlines.operator.answer](./imopenlines-operator-answer.md)
- завершить свой диалог — [imopenlines.operator.finish](./imopenlines-operator-finish.md)
- завершить диалог другого оператора — [imopenlines.operator.another.finish](./imopenlines-operator-another-finish.md)
- передать диалог конкретному сотруднику или в другую очередь — [imopenlines.operator.transfer](./imopenlines-operator-transfer.md)
- передать диалог следующему оператору в очереди — [imopenlines.operator.skip](./imopenlines-operator-skip.md)
- закрыть некорректное обращение — [imopenlines.operator.spam](./imopenlines-operator-spam.md)

### Правила вызова imopenlines.operator.transfer

- Передавайте только один параметр: `TRANSFER_ID`, `USER_ID` или `QUEUE_ID`. Передавать `TRANSFER_ID` с `USER_ID` или `QUEUE_ID` одновременно не нужно.
- В качестве `TRANSFER_ID` используйте `USER_ID` сотрудника или строку вида `queue<QUEUE_ID>`.

## Формат ответа методов

Все методы раздела возвращают одинаковый формат ответа:

- `result` — статус выполнения операции,
- `time` — информация о времени выполнения.

```json
{
    "result": true,
    "time": {
        "start": 1773663032,
        "finish": 1773663032.493037,
        "duration": 0.49303698539733887,
        "processing": 0,
        "date_start": "2026-03-16T15:10:32+03:00",
        "date_finish": "2026-03-16T15:10:32+03:00",
        "operating_reset_at": 1773663632,
        "operating": 0
    }
}
```

## Обзор методов {#all-methods}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правами на диалог

#|
|| **Метод** | **Описание** ||
|| [imopenlines.operator.answer](./imopenlines-operator-answer.md) | Передает диалог текущему оператору ||
|| [imopenlines.operator.finish](./imopenlines-operator-finish.md) | Завершает диалог от имени текущего оператора ||
|| [imopenlines.operator.another.finish](./imopenlines-operator-another-finish.md) | Завершает диалог другого оператора ||
|| [imopenlines.operator.skip](./imopenlines-operator-skip.md) | Передает диалог следующему оператору в очереди ||
|| [imopenlines.operator.spam](./imopenlines-operator-spam.md) | Отмечает диалог как спам ||
|| [imopenlines.operator.transfer](./imopenlines-operator-transfer.md) | Передает диалог другому оператору или в другую линию ||
|#
