# Удалить подразделение department.delete

> Scope: [`department`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами на изменение структуры

Метод `department.delete` удаляет отдел в структуре компании. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`int`](../data-types.md) | Идентификатор отдела ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":18}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/department.delete
    ```

- cURL (OAuth)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":18,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/department.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"department.delete", {
    			"ID": 18
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
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
                'department.delete',
                [
                    'ID' => 18
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
        echo 'Error deleting department: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "department.delete", {
            "ID": 18
        },
        function(result) {
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
        'department.delete',
        [
            'ID' => 18
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
    "start": 1736929002.119324,
    "finish": 1736929002.469626,
    "duration": 0.35030198097229004,
    "processing": 0.13488411903381348,
    "date_start": "2025-01-15T08:16:42+00:00",
    "date_finish": "2025-01-15T08:16:42+00:00",
    "operating": 0.13484978675842285
  }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | Результат удаления отдела в структуре компании ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_CORE",
    "error_description":"Department not found"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| `ERROR_CORE` | Department not found | Удаляемый отдел не найден ||
|| `ERROR_CORE` | Access denied | Недостаточно прав для удаления отдела ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./department-add.md)
- [{#T}](./department-update.md)
- [{#T}](./department-get.md)
- [{#T}](./department-fields.md)
