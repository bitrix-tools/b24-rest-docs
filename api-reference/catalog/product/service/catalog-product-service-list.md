# Получить список услуг catalog.product.service.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с одним из прав «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара» и правом на чтение инфоблока каталога

Метод `catalog.product.service.list` возвращает список услуг каталога с фильтрацией, сортировкой и постраничной навигацией.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select***
[`array`](../../../data-types.md) | Поля объекта [catalog_product_service](../../data-types.md#catalog_product_service), которые нужно вернуть. Обязательно включите `id` и `iblockId`, например `["id", "iblockId", "name"]`.

Чтобы получить значения свойств, укажите ключи `propertyN`, где `N` — идентификатор свойства.

Неизвестные поля метод пропускает без ошибки ||
|| **filter***
[`object`](../../../data-types.md) | Объект для фильтрации услуг в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_product_service](../../data-types.md#catalog_product_service) и ключам свойств `propertyN`. Неизвестные поля метод пропускает без ошибки.

Обязательное поле: `iblockId` — идентификатор инфоблока товаров торгового каталога, одно число. Получить его можно методом [catalog.catalog.list](../../catalog/catalog-catalog-list.md).

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `%` — LIKE, поиск по подстроке в любой позиции строки. Символ `%` в значении фильтра передавать не нужно
- `!%` — NOT LIKE, значения без подстроки. Символ `%` в значении фильтра передавать не нужно
- `=` — равно, точное совпадение. Используется по умолчанию. Для поиска IN можно передать несколько значений массивом
- `!=` — не равно
- `!` — не равно. Для поиска NOT IN можно передать несколько значений массивом

Префиксы `=%`, `%=`, `!=%`, `!%=`, `><` и `!><` метод не поддерживает: условие с таким префиксом пропускается без ошибки, и метод возвращает услуги без учета этого условия.

Для свойств `propertyN` формат значения в `filter` зависит от типа условия:
- если фильтруете свойство типа дата или дата-время по диапазону, используйте префикс в ключе, а значение передавайте в поле `value`
- если фильтруете числовое, строковое или списочное свойство по точному совпадению, передавайте значение напрямую, без `value`
- для поиска `IN` и `NOT IN` можно передавать массив значений

Пример фильтрации по свойствам:

```js
filter: {
    iblockId: 25,
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
Объект для сортировки выбранных услуг в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_product_service](../../data-types.md#catalog_product_service). Неизвестные поля метод пропускает без ошибки. Если параметр не передан, услуги сортируются по `id` по возрастанию.

Возможные значения для `order`:
- `asc` — в порядке возрастания
- `desc` — в порядке убывания
||
|| **start**
[`integer`](../../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы.

Если `start` больше количества найденных услуг, метод возвращает последнюю страницу
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
    -d '{"select":["id","iblockId","name","active","available","bundle","code","createdBy","dateActiveFrom","dateActiveTo","dateCreate","detailPicture","detailText","detailTextType","iblockSectionId","modifiedBy","previewPicture","previewText","previewTextType","sort","timestampX","type","vatId","vatIncluded","xmlId","property301","property305"],"filter":{"iblockId":25,">id":10,"vatId":[1,2]},"order":{"id":"desc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.service.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","iblockId","name","active","available","bundle","code","createdBy","dateActiveFrom","dateActiveTo","dateCreate","detailPicture","detailText","detailTextType","iblockSectionId","modifiedBy","previewPicture","previewText","previewTextType","sort","timestampX","type","vatId","vatIncluded","xmlId","property301","property305"],"filter":{"iblockId":25,">id":10,"vatId":[1,2]},"order":{"id":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.service.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ServiceItem = {
      id: number
      iblockId: number
      name: string
      active: string
      available: string
      bundle: string
      code: string
      createdBy: number
      dateActiveFrom: ISODate | null
      dateActiveTo: ISODate | null
      dateCreate: ISODate | null
      detailPicture: { id: string; url: string; urlMachine: string } | null
      detailText: string | null
      detailTextType: string
      iblockSectionId: number
      modifiedBy: number
      previewPicture: { id: string; url: string; urlMachine: string } | null
      previewText: string | null
      previewTextType: string
      sort: number
      timestampX: ISODate | null
      type: number
      vatId: number
      vatIncluded: string
      xmlId: string
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ServiceListResult = {
      services: ServiceItem[]
    }

    try {
      // catalog.product.service.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<ServiceListResult>({
        method: 'catalog.product.service.list',
        params: {
          select: [
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
            'property301',
            'property305',
          ],
          filter: {
            iblockId: 25,
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
        console.info('Services on this page:', result.services.length, result.services)
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
      async function listServices() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // catalog.product.service.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'catalog.product.service.list',
            params: {
              select: [
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
                'property301',
                'property305',
              ],
              filter: {
                iblockId: 25,
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
          console.info('Services on this page:', result.services.length, result.services)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listServices)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.service.list(
            select=[
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
                "property301",
                "property305",
            ],
            filter={
                "iblockId": 25,
                ">id": 10,
                "vatId": [
                    1,
                    2,
                ],
            },
            order={
                "id": "desc",
            },
            start=0,
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
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
                        'property301',
                        'property305',
                    ],
                    'filter' => [
                        'iblockId' => 25,
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
                "property301",
                "property305",
            ],
            "filter": {
                "iblockId": 25,
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
                'property301',
                'property305',
            ],
            'filter' => [
                'iblockId' => 25,
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.product.service.list", b24.Params{
    	"select": []string{"id", "iblockId", "name", "active", "available", "bundle", "code", "createdBy", "dateActiveFrom", "dateActiveTo", "dateCreate", "detailPicture", "detailText", "detailTextType", "iblockSectionId", "modifiedBy", "previewPicture", "previewText", "previewTextType", "sort", "timestampX", "type", "vatId", "vatIncluded", "xmlId", "property301", "property305"},
    	"filter": b24.Params{
    		"iblockId": 25,
    		">id":      10,
    		"vatId":    []int{1, 2},
    	},
    	"order": b24.Params{
    		"id": "desc",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.service.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "services".
    raw, ok := b24.Unwrap(res.Result, "services")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа services")
    }

    var items []struct {
    	Active         string `json:"active"`
    	Available      string `json:"available"`
    	Bundle         string `json:"bundle"`
    	Code           string `json:"code"`
    	CreatedBy      int    `json:"createdBy"`
    	DateActiveFrom string `json:"dateActiveFrom"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.Active)
    }
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
                "dateActiveFrom": null,
                "dateActiveTo": null,
                "dateCreate": "2025-05-12T12:04:01+03:00",
                "detailPicture": null,
                "detailText": null,
                "detailTextType": "text",
                "iblockId": 25,
                "iblockSectionId": null,
                "id": 6969,
                "modifiedBy": 1,
                "name": "Услуга",
                "previewPicture": null,
                "previewText": null,
                "previewTextType": "text",
                "property301": null,
                "property305": null,
                "sort": 100,
                "timestampX": "2025-05-12T12:04:01+03:00",
                "type": 7,
                "vatId": 1,
                "vatIncluded": "Y",
                "xmlId": "6969"
            }
        ]
    },
    "total": 1,
    "time": {
        "start": 1793963897,
        "finish": 1793963897.165754,
        "duration": 0.16575407981872559,
        "processing": 0,
        "date_start": "2026-11-06T14:18:17+03:00",
        "date_finish": "2026-11-06T14:18:17+03:00",
        "operating_reset_at": 1793964360,
        "operating": 0.13507294654846191
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **result.services**
[`catalog_product_service[]`](../../data-types.md#catalog_product_service) | Массив объектов с информацией о выбранных услугах ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"200040300010",
    "error_description":"Access denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | Access Denied | У пользователя нет ни одного из прав «Просмотр каталога товаров», «Просмотр товаров каталога», «Изменение цены продажи товара» ||
|| `400` | `200040300030` | Access Denied | У пользователя нет права на чтение инфоблока каталога ||
|| `400` | `0` | Required select fields: id, iblockId | В `select` нет поля `id` или `iblockId`. В тексте перечислены недостающие поля ||
|| `400` | `0` | Required filter fields: iblockId | В `filter` нет поля `iblockId` ||
|| `400` | `0` | iblock is not catalog | `iblockId` не является инфоблоком торгового каталога ||
|| `400` | `0` | productType is not allowed for this catalog | В `iblockId` передан инфоблок вариаций. Услуги хранятся в инфоблоке товаров ||
|| `400` | `0` | Wrong format value of filter field `iblockId`. | В `iblockId` передан массив. Передайте одно число ||
|| `400` | `100` | Invalid value {...} to match with parameter {select}. Should be value of type array. | Параметр `select` передан не как массив ||
|| `400` | `100` | Invalid value {...} to match with parameter {filter}. Should be value of type array. | Параметр `filter` передан не как объект ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-service-add.md)
- [{#T}](./catalog-product-service-update.md)
- [{#T}](./catalog-product-service-get.md)
- [{#T}](./catalog-product-service-delete.md)
- [{#T}](./catalog-product-service-download.md)
- [{#T}](./catalog-product-service-get-fields-by-filter.md)
