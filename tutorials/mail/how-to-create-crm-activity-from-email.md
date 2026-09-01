# Как создать дело CRM из входящего письма

> Scope: [`mail`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — доступ к почтовому ящику, где находится письмо, и доступ к CRM
>
> - [mail.mailbox.list](../../api-reference/mail/mailbox/mail-mailbox-list.md) — любой пользователь
> - [mail.message.list](../../api-reference/mail/message/mail-message-list.md) — любой пользователь
> - [mail.message.createcrmactivity](../../api-reference/mail/message/mail-message-createcrmactivity.md) — пользователь с доступом к почтовому ящику, где находится письмо, и доступом к CRM
> - [mail.message.get](../../api-reference/mail/message/mail-message-get.md) — пользователь с доступом к почтовому ящику, где находится письмо

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Входящее письмо можно превратить в дело CRM. Для этого нужно найти письмо в доступном почтовом ящике и передать его идентификатор в метод создания дела.

Метод [mail.message.createcrmactivity](../../api-reference/mail/message/mail-message-createcrmactivity.md) не принимает идентификатор лида, сделки, контакта или компании. Он создает дело CRM из письма, а связь с объектом CRM определяется по данным письма и настройкам CRM.

Сценарий состоит из четырех шагов.

1. Получить почтовые ящики методом [mail.mailbox.list](../../api-reference/mail/mailbox/mail-mailbox-list.md)
2. Найти входящее письмо методом [mail.message.list](../../api-reference/mail/message/mail-message-list.md)
3. Создать дело CRM методом [mail.message.createcrmactivity](../../api-reference/mail/message/mail-message-createcrmactivity.md)
4. Проверить связь письма методом [mail.message.get](../../api-reference/mail/message/mail-message-get.md)

В результате у письма появится привязка в поле `bindings`, а в CRM будет создано дело из письма.

## Что нужно до начала

Перед запуском сценария проверьте, что:

- входящий вебхук создан со scope `mail`
- у пользователя вебхука есть доступ к почтовому ящику с входящим письмом
- CRM включена и настроена, у пользователя вебхука есть доступ к CRM
- письмо доступно текущему пользователю и не удалено
- путь вебхука хранится в переменной окружения и содержит сегмент `/rest/api/`

Методы почты относятся к REST 3.0. Особенности вызова методов и формат JSON-запроса описаны в [обзоре REST 3.0](../../api-reference/rest-v3.md). Для серверных JS-примеров используйте `$b24.actions.v3`, для Python укажите `prefer_version=3`. PHP SDK не поддерживает вызовы через `/rest/api/`, поэтому PHP-пример отправляет прямой HTTP-запрос.

Дальше в примерах используются письмо с темой «Договор» и период с 1 по 31 августа 2026 года. В вашем Битрикс24 значения будут другими: выберите поисковую строку и период так, чтобы метод `mail.message.list` нашел нужное входящее письмо.

## 1. Получим почтовые ящики

Метод [mail.mailbox.list](../../api-reference/mail/mailbox/mail-mailbox-list.md) возвращает почтовые ящики текущего пользователя.

Вызовем метод с параметром:

- `pagination` — настройки постраничной навигации. В примере запрашиваем первую страницу и ограничиваем ответ 20 ящиками

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

    const mailboxesResult = await callMethod('mail.mailbox.list', {
        pagination: {
            page: 1,
            limit: 20,
            offset: 0
        }
    })

    const mailbox = mailboxesResult.items[0]
    if (!mailbox) {
        throw new Error('Нет доступных почтовых ящиков')
    }

    const mailboxId = mailbox.id
    ```

- PHP

    ```php
    <?php

    $webhook = getenv('B24_HOOK');
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/api/USER_ID/TOKEN/'

    function callMethod(string $webhook, string $method, array $params)
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

    $mailboxesResult = callMethod($webhook, 'mail.mailbox.list', [
        'pagination' => [
            'page' => 1,
            'limit' => 20,
            'offset' => 0,
        ],
    ]);

    $mailbox = $mailboxesResult['items'][0] ?? null;
    if (!$mailbox)
    {
        throw new RuntimeException('Нет доступных почтовых ящиков');
    }

    $mailboxId = $mailbox['id'];
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

    mailboxes_result = client.mail.mailbox.list(
        pagination={
            "page": 1,
            "limit": 20,
            "offset": 0,
        },
    ).response.result

    if not mailboxes_result["items"]:
        raise RuntimeError("Нет доступных почтовых ящиков")

    mailbox_id = mailboxes_result["items"][0]["id"]
    ```

{% endlist %}

В результате получили список почтовых ящиков. Для следующего шага сохраните `id` ящика, в котором нужно найти входящее письмо.

```json
{
    "result": {
        "items": [
            {
                "id": 1,
                "name": "Рабочая почта",
                "email": "user@example.com",
                "senderName": "Иван Петров"
            }
        ]
    }
}
```

## 2. Найдем входящее письмо

Метод [mail.message.list](../../api-reference/mail/message/mail-message-list.md) возвращает письма по условиям. В примере ищем письмо в выбранном ящике по теме и периоду.

Используем метод с параметрами:

- `mailboxId` — идентификатор почтового ящика из шага 1
- `searchQuery` — строка поиска по письмам. В примере ищем письма по слову `договор`
- `dateFrom` и `dateTo` — границы периода, в котором нужно найти письмо
- `pagination` — настройки постраничной навигации. В примере запрашиваем первую страницу и ограничиваем ответ 20 письмами

{% list tabs %}

- JS

    ```js
    const messagesResult = await callMethod('mail.message.list', {
        mailboxId,
        searchQuery: 'договор',
        dateFrom: '2026-08-01T00:00:00+03:00',
        dateTo: '2026-08-31T23:59:59+03:00',
        pagination: {
            page: 1,
            limit: 20,
            offset: 0
        }
    })

    const message = messagesResult.items[0]
    if (!message) {
        throw new Error('Письмо не найдено')
    }

    const messageId = message.id
    ```

- PHP

    ```php
    $messagesResult = callMethod($webhook, 'mail.message.list', [
        'mailboxId' => $mailboxId,
        'searchQuery' => 'договор',
        'dateFrom' => '2026-08-01T00:00:00+03:00',
        'dateTo' => '2026-08-31T23:59:59+03:00',
        'pagination' => [
            'page' => 1,
            'limit' => 20,
            'offset' => 0,
        ],
    ]);

    $message = $messagesResult['items'][0] ?? null;
    if (!$message)
    {
        throw new RuntimeException('Письмо не найдено');
    }

    $messageId = $message['id'];
    ```

- Python

    ```python
    messages_result = client.mail.message.list(
        mailbox_id=mailbox_id,
        search_query="договор",
        date_from="2026-08-01T00:00:00+03:00",
        date_to="2026-08-31T23:59:59+03:00",
        pagination={
            "page": 1,
            "limit": 20,
            "offset": 0,
        },
    ).response.result

    if not messages_result["items"]:
        raise RuntimeError("Письмо не найдено")

    message_id = messages_result["items"][0]["id"]
    ```

{% endlist %}

В результате получили список писем. Для следующего шага сохраните `id` нужного письма в переменной `messageId`.

```json
{
    "result": {
        "items": [
            {
                "id": 15,
                "mailboxId": 1,
                "mailboxEmail": "user@example.com",
                "subject": "Договор",
                "from": "client@example.com",
                "to": "user@example.com",
                "date": "2026-08-15T10:00:00+03:00",
                "bindings": []
            }
        ]
    }
}
```

## 3. Создадим дело CRM

Метод [mail.message.createcrmactivity](../../api-reference/mail/message/mail-message-createcrmactivity.md) создает дело CRM из письма.

Используем метод с параметром:

- `messageId` — идентификатор письма, который сохранили из ответа [mail.message.list](../../api-reference/mail/message/mail-message-list.md) на шаге 2

{% list tabs %}

- JS

    ```js
    const createResult = await callMethod('mail.message.createcrmactivity', {
        messageId
    })

    console.log(createResult)
    ```

- PHP

    ```php
    $createResult = callMethod($webhook, 'mail.message.createcrmactivity', [
        'messageId' => $messageId,
    ]);

    print_r($createResult);
    ```

- Python

    ```python
    create_result = client.mail.message.createcrmactivity(
        message_id=message_id,
    ).response.result

    print(create_result)
    ```

{% endlist %}

Успешный ответ содержит объект с `result: true`.

```json
{
    "result": {
        "result": true
    }
}
```

## 4. Проверим связь письма

Метод [mail.message.get](../../api-reference/mail/message/mail-message-get.md) возвращает письмо по идентификатору.

Используем метод с параметрами:

- `id` — идентификатор письма `messageId`, который сохранили из ответа [mail.message.list](../../api-reference/mail/message/mail-message-list.md) на шаге 2
- `select` — список полей, которые нужно получить. Запросите поле `bindings`, чтобы увидеть созданную связь

{% list tabs %}

- JS

    ```js
    const messageResult = await callMethod('mail.message.get', {
        id: messageId,
        select: [
            'id',
            'subject',
            'from',
            'to',
            'bindings',
            'url'
        ]
    })

    console.log(messageResult.item.bindings)
    ```

- PHP

    ```php
    $messageResult = callMethod($webhook, 'mail.message.get', [
        'id' => $messageId,
        'select' => [
            'id',
            'subject',
            'from',
            'to',
            'bindings',
            'url',
        ],
    ]);

    print_r($messageResult['item']['bindings']);
    ```

- Python

    ```python
    message_result = client.mail.message.get(
        bitrix_id=message_id,
        select=[
            "id",
            "subject",
            "from",
            "to",
            "bindings",
            "url",
        ],
    ).response.result

    print(message_result["item"]["bindings"])
    ```

{% endlist %}

Связь с CRM отображается в массиве `bindings`. Ответ сокращен до полей, которые нужны для проверки.

```json
{
    "result": {
        "item": {
            "id": 15,
            "subject": "Договор",
            "from": "client@example.com",
            "to": "user@example.com",
            "url": "/mail/message/15",
            "bindings": [
                {
                    "type": "crm",
                    "entityTypeId": 3,
                    "entityId": 125
                }
            ]
        }
    }
}
```

## Проверим результат

Откройте письмо в почте Битрикс24. У письма должна появиться связь с CRM.

Через REST сценарий выполнен, если метод [mail.message.get](../../api-reference/mail/message/mail-message-get.md) возвращает непустой массив `bindings` и в нем есть объект с `type: "crm"`.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| `BITRIX_REST_V3_EXCEPTION_INSUFFICIENTSCOPEEXCEPTION` | Вебхук или приложение не имеет scope `mail`. Добавьте scope и повторите запрос ||
|| `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION` | Пользователь не имеет доступа к почтовому ящику или письму. Проверьте пользователя вебхука ||
|| `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION` | В `messageId` передано пустое или некорректное значение либо письмо нельзя сохранить в CRM. Передайте положительное целое число и выберите письмо, которое можно связать с CRM ||
|| `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION` | Письмо не найдено. Проверьте `mailboxId`, фильтр поиска и идентификатор письма ||
|| `MESSAGE_LIST_FAILED` | Условия поиска письма не прошли проверку. Проверьте формат `dateFrom` и `dateTo` ||
|#

Если метод [mail.message.createcrmactivity](../../api-reference/mail/message/mail-message-createcrmactivity.md) вернул объект с `result: true`, но `bindings` пустой, проверьте настройки CRM и данные письма:

- у пользователя вебхука есть доступ к CRM
- CRM-трекер или обработка писем в CRM настроены для адреса из письма
- адрес отправителя или получателя письма совпадает с email в лиде, контакте или компании
- письмо не удалено и доступно в активном подключении почтового ящика

Метод не принимает целевой объект CRM вручную, поэтому связь зависит от обработки письма в CRM.

## Что важно учитывать

Учитывайте ограничения сценария:

- `mail.message.createcrmactivity` создает дело CRM из существующего письма и не отправляет новое письмо
- параметр `messageId` метода `mail.message.createcrmactivity` берется из ответа [mail.message.list](../../api-reference/mail/message/mail-message-list.md) или [mail.message.get](../../api-reference/mail/message/mail-message-get.md)
- целевой объект CRM нельзя передать параметром: у `mail.message.createcrmactivity` нет полей для идентификатора лида, сделки, контакта или компании
- повторный вызов `mail.message.createcrmactivity` для того же письма может вернуть ошибку или не изменить уже созданную связь, проверяйте `bindings` перед повтором
- связь можно удалить методом [mail.message.removecrmactivity](../../api-reference/mail/message/mail-message-removecrmactivity.md)

## Пример кода

Код объединяет все шаги: получает почтовый ящик, ищет письмо, создает дело CRM и проверяет `bindings`. Замените поисковую строку и период на свои значения.

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

    const mailboxes = await callMethod('mail.mailbox.list', {
        pagination: { page: 1, limit: 20, offset: 0 }
    })
    const mailbox = mailboxes.items[0]
    if (!mailbox) {
        throw new Error('Нет доступных почтовых ящиков')
    }
    const mailboxId = mailbox.id

    const messages = await callMethod('mail.message.list', {
        mailboxId,
        searchQuery: 'договор',
        dateFrom: '2026-08-01T00:00:00+03:00',
        dateTo: '2026-08-31T23:59:59+03:00',
        pagination: { page: 1, limit: 20, offset: 0 }
    })
    const sourceMessage = messages.items[0]
    if (!sourceMessage) {
        throw new Error('Письмо не найдено')
    }
    const messageId = sourceMessage.id

    await callMethod('mail.message.createcrmactivity', { messageId })

    const message = await callMethod('mail.message.get', {
        id: messageId,
        select: ['id', 'subject', 'from', 'to', 'bindings', 'url']
    })

    console.log(message.item.bindings)
    ```

- PHP

    ```php
    <?php

    $webhook = getenv('B24_HOOK');

    function callMethod(string $webhook, string $method, array $params)
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

    $mailboxes = callMethod($webhook, 'mail.mailbox.list', [
        'pagination' => ['page' => 1, 'limit' => 20, 'offset' => 0],
    ]);
    $mailbox = $mailboxes['items'][0] ?? null;
    if (!$mailbox)
    {
        throw new RuntimeException('Нет доступных почтовых ящиков');
    }
    $mailboxId = $mailbox['id'];

    $messages = callMethod($webhook, 'mail.message.list', [
        'mailboxId' => $mailboxId,
        'searchQuery' => 'договор',
        'dateFrom' => '2026-08-01T00:00:00+03:00',
        'dateTo' => '2026-08-31T23:59:59+03:00',
        'pagination' => ['page' => 1, 'limit' => 20, 'offset' => 0],
    ]);
    $sourceMessage = $messages['items'][0] ?? null;
    if (!$sourceMessage)
    {
        throw new RuntimeException('Письмо не найдено');
    }
    $messageId = $sourceMessage['id'];

    callMethod($webhook, 'mail.message.createcrmactivity', [
        'messageId' => $messageId,
    ]);

    $message = callMethod($webhook, 'mail.message.get', [
        'id' => $messageId,
        'select' => ['id', 'subject', 'from', 'to', 'bindings', 'url'],
    ]);

    print_r($message['item']['bindings']);
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

    mailboxes = client.mail.mailbox.list(
        pagination={"page": 1, "limit": 20, "offset": 0},
    ).response.result
    if not mailboxes["items"]:
        raise RuntimeError("Нет доступных почтовых ящиков")

    mailbox_id = mailboxes["items"][0]["id"]

    messages = client.mail.message.list(
        mailbox_id=mailbox_id,
        search_query="договор",
        date_from="2026-08-01T00:00:00+03:00",
        date_to="2026-08-31T23:59:59+03:00",
        pagination={"page": 1, "limit": 20, "offset": 0},
    ).response.result
    if not messages["items"]:
        raise RuntimeError("Письмо не найдено")

    message_id = messages["items"][0]["id"]

    create_result = client.mail.message.createcrmactivity(
        message_id=message_id,
    ).response.result

    message = client.mail.message.get(
        bitrix_id=message_id,
        select=["id", "subject", "from", "to", "bindings", "url"],
    ).response.result

    print(message["item"]["bindings"])
    ```

{% endlist %}

## Продолжите изучение

- [Получить список почтовых ящиков mail.mailbox.list](../../api-reference/mail/mailbox/mail-mailbox-list.md)
- [Получить список писем mail.message.list](../../api-reference/mail/message/mail-message-list.md)
- [Создать дело CRM из письма mail.message.createcrmactivity](../../api-reference/mail/message/mail-message-createcrmactivity.md)
- [Получить письмо mail.message.get](../../api-reference/mail/message/mail-message-get.md)
- [Удалить связь письма с делом CRM mail.message.removecrmactivity](../../api-reference/mail/message/mail-message-removecrmactivity.md)
