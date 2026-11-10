# Получить информацию о боте imbot.v2.Bot.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: авторизованный пользователь

Метод `imbot.v2.Bot.get` возвращает информацию о боте. Используется для проверки установки бота.

Приложению-владельцу метод возвращает расширенный формат объекта Bot. Другим приложениям и запросам с чужим `botToken` — краткий формат, без [дополнительных полей для владельца](#bot-owner-fields).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **botId**
[`integer`](../../../../data-types.md) | ID бота из поля `result.bot.id` ответа [imbot.v2.Bot.register](./bot-register.md). Обязателен, если не указан `code` ||
|| **code**
[`string`](../../../../data-types.md) | Код бота. Обязателен, если не указан `botId` ||
|| **botToken**
[`string`](../../../../data-types.md) | Уникальный токен авторизации бота. Обязателен при авторизации через вебхук, не нужен для OAuth.

Передавайте тот же botToken, который был указан при регистрации чат-бота. С другим токеном метод вернет бота в кратком формате ||
|#

{% note info "" %}

Необходимо передать один из параметров: `botId` или `code`.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botToken":"my_bot_token","code":"support_bot"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Bot.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"code":"support_bot","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Bot.get
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
    type BotGetResult = {
      bot: {
        id: number
        code: string
        type: string
      }
      users: Array<{
        id: number
        name: string
      }>
    }

    try {
      const response = await $b24.actions.v2.call.make<BotGetResult>({
        method: 'imbot.v2.Bot.get',
        params: {
          botToken: 'my_bot_token',
          code: 'support_bot',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Bot ID:', result.bot.id, '| Code:', result.bot.code)
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
      async function getBot() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'imbot.v2.Bot.get',
            params: {
              botToken: 'my_bot_token',
              code: 'support_bot',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Bot ID:', result.bot.id, '| Code:', result.bot.code)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getBot)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.imbot.v2.bot.get(
            bot_token="my_bot_token",
            code="support_bot",
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
                'imbot.v2.Bot.get',
                [
                    'botToken' => 'my_bot_token',
                    'code' => 'support_bot',
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
        'imbot.v2.Bot.get',
        {
            code: 'support_bot',
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
        'imbot.v2.Bot.get',
        [
            'botToken' => 'my_bot_token',
            'code' => 'support_bot',
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: '. $result['error_description'];
    } else {
        echo 'Bot ID: '. $result['result']['bot']['id'];
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "imbot.v2.Bot.get", b24.Params{
    	"botToken": "my_bot_token",
    	"code":     "support_bot",
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("imbot.v2.Bot.get: %w", err)
    }

    // Форма ответа показана ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "bot": {
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
        },
        "users": [
            {
                "id": 456,
                "active": true,
                "name": "Support Bot",
                "bot": true,
                "type": "bot"
            }
        ]
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
|| **result.bot**
[`Bot`](../../entities.md#bot) | Объект бота. Расширенный формат — для владельца, краткий — для остальных [(подробное описание)](#bot-object) ||
|| **result.users**
[`User[]`](../../entities.md#user) | Массив связанных пользователей [(подробное описание)](#user-object) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Поля объекта Bot {#bot-object}

Эти поля приходят в обоих форматах.

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
|#

#### Дополнительные поля (только для владельца) {#bot-owner-fields}

Эти поля приходят только в расширенном формате: приложению, которое зарегистрировало бота, или запросу через вебхук с тем же `botToken`.

#|
|| **Поле**
`Тип` | **Описание** ||
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
|| `PARAMS_REQUIRED` | botId or code is required | Не передан ни `botId`, ни `code` ||
|| `BOT_NOT_FOUND` | Bot not found | Бот не найден ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [{#T}](./bot-register.md)
- [{#T}](./bot-update.md)
- [{#T}](./bot-list.md)
- [{#T}](./bot-unregister.md)
