# Получить список зарегистрированных обработчиков мест встраивания placement.get

> Scope: [`placement`, `в зависимости от места встройки`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод для получения списка зарегистрированных обработчиков мест встраивания виджетов.

## Параметры метода

Метод не имеет параметров

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/placement.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/placement.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"placement.get",
    		{}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
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
                'placement.get',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Info: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting placements: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
 	BX24.callMethod(
        "placement.get",
        {},
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'placement.get',
        []
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
            "placement": "CRM_DEAL_LIST_TOOLBAR",
            "userId": 0,
            "handler": "https://myapp.com/?handler=1",
            "options": [],
            "title": "Add invoice",
            "description": "",
            "langAll": {
                "ru": {
                    "TITLE": "Add invoice",
                    "DESCRIPTION": "",
                    "GROUP_NAME": "Documents"
                }
            }
        },
        {
            "placement": "CRM_DEAL_LIST_TOOLBAR",
            "userId": 0,
            "handler": "https://myapp.com/?handler=1",
            "options": [],
            "title": "Import invoice",
            "description": "",
            "langAll": {
                "ru": {
                    "TITLE": "Import invoice",
                    "DESCRIPTION": "",
                    "GROUP_NAME": "Documents"
                }
            }
        },
        {
            "placement": "IM_CONTEXT_MENU",
            "userId": 0,
            "handler": "https://myapp.com/?handler=2",
            "options": {
                "extranet": "N",
                "context": "ALL",
                "role": "USER"
            },
            "title": "My App 1",
            "description": "",
            "langAll": {
                "ru": {
                    "TITLE": "My App 1",
                    "DESCRIPTION": "",
                    "GROUP_NAME": ""
                }
            }
        },
        {
            "placement": "PAGE_BACKGROUND_WORKER",
            "userId": 1,
            "handler": "https://myapp.com/?handler=3",
            "options": {
                "errorHandlerUrl": "https://myapp.com/?handler=3"
            },
            "title": "My App 2",
            "description": "",
            "langAll": {
                "ru": {
                    "TITLE": "My App 2",
                    "DESCRIPTION": "",
                    "GROUP_NAME": ""
                }
            }
        },
    ],
    "time": {
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | Возвращает список зарегистрированных обработчиков виджетов. Структура каждого элемента соответствует параметрам метода [регистрации обработчика](./placement-bind.md#params)

||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**, **200**

```json
{
    "error": "INVALID_REQUEST",
    "error_description": "Https required",
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./placements.md)
- [{#T}](./placement-list.md)
- [{#T}](./placement-bind.md)
- [{#T}](./placement-unbind.md)
- [{#T}](./ui-interaction/index.md)
