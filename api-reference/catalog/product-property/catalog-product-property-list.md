# Получить список свойств товаров или вариаций catalog.productProperty.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр каталога

Метод `catalog.productProperty.list` возвращает список свойств товаров и вариаций по фильтру.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив, содержащий список полей, которые необходимо выбрать (смотрите поля объекта [catalog_product_property](../data-types.md#catalog_product_property)).

Если параметр не передан, будут выбраны все поля ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных свойств в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_product_property](../data-types.md#catalog_product_property).

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

Если `iblockId` не передан, метод выбирает свойства всех торговых каталогов. Если передан `iblockId`, который не является каталогом, метод вернет пустой список ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки выбранных свойств в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_product_property](../data-types.md#catalog_product_property).

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
      -d '{"select":["id","name","iblockId","propertyType"],"filter":{"iblockId":19},"order":{"id":"ASC"}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.productProperty.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"select":["id","name","iblockId","propertyType"],"filter":{"iblockId":19},"order":{"id":"ASC"},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/catalog.productProperty.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ProductPropertyListResult = {
      productProperties: {
        iblockId: number
        id: number
        name: string
        propertyType: string
      }[]
    }

    try {
      // catalog.productProperty.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<ProductPropertyListResult>({
        method: 'catalog.productProperty.list',
        params: {
          select: ['id', 'name', 'iblockId', 'propertyType'],
          filter: { iblockId: 19 },
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
        console.info(result.productProperties.length, result.productProperties)
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
      async function fetchProductPropertyList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // catalog.productProperty.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'catalog.productProperty.list',
            params: {
              select: ['id', 'name', 'iblockId', 'propertyType'],
              filter: { iblockId: 19 },
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
          console.info(result.productProperties.length, result.productProperties)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchProductPropertyList)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.productProperty.list',
                [
                    'select' => ['id', 'name', 'iblockId', 'propertyType'],
                    'filter' => [
                        'iblockId' => 19,
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
        'catalog.productProperty.list',
        {
            select: ['id', 'name', 'iblockId', 'propertyType'],
            filter: {
                iblockId: 19
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
        'catalog.productProperty.list',
        [
            'select' => ['id', 'name', 'iblockId', 'propertyType'],
            'filter' => ['iblockId' => 19],
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
        "productProperties": [
            {
                "iblockId": 19,
                "id": 115,
                "name": "Марка",
                "propertyType": "L"
            },
            {
                "iblockId": 19,
                "id": 659,
                "name": "Рубрика",
                "propertyType": "S"
            },
            ... // описание для каждого свойства
        ]
    },
    "next": 50,
    "total": 51,
    "time": {
        "start": 1773933226,
        "finish": 1773933226.400275,
        "duration": 0.40027499198913574,
        "processing": 0,
        "date_start": "2026-03-19T18:13:46+03:00",
        "date_finish": "2026-03-19T18:13:46+03:00",
        "operating_reset_at": 1773933826,
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
|| **productProperties**
[`catalog_product_property[]`](../data-types.md#catalog_product_property) | Массив объектов с информацией о выбранных свойствах ||
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
    "error": "0",
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | Access Denied | Недостаточно прав для просмотра каталога ||
|| `400` | `100` | Invalid value {`...`} to match with parameter {filter}. Should be value of type array | Неверный тип данных у значения параметра `filter` ||
|| `400` | `100` | Invalid value {`...`} to match with parameter {select}. Should be value of type array | Неверный тип данных у значения параметра `select` ||
|| `400` | `100` | Invalid value {`...`} to match with parameter {order}. Should be value of type array | Неверный тип данных у значения параметра `order` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-add.md)
- [{#T}](./catalog-product-property-update.md)
- [{#T}](./catalog-product-property-get.md)
- [{#T}](./catalog-product-property-delete.md)
- [{#T}](./catalog-product-property-get-fields.md)
