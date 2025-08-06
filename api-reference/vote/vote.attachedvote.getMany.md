# Получить несколько голосований

> Название метода: **vote.AttachedVote.getMany**
>
> Scope: [`vote`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правами чтения голосований

Метод возвращает данные нескольких прикрепленных голосований по их идентификаторам сущностей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **moduleId***
[`string`](../data-types.md) | Идентификатор модуля ||
|| **entityType***
[`string`](../data-types.md) | Тип сущности ||
|| **entityIds***
[`array`](../data-types.md) | Массив идентификаторов сущностей. Максимум 50 элементов
||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"moduleId": "**put_module_name**","entityType": "**put_entity_type**","entityIds": **put_entity_ids_array**}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/vote.AttachedVote.getMany
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"moduleId": "**put_module_name**","entityType": "**put_entity_type**","entityIds": **put_entity_ids_array**,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/vote.AttachedVote.getMany
    ```

- JS

    ```js
    BX24.callMethod(
        "vote.AttachedVote.getMany",
        {
            "moduleId": "**put_module_name**",
            "entityType": "Bitrix\\Vote\\Attachment\\ImMessageConnector",
            "entityIds": [1,2,3]
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

    $result = CRest::call('vote.AttachedVote.getMany',
        [
            'moduleId' => "**put_module_name**",
            'entityType' => "**put_entity_type**",
            'entityIds' => "**put_entity_ids_array**",
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
      "items": [
        {
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
      ]
    },
    "time": {
      "start": 1754402559.791454,
      "finish": 1754402559.82089,
      "duration": 0.02943587303161621,
      "processing": 0.017578840255737305,
      "date_start": "2025-08-05T17:02:39+03:00",
      "date_finish": "2025-08-05T17:02:39+03:00",
      "operating_reset_at": 1754403159,
      "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа. Содержит информацию о запрашиваемых голосованиях ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент ответа result

#|
|| **items**
[`array`](../data-types.md) | Массив данных прикрепленных голосований ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Too many entity ids"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные виды ошибок

#|
|| **Ошибка** | **Описание** ||
|| `Too many entity ids` | Превышен лимит количества идентификаторов сущностей (максимум 50) ||
|| `Attach with entityId X not found` | Голосование с указанным идентификатором сущности не найдено ||
|| `Attach with entityId X read access denied` | Нет прав для чтения голосования с указанным идентификатором сущности ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./vote.attachedvote.download.md)
- [{#T}](./vote.attachedvote.get.md)
- [{#T}](./vote.attachedvote.getAnswerVoted.md)
- [{#T}](./vote.attachedvote.getWithVoted.md)
- [{#T}](./vote.attachedvote.recall.md)
- [{#T}](./vote.attachedvote.resume.md)
- [{#T}](./vote.attachedvote.stop.md)
- [{#T}](./vote.attachedvote.vote.md)
- [{#T}](./vote.integration.im.send.md)
