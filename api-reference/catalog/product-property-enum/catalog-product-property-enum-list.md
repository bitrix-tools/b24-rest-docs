# Получить список значений списочных свойств catalog.productPropertyEnum.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров»

Метод `catalog.productPropertyEnum.list` возвращает список значений списочных свойств по фильтру.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив, содержащий список полей, которые необходимо выбрать (смотрите поля объекта [catalog_product_property_enum](../data-types.md#catalog_product_property_enum)).

Если параметр не передан, будут выбраны все поля ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных значений в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_product_property_enum](../data-types.md#catalog_product_property_enum).

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении
- `%=` — LIKE (аналогично `=%`)
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении
- `!%=` — NOT LIKE (аналогично `!=%`)
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно
  
Если `propertyId` не передан, метод выбирает значения всех списочных свойств торговых каталогов. Если передан `propertyId`, который не существует или не относится к торговому каталогу, метод вернет пустой список ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки выбранных значений в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_product_property_enum](../data-types.md#catalog_product_property_enum).

Возможные значения для `order`:
- `ASC` — в порядке возрастания
- `DESC` — в порядке убывания

Если параметр не передан, применяется сортировка `id ASC` ||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — `100` и так далее.

Формула расчета значения параметра `start`: `start = (N - 1) * 50`, где `N` — номер нужной страницы.

Если передать значение `-1`, в ответе не будет поля `total` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"select":["id","propertyId","value","def","sort","xmlId"],"filter":{"propertyId":431},"order":{"id":"ASC"}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.productPropertyEnum.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"select":["id","propertyId","value","def","sort","xmlId"],"filter":{"propertyId":431},"order":{"id":"ASC"},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/catalog.productPropertyEnum.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ProductPropertyEnumItem = {
      def: string
      id: number
      propertyId: number
      sort: number
      value: string
      xmlId: string
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ProductPropertyEnumListResult = {
      productPropertyEnums: ProductPropertyEnumItem[]
    }

    try {
      // catalog.productPropertyEnum.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<ProductPropertyEnumListResult>({
        method: 'catalog.productPropertyEnum.list',
        params: {
          select: ['id', 'propertyId', 'value', 'def', 'sort', 'xmlId'],
          filter: { propertyId: 431 },
          order: { id: 'ASC' },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Property enum values:', result.productPropertyEnums, 'count:', result.productPropertyEnums.length)
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
      async function fetchProductPropertyEnumList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // catalog.productPropertyEnum.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'catalog.productPropertyEnum.list',
            params: {
              select: ['id', 'propertyId', 'value', 'def', 'sort', 'xmlId'],
              filter: { propertyId: 431 },
              order: { id: 'ASC' },
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Property enum values:', result.productPropertyEnums, 'count:', result.productPropertyEnums.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchProductPropertyEnumList)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.productPropertyEnum.list',
                [
                    'select' => ['id', 'propertyId', 'value', 'def', 'sort', 'xmlId'],
                    'filter' => [
                        'propertyId' => 431,
                    ],
                    'order' => ['id' => 'ASC'],
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
        'catalog.productPropertyEnum.list',
        {
            select: ['id', 'propertyId', 'value', 'def', 'sort', 'xmlId'],
            filter: {
                propertyId: 431
            },
            order: { id: 'ASC' }
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
        'catalog.productPropertyEnum.list',
        [
            'select' => ['id', 'propertyId', 'value', 'def', 'sort', 'xmlId'],
            'filter' => ['propertyId' => 431],
            'order' => ['id' => 'ASC'],
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
        "productPropertyEnums": [
        {
            "def": "N",
            "id": 433,
            "propertyId": 431,
            "sort": 500,
            "value": "первое",
            "xmlId": "1"
        },
        {
            "def": "N",
            "id": 435,
            "propertyId": 431,
            "sort": 500,
            "value": "второе",
            "xmlId": "2"
        },
        {
            "def": "N",
            "id": 437,
            "propertyId": 431,
            "sort": 500,
            "value": "третье",
            "xmlId": "3"
        },
        {
            "def": "N",
            "id": 439,
            "propertyId": 431,
            "sort": 500,
            "value": "четвертое",
            "xmlId": "4"
        },
        {
            "def": "N",
            "id": 441,
            "propertyId": 431,
            "sort": 500,
            "value": "пятое",
            "xmlId": "5"
        }
        ]
    },
    "total": 5,
    "time": {
        "start": 1774339997,
        "finish": 1774339997.456867,
        "duration": 0.456866979598999,
        "processing": 0,
        "date_start": "2026-03-24T11:13:17+03:00",
        "date_finish": "2026-03-24T11:13:17+03:00",
        "operating_reset_at": 1774340597,
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
|| **productPropertyEnums**
[`catalog_product_property_enum[]`](../data-types.md#catalog_product_property_enum) | Массив объектов с информацией о выбранных значениях списочных свойств ||
|| **next**
[`integer`](../../data-types.md) | Смещение для следующей страницы. Поле возвращается, если есть еще записи ||
|| **total**
[`integer`](../../data-types.md) | Общее число записей. Поле не возвращается, если запрос выполнен со `start = -1` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Invalid value string to match with parameter filter. Should be value of type array."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Access Denied | Недостаточно прав для просмотра каталога ||
|| `100` | Invalid value {wrong_type} to match with parameter {filter}. Should be value of type array. | Неверный тип данных у значения параметра `filter` ||
|| `100` | Invalid value {wrong_type} to match with parameter {select}. Should be value of type array. | Неверный тип данных у значения параметра `select` ||
|| `100` | Invalid value {wrong_type} to match with parameter {order}. Should be value of type array. | Неверный тип данных у значения параметра `order` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-enum-add.md)
- [{#T}](./catalog-product-property-enum-update.md)
- [{#T}](./catalog-product-property-enum-get.md)
- [{#T}](./catalog-product-property-enum-delete.md)
- [{#T}](./catalog-product-property-enum-get-fields.md)
