# Получить товары сделки crm.deal.productrows.get

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «чтения» сделки

Метод `crm.deal.productrows.get` возвращает товарные позиции сделки.

#|
|| **Название**
`тип` | **Описание** ||
|| **id^*^**
[`integer`](../../data-types.md) | Идентификатор сделки. Можно получить с помощью метода получения списка сделок: [`crm.deal.list`](./crm-deal-list.md) или при создании сделки: [`crm.deal.add`](./crm-deal-add.md) ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}


## Примеры кода

Получить товарные позиции сделки с `id = 5`

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
	-H "Content-Type: application/json" \
	-H "Accept: application/json" \
	-d '{"id":5}' \
	https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.deal.productrows.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
	-H "Content-Type: application/json" \
	-H "Accept: application/json" \
	-d '{"id":5,"auth":"**put_access_token_here**"}' \
	https://**put_your_bitrix24_address**/rest/crm.deal.productrows.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.deal.productrows.get',
    		{
    			id: 5,
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
                'crm.deal.productrows.get',
                [
                    'id' => 5,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Data: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting deal product rows: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.deal.productrows.get',
        {
            id: 5,
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
		'crm.deal.productrows.get',
		[
			'id' => 5
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
	"result": [
		{
			"ID": "5",
			"OWNER_ID": "5",
			"OWNER_TYPE": "D",
			"PRODUCT_ID": 450,
			"PRODUCT_NAME": "Товар #2",
			"ORIGINAL_PRODUCT_NAME": "Товар #2",
			"PRODUCT_DESCRIPTION": null,
			"PRICE": 899.1,
			"PRICE_EXCLUSIVE": 899.1,
			"PRICE_NETTO": 999,
			"PRICE_BRUTTO": 999,
			"PRICE_ACCOUNT": "899.10",
			"QUANTITY": 1,
			"DISCOUNT_TYPE_ID": 2,
			"DISCOUNT_RATE": 10,
			"DISCOUNT_SUM": 99.9,
			"TAX_RATE": null,
			"TAX_INCLUDED": "Y",
			"CUSTOMIZED": "Y",
			"MEASURE_CODE": 796,
			"MEASURE_NAME": "шт",
			"SORT": 10,
			"XML_ID": "sale_basket_651",
			"TYPE": 1,
			"STORE_ID": 0,
			"RESERVE_ID": 31,
			"DATE_RESERVE_END": "26.12.2024",
			"RESERVE_QUANTITY": 1
		},
		{
			"ID": "4",
			"OWNER_ID": "5",
			"OWNER_TYPE": "D",
			"PRODUCT_ID": 449,
			"PRODUCT_NAME": "Товар #1",
			"ORIGINAL_PRODUCT_NAME": "Товар #1",
			"PRODUCT_DESCRIPTION": "Детальное описание",
			"PRICE": 100,
			"PRICE_EXCLUSIVE": 100,
			"PRICE_NETTO": 100,
			"PRICE_BRUTTO": 100,
			"PRICE_ACCOUNT": "100.00",
			"QUANTITY": 1,
			"DISCOUNT_TYPE_ID": 2,
			"DISCOUNT_RATE": 0,
			"DISCOUNT_SUM": 0,
			"TAX_RATE": null,
			"TAX_INCLUDED": "Y",
			"CUSTOMIZED": "Y",
			"MEASURE_CODE": 796,
			"MEASURE_NAME": "шт",
			"SORT": 20,
			"XML_ID": "sale_basket_650",
			"TYPE": 1,
			"STORE_ID": 1,
			"RESERVE_ID": 30,
			"DATE_RESERVE_END": "26.12.2024",
			"RESERVE_QUANTITY": 1
		}
	],
	"time": {
		"start": 1734969122.936213,
		"finish": 1734969123.586089,
		"duration": 0.6498758792877197,
		"processing": 0.14046597480773926,
		"date_start": "2024-12-23T17:52:02+02:00",
		"date_finish": "2024-12-23T17:52:03+02:00",
		"operating": 0
	}
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`productrow[]`](#productrow) | Корневой элемент ответа, содержащий массив товарных позиций сделки ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип productrow {#productrow}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор товарной позиции ||
|| **OWNER_ID**
[`integer`](../../data-types.md) | Идентификатор сущности, к которой привязан товар. Для данного метода всегда будет равен `id` сделки ||
|| **OWNER_TYPE**
[`string`](../../data-types.md) | Строковый идентификатор типа сущности, к которому привязан товар. Для данного метода всегда будет равен `D` ||
|| **PRODUCT_ID**
[`integer`](../../data-types.md) | Идентификатор товара в каталоге. `0` если не из каталога

Для получения более подробной информации о товаре используйте [`catalog.product.get`](../../catalog/product/catalog-product-get.md)
||
|| **PRODUCT_NAME**
[`string`](../../data-types.md) | Наименование товарной позиции ||
|| **ORIGINAL_PRODUCT_NAME**
[`string`](../../data-types.md) | Наименование товарной позиции в каталоге ||
|| **PRODUCT_DESCRIPTION**
[`string`](../../data-types.md) | Описание товарной позиции ||
|| **PRICE**
[`double`](../../data-types.md) | Итоговая стоимость товара за единицу ||
|| **PRICE_EXCLUSIVE**
[`double`](../../data-types.md) | Стоимость за единицу с учетом скидок, без учета налогов ||
|| **PRICE_NETTO**
[`double`](../../data-types.md) | Стоимость за единицу без учета скидок и налогов ||
|| **PRICE_BRUTTO**
[`double`](../../data-types.md) | Стоимость за единицу без учета скидок, но с учетом налогов ||
|| **PRICE_ACCOUNT**
[`string`](../../data-types.md) | Стоимость товара в "валюте отчетов" ||
|| **QUANTITY**
[`integer`](../../data-types.md) | Количество единиц товара ||
|| **DISCOUNT_TYPE_ID**
[`integer`](../../data-types.md) | Тип скидки
Возможные типы:
 - `1` - Абсолютный
 - `2` - Процентный

||
|| **DISCOUNT_RATE**
[`double`](../../data-types.md) | Значение скидки в процентах (если используется тип скидки с процентным значением) ||
|| **DISCOUNT_SUM**
[`double`](../../data-types.md) | Абсолютное значение скидки (если используется тип скидки с абсолютным значением) ||
|| **TAX_RATE**
[`double`](../../data-types.md) | Ставка налога в процентах ||
|| **TAX_INCLUDED**
[`boolean`](../../data-types.md) | Индикатор того, включен ли налог в стоимость
Возможные значения:
- `Y` – налог включен
- `N` – налог не включен

||
|| **CUSTOMIZED**
[`boolean`](../../data-types.md) | Изменен (Устаревшее)
Возможные значения:
 - `Y` - Да
 - `N` - Нет

||
|| **MEASURE_CODE**
[`catalog_measure.code`](../../catalog/data-types.md#catalog_measure) | Код единицы измерения ||
|| **MEASURE_NAME**
[`string`](../../data-types.md) | Текстовое представление единицы измерения (например - шт, кг, м, л и т.д.) ||
|| **SORT**
[`integer`](../../data-types.md) | Сортировка ||
|| **XML_ID**
[`string`](../../data-types.md) | Внешний код товара ||
|| **TYPE**
[`integer`](../../data-types.md) | Тип товара
Возможные значения: 
 - `1` - Простой товар
 - `4` - Торговое предложение/вариация
 - `7` - Услуга

||
|| **STORE_ID**
[`integer`](../../data-types.md) | Идентификатор склада. Для получения подробной информации о складе используйте [`catalog.store.get`](../../catalog/store/catalog-store-get.md) ||
|| **RESERVE_ID**
[`integer`](../../data-types.md) | Идентификатор резерва ||
|| **DATE_RESERVE_END**
[`date`](../../data-types.md) | Дата окончания резервации ||
|| **RESERVE_QUANTITY**
[`integer`](../../data-types.md) | Количество зарезервированных единиц товара ||
|#


## Обработка ошибок

HTTP-статус: **400**

```json
{
  "error": "",
  "error_description": "The parameter id is invalid or not defined."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Описание** | **Значение** ||
|| The parameter id is invalid or not defined. | В параметр `id` передано некорректное значение ||
|| Access denied | У пользователя нет прав на «чтение» сделки  ||
|| Not found | Сделка с переданным `id` не найдена ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-deal-productrows-set.md)
