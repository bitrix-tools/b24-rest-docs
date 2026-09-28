# Добавить участников в чат imbot.v2.Chat.User.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец зарегистрированного бота

Метод `imbot.v2.Chat.User.add` добавляет участников в чат. Бот должен состоять в чате: по умолчанию добавлять новых пользователей может любой участник. Если в настройках чата это право ограничено, боту нужна соответствующая роль — см. [Роли в чате](./index.md#roles).

В личный чат метод никого не добавляет, но возвращает `true`. В общий чат, чаты групп, комментариев и звонков добавлять участников этим методом нельзя.

{% note info "" %}

Метод пропускает без ошибки несуществующих и неактивных пользователей, а также тех, кто уже состоит в чате. Если `userIds` пустой или не передан, метод возвращает `true`.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **botId***
[`integer`](../../../../data-types.md) | ID бота ||
|| **botToken**
[`string`](../../../../data-types.md) | Токен бота. Обязателен при авторизации через вебхук, для OAuth не нужен.

Передавайте тот же `botToken`, который указали при регистрации бота ||
|| **dialogId***
[`string`](../../../../data-types.md) | ID группового чата в [формате dialogId](../../index.md#dialog-id): `chat{chatId}` ||
|| **userIds**
[`integer[]`](../../../../data-types.md) | Массив ID пользователей для добавления ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"my_bot_token","dialogId":"chat5","userIds":[1,2,3]}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Chat.User.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"dialogId":"chat5","userIds":[1,2,3],"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Chat.User.add
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Chat.User.add', {
        botId: 456,
        dialogId: 'chat5',
        userIds: [1, 2, 3],
      });

      const { result } = response.getData();
      console.log('result:', result);
    } catch (error) {
      console.error('Error:', error);
    }
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.imbot.v2.chat.user.add(
            bot_id=456,
            dialog_id="chat5",
            user_ids=[
                1,
                2,
                3,
            ],
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
                'imbot.v2.Chat.User.add',
                [
                    'botId' => 456,
                    'dialogId' => 'chat5',
                    'userIds' => [1, 2, 3],
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
        'imbot.v2.Chat.User.add',
        {
            botId: 456,
            dialogId: 'chat5',
            userIds: [1, 2, 3],
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
        'imbot.v2.Chat.User.add',
        [
            'botId' => 456,
            'dialogId' => 'chat5',
            'userIds' => [1, 2, 3],
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Users added';
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "imbot.v2.Chat.User.add", b24.Params{
    	"botId":    456,
    	"botToken": "my_bot_token",
    	"dialogId": "chat5",
    	"userIds":  []int{1, 2, 3},
    })
    if err != nil {
    	return fmt.Errorf("imbot.v2.Chat.User.add: %w", err)
    }

    var item struct {
    	Result bool `json:"result"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "result": true
    },
    "time": {
        "start": 1728626400.123,
        "finish": 1728626400.234,
        "duration": 0.111,
        "processing": 0.045,
        "date_start": "2024-10-11T10:00:00+03:00",
        "date_finish": "2024-10-11T10:00:00+03:00"
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../../data-types.md) | Результат операции ||
|| **result.result**
[`boolean`](../../../../data-types.md) | `true` при успешном добавлении ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "ACCESS_DENIED"
}
```

{% include notitle [Обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `BOT_TOKEN_NOT_SPECIFIED` | Bot token not specified (botToken is required for webhook auth) | Не указан `botToken`. Обязателен при авторизации через вебхук ||
|| `BOT_ID_REQUIRED` | botId is required | Не указан `botId` ||
|| `BOT_NOT_FOUND` | Bot not found | Бот не найден ||
|| `BOT_OWNERSHIP_ERROR` | Bot was installed by another rest application | Бот зарегистрирован другим приложением ||
|| `CHAT_NOT_FOUND` | CHAT_NOT_FOUND | Чат с указанным `dialogId` не найден ||
|| `ACCESS_DENIED` | ACCESS_DENIED | Бот не состоит в чате, у него нет права добавлять участников или в чаты этого типа нельзя добавлять участников ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [{#T}](./chat-user-delete.md)
- [{#T}](./chat-user-list.md)
- [{#T}](./chat-manager-add.md)
- [{#T}](./index.md)
- [{#T}](../../migration.md)
