# Создать поток tasks.flow.Flow.create

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор Битрикс24 или пользователь с правом создавать потоки. Экстранет-пользователи создавать потоки не могут

Метод `tasks.flow.Flow.create` создает поток.

Поток всегда привязан к группе. Если не передать `groupId`, будет создана новая группа. В нее войдут создатель, администратор и команда потока.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **flowData***
[`object`](../../data-types.md) | Значения полей для создания потока [(подробное описание)](#flowdata) ||
|#

### Параметр flowData {#flowdata}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Название потока, от 1 до 255 символов. Должно быть уникальным в Битрикс24.

Проверить название можно методом [tasks.flow.Flow.isExists](./tasks-flow-flow-is-exists.md) ||
|| **description**
[`string`](../../data-types.md) | Описание потока ||
|| **groupId**
[`integer`](../../data-types.md) | Идентификатор группы, к которой будет привязан поток.

Если не указать, метод создаст новую группу с названием потока. Если группа с таким названием уже есть, метод вернет ошибку `ERROR_GROUP_NAME_EXISTS` ||
|| **ownerId**
[`integer`](../../data-types.md) | Идентификатор администратора потока.

Если не указать, администратором будет создатель потока ||
|| **templateId**
[`integer`](../../data-types.md) | Идентификатор шаблона, по которому пользователи будут добавлять задачи в поток ||
|| **plannedCompletionTime***
[`integer`](../../data-types.md) | Сколько секунд дается на выполнение задачи, не меньше `3600` — одного часа. От этого времени поток считает крайний срок задачи ||
|| **distributionType***
[`string`](../../data-types.md) | Тип распределения:
- `manually` — ручное распределение
- `queue` — распределение по очереди
- `himself` — самостоятельное распределение

Подробнее о типах распределения — в статье [{#T}](./index.md) ||
|| **responsibleList***
[`array`](../../data-types.md) | Сотрудники или отделы, которые получат задачи. Каждый элемент — пара «тип — идентификатор».

Для ручного распределения укажите одну пару с модератором потока, например `["user", "1"]`.

Для самостоятельного распределения или распределения по очереди укажите сотрудников или отделы. Например:

```js
[
    [
        'department','3'
    ],
    [
        'department','17:F'
    ]
]
```

Отдел без суффикса `:F` система возьмет вместе со всеми подотделами по структуре компании. С суффиксом `:F` — только сам отдел ||
|| **taskCreators**
[`array`](../../data-types.md) | Кто может ставить задачи в поток: пользователи или отделы. Каждый элемент — пара `["<тип-объекта>", "<идентификатор-объекта>"]`, например:

```js
[
    [
        'user','3'
    ],
    [
        'department','17:F'
    ]
]
```

Отдел без суффикса `:F` система возьмет вместе со всеми подотделами по структуре компании. С суффиксом `:F` — только сам отдел

Чтобы задачи могли добавлять все пользователи, передайте пару `["meta-user", "all-users"]` ||
|| **matchWorkTime**
[`integer`](../../data-types.md) | Пропускать выходные и праздничные дни для расчета крайнего срока задачи.

Принимает значения `0` и `1`. По умолчанию — `1` ||
|| **matchSchedule**
[`integer`](../../data-types.md) | Считать срок выполнения задачи только в рабочие часы по графику работы.

Принимает значения `0` и `1`. По умолчанию — `0` ||
|| **responsibleCanChangeDeadline**
[`integer`](../../data-types.md) | Может ли ответственный менять крайний срок задачи.

Принимает значения `0` и `1`. По умолчанию — `1` ||
|| **notifyAtHalfTime**
[`integer`](../../data-types.md) | Уведомлять исполнителя на половине срока задачи.

Принимает значения `0` и `1`. По умолчанию — `0` ||
|| **taskControl**
[`integer`](../../data-types.md) | Отправлять выполненную задачу постановщику для проверки.

Принимает значения `0` и `1`. По умолчанию — `0` ||
|| **notifyOnQueueOverflow**
[`integer`](../../data-types.md) | Количество задач в очереди, при превышении которого администратор потока получит уведомление.

По умолчанию — `null`, уведомления нет ||
|| **notifyOnTasksInProgressOverflow**
[`integer`](../../data-types.md) | Количество задач в работе, при превышении которого администратор потока получит уведомление.

По умолчанию — `null`, уведомления нет ||
|| **notifyWhenEfficiencyDecreases**
[`integer`](../../data-types.md) | Эффективность в процентах, при снижении ниже которой администратор потока получит уведомление.

По умолчанию — `null`, уведомления нет ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "flowData": {
            "name": "Unique Flow Name",
            "description": "Описание потока",
            "plannedCompletionTime": 7200,
            "distributionType": "manually",
            "responsibleList": [["user","3"]],
            "taskCreators": [["meta-user","all-users"]],
            "matchWorkTime": 1,
            "notifyAtHalfTime": 0
        }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.flow.Flow.create
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "flowData": {
            "name": "Unique Flow Name",
            "description": "Описание потока",
            "plannedCompletionTime": 7200,
            "distributionType": "manually",
            "responsibleList": [["user","3"]],
            "taskCreators": [["meta-user","all-users"]],
            "matchWorkTime": 1,
            "notifyAtHalfTime": 0
        },
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/tasks.flow.Flow.create
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type FlowCreateResult = {
      id: number
      creatorId: number
      ownerId: number
      groupId: number
      templateId: number
      efficiency: number
      active: boolean
      plannedCompletionTime: number
      activity: ISODate
      name: string
      description: string
      distributionType: string
      responsibleList: string[][]
      demo: boolean
      responsibleCanChangeDeadline: boolean
      matchWorkTime: boolean
      matchSchedule: boolean
      taskControl: boolean
      notifyAtHalfTime: boolean
      notifyOnQueueOverflow: number | null
      notifyOnTasksInProgressOverflow: number | null
      notifyWhenEfficiencyDecreases: number | null
      taskCreators: string[][]
      team: string[][]
      trialFeatureEnabled: boolean
    }

    try {
      const response = await $b24.actions.v2.call.make<FlowCreateResult>({
        method: 'tasks.flow.Flow.create',
        params: {
          flowData: {
            name: 'Unique Flow Name',
            description: 'Описание потока',
            plannedCompletionTime: 7200,
            distributionType: 'manually',
            responsibleList: [['user', '3']],
            taskCreators: [['meta-user', 'all-users']],
            matchWorkTime: 1,
            notifyAtHalfTime: 0,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created flow:', result.id, result.name, result.active)
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
      async function createFlow() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.flow.Flow.create',
            params: {
              flowData: {
                name: 'Unique Flow Name',
                description: 'Описание потока',
                plannedCompletionTime: 7200,
                distributionType: 'manually',
                responsibleList: [['user', '3']],
                taskCreators: [['meta-user', 'all-users']],
                matchWorkTime: 1,
                notifyAtHalfTime: 0,
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
          console.info('Created flow:', result.id, result.name, result.active)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', createFlow)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    flow_data = {
        "name": "Unique Flow Name",
        "description": "Описание потока",
        "plannedCompletionTime": 7200,
        "distributionType": "manually",
        "responsibleList": [
            [
                "user",
                "3",
            ],
        ],
        "taskCreators": [
            [
                "meta-user",
                "all-users",
            ],
        ],
        "matchWorkTime": 1,
        "notifyAtHalfTime": 0,
    }

    try:
        bitrix_response = client.tasks.flow.flow.create(
            flow_data=flow_data,
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
                'tasks.flow.Flow.create',
                [
                    'flowData' => [
                        'name'                  => 'Unique Flow Name',
                        'description'           => 'Описание потока',
                        'plannedCompletionTime' => 7200,
                        'distributionType'      => 'manually',
                        'responsibleList'       => [
                            ['user', '3']
                        ],
                        'taskCreators'          => [
                            ['meta-user', 'all-users']
                        ],
                        'matchWorkTime'         => 1,
                        'notifyAtHalfTime'      => 0
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error creating flow: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.flow.Flow.create',
        {
            flowData: {
                name: 'Unique Flow Name',
                description: 'Описание потока',
                plannedCompletionTime: 7200,
                distributionType: 'manually',
                responsibleList: [
                    [
                        'user','3'
                    ]
                ],
                taskCreators: [
                    [
                        'meta-user','all-users'
                    ]
                ],
                matchWorkTime: 1,
                notifyAtHalfTime: 0
            }
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
    require_once('crest.php'); // подключение CRest PHP SDK

    $flowData = [
        "name" => "Unique Flow Name",
        "description" => "Описание потока",
        "plannedCompletionTime" => 7200,
        "distributionType" => "manually",
        "responsibleList" => [["user", "3"]],
        "taskCreators" => [["meta-user", "all-users"]],
        "matchWorkTime" => 1,
        "notifyAtHalfTime" => 0
    ];

    // выполнение запроса к REST API
    $result = CRest::call(
        'tasks.flow.Flow.create',
        [
            'flowData' => $flowData
        ]
    );

    // Обработка ответа от Битрикс24
    if ($result['error']) {
        echo 'Error: '.$result['error_description'];
    } else {
        print_r($result['result']);
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "tasks.flow.Flow.create", b24.Params{
    	"flowData": b24.Params{
    		"name":                  "Unique Flow Name",
    		"description":           "Описание потока",
    		"plannedCompletionTime": 7200,
    		"distributionType":      "manually",
    		"responsibleList": []any{
    			[]string{"user", "3"},
    		},
    		"taskCreators": []any{
    			[]string{"meta-user", "all-users"},
    		},
    		"matchWorkTime":    1,
    		"notifyAtHalfTime": 0,
    	},
    })
    if err != nil {
    	return fmt.Errorf("tasks.flow.Flow.create: %w", err)
    }

    var item struct {
    	ID         b24.ID `json:"id"`
    	CreatorID  b24.ID `json:"creatorId"`
    	OwnerID    b24.ID `json:"ownerId"`
    	GroupID    b24.ID `json:"groupId"`
    	TemplateID b24.ID `json:"templateId"`
    	Efficiency int    `json:"efficiency"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.CreatorID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "id": 7,
        "creatorId": 1,
        "ownerId": 1,
        "groupId": 6,
        "templateId": 0,
        "efficiency": 100,
        "active": true,
        "plannedCompletionTime": 7200,
        "activity": "2026-11-06T11:59:13+03:00",
        "name": "Unique Flow Name",
        "description": "Описание потока",
        "distributionType": "manually",
        "responsibleList": [
            [
                "user",
                "3"
            ]
        ],
        "demo": false,
        "responsibleCanChangeDeadline": true,
        "matchWorkTime": true,
        "matchSchedule": false,
        "taskControl": false,
        "notifyAtHalfTime": false,
        "notifyOnQueueOverflow": null,
        "notifyOnTasksInProgressOverflow": null,
        "notifyWhenEfficiencyDecreases": null,
        "taskCreators": [],
        "team": [],
        "trialFeatureEnabled": false
    },
    "time": {
        "start": 1793955553,
        "finish": 1793955554.612625,
        "duration": 1.6126248836517334,
        "processing": 1,
        "date_start": "2026-11-06T11:59:13+03:00",
        "date_finish": "2026-11-06T11:59:14+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными потока [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор созданного потока ||
|| **creatorId**
[`integer`](../../data-types.md) | Идентификатор создателя потока ||
|| **ownerId**
[`integer`](../../data-types.md) | Идентификатор администратора потока ||
|| **groupId**
[`integer`](../../data-types.md) | Идентификатор группы, к которой привязан поток ||
|| **templateId**
[`integer`](../../data-types.md) | Идентификатор шаблона, по которому создаются задачи в потоке ||
|| **efficiency**
[`integer`](../../data-types.md) | Эффективность потока в процентах ||
|| **active**
[`boolean`](../../data-types.md) | Включен ли поток ||
|| **plannedCompletionTime**
[`integer`](../../data-types.md) | Сколько секунд дается на выполнение задачи, не меньше `3600` — одного часа. От этого времени поток считает крайний срок задачи ||
|| **activity**
[`datetime`](../../data-types.md) | Дата и время последней активности в потоке ||
|| **name**
[`string`](../../data-types.md) | Название потока ||
|| **description**
[`string`](../../data-types.md) | Описание потока ||
|| **distributionType**
[`string`](../../data-types.md) | Тип распределения задач в потоке ||
|| **responsibleList**
[`array`](../../data-types.md) | Список ответственных за задачи в потоке, элементы — пары «тип — идентификатор». Для ручного распределения это модератор потока ||
|| **demo**
[`boolean`](../../data-types.md) | Является ли поток демонстрационным. Системный параметр ||
|| **responsibleCanChangeDeadline**
[`boolean`](../../data-types.md) | Может ли ответственный менять крайний срок задачи ||
|| **matchWorkTime**
[`boolean`](../../data-types.md) | Пропускать ли выходные и праздничные дни при расчете крайнего срока задачи ||
|| **matchSchedule**
[`boolean`](../../data-types.md) | Считать ли срок выполнения задачи только в рабочие часы по графику работы ||
|| **taskControl**
[`boolean`](../../data-types.md) | Отправлять ли выполненную задачу постановщику для проверки ||
|| **notifyAtHalfTime**
[`boolean`](../../data-types.md) | Уведомлять ли исполнителя на половине срока задачи ||
|| **notifyOnQueueOverflow**
[`integer`](../../data-types.md) | Количество задач в очереди, при превышении которого администратор потока получит уведомление. `null` — уведомление выключено ||
|| **notifyOnTasksInProgressOverflow**
[`integer`](../../data-types.md) | Количество задач в работе, при превышении которого администратор потока получит уведомление. `null` — уведомление выключено ||
|| **notifyWhenEfficiencyDecreases**
[`integer`](../../data-types.md) | Эффективность в процентах, при снижении ниже которой администратор потока получит уведомление. `null` — уведомление выключено ||
|| **taskCreators**
[`array`](../../data-types.md) | Кто может ставить задачи в поток. Каждый элемент — пара «тип — идентификатор», например `["user", "3"]` или `["department", "17:F"]`. Пара `["meta-user", "all-users"]` означает, что задачи могут ставить все пользователи.

В ответе этого метода поле приходит пустым, даже если постановщики сохранены. Актуальный список вернет метод [tasks.flow.Flow.get](./tasks-flow-flow-get.md) ||
|| **team**
[`array`](../../data-types.md) | Команда потока.

Для ручного распределения это все участники группы, к которой привязан поток, кроме модератора.

Для распределения по очереди и самостоятельного распределения команда та же, что и в `responsibleList`.

Элементы — пары «тип — идентификатор», как в `taskCreators`. В ответе этого метода поле приходит пустым, актуальную команду вернет метод [tasks.flow.Flow.get](./tasks-flow-flow-get.md) ||
|| **trialFeatureEnabled**
[`boolean`](../../data-types.md) | Включен ли демонстрационный период для потока. Системный параметр ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "'responsibleList': field's value must not be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | Доступ запрещен или поток не найден | У пользователя нет права создавать потоки, группы с таким `groupId` нет или у пользователя нет к ней доступа ||
|| `400` | `0` | Property name cannot be null | Не передано обязательное поле. Вместо `name` в тексте будет имя пропущенного поля: `plannedCompletionTime` или `distributionType` ||
|| `400` | `0` | 'name': field's length must be greater than 1 and less than 255 | Название пустое или длиннее 255 символов ||
|| `400` | `0` | 'plannedCompletionTime': field's value must be greater than 3600 | Время выполнения меньше часа: `plannedCompletionTime` меньше `3600` секунд ||
|| `400` | `0` | distributionType: unexpected value | В `distributionType` передано значение не из списка ||
|| `400` | `0` | 'responsibleList': field's value must not be empty | Не передан `responsibleList` или передан пустой массив ||
|| `400` | `0` | Template 99999 doesn't exists | Шаблона с таким `templateId` нет. Вместо `99999` в тексте будет переданный идентификатор ||
|| `400` | `0` | Поток с таким названием уже существует | Поток с таким названием уже есть в Битрикс24. Проверить название заранее можно методом [tasks.flow.Flow.isExists](./tasks-flow-flow-is-exists.md) ||
|| `400` | `ERROR_GROUP_NAME_EXISTS` | Группа с таким названием уже существует | Не передан `groupId`, а группа с названием потока уже есть, поэтому новую создать не удалось. Передайте `groupId` или выберите другое название потока ||
|| `400` | `0` | Неизвестная ошибка [Flow: 198] | Внутренняя ошибка. Число в скобках — место в коде, где произошла ошибка, оно поможет поддержке найти причину ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./tasks-flow-flow-update.md)
- [{#T}](./tasks-flow-flow-get.md)
- [{#T}](./tasks-flow-flow-delete.md)
- [{#T}](./tasks-flow-flow-is-exists.md)
- [{#T}](./tasks-flow-flow-activate.md)
- [{#T}](./tasks-flow-flow-pin.md)
