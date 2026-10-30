# Список ботов приложения imbot.v2.Bot.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: авторизованный пользователь

Метод `imbot.v2.Bot.list` возвращает список ботов текущего приложения в расширенном формате. При вызове через вебхук — ботов, зарегистрированных с переданным `botToken`. Он заменяет метод [imbot.bot.list](../../../outdated/bots/imbot-bot-list.md) первой версии API, соответствие параметров — в [таблице миграции](../../migration.md#metody).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **botToken**
[`string`](../../../../data-types.md) | Уникальный токен авторизации бота. Обязателен при авторизации через вебхук, не нужен для OAuth.

Передавайте тот же botToken, который был указан при регистрации чат-бота ||
|| **filter**
[`object`](../../../../data-types.md) | Фильтр результатов.

Доступные поля фильтра:
- `type` — тип бота, строка, например `bot` или `supervisor`. Описание типов — [Типы ботов](../../index.md#bot-types) ||
|| **limit**
[`integer`](../../../../data-types.md) | Количество ботов на страницу. По умолчанию `50`. Со значением `0` или меньше метод вернет всех ботов приложения ||
|| **offset**
[`integer`](../../../../data-types.md) | Смещение для пагинации. По умолчанию `0`. Чтобы получить следующую страницу, увеличьте `offset` на `limit`, пока в ответе `hasNextPage` равно `true`. Отрицательное значение вызывает ошибку ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botToken":"my_bot_token","filter":{"type":"bot"},"limit":10}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Bot.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"filter":{"type":"bot"},"limit":10,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Bot.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Minimal shape of result; the API returns the full Bot and User objects
    // Shape of the payload returned in result (match the "response handling" section of the page)
    type BotListResult = {
      bots: Array<{
        id: number
        code: string
        type: string
      }>
      users: Array<{
        id: number
        name: string
      }>
      hasNextPage: boolean
    }

    try {
      const response = await $b24.actions.v2.call.make<BotListResult>({
        method: 'imbot.v2.Bot.list',
        params: {
          botToken: 'my_bot_token',
          filter: { type: 'bot' },
          limit: 10,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Bots:', result.bots.length, '| Has next page:', result.hasNextPage)
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
      async function listBots() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'imbot.v2.Bot.list',
            params: {
              botToken: 'my_bot_token',
              filter: { type: 'bot' },
              limit: 10,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Bots:', result.bots.length, '| Has next page:', result.hasNextPage)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listBots)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.imbot.v2.bot.list(
            bot_token="my_bot_token",
            filter={
                "type": "bot",
            },
            limit=10,
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
                'imbot.v2.Bot.list',
                [
                    'botToken' => 'my_bot_token',
                    'filter' => ['type' => 'bot'],
                    'limit' => 10,
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
        'imbot.v2.Bot.list',
        {
            filter: { type: 'bot' },
            limit: 10,
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
        'imbot.v2.Bot.list',
        [
            'botToken' => 'my_bot_token',
            'filter' => ['type' => 'bot'],
            'limit' => 10,
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: '. $result['error_description'];
    } else {
        foreach ($result['result']['bots'] as $bot) {
            echo $bot['id']. ': '. $bot['code']. "\n";
        }
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "imbot.v2.Bot.list", b24.Params{
    	"botToken": "my_bot_token",
    	"filter": b24.Params{
    		"type": "bot",
    	},
    	"limit": 10,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("imbot.v2.Bot.list: %w", err)
    }

    var item struct {
    	HasNextPage bool `json:"hasNextPage"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.HasNextPage)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "bots": [
            {
                "id": 456,
                "code": "support_bot",
                "type": "bot",
                "isHidden": false,
                "isSupportOpenline": false,
                "isReactionsEnabled": true,
                "backgroundId": null,
                "language": "ru",
                "moduleId": "rest",
                "eventMode": "fetch",
                "countMessage": 150,
                "countCommand": 3,
                "countChat": 12,
                "countUser": 45
            }
        ],
        "users": [
            {
                "id": 456,
                "active": true,
                "name": "Support Bot",
                "bot": true,
                "type": "bot"
            }
        ],
        "hasNextPage": false
    },
    "time": {
        "start": 1728626400.123,
        "finish": 1728626400.234,
        "duration": 0.111,
        "processing": 0.045,
        "date_start": "2024-10-11T09:00:00+03:00",
        "date_finish": "2024-10-11T09:00:00+03:00"
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`object`](../../../../data-types.md) | Результат запроса ||
|| **result.bots**
[`Bot[]`](../../entities.md#bot) | Массив ботов в расширенном формате [(подробное описание)](#bot-object) ||
|| **result.users**
[`User[]`](../../entities.md#user) | Массив связанных пользователей [(подробное описание)](#user-object) ||
|| **result.hasNextPage**
[`boolean`](../../../../data-types.md) | Есть ли следующая страница ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Поля объекта Bot {#bot-object}

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../../../data-types.md) | Идентификатор бота ||
|| **code**
[`string`](../../../../data-types.md) | Символьный код бота ||
|| **type**
[`string`](../../../../data-types.md) | Тип бота ||
|| **isHidden**
[`boolean`](../../../../data-types.md) | Бот скрыт от списка контактов ||
|| **isSupportOpenline**
[`boolean`](../../../../data-types.md) | Бот поддерживает открытые линии ||
|| **isReactionsEnabled**
[`boolean`](../../../../data-types.md) | Для сообщений бота включены реакции ||
|| **backgroundId**
[```string|null```](../../../../data-types.md) | ID фона чата или `null` ||
|| **language**
[`string`](../../../../data-types.md) | Язык бота ||
|| **moduleId**
[`string`](../../../../data-types.md) | Идентификатор модуля ||
|| **eventMode**
[`string`](../../../../data-types.md) | Режим доставки событий: `webhook` или `fetch` ||
|| **countMessage**
[`integer`](../../../../data-types.md) | Количество сообщений, отправленных ботом ||
|| **countCommand**
[`integer`](../../../../data-types.md) | Количество зарегистрированных команд ||
|| **countChat**
[`integer`](../../../../data-types.md) | Количество чатов бота ||
|| **countUser**
[`integer`](../../../../data-types.md) | Количество пользователей, взаимодействовавших с ботом ||
|#

### Поля объекта User {#user-object}

В таблице и в примере ответа — основные поля. Метод возвращает объект User целиком.

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../../../data-types.md) | Идентификатор пользователя ||
|| **active**
[`boolean`](../../../../data-types.md) | Пользователь активен ||
|| **name**
[`string`](../../../../data-types.md) | Имя и фамилия пользователя ||
|| **bot**
[`boolean`](../../../../data-types.md) | Признак пользователя-бота ||
|| **type**
[`string`](../../../../data-types.md) | Тип пользователя ||
|#

Полное описание всех полей объектов — на странице [Объекты и поля](../../entities.md)


{% note info "" %}

Если у приложения нет ботов, передано неизвестное значение `filter.type` или чужой `botToken`, метод вернет пустой массив `bots` без ошибки.

{% endnote %}

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "BOT_TOKEN_NOT_SPECIFIED",
    "error_description": "Bot token not specified (botToken is required for webhook auth)"
}
```

{% include notitle [Обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `BOT_TOKEN_NOT_SPECIFIED` | Bot token not specified (botToken is required for webhook auth) | Не указан `botToken`. Обязателен при авторизации через вебхук ||
|| `100` | Invalid value {…} to match with parameter {…}. Should be value of type … | В `limit` или `offset` передано не целое число, в `filter` — не объект ||
|| `400` | Internal server error. | Передано отрицательное значение `offset` ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [{#T}](./bot-register.md)
- [{#T}](./bot-get.md)
- [{#T}](./bot-update.md)
- [{#T}](./bot-unregister.md)
- [{#T}](../../migration.md)
