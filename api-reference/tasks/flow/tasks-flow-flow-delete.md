# Удалить поток tasks.flow.Flow.delete

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: создатель или администратор потока

Метод `tasks.flow.Flow.delete` удаляет поток по его идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **flowData*** 
[`object`](../../data-types.md) | Объект с данными для удаления потока ||
|| **flowData.id*** 
[`integer`](../../data-types.md) | Идентификатор потока, который нужно удалить. 

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
        "flowData": {
            "id": 517
        }
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.flow.Flow.delete
    ```

- cURL (oAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
    -d '{
        "flowData": {
            "id": 517
        }
    }' \
    https://your-domain.bitrix24.com/rest/tasks.flow.Flow.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'tasks.flow.Flow.delete',
    		{
    			flowData: {
    				id: 517
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
                'tasks.flow.Flow.delete',
                [
                    'flowData' => [
                        'id' => 517
                    ]
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
        echo 'Error deleting flow: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.flow.Flow.delete',
        {
            flowData: {
                id: 517
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
        "id" => 517
    ];

    // выполнение запроса к REST API
    $result = CRest::call(
        'tasks.flow.Flow.delete',
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
        "deleted": true
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result** 
[`object`](../../data-types.md) | Объект с результатом операции ||
|| **deleted** 
[`boolean`](../../data-types.md) | Успешность удаления потока ||
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
|| `0` | Доступ запрещен или поток не найден | Тариф портала не позволяет работать с потоками или у пользователя нет прав на удаление потока ||
|| `0` | `Flow not found` | Поток с указанным идентификатором не найден ||
|| `0` | `Unknown error` | Неизвестная ошибка ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-flow-flow-create.md)
- [{#T}](./tasks-flow-flow-update.md)
- [{#T}](./tasks-flow-flow-get.md)
- [{#T}](./tasks-flow-flow-is-exists.md)
- [{#T}](./tasks-flow-flow-activate.md)
- [{#T}](./tasks-flow-flow-pin.md)
