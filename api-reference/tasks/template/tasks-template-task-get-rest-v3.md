# Получить заготовку задачи по шаблону v 3.0 tasks.template.task.get

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

Метод `tasks.template.task.get` возвращает заготовку задачи, заполненную по шаблону, без создания задачи.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateId***
[`integer`](../../data-types.md) | Идентификатор шаблона задачи.

Идентификатор можно получить методом [tasks.template.add](./tasks-template-add-rest-v3.md) при создании шаблона или методом [tasks.template.list](./tasks-template-list-rest-v3.md) ||
|| **select**
[`string[]`](../../data-types.md) | Поля задачи, которые нужно вернуть. Если параметр не передан, метод возвращает все поля задачи без связанных объектов.

Для связанных объектов используйте путь через точку, например `["responsible.id","responsible.name"]` — в ответе появится объект `responsible` с запрошенными полями. [Описание полей задачи](../fields-rest-v3.md#taskdto) ||
|#

Заготовка показывает, с какими значениями будет создана задача методом [tasks.template.task.add](./tasks-template-task-add-rest-v3.md), если не переопределять поля. У заготовки нет идентификатора: поле `id` всегда равно `null` и приходит в ответе, даже если его нет в `select`.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.template.task.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":125,"select":["title","description","responsibleId","deadline","priority","crmItemIds"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.task.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":125,"select":["title","description","responsibleId","deadline","priority","crmItemIds"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.template.task.get
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
    type TemplateTaskGetResult = {
      item: {
        id: null
        title: string
        description: string
        responsibleId: number
        deadline: ISODate | null
        priority: string
        crmItemIds: string[]
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<TemplateTaskGetResult>(
        'tasks.template.task.get',
        {
          templateId: 125,
          select: ['title', 'description', 'responsibleId', 'deadline', 'priority', 'crmItemIds'],
        },
        Text.getUuidRfc4122()
      )

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Task draft:', result.item.title, result.item.responsibleId)
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
      async function getTaskDraft() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'tasks.template.task.get',
            {
              templateId: 125,
              select: ['title', 'description', 'responsibleId', 'deadline', 'priority', 'crmItemIds'],
            },
            B24Js.Text.getUuidRfc4122()
          )

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Task draft:', result.item.title, result.item.responsibleId)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getTaskDraft)
    </script>
    ```

- Python

    Методы шаблонов задач REST 3.0 пока не входят в список `Config().api_v3_methods`, и без него `b24pysdk` отправит вызов на старый адрес REST. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "tasks.template.task.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "templateId": 125,
                "select": ["title", "description", "responsibleId", "deadline", "priority", "crmItemIds"],
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
                'tasks.template.task.get',
                [
                    'templateId' => 125,
                    'select' => ['title', 'description', 'responsibleId', 'deadline', 'priority', 'crmItemIds'],
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
        'tasks.template.task.get',
        {
            templateId: 125,
            select: ['title', 'description', 'responsibleId', 'deadline', 'priority', 'crmItemIds'],
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
        'tasks.template.task.get',
        [
            'templateId' => 125,
            'select' => ['title', 'description', 'responsibleId', 'deadline', 'priority', 'crmItemIds'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы, базовый адрес клиента содержит /rest/api/
    res, err := client.Core().Call(ctx, "tasks.template.task.get", b24.Params{
    	"templateId": 125,
    	"select":     []string{"title", "description", "responsibleId", "deadline", "priority", "crmItemIds"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("tasks.template.task.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var draft struct {
    	Title         string   `json:"title"`
    	Description   string   `json:"description"`
    	ResponsibleID int      `json:"responsibleId"`
    	Deadline      *string  `json:"deadline"`
    	Priority      string   `json:"priority"`
    	CrmItemIDs    []string `json:"crmItemIds"`
    }
    if err := json.Unmarshal(raw, &draft); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(draft.Title, draft.ResponsibleID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Ответ на запрос из примеров:

```json
{
    "result": {
        "item": {
            "id": null,
            "title": "Еженедельный отчет по продажам",
            "description": "Подготовить отчет по итогам недели",
            "responsibleId": 1269,
            "deadline": null,
            "priority": "average",
            "crmItemIds": [
                "D_9193",
                "C_4575",
                "CO_2985",
                "L_1001345",
                "SI_117"
            ]
        }
    },
    "time": {
        "start": 1795429068,
        "finish": 1795429068.387838,
        "duration": 0.38783788681030273,
        "processing": 0,
        "date_start": "2026-11-23T13:17:48+03:00",
        "date_finish": "2026-11-23T13:17:48+03:00",
        "operating_reset_at": 1795429620,
        "operating": 0
    }
}
```

Без `select` метод возвращает все поля задачи. Поля, которые шаблон не заполняет, равны `null`:

```json
{
    "result": {
        "item": {
            "id": null,
            "title": "Еженедельный отчет по продажам",
            "description": "Подготовить отчет по итогам недели",
            "creatorId": 1269,
            "responsibleId": 1269,
            "deadline": null,
            "needsControl": false,
            "startPlan": null,
            "endPlan": null,
            "fileIds": null,
            "checklist": [],
            "groupId": 0,
            "stageId": 0,
            "epicId": null,
            "storyPoints": null,
            "priority": "average",
            "status": null,
            "statusChanged": null,
            "parentId": null,
            "containsChecklist": false,
            "containsSubTasks": false,
            "containsRelatedTasks": false,
            "containsGanttLinks": null,
            "containsPlacements": null,
            "containsResults": null,
            "numberOfReminders": null,
            "chatId": null,
            "plannedDuration": null,
            "actualDuration": null,
            "durationType": null,
            "started": null,
            "estimatedTime": 0,
            "replicate": false,
            "changed": null,
            "closed": null,
            "activity": null,
            "guid": null,
            "xmlId": null,
            "exchangeId": null,
            "exchangeModified": null,
            "outlookVersion": null,
            "mark": null,
            "allowsChangeDeadline": false,
            "allowsTimeTracking": false,
            "matchesWorkTime": false,
            "addInReport": false,
            "isMultitask": false,
            "siteId": "s1",
            "deadlineCount": null,
            "declineReason": null,
            "forumTopicId": null,
            "link": "/company/personal/user/1269/tasks/templates/template/view/125/",
            "rights": [],
            "archiveLink": "/bitrix/tools/disk/uf.php?entityId=125&entity=TASKS_TASK_TEMPLATE&fieldName=UF_TASK_WEBDAV_FILES&signature=cb2d54fcfcaf585d068040130da2ee67c2c48c0b2173b9c41884237a24a851c1&action=downloadArchiveByEntity&ncc=1",
            "crmItemIds": [
                "D_9193",
                "C_4575",
                "CO_2985",
                "L_1001345",
                "SI_117"
            ],
            "requireResult": null,
            "checklistAutonumbering": null,
            "matchesSubTasksTime": null,
            "autocompleteSubTasks": null,
            "allowsChangeDatePlan": false,
            "maxDeadlineChangeDate": null,
            "maxDeadlineChanges": null,
            "requireDeadlineChangeReason": null,
            "inFavorite": [],
            "inPin": [],
            "inGroupPin": [],
            "inMute": [],
            "dependsOn": [],
            "scenarios": []
        }
    },
    "time": {
        "start": 1795429067,
        "finish": 1795429067.647728,
        "duration": 0.6477279663085938,
        "processing": 0,
        "date_start": "2026-11-23T13:17:47+03:00",
        "date_finish": "2026-11-23T13:17:47+03:00",
        "operating_reset_at": 1795429620,
        "operating": 0
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
[`object`](../../data-types.md) | Заготовка задачи в формате [объекта задачи](../fields-rest-v3.md#taskdto) [(подробное описание)](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

Поля заготовки совпадают с [полями задачи REST 3.0](../fields-rest-v3.md#taskdto). У заготовки есть отличия от созданной задачи:

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Всегда `null`: задача не создана ||
|| **status**
[`string`](../../data-types.md) | Всегда `null`: статус задача получает при создании ||
|| **link**
[`string`](../../data-types.md) | Относительная ссылка на шаблон в интерфейсе Битрикс24, а не на задачу ||
|| **archiveLink**
[`string`](../../data-types.md) | Ссылка на архив файлов шаблона ||
|| **rights**
[`array`](../../data-types.md) | Пустой массив: права на задачу появляются после создания ||
|| **crmItemIds**
[`string[]`](../../data-types.md) | Коды элементов CRM из шаблона, например `D_9193` — сделка, `SI_117` — счет ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**, **404**

```json
{
    "error": {
        "code": "BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_NOTFOUNDEXCEPTION",
        "message": "Запись с ID = `999999` не найдена"
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
|#

#### Неизвестное поле в select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `foo` для сущности `TaskDto` | Сверьте имена полей с [описанием полей задачи](../fields-rest-v3.md#taskdto) ||
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
|| `-` | Доступ запрещен | Проверьте право пользователя на просмотр шаблона методом [tasks.template.access.get](./tasks-template-access-get-rest-v3.md) и что на портале доступна новая карточка задач ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-template-task-add-rest-v3.md)
- [{#T}](./tasks-template-get-rest-v3.md)
- [{#T}](../fields-rest-v3.md)
- [{#T}](./fields-rest-v3.md)
