# Создать задачу по шаблону v 3.0 tasks.template.task.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом просмотра шаблона

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `tasks.template.task.add` создает задачу по шаблону и возвращает ее.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateId***
[`integer`](../../data-types.md) | Идентификатор шаблона задачи.

Идентификатор можно получить методом [tasks.template.add](./tasks-template-add-rest-v3.md) при создании шаблона или методом [tasks.template.list](./tasks-template-list-rest-v3.md) ||
|| **fields***
[`object`](../../data-types.md) | Поля задачи, которые заменяют значения шаблона [(подробное описание)](#fields). Остальные поля задача получает из шаблона.

Чтобы создать задачу только по шаблону, передайте пустой объект `{}` ||
|| **withSubTasks**
[`boolean`](../../data-types.md) | Создавать ли подзадачи по дочерним шаблонам.

Возможные значения:

- `true` — создать подзадачи по дочерним шаблонам всех уровней
- `false` — создать только задачу

По умолчанию: `false` ||
|| **view**
[`boolean`](../../data-types.md) | Отметить ли задачу просмотренной пользователем, который вызвал метод.

Возможные значения:

- `true` — задача сразу отмечается просмотренной
- `false` — задача создается непросмотренной

По умолчанию: `false` ||
|#

### Параметр fields {#fields}

В `fields` можно передать только перечисленные поля. Формат и значения полей — в [описании полей задачи](../fields-rest-v3.md#taskdto).

#|
|| **Название**
`тип` | **Описание** ||
|| **title**
[`string`](../../data-types.md) | Название задачи. Пустая строка вызывает ошибку ||
|| **description**
[`string`](../../data-types.md) | Описание задачи ||
|| **responsibleId**
[`integer`](../../data-types.md) | Идентификатор исполнителя.

Идентификатор пользователя можно получить методом [user.get](../../user/user-get.md) ||
|| **deadline**
[`datetime`](../../data-types.md) | Крайний срок, например `2026-12-31T18:00:00+03:00` ||
|| **startPlan**
[`datetime`](../../data-types.md) | Плановая дата начала ||
|| **endPlan**
[`datetime`](../../data-types.md) | Плановая дата завершения ||
|| **priority**
[`string`](../../data-types.md) | Приоритет задачи.

Возможные значения:

- `high` — высокий
- `average` — средний
- `low` — низкий ||
|| **groupId**
[`integer`](../../data-types.md) | Идентификатор группы или проекта.

Идентификатор можно получить методом [sonet_group.get](../../sonet-group/sonet-group-get.md) ||
|| **stageId**
[`integer`](../../data-types.md) | Идентификатор стадии канбана группы ||
|| **flowId**
[`integer`](../../data-types.md) | Идентификатор потока ||
|| **epicId**
[`integer`](../../data-types.md) | Идентификатор эпика Скрама ||
|| **storyPoints**
[`integer`](../../data-types.md) | Стори поинты задачи Скрама ||
|| **parentId**
[`integer`](../../data-types.md) | Идентификатор родительской задачи ||
|| **crmItemIds**
[`string[]`](../../data-types.md) | Коды элементов CRM, например `["D_9193","L_1001345"]`. Формат кодов — в [описании полей задачи](../fields-rest-v3.md#taskdto) ||
|| **fileIds**
[`integer[]`](../../data-types.md) | Идентификаторы файлов Диска, которые нужно прикрепить к задаче ||
|| **checklist**
[`array`](../../data-types.md) | Чек-лист задачи ||
|| **reminders**
[`array`](../../data-types.md) | Напоминания по задаче ||
|| **dependsOn**
[`array`](../../data-types.md) | Зависимости от задач ||
|| **needsControl**
[`boolean`](../../data-types.md) | Контроль задачи постановщиком: после завершения исполнителем задача ждет проверки ||
|| **requireResult**
[`boolean`](../../data-types.md) | Требовать результат: задачу нельзя завершить без записи о результате ||
|| **plannedDuration**
[`integer`](../../data-types.md) | Плановая длительность задачи ||
|| **durationType**
[`string`](../../data-types.md) | Единица плановой длительности.

Возможные значения: `seconds`, `minutes`, `hours`, `days`, `weeks`, `months`, `years` ||
|| **estimatedTime**
[`integer`](../../data-types.md) | Оценка времени в секундах ||
|| **allowsChangeDeadline**
[`boolean`](../../data-types.md) | Разрешить исполнителю менять крайний срок ||
|| **allowsChangeDatePlan**
[`boolean`](../../data-types.md) | Разрешить исполнителю менять плановые даты ||
|| **maxDeadlineChangeDate**
[`datetime`](../../data-types.md) | Дата, позже которой исполнитель не может перенести крайний срок ||
|| **maxDeadlineChanges**
[`integer`](../../data-types.md) | Максимальное количество переносов крайнего срока ||
|| **requireDeadlineChangeReason**
[`boolean`](../../data-types.md) | Требовать причину при переносе крайнего срока ||
|| **allowsTimeTracking**
[`boolean`](../../data-types.md) | Включить учет времени по задаче ||
|| **matchesWorkTime**
[`boolean`](../../data-types.md) | Учитывать рабочее время: пропускать выходные дни при расчете плановых дат ||
|| **matchesSubTasksTime**
[`boolean`](../../data-types.md) | Учитывать сроки подзадач при расчете плановых дат ||
|| **autocompleteSubTasks**
[`boolean`](../../data-types.md) | Завершать подзадачи вместе с задачей ||
|| **checklistAutonumbering**
[`boolean`](../../data-types.md) | Нумеровать пункты чек-листа. Если поле не передано, значение берется из шаблона ||
|| **addInReport**
[`boolean`](../../data-types.md) | Добавлять задачу в отчет ||
|| **isMultitask**
[`boolean`](../../data-types.md) | Признак «базовая задача с подзадачами» ||
|| **siteId**
[`string`](../../data-types.md) | Идентификатор сайта, например `s1` ||
|#

Другие поля задачи, например `creatorId`, `accomplices`, `auditors`, `tags` и пользовательские поля, метод не принимает и возвращает ошибку `Field is not allowed to write`. Постановщика, соисполнителей, наблюдателей и теги задача получает из шаблона.

Если в шаблоне несколько исполнителей, метод создает задачу для каждого из них. С `withSubTasks: true` метод создает не больше 200 задач за вызов, включая подзадачи и копии для каждого исполнителя. Если по шаблону получается больше, метод не создает ни одной задачи.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.template.task.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":125,"fields":{"title":"Подготовить отчет","deadline":"2026-12-31T18:00:00+03:00","priority":"high"},"withSubTasks":true,"view":true}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.task.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":125,"fields":{"title":"Подготовить отчет","deadline":"2026-12-31T18:00:00+03:00","priority":"high"},"withSubTasks":true,"view":true,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.template.task.add
    ```

- JS (TS)

    Методы шаблонов задач REST 3.0 пока не входят в список методов, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TemplateTaskAddResult = {
      item: {
        id: number
        title: string
        creatorId: number
        responsibleId: number
        deadline: ISODate | null
        priority: string
        status: string
        containsSubTasks: boolean
        link: string
        crmItemIds: string[]
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<TemplateTaskAddResult>(
        'tasks.template.task.add',
        {
          templateId: 125,
          fields: {
            title: 'Подготовить отчет',
            deadline: '2026-12-31T18:00:00+03:00',
            priority: 'high',
          },
          withSubTasks: true,
          view: true,
        },
        Text.getUuidRfc4122()
      )

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Task created:', result.item.id, result.item.title, result.item.status)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    Методы шаблонов задач REST 3.0 пока не входят в список методов, который знает `$b24.actions.v3.call.make`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(B24Js.ApiVersion.v3).call`.

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function addTaskFromTemplate() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'tasks.template.task.add',
            {
              templateId: 125,
              fields: {
                title: 'Подготовить отчет',
                deadline: '2026-12-31T18:00:00+03:00',
                priority: 'high',
              },
              withSubTasks: true,
              view: true,
            },
            B24Js.Text.getUuidRfc4122()
          )

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Task created:', result.item.id, result.item.title, result.item.status)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addTaskFromTemplate)
    </script>
    ```

- Python

    Методы шаблонов задач REST 3.0 пока не входят в список `Config().api_v3_methods`, и без него `b24pysdk` отправит вызов на старый адрес REST. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "tasks.template.task.add"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "templateId": 125,
                "fields": {
                    "title": "Подготовить отчет",
                    "deadline": "2026-12-31T18:00:00+03:00",
                    "priority": "high",
                },
                "withSubTasks": True,
                "view": True,
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"code: {error.code}",
            f"message: {error.error.message}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.template.task.add',
                [
                    'templateId' => 125,
                    'fields' => [
                        'title' => 'Подготовить отчет',
                        'deadline' => '2026-12-31T18:00:00+03:00',
                        'priority' => 'high',
                    ],
                    'withSubTasks' => true,
                    'view' => true,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'tasks.template.task.add',
        {
            templateId: 125,
            fields: {
                title: 'Подготовить отчет',
                deadline: '2026-12-31T18:00:00+03:00',
                priority: 'high',
            },
            withSubTasks: true,
            view: true,
        },
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.template.task.add',
        [
            'templateId' => 125,
            'fields' => [
                'title' => 'Подготовить отчет',
                'deadline' => '2026-12-31T18:00:00+03:00',
                'priority' => 'high',
            ],
            'withSubTasks' => true,
            'view' => true,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы, базовый адрес клиента содержит /rest/api/
    res, err := client.Core().Call(ctx, "tasks.template.task.add", b24.Params{
    	"templateId": 125,
    	"fields": b24.Params{
    		"title":    "Подготовить отчет",
    		"deadline": "2026-12-31T18:00:00+03:00",
    		"priority": "high",
    	},
    	"withSubTasks": true,
    	"view":         true,
    })
    if err != nil {
    	return fmt.Errorf("tasks.template.task.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var task struct {
    	ID     b24.ID `json:"id"`
    	Title  string `json:"title"`
    	Status string `json:"status"`
    }
    if err := json.Unmarshal(raw, &task); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(task.ID, task.Title)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Метод возвращает созданную задачу. Подзадачи, созданные с `withSubTasks: true`, в ответ не входят: признак их наличия — `containsSubTasks: true`. Получить подзадачи можно методом [tasks.task.list](../tasks-task-list-rest-v3.md) с фильтром по `parentId`.

```json
{
    "result": {
        "item": {
            "id": 4403,
            "title": "Подготовить отчет",
            "description": "Подготовить отчет по итогам недели",
            "creatorId": 1269,
            "responsibleId": 1269,
            "deadline": "2026-12-31T18:00:00+03:00",
            "needsControl": false,
            "startPlan": null,
            "endPlan": null,
            "fileIds": null,
            "checklist": [],
            "epicId": null,
            "storyPoints": null,
            "priority": "high",
            "status": "pending",
            "statusChanged": null,
            "parentId": null,
            "containsChecklist": false,
            "containsSubTasks": true,
            "containsRelatedTasks": false,
            "containsGanttLinks": false,
            "containsPlacements": true,
            "containsResults": false,
            "numberOfReminders": 0,
            "chatId": 6167,
            "plannedDuration": 0,
            "actualDuration": 0,
            "durationType": "days",
            "started": null,
            "estimatedTime": 0,
            "replicate": null,
            "changed": "2026-11-23T13:18:08+03:00",
            "changedById": 1269,
            "closed": null,
            "activity": "2026-11-23T13:18:08+03:00",
            "guid": "{6d42e14e-53f4-49cf-b896-e6fdd0912c20}",
            "xmlId": null,
            "exchangeId": null,
            "exchangeModified": null,
            "outlookVersion": 1,
            "mark": "none",
            "allowsChangeDeadline": false,
            "allowsTimeTracking": false,
            "matchesWorkTime": false,
            "addInReport": null,
            "isMultitask": false,
            "siteId": "s1",
            "deadlineCount": null,
            "declineReason": null,
            "forumTopicId": null,
            "link": "/company/personal/user/1269/tasks/task/view/4403/",
            "rights": {
                "read": true,
                "watch": true,
                "mute": true,
                "createResult": true,
                "edit": true,
                "remove": true,
                "complete": true,
                "approve": false,
                "disapprove": false,
                "start": true,
                "take": false,
                "delegate": true,
                "defer": true,
                "renew": false,
                "deadline": true,
                "datePlan": true,
                "changeDirector": false,
                "changeResponsible": true,
                "changeAccomplices": true,
                "pause": false,
                "timeTracking": false,
                "mark": true,
                "changeStatus": true,
                "reminder": true,
                "addAuditors": true,
                "elapsedTime": true,
                "favorite": true,
                "checklistAdd": true,
                "checklistEdit": true,
                "checklistSave": true,
                "checklistToggle": true,
                "automate": true,
                "resultEdit": false,
                "completeResult": true,
                "removeResult": false,
                "resultRead": false,
                "admin": true,
                "createSubtask": true,
                "copy": true,
                "saveAsTemplate": true,
                "attachFile": true,
                "detachFile": true,
                "detachParent": true,
                "createGanttDependence": true,
                "sort": false
            },
            "archiveLink": "/bitrix/tools/disk/uf.php?entityId=4403&entity=TASKS_TASK&fieldName=UF_TASK_WEBDAV_FILES&signature=332019922b4f031c5ca78974acb2bc735b650581d2b7d8e9a4ca354ca549c12c&action=downloadArchiveByEntity&ncc=1",
            "crmItemIds": [
                "D_9193",
                "C_4575",
                "CO_2985",
                "L_1001345",
                "SI_117"
            ],
            "requireResult": false,
            "checklistAutonumbering": false,
            "matchesSubTasksTime": false,
            "autocompleteSubTasks": false,
            "allowsChangeDatePlan": false,
            "maxDeadlineChangeDate": null,
            "maxDeadlineChanges": null,
            "requireDeadlineChangeReason": false,
            "inFavorite": [],
            "inPin": [],
            "inGroupPin": [],
            "inMute": [],
            "dependsOn": [],
            "scenarios": [
                "default"
            ]
        }
    },
    "time": {
        "start": 1795429088,
        "finish": 1795429089.49397,
        "duration": 1.4939699172973633,
        "processing": 1,
        "date_start": "2026-11-23T13:18:08+03:00",
        "date_finish": "2026-11-23T13:18:09+03:00",
        "operating_reset_at": 1795429680,
        "operating": 0.9652161598205566
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **item**
[`object`](../../data-types.md) | Созданная задача. [Описание полей задачи](../fields-rest-v3.md#taskdto) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**, **404**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Field is not allowed to write",
                "field": "creatorId"
            },
            {
                "message": "Field is not allowed to write",
                "field": "auditors"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `templateId` | Обязательное поле `templateId` не указано | Добавьте `templateId` в тело запроса ||
|| `templateId` | В поле `templateId` требуется тип данных `int` для такого запроса | Передайте идентификатор шаблона числом ||
|| `fields` | Обязательное поле `fields` не указано | Добавьте `fields` в тело запроса. Чтобы создать задачу только по шаблону, передайте `{}` ||
|| Имя поля из `fields` | Field is not allowed to write | Уберите поле из `fields`: его нельзя переопределить. Список допустимых полей — в [описании параметра fields](#fields) ||
|#

#### Ошибки валидации задачи

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не указано название задачи | Передайте непустой `title` или не передавайте поле, чтобы взять название из шаблона ||
|| `-` | `Пользователь указанный в поле &quot;Исполнитель&quot; не найден` | Проверьте `responsibleId` методом [user.get](../../user/user-get.md) ||
|#

#### Неизвестное поле

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Неизвестное поле `foo` для сущности `TaskDto` | Сверьте имена полей с [описанием параметра fields](#fields) ||
|#

#### Шаблон не найден

Код ошибки: `BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_NOTFOUNDEXCEPTION`

HTTP-статус: **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `999999` не найдена | Проверьте идентификатор шаблона методом [tasks.template.list](./tasks-template-list-rest-v3.md). Удаленный шаблон метод тоже не находит ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте право пользователя на просмотр шаблона методом [tasks.template.access.get](./tasks-template-access-get-rest-v3.md). С `withSubTasks: true` нужно право на просмотр каждого дочернего шаблона. Также проверьте, что на портале доступна новая карточка задач ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-template-task-get-rest-v3.md)
- [{#T}](./tasks-template-get-rest-v3.md)
- [{#T}](../tasks-task-get-rest-v3.md)
- [{#T}](../fields-rest-v3.md)
