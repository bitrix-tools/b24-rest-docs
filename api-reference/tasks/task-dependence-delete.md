# Удалить связь между задачами task.dependence.delete

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод удаляет зависимость одной задачи от другой.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **taskIdFrom***
[`integer`](../data-types.md) | Идентификатор задачи, от которой удаляется зависимость. Идентификатор задачи возвращается [методом создания новой задачи](./tasks-task-add.md) ||
|| **taskIdTo***
[`integer`](../data-types.md) | Идентификатор задачи, для которой удаляется зависимость ||
|#

Идентификатор задачи можно получить при [создании новой задачи](./tasks-task-add.md) или методом [получения списка задач](./tasks-task-list.md).

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskIdFrom":100,"taskIdTo":101}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.dependence.delete
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskIdFrom":100,"taskIdTo":101,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.dependence.delete
    ```

- TS

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (empty array on success)
    type DeleteDependenceResult = never[]

    try {
      const response = await $b24.actions.v2.call.make<DeleteDependenceResult>({
        method: 'task.dependence.delete',
        params: {
          taskIdFrom: 100,
          taskIdTo: 101,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Dependency deleted successfully, result:', result)
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
      async function deleteDependence() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'task.dependence.delete',
            params: {
              taskIdFrom: 100,
              taskIdTo: 101,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Dependency deleted successfully, result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', deleteDependence)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.dependence.delete',
                [
                    'taskIdFrom' => 100,
                    'taskIdTo'   => 101,
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
        echo 'Error deleting task dependence: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.dependence.delete', {
            "taskIdFrom":100,
            "taskIdTo":101,
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
        'task.dependence.delete',
        [
            'taskIdFrom' => 100,
            'taskIdTo' => 101,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Пример успешно выполненого запроса

```json
{
    "result":{
        []
    },
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
[`object`](../data-types.md) | В случае успеха содержит пустой массив ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ILLEGAL_NEW_LINK",
    "error_description":"Связь между задачами не существует"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ILLEGAL_NEW_LINK` | Связь между задачами не существует ||
|| `ACTION_NOT_ALLOWED` | Невозможно удалить связь между задачами ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./task-dependence-add.md)