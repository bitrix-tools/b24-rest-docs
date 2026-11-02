# Добавить результат из сообщения чата задачи tasks.task.result.addfromchatmessage

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к задаче

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `tasks.task.result.addfromchatmessage` создает результат из сообщения в чате задачи. Если автор результата не участник задачи, например администратор, Битрикс24 добавит его в наблюдатели.

Повторный вызов с тем же `messageId` создаст еще один результат. Чтобы избежать дублей, перед вызовом проверьте список результатов методом [tasks.task.result.list](./tasks-task-result-list-rest-v3.md) с фильтром по `taskId` и `messageId`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект с [полями результата](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **messageId***
[`integer`](../../data-types.md) | Идентификатор сообщения чата задачи.

Где взять:
- поле `result.messages[].id` ответа [im.dialog.messages.get](../../chats/messages/im-dialog-messages-get.md) с `DIALOG_ID` вида `chat{chatId}`. Значение `chatId` возвращает метод [tasks.task.get](../tasks-task-get-rest-v3.md), для вызова нужен scope `im`
- поле `data.FIELDS_AFTER.MESSAGE_ID` события [OnTaskCommentAdd](../comment-item/events-comment/on-task-comment-add.md) — для нового сообщения

Метод [tasks.task.chat.message.send](../tasks-task-chat-message-send.md) идентификатор сообщения не возвращает ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.task.result.addfromchatmessage`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"messageId":335}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.task.result.addfromchatmessage
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"messageId":335},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.task.result.addfromchatmessage
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type AddFromChatMessageResult = {
      item: {
        id: number
        taskId: number
        text: string
        authorId: number
        createdAt: ISODate
        updatedAt: ISODate | null
        status: string
        fileIds: number[] | null
        rights: {
          edit: boolean
          remove: boolean
        }
        messageId: number
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<AddFromChatMessageResult>({
        method: 'tasks.task.result.addfromchatmessage',
        params: {
          fields: {
            messageId: 335,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.item.id, result.item.taskId, result.item.text)
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
      async function addResultFromChatMessage() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'tasks.task.result.addfromchatmessage',
            params: {
              fields: {
                messageId: 335,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.item.id, result.item.taskId, result.item.text)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addResultFromChatMessage)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "messageId": 335,
    }

    try:
        bitrix_response = client.tasks.task.result.addfromchatmessage(
            fields=fields,
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```
- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.task.result.addfromchatmessage',
                [
                    'fields' => [
                        'messageId' => 335,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'tasks.task.result.addfromchatmessage',
        {
            fields: {
                messageId: 335
            }
        },
        function(result){
            console.info(result.data());
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.task.result.addfromchatmessage',
        [
            'fields' => [
                'messageId' => 335,
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "tasks.task.result.addfromchatmessage", b24.Params{
    	"fields": b24.Params{
    		"messageId": 335,
    	},
    })
    if err != nil {
    	return fmt.Errorf("tasks.task.result.addfromchatmessage: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID        b24.ID `json:"id"`
    	TaskID    b24.ID `json:"taskId"`
    	Text      string `json:"text"`
    	AuthorID  b24.ID `json:"authorId"`
    	CreatedAt string `json:"createdAt"`
    	Status    string `json:"status"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.TaskID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 18,
            "taskId": 51,
            "text": "Работа по задаче выполнена",
            "authorId": 1,
            "createdAt": "2026-04-30T10:25:00+03:00",
            "updatedAt": "2026-04-30T10:25:00+03:00",
            "status": "open",
            "fileIds": null,
            "rights": {
                "edit": true,
                "remove": true
            },
            "messageId": 335
        }
    },
    "time": {
        "start": 1777533900,
        "finish": 1777533900.123456,
        "duration": 0.123456,
        "processing": 0.1,
        "date_start": "2026-04-30T10:25:00+03:00",
        "date_finish": "2026-04-30T10:25:00+03:00",
        "operating_reset_at": 1777534500,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **item**
[`object`](../../data-types.md) | Объект результата задачи [(подробное описание)](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор результата ||
|| **taskId**
[`integer`](../../data-types.md) | Идентификатор задачи, к чату которой относится сообщение ||
|| **text**
[`string`](../../data-types.md) | Текст результата — текст сообщения ||
|| **authorId**
[`integer`](../../data-types.md) | Идентификатор автора результата — пользователя, который вызвал метод ||
|| **createdAt**
[`datetime`](../../data-types.md) | Дата создания результата ||
|| **updatedAt**
[`datetime`](../../data-types.md) | Дата обновления результата. При создании совпадает с `createdAt` ||
|| **status**
[`string`](../../data-types.md) | Статус результата. Возможные значения: `open`, `closed` ||
|| **fileIds**
[`array`](../../data-types.md) | Идентификаторы файлов результата. Если файлов нет, метод вернет `null` или пустой массив — проверяйте оба значения ||
|| **rights**
[`object`](../../data-types.md) | Права текущего пользователя на результат [(подробное описание)](#rights) ||
|| **messageId**
[`integer`](../../data-types.md) | Идентификатор сообщения чата, из которого создан результат ||
|#

#### Объект rights {#rights}

#|
|| **Название**
`тип` | **Описание** ||
|| **edit**
[`boolean`](../../data-types.md) | Возвращает `true`, если текущий пользователь может изменить результат ||
|| **remove**
[`boolean`](../../data-types.md) | Возвращает `true`, если текущий пользователь может удалить результат ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "field": "fields",
                "message": "Обязательное поле `fields` не указано"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `messageId` | Не заполнено обязательное поле "messageId" | Передайте идентификатор сообщения в `fields.messageId` ||
|| `fileIds` | Поле "fileIds" не доступно к заполнению | Не передавайте `fileIds` в параметре `fields` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` с полем `messageId` ||
|| `messageId` | В поле `messageId` требуется тип данных `int` для такого запроса | Передайте `messageId` как число ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Неизвестное поле `#FIELD#` для сущности `ResultDto` | Передавайте в `fields` только поле `messageId` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `messageId` | Доступ запрещен | Сообщения нет, оно не из чата задачи или у пользователя нет доступа к задаче. Проверьте идентификатор сообщения и права пользователя на задачу ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-task-result-add.md)
- [{#T}](./tasks-task-result-update.md)
- [{#T}](./tasks-task-result-list-rest-v3.md)
- [{#T}](./tasks-task-result-delete.md)
