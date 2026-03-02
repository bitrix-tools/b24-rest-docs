# Отправить сообщение imbot.message.add

> Scope: [`imbot`](../../scopes/permissions.md)
>
> Кто может выполнять метод: авторизованный пользователь приложения, которое зарегистрировало чат-бота. Метод работает только с ботами этого приложения.

Метод `imbot.message.add` отправляет сообщение от чат-бота.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **BOT_ID**
[`integer`](../../data-types.md) | Идентификатор чат-бота. Получить идентификатор бота можно с помощью метода [imbot.bot.list](../imbot-bot-list.md).

Если параметр не передан, метод ищет первого бота, который зарегистрирован текущим приложением ||
|| **DIALOG_ID**
[`string`](../../data-types.md) | Идентификатор объекта, который получит сообщение: пользователь или чат.

Поддерживаемые форматы:
- `USER_ID` — идентификатор пользователя, который можно получить через [user.get](../../user/user-get.md) или [user.search](../../user/user-search.md)
- `chatXXX`, где `XXX` — идентификатор чата, который можно получить через [imbot.chat.get](../chats/imbot-chat-get.md)

Параметр обязателен, если не переданы одновременно `FROM_USER_ID` и `TO_USER_ID`. ||

|| **FROM_USER_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя-отправителя для отправки в приватный диалог. Получить идентификатор пользователя можно с помощью [user.get](../../user/user-get.md) и [user.search](../../user/user-search.md).

Используется только вместе с `TO_USER_ID`. Если оба параметра переданы и больше `0`, поле `DIALOG_ID` игнорируется, а `SYSTEM` принудительно становится `Y` ||
|| **TO_USER_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя-получателя для отправки в приватный диалог. Получить идентификатор пользователя можно с помощью [user.get](../../user/user-get.md) и [user.search](../../user/user-search.md).

Используется только вместе с `FROM_USER_ID` ||
|| **MESSAGE***
[`string`](../../data-types.md) | Текст сообщения. Метод автоматически убирает пробелы и переносы по краям текста сообщения ||
|| **ATTACH**
[`object`](../../data-types.md) 
[`string`](../../data-types.md) | Вложение с блоками контента: изображения, ссылки, файлы. Можно передать:
- строку JSON
- объект с корневым ключом `BLOCKS`
- массив блоков без обертки 

Подробнее читайте в разделе [Вложения](../../chats/messages/attachments/index.md) ||
|| **KEYBOARD**
[`object`](../../data-types.md) 
[`string`](../../data-types.md) | Кнопки под сообщением, с которыми может взаимодействовать пользователь.

Подробнее читайте в статье [Работа с клавиатурами](../../chats/messages/keyboards.md) ||
|| **MENU**
[`object`](../../data-types.md) 
[`string`](../../data-types.md) | Дополнительные пункты в контекстном меню чата.

Подробнее читайте в статье [Контекстное меню](../../chats/messages/menu.md) ||
|| **SYSTEM**
[`string`](../../data-types.md) | Признак системного сообщения.

Допустимые значения:
- `Y` — системное сообщение
- `N` — обычное сообщение, значение по умолчанию

В режиме `FROM_USER_ID` + `TO_USER_ID` значение принудительно устанавливается в `Y`. ||
|| **URL_PREVIEW**
[`string`](../../data-types.md) | Управляет отображением ссылок: при включении ссылка показывается как «богатая ссылка» с карточкой.

Допустимые значения:
- `Y` — включено, по умолчанию
- `N` — выключено ||
|| **SKIP_CONNECTOR**
[`string`](../../data-types.md) | Пропустить отправку сообщения во внешние коннекторы открытых линий.

Допустимые значения:
- `Y` — пропустить
- `N` — не пропускать (по умолчанию) ||
|| **CLIENT_ID**
[`string`](../../data-types.md) | Технический параметр для сценариев без `clientId` в авторизации.

Если передан, используется как `custom{CLIENT_ID}` для определения приложения. ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"BOT_ID":39,"DIALOG_ID":"chat123","MESSAGE":"Текст сообщения","SYSTEM":"N","URL_PREVIEW":"Y"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.message.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"BOT_ID":39,"DIALOG_ID":"chat123","MESSAGE":"Текст сообщения","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.message.add
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.message.add', {
        BOT_ID: 39,
        DIALOG_ID: 'chat123',
        MESSAGE: 'Текст сообщения',
        URL_PREVIEW: 'Y',
      });

      const { result } = response.getData();
      console.log('Created message ID:', result);
    } catch (error) {
      console.error('Error sending message:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imbot.message.add',
                [
                    'BOT_ID' => 39,
                    'DIALOG_ID' => 'chat123',
                    'MESSAGE' => 'Текст сообщения',
                    'URL_PREVIEW' => 'Y',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Created message ID: ' . $result->data();
        }
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error sending message: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.message.add',
        {
            BOT_ID: 39,
            DIALOG_ID: 'chat123',
            MESSAGE: 'Текст сообщения',
            URL_PREVIEW: 'Y',
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
        'imbot.message.add',
        [
            'BOT_ID' => 39,
            'DIALOG_ID' => 'chat123',
            'MESSAGE' => 'Текст сообщения',
            'URL_PREVIEW' => 'Y',
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Created message ID: ' . $result['result'];
    }
    ```
{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": 19880117,
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
[`integer`](../../data-types.md) | Идентификатор созданного сообщения ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MESSAGE_EMPTY",
    "error_description": "Message can't be empty"
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `BOT_ID_ERROR` | Bot not found | Бот не найден или у приложения нет доступного бота для автоподстановки `BOT_ID` ||
|| `APP_ID_ERROR` | Bot was installed by another rest application | Переданный `BOT_ID` принадлежит другому приложению ||
|| `DIALOG_ID_EMPTY` | Dialog ID can't be empty | Не передан корректный `DIALOG_ID`, если не используется пара `FROM_USER_ID` и `TO_USER_ID` ||
|| `MESSAGE_EMPTY` | Message can't be empty | Не передан текст сообщения ||
|| `ATTACH_OVERSIZE` | You have exceeded the maximum allowable size of attach | Превышен допустимый размер `ATTACH` — 30 Кб||
|| `ATTACH_ERROR` | Incorrect attach params | Невалидная структура `ATTACH` ||
|| `KEYBOARD_ERROR` | Incorrect keyboard params | Невалидная структура `KEYBOARD` ||
|| `KEYBOARD_OVERSIZE` | You have exceeded the maximum allowable size of keyboard | Превышен допустимый размер `KEYBOARD` — 30 Кб||
|| `MENU_ERROR` | Incorrect menu params | Невалидная структура `MENU` ||
|| `MENU_OVERSIZE` | You have exceeded the maximum allowable size of menu | Превышен допустимый размер `MENU` — 30 Кб||
|| `WRONG_REQUEST` | Message isn't added | Внутренняя ошибка при добавлении сообщения ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imbot-message-update.md)
- [{#T}](./imbot-message-delete.md)
- [{#T}](./imbot-message-like.md)
- [{#T}](./events/on-imbot-message-add.md)
- [{#T}](../../../tutorials/chat-bots/index.md)
- [Пример ЭхоБота](https://dev.1c-bitrix.ru/~b24bots)