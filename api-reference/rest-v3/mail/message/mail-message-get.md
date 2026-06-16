# Получить письмо mail.message.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`mail`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к почтовому ящику, где находится письмо

Метод `mail.message.get` возвращает письмо по идентификатору.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор письма.

Идентификатор можно получить методом [mail.message.list](./mail-message-list.md) ||
|| **select**
[`array`](../../../data-types.md) | Список полей письма, которые нужно вернуть.

Доступные поля:
- `id` — идентификатор письма
- `mailboxId` — идентификатор почтового ящика
- `mailboxEmail` — электронная почта почтового ящика
- `subject` — тема письма
- `from` — отправитель
- `to` — получатель
- `cc` — копия
- `date` — дата письма
- `isSeen` — признак прочтения
- `hasAttachments` — признак наличия вложений
- `url` — ссылка на письмо
- `bindings` — привязки к объектам
- `body` — текст письма ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/mail.message.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15,"select":["id","mailboxId","mailboxEmail","subject","from","to","cc","date","isSeen","hasAttachments","url","bindings","body"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/mail.message.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15,"select":["id","mailboxId","mailboxEmail","subject","from","to","cc","date","isSeen","hasAttachments","url","bindings","body"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/mail.message.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type MessageGetResult = {
      item: {
        id: number
        mailboxId: number
        mailboxEmail: string
        subject: string
        from: string
        to: string
        cc: string | null
        date: ISODate | null
        isSeen: boolean
        hasAttachments: boolean
        url: string
        bindings: unknown[]
        body: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<MessageGetResult>({
        method: 'mail.message.get',
        params: {
          id: 15,
          select: [
            'id',
            'mailboxId',
            'mailboxEmail',
            'subject',
            'from',
            'to',
            'cc',
            'date',
            'isSeen',
            'hasAttachments',
            'url',
            'bindings',
            'body',
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Message:', result.item.id, result.item.subject, result.item.from)
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
      async function fetchMessage() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'mail.message.get',
            params: {
              id: 15,
              select: [
                'id',
                'mailboxId',
                'mailboxEmail',
                'subject',
                'from',
                'to',
                'cc',
                'date',
                'isSeen',
                'hasAttachments',
                'url',
                'bindings',
                'body',
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Message:', result.item.id, result.item.subject, result.item.from)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchMessage)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'mail.message.get',
                [
                    'id' => 15,
                    'select' => [
                        'id',
                        'mailboxId',
                        'mailboxEmail',
                        'subject',
                        'from',
                        'to',
                        'cc',
                        'date',
                        'isSeen',
                        'hasAttachments',
                        'url',
                        'bindings',
                        'body'
                    ]
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
        'mail.message.get',
        {
            id: 15,
            select: [
                'id',
                'mailboxId',
                'mailboxEmail',
                'subject',
                'from',
                'to',
                'cc',
                'date',
                'isSeen',
                'hasAttachments',
                'url',
                'bindings',
                'body'
            ]
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
        'mail.message.get',
        [
            'id' => 15,
            'select' => [
                'id',
                'mailboxId',
                'mailboxEmail',
                'subject',
                'from',
                'to',
                'cc',
                'date',
                'isSeen',
                'hasAttachments',
                'url',
                'bindings',
                'body'
            ]
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
        "item": {
            "id": 15,
            "mailboxId": 1,
            "mailboxEmail": "user@example.com",
            "subject": "Тема письма",
            "from": "client@example.com",
            "to": "user@example.com",
            "cc": null,
            "date": "2026-05-25T10:00:00+03:00",
            "isSeen": true,
            "hasAttachments": false,
            "url": "/mail/message/15",
            "bindings": [],
            "body": "Текст письма"
        }
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
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **item**
[`object`](../../../data-types.md) | Объект письма. Структура ответа зависит от `select` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `15` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Добавьте `id` в тело запроса ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя и scope `mail` ||
|#

#### Ошибки нахождения данных

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с указанным идентификатором не найдена | Укажите идентификатор существующего объекта ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./mail-message-list.md)
- [{#T}](./mail-message-field-list.md)
- [{#T}](./index.md)
