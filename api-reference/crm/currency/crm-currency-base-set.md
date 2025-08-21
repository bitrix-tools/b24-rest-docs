# Установить валюту в качестве базовой crm.currency.base.set

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к изменению настроек CRM

Метод меняет базовую валюту.

{% note warning %}

После смены базовой валюты необходимо изменить курсы остальных валют по отношению к базовой!

{% endnote %}

## Параметры метода

#|
||  **Название**
`тип`| **Описание** ||
|| **id**
[`srting`](../../data-types.md) | Идентификатор валюты, которая станет базовой.

Соответствует стандарту ISO 4217.

Идентификатор можно получить методом [crm.currency.list](./crm-currency-list.md)
 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"RUB"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.currency.base.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"RUB","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.currency.base.set
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.currency.base.set",
    		{
    			id: 'RUB'
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
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
                'crm.currency.base.set',
                [
                    'id' => 'RUB',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting base currency: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.currency.base.set",
        {
            id: 'RUB'
        },
    )
    .then(
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.log(result);
            }
        },
        function(error)
        {
            console.info(error);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.currency.base.set',
        [
            'id' => 'RUB'
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
        "start": 1718122855.747287,
        "finish": 1718122856.436222,
        "duration": 0.6889350414276123,
        "processing": 0.014606952667236328,
        "date_start": "2024-06-11T18:20:55+02:00",
        "date_finish": "2024-06-11T18:20:56+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возращает значение:

- `true` — в случае успеха
- `false` — в случае, когда операцию выполнить не удалось, но ошибки нет, либо ситуация не считается ошибочной. Возможная причина: отсутствует модуль валют
 ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** |  ||
|| Пустая строка | Access denied. | Недостаточно прав доступа ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-currency-base-get.md)