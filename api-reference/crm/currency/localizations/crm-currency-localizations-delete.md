# Удалить локализации валюты crm.currency.localizations.delete

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к изменению настроек CRM

Метод удаляет локализации валюты для указанных языков.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
||  **Название**
`тип`| **Описание** ||
|| **id***
[`string`](../../../data-types.md) | Идентификатор валюты.

Соответствует стандарту ISO 4217.

Идентификатор можно получить методом [crm.currency.list](../crm-currency-list.md)
 ||
|| **lids***
[`array`](../../../data-types.md) | Массив идентификаторов языков, для которых нужно удалить локализации ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":5}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.automatedsolution.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":5,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.automatedsolution.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.currency.localizations.delete",
    		{
    			id: 'CLF',
    			lids: [
    				'en',
    				'de'
    			]
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
                'crm.currency.localizations.delete',
                [
                    'id'   => 'CLF',
                    'lids' => [
                        'en',
                        'de'
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting currency localizations: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.currency.localizations.delete",
        {
            id: 'CLF',
            lids: [
                'en',
                'de'
            ]
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
        'crm.automatedsolution.delete',
        [
            'id' => 5
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
        "start": 1718117124.923431,
        "finish": 1718117125.511803,
        "duration": 0.588371992111206,
        "processing": 0.043914079666137695,
        "date_start": "2024-06-11T16:45:24+02:00",
        "date_finish": "2024-06-11T16:45:25+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Возвращает:
- `true` — в случае успеха
- `false` — в случае, когда операцию выполнить не удалось, но ошибки нет, либо ситуация не считается ошибочной. Возможные причины:
  - отсутствует модуль валют
  - передан пустой массив в параметре `lids`
  - не была удалена ни одна локализация
 ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "The parameter id is invalid or not defined."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| Пустая строка | Access denied. | Недостаточно прав доступа ||
|| Пустая строка | The parameter id is invalid or not defined | Пустой идентификатор валюты ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-currency-localizations-get.md)
- [{#T}](./crm-currency-localizations-set.md)
- [{#T}](./crm-currency-localizations-fields.md)
