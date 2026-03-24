# Добавить параметр свойства товаров или вариаций catalog.productPropertyFeature.add

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» и правом на изменение инфоблока свойства

Метод `catalog.productPropertyFeature.add` добавляет параметр свойства товара или вариации.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Набор полей нового параметра свойства [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **propertyId***
[`catalog_product_property.id`](../data-types.md#catalog_product_property) | Идентификатор свойства товара или вариации.

Идентификаторы свойств можно получить методом [catalog.productProperty.list](../product-property/catalog-product-property-list.md) ||
|| **moduleId***
[`string`](../../data-types.md) | Идентификатор модуля, которому принадлежит параметр свойства.

Идентификатор модуля можно получить методом [catalog.productPropertyFeature.getAvailableFeaturesByProperty](./catalog-product-property-feature-get-available-features-by-property.md) ||
|| **featureId***
[`string`](../../data-types.md) | Код параметра свойства.

Код параметра можно получить методом [catalog.productPropertyFeature.getAvailableFeaturesByProperty](./catalog-product-property-feature-get-available-features-by-property.md) ||
|| **isEnabled***
[`char`](../../data-types.md) | Признак активности параметра. Допустимые значения:
- `Y` — включен
- `N` — выключен ||
|#

{% note info "" %}

Перед добавлением проверьте существующую запись методом [catalog.productPropertyFeature.list](./catalog-product-property-feature-list.md) с фильтром по `propertyId`, `moduleId` и `featureId`. Если запись уже существует, метод вернет ошибку вида `Duplicate entry ... for key ...`

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"fields":{"propertyId":901,"moduleId":"iblock","featureId":"LIST_PAGE_SHOW","isEnabled":"Y"}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.productPropertyFeature.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"fields":{"propertyId":901,"moduleId":"iblock","featureId":"LIST_PAGE_SHOW","isEnabled":"Y"},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/catalog.productPropertyFeature.add
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod('catalog.productPropertyFeature.add', {
            fields: {
                propertyId: 901,
                moduleId: 'iblock',
                featureId: 'LIST_PAGE_SHOW',
                isEnabled: 'Y',
            }
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
                'catalog.productPropertyFeature.add',
                [
                    'fields' => [
                        'propertyId' => 901,
                        'moduleId' => 'iblock',
                        'featureId' => 'LIST_PAGE_SHOW',
                        'isEnabled' => 'Y',
                    ],
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
        'catalog.productPropertyFeature.add',
        {
            fields: {
                propertyId: 901,
                moduleId: 'iblock',
                featureId: 'LIST_PAGE_SHOW',
                isEnabled: 'Y',
            }
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
        'catalog.productPropertyFeature.add',
        [
            'fields' => [
                'propertyId' => 901,
                'moduleId' => 'iblock',
                'featureId' => 'LIST_PAGE_SHOW',
                'isEnabled' => 'Y',
            ]
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
        "productPropertyFeature": {
            "featureId": "LIST_PAGE_SHOW",
            "id": 101,
            "isEnabled": "Y",
            "moduleId": "iblock",
            "propertyId": 901
        }
    },
    "time": {
        "start": 1774013002,
        "finish": 1774013002.429777,
        "duration": 0.4297769069671631,
        "processing": 0,
        "date_start": "2026-03-20T16:23:22+03:00",
        "date_finish": "2026-03-20T16:23:22+03:00",
        "operating_reset_at": 1774013602,
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
|| **productPropertyFeature**
[`catalog_product_property_features`](../data-types.md#catalog_product_property_features) | Объект добавленного параметра свойства ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Required fields: moduleId, featureId, isEnabled"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Access Denied | Недостаточно прав для изменения свойства инфоблока ||
|| `0` | productPropertyFeature does not exist. | Свойство с переданным `propertyId` не найдено или не относится к торговому каталогу ||
|| `0` | Required fields: moduleId, featureId, isEnabled | Не переданы обязательные поля `moduleId`, `featureId`, `isEnabled` ||
|| `0` | Ошибочный набор параметров свойства | Передан некорректный набор `moduleId`, `featureId`, `isEnabled` ||
|| `0` | Mysql query error: (1062) Duplicate entry '...' for key 'b_iblock_property_feature.ix_iblock_property_feature' | Запись с такой комбинацией `propertyId` + `moduleId` + `featureId` уже существует ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-feature-update.md)
- [{#T}](./catalog-product-property-feature-get.md)
- [{#T}](./catalog-product-property-feature-list.md)
- [{#T}](./catalog-product-property-feature-get-available-features-by-property.md)
- [{#T}](./catalog-product-property-feature-get-fields.md)
