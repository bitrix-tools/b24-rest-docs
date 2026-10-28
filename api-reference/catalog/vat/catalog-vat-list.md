# Получить список ставок НДС по фильтру catalog.vat.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Управление ставками НДС»

Метод `catalog.vat.list` возвращает список ставок НДС с фильтрацией, сортировкой и постраничной навигацией.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select** 
[`array`](../../data-types.md)| Массив полей ставки НДС, которые нужно вернуть. Доступные поля: `active`, `id`, `name`, `rate`, `sort`, `timestampX`. Описание полей — в объекте [catalog_vat](../data-types.md#catalog_vat).

Если массив не передан или пустой, метод вернет все поля. Неизвестные поля метод пропускает без ошибки
||
|| **filter** 
[`object`](../../data-types.md)| Объект для фильтрации выбранных ставок НДС в формате `{"field_1": "value_1", ..., "field_N": "value_N"}`.

Возможные значения для `field`: `active`, `id`, `name`, `rate`, `sort`, `timestampX`. Например, `{"active": "N"}` вернет только неактивные ставки.

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN (в качестве значения передается массив)
- `!@` — NOT IN (в качестве значения передается массив)
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки.
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
  - `"мол%"` — ищем значения начинающиеся с «мол»
  - `"%мол"` — ищем значения заканчивающиеся на «мол»
  - `"%мол%"` — ищем значения, где «мол» может быть в любой позиции
- `%=` — LIKE (аналогично `=%`)
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обеих сторон
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
  - `"мол%"` — ищем значения не начинающиеся с «мол»
  - `"%мол"` — ищем значения не заканчивающиеся на «мол»
  - `"%мол%"` — ищем значения, где подстроки «мол» нет в любой позиции
- `!%=` — NOT LIKE (аналогично `!=%`)
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно

Неизвестные поля в фильтре метод пропускает без ошибки и возвращает ставки без учета такого условия. Проверяйте имена полей по списку выше
||
|| **order**
[`object`](../../data-types.md)| Объект для сортировки выбранных ставок НДС в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field`: `active`, `id`, `name`, `rate`, `sort`, `timestampX`.

Возможные значения для `order`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания

Если `order` не передан, метод не задает сортировку явно. Для стабильного порядка при постраничной выборке передайте сортировку, например `{"id": "asc"}`. Неизвестные поля в `order` метод пропускает без ошибки
||
|| **start** 
[`integer`](../../data-types.md)| Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","rate"],"filter":{"active":"Y"},"order":{"id":"ASC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.vat.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","rate"],"filter":{"active":"Y"},"order":{"id":"ASC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.vat.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CatalogVatListResult = {
      vats: {
        id: number
        name: string
        rate: number | null
      }[]
    }

    // catalog.vat.list returns a single page (max 50 records). For the whole result set
    // use a list helper: $b24.actions.v2.callList.make() returns every record as one
    // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
    // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
    // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
    try {
      const response = await $b24.actions.v2.call.make<CatalogVatListResult>({
        method: 'catalog.vat.list',
        params: {
          select: [
            'id',
            'name',
            'rate',
          ],
          filter: {
            active: 'Y',
          },
          order: {
            id: 'ASC',
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
        console.info('VAT rates:', result.vats, 'count:', result.vats.length)
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
      async function fetchVatList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // catalog.vat.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'catalog.vat.list',
            params: {
              select: [
                'id',
                'name',
                'rate',
              ],
              filter: {
                active: 'Y',
              },
              order: {
                id: 'ASC',
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
          console.info('VAT rates:', result.vats, 'count:', result.vats.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchVatList)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.vat.list(
            select=[
                "id",
                "name",
                "rate",
            ],
            filter={
                "active": "Y",
            },
            order={
                "id": "ASC",
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
                'catalog.vat.list',
                [
                    'select' => [
                        'id',
                        'name',
                        'rate'
                    ],
                    'filter' => [
                        'active' => 'Y'
                    ],
                    'order' => [
                        'id' => "ASC"
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result['vats'], true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error listing VAT: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.vat.list',
        {
            select: [
                'id',
                'name',
                'rate'
            ],
            filter: {
                active: 'Y'
            },
            order: {
                'id': "ASC"
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.log(result.data());
                if(result.more())
                    result.next();
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.vat.list',
        [
            'select' => [
                'id',
                'name',
                'rate'
            ],
            'filter' => [
                'active' => 'Y'
            ],
            'order' => [
                'id' => 'ASC'
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
    res, err := client.Core().Call(ctx, "catalog.vat.list", b24.Params{
    	"select": []string{"id", "name", "rate"},
    	"filter": b24.Params{
    		"active": "Y",
    	},
    	"order": b24.Params{
    		"id": "ASC",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.vat.list: %w", err)
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
        "vats": [
            {
                "id": 1,
                "name": "Без НДС",
                "rate": null
            },
            {
                "id": 3,
                "name": "НДС 22%",
                "rate": 22
            },
            {
                "id": 7,
                "name": "НДС 12%",
                "rate": 12
            }
        ]
    },
    "total": 3,
    "time": {
        "start": 1793118107,
        "finish": 1793118107.896136,
        "duration": 0.8961360454559326,
        "processing": 0,
        "date_start": "2026-10-27T19:21:47+03:00",
        "date_finish": "2026-10-27T19:21:47+03:00",
        "operating_reset_at": 1793118660,
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
|| **vats**
[`catalog_vat[]`](../data-types.md#catalog_vat) | Массив ставок НДС текущей страницы, не больше 50 элементов. Каждый элемент содержит поля из `select`. У ставки без НДС поле `rate` равно `null` ||
|| **total**
[`integer`](../../data-types.md) | Общее количество ставок, подходящих под фильтр. Если `total` больше 50, получите следующие страницы с помощью параметра `start` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "200040300010",
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | Access Denied | У пользователя нет ни права «Просмотр каталога товаров», ни права «Управление ставками НДС» ||
|| — | `0` | — | Другие ошибки, например фатальные ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./catalog-vat-add.md)
- [{#T}](./catalog-vat-update.md)
- [{#T}](./catalog-vat-get.md)
- [{#T}](./catalog-vat-delete.md)
- [{#T}](./catalog-vat-get-fields.md)
