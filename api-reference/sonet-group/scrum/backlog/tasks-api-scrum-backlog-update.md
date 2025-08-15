# Обновить бэклог tasks.api.scrum.backlog.update

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод обновляет бэклог.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор бэклога. 

Можно получить методом [tasks.api.scrum.backlog.get](./tasks-api-scrum-backlog-get.md) ||
|| **fields***
[`object`](../../../data-types.md) | Объект содержащий записи о группе и пользователе (подробное описание приведено ниже) в виде структуры:

```js
"fields": {
    "groupId": значение,
    "createdBy": значение,
    "modifiedBy": значение,
}    
```
||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **groupId**
[`integer`](../../../data-types.md) | Идентификатор группы, к которой принадлежит бэклог.

Идентификатор группы можно получить при создании новой группы [sonet_group.create](../../sonet-group-create.md) или при получении списка существующих групп [socialnetwork-api-workgroup-list.md](../../socialnetwork-api-workgroup-list.md) ||
|| **createdBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, от кого будет создан бэклог ||
|| **modifiedBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, от кого будет модифицирован бэклог ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1, "fields": {"groupId": 125, "createdBy": 6}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/tasks.api.scrum.backlog.update
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1, "fields": {"groupId": 125, "createdBy": 6}, "auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.api.scrum.backlog.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'tasks.api.scrum.backlog.update',
    		{
    			"id": 1,
    			"fields": {
    				"groupId": 125,
    				"createdBy": 6,
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
                'tasks.api.scrum.backlog.update',
                [
                    'id' => 1,
                    'fields' => [
                        'groupId'   => 125,
                        'createdBy' => 6,
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
        echo 'Error updating backlog: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.api.scrum.backlog.update',
        {
            "id": 1,
            "fields": {
                "groupId": 125,
                "createdBy": 6,
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
        'tasks.api.scrum.backlog.update',
        [
            'id' => 1,
            'fields' => [
                'groupId' => 125,
                'createdBy' => 6,
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
    "result": {
        "id": 1,
        "groupId": 125,
        "createdBy": 6,
        "modifiedBy": 1
    },
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

## Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор бэклога ||
|| **groupId**
[`integer`](../../../data-types.md) | Идентификатор группы, для которой был создан бэклог ||
|| **createdBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который создал бэклог ||
|| **modifiedBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который изменил бэклог ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":0,
    "error_description":"Access denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| `100` | Could not find value for parameter {fields} | Не передан обязательный параметр `fields` ||
|| `0` | Backlog not found | Передан невалидный идентификатор бэклога ||
|| `0` | Access denied | Отсутствуют соответствующие права доступа ||
|| `0` | Unknown error | Другая ошибка ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-api-scrum-backlog-add.md)
- [{#T}](./tasks-api-scrum-backlog-get.md)
- [{#T}](./tasks-api-scrum-backlog-delete.md)
- [{#T}](./tasks-api-scrum-backlog-get-fields.md)