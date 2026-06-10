# Создать стадию канбана Скрама tasks.api.scrum.kanban.addStage

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод создает стадию канбана Скрама.

Канбан Скрама обязательно должен содержать в себе стадии с типом новая `NEW` и финальная `FINISH`.

Используйте метод только для активных спринтов, то есть с полем `"status": "active"`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Поля, соответствующие доступному списку полей [tasks.api.scrum.kanban.getFields](./tasks-api-scrum-kanban-get-fields.md) (подробное описание приведено [ниже](#parametr-fields)) ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **sprintId***
[`integer`](../../../data-types.md) | Идентификатор спринта. Получить идентификатор можно при помощи метода [tasks.api.scrum.sprint.list](../sprint/tasks-api-scrum-sprint-list.md) ||
|| **name***
[`string`](../../../data-types.md) | Название стадии канбана ||
|| **type**
[`string`](../../../data-types.md) | Тип стадии канбана. Возможные значения: `NEW`, `WORK`, `FINISH` ||
|| **sort**
[`integer`](../../../data-types.md) | Порядок сортировки. Значение поля должно быть кратно `100` ||
|| **color**
[`string`](../../../data-types.md) | Цвет стадии канбана ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"sprintId":1,"name":"Первая стадия","type":"NEW","color":"00C4FB","sort":100}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.api.scrum.kanban.addStage
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"sprintId":1,"name":"Первая стадия","type":"NEW","color":"00C4FB","sort":100},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.api.scrum.kanban.addStage
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'tasks.api.scrum.kanban.addStage',
        params: {
          fields: {
            sprintId: 1,
            name: 'First stage',
            type: 'NEW',
            color: '00C4FB',
            sort: 100,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('New kanban stage ID:', result)
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
      async function addKanbanStage() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.api.scrum.kanban.addStage',
            params: {
              fields: {
                sprintId: 1,
                name: 'First stage',
                type: 'NEW',
                color: '00C4FB',
                sort: 100,
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
          console.info('New kanban stage ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addKanbanStage)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.api.scrum.kanban.addStage',
                [
                    'fields' => [
                        'sprintId' => 1,
                        'name' => 'Первая стадия',
                        'type' => 'NEW',
                        'color' => '00C4FB',
                        'sort' => 100,
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
        echo 'Error adding stage: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.api.scrum.kanban.addStage',
        {
            "fields": {
                "sprintId": 1,
                "name": "Первая стадия",
                "type": "NEW",
                "color": "00C4FB",
                "sort": 100,
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
        'tasks.api.scrum.kanban.addStage',
        [
            'fields' => [
                'sprintId' => 1,
                'name' => 'Первая стадия',
                'type' => 'NEW',
                'sort' => 100,
                'color' => '00C4FB',
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
    "result": 5,
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
    "error":0,
    "error_description":"Sprint not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | `Sprint id not found` | Не заполнено обязательное поле `sprintId` ||
|| `0` | `Sprint not found` | Передан неизвестный идентификатор спринта ||
|| `0` | `Access denied` | Доступ запрещен ||
|| `0` | `Incorrect name format` | Не заполнено обязательное поле `name` ||
|| `0` | Неизвестная ошибка | ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./tasks-api-scrum-kanban-update-stage.md)
- [{#T}](./tasks-api-scrum-kanban-add-task.md)
- [{#T}](./tasks-api-scrum-kanban-delete-stage.md)
- [{#T}](./tasks-api-scrum-kanban-delete-task.md)
- [{#T}](./tasks-api-scrum-kanban-get-fields.md)
- [{#T}](./tasks-api-scrum-kanban-get-stages.md)