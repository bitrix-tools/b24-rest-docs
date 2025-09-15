# Получить данные прикрепленного голосования vote.AttachedVote.get

> Scope: [`vote`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами чтения голосования

Метод `vote.AttachedVote.get` возвращает данные прикрепленного голосования.

## Параметры метода

Доступно три варианта вызова метода.

### 1. Через идентификатор прикрепленного опроса

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **attachId***
[`integer`](../data-types.md) | Идентификатор прикрепленного голосования, может быть равен `voteId` из результатов [vote.Integration.Im.send](./vote.integration.im.send.md) ||
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
|#

### 3. Через подписанный идентификатор

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **signedAttachId***
[`string`](../data-types.md) | Подписанный идентификатор прикрепления, получить можно методом [vote.AttachedVote.get](./vote.attachedvote.get.md), параметр ответа `signedAttachId` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

Пример вызова через идентификатор привязанного опроса.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"attachId":**put_attach_id**}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/vote.AttachedVote.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"attachId":**put_attach_id**,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/vote.AttachedVote.get
    ```

- JS

    ```js  
    try
    {
        const response = await $b24.callMethod(
            'vote.AttachedVote.get',
            {
                attachId: **put_attach_id**
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
                'vote.AttachedVote.get',
                [
                    'attachId' => **put_attach_id**
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

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'vote.AttachedVote.get',
        [
            'attachId' => **put_attach_id**
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Пример вызова через связанный с опросом элемент.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"moduleId":"im","entityType":"Bitrix\\Vote\\Attachment\\ImMessageConnector","entityId":32221}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/vote.AttachedVote.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"moduleId":"im","entityType":"Bitrix\\Vote\\Attachment\\ImMessageConnector","entityId":32221,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/vote.AttachedVote.get
    ```

- JS

    ```js  
    try
    {
        const response = await $b24.callMethod(
            'vote.AttachedVote.get',
            {
                moduleId: 'im',
                entityType: 'Bitrix\\Vote\\Attachment\\ImMessageConnector',
                entityId: 32221
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
                'vote.AttachedVote.get',
                [
                    'moduleId' => 'im',
                    'entityType' => 'Bitrix\\Vote\\Attachment\\ImMessageConnector',
                    'entityId' => 32221
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
        "vote.AttachedVote.get",
        {
            "moduleId": "im",
            "entityType": "Bitrix\\Vote\\Attachment\\ImMessageConnector",
            "entityId": 32221
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
        'vote.AttachedVote.get',
        [
            'moduleId' => 'im',
            'entityType' => 'Bitrix\\Vote\\Attachment\\ImMessageConnector',
            'entityId' => 32221
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
[`object`](../data-types.md) | Корневой элемент ответа. Содержит объект `attach` с информацией о прикрепленном голосовании, структура описана [ниже](#attach) ||
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

HTTP-статус: **400** 

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
- [{#T}](./vote.attachedvote.getAnswerVoted.md)
- [{#T}](./vote.attachedvote.getMany.md)
- [{#T}](./vote.attachedvote.getWithVoted.md)
- [{#T}](./vote.attachedvote.recall.md)
- [{#T}](./vote.attachedvote.resume.md)
- [{#T}](./vote.attachedvote.stop.md)
- [{#T}](./vote.attachedvote.vote.md)
- [{#T}](./vote.integration.im.send.md)
