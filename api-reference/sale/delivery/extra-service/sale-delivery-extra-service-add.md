# Добавить услугу службы доставки sale.delivery.extra.service.add

> Scope: [`sale, delivery`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод добавляет услугу службы доставки.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **DELIVERY_ID***
[`sale_delivery_service.ID`](../../data-types.md) | Идентификатор службы доставки, к которой будет привязана создаваемая услуга.

Получить идентификаторы служб доставки можно с помощью метода [sale.delivery.getlist](../delivery/sale-delivery-get-list.md)
||
|| **TYPE***
[`string`](../../../data-types.md) | Тип услуги. Возможные значения:
- `enum` — список (выбор опции из заранее сформированного списка)
- `checkbox` — единичная услуга (например, доставка до двери)
- `quantity` — количественная услуга (например, требуемое количество грузчиков)
||
|| **NAME***
[`string`](../../../data-types.md) | Название услуги ||
|| **ACTIVE**
[`string`](../../../data-types.md) | Индикатор активности услуги. Возможные значения:
- `Y` — да
- `N` — нет

Если значение не передано, то по умолчанию используется `N`
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
|| **ITEMS***
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

Добавление услуги с типом `Количественная услуга`:

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DELIVERY_ID":197,"ACTIVE":"Y","CODE":"door_delivery","NAME":"Door Delivery","DESCRIPTION":"Door Delivery Description","TYPE":"checkbox","SORT":100,"PRICE":99.99}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.delivery.extra.service.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DELIVERY_ID":197,"ACTIVE":"Y","CODE":"door_delivery","NAME":"Door Delivery","DESCRIPTION":"Door Delivery Description","TYPE":"checkbox","SORT":100,"PRICE":99.99,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.delivery.extra.service.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.delivery.extra.service.add', {
    			DELIVERY_ID: 197,
    			ACTIVE: "Y",
    			CODE: "door_delivery",
    			NAME: "Door Delivery",
    			DESCRIPTION: "Door Delivery Description",
    			TYPE: "checkbox",
    			SORT: 100,
    			PRICE: 99.99,
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
                'sale.delivery.extra.service.add',
                [
                    'DELIVERY_ID'  => 197,
                    'ACTIVE'       => "Y",
                    'CODE'         => "door_delivery",
                    'NAME'         => "Door Delivery",
                    'DESCRIPTION'  => "Door Delivery Description",
                    'TYPE'         => "checkbox",
                    'SORT'         => 100,
                    'PRICE'        => 99.99,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding extra service: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.delivery.extra.service.add', {
            DELIVERY_ID: 197,
            ACTIVE: "Y",
            CODE: "door_delivery",
            NAME: "Door Delivery",
            DESCRIPTION: "Door Delivery Description",
            TYPE: "checkbox",
            SORT: 100,
            PRICE: 99.99,
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

    $params = [
        'DELIVERY_ID' => 197,
        'ACTIVE' => 'Y',
        'CODE' => 'door_delivery',
        'NAME' => 'Door Delivery',
        'DESCRIPTION' => 'Door Delivery Description',
        'TYPE' => 'checkbox',
        'SORT' => 100,
        'PRICE' => 99.99
    ];

    $result = CRest::call(
        'sale.delivery.extra.service.add',
        $params
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Добавление услуги с типом `Список`:

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DELIVERY_ID":198,"ACTIVE":"Y","CODE":"cargo_type","NAME":"Cargo Type","DESCRIPTION":"Cargo Type Description","TYPE":"enum","SORT":100,"ITEMS":[{"TITLE":"Small Package(s)","CODE":"small_package","PRICE":129.99},{"TITLE":"Documents","CODE":"documents","PRICE":69.99}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.delivery.extra.service.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DELIVERY_ID":198,"ACTIVE":"Y","CODE":"cargo_type","NAME":"Cargo Type","DESCRIPTION":"Cargo Type Description","TYPE":"enum","SORT":100,"ITEMS":[{"TITLE":"Small Package(s)","CODE":"small_package","PRICE":129.99},{"TITLE":"Documents","CODE":"documents","PRICE":69.99}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.delivery.extra.service.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.delivery.extra.service.add', {
    			DELIVERY_ID: 198,
    			ACTIVE: "Y",
    			CODE: "cargo_type",
    			NAME: "Cargo Type",
    			DESCRIPTION: "Cargo Type Description",
    			TYPE: "enum",
    			SORT: 100,
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
                'sale.delivery.extra.service.add',
                [
                    'DELIVERY_ID'  => 198,
                    'ACTIVE'       => "Y",
                    'CODE'         => "cargo_type",
                    'NAME'         => "Cargo Type",
                    'DESCRIPTION'  => "Cargo Type Description",
                    'TYPE'         => "enum",
                    'SORT'         => 100,
                    'ITEMS'        => [
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
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding extra service: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.delivery.extra.service.add', {
            DELIVERY_ID: 198,
            ACTIVE: "Y",
            CODE: "cargo_type",
            NAME: "Cargo Type",
            DESCRIPTION: "Cargo Type Description",
            TYPE: "enum",
            SORT: 100,
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
        'sale.delivery.extra.service.add',
        [
            'DELIVERY_ID' => 198,
            'ACTIVE' => "Y",
            'CODE' => "cargo_type",
            'NAME' => "Cargo Type",
            'DESCRIPTION' => "Cargo Type Description",
            'TYPE' => "enum",
            'SORT' => 100,
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
    "result": 128,
    "time": {
        "start": 1714204589.717545,
        "finish": 1714204589.95374,
        "duration": 0.23619484901428223,
        "processing": 0.031846046447753906,
        "date_start": "2024-04-27T10:56:29+03:00",
        "date_finish": "2024-04-27T10:56:29+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`sale_delivery_extra_service.ID`](../../data-types.md) | Идентификатор добавленной услуги ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error":"ERROR_CHECK_FAILURE",
    "error_description":"Parameter DELIVERY_ID is not defined"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `ERROR_CHECK_FAILURE` | Ошибка валидации входящих параметров (детали в описании ошибки) | `400` || 
|| `ERROR_EXTRA_SERVICE_ADD` | Ошибка при попытке добавления услуги | `400` || 
|| `ERROR_DELIVERY_NOT_FOUND` | Служба доставки с указанным идентификатором не найдена | `400` ||
|| `ACCESS_DENIED` | Недостаточно прав для добавления службы доставки | `403` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-delivery-extra-service-update.md)
- [{#T}](./sale-delivery-extra-service-get.md)
- [{#T}](./sale-delivery-extra-service-delete.md)
- [{#T}](../../../../tutorials/sale/delivery-in-crm.md)