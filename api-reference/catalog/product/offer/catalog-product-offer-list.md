# Получить список вариаций товара catalog.product.offer.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на чтение инфоблока вариаций и одним из прав: «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара»

Метод `catalog.product.offer.list` возвращает список вариаций товара с фильтрацией, сортировкой и постраничной навигацией.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select***
[`array`](../../../data-types.md) | Массив полей вариации, которые нужно вернуть. Поля описаны в объекте [catalog_product_offer](../../data-types.md#catalog_product_offer). Свойства передавайте как `propertyN`, где `N` — идентификатор свойства, головной товар — как `parentId`.

В массиве обязательно должны быть поля `id` и `iblockId`, без них метод вернет ошибку `Required select fields`. Имена полей пишите в camelCase. Неизвестные поля метод пропускает без ошибки ||
|| **filter***
[`object`](../../../data-types.md) | Объект для фильтрации вариаций в формате `{"field_1": "value_1", ..., "field_N": "value_N"}`.

Обязательно передайте `iblockId` — идентификатор инфоблока каталога вариаций. Получить его можно методом [catalog.catalog.list](../../catalog/catalog-catalog-list.md): у каталога вариаций заполнено поле `productIblockId`.

Возможные значения для `field` — поля объекта [catalog_product_offer](../../data-types.md#catalog_product_offer), свойства `propertyN` и `parentId` — идентификатор головного товара. Ключ можно дополнить префиксом:
- `=` — равно, используется по умолчанию. Массив значений работает как IN: `{"id": [7631, 7671]}`
- `!=` — не равно
- `!` — не равно. Массив значений работает как NOT IN
- `>` — больше
- `>=` — больше либо равно
- `<` — меньше
- `<=` — меньше либо равно
- `%` — LIKE, поиск подстроки в любой позиции. Символ `%` в значении передавать не нужно
- `!%` — NOT LIKE, значения без подстроки. Символ `%` в значении передавать не нужно

Префиксы `@`, `!@`, `=%`, `%=`, `!=%` и `!%=` метод не поддерживает: условие с ними не применяется, и метод возвращает вариации без его учета. Для IN и NOT IN передавайте массив без префикса или с префиксом `!`.

Чтобы найти пустое значение, передайте `false`, например `{"code": false}`. Значение `null` вызывает ошибку `Wrong format value of filter field`.

Для свойства-списка передавайте идентификатор варианта значения, например `{"property907": 1605}`. Свойство с датой фильтруйте по диапазону: укажите префикс в ключе, а значение передайте в поле `value`:

```json
{
    "iblockId": 27,
    ">=property925": {"value": "2026-11-05T00:00:00+03:00"},
    "<=property925": {"value": "2026-11-06T00:00:00+03:00"}
}
```

Неизвестные поля и имена в верхнем регистре, например `ID`, метод пропускает без ошибки и возвращает вариации без учета такого условия. Головной товар фильтруйте по `parentId`: условие по свойству привязки, например `property101`, не применяется
||
|| **order**
[`object`](../../../data-types.md) | Объект для сортировки вариаций в формате `{"field_1": "order_1", ..., "field_N": "order_N"}`.

Возможные значения для `order`:
- `asc` — по возрастанию
- `desc` — по убыванию

Направление `desc` и любое другое значение, кроме `asc`, сортирует по убыванию. Регистр направления не важен. Неизвестные поля метод пропускает без ошибки.

По умолчанию вариации отсортированы по `id` по возрастанию ||
|| **start**
[`integer`](../../../data-types.md) | Параметр используется для постраничной навигации.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы.

Если `start` больше количества найденных вариаций, метод возвращает первую страницу, а не пустой список. Чтобы обойти все страницы, ориентируйтесь на поле `next` в ответе: на последней странице его нет ||
|#

Цены вариаций метод не возвращает. Чтобы получить цены, используйте методы [catalog.price.*](../../price/index.md).

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример получает активные вариации головного товара `7603` с размером `M` и `L` в свойстве-списке `property907` и сортирует их по полю `sort`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","iblockId","name","active","sort","parentId","property907"],"filter":{"iblockId":27,"parentId":7603,"active":"Y","property907":[1603,1605]},"order":{"sort":"asc","id":"desc"},"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.offer.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","iblockId","name","active","sort","parentId","property907"],"filter":{"iblockId":27,"parentId":7603,"active":"Y","property907":[1603,1605]},"order":{"sort":"asc","id":"desc"},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.offer.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type OfferProperty = {
      value: string
      valueId: string
      valueEnum?: string
    }

    // Shape of one offer returned in result.offers (only the selected fields)
    type OfferListItem = {
      id: number
      iblockId: number
      name: string
      active: string
      sort: number | null
      parentId: OfferProperty | null
      property907: OfferProperty | null
    }

    try {
      // catalog.product.offer.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<{ offers: OfferListItem[] }>({
        method: 'catalog.product.offer.list',
        params: {
          select: ['id', 'iblockId', 'name', 'active', 'sort', 'parentId', 'property907'],
          filter: {
            iblockId: 27,
            parentId: 7603,
            active: 'Y',
            property907: [1603, 1605],
          },
          order: {
            sort: 'asc',
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
        console.info('Offers on page:', result.offers.length)
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
      async function listOffers() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.product.offer.list',
            params: {
                  select: ['id', 'iblockId', 'name', 'active', 'sort', 'parentId', 'property907'],
                  filter: {
                    iblockId: 27,
                    parentId: 7603,
                    active: 'Y',
                    property907: [1603, 1605],
                  },
                  order: {
                    sort: 'asc',
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
          console.info('Offers on page:', result.offers.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listOffers)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.offer.list(
            select=["id", "iblockId", "name", "active", "sort", "parentId", "property907"],
            filter={
                "iblockId": 27,
                "parentId": 7603,
                "active": "Y",
                "property907": [1603, 1605],
            },
            order={
                "sort": "asc",
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
                'catalog.product.offer.list',
                [
                    'select' => ['id', 'iblockId', 'name', 'active', 'sort', 'parentId', 'property907'],
                    'filter' => [
                        'iblockId'    => 27,
                        'parentId'    => 7603,
                        'active'      => 'Y',
                        'property907' => [1603, 1605],
                    ],
                    'order'  => [
                        'sort' => 'asc',
                        'id'   => 'desc',
                    ],
                    'start'  => 0,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.product.offer.list',
        {
            select: ['id', 'iblockId', 'name', 'active', 'sort', 'parentId', 'property907'],
            filter: {
                iblockId: 27,
                parentId: 7603,
                active: 'Y',
                property907: [1603, 1605],
            },
            order: {
                sort: 'asc',
                id: 'desc',
            },
            start: 0,
        },
        function(result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.product.offer.list',
        [
            'select' => ['id', 'iblockId', 'name', 'active', 'sort', 'parentId', 'property907'],
            'filter' => [
                'iblockId' => 27,
                'parentId' => 7603,
                'active' => 'Y',
                'property907' => [1603, 1605],
            ],
            'order' => [
                'sort' => 'asc',
                'id' => 'desc',
            ],
            'start' => 0,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.product.offer.list", b24.Params{
    	"select": []string{"id", "iblockId", "name", "active", "sort", "parentId", "property907"},
    	"filter": b24.Params{
    		"iblockId":    27,
    		"parentId":    7603,
    		"active":      "Y",
    		"property907": []int{1603, 1605},
    	},
    	"order":  b24.Params{
    		"sort": "asc",
    		"id":   "desc",
    	},
    	"start":  0,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.offer.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "offers".
    raw, ok := b24.Unwrap(res.Result, "offers")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа offers")
    }

    // Необязательные поля могут прийти как null, поэтому для них указатели.
    var items []struct {
    	ID       b24.ID `json:"id"`
    	IblockID int    `json:"iblockId"`
    	Name     string `json:"name"`
    	Sort     *int   `json:"sort"`
    	ParentID *struct {
    		Value string `json:"value"`
    	} `json:"parentId"`
    	Property907 *struct {
    		Value     string `json:"value"`
    		ValueEnum string `json:"valueEnum"`
    	} `json:"property907"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID, it.Name)
    }
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
                "iblockId": 27,
                "id": 7695,
                "name": "Футболка красная, M",
                "parentId": {
                    "value": "7603",
                    "valueId": "4149"
                },
                "property907": {
                    "value": "1603",
                    "valueEnum": "M",
                    "valueId": "4157"
                },
                "sort": 100
            },
            {
                "active": "Y",
                "iblockId": 27,
                "id": 7685,
                "name": "Футболка синяя, M",
                "parentId": {
                    "value": "7603",
                    "valueId": "4125"
                },
                "property907": {
                    "value": "1603",
                    "valueEnum": "M",
                    "valueId": "4143"
                },
                "sort": 100
            }
        ]
    },
    "total": 2,
    "time": {
        "start": 1793895575,
        "finish": 1793895575.244894,
        "duration": 0.24489402770996094,
        "processing": 0,
        "date_start": "2026-11-05T19:19:35+03:00",
        "date_finish": "2026-11-05T19:19:35+03:00",
        "operating_reset_at": 1793896140,
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
|| **result.offers**
[`catalog_product_offer[]`](../../data-types.md#catalog_product_offer) | Массив вариаций. У каждой вариации только поля из `select`, пустые поля приходят со значением `null`.

Головной товар и свойства приходят объектом `{"value": ..., "valueId": ...}`, для свойства-списка — с текстом варианта в `valueEnum`. Поля `purchasingPrice` и `purchasingCurrency` приходят, только если у пользователя есть право «Просмотр закупочной цены товара» ||
|| **next**
[`integer`](../../../data-types.md) | Значение `start` для следующей страницы. Приходит, если найдено больше записей, чем помещается на текущей странице ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество найденных вариаций ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Required select fields: iblockId"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | Access Denied | У пользователя нет ни права «Просмотр каталога товаров», ни права «Просмотр товаров каталога», ни права «Изменение цены продажи товара» ||
|| `400` | `200040300030` | Access Denied | У пользователя нет права на чтение инфоблока вариаций ||
|| `400` | `0` | Required select fields: id, iblockId | В `select` нет полей `id` и `iblockId`, `select` пустой или не передан. В тексте перечислены недостающие поля ||
|| `400` | `0` | Required filter fields: iblockId | В `filter` не передан `iblockId` ||
|| `400` | `0` | Wrong format value of filter field `code`. | В значении фильтра передан `null`. В тексте указан ключ фильтра ||
|| `400` | `0` | productType is not allowed for this catalog | В `iblockId` передан инфоблок товаров, а не инфоблок вариаций ||
|| `400` | `0` | iblock is not catalog | Инфоблок с указанным `iblockId` не найден или не является каталогом ||
|| `400` | `100` | Invalid value {abc} to match with parameter {filter}. Should be value of type array. | В `filter` передан не объект. Такая же ошибка с `{select}` — если в `select` передан не массив ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-offer-add.md)
- [{#T}](./catalog-product-offer-update.md)
- [{#T}](./catalog-product-offer-get.md)
- [{#T}](./catalog-product-offer-download.md)
- [{#T}](./catalog-product-offer-delete.md)
- [{#T}](./catalog-product-offer-get-fields-by-filter.md)
