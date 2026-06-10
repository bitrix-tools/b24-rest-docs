# Добавить перевод названия типа цены catalog.priceTypeLang.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод добавляет новый перевод названия типа цены. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Значения полей для создания нового перевода названия типа цены ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **catalogGroupId***
[`catalog_price_type.id`](../../data-types.md#catalog_price_type) | Идентификатор типа цены.

Получить идентификаторы типов цен можно с помощью метода [catalog.priceType.list](../catalog-price-type-list.md)
||
|| **name***
[`string`](../../../data-types.md) | Перевод названия типа цены ||
|| **lang***
[`catalog_language.lid`](../../data-types.md#catalog_language) | Идентификатор языка.

Получить идентификаторы языков можно с помощью метода [catalog.priceTypeLang.getLanguages](./catalog-price-type-lang-get-languages.md)
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"catalogGroupId":1,"lang":"kz","name":"PRICE"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.priceTypeLang.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"catalogGroupId":1,"lang":"kz","name":"PRICE"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.priceTypeLang.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type PriceTypeLangAddResult = {
      priceTypeLang: {
        catalogGroupId: number
        id: number
        lang: string
        name: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<PriceTypeLangAddResult>({
        method: 'catalog.priceTypeLang.add',
        params: {
          fields: {
            catalogGroupId: 1,
            lang: 'kz',
            name: 'PRICE',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.priceTypeLang)
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
      async function addPriceTypeLang() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.priceTypeLang.add',
            params: {
              fields: {
                catalogGroupId: 1,
                lang: 'kz',
                name: 'PRICE',
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
          console.info(result.priceTypeLang)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addPriceTypeLang)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.priceTypeLang.add',
                [
                    'fields' => [
                        'catalogGroupId' => 1,
                        'lang'           => "kz",
                        'name'           => "PRICE",
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error()->ex);
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding price type language: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.priceTypeLang.add', 
        {
            fields: {
                catalogGroupId: 1,
                lang: "kz",
                name: "PRICE"
            }
        },
        function(result) {
            if (result.error())
                console.error(result.error().ex);
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.priceTypeLang.add',
        [
            'fields' => [
                'catalogGroupId' => 1,
                'lang' => 'kz',
                'name' => 'PRICE'
            ]
        ]
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
        "priceTypeLang": {
            "catalogGroupId": 1,
            "id": 3,
            "lang": "kz",
            "name": "PRICE"
        }
    },
    "time": {
        "start": 1733839992.06918,
        "finish": 1733839992.36208,
        "duration": 0.29290509223938,
        "processing": 0.0136539936065674,
        "date_start": "2024-12-10T16:13:12+02:00",
        "date_finish": "2024-12-10T16:13:12+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **priceTypeLang**
[`catalog_price_type_lang`](../../data-types.md#catalog_price_type_lang) | Объект с информацией о созданном переводе названия типа цены ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 200040300020,
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300020` | Недостаточно прав для редактирования
|| 
|| `201200000010` | Языка с заданным идентификатором не существует
|| 
|| `201000000000` | Типа цены с заданным идентификатором не существует
|| 
|| `400` | Перевод для заданной пары: тип цены и идентификатор языка уже существуют
|| 
|| `100` | Не передан обязательный параметр `fields`
||
|| `0` | Не установлены обязательные поля
|| 
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-type-lang-update.md)
- [{#T}](./catalog-price-type-lang-get.md)
- [{#T}](./catalog-price-type-lang-list.md)
- [{#T}](./catalog-price-type-lang-delete.md)
- [{#T}](./catalog-price-type-lang-get-languages.md)
- [{#T}](./catalog-price-type-lang-get-fields.md)