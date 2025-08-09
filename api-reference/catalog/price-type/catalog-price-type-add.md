# Создать тип цены catalog.priceType.add

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод добавляет новый тип цены.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md)| Значения полей для создания нового типа цены ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Код типа цены.

Чтобы обеспечить стабильную работу внутренних сервисов, код типа цены необходимо указывать только английскими символами
||
|| **base**
[`string`](../../data-types.md) | Является ли тип цены базовым. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `N`.

Одновременно может существовать только один базовый тип цены. При добавлении нового базового типа предыдущий потеряет это свойство и перестанет быть базовым
||
|| **sort**
[`integer`](../../data-types.md) | Сортировка.

По умолчанию `100`
||
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
    -d '{"fields":{"name":"Wholesale price","base":"N","sort":10,"xmlId":"wholesale"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.priceType.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"Wholesale price","base":"N","sort":10,"xmlId":"wholesale"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.priceType.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.priceType.add', 
    		{
    			fields: {
    				name: "Wholesale price",
    				base: "N",
    				sort: 10,
    				xmlId: "wholesale"
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error(error.ex);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.priceType.add',
                [
                    'fields' => [
                        'name'  => "Wholesale price",
                        'base'  => "N",
                        'sort'  => 10,
                        'xmlId' => "wholesale",
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error()->ex);
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding price type: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.priceType.add', 
        {
            fields: {
                name: "Wholesale price",
                base: "N",
                sort: 10,
                xmlId: "wholesale"
            }
        },
        function(result) {
            if (result.error())
                console.error(result.error().ex);
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.priceType.add',
        [
            'fields' => [
                'name' => 'Wholesale price',
                'base' => 'N',
                'sort' => 10,
                'xmlId' => 'wholesale'
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
            "base": "N",
            "createdBy": 1,
            "dateCreate": "2024-10-02T17:49:44+02:00",
            "id": 2,
            "modifiedBy": 1,
            "name": "Wholesale price",
            "sort": 10,
            "timestampX": "2024-10-02T17:49:44+02:00",
            "xmlId": "wholesale"
        }
    },
    "time": {
        "start": 1716552521.40908,
        "finish": 1716552521.69852,
        "duration": 0.289434909820557,
        "processing": 0.011207103729248,
        "date_start": "2024-10-02T17:49:44+02:00",
        "date_finish": "2024-10-02T17:49:44+02:00",
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
[`catalog_price_type`](../data-types.md#catalog_price_type) | Объект с информацией о созданном типе цены ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 200040300020,
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300020` | Недостаточно прав для редактирования
||
|| `100` | Не передан обязательный параметр `fields`
||
|| `0` | Не установлены обязательные поля
|| 
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-price-type-update.md)
- [{#T}](./catalog-price-type-get.md)
- [{#T}](./catalog-price-type-list.md)
- [{#T}](./catalog-price-type-delete.md)
- [{#T}](./catalog-price-type-get-fields.md)