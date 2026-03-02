# Отправить признак «Чат-бот пишет» imbot.chat.sendTyping

> Scope: [`imbot`](../../scopes/permissions.md)
>
> Кто может выполнять метод: авторизованный пользователь приложения, которое зарегистрировало чат-бота. Метод работает только с ботами этого приложения.

Метод `imbot.chat.sendTyping` отправляет в диалог индикатор «Чат-бот пишет». Метод возвращает `true` сразу после отправки команды.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **BOT_ID**
[`integer`](../../data-types.md) | Идентификатор чат-бота. Получить идентификатор бота можно с помощью метода [imbot.bot.list](../imbot-bot-list.md).

Если параметр не передан, метод ищет первого бота, который зарегистрирован текущим приложением ||
|| **DIALOG_ID***
[`string`](../../data-types.md) | Идентификатор объекта, который получит сообщение: пользователь или чат.

Поддерживаемые форматы:
- `USER_ID` — идентификатор пользователя, который можно получить через [user.get](../../user/user-get.md) или [user.search](../../user/user-search.md)
- `chatXXX`, где `XXX` — идентификатор чата, который можно получить через [imbot.chat.get](../chats/imbot-chat-get.md) ||
|| **CLIENT_ID**
[`string`](../../data-types.md) | Технический параметр для сценариев без `clientId` в авторизации.

Если передан, используется как `custom{CLIENT_ID}` для определения приложения ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"BOT_ID":39,"DIALOG_ID":"chat123"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.chat.sendTyping
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"BOT_ID":39,"DIALOG_ID":"chat123","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.chat.sendTyping
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.chat.sendTyping', {
        BOT_ID: 39,
        DIALOG_ID: 'chat123',
      });

      const { result } = response.getData();
      console.log('Typing sent:', result);
    } catch (error) {
      console.error('Error sending typing:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imbot.chat.sendTyping',
                [
                    'BOT_ID' => 39,
                    'DIALOG_ID' => 'chat123',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Typing sent: ' . ($result->data() ? 'true' : 'false');
        }
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error sending typing: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.chat.sendTyping',
        {
            BOT_ID: 39,
            DIALOG_ID: 'chat123',
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
        'imbot.chat.sendTyping',
        [
            'BOT_ID' => 39,
            'DIALOG_ID' => 'chat123',
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Typing sent: ' . ($result['result'] ? 'true' : 'false');
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
        "date_finish": "2024-10-11T10:00:00+03:00",
        "operating_reset_at": 1762349466,
        "operating": 0
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если команда отправки индикатора принята ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "DIALOG_ID_EMPTY",
    "error_description": "Dialog ID can't be empty"
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `BOT_ID_ERROR` | Bot not found | Бот не найден или у приложения нет доступного бота для автоподстановки `BOT_ID` ||
|| `APP_ID_ERROR` | Bot was installed by another rest application | Переданный `BOT_ID` принадлежит другому приложению ||
|| `DIALOG_ID_EMPTY` | Dialog ID can't be empty | Не передан идентификатор диалога ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imbot-chat-add.md)
- [{#T}](./imbot-chat-user-add.md)
- [{#T}](./imbot-chat-update-title.md)
- [{#T}](./imbot-chat-update-avatar.md)
- [{#T}](./imbot-chat-update-color.md)
- [{#T}](./imbot-chat-get.md)
- [{#T}](./imbot-dialog-get.md)
- [{#T}](./imbot-chat-user-list.md)
- [{#T}](./imbot-chat-user-delete.md)
- [{#T}](./imbot-chat-leave.md)