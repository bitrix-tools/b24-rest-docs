# Добавить значение списочного свойства catalog.productPropertyEnum.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» и правом на изменение инфоблока свойства

Метод `catalog.productPropertyEnum.add` добавляет значение списочного свойства.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Набор полей нового значения списка [(подробное описание)](#fields) ||
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

{% note info "" %}

Метод добавляет значения только для свойств типа `L` (список). Если передать `propertyId` свойства другого типа, метод вернет ошибку `Only list properties are supported`.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"fields":{"propertyId":431,"value":"Средний","xmlId":"M","def":"Y","sort":100}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.productPropertyEnum.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"fields":{"propertyId":431,"value":"Средний","xmlId":"M","def":"Y","sort":100},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/catalog.productPropertyEnum.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ProductPropertyEnumAddResult = {
      productPropertyEnum: {
        def: string
        id: number
        propertyId: number
        sort: number
        value: string
        xmlId: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<ProductPropertyEnumAddResult>({
        method: 'catalog.productPropertyEnum.add',
        params: {
          fields: {
            propertyId: 431,
            value: 'Medium',
            xmlId: 'M',
            def: 'Y',
            sort: 100,
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
      async function addProductPropertyEnum() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.productPropertyEnum.add',
            params: {
              fields: {
                propertyId: 431,
                value: 'Medium',
                xmlId: 'M',
                def: 'Y',
                sort: 100,
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

      document.addEventListener('DOMContentLoaded', addProductPropertyEnum)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.productPropertyEnum.add',
                [
                    'fields' => [
                        'propertyId' => 431,
                        'value' => 'Средний',
                        'xmlId' => 'M',
                        'def' => 'Y',
                        'sort' => 100,
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
        'catalog.productPropertyEnum.add',
        {
            fields: {
                propertyId: 431,
                value: 'Средний',
                xmlId: 'M',
                def: 'Y',
                sort: 100,
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
        'catalog.productPropertyEnum.add',
        [
            'fields' => [
                'propertyId' => 431,
                'value' => 'Средний',
                'xmlId' => 'M',
                'def' => 'Y',
                'sort' => 100,
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
        "def": "Y",
        "id": 1739,
        "propertyId": 431,
        "sort": 100,
        "value": "Средний",
        "xmlId": "M"
        }
    },
    "time": {
        "start": 1774279799,
        "finish": 1774279799.330864,
        "duration": 0.33086395263671875,
        "processing": 0,
        "date_start": "2026-03-23T18:29:59+03:00",
        "date_finish": "2026-03-23T18:29:59+03:00",
        "operating_reset_at": 1774280399,
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
[`catalog_product_property_enum`](../data-types.md#catalog_product_property_enum) | Объект добавленного значения списочного свойства ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "BX_INVALID_VALUE",
    "error_description": "Запись со значением Внешний код, равным ..., уже есть в базе данных"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Access Denied | Недостаточно прав для изменения свойства инфоблока ||
|| `0` | productPropertyEnum does not exist. | Свойство с переданным `propertyId` не найдено или не относится к торговому каталогу ||
|| `0` | Only list properties are supported | Передано свойство, тип которого не `Список` ||
|| `0` | Required fields: xmlId | Не передано обязательное поле `xmlId` ||
|| `0` | A value with xmlId '...' already exists. | Значение с таким `xmlId` уже существует в рамках свойства ||
|| `BX_INVALID_VALUE` | Запись со значением "Внешний код", равным "...", уже есть в базе данных | Локализованная ошибка дубликата `xmlId` ||
|| `0` | Internal error adding enumeration value. Try adding again. | Внутренняя ошибка при добавлении значения списка ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-enum-update.md)
- [{#T}](./catalog-product-property-enum-get.md)
- [{#T}](./catalog-product-property-enum-list.md)
- [{#T}](./catalog-product-property-enum-delete.md)
- [{#T}](./catalog-product-property-enum-get-fields.md)
