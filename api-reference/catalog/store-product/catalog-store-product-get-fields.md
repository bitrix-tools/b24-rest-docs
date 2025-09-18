# Получить поля остатков по складам catalog.storeproduct.getFields

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров»

Метод `catalog.storeproduct.getFields` возвращает поля остатков товара по складам.

## Параметры метода

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.storeproduct.getFields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.storeproduct.getFields
    ```

- JS

    ```js
    try
    {
      const response = await $b24.callMethod(
        'catalog.storeproduct.getFields',
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
                'catalog.storeproduct.getFields',
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
        echo 'Error getting store product fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.storeproduct.getFields', 
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
        'catalog.storeproduct.getFields',
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
        "storeProduct": {
            "amount": {
                "isImmutable": false,
                "isReadOnly": true,
                "isRequired": false,
                "type": "double"
            },
            "id": {
                "isImmutable": false,
                "isReadOnly": true,
                "isRequired": false,
                "type": "integer"
            },
            "productId": {
                "isImmutable": false,
                "isReadOnly": true,
                "isRequired": false,
                "type": "integer"
            },
            "quantityReserved": {
                "isImmutable": false,
                "isReadOnly": true,
                "isRequired": false,
                "type": "double"
            },
            "storeId": {
                "isImmutable": false,
                "isReadOnly": true,
                "isRequired": false,
                "type": "integer"
            }
        }
    },
    "time": {
        "start": 1758088849.185919,
        "finish": 1758088849.224685,
        "duration": 0.038765907287597656,
        "processing": 0.0013179779052734375,
        "date_start": "2025-09-17T09:00:49+03:00",
        "date_finish": "2025-09-17T09:00:49+03:00",
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
|| **storeProduct**
[`object`](../../data-types.md) | Объект в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где `field` — идентификатор поля объекта [catalog_storeproduct](../data-types.md#catalog_storeproduct), а `value` — объект типа [rest_field_description](../data-types.md#rest_field_description) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 200040300010,
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `200040300010` | Access Denied | Недостаточно прав для чтения ||
|| `0` | | Другие ошибки || 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-store-product-get.md)
- [{#T}](./catalog-store-product-list.md)
