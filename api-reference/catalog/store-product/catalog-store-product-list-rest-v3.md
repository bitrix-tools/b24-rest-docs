# Получить список остатков по складам по фильтру v 3.0 catalog.store.product.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Просмотр и выбор склада»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.store.product.list` возвращает остатки товаров на складах. Каждая запись показывает остаток одного товара на одном складе.

Чтобы узнать остатки товара на всех складах, отфильтруйте список по `productId`. Чтобы получить все товары склада, отфильтруйте по `storeId`.

Методы `catalog.store.product.*` только читают остатки. Изменить остатки можно документами складского учета — методами [catalog.document.*](../document/index.md). Например, проведенный документ прихода увеличивает остаток на складе, а документ списания уменьшает.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив полей записи остатка, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор записи остатка
- `productId` — идентификатор товара или вариации
- `storeId` — идентификатор склада
- `amount` — количество товара на складе
- `quantityReserved` — количество товара в резерве

Идентификатор `id` возвращается всегда. Значение `["*"]` не поддерживается.

По умолчанию: все поля ||
|| **filter**
[`array`](../../data-types.md) | Фильтр списка в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`, например `[["productId", "=", 6595]]`. Синтаксис фильтра описан в [обзоре REST 3.0](../../rest-v3.md#filter).

Фильтровать можно по всем полям из параметра `select`. Идентификатор товара можно получить методом [catalog.product.list](../product/catalog-product-list-rest-v3.md), идентификатор склада — методом [catalog.store.list](../store/catalog-store-list-rest-v3.md).

Поддерживаются операторы `=`, `!=`, `>`, `>=`, `<`, `<=`, `in` и `between`. Если передать в `in` пустой список, метод вернет пустой список. Группы с логикой `or` и отрицание не поддерживаются. Вместо `or` используйте оператор `in` или выполните несколько запросов, вместо отрицания — оператор `!=` ||
|| **order**
[`object`](../../data-types.md) | Сортировка в формате `{"поле": "направление"}`, например `{"storeId": "asc"}`.

Сортировать можно по всем полям из параметра `select`.

Возможные значения направления:

- `asc` — по возрастанию
- `desc` — по убыванию ||
|| **pagination**
[`object`](../../data-types.md) | Параметры постраничной навигации. [Описание структуры объекта](#pagination) ||
|#

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../data-types.md) | Количество записей на странице. Значения больше `1000` уменьшаются до `1000`. Ноль, отрицательное и нечисловое значение вызывают ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../data-types.md) | Номер страницы, начиная с `1`. Метод пропустит `(page - 1) * limit` записей и не учтет `offset` ||
|| **offset**
[`integer`](../../data-types.md) | Количество записей, которые нужно пропустить от начала списка.

По умолчанию: `0` ||
|#

Чтобы выгрузить все остатки, передайте в `order` значение `{"id": "asc"}`, а в каждом следующем запросе — условие фильтра `["id", ">", N]`, где N — последний `id` предыдущей страницы. Это лучше, чем наращивать `offset`: при большом `offset` база данных перебирает все пропущенные записи.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.store.product.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","productId","storeId","amount","quantityReserved"],"filter":[["productId","=",6595],["amount",">",0]],"order":{"storeId":"asc"},"pagination":{"limit":10}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.store.product.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","productId","storeId","amount","quantityReserved"],"filter":[["productId","=",6595],["amount",">",0]],"order":{"storeId":"asc"},"pagination":{"limit":10},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.store.product.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type StoreProductListResult = {
      items: {
        id: number
        productId: number
        storeId: number
        amount: number
        quantityReserved: number
      }[]
    }

    try {
      const response = await $b24.actions.v3.call.make<StoreProductListResult>({
        method: 'catalog.store.product.list',
        params: {
          select: ['id', 'productId', 'storeId', 'amount', 'quantityReserved'],
          filter: [
            ['productId', '=', 6595],
            ['amount', '>', 0],
          ],
          order: {
            storeId: 'asc',
          },
          pagination: {
            limit: 10,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        result.items.forEach(stock => console.info(stock.storeId, stock.amount))
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function listStoreProducts() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.store.product.list',
            params: {
              select: ['id', 'productId', 'storeId', 'amount', 'quantityReserved'],
              filter: [
                ['productId', '=', 6595],
                ['amount', '>', 0],
              ],
              order: {
                storeId: 'asc',
              },
              pagination: {
                limit: 10,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          result.items.forEach(stock => console.info(stock.storeId, stock.amount))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listStoreProducts)
    </script>
    ```

- Python

    У методов `catalog.store.product.*` REST 3.0 нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `call_method` токена клиента с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "catalog.store.product.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})
    bitrix_token = client.get_token()

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "select": ["id", "productId", "storeId", "amount", "quantityReserved"],
                "filter": [
                    ["productId", "=", 6595],
                    ["amount", ">", 0],
                ],
                "order": {
                    "storeId": "asc",
                },
                "pagination": {
                    "limit": 10,
                },
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"code: {error.code}",
            f"message: {error.error.message}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.store.product.list',
                [
                    'select' => ['id', 'productId', 'storeId', 'amount', 'quantityReserved'],
                    'filter' => [
                        ['productId', '=', 6595],
                        ['amount', '>', 0],
                    ],
                    'order' => [
                        'storeId' => 'asc',
                    ],
                    'pagination' => [
                        'limit' => 10,
                    ],
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

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'catalog.store.product.list',
        {
            select: ['id', 'productId', 'storeId', 'amount', 'quantityReserved'],
            filter: [
                ['productId', '=', 6595],
                ['amount', '>', 0],
            ],
            order: {
                storeId: 'asc',
            },
            pagination: {
                limit: 10,
            },
        },
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.store.product.list',
        [
            'select' => ['id', 'productId', 'storeId', 'amount', 'quantityReserved'],
            'filter' => [
                ['productId', '=', 6595],
                ['amount', '>', 0],
            ],
            'order' => [
                'storeId' => 'asc',
            ],
            'pagination' => [
                'limit' => 10,
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.store.product.list", b24.Params{
    	"select": []string{"id", "productId", "storeId", "amount", "quantityReserved"},
    	"filter": []any{
    		[]any{"productId", "=", 6595},
    		[]any{"amount", ">", 0},
    	},
    	"order": b24.Params{
    		"storeId": "asc",
    	},
    	"pagination": b24.Params{
    		"limit": 10,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.store.product.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID               int     `json:"id"`
    		ProductID        int     `json:"productId"`
    		StoreID          int     `json:"storeId"`
    		Amount           float64 `json:"amount"`
    		QuantityReserved float64 `json:"quantityReserved"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, stock := range result.Items {
    	fmt.Println(stock.StoreID, stock.Amount, stock.QuantityReserved)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "items": [
            {
                "id": 3,
                "productId": 6595,
                "storeId": 1,
                "amount": 15,
                "quantityReserved": 30
            },
            {
                "id": 1,
                "productId": 6595,
                "storeId": 11,
                "amount": 10,
                "quantityReserved": 0
            }
        ]
    },
    "time": {
        "start": 1794922635,
        "finish": 1794922635.044875,
        "duration": 0.04487490653991699,
        "processing": 0,
        "date_start": "2026-11-17T16:37:15+03:00",
        "date_finish": "2026-11-17T16:37:15+03:00",
        "operating_reset_at": 1794922920,
        "operating": 0.41770195960998535
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **result.items**
[`array`](../../data-types.md) | Массив записей остатков на странице. Состав полей зависит от `select`. [Описание полей](#items) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

Общее количество записей метод не возвращает. Если в ответе меньше записей, чем `limit`, страница последняя.

#### Элемент items {#items}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор записи остатка ||
|| **productId**
[`integer`](../../data-types.md) | Идентификатор товара или вариации ||
|| **storeId**
[`integer`](../../data-types.md) | Идентификатор склада ||
|| **amount**
[`double`](../../data-types.md) | Количество товара на складе ||
|| **quantityReserved**
[`double`](../../data-types.md) | Количество товара в резерве. Может быть больше `amount` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Filter OR groups are not supported"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Filter OR groups are not supported | Уберите из фильтра группу с логикой `or`. Выполните несколько запросов или используйте оператор `in` ||
|| `-` | Filter NOT groups are not supported | Уберите из фильтра отрицание. Используйте оператор `!=` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select`, `filter`, `order` | Неизвестное поле `#FIELD#` для сущности `StoreProductDto` | Укажите только поля из [описания элемента items](#items) ||
|#

#### Ошибка формата фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `Unknown filter condition` | Передайте `filter` массивом условий, например `[["productId","=",6595]]` ||
|#

#### Ошибка оператора фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Неизвестный оператор фильтра `#OPERATOR#` | Используйте операторы `=`, `!=`, `>`, `>=`, `<`, `<=`, `in`, `between` ||
|#

#### Ошибка сортировки

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `order` | Не удается распознать выражение сортировки `#ORDER#` | Передайте направление `asc` или `desc` ||
|#

#### Ошибка пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте `limit` положительным числом, `offset` — неотрицательным числом, `page` — числом ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет права «Просмотр каталога товаров» или «Просмотр и выбор склада» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-store-product-get-rest-v3.md)
- [{#T}](./catalog-store-product-field-list.md)
- [{#T}](../store/catalog-store-list-rest-v3.md)
- [{#T}](../document/index.md)
