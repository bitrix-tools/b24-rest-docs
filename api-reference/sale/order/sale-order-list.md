# Получить список заказов sale.order.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.order.list` возвращает список заказов с фильтрацией, сортировкой и постраничной навигацией. В ответ попадают только поля заказа: позиции корзины, оплаты, отгрузки и значения свойств отдает метод [sale.order.get](./sale-order-get.md).

{% note warning "" %}

Метод не проверяет имена полей в `select` и `filter`. Условие с опечаткой в имени поля не применится, и метод вернет заказы без учета этого условия. Точные имена полей возвращает [sale.order.getFields](./sale-order-get-fields.md).

{% endnote %}

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Поля заказа, которые нужно вернуть. Имена полей — в объекте [sale_order](../data-types.md#sale_order).

Если параметр не передан, массив пуст или в нем нет ни одного существующего поля, метод вернет все поля заказа ||
|| **filter**
[`object`](../../data-types.md) | Условия отбора заказов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где `field` — поле объекта [sale_order](../data-types.md#sale_order).

К ключу можно добавить префикс, который задает условие сравнения:

- `=` — равно, используется по умолчанию
- `!=` или `!` — не равно
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — входит в список, значение — массив
- `!@` — не входит в список, значение — массив
- `%` — содержит подстроку, символ `%` в значении передавать не нужно
- `!%` — не содержит подстроку, символ `%` в значении передавать не нужно
- `=%` или `%=` — LIKE по шаблону, символ `%` передается в значении: `мол%` — начинается с «мол», `%мол` — заканчивается на «мол», `%мол%` — содержит «мол»
- `!=%` или `!%=` — NOT LIKE по шаблону, символ `%` передается в значении ||
|| **order**
[`object`](../../data-types.md) | Порядок сортировки в формате `{"field_1": "order_1", ... "field_N": "order_N"}`, где `field` — поле объекта [sale_order](../data-types.md#sale_order), а `order` — направление:

- `asc` — по возрастанию
- `desc` — по убыванию

Если параметр не передан, заказы идут по возрастанию `id` ||
|| **start**
[`integer`](../../data-types.md) | Смещение для постраничной навигации. На странице до 50 заказов, размер страницы изменить нельзя.

Значение считается по формуле `start = (N-1) * 50`, где `N` — номер страницы. Для второй страницы передайте `50`. По умолчанию `0` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","accountNumber","statusId","price","currency","payed","dateInsert","userId"],"filter":{"<id":1000,"@personTypeId":[3,4],"payed":"N"},"order":{"id":"desc"},"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.order.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","accountNumber","statusId","price","currency","payed","dateInsert","userId"],"filter":{"<id":1000,"@personTypeId":[3,4],"payed":"N"},"order":{"id":"desc"},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.order.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type SaleOrderListResult = {
      orders: {
        accountNumber: string
        currency: string
        dateInsert: ISODate | null
        id: number
        payed: string
        price: number
        statusId: string
        userId: number
      }[]
    }

    try {
      // sale.order.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<SaleOrderListResult>({
        method: 'sale.order.list',
        params: {
          select: [
            'id',
            'accountNumber',
            'statusId',
            'price',
            'currency',
            'payed',
            'dateInsert',
            'userId',
          ],
          filter: {
            '<id': 1000,
            '@personTypeId': [3, 4],
            payed: 'N',
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
        console.info(`Fetched ${result.orders.length} orders, first order id: ${result.orders[0]?.id}`)
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
      async function fetchOrderList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // sale.order.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'sale.order.list',
            params: {
              select: [
                'id',
                'accountNumber',
                'statusId',
                'price',
                'currency',
                'payed',
                'dateInsert',
                'userId',
              ],
              filter: {
                '<id': 1000,
                '@personTypeId': [3, 4],
                payed: 'N',
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
          console.info(`Fetched ${result.orders.length} orders, first order id: ${result.orders[0]?.id}`)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchOrderList)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.sale.order.list(
            select=[
                "id",
                "accountNumber",
                "statusId",
                "price",
                "currency",
                "payed",
                "dateInsert",
                "userId",
            ],
            filter={
                "<id": 1000,
                "@personTypeId": [
                    3,
                    4,
                ],
                "payed": "N",
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
                'sale.order.list',
                [
                    'select' => [
                        'id',
                        'accountNumber',
                        'statusId',
                        'price',
                        'currency',
                        'payed',
                        'dateInsert',
                        'userId',
                    ],
                    'filter' => [
                        '<id'          => 1000,
                        '@personTypeId' => [3, 4],
                        'payed'        => 'N',
                    ],
                    'order' => [
                        'id' => 'desc',
                    ],
                    'start' => 0,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching order list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.order.list", {
            "select": [
                "id",
                "accountNumber",
                "statusId",
                "price",
                "currency",
                "payed",
                "dateInsert",
                "userId",
            ],
            "filter": {
                "<id": 1000,
                "@personTypeId": [3, 4],
                "payed": "N",
            },
            "order": {
                "id": "desc",
            },
            "start": 0
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
        'sale.order.list',
        [
            'select' => [
                "id",
                "accountNumber",
                "statusId",
                "price",
                "currency",
                "payed",
                "dateInsert",
                "userId",
            ],
            'filter' => [
                "<id" => 1000,
                "@personTypeId" => [3, 4],
                "payed" => "N",
            ],
            'order' => [
                "id" => "desc",
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
    res, err := client.Core().Call(ctx, "sale.order.list", b24.Params{
    	"select": []string{"id", "accountNumber", "statusId", "price", "currency", "payed", "dateInsert", "userId"},
    	"filter": b24.Params{
    		"<id":           1000,
    		"@personTypeId": []int{3, 4},
    		"payed":         "N",
    	},
    	"order": b24.Params{
    		"id": "desc",
    	},
    	"start": 0,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("sale.order.list: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "orders": [
            {
                "accountNumber": "923",
                "currency": "RUB",
                "dateInsert": "2026-09-23T09:06:07+03:00",
                "id": 923,
                "payed": "N",
                "price": 300,
                "statusId": "N",
                "userId": 1
            },
            {
                "accountNumber": "909",
                "currency": "RUB",
                "dateInsert": "2026-09-04T23:03:40+03:00",
                "id": 909,
                "payed": "N",
                "price": 100.5,
                "statusId": "N",
                "userId": 1295
            }
        ]
    },
    "next": 50,
    "total": 189,
    "time": {
        "start": 1790576208,
        "finish": 1790576208.881895,
        "duration": 0.8818950653076172,
        "processing": 0,
        "date_start": "2026-09-28T09:16:48+03:00",
        "date_finish": "2026-09-28T09:16:48+03:00",
        "operating_reset_at": 1790576808,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **total**
[`integer`](../../data-types.md) | Общее количество заказов, подходящих под фильтр ||
|| **next**
[`integer`](../../data-types.md) | Значение `start` для следующей страницы. Приходит, только если после текущей страницы есть еще заказы ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **orders**
[`sale_order[]`](../data-types.md#sale_order) | Массив заказов, до 50 за вызов. Набор полей задает `select` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Invalid order \"SIDEWAYS\""
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | `Invalid order "SIDEWAYS"` | В `order` передано направление сортировки, отличное от `asc` и `desc` ||
|| `400` | `200040300010` | `Access Denied` | Недостаточно прав для чтения заказов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-order-add.md)
- [{#T}](./sale-order-update.md)
- [{#T}](./sale-order-get.md)
- [{#T}](./sale-order-delete.md)
- [{#T}](./sale-order-get-fields.md)