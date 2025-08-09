# Обновить услугу службы доставки sale.delivery.extra.service.update

> Scope: [`sale, delivery`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод обновляет услугу службы доставки.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`sale_delivery_extra_service.ID`](../../data-types.md) | Идентификатор услуги.

Получить идентификаторы услуг службы доставки можно с помощью метода [sale.delivery.extra.service.get](./sale-delivery-extra-service-get.md)
||
|| **NAME**
[`string`](../../../data-types.md) | Название услуги ||
|| **ACTIVE**
[`string`](../../../data-types.md) | Индикатор активности услуги. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **CODE**
[`string`](../../../data-types.md) | Символьный код услуги ||
|| **SORT**
[`integer`](../../../data-types.md) | Сортировка ||
|| **DESCRIPTION**
[`string`](../../../data-types.md) | Описание услуги ||
|| **PRICE**
[`double`](../../../data-types.md) | Стоимость услуги в валюте службы доставки.

Поле актуально только для услуг типа `единичная услуга (checkbox)` и `количественная услуга (quantity)`
||
|| **ITEMS**
[`object[]`](../../../data-types.md) | Список доступных для выбора опций (подробное описание приведено [ниже](#parametr-items)).

Поле актуально только для услуг типа `список (enum)`
||
|#

### Параметр ITEMS

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE***
[`string`](../../../data-types.md) | Название опции списка ||
|| **CODE***
[`string`](../../../data-types.md) | Символьный код опции списка ||
|| **PRICE**
[`double`](../../../data-types.md) | Стоимость услуги при выборе данной опции в валюте службы доставки ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Обновление услуги с типом `Количественная услуга`:

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":128,"ACTIVE":"N","CODE":"door_delivery","NAME":"Door Delivery New Name","DESCRIPTION":"Door Delivery New Description","SORT":200,"PRICE":399.99}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.delivery.extra.service.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":128,"ACTIVE":"N","CODE":"door_delivery","NAME":"Door Delivery New Name","DESCRIPTION":"Door Delivery New Description","SORT":200,"PRICE":399.99,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.delivery.extra.service.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.delivery.extra.service.update', {
    			ID: 128,
    			ACTIVE: "N",
    			CODE: "door_delivery",
    			NAME: "Door Delivery New Name",
    			DESCRIPTION: "Door Delivery New Description",
    			SORT: 200,
    			PRICE: 399.99,
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
                'sale.delivery.extra.service.update',
                [
                    'ID'          => 128,
                    'ACTIVE'      => "N",
                    'CODE'        => "door_delivery",
                    'NAME'        => "Door Delivery New Name",
                    'DESCRIPTION' => "Door Delivery New Description",
                    'SORT'        => 200,
                    'PRICE'       => 399.99,
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
        echo 'Error updating delivery service: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.delivery.extra.service.update', {
            ID: 128,
            ACTIVE: "N",
            CODE: "door_delivery",
            NAME: "Door Delivery New Name",
            DESCRIPTION: "Door Delivery New Description",
            SORT: 200,
            PRICE: 399.99,
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
        'sale.delivery.extra.service.update',
        [
            'ID' => 128,
            'ACTIVE' => "N",
            'CODE' => "door_delivery",
            'NAME' => "Door Delivery New Name",
            'DESCRIPTION' => "Door Delivery New Description",
            'SORT' => 200,
            'PRICE' => 399.99,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Обновление услуги с типом `Список`:

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":129,"ACTIVE":"N","CODE":"cargo_type","NAME":"Cargo Type New Name","DESCRIPTION":"Cargo Type New Description","TYPE":"enum","SORT":500,"ITEMS":[{"TITLE":"Small Package(s)","CODE":"small_package","PRICE":129.99},{"TITLE":"Documents","CODE":"documents","PRICE":69.99},{"TITLE":"Large Package(s)","CODE":"large_package","PRICE":1290.99}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.delivery.extra.service.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":129,"ACTIVE":"N","CODE":"cargo_type","NAME":"Cargo Type New Name","DESCRIPTION":"Cargo Type New Description","TYPE":"enum","SORT":500,"ITEMS":[{"TITLE":"Small Package(s)","CODE":"small_package","PRICE":129.99},{"TITLE":"Documents","CODE":"documents","PRICE":69.99},{"TITLE":"Large Package(s)","CODE":"large_package","PRICE":1290.99}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.delivery.extra.service.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.delivery.extra.service.update', {
    			ID: 129,
    			ACTIVE: "N",
    			CODE: "cargo_type",
    			NAME: "Cargo Type New Name",
    			DESCRIPTION: "Cargo Type New Description",
    			TYPE: "enum",
    			SORT: 500,
    			ITEMS: [{
    					TITLE: "Small Package(s)",
    					CODE: "small_package",
    					PRICE: 129.99,
    				},
    				{
    					TITLE: "Documents",
    					CODE: "documents",
    					PRICE: 69.99,
    				},
    				{
    					TITLE: "Large Package(s)",
    					CODE: "large_package",
    					PRICE: 1290.99,
    				},
    			],
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
                'sale.delivery.extra.service.update',
                [
                    'ID'          => 129,
                    'ACTIVE'      => "N",
                    'CODE'        => "cargo_type",
                    'NAME'        => "Cargo Type New Name",
                    'DESCRIPTION' => "Cargo Type New Description",
                    'TYPE'        => "enum",
                    'SORT'        => 500,
                    'ITEMS'       => [
                        [
                            'TITLE' => "Small Package(s)",
                            'CODE'  => "small_package",
                            'PRICE' => 129.99,
                        ],
                        [
                            'TITLE' => "Documents",
                            'CODE'  => "documents",
                            'PRICE' => 69.99,
                        ],
                        [
                            'TITLE' => "Large Package(s)",
                            'CODE'  => "large_package",
                            'PRICE' => 1290.99,
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating delivery extra service: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.delivery.extra.service.update', {
            ID: 129,
            ACTIVE: "N",
            CODE: "cargo_type",
            NAME: "Cargo Type New Name",
            DESCRIPTION: "Cargo Type New Description",
            TYPE: "enum",
            SORT: 500,
            ITEMS: [{
                    TITLE: "Small Package(s)",
                    CODE: "small_package",
                    PRICE: 129.99,
                },
                {
                    TITLE: "Documents",
                    CODE: "documents",
                    PRICE: 69.99,
                },
                {
                    TITLE: "Large Package(s)",
                    CODE: "large_package",
                    PRICE: 1290.99,
                },
            ],
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
        'sale.delivery.extra.service.update',
        [
            'ID' => 129,
            'ACTIVE' => "N",
            'CODE' => "cargo_type",
            'NAME' => "Cargo Type New Name",
            'DESCRIPTION' => "Cargo Type New Description",
            'TYPE' => "enum",
            'SORT' => 500,
            'ITEMS' => [
                [
                    'TITLE' => "Small Package(s)",
                    'CODE' => "small_package",
                    'PRICE' => 129.99,
                ],
                [
                    'TITLE' => "Documents",
                    'CODE' => "documents",
                    'PRICE' => 69.99,
                ],
                [
                    'TITLE' => "Large Package(s)",
                    'CODE' => "large_package",
                    'PRICE' => 1290.99,
                ],
            ]
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
[`boolean`](../../../data-types.md) | Результат обновления услуги ||
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
|| `ERROR_CHECK_FAILURE` | Ошибка валидации входящих параметров (детали в описании ошибки) | `400` || 
|| `ERROR_EXTRA_SERVICE_UPDATE` | Ошибка при попытке обновления услуги | `400` || 
|| `ERROR_EXTRA_SERVICE_NOT_FOUND` | Услуга с указанным идентификатором (ID) не найдена | `400` ||
|| `ACCESS_DENIED` | Недостаточно прав для добавления услуги | `403` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-delivery-extra-service-add.md)
- [{#T}](./sale-delivery-extra-service-get.md)
- [{#T}](./sale-delivery-extra-service-delete.md)