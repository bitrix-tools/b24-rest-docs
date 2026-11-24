# Добавить шаблон задачи v 3.0 tasks.template.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `tasks.template.add` создает шаблон задачи и возвращает его в сохраненном виде.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Поля шаблона [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

В таблице — основные поля. Полный список изменяемых полей описан в таблице [Объект шаблона](./fields-rest-v3.md#templatedto).

#|
|| **Название**
`тип` | **Описание** ||
|| **title***
[`string`](../../data-types.md) | Название шаблона и задачи, созданной по нему ||
|| **creatorId***
[`integer`](../../data-types.md) | Идентификатор постановщика. Пользователь без прав администратора указывает свой идентификатор, другого постановщика может назначить только администратор.

Идентификатор пользователя можно получить методом [user.get](../../user/user-get.md) ||
|| **responsibleId***
[`integer`](../../data-types.md) | Идентификатор исполнителя. Обязателен, если не передан `responsibleCollection` ||
|| **responsibleCollection**
[`array`](../../data-types.md) | Список исполнителей, например `[{"id": 1269}, {"id": 29}]`. Если передан, `responsibleId` не учитывается ||
|| **description**
[`string`](../../data-types.md) | Описание в формате BB-кода ||
|| **accomplices**
[`array`](../../data-types.md) | Соисполнители, например `[{"id": 29}]` ||
|| **auditors**
[`array`](../../data-types.md) | Наблюдатели, например `[{"id": 1}]` ||
|| **groupId**
[`integer`](../../data-types.md) | Идентификатор проекта. Можно получить методом [sonet_group.get](../../sonet-group/sonet-group-get.md) ||
|| **priority**
[`string`](../../data-types.md) | Приоритет. Возможные значения:
- `low` — низкий
- `average` — средний
- `high` — высокий

По умолчанию `average` ||
|| **tParamType**
[`string`](../../data-types.md) | Тип шаблона. Возможные значения:
- `usual` — обычный шаблон
- `new_users` — шаблон для нового сотрудника

По умолчанию `usual`. После создания тип не меняется ||
|| **deadlineAfterTs**
[`integer`](../../data-types.md) | Через сколько секунд после создания задачи наступит ее крайний срок, например `86400` — через сутки ||
|| **tags**
[`array`](../../data-types.md) | Теги, например `[{"name": "отчет"}]`. Учитывается только поле `name` ||
|| **dependsOn**
[`array`](../../data-types.md) | Идентификаторы задач, от которых зависит созданная задача. Не больше 50, пользователь должен иметь доступ на чтение каждой задачи ||
|| **replicate**
[`boolean`](../../data-types.md) | Создавать задачи по расписанию. Возможные значения:
- `true` — повторять
- `false` — не повторять

По умолчанию `false`. Для `true` передайте `replicateParams` ||
|| **replicateParams**
[`object`](./fields-rest-v3.md#replicate-params) | Расписание повторения. Обязательные параметры — `period` и `time`. [Описание параметров повторения](./fields-rest-v3.md#replicate-params) ||
|| **permissions**
[`array`](./fields-rest-v3.md#permissions) | Права доступа к шаблону, например `[{"accessCode": "U29", "permission": "read_only"}]`. Постановщик получает право `full` автоматически. [Описание прав доступа](./fields-rest-v3.md#permissions) ||
|#

{% note warning "" %}

Значения `priority` и `tParamType` вне списка метод не отклоняет, а сохраняет как `average` и `usual`. Проверьте значения перед вызовом.

{% endnote %}

Поля с пометкой «только для чтения» в [объекте шаблона](./fields-rest-v3.md#templatedto), например `id`, `status`, `stageId`, `xmlId`, `addInReport`, `checklist`, передавать нельзя: метод вернет ошибку «Поле не доступно к заполнению». Пункты чек-листа добавляйте методами [tasks.template.checklist.*](./checklist/tasks-template-checklist-get-rest-v3.md).

Для повторяющегося шаблона постановщик должен иметь право назначать задачи исполнителям и соисполнителям и создавать задачи в проекте из `groupId`.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.template.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"title":"Еженедельный отчет по продажам","description":"Собрать данные о продажах за неделю","creatorId":1269,"responsibleId":1269,"auditors":[{"id":1}],"priority":"high","deadlineAfterTs":86400,"tags":[{"name":"отчет"}],"replicate":true,"replicateParams":{"period":"weekly","everyWeek":"1","weekDays":[5],"time":"10:00","repeatTill":"endless"}}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"title":"Еженедельный отчет по продажам","description":"Собрать данные о продажах за неделю","creatorId":1269,"responsibleId":1269,"auditors":[{"id":1}],"priority":"high","deadlineAfterTs":86400,"tags":[{"name":"отчет"}],"replicate":true,"replicateParams":{"period":"weekly","everyWeek":"1","weekDays":[5],"time":"10:00","repeatTill":"endless"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.template.add
    ```

- JS (TS)

    Методы шаблонов задач REST 3.0 пока не входят в список методов, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TemplateAddResult = {
      item: {
        id: number
        title: string
        creatorId: number
        responsibleId: number
        priority: 'low' | 'average' | 'high'
        replicate: boolean
        replicateParams?: Record<string, string | number | number[]>
        tags: Array<{ id: number, name: string, ownerId: number }>
        permissions: Array<{ id: number, accessCode: string, permission: 'read_only' | 'full' }>
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<TemplateAddResult>(
        'tasks.template.add',
        {
          fields: {
            title: 'Еженедельный отчет по продажам',
            description: 'Собрать данные о продажах за неделю',
            creatorId: 1269,
            responsibleId: 1269,
            auditors: [{ id: 1 }],
            priority: 'high',
            deadlineAfterTs: 86400,
            tags: [{ name: 'отчет' }],
            replicate: true,
            replicateParams: {
              period: 'weekly',
              everyWeek: '1',
              weekDays: [5],
              time: '10:00',
              repeatTill: 'endless',
            },
          },
        },
        Text.getUuidRfc4122()
      )

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created template:', result.item.id)
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
      async function addTemplate() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'tasks.template.add',
            {
              fields: {
                title: 'Еженедельный отчет по продажам',
                description: 'Собрать данные о продажах за неделю',
                creatorId: 1269,
                responsibleId: 1269,
                auditors: [{ id: 1 }],
                priority: 'high',
                deadlineAfterTs: 86400,
                tags: [{ name: 'отчет' }],
                replicate: true,
                replicateParams: {
                  period: 'weekly',
                  everyWeek: '1',
                  weekDays: [5],
                  time: '10:00',
                  repeatTill: 'endless',
                },
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Created template:', result.item.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addTemplate)
    </script>
    ```

- Python

    Имя метода совпадает с методом прошлой версии `tasks.template.add`, а методы шаблонов REST 3.0 пока не входят в список новой версии в `b24pysdk`: обычный вызов SDK уйдет в предыдущую версию REST. Добавьте метод в список `Config().api_v3_methods` и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "tasks.template.add"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "fields": {
                    "title": "Еженедельный отчет по продажам",
                    "description": "Собрать данные о продажах за неделю",
                    "creatorId": 1269,
                    "responsibleId": 1269,
                    "auditors": [{"id": 1}],
                    "priority": "high",
                    "deadlineAfterTs": 86400,
                    "tags": [{"name": "отчет"}],
                    "replicate": True,
                    "replicateParams": {
                        "period": "weekly",
                        "everyWeek": "1",
                        "weekDays": [5],
                        "time": "10:00",
                        "repeatTill": "endless",
                    },
                },
            },
            prefer_version=3,
        )
        print(response["result"]["item"]["id"])
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
                'tasks.template.add',
                [
                    'fields' => [
                        'title' => 'Еженедельный отчет по продажам',
                        'description' => 'Собрать данные о продажах за неделю',
                        'creatorId' => 1269,
                        'responsibleId' => 1269,
                        'auditors' => [['id' => 1]],
                        'priority' => 'high',
                        'deadlineAfterTs' => 86400,
                        'tags' => [['name' => 'отчет']],
                        'replicate' => true,
                        'replicateParams' => [
                            'period' => 'weekly',
                            'everyWeek' => '1',
                            'weekDays' => [5],
                            'time' => '10:00',
                            'repeatTill' => 'endless',
                        ],
                    ],
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
        'tasks.template.add',
        {
            fields: {
                title: 'Еженедельный отчет по продажам',
                description: 'Собрать данные о продажах за неделю',
                creatorId: 1269,
                responsibleId: 1269,
                auditors: [{ id: 1 }],
                priority: 'high',
                deadlineAfterTs: 86400,
                tags: [{ name: 'отчет' }],
                replicate: true,
                replicateParams: {
                    period: 'weekly',
                    everyWeek: '1',
                    weekDays: [5],
                    time: '10:00',
                    repeatTill: 'endless',
                },
            },
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
        'tasks.template.add',
        [
            'fields' => [
                'title' => 'Еженедельный отчет по продажам',
                'description' => 'Собрать данные о продажах за неделю',
                'creatorId' => 1269,
                'responsibleId' => 1269,
                'auditors' => [['id' => 1]],
                'priority' => 'high',
                'deadlineAfterTs' => 86400,
                'tags' => [['name' => 'отчет']],
                'replicate' => true,
                'replicateParams' => [
                    'period' => 'weekly',
                    'everyWeek' => '1',
                    'weekDays' => [5],
                    'time' => '10:00',
                    'repeatTill' => 'endless',
                ],
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы, базовый адрес клиента содержит /rest/api/
    res, err := client.Core().Call(ctx, "tasks.template.add", b24.Params{
    	"fields": map[string]any{
    		"title":           "Еженедельный отчет по продажам",
    		"description":     "Собрать данные о продажах за неделю",
    		"creatorId":       1269,
    		"responsibleId":   1269,
    		"auditors":        []map[string]int{{"id": 1}},
    		"priority":        "high",
    		"deadlineAfterTs": 86400,
    		"tags":            []map[string]string{{"name": "отчет"}},
    		"replicate":       true,
    		"replicateParams": map[string]any{
    			"period":     "weekly",
    			"everyWeek":  "1",
    			"weekDays":   []int{5},
    			"time":       "10:00",
    			"repeatTill": "endless",
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("tasks.template.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var template struct {
    	ID    int    `json:"id"`
    	Title string `json:"title"`
    }
    if err := json.Unmarshal(raw, &template); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(template.ID, template.Title)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 143,
            "title": "Еженедельный отчет по продажам",
            "description": "Собрать данные о продажах за неделю",
            "descriptionInBbcode": true,
            "creatorId": 1269,
            "responsibleId": 1269,
            "responsibleCollection": [
                {
                    "id": 1269
                }
            ],
            "responsibleLastName": "Иванова",
            "accomplices": [],
            "auditors": [
                {
                    "id": 1
                }
            ],
            "groupId": 0,
            "taskId": 0,
            "stageId": 0,
            "xmlId": "",
            "status": "1",
            "addInReport": false,
            "priority": "high",
            "tParamType": "usual",
            "deadlineAfterTs": 86400,
            "startDatePlanTs": 0,
            "endDatePlanTs": 0,
            "allowsChangeDeadline": false,
            "allowsTimeTracking": false,
            "matchesWorkTime": false,
            "needsControl": false,
            "estimatedTime": 0,
            "multitask": false,
            "siteId": "s1",
            "replicate": true,
            "replicateParams": {
                "period": "weekly",
                "everyDay": "1",
                "workdayOnly": "N",
                "everyWeek": "1",
                "monthlyType": "1",
                "monthlyDayNum": "1",
                "monthlyMonthNum1": "1",
                "monthlyMonthNum2": "1",
                "yearlyType": "1",
                "yearlyDayNum": "1",
                "time": "10:00",
                "timezoneOffset": "0",
                "repeatTill": "endless",
                "weekDays": [
                    5
                ],
                "deadlineOffset": 86400,
                "nextExecutionTime": "11/27/2026 10:00:00 am"
            },
            "tParamReplicationCount": 0,
            "dependsOn": [],
            "crmItemIds": [],
            "checklist": [],
            "tags": [
                {
                    "id": 25,
                    "name": "отчет",
                    "ownerId": 1269
                }
            ],
            "permissions": [
                {
                    "id": 291,
                    "accessCode": "U1269",
                    "permission": "full"
                }
            ]
        }
    },
    "time": {
        "start": 1795429241,
        "finish": 1795429241.855626,
        "duration": 0.855626106262207,
        "processing": 0,
        "date_start": "2026-11-23T13:20:41+03:00",
        "date_finish": "2026-11-23T13:20:41+03:00",
        "operating_reset_at": 1795429800,
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
[`object`](./fields-rest-v3.md#templatedto) | Созданный шаблон со всеми заполненными полями, включая `tags`, `permissions` и `replicateParams`. Поля со значением `null` в ответ не попадают. [Описание полей шаблона](./fields-rest-v3.md#templatedto) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта",
        "validation": [
            {
                "message": "Не заполнено обязательное поле \"title\"",
                "field": "title"
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
|| `fields` | Обязательное поле `fields` не указано | Передайте поля шаблона в объекте `fields` ||
|| `replicate` | В поле `replicate` требуется тип данных `bool` для такого запроса | Передайте `true` или `false`, а не `Y` или `N` ||
|| `permissions.0.permission` | В поле `permissions.0.permission` требуется тип данных `PermissionType` для такого запроса | Передайте `read_only` или `full` ||
|| `permissions.0.accessCode` | В поле `permissions.0.accessCode` требуется тип данных `string` для такого запроса | Передайте код доступа строкой, например `U29` ||
|| `replicateParams.monthlyType` | В поле `replicateParams.monthlyType` требуется тип данных `MonthlyType` для такого запроса | Передайте `1` или `2`. То же правило действует для `yearlyType` ||
|| `dependsOn` | В поле `dependsOn` требуется тип данных `integer` для такого запроса | Передайте массив положительных целых чисел ||
|| `dependsOn` | В поле `dependsOn` требуется тип данных `array` для такого запроса | Передайте не больше 50 идентификаторов задач ||
|#

#### Ошибки валидации полей шаблона

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `title` | Не заполнено обязательное поле "title" | Передайте название шаблона ||
|| `creatorId` | Не заполнено обязательное поле "creatorId" | Передайте идентификатор постановщика ||
|| `-` | Не указан исполнитель | Передайте `responsibleId` или `responsibleCollection` ||
|| `status` | Поле "status" не доступно к заполнению | Уберите из `fields` поля с пометкой «только для чтения» в [объекте шаблона](./fields-rest-v3.md#templatedto) ||
|| `permissions.0.accessCode` | Не заполнено обязательное поле "accessCode" | Передайте `accessCode` в каждом элементе `permissions` ||
|| `TASKS_TEMPLATE_REPLICATION_PARAMS_INVALID` | Не удалось запустить повтор задачи. Проверьте условия повтора и попробуйте снова | Передайте `replicateParams` с параметрами `period` и `time`. Даты `startDate` и `endDate` передайте в формате даты Битрикс24 ||
|#

#### Неизвестное поле

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Неизвестное поле `foo` для сущности `TemplateDto` | Передайте поля из таблицы [Объект шаблона](./fields-rest-v3.md#templatedto) ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Нет права создавать шаблоны, нет доступа на чтение задачи из `dependsOn` или, для повторяющегося шаблона, постановщик не может назначать задачи исполнителю или соисполнителю ||
|#

Код ошибки: `BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_AUTHORASSIGNMENTDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `creatorId` | Назначить другого сотрудника постановщиком шаблона может только администратор вашего Битрикс24 | Укажите в `creatorId` идентификатор текущего пользователя ||
|#

Код ошибки: `BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_PERMISSIONSRESTRICTEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `permissions` | На текущем тарифе нельзя настроить права доступа к шаблону, уберите поле `permissions` из запроса | Уберите `permissions` из `fields` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-template-update-rest-v3.md)
- [{#T}](./tasks-template-get-rest-v3.md)
- [{#T}](./tasks-template-copy-rest-v3.md)
- [{#T}](./fields-rest-v3.md)
- [{#T}](./checklist/tasks-template-checklist-get-rest-v3.md)
- [{#T}](./tasks-template-task-add-rest-v3.md)
- [{#T}](./tasks-template-add.md)
