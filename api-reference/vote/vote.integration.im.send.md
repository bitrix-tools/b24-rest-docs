# Создать и отправить голосование в чат vote.Integration.Im.send

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`vote`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `vote.Integration.Im.send` создает и отправляет голосование в указанный чат мессенджера.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **chatId***
[`integer`](../data-types.md)| Идентификатор чата, в который отправляется голосование. Получить можно методами [im.chat.add](../chats/im-chat-add.md), [im.chat.get](../chats/im-chat-get.md), [im.recent.get](../chats/im-recent-get.md), [im.recent.list](../chats/im-recent-list.md) ||
|| **IM_MESSAGE_VOTE_DATA***
[`object`](../data-types.md)| Данные голосования с вопросом и вариантами ответов. Структура описана [ниже](#MESSAGE) ||
|| **templateId**
[`string`](../data-types.md)| Уникальный идентификатор запроса, требований к формату нет.
Цель идентификатора — защита от дублирования. Если из-за сбоя сети запрос отправится повторно с тем же `templateId`, сервер поймет это и создаст опрос только один раз ||
|#

### Параметр IM_MESSAGE_VOTE_DATA {#MESSAGE}

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **QUESTIONS***
[`array`](../data-types.md)| Массив вопросов голосования, структура описана [ниже](#QUESTIONS). Максимум 1 вопрос ||
|| **ANONYMITY**
[`integer`](../data-types.md)| Анонимность голосования. Возможные значения:
- `0` — неанонимное голосование,
- `1` — анонимное голосование.

Значение по умолчанию: `0`, публичное голосование ||
|| **OPTIONS**
[`integer`](../data-types.md)| Разрешить переголосование. Возможные значения:
- `0` — нет,
- `1` — да.
  
Значение по умолчанию: `0`, переголосование запрещено ||
|#

#### Структура вопроса в QUESTIONS {#QUESTIONS}

#|
|| **Название**
`тип` | **Описание** ||
|| **QUESTION**
[`string`](../data-types.md)| Текст вопроса ||
|| **FIELD_TYPE**
[`integer`](../data-types.md)| Тип поля для ответа. Возможные значения:
- `0` — радиокнопки, один вариант ответа,
- `1` — чекбоксы, множественный выбор.

Значение по умолчанию: `0` ||
|| **ANSWERS**
[`array`](../data-types.md)| Массив вариантов ответов, структура описана [ниже](#ANSWERS). Минимум 2 варианта, максимум 10 ||
|#

##### Структура ответа в ANSWERS {#ANSWERS}

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
    -d '{"chatId":**put_chat_id**,"IM_MESSAGE_VOTE_DATA":{"QUESTIONS":[{"QUESTION":"**put_question_title**","FIELD_TYPE":0,"ANSWERS":[{"MESSAGE":"**put_message_content**"},{"MESSAGE":"**put_message_content**"},{"MESSAGE":"**put_message_content**"}]}],"ANONYMITY":0,"OPTIONS":0},"templateId":null}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/vote.Integration.Im.send
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"chatId":**put_chat_id**,"IM_MESSAGE_VOTE_DATA":{"QUESTIONS":[{"QUESTION":"**put_question_title**","FIELD_TYPE":0,"ANSWERS":[{"MESSAGE":"**put_message_content**"},{"MESSAGE":"**put_message_content**"},{"MESSAGE":"**put_message_content**"}]}],"ANONYMITY":0,"OPTIONS":0},"templateId":null,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/vote.Integration.Im.send
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type VoteIntegrationImSendResult = {
      messageId: number
      voteId: number
    }

    try {
      const response = await $b24.actions.v2.call.make<VoteIntegrationImSendResult>({
        method: 'vote.Integration.Im.send',
        params: {
          chatId: 1,
          IM_MESSAGE_VOTE_DATA: {
            QUESTIONS: [
              {
                QUESTION: 'What is your favorite color?',
                FIELD_TYPE: 0,
                ANSWERS: [
                  { MESSAGE: 'Red' },
                  { MESSAGE: 'Green' },
                  { MESSAGE: 'Blue' },
                ],
              },
            ],
            ANONYMITY: 0,
            OPTIONS: 0,
          },
          templateId: null,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Message ID:', result.messageId, 'Vote ID:', result.voteId)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function sendImVote() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'vote.Integration.Im.send',
            params: {
              chatId: 1,
              IM_MESSAGE_VOTE_DATA: {
                QUESTIONS: [
                  {
                    QUESTION: 'What is your favorite color?',
                    FIELD_TYPE: 0,
                    ANSWERS: [
                      { MESSAGE: 'Red' },
                      { MESSAGE: 'Green' },
                      { MESSAGE: 'Blue' },
                    ],
                  },
                ],
                ANONYMITY: 0,
                OPTIONS: 0,
              },
              templateId: null,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Message ID:', result.messageId, 'Vote ID:', result.voteId)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', sendImVote)
    </script>
    ```

- PHP

    ```php  
    try {
        $response = $b24Service
            ->core
            ->call(
                'vote.Integration.Im.send',
                [
                    'chatId' => **put_chat_id**,
                    'IM_MESSAGE_VOTE_DATA' => [
                        'QUESTIONS' => [
                            [
                                'QUESTION' => '**put_question_title**',
                                'FIELD_TYPE' => 0,
                                'ANSWERS' => [
                                    ['MESSAGE' => '**put_message_content**'],
                                    ['MESSAGE' => '**put_message_content**'],
                                    ['MESSAGE' => '**put_message_content**']
                                ]
                            ]
                        ],
                        'ANONYMITY' => 0,
                        'OPTIONS' => 0
                    ],
                    'templateId' => null
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error sending vote message: ' . $e->getMessage();
    }
    ```

- BX24.js

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

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'vote.Integration.Im.send',
        [
            'chatId' => **put_chat_id**,
            'IM_MESSAGE_VOTE_DATA' => [
                'QUESTIONS' => [
                    [
                        'QUESTION' => '**put_question_title**',
                        'FIELD_TYPE' => 0,
                        'ANSWERS' => [
                            ['MESSAGE' => '**put_message_content**'],
                            ['MESSAGE' => '**put_message_content**'],
                            ['MESSAGE' => '**put_message_content**']
                        ]
                    ]
                ],
                'ANONYMITY' => 0,
                'OPTIONS' => 0
            ],
            'templateId' => null
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
[`object`](../data-types.md)| Корневой элемент ответа. Содержит информацию о номере сообщения и голосования, стурктура описана [ниже](#result) ||
|| **time**
[`time`](../data-types.md#time)| Информация о времени выполнения запроса ||
|#

#### Элемент ответа result {#result}
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
|| `403` | `Создание опроса недоступно` ||
|| `400` | `Введите вопрос и варианты ответов` ||
|| `400` | `Максимальное количество вопросов: 1` ||
|| `400` | `Минимальное количество ответов: 2` ||
|| `400` | `Максимальное количество ответов: 10` ||
|| `400` | `Не удалось сохранить данные опроса. Попробуйте ещё раз` ||
|| `403` | `Недостаточно прав для создания опроса` ||
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
