# Отправить индикатор действия бота imbot.v2.Chat.InputAction.notify

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец зарегистрированного бота

Метод `imbot.v2.Chat.InputAction.notify` отправляет индикатор действия бота в чат — например, «бот печатает».

## Параметры метода

{% include [Сноска о параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **botId***
[`integer`](../../../../data-types.md) | ID бота ||
|| **botToken**
[`string`](../../../../data-types.md) | Уникальный токен авторизации бота. Обязателен при авторизации через вебхук, не нужен для OAuth.

Передавайте тот же botToken, который был указан при регистрации чат-бота ||
|| **dialogId***
[`string`](../../../../data-types.md) | ID диалога. Для групповых чатов — `chat{chatId}`, для личных — `{userId}` ||
|| **statusMessageCode**
[`string`](../../../../data-types.md) | Код статуса действия. Список доступных кодов описан [ниже](#status-codes). Если не указан, отображается стандартный индикатор «печатает» ||
|| **duration**
[`integer`](../../../../data-types.md) | Длительность отображения индикатора в секундах (1–600). По умолчанию определяется сервером ||
|#

### Доступные коды statusMessageCode {#status-codes}

#|
|| **Код** | **Отображаемый текст** ||
|| `IMBOT_AGENT_ACTION_THINKING` | Агент размышляет... ||
|| `IMBOT_AGENT_ACTION_SEARCHING` | Агент ищет информацию... ||
|| `IMBOT_AGENT_ACTION_GENERATING` | Агент готовит ответ... ||
|| `IMBOT_AGENT_ACTION_ANALYZING` | Агент анализирует запрос... ||
|| `IMBOT_AGENT_ACTION_PROCESSING` | Агент обрабатывает данные... ||
|| `IMBOT_AGENT_ACTION_TRANSLATING` | Агент переводит текст... ||
|| `IMBOT_AGENT_ACTION_CONNECTING` | Агент подключается к сервису... ||
|| `IMBOT_AGENT_ACTION_CHECKING` | Агент проверяет данные... ||
|| `IMBOT_AGENT_ACTION_CALCULATING` | Агент выполняет расчет... ||
|| `IMBOT_AGENT_ACTION_READING_DOCS` | Агент изучает документы... ||
|| `IMBOT_AGENT_ACTION_COMPOSING` | Агент составляет ответ... ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"my_bot_token","dialogId":"chat5","statusMessageCode":"IMBOT_AGENT_ACTION_THINKING","duration":30}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Chat.InputAction.notify
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"dialogId":"chat5","statusMessageCode":"IMBOT_AGENT_ACTION_THINKING","duration":30,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Chat.InputAction.notify
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Chat.InputAction.notify', {
        botId: 456,
        dialogId: 'chat5',
        statusMessageCode: 'IMBOT_AGENT_ACTION_THINKING',
        duration: 30,
      });

      const { result } = response.getData();
      console.log('result:', result);
    } catch (error) {
      console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imbot.v2.Chat.InputAction.notify',
                [
                    'botId' => 456,
                    'dialogId' => 'chat5',
                    'statusMessageCode' => 'IMBOT_AGENT_ACTION_THINKING',
                    'duration' => 30,
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
        'imbot.v2.Chat.InputAction.notify',
        {
            botId: 456,
            dialogId: 'chat5',
            statusMessageCode: 'IMBOT_AGENT_ACTION_THINKING',
            duration: 30,
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
        'imbot.v2.Chat.InputAction.notify',
        [
            'botId' => 456,
            'dialogId' => 'chat5',
            'statusMessageCode' => 'IMBOT_AGENT_ACTION_THINKING',
            'duration' => 30,
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Action sent';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": true,
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
[`boolean`](../../../../data-types.md) | `true` при успешной отправке индикатора ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied"
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
|| `ACCESS_DENIED` | Access denied | Бот не является участником чата ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [{#T}](./chat-text-field-enabled.md)
- [{#T}](../messages/chat-message-send.md)
