# Удалить запись о затраченном времени task.elapseditem.delete

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод удаляет запись о затраченном времени.

{% note info %}

Проверить право на удаление можно специальным методом [task.elapseditem.isactionallowed](./task-elapsed-item-is-action-allowed.md)

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TASKID***
[`integer`](../../data-types.md) | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](../tasks-task-add.md) или методом [получения списка задач](../tasks-task-list.md) ||
|| **ITEMID***
[`integer`](../../data-types.md) | Идентификатор записи о затраченном времени.

Его можно получить при [создании новой записи](./task-elapsed-item-add.md) или методом [получения списка записей о затраченном времени](./task-elapsed-item-get-list.md) ||
|#

{% note warning %}

Соблюдать указанный в таблице порядок следования параметров в запросе — обязательно. Иначе запрос выполнится с ошибками.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID" : 691, "ITEMID": 5}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/task.elapseditem.delete
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID" : 691, "ITEMID": 5,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.elapseditem.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.elapseditem.delete',
    		{
    			"TASKID": 691,
    			"ITEMID": 5,
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
                'task.elapseditem.delete',
                [
                    'TASKID' => 691,
                    'ITEMID' => 5,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting elapsed item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.elapseditem.delete',
        {
            "TASKID": 691,
            "ITEMID": 5,
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
        'task.elapseditem.delete',
        [
            'TASKID' => 691,
            'ITEMID' => 5,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

В случае успешного выполнения запроса сервер вернет `result:null`

```json
{
    "result": null,
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
    "error":"ERROR_CORE",
    "error_description":"ACTION_NOT_ALLOWED"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `0x000001` | Задача не найдена ||
|| `0x100002` | Доступ запрещен ||
|| `0x000004` | Действие не разрешено ||
|| `0x000040` | Неизвестная ошибка ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./task-elapsed-item-add.md)
- [{#T}](./task-elapsed-item-update.md)
- [{#T}](./task-elapsed-item-get.md)
- [{#T}](./task-elapsed-item-get-list.md)
- [{#T}](./task-elapsed-item-is-action-allowed.md)
- [{#T}](./task-elapsed-item-get-manifest.md)
