# Создать чат, задачу, пост или событие из сообщения im.message.share

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: участник чата

Метод `im.message.share` создает из сообщения чат, задачу, пост в ленте или событие календаря. Например, из просьбы коллеги в чате можно сразу поставить задачу.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **MESSAGE_ID***
[`integer`](../../data-types.md) | Идентификатор сообщения.

Идентификатор возвращают методы [im.message.add](./im-message-add.md) и [im.dialog.messages.get](./im-dialog-messages-get.md) ||
|| **DIALOG_ID***
[`string`](../../data-types.md) | Идентификатор диалога в формате:

- `chatXXX` — групповой чат, где `XXX` — идентификатор чата
- `sgXXX` — чат группы или проекта, где `XXX` — идентификатор группы
- `XXX` — личный диалог, где `XXX` — идентификатор пользователя

Идентификатор чата вернет метод [im.chat.get](../im-chat-get.md), идентификатор пользователя — методы [user.get](../../user/user-get.md) и [user.search](../../user/user-search.md) ||
|| **TYPE***
[`string`](../../data-types.md) | Тип создаваемого объекта.

Допустимые значения:
- `CHAT` — чат
- `TASK` — задача
- `POST` — пост в ленте
- `CALEND` — событие календаря

Если передать другое значение или не передать параметр, метод вернет `true`, но ничего не создаст ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"MESSAGE_ID":34261,"DIALOG_ID":"chat2941","TYPE":"TASK"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.message.share
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"MESSAGE_ID":34261,"DIALOG_ID":"chat2941","TYPE":"TASK","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.message.share
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
        method: 'im.message.share',
        params: {
          MESSAGE_ID: 34261,
          DIALOG_ID: 'chat2941',
          TYPE: 'TASK',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Request completed:', result)
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
      async function shareMessage() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'im.message.share',
            params: {
              MESSAGE_ID: 34261,
              DIALOG_ID: 'chat2941',
              TYPE: 'TASK',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Request completed:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', shareMessage)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.im.message.share(
            message_id=34261,
            dialog_id="chat2941",
            type="TASK",
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'im.message.share',
                [
                    'MESSAGE_ID' => 34261,
                    'DIALOG_ID' => 'chat2941',
                    'TYPE' => 'TASK'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error sharing message: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.message.share',
        {
            MESSAGE_ID: 34261,
            DIALOG_ID: 'chat2941',
            TYPE: 'TASK'
        },
        function(result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'im.message.share',
        [
            'MESSAGE_ID' => 34261,
            'DIALOG_ID' => 'chat2941',
            'TYPE' => 'TASK'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "im.message.share", b24.Params{
    	"MESSAGE_ID": 34261,
    	"DIALOG_ID":  "chat2941",
    	"TYPE":       "TASK",
    })
    if err != nil {
    	return fmt.Errorf("im.message.share: %w", err)
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
        "start": 1772632079,
        "finish": 1772632079.779834,
        "duration": 0.7798340320587158,
        "processing": 0,
        "date_start": "2026-03-04T16:47:59+03:00",
        "date_finish": "2026-03-04T16:47:59+03:00",
        "operating_reset_at": 1772632679,
        "operating": 0.5939757823944092
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true` — запрос обработан. Метод вернет `true`, даже когда объект не создан из-за неверного `TYPE`.

Идентификатор созданного объекта метод не возвращает. Найти объект можно по системному сообщению, которое приходит в чат после вызова. Это сообщение возвращает метод [im.dialog.messages.get](./im-dialog-messages-get.md). У задачи, поста и события ссылка на объект есть в тексте сообщения, у нового чата идентификатор передается в поле `params.CHAT_ID` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "PARAMS_ERROR",
    "error_description": "Incorrect params"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `MESSAGE_ID_ERROR` | Message ID can't be empty | Параметр `MESSAGE_ID` не передан или передан в неверном формате ||
|| `400` | `DIALOG_ID_EMPTY` | Dialog ID can't be empty | Параметр `DIALOG_ID` не передан или передан в неверном формате ||
|| `400` | `PARAMS_ERROR` | Incorrect params | Объект не создан: сообщение не найдено, у пользователя нет права публиковать в ленте группы, пользователь внешний (экстранет) или создание завершилось ошибкой ||
|| `403` | `ACCESS_ERROR` | You do not have access to the specified dialog | Чат не найден или у текущего пользователя нет к нему доступа ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-message-add.md)
- [{#T}](./im-message-update.md)
- [{#T}](./im-message-delete.md)
- [{#T}](./im-message-like.md)
- [{#T}](./im-message-command.md)
- [{#T}](./im-dialog-messages-get.md)
- [{#T}](./im-dialog-messages-search.md)
- [{#T}](./im-dialog-read.md)
- [{#T}](./im-dialog-unread.md)
- [{#T}](./im-dialog-writing.md)
