# Возобновить голосование

> Название метода: **vote.AttachedVote.resume**
>
> Scope: [`vote`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами редактирования голосования

Метод возобновляет остановленное голосование, позволяя пользователям снова участвовать в нем.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **attachId***
[`integer`](../data-types.md)| Идентификатор прикрепленного голосования ||
|| **actionUuid**
[`string`](../data-types.md) | Уникальный идентификатор действия для предотвращения дублирования ||
|#

Альтернативный вариант вызова:

#|
|| **Название**
`тип` | **Описание** ||
|| **moduleId***
[`string`](../data-types.md) | Идентификатор модуля ||
|| **entityType***
[`string`](../data-types.md) | Тип сущности ||
|| **entityId***
[`integer`](../data-types.md) | Идентификатор сущности ||
|| **actionUuid**
[`string`](../data-types.md) | Уникальный идентификатор действия для предотвращения дублирования ||
|#

Или через подписанный идентификатор:

#|
|| **Название**
`тип` | **Описание** ||
|| **signedAttachId***
[`string`](../data-types.md) | Подписанный идентификатор прикрепления ||
|| **actionUuid**
[`string`](../data-types.md) | Уникальный идентификатор действия для предотвращения дублирования ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"attachId":**put_attach_id**}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/vote.AttachedVote.resume
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"attachId":**put_attach_id**,auth:"**put_access_token_here**}' \
    https://**put_your_bitrix24_address**/rest/vote.AttachedVote.resume
    ```

- JS

    ```js
    BX24.callMethod(
        "vote.AttachedVote.resume",
        {
            "attachId": **put_attach_id**,
        },
        function(result)
        {
            if(result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.dir(result.data());
            }
        }
    );
    ```

- PHP

    ```php
    <?php
    require_once('src/crest.php');

    $result = CRest::call('vote.AttachedVote.resume',
        [
            'attachId' => **put_attach_id**,
        ]
    );

    echo '<pre>';
        print_r($result);
    echo '</pre>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [],
    "time": {
        "start": 1754464002.144207,
        "finish": 1754464002.182058,
        "duration": 0.03785109519958496,
        "processing": 0.020069122314453125,
        "date_start": "2025-08-06T10:06:42+03:00",
        "date_finish": "2025-08-06T10:06:42+03:00",
        "operating_reset_at": 1754464602,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Пустой массив при успешном выполнении операции ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **4xx** (например, 401, 403)

В случае ошибки (например, неверный id голосования), метод вернет стандартный для REST API объект с описанием ошибки.

```json
{
    "error": "ATTACH_NOT_FOUND",
    "error_description": "Attach not found"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ATTACH_NOT_FOUND` | Attach not found ||
|| `` | Attach read access denied ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}
