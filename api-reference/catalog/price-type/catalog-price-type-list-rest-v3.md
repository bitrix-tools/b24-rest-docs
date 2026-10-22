# Получить список типов цен по фильтру v 3.0 catalog.pricetype.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Управление типами цен»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.pricetype.list` возвращает список типов цен по фильтру.

{% note warning "" %}

В REST 3.0 имя метода пишется в нижнем регистре: `catalog.pricetype.list`. Вызов `catalog.priceType.list` по адресу `/rest/api/` возвращает ошибку `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`.

{% endnote %}

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив полей типа цены, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор типа цены
- `name` — название
- `base` — признак базового типа цены
- `sort` — сортировка
- `xmlId` — внешний код
- `timestampX` — дата и время последнего изменения
- `modifiedBy` — идентификатор пользователя, который последним изменил тип цены
- `dateCreate` — дата и время создания
- `createdBy` — идентификатор пользователя, который создал тип цены

Поле `id` возвращается всегда, даже если его нет в `select`. Значение `["*"]` не поддерживается.

По умолчанию: все поля ||
|| **filter**
[`array`](../../data-types.md) | Фильтр в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`. Фильтровать можно по всем полям из `select`.

Для `base` передавайте `true` или `false`.

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
[`integer`](../../data-types.md) | Количество типов цен на странице. Значения больше `1000` уменьшаются до `1000`. Ноль вызывает ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../data-types.md) | Номер страницы, начиная с `1`. Смещение вычисляется как `(page - 1) × limit` ||
|| **offset**
[`integer`](../../data-types.md) | Количество типов цен, которые нужно пропустить от начала списка.

По умолчанию: `0` ||
|#

{% note info "" %}

Ответ не содержит общего количества типов цен. Если на странице вернулось меньше типов цен, чем указано в `limit`, это последняя страница.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.pricetype.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","base","sort"],"filter":[["base","=",false]],"order":{"sort":"asc"},"pagination":{"limit":2}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.pricetype.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","base","sort"],"filter":[["base","=",false]],"order":{"sort":"asc"},"pagination":{"limit":2},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.pricetype.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type PriceTypeListResult = {
      items: Array<{
        id: number
        name: string
        base: boolean
        sort: number
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<PriceTypeListResult>({
        method: 'catalog.pricetype.list',
        params: {
          select: ['id', 'name', 'base', 'sort'],
          filter: [
            ['base', '=', false],
          ],
          order: {
            sort: 'asc',
          },
          pagination: {
            limit: 2,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Price types:', result.items.length)
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
      async function listPriceTypes() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.pricetype.list',
            params: {
              select: ['id', 'name', 'base', 'sort'],
              filter: [
                ['base', '=', false],
              ],
              order: {
                sort: 'asc',
              },
              pagination: {
                limit: 2,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Price types:', result.items.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listPriceTypes)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.pricetype.list(
            select=["id", "name", "base", "sort"],
            filter=[
                ["base", "=", False],
            ],
            order={"sort": "asc"},
            pagination={"limit": 2},
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
                'catalog.pricetype.list',
                [
                    'select' => ['id', 'name', 'base', 'sort'],
                    'filter' => [
                        ['base', '=', false],
                    ],
                    'order' => [
                        'sort' => 'asc',
                    ],
                    'pagination' => [
                        'limit' => 2,
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
        'catalog.pricetype.list',
        {
            select: ['id', 'name', 'base', 'sort'],
            filter: [
                ['base', '=', false],
            ],
            order: {
                sort: 'asc',
            },
            pagination: {
                limit: 2,
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
        'catalog.pricetype.list',
        [
            'select' => ['id', 'name', 'base', 'sort'],
            'filter' => [
                ['base', '=', false],
            ],
            'order' => [
                'sort' => 'asc',
            ],
            'pagination' => [
                'limit' => 2,
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
    res, err := client.Core().Call(ctx, "catalog.pricetype.list", b24.Params{
    	"select": []string{"id", "name", "base", "sort"},
    	"filter": []any{
    		[]any{"base", "=", false},
    	},
    	"order": b24.Params{
    		"sort": "asc",
    	},
    	"pagination": b24.Params{
    		"limit": 2,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.pricetype.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID   int    `json:"id"`
    		Name string `json:"name"`
    		Base bool   `json:"base"`
    		Sort int    `json:"sort"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.Name, item.Sort)
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
                "id": 5,
                "name": "Wholesale price",
                "base": false,
                "sort": 1
            },
            {
                "id": 7,
                "name": "Wholesale price",
                "base": false,
                "sort": 10
            }
        ]
    },
    "time": {
        "start": 1792668177,
        "finish": 1792668177.817243,
        "duration": 0.8172430992126465,
        "processing": 0,
        "date_start": "2026-10-22T14:22:57+03:00",
        "date_finish": "2026-10-22T14:22:57+03:00",
        "operating_reset_at": 1792668720,
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
[`array`](../../data-types.md) | Массив типов цен на странице. Состав полей зависит от `select`. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор типа цены ||
|| **name**
[`string`](../../data-types.md) | Название типа цены ||
|| **base**
[`boolean`](../../data-types.md) | Признак базового типа цены: `true` — базовый, `false` — обычный ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код типа цены. Пустая строка, если код не задан ||
|| **timestampX**
[`datetime`](../../data-types.md) | Дата и время последнего изменения ||
|| **modifiedBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который последним изменил тип цены ||
|| **dateCreate**
[`datetime`](../../data-types.md) | Дата и время создания ||
|| **createdBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который создал тип цены ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION",
        "message": "Неизвестный оператор фильтра `%`"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select`, `filter`, `order` | Неизвестное поле `#FIELD#` для сущности `PriceTypeDto` | Используйте только поля из списка параметра `select` ||
|#

#### Ошибка формата фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `Unknown filter condition` | Передайте `filter` массивом условий, например `[["base","=",false]]` ||
|#

#### Ошибка оператора фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Неизвестный оператор фильтра `#OPERATOR#` | Используйте операторы из [обзора REST 3.0](../../rest-v3.md#operators) ||
|#

#### Ошибка сортировки

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `order` | Не удается распознать выражение сортировки `#ORDER#` | Передайте направление `ASC` или `DESC` ||
|#

#### Ошибка пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте в `limit` положительное число ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Просмотр каталога товаров» или «Управление типами цен» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-type-add-rest-v3.md)
- [{#T}](./catalog-price-type-update-rest-v3.md)
- [{#T}](./catalog-price-type-get-rest-v3.md)
- [{#T}](./catalog-price-type-delete-rest-v3.md)
- [{#T}](./catalog-price-type-field-list.md)
