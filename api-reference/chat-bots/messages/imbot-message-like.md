# Установить «Мне нравится» для сообщения imbot.message.like

> Scope: [`imbot`](../../scopes/permissions.md)
>
> Кто может выполнять метод: авторизованный пользователь приложения, которое зарегистрировало чат-бота. Метод работает только с ботами этого приложения.

Метод `imbot.message.like` ставит или снимает отметку «Мне нравится» для сообщения.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **BOT_ID**
[`integer`](../../data-types.md) | Идентификатор чат-бота. Получить идентификатор бота можно с помощью метода [imbot.bot.list](../imbot-bot-list.md).

Если параметр не передан, метод ищет первого бота, который зарегистрирован текущим приложением ||
|| **MESSAGE_ID***
[`integer`](../../data-types.md) | Идентификатор сообщения в личных диалогах или в групповых чатах, где присутствует чат-бот. Значение должно быть больше `0`.

Для сообщений, которые отправлены ботом через REST, идентификатор возвращает метод [imbot.message.add](./imbot-message-add.md). 

Идентификаторы сообщений, которые отправили в чат пользователи, можно получить с помощью метода [im.dialog.messages.get](../../chats/messages/im-dialog-messages-get.md) ||
|| **ACTION**
[`string`](../../data-types.md) | Действие с реакцией на сообщение.

Допустимые значения:
- `auto` — автоматически переключить текущий статус: если реакции «Мне нравится» нет, она будет установлена, если реакция есть — снята
- `plus` — поставить «Мне нравится»
- `minus` — снять «Мне нравится»

Если параметр не передан, используется `auto` ||
|| **CLIENT_ID**
[`string`](../../data-types.md) | Параметр обязателен только для вебхуков. Передавайте тот же CLIENT_ID, который был указан при регистрации чат-бота ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"BOT_ID":39,"MESSAGE_ID":19880117,"ACTION":"auto"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.message.like
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"BOT_ID":39,"MESSAGE_ID":19880117,"ACTION":"auto","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.message.like
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.message.like', {
        BOT_ID: 39,
        MESSAGE_ID: 19880117,
        ACTION: 'plus',
      });

      const { result } = response.getData();
      console.log('Статус «Мне нравится» изменен:', result);
    } catch (error) {
      console.error('Ошибка изменения статуса:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imbot.message.like',
                [
                    'BOT_ID' => 39,
                    'MESSAGE_ID' => 19880117,
                    'ACTION' => 'auto',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            echo 'Ошибка: ' . $result->error();
        } else {
            echo 'Статус «Мне нравится» изменен: ' . ($result->data() ? 'true' : 'false');
        }
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Ошибка изменения статуса: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.message.like',
        {
            BOT_ID: 39,
            MESSAGE_ID: 19880117,
            ACTION: 'auto',
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
        'imbot.message.like',
        [
            'BOT_ID' => 39,
            'MESSAGE_ID' => 19880117,
            'ACTION' => 'auto',
        ]
    );

    if (!empty($result['error'])) {
        echo 'Ошибка: ' . $result['error_description'];
    } else {
        echo 'Статус «Мне нравится» изменен: ' . ($result['result'] ? 'true' : 'false');
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
[`boolean`](../../data-types.md) | `true`, если действие выполнено ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "WITHOUT_CHANGES",
    "error_description": "Action completed without changes"
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `BOT_ID_ERROR` | Bot not found | Бот не найден или у приложения нет доступного бота для автоподстановки `BOT_ID` ||
|| `APP_ID_ERROR` | Bot was installed by another rest application | Переданный `BOT_ID` принадлежит другому приложению ||
|| `MESSAGE_ID_ERROR` | Message ID can't be empty | Не передан идентификатор сообщения ||
|| `WITHOUT_CHANGES` | Action completed without changes | Состояние реакции не изменилось после вызова ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imbot-message-add.md)
- [{#T}](./imbot-message-update.md)
- [{#T}](./imbot-message-delete.md)
