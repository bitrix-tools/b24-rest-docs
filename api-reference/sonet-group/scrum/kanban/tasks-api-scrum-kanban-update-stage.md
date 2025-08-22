# Обновить стадию канбана Скрама tasks.api.scrum.kanban.updateStage

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод изменяет стадию канбана Скрама.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **stageId***
[`integer`](../../../data-types.md) | Идентификатор стадии. Получить идентификатор можно при помощи метода [tasks.api.scrum.kanban.getStages](./tasks-api-scrum-kanban-get-stages.md) ||
|| **fields***
[`object`](../../../data-types.md) | Поля, соответствующие доступному списку полей [tasks.api.scrum.kanban.getFields](./tasks-api-scrum-kanban-get-fields.md) (подробное описание приведено [ниже](#parametr-fields)) ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **sprintId**
[`integer`](../../../data-types.md) | Идентификатор спринта. Получить идентификатор можно при помощи метода [tasks.api.scrum.sprint.list](../sprint/tasks-api-scrum-sprint-list.md) ||
|| **name**
[`string`](../../../data-types.md) | Название стадии канбана ||
|| **type**
[`string`](../../../data-types.md) | Тип стадии канбана. Возможные значения: `NEW`, `WORK`, `FINISH` ||
|| **sort**
[`integer`](../../../data-types.md) | Порядок сортировки. Значение поля должно быть кратно `100` ||
|| **color**
[`string`](../../../data-types.md) | Цвет стадии канбана ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"stageId":65,"fields":{"name":"Обновленная стадия","type":"WORK","color":"00C4FB","sort":100}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.api.scrum.kanban.updateStage
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"stageId":65,"fields":{"name":"Обновленная стадия","type":"WORK","color":"00C4FB","sort":100},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.api.scrum.kanban.updateStage
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'tasks.api.scrum.kanban.updateStage',
    		{
    			"stageId": 65,
    			"fields": {
    				"name": "Обновленная стадия",
    				"type": "WORK",
    				"color": "00C4FB",
    				"sort": 100,
    			},
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
                'tasks.api.scrum.kanban.updateStage',
                [
                    'stageId' => 65,
                    'fields'  => [
                        'name'  => 'Обновленная стадия',
                        'type'  => 'WORK',
                        'color' => '00C4FB',
                        'sort'  => 100,
                    ],
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
        echo 'Error updating stage: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.api.scrum.kanban.updateStage',
        {
            "stageId": 65,
            "fields": {
                "name": "Обновленная стадия",
                "type": "WORK",
                "color": "00C4FB",
                "sort": 100,
            },
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
    require_once('crest.php');

    $result = CRest::call(
        'tasks.api.scrum.kanban.updateStage',
        [
            'stageId' => 65,
            'fields' => [
                'name' => 'Обновленная стадия',
                'type' => 'WORK',
                'sort' => 100,
                'color' => '00C4FB',
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time":{
        "start":1712137817.343984,
        "finish":1712137817.605804,
        "duration":0.26182007789611816,
        "processing":0.018325090408325195,
        "date_start":"2024-04-03T12:50:17+03:00",
        "date_finish":"2024-04-03T12:50:17+03:00"
    }
}
```

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":0,
    "error_description":"Incorrect sprintId value"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | `Stage id not found` | Не заполнено обязательное поле `stageId` ||
|| `0` | `Stage not found` | Передан неизвестный идентификатор стадии `stageId` ||
|| `0` | `Incorrect sprintId value` | Передан неизвестный идентификатор спринта или нет доступа к спринту ||
|| `0` | `Access denied` | Доступ запрещен ||
|| `0` | Неизвестная ошибка | ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./tasks-api-scrum-kanban-add-stage.md)
- [{#T}](./tasks-api-scrum-kanban-add-task.md)
- [{#T}](./tasks-api-scrum-kanban-delete-stage.md)
- [{#T}](./tasks-api-scrum-kanban-delete-task.md)
- [{#T}](./tasks-api-scrum-kanban-get-fields.md)
- [{#T}](./tasks-api-scrum-kanban-get-stages.md)