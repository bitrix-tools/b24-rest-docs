# Получить список привязок заказов к источникам sale.tradeBinding.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом «Просмотр каталога товаров»

Метод `sale.tradeBinding.list` возвращает привязки заказов к источникам без состава заказа — состав получите методом [sale.order.get](../order/sale-order-get.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Список полей, которые нужно вернуть. Доступные поля — в объекте [sale_order_trade_binding](../data-types.md#sale_order_trade_binding).

Если не передан или передан пустой массив, возвращаются все поля. Неизвестные поля метод игнорирует без ошибки ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации привязок в формате `{"field_1": "value_1", ... "field_N": "value_N"}`. При указании нескольких полей используется логика AND.

Возможные значения для `field` соответствуют полям объекта [sale_order_trade_binding](../data-types.md#sale_order_trade_binding).

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `=` — равно, точное совпадение, префикс по умолчанию
- `!=`, `!` — не равно
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN, значение передается массивом
- `!@` — NOT IN, значение передается массивом
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Подстрока ищется в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `мол%` — значения, начинающиеся с «мол»
    - `%мол` — значения, заканчивающиеся на «мол»
    - `%мол%` — значения, где «мол» может быть в любой позиции
- `%=` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении, как для `=%`
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Возвращаются значения, в которых подстроки нет ни в одной позиции
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `мол%` — значения, не начинающиеся с «мол»
    - `%мол` — значения, не заканчивающиеся на «мол»
    - `%мол%` — значения, где подстроки «мол» нет ни в одной позиции
- `!%=` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении, как для `!=%`

Чтобы получить привязки заказов одного источника, фильтруйте по `tradingPlatformId` — идентификатору из метода [sale.tradePlatform.list](../trade-platform/sale-trade-platform-list.md).

Неизвестные поля метод игнорирует без ошибки. Если ошибиться в имени поля, метод вернет все записи ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки привязок в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [sale_order_trade_binding](../data-types.md#sale_order_trade_binding).

Возможные значения для `order`:
- `asc` — в порядке возрастания
- `desc` — в порядке убывания

По умолчанию привязки сортируются по возрастанию `id`. Неизвестные поля метод игнорирует без ошибки ||
|| **start**
[`integer`](../../data-types.md) | Смещение для постраничной навигации. Размер страницы — 50 записей. По умолчанию `0` — первая страница.

Для второй страницы передайте `50`, для третьей — `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы.

Значение для следующей страницы приходит в поле `next` ответа ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["orderId","tradingPlatformId"],"filter":{"!=tradingPlatformId":10},"order":{"tradingPlatformId":"desc"},"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.tradeBinding.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["orderId","tradingPlatformId"],"filter":{"!=tradingPlatformId":10},"order":{"tradingPlatformId":"desc"},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.tradeBinding.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'
    
    declare const $b24: B24Frame
    
    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TradeBindingListResult = {
      tradeBindings: TradeBinding[],
    }
    
    type TradeBinding = {
      orderId: number,
      tradingPlatformId: string,
    }
    
    // sale.tradeBinding.list returns a single page (max 50 records). For the whole result set
    // use a list helper: $b24.actions.v2.callList.make() returns every record as one
    // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
    // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
    // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
    try {
      const response = await $b24.actions.v2.call.make<TradeBindingListResult>({
        method: 'sale.tradeBinding.list',
        params: {
          select: ['orderId', 'tradingPlatformId'],
          filter: { '!=tradingPlatformId': 10 },
          order: { tradingPlatformId: 'desc' },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })
    
      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Trade bindings:', result.tradeBindings, 'Count:', result.tradeBindings.length)
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
      async function listTradeBindings() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()
    
          // sale.tradeBinding.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'sale.tradeBinding.list',
            params: {
              select: ['orderId', 'tradingPlatformId'],
              filter: { '!=tradingPlatformId': 10 },
              order: { tradingPlatformId: 'desc' },
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
          console.info('Trade bindings:', result.tradeBindings, 'Count:', result.tradeBindings.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }
    
      document.addEventListener('DOMContentLoaded', listTradeBindings)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.sale.tradebinding.list(
            select=[
                "orderId",
                "tradingPlatformId",
            ],
            filter={
                "!=tradingPlatformId": 10,
            },
            order={
                "tradingPlatformId": "desc",
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
                'sale.tradeBinding.list',
                [
                    'select' => ['orderId', 'tradingPlatformId'],
                    'filter' => ['!=tradingPlatformId' => 10],
                    'order'  => ['tradingPlatformId' => 'desc'],
                    'start'  => 0,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching trade bindings: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.tradeBinding.list",
        {
            select: ['orderId', 'tradingPlatformId'],
            filter: {'!=tradingPlatformId': 10},
            order: {'tradingPlatformId': 'desc'},
            start: 0
        },
        function(result)
        {
            if(result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.tradeBinding.list',
        [
            'select' => ['orderId', 'tradingPlatformId'],
            'filter' => ['!=tradingPlatformId' => 10],
            'order' => ['tradingPlatformId' => 'desc'],
            'start' => 0
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "sale.tradeBinding.list", b24.Params{
    	"select": []string{"orderId", "tradingPlatformId"},
    	"filter": b24.Params{
    		"!=tradingPlatformId": 10,
    	},
    	"order": b24.Params{
    		"tradingPlatformId": "desc",
    	},
    	"start": 0,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("sale.tradeBinding.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "tradeBindings".
    raw, ok := b24.Unwrap(res.Result, "tradeBindings")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа tradeBindings")
    }

    var items []struct {
    	OrderID           b24.ID `json:"orderId"`
    	TradingPlatformID b24.ID `json:"tradingPlatformId"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.OrderID)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "tradeBindings": [
            {
                "orderId": 685,
                "tradingPlatformId": "18"
            },
            {
                "orderId": 690,
                "tradingPlatformId": "4"
            },
            {
                "orderId": 607,
                "tradingPlatformId": "3"
            }
        ]
    },
    "total": 3,
    "time": {
        "start": 1712135957.057659,
        "finish": 1712135957.407821,
        "duration": 0.3501620292663574,
        "processing": 0.011919021606445312,
        "date_start": "2024-04-03T11:19:17+02:00",
        "date_finish": "2024-04-03T11:19:17+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **next**
[`integer`](../../data-types.md) | Значение `start` для следующей страницы. Возвращается, если найдено больше записей, чем уместилось на текущей странице ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **tradeBindings**
[`sale_order_trade_binding[]`](../data-types.md#sale_order_trade_binding) | Массив привязок заказов к источникам. Набор полей в каждом элементе задает параметр `select`. Если ничего не найдено, массив пустой ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"200040300010",
    "error_description":"Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | Access Denied | Недостаточно прав для выполнения метода ||
|| `400` | `100` | Invalid order "<VALUE>" | В `order` передано направление сортировки, отличное от `asc` и `desc` ||
|| `400` | `100` | Order must be a string | Направление сортировки в `order` передано не строкой ||
|| — | `0` | — | Другие ошибки, например фатальные ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-trade-binding-get-fields.md)
- [{#T}](../trade-platform/sale-trade-platform-list.md)
- [{#T}](../order/sale-order-get.md)