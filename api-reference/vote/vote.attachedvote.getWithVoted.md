# Получить данные голосования с информацией о проголосовавших vote.AttachedVote.getWithVoted

> Scope: [`vote`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правами чтения голосования

Метод `vote.AttachedVote.getWithVoted` возвращает данные прикрепленного голосования вместе с информацией о проголосовавших пользователях.

## Параметры метода

Доступно три варианта вызова метода.

### 1. Через идентификатор прикрепленного опроса

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **attachId***
[`integer`](../data-types.md) | Идентификатор прикрепленного голосования, получить можно методами [vote.AttachedVote.get](./vote.attachedvote.get.md) или [vote.AttachedVote.getMany](./vote.attachedvote.getMany.md) ||
|| **pageSize**
[`integer`](../data-types.md) | Количество записей на странице для списка проголосовавших. 
Значение по умолчанию: `10` ||
|| **userForMobileFormat**
[`boolean`](../data-types.md) | Формат данных пользователей для мобильных устройств. 
Значение по умолчанию: `false` ||
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
|| **pageSize**
[`integer`](../data-types.md) | Количество записей на странице для списка проголосовавших. 
Значение по умолчанию: `10` ||
|| **userForMobileFormat**
[`boolean`](../data-types.md) | Формат данных пользователей для мобильных устройств. 
Значение по умолчанию: `false` ||
|#

### 3. Через подписанный идентификатор

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **signedAttachId***
[`string`](../data-types.md) | Подписанный идентификатор прикрепления, получить можно методом [vote.AttachedVote.get](./vote.attachedvote.get.md), параметр ответа `signedAttachId` ||
|| **pageSize**
[`integer`](../data-types.md) | Количество записей на странице для списка проголосовавших. 
Значение по умолчанию: `10` ||
|| **userForMobileFormat**
[`boolean`](../data-types.md) | Формат данных пользователей для мобильных устройств. 
Значение по умолчанию: `false` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"attachId":**put_attach_id**,"pageSize":**put_page_size**,"userForMobileFormat":false}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/vote.AttachedVote.getWithVoted
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"attachId":**put_attach_id**,"pageSize":**put_page_size**,"userForMobileFormat":false,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/vote.AttachedVote.getWithVoted
    ```

- JS

    ```js  
    try
    {
        const response = await $b24.callMethod(
            'vote.AttachedVote.getWithVoted',
            {
                attachId: **put_attach_id**,
                pageSize: **put_page_size**,
                userForMobileFormat: false
            }
        );
        
        const result = response.getData().result;
        console.log('Dat a:', result);
        
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
                'vote.AttachedVote.getWithVoted',
                [
                    'attachId' => **put_attach_id**,
                    'pageSize' => **put_page_size**,
                    'userForMobileFormat' => false
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

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

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'vote.AttachedVote.getWithVoted',
        [
            'attachId' => **put_attach_id**,
            'pageSize' => **put_page_size**,
            'userForMobileFormat' => false
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
                    "TIMESTAMP_X": "2025-08-12T11:47:50+03:00",
                    "VOTE_ID": "1",
                    "C_SORT": "10",
                    "COUNTER": "1",
                    "QUESTION": "Первое рест голосование",
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
                            "TIMESTAMP_X": "2025-08-12T11:47:50+03:00",
                            "QUESTION_ID": "1",
                            "C_SORT": "10",
                            "IMAGE_ID": null,
                            "MESSAGE": "первый вариант",
                            "MESSAGE_TYPE": "html",
                            "COUNTER": "0",
                            "FIELD_TYPE": "0",
                            "FIELD_WIDTH": "0",
                            "FIELD_HEIGHT": "0",
                            "FIELD_PARAM": null,
                            "COLOR": "",
                            "REACTION": "",
                            "~FIELD_NAME": "bx_vote_event[1][BALLOT][1]",
                            "FIELD_NAME": "bx_vote_event[1][BALLOT][1]",
                            "MESSAGE_FIELD_NAME": "bx_vote_event[1][MESSAGE][1][1]",
                            "~PERCENT": 0,
                            "PERCENT": 0
                        },
                        "3": {
                            "ID": "3",
                            "ACTIVE": "Y",
                            "TIMESTAMP_X": "2025-08-12T11:47:50+03:00",
                            "QUESTION_ID": "1",
                            "C_SORT": "20",
                            "IMAGE_ID": null,
                            "MESSAGE": "Второй вариант",
                            "MESSAGE_TYPE": "html",
                            "COUNTER": "1",
                            "FIELD_TYPE": "0",
                            "FIELD_WIDTH": "0",
                            "FIELD_HEIGHT": "0",
                            "FIELD_PARAM": null,
                            "COLOR": "",
                            "REACTION": "",
                            "~FIELD_NAME": "bx_vote_event[1][BALLOT][1]",
                            "FIELD_NAME": "bx_vote_event[1][BALLOT][1]",
                            "MESSAGE_FIELD_NAME": "bx_vote_event[1][MESSAGE][1][3]",
                            "~PERCENT": 100,
                            "PERCENT": 100
                        },
                        "5": {
                            "ID": "5",
                            "ACTIVE": "Y",
                            "TIMESTAMP_X": "2025-08-12T11:47:50+03:00",
                            "QUESTION_ID": "1",
                            "C_SORT": "30",
                            "IMAGE_ID": null,
                            "MESSAGE": "Третий вариант",
                            "MESSAGE_TYPE": "html",
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
            "ANONYMITY": 0,
            "OPTIONS": 0,
            "userAnswerMap": {
                "1": {
                    "3": {
                        "EVENT_ID": "1",
                        "EVENT_QUESTION_ID": "1",
                        "ANSWER_ID": "3",
                        "ID": "1",
                        "MESSAGE": ""
                    }
                }
            },
            "canEdit": true,
            "canVote": false,
            "canRevote": false,
            "isVoted": true,
            "signedAttachId": "1.d6db75c1a03fe2313547841960f1d4e95906721cf211763be19855fc6aeec45b",
            "resultUrl": "\/vote-result\/qgp3r31sg4vj5vas",
            "downloadUrl": "\/bitrix\/services\/main\/ajax.php?action=vote.AttachedVote.download\u0026SITE_ID=s1\u0026signedAttachId=1.d6db75c1a03fe2313547841960f106721cf211763be19855fc6aeec45b",
            "entityId": 32219,
            "isFinished": false
        },
        "voted": {
            "3": [
                {
                    "ID": 1,
                    "NAME": "Саша",
                    "IMAGE": "https:\/\/your-domain.bitrix24.ru\/b13743910\/resize_cache\/2267\/cec8d72046af30148f6f5b573a3a0aa8\/main\/c7b\/c7bd44b1bab25dd97d038ce1b\/d5fb56b94dc2c3cd8c006a2c595a4895.jpg",
                    "WORK_POSITION": ""
                }
            ]
        }
    },
    "time": {
        "start": 1755077476.824466,
        "finish": 1755077476.928421,
        "duration": 0.10395503044128418,
        "processing": 0.10184097290039062,
        "date_start": "2025-08-13T12:31:16+03:00",
        "date_finish": "2025-08-13T12:31:16+03:00",
        "operating_reset_at": 1755078076,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа. Содержит информацию о голосовании и проголосовавших, структура описана [ниже](#result) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент ответа result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **attach**
[`attached_vote`](../data-types.md) | Данные прикрепленного голосования, структура описана [ниже](#attach) ||
|| **voted**
[`object`](../data-types.md) | Информация о проголосовавших пользователях, структура описана [ниже](#voted) ||
|#

##### Элемент ответа attach {#attach}

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

##### Элемент ответа voted {#voted}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор пользователя ||
|| **NAME**
[`string`](../data-types.md) | Имя пользователя ||
|| **IMAGE**
[`string`](../data-types.md) | Ссылка на изображение пользователя ||
|| **WORK_POSITION**
[`string`](../data-types.md) | Должность пользователя ||
|#

## Обработка ошибок

HTTP-статус: **4xx**

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
|| `ATTACH_NOT_FOUND` | Голосование не найдено ||
|| `ATTACH_READ_ACCESS_DENIED` | Нет прав для участия в голосовании  ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./vote.attachedvote.download.md)
- [{#T}](./vote.attachedvote.get.md)
- [{#T}](./vote.attachedvote.getAnswerVoted.md)
- [{#T}](./vote.attachedvote.getMany.md)
- [{#T}](./vote.attachedvote.recall.md)
- [{#T}](./vote.attachedvote.resume.md)
- [{#T}](./vote.attachedvote.stop.md)
- [{#T}](./vote.attachedvote.vote.md)
- [{#T}](./vote.integration.im.send.md)
