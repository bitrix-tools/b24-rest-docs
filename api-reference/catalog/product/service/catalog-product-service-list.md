# Получить список услуг catalog.product.service.list

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод возвращает список услуг по фильтру.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | 
Массив со списком полей, которые необходимо выбрать (смотрите поля объекта [catalog_product_service](../../data-types.md#catalog_product_service)).

Обязательные поля: `id`, `iblockId`
||
|| **filter**
[`object`](../../../data-types.md) | Объект для фильтрации выбранных услуг в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_product_service](../../data-types.md#catalog_product_service). 

Обязательные поля: `iblockId`.

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
- `!` — не равно. Для поиска NOT IN можно передавать несколько значений массивом ||
|| **order**
[`object`](../../../data-types.md) | 
Объект для сортировки выбранных услуг в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_product_service](../../data-types.md#catalog_product_service).

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

{% note warning "Работа с ценой услуг" %}

Чтобы получить цены услуг, используйте методы [catalog.price.*](../../price/index.md).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","iblockId","name","active","available","bundle","code","createdBy","dateActiveFrom","dateActiveTo","dateCreate","detailPicture","detailText","detailTextType","iblockSectionId","modifiedBy","previewPicture","previewText","previewTextType","sort","timestampX","type","vatId","vatIncluded","xmlId","property94","property95"],"filter":{"iblockId":23,">id":10,"vatId":[1,2]},"order":{"id":"desc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.product.service.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","iblockId","name","active","available","bundle","code","createdBy","dateActiveFrom","dateActiveTo","dateCreate","detailPicture","detailText","detailTextType","iblockSectionId","modifiedBy","previewPicture","previewText","previewTextType","sort","timestampX","type","vatId","vatIncluded","xmlId","property94","property95"],"filter":{"iblockId":23,">id":10,"vatId":[1,2]},"order":{"id":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.service.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'catalog.product.service.list',
        {
          "select": [
            "id",
            "iblockId",
            "name",
            "active",
            "available",
            "bundle",
            "code",
            "createdBy",
            "dateActiveFrom",
            "dateActiveTo",
            "dateCreate",
            "detailPicture",
            "detailText",
            "detailTextType",
            "iblockSectionId",
            "modifiedBy",
            "previewPicture",
            "previewText",
            "previewTextType",
            "sort",
            "timestampX",
            "type",
            "vatId",
            "vatIncluded",
            "xmlId",
            "property94",
            "property95",
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
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('catalog.product.service.list', {
        "select": [
          "id",
          "iblockId",
          "name",
          "active",
          "available",
          "bundle",
          "code",
          "createdBy",
          "dateActiveFrom",
          "dateActiveTo",
          "dateCreate",
          "detailPicture",
          "detailText",
          "detailTextType",
          "iblockSectionId",
          "modifiedBy",
          "previewPicture",
          "previewText",
          "previewTextType",
          "sort",
          "timestampX",
          "type",
          "vatId",
          "vatIncluded",
          "xmlId",
          "property94",
          "property95",
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
      const response = await $b24.callMethod('catalog.product.service.list', {
        "select": [
          "id",
          "iblockId",
          "name",
          "active",
          "available",
          "bundle",
          "code",
          "createdBy",
          "dateActiveFrom",
          "dateActiveTo",
          "dateCreate",
          "detailPicture",
          "detailText",
          "detailTextType",
          "iblockSectionId",
          "modifiedBy",
          "previewPicture",
          "previewText",
          "previewTextType",
          "sort",
          "timestampX",
          "type",
          "vatId",
          "vatIncluded",
          "xmlId",
          "property94",
          "property95",
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
        $response = $b24Service
            ->core
            ->call(
                'catalog.product.service.list',
                [
                    'select' => [
                        'id',
                        'iblockId',
                        'name',
                        'active',
                        'available',
                        'bundle',
                        'code',
                        'createdBy',
                        'dateActiveFrom',
                        'dateActiveTo',
                        'dateCreate',
                        'detailPicture',
                        'detailText',
                        'detailTextType',
                        'iblockSectionId',
                        'modifiedBy',
                        'previewPicture',
                        'previewText',
                        'previewTextType',
                        'sort',
                        'timestampX',
                        'type',
                        'vatId',
                        'vatIncluded',
                        'xmlId',
                        'property94',
                        'property95',
                    ],
                    'filter' => [
                        'iblockId' => 23,
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
        echo 'Error fetching product list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "catalog.product.service.list", {
            "select": [
                "id",
                "iblockId",
                "name",
                "active",
                "available",
                "bundle",
                "code",
                "createdBy",
                "dateActiveFrom",
                "dateActiveTo",
                "dateCreate",
                "detailPicture",
                "detailText",
                "detailTextType",
                "iblockSectionId",
                "modifiedBy",
                "previewPicture",
                "previewText",
                "previewTextType",
                "sort",
                "timestampX",
                "type",
                "vatId",
                "vatIncluded",
                "xmlId",
                "property94",
                "property95",
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
        'catalog.product.service.list',
        [
            'select' => [
                'id',
                'iblockId',
                'name',
                'active',
                'available',
                'bundle',
                'code',
                'createdBy',
                'dateActiveFrom',
                'dateActiveTo',
                'dateCreate',
                'detailPicture',
                'detailText',
                'detailTextType',
                'iblockSectionId',
                'modifiedBy',
                'previewPicture',
                'previewText',
                'previewTextType',
                'sort',
                'timestampX',
                'type',
                'vatId',
                'vatIncluded',
                'xmlId',
                'property94',
                'property95',
            ],
            'filter' => [
                'iblockId' => 23,
                '>id' => 10,
                'vatId' => [1, 2],
            ],
            'order' => [
                'id' => 'desc',
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
        "services": [
            {
                "active": "Y",
                "available": "N",
                "bundle": "N",
                "code": "service",
                "createdBy": 1,
                "dateActiveFrom": "2024-05-28T10:00:00+03:00",
                "dateActiveTo": "2024-05-29T10:00:00+03:00",
                "dateCreate": "2024-05-27T10:00:00+03:00",
                "detailPicture": {
                    "id": "6497",
                    "url": "\/rest\/catalog.product.download?fields%5BfieldName%5D=detailPicture\u0026fields%5BfileId%5D=6497\u0026fields%5BproductId%5D=1265",
                    "urlMachine": "\/rest\/catalog.product.download?fields%5BfieldName%5D=detailPicture\u0026fields%5BfileId%5D=6497\u0026fields%5BproductId%5D=1265"
                },
                "detailText": null,
                "detailTextType": "text",
                "iblockId": 23,
                "iblockSectionId": 47,
                "id": 1265,
                "modifiedBy": 1,
                "name": "Услуга",
                "previewPicture": {
                    "id": "6496",
                    "url": "\/rest\/catalog.product.download?fields%5BfieldName%5D=previewPicture\u0026fields%5BfileId%5D=6496\u0026fields%5BproductId%5D=1265",
                    "urlMachine": "\/rest\/catalog.product.download?fields%5BfieldName%5D=previewPicture\u0026fields%5BfileId%5D=6496\u0026fields%5BproductId%5D=1265"
                },
                "previewText": null,
                "previewTextType": "text",
                "sort": 100,
                "timestampX": "2024-06-14T11:59:04+03:00",
                "type": 7,
                "vatId": 1,
                "vatIncluded": "Y",
                "xmlId": "1265"
            }
        ]
    },
    "total": 1,
    "time": {
        "start": 1718363637.281945,
        "finish": 1718363637.984081,
        "duration": 0.7021360397338867,
        "processing": 0.2966270446777344,
        "date_start": "2024-06-14T14:13:57+03:00",
        "date_finish": "2024-06-14T14:13:57+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **services**
[`catalog_product_service[]`](../../data-types.md#catalog_product_service) | Массив объектов с информацией о выбранных услугах ||
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

- [{#T}](./catalog-product-service-add.md)
- [{#T}](./catalog-product-service-update.md)
- [{#T}](./catalog-product-service-get.md)
- [{#T}](./catalog-product-service-download.md)
- [{#T}](./catalog-product-service-delete.md)
- [{#T}](./catalog-product-service-get-fields-by-filter.md)