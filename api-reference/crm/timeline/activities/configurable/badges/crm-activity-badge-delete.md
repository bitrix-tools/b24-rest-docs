# Удалить бейдж по коду crm.activity.badge.delete

> Scope: [`crm`](../../../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу crm

Метод `crm.activity.badge.delete` удаляет бейдж.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../../_includes/required.md) %}

#|
|| **Поле** | **Описание** ||
|| **code***
[`string`](../../../../../data-types.md) | Код бейджа, например `missedCall` ||
|#


## Примеры кода

{% include [Сноска о примерах](../../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"code":"missedCall","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.badge.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.activity.badge.delete",
    		{
    			code: 'missedCall',
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    		console.error(result.error());
    	else
    		console.dir(result);
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
                'crm.activity.badge.delete',
                [
                    'code' => 'missedCall',
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
        echo 'Error deleting activity badge: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.activity.badge.delete",
        {
            code: 'missedCall',
        }, result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }    
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.activity.badge.delete',
        [
            'code' => 'missedCall'
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
    "result": true,
    "time": {
        "start": 1724068028.331234,
        "finish": 1724068028.726591,
        "duration": 0.3953571319580078,
        "processing": 0.13033390045166016,
        "date_start": "2025-01-21T13:47:08+02:00",
        "date_finish": "2025-01-21T13:47:08+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../../data-types.md) | Корневой элемент ответа. Содержит:
- `true` — в случае успеха
- `null` — в случае неудачи (произошла ошибка)
||
|| **time**
[`time`](../../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Not found."
}
```

{% include notitle [обработка ошибок](../../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав для выполнения операции ||
|| `NOT_FOUND` | Бейдж с указанным кодом не найден ||
|#

{% include [системные ошибки](../../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-activity-badge-add.md)
- [{#T}](./crm-activity-badge-list.md)
- [{#T}](./crm-activity-badge-get.md)
