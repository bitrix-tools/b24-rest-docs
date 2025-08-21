# Удалить услугу службы доставки sale.delivery.extra.service.delete

> Scope: [`sale, delivery`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод удаляет услугу службы доставки.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`sale_delivery_extra_service.ID`](../../data-types.md) | Идентификатор услуги.

Получить идентификаторы услуг службы доставки можно с помощью метода [sale.delivery.extra.service.get](./sale-delivery-extra-service-get.md)
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
    -d '{"ID":134}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.delivery.extra.service.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":134,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.delivery.extra.service.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.delivery.extra.service.delete', {
    			ID: 134,
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
                'sale.delivery.extra.service.delete',
                [
                    'ID' => 134,
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
        echo 'Error deleting extra service: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.delivery.extra.service.delete', {
            ID: 134,
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
        'sale.delivery.extra.service.delete',
        [
            'ID' => 134,
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
        "start":1714551146.367727,
        "finish":1714551146.571992,
        "duration":0.20426487922668457,
        "processing":0.03886008262634277,
        "date_start":"2024-05-01T11:12:26+03:00",
        "date_finish":"2024-05-01T11:12:26+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат удаления услуги ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error":"ERROR_EXTRA_SERVICE_NOT_FOUND",
    "error_description":"Extra service not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `ERROR_EXTRA_SERVICE_NOT_FOUND` | Услуга с указанным идентификатором не найдена | `400` || 
|| `ERROR_CHECK_FAILURE` | Ошибка валидации входящих параметров (детали в описании ошибки) | `400` || 
|| `ERROR_EXTRA_SERVICE_DELETE` | Ошибка при попытке удаления услуги | `400` || 
|| `ACCESS_DENIED` | Недостаточно прав для удаления услуги | `403` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-delivery-extra-service-add.md)
- [{#T}](./sale-delivery-extra-service-update.md)
- [{#T}](./sale-delivery-extra-service-get.md)