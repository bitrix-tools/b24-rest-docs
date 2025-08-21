# Получить доступные для перевода языков catalog.priceTypeLang.getLanguages

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод возвращает список доступных для перевода языков.

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.priceTypeLang.getLanguages
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.priceTypeLang.getLanguages
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.priceTypeLang.getLanguages',
    		{}
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
                'catalog.priceTypeLang.getLanguages',
                []
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
        echo 'Error getting price type languages: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.priceTypeLang.getLanguages',
        {},
        function(result)
        {
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
        'catalog.priceTypeLang.getLanguages',
        []
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
        "languages": [
            {
                "active": "Y",
                "lid": "ar",
                "name": "ar"
            },
            {
                "active": "Y",
                "lid": "br",
                "name": "br"
            },
            {
                "active": "Y",
                "lid": "en",
                "name": "English"
            },
            {
                "active": "Y",
                "lid": "fr",
                "name": "fr"
            },
            {
                "active": "Y",
                "lid": "id",
                "name": "id"
            },
            {
                "active": "Y",
                "lid": "it",
                "name": "it"
            },
            {
                "active": "Y",
                "lid": "ja",
                "name": "ja"
            },
            {
                "active": "Y",
                "lid": "kz",
                "name": "kz"
            },
            {
                "active": "Y",
                "lid": "la",
                "name": "la"
            },
            {
                "active": "Y",
                "lid": "ms",
                "name": "ms"
            },
            {
                "active": "Y",
                "lid": "pl",
                "name": "pl"
            },
            {
                "active": "Y",
                "lid": "ru",
                "name": "Russian"
            },
            {
                "active": "Y",
                "lid": "sc",
                "name": "sc"
            },
            {
                "active": "Y",
                "lid": "tc",
                "name": "tc"
            },
            {
                "active": "Y",
                "lid": "th",
                "name": "th"
            },
            {
                "active": "Y",
                "lid": "tr",
                "name": "tr"
            },
            {
                "active": "Y",
                "lid": "vn",
                "name": "vn"
            }
        ]
    },
    "total": 17,
    "time": {
        "start": 1733844860.95129,
        "finish": 1733844861.27092,
        "duration": 0.319633007049561,
        "processing": 0.0122489929199219,
        "date_start": "2024-12-10T17:34:20+02:00",
        "date_finish": "2024-12-10T17:34:21+02:00",
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
|| **languages**
[`catalog_language[]`](../../data-types.md#catalog_language) | Массив объектов с информацией о доступных для перевода языках ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 200040300010,
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300010` | Недостаточно прав для чтения
|| 
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-type-lang-add.md)
- [{#T}](./catalog-price-type-lang-update.md)
- [{#T}](./catalog-price-type-lang-get.md)
- [{#T}](./catalog-price-type-lang-list.md)
- [{#T}](./catalog-price-type-lang-delete.md)
- [{#T}](./catalog-price-type-lang-get-fields.md)