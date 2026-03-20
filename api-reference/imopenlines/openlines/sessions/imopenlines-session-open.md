# Получить чат по коду пользователя imopenlines.session.open

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом на доступ к диалогу

Метод `imopenlines.session.open` возвращает идентификатор чата открытой линии по коду пользователя `USER_CODE`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **USER_CODE***
[`string`](../../../data-types.md) | Строковый код пользователя для канала внешней системы. 

Формат кода: ```<connector>|<LINE_ID>|<CONNECTOR_CHAT_ID>|<CONNECTOR_USER_ID>```, где:
- `<connector>` — идентификатор коннектора: `livechat`, `telegram` и другие
- `<LINE_ID>` — идентификатор открытой линии
- `<CONNECTOR_CHAT_ID>` — идентификатор чата в канале
- `<CONNECTOR_USER_ID>` — идентификатор пользователя в канале

Значение можно получить методом [imopenlines.dialog.get](./imopenlines-dialog-get.md) из поля `entity_id` или методом [imopenlines.session.history.get](./imopenlines-session-history-get.md) из `result.chat.<chatId>.entityId` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"USER_CODE":"livechat|22|1761|587"}' \
      https://your-domain.bitrix24.ru/rest/1/webhook_key/imopenlines.session.open.json
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"USER_CODE":"livechat|22|1761|587","auth":"<access_token>"}' \
      https://your-domain.bitrix24.ru/rest/imopenlines.session.open.json
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod(
            'imopenlines.session.open',
            {
                USER_CODE: 'livechat|22|1761|587',
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
                'imopenlines.session.open',
                [
                    'USER_CODE' => 'livechat|22|1761|587',
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
        echo 'Error opening chat: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imopenlines.session.open',
        {
            USER_CODE: 'livechat|22|1761|587',
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
        'imopenlines.session.open',
        [
            'USER_CODE' => 'livechat|22|1761|587',
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
    "result": {
        "chatId": "1763"
    },
    "time": {
        "start": 1773666416,
        "finish": 1773666416.279787,
        "duration": 0.2797870635986328,
        "processing": 0,
        "date_start": "2026-03-16T16:06:56+03:00",
        "date_finish": "2026-03-16T16:06:56+03:00",
        "operating_reset_at": 1773667016,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой объект ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **chatId**
[`integer`](../../../data-types.md) | Идентификатор чата открытой линии ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Вы не можете открыть этот разговор, т.к. у вас недостаточно прав"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ACCESS_DENIED` | Вы не можете открыть этот разговор, т.к. у вас недостаточно прав | Нет доступа к чату по указанному `USER_CODE` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imopenlines-session-start.md)
- [{#T}](./imopenlines-session-join.md)
- [{#T}](./imopenlines-session-history-get.md)
- [{#T}](./imopenlines-session-intercept.md)
- [{#T}](./imopenlines-session-mode-pin.md)
- [{#T}](./imopenlines-session-mode-pin-all.md)
- [{#T}](./imopenlines-session-mode-unpin-all.md)
- [{#T}](./imopenlines-session-mode-silent.md)
- [{#T}](./imopenlines-session-head-vote.md)
- [{#T}](./imopenlines-message-session-start.md)
- [{#T}](./imopenlines-crm-lead-create.md)
- [{#T}](./imopenlines-dialog-get.md)
