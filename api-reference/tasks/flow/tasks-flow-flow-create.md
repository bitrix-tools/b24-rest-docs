# Создать новый поток tasks.flow.flow.create

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь, не являющийся экстранетом

Метод `tasks.flow.flow.create` создает поток.

Поток должен привязываться к группе. Если не передать идентификатор группы при создании потока, автоматически будет создана новая группа, участниками которой будут создатель, администратор и команда потока.

## Параметры метода

#|
|| **Название** `тип` | **Описание** ||
|| **flowData^*^**
[`object`](../../data-types.md) | Значения полей (подробное описание приведено ниже) для создания потока ||
|#

## Параметр flowData

#|
|| **Название** `тип` | **Описание** ||
|| **name^*^** [`string`](../../data-types.md) | Название потока. Должно быть уникальным для каждого потока. Для проверки названия можно воспользоваться методом [tasks.flow.flow.isExists](./tasks-flow-flow-is-exists.md) ||
|| **description** [`string`](../../data-types.md) | Описание потока ||
|| **groupId** [`integer`](../../data-types.md) | Идентификатор группы, к которой будет привязан поток. Если не указать - автоматически создается новая группа ||
|| **ownerId** [`integer`](../../data-types.md) | Идентификатор администратора потока. Если не указать, администратором будет создатель потока ||
|| **templateId** [`integer`](../../data-types.md) | Идентификатор шаблона, по которому пользователи будут добавлять задачи в поток ||
|| **plannedCompletionTime^*^** [`integer`](../../data-types.md) | Планируемое время выполнения задачи в секундах ||
|| **distributionType^*^** [`string`](../../data-types.md) | Тип распределения (`manually` для ручного распределения, `queue` для распределения по очереди). Подробнее о типах распределения смотрите [здесь](./index.md)  ||
|| **responsibleQueue** [`array`](../../data-types.md) | Массив идентификаторов сотрудников команды потока в случае с распределением по очереди. В случае с ручным распределением не заполняется ||
|| **manualDistributorId** [`integer`](../../data-types.md) | Идентификатор модератора потока (пользователь, который будет распределять задачи по сотрудникам). В случае с распределением по очереди не заполняется||
|| **taskCreators** [`object`](../../data-types.md) | Список пользователей, которые могут добавлять задачи в поток в формате {"<тип-сущности>": "<идентификатор-сущности>"}, например `[{"user": 3}, {"department": "17:F"}]`. Элемент `{"meta-user": "all-users"}` означает, что задачи могут добавлять все пользователи ||
|| **matchWorkTime** [`integer`](../../data-types.md) | Пропускать выходные и праздничные дни для рассчета крайнего срока задачи. Принимает значения `0` и `1`. По умолчанию - `1` ||
|| **responsibleCanChangeDeadline** [`integer`](../../data-types.md) | Может ли ответственный менять дедлайн задачи. Принимает значения `0` и `1`. По умолчанию - `0`||
|| **notifyAtHalfTime** [`integer`](../../data-types.md) | Уведомлять исполнителя на половине срока задачи. Принимает значения `0` и `1`. По умолчанию - `0`||
|| **taskControl** [`integer`](../../data-types.md) | Отправлять выполненную задачу постановщику для проверки. Принимает значения `0` и `1`. По умолчанию - `0`||
|| **notifyOnQueueOverflow** [`integer`](../../data-types.md) | Уведомлять администратора потока, когда задач в очереди более этого параметра. По умолчанию - `null` (не уведомлять) ||
|| **notifyOnTasksInProgressOverflow** [`integer`](../../data-types.md) | Уведомлять администратора потока, когда задач в очереди больше этого параметра. По умолчанию - `null` (не уведомлять) ||
|| **notifyWhenEfficiencyDecreases** [`integer`](../../data-types.md) | Уведомлять администратора потока, когда эффективность упала ниже этого параметра. По умолчанию - `null` (не уведомлять) ||
|#

## Примеры кода

{% list tabs %}

- JS
    ```js
    BX24.callMethod(
        'tasks.flow.flow.create',
        {
            flowData: {
                name: 'Unique Flow Name2323',
                description: 'Описание потока',
                plannedCompletionTime: 3600,
                distributionType: 'queue',
                responsibleQueue: [1, 2],
                taskCreators: [['meta-user', 'all-users']],
                matchWorkTime: 0,
                notifyAtHalfTime: 1
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

- cURL (oAuth)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
    -d '{
        "flowData": {
            "name": "Unique Flow Name",
            "description": "Описание потока",
            "plannedCompletionTime": 3600,
            "distributionType": "queue",
            "responsibleQueue": [1, 2],
            "taskCreators": [["meta-user", "all-users"]],
            "matchWorkTime": 0,
            "notifyAtHalfTime": 1
        }
    }' \
    https://your-domain.bitrix24.com/rest/tasks.flow.flow.create
    ```

- cURL (Webhook)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "flowData": {
            "name": "Unique Flow Name",
            "description": "Описание потока",
            "plannedCompletionTime": 3600,
            "distributionType": "queue",
            "responsibleQueue": [1, 2],
            "taskCreators": [["meta-user", "all-users"]],
            "matchWorkTime": 0,
            "notifyAtHalfTime": 1
        }
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.flow.flow.create
    ```

- PHP
    ```php
    require_once('crest.php'); // подключение CRest PHP SDK

    $flowData = [
        "name" => "Unique Flow Name",
        "description" => "Описание потока",
        "plannedCompletionTime" => 3600,
        "distributionType" => "queue",
        "responsibleQueue" => [1, 2],
        "taskCreators" => [["meta-user", "all-users"]],
        "matchWorkTime" => 0,
        "notifyAtHalfTime" => 1
    ];

    // выполнение запроса к REST API
    $result = CRest::call(
        'tasks.flow.flow.create',
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
    "plannedCompletionTime": 3600,
    "activity": "2024-08-22T12:17:48+00:00",
    "name": "Unique Flow Name2323",
    "description": "Описание потока",
    "distributionType": "queue",
    "responsibleQueue": [
     1,
     2
    ],
    "demo": false,
    "manualDistributorId": null,
    "responsibleCanChangeDeadline": true,
    "matchWorkTime": false,
    "taskControl": false,
    "notifyAtHalfTime": true,
    "notifyOnQueueOverflow": 10,
    "notifyOnTasksInProgressOverflow": null,
    "notifyWhenEfficiencyDecreases": null,
    "taskCreators": [{"meta-user": "all-users"}],
    "taskAssignees": [],
    "trialFeatureEnabled": false
}
}
```

### Возвращаемые данные

#|
|| **Название** `тип` | **Описание** ||
|| **result** [`object`](../../data-types.md) | Объект с данными потока ||
|| **id** [`integer`](../../data-types.md) | Идентификатор созданного потока ||
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

```json
{
    "error": "0",
    "error_description": "Доступ запрещён или поток не найден"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Дополнительная информация**||
|| `0` | Доступ запрещён или поток не найден | Возможно, тариф портала не позволяет работать с потоками, или у пользователя нет прав на создание потока ||
|| `0` | Unknown error | Неизвестная ошибка ||
|| `0` | 'distributionType': field's value has an invalid value | Некорретное значение distributionType (аналогично с другими параметрами) ||
|| `0` | Поток с таким названием уже существует | ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}