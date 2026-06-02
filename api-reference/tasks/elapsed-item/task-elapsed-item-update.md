# Изменить запись о затраченном времени task.elapseditem.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод изменяет параметры указанной записи о затраченном времени.

{% note info %}

Проверить право на изменение можно специальным методом [task.elapseditem.isactionallowed](./task-elapsed-item-is-action-allowed.md)

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TASKID***
[`integer`](../../data-types.md) | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](../tasks-task-add.md) или методом [получения списка задач](../tasks-task-list.md) ||
|| **ITEMID***
[`integer`](../../data-types.md) | Идентификатор записи о затраченном времени.

Его можно получить при [создании новой записи](./task-elapsed-item-add.md) или методом [получения списка записей о затраченном времени](./task-elapsed-item-get-list.md) ||
|| **ARFIELDS***
[`object`](../../data-types.md) | Объект, содержащий записи о пользователе, времени и комментарии (подробное описание приведено ниже) в виде структуры:

```js
"ARFIELDS": {
    "SECONDS": "значение", 
    "COMMENT_TEXT": "значение",
    "USER_ID": "значение"
},
```

 ||
|#

### Параметр ARFIELDS

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **SECONDS***
[`integer`](../../data-types.md) | Количество затраченного времени в секундах ||
|| **COMMENT_TEXT***
[`string`](../../data-types.md) | Текст комментария ||
|| **USER_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|#

{% note warning %}

Соблюдать указанный в таблицах порядок следования параметров в запросе — обязательно. Иначе запрос выполнится с ошибками.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID" : 691, "ITEMID": 5, "ARFIELDS": {"SECONDS": 113,"COMMENT_TEXT": "текст комментария"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.elapseditem.update
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID" : 691, "ITEMID": 5, "ARFIELDS": {"SECONDS": 113,"COMMENT_TEXT": "текст комментария"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.elapseditem.update
    ```

- TS

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // The method returns null on success
    // Shape of the payload returned in result (match the "response handling" section of the page)
    type UpdateElapsedItemResult = null

    try {
      const response = await $b24.actions.v2.call.make<UpdateElapsedItemResult>({
        method: 'task.elapseditem.update',
        params: {
          TASKID: 691,
          ITEMID: 5,
          ARFIELDS: {
            SECONDS: 113,
            COMMENT_TEXT: 'comment text',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Elapsed item updated successfully, result:', result)
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
      async function updateElapsedItem() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'task.elapseditem.update',
            params: {
              TASKID: 691,
              ITEMID: 5,
              ARFIELDS: {
                SECONDS: 113,
                COMMENT_TEXT: 'comment text',
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
          console.info('Elapsed item updated successfully, result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateElapsedItem)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.elapseditem.update',
                [
                    'TASKID'   => 691,
                    'ITEMID'   => 5,
                    'ARFIELDS' => [
                        'SECONDS'      => 113,
                        'COMMENT_TEXT' => 'текст комментария',
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
        echo 'Error updating elapsed item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.elapseditem.update',
        {
            "TASKID": 691,
            "ITEMID": 5,
            "ARFIELDS": {
                "SECONDS": 113, 
                "COMMENT_TEXT": "текст комментария",
            },
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'task.elapseditem.update',
        [
            'TASKID' => 691,
            'ITEMID' => 5,
            'ARFIELDS' => [
                'SECONDS' => 113,
                'COMMENT_TEXT' => 'текст комментария',
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

В случае успешного выполнения запроса, сервер вернет `result:null`

```json
{
    "result": null,
    "time":{
        "start":1712137817.343984,
        "finish":1712137817.605804,
        "duration":0.26182007789611816,
        "processing":0.018325090408325195,
        "date_start":"2024-04-03T12:50:17+03:00",
        "date_finish":"2024-04-03T12:50:17+03:00"
    }
}
```

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_CORE",
    "error_description":"ACTION_NOT_ALLOWED"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `0x000001` | Задача не найдена ||
|| `0x100002` | Доступ запрещен ||
|| `0x000004` | Действие не разрешено ||
|| `0x000040` | Неизвестная ошибка ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./task-elapsed-item-add.md)
- [{#T}](./task-elapsed-item-get.md)
- [{#T}](./task-elapsed-item-get-list.md)
- [{#T}](./task-elapsed-item-delete.md)
- [{#T}](./task-elapsed-item-is-action-allowed.md)
- [{#T}](./task-elapsed-item-get-manifest.md)