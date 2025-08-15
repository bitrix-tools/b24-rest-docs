# Проверить, является ли торговый каталог каталогом вариаций catalog.catalog.isOffers

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод проверяет, является ли торговый каталог торговым каталогом вариаций.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_catalog.id`](../data-types.md#catalog_catalog) | Идентификатор торгового каталога ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":23}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.catalog.isOffers
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":23,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.catalog.isOffers
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.catalog.isOffers',
    		{
    			id: 23,
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
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
                'catalog.catalog.isOffers',
                [
                    'id' => 23,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Info: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error checking if catalog is offers: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "catalog.catalog.isOffers",
        {
            id: 23,
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.catalog.isOffers',
        [
            'id' => 23
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
        "start": 1716543897.864191,
        "finish": 1716543898.270557,
        "duration": 0.40636587142944336,
        "processing": 0.011233091354370117,
        "date_start": "2024-05-24T12:44:57+03:00",
        "date_finish": "2024-05-24T12:44:58+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат проверки, является ли торговый каталог торговым каталогом вариаций ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":0,
    "error_description":"error"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300010` | Недостаточно прав для чтения торгового каталога
|| 
|| `200040300030` | Недостаточно прав для чтения торгового каталога
|| 
|| `100` | Не указан параметр `id`
|| 
|| `0` | Торговый каталог с указанным идентификатором не существует
|| 
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-catalog-get.md)
- [{#T}](./catalog-catalog-list.md)
- [{#T}](./catalog-catalog-get-fields.md)