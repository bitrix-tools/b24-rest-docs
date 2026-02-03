# Получить запись журнала main.eventlog.get

> Scope: [`main`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `main.eventlog.get` возвращает запись журнала событий по идентификатору.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор записи журнала ||
|| **select**
[`array`](../../data-types.md) | Список полей, которые нужно вернуть в ответе.

Доступные поля:
- `id` — идентификатор записи журнала
- `timestampX` — дата и время события
- `severity` — уровень важности события
- `auditTypeId` — тип события
- `moduleId` — идентификатор модуля
- `itemId` — идентификатор объекта
- `remoteAddr` — IP-адрес
- `userAgent` — User-Agent запроса
- `requestUri` — URI запроса
- `siteId` — идентификатор сайта
- `userId` — идентификатор пользователя
- `guestId` — идентификатор гостя
- `description` — описание события ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/main.eventlog.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1250}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/main.eventlog.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1250,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/main.eventlog.get
    ```

- JS

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'main.eventlog.get',
            {
                id: 1250
            }
        );

        const result = response.getData().result;
        console.log('Event log item:', result);
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
                'main.eventlog.get',
                [
                    'id' => 1250
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
        'main.eventlog.get',
        {
            id: 1250
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
        'main.eventlog.get',
        [
            'id' => 1250
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
            "id": 115955,
            "timestampX": "2026-01-30T16:00:39+03:00",
            "severity": "SECURITY",
            "auditTypeId": "USER_AUTHORIZE",
            "moduleId": "main",
            "itemId": "1",
            "remoteAddr": "92.50.195.50",
            "userAgent": "Mozilla\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/144.0.0.0 Safari\/537.36",
            "requestUri": "\/",
            "siteId": "s1",
            "userId": 1,
            "guestId": 0,
            "description": "{\u0022userId\u0022:1,\u0022storedAuthId\u0022:1310,\u0022requestId\u0022:\u0022ea604c292209f5c562c653ba025b801e-1\u0022,\u0022method\u0022:\u0022cookie\u0022}"
        }
    },
    "time": {
        "start": 1769779221,
        "finish": 1769779222.060889,
        "duration": 1.0608890056610107,
        "processing": 0,
        "date_start": "2026-01-30T16:20:21+03:00",
        "date_finish": "2026-01-30T16:20:22+03:00",
        "operating_reset_at": 1769779822,
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
[`object`](../../data-types.md) | Объект записи журнала ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор записи журнала ||
|| **timestampX**
[`datetime`](../../data-types.md#datetime) | Дата и время события ||
|| **severity**
[`string`](../../data-types.md) | Уровень важности события ||
|| **auditTypeId**
[`string`](../../data-types.md) | Тип события ||
|| **moduleId**
[`string`](../../data-types.md) | Идентификатор модуля ||
|| **itemId**
[`string`](../../data-types.md) | Идентификатор объекта ||
|| **remoteAddr**
[`string`](../../data-types.md) | IP-адрес ||
|| **userAgent**
[`string`](../../data-types.md) | User-Agent запроса ||
|| **requestUri**
[`string`](../../data-types.md) | URI запроса ||
|| **siteId**
[`string`](../../data-types.md) | Идентификатор сайта ||
|| **userId**
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|| **guestId**
[`integer`](../../data-types.md) | Идентификатор гостя ||
|| **description**
[`string`](../../data-types.md) | Описание события ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `999999` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Нет прав администратора или не хватает scope main ||
|#

#### Ошибки нахождения данных

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Укажите `id` существующей записи журнала ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./main-eventlog-list.md)
- [{#T}](./main-eventlog-tail.md)
- [{#T}](./index.md)
