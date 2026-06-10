# Установить секционные настройки свойства catalog.productPropertySection.set

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров»

Метод `catalog.productPropertySection.set` устанавливает секционные настройки свойства товара или вариации.

Если записи секционных настроек для свойства нет, метод создает ее. Если запись уже существует, метод обновляет ее.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **propertyId***
[`catalog_product_property.id`](../data-types.md#catalog_product_property) | Идентификатор свойства товара или вариации.

Идентификаторы свойств можно получить методом [catalog.productProperty.list](../product-property/catalog-product-property-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Поля секционных настроек свойства [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **smartFilter**
[`char`](../../data-types.md) | Показывать ли свойство в умном фильтре. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **displayType**
[`char`](../../data-types.md) | Вид свойства в умном фильтре. Возможные значения:
- `F` — флажки
- `K` — радиокнопки
- `P` — выпадающий список ||
|| **displayExpanded**
[`char`](../../data-types.md) | Показывать ли свойство развернутым в фильтре. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **filterHint**
[`string`](../../data-types.md) | Подсказка в умном фильтре для посетителей ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"propertyId":901,"fields":{"smartFilter":"Y","displayType":"F","displayExpanded":"N","filterHint":"Подсказка для фильтра"}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.productPropertySection.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"propertyId":901,"fields":{"smartFilter":"Y","displayType":"F","displayExpanded":"N","filterHint":"Подсказка для фильтра"},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/catalog.productPropertySection.set
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ProductPropertySectionSetResult = {
      productPropertySection: {
        displayExpanded: string
        displayType: string
        filterHint: string
        iblockId: string
        propertyId: string
        sectionId: string
        smartFilter: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<ProductPropertySectionSetResult>({
        method: 'catalog.productPropertySection.set',
        params: {
          propertyId: 901,
          fields: {
            smartFilter: 'Y',
            displayType: 'F',
            displayExpanded: 'N',
            filterHint: 'Filter hint',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.productPropertySection)
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
      async function setProductPropertySection() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.productPropertySection.set',
            params: {
              propertyId: 901,
              fields: {
                smartFilter: 'Y',
                displayType: 'F',
                displayExpanded: 'N',
                filterHint: 'Filter hint',
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
          console.info(result.productPropertySection)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setProductPropertySection)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.productPropertySection.set',
                [
                    'propertyId' => 901,
                    'fields' => [
                        'smartFilter' => 'Y',
                        'displayType' => 'F',
                        'displayExpanded' => 'N',
                        'filterHint' => 'Подсказка для фильтра',
                    ]
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
        'catalog.productPropertySection.set',
        {
            propertyId: 901,
            fields: {
                smartFilter: 'Y',
                displayType: 'F',
                displayExpanded: 'N',
                filterHint: 'Подсказка для фильтра'
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
        'catalog.productPropertySection.set',
        [
            'propertyId' => 901,
            'fields' => [
                'smartFilter' => 'Y',
                'displayType' => 'F',
                'displayExpanded' => 'N',
                'filterHint' => 'Подсказка для фильтра',
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
        "productPropertySection": {
        "displayExpanded": "N",
        "displayType": "F",
        "filterHint": "Подсказка для фильтра",
        "iblockId": "25",
        "propertyId": "901",
        "sectionId": "0",
        "smartFilter": "Y"
        }
    },
    "time": {
        "start": 1774265022,
        "finish": 1774265022.693577,
        "duration": 0.6935770511627197,
        "processing": 0,
        "date_start": "2026-03-23T14:23:42+03:00",
        "date_finish": "2026-03-23T14:23:42+03:00",
        "operating_reset_at": 1774265622,
        "operating": 0.10450911521911621
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
|| `0` | Access Denied | Недостаточно прав для изменения секционных настроек свойства ||
|| `0` | productPropertySection does not exist. | Свойство с переданным `propertyId` не найдено или не относится к торговому каталогу ||
|| `100` | Could not find value for parameter {fields} | Не передан обязательный параметр `fields` ||
|| `0` | Error setting section properties | Внутренняя ошибка при сохранении секционных настроек свойства ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-section-get.md)
- [{#T}](./catalog-product-property-section-list.md)
