# Обновить обработчик службы доставки sale.delivery.handler.update

> Scope: [`sale`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM

Метод обновляет обработчик службы доставки. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`sale_delivery_handler.ID`](../../data-types.md) | Идентификатор обработчика службы доставки.
Получить идентификаторы обработчиков службы доставки можно с помощью метода [`sale.delivery.handler.list`](sale-delivery-handler-list.md)
  ||
|| **NAME**
[`string`](../../../data-types.md) | Название обработчика службы доставки ||
|| **CODE**
[`string`](../../../data-types.md) | Символьный код обработчика службы доставки ||
|| **SORT**
[`integer`](../../../data-types.md) | Сортировка ||
|| **DESCRIPTION**
[`string`](../../../data-types.md) | Описание обработчика службы доставки ||
|| **SETTINGS**
[`object`](../../../data-types.md) | Объект, содержащий информацию о настройках обработчика службы доставки (подробное описание приведено [ниже](#parametr-settings))  ||
|| **PROFILES**
[`object[]`](../../../data-types.md) | Массив, содержащий список объектов профилей доставки (подробное описание приведено [ниже](#parametr-profiles)).

Подразумевается, что у обработчика службы доставки должен быть как минимум 1 профиль ||
|#

### Параметр SETTINGS {#parametr-settings}

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
[`object`](../../../data-types.md) | Массив объектов с доступными настройками для службы доставки, создаваемой с использованием данного обработчика (подробное описание приведено [ниже](#parametr-config)) ||
|#

### Параметр CONFIG {#parametr-config}

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

### Параметр PROFILES {#parametr-profiles}

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
    -d '{"ID":14,"CODE":"uber","NAME":"New Uber","DESCRIPTION":"New Uber Description","SORT":300,"SETTINGS":{"CALCULATE_URL":"https://gateway.bx/calculate.php","CREATE_DELIVERY_REQUEST_URL":"https://gateway.bx/create_delivery_request.php","CANCEL_DELIVERY_REQUEST_URL":"https://gateway.bx/cancel_delivery_request.php","HAS_CALLBACK_TRACKING_SUPPORT":"N","CONFIG":[{"TYPE":"STRING","CODE":"SETTING_1","NAME":"String Example"},{"TYPE":"Y/N","CODE":"SETTING_2","NAME":"Checkbox Example"},{"TYPE":"NUMBER","CODE":"SETTING_3","NAME":"Number Example"},{"TYPE":"ENUM","CODE":"SETTING_4","NAME":"Enum Example","OPTIONS":{"Option1Code":"Option1Value","Option2Code":"Option2Value","Option3Code":"Option3Value","Option4Code":"Option4Value","Option5Code":"Option5Value"}},{"TYPE":"DATE","CODE":"SETTING_5","NAME":"Date Example"},{"TYPE":"LOCATION","CODE":"SETTING_6","NAME":"Location Example"}]},"PROFILES":[{"NAME":"New Taxi","CODE":"TAXI","DESCRIPTION":"New Taxi Delivery"},{"NAME":"New Cargo","CODE":"CARGO","DESCRIPTION":"New Cargo Delivery"}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.delivery.handler.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":14,"CODE":"uber","NAME":"New Uber","DESCRIPTION":"New Uber Description","SORT":300,"SETTINGS":{"CALCULATE_URL":"https://gateway.bx/calculate.php","CREATE_DELIVERY_REQUEST_URL":"https://gateway.bx/create_delivery_request.php","CANCEL_DELIVERY_REQUEST_URL":"https://gateway.bx/cancel_delivery_request.php","HAS_CALLBACK_TRACKING_SUPPORT":"N","CONFIG":[{"TYPE":"STRING","CODE":"SETTING_1","NAME":"String Example"},{"TYPE":"Y/N","CODE":"SETTING_2","NAME":"Checkbox Example"},{"TYPE":"NUMBER","CODE":"SETTING_3","NAME":"Number Example"},{"TYPE":"ENUM","CODE":"SETTING_4","NAME":"Enum Example","OPTIONS":{"Option1Code":"Option1Value","Option2Code":"Option2Value","Option3Code":"Option3Value","Option4Code":"Option4Value","Option5Code":"Option5Value"}},{"TYPE":"DATE","CODE":"SETTING_5","NAME":"Date Example"},{"TYPE":"LOCATION","CODE":"SETTING_6","NAME":"Location Example"}]},"PROFILES":[{"NAME":"New Taxi","CODE":"TAXI","DESCRIPTION":"New Taxi Delivery"},{"NAME":"New Cargo","CODE":"CARGO","DESCRIPTION":"New Cargo Delivery"}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.delivery.handler.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.delivery.handler.update', {
    			ID: 14,
    			CODE: "uber",
    			NAME: "New Uber",
    			DESCRIPTION: "New Uber Description",
    			SORT: 300,
    			SETTINGS: {
    				CALCULATE_URL: "https://gateway.bx/calculate.php",
    				CREATE_DELIVERY_REQUEST_URL: "https://gateway.bx/create_delivery_request.php",
    				CANCEL_DELIVERY_REQUEST_URL: "https://gateway.bx/cancel_delivery_request.php",
    				HAS_CALLBACK_TRACKING_SUPPORT: "N",
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
    					NAME: "New Taxi",
    					CODE: "TAXI",
    					DESCRIPTION: "New Taxi Delivery",
    				},
    				{
    					NAME: "New Cargo",
    					CODE: "CARGO",
    					DESCRIPTION: "New Cargo Delivery",
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
                'sale.delivery.handler.update',
                [
                    'ID'          => 14,
                    'CODE'        => "uber",
                    'NAME'        => "New Uber",
                    'DESCRIPTION' => "New Uber Description",
                    'SORT'        => 300,
                    'SETTINGS'    => [
                        'CALCULATE_URL'               => "https://gateway.bx/calculate.php",
                        'CREATE_DELIVERY_REQUEST_URL' => "https://gateway.bx/create_delivery_request.php",
                        'CANCEL_DELIVERY_REQUEST_URL' => "https://gateway.bx/cancel_delivery_request.php",
                        'HAS_CALLBACK_TRACKING_SUPPORT' => "N",
                        'CONFIG'                      => [
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
                            'NAME'        => "New Taxi",
                            'CODE'        => "TAXI",
                            'DESCRIPTION' => "New Taxi Delivery",
                        ],
                        [
                            'NAME'        => "New Cargo",
                            'CODE'        => "CARGO",
                            'DESCRIPTION' => "New Cargo Delivery",
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
        echo 'Error updating delivery handler: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.delivery.handler.update', {
            ID: 14,
            CODE: "uber",
            NAME: "New Uber",
            DESCRIPTION: "New Uber Description",
            SORT: 300,
            SETTINGS: {
                CALCULATE_URL: "https://gateway.bx/calculate.php",
                CREATE_DELIVERY_REQUEST_URL: "https://gateway.bx/create_delivery_request.php",
                CANCEL_DELIVERY_REQUEST_URL: "https://gateway.bx/cancel_delivery_request.php",
                HAS_CALLBACK_TRACKING_SUPPORT: "N",
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
                    NAME: "New Taxi",
                    CODE: "TAXI",
                    DESCRIPTION: "New Taxi Delivery",
                },
                {
                    NAME: "New Cargo",
                    CODE: "CARGO",
                    DESCRIPTION: "New Cargo Delivery",
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
        'sale.delivery.handler.update',
        [
            'ID' => 14,
            'CODE' => "uber",
            'NAME' => "New Uber",
            'DESCRIPTION' => "New Uber Description",
            'SORT' => 300,
            'SETTINGS' => [
                'CALCULATE_URL' => "https://gateway.bx/calculate.php",
                'CREATE_DELIVERY_REQUEST_URL' => "https://gateway.bx/create_delivery_request.php",
                'CANCEL_DELIVERY_REQUEST_URL' => "https://gateway.bx/cancel_delivery_request.php",
                'HAS_CALLBACK_TRACKING_SUPPORT' => "N",
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
                ['NAME' => "New Taxi", 'CODE' => "TAXI", 'DESCRIPTION' => "New Taxi Delivery"],
                ['NAME' => "New Cargo", 'CODE' => "CARGO", 'DESCRIPTION' => "New Cargo Delivery"],
            ],
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
      "start":1713857588.711742,
      "finish":1713857589.121912,
      "duration":0.4101700782775879,
      "processing":0.02155303955078125,
      "date_start":"2024-04-23T10:33:08+03:00",
      "date_finish":"2024-04-23T10:33:09+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат обновления обработчика службы доставки ||
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
|| `ERROR_HANDLER_NOT_FOUND` | Обработчик службы доставки с указанным идентификатором не найден  | 400 ||
|| `ERROR_CHECK_FAILURE` | Ошибка валидации входящих параметров (детали в описании ошибки) | 400 ||
|| `ERROR_HANDLER_UPDATE` | Ошибка при попытке обновления обработчика службы доставки | 400 ||
|| `ERROR_HANDLER_ALREADY_EXIST` | Обработчик службы доставки с указанным кодом уже существует | 400 ||
|| `ACCESS_DENIED` | Недостаточно прав для обновления обработчика службы доставки | 403 ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-delivery-handler-add.md)
- [{#T}](./sale-delivery-handler-delete.md)
- [{#T}](./sale-delivery-handler-list.md)