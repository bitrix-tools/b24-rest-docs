# Типы данных статистики открытых линий

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Типы данных используются в ответах методов [imopenlines.v2.*](./index.md). Все имена полей передаются в формате `camelCase`.

## Где используются типы

#|
|| **Тип** | **Где возвращается** ||
|| [`session`](#session) | Метод [imopenlines.v2.Session.list](./imopenlines-v2-session-list.md), поле `sessions[]` ||
|| [`operatorLoad`](#operator-load) | Метод [imopenlines.v2.Operator.list](./imopenlines-v2-operator-list.md), поле `operators[]` ||
|| [`sessionStat`](#session-stat) | Метод [imopenlines.v2.Session.Stat.get](./imopenlines-v2-session-stat-get.md), поле `stats[]` ||
|| [`rating`](#rating) | Метод [imopenlines.v2.Session.Rating.list](./imopenlines-v2-session-rating-list.md), поле `ratings[]` ||
|| [`transfer`](#transfer) | Метод [imopenlines.v2.Session.Transfer.list](./imopenlines-v2-session-transfer-list.md), поле `transfers[]` ||
|| [`statResult`](#stat-result) | Метод [imopenlines.v2.Stat.get](./imopenlines-v2-stat-get.md), корневой объект `result` ||
|#

## Особенности полей

#|
|| **Поля** | **Где используются** | **Когда возвращаются как `null`** ||
|| `voteHead`, `commentHead` | Объекты [`session`](#session), [`sessionStat`](#session-stat) и [`rating`](#rating). В `sessionStat` есть только поле `voteHead` | Если тариф или права пользователя не позволяют видеть оценку руководителя ||
|| `crmEntityType`, `crmEntityId` | Объект [`session`](#session) | Если у пользователя нет права чтения связанного объекта CRM ||
|#

## Объект session {#session}

#|
|| **Поле**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор сессии ||
|| **configId**
[`integer`](../../data-types.md) | Идентификатор открытой линии ||
|| **source**
[`string`](../../data-types.md) | Код канала, например `livechat` ||
|| **operatorId**
[`integer`](../../data-types.md) \| [`null`](../../data-types.md) | Идентификатор оператора ||
|| **userId**
[`integer`](../../data-types.md) | Внутренний идентификатор клиента ||
|| **userCode**
[`string`](../../data-types.md) | Внешний идентификатор клиента в канале ||
|| **chatId**
[`integer`](../../data-types.md) | Идентификатор чата ||
|| **dateCreate**
[`string`](../../data-types.md) | Дата создания сессии в формате ISO 8601 ||
|| **dateClose**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Дата закрытия сессии ||
|| **dateFirstAnswer**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Дата первого ответа оператора ||
|| **dateOperatorAnswer**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Дата первого ответа живого оператора ||
|| **status**
[`string`](../../data-types.md) | Статус сессии [sessionStatus](#session-status) ||
|| **closeReason**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Причина закрытия [closeReason](#close-reason) ||
|| **vote**
[`string`](../../data-types.md) | Клиентская оценка [vote](#vote) ||
|| **voteHead**
[`integer`](../../data-types.md) \| [`null`](../../data-types.md) | Оценка руководителя от `1` до `5` ||
|| **commentHead**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Комментарий руководителя к оценке ||
|| **crmEntityType**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Тип связанного объекта CRM.

Возможные значения:

- `lead` — лид
- `deal` — сделка
- `contact` — контакт
- `company` — компания ||
|| **crmEntityId**
[`integer`](../../data-types.md) \| [`null`](../../data-types.md) | Идентификатор связанного объекта CRM ||
|| **queueTransfers**
[`integer`](../../data-types.md) | Количество переводов сессии ||
|| **waitAnswer**
[`integer`](../../data-types.md) \| [`null`](../../data-types.md) | Время до первого ответа, секунды ||
|| **waitClose**
[`integer`](../../data-types.md) \| [`null`](../../data-types.md) | Время до закрытия, секунды ||
|| **kpiFirstAnswer**
[`boolean`](../../data-types.md) \| [`null`](../../data-types.md) | Уложился ли оператор в KPI первого ответа ||
|| **messageCount**
[`integer`](../../data-types.md) | Количество сообщений в диалоге ||
|#

## Объект operatorLoad {#operator-load}

#|
|| **Поле**
`тип` | **Описание** ||
|| **userId**
[`integer`](../../data-types.md) | Идентификатор оператора ||
|| **configId**
[`integer`](../../data-types.md) | Идентификатор открытой линии ||
|| **status**
[`string`](../../data-types.md) | Статус оператора [operatorStatus](#operator-status) ||
|| **activeSessions**
[`integer`](../../data-types.md) | Количество активных сессий оператора ||
|| **maxChat**
[`integer`](../../data-types.md) | Максимальное количество одновременных чатов из настроек линии ||
|| **freeSlots**
[`integer`](../../data-types.md) | Количество свободных слотов оператора ||
|| **lastActivityDate**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Дата последней активности оператора ||
|#

## Объект sessionStat {#session-stat}

#|
|| **Поле**
`тип` | **Описание** ||
|| **sessionId**
[`integer`](../../data-types.md) | Идентификатор сессии ||
|| **waitAnswer**
[`integer`](../../data-types.md) \| [`null`](../../data-types.md) | Время до первого ответа, секунды ||
|| **waitClose**
[`integer`](../../data-types.md) \| [`null`](../../data-types.md) | Время до закрытия, секунды ||
|| **messagesCount**
[`integer`](../../data-types.md) \| [`null`](../../data-types.md) | Общее количество сообщений, включая системные ||
|| **messagesOperatorCount**
[`integer`](../../data-types.md) \| [`null`](../../data-types.md) | Количество сообщений оператора без системных сообщений ||
|| **messagesClientCount**
[`integer`](../../data-types.md) \| [`null`](../../data-types.md) | Количество сообщений клиента без системных сообщений ||
|| **transfersCount**
[`integer`](../../data-types.md) \| [`null`](../../data-types.md) | Количество переводов сессии ||
|| **kpiFirstAnswer**
[`boolean`](../../data-types.md) \| [`null`](../../data-types.md) | Уложился ли оператор в KPI первого ответа ||
|| **vote**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Клиентская оценка [vote](#vote) ||
|| **voteHead**
[`integer`](../../data-types.md) \| [`null`](../../data-types.md) | Оценка руководителя от `1` до `5` ||
|#

## Объект rating {#rating}

#|
|| **Поле**
`тип` | **Описание** ||
|| **sessionId**
[`integer`](../../data-types.md) | Идентификатор сессии ||
|| **configId**
[`integer`](../../data-types.md) | Идентификатор открытой линии ||
|| **operatorId**
[`integer`](../../data-types.md) \| [`null`](../../data-types.md) | Идентификатор оператора ||
|| **source**
[`string`](../../data-types.md) | Код канала ||
|| **vote**
[`string`](../../data-types.md) | Клиентская оценка [vote](#vote) ||
|| **voteHead**
[`integer`](../../data-types.md) \| [`null`](../../data-types.md) | Оценка руководителя от `1` до `5` ||
|| **commentHead**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Комментарий руководителя к оценке ||
|| **dateVote**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Дата клиентской оценки ||
|| **dateSessionClose**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Дата закрытия сессии ||
|#

## Объект transfer {#transfer}

#|
|| **Поле**
`тип` | **Описание** ||
|| **sessionId**
[`integer`](../../data-types.md) | Идентификатор сессии ||
|| **date**
[`string`](../../data-types.md) | Дата перевода в формате ISO 8601 ||
|| **fromOperatorId**
[`integer`](../../data-types.md) \| [`null`](../../data-types.md) | Идентификатор оператора, от которого перевели сессию ||
|| **toOperatorId**
[`integer`](../../data-types.md) \| [`null`](../../data-types.md) | Идентификатор оператора, которому перевели сессию ||
|| **fromConfigId**
[`integer`](../../data-types.md) | Идентификатор линии-источника ||
|| **toConfigId**
[`integer`](../../data-types.md) \| [`null`](../../data-types.md) | Идентификатор линии назначения ||
|| **reason**
[`string`](../../data-types.md) | Причина перевода [transferReason](#transfer-reason) ||
|| **mode**
[`string`](../../data-types.md) | Режим перевода.

Возможные значения:

- `MANUAL` — ручной перевод
- `AUTO` — автоматический перевод
- `BOT` — перевод ботом ||
|| **type**
[`string`](../../data-types.md) | Тип назначения перевода.

Возможные значения:

- `USER` — перевод оператору
- `QUEUE` — перевод в очередь ||
|| **initiatorId**
[`integer`](../../data-types.md) \| [`null`](../../data-types.md) | Идентификатор инициатора перевода ||
|#

## Объект statResult {#stat-result}

#|
|| **Поле**
`тип` | **Описание** ||
|| **totalSessions**
[`integer`](../../data-types.md) | Общее количество сессий ||
|| **closedSessions**
[`integer`](../../data-types.md) | Количество закрытых сессий ||
|| **spamSessions**
[`integer`](../../data-types.md) | Количество спам-сессий ||
|| **avgWaitAnswer**
[`number`](../../data-types.md) | Среднее время до первого ответа, секунды ||
|| **avgSessionDuration**
[`number`](../../data-types.md) | Средняя длительность сессии, секунды ||
|| **likeCount**
[`integer`](../../data-types.md) | Количество лайков ||
|| **dislikeCount**
[`integer`](../../data-types.md) | Количество дизлайков ||
|| **votedSessions**
[`integer`](../../data-types.md) | Количество сессий с клиентской оценкой ||
|| **positiveRate**
[`number`](../../data-types.md) | Доля положительных оценок от `0` до `1` ||
|| **kpiFirstAnswerOk**
[`integer`](../../data-types.md) | Количество сессий с выполненным KPI первого ответа ||
|| **kpiFirstAnswerFail**
[`integer`](../../data-types.md) | Количество сессий с невыполненным KPI первого ответа ||
|| **sessionsBySource**
[`sourceCount[]`](#source-count) | Количество сессий по каналам ||
|| **sessionsByHour**
[`integer[]`](../../data-types.md) | Количество сессий по часам суток, 24 элемента ||
|| **sessionsByOperator**
[`operatorCount[]`](#operator-count) | Статистика по операторам ||
|#

## Объект sourceCount {#source-count}

#|
|| **Поле**
`тип` | **Описание** ||
|| **source**
[`string`](../../data-types.md) | Код канала, например `livechat` ||
|| **count**
[`integer`](../../data-types.md) | Количество сессий из канала ||
|#

## Объект operatorCount {#operator-count}

#|
|| **Поле**
`тип` | **Описание** ||
|| **operatorId**
[`integer`](../../data-types.md) | Идентификатор оператора ||
|| **count**
[`integer`](../../data-types.md) | Количество сессий оператора ||
|| **avgWaitAnswer**
[`number`](../../data-types.md) | Среднее время до первого ответа оператора, секунды ||
|| **positiveRate**
[`number`](../../data-types.md) | Доля положительных клиентских оценок оператора от `0` до `1` ||
|#

## Значения sessionStatus {#session-status}

#|
|| **Значение** | **Описание** ||
|| `new` | Сессия в очереди или пропущена ||
|| `answered` | Оператор ведет диалог ||
|| `closed` | Сессия закрыта ||
|| `spam` | Сессия помечена как спам ||
|| `paused` | Сессия на паузе ||
|#

## Значения operatorStatus {#operator-status}

#|
|| **Значение** | **Описание** ||
|| `online` | Оператор онлайн и не на паузе ||
|| `offline` | Оператор не в сети ||
|| `pause` | Оператор поставил себя на паузу ||
|#

## Значения closeReason {#close-reason}

#|
|| **Значение** | **Описание** ||
|| `operator` | Сессию закрыл оператор ||
|| `auto` | Сессия закрыта автоматически по таймауту ||
|| `spam` | Сессия закрыта как спам ||
|| `client` | Сессия закрыта по неактивности клиента ||
|| `replyLimit` | Сессия закрыта после истечения окна ответа канала ||
|#

## Значения vote {#vote}

#|
|| **Значение** | **Описание** ||
|| `like` | Клиент поставил лайк ||
|| `dislike` | Клиент поставил дизлайк ||
|| `none` | Оценки нет ||
|#

## Значения transferReason {#transfer-reason}

#|
|| **Значение** | **Описание** ||
|| `manual` | Ручной перевод оператором ||
|| `queue` | Автоматический возврат в очередь той же линии ||
|| `auto` | Автоматическое распределение ||
|| `line` | Перевод в другую открытую линию ||
|#

## Продолжите изучение

- [Статистика открытых линий: обзор методов](./index.md)
- [Получить агрегированную статистику](./imopenlines-v2-stat-get.md)
- [Получить список сессий](./imopenlines-v2-session-list.md)
