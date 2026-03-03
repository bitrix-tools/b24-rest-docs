# Удалить промпт ai.prompt.unregister

{% note alert %}

В настощее время, метод не реализован и возвращает ошибку "To register the prompt, use the web interface."

{% endnote %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`ai_admin`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `ai.prompt.unregister` удаляет промпт.

## Параметры метода

#|
|| **Параметр** | **Описание** ||
|| **code^*^**
[`string`](../../data-types.md) | Уникальный код промпта. Всегда имеет префикс `rest_`. Этот код задается один раз при регистрации и затем изменить его нельзя ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- cURL (Webhook)

     ```bash
    curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"code": "rest_joke_wolf", "auth": "**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/ai.prompt.unregister
    ```

- cURL (OAuth)

     ```bash
    curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"code": "rest_joke_wolf"}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/ai.prompt.unregister
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'ai.prompt.unregister',
    		{
    			code: 'rest_joke_wolf'
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
            ->call(
                'ai.prompt.unregister',
                [
                    'code' => 'rest_joke_wolf'
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
        echo 'Error unregistering AI prompt: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'ai.prompt.unregister',
        {
            code: 'rest_joke_wolf'
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

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'ai.prompt.unregister',
        [
            'code' => 'rest_joke_wolf',
        ]
    );

    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

{% note alert %}

В настощее время, метод не реализован и возвращает ошибку PROMPT_NOT_REGISTER_BY_REST

{% endnote %}

## Ответ в случае ошибки

```
{
    "error": "PROMPT_NOT_REGISTER_BY_REST",
    "error_description": "To register the prompt, use the web interface."
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `PROMPT_NOT_REGISTER_BY_REST` | To register the prompt, use the web interface. ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}


## Частые кейсы и сценарии

- [{#T}](../../../tutorials/ai/add-joke-prompt.md)