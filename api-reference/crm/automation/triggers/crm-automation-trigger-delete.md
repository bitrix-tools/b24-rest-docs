# Удалить триггер crm.automation.trigger.delete

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор с доступом к CRM в контексте приложения 

Метод удаляет триггер.

Запускать метод можно только в контексте приложения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CODE***
[`string`](../../../data-types.md) | Внутренний уникальный (в рамках приложения) идентификатор триггера. Должен соответствовать маске `[a-z0-9\.\-_]` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CODE":"c5u4m"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.automation.trigger.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CODE":"c5u4m","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.automation.trigger.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.automation.trigger.delete',
    		{
    			"CODE": 'c5u4m'
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.dir(result);
    	}
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
                'crm.automation.trigger.delete',
                [
                    'CODE' => 'c5u4m',
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
        echo 'Error deleting automation trigger: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.automation.trigger.delete',
        {
            "CODE": 'c5u4m'
        },
        function(result) 
        {
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
        'crm.automation.trigger.delete',
        [
            'CODE' => 'c5u4m'
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
    "result":true,
    "time":{
        "start":1718891973.429101,
        "finish":1718891986.721889,
        "duration":13.292788028717041,
        "processing":13.012810945510864,
        "date_start":"2024-06-20T13:59:33+00:00",
        "date_finish":"2024-06-20T13:59:46+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Вовзращает `true`, если удалено успешно ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"",
    "error_description":"Trigger not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| Пустая строка | Access denied. | Пользователь не прошел предварительную проверку прав на доступ к CRM ||
|| ACCESS_DENIED | Access denied! Admin permissions required | Не пройдена проверка прав на администратора ||
|| ACCESS_DENIED | Access denied! Application context required | Метод вызван вне контекста приложения ||
|| Пустая строка | Empty trigger code! | Пустой параметр `CODE` ||
|| Пустая строка | Wrong trigger code! | Параметр `CODE` не удовлетворяет маске `[a-z0-9\.\-_]` ||
|| Пустая строка | Trigger not found | Триггер не найден ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-automation-trigger-add.md)
- [{#T}](./crm-automation-trigger-execute.md)
- [{#T}](./crm-automation-trigger-list.md)