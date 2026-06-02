# Получить запись о затраченном времени по идентификатору task.elapseditem.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает запись о затраченном времени по ее идентификатору.

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
|#

{% note warning %}

Соблюдать указанный в таблице порядок следования параметров в запросе — обязательно. Иначе запрос выполнится с ошибками.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID": 691,"ITEMID": 1,}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.elapseditem.get
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID": 691,"ITEMID": 1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.elapseditem.get
    ```

- TS

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ElapsedItemResult = {
      ID: string
      TASK_ID: string
      USER_ID: string
      COMMENT_TEXT: string
      SECONDS: string
      MINUTES: string
      SOURCE: string
      CREATED_DATE: ISODate | null
      DATE_START: ISODate | null
      DATE_STOP: ISODate | null
    }[]

    try {
      const response = await $b24.actions.v2.call.make<ElapsedItemResult>({
        method: 'task.elapseditem.get',
        params: {
          TASKID: 691,
          ITEMID: 1,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result[0].ID, result[0].SECONDS, result[0].CREATED_DATE)
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
      async function getElapsedItem() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'task.elapseditem.get',
            params: {
              TASKID: 691,
              ITEMID: 1,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result[0].ID, result[0].SECONDS, result[0].CREATED_DATE)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getElapsedItem)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.elapseditem.get',
                [
                    'TASKID' => 691,
                    'ITEMID' => 1,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting elapsed item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.elapseditem.get',
        {
            "TASKID": 691,
            "ITEMID": 1,
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
        'task.elapseditem.get',
        [
            'TASKID' => 691,
            'ITEMID' => 1,
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
    "result":[
        {
            "ID": "1",
            "TASK_ID": "691",
            "USER_ID": "1",
            "COMMENT_TEXT": "1",
            "SECONDS": "3600",
            "MINUTES": "60",
            "SOURCE": "2",
            "CREATED_DATE": "2024-05-16T10:33:00+02:00",
            "DATE_START": "2024-05-16T10:33:15+02:00",
            "DATE_STOP": "2024-05-16T10:33:15+02:00"
        }
    ],
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

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Информация о записи о затраченном времени ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_CORE",
    "error_description":"Задача не найдена"
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
- [{#T}](./task-elapsed-item-update.md)
- [{#T}](./task-elapsed-item-get-list.md)
- [{#T}](./task-elapsed-item-delete.md)
- [{#T}](./task-elapsed-item-is-action-allowed.md)
- [{#T}](./task-elapsed-item-get-manifest.md)