# Создать чат от лица чат-бота imbot.chat.add

> Scope: [`imbot`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь приложения, которое зарегистрировало чат-бота

Метод `imbot.chat.add` создает чат от лица чат-бота.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TYPE**
[`string`](../../data-types.md) | Тип чата. Возможные значения:
- `OPEN` — открытый чат для вступления
- `CHAT` — закрытый чат по приглашениям

По умолчанию — `CHAT` ||
|| **TITLE**
[`string`](../../data-types.md) | Заголовок чата ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Описание чата ||
|| **COLOR**
[`string`](../../data-types.md) | Цвет чата для мобильного приложения. Возможные значения:
`RED`, `GREEN`, `MINT`, `LIGHT_BLUE`, `DARK_BLUE`, `PURPLE`, `AQUA`, `PINK`, `LIME`, `BROWN`, `AZURE`, `KHAKI`, `SAND`, `MARENGO`, `GRAY`, `GRAPHITE` ||
|| **MESSAGE**
[`string`](../../data-types.md) | Приветственное сообщение в чате ||
|| **USERS**
[`array`](../../data-types.md) | Массив участников чата ||
|| **AVATAR**
[`string`](../../data-types.md) | Аватар чата в формате [Base64](../../files/how-to-upload-files.md) ||
|| **ENTITY_TYPE**
[`string`](../../data-types.md) | Тип объекта для привязки чата к внешнему контексту. Можно указывать собственные значения, например `MYAPP_ORDER`.

Используется для получения идентификатора чата и для определения контекста в обработчиках событий [ONIMBOTMESSAGEADD](../messages/events/on-imbot-message-add.md), [ONIMBOTMESSAGEUPDATE](../messages/events/on-imbot-message-update.md), [ONIMBOTMESSAGEDELETE](../messages/events/on-imbot-message-delete.md) ||
|| **ENTITY_ID**
[`string`](../../data-types.md) | Идентификатор объекта в рамках `ENTITY_TYPE`. 

Используется для получения идентификатора чата и для определения контекста в обработчиках событий [ONIMBOTMESSAGEADD](../messages/events/on-imbot-message-add.md), [ONIMBOTMESSAGEUPDATE](../messages/events/on-imbot-message-update.md), [ONIMBOTMESSAGEDELETE](../messages/events/on-imbot-message-delete.md) ||
|| **BOT_ID**
[`integer`](../../data-types.md) | Идентификатор чат-бота. Получить идентификатор бота можно с помощью метода [imbot.bot.list](../imbot-bot-list.md).

Если параметр не передан, метод ищет первого бота, который зарегистрирован текущим приложением ||
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
    -d '{"TYPE":"CHAT","TITLE":"Новый чат","DESCRIPTION":"Важные новости","COLOR":"GREEN","MESSAGE":"Добро пожаловать!","USERS":[1271],"AVATAR":"/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBwRXhp...+gKlSv+1v/2Q==","ENTITY_TYPE":"CHAT","ENTITY_ID":"13","BOT_ID":1291}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.chat.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TYPE":"CHAT","TITLE":"Новый чат","DESCRIPTION":"Важные новости","COLOR":"GREEN","MESSAGE":"Добро пожаловать!","USERS":[1271],"AVATAR":"/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBwRXhp...+gKlSv+1v/2Q==","ENTITY_TYPE":"CHAT","ENTITY_ID":"13","BOT_ID":1291,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/imbot.chat.add
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'imbot.chat.add',
            {
                TYPE: 'CHAT',
                TITLE: 'Новый чат',
                DESCRIPTION: 'Важные новости',
                COLOR: 'GREEN',
                MESSAGE: 'Добро пожаловать!',
                USERS: [1271],
                AVATAR: '/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBwRXhp...+gKlSv+1v/2Q==',
                ENTITY_TYPE: 'CHAT',
                ENTITY_ID: '13',
                BOT_ID: 1291
            }
        );
        
        const result = response.getData().result;
        console.log('Created chat with ID:', result);
        processResult(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imbot.chat.add',
                [
                    'TYPE' => 'CHAT',
                    'TITLE' => 'Новый чат',
                    'DESCRIPTION' => 'Важные новости',
                    'COLOR' => 'GREEN',
                    'MESSAGE' => 'Добро пожаловать!',
                    'USERS' => [1271],
                    'AVATAR' => '/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBwRXhp...+gKlSv+1v/2Q==',
                    'ENTITY_TYPE' => 'CHAT',
                    'ENTITY_ID' => '13',
                    'BOT_ID' => 1291
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding chat: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.chat.add',
        {
            TYPE: 'CHAT',
            TITLE: 'Новый чат',
            DESCRIPTION: 'Важные новости',
            COLOR: 'GREEN',
            MESSAGE: 'Добро пожаловать!',
            USERS: [1271],
            AVATAR: '/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBwRXhp...+gKlSv+1v/2Q==',
            ENTITY_TYPE: 'CHAT',
            ENTITY_ID: '13',
            BOT_ID: 1291
        },
        function (result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );

    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'imbot.chat.add',
        [
            'TYPE' => 'CHAT',
            'TITLE' => 'Новый чат',
            'DESCRIPTION' => 'Важные новости',
            'COLOR' => 'GREEN',
            'MESSAGE' => 'Добро пожаловать!',
            'USERS' => [1271],
            'AVATAR' => '/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBwRXhp...+gKlSv+1v/2Q==',
            'ENTITY_TYPE' => 'CHAT',
            'ENTITY_ID' => '13',
            'BOT_ID' => 1291
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
  "result": 2725,
  "time": {
      "start": 1771928379,
      "finish": 1771928380.102187,
      "duration": 1.102186918258667,
      "processing": 1,
      "date_start": "2026-02-24T13:19:39+03:00",
      "date_finish": "2026-02-24T13:19:40+03:00",
      "operating_reset_at": 1771928979,
      "operating": 0.3226499557495117
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор созданного чата ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "WRONG_REQUEST",
    "error_description": "Chat can't be created"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `INVALID_FORMAT` | Parameter USERS has wrong type | Параметр `USERS` передан в неверном формате ||
|| `BOT_ID_ERROR` | Bot not found | Чат-бот не найден ||
|| `APP_ID_ERROR` | Bot was installed by another rest application | Указанный чат-бот установлен другим приложением ||
|| `WRONG_REQUEST` | Chat can't be created | Не удалось создать чат ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imbot-chat-user-add.md)
- [{#T}](./imbot-chat-update-title.md)
- [{#T}](./imbot-chat-update-avatar.md)
- [{#T}](./imbot-chat-update-color.md)
- [{#T}](./imbot-chat-get.md)
- [{#T}](./imbot-dialog-get.md)
- [{#T}](./imbot-chat-user-list.md)
- [{#T}](./imbot-chat-user-delete.md)
- [{#T}](./imbot-chat-leave.md)
