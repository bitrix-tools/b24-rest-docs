# Сохранить сообщение в качестве быстрого ответа imopenlines.message.quick.save

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор или оператор открытой линии

Метод `imopenlines.message.quick.save` сохраняет сообщение из чата открытой линии в список быстрых ответов.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **CHAT_ID***
[`integer`](../../../data-types.md) | Идентификатор чата открытой линии, из которого нужно сохранить сообщение.

Идентификатор чата можно получить с помощью метода [imopenlines.dialog.get](../sessions/imopenlines-dialog-get.md) или [imopenlines.session.open](../sessions/imopenlines-session-open.md) ||
|| **MESSAGE_ID***
[`integer`](../../../data-types.md) | Идентификатор сообщения, которое нужно добавить в быстрые ответы.

Идентификатор сообщения можно получить с помощью метода [imopenlines.session.history.get](../sessions/imopenlines-session-history-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":1331,"MESSAGE_ID":83507}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.message.quick.save
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":1331,"MESSAGE_ID":83507,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/imopenlines.message.quick.save
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod(
        'imopenlines.message.quick.save',
        {
          CHAT_ID: 1331,
          MESSAGE_ID: 83507,
        }
      );

      const { result } = response.getData();
      console.log('Saved to quick answers:', result);
    } catch (error) {
      console.error('Error saving quick answer:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imopenlines.message.quick.save',
                [
                    'CHAT_ID'    => 1331,
                    'MESSAGE_ID' => 83507,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Saved to quick answers: ' . var_export($result->data(), true);
        }
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error saving quick answer: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imopenlines.message.quick.save',
        {
            CHAT_ID: 1331,
            MESSAGE_ID: 83507,
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
        'imopenlines.message.quick.save',
        [
            'CHAT_ID'    => 1331,
            'MESSAGE_ID' => 83507,
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Saved to quick answers: ' . var_export($result['result'], true);
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": true,
    "time": {
        "start": 1728626400.456,
        "finish": 1728626400.539,
        "duration": 0.083,
        "processing": 0.031,
        "date_start": "2024-10-11T10:00:00+03:00",
        "date_finish": "2024-10-11T10:00:00+03:00",
        "operating": 0
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Содержит `true` при успешном сохранении в быстрые ответы ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "CANT_SAVE_QUICK_ANSWER",
    "error_description": "Ошибка сохранения быстрого ответа"
}
```

{% include notitle [Обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные ошибки

#|
|| **Код** | **Описание** ||
|| `CHAT_ID` | Указан некорректный идентификатор чата ||
|| `CHAT_TYPE` | Указанный чат не является открытой линией ||
|| `CANT_SAVE_QUICK_ANSWER` | Ошибка сохранения быстрого ответа ||
|| `ACCESS_DENIED` | Недостаточно прав, чтобы открыть указанный чат ||
|#

{% include [Системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imopenlines-crm-message-add.md)