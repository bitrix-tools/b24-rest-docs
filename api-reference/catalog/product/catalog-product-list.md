# Получить список товаров по фильтру catalog.product.list

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод получает список товаров торгового каталога по фильтру.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select** 
[`array`](../../data-types.md)| Массив содержащий список полей, которые необходимо выбрать (смотрите поля объекта [catalog_product](../data-types.md#catalog_product)).

Обязательные поля: `id`, `iblockId`
 ||
|| **filter** 
[`object`](../../data-types.md)| Объект для фильтрации выбранных товаров в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_product](../data-types.md#catalog_product).

Обязательные поля:`iblockId`.

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки.
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
  - `"мол%"` — ищем значения начинающиеся с «мол»
  - `"%мол"` — ищем значения заканчивающиеся на «мол»
  - `"%мол%"` — ищем значения, где «мол» может быть в любой позиции
- `%=` — LIKE (аналогично `=%`)
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обоих сторон.
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
  - `"мол%"` — ищем значения не начинающиеся с «мол»
  - `"%мол"` — ищем значения не заканчивающиеся на «мол»
  - `"%мол%"` — ищем значения, где подстроки «мол» нет в любой позиции
- `!%=` — NOT LIKE (аналогично `!=%`)
- `=` — равно, точное совпадение (используется по умолчанию). Для поиска IN можно передавать несколько значений массивом 
- `!=` — не равно
- `!` — не равно. Для поиска NOT IN можно передавать несколько значений массивом
 ||
|| **order**
[`object`](../../data-types.md)| Объект для сортировки выбранных товаров в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_product](../data-types.md#catalog_product).

Возможные значения для order:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания
 ||
|| **start** 
[`string`](../../data-types.md)| Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов необходимо передавать значение — `50`. Чтобы выбрать третью страницу результатов значение — `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы
 ||
|#

{% note warning "Работа с ценой товара" %}

Чтобы получить цены товаров, используйте методы [catalog.price.*](../price/index.md).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","iblockId","name","active","available","barcodeMulti","bundle","canBuyZero","code","createdBy","dateActiveFrom","dateActiveTo","dateCreate","detailPicture","detailText","detailTextType","height","iblockSectionId","length","measure","modifiedBy","previewPicture","previewText","previewTextType","purchasingCurrency","purchasingPrice","quantity","quantityReserved","quantityTrace","recurSchemeLength","recurSchemeType","sort","subscribe","timestampX","trialPriceId","type","vatId","vatIncluded","weight","width","withoutOrder","xmlId","property258","property259"],"filter":{"iblockId":23,">id":10,"vatId":[1,2]},"order":{"id":"desc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.product.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","iblockId","name","active","available","barcodeMulti","bundle","canBuyZero","code","createdBy","dateActiveFrom","dateActiveTo","dateCreate","detailPicture","detailText","detailTextType","height","iblockSectionId","length","measure","modifiedBy","previewPicture","previewText","previewTextType","purchasingCurrency","purchasingPrice","quantity","quantityReserved","quantityTrace","recurSchemeLength","recurSchemeType","sort","subscribe","timestampX","trialPriceId","type","vatId","vatIncluded","weight","width","withoutOrder","xmlId","property258","property259"],"filter":{"iblockId":23,">id":10,"vatId":[1,2]},"order":{"id":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'catalog.product.list',
        {
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
            "property258",
            "property259",
          ],
          "filter": {
            "iblockId": 23,
            ">id": 10,
            "vatId": [1, 2],
          },
          "order": {
            "id": "desc",
          }
        },
        (progress) => { console.log('Progress:', progress) }
      );
      const items = response.getData() || [];
      for (const entity of items) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтительн при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('catalog.product.list', {
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
          "property258",
          "property259",
        ],
        "filter": {
          "iblockId": 23,
          ">id": 10,
          "vatId": [1, 2],
        },
        "order": {
          "id": "desc",
        }
      }, 'id');
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity); }
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('catalog.product.list', {
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
          "property258",
          "property259",
        ],
        "filter": {
          "iblockId": 23,
          ">id": 10,
          "vatId": [1, 2],
        },
        "order": {
          "id": "desc",
        }
      }, 0);
      const result = response.getData().result || [];
      for (const entity of result) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
    ```

- PHP

    ```php        
    try {
        $select = ['id', 'name', 'price', 'active', 'available', 'dateCreate'];
        $filter = ['active' => 'Y'];
        $order = ['name' => 'ASC'];
        $start = 0;
        $result = $serviceBuilder
            ->getCatalogScope()
            ->product()
            ->list($select, $filter, $order, $start);
        foreach ($result->getProducts() as $itemResult) {
            print("ID: {$itemResult->id}\n");
            print("Name: {$itemResult->name}\n");
            print("Active: {$itemResult->active}\n");
            print("Available: {$itemResult->available}\n");
            print("Date Created: {$itemResult->dateCreate->format(DATE_ATOM)}\n");
        }
    } catch (Throwable $e) {
        print("Error: {$e->getMessage()}\n");
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "catalog.product.list",
        {
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
                "property258",
                "property259",
            ],
            "filter": {
                "iblockId": 23,
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
        'catalog.product.list',
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
                "property258",
                "property259",
            ],
            'filter' => [
                "iblockId" => 23,
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
        "products": [
            {
                "active": "Y",
                "available": "Y",
                "barcodeMulti": "Y",
                "bundle": "N",
                "canBuyZero": "Y",
                "code": "Tovar",
                "createdBy": 1,
                "dateActiveFrom": "2024-05-28T10:00:00+03:00",
                "dateActiveTo": "2024-05-29T10:00:00+03:00",
                "dateCreate": "2024-05-27T10:00:00+03:00",
                "detailPicture": {
                    "id": "6439",
                    "url": "\/rest\/catalog.product.download?fields%5BfieldName%5D=detailPicture\u0026fields%5BfileId%5D=6439\u0026fields%5BproductId%5D=1243",
                    "urlMachine": "\/rest\/catalog.product.download?fields%5BfieldName%5D=detailPicture\u0026fields%5BfileId%5D=6439\u0026fields%5BproductId%5D=1243"
                },
                "detailText": null,
                "detailTextType": "text",
                "height": 100,
                "iblockId": 23,
                "iblockSectionId": 47,
                "id": 1243,
                "length": 100,
                "measure": 5,
                "modifiedBy": 1,
                "name": "Товар",
                "previewPicture": {
                    "id": "6438",
                    "url": "\/rest\/catalog.product.download?fields%5BfieldName%5D=previewPicture\u0026fields%5BfileId%5D=6438\u0026fields%5BproductId%5D=1243",
                    "urlMachine": "\/rest\/catalog.product.download?fields%5BfieldName%5D=previewPicture\u0026fields%5BfileId%5D=6438\u0026fields%5BproductId%5D=1243"
                },
                "previewText": null,
                "previewTextType": "text",
                "property258": {
                    "value": "test",
                    "valueId": "9735"
                },
                "property259": [
                    {
                        "value": "test1",
                        "valueId": "9736"
                    },
                    {
                        "value": "test2",
                        "valueId": "9737"
                    }
                ],
                "purchasingCurrency": "RUB",
                "purchasingPrice": 1000,
                "quantity": 10,
                "quantityReserved": 1,
                "quantityTrace": "Y",
                "recurSchemeLength": 1,
                "recurSchemeType": "D",
                "sort": 100,
                "subscribe": "Y",
                "timestampX": "2024-06-05T10:05:06+03:00",
                "trialPriceId": 175,
                "type": 1,
                "vatId": 1,
                "vatIncluded": "Y",
                "weight": 100,
                "width": 100,
                "withoutOrder": "Y",
                "xmlId": "1243"
            }
        ]
    },
    "total": 1,
    "time": {
        "start": 1717661048.302644,
        "finish": 1717661049.079089,
        "duration": 0.7764449119567871,
        "processing": 0.3525362014770508,
        "date_start": "2024-06-06T11:04:08+03:00",
        "date_finish": "2024-06-06T11:04:09+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **products**
[`catalog_product[]`](../data-types.md#catalog_product) | Массив объектов с информацией о выбранных товарах ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":200040300010,
    "error_description":"Access denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300010` | Недостаточно прав для чтения торгового каталога ||
|| `0` | Не указаны поля `id`, `iblockId` в полях выбора ||
|| `0` | Не указано поле `iblockId` в фильтре ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-product-add.md)
- [{#T}](./catalog-product-update.md)
- [{#T}](./catalog-product-get.md)
- [{#T}](./catalog-product-download.md)
- [{#T}](./catalog-product-delete.md)
- [{#T}](./catalog-product-get-fields-by-filter.md)

