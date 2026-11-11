# Получить события бота imbot.v2.Event.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец зарегистрированного бота

Метод `imbot.v2.Event.get` возвращает события бота, например новые сообщения и вызовы команд. Он нужен ботам с `eventMode: "fetch"`, которые сами забирают события запросами.

Если у бота есть публичный URL, события можно получать в режиме `webhook` — как выбрать режим, описано в обзоре [Режимы доставки событий](./index.md#event-modes). В режиме `webhook` события бота не записываются. Метод вернет пустой массив `result.events`, а при `withUserEvents: true` — только события пользователя.

Записанные события хранятся 24 часа. Более старые Битрикс24 удаляет, даже если бот их не получил.

{% note info "" %}

События бота может получать только приложение, которое зарегистрировало бота, или вебхук с тем же `botToken`. У бота одна очередь: события, которые подтвердил один агент, другой уже не получит. Поэтому для нескольких независимых агентов регистрируйте отдельного бота на каждого.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **botId***
[`integer`](../../../../data-types.md) | ID бота ||
|| **botToken**
[`string`](../../../../data-types.md) | Уникальный токен авторизации бота — тот, что указали при регистрации, или новый после смены токена методом [imbot.v2.Bot.update](../bots/bot-update.md). Обязателен, если метод вызывают через входящий вебхук, для OAuth не нужен ||
|| **offset**
[`integer`](../../../../data-types.md) | Подтверждает и удаляет из очереди все события с ID меньше указанного значения. Передавайте `nextOffset` из предыдущего ответа. При первом вызове параметр не нужен. По умолчанию `0`.

Если передать значение больше `nextOffset`, метод удалит и события, которые вы еще не получили ||
|| **limit**
[`integer`](../../../../data-types.md) | Максимальное количество возвращаемых событий (1–1000). По умолчанию `100`. Значение вне диапазона метод заменяет ближайшей границей ||
|| **withUserEvents**
[`boolean`](../../../../data-types.md) | Включить события пользователя (`ONIMV2*`) в ответ вместе с событиями бота (`ONIMBOTV2*`). По умолчанию `false`.

Работает, если:

- у приложения есть scope [`im`](../../../../scopes/permissions.md) в дополнение к `imbot`
- пользователь, от чьего имени выполнен вызов, подписан через [im.v2.Event.subscribe](../../im.v2/events/event-subscribe.md)

Метод возвращает события только этого пользователя. Один `offset` подтверждает события бота и пользователя. Очередь событий пользователя общая с [im.v2.Event.get](../../im.v2/events/event-get.md): события, подтвержденные в этом методе, `im.v2.Event.get` уже не вернет ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"my_bot_token","offset":1000,"limit":50}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Event.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"offset":1000,"limit":50,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Event.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type EventGetResult = {
      events: Array<{
        eventId: number
        type: string
        date: string
        data: Record<string, unknown>
      }>
      nextOffset: number
      hasMore: boolean
    }

    try {
      const response = await $b24.actions.v2.call.make<EventGetResult>({
        method: 'imbot.v2.Event.get',
        params: {
          botId: 456,
          botToken: 'my_bot_token',
          offset: 1000,
          limit: 50,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Events:', result.events.length, '| nextOffset:', result.nextOffset, '| hasMore:', result.hasMore)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getEvents() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'imbot.v2.Event.get',
            params: {
              botId: 456,
              botToken: 'my_bot_token',
              offset: 1000,
              limit: 50,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Events:', result.events.length, '| nextOffset:', result.nextOffset, '| hasMore:', result.hasMore)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getEvents)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.imbot.v2.event.get(
            bot_id=456,
            bot_token="my_bot_token",
            offset=1000,
            limit=50,
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```
- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imbot.v2.Event.get',
                [
                    'botId' => 456,
                    'botToken' => 'my_bot_token',
                    'offset' => 1000,
                    'limit' => 50,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'result: ' . print_r($result, true);
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.v2.Event.get',
        {
            botId: 456,
            botToken: 'my_bot_token',
            offset: 1000,
            limit: 50,
        },
        function(result) {
            if (result.error()) {
                console.error(result.error().ex);
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'imbot.v2.Event.get',
        [
            'botId' => 456,
            'botToken' => 'my_bot_token',
            'offset' => 1000,
            'limit' => 50,
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        foreach ($result['result']['events'] as $event) {
            echo $event['type'] . ': ' . $event['eventId'] . "\n";
        }
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "imbot.v2.Event.get", b24.Params{
    	"botId":    456,
    	"botToken": "my_bot_token",
    	"offset":   1000,
    	"limit":    50,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("imbot.v2.Event.get: %w", err)
    }

    var item struct {
    	NextOffset int  `json:"nextOffset"`
    	HasMore    bool `json:"hasMore"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.NextOffset, item.HasMore)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "events": [
            {
                "eventId": 1001,
                "type": "ONIMBOTV2MESSAGEADD",
                "date": "2024-10-11T09:58:12+03:00",
                "data": {
                    "message": {
                        "id": 193,
                        "chatId": 112,
                        "authorId": 129,
                        "date": "2024-10-11T09:58:12+03:00",
                        "text": "Привет! Какой статус у заказа 1024?",
                        "isSystem": false,
                        "params": []
                    },
                    "chat": {
                        "id": 112,
                        "dialogId": "129",
                        "type": "private",
                        "name": ""
                    },
                    "user": {
                        "id": 129,
                        "name": "Мария Иванова",
                        "bot": false
                    },
                    "language": "ru",
                    "additionalMessages": [],
                    "bot": {
                        "id": 456,
                        "code": "support_bot",
                        "type": "bot",
                        "eventMode": "fetch"
                    }
                }
            }
        ],
        "nextOffset": 1002,
        "hasMore": false
    },
    "time": {
        "start": 1728630000.123,
        "finish": 1728630000.234,
        "duration": 0.111,
        "processing": 0.045,
        "date_start": "2024-10-11T10:00:00+03:00",
        "date_finish": "2024-10-11T10:00:00+03:00"
    }
}
```

В примере объекты `message`, `chat`, `user` и `bot` сокращены. Полный состав полей — в описании события [ONIMBOTV2MESSAGEADD](./events.md#onimbotv2messageadd).

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`object`](../../../../data-types.md) | Результат операции ||
|| **result.events**
[`object[]`](../../../../data-types.md) | Массив событий ||
|| **result.events[].eventId**
[`integer`](../../../../data-types.md) | ID события ||
|| **result.events[].type**
[`string`](../../../../data-types.md) | Тип события. Список типов описан [ниже](#event-types) ||
|| **result.events[].date**
[`datetime`](../../../../data-types.md) | Дата и время события ||
|| **result.events[].data**
[`object`](../../../../data-types.md) | Данные события. Состав полей зависит от `type`, ссылки на описание каждого типа — в таблице [ниже](#event-types) ||
|| **result.nextOffset**
[`integer`](../../../../data-types.md) | ID, с которого начнется следующая порция. Передайте его в `offset` следующего вызова, чтобы подтвердить полученные события. Если новых событий нет, равно переданному `offset` ||
|| **result.hasMore**
[`boolean`](../../../../data-types.md) | `true`, если метод вернул столько событий, сколько задано в `limit`: в очереди могут остаться еще. Вызовите метод снова с `offset`, равным `nextOffset` ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Типы событий {#event-types}

#|
|| **Тип** | **Описание** ||
|| [ONIMBOTV2MESSAGEADD](./events.md#onimbotv2messageadd) | Новое сообщение боту ||
|| [ONIMBOTV2MESSAGEUPDATE](./events.md#onimbotv2messageupdate) | Сообщение отредактировано ||
|| [ONIMBOTV2MESSAGEDELETE](./events.md#onimbotv2messagedelete) | Сообщение удалено ||
|| [ONIMBOTV2JOINCHAT](./events.md#onimbotv2joinchat) | Бота добавили в чат ||
|| [ONIMBOTV2DELETE](./events.md#onimbotv2delete) | Бота удалили. В режиме `fetch` событие не приходит: очередь удаляется вместе с ботом ||
|| [ONIMBOTV2CONTEXTGET](./events.md#onimbotv2contextget) | Боту пришел контекст при открытии диалога ||
|| [ONIMBOTV2COMMANDADD](./events.md#onimbotv2commandadd) | Вызвана слэш-команда ||
|| [ONIMBOTV2REACTIONCHANGE](./events.md#onimbotv2reactionchange) | Реакция изменена ||
|#

Сообщения бот получает, если они адресованы ему: в личном чате, с упоминанием `@bot` или ответом на его сообщение. Боты типа `personal` и `supervisor` получают все сообщения пользователей в групповых чатах, где состоят, кроме сообщений других ботов.

Подробное описание формата данных каждого события: [{#T}](./events.md).

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "BOT_NOT_FOUND",
    "error_description": "Bot not found"
}
```

{% include notitle [Обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `BOT_TOKEN_NOT_SPECIFIED` | Bot token not specified (botToken is required for webhook auth) | Не указан `botToken`. Обязателен при авторизации через вебхук ||
|| `BOT_ID_REQUIRED` | botId is required | Не указан `botId` или он меньше 1 ||
|| `BOT_NOT_FOUND` | Bot not found | Бот не найден ||
|| `BOT_OWNERSHIP_ERROR` | Bot was installed by another rest application | Бот зарегистрирован другим приложением или с другим `botToken` ||
|| `SCOPE_ERROR` | Scope 'im' is required to fetch user events | Передан `withUserEvents: true`, но у приложения нет scope `im` ||
|| `AUTH_ERROR` | Authorization required for user events | Не удалось определить текущего пользователя ||
|| `USER_NOT_SUBSCRIBED` | User is not subscribed. Call im.v2.Event.subscribe first | Передан `withUserEvents: true`, но пользователь не подписан на события через [im.v2.Event.subscribe](../../im.v2/events/event-subscribe.md) ||
|| `100` | Invalid value {abc} to match with parameter {offset}. Should be value of type int. | В `offset` или `limit` передано не число ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [События imbot.v2](./index.md)
- [{#T}](./events.md)
- [{#T}](../../quick-start.md)
- [{#T}](../../index.md)
- [{#T}](../bots/bot-register.md)
- [{#T}](../messages/chat-message-send.md)
- [{#T}](../../im.v2/events/event-get.md)
- [{#T}](../../im.v2/events/event-subscribe.md)
