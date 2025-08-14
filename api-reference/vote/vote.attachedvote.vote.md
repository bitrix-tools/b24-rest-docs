# Проголосовать в прикрепленном голосовании vote.AttachedVote.vote

> Scope: [`vote`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами участия в голосовании

Метод `vote.AttachedVote.vote` позволяет проголосовать в прикрепленном голосовании.

## Параметры метода

Доступно два варианта вызова метода.

### 1. Через идентификатор прикрепленного опроса

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **attachId***
[`integer`](../data-types.md) | Идентификатор прикрепленного голосования, получить можно методами [vote.AttachedVote.get](./vote.attachedvote.get.md) или [vote.AttachedVote.getMany](./vote.attachedvote.getMany.md) ||
|| **ballot***
[`object`](../data-types.md) | Данные голоса в формате:

```json
{
    "1": ["2", "3"],
    "2": ["5"]
}
```

Ключ - ID вопроса, значение - массив ID выбранных ответов. Получить ID вопроса и ответов можно методами [vote.AttachedVote.get](./vote.attachedvote.get.md) или [vote.AttachedVote.getMany](./vote.attachedvote.getMany.md).
Несколько вопросов в одном голосовании доступно в постах ленты, в сообщении чата в опросе доступен только один вопрос ||
|#

### 2. Через элемент с опросом

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **moduleId***
[`string`](../data-types.md) | Идентификатор модуля, возможные значения:
- `Im` для опроса в чате,
- `blog` для опроса в ленте ||
|| **entityType***
[`string`](../data-types.md) | Тип объекта, возможные значения:
- `Bitrix\\Vote\\Attachment\\ImMessageConnector` для опроса в чате,
- `Bitrix\\Vote\\Attachment\\BlogPostConnector` для опроса в ленте ||
|| **entityId***
[`integer`](../data-types.md) | Идентификатор элемента, возможные значения:
- `id` сообщения чата с опросом, получить можно методом [vote.Integration.Im.send](./vote.integration.im.send.md),
- `id` поста с опросом в ленте, получить можно методом [log.blogpost.get](../log/log-blogpost-get.md) ||
|| **ballot***
[`object`](../data-types.md) | Данные голоса в формате:

```json
{
    "1": ["2", "3"],
    "2": ["5"]
}
```

Ключ - ID вопроса, значение - массив ID выбранных ответов. Получить ID вопроса и ответов можно методами [vote.AttachedVote.get](./vote.attachedvote.get.md) или [vote.AttachedVote.getMany](./vote.attachedvote.getMany.md).
Несколько вопросов в одном голосовании доступно в постах ленты, в сообщении чата в опросе доступен только один вопрос ||
|#

### 3. Через подписанный идентификатор

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **signedAttachId***
[`string`](../data-types.md) | Подписанный идентификатор прикрепления, получить можно методом [vote.AttachedVote.get](./vote.attachedvote.get.md), параметр ответа `signedAttachId` ||
|| **ballot***
[`object`](../data-types.md) | Данные голоса в формате:

```json
{
    "1": ["2", "3"],
    "2": ["5"]
}
```

Ключ - ID вопроса, значение - массив ID выбранных ответов. Получить ID вопроса и ответов можно методами [vote.AttachedVote.get](./vote.attachedvote.get.md) или [vote.AttachedVote.getMany](./vote.attachedvote.getMany.md).
Несколько вопросов в одном голосовании доступно в постах ленты, в сообщении чата в опросе доступен только один вопрос ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"attachId":**put_attach_id**,"ballot":{"1":["2","3"],"2":["5"]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/vote.AttachedVote.vote
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"attachId":**put_attach_id**,"ballot":{"1":["2","3"],"2":["5"]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/vote.AttachedVote.vote
    ```

- JS

    ```js  
    try
    {
        const response = await $b24.callMethod(
            'vote.AttachedVote.vote',
            {
                attachId: **put_attach_id**,
                ballot: {
                    '1': ['2', '3'],
                    '2': ['5']
                }
            }
        );
        
        const result = response.getData().result;
        console.log('Created element with ID:', result);
        
        processResult(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php  
    try {
        $response = $b24Service
            ->core
            ->call(
                'vote.AttachedVote.vote',
                [
                    'attachId' => **put_attach_id**,
                    'ballot' => [
                        '1' => ['2', '3'],
                        '2' => ['5']
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding product row: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "vote.AttachedVote.vote",
        {
            "attachId": **put_attach_id**,
            "ballot": {
                "1": ["2", "3"],
                "2": ["5"]
            }
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

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'vote.AttachedVote.vote',
        [
            'attachId' => **put_attach_id**,
            'ballot' => [
                '1' => ['2', '3'],
                '2' => ['5']
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
[`object`](../data-types.md) | Корневой элемент ответа. Содержит объект `attach` с информацией о голосовании, структура описана [ниже](#attach) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент ответа attach {#attach}

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
[`integer`](../data-types.md) | Уровень анонимности опроса ||
|| **OPTIONS**
[`integer`](../data-types.md) | Доступность переголосования ||
|| **userAnswerMap**
[`array`](../data-types.md) | Карта ответов текущего пользователя ||
|| **canEdit**
[`bool`](../data-types.md) | Может ли текущий пользователь редактировать опрос ||
|| **canVote**
[`bool`](../data-types.md) | Может ли текущий пользователь проголосовать ||
|| **canRevote**
[`bool`](../data-types.md) | Может ли текущий пользователь переголосовать ||
|| **isVoted**
[`bool`](../data-types.md) | Проголосовал ли уже текущий пользователь ||
|| **signedAttachId**
[`string`](../data-types.md) | Подписанный идентификатор ||
|| **resultUrl**
[`string`](../data-types.md) | URL-адрес для просмотра результатов опроса ||
|| **downloadUrl**
[`string`](../data-types.md) | URL-адрес для скачивания результатов опроса ||
|| **entityId**
[`integer`](../data-types.md) | Идентификатор элемента, к которому прикреплен опрос ||
|| **isFinished**
[`bool`](../data-types.md) | Завершен ли опрос ||
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
|| `400` | Не удалось сохранить голосование ||
|| `ATTACH_READ_ACCESS_DENIED` | Нет прав для участия в голосовании ||
|| `403` | Опрос неактивен ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./vote.attachedvote.download.md)
- [{#T}](./vote.attachedvote.get.md)
- [{#T}](./vote.attachedvote.getAnswerVoted.md)
- [{#T}](./vote.attachedvote.getMany.md)
- [{#T}](./vote.attachedvote.getWithVoted.md)
- [{#T}](./vote.attachedvote.recall.md)
- [{#T}](./vote.attachedvote.resume.md)
- [{#T}](./vote.attachedvote.stop.md)
- [{#T}](./vote.integration.im.send.md)
