# Получить список проголосовавших за ответ vote.AttachedVote.getAnswerVoted

> Scope: [`vote`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами чтения голосования

Метод `vote.AttachedVote.getAnswerVoted` возвращает список пользователей, проголосовавших за указанный вариант ответа.

## Параметры метода

Доступно три варианта вызова метода.

### 1. Через идентификатор прикрепленного опроса

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **attachId***
[`integer`](../data-types.md) | Идентификатор прикрепленного голосования, получить можно методами [vote.AttachedVote.get](./vote.attachedvote.get.md) или [vote.AttachedVote.getMany](./vote.attachedvote.getMany.md) ||
|| **answerId***
[`integer`](../data-types.md) | Идентификатор ответа, получить можно методами [vote.AttachedVote.get](./vote.attachedvote.get.md) или [vote.AttachedVote.getMany](./vote.attachedvote.getMany.md) ||
|| **pageNavigation**
[`object`](../data-types.md) | Параметры постраничной навигации, например { size: 10, page: 1 } ||
|| **userForMobileFormat**
[`boolean`](../data-types.md) | Формат данных пользователей для мобильных устройств. Значение по умолчанию: `false` ||
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
|| **answerId***
[`integer`](../data-types.md) | Идентификатор ответа, получить можно методами [vote.AttachedVote.get](./vote.attachedvote.get.md) или [vote.AttachedVote.getMany](./vote.attachedvote.getMany.md) ||
|| **pageNavigation**
[`object`](../data-types.md) | Параметры постраничной навигации, например { size: 10, page: 1 } ||
|| **userForMobileFormat**
[`boolean`](../data-types.md) | Формат данных пользователей для мобильных устройств. Значение по умолчанию: `false` ||
|#

### 3. Через подписанный идентификатор

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **signedAttachId***
[`string`](../data-types.md) | Подписанный идентификатор прикрепления, получить можно методом [vote.AttachedVote.get](./vote.attachedvote.get.md), параметр ответа `signedAttachId` ||
|| **answerId***
[`integer`](../data-types.md) | Идентификатор ответа, получить можно методами [vote.AttachedVote.get](./vote.attachedvote.get.md) или [vote.AttachedVote.getMany](./vote.attachedvote.getMany.md) ||
|| **pageNavigation**
[`object`](../data-types.md) | Параметры постраничной навигации, например { size: 10, page: 1 } ||
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
    -d '{"attachId":**put_attach_id**,"answerId":**put_answer_id**,"pageNavigation":{"pageSize":**put_page_size**,"currentPage":**put_page**},"userForMobileFormat":false,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/vote.AttachedVote.getAnswerVoted
    ```

- JS

    ```js  
    try
    {
        const response = await $b24.callMethod(
            'vote.AttachedVote.getAnswerVoted',
            {
                attachId: **put_attach_id**,
                answerId: **put_answer_id**,
                pageNavigation: {
                    pageSize: **put_page_size**,
                    currentPage: **put_page**
                },
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
                'vote.AttachedVote.getAnswerVoted',
                [
                    'attachId' => **put_attach_id**,
                    'answerId' => **put_answer_id**,
                    'pageNavigation' => [
                        'pageSize' => **put_page_size**,
                        'currentPage' => **put_page**
                    ],
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
        "vote.AttachedVote.getAnswerVoted",
        {
            "attachId": **put_attach_id**,
            "answerId": **put_answer_id**,
            "pageNavigation": {
                "pageSize": **put_page_size**,
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

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'vote.AttachedVote.getAnswerVoted',
        [
            'attachId' => **put_attach_id**,
            'answerId' => **put_answer_id**,
            'pageNavigation' => [
                'pageSize' => **put_page_size**,
                'currentPage' => **put_page**
            ],
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
        "items": [
            {
                "ID": 1,
                "NAME": "Саша",
                "IMAGE": "https:\/\/your-domain.bitrix24.ru\/b13743910\/resize_cache\/2267\/cec8d72046af30148f6f5b573a3a0aa8\/main\/c7b\/c7bd44b1babaa54438ce1b\/d5fb56b94dc2c3c2c595a4895.jpg",
                "WORK_POSITION": ""
            }
        ]
    },
    "total": 1,
    "time": {
        "start": 1755076703.233388,
        "finish": 1755076703.264925,
        "duration": 0.03153705596923828,
        "processing": 0.029319047927856445,
        "date_start": "2025-08-13T12:18:23+03:00",
        "date_finish": "2025-08-13T12:18:23+03:00",
        "operating_reset_at": 1755077303,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа. Содержит массив данных о проголосовавших пользователях, структура описана [ниже](#result) ||
|| **total**
[`integer`](../data-types.md) | Общее количество проголосовавших за данный ответ ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент ответа result {#result}

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

HTTP-статус: **4xx** (например, 401, 403)

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
- [{#T}](./vote.attachedvote.getMany.md)
- [{#T}](./vote.attachedvote.getWithVoted.md)
- [{#T}](./vote.attachedvote.recall.md)
- [{#T}](./vote.attachedvote.resume.md)
- [{#T}](./vote.attachedvote.stop.md)
- [{#T}](./vote.attachedvote.vote.md)
- [{#T}](./vote.integration.im.send.md)
