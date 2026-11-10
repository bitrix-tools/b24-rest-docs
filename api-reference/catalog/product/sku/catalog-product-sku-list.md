# Получить список головных товаров catalog.product.sku.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара» и правом на чтение инфоблока каталога

Метод `catalog.product.sku.list` возвращает список головных товаров каталога по фильтру. В список попадают головные товары с вариациями (тип `3`) и без вариаций (тип `6`).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select***
[`array`](../../../data-types.md) | Массив полей, которые нужно вернуть. Поля описаны в объекте [catalog_product_sku](../../data-types.md#catalog_product_sku).

Обязательно передайте поля `id` и `iblockId`. Значения свойств выбираются ключами `propertyN`, где `N` — идентификатор свойства.

В `select` можно перечислить поля торгового каталога, например `canBuyZero`, `quantity`, `vatId`: методы `get`, `add` и `update` их не возвращают.

Неизвестные поля и имена в верхнем регистре, например `NAME`, метод пропускает без ошибки ||
|| **filter***
[`object`](../../../data-types.md) | Объект для фильтрации головных товаров в формате `{"field_1": "value_1", ..., "field_N": "value_N"}`.

Обязательно передайте `iblockId` — идентификатор инфоблока каталога товаров. Получить его можно методом [catalog.catalog.list](../../catalog/catalog-catalog-list.md).

Фильтровать можно по полям объекта [catalog_product_sku](../../data-types.md#catalog_product_sku) и по одиночным свойствам, например `{"property303": "Текстиль Плюс"}`. Фильтр по множественному свойству не применяется.

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `=` — равно, точное совпадение (используется по умолчанию). Массив значений работает как IN: `{"id": [7679, 7637]}`
- `!=` — не равно
- `!` — не равно. С массивом значений работает как NOT IN
- `>` — больше
- `>=` — больше либо равно
- `<` — меньше
- `<=` — меньше либо равно
- `%` — LIKE, поиск подстроки в любой позиции. Символ `%` в значении передавать не нужно
- `!%` — NOT LIKE, значения без подстроки

Префиксы `=%`, `%=`, `!=%`, `!%=`, `@` и `!@` метод не применяет и возвращает записи без учета такого условия.

Поле `type` фильтрует только по значениям `3` и `6`. Другое значение не сужает выборку.

Неизвестные поля и имена в верхнем регистре, например `ID`, метод пропускает без ошибки и возвращает товары без учета такого условия ||
|| **order**
[`object`](../../../data-types.md) | Объект для сортировки головных товаров в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `order`:
- `asc` — в порядке возрастания
- `desc` — в порядке убывания

Регистр направления не важен. Неизвестные поля и неверное направление метод пропускает без ошибки.

По умолчанию — по возрастанию `id` ||
|| **start**
[`integer`](../../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы ||
|#

{% note warning "" %}

Значение `start` за пределами списка возвращает первую страницу, а не пустой массив. Не завершайте обход по пустой странице: цикл не остановится. Ориентируйтесь на поле `total` и наличие поля `next` в ответе.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример получает головные товары раздела `31`, у которых сортировка не меньше `100`, а символьный код содержит `futbolka`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","iblockId","name","active","sort","code","iblockSectionId","property303"],"filter":{"iblockId":25,"iblockSectionId":31,">=sort":100,"%code":"futbolka"},"order":{"sort":"asc"},"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.sku.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","iblockId","name","active","sort","code","iblockSectionId","property303"],"filter":{"iblockId":25,"iblockSectionId":31,">=sort":100,"%code":"futbolka"},"order":{"sort":"asc"},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.sku.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of one item returned in result.units (only the selected fields)
    type SkuListItem = {
      id: number
      iblockId: number
      name: string
      active: string
      sort: number | null
      code: string | null
      iblockSectionId: number | null
      property303: { value: string; valueId: string } | null
    }

    try {
      // catalog.product.sku.list returns a single page (max 50 records).
      // The list is returned under the "units" key.
      const response = await $b24.actions.v2.call.make<{ units: SkuListItem[] }>({
        method: 'catalog.product.sku.list',
        params: {
          select: ['id', 'iblockId', 'name', 'active', 'sort', 'code', 'iblockSectionId', 'property303'],
          filter: {
            iblockId: 25,
            iblockSectionId: 31,
            '>=sort': 100,
            '%code': 'futbolka',
          },
          order: {
            sort: 'asc',
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
        console.info('SKU products on page:', result.units.length)
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
      async function listSkuProducts() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.product.sku.list',
            params: {
              select: ['id', 'iblockId', 'name', 'active', 'sort', 'code', 'iblockSectionId', 'property303'],
              filter: {
                iblockId: 25,
                iblockSectionId: 31,
                '>=sort': 100,
                '%code': 'futbolka',
              },
              order: {
                sort: 'asc',
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
          console.info('SKU products on page:', result.units.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listSkuProducts)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.sku.list(
            select=["id", "iblockId", "name", "active", "sort", "code", "iblockSectionId", "property303"],
            filter={
                "iblockId": 25,
                "iblockSectionId": 31,
                ">=sort": 100,
                "%code": "futbolka",
            },
            order={
                "sort": "asc",
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
                'catalog.product.sku.list',
                [
                    'select' => ['id', 'iblockId', 'name', 'active', 'sort', 'code', 'iblockSectionId', 'property303'],
                    'filter' => [
                        'iblockId'        => 25,
                        'iblockSectionId' => 31,
                        '>=sort'          => 100,
                        '%code'           => 'futbolka',
                    ],
                    'order'  => [
                        'sort' => 'asc',
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
        'catalog.product.sku.list',
        {
            select: ['id', 'iblockId', 'name', 'active', 'sort', 'code', 'iblockSectionId', 'property303'],
            filter: {
                iblockId: 25,
                iblockSectionId: 31,
                '>=sort': 100,
                '%code': 'futbolka',
            },
            order: {
                sort: 'asc',
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
        'catalog.product.sku.list',
        [
            'select' => ['id', 'iblockId', 'name', 'active', 'sort', 'code', 'iblockSectionId', 'property303'],
            'filter' => [
                'iblockId' => 25,
                'iblockSectionId' => 31,
                '>=sort' => 100,
                '%code' => 'futbolka',
            ],
            'order' => [
                'sort' => 'asc',
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
    res, err := client.Core().Call(ctx, "catalog.product.sku.list", b24.Params{
    	"select": []string{"id", "iblockId", "name", "active", "sort", "code", "iblockSectionId", "property303"},
    	"filter": b24.Params{
    		"iblockId":        25,
    		"iblockSectionId": 31,
    		">=sort":          100,
    		"%code":           "futbolka",
    	},
    	"order": b24.Params{
    		"sort": "asc",
    	},
    	"start": 0,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.sku.list: %w", err)
    }

    // Метод возвращает список под ключом "units".
    raw, ok := b24.Unwrap(res.Result, "units")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа units")
    }

    // Необязательные поля могут прийти как null, поэтому для них указатели.
    var items []struct {
    	ID              b24.ID  `json:"id"`
    	IblockID        int     `json:"iblockId"`
    	Name            string  `json:"name"`
    	Active          string  `json:"active"`
    	Sort            *int    `json:"sort"`
    	Code            *string `json:"code"`
    	IblockSectionID *int    `json:"iblockSectionId"`
    	Property303     *struct {
    		Value   string `json:"value"`
    		ValueID string `json:"valueId"`
    	} `json:"property303"`
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
        "units": [
            {
                "active": "Y",
                "code": "futbolka-bazovaya",
                "iblockId": 25,
                "iblockSectionId": 31,
                "id": 7679,
                "name": "Футболка базовая",
                "property303": {
                    "value": "Хлопковый двор",
                    "valueId": "4117"
                },
                "sort": 300
            }
        ]
    },
    "total": 1,
    "time": {
        "start": 1793893107,
        "finish": 1793893107.413658,
        "duration": 0.41365790367126465,
        "processing": 0,
        "date_start": "2026-11-05T18:38:27+03:00",
        "date_finish": "2026-11-05T18:38:27+03:00",
        "operating_reset_at": 1793893200,
        "operating": 0.13479113578796387
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **result.units**
[`catalog_product_sku[]`](../../data-types.md#catalog_product_sku) | Массив головных товаров. Метод возвращает список под ключом `units`, а не `skus`.

У каждого товара только поля из `select`. У заполненного свойства значение — объект `{"value": ..., "valueId": ...}`, у множественного — массив таких объектов ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество найденных головных товаров ||
|| **next**
[`integer`](../../../data-types.md) | Значение `start` для следующей страницы. Приходит, если найдено больше 50 записей и страница не последняя ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Required filter fields: iblockId"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | Access Denied | У пользователя нет права на просмотр каталога ||
|| `400` | `200040300030` | Access Denied | У пользователя нет права на чтение инфоблока каталога ||
|| `400` | `0` | Required filter fields: iblockId | В `filter` не передан `iblockId` ||
|| `400` | `0` | Required select fields: iblockId | В `select` нет поля `iblockId`. Если нет поля `id`, приходит ошибка `Required select fields: id` ||
|| `400` | `0` | iblock is not catalog | Инфоблок из `iblockId` не является торговым каталогом ||
|| `400` | `0` | productType is not allowed for this catalog | В `iblockId` передан инфоблок вариаций ||
|| `400` | `100` | Invalid value {abc} to match with parameter {filter}. Should be value of type array. | В `filter` передан не объект. Такая же ошибка с `{select}` — если в `select` передан не массив ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-sku-add.md)
- [{#T}](./catalog-product-sku-update.md)
- [{#T}](./catalog-product-sku-get.md)
- [{#T}](./catalog-product-sku-download.md)
- [{#T}](./catalog-product-sku-delete.md)
- [{#T}](./catalog-product-sku-get-fields-by-filter.md)
