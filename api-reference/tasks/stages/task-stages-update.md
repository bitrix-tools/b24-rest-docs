# Обновить стадию канбана или «Моего плана» task.stages.update

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - любой пользователь для стадий «Моего плана»
> - любой пользователь с доступом к группе для стадий канбана

Метод обновляет стадии канбана или «Моего плана».

Метод также применяется для перемещения стадии с одной позиции на другую. Для этого достаточно передать нужный `AFTER_ID`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор стадии ||
|| **fields***
[`array`](../../data-types.md) | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для обновления стадии канбана или «Моего плана» ||
|| **isAdmin**
[`boolean`](../../data-types.md) | Если установлено `true`, то проверки прав происходить не будет. При условии, что запрашивающий является администратором портала ||
|#

### Параметр fields

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE** [`string`](../../data-types.md) | Заголовок стадии ||
|| **COLOR** [`string`](../../data-types.md) | Цвет стадии в формате RGB ||
|| **AFTER_ID** [`integer`](../../data-types.md) | Идентификатор стадии, после которой надо добавить новую стадию.

Если не указано или равно `0`, то добавится в начало ||
|#

При обновлении стадии группы при недостаточном уровне прав выводится ошибка доступа.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "id": 5,
    "fields": {
        "TITLE": "Новая стадия",
        "SORT": 200,
        "COLOR": "FF5733"
    }
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/task.stages.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: YOUR_ACCESS_TOKEN" \
    -d '{
    "id": 5,
    "fields": {
        "TITLE": "Новая стадия",
        "SORT": 200,
        "COLOR": "FF5733"
    }
    }' \
    https://your-domain.bitrix24.com/rest/task.stages.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.stages.update',
    		{
    			id: stageId,
    			fields: fields
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
        $fields = [
            'TITLE' => "Новая стадия",
            'SORT' => 200,
            'COLOR' => "FF5733"
        ];
    
        $response = $b24Service
            ->core
            ->call(
                'task.stages.update',
                [
                    'id' => $stageId,
                    'fields' => $fields
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating task stage: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    const stageId = 5;
    const fields = {
        TITLE: "Новая стадия",
        SORT: 200,
        COLOR: "FF5733"
    };
    BX24.callMethod(
        'task.stages.update',
        {
            id: stageId,
            fields: fields
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
    $fields = [
        "TITLE" => "Новая стадия",
        "SORT" => 200,
        "COLOR" => "FF5733"
    ];

    // выполнение запроса к REST API
    $result = CRest::call(
        'task.stages.update',
        [
            'id' => $stageId,
            'fields' => $fields
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

HTTP-Статус: 200

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
[`boolean`](../../data-types.md) | Возвращает `true` в случае успешного обновления стадии
||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Вы не можете изменять стадии в этой группе"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Вы не можете изменять стадии в этой группе ||
|| `NOT_FOUND` | Стадия не найдена ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./task-stages-add.md)
- [{#T}](./task-stages-get.md)
- [{#T}](./task-stages-can-move-task.md)
- [{#T}](./task-stages-move-task.md)
- [{#T}](./task-stages-delete.md)