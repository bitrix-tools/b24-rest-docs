# Отключить наблюдение за задачей tasks.task.stopwatch

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к задаче на чтение

Метод `tasks.task.stopwatch` убирает текущего пользователя из наблюдателей задачи. Начать наблюдение можно методом [tasks.task.startwatch](./tasks-task-start-watch.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **taskId***
[`integer`](../../data-types.md) | Идентификатор задачи. Метод принимает его и под именем `id`.

Идентификатор задачи можно получить при [создании новой задачи](../tasks-task-add.md) или методом [получения списка задач](../tasks-task-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":8017}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.task.stopwatch
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":8017,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.task.stopwatch
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type StopWatchResult = {
      task: {
        id: string
        title: string
        status: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<StopWatchResult>({
        method: 'tasks.task.stopwatch',
        params: {
          taskId: 8017,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Stopped watching task:', result.task.id, result.task.title)
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
      async function stopWatch() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.task.stopwatch',
            params: {
              taskId: 8017,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Stopped watching task:', result.task.id, result.task.title)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', stopWatch)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.tasks.task.stopwatch(
            task_id=8017,
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
                'tasks.task.stopwatch',
                [
                    'taskId' => 8017
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error stopping task watch: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.task.stopwatch',
        {
            'taskId': 8017
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
        'tasks.task.stopwatch',
        [
            'taskId' => 8017
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "tasks.task.stopwatch", b24.Params{
    	"taskId": 8017,
    })
    if err != nil {
    	return fmt.Errorf("tasks.task.stopwatch: %w", err)
    }

    keys, ok := b24.Keys(res.Result)
    if !ok {
    	return fmt.Errorf("ожидался объект в ответе")
    }
    fmt.Println("полей в ответе:", len(keys))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "task": {
            "id": "8017",
            "parentId": null,
            "title": "Пример задачи",
            "description": "",
            "mark": null,
            "priority": "1",
            "multitask": "N",
            "notViewed": "N",
            "replicate": "N",
            "stageId": "0",
            "sprintId": null,
            "backlogId": null,
            "createdBy": "503",
            "createdDate": "2026-11-20T09:28:51+03:00",
            "responsibleId": "547",
            "changedBy": "503",
            "changedDate": "2026-11-20T09:28:58+03:00",
            "statusChangedBy": null,
            "closedBy": null,
            "closedDate": null,
            "activityDate": "2026-11-20T09:28:58+03:00",
            "dateStart": null,
            "deadline": "2026-11-27T22:00:00+03:00",
            "startDatePlan": null,
            "endDatePlan": null,
            "guid": "{7b740fda-1af7-457f-adf2-552a48079233}",
            "xmlId": null,
            "commentsCount": null,
            "serviceCommentsCount": null,
            "allowChangeDeadline": "N",
            "allowTimeTracking": "N",
            "taskControl": "N",
            "addInReport": "N",
            "forkedByTemplateId": null,
            "timeEstimate": "0",
            "timeSpentInLogs": null,
            "matchWorkTime": "N",
            "forumTopicId": null,
            "forumId": null,
            "siteId": "s1",
            "subordinate": "N",
            "exchangeModified": null,
            "exchangeId": null,
            "outlookVersion": "3",
            "viewedDate": null,
            "sorting": null,
            "durationFact": null,
            "isMuted": "N",
            "isPinned": "N",
            "isPinnedInGroup": "N",
            "flowId": null,
            "chatId": 5963,
            "descriptionInBbcode": "Y",
            "status": "2",
            "statusChangedDate": "2026-11-20T09:28:58+03:00",
            "durationPlan": null,
            "durationType": "days",
            "favorite": "N",
            "groupId": "0",
            "auditors": [],
            "accomplices": [],
            "checklist": [],
            "group": [],
            "creator": {
                "id": "503",
                "name": "Мария Иванова",
                "link": "/company/personal/user/503/",
                "icon": "/bitrix/images/tasks/default_avatar.png",
                "workPosition": null
            },
            "responsible": {
                "id": "547",
                "name": "Андрей Карпов",
                "link": "/company/personal/user/547/",
                "icon": "/bitrix/images/tasks/default_avatar.png",
                "workPosition": "Менеджер по продажам"
            },
            "accomplicesData": [],
            "auditorsData": [],
            "newCommentsCount": 0,
            "action": {
                "accept": false,
                "decline": false,
                "complete": true,
                "approve": false,
                "disapprove": false,
                "start": true,
                "pause": false,
                "delegate": true,
                "remove": true,
                "edit": true,
                "defer": true,
                "renew": false,
                "create": true,
                "changeDeadline": true,
                "checklistAddItems": true,
                "addFavorite": true,
                "deleteFavorite": false,
                "rate": true,
                "take": false,
                "edit.originator": false,
                "checklist.reorder": true,
                "elapsedtime.add": true,
                "dayplan.timer.toggle": false,
                "edit.plan": true,
                "checklist.add": true,
                "favorite.add": true,
                "favorite.delete": false
            },
            "checkListTree": {
                "nodeId": 0,
                "fields": {
                    "id": null,
                    "copiedId": null,
                    "entityId": null,
                    "userId": 503,
                    "createdBy": null,
                    "parentId": null,
                    "title": "",
                    "sortIndex": null,
                    "displaySortIndex": "",
                    "isComplete": false,
                    "isImportant": false,
                    "completedCount": 0,
                    "members": [],
                    "attachments": [],
                    "nodeId": null
                },
                "action": [],
                "descendants": []
            },
            "checkListCanAdd": true
        }
    },
    "time": {
        "start": 1795156138,
        "finish": 1795156138.709098,
        "duration": 0.7090981006622314,
        "processing": 0,
        "date_start": "2026-11-20T09:28:58+03:00",
        "date_finish": "2026-11-20T09:28:58+03:00",
        "operating_reset_at": 1795156680,
        "operating": 0.1619868278503418
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа. ||
|| **task**
[`object`](../../data-types.md) | Объект с [описанием задачи](../fields.md) после выполнения операции. Текущего пользователя нет в массиве `auditors` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"0",
    "error_description":"wrong task id"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for {taskId} | Не передан параметр `taskId` ||
|| `400` | `0` | wrong task id | В `taskId` передано не число, например `abc` ||
|| `400` | `1048584` | a:1:{i:0;s:0:"";} | Задача не найдена или у пользователя нет к ней доступа на чтение. Текст ошибки — служебная строка без описания причины ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./tasks-task-start-watch.md)
- [{#T}](../tasks-task-get.md)
