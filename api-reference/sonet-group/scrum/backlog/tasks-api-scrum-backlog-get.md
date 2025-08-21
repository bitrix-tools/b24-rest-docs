# Получить поля бэклога по идентификатору Скрама tasks.api.scrum.backlog.get

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.api.scrum.backlog.get` возвращает значения полей бэклога по `id` Скрама.

Может понадобиться, чтобы получить `id` бэклога для добавления или переноса в бэклог задачи.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор группы.

Можно получить при создании новой группы [sonet_group.create](../../sonet-group-create.md) или при получении списка существующих групп [socialnetwork-api-workgroup-list.md](../../socialnetwork-api-workgroup-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id": 125}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/tasks.api.scrum.backlog.get
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id": 125, "auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.api.scrum.backlog.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'tasks.api.scrum.backlog.get',
    		{
    			"id": 125,
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
                'tasks.api.scrum.backlog.get',
                [
                    'id' => 125,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting scrum backlog: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.api.scrum.backlog.get',{
            "id": 125,
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
        'tasks.api.scrum.backlog.get',
        [
            'id' => 125,
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
|| `0` | Backlog not found | Передан невалидный идентификатор бэклога ||
|| `0` | Access denied | Отсутствуют соответствующие права доступа ||
|| `0` | Unknown error | Другая ошибка ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-api-scrum-backlog-add.md)
- [{#T}](./tasks-api-scrum-backlog-update.md)
- [{#T}](./tasks-api-scrum-backlog-delete.md)
- [{#T}](./tasks-api-scrum-backlog-get-fields.md)