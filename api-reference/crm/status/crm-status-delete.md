# Удалить элемент справочника crm.status.delete

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами администратора CRM

Метод `crm.status.delete` удаляет элемент справочника по идентификатору.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id*** 
[`integer`](../../data-types.md) | Идентификатор элемента справочника, который требуется удалить. Получить список идентификаторов можно методом [crm.status.list](./crm-status-list.md) ||
|| **params**
[`string`](../../data-types.md) | Доступные флаги:

- `FORCED` — флаг принудительного удаления системных элементов. По умолчанию `N`.
Передавайте значение `Y`, чтобы удалить элемент, даже если он системный ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Удаление обычного элемента.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"id":123}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.status.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":123,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.status.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.status.delete",
    		{
    			id: 123
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    		console.error(result.error());
    	else
    		console.dir(result);
    }
    catch(error)
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
                'crm.status.delete',
                [
                    'id' => 123,
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
        echo 'Error deleting status: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.status.delete",
        {
            id: 123
        },
        function(result) {
            if(result.error())
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
        'crm.status.delete',
        [
            'id' => 123
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Удаление системного элемента.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"id":123,"params":{"FORCED":"Y"}}' https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.status.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"id":123,"params":{"FORCED":"Y"},"auth":"**put_access_token_here**"}' https://**put_your_bitrix24_address**/rest/crm.status.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.status.delete",
    		{
    			id: 123,
    			params: {
    				FORCED: "Y"
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
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
                'crm.status.delete',
                [
                    'id' => 123,
                    'params' => [
                        'FORCED' => 'Y'
                    ]
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
        echo 'Error deleting CRM status: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.status.delete",
        {
            id: 123,
            params: {
                FORCED: "Y"
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.dir(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.status.delete',
        [
            'id' => 123,
            'params' => [
                'FORCED' => 'Y'
            ]
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
        "start": 1752145688.808395,
        "finish": 1752145688.842539,
        "duration": 0.03414416313171387,
        "processing": 0.010373115539550781,
        "date_start": "2025-07-10T14:08:08+03:00",
        "date_finish": "2025-07-10T14:08:08+03:00",
        "operating_reset_at": 1752146288,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result** 
[`boolean`](../../data-types.md) | Корневой элемент ответа, содержит `true` в случае успеха ||
|| **time** 
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "Invalid identifier.",
    "error_description": "Передан некорректный идентификатор."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `400`     | `Access denied.` | Нет прав на выполнение операции ||
|| `400`     | `Invalid identifier.` | Передан некорректный идентификатор ||
|| `400`     | `Status is not found.` | Элемент не найден ||
|| `400`     | `CRM System Status can be deleted only if parameter FORCED is specified and equal to "Y".` | Системный элемент можно удалить только с параметром `FORCED = "Y"` ||
|| `400`     | `There are active items in this status.` | Есть связанные элементы, удаление невозможно ||
|| `400`     | `Error on deleting status.` | Ошибка при удалении элемента ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-status-fields.md)
- [{#T}](./crm-status-list.md)
- [{#T}](./crm-status-get.md)
- [{#T}](./crm-status-add.md)
- [{#T}](./crm-status-update.md) 