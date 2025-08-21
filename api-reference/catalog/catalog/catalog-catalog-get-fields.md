# Получить доступные поля торгового каталога catalog.catalog.getFields

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод возвращает доступные поля торгового каталога.

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.catalog.getFields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.catalog.getFields
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.catalog.getFields',
    		{}
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
                'catalog.catalog.getFields',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling catalog.catalog.getFields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "catalog.catalog.getFields", {},
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
        'catalog.catalog.getFields',
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
        "catalog": {
            "iblockId": {
                "isImmutable": true,
                "isReadOnly": false,
                "isRequired": true,
                "type": "integer"
            },
            "iblockTypeId": {
                "isImmutable": false,
                "isReadOnly": true,
                "isRequired": false,
                "type": "integer"
            },
            "id": {
                "isImmutable": false,
                "isReadOnly": true,
                "isRequired": false,
                "type": "integer"
            },
            "lid": {
                "isImmutable": false,
                "isReadOnly": true,
                "isRequired": false,
                "type": "string"
            },
            "name": {
                "isImmutable": false,
                "isReadOnly": true,
                "isRequired": false,
                "type": "string"
            },
            "productIblockId": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "type": "integer"
            },
            "skuPropertyId": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "type": "integer"
            },
            "subscription": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "type": "char"
            },
            "vatId": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "type": "integer"
            }
        }
    },
    "time": {
        "start": 1716391172.384998,
        "finish": 1716391172.856295,
        "duration": 0.471297025680542,
        "processing": 0.014213085174560547,
        "date_start": "2024-05-22T18:19:32+03:00",
        "date_finish": "2024-05-22T18:19:32+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **catalog**
[`object`](../../data-types.md) | Объект в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где `field` — идентификатор поля объекта [catalog_catalog](../data-types.md#catalog_catalog), а `value` — объект типа [rest_field_description](../data-types.md#rest_field_description) ||
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
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-catalog-get.md)
- [{#T}](./catalog-catalog-list.md)
- [{#T}](./catalog-catalog-is-offers.md)