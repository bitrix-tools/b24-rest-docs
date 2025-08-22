# Возобновить голосование vote.AttachedVote.resume

> Scope: [`vote`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами редактирования голосования

Метод `vote.AttachedVote.resume` возобновляет остановленное голосование, позволяя пользователям снова участвовать в нем.

## Параметры метода

Доступно три варианта вызова метода.

### 1. Через идентификатор прикрепленного опроса

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **attachId***
[`integer`](../data-types.md)| Идентификатор прикрепленного голосования, получить можно методами [vote.AttachedVote.get](./vote.attachedvote.get.md) или [vote.AttachedVote.getMany](./vote.attachedvote.getMany.md) ||
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
    -d '{"attachId":**put_attach_id**,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/vote.AttachedVote.resume
    ```

- JS

    ```js  
    try
    {
        const response = await $b24.callMethod(
            'vote.AttachedVote.resume',
            {
                attachId: **put_attach_id**
            }
        );
        
        const result = response.getData().result;
        console.log('Resumed vote with ID:', result);
        
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
                'vote.AttachedVote.resume',
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
        echo 'Error resuming vote: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "vote.AttachedVote.resume",
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
        'vote.AttachedVote.resume',
        [
            'attachId' => **put_attach_id**
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
- [{#T}](./vote.attachedvote.getWithVoted.md)
- [{#T}](./vote.attachedvote.recall.md)
- [{#T}](./vote.attachedvote.stop.md)
- [{#T}](./vote.attachedvote.vote.md)
- [{#T}](./vote.integration.im.send.md)
