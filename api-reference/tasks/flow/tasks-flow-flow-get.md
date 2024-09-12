# Получить поток tasks.flow.flow.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: команда потока; пользователь, который может ставить задачи в поток

Метод `tasks.flow.flow.get` возвращает данные потока по его идентификатору.

## Параметры метода

#|
|| **Название** `тип` | **Описание** ||
|| **flowId^*^** [`integer`](../../data-types.md) | Идентификатор потока, данные которого нужно получить. Получить flowId можно при помощи метода [tasks.task.get](../tasks-task-get.md) для задачи, уже добавленной в поток, либо создать новый поток при помощи метода [tasks.flow.flow.create](./tasks-flow-flow-create.md) ||
|#

## Примеры кода

{% list tabs %}

- JS
    ```js
    BX24.callMethod(
        'tasks.flow.flow.get',
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

- cURL (oAuth)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
    -d '{
        "flowId": 517
    }' \
    https://your-domain.bitrix24.com/rest/tasks.flow.flow.get
    ```

- cURL (Webhook)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "flowId": 517
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.flow.flow.get
    ```

- PHP
    ```php
    require_once('crest.php'); // подключение CRest PHP SDK

    $flowId = 517;

    // выполнение запроса к REST API
    $result = CRest::call(
        'tasks.flow.flow.get',
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
    "efficiency": 100,
    "active": true,
    "plannedCompletionTime": 7200,
    "activity": "2024-08-22T12:17:48+00:00",
    "name": "Flow Name",
    "description": "Flow description",
    "distributionType": "manually",
    "responsibleQueue": [],
    "demo": false,
    "manualDistributorId": 3,
    "responsibleCanChangeDeadline": true,
    "matchWorkTime": true,
    "taskControl": false,
    "notifyAtHalfTime": false,
    "notifyOnQueueOverflow": null,
    "notifyOnTasksInProgressOverflow": 50,
    "notifyWhenEfficiencyDecreases": null,
    "taskCreators": [{"meta-user":  "all-users"}],
    "taskAssignees": [],
    "trialFeatureEnabled": false
}
}
```

### Возвращаемые данные

#|
|| **Название** `тип` | **Описание** ||
|| **result** [`object`](../../data-types.md) | Объект с данными потока ||
|| **id** [`integer`](../../data-types.md) | Идентификатор потока ||
|| **creatorId** [`integer`](../../data-types.md) | Идентификатор создателя потока. Только для чтения ||
|| **ownerId** [`integer`](../../data-types.md) | Идентификатор администратора потока ||
|| **groupId** [`integer`](../../data-types.md) | Идентификатор группы, к которой привязан поток ||
|| **templateId** [`integer`](../../data-types.md) | Идентификатор шаблона, по которому создаются задачи в потоке ||
|| **efficiency** [`integer`](../../data-types.md) | Эффективность потока в процентах. Только для чтения ||
|| **active** [`boolean`](../../data-types.md) | Статус активности потока ||
|| **plannedCompletionTime** [`integer`](../../data-types.md) | Планируемое время выполнения задачи в секундах ||
|| **activity** [`string`](../../data-types.md) | Дата и время последней активности в потоке. Только для чтения ||
|| **name** [`string`](../../data-types.md) | Название потока ||
|| **description** [`string`](../../data-types.md) | Описание потока ||
|| **distributionType** [`string`](../../data-types.md) | Тип распределения задач в потоке ||
|| **responsibleQueue** [`array`](../../data-types.md) | Команда потока, если тип распределения - очередь. Пустой при ручном распределении ||
|| **manualDistributorId** [`integer`](../../data-types.md) | Идентификатор модератора потока при ручном распределении (`null` при распределении по очереди) ||
|| **demo** [`boolean`](../../data-types.md) | Является ли поток демонстрационным. Системный параметр. Только для чтения ||
|| **responsibleCanChangeDeadline** [`boolean`](../../data-types.md) | Может ли ответственный менять дедлайн задачи ||
|| **matchWorkTime** [`boolean`](../../data-types.md) | Пропускать ли выходные и праздничные дни при расчете крайнего срока задачи ||
|| **taskControl** [`boolean`](../../data-types.md) | Отправлять ли выполненную задачу постановщику для проверки ||
|| **notifyAtHalfTime** [`boolean`](../../data-types.md) | Уведомлять ли исполнителя на половине срока задачи ||
|| **notifyOnQueueOverflow** [`integer`](../../data-types.md) | Количество задач в очереди, при превышении которого будет отправлено уведомление администратору потока (если `null`, то уведомления выключены) ||
|| **notifyOnTasksInProgressOverflow** [`integer`](../../data-types.md) | Количество задач в работе, при превышении которого будет отправлено уведомление администратору потока (если `null`, то уведомления выключены) ||
|| **notifyWhenEfficiencyDecreases** [`integer`](../../data-types.md) | Эффективность в процентах, при снижении до которой будет отправлено уведомление администратору потока (если `null`, то уведомления выключены) ||
|| **taskCreators** [`object`](../../data-types.md) | Список пользователей, которые могут добавлять задачи в поток в формате {"<тип-сущности>": "<идентификатор-сущности>"}, например `[{"user": 3}, {"department": "17:F"}]`. Элемент `{"meta-user": "all-users"}` означает, что задачи могут добавлять все пользователи ||
|| **taskAssignees** [`object`](../../data-types.md) | Участники проекта, к которому привязан поток, если тип распределения - ручной ||
|| **trialFeatureEnabled** [`boolean`](../../data-types.md) | Включен ли демонстрационный период для потока. Системный параметр. Только для чтения ||
|#

## Обработка ошибок

HTTP-статус: **200**

```json
{
    "error": "0",
    "error_description": "Flow not found"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Дополнительная информация** ||
|| `0` | Доступ запрещён или поток не найден | Возможно, тариф портала не позволяет работать с потоками, или у пользователя нет прав на получение данных потока ||
|| `0` | Unknown error | Неизвестная ошибка ||
|| `0` | Flow not found | Поток не найден ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}
