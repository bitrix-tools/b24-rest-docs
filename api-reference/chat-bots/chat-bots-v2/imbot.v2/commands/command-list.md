# Получить список команд imbot.v2.Command.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец зарегистрированного бота

Метод `imbot.v2.Command.list` возвращает список всех команд бота.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **botId***
[`integer`](../../../../data-types.md) | ID бота ||
|| **botToken**
[`string`](../../../../data-types.md) | Уникальный токен авторизации бота. Обязателен при авторизации через вебхук, не нужен для OAuth.

Передавайте тот же botToken, который был указан при регистрации чат-бота ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"my_bot_token"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Command.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Command.list
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Command.list', {
        botId: 456,
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
        bitrix_response = client.imbot.v2.command.list(
            bot_id=456,
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
                'imbot.v2.Command.list',
                [
                    'botId' => 456,
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
        'imbot.v2.Command.list',
        {
            botId: 456,
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
        'imbot.v2.Command.list',
        [
            'botId' => 456,
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: '. $result['error_description'];
    } else {
        print_r($result['result']['commands']);
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "imbot.v2.Command.list", b24.Params{
    	"botId":    456,
    	"botToken": "my_bot_token",
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("imbot.v2.Command.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "commands".
    raw, ok := b24.Unwrap(res.Result, "commands")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа commands")
    }

    var items []struct {
    	ID      b24.ID `json:"id"`
    	BotID   b24.ID `json:"botId"`
    	Command string `json:"command"`
    	Title   string `json:"title"`
    	Params  string `json:"params"`
    	Common  bool   `json:"common"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "commands": [
            {
                "id": 42,
                "botId": 456,
                "command": "/help",
                "title": "Показать помощь",
                "params": "текст запроса",
                "common": false,
                "hidden": false,
                "extranetSupport": false,
                "category": "My Bot",
                "context": ""
            }
        ]
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
`Тип` | **Описание** ||
|| **result**
[`object`](../../../../data-types.md) | Результат операции ||
|| **result.commands**
[`Command[]`](../../entities.md#command) | Массив команд бота [(подробное описание)](#command-object) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Поля объекта Command {#command-object}

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../../../data-types.md) | Идентификатор команды ||
|| **botId**
[`integer`](../../../../data-types.md) | Идентификатор бота ||
|| **command**
[`string`](../../../../data-types.md) | Текст команды ||
|| **title**
[`string`](../../../../data-types.md) | Заголовок команды на языке текущего Битрикс24 с возвратом к языку по умолчанию ||
|| **params**
[`string`](../../../../data-types.md) | Описание параметров команды на языке текущего Битрикс24 с возвратом к языку по умолчанию ||
|| **common**
[`boolean`](../../../../data-types.md) | Команда доступна во всех чатах ||
|| **hidden**
[`boolean`](../../../../data-types.md) | Команда скрыта из списка команд ||
|| **extranetSupport**
[`boolean`](../../../../data-types.md) | Команда доступна экстранет-пользователям ||
|| **category**
[`string`](../../../../data-types.md) | Категория команды ||
|| **context**
[`string`](../../../../data-types.md) | Контекст использования команды ||
|#

Полное описание всех полей объектов — на странице [Объекты и поля](../../entities.md)

## Обработка ошибок

HTTP-статус: **400**, **403**

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
|| `BOT_TOKEN_NOT_SPECIFIED` | Bot token is not specified | Не указан `botToken`. Обязателен при авторизации через вебхук ||
|| `BOT_ID_REQUIRED` | Bot ID is required | Не указан `botId` ||
|| `BOT_NOT_FOUND` | Bot not found | Бот не найден ||
|| `BOT_OWNERSHIP_ERROR` | Bot is registered by another application | Бот зарегистрирован другим приложением ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [{#T}](./command-register.md)
- [{#T}](./command-update.md)
- [{#T}](./command-unregister.md)
- [{#T}](./command-answer.md)
