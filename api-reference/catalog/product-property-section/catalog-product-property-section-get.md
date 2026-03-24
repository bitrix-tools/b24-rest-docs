# Получить секционные настройки свойства catalog.productPropertySection.get

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров»

Метод `catalog.productPropertySection.get` возвращает секционные настройки свойства товара или вариации по идентификатору свойства.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **propertyId***
[`catalog_product_property.id`](../data-types.md#catalog_product_property) | Идентификатор свойства товара или вариации.

Идентификаторы свойств можно получить методом [catalog.productProperty.list](../product-property/catalog-product-property-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"propertyId":901}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.productPropertySection.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"propertyId":901,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/catalog.productPropertySection.get
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod('catalog.productPropertySection.get', {
            propertyId: 901
        });

        console.log(response.getData().result);
    }
    catch (error) {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.productPropertySection.get',
                [
                    'propertyId' => 901
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
        'catalog.productPropertySection.get',
        {
            propertyId: 901
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
        'catalog.productPropertySection.get',
        [
            'propertyId' => 901
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
        "productPropertySection": {
        "displayExpanded": "N",
        "displayType": "F",
        "filterHint": "Подсказка для фильтра",
        "propertyId": 901,
        "smartFilter": "Y"
        }
    },
    "time": {
        "start": 1774266712,
        "finish": 1774266712.876045,
        "duration": 0.8760449886322021,
        "processing": 0,
        "date_start": "2026-03-23T14:51:52+03:00",
        "date_finish": "2026-03-23T14:51:52+03:00",
        "operating_reset_at": 1774267312,
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
|| **productPropertySection**
[`catalog_product_property_section`](../data-types.md#catalog_product_property_section) | Объект секционных настроек свойства ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "productPropertySection does not exist."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Access Denied | Недостаточно прав для просмотра торгового каталога ||
|| `0` | productPropertySection does not exist. | Свойство с переданным `propertyId` не найдено или не относится к торговому каталогу ||
|| `100` | Invalid value {abc} to match with parameter {propertyId}. Should be value of type int. | В `propertyId` передано значение неверного типа ||
|| `100` | Could not find value for parameter {propertyId} | Не передан обязательный параметр `propertyId` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-section-set.md)
- [{#T}](./catalog-product-property-section-list.md)
