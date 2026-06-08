# Получить список писем mail.message.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`mail`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `mail.message.list` возвращает список писем по заданным условиям.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **mailboxId**
[`integer`](../../../data-types.md) | Идентификатор почтового ящика.

Идентификатор можно получить методом [mail.mailbox.list](../mailbox/mail-mailbox-list.md) ||
|| **searchQuery**
[`string`](../../../data-types.md) | Строка для поиска писем по содержимому и метаданным письма ||
|| **dateFrom**
[`string`](../../../data-types.md) | Начало периода выборки писем в формате ISO 8601, например `2026-01-01T00:00:00+03:00` ||
|| **dateTo**
[`string`](../../../data-types.md) | Конец периода выборки писем в формате ISO 8601, например `2026-01-31T23:59:59+03:00` ||
|| **isSeen**
[`boolean`](../../../data-types.md) | Фильтр по признаку прочтения письма.

Возможные значения:

- `true` — только прочитанные
- `false` — только непрочитанные ||
|| **hasAttachments**
[`boolean`](../../../data-types.md) | Фильтр по наличию вложений.

Возможные значения:

- `true` — только письма с вложениями
- `false` — только письма без вложений ||
|| **folder**
[`string`](../../../data-types.md) | Имя или путь почтовой папки ||
|| **pagination**
[`object`](../../../data-types.md) | Параметры постраничной навигации:
- `page` — номер страницы
- `limit` — количество записей на страницу, по умолчанию `25`, максимум `200`
- `offset` — смещение записей. Если переданы `page` и `limit`, смещение вычисляется автоматически ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/mail.message.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"mailboxId":1,"searchQuery":"договор","hasAttachments":true,"pagination":{"page":1,"limit":20,"offset":0}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/mail.message.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"mailboxId":1,"searchQuery":"договор","hasAttachments":true,"pagination":{"page":1,"limit":20,"offset":0},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/mail.message.list
    ```

- JS

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'mail.message.list',
            {
                mailboxId: 1,
                searchQuery: 'договор',
                hasAttachments: true,
                pagination: {
                    page: 1,
                    limit: 20,
                    offset: 0
                }
            }
        );

        const result = response.getData().result;
        console.log('Message list:', result);
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
                'mail.message.list',
                [
                    'mailboxId' => 1,
                    'searchQuery' => 'договор',
                    'hasAttachments' => true,
                    'pagination' => [
                        'page' => 1,
                        'limit' => 20,
                        'offset' => 0
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
        'mail.message.list',
        {
            mailboxId: 1,
            searchQuery: 'договор',
            hasAttachments: true,
            pagination: {
                page: 1,
                limit: 20,
                offset: 0
            }
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
        'mail.message.list',
        [
            'mailboxId' => 1,
            'searchQuery' => 'договор',
            'hasAttachments' => true,
            'pagination' => [
                'page' => 1,
                'limit' => 20,
                'offset' => 0
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
        "items": [
            {
                "id": 15,
                "mailboxId": 1,
                "mailboxEmail": "user@example.com",
                "subject": "Договор",
                "from": "client@example.com",
                "to": "user@example.com",
                "cc": "",
                "date": "2026-05-25T10:00:00+03:00",
                "isSeen": true,
                "hasAttachments": true,
                "url": "https://example.bitrix24.ru/mail/message/15/",
                "bindings": [],
                "body": "Текст письма"
            }
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
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **items**
[`array`](../../../data-types.md) | Массив объектов писем ||
|| **items[]**
[`object`](../../../data-types.md) | Объект письма ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор письма ||
|| **mailboxId**
[`integer`](../../../data-types.md) | Идентификатор почтового ящика ||
|| **mailboxEmail**
[`string`](../../../data-types.md) | Email почтового ящика ||
|| **subject**
[`string`](../../../data-types.md) | Тема письма ||
|| **from**
[`string`](../../../data-types.md) | Отправитель письма ||
|| **to**
[`string`](../../../data-types.md) | Получатели письма ||
|| **cc**
[`string`](../../../data-types.md) | Копия письма ||
|| **date**
[`string`](../../../data-types.md) | Дата и время письма ||
|| **isSeen**
[`boolean`](../../../data-types.md) | Признак прочтения письма ||
|| **hasAttachments**
[`boolean`](../../../data-types.md) | Признак наличия вложений ||
|| **url**
[`string`](../../../data-types.md) | Ссылка на письмо ||
|| **bindings**
[`array`](../../../data-types.md) | Связи письма с объектами ||
|| **body**
[`string`](../../../data-types.md) | Тело письма ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION",
        "message": "Не удается распознать параметр пагинации `{\"limit\":\"abc\"}`"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя и scope `mail` ||
|#

#### Ошибки пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `limit`
`offset`
`page` | Не удается распознать параметр пагинации `#PAGE#` | Передайте числовые значения. `limit` не должен быть равен `0` ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `dateFrom` | Параметр `dateFrom` должен быть в формате ISO 8601 (DATE_ATOM), например `2026-01-01T00:00:00+00:00` | Передайте дату в формате ISO 8601 ||
|| `dateTo` | Параметр `dateTo` должен быть в формате ISO 8601 (DATE_ATOM), например `2026-01-01T00:00:00+00:00` | Передайте дату в формате ISO 8601 ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./mail-message-get.md)
- [{#T}](./mail-message-field-list.md)
- [{#T}](./index.md)
