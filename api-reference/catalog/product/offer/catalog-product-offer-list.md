# Получить список вариаций товара catalog.product.offer.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод возвращает список вариаций товара по фильтру.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | 
Массив со списком полей, которые необходимо выбрать (смотрите поля объекта [catalog_product_offer](../../data-types.md#catalog_product_offer)).

Обязательные поля: `id`, `iblockId`
||
|| **filter**
[`object`](../../../data-types.md) | Объект для фильтрации выбранных вариаций товара в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_product_offer](../../data-types.md#catalog_product_offer). 

Обязательные поля: `iblockId` — идентификатор информационного блока торгового каталога для вариаций. 
Для получения существующих идентификаторов информационных блоков торговых каталогов необходимо использовать [catalog.catalog.list](../../catalog/catalog-catalog-list.md). У инфоблока вариаций заполнено поле `productIblockId`.

Ключу можно задать дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, начинающиеся с «мол»
    - `"%мол"` — ищет значения, заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где «мол» может быть в любой позиции
- `%=` — LIKE (аналогично `=%`)
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обеих сторон
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, не начинающиеся с «мол»
    - `"%мол"` — ищет значения, не заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где подстроки «мол» нет в любой позиции
- `!%=` — NOT LIKE (аналогично `!=%`)
- `=` — равно, точное совпадение (используется по умолчанию). Для поиска IN можно передавать несколько значений массивом 
- `!=` — не равно
- `!` — не равно. Для поиска NOT IN можно передавать несколько значений массивом

Для пользовательских полей `propertyN` формат значения в `filter` зависит от типа условия:
- если фильтруете свойство типа дата или дата-время по диапазону, используйте префикс в ключе, а значение передавайте в поле `value`
- если фильтруете числовое, строковое или списочное пользовательское поле по точному совпадению, передавайте значение напрямую, без `value`
- для поиска `IN` и `NOT IN` можно передавать массив значений

Примеры фильтрации по пользовательским полям:

```js
filter: {
    iblockId: 24,
    '>=property424': {
        value: '2025-05-29T12:00:00+03:00'
    },
    '<=property424': {
        value: '2025-05-30T13:00:00+03:00'
    },
    property996: 9636,
    property997: [9636, 568, 570, 9658],
}
```
||
|| **order**
[`object`](../../../data-types.md) | 
Объект для сортировки выбранных вариаций товара в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_product_offer](../../data-types.md#catalog_product_offer).

Возможные значения для `order`:
- `asc` — в порядке возрастания
- `desc` — в порядке убывания
||
|| **start**
[`integer`](../../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы
||
|#

{% note warning "Работа с ценой товара" %}

Чтобы получить цены вариаций, используйте методы [catalog.price.*](../../price/index.md).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","iblockId","name","active","available","barcodeMulti","bundle","canBuyZero","code","createdBy","dateActiveFrom","dateActiveTo","dateCreate","detailPicture","detailText","detailTextType","height","iblockSectionId","length","measure","modifiedBy","previewPicture","previewText","previewTextType","purchasingCurrency","purchasingPrice","quantity","quantityReserved","quantityTrace","recurSchemeLength","recurSchemeType","sort","subscribe","timestampX","trialPriceId","type","vatId","vatIncluded","weight","width","withoutOrder","xmlId","parentId","property258","property259"],"filter":{"iblockId":24,">id":10,"vatId":[1,2]},"order":{"id":"desc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.offer.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","iblockId","name","active","available","barcodeMulti","bundle","canBuyZero","code","createdBy","dateActiveFrom","dateActiveTo","dateCreate","detailPicture","detailText","detailTextType","height","iblockSectionId","length","measure","modifiedBy","previewPicture","previewText","previewTextType","purchasingCurrency","purchasingPrice","quantity","quantityReserved","quantityTrace","recurSchemeLength","recurSchemeType","sort","subscribe","timestampX","trialPriceId","type","vatId","vatIncluded","weight","width","withoutOrder","xmlId","parentId","property258","property259"],"filter":{"iblockId":24,">id":10,"vatId":[1,2]},"order":{"id":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.offer.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ProductOffer = {
      id: number
      iblockId: number
      name: string
      active: string
      available: string
      barcodeMulti: string
      bundle: string
      canBuyZero: string
      code: string
      createdBy: number
      dateActiveFrom: ISODate | null
      dateActiveTo: ISODate | null
      dateCreate: ISODate | null
      detailPicture: { id: string; url: string; urlMachine: string } | null
      detailText: string | null
      detailTextType: string
      height: number
      iblockSectionId: number | null
      length: number
      measure: number
      modifiedBy: number
      parentId: { value: string; valueId: string }
      previewPicture: { id: string; url: string; urlMachine: string } | null
      previewText: string | null
      previewTextType: string
      purchasingCurrency: string
      purchasingPrice: number
      quantity: number
      quantityReserved: number
      quantityTrace: string
      recurSchemeLength: number | null
      recurSchemeType: string
      sort: number
      subscribe: string
      timestampX: ISODate | null
      trialPriceId: number | null
      type: number
      vatId: number
      vatIncluded: string
      weight: number
      width: number
      withoutOrder: string
      xmlId: string
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ProductOfferListResult = {
      offers: ProductOffer[]
    }

    try {
      // catalog.product.offer.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<ProductOfferListResult>({
        method: 'catalog.product.offer.list',
        params: {
          select: [
            'id',
            'iblockId',
            'name',
            'active',
            'available',
            'barcodeMulti',
            'bundle',
            'canBuyZero',
            'code',
            'createdBy',
            'dateActiveFrom',
            'dateActiveTo',
            'dateCreate',
            'detailPicture',
            'detailText',
            'detailTextType',
            'height',
            'iblockSectionId',
            'length',
            'measure',
            'modifiedBy',
            'previewPicture',
            'previewText',
            'previewTextType',
            'purchasingCurrency',
            'purchasingPrice',
            'quantity',
            'quantityReserved',
            'quantityTrace',
            'recurSchemeLength',
            'recurSchemeType',
            'sort',
            'subscribe',
            'timestampX',
            'trialPriceId',
            'type',
            'vatId',
            'vatIncluded',
            'weight',
            'width',
            'withoutOrder',
            'xmlId',
            'parentId',
            'property258',
            'property259',
          ],
          filter: {
            iblockId: 24,
            '>id': 10,
            vatId: [1, 2],
          },
          order: {
            id: 'desc',
          },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Offers count:', result.offers.length, 'First offer:', result.offers[0])
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
      async function listProductOffers() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // catalog.product.offer.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'catalog.product.offer.list',
            params: {
              select: [
                'id',
                'iblockId',
                'name',
                'active',
                'available',
                'barcodeMulti',
                'bundle',
                'canBuyZero',
                'code',
                'createdBy',
                'dateActiveFrom',
                'dateActiveTo',
                'dateCreate',
                'detailPicture',
                'detailText',
                'detailTextType',
                'height',
                'iblockSectionId',
                'length',
                'measure',
                'modifiedBy',
                'previewPicture',
                'previewText',
                'previewTextType',
                'purchasingCurrency',
                'purchasingPrice',
                'quantity',
                'quantityReserved',
                'quantityTrace',
                'recurSchemeLength',
                'recurSchemeType',
                'sort',
                'subscribe',
                'timestampX',
                'trialPriceId',
                'type',
                'vatId',
                'vatIncluded',
                'weight',
                'width',
                'withoutOrder',
                'xmlId',
                'parentId',
                'property258',
                'property259',
              ],
              filter: {
                iblockId: 24,
                '>id': 10,
                vatId: [1, 2],
              },
              order: {
                id: 'desc',
              },
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
          console.info('Offers count:', result.offers.length, 'First offer:', result.offers[0])
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listProductOffers)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.product.offer.list',
                [
                    'select' => [
                        'id',
                        'iblockId',
                        'name',
                        'active',
                        'available',
                        'barcodeMulti',
                        'bundle',
                        'canBuyZero',
                        'code',
                        'createdBy',
                        'dateActiveFrom',
                        'dateActiveTo',
                        'dateCreate',
                        'detailPicture',
                        'detailText',
                        'detailTextType',
                        'height',
                        'iblockSectionId',
                        'length',
                        'measure',
                        'modifiedBy',
                        'previewPicture',
                        'previewText',
                        'previewTextType',
                        'purchasingCurrency',
                        'purchasingPrice',
                        'quantity',
                        'quantityReserved',
                        'quantityTrace',
                        'recurSchemeLength',
                        'recurSchemeType',
                        'sort',
                        'subscribe',
                        'timestampX',
                        'trialPriceId',
                        'type',
                        'vatId',
                        'vatIncluded',
                        'weight',
                        'width',
                        'withoutOrder',
                        'xmlId',
                        'parentId',
                        'property258',
                        'property259',
                    ],
                    'filter' => [
                        'iblockId' => 24,
                        '>id'      => 10,
                        'vatId'    => [1, 2],
                    ],
                    'order'  => [
                        'id' => 'desc',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching product offers: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "catalog.product.offer.list", {
            "select": [
                "id",
                "iblockId",
                "name",
                "active",
                "available",
                "barcodeMulti",
                "bundle",
                "canBuyZero",
                "code",
                "createdBy",
                "dateActiveFrom",
                "dateActiveTo",
                "dateCreate",
                "detailPicture",
                "detailText",
                "detailTextType",
                "height",
                "iblockSectionId",
                "length",
                "measure",
                "modifiedBy",
                "previewPicture",
                "previewText",
                "previewTextType",
                "purchasingCurrency",
                "purchasingPrice",
                "quantity",
                "quantityReserved",
                "quantityTrace",
                "recurSchemeLength",
                "recurSchemeType",
                "sort",
                "subscribe",
                "timestampX",
                "trialPriceId",
                "type",
                "vatId",
                "vatIncluded",
                "weight",
                "width",
                "withoutOrder",
                "xmlId",
                "parentId",
                "property258",
                "property259",
            ],
            "filter": {
                "iblockId": 24,
                ">id": 10,
                "vatId": [1, 2],
            },
            "order": {
                "id": "desc",
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.product.offer.list',
        [
            'select' => [
                "id",
                "iblockId",
                "name",
                "active",
                "available",
                "barcodeMulti",
                "bundle",
                "canBuyZero",
                "code",
                "createdBy",
                "dateActiveFrom",
                "dateActiveTo",
                "dateCreate",
                "detailPicture",
                "detailText",
                "detailTextType",
                "height",
                "iblockSectionId",
                "length",
                "measure",
                "modifiedBy",
                "previewPicture",
                "previewText",
                "previewTextType",
                "purchasingCurrency",
                "purchasingPrice",
                "quantity",
                "quantityReserved",
                "quantityTrace",
                "recurSchemeLength",
                "recurSchemeType",
                "sort",
                "subscribe",
                "timestampX",
                "trialPriceId",
                "type",
                "vatId",
                "vatIncluded",
                "weight",
                "width",
                "withoutOrder",
                "xmlId",
                "parentId",
                "property258",
                "property259",
            ],
            'filter' => [
                "iblockId" => 24,
                ">id" => 10,
                "vatId" => [1, 2],
            ],
            'order' => [
                "id" => "desc",
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
        "offers": [
            {
                "active": "Y",
                "available": "Y",
                "barcodeMulti": "N",
                "bundle": "N",
                "canBuyZero": "Y",
                "code": "Tovar",
                "createdBy": 1,
                "dateActiveFrom": "2024-05-28T10:00:00+03:00",
                "dateActiveTo": "2024-05-29T10:00:00+03:00",
                "dateCreate": "2024-05-27T10:00:00+03:00",
                "detailPicture": {
                    "id": "6538",
                    "url": "\/rest\/catalog.product.download?fields%5BfieldName%5D=detailPicture\u0026fields%5BfileId%5D=6538\u0026fields%5BproductId%5D=1286",
                    "urlMachine": "\/rest\/catalog.product.download?fields%5BfieldName%5D=detailPicture\u0026fields%5BfileId%5D=6538\u0026fields%5BproductId%5D=1286"
                },
                "detailText": null,
                "detailTextType": "text",
                "height": 100,
                "iblockId": 24,
                "iblockSectionId": null,
                "id": 1286,
                "length": 100,
                "measure": 5,
                "modifiedBy": 1,
                "name": "Вариация товара",
                "parentId": {
                    "value": "1275",
                    "valueId": "9867"
                },
                "previewPicture": {
                    "id": "6537",
                    "url": "\/rest\/catalog.product.download?fields%5BfieldName%5D=previewPicture\u0026fields%5BfileId%5D=6537\u0026fields%5BproductId%5D=1286",
                    "urlMachine": "\/rest\/catalog.product.download?fields%5BfieldName%5D=previewPicture\u0026fields%5BfileId%5D=6537\u0026fields%5BproductId%5D=1286"
                },
                "previewText": null,
                "previewTextType": "text",
                "purchasingCurrency": "RUB",
                "purchasingPrice": 1000,
                "quantity": 10,
                "quantityReserved": 1,
                "quantityTrace": "Y",
                "recurSchemeLength": null,
                "recurSchemeType": "D",
                "sort": 100,
                "subscribe": "Y",
                "timestampX": "2024-06-17T12:29:59+03:00",
                "trialPriceId": null,
                "type": 4,
                "vatId": 1,
                "vatIncluded": "Y",
                "weight": 100,
                "width": 100,
                "withoutOrder": "N",
                "xmlId": "1286"
            }
        ]
    },
    "total": 1,
    "time": {
        "start": 1718625858.291581,
        "finish": 1718625858.937026,
        "duration": 0.6454451084136963,
        "processing": 0.2336890697479248,
        "date_start": "2024-06-17T15:04:18+03:00",
        "date_finish": "2024-06-17T15:04:18+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **offers**
[`catalog_product_offer[]`](../../data-types.md#catalog_product_offer) | Массив объектов с информацией о выбранных вариациях товара ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":200040300010,
    "error_description":"Access denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300010` | Недостаточно прав для чтения торгового каталога
|| 
|| `0` | Не указаны поля `id`, `iblockId` в полях выбора
|| 
|| `0` | Не указано поле `iblockId` в фильтре
|| 
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-offer-add.md)
- [{#T}](./catalog-product-offer-update.md)
- [{#T}](./catalog-product-offer-get.md)
- [{#T}](./catalog-product-offer-download.md)
- [{#T}](./catalog-product-offer-delete.md)
- [{#T}](./catalog-product-offer-get-fields-by-filter.md)
