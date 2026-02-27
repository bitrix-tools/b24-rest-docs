# Удалить чат-бота imbot.unregister

> Scope: [`imbot`](../scopes/permissions.md)
>
> Кто может выполнять метод: авторизованный пользователь приложения, которое зарегистрировало чат-бота

Метод `imbot.unregister` удаляет чат-бота.

{% note warning "" %}

При удалении бота личные чаты с пользователями удаляются.

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **BOT_ID***
[`integer`](../data-types.md) | Идентификатор чат-бота. Значение должно быть больше `0`.

Получить идентификатор бота можно методом [imbot.bot.list](./imbot-bot-list.md) ||
|| **CLIENT_ID**
[`string`](../data-types.md) | Технический параметр для сценариев без `clientId` в авторизации. Если передан, используется как `custom{CLIENT_ID}` для определения приложения ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"BOT_ID":39}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.unregister
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"BOT_ID":39,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.unregister
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.unregister', {
        BOT_ID: 39,
      });

      const { result } = response.getData();
      console.log('Unregistered:', result);
    } catch (error) {
      console.error('Error unregistering bot:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imbot.unregister',
                [
                    'BOT_ID' => 39,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Unregistered: ' . ($result->data() ? 'true' : 'false');
        }
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error unregistering bot: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.unregister',
        {
            BOT_ID: 39,
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
        'imbot.unregister',
        [
            'BOT_ID' => 39,
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Unregistered: ' . ($result['result'] ? 'true' : 'false');
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
[`boolean`](../data-types.md) | `true`, если чат-бот удален без ошибки ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "BOT_ID_ERROR",
    "error_description": "Bot not found"
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
|| `WRONG_REQUEST` | Bot can't be deleted | Бот не может быть удален ||
|#

{% include [Системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imbot-register.md)
- [{#T}](./imbot-update.md)
- [{#T}](./imbot-bot-list.md)
- [{#T}](./events/index.md)
