# Добавить эпик в Скрам tasks.api.scrum.epic.add

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь, имеющий доступ к Скраму

Метод добавляет эпик в Скрам.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для добавления нового эпика в виде структуры:

```js
fields: {
    name: 'значение',
    groupId: 'значение',
    description: 'значение',
    color: 'значение',
    files: [
        'файл1',
        'файл2',
        ...
    ]

}
```

||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../../data-types.md) | Название эпика ||
|| **description**
[`string`](../../../data-types.md) | Описание эпика ||
|| **groupId***
[`integer`](../../../data-types.md) | Идентификатор группы (скрама), к которой относится эпик ||
|| **color**
[`string`](../../../data-types.md) | Цвет эпика ||
|| **files**
[`array`](../../../data-types.md) | Массив файлов, привязанных к эпику.

В `files` можно передать массив значений с идентификаторами файлов, указав префикс `n` для каждого идентификатора ||
|| **createdBy**
[`integer`](../../../data-types.md) | Кем создан ||
|| **modifiedBy**
[`integer`](../../../data-types.md) | Кем изменен ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "fields": {
        "name": "Epic 1",
        "groupId": 1,
        "description": "Description text",
        "color": "#69dafc",
        "files": ["n428", "n345"]
    }
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.api.scrum.epic.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: YOUR_ACCESS_TOKEN" \
    -d '{
    "fields": {
        "name": "Epic 1",
        "groupId": 1,
        "description": "Description text",
        "color": "#69dafc",
        "files": ["n428", "n345"]
    }
    }' \
    https://your-domain.bitrix24.com/rest/tasks.api.scrum.epic.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'tasks.api.scrum.epic.add',
    		{
    			fields: {
    				name: name,
    				groupId: groupId,
    				description: description,
    				color: color,
    				files: files
    			}
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
                'tasks.api.scrum.epic.add',
                [
                    'fields' => [
                        'name'        => $name,
                        'groupId'     => $groupId,
                        'description' => $description,
                        'color'       => $color,
                        'files'       => $files,
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
        echo 'Error adding epic: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    const groupId = 1;
    const name = 'Epic 1';
    const description = 'Description text';
    const color = '#69dafc';
    const files = ['n428', 'n345'];

    BX24.callMethod(
        'tasks.api.scrum.epic.add',
        {
            fields: {
                name: name,
                groupId: groupId,
                description: description,
                color: color,
                files: files
            }
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

    $groupId = 1;
    $name = 'Epic 1';
    $description = 'Description text';
    $color = '#69dafc';
    $files = ['n428', 'n345'];

    // выполнение запроса к REST API
    $result = CRest::call(
        'tasks.api.scrum.epic.add',
        [
            'fields' => [
                'name' => $name,
                'groupId' => $groupId,
                'description' => $description,
                'color' => $color,
                'files' => $files
            ]
        ]
    );

    // Обработка ответа от Битрикс24
    if (isset($result['error'])) {
        echo 'Error: '.$result['error_description'];
    }
    else {
        print_r($result['result']);
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-Статус: **200**

```json
{
    "id": 4,
    "groupId": 1,
    "name": "Epic 1",
    "description": "Description text",
    "createdBy": 1,
    "modifiedBy": 1,
    "color": "#69dafc"
}
```

### Возвращаемые данные {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор эпика ||
|| **groupId**
[`integer`](../../../data-types.md) | Идентификатор группы (скрама), к которой привязан эпик ||
|| **name**
[`string`](../../../data-types.md) | Название эпика ||
|| **description**
[`string`](../../../data-types.md) | Описание эпика ||
|| **createdBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, создавшего эпик ||
|| **modifiedBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который последним изменял эпик ||
|| **color**
[`string`](../../../data-types.md) | Цвет эпика в формате HEX ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 0,
    "error_description": "Group is not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание**  | **Значение** ||
|| `0` | Access denied | Нет доступа к скраму ||
|| `0` | Epic not created | Не удалось создать эпик ||
|| `0` | createdBy user not found | Пользователь в поле «создатель» не найден ||
|| `0` | modifiedBy user not found | Пользователь в поле «последний изменивший» не найден ||
|| `0` | Group is not found | Не указан параметр `GROUP_ID` или группы с таким `ID` не существует ||
|| `0` | Name is not found | Не указан параметр `NAME` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./tasks-api-scrum-epic-update.md)
- [{#T}](./tasks-api-scrum-epic-get.md)
- [{#T}](./tasks-api-scrum-epic-list.md)
- [{#T}](./tasks-api-scrum-epic-delete.md)
- [{#T}](./tasks-api-scrum-epic-get-fields.md)