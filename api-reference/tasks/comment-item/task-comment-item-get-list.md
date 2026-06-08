# Получить список комментариев task.commentitem.getlist

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом доступа на чтение задачи или выше

Метод `task.commentitem.getlist` получает список комментариев задачи.

{% note warning "DEPRECATED" %}

Развитие метода остановлено с версии модуля `tasks 25.700.0`. Метод task.commentitem.getlist не работает в [новой карточке задач](../tasks-new.md), используйте метод [im.dialog.messages.get](../../chats/messages/im-dialog-messages-get.md) для работы с чатом задач.

{% endnote %}

## Параметры метода

{% note warning "" %}

Передавайте параметры в запросе в соответствии с порядком в таблице. Если нарушить порядок, запрос вернет ошибку.

{% endnote %}

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TASKID***
[`integer`](../../data-types.md) | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](../tasks-task-add.md) или методом [получения списка задач](../tasks-task-list.md) ||
|| **ORDER**
[`object`](../../data-types.md) | Объект для сортировки результата вида `{"поле": "значение сортировки", ... }`.

Сортировать можно по полям:
- `ID` — идентификатор комментария 
- `AUTHOR_ID` — идентификатор автора комментария 
- `AUTHOR_NAME` — имя автора
- `AUTHOR_EMAIL` — почтовый адрес автора
- `POST_DATE` — дата публикации комментария 

Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию

По умолчанию результат сортируется по убыванию идентификатора комментария ||
|| **FILTER**
[`object`](../../data-types.md) | Объект для фильтрации результата вида `{"поле": "значение фильтра", ... }`. Значением фильтруемого поля может быть одиночное значение или массив значений.

Фильтровать можно по полям: 
- `ID` — идентификатор комментария
- `AUTHOR_ID` — идентификатор автора комментария
- `AUTHOR_NAME` — имя автора
- `POST_DATE` — дата публикации комментария

Перед названием фильтруемого поля можно указать префикс с типом фильтрации:
- `!` — не равно
- `<=`— меньше либо равно
- `<` — меньше
- `>=`— больше либо равно
- `>` — больше
 
По умолчанию записи не фильтруются ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":8017,"ORDER":{"POST_DATE":"asc"},"FILTER":{"AUTHOR_ID":503,">=POST_DATE":"2025-01-01"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.commentitem.getlist
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":8017,"ORDER":{"POST_DATE":"asc"},"FILTER":{"AUTHOR_ID":503,">=POST_DATE":"2025-01-01"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.commentitem.getlist
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each comment item returned in the result array
    type TaskCommentItem = {
      ID: string
      AUTHOR_ID: string
      AUTHOR_NAME: string
      AUTHOR_EMAIL: string
      POST_DATE: ISODate | null
      POST_MESSAGE: string
      POST_MESSAGE_HTML: string | null
      ATTACHED_OBJECTS: Record<string, {
        ATTACHMENT_ID: string
        NAME: string
        SIZE: string
        FILE_ID: string
        DOWNLOAD_URL: string
        VIEW_URL: string
      }>
    }

    try {
      // task.commentitem.getlist returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<TaskCommentItem[]>({
        method: 'task.commentitem.getlist',
        params: {
          TASKID: 8017,
          ORDER: {
            POST_DATE: 'asc',
          },
          FILTER: {
            AUTHOR_ID: 503,
            '>=POST_DATE': '2025-01-01',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Comments fetched:', result.length, result)
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
      async function getTaskCommentList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // task.commentitem.getlist returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'task.commentitem.getlist',
            params: {
              TASKID: 8017,
              ORDER: {
                POST_DATE: 'asc',
              },
              FILTER: {
                AUTHOR_ID: 503,
                '>=POST_DATE': '2025-01-01',
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
          console.info('Comments fetched:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getTaskCommentList)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.commentitem.getlist',
                [
                    'TASKID' => 8017,
                    'ORDER' => [
                        'POST_DATE' => 'asc',
                    ],
                    'FILTER' => [
                        'AUTHOR_ID' => 503,
                        '>=POST_DATE' => '2025-01-01',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting task comments: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.commentitem.getlist',
        {
            "TASKID": 8017,
            "ORDER": {
                "POST_DATE": "asc",
            },
            "FILTER": {
                "AUTHOR_ID": 503,
                ">=POST_DATE": "2025-01-01",
            }
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'task.commentitem.getlist',
        [
            'TASKID' => 8017,
            'ORDER' => [
                'POST_DATE' => 'asc',
            ],
            'FILTER' => [
                'AUTHOR_ID' => 503,
                '>=POST_DATE' => '2025-01-01',
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
    "result": [
        {
            "POST_MESSAGE_HTML": null,
            "ID": "3157",
            "AUTHOR_ID": "503",
            "AUTHOR_NAME": "Иван Иванов",
            "AUTHOR_EMAIL": "",
            "POST_DATE": "2025-07-15T14:31:00+03:00",
            "POST_MESSAGE": "Фотографии во вложении",
            "ATTACHED_OBJECTS": {
                "973": {
                    "ATTACHMENT_ID": "973",
                    "NAME": "photo1.png",
                    "SIZE": "1495700",
                    "FILE_ID": "4755",
                    "DOWNLOAD_URL": "/bitrix/tools/disk/uf.php?attachedId=973&auth%5Bauth%5D=3edf7ca92&action=download&ncc=1",
                    "VIEW_URL": "/bitrix/tools/disk/uf.php?attachedId=973&auth%5Bauth%5D=3edf7ca92&action=show&ncc=1"
                },
                "975": {
                    "ATTACHMENT_ID": "975",
                    "NAME": "photo2.png",
                    "SIZE": "1017053",
                    "FILE_ID": "4753",
                    "DOWNLOAD_URL": "/bitrix/tools/disk/uf.php?attachedId=975&auth%5Bauth%5D=3edf7ca92&action=download&ncc=1",
                    "VIEW_URL": "/bitrix/tools/disk/uf.php?attachedId=975&auth%5Bauth%5D=3edf7ca92&action=show&ncc=1"
                }
            }
        },
        {
            "POST_MESSAGE_HTML": null,
            "ID": "3155",
            "AUTHOR_ID": "503",
            "AUTHOR_NAME": "Иван Иванов",
            "AUTHOR_EMAIL": "",
            "POST_DATE": "2025-07-15T14:30:00+03:00",
            "POST_MESSAGE": "Подготовил новые фотографии",
            "ATTACHED_OBJECTS": {}
        }
    ],
    "time": {
        "start": 1753270901.224447,
        "finish": 1753270901.343166,
        "duration": 0.11871910095214844,
        "processing": 0.06380701065063477,
        "date_start": "2025-07-23T14:41:41+03:00",
        "date_finish": "2025-07-23T14:41:41+03:00",
        "operating_reset_at": 1753271501,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив объектов. Каждый объект содержит описание комментария ||
|| **POST_MESSAGE_HTML**
[`string`](../../data-types.md) | HTML-код комментария ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор комментария ||
|| **AUTHOR_ID**
[`string`](../../data-types.md) | Идентификатор автора комментария ||
|| **AUTHOR_NAME**
[`string`](../../data-types.md) | Имя автора комментария ||
|| **AUTHOR_EMAIL**
[`string`](../../data-types.md) | Email автора комментария ||
|| **POST_DATE**
[`string`](../../data-types.md) | Дата и время создания комментария ||
|| **POST_MESSAGE**
[`string`](../../data-types.md) | Текст комментария ||
|| **ATTACHED_OBJECTS**
[`object`](../../data-types.md) | Объект, содержащий информацию о вложениях. Ключ объекта — идентификатор вложения, а значение — объект с [описанием файла](#attached-objects) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект ATTACHED_OBJECTS {#attached-objects}

#|
|| **Название**
`тип` | **Описание** ||
|| **ATTACHMENT_ID**
[`string`](../../data-types.md) | Идентификатор вложения ||
|| **NAME**
[`string`](../../data-types.md) | Имя файла ||
|| **SIZE**
[`string`](../../data-types.md) | Размер файла в байтах ||
|| **FILE_ID**
[`string`](../../data-types.md) | Идентификатор файла на Диске ||
|| **DOWNLOAD_URL**
[`string`](../../data-types.md) | URL для скачивания файла ||
|| **VIEW_URL**
[`string`](../../data-types.md) | URL для просмотра файла ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_CORE",
    "error_description":"TASKS_ERROR_EXCEPTION_#256; Param #1 (arOrder) for method ctaskcommentitem::getlist() must not contain key ">=POST_DATE".; 256/TE/WRONG_ARGUMENTS.<br>"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание**  | **Значение** ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#8; Action failed; 8/TE/ACTION_FAILED_TO_BE_PROCESSED | Указано неверное значение параметра или нет прав доступа к задаче ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #0 (taskId) for method ctaskcommentitem::getlist() expected to be of type "integer", but given something else.; 256/TE/WRONG_ARGUMENTS | Указан неверный тип значения для параметра, например, для `TASKID` ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #1 (arOrder) for method ctaskcommentitem::getlist() must not contain key ">=POST_DATE".; 256/TE/WRONG_ARGUMENTS | Параметры указаны в неверном порядке ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #2 (arFilter) for method ctaskcommentitem::getlist() must not contain key "%POST_DATE".; 256/TE/WRONG_ARGUMENTS | Неверно указано название параметра или префикс для фильтра ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./task-comment-item-add.md)
- [{#T}](./task-comment-item-update.md)
- [{#T}](./task-comment-item-get.md)
- [{#T}](./task-comment-item-delete.md)







