# Изменить задачу tasks.task.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: 
> - любой пользователь с доступом к редактированию задачи
> - постановщик задачи

Метод `tasks.task.update` изменяет поля задачи и возвращает задачу целиком после изменения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **taskId***
[`integer`](../data-types.md) | Идентификатор задачи. 

Идентификатор задачи можно получить при [создании новой задачи](./tasks-task-add.md) или методом [получения списка задач](./tasks-task-list.md) ||
|| **fields***
[`object`](../data-types.md) | Значения [полей задачи](./fields.md), которые нужно изменить. Передавайте только изменяемые поля: непереданные поля сохраняют текущие значения. Неизвестные поля метод игнорирует. Если передать пустой объект `{}`, метод ничего не изменит и вернет задачу.

В метод можно передать параметр `SE_PARAMETER` — список объектов с дополнительными параметрами задачи. Возможные значения кодов `CODE`:
- `1` — сроки определяются сроками подзадач
- `2` — автоматически завершать задачу при завершении подзадач (и наоборот)
- `3` — не завершать задачу без результата

```js
SE_PARAMETER: [
    {
        VALUE: 'Y',
        CODE: 3
    },
    {
        VALUE: 'Y',
        CODE: 2
    }
]
```
||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":11,"fields":{"UF_CRM_TASK":["L_4","C_7","CO_5","D_10"],"UF_TASK_WEBDAV_FILES":["n12345","n67890"],"RESPONSIBLE_ID":123}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.task.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":11,"fields":{"UF_CRM_TASK":["L_4","C_7","CO_5","D_10"],"UF_TASK_WEBDAV_FILES":["n12345","n67890"],"RESPONSIBLE_ID":123},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.task.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Minimal shape of result.task; the API returns the full task object
    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TaskUpdateResult = {
      task: { id: string }
    }

    try {
      const response = await $b24.actions.v2.call.make<TaskUpdateResult>({
        method: 'tasks.task.update',
        params: {
          taskId: 11, // ID of the task to update
          fields: {
            // Bind the task to several CRM entities via UF_CRM_TASK
            UF_CRM_TASK: ['L_4', 'C_7', 'CO_5', 'D_10'], // Lead 4 / Contact 7 / Company 5 / Deal 10
            // Attach several Drive files via UF_TASK_WEBDAV_FILES (prefix IDs with "n")
            UF_TASK_WEBDAV_FILES: ['n12345', 'n67890'],
            RESPONSIBLE_ID: 123 // New responsible person ID
          }
        },
        requestId: Text.getUuidRfc4122() // optional unique tracking id for this request
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(`Task ${result.task.id} updated`)
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
      async function updateTask() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.task.update',
            params: {
              taskId: 11, // ID of the task to update
              fields: {
                // Bind the task to several CRM entities via UF_CRM_TASK
                UF_CRM_TASK: ['L_4', 'C_7', 'CO_5', 'D_10'], // Lead 4 / Contact 7 / Company 5 / Deal 10
                // Attach several Drive files via UF_TASK_WEBDAV_FILES (prefix IDs with "n")
                UF_TASK_WEBDAV_FILES: ['n12345', 'n67890'],
                RESPONSIBLE_ID: 123 // New responsible person ID
              }
            },
            requestId: B24Js.Text.getUuidRfc4122() // optional unique tracking id for this request
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(`Task ${result.task.id} updated`)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateTask)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "UF_CRM_TASK": [
            "L_4",
            "C_7",
            "CO_5",
            "D_10",
        ],
        "UF_TASK_WEBDAV_FILES": [
            "n12345",
            "n67890",
        ],
        "RESPONSIBLE_ID": 123,
    }

    try:
        bitrix_response = client.tasks.task.update(
            task_id=11,
            fields=fields,
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
                'tasks.task.update',
                [
                    'taskId' => 11, // Идентификатор задачи, которую вы хотите обновить
                    'fields' => [
                        // Пример передачи нескольких значений в поле UF_CRM_TASK
                        'UF_CRM_TASK' => [
                            'L_4', // Привязка к лиду с id 4
                            'C_7', // Привязка к контакту с id 7
                            'CO_5', // Привязка к компании с id 5
                            'D_10' // Привязка к сделке с id 10
                        ],
                        // Пример передачи нескольких файлов в поле UF_TASK_WEBDAV_FILES
                        'UF_TASK_WEBDAV_FILES' => [
                            'n12345', // Идентификатор первого файла диска
                            'n67890' // Идентификатор второго файла диска
                        ],
                        'RESPONSIBLE_ID' => 123 // Идентификатор нового исполнителя
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Задача успешно обновлена';
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Ошибка при обновлении задачи: ' . $e->getMessage();
    }
    ```

- BX24.js

   ```javascript
    BX24.callMethod(
        "tasks.task.update",
        {
            taskId: 11, // Идентификатор задачи, которую вы хотите обновить
            fields: {
                // Пример передачи нескольких значений в поле UF_CRM_TASK
                UF_CRM_TASK: [
                    "L_4", // Привязка к лиду с id 4
                    "C_7", // Привязка к контакту с id 7
                    "CO_5", // Привязка к компании с id 5
                    "D_10" // Привязка к сделкес id 10
                ],
                // Пример передачи нескольких файлов в поле UF_TASK_WEBDAV_FILES
                UF_TASK_WEBDAV_FILES: [
                    "n12345", // Идентификатор первого файла диска
                    "n67890" // Идентификатор второго файла диска
                ],
                RESPONSIBLE_ID: 123 // Идентификатор нового исполнителя
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info("Задача успешно обновлена");
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.task.update',
        [
            'taskId' => 11, // Идентификатор задачи, которую вы хотите обновить
            'fields' => [
                // Пример передачи нескольких значений в поле UF_CRM_TASK
                'UF_CRM_TASK' => [
                    'L_4', // Привязка к лиду с id 4
                    'C_7', // Привязка к контакту с id 7
                    'CO_5', // Привязка к компании с id 5
                    'D_10' // Привязка к сделке с id 10
                ],
                // Пример передачи нескольких файлов в поле UF_TASK_WEBDAV_FILES
                'UF_TASK_WEBDAV_FILES' => [
                    'n12345', // Идентификатор первого файла диска
                    'n67890' // Идентификатор второго файла диска
                ],
                'RESPONSIBLE_ID' => 123 // Идентификатор нового исполнителя
            ]
        ]
    );

    if (isset($result['error'])) {
        echo 'Ошибка: ' . $result['error_description'];
    } else {
        echo 'Задача успешно обновлена';
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "tasks.task.update", b24.Params{
    	"taskId": 11,
    	"fields": b24.Params{
    		"UF_CRM_TASK":          []string{"L_4", "C_7", "CO_5", "D_10"},
    		"UF_TASK_WEBDAV_FILES": []string{"n12345", "n67890"},
    		"RESPONSIBLE_ID":       123,
    	},
    })
    if err != nil {
    	return fmt.Errorf("tasks.task.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "task".
    raw, ok := b24.Unwrap(res.Result, "task")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа task")
    }

    var item struct {
    	ID          b24.ID `json:"id"`
    	Title       string `json:"title"`
    	Description string `json:"description"`
    	Priority    string `json:"priority"`
    	Multitask   string `json:"multitask"`
    	NotViewed   string `json:"notViewed"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Title)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "task": {
            "id": "11",
            "parentId": null,
            "title": "Пример задачи",
            "description": "Описание задачи",
            "mark": null,
            "priority": "1",
            "multitask": "N",
            "notViewed": "N",
            "replicate": "N",
            "stageId": "0",
            "sprintId": null,
            "backlogId": null,
            "createdBy": "1",
            "createdDate": "2026-10-29T15:35:23+03:00",
            "responsibleId": "1",
            "changedBy": "1",
            "changedDate": "2026-10-29T15:35:24+03:00",
            "statusChangedBy": null,
            "closedBy": null,
            "closedDate": null,
            "activityDate": "2026-10-29T15:35:24+03:00",
            "dateStart": null,
            "deadline": "2026-12-31T23:59:00+03:00",
            "startDatePlan": null,
            "endDatePlan": null,
            "guid": "{aa8a90e4-69a4-453a-b384-76f1a95569a1}",
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
            "outlookVersion": "2",
            "viewedDate": null,
            "sorting": null,
            "durationFact": null,
            "isMuted": "N",
            "isPinned": "N",
            "isPinnedInGroup": "N",
            "flowId": null,
            "chatId": 5747,
            "descriptionInBbcode": "Y",
            "status": "2",
            "statusChangedDate": "2026-10-29T15:35:24+03:00",
            "durationPlan": null,
            "durationType": "days",
            "favorite": "N",
            "groupId": "0",
            "auditors": [],
            "accomplices": [],
            "checklist": [],
            "group": [],
            "creator": {
                "id": "1",
                "name": "Иван Иванов",
                "link": "/company/personal/user/1/",
                "icon": "https://test.bitrix24.ru/upload/resize_cache/main/avatar.png",
                "workPosition": null
            },
            "responsible": {
                "id": "1",
                "name": "Иван Иванов",
                "link": "/company/personal/user/1/",
                "icon": "https://test.bitrix24.ru/upload/resize_cache/main/avatar.png",
                "workPosition": null
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
                    "userId": 1,
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
        "start": 1793277324,
        "finish": 1793277324.579209,
        "duration": 0.5792090892791748,
        "processing": 0,
        "date_start": "2026-10-29T15:35:24+03:00",
        "date_finish": "2026-10-29T15:35:24+03:00",
        "operating_reset_at": 1793277900,
        "operating": 0.20716381072998047
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа ||
|| **task**
[`object`](../data-types.md) | Все поля задачи после изменения, включая непереданные. [Описание полей задачи](./fields.md) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "Невозможно привязать узел к самому себе\u003Cbr\u003E"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | wrong task id | В параметре `taskId` передано не число ||
|| `400` | `100` | Could not find value for {taskId} | Не передан обязательный параметр `taskId` ||
|| `400` | `0` | Действие над задачей не разрешено | Задача с переданным `taskId` не найдена, или у пользователя нет права изменять задачу ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан параметр `fields` ||
|| `400` | `ERROR_CORE` | Пользователь указанный в поле \u0026quot;Исполнитель\u0026quot; не найден\u003Cbr\u003E | В поле `RESPONSIBLE_ID` указан идентификатор несуществующего пользователя ||
|| `400` | `ERROR_CORE` | Некорректный статус\u003Cbr\u003E | В поле `STATUS` передано значение не из списка `1`, `2`, `3`, `4`, `5`, `6`. В текущей версии метод может не вернуть эту ошибку: недопустимое значение игнорируется, статус остается прежним ||
|| `400` | `ERROR_CORE` | Задача указанная в поле \u0026quot;Надзадача\u0026quot; не найдена\u003Cbr\u003E | В поле `PARENT_ID` указан идентификатор несуществующей задачи ||
|| `400` | `ERROR_CORE` | Невозможно привязать узел к самому себе\u003Cbr\u003E | В поле `PARENT_ID` указан идентификатор той же задачи, что и в параметре `taskId` ||
|| `400` | `ERROR_CORE` | Создание зацикленных связей в задачах запрещено\u003Cbr\u003E | В поле `PARENT_ID` указан идентификатор подзадачи `taskId`. Подзадача не может стать базовой задачей ||
|| `400` | `ERROR_CORE` | В планировании сроков указана дата окончания меньшая даты старта\u003Cbr\u003E | Дата и время в поле `END_DATE_PLAN` указано меньше, чем в `START_DATE_PLAN` ||
|| `400` | `ERROR_CORE` | В планировании сроков указана слишком большая длительность задачи\u003Cbr\u003E | В значении поля `END_DATE_PLAN` указана слишком большая дата ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./tasks-task-update-rest-v3.md)
- [{#T}](./tasks-task-add.md)
- [{#T}](./tasks-task-get.md)
- [{#T}](./tasks-task-list.md)
- [{#T}](./tasks-task-delete.md)
- [{#T}](./tasks-task-get-fields.md)
- [{#T}](../../tutorials/tasks/how-to-upload-file-to-task.md)
- [{#T}](../../tutorials/tasks/how-to-connect-task-to-spa.md)
- [{#T}](../../tutorials/tasks/how-to-create-comment-with-file.md)