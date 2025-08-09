# Удалить связь реквизита с объектом crm.requisite.link.unregister

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод удаляет связь реквизитов с объектом.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`](../../../data-types.md) | Идентификатор типа объекта, к которому относится связь.

Могут использоваться следующие типы:
- сделка (значение `2`)
- старый счет (значение `5`)
- предложение (значение `7`)
- новый счет (значение `31`)
- другие динамические объекты (для получения возможных значений смотрите метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md)).

Идентификаторы типов объектов CRM можно получить с помощью метода [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md) 
||
|| **entityId***
[`integer`](../../../data-types.md) | Идентификатор объекта, к которому относится связь. 

Идентификаторы объектов можно получить с помощью следующих методов: [crm.deal.list](../../deals/crm-deal-list.md), [crm.quote.list](../../quote/crm-quote-list.md), [crm.item.list](../../universal/crm-item-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":31,"entityId":315}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.link.unregister
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":31,"entityId":315,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.link.unregister
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.requisite.link.unregister", {
    			entityTypeId: 31,
    			entityId: 315
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
                'crm.requisite.link.unregister',
                [
                    'entityTypeId' => 31,
                    'entityId'     => 315,
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
        echo 'Error unregistering requisite link: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.requisite.link.unregister", {
            entityTypeId: 31,
            entityId: 315
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
        'crm.requisite.link.unregister',
        [
            'entityTypeId' => 31,
            'entityId' => 315
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
        "start": 1718797597.015625,
        "finish": 1718797598.098317,
        "duration": 1.0826919078826904,
        "processing": 0.13887691497802734,
        "date_start": "2024-06-19T13:46:37+02:00",
        "date_finish": "2024-06-19T13:46:38+02:00",
        "operating": 0.1388249397277832
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат удаления связи:
- `true` — связь удалена
- `false` — связь не удалена
||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **40x**, **50x**

```json
{
    "error": "",
    "error_description": "entityId is not defined or invalid."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|  
|| **Код** | **Описание** ||
|| `entityTypeId is not defined or invalid` | Идентификатор типа объекта не задан или имеет недопустимое значение ||
|| `entityId is not defined or invalid` | Идентификатор объекта не задан или имеет недопустимое значение ||
|| `Access denied` | Недостаточно прав доступа для удаления связи реквизита ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-link-register.md)
- [{#T}](./crm-requisite-link-get.md)
- [{#T}](./crm-requisite-link-list.md)
- [{#T}](./crm-requisite-link-fields.md)
