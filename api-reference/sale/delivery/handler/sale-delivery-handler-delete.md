# Удалить обработчик службы доставки sale.delivery.handler.delete

> Scope: [`sale`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM

Метод удаляет обработчик службы доставки. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`sale_delivery_handler.ID`](../../data-types.md) | Идентификатор обработчика службы доставки   ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":14}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.delivery.handler.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":14,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.delivery.handler.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.delivery.handler.delete', {
    			ID: 14,
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
                'sale.delivery.handler.delete',
                [
                    'ID' => 14,
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
        echo 'Error deleting delivery handler: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.delivery.handler.delete', {
            ID: 14,
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
        'sale.delivery.handler.delete',
        [
            'ID' => 14
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
      "start":1713859948.030196,
      "finish":1713859948.315044,
      "duration":0.2848479747772217,
      "processing":0.027885913848876953,
      "date_start":"2024-04-23T11:12:28+03:00",
      "date_finish":"2024-04-23T11:12:28+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат удаления обработчика службы доставки ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
   "error":"ERROR_HANDLER_NOT_FOUND",
   "error_description":"Handler not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `ERROR_HANDLER_NOT_FOUND` | Обработчик службы доставки с указанным идентификатором (ID) не найден | 400 ||
|| `ERROR_CHECK_FAILURE` | Ошибка валидации входящих параметров (детали в описании ошибки) | 400 ||
|| `ERROR_HANDLER_DELETE` | Ошибка при попытке удаления обработчика службы доставки | 400 ||
|| `ACCESS_DENIED` | Недостаточно прав для удаления обработчика службы доставки | 403 ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-delivery-handler-add.md)
- [{#T}](./sale-delivery-handler-update.md)
- [{#T}](./sale-delivery-handler-list.md)