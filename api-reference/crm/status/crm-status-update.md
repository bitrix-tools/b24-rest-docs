# Обновить элемент справочника crm.status.update

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами администратора CRM

Метод `crm.status.update` обновляет параметры существующего элемента справочника.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id*** 
[`integer`](../../data-types.md) | Идентификатор элемента справочника, который нужно обновить. Получить список можно методом [crm.status.list](./crm-status-list.md) ||
|| **fields*** 
[`object`](../../data-types.md) | Массив полей для обновления. Список доступных полей описан [ниже](#fields)  ||
|#

### Параметр fields {#fields}

#|
|| **Название**
 `тип` | **Описание** ||
|| **NAME**
[`string`](../../data-types.md) | Название ||
|| **SORT**
[`integer`](../../data-types.md) | Сортировка ||
|| **COLOR**
[`string`](../../data-types.md) | Цвет hex-код, например `#39A8EF` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"id":123,"fields":{"NAME":"Новое название","COLOR":"#00A9F4"}}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.status.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":123,"fields":{"NAME":"Новое название","COLOR":"#00A9F4"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.status.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.status.update',
    		{
    			id: 123,
    			fields: {
    				NAME: 'Новое название',
    				COLOR: '#00A9F4'
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.dir(result);
    	}
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
                'crm.status.update',
                [
                    'id' => 123,
                    'fields' => [
                        'NAME' => 'Новое название',
                        'COLOR' => '#00A9F4'
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error updating status: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating status: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.status.update",
        {
            id: 123,
            fields: {
                NAME: "Новое название",
                COLOR: "#00A9F4"
            }
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
        'crm.status.update',
        [
            'id' => 123,
            'fields' => [
                'NAME' => 'Новое название',
                'COLOR' => '#00A9F4'
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
        "start": 1752149050.805837,
        "finish": 1752149050.842422,
        "duration": 0.036585092544555664,
        "processing": 0.009345054626464844,
        "date_start": "2025-07-10T15:04:10+03:00",
        "date_finish": "2025-07-10T15:04:10+03:00",
        "operating_reset_at": 1752149650,
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
|| `400`     | `Error on updating status.` | Ошибка при обновлении элемента ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-status-fields.md)
- [{#T}](./crm-status-list.md)
- [{#T}](./crm-status-get.md)
- [{#T}](./crm-status-add.md)
- [{#T}](./crm-status-delete.md) 
- [{#T}](../../../tutorials/crm/how-to-add-crm-objects/how-to-add-category-to-spa.md)