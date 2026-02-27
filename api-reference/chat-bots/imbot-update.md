# Обновить чат-бота imbot.update

> Scope: [`imbot`](../scopes/permissions.md)
>
> Кто может выполнять метод: авторизованный пользователь приложения, которое зарегистрировало чат-бота

Метод `imbot.update` обновляет данные чат-бота и его обработчики событий.

## Параметры метода

{% include [Сноска о параметрах](../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **BOT_ID***
[`integer`](../data-types.md) | Идентификатор чат-бота. Получить идентификатор можно методом [imbot.bot.list](./imbot-bot-list.md). Значение должно быть больше `0` ||
|| **FIELDS***
[`object`](../data-types.md) | Данные для обновления чат-бота. Структура объекта подробно описана [ниже](#fields) ||
|| **CLIENT_ID**
[`string`](../data-types.md) | Технический параметр для сценариев без `clientId` в авторизации. Если передан, используется как `custom{CLIENT_ID}` для определения приложения ||
|#

### Параметр FIELDS {#fields}

#|
|| **Название**
`Тип` | **Описание** ||
|| **CODE**
[`string`](../data-types.md) | Новый строковый код бота, уникальный в рамках Битрикс24  ||
|| **EVENT_HANDLER**
[`string`](../data-types.md) | Общий URL обработчика событий. Если передан, его значение копируется в `EVENT_MESSAGE_ADD`, `EVENT_MESSAGE_UPDATE`, `EVENT_MESSAGE_DELETE`, `EVENT_WELCOME_MESSAGE`, `EVENT_BOT_DELETE`.

Если нужны разные обработчики, не передавайте `EVENT_HANDLER`. Задайте отдельные URL в параметрах `EVENT_MESSAGE_ADD`, `EVENT_MESSAGE_UPDATE`, `EVENT_MESSAGE_DELETE`, `EVENT_WELCOME_MESSAGE`, `EVENT_BOT_DELETE` ||
|| **EVENT_MESSAGE_ADD**
[`string`](../data-types.md) | URL обработчика события [ONIMBOTMESSAGEADD](./messages/events/on-imbot-message-add.md) ||
|| **EVENT_MESSAGE_UPDATE**
[`string`](../data-types.md) | URL обработчика события [ONIMBOTMESSAGEUPDATE](./messages/events/on-imbot-message-update.md) ||
|| **EVENT_MESSAGE_DELETE**
[`string`](../data-types.md) | URL обработчика события [ONIMBOTMESSAGEDELETE](./messages/events/on-imbot-message-delete.md) ||
|| **EVENT_WELCOME_MESSAGE**
[`string`](../data-types.md) | URL обработчика события [ONIMBOTJOINCHAT](./chats/events/on-imbot-join-chat.md) ||
|| **EVENT_BOT_DELETE**
[`string`](../data-types.md) | URL обработчика события [ONIMBOTDELETE](./events/on-imbot-delete.md) ||
|| **PROPERTIES**
[`object`](../data-types.md) | Свойства профиля чат-бота. Структура объекта подробно описана [ниже](#fields-properties) ||
|#

{% note warning "" %}

Метод `imbot.update` не поддерживает изменение полей `TYPE` и `OPENLINE`.

{% endnote %}

### Параметр FIELDS.PROPERTIES {#fields-properties}

#|
|| **Название**
`Тип` | **Описание** ||
|| **NAME**
[`string`](../data-types.md) | Имя чат-бота. Если переданы оба значения: `NAME` и `LAST_NAME`, они не должны быть пустыми одновременно ||
|| **LAST_NAME**
[`string`](../data-types.md) | Фамилия чат-бота. Если переданы оба значения: `NAME` и `LAST_NAME`, они не должны быть пустыми одновременно ||
|| **COLOR**
[`string`](../data-types.md) | Цвет чат-бота для мобильного интерфейса: `RED`, `GREEN`, `MINT`, `LIGHT_BLUE`, `DARK_BLUE`, `PURPLE`, `AQUA`, `PINK`, `LIME`, `BROWN`, `AZURE`, `KHAKI`, `SAND`, `MARENGO`, `GRAY`, `GRAPHITE` ||
|| **EMAIL**
[`string`](../data-types.md) | Email для связи чат-бота. Бот создается как пользователь, поэтому email бота не должен совпадать с email реального пользователя Битрикс24. Это позволит избежать конфликтов учетных записей ||
|| **PERSONAL_BIRTHDAY**
[`string`](../data-types.md) | День рождения в формате `YYYY-MM-DD` ||
|| **WORK_POSITION**
[`string`](../data-types.md) | Должность или описание чат-бота ||
|| **PERSONAL_WWW**
[`string`](../data-types.md) | Ссылка на сайт ||
|| **PERSONAL_GENDER**
[`string`](../data-types.md) | Пол, допустимые значения: `M` или `F` ||
|| **PERSONAL_PHOTO**
[`file`](../data-types.md) | Аватар чат-бота в формате [Base64](../files/how-to-upload-files.md)

Размер изображения не должен превышать ограничение в 5000x5000 ||
|#

{% note info "" %}

Для обновления бота передайте хотя бы один параметр: поле в `FIELDS` или URL обработчика события. Если все параметры пустые, метод вернет ошибку `WRONG_REQUEST`.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"BOT_ID":39,"FIELDS":{"CODE":"newbot_v2","EVENT_HANDLER":"https://example.com/bot/events","PROPERTIES":{"NAME":"UpdatedBot","WORK_POSITION":"Updated description"}}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"BOT_ID":39,"FIELDS":{"CODE":"newbot_v2","EVENT_HANDLER":"https://example.com/bot/events","PROPERTIES":{"NAME":"UpdatedBot"}},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.update
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.update', {
        BOT_ID: 39,
        FIELDS: {
          CODE: 'newbot_v2',
          EVENT_HANDLER: 'https://example.com/bot/events',
          PROPERTIES: {
            NAME: 'UpdatedBot',
            WORK_POSITION: 'Updated description',
          },
        },
      });

      const { result } = response.getData();
      console.log('Updated:', result);
    } catch (error) {
      console.error('Error updating bot:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imbot.update',
                [
                    'BOT_ID' => 39,
                    'FIELDS' => [
                        'CODE' => 'newbot_v2',
                        'EVENT_HANDLER' => 'https://example.com/bot/events',
                        'PROPERTIES' => [
                            'NAME' => 'UpdatedBot',
                            'WORK_POSITION' => 'Updated description',
                        ],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Updated: ' . ($result->data() ? 'true' : 'false');
        }
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error updating bot: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.update',
        {
            BOT_ID: 39,
            FIELDS: {
                CODE: 'newbot_v2',
                EVENT_HANDLER: 'https://example.com/bot/events',
                PROPERTIES: {
                    NAME: 'UpdatedBot',
                    WORK_POSITION: 'Updated description',
                },
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
        'imbot.update',
        [
            'BOT_ID' => 39,
            'FIELDS' => [
                'CODE' => 'newbot_v2',
                'EVENT_HANDLER' => 'https://example.com/bot/events',
                'PROPERTIES' => [
                    'NAME' => 'UpdatedBot',
                    'WORK_POSITION' => 'Updated description',
                ],
            ],
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Updated: ' . ($result['result'] ? 'true' : 'false');
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
[`boolean`](../data-types.md) | `true`, если бот обновлен без ошибки ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "WRONG_REQUEST",
    "error_description": "Update fields can't be empty"
}
```

{% include notitle [Обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `WRONG_AUTH_TYPE` | Access for this method not allowed by session authorization. | Метод вызван с сессионной авторизацией вместо OAuth или вебхука ||
|| `ACCESS_DENIED` | Access denied! Client ID not specified | Не удалось определить приложение: отсутствует `clientId` авторизации и не передан `CLIENT_ID` ||
|| `BOT_ID_ERROR` | Bot not found | Бот не найден ||
|| `APP_ID_ERROR` | Bot was installed by another rest application | Переданный `BOT_ID` принадлежит другому приложению ||
|| `EVENT_MESSAGE_ADD_ERROR` | Wrong handler URL | Передан невалидный URL обработчика `EVENT_MESSAGE_ADD` ||
|| `EVENT_MESSAGE_UPDATE_ERROR` | Wrong handler URL | Передан невалидный URL обработчика `EVENT_MESSAGE_UPDATE` ||
|| `EVENT_MESSAGE_DELETE_ERROR` | Wrong handler URL | Передан невалидный URL обработчика `EVENT_MESSAGE_DELETE` ||
|| `EVENT_WELCOME_MESSAGE_ERROR` | Wrong handler URL | Передан невалидный URL обработчика `EVENT_WELCOME_MESSAGE` ||
|| `EVENT_BOT_DELETE_ERROR` | Wrong handler URL | Передан невалидный URL обработчика `EVENT_BOT_DELETE` ||
|| `NAME_ERROR` | Bot name isn't specified | В `PROPERTIES` переданы оба пустых поля: `NAME` и `LAST_NAME` ||
|| `WRONG_REQUEST` | Update fields can't be empty | Не переданы поля и обработчики для обновления ||
|| `WRONG_REQUEST` | Bot can't be updated | Бот не может быть обновлен ||
|#

{% include [Системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imbot-register.md)
- [{#T}](./imbot-unregister.md)
- [{#T}](./imbot-bot-list.md)
- [{#T}](./events/index.md)