# Получить сообщение imbot.v2.Chat.Message.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец зарегистрированного бота

Метод `imbot.v2.Chat.Message.get` возвращает сообщение по его ID.

Например, бот получил событие с ответом на сообщение и хочет прочитать исходное. ID исходного сообщения приходит в `message.params.REPLY_ID` — передайте его в `messageId`.

{% note warning "" %}

Метод доступен только для ботов типа `supervisor` и `personal`. Подробнее — [Типы ботов](../../index.md#bot-types).

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **botId***
[`integer`](../../../../data-types.md) | ID бота, целое число больше 0 ||
|| **botToken**
[`string`](../../../../data-types.md) | Уникальный токен авторизации бота. Обязателен при авторизации через вебхук, не нужен для OAuth.

Передавайте актуальный токен: указанный при регистрации бота или новый, если токен сменили методом [imbot.v2.Bot.update](../bots/bot-update.md). Со старым токеном метод вернет ошибку `BOT_OWNERSHIP_ERROR` ||
|| **messageId***
[`integer`](../../../../data-types.md) | ID сообщения. Можно взять из `message.id` события [ONIMBOTV2MESSAGEADD](../events/events.md#onimbotv2messageadd) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"my_bot_token","messageId":789}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Chat.Message.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"messageId":789,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Chat.Message.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type MessageGetResult = {
      message: {
        id: number
        chatId: number
        authorId: number
        text: string
      }
      user: {
        id: number | null
        name: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<MessageGetResult>({
        method: 'imbot.v2.Chat.Message.get',
        params: {
          botId: 456,
          botToken: 'my_bot_token',
          messageId: 789,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Message:', result.message.id, '| Text:', result.message.text)
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
      async function getMessage() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'imbot.v2.Chat.Message.get',
            params: {
              botId: 456,
              botToken: 'my_bot_token',
              messageId: 789,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Message:', result.message.id, '| Text:', result.message.text)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getMessage)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.imbot.v2.chat.message.get(
            bot_id=456,
            bot_token="my_bot_token",
            message_id=789,
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
                'imbot.v2.Chat.Message.get',
                [
                    'botId' => 456,
                    'botToken' => 'my_bot_token',
                    'messageId' => 789,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'result: '. print_r($result, true);
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error: '. $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.v2.Chat.Message.get',
        {
            botId: 456,
            botToken: 'my_bot_token',
            messageId: 789,
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
        'imbot.v2.Chat.Message.get',
        [
            'botId' => 456,
            'botToken' => 'my_bot_token',
            'messageId' => 789,
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: '. $result['error_description'];
    } else {
        echo 'Message: '. $result['result']['message']['text'];
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "imbot.v2.Chat.Message.get", b24.Params{
    	"botId":     456,
    	"botToken":  "my_bot_token",
    	"messageId": 789,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("imbot.v2.Chat.Message.get: %w", err)
    }

    keys, ok := b24.Keys(res.Result)
    if !ok {
    	return fmt.Errorf("ожидался объект в ответе")
    }
    fmt.Println("полей в ответе:", len(keys))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

В примере у сообщения и пользователя показаны не все поля. Полный состав — в описании объектов [Message](../../entities.md#message) и [User](../../entities.md#user).

```json
{
    "result": {
        "message": {
            "id": 789,
            "chatId": 5,
            "authorId": 1,
            "date": "2026-03-19T14:30:00+03:00",
            "text": "Привет! Как дела?",
            "isSystem": false,
            "uuid": null,
            "forward": null,
            "params": [],
            "viewedByOthers": true
        },
        "user": {
            "id": 1,
            "active": true,
            "name": "John Smith",
            "bot": false,
            "type": "user"
        }
    },
    "time": {
        "start": 1773919860.123,
        "finish": 1773919860.234,
        "duration": 0.111,
        "processing": 0.045,
        "date_start": "2026-03-19T14:31:00+03:00",
        "date_finish": "2026-03-19T14:31:00+03:00"
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`object`](../../../../data-types.md) | Результат запроса ||
|| **result.message**
[`Message`](../../entities.md#message) | Объект сообщения [(подробное описание)](#message-object) ||
|| **result.user**
[`User`](../../entities.md#user) | Автор сообщения [(подробное описание)](#user-object) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Поля объекта Message {#message-object}

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../../../data-types.md) | Идентификатор сообщения ||
|| **chatId**
[`integer`](../../../../data-types.md) | Идентификатор чата ||
|| **authorId**
[`integer`](../../../../data-types.md) | Идентификатор автора сообщения. `0` у системных сообщений ||
|| **date**
[`string`](../../../../data-types.md) | Дата отправки сообщения ||
|| **text**
[`string`](../../../../data-types.md) | Текст сообщения ||
|| **isSystem**
[`boolean`](../../../../data-types.md) | Системное сообщение ||
|| **uuid**
[```string|null```](../../../../data-types.md) | UUID сообщения, если его передали при отправке, или `null` ||
|| **forward**
[```object|null```](../../../../data-types.md) | Данные о пересылке, если сообщение переслано, или `null`. Состав полей — в описании объекта [Message](../../entities.md#message) ||
|| **params**
[```object|array```](../../../../data-types.md) | Дополнительные параметры сообщения: вложения, клавиатура, файлы и другие. Если параметров нет — пустой массив `[]`. Описание ключей — [Объект params](../../entities.md#message-params) ||
|| **viewedByOthers**
[`boolean`](../../../../data-types.md) | Сообщение просмотрено другими участниками ||
|| **chat_id**
[`integer`](../../../../data-types.md) | То же, что `chatId`. Поле старого формата ||
|| **author_id**
[`integer`](../../../../data-types.md) | То же, что `authorId`. Поле старого формата ||
|| **block**
[```object|null```](../../../../data-types.md) | Служебное поле, у обычных сообщений `null` ||
|#

### Поля объекта User {#user-object}

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[```integer|null```](../../../../data-types.md) | Идентификатор пользователя. `null` у системных сообщений ||
|| **active**
[`boolean`](../../../../data-types.md) | Пользователь активен ||
|| **name**
[`string`](../../../../data-types.md) | Имя и фамилия пользователя ||
|| **bot**
[`boolean`](../../../../data-types.md) | Признак пользователя-бота ||
|| **type**
[`string`](../../../../data-types.md) | Тип пользователя, например `user` — сотрудник, `bot` — чат-бот ||
|#

Полное описание всех полей объектов — на странице [Объекты и поля](../../entities.md)

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "BOT_TYPE_NOT_ALLOWED",
    "error_description": "Method is available only for supervisor and personal bots"
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
|| `BOT_TYPE_NOT_ALLOWED` | Method is available only for supervisor and personal bots | Метод доступен только для ботов типа `supervisor` и `personal` ||
|| `MESSAGE_NOT_FOUND` | MESSAGE_NOT_FOUND | Сообщение не найдено ||
|| `ACCESS_DENIED` | ACCESS_DENIED | Бот не состоит в закрытом чате с этим сообщением. Сообщения открытых чатов бот может читать без участия в них ||
|| `MESSAGE_ACCESS_DENIED` | MESSAGE_ACCESS_DENIED | Бот состоит в чате, но сообщение отправлено до добавления бота, а история чата для бота скрыта ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [{#T}](./chat-message-get-context.md)
- [{#T}](./chat-message-send.md)
- [{#T}](./chat-message-update.md)
- [{#T}](../../index.md#bot-types)
