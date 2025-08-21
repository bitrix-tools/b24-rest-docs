# Определить текущий режим работы CRM crm.settings.mode.get

> Название метода: **crm.settings.mode.get**
>
> Scope: [`crm`](../scopes/permissions.md)
>
> Кто может выполнять метод: `любой пользователь`

Метод возвращает текущие настройки режима работы CRM: **классический режим CRM** (с лидами) или **простой режим CRM** (без лидов).

Этот режим влияет на целый ряд сценариев работы CRM и для лучшего понимания мы рекомендуем прочитать [соответствующую статью](https://helpdesk.bitrix24.ru/open/17611420/) пользовательской документации.

## Параметры метода

Метод вызывается без параметров.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.settings.mode.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.settings.mode.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.settings.mode.get',
    		{}
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
                'crm.settings.mode.get',
                []
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
        echo 'Error getting CRM settings mode: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod("crm.settings.mode.get", {}, result => {
        if (result.error())
            console.error(result.error());
        else
            console.dir(result.data());
    });
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.settings.mode.get',
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
    "result": 1,
    "time": {
        "start": 1715091541.642592,
        "finish": 1715091541.730599,
        "duration": 0.08800697326660156,
        "date_start": "2024-05-03T17:19:01+03:00",
        "date_finish": "2024-05-03T17:19:01+03:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../data-types.md) | Возвращает значение, определённое в [crm.enum.settings.mode](./auxiliary/enum/crm-enum-settings-mode.md) ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}
