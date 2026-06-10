# Получить доступные параметры свойств товаров или вариаций catalog.productPropertyFeature.getAvailableFeaturesByProperty

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

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

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type GetAvailableFeaturesByPropertyResult = {
      features: Array<{
        featureId: string,
        featureName: string,
        moduleId: string,
      }>,
    }

    try {
      const response = await $b24.actions.v2.call.make<GetAvailableFeaturesByPropertyResult>({
        method: 'catalog.productPropertyFeature.getAvailableFeaturesByProperty',
        params: {
          propertyId: 901,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.features)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getAvailableFeaturesByProperty() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.productPropertyFeature.getAvailableFeaturesByProperty',
            params: {
              propertyId: 901,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.features)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getAvailableFeaturesByProperty)
    </script>
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
