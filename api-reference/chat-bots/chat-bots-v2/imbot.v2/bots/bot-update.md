# Обновить бота imbot.v2.Bot.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец зарегистрированного бота

Метод `imbot.v2.Bot.update` обновляет свойства бота. Он заменяет метод [imbot.update](../../../outdated/bots/imbot-update.md) первой версии API, соответствие параметров — в [таблице миграции](../../migration.md#metody).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **botId***
[`integer`](../../../../data-types.md) | ID бота. Его возвращает метод [imbot.v2.Bot.register](./bot-register.md) в поле `result.bot.id` ||
|| **botToken**
[`string`](../../../../data-types.md) | Уникальный токен авторизации бота. Обязателен при авторизации через вебхук, не нужен для OAuth.

Передавайте тот же botToken, который был указан при регистрации чат-бота ||
|| **fields***
[`object`](../../../../data-types.md) | Обновляемые поля. Структура объекта описана [ниже](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`Тип` | **Описание** ||
|| **properties**
[`object`](../../../../data-types.md) | Свойства профиля бота. Описание параметров — [ниже](#properties) ||
|| **isHidden**
[`boolean`](../../../../data-types.md) | Скрытый бот. Допустимые значения: `true`, `false` ||
|| **isReactionsEnabled**
[`boolean`](../../../../data-types.md) | Поддержка реакций. Допустимые значения: `true`, `false` ||
|| **isSupportOpenline**
[`boolean`](../../../../data-types.md) | Поддержка Открытых линий. Допустимые значения: `true`, `false` ||
|| **backgroundId**
[`string`](../../../../data-types.md) | Фон чата бота. Передайте `null` для сброса на фон пользователя. Доступные значения — в [таблице фонов](./bot-register.md#backgrounds). Невалидное значение нормализуется в `null` ||
|| **eventMode**
[`string`](../../../../data-types.md) | Режим доставки событий: `fetch` или `webhook` ||
|| **webhookUrl**
[`string`](../../../../data-types.md) | URL обработчика событий (применяется при `eventMode = webhook`) ||
|| **botToken**
[`string`](../../../../data-types.md) | Новый `botToken` для ротации токена бота. Авторизация запроса выполняется **старым** токеном, переданным на верхнем уровне в параметре `botToken`. Пустая строка или строка из пробелов игнорируется. Максимальная длина — 40 символов.

Подробнее — в разделе [Ротация botToken](#token-rotation) ||
|#

### Параметр properties {#properties}

#|
|| **Название**
`Тип` | **Описание** ||
|| **name**
[`string`](../../../../data-types.md) | Имя бота ||
|| **lastName**
[`string`](../../../../data-types.md) | Фамилия бота ||
|| **workPosition**
[`string`](../../../../data-types.md) | Должность бота (отображается в профиле) ||
|| **color**
[`string`](../../../../data-types.md) | Цвет аватара, [доступные цвета](../chats/chat-add.md#available-colors).
Если указан некорректно — игнорируется ||
|| **gender**
[`string`](../../../../data-types.md) | Пол. Допустимые значения: `M`, `F` ||
|| **avatar**
[`file`](../../../../data-types.md) | Аватар. Передавайте строку Base64 без префикса `data:*/*;base64,`.

Как подготовить данные: [Как загружать файлы](../../../../files/how-to-upload-files.md#kak-kodirovat-fajl-v-base64) ||
|#

## Ротация botToken {#token-rotation}

Передача `fields.botToken` заменяет текущий токен бота на новый. Авторизация запроса выполняется **старым** токеном на верхнем уровне; новый токен передается в `fields.botToken`.

После успешной ротации:

- Все подписки бота на события `ONIMBOTV2*` перепривязываются к новому `APPLICATION_TOKEN`, если бот работает в режиме `webhook`.
- Старый токен **мгновенно** теряет права владельца: изменить или удалить бота с ним нельзя, методы вернут ошибку `BOT_OWNERSHIP_ERROR`. Метод [imbot.v2.Bot.get](./bot-get.md) со старым токеном вернет бота в кратком формате, а [imbot.v2.Bot.list](./bot-list.md) — пустой список.

При коллизии (новый токен уже привязан к другому боту) возвращается обобщенная ошибка `BOT_TOKEN_ROTATION_FAILED` без указания причины, чтобы не раскрывать существование чужих токенов.

## Управление подписками на события {#event-subscriptions}

При вызове `Bot.update` подписки бота на события `ONIMBOTV2*` приводятся к актуальному состоянию автоматически:

#|
|| **Изменение** | **Поведение** ||
|| `webhookUrl` меняется (режим остается `webhook`) | Старые подписки на прежний URL **удаляются**, на новый URL создаются новые. Прежний URL перестает получать события ||
|| `eventMode`: `webhook` → `fetch` | Все подписки бота **удаляются**. После перехода события доступны только через [imbot.v2.Event.get](../events/event-get.md) ||
|| `eventMode`: `fetch` → `webhook` | Создаются подписки на все события `ONIMBOTV2*` для указанного `webhookUrl`. Если ранее остались «легаси»-подписки на другой URL — они также удаляются перед созданием новых ||
|| Прочие поля `properties`, `isHidden` и другие | Подписки не изменяются ||
|#

{% note info "" %}

**OAuth-приложения с несколькими ботами:** если одно приложение зарегистрировало нескольких ботов под общим `clientId`, автоматическая очистка подписок при смене `webhookUrl` или `eventMode` пропускается, чтобы не затронуть подписки соседних ботов. Webhook-авторизованные боты с собственным `botToken` такого ограничения не имеют — у каждого из них собственный синтетический `APPLICATION_TOKEN`.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"my_bot_token","fields":{"properties":{"name":"Updated Bot"},"isHidden":true}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Bot.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"fields":{"properties":{"name":"Updated Bot"},"isHidden":true},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Bot.update
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
    type BotUpdateResult = {
      bot: {
        id: number
        isHidden: boolean
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<BotUpdateResult>({
        method: 'imbot.v2.Bot.update',
        params: {
          botId: 456,
          botToken: 'my_bot_token',
          fields: {
            properties: { name: 'Updated Bot' },
            isHidden: true,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(`Bot ${result.bot.id} updated`)
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
      async function updateBot() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'imbot.v2.Bot.update',
            params: {
              botId: 456,
              botToken: 'my_bot_token',
              fields: {
                properties: { name: 'Updated Bot' },
                isHidden: true,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(`Bot ${result.bot.id} updated`)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateBot)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.imbot.v2.bot.update(
            bot_id=456,
            bot_token="my_bot_token",
            fields={
                "properties": {
                    "name": "Updated Bot",
                },
                "isHidden": True,
            },
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
                'imbot.v2.Bot.update',
                [
                    'botId' => 456,
                    'botToken' => 'my_bot_token',
                    'fields' => [
                        'properties' => ['name' => 'Updated Bot'],
                        'isHidden' => true,
                    ],
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
        'imbot.v2.Bot.update',
        {
            botId: 456,
            fields: {
                properties: { name: 'Updated Bot' },
                isHidden: true,
            },
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
        'imbot.v2.Bot.update',
        [
            'botId' => 456,
            'botToken' => 'my_bot_token',
            'fields' => [
                'properties' => ['name' => 'Updated Bot'],
                'isHidden' => true,
            ],
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: '. $result['error_description'];
    } else {
        echo 'Success';
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "imbot.v2.Bot.update", b24.Params{
    	"botId":    456,
    	"botToken": "my_bot_token",
    	"fields": b24.Params{
    		"properties": b24.Params{
    			"name": "Updated Bot",
    		},
    		"isHidden": true,
    	},
    })
    if err != nil {
    	return fmt.Errorf("imbot.v2.Bot.update: %w", err)
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
            "isHidden": true,
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
                "name": "Updated Bot",
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
[`object`](../../../../data-types.md) | Результат обновления ||
|| **result.bot**
[`Bot`](../../entities.md#bot) | Обновленный объект бота в расширенном формате [(подробное описание)](#bot-object) ||
|| **result.users**
[`User[]`](../../entities.md#user) | Массив связанных пользователей [(подробное описание)](#user-object) ||
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
|| `BOT_ID_REQUIRED` | botId is required | Не указан `botId` ||
|| `BOT_NOT_FOUND` | Bot not found | Бот не найден ||
|| `BOT_OWNERSHIP_ERROR` | Bot was installed by another rest application | Бот зарегистрирован другим приложением или с другим `botToken` ||
|| `BOT_INVALID_EVENT_MODE` | Invalid event mode | Невалидный режим доставки событий ||
|| `BOT_INVALID_CALLBACK` | Invalid callback URL | Невалидный URL обработчика ||
|| `BOT_AVATAR_INCORRECT_TYPE` | Avatar must be an image file | Аватар должен быть изображением (`image/*`) ||
|| `BOT_AVATAR_INCORRECT_SIZE` | Avatar image exceeds maximum dimensions (5000x5000) | Размер аватара превышает максимум (5000×5000 px) ||
|| `BOT_TOKEN_ROTATION_FAILED` | Bot token rotation failed | Ротация `botToken` не выполнена. Обобщенный код ошибки — причина не раскрывается, чтобы не подтверждать существование чужих токенов ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [{#T}](./bot-register.md)
- [{#T}](./bot-get.md)
- [{#T}](./bot-list.md)
- [{#T}](./bot-unregister.md)
- [{#T}](../../migration.md)
