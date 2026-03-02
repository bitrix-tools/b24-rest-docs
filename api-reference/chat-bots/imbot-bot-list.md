# Получить список чат-ботов imbot.bot.list

> Scope: [`imbot`](../scopes/permissions.md)
>
> Кто может выполнять метод: авторизованный пользователь приложения

Метод `imbot.bot.list` возвращает список зарегистрированных чат-ботов.

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.bot.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.bot.list
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.bot.list', {});
      const { result } = response.getData();
      console.log('Bots:', result);
    } catch (error) {
      console.error('Error getting bot list:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call('imbot.bot.list', []);

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            print_r($result->data());
        }
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error getting bot list: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.bot.list',
        {},
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

    $result = CRest::call('imbot.bot.list', []);

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        print_r($result['result']);
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": {
        "39": {
            "ID": 39,
            "NAME": "NewBot",
            "CODE": "newbot",
            "OPENLINE": "N"
        }
    },
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
[`object`](../data-types.md) | Объект, где ключ верхнего уровня равен `BOT_ID`, а значение содержит данные бота. Структура элемента подробно описана [ниже](#bot-item) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Элемент \{BOT_ID\} {#bot-item}

#|
|| **Название**
`Тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор чат-бота ||
|| **NAME**
[`string`](../data-types.md) | Полное имя чат-бота ||
|| **CODE**
[`string`](../data-types.md) | Код чат-бота ||
|| **OPENLINE**
[`string`](../data-types.md) | Признак поддержки открытых линий: `Y` или `N` ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Access for this method not allowed by session authorization."
}
```

{% include notitle [Обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `WRONG_AUTH_TYPE` | Access for this method not allowed by session authorization. | Метод вызван с сессионной авторизацией вместо OAuth или вебхука ||
|#

{% include [Системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imbot-register.md)
- [{#T}](./imbot-update.md)
- [{#T}](./imbot-unregister.md)