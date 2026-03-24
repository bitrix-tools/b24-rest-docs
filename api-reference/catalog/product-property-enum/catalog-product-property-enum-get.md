# Получить значение списочного свойства catalog.productPropertyEnum.get

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров»

Метод `catalog.productPropertyEnum.get` возвращает значение списочного свойства по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор значения списочного свойства.

Идентификатор можно получить методом [catalog.productPropertyEnum.list](./catalog-product-property-enum-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"id":1739}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.productPropertyEnum.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"id":1739,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/catalog.productPropertyEnum.get
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod('catalog.productPropertyEnum.get', {
            id: 1739,
        });

        console.log(response.getData().result);
    } catch (error) {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.productPropertyEnum.get',
                [
                    'id' => 1739,
                ]
            );

        print_r($response->getResponseData()->getResult());
    } catch (\Throwable $exception) {
        echo $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.productPropertyEnum.get',
        {
            id: 1739,
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.productPropertyEnum.get',
        [
            'id' => 1739,
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "productPropertyEnum": {
        "def": "N",
        "id": 1739,
        "propertyId": 431,
        "sort": 110,
        "value": "Средний",
        "xmlId": "M"
        }
    },
    "time": {
        "start": 1774339640,
        "finish": 1774339640.975328,
        "duration": 0.9753279685974121,
        "processing": 0,
        "date_start": "2026-03-24T11:07:20+03:00",
        "date_finish": "2026-03-24T11:07:20+03:00",
        "operating_reset_at": 1774340240,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой объект ответа ||
|| **productPropertyEnum**
[`catalog_product_property_enum`](../data-types.md#catalog_product_property_enum) | Объект значения списочного свойства ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "productPropertyEnum does not exist."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Access Denied | Недостаточно прав для просмотра торгового каталога ||
|| `0` | productPropertyEnum does not exist. | Значение списочного свойства с переданным `id` не найдено ||
|| `100` | Could not find value for parameter {id} | Не передан обязательный параметр `id` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-enum-add.md)
- [{#T}](./catalog-product-property-enum-update.md)
- [{#T}](./catalog-product-property-enum-list.md)
- [{#T}](./catalog-product-property-enum-delete.md)
- [{#T}](./catalog-product-property-enum-get-fields.md)
