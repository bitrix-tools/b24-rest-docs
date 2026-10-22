# Получить список товаров в документах складского учета v 3.0 catalog.document.element.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Просмотр и выбор склада»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `catalog.document.element.list` возвращает список товарных позиций документов складского учета.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Массив полей товарной позиции, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор товарной позиции
- `docId` — идентификатор документа
- `storeFrom` — склад, с которого списывается товар
- `storeTo` — склад, на который поступает товар
- `elementId` — идентификатор товара
- `amount` — количество
- `purchasingPrice` — закупочная цена

Поле `id` возвращается всегда, даже если его нет в `select`. Значение `["*"]` не поддерживается.

По умолчанию: все поля ||
|| **filter**
[`array`](../../../data-types.md) | Фильтр в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`, например `[["docId", "=", 325]]`. Синтаксис фильтра описан в [обзоре REST 3.0](../../../rest-v3.md#filter).

Фильтровать можно по всем полям из параметра `select`. Поддерживаются группы условий с логикой `or`.

Метод возвращает позиции только тех документов и складов, которые доступны пользователю ||
|| **order**
[`object`](../../../data-types.md) | Сортировка в формате `{"поле": "направление"}`, например `{"id": "asc"}`.

Возможные значения направления:

- `asc` — по возрастанию
- `desc` — по убыванию

Сортировать можно по полям `id`, `docId`, `elementId`, `amount`, `purchasingPrice`. Поля `storeFrom` и `storeTo` для сортировки недоступны ||
|| **pagination**
[`object`](../../../data-types.md) | Постраничная навигация. [Описание объекта](#pagination) ||
|#

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../../data-types.md) | Количество записей на странице. Значения больше `1000` уменьшаются до `1000`, значение `0` вызывает ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../../data-types.md) | Номер страницы, начиная с `1`. Если передан, заменяет `offset`. Страница за концом списка возвращает пустой массив ||
|| **offset**
[`integer`](../../../data-types.md) | Количество записей, которые нужно пропустить ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.document.element.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["docId","=",325]],"select":["id","elementId","storeTo","amount","purchasingPrice"],"order":{"id":"asc"},"pagination":{"limit":10}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.element.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["docId","=",325]],"select":["id","elementId","storeTo","amount","purchasingPrice"],"order":{"id":"asc"},"pagination":{"limit":10},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.document.element.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DocumentElementListResult = {
      items: Array<{
        id: number
        elementId?: number
        storeTo?: number
        amount?: number
        purchasingPrice?: number
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<DocumentElementListResult>({
        method: 'catalog.document.element.list',
        params: {
          filter: [
            ['docId', '=', 325],
          ],
          select: ['id', 'elementId', 'storeTo', 'amount', 'purchasingPrice'],
          order: {
            id: 'asc',
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
        console.info('Elements:', result.items.length)
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
      async function documentElementList() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.document.element.list',
            params: {
              filter: [
                ['docId', '=', 325],
              ],
              select: ['id', 'elementId', 'storeTo', 'amount', 'purchasingPrice'],
              order: {
                id: 'asc',
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
          console.info('Elements:', result.items.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', documentElementList)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.document.element.list(
            filter=[
                ["docId", "=", 325],
            ],
            select=["id", "elementId", "storeTo", "amount", "purchasingPrice"],
            order={
                "id": "asc",
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
                'catalog.document.element.list',
                [
                    'filter' => [
                        ['docId', '=', 325],
                    ],
                    'select' => ['id', 'elementId', 'storeTo', 'amount', 'purchasingPrice'],
                    'order' => [
                        'id' => 'asc',
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
        'catalog.document.element.list',
        {
            filter: [
                ['docId', '=', 325],
            ],
            select: ['id', 'elementId', 'storeTo', 'amount', 'purchasingPrice'],
            order: {
                id: 'asc',
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
        'catalog.document.element.list',
        [
            'filter' => [
                ['docId', '=', 325],
            ],
            'select' => ['id', 'elementId', 'storeTo', 'amount', 'purchasingPrice'],
            'order' => [
                'id' => 'asc',
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
    res, err := client.Core().Call(ctx, "catalog.document.element.list", b24.Params{
    	"filter":     []any{
    		[]any{"docId", "=", 325},
    	},
    	"select":     []string{"id", "elementId", "storeTo", "amount", "purchasingPrice"},
    	"order":      b24.Params{
    		"id": "asc",
    	},
    	"pagination": b24.Params{
    		"limit": 10,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.document.element.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID        int     `json:"id"`
    		ElementID int     `json:"elementId"`
    		Amount    float64 `json:"amount"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.ElementID, item.Amount)
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
                "id": 59,
                "storeTo": 17,
                "elementId": 7573,
                "amount": 5,
                "purchasingPrice": 120
            },
            {
                "id": 65,
                "storeTo": 17,
                "elementId": 7571,
                "amount": 10,
                "purchasingPrice": 450
            }
        ]
    },
    "time": {
        "start": 1792665368,
        "finish": 1792665368.395274,
        "duration": 0.39527392387390137,
        "processing": 0,
        "date_start": "2026-10-22T13:36:08+03:00",
        "date_finish": "2026-10-22T13:36:08+03:00",
        "operating_reset_at": 1792665960,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.items**
[`array`](../../../data-types.md) | Массив товарных позиций. Состав полей зависит от `select`. [Описание полей](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор товарной позиции документа ||
|| **docId**
[`integer`](../../../data-types.md) | Идентификатор документа складского учета ||
|| **storeFrom**
[`integer`](../../../data-types.md) | Идентификатор склада, с которого списывается товар. `0` — склад не указан ||
|| **storeTo**
[`integer`](../../../data-types.md) | Идентификатор склада, на который поступает товар. `0` — склад не указан ||
|| **elementId**
[`integer`](../../../data-types.md) | Идентификатор товара ||
|| **amount**
[`double`](../../../data-types.md) | Количество товара ||
|| **purchasingPrice**
[`double`](../../../data-types.md) | Закупочная цена в валюте документа ||
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
                "message": "В DTO `DocumentElementDto` в поле `storeTo` требуется наличие атрибута `Sortable` для такого запроса",
                "field": "storeTo"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `storeFrom`, `storeTo` | В DTO `DocumentElementDto` в поле `#FIELD#` требуется наличие атрибута `Sortable` для такого запроса | Уберите `storeFrom` и `storeTo` из `order` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select`, `filter`, `order` | Неизвестное поле `#FIELD#` для сущности `DocumentElementDto` | Укажите только поля из описания параметра `select` ||
|#

#### Ошибка формата фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `Unknown filter condition` | Передайте `filter` массивом условий, например `[["docId","=",325]]` ||
|#

#### Ошибка формата сортировки

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `order` | Не удается распознать выражение сортировки `#ORDER#` | Передайте направление `asc` или `desc` ||
|#

#### Ошибка пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `{"limit":0}` | Передайте в `limit` число от `1` до `1000` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Просмотр каталога товаров» или «Просмотр и выбор склада» ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-document-element-add-rest-v3.md)
- [{#T}](./catalog-document-element-update-rest-v3.md)
- [{#T}](./catalog-document-element-delete-rest-v3.md)
- [{#T}](./catalog-document-element-field-list.md)
- [{#T}](./catalog-document-element-field-get.md)
- [{#T}](../catalog-document-list-rest-v3.md)
