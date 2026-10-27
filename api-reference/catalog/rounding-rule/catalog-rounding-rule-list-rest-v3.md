# Получить список правил округления цен по фильтру v 3.0 catalog.roundingrule.list

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

Метод `catalog.roundingrule.list` возвращает список правил округления цен с фильтрацией, сортировкой и постраничной навигацией.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив полей правила, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор правила округления
- `catalogGroupId` — идентификатор типа цены
- `price` — минимальная цена, с которой применяется правило
- `roundType` — тип округления
- `roundPrecision` — точность округления
- `createdBy` — идентификатор автора правила
- `dateCreate` — дата и время создания
- `modifiedBy` — идентификатор пользователя, который последним изменил правило
- `dateModify` — дата и время последнего изменения

Значение `["*"]` не поддерживается.

По умолчанию: все поля ||
|| **filter**
[`array`](../../data-types.md) | Фильтр в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`. Фильтровать можно по всем полям из `select`.

Синтаксис и операторы описаны в [обзоре REST 3.0](../../rest-v3.md#filter) ||
|| **order**
[`object`](../../data-types.md) | Сортировка в формате `{"поле": "направление"}`. Сортировать можно по всем полям из `select`.

Возможные значения направления:

- `ASC` — по возрастанию
- `DESC` — по убыванию

Регистр направления не важен.

По умолчанию: `{"id": "ASC"}` ||
|| **pagination**
[`object`](../../data-types.md) | Объект постраничной навигации. [Описание структуры объекта](#pagination) ||
|#

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../data-types.md) | Количество правил на странице. Значения больше `1000` уменьшаются до `1000`. Ноль, отрицательное и нечисловое значение вызывают ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../data-types.md) | Номер страницы, начиная с `1`. Смещение вычисляется как `(page - 1) × limit`. Ноль и отрицательное значение возвращают первую страницу.

Если передан `page`, параметр `offset` не учитывается ||
|| **offset**
[`integer`](../../data-types.md) | Количество правил, которые нужно пропустить от начала списка. Отрицательное значение вызывает ошибку.

По умолчанию: `0` ||
|#

{% note info "" %}

Ответ не содержит общего количества правил. Если на странице вернулось меньше записей, чем указано в `limit`, это последняя страница.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.roundingrule.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","catalogGroupId","price","roundType","roundPrecision"],"filter":[["catalogGroupId","=",25]],"order":{"price":"asc"},"pagination":{"limit":10}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.roundingrule.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","catalogGroupId","price","roundType","roundPrecision"],"filter":[["catalogGroupId","=",25]],"order":{"price":"asc"},"pagination":{"limit":10},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.roundingrule.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type RoundingRuleListResult = {
      items: Array<{
        id: number
        catalogGroupId: number
        price: number
        roundType: 1 | 2 | 4
        roundPrecision: number
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<RoundingRuleListResult>({
        method: 'catalog.roundingrule.list',
        params: {
          select: ['id', 'catalogGroupId', 'price', 'roundType', 'roundPrecision'],
          filter: [
            ['catalogGroupId', '=', 25],
          ],
          order: {
            price: 'asc',
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
        console.info('Rounding rules:', result.items)
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
      async function listRoundingRules() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.roundingrule.list',
            params: {
              select: ['id', 'catalogGroupId', 'price', 'roundType', 'roundPrecision'],
              filter: [
                ['catalogGroupId', '=', 25],
              ],
              order: {
                price: 'asc',
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
          console.info('Rounding rules:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listRoundingRules)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.roundingrule.list(
            select=["id", "catalogGroupId", "price", "roundType", "roundPrecision"],
            filter=[
                ["catalogGroupId", "=", 25],
            ],
            order={
                "price": "asc",
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
                'catalog.roundingrule.list',
                [
                    'select' => ['id', 'catalogGroupId', 'price', 'roundType', 'roundPrecision'],
                    'filter' => [
                        ['catalogGroupId', '=', 25],
                    ],
                    'order' => [
                        'price' => 'asc',
                    ],
                    'pagination' => [
                        'limit' => 10,
                    ],
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

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'catalog.roundingrule.list',
        {
            select: ['id', 'catalogGroupId', 'price', 'roundType', 'roundPrecision'],
            filter: [
                ['catalogGroupId', '=', 25],
            ],
            order: {
                price: 'asc',
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
        'catalog.roundingrule.list',
        [
            'select' => ['id', 'catalogGroupId', 'price', 'roundType', 'roundPrecision'],
            'filter' => [
                ['catalogGroupId', '=', 25],
            ],
            'order' => [
                'price' => 'asc',
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
    res, err := client.Core().Call(ctx, "catalog.roundingrule.list", b24.Params{
    	"select":     []string{"id", "catalogGroupId", "price", "roundType", "roundPrecision"},
    	"filter":     []any{
    		[]any{"catalogGroupId", "=", 25},
    	},
    	"order":      b24.Params{
    		"price": "asc",
    	},
    	"pagination": b24.Params{
    		"limit": 10,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.roundingrule.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID             int     `json:"id"`
    		Price          float64 `json:"price"`
    		RoundType      int     `json:"roundType"`
    		RoundPrecision float64 `json:"roundPrecision"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.Price, item.RoundType)
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
                "catalogGroupId": 25,
                "price": 0,
                "roundType": 1,
                "roundPrecision": 1
            },
            {
                "id": 3,
                "catalogGroupId": 25,
                "price": 1000,
                "roundType": 4,
                "roundPrecision": 100
            }
        ]
    },
    "time": {
        "start": 1792668056,
        "finish": 1792668057.012486,
        "duration": 1.0124859809875488,
        "processing": 0,
        "date_start": "2026-10-22T14:20:56+03:00",
        "date_finish": "2026-10-22T14:20:57+03:00",
        "operating_reset_at": 1792668600,
        "operating": 0
    }
}
```

### Возвращаемые данные {#returned-data}

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **result.items**
[`array`](../../data-types.md) | Массив правил округления на странице. [Описание полей элемента](#items) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#items}

Состав полей зависит от `select`.

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор правила округления ||
|| **catalogGroupId**
[`integer`](../../data-types.md) | Идентификатор типа цены, для которого действует правило ||
|| **price**
[`double`](../../data-types.md) | Минимальная цена, начиная с которой применяется правило. `0` — правило для всех цен типа ||
|| **roundType**
[`integer`](../../data-types.md) | Тип округления: `1` — математическое, `2` — в большую сторону, `4` — в меньшую сторону ||
|| **roundPrecision**
[`double`](../../data-types.md) | Точность округления, например `10` — до десятков ||
|| **createdBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который создал правило ||
|| **dateCreate**
[`datetime`](../../data-types.md) | Дата и время создания правила ||
|| **modifiedBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который последним изменил правило ||
|| **dateModify**
[`datetime`](../../data-types.md) | Дата и время последнего изменения правила ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION",
        "message": "Не удается распознать выражение сортировки `up`"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `#FIELD#` | В поле `#FIELD#` требуется тип данных `#TYPE#` для такого запроса | Передайте в фильтре значение нужного типа: число для `id`, `catalogGroupId`, `roundType` и других числовых полей ||
|#

#### Ошибки фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `Unknown filter condition` | Передайте `filter` массивом условий, например `[["catalogGroupId","=",1]]` ||
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
|| `order` | Не удается распознать выражение сортировки `#ORDER#` | Передайте `order` объектом, например `{"id":"ASC"}`, с направлением `ASC` или `DESC` ||
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
|| `select`, `filter`, `order` | Неизвестное поле `#FIELD#` для сущности `RoundingRuleDto` | Используйте только поля `id`, `catalogGroupId`, `price`, `roundType`, `roundPrecision`, `createdBy`, `dateCreate`, `modifiedBy`, `dateModify` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `#SELECT#` | Передайте `select` массивом строк, например `["id"]` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Просмотр каталога товаров» или «Управление типами цен» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-rounding-rule-add-rest-v3.md)
- [{#T}](./catalog-rounding-rule-update-rest-v3.md)
- [{#T}](./catalog-rounding-rule-get-rest-v3.md)
- [{#T}](./catalog-rounding-rule-delete-rest-v3.md)
- [{#T}](./catalog-rounding-rule-field-list.md)
