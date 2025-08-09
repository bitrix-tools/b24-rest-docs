# Получить типы объектов для привязки заказа crm.enum.getorderownertypes

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.enum.getorderownertypes` возвращает список типов объектов, к которым можно привязать заказ.  `id` типа объекта используйте в значении параметра `ownerTypeId` методов [crm.orderentity.*](../../universal/order-entity/crm-order-entity-add.md).

{% note info " " %}

В настоящий момент [привязку заказа](../../universal/order-entity/crm-order-entity-add.md) можно осуществить только к [сделке](../../deals/index.md).

{% endnote %}

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.enum.getorderownertypes
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"auth":"**put_access_token_here**"}' \
         https://**put_your_bitrix24_address**/rest/crm.enum.getorderownertypes
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.enum.getorderownertypes",
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
                'crm.enum.getorderownertypes',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Data: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching order owner types: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.enum.getorderownertypes",
        {},
        function(result) {
            if (result.error())
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
        'crm.enum.getorderownertypes',
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
     "attribute": "DYN",
     "code": "DEAL",
     "id": 2,
     "name": "Сделка"
    }
],
"time": {
    "start": 1750152924.723585,
    "finish": 1750152924.781251,
    "duration": 0.05766606330871582,
    "processing": 0.020370960235595703,
    "date_start": "2025-06-17T12:35:24+03:00",
    "date_finish": "2025-06-17T12:35:24+03:00",
    "operating_reset_at": 1750153524,
    "operating": 0
}
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../data-types.md) | Массив с типами объектов [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля массива result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **attribute**
[`string`](../../../data-types.md) | Атрибут типа объекта ||
|| **code**
[`string`](../../../data-types.md) | Код типа объекта ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор типа объекта ||
|| **name**
[`string`](../../../data-types.md) | Название типа объекта ||
|#

## Обработка ошибок

Метод не возвращает ошибки.

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](../../universal/order-entity/crm-order-entity-add.md)
