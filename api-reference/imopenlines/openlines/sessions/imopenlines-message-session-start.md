# Начать новый диалог на основании сообщения imopenlines.message.session.start

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правами на диалог

Метод `imopenlines.message.session.start` запускает новую сессию и переносит в нее указанное сообщение.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID***
[`integer`](../../../data-types.md) | Идентификатор чата открытой линии. 

Идентификатор можно получить методом [imopenlines.session.open](./imopenlines-session-open.md) или [imopenlines.dialog.get](./imopenlines-dialog-get.md) ||
|| **MESSAGE_ID***
[`integer`](../../../data-types.md) | Идентификатор сообщения внутри чата. 

Идентификатор можно получить методом [imopenlines.session.history.get](./imopenlines-session-history-get.md) в ключах объекта `message` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"CHAT_ID":2043,"MESSAGE_ID":18971}' \
      https://your-domain.bitrix24.ru/rest/1/webhook_key/imopenlines.message.session.start.json
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"CHAT_ID":2043,"MESSAGE_ID":18971,"auth":"<access_token>"}' \
      https://your-domain.bitrix24.ru/rest/imopenlines.message.session.start.json
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod(
            'imopenlines.message.session.start',
            {
                CHAT_ID: 2043,
                MESSAGE_ID: 18971,
            }
        );

        const { result } = response.getData();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imopenlines.message.session.start',
                [
                    'CHAT_ID' => 2043,
                    'MESSAGE_ID' => 18971,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error starting session from message: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imopenlines.message.session.start',
        {
            CHAT_ID: 2043,
            MESSAGE_ID: 18971,
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
        'imopenlines.message.session.start',
        [
            'CHAT_ID' => 2043,
            'MESSAGE_ID' => 18971,
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Success: ' . print_r($result['result'], true);
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1773682918,
        "finish": 1773682919.022549,
        "duration": 1.0225489139556885,
        "processing": 1,
        "date_start": "2026-03-16T20:41:58+03:00",
        "date_finish": "2026-03-16T20:41:59+03:00",
        "operating_reset_at": 1773683518,
        "operating": 0.14626193046569824
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Возвращает `true`, если новая сессия запущена на основании сообщения ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "CHAT_ID",
    "error_description": "Указан не корректный идентификатор чата"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `CHAT_ID` | Указан не корректный идентификатор чата | Пустой или некорректный `CHAT_ID` ||
|| `400` | `CHAT_TYPE` | Указанный чат не является открытой линией | Указанный чат не относится к открытым линиям ||
|| `400` | `ACCESS_DENIED` | Вы не можете открыть этот разговор, т.к. у вас недостаточно прав | У текущего пользователя нет доступа к диалогу ||
|| `400` | `USER_ID` | Указан не корректный идентификатор пользователя | Не определен пользователь, от имени которого выполняется метод ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imopenlines-session-open.md)
- [{#T}](./imopenlines-session-start.md)
- [{#T}](./imopenlines-session-join.md)
- [{#T}](./imopenlines-session-history-get.md)
- [{#T}](./imopenlines-session-intercept.md)
- [{#T}](./imopenlines-session-mode-pin.md)
- [{#T}](./imopenlines-session-mode-pin-all.md)
- [{#T}](./imopenlines-session-mode-unpin-all.md)
- [{#T}](./imopenlines-session-mode-silent.md)
- [{#T}](./imopenlines-session-head-vote.md)
- [{#T}](./imopenlines-crm-lead-create.md)
- [{#T}](./imopenlines-dialog-get.md)
