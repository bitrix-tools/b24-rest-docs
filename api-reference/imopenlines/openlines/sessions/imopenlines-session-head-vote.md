# Поставить оценку работе сотрудника в диалоге imopenlines.session.head.vote

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: руководитель, у которого есть право оценки в настройках линии

Метод `imopenlines.session.head.vote` сохраняет оценку руководителя и комментарий по завершенному диалогу.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **SESSION_ID***
[`integer`](../../../data-types.md) | Идентификатор сессии. 

Идентификатор можно получить методом [imopenlines.session.history.get](./imopenlines-session-history-get.md) в поле `sessionId` ||
|| **RATING**
[`integer`](../../../data-types.md) | Оценка руководителя. Передайте значение от `1` до `5` ||
|| **COMMENT**
[`string`](../../../data-types.md) | Комментарий руководителя к оценке ||
|#

{% note info "" %}

Необходимо передать хотя бы один из параметров: `RATING` или `COMMENT`.

{% endnote %} 

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"SESSION_ID":1743,"RATING":5,"COMMENT":"Отличная обработка"}' \
      https://your-domain.bitrix24.ru/rest/1/webhook_key/imopenlines.session.head.vote.json
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"SESSION_ID":1743,"RATING":5,"COMMENT":"Отличная обработка","auth":"<access_token>"}' \
      https://your-domain.bitrix24.ru/rest/imopenlines.session.head.vote.json
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
        method: 'imopenlines.session.head.vote',
        params: {
          SESSION_ID: 1743,
          RATING: 5,
          COMMENT: 'Excellent handling',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Vote saved:', result)
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
      async function submitHeadVote() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'imopenlines.session.head.vote',
            params: {
              SESSION_ID: 1743,
              RATING: 5,
              COMMENT: 'Excellent handling',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Vote saved:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', submitHeadVote)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imopenlines.session.head.vote',
                [
                    'SESSION_ID' => 1743,
                    'RATING' => 5,
                    'COMMENT' => 'Отличная обработка',
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
        echo 'Error voting as head: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imopenlines.session.head.vote',
        {
            SESSION_ID: 1743,
            RATING: 5,
            COMMENT: 'Отличная обработка',
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
        'imopenlines.session.head.vote',
        [
            'SESSION_ID' => 1743,
            'RATING' => 5,
            'COMMENT' => 'Отличная обработка',
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
        "start": 1773681878,
        "finish": 1773681878.850923,
        "duration": 0.8509230613708496,
        "processing": 0,
        "date_start": "2026-03-16T20:24:38+03:00",
        "date_finish": "2026-03-16T20:24:38+03:00",
        "operating_reset_at": 1773682478,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Возвращает `true`, если оценка сохранена ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "EMPTY_VOTE_PARAMS",
    "error_description": "At least one of the parameters RATING or COMMENT must be specified"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `EMPTY_SESSION_ID` | Session ID can't be empty | Не передан `SESSION_ID` или значение `<= 0` ||
|| `400` | `EMPTY_VOTE_PARAMS` | At least one of the parameters RATING or COMMENT must be specified | Не переданы одновременно `RATING` и `COMMENT` ||
|| `400` | `ACCESS_DENIED` | Вы не можете открыть этот разговор, т.к. у вас недостаточно прав | Текущий пользователь не может оценить указанную сессию ||
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
- [{#T}](./imopenlines-message-session-start.md)
- [{#T}](./imopenlines-crm-lead-create.md)
- [{#T}](./imopenlines-dialog-get.md)
