# Остановить голосование

> Название метода: **vote.AttachedVote.stop**
>
> Scope: [`vote`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами редактирования голосования

Метод останавливает активное голосование, запрещая дальнейшее участие в нем.

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/vote.AttachedVote.stop
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"attachId":**put_attach_id**,auth:"**put_access_token_here**}' \
    https://**put_your_bitrix24_address**/rest/vote.AttachedVote.stop
    ```

- JS

    ```js
    BX24.callMethod(
        "vote.AttachedVote.stop",
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

    $result = CRest::call('vote.AttachedVote.stop',
        [
            'attachId' => **put_attach_id**,
        ]
    );

    echo '<pre>';
        print_r($result);
    echo '</pre>';
    ```

{% endlist %}

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [],
    "time": {
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00"
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