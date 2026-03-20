# Получить товары лида crm.lead.productrows.get

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «чтения» лида

{% note warning "Развитие метода остановлено" %}

Метод `crm.lead.productrows.get` продолжает работать, но у него есть более актуальный аналог [crm.item.productrow.*](../universal/product-rows/index.md).

{% endnote %}

Метод `crm.lead.productrows.get` возвращает товарные позиции лида.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id^*^**
[`integer`](../../data-types.md) | Идентификатор лида. Можно получить с помощью метода получения списка лидов: [`crm.lead.list`](./crm-lead-list.md) или при создании лида: [`crm.lead.add`](./crm-lead-add.md) ||
|#

## Примеры кода

Получить товарные позиции лида с `id = 5`

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
	-H "Content-Type: application/json" \
	-H "Accept: application/json" \
	-d '{"id":5}' \
	https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.lead.productrows.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
	-H "Content-Type: application/json" \
	-H "Accept: application/json" \
	-d '{"id":5,"auth":"**put_access_token_here**"}' \
	https://**put_your_bitrix24_address**/rest/crm.lead.productrows.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.lead.productrows.get',
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
                'crm.lead.productrows.get',
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
        echo 'Error getting lead product rows: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.lead.productrows.get',
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
		'crm.lead.productrows.get',
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
			"ID": "1425",
			"OWNER_ID": "5",
			"OWNER_TYPE": "L",
			"PRODUCT_ID": 6935,
			"PRODUCT_NAME": "Товар с вариацией #1",
			"ORIGINAL_PRODUCT_NAME": "Товар с вариацией #1",
			"PRODUCT_DESCRIPTION": null,
			"PRICE": 10,
			"PRICE_EXCLUSIVE": 10,
			"PRICE_NETTO": 10,
			"PRICE_BRUTTO": 10,
			"PRICE_ACCOUNT": "10.00000000",
			"QUANTITY": 1,
			"DISCOUNT_TYPE_ID": 2,
			"DISCOUNT_RATE": 0,
			"DISCOUNT_SUM": 0,
			"TAX_RATE": null,
			"TAX_INCLUDED": "N",
			"CUSTOMIZED": "Y",
			"MEASURE_CODE": 796,
			"MEASURE_NAME": "шт",
			"SORT": 10,
			"XML_ID": "",
			"TYPE": 4,
			"STORE_ID": null,
			"RESERVE_ID": null,
			"DATE_RESERVE_END": null,
			"RESERVE_QUANTITY": null
		},
		{
			"ID": "1429",
			"OWNER_ID": "5",
			"OWNER_TYPE": "L",
			"PRODUCT_ID": 6595,
			"PRODUCT_NAME": "Товар #2",
			"ORIGINAL_PRODUCT_NAME": "Товар #2",
			"PRODUCT_DESCRIPTION": "Детальное описание",
			"PRICE": 22175.328,
			"PRICE_EXCLUSIVE": 19799.4,
			"PRICE_NETTO": 32999,
			"PRICE_BRUTTO": 36958.88,
			"PRICE_ACCOUNT": "22175.32800000",
			"QUANTITY": 1,
			"DISCOUNT_TYPE_ID": 2,
			"DISCOUNT_RATE": 40,
			"DISCOUNT_SUM": 13199.6,
			"TAX_RATE": 12,
			"TAX_INCLUDED": "N",
			"CUSTOMIZED": "Y",
			"MEASURE_CODE": 796,
			"MEASURE_NAME": "шт",
			"SORT": 30,
			"XML_ID": "",
			"TYPE": 1,
			"STORE_ID": null,
			"RESERVE_ID": null,
			"DATE_RESERVE_END": null,
			"RESERVE_QUANTITY": null
		}
	],
	"time": {
		"start": 1772541576,
		"finish": 1772541577.039689,
		"duration": 1.039689064025879,
		"processing": 0,
		"date_start": "2026-03-03T15:39:36+03:00",
		"date_finish": "2026-03-03T15:39:37+03:00",
		"operating_reset_at": 1772542177,
		"operating": 0
	}
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`productrow[]`](#productrow) | Корневой элемент ответа, содержащий массив товарных позиций лида ||
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
[`integer`](../../data-types.md) | Идентификатор элемента, к которому привязан товар. Для данного метода всегда будет равен `id` лида ||
|| **OWNER_TYPE**
[`string`](../../data-types.md) | Строковый идентификатор типа объекта, к которому привязан товар. Для данного метода всегда будет равен `L` ||
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
[`double`](../../data-types.md) | Количество единиц товара ||
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
[`char`](../../data-types.md) | Индикатор того, включен ли налог в стоимость
Возможные значения:
- `Y` – налог включен
- `N` – налог не включен

||
|| **CUSTOMIZED**
[`char`](../../data-types.md) | Изменен (Устаревшее)
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
[`double`](../../data-types.md) | Количество зарезервированных единиц товара ||
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
|| The parameter id is invalid or not defined | В параметр `id` передано некорректное значение ||
|| Access denied | У пользователя нет прав на «чтение» лида ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-lead-productrows-set.md)
