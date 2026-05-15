# Добавить результат к задаче tasks.task.result.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к задаче

Метод `tasks.task.result.add` добавляет результат к задаче.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Объект с [полями результата](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **taskId***
[`integer`](../../../data-types.md) | Идентификатор задачи.

Идентификатор можно получить при [создании задачи](../tasks-task-add.md), [получении задачи](../tasks-task-get.md) или старым методом [получения списка задач](../../../tasks/tasks-task-list.md) ||
|| **text***
[`string`](../../../data-types.md) | Текст результата ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.task.result.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"taskId":51,"text":"Работа по задаче выполнена"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.task.result.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"taskId":51,"text":"Работа по задаче выполнена"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.task.result.add
    ```

- JS

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'tasks.task.result.add',
            {
                fields: {
                    taskId: 51,
                    text: 'Работа по задаче выполнена'
                }
            }
        );

        const result = response.getData().result;
        console.info(result.item);
    }
    catch( error )
    {
        console.error(error);
    }
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.task.result.add',
                [
                    'fields' => [
                        'taskId' => 51,
                        'text' => 'Работа по задаче выполнена',
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
        'tasks.task.result.add',
        {
            fields: {
                taskId: 51,
                text: 'Работа по задаче выполнена'
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
        'tasks.task.result.add',
        [
            'fields' => [
                'taskId' => 51,
                'text' => 'Работа по задаче выполнена',
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
            "text": "Работа по задаче выполнена",
            "authorId": 1,
            "createdAt": "2026-04-30T10:15:00+03:00",
            "updatedAt": null,
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
        "start": 1777529700,
        "finish": 1777529700.123456,
        "duration": 0.123456,
        "processing": 0.1,
        "date_start": "2026-04-30T10:15:00+03:00",
        "date_finish": "2026-04-30T10:15:00+03:00",
        "operating_reset_at": 1777530300,
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
[`object`](../../../data-types.md) | Объект результата задачи [(подробное описание)](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор результата ||
|| **taskId**
[`integer`](../../../data-types.md) | Идентификатор задачи ||
|| **text**
[`string`](../../../data-types.md) | Текст результата ||
|| **authorId**
[`integer`](../../../data-types.md) | Идентификатор автора результата ||
|| **createdAt**
[`datetime`](../../../data-types.md) | Дата создания результата ||
|| **updatedAt**
[`datetime`](../../../data-types.md) | Дата обновления результата ||
|| **status**
[`string`](../../../data-types.md) | Статус результата. Возможные значения: `open`, `closed` ||
|| **fileIds**
[`array`](../../../data-types.md) | Идентификаторы файлов результата ||
|| **rights**
[`object`](../../../data-types.md) | Права текущего пользователя на результат [(подробное описание)](#rights) ||
|| **messageId**
[`integer`](../../../data-types.md) | Идентификатор сообщения чата, если результат создан из сообщения ||
|#

#### Объект rights {#rights}

#|
|| **Название**
`тип` | **Описание** ||
|| **edit**
[`boolean`](../../../data-types.md) | Возвращает `true`, если текущий пользователь может изменить результат ||
|| **remove**
[`boolean`](../../../data-types.md) | Возвращает `true`, если текущий пользователь может удалить результат ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION",
        "message": "Validation error",
        "validation": [
            {
                "field": "text",
                "message": "Не заполнено обязательное поле \"text\""
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `taskId` | Обязательное поле `taskId` не указано | Передайте идентификатор задачи в `fields.taskId` ||
|| `text` | Обязательное поле `text` не указано | Передайте текст результата в `fields.text` ||
|| `fileIds` | Поле `fileIds` не доступно к заполнению | Не передавайте `fileIds` в параметре `fields` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` с полями `taskId` и `text` ||
|| `taskId` | В поле `taskId` требуется тип данных `int` для такого запроса | Передайте `taskId` как число ||
|| `taskId` | `Task id must be positive` | Передайте положительный идентификатор задачи ||
|| `taskId` | `Task id must be set` | Передайте идентификатор задачи в `fields.taskId` ||
|| `taskId` | `Task not found` | Укажите идентификатор существующей задачи ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `taskId` | Доступ запрещен | Проверьте права пользователя на задачу ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-task-result-addfromchatmessage.md)
- [{#T}](./tasks-task-result-update.md)
- [{#T}](./tasks-task-result-list.md)
- [{#T}](./tasks-task-result-delete.md)
