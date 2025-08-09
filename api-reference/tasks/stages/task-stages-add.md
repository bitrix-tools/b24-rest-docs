# Добавить стадию канбана или «Моего плана» task.stages.add

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - любой пользователь для стадий «Моего плана»
> - любой пользователь с доступом к группе для стадий канбана

Метод добавляет стадию канбана или «Моего плана».

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для добавления новой стадии ||
|| **isAdmin**
[`boolean`](../../data-types.md) | Если установлено `true`, то проверки прав происходить не будет. При условии, что запрашивающий является администратором портала ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE***
[`string`](../../data-types.md) | Заголовок стадии ||
|| **COLOR**
[`string`](../../data-types.md) | Цвет стадии в формате RGB ||
|| **AFTER_ID**
[`integer`](../../data-types.md) | Идентификатор стадии, после которой надо добавить новую стадию.

Если не указано или равно `0`, то добавится в начало ||
|| **ENTITY_ID**
[`integer`](../../data-types.md)| Идентификатор объекта.

Может равняться `ID` группы, тогда стадия добавится в канбан группы.

Если равняется `0` или отсутствует, то стадия добавляется в «Мой план» текущего пользователя.

При недостаточном уровне прав выводится ошибка доступа  ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "fields": {
        "TITLE": "Название стадии",
        "COLOR": "#FFAAEE",
        "AFTER_ID": 1,
        "ENTITY_ID": 1
    },
    "isAdmin": false
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/task.stages.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: YOUR_ACCESS_TOKEN" \
    -d '{
    "fields": {
        "TITLE": "Название стадии",
        "COLOR": "#FFAAEE",
        "AFTER_ID": 1,
        "ENTITY_ID": 1
    },
    "isAdmin": false
    }' \
    https://your-domain.bitrix24.com/rest/task.stages.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.stages.add',
    		{
    			fields: {
    				TITLE: 'Название стадии',
    				COLOR: '#FFAAEE',
    				AFTER_ID: 1,
    				ENTITY_ID: 1
    			},
    			isAdmin: false,
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
                'task.stages.add',
                [
                    'fields' => [
                        'TITLE'    => 'Название стадии',
                        'COLOR'    => '#FFAAEE',
                        'AFTER_ID' => 1,
                        'ENTITY_ID' => 1
                    ],
                    'isAdmin' => false,
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
        echo 'Error adding task stage: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.stages.add',
        {
            fields: {
                TITLE: 'Название стадии',
                COLOR: '#FFAAEE',
                AFTER_ID: 1,
                ENTITY_ID: 1
            },
            isAdmin: false,
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

    $fields = [
        "TITLE" => "Название стадии",
        "COLOR" => "#FFAAEE",
        "AFTER_ID" => 1,
        "ENTITY_ID" => 1
    ];

    // выполнение запроса к REST API
    $result = CRest::call(
        'task.stages.add',
        [
            'fields' => $fields,
            'isAdmin' => false
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
    "result": 1
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result** 
[`integer`](../../data-types.md) | Идентификатор добавленной стадии ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "EMPTY_TITLE",
    "error_description": "Не указан заголовок стадии"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `EMPTY_TITLE` | Не указан заголовок стадии ||
|| `ACCESS_DENIED` | Вы не можете управлять стадиями ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./task-stages-update.md)
- [{#T}](./task-stages-get.md)
- [{#T}](./task-stages-can-move-task.md)
- [{#T}](./task-stages-move-task.md)
- [{#T}](./task-stages-delete.md)