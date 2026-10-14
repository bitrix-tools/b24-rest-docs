# Обновить свойства чата imbot.v2.Chat.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец зарегистрированного бота

Метод `imbot.v2.Chat.update` обновляет свойства группового чата: название, описание, цвет и аватар. Передавайте в `fields` только те свойства, которые нужно изменить. Бот должен быть владельцем чата — это требование не зависит от настроек прав в чате.

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
|| **fields**
[`object`](../../../../data-types.md) | Обновляемые свойства чата [(подробное описание)](#fields). Без `fields` метод ничего не меняет и возвращает `true` ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **title**
[`string`](../../../../data-types.md) | Новое название чата ||
|| **description**
[`string`](../../../../data-types.md) | Новое описание чата ||
|| **color**
[`string`](../../../../data-types.md) | Цвет чата — [доступные цвета](#available-colors). Неизвестный код цвета игнорируется без ошибки, цвет не меняется ||
|| **avatar**
[`file`](../../../../data-types.md) | Новый аватар чата в формате [Base64](../../../../files/how-to-upload-files.md). Если строка не содержит изображение, текущий аватар снимается без ошибки ||
|#

### Доступные цвета {#available-colors}

#|
|| **Код** | **HEX** ||
|| `red` | `#df532d` ||
|| `green` | `#64a513` ||
|| `mint` | `#4ba984` ||
|| `lightBlue` | `#4ba5c3` ||
|| `darkBlue` | `#3e99ce` ||
|| `purple` | `#8474c8` ||
|| `aqua` | `#1eb4aa` ||
|| `pink` | `#f76187` ||
|| `lime` | `#58cc47` ||
|| `brown` | `#ab7761` ||
|| `azure` | `#29619b` ||
|| `khaki` | `#728f7a` ||
|| `sand` | `#ba9c7b` ||
|| `marengo` | `#556574` ||
|| `gray` | `#909090` ||
|| `graphite` | `#5e5f5e` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"my_bot_token","dialogId":"chat5","fields":{"title":"New Title","color":"azure"}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Chat.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"dialogId":"chat5","fields":{"title":"New Title","color":"azure"},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Chat.update
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Chat.update', {
        botId: 456,
        dialogId: 'chat5',
        fields: {
          title: 'New Title',
          color: 'azure',
        },
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
        bitrix_response = client.imbot.v2.chat.update(
            bot_id=456,
            dialog_id="chat5",
            fields={
                "title": "New Title",
                "color": "azure",
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
                'imbot.v2.Chat.update',
                [
                    'botId' => 456,
                    'dialogId' => 'chat5',
                    'fields' => [
                        'title' => 'New Title',
                        'color' => 'azure',
                    ],
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
        'imbot.v2.Chat.update',
        {
            botId: 456,
            dialogId: 'chat5',
            fields: {
                title: 'New Title',
                color: 'azure',
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
        'imbot.v2.Chat.update',
        [
            'botId' => 456,
            'dialogId' => 'chat5',
            'fields' => [
                'title' => 'New Title',
                'color' => 'azure',
            ],
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Updated';
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "imbot.v2.Chat.update", b24.Params{
    	"botId":    456,
    	"botToken": "my_bot_token",
    	"dialogId": "chat5",
    	"fields": b24.Params{
    		"title": "New Title",
    		"color": "azure",
    	},
    })
    if err != nil {
    	return fmt.Errorf("imbot.v2.Chat.update: %w", err)
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
[`boolean`](../../../../data-types.md) | `true` при успешном обновлении ||
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
|| `ACCESS_DENIED` | ACCESS_DENIED | Бот не является владельцем чата или тип чата не поддерживает изменение ||
|| `WRONG_MESSAGE_TYPE` | WRONG_MESSAGE_TYPE | Чат не групповой ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [{#T}](./chat-add.md)
- [{#T}](./chat-get.md)
- [{#T}](./chat-user-add.md)
- [{#T}](./chat-set-owner.md)
- [{#T}](./index.md)
- [{#T}](../../migration.md)
