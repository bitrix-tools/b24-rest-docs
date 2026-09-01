# Как отправить письмо из подключенного ящика

> Scope: [`mail`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — доступ к почтовому ящику
>
> - [mail.mailbox.senders](../../api-reference/mail/mailbox/mail-mailbox-senders.md) — любой пользователь
> - [mail.recipient.listcontacts](../../api-reference/mail/recipient/mail-recipient-listcontacts.md) — любой пользователь
> - [mail.message.send](../../api-reference/mail/message/mail-message-send.md) — пользователь, у которого есть доступ к почтовому ящику

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Письмо можно отправить от имени адреса, который доступен текущему пользователю в почте Битрикс24. Сначала получите доступных отправителей, затем найдите адрес получателя в адресной книге и отправьте письмо.

Сценарий состоит из трех шагов.

1. Получить отправителей методом [mail.mailbox.senders](../../api-reference/mail/mailbox/mail-mailbox-senders.md)
2. Найти получателя методом [mail.recipient.listcontacts](../../api-reference/mail/recipient/mail-recipient-listcontacts.md)
3. Отправить письмо методом [mail.message.send](../../api-reference/mail/message/mail-message-send.md)

На третьем шаге метод [mail.message.send](../../api-reference/mail/message/mail-message-send.md) вернет `success: true`, а письмо уйдет на адрес получателя.

## Что нужно до начала

Перед запуском сценария проверьте, что:

- входящий вебхук создан со scope `mail`
- у пользователя вебхука есть доступ хотя бы к одному подключенному почтовому ящику
- получатель есть в адресной книге или вы знаете его email
- путь вебхука хранится в переменной окружения и содержит сегмент `/rest/api/`

Методы почты относятся к REST 3.0. Особенности вызова методов и формат JSON-запроса описаны в [обзоре REST 3.0](../../api-reference/rest-v3.md). Для серверных JS-примеров используйте `$b24.actions.v3`, для Python укажите `prefer_version=3`. PHP SDK не поддерживает вызовы через `/rest/api/`, поэтому PHP-пример отправляет прямой HTTP-запрос.

Дальше в примерах используются адрес отправителя `user@example.com` и адрес получателя `client@example.com`. В вашем Битрикс24 они будут другими: отправителя возьмите из ответа `mail.mailbox.senders`, а получателя — из ответа `mail.recipient.listcontacts` или из своих данных.

## 1. Получим доступных отправителей

Метод [mail.mailbox.senders](../../api-reference/mail/mailbox/mail-mailbox-senders.md) возвращает адреса, от имени которых текущий пользователь может отправлять письма.

Вызовем метод с параметром:

- `pagination` — настройки постраничной навигации. В примере запрашиваем первую страницу и ограничиваем ответ 20 отправителями

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    import { B24Hook, Text } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/api/USER_ID/TOKEN/'

    async function callMethod(method, params) {
        const response = await $b24.actions.v3.call.make({
            method,
            params,
            requestId: Text.getUuidRfc4122()
        })

        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }

        return response.getData().result
    }

    const sendersResult = await callMethod('mail.mailbox.senders', {
        pagination: {
            page: 1,
            limit: 20,
            offset: 0
        }
    })

    const sender = sendersResult.items[0]
    if (!sender) {
        throw new Error('Нет доступных отправителей')
    }
    ```

- PHP

    ```php
    <?php

    $webhook = getenv('B24_HOOK');
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/api/USER_ID/TOKEN/'

    function callMethod(string $webhook, string $method, array $params): array
    {
        $ch = curl_init($webhook . $method);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'Accept: application/json'],
            CURLOPT_POSTFIELDS => json_encode($params, JSON_UNESCAPED_UNICODE),
            CURLOPT_RETURNTRANSFER => true,
        ]);

        $response = curl_exec($ch);
        if ($response === false)
        {
            throw new RuntimeException(curl_error($ch));
        }

        $data = json_decode($response, true);
        if (isset($data['error']))
        {
            throw new RuntimeException($data['error']['message']);
        }

        return $data['result'];
    }

    $sendersResult = callMethod($webhook, 'mail.mailbox.senders', [
        'pagination' => [
            'page' => 1,
            'limit' => 20,
            'offset' => 0,
        ],
    ]);

    $sender = $sendersResult['items'][0] ?? null;
    if (!$sender)
    {
        throw new RuntimeException('Нет доступных отправителей');
    }
    ```

- Python

    ```python
    import os

    from b24pysdk import BitrixWebhook, Client

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.ru",
            webhook_token=os.environ["B24_HOOK_TOKEN"],
        ),
        prefer_version=3,
    )
    # B24_HOOK_TOKEN = 'user_id/webhook_key'

    senders_result = client.mail.mailbox.senders(
        pagination={
            "page": 1,
            "limit": 20,
            "offset": 0,
        },
    ).response.result

    if not senders_result["items"]:
        raise RuntimeError("Нет доступных отправителей")

    sender = senders_result["items"][0]
    ```

{% endlist %}

В результате получили список доступных отправителей. Для следующего шага сохраните `sender.email` — этот адрес передадим в `from`.

```json
{
    "result": {
        "items": [
            {
                "email": "user@example.com",
                "name": "Иван Петров",
                "sender": "Иван Петров <user@example.com>"
            }
        ]
    }
}
```

## 2. Найдем получателя

Метод [mail.recipient.listcontacts](../../api-reference/mail/recipient/mail-recipient-listcontacts.md) ищет контакты в адресной книге текущего пользователя.

Используем метод с параметрами:

- `query` — имя или email клиента. В примере ищем адрес `client@example.com`
- `pagination` — настройки постраничной навигации. В примере запрашиваем первую страницу и ограничиваем ответ 20 контактами

{% list tabs %}

- JS

    ```js
    const recipientsResult = await callMethod('mail.recipient.listcontacts', {
        query: 'client@example.com',
        pagination: {
            page: 1,
            limit: 20,
            offset: 0
        }
    })

    const recipientEmail = recipientsResult.items[0]?.email ?? 'client@example.com'
    ```

- PHP

    ```php
    $recipientsResult = callMethod($webhook, 'mail.recipient.listcontacts', [
        'query' => 'client@example.com',
        'pagination' => [
            'page' => 1,
            'limit' => 20,
            'offset' => 0,
        ],
    ]);

    $recipientEmail = $recipientsResult['items'][0]['email'] ?? 'client@example.com';
    ```

- Python

    ```python
    recipients_result = client.mail.recipient.listcontacts(
        query="client@example.com",
        pagination={
            "page": 1,
            "limit": 20,
            "offset": 0,
        },
    ).response.result

    recipient_email = recipients_result["items"][0]["email"] if recipients_result["items"] else "client@example.com"
    ```

{% endlist %}

В результате получили список контактов. Для следующего шага сохраните email получателя в переменной `recipientEmail`. Если адресной записи нет, передайте известный email напрямую в массив `to`.

```json
{
    "result": {
        "items": [
            {
                "id": 10,
                "email": "client@example.com",
                "name": "Client"
            }
        ]
    }
}
```

## 3. Отправим письмо

Метод [mail.message.send](../../api-reference/mail/message/mail-message-send.md) отправляет новое письмо.

Используем метод с параметрами:

- `from` — адрес отправителя из поля `email` шага 1
- `to` — массив адресов получателей. В примере передаем email из шага 2, а если адресная книга ничего не вернула — известный адрес `client@example.com`
- `subject` — тема письма
- `body` — текст письма

{% note warning "" %}

Следующий запрос отправляет настоящее письмо. Отлаживайте сценарий на тестовом адресе.

{% endnote %}

{% list tabs %}

- JS

    ```js
    const sendResult = await callMethod('mail.message.send', {
        from: sender.email,
        to: [recipientEmail],
        subject: 'Коммерческое предложение',
        body: 'Здравствуйте. Отправляю материалы.'
    })

    console.log(sendResult)
    ```

- PHP

    ```php
    $sendResult = callMethod($webhook, 'mail.message.send', [
        'from' => $sender['email'],
        'to' => [$recipientEmail],
        'subject' => 'Коммерческое предложение',
        'body' => 'Здравствуйте. Отправляю материалы.',
    ]);

    print_r($sendResult);
    ```

- Python

    ```python
    send_result = client.mail.message.send(
        from_=sender["email"],
        to=[recipient_email],
        subject="Коммерческое предложение",
        body="Здравствуйте. Отправляю материалы.",
    ).response.result

    print(send_result)
    ```

{% endlist %}

Успешный ответ содержит признак отправки и список адресов, которым ушло письмо.

```json
{
    "result": {
        "success": true,
        "to": [
            "client@example.com"
        ]
    }
}
```

## Проверим результат

Проверьте почтовый ящик получателя: письмо должно прийти с темой из `subject` и текстом из `body`.

Через REST успешную отправку подтверждает ответ `mail.message.send`: `success` равен `true`, а массив `to` содержит адрес получателя.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| `BITRIX_REST_V3_EXCEPTION_INSUFFICIENTSCOPEEXCEPTION` | Вебхук или приложение не имеет scope `mail`. Добавьте scope и повторите запрос ||
|| `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION` | Пользователь не имеет доступа к почтовому ящику или отправителю. Проверьте, от имени какого пользователя создан вебхук ||
|| `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION` | В запросе не заполнено обязательное поле `from`, `to`, `subject` или `body`. Проверьте тело JSON ||
|| `MESSAGE_SEND_FAILED` | Адрес из `from` недоступен пользователю или письмо не удалось отправить. Получите отправителя заново методом `mail.mailbox.senders` ||
|| `NO_RECIPIENTS` | В `to` нет корректных получателей. Проверьте, что массив содержит email-адреса ||
|| `RESOLVE_RECIPIENTS_ERROR` | Битрикс24 не смог распознать адреса в `to`, `cc` или `bcc`. Передайте email-адреса строками ||
|#

Повторяйте сценарий с шага, который вернул ошибку. Шаги 1 и 2 ничего не создают, их можно выполнять повторно.

## Что важно учитывать

Учитывайте ограничения сценария:

- `mail.message.send` отправляет письмо из почты, но не создает дело в CRM
- `mail.message.send` не возвращает идентификатор созданного письма, поэтому результат нельзя сразу передать в [mail.message.createcrmactivity](../../api-reference/mail/message/mail-message-createcrmactivity.md)
- если нужно отправить копию или скрытую копию письма, передайте необязательные параметры `cc` и `bcc` метода `mail.message.send` массивами email-адресов
- повторный запуск примера отправит еще одно письмо

## Пример кода

Код объединяет все три шага: получает отправителя, находит получателя и отправляет письмо. Замените `client@example.com`, `subject` и `body` на свои значения.

{% list tabs %}

- JS

    ```js
    import { B24Hook, Text } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)

    async function callMethod(method, params) {
        const response = await $b24.actions.v3.call.make({
            method,
            params,
            requestId: Text.getUuidRfc4122()
        })

        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }

        return response.getData().result
    }

    const senders = await callMethod('mail.mailbox.senders', {
        pagination: { page: 1, limit: 20, offset: 0 }
    })
    const sender = senders.items[0]
    if (!sender) {
        throw new Error('Нет доступных отправителей')
    }

    const recipients = await callMethod('mail.recipient.listcontacts', {
        query: 'client@example.com',
        pagination: { page: 1, limit: 20, offset: 0 }
    })
    const recipientEmail = recipients.items[0]?.email ?? 'client@example.com'

    const result = await callMethod('mail.message.send', {
        from: sender.email,
        to: [recipientEmail],
        subject: 'Коммерческое предложение',
        body: 'Здравствуйте. Отправляю материалы.'
    })

    console.log(result)
    ```

- PHP

    ```php
    <?php

    $webhook = getenv('B24_HOOK');

    function callMethod(string $webhook, string $method, array $params): array
    {
        $ch = curl_init($webhook . $method);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'Accept: application/json'],
            CURLOPT_POSTFIELDS => json_encode($params, JSON_UNESCAPED_UNICODE),
            CURLOPT_RETURNTRANSFER => true,
        ]);

        $response = curl_exec($ch);
        if ($response === false)
        {
            throw new RuntimeException(curl_error($ch));
        }

        $data = json_decode($response, true);
        if (isset($data['error']))
        {
            throw new RuntimeException($data['error']['message']);
        }

        return $data['result'];
    }

    $senders = callMethod($webhook, 'mail.mailbox.senders', [
        'pagination' => ['page' => 1, 'limit' => 20, 'offset' => 0],
    ]);
    $sender = $senders['items'][0] ?? null;
    if (!$sender)
    {
        throw new RuntimeException('Нет доступных отправителей');
    }

    $recipients = callMethod($webhook, 'mail.recipient.listcontacts', [
        'query' => 'client@example.com',
        'pagination' => ['page' => 1, 'limit' => 20, 'offset' => 0],
    ]);
    $recipientEmail = $recipients['items'][0]['email'] ?? 'client@example.com';

    $result = callMethod($webhook, 'mail.message.send', [
        'from' => $sender['email'],
        'to' => [$recipientEmail],
        'subject' => 'Коммерческое предложение',
        'body' => 'Здравствуйте. Отправляю материалы.',
    ]);

    print_r($result);
    ```

- Python

    ```python
    import os

    from b24pysdk import BitrixWebhook, Client

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.ru",
            webhook_token=os.environ["B24_HOOK_TOKEN"],
        ),
        prefer_version=3,
    )

    senders = client.mail.mailbox.senders(
        pagination={"page": 1, "limit": 20, "offset": 0},
    ).response.result
    if not senders["items"]:
        raise RuntimeError("Нет доступных отправителей")

    sender = senders["items"][0]

    recipients = client.mail.recipient.listcontacts(
        query="client@example.com",
        pagination={"page": 1, "limit": 20, "offset": 0},
    ).response.result
    recipient_email = recipients["items"][0]["email"] if recipients["items"] else "client@example.com"

    result = client.mail.message.send(
        from_=sender["email"],
        to=[recipient_email],
        subject="Коммерческое предложение",
        body="Здравствуйте. Отправляю материалы.",
    ).response.result

    print(result)
    ```

{% endlist %}

## Продолжите изучение

- [Получить отправителей mail.mailbox.senders](../../api-reference/mail/mailbox/mail-mailbox-senders.md)
- [Получить список контактов mail.recipient.listcontacts](../../api-reference/mail/recipient/mail-recipient-listcontacts.md)
- [Отправить письмо mail.message.send](../../api-reference/mail/message/mail-message-send.md)
- [Почта в REST 3.0: обзор разделов](../../api-reference/mail/index.md)
- [Обзор REST 3.0](../../api-reference/rest-v3.md)
