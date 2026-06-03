# Получить поток tasks.flow.Flow.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: команда потока; пользователь, который может ставить задачи в поток

Метод `tasks.flow.Flow.get` возвращает данные потока по его идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **flowId*** [`integer`](../../data-types.md) | Идентификатор потока, данные которого нужно получить. 

Получить идентификатор можно методом создания нового потока [tasks.flow.Flow.create](./tasks-flow-flow-create.md) или методом получения задачи [tasks.task.get](../tasks-task-get.md) для задачи из потока ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "flowId": 517
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.flow.Flow.get
    ```

- cURL (oAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
    -d '{
        "flowId": 517
    }' \
    https://your-domain.bitrix24.com/rest/tasks.flow.Flow.get
    ```

- TS

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

- UMD

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

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "id": 517,
        "creatorId": 1,
        "ownerId": 1,
        "groupId": 178,
        "templateId": 0,
        "efficiency": 0,
        "active": true,
        "plannedCompletionTime": 7200,
        "activity": "2024-09-02T15:27:29+00:00",
        "name": "Updated Flow Name",
        "description": "Updated description",
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
        "taskControl": false,
        "notifyAtHalfTime": false,
        "notifyOnQueueOverflow": 10,
        "notifyOnTasksInProgressOverflow": 50,
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
                "3"
            ]
        ],
        "trialFeatureEnabled": false
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result** 
[`object`](../../data-types.md) | Объект с данными потока ||
|| **id** 
[`integer`](../../data-types.md) | Идентификатор потока ||
|| **creatorId** 
[`integer`](../../data-types.md) | Идентификатор создателя потока. Только для чтения ||
|| **ownerId** 
[`integer`](../../data-types.md) | Идентификатор администратора потока ||
|| **groupId** 
[`integer`](../../data-types.md) | Идентификатор группы, к которой привязан поток ||
|| **templateId** 
[`integer`](../../data-types.md) | Идентификатор шаблона, по которому создаются задачи в потоке ||
|| **efficiency** 
[`integer`](../../data-types.md) | Эффективность потока в процентах. Только для чтения ||
|| **active** 
[`boolean`](../../data-types.md) | Статус активности потока ||
|| **plannedCompletionTime** 
[`integer`](../../data-types.md) | Планируемое время выполнения задачи в секундах ||
|| **activity** 
[`string`](../../data-types.md) | Дата и время последней активности в потоке. Только для чтения ||
|| **name** 
[`string`](../../data-types.md) | Название потока ||
|| **description** 
[`string`](../../data-types.md) | Описание потока ||
|| **distributionType** 
[`string`](../../data-types.md) | Тип распределения задач в потоке ||
|| **responsibleList**
[`array`](../../data-types.md) | Список ответственных за задачи в потоке. Для ручного распределения это модератор потока ||
|| **demo** 
[`boolean`](../../data-types.md) | Является ли поток демонстрационным. Системный параметр. Только для чтения ||
|| **responsibleCanChangeDeadline** 
[`boolean`](../../data-types.md) | Может ли ответственный менять дедлайн задачи ||
|| **matchWorkTime** 
[`boolean`](../../data-types.md) | Пропускать ли выходные и праздничные дни при расчете крайнего срока задачи ||
|| **taskControl** 
[`boolean`](../../data-types.md) | Отправлять ли выполненную задачу постановщику для проверки ||
|| **notifyAtHalfTime** 
[`boolean`](../../data-types.md) | Уведомлять ли исполнителя на половине срока задачи ||
|| **notifyOnQueueOverflow** 
[`integer`](../../data-types.md) | Количество задач в очереди, при превышении которого будет отправлено уведомление администратору потока (если `null`, то уведомления выключены) ||
|| **notifyOnTasksInProgressOverflow** 
[`integer`](../../data-types.md) | Количество задач в работе, при превышении которого будет отправлено уведомление администратору потока (если `null`, то уведомления выключены) ||
|| **notifyWhenEfficiencyDecreases** 
[`integer`](../../data-types.md) | Эффективность в процентах, при снижении до которой будет отправлено уведомление администратору потока (если `null`, то уведомления выключены) ||
|| **taskCreators** 
[`object`](../../data-types.md) | Список пользователей, которые могут добавлять задачи в поток в формате `{"<тип-объекта>": "<идентификатор-объекта>"}`. Например, `[{"user": 3}, {"department": "17:F"}]`.

Элемент `{"meta-user": "all-users"}` означает, что задачи могут добавлять все пользователи ||
|| **team**
[`object`](../../data-types.md) | Команда потока.

Для ручного распределения это все участники проекта, к которому привязан поток, кроме модератора. 

Для распределения по очереди и самостоятельного распределения команда та же, что и в `responsibleList` ||
|| **trialFeatureEnabled** 
[`boolean`](../../data-types.md) | Включен ли демонстрационный период для потока. Системный параметр. Только для чтения ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Flow not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Дополнительная информация** ||
|| `0` | Доступ запрещен или поток не найден | Тариф портала не позволяет работать с потоками или у пользователя нет прав на получение данных потока ||
|| `0` | `Unknown error` | Неизвестная ошибка ||
|| `0` | `Flow not found` | Поток не найден ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-flow-flow-create.md)
- [{#T}](./tasks-flow-flow-update.md)
- [{#T}](./tasks-flow-flow-delete.md)
- [{#T}](./tasks-flow-flow-is-exists.md)
- [{#T}](./tasks-flow-flow-activate.md)
- [{#T}](./tasks-flow-flow-pin.md)
