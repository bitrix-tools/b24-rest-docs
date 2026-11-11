# Получить события пользователя im.v2.Event.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: авторизованный пользователь

Метод `im.v2.Event.get` возвращает события мессенджера для текущего пользователя, например новые сообщения и реакции. Приложение само периодически вызывает метод и забирает накопленные события — это режим polling.

{% note info "" %}

Сначала подпишите пользователя на события методом [im.v2.Event.subscribe](./event-subscribe.md). Без подписки события не записываются, и метод вернет пустой массив `result.events`.

{% endnote %}

Записанные события хранятся 24 часа. Более старые Битрикс24 удаляет, даже если приложение их не получило.

Обработав события, передайте в `offset` значение `nextOffset`: метод удалит их из очереди и вернет следующую порцию.

Если пользователя подпишут несколько приложений, любое из них вызовом с `offset` удалит события для всех: очередь у пользователя одна. Подробнее — в обзоре [Лимиты и ограничения](./index.md#limits).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **offset**
[`integer`](../../../../data-types.md) | Передавайте `nextOffset` из предыдущего ответа. Метод вернет события с ID от `offset`, а события с меньшим ID удалит из очереди как подтвержденные. Без параметра метод ничего не подтверждает. По умолчанию `0`, отрицательное значение метод считает нулем.

Если передать значение больше `nextOffset`, метод удалит и события, которые вы еще не получили ||
|| **limit**
[`integer`](../../../../data-types.md) | Максимальное количество возвращаемых событий (1–1000). По умолчанию `100`. Значение вне диапазона метод заменяет ближайшей границей ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"offset":2000,"limit":50}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.v2.Event.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"offset":2000,"limit":50,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.v2.Event.get
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
        method: 'im.v2.Event.get',
        params: {
          offset: 2000,
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
            method: 'im.v2.Event.get',
            params: {
              offset: 2000,
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
        bitrix_response = client.im.v2.event.get(
            offset=2000,
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
                'im.v2.Event.get',
                [
                    'offset' => 2000,
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
        'im.v2.Event.get',
        {
            offset: 2000,
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
        'im.v2.Event.get',
        [
            'offset' => 2000,
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
    res, err := client.Core().Call(ctx, "im.v2.Event.get", b24.Params{
    	"offset": 2000,
    	"limit":  50,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("im.v2.Event.get: %w", err)
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
                "eventId": 2001,
                "type": "ONIMV2MESSAGEADD",
                "date": "2024-10-11T09:58:12+03:00",
                "data": {
                    "message": {
                        "id": 189,
                        "chatId": 19,
                        "authorId": 129,
                        "date": "2024-10-11T09:58:12+03:00",
                        "text": "Добрый день! Когда будет готов отчет?",
                        "isSystem": false,
                        "params": []
                    },
                    "chat": {
                        "id": 19,
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
                    "additionalMessages": []
                }
            }
        ],
        "nextOffset": 2002,
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

В примере объекты `message`, `chat` и `user` сокращены. Полный состав полей — в описании события [ONIMV2MESSAGEADD](./events.md#onimv2messageadd).

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
|| [ONIMV2MESSAGEADD](./events.md#onimv2messageadd) | Новое сообщение в чате ||
|| [ONIMV2MESSAGEUPDATE](./events.md#onimv2messageupdate) | Сообщение отредактировано ||
|| [ONIMV2MESSAGEDELETE](./events.md#onimv2messagedelete) | Сообщение удалено ||
|| [ONIMV2REACTIONCHANGE](./events.md#onimv2reactionchange) | Реакция на сообщение изменена ||
|| [ONIMV2JOINCHAT](./events.md#onimv2joinchat) | Новый участник в чате ||
|#

Подробное описание формата данных каждого события: [{#T}](./events.md).

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Invalid value {abc} to match with parameter {offset}. Should be value of type int."
}
```

{% include notitle [Обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `100` | Invalid value {abc} to match with parameter {offset}. Should be value of type int. | В `offset` или `limit` передано не число ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [События im.v2](./index.md)
- [{#T}](./event-subscribe.md)
- [{#T}](./event-unsubscribe.md)
- [{#T}](./events.md)
