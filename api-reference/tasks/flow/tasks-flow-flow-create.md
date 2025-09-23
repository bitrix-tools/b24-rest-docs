# Создать новый поток tasks.flow.Flow.create

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь, не являющийся экстранетом

Метод `tasks.flow.Flow.create` создает поток.

Поток должен привязываться к группе. Если не передать идентификатор группы при создании потока, автоматически будет создана новая группа, участниками которой будут создатель, администратор и команда потока.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **flowData***
[`object`](../../data-types.md) | Значения полей для создания потока (подробное описание приведено ниже) ||
|#

### Параметр flowData

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name*** 
[`string`](../../data-types.md) | Название потока. Должно быть уникальным для каждого потока.

Проверить название можно методом [tasks.flow.Flow.isExists](./tasks-flow-flow-is-exists.md) ||
|| **description** 
[`string`](../../data-types.md) | Описание потока ||
|| **groupId** 
[`integer`](../../data-types.md) | Идентификатор группы, к которой будет привязан поток.

Если не указать — автоматически создается новая группа ||
|| **ownerId** 
[`integer`](../../data-types.md) | Идентификатор администратора потока.

Если не указать, администратором будет создатель потока ||
|| **templateId** 
[`integer`](../../data-types.md) | Идентификатор шаблона, по которому пользователи будут добавлять задачи в поток ||
|| **plannedCompletionTime*** 
[`integer`](../../data-types.md) | Планируемое время выполнения задачи в секундах ||
|| **distributionType*** 
[`string`](../../data-types.md) | Тип распределения:
- `manually` — ручное распределение
- `queue` — распределение по очереди
- `himself` — самостоятельное распределение

Подробнее о типах распределения — в статье [{#T}](./index.md) ||
|| **responsibleList*** 
[`object`](../../data-types.md) | Идентификаторы сотрудников, которые получат задачи.

Для ручного распределения укажите идентификатор модератора потока.

Для самостоятельного распределения или распределения по очереди укажите идентификаторы сотрудников или отделы. Например:

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

Если не добавить суффикс `:F`, система выберет все подотделы указанного отдела по структуре компании ||
|| **taskCreators** 
[`object`](../../data-types.md) | Список пользователей, которые могут добавлять задачи в поток в формате `{"<тип-сущности>": "<идентификатор-сущности>"}`. Например

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

Если не добавить суффикс `:F`, система выберет все подотделы указанного отдела по структуре компании

Чтобы задачи могли добавлять все пользователи, укажите значение`{"meta-user": "all-users"}`  ||
|| **matchWorkTime** 
[`integer`](../../data-types.md) | Пропускать выходные и праздничные дни для расчета крайнего срока задачи.

Принимает значения `0` и `1`. По умолчанию — `1` ||
|| **responsibleCanChangeDeadline** 
[`integer`](../../data-types.md) | Может ли ответственный менять дедлайн задачи.

Принимает значения `0` и `1`. По умолчанию — `0` ||
|| **notifyAtHalfTime** 
[`integer`](../../data-types.md) | Уведомлять исполнителя на половине срока задачи.

Принимает значения `0` и `1`. По умолчанию — `0` ||
|| **taskControl** 
[`integer`](../../data-types.md) | Отправлять выполненную задачу постановщику для проверки.

Принимает значения `0` и `1`. По умолчанию — `0` ||
|| **notifyOnQueueOverflow** 
[`integer`](../../data-types.md) | Уведомлять администратора потока, когда задач в очереди более этого параметра.

По умолчанию — `null`, то есть не уведомлять ||
|| **notifyOnTasksInProgressOverflow** 
[`integer`](../../data-types.md) | Уведомлять администратора потока, когда задач в очереди больше этого параметра.

По умолчанию — `null`, то есть не уведомлять ||
|| **notifyWhenEfficiencyDecreases** 
[`integer`](../../data-types.md) | Уведомлять администратора потока, когда эффективность упала ниже этого параметра.

По умолчанию — `null`, то есть не уведомлять ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
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
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.flow.Flow.create
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
            "plannedCompletionTime": 7200,
            "distributionType": "manually",
            "responsibleList": [["user","3"]],
            "taskCreators": [["meta-user","all-users"]],
            "matchWorkTime": 1,
            "notifyAtHalfTime": 0
        }
    }' \
    https://your-domain.bitrix24.com/rest/tasks.flow.Flow.create
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
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
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch( error )
    {
    	console.error(error);
    }
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
[`integer`](../../data-types.md) | Идентификатор созданного потока ||
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
    "error_description": "Доступ запрещен или поток не найден"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Дополнительная информация**||
|| `0` | Доступ запрещен или поток не найден | Тариф портала не позволяет работать с потоками или у пользователя нет прав на создание потока ||
|| `0` | `Unknown error` | Неизвестная ошибка ||
|| `0` | `'distributionType': field's value has an invalid value` | Некорретное значение `distributionType` (аналогично с другими параметрами) ||
|| `0` | Поток с таким названием уже существует | ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-flow-flow-update.md)
- [{#T}](./tasks-flow-flow-get.md)
- [{#T}](./tasks-flow-flow-delete.md)
- [{#T}](./tasks-flow-flow-is-exists.md)
- [{#T}](./tasks-flow-flow-activate.md)
- [{#T}](./tasks-flow-flow-pin.md)
