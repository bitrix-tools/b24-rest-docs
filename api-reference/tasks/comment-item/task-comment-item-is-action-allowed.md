# Проверить, разрешено ли действие с комментарием task.commentitem.isactionallowed

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `task.commentitem.isactionallowed` проверяет, разрешено ли действие с комментарием.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TASKID***
[`integer`](../../data-types.md) | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](../tasks-task-add.md) или методом [получения списка задач](../tasks-task-list.md) ||
|| **ITEMID***
[`integer`](../../data-types.md) | Идентификатор комментария.

Идентификатор комментария можно получить при [добавлении нового комментария](./task-comment-item-add.md) или методом [получения списка комментариев](./task-comment-item-get-list.md) ||
|| **ACTIONID***
[`integer`](../../data-types.md) | Идентификатор проверяемого действия:
- `1` — добавить комментарий 
- `2` — обновить комментарий 
- `3` — удалить комментарий ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":8017,"ITEMID":3157,"ACTIONID":2}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.commentitem.isactionallowed
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":8017,"ITEMID":3157,"ACTIONID":2,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.commentitem.isactionallowed
    ```

- TS

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'task.commentitem.isactionallowed',
        params: {
          TASKID: 8017,
          ITEMID: 3157,
          ACTIONID: 2,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Is action allowed:', result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- UMD

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function checkIsActionAllowed() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'task.commentitem.isactionallowed',
            params: {
              TASKID: 8017,
              ITEMID: 3157,
              ACTIONID: 2,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Is action allowed:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', checkIsActionAllowed)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.commentitem.isactionallowed',
                [
                    'TASKID'   => 8017,
                    'ITEMID'   => 3157,
                    'ACTIONID' => 2,
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
        echo 'Error checking if action is allowed: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.commentitem.isactionallowed',
        {
            "TASKID": 8017,
            "ITEMID": 3157,
            "ACTIONID": 2
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
        'task.commentitem.isactionallowed',
        [
            'TASKID' => 8017,
            'ITEMID' => 3157,
            'ACTIONID' => 2
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
    "result": true,
    "time": {
        "start": 1753275597.386571,
        "finish": 1753275597.466896,
        "duration": 0.08032512664794922,
        "processing": 0.02973794937133789,
        "date_start": "2025-07-23T15:59:57+03:00",
        "date_finish": "2025-07-23T15:59:57+03:00",
        "operating_reset_at": 1753276197,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Результат проверки разрешено ли действие:
- `true` — разрешено
- `false` — не разрешено

Также возвращает `false` если в параметрах указаны несуществующие идентификаторы. Например, если задачи с `ID` = `95623` не существует в системе  ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_CORE",
    "error_description":"TASKS_ERROR_EXCEPTION_#256; Param #2 (actionId) expected by method ctaskcommentitem::isactionallowed(), but not given.; 256/TE/WRONG_ARGUMENTS.<br>"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #2 (actionId) expected by method ctaskcommentitem::isactionallowed(), but not given.; 256/TE/WRONG_ARGUMENTS | Не указан обязательный параметр, например, `ACTIONID` ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #0 (taskId) for method ctaskcommentitem::isactionallowed() expected to be of type "integer", but given something else.; 256/TE/WRONG_ARGUMENTS | Указан неверный тип значения для параметра, например, для `TASKID` ||
|| `ERROR_CORE` | TASKS_ERROR_ASSERT_EXCEPTION | Указанного комментария или задачи не существует ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./task-comment-item-add.md)
- [{#T}](./task-comment-item-update.md)
- [{#T}](./task-comment-item-get.md)
- [{#T}](./task-comment-item-get-list.md)
- [{#T}](./task-comment-item-delete.md)
- [{#T}](./task-comment-item-get-manifest.md)