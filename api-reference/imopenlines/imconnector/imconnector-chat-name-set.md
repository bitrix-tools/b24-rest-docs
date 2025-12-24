# Установить новое имя чата imconnector.chat.name.set

> Scope: [`imconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод устанавливает новое имя чата.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONNECTOR***
[`string`](../../data-types.md) | Идентификатор коннектора ||
|| **LINE***
[`string`](../../data-types.md) | Идентификатор открытой линии ||
|| **CHAT_ID***
[`string`](../../data-types.md) | Идентификатор чата во внешней системе ||
|| **NAME***
[`string`](../../data-types.md) | Новое имя чата ||
|| **USER_ID**
[`string`](../../data-types.md) | Идентификатор пользователя. Параметр является обязательным только для коннекторов без групповых чатов с внешней стороны. У такого коннектора в методе [imconnector.register](./imconnector-register.md) параметр `CHAT_GROUP` должен быть равен `N` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CONNECTOR":"connector","LINE":"105","CHAT_ID":"47e007b1-ee15-43db-bcba-1c26e5884d3f","NAME":"Новое имя диалога"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/imconnector.chat.name.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CONNECTOR":"connector","LINE":"105","CHAT_ID":"47e007b1-ee15-43db-bcba-1c26e5884d3f","NAME":"Новое имя диалога","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/imconnector.chat.name.set
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'imconnector.chat.name.set',
    		{
    			CONNECTOR: 'connector',
    			LINE: '105',
    			CHAT_ID: '47e007b1-ee15-43db-bcba-1c26e5884d3f',
    			NAME: 'Новое имя диалога'
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    		alert("Error: " + result.error());
    	else
    		alert("Успешно: " + result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $params = [
            'CONNECTOR' => 'connector',
            'LINE'      => '105',
            'CHAT_ID'   => '47e007b1-ee15-43db-bcba-1c26e5884d3f',
            'NAME'      => 'Новое имя диалога',
        ];
    
        $response = $b24Service
            ->core
            ->call(
                'imconnector.chat.name.set',
                $params
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Успешно: ' . $result->data();
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting chat name: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var params = {
        CONNECTOR: 'connector',
        LINE: '105',
        CHAT_ID: '47e007b1-ee15-43db-bcba-1c26e5884d3f',
        NAME: 'Новое имя диалога'
    };
    BX24.callMethod(
        'imconnector.chat.name.set',
        params,
        function(result)
        {
            if(result.error())
                alert("Error: " + result.error());
            else
                alert("Успешно: " + result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $params = [
        'CONNECTOR' => 'connector',
        'LINE' => '105',
        'CHAT_ID' => '47e007b1-ee15-43db-bcba-1c26e5884d3f',
        'NAME' => 'Новое имя диалога'
    ];

    $result = CRest::call(
        'imconnector.chat.name.set',
        $params
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
    "answer": {
        "result": {
            "SUCCESS": true,
            "DATA": {
                "RESULT": {}
            }
        },
        "time": {
            "start": 1732110908.525962,
            "finish": 1732110908.879113,
            "duration": 0.3531508445739746,
            "processing": 0.07694888114929199,
            "date_start": "2024-11-20T15:55:08+02:00",
            "date_finish": "2024-11-20T15:55:08+02:00"
        }
    },
    "query": {
        "method": "imconnector.chat.name.set",
        "data": {
            "CONNECTOR": "newcustomconnector",
            "LINE": "105",
            "CHAT_ID": "1",
            "NAME": "name"
        }
    },
    "status": 200
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **SUCCESS**
[`boolean`](../../data-types.md) | Возвращает `true` при успешной установке нового имени чата ||
|| **DATA**
[`object`](../../data-types.md) | Содержит объект `RESULT` c параметрами нового имени чата ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_ACTIVE_LINE",
    "error_description": "Линия c таким ID неактивна или не существует"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `NOT_ACTIVE_LINE` | Линия c таким ID неактивна или не существует ||
|| `IMCONNECTOR_NO_CORRECT_PROVIDER` | Не удалось найти подходящий провайдер для коннектора ||
|| `ERROR_ARGUMENT` | Не указаны обязательные параметры `NAME`, `CHAT_ID`, `USER_ID`, `CONNECTOR` или `LINE` ||
|| `CHAT_RENAMING_FAILED` | Не удалось переименовать чат ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tutorials.md)
- [{#T}](./imconnector-register.md)
- [{#T}](./imconnector-activate.md)
- [{#T}](./imconnector-status.md)
- [{#T}](./imconnector-connector-data-set.md)
- [{#T}](./imconnector-list.md)
- [{#T}](./imconnector-unregister.md)
- [{#T}](./imconnector-send-messages.md)
- [{#T}](./imconnector-update-messages.md)
- [{#T}](./imconnector-delete-messages.md)
- [{#T}](./imconnector-send-status-delivery.md)
- [{#T}](./imconnector-send-status-reading.md)
