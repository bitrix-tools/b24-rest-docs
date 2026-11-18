# Отправить письмо mail.message.send

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`mail`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь, которому доступен адрес отправителя из `from`

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `mail.message.send` отправляет новое письмо от имени доступного пользователю отправителя.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **from***
[`string`](../../data-types.md) | Адрес отправителя. Адрес должен быть в списке доступных пользователю отправителей.

Можно передать адрес в формате `Имя <email>`: метод учитывает только адрес.

Доступные адреса можно получить методом [mail.mailbox.senders](../mailbox/mail-mailbox-senders.md), поле `email` ||
|| **to***
[`array`](../../data-types.md) | Непустой массив получателей. Элемент массива — e-mail или имя получателя.

Имя метод ищет сначала в адресной книге почты пользователя, затем среди сотрудников. Если найдено несколько совпадений или ни одного, метод вернет ошибку `RESOLVE_RECIPIENTS_ERROR`. Чтобы не зависеть от поиска, передавайте e-mail.

Адреса из адресной книги можно получить методом [mail.recipient.listContacts](../recipient/mail-recipient-listcontacts.md), адреса сотрудников — методом [mail.recipient.listEmployees](../recipient/mail-recipient-listemployees.md) ||
|| **subject***
[`string`](../../data-types.md) | Тема письма. Пустая строка не допускается ||
|| **body***
[`string`](../../data-types.md) | Текст письма. Пустая строка не допускается.

Можно передать обычный текст или HTML. Письмо отправляется в формате HTML ||
|| **cc**
[`array`](../../data-types.md) | Массив получателей копии. Формат элементов такой же, как у `to`.

Передавайте массив, даже для одного адреса ||
|| **bcc**
[`array`](../../data-types.md) | Массив получателей скрытой копии. Формат элементов такой же, как у `to`.

Передавайте массив, даже для одного адреса ||
|| **mailboxId**
[`integer`](../../data-types.md) | Идентификатор почтового ящика, через который нужно отправить письмо. Нужен, если адрес `from` доступен пользователю через несколько ящиков или отправителей. Если переданы `mailboxId` и `senderId`, метод учитывает `mailboxId`.

Значение должно быть положительным числом и соответствовать адресу `from`.

Идентификатор можно получить методом [mail.mailbox.senders](../mailbox/mail-mailbox-senders.md), поле `mailboxId` ||
|| **senderId**
[`integer`](../../data-types.md) | Идентификатор отправителя. Используйте, если адрес `from` доступен пользователю через несколько отправителей.

Значение должно быть положительным числом и соответствовать адресу `from`.

Идентификатор можно получить методом [mail.mailbox.senders](../mailbox/mail-mailbox-senders.md), поле `senderId` ||
|#

Если адрес `from` принадлежит подключенному почтовому ящику пользователя, письмо уходит через этот ящик и сохраняется в его папке отправленных. Если адрес принадлежит отдельному отправителю без ящика, письмо уходит через почтовый сервис Битрикс24.

{% note warning "" %}

Перед отправкой метод проверяет лимиты Битрикс24:

- общее количество получателей в `to`, `cc` и `bcc` ограничено тарифом. Если лимит не задан, допускается до 10 получателей
- на демо-тарифе и тарифах без синхронизации почты в каждом из массивов `to`, `cc` и `bcc` может быть только один получатель
- действуют дневной лимит отправителя, дневной и месячный лимиты писем Битрикс24

Если лимит превышен, письмо не отправляется, а метод возвращает ошибку с описанием лимита.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/mail.message.send`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"from":"user@example.com","to":["client@example.com"],"subject":"Коммерческое предложение","body":"Здравствуйте. Отправляю материалы."}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/mail.message.send
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"from":"user@example.com","to":["client@example.com"],"subject":"Коммерческое предложение","body":"Здравствуйте. Отправляю материалы.","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/mail.message.send
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type SendMessageResult = {
      success: boolean
      to: string[]
    }

    try {
      const response = await $b24.actions.v3.call.make<SendMessageResult>({
        method: 'mail.message.send',
        params: {
          from: 'user@example.com',
          to: ['client@example.com'],
          subject: 'Коммерческое предложение',
          body: 'Здравствуйте. Отправляю материалы.',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Отправлено:', result.success, 'Получатели:', result.to)
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
      async function sendMessage() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'mail.message.send',
            params: {
              from: 'user@example.com',
              to: ['client@example.com'],
              subject: 'Коммерческое предложение',
              body: 'Здравствуйте. Отправляю материалы.',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Отправлено:', result.success, 'Получатели:', result.to)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', sendMessage)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    to = [
        "client@example.com",
    ]

    try:
        bitrix_response = client.mail.message.send(
            from_='user@example.com',
            to=to,
            subject='Коммерческое предложение',
            body='Здравствуйте. Отправляю материалы.',
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

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'mail.message.send',
                [
                    'from' => 'user@example.com',
                    'to' => ['client@example.com'],
                    'subject' => 'Коммерческое предложение',
                    'body' => 'Здравствуйте. Отправляю материалы.'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'mail.message.send',
        {
            from: 'user@example.com',
            to: ['client@example.com'],
            subject: 'Коммерческое предложение',
            body: 'Здравствуйте. Отправляю материалы.'
        },
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'mail.message.send',
        [
            'from' => 'user@example.com',
            'to' => ['client@example.com'],
            'subject' => 'Коммерческое предложение',
            'body' => 'Здравствуйте. Отправляю материалы.'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "mail.message.send", b24.Params{
    	"from":    "user@example.com",
    	"to":      []string{"client@example.com"},
    	"subject": "Коммерческое предложение",
    	"body":    "Здравствуйте. Отправляю материалы.",
    })
    if err != nil {
    	return fmt.Errorf("mail.message.send: %w", err)
    }

    var item struct {
    	Success bool     `json:"success"`
    	To      []string `json:"to"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Success, item.To)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "success": true,
        "to": [
            "client@example.com"
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
[`object`](../../data-types.md) | Объект с результатом отправки ||
|| **success**
[`boolean`](../../data-types.md) | Результат отправки. В успешном ответе всегда `true`: если письмо не отправлено, метод возвращает ошибку ||
|| **to**
[`array`](../../data-types.md) | Адреса получателей из `to`, на которые отправлено письмо. Имена получателей в этом массиве заменены найденными e-mail. Получатели копии и скрытой копии в массив не входят ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
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
                "message": "Parameter \"from\" is required.",
                "field": "MISSING_FROM"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

В ответе с этим кодом поле `field` содержит не имя параметра, а код причины ошибки. Метод проверяет параметры по очереди и возвращает первую найденную ошибку.

#|
|| **Значение field** | **Описание ошибки** | **Как исправить** ||
|| `MISSING_FROM` | Parameter "from" is required. | Передайте `from` непустой строкой ||
|| `MISSING_SUBJECT` | Parameter "subject" is required. | Передайте `subject` непустой строкой ||
|| `MISSING_BODY` | Parameter "body" is required. | Передайте `body` непустой строкой ||
|| `MISSING_TO` | Parameter "to" is required and must be a non-empty array. | Передайте `to` непустым массивом. Строка вместо массива тоже вызывает эту ошибку ||
|| `RESOLVE_RECIPIENTS_ERROR` | Recipient "zzqxnotexist987" not found in address book or among employees. | Получатель из `to`, `cc` или `bcc` не найден по имени. Передайте e-mail. Значение без `@` и e-mail в неверном формате метод считает именем ||
|| `RESOLVE_RECIPIENTS_ERROR` | Ambiguous recipient "Ivan". Found multiple matches: Ivan Petrov &lt;ivan@example.com&gt;, Ivan Smirnov &lt;smirnov@example.com&gt;. Please specify the exact email address. | По имени найдено несколько получателей. Передайте e-mail из списка в тексте ошибки ||
|| `NO_RECIPIENTS` | No valid recipients provided. | В `to` только пустые строки или пробелы. Передайте хотя бы один адрес ||
|| `MESSAGE_SEND_FAILED` | Sender identifiers must be positive integers. | `mailboxId` или `senderId` меньше 1. Передайте значения из ответа [mail.mailbox.senders](../mailbox/mail-mailbox-senders.md) ||
|| `MESSAGE_SEND_FAILED` | Sender email is not available for this user. | Адреса `from` нет среди доступных пользователю отправителей. Проверьте адрес методом [mail.mailbox.senders](../mailbox/mail-mailbox-senders.md) ||
|| `MESSAGE_SEND_FAILED` | Sender is not available for this user. | Переданные `mailboxId` или `senderId` не соответствуют адресу `from`. Возьмите связанные значения из одной записи ответа [mail.mailbox.senders](../mailbox/mail-mailbox-senders.md) ||
|| `MESSAGE_SEND_FAILED` | Total number of recipients (to + cc + bcc) is 12, must not exceed 10. | Получателей больше лимита тарифа. Разделите отправку на несколько писем ||
|| `MESSAGE_SEND_FAILED` | Tariff restriction: each of to, cc, bcc must contain at most 1 recipient(s). | На тарифе Битрикс24 в каждом массиве может быть только один получатель ||
|| `MESSAGE_SEND_FAILED` | Daily sender email limit reached. | Исчерпан дневной лимит отправителя. Повторите отправку на следующий день или используйте другой адрес ||
|| `MESSAGE_SEND_FAILED` | Daily portal mail limit reached. | Исчерпан дневной лимит писем Битрикс24. Повторите отправку на следующий день ||
|| `MESSAGE_SEND_FAILED` | Monthly portal mail limit reached. | Исчерпан месячный лимит писем Битрикс24 ||
|| `MESSAGE_SEND_FAILED` | Mailbox authentication failed. | Почтовый ящик отправителя не прошел авторизацию на почтовом сервере. Проверьте настройки подключения ящика ||
|| `MESSAGE_SEND_FAILED` | Failed to send email. | Письмо не удалось отправить. Повторите запрос позже ||
|#

Если в `cc` или `bcc` передать строку вместо массива, Битрикс24 возвращает HTTP-статус **500** и ошибку `INTERNAL_SERVER_ERROR`. Передавайте эти параметры массивом.

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./mail-message-reply.md)
- [{#T}](./mail-message-forward.md)
- [{#T}](../mailbox/mail-mailbox-senders.md)
- [{#T}](../recipient/mail-recipient-listcontacts.md)
