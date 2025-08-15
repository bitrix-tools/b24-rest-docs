# Установить товары в сделку crm.deal.productrows.set

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «изменения» сделки

Метод `crm.deal.productrows.set` создает или обновляет товарные позиции сделки. Чтобы изменить только одну позицию, используйте методы [crm.item.productrow.*](../universal/product-rows/index.md).

#|
|| **Название**
`тип` | **Описание** ||
|| **id^*^**
[`integer`](../../data-types.md) | Идентификатор сделки. Можно получить с помощью метода получения списка сделок: [`crm.deal.list`](./crm-deal-list.md) или при создании сделки: [`crm.deal.add`](./crm-deal-add.md) ||
|| **rows**
[`object[]`](#productrows) | Товарные позиции

Массив объектов, вида: 
```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```
где
- `field_n` — название поля товарной позиции
- `value_n` — значение данного поля

Список доступных полей описан [ниже](#parameter-rows). ||
|#

### Список доступных полей у товарных позиций {#parameter-rows}

#|
|| **Название**
`тип` | **Описание** ||
|| **PRODUCT_ID**
[`integer`](../../data-types.md) | Идентификатор товара в каталоге. Можно получить список товаров с помощью метода [`catalog.product.list`](../../catalog/product/catalog-product-list.md)
`0` если не из каталога

По умолчанию - `0`
||
|| **PRODUCT_NAME**
[`string`](../../data-types.md) | Наименование товарной позиции. Если передан `PRODUCT_ID`, то название будет взято у товара

Если поля `PRODUCT_ID` и `PRODUCT_NAME` не переданы, то `PRODUCT_NAME` будет равен `[{id}]`, где `{id}` - Идентификатор созданной товарной позиции
||
|| **PRICE**
[`double`](../../data-types.md) | Итоговая стоимость товара за единицу

По умолчанию - `0.0`
||
|| **PRICE_EXCLUSIVE**
[`double`](../../data-types.md) | Стоимость за единицу с учетом скидок, без учета налогов ||
|| **PRICE_NETTO**
[`double`](../../data-types.md) | Стоимость за единицу без учета скидок и налогов ||
|| **PRICE_BRUTTO**
[`double`](../../data-types.md) | Стоимость за единицу без учета скидок, но с учетом налогов ||
|| **QUANTITY**
[`double`](../../data-types.md) | Количество единиц товара

По умолчанию - `1.0`
||
|| **DISCOUNT_TYPE_ID**
[`integer`](../../data-types.md) | Тип скидки
Возможные типы:
- `1` - Абсолютный
- `2` - Процентный

По умолчанию - `2`
||
|| **DISCOUNT_RATE**
[`double`](../../data-types.md) | Значение скидки в процентах (если используется тип скидки с процентным значением)

По умолчанию - `0.0`
||
|| **DISCOUNT_SUM**
[`double`](../../data-types.md) | Абсолютное значение скидки (если используется тип скидки с абсолютным значением)

По умолчанию - `0.0`
||
|| **TAX_RATE**
[`double`](../../data-types.md) | Ставка налога в процентах ||
|| **TAX_INCLUDED**
[`boolean`](../../data-types.md) | Индикатор того, включен ли налог в стоимость
Возможные значения:
- `Y` – налог включен
- `N` – налог не включен

По умолчанию - `N`
||
|| **MEASURE_CODE**
[`catalog_measure.code`](../../catalog/data-types.md#catalog_measure) | Код единицы измерения

Если передан `PRODUCT_ID`, то по умолчанию будет взято значение из товара, иначе `0`
||
|| **MEASURE_NAME**
[`string`](../../data-types.md) | Текстовое представление единицы измерения (например - шт, кг, м, л и т.д.)

Если передан `PRODUCT_ID`, то по умолчанию будет взято значение из товара, иначе `""`
||
|| **SORT**
[`integer`](../../data-types.md) | Сортировка 

По умолчанию - `0`
||
|#


## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":5,"rows":[{"PRODUCT_ID":456,"PRICE":1000,"QUANTITY":10,"DISCOUNT_TYPE_ID":1,"DISCOUNT_SUM":100,"TAX_RATE":13,"MEASURE_CODE":796,"MEASURE_NAME":"шт","SORT":10},{"PRODUCT_NAME":"Товар #2","PRICE":500,"QUANTITY":5,"DISCOUNT_TYPE_ID":2,"DISCOUNT_RATE":10,"TAX_RATE":10,"MEASURE_CODE":166,"MEASURE_NAME":"кг","SORT":20}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.deal.productrows.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":5,"rows":[{"PRODUCT_ID":456,"PRICE":1000,"QUANTITY":10,"DISCOUNT_TYPE_ID":1,"DISCOUNT_SUM":100,"TAX_RATE":13,"MEASURE_CODE":796,"MEASURE_NAME":"шт","SORT":10},{"PRODUCT_NAME":"Товар #2","PRICE":500,"QUANTITY":5,"DISCOUNT_TYPE_ID":2,"DISCOUNT_RATE":10,"TAX_RATE":10,"MEASURE_CODE":166,"MEASURE_NAME":"кг","SORT":20}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.productrows.set
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.deal.productrows.set',
    		{
    			id: 5,
    			rows: [
    				{
    					PRODUCT_ID: 456,
    					PRICE: 1000,
    					QUANTITY: 10,
    					DISCOUNT_TYPE_ID: 1,
    					DISCOUNT_SUM: 100,
    					TAX_RATE: 13,
    					MEASURE_CODE: 796,
    					MEASURE_NAME: "шт",
    					SORT: 10,
    				},
    				{
    					PRODUCT_NAME: "Товар #2",
    					PRICE: 500,
    					QUANTITY: 5,
    					DISCOUNT_TYPE_ID: 2,
    					DISCOUNT_RATE: 10,
    					TAX_RATE: 10,
    					MEASURE_CODE: 166,
    					MEASURE_NAME: "кг",
    					SORT: 20,
    				},
    			],
    		}
    	);
    	
    	const result = response.getData().result;
    	result.error()
    		? console.error(result.error())
    		: console.info(result)
    	;
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
                'crm.deal.productrows.set',
                [
                    'id'   => 5,
                    'rows' => [
                        [
                            'PRODUCT_ID'       => 456,
                            'PRICE'           => 1000,
                            'QUANTITY'        => 10,
                            'DISCOUNT_TYPE_ID' => 1,
                            'DISCOUNT_SUM'    => 100,
                            'TAX_RATE'        => 13,
                            'MEASURE_CODE'    => 796,
                            'MEASURE_NAME'    => "шт",
                            'SORT'            => 10,
                        ],
                        [
                            'PRODUCT_NAME'     => "Товар #2",
                            'PRICE'           => 500,
                            'QUANTITY'        => 5,
                            'DISCOUNT_TYPE_ID' => 2,
                            'DISCOUNT_RATE'   => 10,
                            'TAX_RATE'        => 10,
                            'MEASURE_CODE'    => 166,
                            'MEASURE_NAME'    => "кг",
                            'SORT'            => 20,
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting deal product rows: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.deal.productrows.set',
        {
            id: 5,
            rows: [
                {
                    PRODUCT_ID: 456,
                    PRICE: 1000,
                    QUANTITY: 10,
                    DISCOUNT_TYPE_ID: 1,
                    DISCOUNT_SUM: 100,
                    TAX_RATE: 13,
                    MEASURE_CODE: 796,
                    MEASURE_NAME: "шт",
                    SORT: 10,
                },
                {
                    PRODUCT_NAME: "Товар #2",
                    PRICE: 500,
                    QUANTITY: 5,
                    DISCOUNT_TYPE_ID: 2,
                    DISCOUNT_RATE: 10,
                    TAX_RATE: 10,
                    MEASURE_CODE: 166,
                    MEASURE_NAME: "кг",
                    SORT: 20,
                },
            ],
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.deal.productrows.set',
        [
            'id' => 5,
            'rows' => [
                [
                    'PRODUCT_ID' => 456,
                    'PRICE' => 1000,
                    'QUANTITY' => 10,
                    'DISCOUNT_TYPE_ID' => 1,
                    'DISCOUNT_SUM' => 100,
                    'TAX_RATE' => 13,
                    'MEASURE_CODE' => 796,
                    'MEASURE_NAME' => "шт",
                    'SORT' => 10,
                ],
                [
                    'PRODUCT_NAME' => "Товар #2",
                    'PRICE' => 500,
                    'QUANTITY' => 5,
                    'DISCOUNT_TYPE_ID' => 2,
                    'DISCOUNT_RATE' => 10,
                    'TAX_RATE' => 10,
                    'MEASURE_CODE' => 166,
                    'MEASURE_NAME' => "кг",
                    'SORT' => 20,
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
  "result": true,
  "time": {
    "start": 1735134795.171273,
    "finish": 1735134796.404978,
    "duration": 1.2337050437927246,
    "processing": 0.9462978839874268,
    "date_start": "2024-12-25T15:53:15+02:00",
    "date_finish": "2024-12-25T15:53:16+02:00",
    "operating": 0
  }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Корневой элемент ответа, содержит `true` в случае успеха ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
  "error": "ERROR_CORE",
  "error_description": "Discount Sum (DISCOUNT_SUM) is required if Percentage Discount Type (DISCOUNT_TYPE_ID) is defined and Discount Rate (DISCOUNT_RATE) is 100%<br>"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Описание** | **Значение** ||
|| The parameter id is invalid or not defined. | В параметр `id` передано некорректное значение ||
|| Access denied | У пользователя нет прав на «изменение» сделки  ||
|| Not found | Сделка с переданным `id` не найдена ||
|| Discount Rate (`DISCOUNT_RATE`) is required if Percentage Discount Type (`DISCOUNT_TYPE_ID`) is defined. | Было передано `DISCOUNT_TYPE_ID = 2` и не передано `DISCOUNT_RATE` ||
|| Discount Sum (`DISCOUNT_SUM`) is required if Percentage Discount Type (`DISCOUNT_TYPE_ID`) is defined and Discount Rate (`DISCOUNT_RATE`) is 100% | Было передано `DISCOUNT_RATE = 100` и `DISCOUNT_TYPE_ID = 2` и не передано `DISCOUNT_SUM` ||
|| Discount Sum (`DISCOUNT_SUM`) is required if Monetary Discount Type (`DISCOUNT_TYPE_ID`) is defined. | Было передано `DISCOUNT_TYPE_ID = 1` и не передано `DISCOUNT_SUM` ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-deal-productrows-get.md)
