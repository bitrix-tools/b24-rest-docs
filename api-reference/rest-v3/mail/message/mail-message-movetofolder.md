# Переместить письма в папку mail.message.movetofolder

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`mail`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к почтовому ящику, где находятся письма

Метод `mail.message.movetofolder` перемещает письма в папку, спам или корзину.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **messageIds***
[`array`](../../../data-types.md) | Массив идентификаторов писем.

Идентификаторы можно получить методом [mail.message.list](./mail-message-list.md).

Передавайте в одном запросе письма только из одной папки и одного почтового ящика ||
|| **action***
[`string`](../../../data-types.md) | Действие для писем:

- `move` — переместить в папку, указанную в `folder`
- `spam` — переместить в спам
- `delete` — переместить в корзину ||
|| **folder**
[`string`](../../../data-types.md) | Имя или путь существующей папки в этом почтовом ящике.

Обязательно для действия `move` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/mail.message.movetofolder`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"messageIds":[15,16],"action":"spam"}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/mail.message.movetofolder
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"messageIds":[15,16],"action":"spam","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/mail.message.movetofolder
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type MoveToFolderResult = {
      success: boolean
      movedCount: number
      action: string
    }

    try {
      const response = await $b24.actions.v3.call.make<MoveToFolderResult>({
        method: 'mail.message.movetofolder',
        params: {
          messageIds: [15, 16],
          action: 'spam',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Moved count:', result.movedCount, 'Action:', result.action, 'Success:', result.success)
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
      async function moveToFolder() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'mail.message.movetofolder',
            params: {
              messageIds: [15, 16],
              action: 'spam',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Moved count:', result.movedCount, 'Action:', result.action, 'Success:', result.success)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', moveToFolder)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'mail.message.movetofolder',
                [
                    'messageIds' => [15, 16],
                    'action' => 'spam'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'mail.message.movetofolder',
        {
            messageIds: [15, 16],
            action: 'spam'
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'mail.message.movetofolder',
        [
            'messageIds' => [15, 16],
            'action' => 'spam'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "success": true,
        "movedCount": 2,
        "action": "spam"
    },
    "time": {
        "start": 1779819678,
        "finish": 1779819678.84803,
        "duration": 0.8480300903320312,
        "processing": 0,
        "date_start": "2026-05-26T21:21:18+03:00",
        "date_finish": "2026-05-26T21:21:18+03:00",
        "operating_reset_at": 1779820278,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с результатом перемещения ||
|| **success**
[`boolean`](../../../data-types.md) | Признак успешного выполнения операции ||
|| **movedCount**
[`integer`](../../../data-types.md) | Количество обработанных писем ||
|| **action**
[`string`](../../../data-types.md) | Выполненное действие ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Обязательное поле не указано",
                "field": "messageIds"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `messageIds` | Обязательное поле не указано | Передайте `messageIds` в теле запроса ||
|| `messageIds` | Выберите письма из одной папки | Передавайте в одном запросе письма только из одной папки ||
|| `folder` | Параметр `folder` обязателен при `action=move` | Передайте `folder` или используйте `action=spam` / `action=delete` ||
|| `action` | Параметр `action` должен быть `move`, `spam` или `delete` | Передайте одно из допустимых значений ||
|| `messageIds` | No accessible messages found | Передайте существующие идентификаторы писем, к которым у пользователя есть доступ ||
|| `messageIds` | All messages must belong to the same mailbox | Передавайте в запросе письма только из одного почтового ящика ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя и scope `mail` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./mail-message-list.md)
- [{#T}](./mail-message-get.md)
