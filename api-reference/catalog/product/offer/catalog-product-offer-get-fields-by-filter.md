# Получить поля вариации товара по фильтру catalog.product.offer.getFieldsByFilter

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод возвращает поля вариации товара по фильтру.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`object`](../../../data-types.md) | Фильтр для получения всех полей вариации товара ||
|#

### Параметр filter

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **iblockId***
[`catalog_catalog.id`](../../data-types.md#catalog_catalog) | Идентификатор информационного блока торгового каталога для вариаций. 

Для получения существующих идентификаторов информационных блоков торговых каталогов необходимо использовать [catalog.catalog.list](../../catalog/catalog-catalog-list.md). У инфоблока вариаций заполнено поле `productIblockId` 
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"iblockId":24}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.product.offer.getFieldsByFilter
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"iblockId":24},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.offer.getFieldsByFilter
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.product.offer.getFieldsByFilter', 
    		{
    			filter: {
    				iblockId: 24,
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
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
                'catalog.product.offer.getFieldsByFilter',
                [
                    'filter' => [
                        'iblockId' => 24,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting fields by filter: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.product.offer.getFieldsByFilter', 
        {
            filter: {
                iblockId: 24,
            }
        },
        function(result) {
            if (result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.product.offer.getFieldsByFilter',
        [
            'filter' => [
                'iblockId' => 24,
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
    "result": {
        "offer": {
            "active": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Активность",
                "type": "char"
            },
            "available": {
                "isImmutable": false,
                "isReadOnly": true,
                "isRequired": false,
                "name": "Доступность к покупке",
                "type": "char"
            },
            "bundle": {
                "isImmutable": false,
                "isReadOnly": true,
                "isRequired": false,
                "name": "Наличие набора",
                "type": "char"
            },
            "canBuyZero": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Разрешение покупки при отсутствии товара",
                "type": "char"
            },
            "code": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Символьный код",
                "type": "string"
            },
            "createdBy": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Кто создал",
                "type": "integer"
            },
            "dateActiveFrom": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "DATE_ACTIVE_FROM",
                "type": "datetime"
            },
            "dateActiveTo": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "DATE_ACTIVE_TO",
                "type": "datetime"
            },
            "dateCreate": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Дата создания",
                "type": "datetime"
            },
            "detailPicture": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Детальная картинка",
                "type": "file"
            },
            "detailText": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Детальное описание",
                "type": "string"
            },
            "detailTextType": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Тип детального описания",
                "type": "string"
            },
            "height": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Высота",
                "type": "double"
            },
            "iblockId": {
                "isImmutable": true,
                "isReadOnly": false,
                "isRequired": true,
                "name": "Идентификатор инфоблока",
                "type": "integer"
            },
            "iblockSectionId": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Основной раздел",
                "type": "integer"
            },
            "id": {
                "isImmutable": false,
                "isReadOnly": true,
                "isRequired": false,
                "name": "Идентификатор",
                "type": "integer"
            },
            "length": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Длина",
                "type": "double"
            },
            "measure": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Единица измерения",
                "type": "integer"
            },
            "modifiedBy": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Кто изменил",
                "type": "integer"
            },
            "name": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": true,
                "name": "Наименование",
                "type": "string"
            },
            "negativeAmountTrace": {
                "isImmutable": false,
                "isReadOnly": true,
                "isRequired": false,
                "name": "NEGATIVE_AMOUNT_TRACE",
                "type": "char"
            },
            "parentId": {
                "isDynamic": true,
                "isImmutable": false,
                "isMultiple": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Элемент каталога",
                "propertyType": "E",
                "type": "productproperty",
                "userType": "SKU"
            },
            "previewPicture": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Картинка анонса",
                "type": "file"
            },
            "previewText": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Описание для анонса",
                "type": "string"
            },
            "previewTextType": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Тип описания для анонса",
                "type": "string"
            },
            "priceType": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Тип оплаты",
                "type": "char"
            },
            "property261": {
                "isDynamic": true,
                "isImmutable": false,
                "isMultiple": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Новая строка",
                "propertyType": "S",
                "type": "productproperty",
                "userType": null
            },
            "property262": {
                "isDynamic": true,
                "isImmutable": false,
                "isMultiple": true,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Новая строка 2",
                "propertyType": "S",
                "type": "productproperty",
                "userType": null
            },
            "purchasingCurrency": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Валюта закупочной цены",
                "type": "string"
            },
            "purchasingPrice": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Закупочная цена",
                "type": "string"
            },
            "quantity": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Доступное количество",
                "type": "double"
            },
            "quantityReserved": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Зарезервированное количество",
                "type": "double"
            },
            "quantityTrace": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Режим количественного учета",
                "type": "char"
            },
            "sort": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Индекс сортировки",
                "type": "integer"
            },
            "subscribe": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Разрешение подписки на товар",
                "type": "char"
            },
            "timestampX": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Дата изменения",
                "type": "datetime"
            },
            "type": {
                "isImmutable": false,
                "isReadOnly": true,
                "isRequired": false,
                "name": "Тип товара",
                "type": "integer"
            },
            "vatId": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Идентификатор НДС",
                "type": "integer"
            },
            "vatIncluded": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "НДС включен в цену",
                "type": "char"
            },
            "weight": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Вес",
                "type": "double"
            },
            "width": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Ширина",
                "type": "double"
            },
            "xmlId": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Внешний код",
                "type": "string"
            }
        }
    },
    "time": {
        "start": 1718625284.575801,
        "finish": 1718625285.105152,
        "duration": 0.529350996017456,
        "processing": 0.06528401374816895,
        "date_start": "2024-06-17T14:54:44+03:00",
        "date_finish": "2024-06-17T14:54:45+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **offer**
[`object`](../../../data-types.md) | Объект в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где `field` — идентификатор поля объекта [catalog_product_offer](../../data-types.md#catalog_product_offer), а `value` — объект типа [rest_field_description](../../data-types.md#rest_field_description) ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":200040300010,
    "error_description":"Access Denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300010` | Недостаточно прав для чтения торгового каталога
|| 
|| `100` | Не указан или пустой параметр `filter`
|| 
|| `0` | Не указан идентификатор информационного блока
|| 
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-offer-add.md)
- [{#T}](./catalog-product-offer-update.md)
- [{#T}](./catalog-product-offer-get.md)
- [{#T}](./catalog-product-offer-list.md)
- [{#T}](./catalog-product-offer-download.md)
- [{#T}](./catalog-product-offer-delete.md)