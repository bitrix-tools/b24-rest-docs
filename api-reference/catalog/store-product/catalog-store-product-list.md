# Получить список остатков по складам по фильтру catalog.storeproduct.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Просмотр и выбор склада»

Метод `catalog.storeproduct.list` возвращает остатки товаров по складам с фильтрацией, сортировкой и постраничной навигацией.

Одна запись — остаток одного товара на одном складе. В ответ попадают только записи складов, доступных пользователю по праву «Просмотр и выбор склада».

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив полей записи остатка, которые нужно вернуть. Доступные поля: `id`, `productId`, `storeId`, `amount`, `quantityReserved`. Описание полей — в объекте [catalog_storeproduct](../data-types.md#catalog_storeproduct).

Если массив не передан или пустой, метод вернет все поля. Неизвестные поля метод пропускает без ошибки. Имена полей пишите в camelCase: если в `select` нет ни одного известного поля, например `["ID", "AMOUNT"]`, метод вернет все поля
||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации записей остатков в формате `{"field_1": "value_1", ..., "field_N": "value_N"}`.

Возможные значения для `field` — поля из списка в `select`. Например, `{"productId": 6595}` вернет остатки товара на всех складах, `{"storeId": 1}` — остатки всех товаров на складе.

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN, в качестве значения передается массив
- `!@` — NOT IN, в качестве значения передается массив
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно

Массив без префикса работает как IN: `{"productId": [6973, 6595]}` вернет остатки обоих товаров. Чтобы найти записи без остатка, передайте `{"amount": null}`.

Условия `<` и `<=` по `amount` и `quantityReserved` находят и записи, где значение равно `null`. Чтобы получить только записи с заполненным остатком, добавьте условие `">amount": 0` или `">=amount": 0`.

Префиксы поиска по подстроке `%`, `=%`, `!%` к этим полям неприменимы: все поля числовые, и с такими префиксами метод не находит записи.

Неизвестные поля и имена в верхнем регистре, например `PRODUCT_ID`, метод пропускает без ошибки и возвращает записи без учета такого условия. Проверяйте имена полей по списку выше
||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки записей остатков в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` — поля из списка в `select`.

Возможные значения для `order`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания

Регистр направления не важен: `DESC` и `desc` работают одинаково. Неизвестные поля в `order` метод пропускает без ошибки
||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы.

Если `start` больше количества найденных записей, метод вернет пустой массив `storeProducts`
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример получает склады, на которых есть товар с идентификатором `6595`, — от большего остатка к меньшему.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","productId","storeId","amount","quantityReserved"],"filter":{"productId":6595,">amount":0},"order":{"amount":"desc"},"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.storeproduct.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","productId","storeId","amount","quantityReserved"],"filter":{"productId":6595,">amount":0},"order":{"amount":"desc"},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.storeproduct.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type StoreProductListResult = {
      storeProducts: {
        id: number
        productId: number
        storeId: number
        amount: number | null
        quantityReserved: number | null
      }[]
    }

    try {
      // catalog.storeproduct.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<StoreProductListResult>({
        method: 'catalog.storeproduct.list',
        params: {
          select: ['id', 'productId', 'storeId', 'amount', 'quantityReserved'],
          filter: {
            productId: 6595,
            '>amount': 0,
          },
          order: {
            amount: 'desc',
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
        for (const row of result.storeProducts) {
          console.info('Store', row.storeId, 'amount', row.amount)
        }
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
      async function fetchStoreProducts() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.storeproduct.list',
            params: {
              select: ['id', 'productId', 'storeId', 'amount', 'quantityReserved'],
              filter: {
                productId: 6595,
                '>amount': 0,
              },
              order: {
                amount: 'desc',
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
          for (const row of result.storeProducts) {
            console.info('Store', row.storeId, 'amount', row.amount)
          }
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchStoreProducts)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.storeproduct.list(
            select=["id", "productId", "storeId", "amount", "quantityReserved"],
            filter={
                "productId": 6595,
                ">amount": 0,
            },
            order={
                "amount": "desc",
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
                'catalog.storeproduct.list',
                [
                    'select' => ['id', 'productId', 'storeId', 'amount', 'quantityReserved'],
                    'filter' => [
                        'productId' => 6595,
                        '>amount'   => 0,
                    ],
                    'order'  => [
                        'amount' => 'desc',
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
        'catalog.storeproduct.list',
        {
            select: ['id', 'productId', 'storeId', 'amount', 'quantityReserved'],
            filter: {
                productId: 6595,
                '>amount': 0,
            },
            order: {
                amount: 'desc',
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
        'catalog.storeproduct.list',
        [
            'select' => ['id', 'productId', 'storeId', 'amount', 'quantityReserved'],
            'filter' => [
                'productId' => 6595,
                '>amount' => 0,
            ],
            'order' => [
                'amount' => 'desc',
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
    res, err := client.Core().Call(ctx, "catalog.storeproduct.list", b24.Params{
    	"select": []string{"id", "productId", "storeId", "amount", "quantityReserved"},
    	"filter": b24.Params{
    		"productId": 6595,
    		">amount":   0,
    	},
    	"order": b24.Params{
    		"amount": "desc",
    	},
    	"start": 0,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.storeproduct.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "storeProducts".
    raw, ok := b24.Unwrap(res.Result, "storeProducts")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа storeProducts")
    }

    // amount и quantityReserved могут прийти как null, поэтому для них указатели.
    var items []struct {
    	ID               b24.ID   `json:"id"`
    	ProductID        b24.ID   `json:"productId"`
    	StoreID          b24.ID   `json:"storeId"`
    	Amount           *float64 `json:"amount"`
    	QuantityReserved *float64 `json:"quantityReserved"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.StoreID, it.Amount)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "storeProducts": [
            {
                "amount": 15,
                "id": 3,
                "productId": 6595,
                "quantityReserved": 30,
                "storeId": 1
            },
            {
                "amount": 10,
                "id": 1,
                "productId": 6595,
                "quantityReserved": null,
                "storeId": 11
            }
        ]
    },
    "total": 2,
    "time": {
        "start": 1793874773,
        "finish": 1793874773.615197,
        "duration": 0.615196943283081,
        "processing": 0,
        "date_start": "2026-11-05T13:32:53+03:00",
        "date_finish": "2026-11-05T13:32:53+03:00",
        "operating_reset_at": 1793875320,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **result.storeProducts**
[`catalog_storeproduct[]`](../data-types.md#catalog_storeproduct) | Массив записей остатков. У каждой записи только поля из `select`. Незаполненные `amount` и `quantityReserved` приходят со значением `null` ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Invalid order \"BAD\""
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | Access Denied | У пользователя нет ни права «Просмотр каталога товаров», ни права «Просмотр и выбор склада» ||
|| `400` | `100` | Invalid order "BAD" | В `order` передано направление, отличное от `asc` и `desc`. В тексте направление приведено к верхнему регистру ||
|| `400` | `100` | Invalid value {abc} to match with parameter {filter}. Should be value of type array. | В `filter` передан не объект ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-store-product-get.md)
- [{#T}](./catalog-store-product-get-fields.md)
