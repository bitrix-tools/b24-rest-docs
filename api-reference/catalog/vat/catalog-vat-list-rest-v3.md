# Получить список ставок НДС по фильтру v 3.0 catalog.vat.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Управление ставками НДС»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.vat.list` возвращает список ставок НДС с фильтрацией, сортировкой и постраничной навигацией.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив полей ставки, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор ставки НДС
- `timestampX` — дата и время последнего изменения
- `active` — активность ставки
- `sort` — сортировка
- `name` — название ставки
- `rate` — величина ставки

Поле `id` возвращается всегда, даже если его нет в `select`. Значение `["*"]` не поддерживается.

По умолчанию: все поля ||
|| **filter**
[`array`](../../data-types.md) | Фильтр в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`. Фильтровать можно по всем полям из `select`.

Для `active` передавайте `true` или `false`, строки `Y` и `N` вызывают ошибку валидации.

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
[`integer`](../../data-types.md) | Количество ставок на странице. Значения больше `1000` уменьшаются до `1000`. Ноль, отрицательное и нечисловое значение вызывают ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../data-types.md) | Номер страницы, начиная с `1`. Смещение вычисляется как `(page - 1) × limit`. Ноль и отрицательное значение возвращают первую страницу.

Если передан `page`, параметр `offset` не учитывается ||
|| **offset**
[`integer`](../../data-types.md) | Количество ставок, которые нужно пропустить от начала списка. Отрицательное значение вызывает ошибку.

По умолчанию: `0` ||
|#

{% note info "" %}

Ответ не содержит общего количества ставок. Если на странице вернулось меньше ставок, чем указано в `limit`, это последняя страница.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.vat.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","rate","active"],"filter":[["active","=",true]],"order":{"sort":"ASC"},"pagination":{"page":1,"limit":2}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.vat.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","rate","active"],"filter":[["active","=",true]],"order":{"sort":"ASC"},"pagination":{"page":1,"limit":2},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.vat.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type VatListResult = {
      items: Array<{
        id: number
        name?: string
        rate?: number | null
        active?: boolean
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<VatListResult>({
        method: 'catalog.vat.list',
        params: {
          select: ['id', 'name', 'rate', 'active'],
          filter: [
            ['active', '=', true],
          ],
          order: {
            sort: 'ASC',
          },
          pagination: {
            page: 1,
            limit: 2,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('VAT rates:', result.items)
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
      async function listVats() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.vat.list',
            params: {
              select: ['id', 'name', 'rate', 'active'],
              filter: [
                ['active', '=', true],
              ],
              order: {
                sort: 'ASC',
              },
              pagination: {
                page: 1,
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
          console.info('VAT rates:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listVats)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.vat.list(
            select=["id", "name", "rate", "active"],
            filter=[
                ["active", "=", True],
            ],
            order={
                "sort": "ASC",
            },
            pagination={
                "page": 1,
                "limit": 2,
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
                'catalog.vat.list',
                [
                    'select' => ['id', 'name', 'rate', 'active'],
                    'filter' => [
                        ['active', '=', true],
                    ],
                    'order' => [
                        'sort' => 'ASC',
                    ],
                    'pagination' => [
                        'page' => 1,
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
        'catalog.vat.list',
        {
            select: ['id', 'name', 'rate', 'active'],
            filter: [
                ['active', '=', true],
            ],
            order: {
                sort: 'ASC',
            },
            pagination: {
                page: 1,
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
        'catalog.vat.list',
        [
            'select' => ['id', 'name', 'rate', 'active'],
            'filter' => [
                ['active', '=', true],
            ],
            'order' => [
                'sort' => 'ASC',
            ],
            'pagination' => [
                'page' => 1,
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
    res, err := client.Core().Call(ctx, "catalog.vat.list", b24.Params{
    	"select": []string{"id", "name", "rate", "active"},
    	"filter": []any{
    		[]any{"active", "=", true},
    	},
    	"order": b24.Params{
    		"sort": "ASC",
    	},
    	"pagination": b24.Params{
    		"page":  1,
    		"limit": 2,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.vat.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID     int      `json:"id"`
    		Name   string   `json:"name"`
    		Rate   *float64 `json:"rate"`
    		Active bool     `json:"active"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.Name)
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
                "id": 1,
                "active": true,
                "name": "Без НДС",
                "rate": null
            },
            {
                "id": 9,
                "active": true,
                "name": "НДС 22%",
                "rate": 22
            }
        ]
    },
    "time": {
        "start": 1792665623,
        "finish": 1792665623.054244,
        "duration": 0.054244041442871094,
        "processing": 0,
        "date_start": "2026-10-22T13:40:23+03:00",
        "date_finish": "2026-10-22T13:40:23+03:00",
        "operating_reset_at": 1792666200,
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
[`array`](../../data-types.md) | Массив ставок НДС на странице. Состав полей зависит от `select`. [Описание полей](#items) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#items}

Таблица содержит все поля, которые можно запросить в `select`.

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор ставки НДС ||
|| **timestampX**
[`datetime`](../../data-types.md) | Дата и время последнего изменения ставки ||
|| **active**
[`boolean`](../../data-types.md) | Активность ставки: `true` — активна, `false` — неактивна ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка ||
|| **name**
[`string`](../../data-types.md) | Название ставки НДС ||
|| **rate**
[`double`](../../data-types.md) или `null` | Величина ставки НДС в процентах. `null` у системной ставки «Без НДС» ||
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
                "message": "В поле `active` требуется тип данных `bool` для такого запроса",
                "field": "active"
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
|| `active` | В поле `active` требуется тип данных `bool` для такого запроса | Передайте в фильтре `true` или `false`, а не `Y` или `N` ||
|#

#### Ошибки фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `Unknown filter condition` | Передайте `filter` массивом условий, например `[["active","=",true]]` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Неизвестный оператор фильтра `#OPERATOR#` | Используйте операторы из [обзора REST 3.0](../../rest-v3.md#operators) ||
|#

#### Ошибки сортировки

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `order` | Не удается распознать выражение сортировки `#ORDER#` | Передайте `order` объектом, например `{"sort":"ASC"}`, с направлением `ASC` или `DESC` ||
|#

#### Ошибка постраничной навигации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте в `limit` положительное число, в `offset` — неотрицательное число ||
|#

#### Ошибки неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select`, `filter`, `order` | Неизвестное поле `#FIELD#` для сущности `VatDto` | Используйте только поля `id`, `timestampX`, `active`, `sort`, `name`, `rate` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `#SELECT#` | Передайте `select` массивом строк, например `["id","name"]` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Просмотр каталога товаров» или «Управление ставками НДС» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-vat-add-rest-v3.md)
- [{#T}](./catalog-vat-update-rest-v3.md)
- [{#T}](./catalog-vat-get-rest-v3.md)
- [{#T}](./catalog-vat-delete-rest-v3.md)
- [{#T}](./catalog-vat-field-list.md)
