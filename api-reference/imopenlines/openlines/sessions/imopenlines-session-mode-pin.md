# Закрепить или открепить диалог imopenlines.session.mode.pin

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правами на диалог

Метод `imopenlines.session.mode.pin` закрепляет или открепляет диалог за текущим оператором.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID***
[`integer`](../../../data-types.md) | Идентификатор чата открытой линии. 

Идентификатор можно получить методом [imopenlines.session.open](./imopenlines-session-open.md) или [imopenlines.dialog.get](./imopenlines-dialog-get.md) ||
|| **ACTIVATE**
[`string`](../../../data-types.md) | Флаг закрепления:
- `Y` — закрепить
- `N` — открепить
  
По умолчанию используется `Y` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"CHAT_ID":2043,"ACTIVATE":"Y"}' \
      https://your-domain.bitrix24.ru/rest/1/webhook_key/imopenlines.session.mode.pin.json
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"CHAT_ID":2043,"ACTIVATE":"Y","auth":"<access_token>"}' \
      https://your-domain.bitrix24.ru/rest/imopenlines.session.mode.pin.json
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod(
            'imopenlines.session.mode.pin',
            {
                CHAT_ID: 2043,
                ACTIVATE: 'Y',
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
                'imopenlines.session.mode.pin',
                [
                    'CHAT_ID' => 2043,
                    'ACTIVATE' => 'Y',
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
        echo 'Error setting pin mode: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imopenlines.session.mode.pin',
        {
            CHAT_ID: 2043,
            ACTIVATE: 'Y',
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
        'imopenlines.session.mode.pin',
        [
            'CHAT_ID' => 2043,
            'ACTIVATE' => 'Y',
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
        "start": 1773670900,
        "finish": 1773670900.415268,
        "duration": 0.4152679443359375,
        "processing": 0,
        "date_start": "2026-03-16T17:21:40+03:00",
        "date_finish": "2026-03-16T17:21:40+03:00",
        "operating_reset_at": 1773671500,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Возвращает `true`, если диалог успешно закреплен или откреплен ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "CHAT_ID_EMPTY",
    "error_description": "Chat ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `CHAT_ID_EMPTY` | Chat ID can't be empty | Не передан `CHAT_ID` ||
|| `400` | `CHAT_ID` | Указан не корректный идентификатор чата | Передан пустой или некорректный `CHAT_ID` ||
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
- [{#T}](./imopenlines-session-mode-pin-all.md)
- [{#T}](./imopenlines-session-mode-unpin-all.md)
- [{#T}](./imopenlines-session-mode-silent.md)
- [{#T}](./imopenlines-session-head-vote.md)
- [{#T}](./imopenlines-message-session-start.md)
- [{#T}](./imopenlines-crm-lead-create.md)
- [{#T}](./imopenlines-dialog-get.md)
