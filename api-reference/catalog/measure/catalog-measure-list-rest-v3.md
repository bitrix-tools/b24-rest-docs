# Получить список единиц измерения v 3.0 catalog.measure.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом чтения каталога или просмотра складов

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.measure.list` возвращает список единиц измерения с фильтрацией, сортировкой и постраничной навигацией.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив полей единицы измерения, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор единицы измерения
- `code` — код единицы измерения
- `measureTitle` — название
- `symbol` — условное обозначение
- `symbolIntl` — международное условное обозначение
- `symbolLetterIntl` — международное кодовое буквенное обозначение
- `isDefault` — признак единицы по умолчанию

По умолчанию: все поля. Пустой массив `[]` также возвращает все поля, значение `["*"]` не поддерживается ||
|| **filter**
[`array`](../../data-types.md) | Фильтр списка в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`, например `[["code","in",[796,166]]]`.

Фильтровать можно по всем полям из списка `select`. Для `isDefault` передавайте `true` или `false`.

Синтаксис фильтра описан в [обзоре REST 3.0](../../rest-v3.md#filter) ||
|| **order**
[`object`](../../data-types.md) | Сортировка в формате `{"поле": "направление"}`, например `{"code":"DESC"}`.

Сортировать можно по всем полям из списка `select`.

Возможные значения направления:

- `ASC` — по возрастанию
- `DESC` — по убыванию ||
|| **pagination**
[`object`](../../data-types.md) | Параметры постраничной навигации. [Описание структуры объекта](#pagination) ||
|#

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../data-types.md) | Количество единиц измерения на странице. Значения больше `1000` уменьшаются до `1000`. Ноль, отрицательное и нечисловое значение вызывают ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../data-types.md) | Номер страницы, начиная с `1`. Смещение вычисляется как `(page - 1) * limit`. Если передан `page`, значение `offset` не учитывается ||
|| **offset**
[`integer`](../../data-types.md) | Количество записей, которые нужно пропустить от начала списка.

По умолчанию: `0` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.measure.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","code","measureTitle","symbol","isDefault"],"filter":[["code","in",[796,166]]],"order":{"code":"DESC"},"pagination":{"limit":2}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.measure.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","code","measureTitle","symbol","isDefault"],"filter":[["code","in",[796,166]]],"order":{"code":"DESC"},"pagination":{"limit":2},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.measure.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type MeasureListResult = {
      items: Array<{
        id: number
        code: number
        measureTitle: string
        symbol: string
        isDefault: boolean
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<MeasureListResult>({
        method: 'catalog.measure.list',
        params: {
          select: ['id', 'code', 'measureTitle', 'symbol', 'isDefault'],
          filter: [
            ['code', 'in', [796, 166]],
          ],
          order: {
            code: 'DESC',
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
        console.info('Measures:', result.items)
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
      async function listMeasures() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.measure.list',
            params: {
              select: ['id', 'code', 'measureTitle', 'symbol', 'isDefault'],
              filter: [
                ['code', 'in', [796, 166]],
              ],
              order: {
                code: 'DESC',
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
          console.info('Measures:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listMeasures)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.measure.list(
            select=["id", "code", "measureTitle", "symbol", "isDefault"],
            filter=[
                ["code", "in", [796, 166]],
            ],
            order={
                "code": "DESC",
            },
            pagination={
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
                'catalog.measure.list',
                [
                    'select' => ['id', 'code', 'measureTitle', 'symbol', 'isDefault'],
                    'filter' => [
                        ['code', 'in', [796, 166]],
                    ],
                    'order' => [
                        'code' => 'DESC',
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
        'catalog.measure.list',
        {
            select: ['id', 'code', 'measureTitle', 'symbol', 'isDefault'],
            filter: [
                ['code', 'in', [796, 166]],
            ],
            order: {
                code: 'DESC',
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
        'catalog.measure.list',
        [
            'select' => ['id', 'code', 'measureTitle', 'symbol', 'isDefault'],
            'filter' => [
                ['code', 'in', [796, 166]],
            ],
            'order' => [
                'code' => 'DESC',
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
    res, err := client.Core().Call(ctx, "catalog.measure.list", b24.Params{
    	"select": []string{"id", "code", "measureTitle", "symbol", "isDefault"},
    	"filter": []any{
    		[]any{"code", "in", []int{796, 166}},
    	},
    	"order": b24.Params{
    		"code": "DESC",
    	},
    	"pagination": b24.Params{
    		"limit": 2,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.measure.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID           int    `json:"id"`
    		Code         int    `json:"code"`
    		MeasureTitle string `json:"measureTitle"`
    		Symbol       string `json:"symbol"`
    		IsDefault    bool   `json:"isDefault"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.Code, item.IsDefault)
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
                "id": 9,
                "code": 796,
                "measureTitle": "",
                "symbol": "",
                "isDefault": true
            },
            {
                "id": 7,
                "code": 166,
                "measureTitle": "",
                "symbol": "",
                "isDefault": false
            }
        ]
    },
    "time": {
        "start": 1792665518,
        "finish": 1792665518.241684,
        "duration": 0.2416839599609375,
        "processing": 0,
        "date_start": "2026-10-22T13:38:38+03:00",
        "date_finish": "2026-10-22T13:38:38+03:00",
        "operating_reset_at": 1792666080,
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
[`array`](../../data-types.md) | Массив единиц измерения на странице. Состав полей зависит от `select`. [Описание полей](#items) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

Общее количество записей метод не возвращает. Если в ответе меньше записей, чем `limit`, страница последняя.

#### Элемент items {#items}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор единицы измерения ||
|| **code**
[`integer`](../../data-types.md) | Код единицы измерения ||
|| **measureTitle**
[`string`](../../data-types.md) | Название единицы измерения. Пустая строка, если значение не задано ||
|| **symbol**
[`string`](../../data-types.md) | Условное обозначение. Пустая строка, если значение не задано ||
|| **symbolIntl**
[`string`](../../data-types.md) | Международное условное обозначение. Пустая строка, если значение не задано ||
|| **symbolLetterIntl**
[`string`](../../data-types.md) | Международное кодовое буквенное обозначение. Пустая строка, если значение не задано ||
|| **isDefault**
[`boolean`](../../data-types.md) | `true` — единица измерения по умолчанию, `false` — обычная единица ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION",
        "message": "Не удается распознать выражение сортировки `UP`"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select`, `filter`, `order` | Неизвестное поле `#FIELD#` для сущности `MeasureDto` | Укажите только поля из [описания элемента items](#items) ||
|#

#### Ошибка формата фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `Unknown filter condition` | Передайте `filter` массивом условий, например `[["code","=",796]]` ||
|#

#### Ошибка сортировки

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `order` | Не удается распознать выражение сортировки `#ORDER#` | Передайте направление `ASC` или `DESC` ||
|#

#### Ошибка постраничной навигации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте `limit` положительным числом, `offset` — неотрицательным числом, `page` — числом ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет права чтения каталога или просмотра складов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-measure-add-rest-v3.md)
- [{#T}](./catalog-measure-update-rest-v3.md)
- [{#T}](./catalog-measure-get-rest-v3.md)
- [{#T}](./catalog-measure-delete-rest-v3.md)
- [{#T}](./catalog-measure-field-list.md)
