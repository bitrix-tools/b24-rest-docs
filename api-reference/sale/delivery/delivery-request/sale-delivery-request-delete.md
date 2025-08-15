# Удалить транспортную заявку sale.delivery.request.delete

> Scope: [`sale, delivery`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод удаляет транспортную заявку.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **DELIVERY_ID***
[`sale_delivery_service.ID`](../../data-types.md) | Идентификатор службы доставки, к которой относится транспортная заявка.

Получить идентификаторы `sale_delivery_service.ID` служб доставки можно с помощью метода [sale.delivery.getlist](../delivery/sale-delivery-get-list.md)
||
|| **REQUEST_ID***
[`string`](../../../data-types.md) | Идентификатор транспортной заявки.

Идентификатор назначается внешней системой в ответе вебхука на создание заказа на доставку (подробнее в описании вебхука [Создание заказа на доставку](../webhooks/create-delivery-request.md))
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DELIVERY_ID":225,"REQUEST_ID":"4757aca4931a4f029f49c0db4374d13d"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.delivery.request.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DELIVERY_ID":225,"REQUEST_ID":"4757aca4931a4f029f49c0db4374d13d","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.delivery.request.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.delivery.request.delete', {
    			DELIVERY_ID: 225,
    			REQUEST_ID: "4757aca4931a4f029f49c0db4374d13d",
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
                'sale.delivery.request.delete',
                [
                    'DELIVERY_ID' => 225,
                    'REQUEST_ID'  => "4757aca4931a4f029f49c0db4374d13d",
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
        echo 'Error deleting delivery request: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.delivery.request.delete', {
            DELIVERY_ID: 225,
            REQUEST_ID: "4757aca4931a4f029f49c0db4374d13d",
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.delivery.request.delete',
        [
            'DELIVERY_ID' => 225,
            'REQUEST_ID' => "4757aca4931a4f029f49c0db4374d13d"
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
    "result":true,
    "time":{
        "start":1714549724.272976,
        "finish":1714549724.479944,
        "duration":0.20696806907653809,
        "processing":0.02615499496459961,
        "date_start":"2024-05-01T10:48:44+03:00",
        "date_finish":"2024-05-01T10:48:44+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат удаления транспортной заявки ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error":"DELIVERY_NOT_FOUND",
    "error_description":"Delivery service has not been found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `DELIVERY_ID_NOT_SPECIFIED` | Не указан идентификатор службы доставки | `400` || 
|| `DELIVERY_NOT_FOUND` | Служба доставки не найдена | `400` || 
|| `REQUEST_ID_NOT_SPECIFIED` | Не указан идентификатор транспортной заявки | `400` ||
|| `REQUEST_NOT_FOUND` | Транспортная заявка не найдена | `400` ||
|| `DELETE_REQUEST_INTERNAL_ERROR` | Ошибка при попытке удаления транспортной заявки | `400` ||
|| `ACCESS_DENIED` | Недостаточно прав для добавления службы доставки | `403` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-delivery-request-update.md)
- [{#T}](./sale-delivery-request-send-message.md)