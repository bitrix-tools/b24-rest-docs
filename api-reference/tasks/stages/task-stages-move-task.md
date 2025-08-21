# Переместить задачу из одной стадии в другую task.stages.movetask

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - любой пользователь для стадий «Моего плана»
> - любой пользователь с доступом к группе для стадий канбана

Метод перемещает задачу из одной стадии в другую и позволяет изменить положение задачи в рамках канбана группы или «Моего плана».

Метод работает следующим образом:
- Если передана стадия группы, перемещение происходит в рамках канбана группы
- Если передана стадия «Моего плана», перемещение происходит в нем

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор задачи ||
|| **stageId***
[`integer`](../../data-types.md) | `ID` стадии, в которую надо переместить задачу ||
|| **before**
[`integer`](../../data-types.md) | `ID` задачи, перед которой надо поставить задачу в стадии ||
|| **after**
[`integer`](../../data-types.md) | `ID` задачи, после которой надо поставить задачу в стадии ||
|#

{% note info %}

Параметры `before` и `after` — взаимоисключающие. Указывается или тот, или другой параметр.

Если оба параметры не заполнены, задача добавляется в колонку стадии согласно настройкам проекта или «Моего плана».

{% endnote %}

## Примеры кода

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "id": 1,
    "stageId": 2,
    "before": 3,
    "after": 4
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/task.stages.movetask
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: YOUR_ACCESS_TOKEN" \
    -d '{
    "id": 1,
    "stageId": 2,
    "before": 3,
    "after": 4
    }' \
    https://your-domain.bitrix24.com/rest/task.stages.movetask
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.stages.movetask',
    		{
    			id: taskId,
    			stageId: stageId,
    			before: 3,
    			after: 4
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.stages.movetask',
                [
                    'id'     => $taskId,
                    'stageId' => $stageId,
                    'before' => 3,
                    'after'  => 4
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
        echo 'Error moving task stage: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    const taskId = 1;
    const stageId = 2;
    BX24.callMethod(
        'task.stages.movetask',
        {
            id: taskId,
            stageId: stageId,
            before: 3,
            after: 4
        },
        function(res)
        {
            console.log(res);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php'); // подключение CRest PHP SDK

    $taskId = 1;
    $stageId = 2;

    // выполнение запроса к REST API
    $result = CRest::call(
        'task.stages.movetask',
        [
            'id' => $taskId,
            'stageId' => $stageId,
            'before' => 3,
            'after' => 4
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

HTTP-Статус: **200**

```json
{
    "result": true
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result** 
[`boolean`](../../data-types.md) | Возвращает `true` в случае успешного перемещения стадии
||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED_MOVE",
    "error_description": "Вы не можете перемещать эту задачу"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED_MOVE` | Вы не можете перемещать эту задачу ||
|| `TASK_NOT_FOUND` | Задача не найдена или доступ к ней запрещен ||
|| `NOT_FOUND` | Стадия не найдена ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./task-stages-add.md)
- [{#T}](./task-stages-update.md)
- [{#T}](./task-stages-get.md)
- [{#T}](./task-stages-can-move-task.md)
- [{#T}](./task-stages-delete.md)