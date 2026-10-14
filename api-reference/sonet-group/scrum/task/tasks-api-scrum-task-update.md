# Создать или обновить задачу Скрама tasks.api.scrum.task.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами на изменение задачи и Скрама

Метод `tasks.api.scrum.task.update` создает или обновляет задачу Скрама. Вы сможете:
- создать задачу в Скраме
- перенести ее между бэклогом и спринтами
- изменить стори поинты
- привязать эпик

Задачу нужно создать методом [tasks.task.add](../../../tasks/tasks-task-add.md) или обновить методом [tasks.task.update](../../../tasks/tasks-task-update.md). В поле `GROUP_ID` укажите идентификатор того же Скрама, к которому относится бэклог или спринт из `entityId`. Метод `tasks.api.scrum.task.update` не переносит задачу между проектами.

Получить идентификатор группы можно методом [создания новой группы](../../sonet-group-create.md) или методом [получения списка групп](../../socialnetwork-api-workgroup-list.md). Группа является Скрамом, если у нее заполнено поле `SCRUM_MASTER_ID`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор задачи ||
|| **fields***
[`object`](../../../data-types.md) | Объект содержащий записи о задаче скрама (подробное описание приведено [ниже](#parametr-fields)) в виде структуры:

```js
fields: {
    entityId: 'значение',
    storyPoints: 'значение',
    epicId: 'значение',
    sort: 'значение',
    sortFloat: 'значение',
    createdBy: 'значение',
    modifiedBy: 'значение'
}
```

||
|#

### Параметр fields

#|
|| **Название**
`тип` | **Описание** ||
|| **entityId**
`integer` | Идентификатор бэклога или спринта.

Параметр обязателен при добавлении задачи в Скрам. Для существующей задачи Скрама параметр можно не передавать, если не нужно перемещать ее между бэклогом и спринтами ||
|| **storyPoints**
`string` | Стори Поинты — относительная оценка сложности задачи.

Может иметь строковое значение ||
|| **epicId**
`integer` | Идентификатор эпика ||
|| **sort**
`integer` | Сортировка ||
|| **sortFloat**
`float` | Значение сортировки с дробной частью ||
|| **createdBy**
`integer` | Идентификатор пользователя, который создал запись задачи в Скраме ||
|| **modifiedBy**
`integer` | Идентификатор пользователя, который изменил запись задачи в Скраме ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"fields":{"epicId":1,"storyPoints":"8","entityId":2}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.api.scrum.task.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"fields":{"epicId":1,"storyPoints":"8","entityId":2},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.api.scrum.task.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'tasks.api.scrum.task.update',
        params: {
          id: 1,
          fields: {
            epicId: 1,
            storyPoints: '8',
            entityId: 2,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Scrum task updated:', result)
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
      async function updateScrumTask() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.api.scrum.task.update',
            params: {
              id: 1,
              fields: {
                epicId: 1,
                storyPoints: '8',
                entityId: 2,
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
          console.info('Scrum task updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateScrumTask)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.tasks.api.scrum.task.update(
            bitrix_id=1,
            fields={
                "epicId": 1,
                "storyPoints": "8",
                "entityId": 2,
            },
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
    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.api.scrum.task.update',
                [
                    'id' => 1,
                    'fields' => [
                        'epicId'      => 1,
                        'storyPoints' => '8',
                        'entityId'    => 2
                    ]
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
        echo 'Error updating scrum task: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.api.scrum.task.update',
        {
            id: 1,
            fields: 
            {
                epicId: 1,
                storyPoints: '8',
                entityId: 2
            }
        },
        function(res)
        {
            console.log(res);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.api.scrum.task.update',
        [
            'id' => 1,
            'fields' => [
                'epicId' => 1,
                'storyPoints' => '8',
                'entityId' => 2
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "tasks.api.scrum.task.update", b24.Params{
    	"id": 1,
    	"fields": b24.Params{
    		"epicId":      1,
    		"storyPoints": "8",
    		"entityId":    2,
    	},
    })
    if err != nil {
    	return fmt.Errorf("tasks.api.scrum.task.update: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1721402687.900315,
        "finish": 1721402694.313811,
        "duration": 6.413496017456055,
        "processing": 6.387248992919922,
        "date_start": "2024-07-19T15:24:47+00:00",
        "date_finish": "2024-07-19T15:24:54+00:00",
        "operating": 6.387217998504639
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Возвращает `true`, если задача Скрама создана или обновлена ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 0,
    "error_description": "Task not found."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Task id not found | Передан идентификатор задачи, равный `0` ||
|| `0` | Entity id not found | Для добавления задачи в Скрам не передан `entityId` ||
|| `0` | Entity not found. | Бэклог или спринт с указанным `entityId` не найден ||
|| `0` | Epic not found | Эпик не найден ||
|| `0` | Task not found. | Задача не найдена ||
|| `0` | Task not found. The task must be in the project of the entity | Задача и бэклог или спринт из `entityId` относятся к разным проектам ||
|| `0` | Access denied | Доступ запрещен ||
|| `0` | Item not created | Задача не добавлена в Скрам ||
|| `0` | createdBy user not found | Пользователь из `createdBy` не найден ||
|| `0` | modifiedBy user not found | Пользователь из `modifiedBy` не найден ||
|| `0` | Unable to update task | Не удалось сохранить изменения задачи Скрама ||
|| `100` | Could not find value for parameter {id} | Не передан обязательный параметр `id` ||
|| `100` | Could not find value for parameter {fields} | Не передан обязательный параметр `fields` ||
|| `100` | Invalid value {stringValue} to match with parameter {id}. Should be value of type int. | В параметре `id` передано значение неверного типа ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./tasks-api-scrum-task-get.md)
- [{#T}](./tasks-api-scrum-task-get-fields.md)
