# Отправить push-уведомление на мобильное устройство приложения pull.application.push.add

> Scope: [`pull`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `pull.application.push.add` отправляет push-уведомление на мобильное устройство в рамках приложения.

{% note info "" %}

Метод работает только в контексте [приложения](../../app-installation/index.md).

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **USER_ID**
[`integer`](../../../api-reference/data-types.md) \| [`integer[]`](../../../api-reference/data-types.md) | Идентификатор пользователя или массив идентификаторов пользователей, которым отправляется push-уведомление.

`USER_ID` можно получить:
- методом [user.get](../../../api-reference/user/user-get.md)
- методом [user.current](../../../api-reference/user/user-current.md) для текущего пользователя ||
|| **TEXT**^*^
[`string`](../../../api-reference/data-types.md) | Текст push-уведомления ||
|| **AVATAR**
[`string`](../../../api-reference/data-types.md) | URL изображения для push-уведомления ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример отправки push-уведомления пользователям приложения, где:
- `USER_ID` — идентификатор пользователя или массив идентификаторов пользователей
- `TEXT` — текст push-уведомления
- `AVATAR` — URL изображения для push-уведомления

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "USER_ID": [1, 2, 3],
        "TEXT": "Hello, world!",
        "AVATAR": "https://example.com/images/avatar.png",
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/pull.application.push.add.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'pull.application.push.add',
    		{
    			USER_ID: [1, 2, 3],
    			TEXT: 'Hello, world!',
    			AVATAR: 'https://example.com/images/avatar.png'
    		}
    	);

    	const result = response.getData().result;
    	console.info(result);
    }
    catch (error)
    {
    	console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'pull.application.push.add',
                [
                    'USER_ID' => [1, 2, 3],
                    'TEXT' => 'Hello, world!',
                    'AVATAR' => 'https://example.com/images/avatar.png',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error sending push notification: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'pull.application.push.add',
        {
            USER_ID: [1, 2, 3],
            TEXT: 'Hello, world!',
            AVATAR: 'https://example.com/images/avatar.png'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    $result = CRest::call(
        'pull.application.push.add',
        [
            'USER_ID' => [1, 2, 3],
            'TEXT' => 'Hello, world!',
            'AVATAR' => 'https://example.com/images/avatar.png',
        ]
    );

    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1743495945,
        "finish": 1743495945.285066,
        "duration": 0.2850658893585205,
        "processing": 0.008597135543823242,
        "date_start": "2025-04-01T11:52:25+03:00",
        "date_finish": "2025-04-01T11:52:25+03:00",
        "operating_reset_at": 1743496545,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../api-reference/data-types.md) | Признак успешного выполнения метода ||
|| **time**
[`time`](../../../api-reference/data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Send push notifications available only for application authorization."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Send push notifications available only for application authorization. | Вызов метода не из контекста авторизации приложения ||
|| `400` | `ACCESS_ERROR` | You do not have access to send push notifications | Пользователь без прав администратора пытается отправить push-уведомление ||
|| `400` | `TEXT_ERROR` | Text can't be empty | Не передан `TEXT` или передано пустое значение ||
|| `400` | `EMPTY_APP_NAME` | For send push-notification application name can't be empty | У приложения не заполнено название ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](../../interactivity/index.md)
- [{#T}](./pull-application-event-add.md)
- [{#T}](./pull-application-config-get.md)
