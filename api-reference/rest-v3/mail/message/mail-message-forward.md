# Переслать письмо mail.message.forward

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`mail`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к почтовому ящику, где находится письмо

Метод `mail.message.forward` пересылает письмо.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **forwardMessageId***
[`integer`](../../../data-types.md) | Идентификатор письма, которое нужно переслать.

Идентификатор можно получить методом [mail.message.list](./mail-message-list.md) ||
|| **from***
[`string`](../../../data-types.md) | E-mail отправителя.

Доступные адреса можно получить методом [mail.mailbox.senders](../mailbox/mail-mailbox-senders.md) ||
|| **to***
[`array`](../../../data-types.md) | Массив email-адресов получателей ||
|| **subject***
[`string`](../../../data-types.md) | Тема письма ||
|| **body***
[`string`](../../../data-types.md) | Текст письма: обычный текст или базовый HTML ||
|| **cc**
[`array`](../../../data-types.md) | Массив email-адресов получателей копии ||
|| **bcc**
[`array`](../../../data-types.md) | Массив email-адресов получателей скрытой копии ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/mail.message.forward`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"forwardMessageId":15,"from":"user@example.com","to":["manager@example.com"],"subject":"Fwd: Договор","body":"Пересылаю письмо."}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/mail.message.forward
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"forwardMessageId":15,"from":"user@example.com","to":["manager@example.com"],"subject":"Fwd: Договор","body":"Пересылаю письмо.","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/mail.message.forward
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ForwardResult = {
      success: boolean
      to: string[]
    }

    try {
      const response = await $b24.actions.v3.call.make<ForwardResult>({
        method: 'mail.message.forward',
        params: {
          forwardMessageId: 15,
          from: 'user@example.com',
          to: ['manager@example.com'],
          subject: 'Fwd: Contract',
          body: 'Forwarding the message.',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Forwarded successfully:', result.success, 'To:', result.to)
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
      async function forwardMessage() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'mail.message.forward',
            params: {
              forwardMessageId: 15,
              from: 'user@example.com',
              to: ['manager@example.com'],
              subject: 'Fwd: Contract',
              body: 'Forwarding the message.',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Forwarded successfully:', result.success, 'To:', result.to)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', forwardMessage)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'mail.message.forward',
                [
                    'forwardMessageId' => 15,
                    'from' => 'user@example.com',
                    'to' => ['manager@example.com'],
                    'subject' => 'Fwd: Договор',
                    'body' => 'Пересылаю письмо.'
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
        'mail.message.forward',
        {
            forwardMessageId: 15,
            from: 'user@example.com',
            to: ['manager@example.com'],
            subject: 'Fwd: Договор',
            body: 'Пересылаю письмо.'
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
        'mail.message.forward',
        [
            'forwardMessageId' => 15,
            'from' => 'user@example.com',
            'to' => ['manager@example.com'],
            'subject' => 'Fwd: Договор',
            'body' => 'Пересылаю письмо.'
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
        "to": [
            "manager@example.com"
        ]
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
[`object`](../../../data-types.md) | Объект с результатом отправки ||
|| **success**
[`boolean`](../../../data-types.md) | Признак успешной отправки ||
|| **to**
[`array`](../../../data-types.md) | Получатели, которым отправлено письмо ||
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
                "message": "Обязательное поле `forwardMessageId` не указано",
                "field": "forwardMessageId"
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
|| `forwardMessageId` | Обязательное поле `forwardMessageId` не указано | Передайте `forwardMessageId` в теле запроса ||
|| `from` | Обязательное поле `from` не указано | Передайте `from` в теле запроса ||
|| `to` | Обязательное поле `to` не указано | Передайте `to` в теле запроса ||
|| `subject` | Обязательное поле `subject` не указано | Передайте `subject` в теле запроса ||
|| `body` | Обязательное поле `body` не указано | Передайте `body` в теле запроса ||
|| `forwardMessageId` | MESSAGE_FORWARD_FAILED | Проверьте существование письма и доступ к нему, затем повторите запрос ||
|| `to` | NO_RECIPIENTS | Проверьте, что массив `to` содержит корректные адреса получателей ||
|| `to`, `cc`, `bcc` | RESOLVE_RECIPIENTS_ERROR | Проверьте формат значений и доступность получателей в в `to`, `cc`, `bcc` ||
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
- [{#T}](./mail-message-reply.md)
- [{#T}](./mail-message-send.md)
