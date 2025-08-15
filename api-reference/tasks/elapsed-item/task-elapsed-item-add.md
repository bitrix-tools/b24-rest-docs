# Добавить запись о затраченном времени task.elapseditem.add

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод добавляет затраченное время к задаче. Возвращает идентификатор добавленной записи.

{% note info %}

Проверить право на добавление можно специальным методом [task.elapseditem.isactionallowed](./task-elapsed-item-is-action-allowed.md)

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TASKID***
[`integer`](../../data-types.md) | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](../tasks-task-add.md) или методом [получения списка задач](../tasks-task-list.md) ||
|| **ARFIELDS***
[`object`](../../data-types.md) | Объект, содержащий записи о пользователе, времени и комментарии (подробное описание приведено ниже) в виде структуры: 

```js
"ARFIELDS": {
    "SECONDS": "значение", 
    "COMMENT_TEXT": "значение",
    "USER_ID": "значение"
},
```

||
|#

### Параметр ARFIELDS

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **SECONDS***
[`integer`](../../data-types.md) | Количество затраченного времени в секундах ||
|| **COMMENT_TEXT***
[`string`](../../data-types.md) | Текст комментария ||
|| **USER_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|#

{% note warning %}

Соблюдать указанный в таблицах порядок следования параметров в запросе — обязательно. Иначе запрос выполнится с ошибками.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID" : 691, "ARFIELDS": {"SECONDS": 113,"COMMENT_TEXT": "текст комментария"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/task.elapseditem.add
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID" : 691, "ARFIELDS": {"SECONDS": 113,"COMMENT_TEXT": "текст комментария"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.elapseditem.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.elapseditem.add',
    		{
    			"TASKID" : 691,
    			"ARFIELDS": {
    				"SECONDS": 113, 
    				"COMMENT_TEXT": "текст комментария",
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
                'task.elapseditem.add',
                [
                    'TASKID'   => 691,
                    'ARFIELDS' => [
                        'SECONDS'      => 113,
                        'COMMENT_TEXT' => 'текст комментария',
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
        echo 'Error adding elapsed item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.elapseditem.add',
        {
            "TASKID" : 691,
            "ARFIELDS": {
                "SECONDS": 113, 
                "COMMENT_TEXT": "текст комментария",
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
        'task.elapseditem.add',
        [
            'TASKID' => 691,
            'ARFIELDS' => [
                'SECONDS' => 113,
                'COMMENT_TEXT' => 'текст комментария',
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

В случае успешного выполнения запроса, сервер вернет идентификатор новой записи.

```json
{
    "result": 5,
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

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор новой записи ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_CODE",
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
- [{#T}](./task-elapsed-item-update.md)
- [{#T}](./task-elapsed-item-get.md)
- [{#T}](./task-elapsed-item-get-list.md)
- [{#T}](./task-elapsed-item-delete.md)
- [{#T}](./task-elapsed-item-is-action-allowed.md)
- [{#T}](./task-elapsed-item-get-manifest.md)