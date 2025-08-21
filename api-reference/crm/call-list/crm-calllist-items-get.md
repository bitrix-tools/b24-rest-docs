# Получить список участников обзвона crm.calllist.items.get

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами на чтение элементов CRM

Метод `crm.calllist.items.get` возвращает список участников, контактов или компаний, и статус обзвона. 

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **LIST_ID***
[`integer`](../../data-types.md) | Идентификатор обзвона, можно получить методами [crm.calllist.add](./crm-calllist-add.md) и [crm.calllist.list](./crm-calllist-list.md) ||
|| **FILTER**
[`object`](../../data-types.md) | Фильтр по статусу обзвона элемента: `{ STATUS: "код_статуса" }`. 
Получить значения кодов статусов можно методом [crm.calllist.statuslist](./crm-calllist-statuslist.md)||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -d '{"LIST_ID":13,"FILTER":{"STATUS":"IN_WORK"}}' \
         https://**your_bitrix24**/rest/**user_id**/**webhook**/crm.calllist.items.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -d '{"LIST_ID":13,"FILTER":{"STATUS":"IN_WORK"},"auth":"**put_access_token_here**"}' \
         https://**your_bitrix24**/rest/crm.calllist.items.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.calllist.items.get",
    		{
    			LIST_ID: 13,
    			FILTER: {
    				STATUS: "IN_WORK"
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
                'crm.calllist.items.get',
                [
                    'LIST_ID' => 13,
                    'FILTER' => [
                        'STATUS' => 'IN_WORK'
                    ]
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
        echo 'Error getting call list items: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.calllist.items.get",
        {
            LIST_ID: 13,
            FILTER: {
                STATUS: "IN_WORK"
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
        'crm.calllist.items.get',
        [ 'LIST_ID' => 13, 'FILTER' => [ 'STATUS' => 'IN_WORK' ] ]
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
    "result": [
        {
            "ID": 9,
            "STATUS": "IN_WORK",
            "ENTITY_TYPE": 3
        },
        {
            "ID": 17,
            "STATUS": "IN_WORK",
            "ENTITY_TYPE": 3
        },
        {
            "ID": 19,
            "STATUS": "IN_WORK",
            "ENTITY_TYPE": 3
        }
    ],
    "time": {
        "start": 1752475017.529502,
        "finish": 1752475017.588903,
        "duration": 0.05940103530883789,
        "processing": 0.010075092315673828,
        "date_start": "2025-07-14T09:36:57+03:00",
        "date_finish": "2025-07-14T09:36:57+03:00",
        "operating_reset_at": 1752475617,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив элементов со статусами обзвона и типом объекта ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "Incorrect list id",
    "error_description": "Передан некорректный идентификатор списка."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `400` | `Incorrect list id` | Некорректный идентификатор обзвона ||
|| `400` | `Incorrect status` | Некорректный статус обзвона ||
|| `403` | `Access denied` | Нет доступа к элементам списка ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-calllist-add.md)
- [{#T}](./crm-calllist-get.md)
- [{#T}](./crm-calllist-list.md)
- [{#T}](./crm-calllist-statuslist.md)
- [{#T}](./crm-calllist-update.md) 