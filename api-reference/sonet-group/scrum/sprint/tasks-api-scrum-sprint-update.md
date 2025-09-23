# Изменить спринт tasks.api.scrum.sprint.update

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь, имеющий доступ к Скраму

Метод `tasks.api.scrum.sprint.update` изменяет спринт.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор спринта ||
|| **fields***
[`object`](../../../data-types.md) | Объект с данными спринта ||
|#

### Параметр fields

#|
|| **Название**
`тип` | **Описание** ||
|| **groupId** 
[`integer`](../../../data-types.md) | Идентификатор группы (Скрама), к которой относится спринт. 

Идентификатор можно получить методом [tasks.api.scrum.sprint.get](./tasks-api-scrum-sprint-get.md) для уже существующего спринта ||
|| **name** 
[`string`](../../../data-types.md) | Название спринта ||
|| **sort** 
[`integer`](../../../data-types.md) | Сортировка ||
|| **dateStart** 
[`string`](../../../data-types.md) | Дата начала спринта. Доступные форматы: `ISO 8601`, `timestamp` ||
|| **dateEnd** 
[`string`](../../../data-types.md) | Дата окончания спринта. Доступные форматы: `ISO 8601`, `timestamp` ||
|| **status** 
[`string`](../../../data-types.md) | Статус спринта. Доступные значения: `active`, `planned`, `completed` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "id": 2,
    "fields": {
        "name": "Sprint 2",
        "groupId": 1,
        "dateStart": "2021-11-22T00:00:00+02:00",
        "dateEnd": "2021-11-29T00:00:00+02:00"
    }
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.api.scrum.sprint.update
    ```

- cURL (oAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: YOUR_ACCESS_TOKEN" \
    -d '{
    "id": 2,
    "fields": {
        "name": "Sprint 2",
        "groupId": 1,
        "dateStart": "2021-11-22T00:00:00+02:00",
        "dateEnd": "2021-11-29T00:00:00+02:00"
    }
    }' \
    https://your-domain.bitrix24.com/rest/tasks.api.scrum.sprint.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'tasks.api.scrum.sprint.update',
    		{
    			id: sprintId,
    			fields: {
    				name: name,
    				groupId: groupId,
    				dateStart: dateStart,
    				dateEnd: dateEnd,
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
                'tasks.api.scrum.sprint.update',
                [
                    'id' => $sprintId,
                    'fields' => [
                        'name'      => $name,
                        'groupId'   => $groupId,
                        'dateStart' => $dateStart,
                        'dateEnd'   => $dateEnd,
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
        echo 'Error updating sprint: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    const sprintId = 2;
    const groupId = 1;
    const name = 'Sprint 2';
    const dateStart = '2021-11-22T00:00:00+02:00';
    const dateEnd = '2021-11-29T00:00:00+02:00';
    BX24.callMethod(
        'tasks.api.scrum.sprint.update',
        {
            id: sprintId,
            fields: {
                name: name,
                groupId: groupId,
                dateStart: dateStart,
                dateEnd: dateEnd,
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

    // выполнение запроса к REST API
    $result = CRest::call(
        'tasks.api.scrum.sprint.update',
        [
            'id' => 2,
            'fields' => [
                'name' => 'Sprint 2',
                'groupId' => 1,
                'dateStart' => '2021-11-22T00:00:00+02:00',
                'dateEnd' => '2021-11-29T00:00:00+02:00'
            ]
        ]
    );

    // Обработка ответа от Битрикс24
    if (isset($result['error'])) {
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
    "result":
    {
        "id": 2,
        "groupId": 1,
        "entityType": "sprint",
        "name": "Sprint 2",
        "goal": "",
        "sort": 1,
        "createdBy": 1,
        "modifiedBy": 1,
        "dateStart": "2021-11-22T00:00:00+02:00",
        "dateEnd": "2021-11-29T00:00:00+02:00",
        "status": "planned"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result** 
[`object`](../../../data-types.md) | Объект, содержащий данные о спринте ||
|| **id** 
[`integer`](../../../data-types.md) | Идентификатор спринта ||
|| **groupId** 
[`integer`](../../../data-types.md) | Идентификатор группы (Скрама), к которой относится спринт ||
|| **entityType** 
[`string`](../../../data-types.md) | Тип сущности (в данном случае `sprint`) ||
|| **name** 
[`string`](../../../data-types.md) | Название спринта ||
|| **goal** 
[`string`](../../../data-types.md) | Цель спринта. Устанавливается только в интерфейсе при запуске спринта ||
|| **sort** 
[`integer`](../../../data-types.md) | Сортировка ||
|| **createdBy** 
[`integer`](../../../data-types.md) | Идентификатор пользователя, создавшего спринт ||
|| **modifiedBy** 
[`integer`](../../../data-types.md) | Идентификатор пользователя, изменившего спринт ||
|| **dateStart** 
[`string`](../../../data-types.md) | Дата начала спринта в формате `ISO 8601` ||
|| **dateEnd** 
[`string`](../../../data-types.md) | Дата окончания спринта в формате `ISO 8601` ||
|| **status** 
[`string`](../../../data-types.md) | Статус спринта ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 0,
    "error_description": "Sprint not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| `0` | `Access denied` | Нет доступа к Скраму ||
|| `0` | `Sprint not created` | Не удалось создать спринт ||
|| `0` | `Incorrect dateStart format` | Неверный формат времени начала спринта ||
|| `0` | `Incorrect dateEnd format` | Неверный формат времени окончания спринта ||
|| `0` | `createdBy user not found` | Пользователь в поле «создатель» не найден ||
|| `0` | `modifiedBy user not found` | Пользователь в поле «последний изменивший» не найден ||
|| `0` | `Unable to add two active sprint` | В группе не может быть двух спринтов со статусом «активен» ||
|| `0` | `Incorrect sprint status` | Статус не состоит в списке доступных для установки статусов спринта ||
|| `100` | `Could not find value for parameter {fields}` | Неверно указано имя параметра или не задан параметр ||
|| `100` | `Invalid value {stringValue} to match with parameter {fields}. Should be value of type array` | Неверный тип параметра ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-api-scrum-sprint-add.md)
- [{#T}](./tasks-api-scrum-sprint-start.md)
- [{#T}](./tasks-api-scrum-sprint-complete.md)
- [{#T}](./tasks-api-scrum-sprint-get.md)
- [{#T}](./tasks-api-scrum-sprint-list.md)
- [{#T}](./tasks-api-scrum-sprint-delete.md)
- [{#T}](./tasks-api-scrum-sprint-get-fields.md)
