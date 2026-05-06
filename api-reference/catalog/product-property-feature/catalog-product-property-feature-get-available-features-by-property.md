# Получить доступные параметры свойств товаров или вариаций catalog.productPropertyFeature.getAvailableFeaturesByProperty

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров»

Метод `catalog.productPropertyFeature.getAvailableFeaturesByProperty` возвращает список доступных параметров для указанного свойства товара или вариации.

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
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.productPropertyFeature.getAvailableFeaturesByProperty
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"propertyId":901,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/catalog.productPropertyFeature.getAvailableFeaturesByProperty
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod(
            'catalog.productPropertyFeature.getAvailableFeaturesByProperty',
            {
                propertyId: 901
            }
        );

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
                'catalog.productPropertyFeature.getAvailableFeaturesByProperty',
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
        'catalog.productPropertyFeature.getAvailableFeaturesByProperty',
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
        'catalog.productPropertyFeature.getAvailableFeaturesByProperty',
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
        "features": [
        {
            "featureId": "LIST_PAGE_SHOW",
            "featureName": "Показывать на странице списка элементов",
            "moduleId": "iblock"
        },
        {
            "featureId": "DETAIL_PAGE_SHOW",
            "featureName": "Показывать на детальной странице элемента",
            "moduleId": "iblock"
        }
        ]
    },
    "time": {
        "start": 1774250910,
        "finish": 1774250910.453544,
        "duration": 0.45354390144348145,
        "processing": 0,
        "date_start": "2026-03-23T10:28:30+03:00",
        "date_finish": "2026-03-23T10:28:30+03:00",
        "operating_reset_at": 1774251510,
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
|| **features**
[`array`](../../data-types.md) | Массив объектов в формате `{"featureId": "value", "featureName": "value", "moduleId": "value"}`, где:
- `featureId` — код параметра свойства
- `featureName` — название параметра свойства
- `moduleId` — идентификатор модуля, которому принадлежит параметр свойства ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "productPropertyFeature does not exist."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Access Denied | Недостаточно прав для просмотра торгового каталога ||
|| `0` | productPropertyFeature does not exist. | Свойство с переданным `propertyId` не найдено или не относится к торговому каталогу ||
|| `100` | Invalid value {abc} to match with parameter {propertyId}. Should be value of type int. | В `propertyId` передано значение неверного типа ||
|| `100` | Could not find value for parameter {propertyId} | Не передан обязательный параметр `propertyId` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-feature-add.md)
- [{#T}](./catalog-product-property-feature-update.md)
- [{#T}](./catalog-product-property-feature-get.md)
- [{#T}](./catalog-product-property-feature-list.md)
- [{#T}](./catalog-product-property-feature-get-fields.md)
