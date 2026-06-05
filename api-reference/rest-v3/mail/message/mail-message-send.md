# Отправить письмо mail.message.send

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`mail`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь, у которого есть доступ к почтовому ящику

Метод `mail.message.send` отправляет новое письмо от имени доступного отправителя.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
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

- JS

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'mail.message.send',
            {
                from: 'user@example.com',
                to: ['client@example.com'],
                subject: 'Коммерческое предложение',
                body: 'Здравствуйте. Отправляю материалы.'
            }
        );

        const result = response.getData().result;
        console.log('Success:', result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

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
        'mail.message.send',
        {
            from: 'user@example.com',
            to: ['client@example.com'],
            subject: 'Коммерческое предложение',
            body: 'Здравствуйте. Отправляю материалы.'
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
                "message": "Обязательное поле не указано",
                "field": "from"
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
|| `from` | Обязательное поле не указано | Передайте `from` в теле запроса ||
|| `to` | Обязательное поле `to` не указано | Передайте `to` в теле запроса ||
|| `subject` | Обязательное поле `subject` не указано | Передайте `subject` в теле запроса ||
|| `body` | Обязательное поле `body` не указано | Передайте `body` в теле запроса ||
|| `from` | MESSAGE_SEND_FAILED | Проверьте доступность отправителя и корректность параметров запроса ||
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

- [{#T}](./mail-message-reply.md)
- [{#T}](./mail-message-forward.md)
- [{#T}](../mailbox/mail-mailbox-senders.md)

<!-- Generated by skill-1-gen-docs from source: C:\Users\g.m.tagirova\original-bitrix\modules\mail\lib\Infrastructure\Rest\Controller\Message.php -->
<!-- Generated: 2026-05-26 -->
<!-- Требуется проверка: нет -->
