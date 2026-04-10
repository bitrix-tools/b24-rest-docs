# Установить товарные позиции предложения crm.quote.productrows.set

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «изменения» коммерческих предложений

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [crm.item.productrow.*](../universal/product-rows/index.md).

{% endnote %}

Метод `crm.quote.productrows.set` создает или обновляет товарные позиции коммерческого предложения.

Чтобы изменить только одну позицию, используйте методы [crm.item.productrow.*](../universal/product-rows/index.md).

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../data-types.md) | Идентификатор коммерческого предложения.

Идентификатор можно получить с помощью методов [crm.quote.list](./crm-quote-list.md) или [crm.quote.add](./crm-quote-add.md) ||
|| **rows**
[`object[]`](#parameter-rows) | Массив товарных позиций.

Формат элемента массива:
```json
{
    "field_1": "value_1",
    "field_2": "value_2",
    "...": "..."
}
```

где:
- `field_n` — название поля товарной позиции
- `value_n` — значение поля

Список основных полей описан [ниже](#parameter-rows) ||
|#

### Список доступных полей у товарных позиций {#parameter-rows}

#|
|| **Название**
`тип` | **Описание** ||
|| **PRODUCT_ID**
[`integer`](../data-types.md) | Идентификатор товара в каталоге.

Список товаров можно получить методом [catalog.product.list](../../catalog/product/catalog-product-list.md).

Если `PRODUCT_ID = 0`, позиция создается как «произвольная» ||
|| **PRODUCT_NAME**
[`string`](../data-types.md) | Наименование товарной позиции ||
|| **PRODUCT_DESCRIPTION**
[`string`](../data-types.md) | Описание товарной позиции ||
|| **PRICE**
[`double`](../data-types.md) | Итоговая стоимость товара за единицу ||
|| **QUANTITY**
[`double`](../data-types.md) | Количество единиц товара ||
|| **DISCOUNT_TYPE_ID**
[`integer`](../data-types.md) | Тип скидки:
- `1` — абсолютная
- `2` — процентная ||
|| **DISCOUNT_RATE**
[`double`](../data-types.md) | Значение скидки в процентах ||
|| **DISCOUNT_SUM**
[`double`](../data-types.md) | Абсолютное значение скидки ||
|| **TAX_RATE**
[`double`](../data-types.md) | Ставка налога в процентах ||
|| **TAX_INCLUDED**
[`char`](../data-types.md) | Включен ли налог в стоимость:
- `Y` — да
- `N` — нет ||
|| **MEASURE_CODE**
[`catalog_measure.code`](../../catalog/data-types.md#catalog_measure) | Код единицы измерения ||
|| **MEASURE_NAME**
[`string`](../data-types.md) | Текстовое представление единицы измерения ||
|| **SORT**
[`integer`](../data-types.md) | Сортировка ||
|#

Полный список полей товарной позиции и типов можно получить методом [crm.productrow.fields](../outdated/productrow-old/crm-productrow-fields.md).

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Установить две товарные позиции для предложения с `id = 1`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"rows":[{"PRODUCT_ID":459,"PRICE":3000,"QUANTITY":1,"DISCOUNT_TYPE_ID":2,"DISCOUNT_RATE":0,"TAX_RATE":0,"TAX_INCLUDED":"Y","MEASURE_CODE":796,"MEASURE_NAME":"шт","SORT":10},{"PRODUCT_NAME":"Услуга сопровождения","PRICE":1500,"QUANTITY":2,"DISCOUNT_TYPE_ID":2,"DISCOUNT_RATE":0,"TAX_RATE":0,"TAX_INCLUDED":"Y","MEASURE_CODE":796,"MEASURE_NAME":"шт","SORT":20}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.quote.productrows.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"rows":[{"PRODUCT_ID":459,"PRICE":3000,"QUANTITY":1,"DISCOUNT_TYPE_ID":2,"DISCOUNT_RATE":0,"TAX_RATE":0,"TAX_INCLUDED":"Y","MEASURE_CODE":796,"MEASURE_NAME":"шт","SORT":10},{"PRODUCT_NAME":"Услуга сопровождения","PRICE":1500,"QUANTITY":2,"DISCOUNT_TYPE_ID":2,"DISCOUNT_RATE":0,"TAX_RATE":0,"TAX_INCLUDED":"Y","MEASURE_CODE":796,"MEASURE_NAME":"шт","SORT":20}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.quote.productrows.set
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.quote.productrows.set',
    		{
    			id: 1,
    			rows: [
    				{
    					PRODUCT_ID: 459,
    					PRICE: 3000,
    					QUANTITY: 1,
    					DISCOUNT_TYPE_ID: 2,
    					DISCOUNT_RATE: 0,
    					TAX_RATE: 0,
    					TAX_INCLUDED: 'Y',
    					MEASURE_CODE: 796,
    					MEASURE_NAME: 'шт',
    					SORT: 10,
    				},
    				{
    					PRODUCT_NAME: 'Услуга сопровождения',
    					PRICE: 1500,
    					QUANTITY: 2,
    					DISCOUNT_TYPE_ID: 2,
    					DISCOUNT_RATE: 0,
    					TAX_RATE: 0,
    					TAX_INCLUDED: 'Y',
    					MEASURE_CODE: 796,
    					MEASURE_NAME: 'шт',
    					SORT: 20,
    				},
    			],
    		}
    	);

    	const result = response.getData().result;
    	console.info(result);
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
                'crm.quote.productrows.set',
                [
                    'id' => 1,
                    'rows' => [
                        [
                            'PRODUCT_ID' => 459,
                            'PRICE' => 3000,
                            'QUANTITY' => 1,
                            'DISCOUNT_TYPE_ID' => 2,
                            'DISCOUNT_RATE' => 0,
                            'TAX_RATE' => 0,
                            'TAX_INCLUDED' => 'Y',
                            'MEASURE_CODE' => 796,
                            'MEASURE_NAME' => 'шт',
                            'SORT' => 10,
                        ],
                        [
                            'PRODUCT_NAME' => 'Услуга сопровождения',
                            'PRICE' => 1500,
                            'QUANTITY' => 2,
                            'DISCOUNT_TYPE_ID' => 2,
                            'DISCOUNT_RATE' => 0,
                            'TAX_RATE' => 0,
                            'TAX_INCLUDED' => 'Y',
                            'MEASURE_CODE' => 796,
                            'MEASURE_NAME' => 'шт',
                            'SORT' => 20,
                        ],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Updated: ' . ($result ? 'true' : 'false');

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting quote product rows: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.quote.productrows.set',
        {
            id: 1,
            rows: [
                {
                    PRODUCT_ID: 459,
                    PRICE: 3000,
                    QUANTITY: 1,
                    DISCOUNT_TYPE_ID: 2,
                    DISCOUNT_RATE: 0,
                    TAX_RATE: 0,
                    TAX_INCLUDED: 'Y',
                    MEASURE_CODE: 796,
                    MEASURE_NAME: 'шт',
                    SORT: 10,
                },
                {
                    PRODUCT_NAME: 'Услуга сопровождения',
                    PRICE: 1500,
                    QUANTITY: 2,
                    DISCOUNT_TYPE_ID: 2,
                    DISCOUNT_RATE: 0,
                    TAX_RATE: 0,
                    TAX_INCLUDED: 'Y',
                    MEASURE_CODE: 796,
                    MEASURE_NAME: 'шт',
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
        'crm.quote.productrows.set',
        [
            'id' => 1,
            'rows' => [
                [
                    'PRODUCT_ID' => 459,
                    'PRICE' => 3000,
                    'QUANTITY' => 1,
                    'DISCOUNT_TYPE_ID' => 2,
                    'DISCOUNT_RATE' => 0,
                    'TAX_RATE' => 0,
                    'TAX_INCLUDED' => 'Y',
                    'MEASURE_CODE' => 796,
                    'MEASURE_NAME' => 'шт',
                    'SORT' => 10,
                ],
                [
                    'PRODUCT_NAME' => 'Услуга сопровождения',
                    'PRICE' => 1500,
                    'QUANTITY' => 2,
                    'DISCOUNT_TYPE_ID' => 2,
                    'DISCOUNT_RATE' => 0,
                    'TAX_RATE' => 0,
                    'TAX_INCLUDED' => 'Y',
                    'MEASURE_CODE' => 796,
                    'MEASURE_NAME' => 'шт',
                    'SORT' => 20,
                ],
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
    "result": true,
    "time": {
        "start": 1773416018,
        "finish": 1773416018.877651,
        "duration": 0.8776509761810303,
        "processing": 0,
        "date_start": "2026-03-13T18:33:38+03:00",
        "date_finish": "2026-03-13T18:33:38+03:00",
        "operating_reset_at": 1773416618,
        "operating": 0.5666530132293701
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | Корневой элемент ответа. Содержит:
- `true` — товарные позиции успешно сохранены
- `false` — товарные позиции не сохранены ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Not found."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | `The parameter id is invalid or not defined.` | В параметр `id` не передано значение или передано невалидное значение ||
|| `-` | `The parameter rows must be array.` | В параметр `rows` передан не массив ||
|| `-` | `Access denied.` | У пользователя нет прав на изменение коммерческого предложения ||
|| `-` | `Not found.` | Коммерческое предложение с переданным `id` не найдено ||
|| `-` | Текст ошибки проверки прав каталога | Ошибка проверки прав на товары каталога и/или ограничения каталога для переданных позиций ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-quote-product-rows-get.md)
- [{#T}](./crm-quote-get.md)
- [{#T}](./crm-quote-update.md)
- [{#T}](./crm-quote-add.md)
- [{#T}](./crm-quote-fields.md)





