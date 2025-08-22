# Обновить тип цены catalog.priceType.update

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод изменяет значения полей типа цены.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_price_type.id`](../data-types.md#catalog_price_type) | Идентификатор типа цены ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для обновления типа цены ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Код типа цены ||
|| **base**
[`string`](../../data-types.md) | Является ли тип цены базовым. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **sort**
[`integer`](../../data-types.md) | Сортировка ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код.

Можно использовать для синхронизации текущего типа цены с аналогичной позицией во внешней системе
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
    -d '{"id":2,"fields":{"name":"Base wholesale price","base":"Y","sort":1,"xmlId":"basewholesale"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.priceType.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":2,"fields":{"name":"Base wholesale price","base":"Y","sort":1,"xmlId":"basewholesale"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.priceType.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.priceType.update', 
    		{
    			id: 2,
    			fields: {
    				name: "Base wholesale price",
    				base: "Y",
    				sort: 1,
    				xmlId: "basewholesale"
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch(error)
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
                'catalog.priceType.update',
                [
                    'id' => 2,
                    'fields' => [
                        'name'  => "Base wholesale price",
                        'base'  => "Y",
                        'sort'  => 1,
                        'xmlId' => "basewholesale",
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
        echo 'Error updating price type: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.priceType.update', 
        {
            id: 2,
            fields: {
                name: "Base wholesale price",
                base: "Y",
                sort: 1,
                xmlId: "basewholesale"
            }
        },
        function(result)
        {
            if(result.error())
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
        'catalog.priceType.update',
        [
            'id' => 2,
            'fields' => [
                'name' => 'Base wholesale price',
                'base' => 'Y',
                'sort' => 1,
                'xmlId' => 'basewholesale'
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
        "priceType": {
            "base": "Y",
            "createdBy": 1,
            "dateCreate": "2024-10-02T17:49:44+02:00",
            "id": 2,
            "modifiedBy": 1,
            "name": "Base wholesale price",
            "sort": 1,
            "timestampX": "2024-10-03T12:29:35+02:00",
            "xmlId": "basewholesale"
        }
    },
    "time": {
        "start": 1712327086.69665,
        "finish": 1712327086.95303,
        "duration": 0.256376028060913,
        "processing": 0.0112268924713135,
        "date_start": "2024-10-03T12:29:35+02:00",
        "date_finish": "2024-10-03T12:29:35+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **priceType**
[`catalog_price_type`](../data-types.md#catalog_price_type) | Объект с информацией об обновленном типе цены ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 0,
    "error_description":"Required fields: name"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300020` | Недостаточно прав для редактирования
||
|| `201000000000` | Типа цены с таким идентификатором не существует
||
|| `100` | Не указан параметр `id`
||
|| `100` | Не указан или пустой параметр `fields`
||
|| `0` | Не переданы обязательные поля структуры `fields`
|| 
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-type-add.md)
- [{#T}](./catalog-price-type-get.md)
- [{#T}](./catalog-price-type-list.md)
- [{#T}](./catalog-price-type-delete.md)
- [{#T}](./catalog-price-type-get-fields.md)