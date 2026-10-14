# Получить список коэффициентов единиц измерения catalog.ratio.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Управление типами цен»

Метод `catalog.ratio.list` возвращает коэффициенты единиц измерения товаров по фильтру. Если у товара нет записи коэффициента, Битрикс24 использует для него коэффициент 1.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) |
Массив со списком полей, которые необходимо выбрать (смотрите поля объекта [catalog_ratio](../data-types.md#catalog_ratio)).

Если массив не передан или пустой, метод вернет все поля
||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных коэффициентов единиц измерения в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_ratio](../data-types.md#catalog_ratio).

Ключу можно задать дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN, в качестве значения передается массив
- `!@` — NOT IN, в качестве значения передается массив
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
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно

Префиксы `@` и `!@` работают для полей `id`, `productId` и `isDefault`. С полем `ratio` метод вернет ошибку.

Поиск по подстроке с префиксами `%`, `=%`, `%=`, `!%`, `!=%` и `!%=` работает только для поля `isDefault`. Значения числовых полей метод сравнивает целиком: фильтр `{"%productId": "64"}` не найдет товар с идентификатором `6461`
||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки выбранных полей коэффициентов единиц измерения в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_ratio](../data-types.md#catalog_ratio).

Возможные значения для `order`:
- `asc` — в порядке возрастания
- `desc` — в порядке убывания

Если `order` не передан, метод вернет записи по возрастанию `id`
||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы
||
|#

{% note warning "" %}

Имена полей в `filter` пишите так же, как в ответе: `productId`, `isDefault`. Условие с другим именем поля, например `PRODUCT_ID`, метод пропустит без ошибки. Если других условий нет, он вернет коэффициенты всех товаров.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","productId","ratio","isDefault"],"filter":{"@productId":[533,6461],">ratio":0.5,"isDefault":"Y"},"order":{"id":"desc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.ratio.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","productId","ratio","isDefault"],"filter":{"@productId":[533,6461],">ratio":0.5,"isDefault":"Y"},"order":{"id":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.ratio.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CatalogRatioItem = {
      id: number,
      productId: number,
      ratio: number,
      isDefault: 'Y' | 'N',
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type RatioListResult = {
      ratios: CatalogRatioItem[],
    }

    try {
      // catalog.ratio.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<RatioListResult>({
        method: 'catalog.ratio.list',
        params: {
          select: ['id', 'productId', 'ratio', 'isDefault'],
          filter: {
            '@productId': [533, 6461],
            '>ratio': 0.5,
            isDefault: 'Y',
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
        console.info('Ratios:', result.ratios, 'Count:', result.ratios.length)
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
      async function fetchRatioList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // catalog.ratio.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'catalog.ratio.list',
            params: {
              select: ['id', 'productId', 'ratio', 'isDefault'],
              filter: {
                '@productId': [533, 6461],
                '>ratio': 0.5,
                isDefault: 'Y',
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
          console.info('Ratios:', result.ratios, 'Count:', result.ratios.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchRatioList)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.ratio.list(
            select=[
                "id",
                "productId",
                "ratio",
                "isDefault",
            ],
            filter={
                "@productId": [533, 6461],
                ">ratio": 0.5,
                "isDefault": "Y",
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
                'catalog.ratio.list',
                [
                    'select' => [
                        'id',
                        'productId',
                        'ratio',
                        'isDefault',
                    ],
                    'filter' => [
                        '@productId' => [533, 6461],
                        '>ratio'     => 0.5,
                        'isDefault'  => 'Y',
                    ],
                    'order' => [
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
        echo 'Error fetching ratio list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.ratio.list',
            {
                select:[
                    'id',
                    'productId',
                    'ratio',
                    'isDefault',
                ],
                filter:{
                    '@productId': [533, 6461],
                    '>ratio': 0.5,
                    'isDefault': 'Y',
                },
                order:{
                    id: 'desc',
                },
            },
            function(result)
            {
                if(result.error()) {
                    console.error(result.error());
                } else {
                    console.log(result.data());
                }
            }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.ratio.list',
        [
            'select' => [
                'id',
                'productId',
                'ratio',
                'isDefault',
            ],
            'filter' => [
                '@productId' => [533, 6461],
                '>ratio' => 0.5,
                'isDefault' => 'Y',
            ],
            'order' => [
                'id' => 'desc',
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
    res, err := client.Core().Call(ctx, "catalog.ratio.list", b24.Params{
    	"select": []string{"id", "productId", "ratio", "isDefault"},
    	"filter": b24.Params{
    		"@productId": []int{533, 6461},
    		">ratio":     0.5,
    		"isDefault":  "Y",
    	},
    	"order": b24.Params{
    		"id": "desc",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.ratio.list: %w", err)
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
        "ratios": [
            {
                "id": 285,
                "isDefault": "Y",
                "productId": 6461,
                "ratio": 10
            },
            {
                "id": 279,
                "isDefault": "Y",
                "productId": 533,
                "ratio": 1
            }
        ]
    },
    "total": 2,
    "time": {
        "start": 1790852349,
        "finish": 1790852349.935266,
        "duration": 0.9352660179138184,
        "processing": 0,
        "date_start": "2026-10-01T13:59:09+03:00",
        "date_finish": "2026-10-01T13:59:09+03:00",
        "operating_reset_at": 1790852949,
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
|| **ratios**
[`catalog_ratio[]`](../data-types.md#catalog_ratio) | Массив объектов с информацией о выбранных коэффициентах единиц измерения ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **next**
[`integer`](../../data-types.md) | Значение параметра `start` для получения следующей страницы. Поле отсутствует, если получена последняя страница ||
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
|| `400` | `200040300010` | Access Denied | У пользователя нет ни права «Просмотр каталога товаров», ни права «Управление типами цен» ||
|| `400` | `100` | Invalid order "<VALUE>" | В `order` передано направление сортировки, отличное от `asc` и `desc` ||
|| `400` | `100` | Order must be a string | Направление сортировки в `order` передано не строкой ||
|| `400` | `100` | Invalid value {<VALUE>} to match with parameter {filter}. Should be value of type array. | `filter` передан не объектом. Тот же текст с `{order}` или `{select}` значит, что `order` передан не объектом или `select` — не массивом ||
|| `400` | `0` | Call to a member function compile() on float | В `filter` для поля `ratio` передан массив с префиксом `@` или `!@` ||
|| — | `0` | — | Другие ошибки, например фатальные ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./catalog-ratio-get.md)
- [{#T}](./catalog-ratio-get-fields.md)
- [{#T}](../product/catalog-product-list.md)