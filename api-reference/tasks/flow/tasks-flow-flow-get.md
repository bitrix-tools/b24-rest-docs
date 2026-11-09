# Получить поток tasks.flow.Flow.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь, который видит поток, — администратор Битрикс24, участник потока или сотрудник отдела, указанного в потоке. Если ставить задачи в поток могут все пользователи, поток видят все сотрудники

Метод `tasks.flow.Flow.get` возвращает данные потока по его идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **flowId***
[`integer`](../../data-types.md) | Идентификатор потока, данные которого нужно получить.

Идентификатор вернет метод [tasks.flow.Flow.create](./tasks-flow-flow-create.md) при создании потока, а для задачи из потока — метод [tasks.task.get](../tasks-task-get.md) ||
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
        "flowId": 517
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.flow.Flow.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "flowId": 517,
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/tasks.flow.Flow.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type FlowGetResult = {
      id: number,
      creatorId: number,
      ownerId: number,
      groupId: number,
      templateId: number,
      efficiency: number,
      active: boolean,
      plannedCompletionTime: number,
      activity: ISODate | null,
      name: string,
      description: string,
      distributionType: string,
      responsibleList: string[][],
      demo: boolean,
      responsibleCanChangeDeadline: boolean,
      matchWorkTime: boolean,
      matchSchedule: boolean,
      taskControl: boolean,
      notifyAtHalfTime: boolean,
      notifyOnQueueOverflow: number | null,
      notifyOnTasksInProgressOverflow: number | null,
      notifyWhenEfficiencyDecreases: number | null,
      taskCreators: string[][],
      team: string[][],
      trialFeatureEnabled: boolean,
    }

    try {
      const response = await $b24.actions.v2.call.make<FlowGetResult>({
        method: 'tasks.flow.Flow.get',
        params: {
          flowId: 517,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Flow:', result.id, result.name, result.active)
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
      async function getFlow() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.flow.Flow.get',
            params: {
              flowId: 517,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Flow:', result.id, result.name, result.active)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getFlow)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.tasks.flow.flow.get(
            flow_id=517,
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
                'tasks.flow.Flow.get',
                [
                    'flowId' => 517
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
        echo 'Error getting flow: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.flow.Flow.get',
        {
            flowId: 517
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

    $flowId = 517;

    // выполнение запроса к REST API
    $result = CRest::call(
        'tasks.flow.Flow.get',
        [
            'flowId' => $flowId
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
    res, err := client.Core().Call(ctx, "tasks.flow.Flow.get", b24.Params{
    	"flowId": 517,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("tasks.flow.Flow.get: %w", err)
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
        "id": 517,
        "creatorId": 1,
        "ownerId": 1,
        "groupId": 6,
        "templateId": 0,
        "efficiency": 100,
        "active": true,
        "plannedCompletionTime": 7200,
        "activity": "2026-11-06T12:21:47+03:00",
        "name": "AFI flow 517",
        "description": "",
        "distributionType": "manually",
        "responsibleList": [
            [
                "user",
                "1"
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
        "taskCreators": [
            [
                "meta-user",
                "all-users"
            ]
        ],
        "team": [
            [
                "user",
                "129"
            ],
            [
                "user",
                "3"
            ]
        ],
        "trialFeatureEnabled": false
    },
    "time": {
        "start": 1793958310,
        "finish": 1793958310.539899,
        "duration": 0.5398991107940674,
        "processing": 0,
        "date_start": "2026-11-06T12:45:10+03:00",
        "date_finish": "2026-11-06T12:45:10+03:00"
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
[`integer`](../../data-types.md) | Идентификатор потока ||
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
[`array`](../../data-types.md) | Кто может ставить задачи в поток. Каждый элемент — пара «тип — идентификатор», например `["user", "3"]` или `["department", "17:F"]`. Пара `["meta-user", "all-users"]` означает, что задачи могут ставить все пользователи ||
|| **team**
[`array`](../../data-types.md) | Команда потока.

Для ручного распределения это все участники группы, к которой привязан поток, кроме модератора.

Для распределения по очереди и самостоятельного распределения команда та же, что и в `responsibleList`.

Элементы — пары «тип — идентификатор», как в `taskCreators` ||
|| **trialFeatureEnabled**
[`boolean`](../../data-types.md) | Включен ли демонстрационный период для потока. Системный параметр ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Поток с таким ID не существует"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {flowId} | Не передан обязательный параметр `flowId` ||
|| `400` | `0` | Доступ запрещен или поток не найден | У пользователя нет доступа к потоку или потока с таким `flowId` нет ||
|| `400` | `0` | Поток с таким ID не существует | Потока с таким `flowId` нет. Эту ошибку получает администратор Битрикс24, другие пользователи — ошибку доступа ||
|| `400` | `0` | Неизвестная ошибка [Flow: 121] | Внутренняя ошибка. Число в скобках — место в коде, где произошла ошибка, оно поможет поддержке найти причину ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./tasks-flow-flow-create.md)
- [{#T}](./tasks-flow-flow-update.md)
- [{#T}](./tasks-flow-flow-delete.md)
- [{#T}](./tasks-flow-flow-is-exists.md)
- [{#T}](./tasks-flow-flow-activate.md)
- [{#T}](./tasks-flow-flow-pin.md)
