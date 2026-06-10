# Изменить значение списочного свойства catalog.productPropertyEnum.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» и правом на изменение инфоблока свойства

Метод `catalog.productPropertyEnum.update` изменяет значение списочного свойства.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор значения списочного свойства.

Идентификатор можно получить методом [catalog.productPropertyEnum.list](./catalog-product-property-enum-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Набор полей обновляемого значения списка [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **propertyId***
[`catalog_product_property.id`](../data-types.md#catalog_product_property) | Идентификатор свойства товара или вариации.

Идентификаторы свойств можно получить методом [catalog.productProperty.list](../product-property/catalog-product-property-list.md) ||
|| **value***
[`string`](../../data-types.md) | Значение элемента списка ||
|| **xmlId***
[`string`](../../data-types.md) | Внешний идентификатор значения списка. Должен быть уникальным в рамках свойства ||
|| **def**
[`char`](../../data-types.md) | Признак значения по умолчанию. Допустимые значения:
- `Y` — по умолчанию
- `N` — не по умолчанию ||
|| **sort**
[`integer`](../../data-types.md) | Индекс сортировки ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"id":1739,"fields":{"propertyId":431,"value":"Средний","xmlId":"M","def":"N","sort":110}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.productPropertyEnum.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"id":1739,"fields":{"propertyId":431,"value":"Средний","xmlId":"M","def":"N","sort":110},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/catalog.productPropertyEnum.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ProductPropertyEnumUpdateResult = {
      productPropertyEnum: {
        def: string,
        id: number,
        propertyId: number,
        sort: number,
        value: string,
        xmlId: string,
      },
    }

    try {
      const response = await $b24.actions.v2.call.make<ProductPropertyEnumUpdateResult>({
        method: 'catalog.productPropertyEnum.update',
        params: {
          id: 1739,
          fields: {
            propertyId: 431,
            value: 'Medium',
            xmlId: 'M',
            def: 'N',
            sort: 110,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.productPropertyEnum)
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
      async function updateProductPropertyEnum() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.productPropertyEnum.update',
            params: {
              id: 1739,
              fields: {
                propertyId: 431,
                value: 'Medium',
                xmlId: 'M',
                def: 'N',
                sort: 110,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.productPropertyEnum)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateProductPropertyEnum)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.productPropertyEnum.update',
                [
                    'id' => 1739,
                    'fields' => [
                        'propertyId' => 431,
                        'value' => 'Средний',
                        'xmlId' => 'M',
                        'def' => 'N',
                        'sort' => 110,
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
        'catalog.productPropertyEnum.update',
        {
            id: 1739,
            fields: {
                propertyId: 431,
                value: 'Средний',
                xmlId: 'M',
                def: 'N',
                sort: 110,
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
        'catalog.productPropertyEnum.update',
        [
            'id' => 1739,
            'fields' => [
                'propertyId' => 431,
                'value' => 'Средний',
                'xmlId' => 'M',
                'def' => 'N',
                'sort' => 110,
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
        "start": 1774339029,
        "finish": 1774339030.119726,
        "duration": 1.1197259426116943,
        "processing": 1,
        "date_start": "2026-03-24T10:57:09+03:00",
        "date_finish": "2026-03-24T10:57:10+03:00",
        "operating_reset_at": 1774339629,
        "operating": 0.1804349422454834
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
[`catalog_product_property_enum`](../data-types.md#catalog_product_property_enum) | Объект обновленного значения списочного свойства ||
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
|| `0` | Access Denied | Недостаточно прав для изменения свойства инфоблока ||
|| `0` | productPropertyEnum does not exist. | Значение списочного свойства с переданным `id` не найдено или не относится к торговому каталогу ||
|| `0` | The specified property does not belong to a product catalog | Свойство с переданным `propertyId` не относится к торговому каталогу ||
|| `0` | Required fields: xmlId | Не передано обязательное поле `xmlId` ||
|| `0` | Internal error updating enumeration value. Try updating again. | Внутренняя ошибка при обновлении значения списка ||
|| `100` | Could not find value for parameter {id} | Не передан обязательный параметр `id` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-enum-add.md)
- [{#T}](./catalog-product-property-enum-get.md)
- [{#T}](./catalog-product-property-enum-list.md)
- [{#T}](./catalog-product-property-enum-delete.md)
- [{#T}](./catalog-product-property-enum-get-fields.md)
