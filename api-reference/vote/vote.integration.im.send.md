# Отправить голосование в чат

> Название метода: **vote.Integration.Im.send**
>
> Scope: [`vote`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой авторизованный пользователь

Метод отправляет голосование в указанный чат мессенджера.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **chatId**
[`integer`](../data-types.md)| Идентификатор чата, в который отправляется голосование ||
|| **IM_MESSAGE_VOTE_DATA**
[`object`](../data-types.md)| Данные голосования. Содержит вопросы и варианты ответов

```json
{
    "QUESTIONS": [
        {
            "QUESTION": "Текст вопроса",
            "FIELD_TYPE": 0,
            "ANSWERS": [
                {
                    "MESSAGE": "Вариант ответа 1"
                },
                {
                    "MESSAGE": "Вариант ответа 2"
                }
            ]
        }
    ],
    "ANONYMITY": 0,
    "OPTIONS": 0
}
```

||
|| **templateId**
[`string`](../data-types.md)| Идентификатор шаблона сообщения (необязательный параметр) ||
|#

### Параметр IM_MESSAGE_VOTE_DATA

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **QUESTIONS**
[`array`](../data-types.md)| Массив вопросов голосования. Максимум 1 вопрос ||
|| **ANONYMITY**
[`integer`](../data-types.md)| Анонимность голосования. Возможные значения:
- `0` — неанонимное голосование
- `1` — анонимное голосование

Значение по умолчанию: `0` ||
|| **OPTIONS**
[`integer`](../data-types.md)| Дополнительные опции голосования. Значение по умолчанию: `0` ||
|#

### Структура вопроса в QUESTIONS

#|
|| **Название**
`тип` | **Описание** ||
|| **QUESTION**
[`string`](../data-types.md)| Текст вопроса ||
|| **FIELD_TYPE**
[`integer`](../data-types.md)| Тип поля для ответа. Возможные значения:
- `0` — радиокнопки (один вариант ответа)
- `1` — чекбоксы (множественный выбор)

Значение по умолчанию: `0` ||
|| **ANSWERS**
[`array`](../data-types.md)| Массив вариантов ответов. Минимум 2 варианта, максимум 10 ||
|#

### Структура ответа в ANSWERS

#|
|| **Название**
`тип` | **Описание** ||
|| **MESSAGE**
[`string`](../data-types.md)| Текст варианта ответа ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"chatId":**put_chat_id**,"IM_MESSAGE_VOTE_DATA":{"QUESTIONS":[{"QUESTION":"**put_question_title**","FIELD_TYPE":0,"ANSWERS": [{"MESSAGE":"**put_message_content**"},{"MESSAGE":"**put_message_content**"},{"MESSAGE":"**put_message_content**"}]}],"ANONYMITY":0,"OPTIONS":0},"templateId":null}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/vote.Integration.Im.send
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"chatId":**put_chat_id**,"IM_MESSAGE_VOTE_DATA":{"QUESTIONS":[{"QUESTION":"**put_question_title**","FIELD_TYPE":0,"ANSWERS": [{"MESSAGE":"**put_message_content**"},{"MESSAGE":"**put_message_content**"},{"MESSAGE":"**put_message_content**"}]}],"ANONYMITY":0,"OPTIONS":0},"templateId":null,"auth": "put_access_token_here"}' \
    https://**put_your_bitrix24_address**/rest/vote.Integration.Im.send
    ```
 
- JS

    ```js
    BX24.callMethod(
        "vote.Integration.Im.send",
        {
            "chatId": **put_chat_id**,
            "IM_MESSAGE_VOTE_DATA": {
                "QUESTIONS": [
                    {
                        "QUESTION": "**put_question_title**",
                        "FIELD_TYPE": 0,
                        "ANSWERS": [
                            {
                                "MESSAGE": "**put_message_content**"
                            },
                            {
                                "MESSAGE": "**put_message_content**"
                            },
                            {
                                "MESSAGE": "**put_message_content**"
                            }
                        ]
                    }
                ],
                "ANONYMITY": 0,
                "OPTIONS": 0
            },
            "templateId": null
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
    require_once 'src/crest.php';

    $params = [
        'chatId' => 7,
        'IM_MESSAGE_VOTE_DATA' => [
            'QUESTIONS' => [
                0 => [
                    'QUESTION'   => 'Когда проводим встречу команды?',
                    'FIELD_TYPE' => 0,
                    'ANSWERS'    => [
                        0 => ['MESSAGE' => 'Завтра в 10:00'], 
                        1 => ['MESSAGE' => 'Завтра в 14:00'],
                        2 => ['MESSAGE' => 'Послезавтра в 10:00'],
                    ],
                ],
            ],
            'ANONYMITY' => 0,
            'OPTIONS'   => 0,
        ],
    ];

    $result = CRest::call('vote.Integration.Im.send', $params);

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
        "messageId": 23,
        "voteId": 7
    },
    "time": {
        "start": 1754470016.954889,
        "finish": 1754470017.043656,
        "duration": 0.08876705169677734,
        "processing": 0.07431983947753906,
        "date_start": "2025-08-06T11:46:56+03:00",
        "date_finish": "2025-08-06T11:46:57+03:00",
        "operating_reset_at": 1754470616,
        "operating": 0.3257129192352295
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md)| Корневой элемент ответа. Содержит информацию о номере сообщения и голосования ||
|| **time**
[`time`](../data-types.md#time)| Информация о времени выполнения запроса ||
|#

#### Элемент ответа result
#|
|| **Название**
`тип` | **Описание** ||
|| **messageId**
[`integer`](../data-types.md)| Идентификатор отправленного сообщения в чате ||
|| **voteId**
[`integer`](../data-types.md)| Идентификатор созданного голосования ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "400",
    "error_description": "Access denied"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `400` | Access denied ||
|| `VOTE_INTEGRATION_IM_NOT_AVAILABLE` | Интеграция с мессенджером недоступна ||
|| `VOTE_INTEGRATION_IM_QUESTIONS_EMPTY` | Не указаны вопросы для голосования ||
|| `VOTE_INTEGRATION_IM_TO_MANY_QUESTIONS` | Превышено максимальное количество вопросов (1) ||
|| `VOTE_INTEGRATION_IM_MIN_ANSWERS` | Недостаточно вариантов ответов (минимум 2) ||
|| `VOTE_INTEGRATION_IM_TO_MANY_ANSWERS` | Превышено максимальное количество ответов (максимум 10) ||
|| `VOTE_INTEGRATION_IM_SAVE_ERROR` | Ошибка сохранения голосования ||
|| `VOTE_INTEGRATION_IM_MESSAGE_FAILED` | Ошибка отправки сообщения в чат ||
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
- [{#T}](./vote.attachedvote.vote.md)
