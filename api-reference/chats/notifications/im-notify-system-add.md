# Отправить системное уведомление im.notify.system.add

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.notify.system.add` отправляет системное уведомление пользователю.

{% note info "" %}

Метод доступен только при вызове через приложение.

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **USER_ID***
[`integer`](../../data-types.md) | Идентификатор пользователя-получателя уведомления. 

Получить идентификатор пользователя можно методами [user.get](../../user/user-get.md), [user.search](../../user/user-search.md) или [im.user.get](../users/im-user-get.md) ||
|| **MESSAGE***
[`string`](../../data-types.md) | Текст уведомления. Метод удаляет пробелы по краям строки перед отправкой ||
|| **MESSAGE_OUT**
[`string`](../../data-types.md) | Текст уведомления для внешних каналов, например, почты ||
|| **TAG**
[`string`](../../data-types.md) | Уникальный тег уведомления в рамках приложения. При добавлении уведомления с существующим тегом другие уведомления будут удалены. Передавайте с `CLIENT_ID` при вызове через вебхук ||
|| **SUB_TAG**
[`string`](../../data-types.md) | Дополнительный тег уведомления без проверки уникальности. Передавайте с `CLIENT_ID` при вызове через вебхук ||
|| **ATTACH**
[`object`](../../data-types.md) 
[`string`](../../data-types.md) | Вложение уведомления в формате объекта или JSON-строки. Подробнее смотрите в разделе [Вложения](../messages/attachments.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"USER_ID":5,"MESSAGE":"Системное уведомление","MESSAGE_OUT":"Системное уведомление для email","TAG":"SYSTEM_EVENT_42","SUB_TAG":"SYSTEM_EVENT|42"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.notify.system.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"USER_ID":5,"MESSAGE":"Системное уведомление","MESSAGE_OUT":"Системное уведомление для email","TAG":"SYSTEM_EVENT_42","SUB_TAG":"SYSTEM_EVENT|42","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.notify.system.add
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('im.notify.system.add', {
        USER_ID: 5,
        MESSAGE: 'Системное уведомление',
        MESSAGE_OUT: 'Системное уведомление для email',
        TAG: 'SYSTEM_EVENT_42',
        SUB_TAG: 'SYSTEM_EVENT|42',
      });

      const { result } = response.getData();
      console.log('Notification ID:', result);
    } catch (error) {
      console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service->core->call(
            'im.notify.system.add',
            [
                'USER_ID' => 5,
                'MESSAGE' => 'Системное уведомление',
                'MESSAGE_OUT' => 'Системное уведомление для email',
                'TAG' => 'SYSTEM_EVENT_42',
                'SUB_TAG' => 'SYSTEM_EVENT|42',
            ]
        );

        $result = $response->getResponseData()->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Notification ID: ' . $result->data();
        }
    } catch (Throwable $exception) {
        echo $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.notify.system.add',
        {
            USER_ID: 5,
            MESSAGE: 'Системное уведомление',
            MESSAGE_OUT: 'Системное уведомление для email',
            TAG: 'SYSTEM_EVENT_42',
            SUB_TAG: 'SYSTEM_EVENT|42',
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
        'im.notify.system.add',
        [
            'USER_ID' => 5,
            'MESSAGE' => 'Системное уведомление',
            'MESSAGE_OUT' => 'Системное уведомление для email',
            'TAG' => 'SYSTEM_EVENT_42',
            'SUB_TAG' => 'SYSTEM_EVENT|42',
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Notification ID: ' . $result['result'];
    }
    ```
{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": 12345,
    "time": {
        "start": 1760000000.0,
        "finish": 1760000000.1,
        "duration": 0.1,
        "processing": 0.04,
        "date_start": "2026-03-02T09:30:00+03:00",
        "date_finish": "2026-03-02T09:30:00+03:00",
        "operating_reset_at": 1760030000,
        "operating": 0
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) 
[`boolean`](../../data-types.md) | Идентификатор созданного уведомления. Если уведомление не создано, может вернуться `false` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "USER_ID_EMPTY",
    "error_description": "User ID can't be empty"
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `WRONG_AUTH_TYPE` | Access for this method not allowed by session authorization. | Метод вызван с сессионной авторизацией, для которой он запрещен ||
|| `USER_ID_EMPTY` | User ID can't be empty | Параметр `USER_ID` не передан или `USER_ID <= 0` ||
|| `MESSAGE_EMPTY` | Message can't be empty | Не передан текст сообщения ||
|| `ATTACH_OVERSIZE` | You have exceeded the maximum allowable size of attach | Превышен допустимый размер вложения `ATTACH` — 30 Кб ||
|| `ATTACH_ERROR` | Incorrect attach params | Передан некорректный формат вложения `ATTACH` ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-notify.md)
- [{#T}](./im-notify-personal-add.md)
- [{#T}](./im-notify-get.md)
- [{#T}](./im-notify-schema-get.md)
- [{#T}](./im-notify-read-list.md)
- [{#T}](./im-notify-read.md)
- [{#T}](./im-notify-read-all.md)
- [{#T}](./im-notify-answer.md)
- [{#T}](./im-notify-confirm.md)
- [{#T}](./im-notify-delete.md)
- [{#T}](./im-notify-history-search.md)

