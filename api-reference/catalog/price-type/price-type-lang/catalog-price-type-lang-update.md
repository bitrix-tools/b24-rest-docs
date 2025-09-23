# Изменить перевод названия типа цены catalog.priceTypeLang.update

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод изменяет перевод названия типа цены по его идентификатору. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **Id***
[`catalog_price_type_lang.id`](../../data-types.md#catalog_price_type_lang) | Идентификатор перевода названия типа цены ||
|| **fields***
[`object`](../../../data-types.md) | Значения полей для обновления перевода названия типа цены ||
|#

### Параметр fields

#|
|| **Название**
`тип` | **Описание** ||
|| **catalogGroupId**
[`catalog_price_type.id`](../../data-types.md#catalog_price_type) | Идентификатор типа цены.

Получить идентификаторы типов цен можно с помощью метода [catalog.priceType.list](../catalog-price-type-list.md)
||
|| **name**
[`string`](../../../data-types.md) | Перевод названия типа цены ||
|| **lang**
[`catalog_language.lid`](../../data-types.md#catalog_language) | Идентификатор языка.

Получить идентификаторы языков можно с помощью метода [catalog.priceTypeLang.getLanguages](./catalog-price-type-lang-get-languages.md)
||
|#

В параметре `fields` необходимо указать хотя бы одно поле.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6,"fields":{"name":"Base Price"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.priceTypeLang.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6,"fields":{"name":"Base Price"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.priceTypeLang.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.priceTypeLang.update', 
    		{
    			id: 6,
    			fields: {
    				name: "Base Price",
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
                'catalog.priceTypeLang.update',
                [
                    'id' => 6,
                    'fields' => [
                        'name' => "Base Price",
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
        echo 'Error updating price type language: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.priceTypeLang.update', 
        {
            id: 6,
            fields: {
                name: "Base Price",
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
        'catalog.priceTypeLang.update',
        [
            'id' => 6,
            'fields' => [
                'name' => 'Base Price'
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
        "priceTypeLang": {
            "catalogGroupId": 1,
            "id": 6,
            "lang": "kz",
            "name": "Base Price"
        }
    },
    "time": {
        "start": 1733843735.3651,
        "finish": 1733843735.75101,
        "duration": 0.385910987854004,
        "processing": 0.0111708641052246,
        "date_start": "2024-12-10T17:15:35+02:00",
        "date_finish": "2024-12-10T17:15:35+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **priceTypeLang**
[`catalog_price_type_lang`](../../data-types.md#catalog_price_type_lang) | Объект с информацией об обновленном переводе названия типа цены ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 0,
    "error_description":"Required fields: name"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300020` | Недостаточно прав для редактирования
|| 
|| `201200000000` | Перевода названия типа цены с таким идентификатором не существует
|| 
|| `201200000010` | Языка с заданным идентификатором не существует
|| 
|| `201000000000` | Типа цены с заданным идентификатором не существует
|| 
|| `400` | Перевод для заданной пары: тип цены и идентификатор языка уже существуют
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

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-type-lang-add.md)
- [{#T}](./catalog-price-type-lang-get.md)
- [{#T}](./catalog-price-type-lang-list.md)
- [{#T}](./catalog-price-type-lang-delete.md)
- [{#T}](./catalog-price-type-lang-get-languages.md)
- [{#T}](./catalog-price-type-lang-get-fields.md)