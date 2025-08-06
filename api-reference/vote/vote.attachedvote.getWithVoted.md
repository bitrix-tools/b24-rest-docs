# Получить данные голосования с информацией о проголосовавших

> Название метода: **vote.AttachedVote.getWithVoted**
>
> Scope: [`vote`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правами чтения голосования

Метод возвращает данные прикрепленного голосования вместе с информацией о проголосовавших пользователях.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **attachId***
[`integer`](../data-types.md) | Идентификатор прикрепленного голосования ||
|| **pageSize**
[`integer`](../data-types.md) | Количество записей на странице для списка проголосовавших. Значение по умолчанию: `10` ||
|| **userForMobileFormat**
[`boolean`](../data-types.md) | Формат данных пользователей для мобильных устройств. Значение по умолчанию: `false` ||
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
|| **pageSize**
[`integer`](../data-types.md) | Количество записей на странице для списка проголосовавших. Значение по умолчанию: `10` ||
|| **userForMobileFormat**
[`boolean`](../data-types.md) | Формат данных пользователей для мобильных устройств. Значение по умолчанию: `false` ||
|#

Или через подписанный идентификатор:

#|
|| **Название**
`тип` | **Описание** ||
|| **signedAttachId***
[`string`](../data-types.md) | Подписанный идентификатор прикрепления ||
|| **pageSize**
[`integer`](../data-types.md) | Количество записей на странице для списка проголосовавших. Значение по умолчанию: `10` ||
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
    -d '{"attachId": **put_attach_id**,"pageSize":**put_page_size**}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/vote.AttachedVote.getWithVoted
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"attachId": **put_attach_id**,"pageSize":**put_page_size**,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/vote.AttachedVote.getWithVoted
    ```

- JS

    ```js
    BX24.callMethod(
        "vote.AttachedVote.getWithVoted",
        {
            "attachId": **put_attach_id**,
            "pageSize": **put_page_size**,
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

    $result = CRest::call('vote.AttachedVote.getWithVoted',
        [
            'attachId' => **put_attach_id**,
            'pageSize' => **put_page_size**,
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
    "attach": {
      "ID": 1,
      "VOTE_ID": 1,
      "COUNTER": 1,
      "QUESTIONS": {
        "1": {
          "ID": "1",
          "ACTIVE": "Y",
          "TIMESTAMP_X": "2025-08-05T09:08:31+03:00",
          "VOTE_ID": "1",
          "C_SORT": "10",
          "COUNTER": "1",
          "QUESTION": "Как дела?",
          "QUESTION_TYPE": "text",
          "IMAGE_ID": null,
          "DIAGRAM": "Y",
          "DIAGRAM_TYPE": "histogram",
          "REQUIRED": "N",
          "FIELD_TYPE": "0",
          "FIELD_NAME": "bx_vote_event[1][BALLOT][1]",
          "IMAGE": null,
          "ANSWERS": {
            "1": {
              "ID": "1",
              "ACTIVE": "Y",
              "TIMESTAMP_X": "2025-08-05T09:08:31+03:00",
              "QUESTION_ID": "1",
              "C_SORT": "10",
              "IMAGE_ID": null,
              "MESSAGE": "Отлично!",
              "MESSAGE_TYPE": "text",
              "COUNTER": "1",
              "FIELD_TYPE": "0",
              "FIELD_WIDTH": "0",
              "FIELD_HEIGHT": "0",
              "FIELD_PARAM": null,
              "COLOR": "",
              "REACTION": "",
              "~FIELD_NAME": "bx_vote_event[1][BALLOT][1]",
              "FIELD_NAME": "bx_vote_event[1][BALLOT][1]",
              "MESSAGE_FIELD_NAME": "bx_vote_event[1][MESSAGE][1][1]",
              "~PERCENT": 100,
              "PERCENT": 100
            },
            "3": {
              "ID": "3",
              "ACTIVE": "Y",
              "TIMESTAMP_X": "2025-08-05T09:08:31+03:00",
              "QUESTION_ID": "1",
              "C_SORT": "20",
              "IMAGE_ID": null,
              "MESSAGE": "Лучше всех!",
              "MESSAGE_TYPE": "text",
              "COUNTER": "0",
              "FIELD_TYPE": "0",
              "FIELD_WIDTH": "0",
              "FIELD_HEIGHT": "0",
              "FIELD_PARAM": null,
              "COLOR": "",
              "REACTION": "",
              "~FIELD_NAME": "bx_vote_event[1][BALLOT][1]",
              "FIELD_NAME": "bx_vote_event[1][BALLOT][1]",
              "MESSAGE_FIELD_NAME": "bx_vote_event[1][MESSAGE][1][3]",
              "~PERCENT": 0,
              "PERCENT": 0
            },
            "5": {
              "ID": "5",
              "ACTIVE": "Y",
              "TIMESTAMP_X": "2025-08-05T09:08:31+03:00",
              "QUESTION_ID": "1",
              "C_SORT": "30",
              "IMAGE_ID": null,
              "MESSAGE": "Какие дела??",
              "MESSAGE_TYPE": "text",
              "COUNTER": "0",
              "FIELD_TYPE": "0",
              "FIELD_WIDTH": "0",
              "FIELD_HEIGHT": "0",
              "FIELD_PARAM": null,
              "COLOR": "",
              "REACTION": "",
              "~FIELD_NAME": "bx_vote_event[1][BALLOT][1]",
              "FIELD_NAME": "bx_vote_event[1][BALLOT][1]",
              "MESSAGE_FIELD_NAME": "bx_vote_event[1][MESSAGE][1][5]",
              "~PERCENT": 0,
              "PERCENT": 0
            }
          }
        }
      },
      "ANONYMITY": 1,
      "OPTIONS": 1,
      "userAnswerMap": {
        "1": {
          "1": {
            "EVENT_ID": "1",
            "EVENT_QUESTION_ID": "1",
            "ANSWER_ID": "1",
            "ID": "1",
            "MESSAGE": ""
          }
        }
      },
      "canEdit": true,
      "canVote": false,
      "canRevote": true,
      "isVoted": true,
      "signedAttachId": "1.52280488561bf567f33cf03b5ce353e154a9c3552b51b2ffb67be3bb7f26f986",
      "resultUrl": "/vote-result/me7hn922bm011mbf",
      "downloadUrl": "/bitrix/services/main/ajax.php?action=vote.AttachedVote.download&SITE_ID=s1&signedAttachId=1.52280488561bf567f33cf03b5ce353e154a9c3552b51b2ffb67be3bb7f26f986",
      "entityId": 13,
      "isFinished": false
    },
    "voted": {
      "1": [
        {
          "id": 1,
          "login": "example@mail.ru",
          "name": "Иван ",
          "lastName": "Иванов",
          "secondName": null,
          "fullName": "Иван Иванов",
          "email": "example@mail.ru",
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
          "lastActivityDate": "06.08.2025 07:55:12",
          "timezone": {
            "timezone_type": 3,
            "timezone": "Europe/Moscow"
          },
          "personalGender": ""
        }
      ]
    }
  },
  "time": {
    "start": 1754459757.190891,
    "finish": 1754459757.338084,
    "duration": 0.14719295501708984,
    "processing": 0.12357878684997559,
    "date_start": "2025-08-06T08:55:57+03:00",
    "date_finish": "2025-08-06T08:55:57+03:00",
    "operating_reset_at": 1754460357,
    "operating": 0.12356209754943848
  }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Результат запроса ||
|| **time**
[`array`](../data-types.md) | Информация о времени выполнения запроса ||
|#

#### Элемент ответа result

|| **attach**
[`attached_vote`](data-types.md) | Данные прикрепленного голосования ||
|| **voted**
[`object`](../data-types.md) | Информация о проголосовавших пользователях ||

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
