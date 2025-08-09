# Удалить поле из поиска дубликатов crm.duplicate.volatileType.unregister

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `crm.duplicate.volatileType.unregister` удаляет нестандартное поле из поиска дубликатов.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор записи о поле, которую нужно удалить. Получить идентификаторы записей добавленных к поиску дубликатов полей можно методом [crm.duplicate.volatileType.list](./crm-duplicate-volatile-type-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"id":101}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.duplicate.volatileType.unregister
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":101,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.duplicate.volatileType.unregister
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.duplicate.volatileType.unregister",
    		{
    			id: 101
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
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
                'crm.duplicate.volatileType.unregister',
                [
                    'id' => 101,
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
        echo 'Error unregistering volatile type: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.duplicate.volatileType.unregister",
        {
            id: 101
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
        'crm.duplicate.volatileType.unregister',
        [
            'id' => 101
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
        "start": 1750935024.602893,
        "finish": 1750935024.719883,
        "duration": 0.1169898509979248,
        "processing": 0.05846285820007324,
        "date_start": "2025-06-26T13:50:24+03:00",
        "date_finish": "2025-06-26T13:50:24+03:00",
        "operating_reset_at": 1750935624,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа, содержит `true` в случае успеха ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "TYPE_IS_NOT_ASSIGNED",
    "error_description": "This type is not assigned."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `400` | `TYPE_IS_NOT_ASSIGNED` | Идентификатор записи о добавленном поле не найден ||
|#

{% include [системные ошибки](./../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [crm.duplicate.volatileType.fields](./crm-duplicate-volatile-type-fields.md)
- [crm.duplicate.volatileType.list](./crm-duplicate-volatile-type-list.md)
- [crm.duplicate.volatileType.register](./crm-duplicate-volatile-type-register.md) 