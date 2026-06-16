# Обновить результат задачи tasks.task.result.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: автор результата

Метод `tasks.task.result.update` обновляет текст результата задачи.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор результата ||
|| **fields***
[`object`](../../../data-types.md) | Объект с [полями результата](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **text***
[`string`](../../../data-types.md) | Новый текст результата ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.task.result.update`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":17,"fields":{"text":"Работа по задаче выполнена и проверена"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.task.result.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":17,"fields":{"text":"Работа по задаче выполнена и проверена"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.task.result.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TaskResultUpdateResult = {
      item: {
        id: number
        taskId: number
        text: string
        authorId: number
        createdAt: ISODate | null
        updatedAt: ISODate | null
        status: string
        fileIds: number[]
        rights: {
          edit: boolean
          remove: boolean
        }
        messageId: number | null
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<TaskResultUpdateResult>({
        method: 'tasks.task.result.update',
        params: {
          id: 17,
          fields: {
            text: 'Work on the task has been completed and verified',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.item)
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
      async function updateTaskResult() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'tasks.task.result.update',
            params: {
              id: 17,
              fields: {
                text: 'Work on the task has been completed and verified',
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
          console.info(result.item)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateTaskResult)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.task.result.update',
                [
                    'id' => 17,
                    'fields' => [
                        'text' => 'Работа по задаче выполнена и проверена',
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
        'tasks.task.result.update',
        {
            id: 17,
            fields: {
                text: 'Работа по задаче выполнена и проверена'
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
        'tasks.task.result.update',
        [
            'id' => 17,
            'fields' => [
                'text' => 'Работа по задаче выполнена и проверена',
            ],
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
        "item": {
            "id": 17,
            "taskId": 51,
            "text": "Работа по задаче выполнена и проверена",
            "authorId": 1,
            "createdAt": "2026-04-30T10:15:00+03:00",
            "updatedAt": "2026-04-30T10:20:00+03:00",
            "status": "open",
            "fileIds": [],
            "rights": {
                "edit": true,
                "remove": true
            },
            "messageId": null
        }
    },
    "time": {
        "start": 1777530000,
        "finish": 1777530000.123456,
        "duration": 0.123456,
        "processing": 0.1,
        "date_start": "2026-04-30T10:20:00+03:00",
        "date_finish": "2026-04-30T10:20:00+03:00",
        "operating_reset_at": 1777530600,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **item**
[`object`](../../../data-types.md) | Объект результата задачи.

Поля объекта совпадают с ответом метода [tasks.task.result.add](./tasks-task-result-add.md#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
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

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id`
`filter` | Не заполнено значение хотя бы одного обязательного поля: `id`, `filter` | Передайте идентификатор результата в параметре `id` ||
|| `id`
`filter` | Должно быть передано только одно из значений: `id`, `filter` | Передайте только один параметр: `id` или `filter` ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` с полем `text` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `text` | Обязательное поле `text` не указано | Передайте новый текст результата в `fields.text` ||
|| `fileIds` | Поле `fileIds` не доступно к заполнению | Не передавайте `fileIds` в параметре `fields` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Неизвестное поле для сущности `ResultDto` | Передавайте в `fields` только поле `text` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Доступ запрещен | Проверьте права пользователя на изменение результата ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-task-result-add.md)
- [{#T}](./tasks-task-result-addfromchatmessage.md)
- [{#T}](./tasks-task-result-list.md)
- [{#T}](./tasks-task-result-delete.md)
