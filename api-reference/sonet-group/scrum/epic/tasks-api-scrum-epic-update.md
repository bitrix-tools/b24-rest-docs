# Обновить эпик в Скраме tasks.api.scrum.epic.update

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь, имеющий доступ к Скраму

Метод обновляет эпик в Скраме.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор эпика.

Получить идентификаторы эпиков можно методом [`tasks.api.scrum.epic.list`](./tasks-api-scrum-epic-list.md) ||
|| **fields***
[`array`](../../../data-types.md) | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для добавления нового эпика в виде структуры:

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

В `files` можно передать массив значений с идентификаторами файлов, указав префикс `n` для каждого идентификатора.

{% note warning "Внимание" %}

Если передать пустой массив — файлы удалятся

{% endnote %}

||
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
        "id": 1,
        "fields": {
            "name": "Updated epic name",
            "description": "Updated description text",
            "color": "#bbecf1",
            "files": ["n429", "n243"]
        }
    },
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.api.scrum.epic.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "fields": {
        "id": 1,
        "fields": {
            "name": "Updated epic name",
            "description": "Updated description text",
            "color": "#bbecf1",
            "files": ["n429", "n243"]
        }
    },
    auth=YOUR_ACCESS_TOKEN
    }' \
    https://your-domain.bitrix24.com/rest/tasks.api.scrum.epic.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'tasks.api.scrum.epic.update',
    		{
    			id: epicId,
    			fields:{
    				name: name,
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
        $epicId = 1;
        $name = 'Updated epic name';
        $description = 'Updated description text';
        $color = '#bbecf1';
        $files = ['n429', 'n243'];
    
        $response = $b24Service
            ->core
            ->call(
                'tasks.api.scrum.epic.update',
                [
                    'id' => $epicId,
                    'fields' => [
                        'name' => $name,
                        'description' => $description,
                        'color' => $color,
                        'files' => $files
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating epic: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    const epicId = 1;
    const name = 'Updated epic name';
    const description = 'Updated description text';
    const color = '#bbecf1';
    const files = ['n429', 'n243'];
    BX24.callMethod(
        'tasks.api.scrum.epic.update',
        {
            id: epicId,
            fields:{
                name: name,
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
    $epicId = 1;
    $name = 'Updated epic name';
    $description = 'Updated description text';
    $color = '#bbecf1';
    $files = ['n429', 'n243'];

    // выполнение запроса к REST API
    $result = CRest::call(
    'tasks.api.scrum.epic.update',
    [
        'id' => $epicId,
        'fields' => [
            'name' => $name,
            'description' => $description,
            'color' => $color,
            'files' => $files
        ]
    ]
    );

    // Обработка ответа от Битрикс24
    if ($result['error']) {
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
    "id": 1,
    "groupId": 143,
    "name": "Updated epic name",
    "description": "Updated description text",
    "createdBy": 1,
    "modifiedBy": 1,
    "color": "#bbecf1"
}
```

### Возвращаемые данные

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
[`string`](../../../data-types.md) | Цвет эпика ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 0,
    "error_description": "Epic not updated"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание**  | **Значение** ||
|| `0` | Access denied | Нет доступа для просмотра данных эпика ||
|| `0` | Epic not found | Такого эпика не существует ||
|| `0` | Epic not updated | Не удалось обновить эпик ||
|| `0` | createdBy user not found | Пользователь в поле «создатель» не найден ||
|| `0` | modifiedBy user not found | Пользователь в поле «последний изменивший» не найден ||
|| `100` | Could not find value for parameter {id} | Неверно указано имя параметра или не задан параметр ||
|| `100` | Invalid value {stringValue} to match with parameter {id}. Should be value of type int. | Неверный тип параметра ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./tasks-api-scrum-epic-add.md)
- [{#T}](./tasks-api-scrum-epic-get.md)
- [{#T}](./tasks-api-scrum-epic-list.md)
- [{#T}](./tasks-api-scrum-epic-delete.md)
- [{#T}](./tasks-api-scrum-epic-get-fields.md)