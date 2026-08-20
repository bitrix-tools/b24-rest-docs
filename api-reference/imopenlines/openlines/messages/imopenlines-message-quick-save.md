# Сохранить сообщение в качестве быстрого ответа imopenlines.message.quick.save

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор или оператор открытой линии

Метод `imopenlines.message.quick.save` сохраняет сообщение из чата открытой линии в список быстрых ответов.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

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

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'imopenlines.message.quick.save',
        params: {
          CHAT_ID: 1331,
          MESSAGE_ID: 83507,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Saved to quick answers:', result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function saveQuickAnswer() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'imopenlines.message.quick.save',
            params: {
              CHAT_ID: 1331,
              MESSAGE_ID: 83507,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Saved to quick answers:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', saveQuickAnswer)
    </script>
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "imopenlines.message.quick.save", b24.Params{
    	"CHAT_ID":    1331,
    	"MESSAGE_ID": 83507,
    })
    if err != nil {
    	return fmt.Errorf("imopenlines.message.quick.save: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

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

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `CHAT_ID` | Указан не корректный идентификатор чата | Пустой или некорректный `CHAT_ID` ||
|| `400` | `CHAT_TYPE` | Указанный чат не является открытой линией | Указанный чат не относится к открытым линиям ||
|| `400` | `CANT_SAVE_QUICK_ANSWER` | Ошибка сохранения быстрого ответа | Сообщение `MESSAGE_ID` не удалось сохранить в быстрые ответы ||
|| `400` | `ACCESS_DENIED` | Вы не можете открыть этот разговор, т.к. у вас недостаточно прав | У текущего пользователя нет доступа к диалогу ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imopenlines-crm-message-add.md)
