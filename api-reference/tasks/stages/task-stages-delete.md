# Удалить стадию канбана или «Моего плана» task.stages.delete

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - любой пользователь для стадий «Моего плана»
> - любой пользователь с доступом к группе для стадий канбана

Метод удаляет стадию канбана или «Моего плана». 

Принимает на вход `id` стадии. Стадия проверяется на достаточный уровень прав, а также на то, что в ней нет задач.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор стадии, которую необходимо удалить ||
|| **isAdmin**
[`boolean`](../../data-types.md) | Если установлено `true`, то проверки прав происходить не будет, при условии, что запрашивающий является администратором портала ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "id": 5
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/task.stages.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: YOUR_ACCESS_TOKEN" \
    -d '{
    "id": 5
    }' \
    https://your-domain.bitrix24.com/rest/task.stages.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.stages.delete',
    		{
    			id: stageId,
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
        $stageId = 5;
        $response = $b24Service
            ->core
            ->call(
                'task.stages.delete',
                [
                    'id' => $stageId,
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
        echo 'Error deleting task stage: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    const stageId = 5;
    BX24.callMethod(
        'task.stages.delete',
        {
            id: stageId,
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

    $stageId = 5;

    // выполнение запроса к REST API
    $result = CRest::call(
        'task.stages.delete',
        [
            'id' => $stageId
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
[`boolean`](../../data-types.md) | Возвращает `true` в случае успешного удаления стадии
||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "CANT_DELETE_FIRST",
    "error_description": "Нельзя удалить первую стадию. Передвиньте стадию, чтобы удалить"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Вы не можете управлять стадиями||
|| `CANT_DELETE_FIRST` | Нельзя удалить первую стадию. Передвиньте стадию, чтобы удалить ||
|| `IS_SYSTEM` | Стадия, установленная по умолчанию, не может быть удалена ||
|| `NOT_FOUND` | Стадия не найдена ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./task-stages-add.md)
- [{#T}](./task-stages-update.md)
- [{#T}](./task-stages-get.md)
- [{#T}](./task-stages-can-move-task.md)
- [{#T}](./task-stages-move-task.md)