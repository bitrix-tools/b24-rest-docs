# Получить данные прикрепленного голосования

> Название метода: **vote.AttachedVote.get**
>
> Scope: [`vote`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правами чтения голосования

Метод возвращает данные прикрепленного голосования по его идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **attachId***
[`integer`](../data-types.md) | Идентификатор прикрепленного голосования ||
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
|#

Или через подписанный идентификатор:

#|
|| **Название**
`тип` | **Описание** ||
|| **signedAttachId***
[`string`](../data-types.md) | Подписанный идентификатор прикрепления ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"attachId": **put_attach_id**}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/vote.AttachedVote.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"attachId": **put_attach_id**, "auth": "**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/vote.AttachedVote.get
    ```

- JS

    ```js
    BX24.callMethod(
        "vote.AttachedVote.get",
        {
            "attachId": **put_attach_id**
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

    $result = CRest::call('vote.AttachedVote.get', ['attachId' => **put_attach_id**]);

    echo '<pre>';
        print_r($result);
    echo '</pre>';

    ```


{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
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
  }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа. Содержит информацию о прикрепленном голосовании ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент ответа result

#|
|| **Название**
`тип` | **Описание** ||
|| **attach**
[`object`](../data-types.md) | Данные прикрепленного голосования ||
|#

##### Элемент ответа attach

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор прикрепленного голосования ||
|| **VOTE_ID**
[`integer`](../data-types.md) | Идентификатор самого голосования ||
|| **COUNTER**
[`integer`](../data-types.md) | Счетчик голосов ||
|| **QUESTIONS**
[`array`](../data-types.md) | Массив с вопросами опроса ||
|| **ANONYMITY**
[`integer`](../data-types.md) | Флаг, определяющий уровень анонимности опроса ||
|| **OPTIONS**
[`integer`](../data-types.md) | Битовая маска с опциями опроса ||
|| **userAnswerMap**
[`array`](../data-types.md) | Карта ответов текущего пользователя ||
|| **canEdit**
[`bool`](../data-types.md) | Флаг, указывающий, может ли текущий пользователь редактировать опрос ||
|| **canVote**
[`bool`](../data-types.md) | Флаг, указывающий, может ли текущий пользователь проголосовать ||
|| **canRevote**
[`bool`](../data-types.md) | Флаг, указывающий, может ли текущий пользователь переголосовать ||
|| **isVoted**
[`bool`](../data-types.md) | Флаг, показывающий, проголосовал ли уже текущий пользователь ||
|| **signedAttachId**
[`string`](../data-types.md) | Подписанный идентификатор ||
|| **resultUrl**
[`string`](../data-types.md) | URL-адрес для просмотра результатов опроса ||
|| **downloadUrl**
[`string`](../data-types.md) | URL-адрес для скачивания результатов опроса ||
|| **entityId**
[`integer`](../data-types.md) | Идентификатор сущности, к которой прикреплен опрос ||
|| **isFinished**
[`bool`](../data-types.md) | Флаг, указывающий, завершен ли опрос ||
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
