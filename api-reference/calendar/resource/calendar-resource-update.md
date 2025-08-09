# Обновить ресурс calendar.resource.update

> Scope: [`calendar`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод обновляет ресурс.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **resourceId***
[`integer`](../../data-types.md) | Идентификатор ресурса.

Получить идентификатор можно методом создания ресурса [calendar.resource.add](./calendar-resource-add.md) или методом получения списка ресурсов [calendar.resource.list](./calendar-resource-list.md) ||
|| **name***
[`string`](../../data-types.md) | Новое наименование ресурса ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"resourceId":197,"name":"Changed Resource Name"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/calendar.resource.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"resourceId":197,"name":"Changed Resource Name","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/calendar.resource.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'calendar.resource.update',
    		{
    			resourceId: 197,
    			name: 'Changed Resource Name'
    		}
    	);
    	
    	const result = response.getData().result;
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
                'calendar.resource.update',
                [
                    'resourceId' => 197,
                    'name'       => 'Changed Resource Name',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating resource: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'calendar.resource.update',
        {
            resourceId: 197,
            name: 'Changed Resource Name'
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'calendar.resource.update',
        [
            'resourceId' => 197,
            'name' => 'Changed Resource Name'
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
    "result": 197,
    "time": {
        "start": 1733318565.183275,
        "finish": 1733318565.695058,
        "duration": 0.5117831230163574,
        "processing": 0.29406094551086426,
        "date_start": "2024-12-04T13:22:45+00:00",
        "date_finish": "2024-12-04T13:22:45+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор обновленного ресурса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Не задан обязательный параметр "name" для метода "calendar.resource.update""
}
```
{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| Пустая строка | Не задан обязательный параметр "id" для метода "calendar.resource.update" | Не передан обязательный параметр `resourceId` ||
|| Пустая строка | Не задан обязательный параметр "name" для метода "calendar.resource.update" | Не передан обязательный параметр `name` ||
|| Пустая строка | Доступ запрещен | Метод вызывается внешним пользователем или пользователю запрещено изменение ресурсов ||
|| Пустая строка | При изменении ресурса произошла ошибка | Другая ошибка ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./calendar-resource-add.md)
- [{#T}](./calendar-resource-list.md)
- [{#T}](./calendar-resource-booking-list.md)
- [{#T}](./calendar-resource-delete.md)