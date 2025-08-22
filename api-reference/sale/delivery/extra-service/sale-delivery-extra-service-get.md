# Получить информацию обо всех услугах конкретной службы доставки sale.delivery.extra.service.get

> Scope: [`sale, delivery`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод получает информацию обо всех услугах конкретной службы доставки.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **DELIVERY_ID***
[`sale_delivery_service.ID`](../../data-types.md) | Идентификатор службы доставки ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DELIVERY_ID":198}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.delivery.extra.service.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DELIVERY_ID":198,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.delivery.extra.service.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.delivery.extra.service.get', {
    			DELIVERY_ID: 198,
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
                'sale.delivery.extra.service.get',
                [
                    'DELIVERY_ID' => 198,
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
        echo 'Error getting extra service for delivery: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.delivery.extra.service.get', {
            DELIVERY_ID: 198,
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
        'sale.delivery.extra.service.get',
        [
            'DELIVERY_ID' => 198,
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
   "result":[
      {
         "ID":"136",
         "CODE":"door_delivery",
         "NAME":"Door Delivery",
         "DESCRIPTION":"Door Delivery Description",
         "ACTIVE":"Y",
         "SORT":"100",
         "TYPE":"checkbox",
         "PRICE":99.99
      },
      {
         "ID":"129",
         "CODE":"cargo_type",
         "NAME":"Cargo Type",
         "DESCRIPTION":"Cargo Type",
         "ACTIVE":"Y",
         "SORT":"200",
         "TYPE":"enum",
         "ITEMS":[
            {
               "TITLE":"Documents",
               "CODE":null,
               "PRICE":"69.99"
            },
            {
               "TITLE":"Small Package(s)",
               "CODE":null,
               "PRICE":"129.99"
            },
            {
               "TITLE":"Large Package(s)",
               "CODE":null,
               "PRICE":"199.99"
            }
         ]
      }
   ],
   "time":{
      "start":1714551728.295288,
      "finish":1714551728.519896,
      "duration":0.2246079444885254,
      "processing":0.01918506622314453,
      "date_start":"2024-05-01T11:22:08+03:00",
      "date_finish":"2024-05-01T11:22:08+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`sale_delivery_extra_service[]`](../../data-types.md) | Список всех услуг службы доставки ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error":"ERROR_DELIVERY_NOT_FOUND",
    "error_description":"Delivery not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `ERROR_DELIVERY_NOT_FOUND` | Служба доставки с указанным идентификатором не найдена | `400` || 
|| `ERROR_CHECK_FAILURE` | Ошибка валидации входящих параметров (детали в описании ошибки) | `400` || 
|| `ACCESS_DENIED` | Недостаточно прав для получения списка услуг | `403` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-delivery-extra-service-add.md)
- [{#T}](./sale-delivery-extra-service-update.md)
- [{#T}](./sale-delivery-extra-service-delete.md)