# Получить список цен по фильтру v 3.0 catalog.price.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Изменение цены продажи товара»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.price.list` возвращает список цен товаров с фильтрацией, сортировкой и постраничной навигацией.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив полей цены, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор цены
- `productId` — идентификатор товара или вариации
- `catalogGroupId` — идентификатор типа цены
- `price` — цена
- `currency` — код валюты
- `extraId` — идентификатор наценки
- `quantityFrom` — нижняя граница диапазона количества
- `quantityTo` — верхняя граница диапазона количества
- `priceScale` — цена в базовой валюте
- `timestampX` — дата и время последнего изменения

Поле `id` возвращается всегда, даже если его нет в `select`.

По умолчанию: все поля ||
|| **filter**
[`array`](../../data-types.md) | Фильтр в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`, например `[["productId","=",7525]]`. Фильтровать можно по всем полям из `select`.

Синтаксис и операторы описаны в [обзоре REST 3.0](../../rest-v3.md#filter) ||
|| **order**
[`object`](../../data-types.md) | Сортировка в формате `{"поле": "направление"}`. Сортировать можно по всем полям из `select`.

Возможные значения направления:

- `ASC` — по возрастанию
- `DESC` — по убыванию

По умолчанию: `{"id": "ASC"}` ||
|| **pagination**
[`object`](../../data-types.md) | Объект постраничной навигации. [Описание структуры объекта](#pagination) ||
|#

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../data-types.md) | Количество цен на странице. Значения больше `1000` уменьшаются до `1000`. Ноль, отрицательное и нечисловое значение вызывают ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../data-types.md) | Номер страницы, начиная с `1`. Смещение вычисляется как `(page - 1) × limit`.

Если передан `page`, параметр `offset` не учитывается ||
|| **offset**
[`integer`](../../data-types.md) | Количество цен, которые нужно пропустить от начала списка.

По умолчанию: `0` ||
|#

{% note info "" %}

Ответ не содержит общего количества цен. Если на странице вернулось меньше цен, чем указано в `limit`, это последняя страница.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.price.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["productId","=",7525]],"select":["id","catalogGroupId","price","currency"],"order":{"catalogGroupId":"asc"},"pagination":{"limit":10}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.price.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["productId","=",7525]],"select":["id","catalogGroupId","price","currency"],"order":{"catalogGroupId":"asc"},"pagination":{"limit":10},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.price.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type PriceListResult = {
      items: Array<{
        id: number
        catalogGroupId: number
        price: number
        currency: string
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<PriceListResult>({
        method: 'catalog.price.list',
        params: {
          filter: [
            ['productId', '=', 7525],
          ],
          select: [
            'id',
            'catalogGroupId',
            'price',
            'currency',
          ],
          order: {
            catalogGroupId: 'asc',
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
        console.info('Prices:', result.items)
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
      async function listPrices() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.price.list',
            params: {
              filter: [
                ['productId', '=', 7525],
              ],
              select: [
                'id',
                'catalogGroupId',
                'price',
                'currency',
              ],
              order: {
                catalogGroupId: 'asc',
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
          console.info('Prices:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listPrices)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.price.list(
            filter=[
                ["productId", "=", 7525],
            ],
            select=[
                "id",
                "catalogGroupId",
                "price",
                "currency",
            ],
            order={
                "catalogGroupId": "asc",
            },
            pagination={
                "limit": 10,
            },
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

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.price.list',
                [
                    'filter' => [
                        ['productId', '=', 7525],
                    ],
                    'select' => [
                        'id',
                        'catalogGroupId',
                        'price',
                        'currency',
                    ],
                    'order' => [
                        'catalogGroupId' => 'asc',
                    ],
                    'pagination' => [
                        'limit' => 10,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'catalog.price.list',
        {
            filter: [
                ['productId', '=', 7525],
            ],
            select: [
                'id',
                'catalogGroupId',
                'price',
                'currency',
            ],
            order: {
                catalogGroupId: 'asc',
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
        'catalog.price.list',
        [
            'filter' => [
                ['productId', '=', 7525],
            ],
            'select' => [
                'id',
                'catalogGroupId',
                'price',
                'currency',
            ],
            'order' => [
                'catalogGroupId' => 'asc',
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
    res, err := client.Core().Call(ctx, "catalog.price.list", b24.Params{
    	"filter": []any{
    		[]any{"productId", "=", 7525},
    	},
    	"select": []string{"id", "catalogGroupId", "price", "currency"},
    	"order": b24.Params{
    		"catalogGroupId": "asc",
    	},
    	"pagination": b24.Params{
    		"limit": 10,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.price.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID             int     `json:"id"`
    		CatalogGroupID int     `json:"catalogGroupId"`
    		Price          float64 `json:"price"`
    		Currency       string  `json:"currency"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.CatalogGroupID, item.Price, item.Currency)
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
                "id": 891,
                "catalogGroupId": 1,
                "price": 1490,
                "currency": "RUB"
            },
            {
                "id": 893,
                "catalogGroupId": 3,
                "price": 1595,
                "currency": "RUB"
            }
        ]
    },
    "time": {
        "start": 1792668102,
        "finish": 1792668102.218043,
        "duration": 0.21804308891296387,
        "processing": 0,
        "date_start": "2026-10-22T14:21:42+03:00",
        "date_finish": "2026-10-22T14:21:42+03:00",
        "operating_reset_at": 1792668660,
        "operating": 0
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
[`array`](../../data-types.md) | Массив цен. Состав полей каждой цены зависит от `select`. [Описание полей](#items) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#items}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор цены ||
|| **productId**
[`integer`](../../data-types.md) | Идентификатор товара или вариации ||
|| **catalogGroupId**
[`integer`](../../data-types.md) | Идентификатор типа цены ||
|| **price**
[`double`](../../data-types.md) | Цена ||
|| **currency**
[`string`](../../data-types.md) | Код валюты ||
|| **extraId**
[`integer`](../../data-types.md) | Идентификатор наценки. `0`, если наценка не задана ||
|| **quantityFrom**
[`integer`](../../data-types.md) | Нижняя граница диапазона количества. `0`, если граница не задана ||
|| **quantityTo**
[`integer`](../../data-types.md) | Верхняя граница диапазона количества. `0`, если граница не задана ||
|| **priceScale**
[`double`](../../data-types.md) | Цена в базовой валюте. Вычисляется автоматически ||
|| **timestampX**
[`datetime`](../../data-types.md) | Дата и время последнего изменения цены ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION",
        "message": "Не удается распознать выражение фильтра `Unknown filter condition`"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибка формата фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `Unknown filter condition` | Передайте `filter` массивом условий, например `[["productId","=",7525]]` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select`, `filter`, `order` | Неизвестное поле `#FIELD#` для сущности `PriceDto` | Укажите только поля из списка параметра `select` ||
|#

#### Ошибка пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `{"limit":0}` | Передайте в `limit` целое число больше нуля ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Просмотр каталога товаров» или «Изменение цены продажи товара» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-get-rest-v3.md)
- [{#T}](./catalog-price-add-rest-v3.md)
- [{#T}](./catalog-price-update-rest-v3.md)
- [{#T}](./catalog-price-field-list.md)
