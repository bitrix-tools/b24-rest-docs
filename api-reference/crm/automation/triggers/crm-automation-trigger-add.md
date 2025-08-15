# Добавить триггер crm.automation.trigger.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор с доступом к CRM в контексте приложения 

Метод добавляет триггер.

Запускать метод можно только в контексте приложения, так как добавленные триггеры привязываются к этому приложению. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CODE***
[`string`](../../../data-types.md) | Внутренний уникальный (в рамках приложения) идентификатор триггера. Должен соответствовать маске `[a-z0-9\.\-_]`.

Если передать уже существующий идентификатор триггера `CODE`, то произойдет обновление названия триггера `NAME` ||
|| **NAME***
[`string`](../../../data-types.md) | Название триггера ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CODE":"c5u4m","NAME":"trigger name"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.automation.trigger.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CODE":"c5u4m","NAME":"trigger name","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.automation.trigger.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.automation.trigger.add',
    		{
    			"CODE": 'c5u4m',
    			"NAME": 'trigger name'
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
                'crm.automation.trigger.add',
                [
                    'CODE' => 'c5u4m',
                    'NAME' => 'trigger name',
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
        echo 'Error adding automation trigger: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.automation.trigger.add',
        {
            "CODE": 'c5u4m',
            "NAME": 'trigger name'
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
        'crm.automation.trigger.add',
        [
            'CODE' => 'c5u4m',
            'NAME' => 'trigger name'
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
        "start":1718884406.366687,
        "finish":1718884406.80718,
        "duration":0.4404928684234619,
        "processing":0.03356289863586426,
        "date_start":"2024-06-20T11:53:26+00:00",
        "date_finish":"2024-06-20T11:53:26+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Возвращает `true` в случае успешного добавления триггера ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ACCESS_DENIED",
    "error_description":"Access denied! Application context required"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| Пустая строка | Access denied. | Пользователь не прошёл предварительную проверку прав на доступ к CRM ||
|| ACCESS_DENIED | Access denied! Admin permissions required | Не пройдена проверка прав на администратора ||
|| ACCESS_DENIED | Access denied! Application context required | Метод вызван вне контекста приложения ||
|| Пустая строка | Empty trigger code! | Пустой параметр `CODE` ||
|| Пустая строка | Wrong trigger code! | Параметр `CODE` не удовлетворяет маске `[a-z0-9\.\-_]` ||
|| Пустая строка | Empty trigger name! | Пустой параметр `NAME` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-automation-trigger-execute.md)
- [{#T}](./crm-automation-trigger-list.md)
- [{#T}](./crm-automation-trigger-delete.md)
