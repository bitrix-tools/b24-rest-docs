# Получить список источников заказов sale.tradePlatform.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к Интернет-магазину

Метод `sale.tradePlatform.list` возвращает список источников заказов.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Список полей, которые нужно вернуть. Если не передан или пустой, метод вернет все поля.

Возможные значения:
- `id` — идентификатор источника
- `code` — код источника, значения описаны в разделе [Коды источников](#codes)
- `active` — активность источника
- `name` — название источника
- `description` — описание источника
- `settings` — настройки источника
- `catalogSectionTabClassName` — класс закладки в настройках раздела каталога
- `class` — класс обработчика источника
- `xmlId` — внешний идентификатор

Описание полей — в объекте [sale_order_trade_platform](../data-types.md#sale_order_trade_platform) ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации в формате `{"field_1": "value_1", ... "field_N": "value_N"}`. Поля те же, что в `select`. Несколько условий объединяются логикой AND.

К имени поля можно добавить префикс:
- без префикса или `=` — равно
- `!=` — не равно
- `>`, `>=`, `<`, `<=` — больше, больше или равно, меньше, меньше или равно
- `@` — входит в список, значение передается массивом
- `!@` — не входит в список, значение передается массивом
- `%` — содержит подстроку, символ `%` в значении не нужен
- `!%` — не содержит подстроку
- `=%` или `%=` — LIKE по шаблону, символ `%` передается в значении: `"web%"` — начинается с `web`
- `!=%` или `!%=` — NOT LIKE по шаблону ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки в формате `{"field_1": "order_1", ... "field_N": "order_N"}`. Поля те же, что в `select`.

Возможные значения для `order`:
- `asc` — по возрастанию
- `desc` — по убыванию

По умолчанию список отсортирован по `id` по возрастанию ||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы ||
|#

{% note warning "" %}

Имена полей в `select`, `filter` и `order` передавайте в camelCase, как в списке выше. Поля с неизвестным именем или в верхнем регистре метод молча пропускает: `select` вернет все поля, условие фильтра и сортировка не применятся.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","code"],"filter":{"%code":"smart"},"order":{"code":"asc"},"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.tradePlatform.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","code"],"filter":{"%code":"smart"},"order":{"code":"asc"},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.tradePlatform.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TradePlatformResult = {
      tradePlatforms: {
        id: number
        code: string
      }[]
    }

    try {
      // sale.tradePlatform.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<TradePlatformResult>({
        method: 'sale.tradePlatform.list',
        params: {
          select: ['id', 'code'],
          filter: { '%code': 'smart' },
          order: { code: 'asc' },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Trade platforms:', result.tradePlatforms, 'Count:', result.tradePlatforms.length)
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
      async function listTradePlatforms() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // sale.tradePlatform.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'sale.tradePlatform.list',
            params: {
              select: ['id', 'code'],
              filter: { '%code': 'smart' },
              order: { code: 'asc' },
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
          console.info('Trade platforms:', result.tradePlatforms, 'Count:', result.tradePlatforms.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listTradePlatforms)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.sale.tradeplatform.list(
            select=[
                "id",
                "code",
            ],
            filter={
                "%code": "smart",
            },
            order={
                "code": "asc",
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
                'sale.tradePlatform.list',
                [
                    'select' => ['id', 'code'],
                    'filter' => ['%code' => 'smart'],
                    'order'  => ['code' => 'asc'],
                    'start'  => 0,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching trade platforms: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod( 
        "sale.tradePlatform.list", 
        {
            select: ['id', 'code'],
            filter: {'%code': 'smart'},
            order: {'code': 'asc'},
        }, 
        function(result) 
        { 
            if(result.error()) 
            {
                console.error(result);
            }
            else
            {
                console.dir(result);

                if (result.more())
                {
                    result.next();
                }
            } 
        } 
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.tradePlatform.list',
        [
            'select' => ['id', 'code'],
            'filter' => ['%code' => 'smart'],
            'order' => ['code' => 'asc'],
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
    res, err := client.Core().Call(ctx, "sale.tradePlatform.list", b24.Params{
    	"select": []string{"id", "code"},
    	"filter": b24.Params{
    		"%code": "smart",
    	},
    	"order": b24.Params{
    		"code": "asc",
    	},
    	"start": 0,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("sale.tradePlatform.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "tradePlatforms".
    raw, ok := b24.Unwrap(res.Result, "tradePlatforms")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа tradePlatforms")
    }

    var items []struct {
    	Code string `json:"code"`
    	ID   b24.ID `json:"id"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.Code)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "tradePlatforms": [
            {
                "code": "smart_invoice",
                "id": 31
            }
        ]
    },
    "total": 1,
    "time": {
        "start": 1712135957.057659,
        "finish": 1712135957.407821,
        "duration": 0.3501620292663574,
        "processing": 0.011919021606445312,
        "date_start": "2024-04-03T11:19:17+03:00",
        "date_finish": "2024-04-03T11:19:17+03:00",
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
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **tradePlatforms**
[`sale_order_trade_platform[]`](../data-types.md#sale_order_trade_platform) | Источники заказов, которые подошли под фильтр. Каждый элемент содержит поля из `select` ||
|#

#### Коды источников {#codes}

Тип источника определяется по полю `code`.

#|
|| **Код** | **Источник** ||
|| `deal` | Сделка ||
|| `smart_invoice` | Счет ||
|| `dynamic_{id}` | Смарт-процесс с включенными оплатами, `{id}` — идентификатор типа смарт-процесса ||
|| `activity` | Дело ||
|| `realization_document` | Документ реализации ||
|| `terminal` | Терминал ||
|| `landing_{id}` | Лендинг или магазин на сайтах, `{id}` — идентификатор сайта ||
|| `webform_{id}` | CRM-форма, `{id}` — идентификатор формы ||
|#

Источник лендинга или CRM-формы появляется для каждого сайта или формы отдельно. Чтобы найти все источники одного типа, используйте в `filter` префикс `%=`, например `{"%=code": "landing_%"}`.

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Invalid value {x} to match with parameter {filter}. Should be value of type array."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Invalid value {id} to match with parameter {select}. Should be value of type array. | В `select`, `filter` или `order` передан не массив и не объект. В тексте ошибки подставляются переданное значение и имя параметра ||
|| `400` | `200040300010` | Access Denied | У пользователя нет доступа к Интернет-магазину ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./sale-trade-platform-get-fields.md)
