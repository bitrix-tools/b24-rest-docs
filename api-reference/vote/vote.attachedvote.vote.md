# Проголосовать в прикрепленном голосовании

> Название метода: **vote.AttachedVote.vote**
>
> Scope: [`vote`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правами участия в голосовании

Метод позволяет проголосовать в прикрепленном голосовании.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **attachId***
[`integer`](../data-types.md) | Идентификатор прикрепленного голосования ||
|| **ballot***
[`object`](../data-types.md) | Данные голоса - массив выбранных ответов

```json
{
    "1": ["2", "3"],
    "2": ["5"]
}
```

где ключ - ID вопроса, значение - массив ID выбранных ответов ||
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
    -d '{"attachId":**put_attach_id**,"ballot":{"**put_question_id**":[**put_array_of_answer_ids**]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/vote.AttachedVote.vote
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"attachId":**put_attach_id**,"ballot":{"**put_question_id**":[**put_array_of_answer_ids**]}auth:"**put_access_token_here**}' \
    https://**put_your_bitrix24_address**/rest/vote.AttachedVote.vote
    ```

- JS

    ```js
    BX24.callMethod(
        "vote.attachedvote.vote",
        {
            "attachId": **put_attach_id**,
            "ballot": {
                "**put_question_id**": [**put_array_of_answer_ids**]
            },
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

    $result = CRest::call('vote.AttachedVote.vote',
        [
            'attachId' => **put_attach_id**,
            'ballot' => ["**put_question_id**" => [**put_array_of_answer_ids**]],
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
                    "COUNTER": 1,
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
                            "COUNTER": 1,
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
                        "EVENT_ID": "27",
                        "EVENT_QUESTION_ID": "27",
                        "ANSWER_ID": "1",
                        "ID": "27",
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
    },
    "time": {
        "start": 1754466663.090774,
        "finish": 1754466663.180457,
        "duration": 0.08968305587768555,
        "processing": 0.07362222671508789,
        "date_start": "2025-08-06T10:51:03+03:00",
        "date_finish": "2025-08-06T10:51:03+03:00",
        "operating_reset_at": 1754467263,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа. Содержит информацию о голосовании ||
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

HTTP-статус: **403**

```json
{
    "error": "403",
    "error_description": "Опрос неактивен."
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `400` | VOTE_CONTROLLER_ATTACH_VOTE_DEFAULT_ERROR ||
|| `ATTACH_READ_ACCESS_DENIED` | Нет прав для участия в голосовании ||
|| `403` | Опрос неактивен. ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}
