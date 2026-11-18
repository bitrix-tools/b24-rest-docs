# Получить письмо mail.message.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`mail`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к почтовому ящику, где находится письмо

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `mail.message.get` возвращает письмо по идентификатору. В отличие от [mail.message.list](./mail-message-list.md), метод возвращает получателей копии `cc` и текст письма `body`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор письма.

Идентификатор можно получить методом [mail.message.list](./mail-message-list.md) ||
|| **select**
[`array`](../../data-types.md) | Список полей письма. Метод проверяет имена полей и возвращает ошибку на неизвестное поле, но сейчас в ответе всегда приходят все поля письма.

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

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

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
    import type { B24Frame } from '@bitrix24/b24jssdk'

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
        cc: string
        date: string
        isSeen: boolean
        hasAttachments: boolean
        url: string
        bindings: Array<{
          type: 'crm' | 'task' | 'chat' | 'calendarEvent' | 'blogPost'
          entityTypeId?: number
          entityId: number
        }>
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
        console.info('Письмо:', result.item.id, result.item.subject, result.item.from)
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
          console.info('Письмо:', result.item.id, result.item.subject, result.item.from)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchMessage)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    select = [
        "id",
        "mailboxId",
        "mailboxEmail",
        "subject",
        "from",
        "to",
        "cc",
        "date",
        "isSeen",
        "hasAttachments",
        "url",
        "bindings",
        "body",
    ]

    try:
        bitrix_response = client.mail.message.get(
            bitrix_id=15,
            select=select,
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "mail.message.get", b24.Params{
    	"id":     15,
    	"select": []string{"id", "mailboxId", "mailboxEmail", "subject", "from", "to", "cc", "date", "isSeen", "hasAttachments", "url", "bindings", "body"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("mail.message.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID           b24.ID `json:"id"`
    	MailboxID    b24.ID `json:"mailboxId"`
    	MailboxEmail string `json:"mailboxEmail"`
    	Subject      string `json:"subject"`
    	From         string `json:"from"`
    	To           string `json:"to"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.MailboxID)
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
            "cc": "",
            "date": "2026-05-25 10:00:00",
            "isSeen": true,
            "hasAttachments": false,
            "url": "https://example.bitrix24.ru/mail/message/15",
            "bindings": [],
            "body": "Добрый день! Направляю проект договора."
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
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **item**
[`object`](../../data-types.md) | Объект письма. Приходят все поля независимо от `select` ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор письма ||
|| **mailboxId**
[`integer`](../../data-types.md) | Идентификатор почтового ящика ||
|| **mailboxEmail**
[`string`](../../data-types.md) | Адрес почтового ящика ||
|| **subject**
[`string`](../../data-types.md) | Тема письма ||
|| **from**
[`string`](../../data-types.md) | Отправитель письма ||
|| **to**
[`string`](../../data-types.md) | Получатели письма ||
|| **cc**
[`string`](../../data-types.md) | Получатели копии. Если копии нет, приходит пустая строка ||
|| **date**
[`string`](../../data-types.md) | Дата и время получения письма в формате `YYYY-MM-DD HH:MM:SS`, без часового пояса ||
|| **isSeen**
[`boolean`](../../data-types.md) | Признак прочтения письма: `true` — прочитано, `false` — не прочитано ||
|| **hasAttachments**
[`boolean`](../../data-types.md) | Признак наличия вложений ||
|| **url**
[`string`](../../data-types.md) | Полная ссылка на письмо в Битрикс24 ||
|| **bindings**
[`array`](../../data-types.md) | Связи письма с объектами Битрикс24. Если связей нет, приходит пустой массив `[]`. Формат элементов описан на странице метода [mail.message.list](./mail-message-list.md#returned-data) ||
|| **body**
[`string`](../../data-types.md) | Текст письма без HTML-разметки. Строки разделены `\r\n`. Служебные символы приходят HTML-кодами, например `&lt;` вместо `<`. В ответах и пересылках, отправленных из Битрикс24, текст включает цитату исходного письма ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
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

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Добавьте `id` в тело запроса ||
|#

#### Ошибки нахождения данных

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `15` не найдена | Письмо не существует, у пользователя нет доступа к почтовому ящику письма или ящик отключен. Нечисловое значение `id`, например `abc`, метод считает равным `0` и возвращает эту же ошибку с ID = `0`. Получите идентификатор методом [mail.message.list](./mail-message-list.md) ||
|#

#### Ошибки в параметре select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `foo` для сущности `MessageDto` | Передайте только поля из списка параметра `select` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `["id"]` | Передайте `select` как массив строк, например `["id","subject"]` ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у приложения или вебхука есть scope `mail` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./mail-message-list.md)
- [{#T}](./mail-message-field-list.md)
- [{#T}](./index.md)
