# Добавить обработчик службы доставки sale.delivery.handler.add

> Scope: [`sale`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM

Метод добавляет обработчик службы доставки. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME***
[`string`](../../../data-types.md) | Название обработчика службы доставки ||
|| **CODE***
[`string`](../../../data-types.md) | Символьный код обработчика службы доставки ||
|| **SORT**
[`integer`](../../../data-types.md) | Сортировка ||
|| **DESCRIPTION**
[`integer`](../../../data-types.md) | Описание обработчика службы доставки ||
|| **SETTINGS***
[`object`](../../../data-types.md) | Объект, содержащий информацию о настройках обработчика службы доставки (подробное описание приведено [ниже](#parametr-settings)) ||
|| **PROFILES***
[`object[]`](../../../data-types.md) | Массив, содержащий список объектов профилей доставки (подробное описание приведено [ниже](#parametr-profiles)).

Подразумевается, что у обработчика службы доставки должен быть как минимум 1 профиль  ||
|#

### Параметр SETTINGS

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CALCULATE_URL***
[`string`](../../../data-types.md) | URL для расчёта стоимости доставки.

На данный URL приходят данные о посылке (что доставить, куда и как), стоимость доставки которой нужно рассчитать в ответе.

Формат запроса и ответа детально описан в документации по веб-хуку **Расчет стоимости доставки**
 ||
|| **CREATE_DELIVERY_REQUEST_URL**
[`string`](../../../data-types.md) | URL для создания заказа на доставку.

На данный URL приходят данные о посылке (что доставить, куда и как), заказ на которую нужно оформить в службе доставки.

Формат запроса и ответа детально описан в документации по веб-хуку **Создание заказа на доставку** ||
|| **CANCEL_DELIVERY_REQUEST_URL**
[`string`](../../../data-types.md) | URL для отмены заказа на доставку

На данный URL приходят данные о посылке (что доставить, куда и как), заказ на которую нужно отменить в службе доставки.

Формат запроса и ответа детально описан в документации по веб-хуку **Отмена заказа на доставку** ||
|| **HAS_CALLBACK_TRACKING_SUPPORT**
[`string`](../../../data-types.md) | Индикатор того, будет ли служба доставки присылать оповещения о статусе заказа на доставку (см. метод [`sale.delivery.request.sendmessage`](../delivery-request/sale-delivery-request-send-message.md)). 

В случае, если поддержка событий указана, то в интерфейсе менеджера при заказе доставки будет создано дело на доставку, в которое могут транслироваться изменения, связанные с текущим статусом доставки.

Возможные значения:
- `Y` — есть поддержка
- `N` — нет поддержки
 ||
 || **CONFIG**
[`object[]`](../../../data-types.md) | Массив объектов с доступными настройками для службы доставки, создаваемой с использованием данного обработчика (подробное описание приведено [ниже](#parametr-config)) ||
|#

### Параметр CONFIG

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TYPE***
[`string`](../../../data-types.md) | Тип поля настройки
Возможные значения:
- `STRING` — строка
- `Y/N` — чекбокс (да / нет)
- `NUMBER` — число
- `ENUM` — список
- `DATE` — дата
- `LOCATION` — местоположение
 ||
|| **CODE***
[`string`](../../../data-types.md) | Символьный код настройки ||
|| **NAME***
[`string`](../../../data-types.md) | Название настройки  ||
|| **OPTIONS**
[`object`](../../../data-types.md) | Список опций для выбора. Объект в формате `ключ=значение`. Где ключ — код опции, а значение — опция.

Пример:
```
{
   "Option1Code": "Option1Value",
   "Option2Code": "Option2Value",
   "Option3Code": "Option3Value"
}
```

Параметр актуален только для настройки типа `ENUM`
 ||
|#

### Параметр PROFILES

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME***
[`string`](../../../data-types.md) | Название профиля обработчика службы доставки  ||
|| **CODE***
[`string`](../../../data-types.md) | Символьный код профиля обработчика службы доставки ||
|| **DESCRIPTION**
[`string`](../../../data-types.md) | Описание профиля обработчика службы доставки  ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CODE":"uber","NAME":"Uber","DESCRIPTION":"Uber Description","SORT":250,"SETTINGS":{"CALCULATE_URL":"http://gateway.bx/calculate.php","CREATE_DELIVERY_REQUEST_URL":"http://gateway.bx/create_delivery_request.php","CANCEL_DELIVERY_REQUEST_URL":"http://gateway.bx/cancel_delivery_request.php","HAS_CALLBACK_TRACKING_SUPPORT":"Y","CONFIG":[{"TYPE":"STRING","CODE":"SETTING_1","NAME":"String Example"},{"TYPE":"Y/N","CODE":"SETTING_2","NAME":"Checkbox Example"},{"TYPE":"NUMBER","CODE":"SETTING_3","NAME":"Number Example"},{"TYPE":"ENUM","CODE":"SETTING_4","NAME":"Enum Example","OPTIONS":{"Option1Code":"Option1Value","Option2Code":"Option2Value","Option3Code":"Option3Value","Option4Code":"Option4Value","Option5Code":"Option5Value"}},{"TYPE":"DATE","CODE":"SETTING_5","NAME":"Date Example"},{"TYPE":"LOCATION","CODE":"SETTING_6","NAME":"Location Example"}]},"PROFILES":[{"NAME":"Taxi","CODE":"TAXI","DESCRIPTION":"Taxi Delivery"},{"NAME":"Cargo","CODE":"CARGO","DESCRIPTION":"Cargo Delivery"}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.delivery.handler.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CODE":"uber","NAME":"Uber","DESCRIPTION":"Uber Description","SORT":250,"SETTINGS":{"CALCULATE_URL":"http://gateway.bx/calculate.php","CREATE_DELIVERY_REQUEST_URL":"http://gateway.bx/create_delivery_request.php","CANCEL_DELIVERY_REQUEST_URL":"http://gateway.bx/cancel_delivery_request.php","HAS_CALLBACK_TRACKING_SUPPORT":"Y","CONFIG":[{"TYPE":"STRING","CODE":"SETTING_1","NAME":"String Example"},{"TYPE":"Y/N","CODE":"SETTING_2","NAME":"Checkbox Example"},{"TYPE":"NUMBER","CODE":"SETTING_3","NAME":"Number Example"},{"TYPE":"ENUM","CODE":"SETTING_4","NAME":"Enum Example","OPTIONS":{"Option1Code":"Option1Value","Option2Code":"Option2Value","Option3Code":"Option3Value","Option4Code":"Option4Value","Option5Code":"Option5Value"}},{"TYPE":"DATE","CODE":"SETTING_5","NAME":"Date Example"},{"TYPE":"LOCATION","CODE":"SETTING_6","NAME":"Location Example"}]},"PROFILES":[{"NAME":"Taxi","CODE":"TAXI","DESCRIPTION":"Taxi Delivery"},{"NAME":"Cargo","CODE":"CARGO","DESCRIPTION":"Cargo Delivery"}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.delivery.handler.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.delivery.handler.add', {
    			CODE: "uber",
    			NAME: "Uber",
    			DESCRIPTION: "Uber Description",
    			SORT: 250,
    			SETTINGS: {
    				CALCULATE_URL: "http://gateway.bx/calculate.php",
    				CREATE_DELIVERY_REQUEST_URL: "http://gateway.bx/create_delivery_request.php",
    				CANCEL_DELIVERY_REQUEST_URL: "http://gateway.bx/cancel_delivery_request.php",
    				HAS_CALLBACK_TRACKING_SUPPORT: "Y",
    				CONFIG: [{
    						TYPE: "STRING",
    						CODE: "SETTING_1",
    						NAME: "String Example",
    					},
    					{
    						TYPE: "Y/N",
    						CODE: "SETTING_2",
    						NAME: "Checkbox Example",
    					},
    					{
    						TYPE: "NUMBER",
    						CODE: "SETTING_3",
    						NAME: "Number Example",
    					},
    					{
    						TYPE: "ENUM",
    						CODE: "SETTING_4",
    						NAME: "Enum Example",
    						OPTIONS: {
    							"Option1Code": "Option1Value",
    							"Option2Code": "Option2Value",
    							"Option3Code": "Option3Value",
    							"Option4Code": "Option4Value",
    							"Option5Code": "Option5Value",
    						},
    					},
    					{
    						TYPE: "DATE",
    						CODE: "SETTING_5",
    						NAME: "Date Example",
    					},
    					{
    						TYPE: "LOCATION",
    						CODE: "SETTING_6",
    						NAME: "Location Example",
    					},
    				],
    			},
    			PROFILES: [{
    					NAME: "Taxi",
    					CODE: "TAXI",
    					DESCRIPTION: "Taxi Delivery",
    				},
    				{
    					NAME: "Cargo",
    					CODE: "CARGO",
    					DESCRIPTION: "Cargo Delivery",
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
                'sale.delivery.handler.add',
                [
                    'CODE'        => "uber",
                    'NAME'        => "Uber",
                    'DESCRIPTION' => "Uber Description",
                    'SORT'        => 250,
                    'SETTINGS'    => [
                        'CALCULATE_URL'                => "http://gateway.bx/calculate.php",
                        'CREATE_DELIVERY_REQUEST_URL'  => "http://gateway.bx/create_delivery_request.php",
                        'CANCEL_DELIVERY_REQUEST_URL'  => "http://gateway.bx/cancel_delivery_request.php",
                        'HAS_CALLBACK_TRACKING_SUPPORT' => "Y",
                        'CONFIG'                       => [
                            [
                                'TYPE' => "STRING",
                                'CODE' => "SETTING_1",
                                'NAME' => "String Example",
                            ],
                            [
                                'TYPE' => "Y/N",
                                'CODE' => "SETTING_2",
                                'NAME' => "Checkbox Example",
                            ],
                            [
                                'TYPE' => "NUMBER",
                                'CODE' => "SETTING_3",
                                'NAME' => "Number Example",
                            ],
                            [
                                'TYPE'    => "ENUM",
                                'CODE'    => "SETTING_4",
                                'NAME'    => "Enum Example",
                                'OPTIONS' => [
                                    "Option1Code" => "Option1Value",
                                    "Option2Code" => "Option2Value",
                                    "Option3Code" => "Option3Value",
                                    "Option4Code" => "Option4Value",
                                    "Option5Code" => "Option5Value",
                                ],
                            ],
                            [
                                'TYPE' => "DATE",
                                'CODE' => "SETTING_5",
                                'NAME' => "Date Example",
                            ],
                            [
                                'TYPE' => "LOCATION",
                                'CODE' => "SETTING_6",
                                'NAME' => "Location Example",
                            ],
                        ],
                    ],
                    'PROFILES'    => [
                        [
                            'NAME'        => "Taxi",
                            'CODE'        => "TAXI",
                            'DESCRIPTION' => "Taxi Delivery",
                        ],
                        [
                            'NAME'        => "Cargo",
                            'CODE'        => "CARGO",
                            'DESCRIPTION' => "Cargo Delivery",
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
        echo 'Error adding delivery handler: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.delivery.handler.add', {
            CODE: "uber",
            NAME: "Uber",
            DESCRIPTION: "Uber Description",
            SORT: 250,
            SETTINGS: {
                CALCULATE_URL: "http://gateway.bx/calculate.php",
                CREATE_DELIVERY_REQUEST_URL: "http://gateway.bx/create_delivery_request.php",
                CANCEL_DELIVERY_REQUEST_URL: "http://gateway.bx/cancel_delivery_request.php",
                HAS_CALLBACK_TRACKING_SUPPORT: "Y",
                CONFIG: [{
                        TYPE: "STRING",
                        CODE: "SETTING_1",
                        NAME: "String Example",
                    },
                    {
                        TYPE: "Y/N",
                        CODE: "SETTING_2",
                        NAME: "Checkbox Example",
                    },
                    {
                        TYPE: "NUMBER",
                        CODE: "SETTING_3",
                        NAME: "Number Example",
                    },
                    {
                        TYPE: "ENUM",
                        CODE: "SETTING_4",
                        NAME: "Enum Example",
                        OPTIONS: {
                            "Option1Code": "Option1Value",
                            "Option2Code": "Option2Value",
                            "Option3Code": "Option3Value",
                            "Option4Code": "Option4Value",
                            "Option5Code": "Option5Value",
                        },
                    },
                    {
                        TYPE: "DATE",
                        CODE: "SETTING_5",
                        NAME: "Date Example",
                    },
                    {
                        TYPE: "LOCATION",
                        CODE: "SETTING_6",
                        NAME: "Location Example",
                    },
                ],
            },
            PROFILES: [{
                    NAME: "Taxi",
                    CODE: "TAXI",
                    DESCRIPTION: "Taxi Delivery",
                },
                {
                    NAME: "Cargo",
                    CODE: "CARGO",
                    DESCRIPTION: "Cargo Delivery",
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
        'sale.delivery.handler.add',
        [
            'CODE' => "uber",
            'NAME' => "Uber",
            'DESCRIPTION' => "Uber Description",
            'SORT' => 250,
            'SETTINGS' => [
                'CALCULATE_URL' => "http://gateway.bx/calculate.php",
                'CREATE_DELIVERY_REQUEST_URL' => "http://gateway.bx/create_delivery_request.php",
                'CANCEL_DELIVERY_REQUEST_URL' => "http://gateway.bx/cancel_delivery_request.php",
                'HAS_CALLBACK_TRACKING_SUPPORT' => "Y",
                'CONFIG' => [
                    ['TYPE' => "STRING", 'CODE' => "SETTING_1", 'NAME' => "String Example"],
                    ['TYPE' => "Y/N", 'CODE' => "SETTING_2", 'NAME' => "Checkbox Example"],
                    ['TYPE' => "NUMBER", 'CODE' => "SETTING_3", 'NAME' => "Number Example"],
                    [
                        'TYPE' => "ENUM",
                        'CODE' => "SETTING_4",
                        'NAME' => "Enum Example",
                        'OPTIONS' => [
                            "Option1Code" => "Option1Value",
                            "Option2Code" => "Option2Value",
                            "Option3Code" => "Option3Value",
                            "Option4Code" => "Option4Value",
                            "Option5Code" => "Option5Value",
                        ],
                    ],
                    ['TYPE' => "DATE", 'CODE' => "SETTING_5", 'NAME' => "Date Example"],
                    ['TYPE' => "LOCATION", 'CODE' => "SETTING_6", 'NAME' => "Location Example"],
                ],
            ],
            'PROFILES' => [
                ['NAME' => "Taxi", 'CODE' => "TAXI", 'DESCRIPTION' => "Taxi Delivery"],
                ['NAME' => "Cargo", 'CODE' => "CARGO", 'DESCRIPTION' => "Cargo Delivery"],
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Ответ в случае успеха

HTTP-статус: **200**

```json
{
   "result":14,
   "time":{
      "start":1713872092.378366,
      "finish":1713872092.691408,
      "duration":0.31304192543029785,
      "processing":0.015096187591552734,
      "date_start":"2024-04-23T14:34:52+03:00",
      "date_finish":"2024-04-23T14:34:52+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`sale_delivery_handler.ID`](../../../data-types.md) | Идентификатор обработчика службы доставки ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
   "error":"ERROR_CHECK_FAILURE",
   "error_description":"Parameter CODE is not defined"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `ERROR_CHECK_FAILURE` | Ошибка валидации входящих параметров (детали в описании ошибки) | 400 ||
|| `ERROR_HANDLER_ADD` | Ошибка при попытке добавления обработчика службы доставки | 400 ||
|| `ERROR_HANDLER_ALREADY_EXIST` | Обработчик службы доставки с указанным кодом `CODE` уже существует | 400 ||
|| `ACCESS_DENIED` | Недостаточно прав для добавления обработчика службы доставки | 403 ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-delivery-handler-update.md)
- [{#T}](./sale-delivery-handler-delete.md)
- [{#T}](./sale-delivery-handler-list.md)
- [{#T}](../../../../tutorials/sale/delivery-in-crm.md)