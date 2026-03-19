# Удалить сервис ai.engine.unregister

> Scope: [`ai_admin`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод для удаления [сервиса AI](./ai-engine-register.md).

#|
|| **Параметры** | **Описание** ||
|| **code***
[`string`](../data-types.md) | Код сервиса ||
|#

## Примеры

{% list tabs %}

- Curl (WebHook)
    ```bash
    curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"code": "ivanov_gpt"}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/ai.engine.unregister

    ```

- Curl (OAuth)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"code": "ivanov_gpt", "auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/ai.engine.unregister
    ```

- JS
    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'ai.engine.unregister',
    		{
    			code: 'ivanov_gpt',
    		}
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
            ->call('ai.engine.unregister', [
                'code' => 'ivanov_gpt',
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
        echo 'Error unregistering AI engine: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'ai.engine.unregister',
        {
            code: 'ivanov_gpt',
        },
        function(result)
        {
            if(result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}


## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1772389915,
        "finish": 1772389915.064604,
        "duration": 0.06460404396057129,
        "processing": 0,
        "date_start": "2026-03-01T21:31:55+03:00",
        "date_finish": "2026-03-01T21:31:55+03:00",
        "operating_reset_at": 1772390515,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | `true`, в случае успешного удаления ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **200**

```json
{
    "result": false,
    "time": {
        "start": 1772389877,
        "finish": 1772389877.772992,
        "duration": 0.7729918956756592,
        "processing": 0,
        "date_start": "2026-03-01T21:31:17+03:00",
        "date_finish": "2026-03-01T21:31:17+03:00",
        "operating_reset_at": 1772390477,
        "operating": 0
    }
}
```

{% include [системные ошибки](../../_includes/system-errors.md) %}
