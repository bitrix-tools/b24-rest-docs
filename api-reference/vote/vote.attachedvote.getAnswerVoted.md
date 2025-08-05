# Получить список проголосовавших за ответ

> Название метода: **vote.AttachedVote.getAnswerVoted**
>
> Scope: [`vote`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правами чтения голосования

Метод возвращает список пользователей, проголосовавших за конкретный вариант ответа.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **attachId***
[`integer`](../data-types.md) | Идентификатор прикрепленного голосования ||
|| **answerId***
[`integer`](../data-types.md) | Идентификатор ответа ||
|| **pageNavigation**
[`object`](../data-types.md) | Параметры постраничной навигации (например, { size: 10, page: 1 })||
|| **userForMobileFormat**
[`boolean`](../data-types.md) | Формат данных пользователей для мобильных устройств. Значение по умолчанию: `false` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"attachId":**put_attach_id**,"answerId":**put_answer_id**,"pageNavigation":{"pageSize":**put_page_size**,"currentPage":**put_page**},"userForMobileFormat":false}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/vote.AttachedVote.getAnswerVoted
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"attachId":**put_attach_id**,"answerId":**put_answer_id**,"pageNavigation":{"pageSize":**put_page_size**,"currentPage":**put_page**},"userForMobileFormat":false,auth:"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/vote.AttachedVote.getAnswerVoted
    ```

- JS

    ```js
    BX24.callMethod(
        "vote.AttachedVote.getAnswerVoted",
        {
            "attachId": **put_attach_id**,
            "answerId": **put_answer_id**,
            "pageNavigation": {
                "pageSize": **put_page_size**
                "currentPage": **put_page**
            },
            "userForMobileFormat": false
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

    $result = CRest::call('vote.AttachedVote.getAnswerVoted',
        [
            'attachId' => **put_vote_id**,
            'answerId' => **put_vote_id**,
            'pageNavigation' =>
            [
                'pageSize' => **put_vote_id**,
                'page' => **put_page**,
            ],
            'userForMobileFormat' => false,
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
    "result": {
        "items": [
            {
                "id": 1,
                "login": "example@mail.com",
                "name": "Иван",
                "lastName": "Иванов",
                "secondName": null,
                "fullName": "Иван Иванов",
                "email": "example@mail.com",
                "workPhone": null,
                "workPosition": null,
                "link": "/company/personal/user/1/",
                "avatarSizeOriginal": "path",
                "avatarSize100": "path",
                "isAdmin": true,
                "isCollaber": false,
                "isExtranet": false,
                "personalMobile": null,
                "personalPhone": null,
                "lastActivityDate": "05.08.2025 14:15:06",
                "timezone": {
                    "timezone_type": 3,
                    "timezone": "Europe/Moscow"
                },
                "personalGender": ""
            }
        ]
    },
    "total": 1,
    "time": {
        "start": 1754396126.150915,
        "finish": 1754396126.195466,
        "duration": 0.04455113410949707,
        "processing": 0.03426194190979004,
        "date_start": "2025-08-05T15:15:26+03:00",
        "date_finish": "2025-08-05T15:15:26+03:00",
        "operating_reset_at": 1754396726,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Результат запроса ||
|| **total**
[`integer`](../data-types.md) | Общее количество проголосовавших за данный ответ ||
|| **time**
[`array`](../data-types.md) | Информация о времени выполнения запроса ||
|#

#### Элемент ответа result

#|
|| **items**
[`array`](../data-types.md) | Массив данных о проголосовавших пользователях ||
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
