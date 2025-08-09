# Добавить перевод названия типа цены catalog.priceTypeLang.add

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод добавляет новый перевод названия типа цены. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Значения полей для создания нового перевода названия типа цены ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **catalogGroupId***
[`catalog_price_type.id`](../../data-types.md#catalog_price_type) | Идентификатор типа цены.

Получить идентификаторы типов цен можно с помощью метода [catalog.priceType.list](../catalog-price-type-list.md)
||
|| **name***
[`string`](../../../data-types.md) | Перевод названия типа цены ||
|| **lang***
[`catalog_language.lid`](../../data-types.md#catalog_language) | Идентификатор языка.

Получить идентификаторы языков можно с помощью метода [catalog.priceTypeLang.getLanguages](./catalog-price-type-lang-get-languages.md)
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
    -d '{"fields":{"catalogGroupId":1,"lang":"kz","name":"PRICE"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.priceTypeLang.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"catalogGroupId":1,"lang":"kz","name":"PRICE"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.priceTypeLang.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.priceTypeLang.add', 
    		{
    			fields: {
    				catalogGroupId: 1,
    				lang: "kz",
    				name: "PRICE"
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
                'catalog.priceTypeLang.add',
                [
                    'fields' => [
                        'catalogGroupId' => 1,
                        'lang'           => "kz",
                        'name'           => "PRICE",
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
        echo 'Error adding price type language: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.priceTypeLang.add', 
        {
            fields: {
                catalogGroupId: 1,
                lang: "kz",
                name: "PRICE"
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
        'catalog.priceTypeLang.add',
        [
            'fields' => [
                'catalogGroupId' => 1,
                'lang' => 'kz',
                'name' => 'PRICE'
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
            "id": 3,
            "lang": "kz",
            "name": "PRICE"
        }
    },
    "time": {
        "start": 1733839992.06918,
        "finish": 1733839992.36208,
        "duration": 0.29290509223938,
        "processing": 0.0136539936065674,
        "date_start": "2024-12-10T16:13:12+02:00",
        "date_finish": "2024-12-10T16:13:12+02:00",
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
[`catalog_price_type_lang`](../../data-types.md#catalog_price_type_lang) | Объект с информацией о созданном переводе названия типа цены ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 200040300020,
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300020` | Недостаточно прав для редактирования
|| 
|| `201200000010` | Языка с заданным идентификатором не существует
|| 
|| `201000000000` | Типа цены с заданным идентификатором не существует
|| 
|| `400` | Перевод для заданной пары: тип цены и идентификатор языка уже существуют
|| 
|| `100` | Не передан обязательный параметр `fields`
||
|| `0` | Не установлены обязательные поля
|| 
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-type-lang-update.md)
- [{#T}](./catalog-price-type-lang-get.md)
- [{#T}](./catalog-price-type-lang-list.md)
- [{#T}](./catalog-price-type-lang-delete.md)
- [{#T}](./catalog-price-type-lang-get-languages.md)
- [{#T}](./catalog-price-type-lang-get-fields.md)