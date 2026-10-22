# Получить список документов складского учета v 3.0 catalog.document.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр и выбор склада» или «Просмотр каталога товаров»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.document.list` возвращает список документов складского учета по фильтру.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив полей документа, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор документа
- `docType` — тип документа
- `siteId` — идентификатор сайта
- `responsibleId` — идентификатор ответственного
- `dateModify` — дата изменения
- `dateCreate` — дата создания
- `createdBy` — кто создал
- `modifiedBy` — кто изменил
- `currency` — валюта
- `status` — статус проведения
- `dateStatus` — дата изменения статуса
- `dateDocument` — дата документа
- `statusBy` — кто изменил статус
- `total` — сумма
- `commentary` — комментарий
- `title` — название
- `docNumber` — номер входящего документа
- `contractorId` — идентификатор поставщика

Поле `id` возвращается всегда, даже если его нет в `select`. Значение `["*"]` не поддерживается.

По умолчанию: все поля ||
|| **filter**
[`array`](../../data-types.md) | Фильтр списка в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`, например `[["docType", "=", "A"]]`. Синтаксис фильтра описан в [обзоре REST 3.0](../../rest-v3.md#filter).

Фильтровать можно по полям `id`, `docType`, `siteId`, `responsibleId`, `dateModify`, `dateCreate`, `createdBy`, `modifiedBy`, `currency`, `status`, `dateStatus`, `dateDocument`, `statusBy`, `total`, `title`, `docNumber`, `contractorId`.

Статус проведения `status` в фильтре передавайте как `Y` — проведен или `N` — не проведен.

Метод возвращает только документы тех типов, на которые у пользователя есть право «Просмотр» ||
|| **order**
[`object`](../../data-types.md) | Сортировка в формате `{"поле": "направление"}`, например `{"id": "desc"}`.

Возможные значения направления:

- `asc` — по возрастанию
- `desc` — по убыванию

Сортировать можно по полям `id`, `docType`, `responsibleId`, `dateModify`, `dateCreate`, `createdBy`, `modifiedBy`, `status`, `dateStatus`, `dateDocument`, `total`, `title`, `docNumber`, `contractorId` ||
|| **pagination**
[`object`](../../data-types.md) | Постраничная навигация. [Описание параметра](#pagination) ||
|#

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../data-types.md) | Количество документов на странице. Значение `0` вызывает ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../data-types.md) | Номер страницы, начиная с `1`. Страница за пределами списка возвращает пустой массив ||
|| **offset**
[`integer`](../../data-types.md) | Количество документов, которые нужно пропустить от начала списка ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.document.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","docType","title","status","total"],"filter":[["docType","=","A"],["status","=","N"]],"order":{"id":"desc"},"pagination":{"limit":2}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","docType","title","status","total"],"filter":[["docType","=","A"],["status","=","N"]],"order":{"id":"desc"},"pagination":{"limit":2},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.document.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DocumentListResult = {
      items: Array<{
        id: number
        docType: string
        status: string
        total: number
        title: string
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<DocumentListResult>({
        method: 'catalog.document.list',
        params: {
          select: ['id', 'docType', 'title', 'status', 'total'],
          filter: [
            ['docType', '=', 'A'],
            ['status', '=', 'N'],
          ],
          order: {
            id: 'desc',
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
        console.info('Documents:', result.items.length)
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
      async function callDocumentList() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.document.list',
            params: {
              select: ['id', 'docType', 'title', 'status', 'total'],
              filter: [
                ['docType', '=', 'A'],
                ['status', '=', 'N'],
              ],
              order: {
                id: 'desc',
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
          console.info('Documents:', result.items.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', callDocumentList)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.document.list(
            select=["id", "docType", "title", "status", "total"],
            filter=[
                ["docType", "=", "A"],
                ["status", "=", "N"],
            ],
            order={
                "id": "desc",
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
                'catalog.document.list',
                [
                    'select' => ['id', 'docType', 'title', 'status', 'total'],
                    'filter' => [
                        ['docType', '=', 'A'],
                        ['status', '=', 'N'],
                    ],
                    'order' => [
                        'id' => 'desc',
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
        'catalog.document.list',
        {
            select: ['id', 'docType', 'title', 'status', 'total'],
            filter: [
                ['docType', '=', 'A'],
                ['status', '=', 'N'],
            ],
            order: {
                id: 'desc',
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
        'catalog.document.list',
        [
            'select' => ['id', 'docType', 'title', 'status', 'total'],
            'filter' => [
                ['docType', '=', 'A'],
                ['status', '=', 'N'],
            ],
            'order' => [
                'id' => 'desc',
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
    res, err := client.Core().Call(ctx, "catalog.document.list", b24.Params{
    	"select":     []string{"id", "docType", "title", "status", "total"},
    	"filter":     []any{
    		[]string{"docType", "=", "A"},
    		[]string{"status", "=", "N"},
    	},
    	"order":      b24.Params{
    		"id": "desc",
    	},
    	"pagination": b24.Params{
    		"limit": 2,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.document.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID      int     `json:"id"`
    		DocType string  `json:"docType"`
    		Title   string  `json:"title"`
    		Status  string  `json:"status"`
    		Total   float64 `json:"total"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.Title, item.Status)
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
                "id": 343,
                "docType": "A",
                "status": "",
                "total": 15000,
                "title": "Приход от поставщика ООО Альфа"
            },
            {
                "id": 319,
                "docType": "A",
                "status": "",
                "total": 8200,
                "title": "Приход от поставщика ООО Бета"
            }
        ]
    },
    "time": {
        "start": 1792665268,
        "finish": 1792665268.074479,
        "duration": 0.0744791030883789,
        "processing": 0,
        "date_start": "2026-10-22T13:34:28+03:00",
        "date_finish": "2026-10-22T13:34:28+03:00",
        "operating_reset_at": 1792665840,
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
[`array`](../../data-types.md) | Массив документов. Состав полей каждого документа зависит от `select`. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор документа ||
|| **docType**
[`string`](../../data-types.md) | Тип документа: `A` — приход, `S` — оприходование, `M` — перемещение, `R` — возврат, `D` — списание ||
|| **siteId**
[`string`](../../data-types.md) | Идентификатор сайта, например `s1` ||
|| **responsibleId**
[`integer`](../../data-types.md) | Идентификатор ответственного ||
|| **dateModify**
[`datetime`](../../data-types.md) | Дата и время последнего изменения ||
|| **dateCreate**
[`datetime`](../../data-types.md) | Дата и время создания ||
|| **createdBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который создал документ ||
|| **modifiedBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который последним изменил документ ||
|| **currency**
[`string`](../../data-types.md) | Код валюты документа, например `RUB` ||
|| **status**
[`string`](../../data-types.md) | Статус проведения: `"1"` — документ проведен, пустая строка — не проведен ||
|| **dateStatus**
[`datetime`](../../data-types.md) | Дата и время последнего изменения статуса ||
|| **dateDocument**
[`datetime`](../../data-types.md) или `null` | Дата документа. `null`, если дата не задана ||
|| **statusBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который последним изменил статус. `0`, если статус не менялся ||
|| **total**
[`double`](../../data-types.md) | Сумма документа ||
|| **commentary**
[`string`](../../data-types.md) | Комментарий ||
|| **title**
[`string`](../../data-types.md) | Название документа ||
|| **docNumber**
[`string`](../../data-types.md) | Номер входящего документа ||
|| **contractorId**
[`integer`](../../data-types.md) | Идентификатор поставщика из справочника каталога. `0`, если поставщик не указан ||
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
                "message": "В DTO `DocumentDto` в поле `commentary` требуется наличие атрибута `Filterable` для такого запроса",
                "field": "commentary"
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
|| `#FIELD#` | В DTO `DocumentDto` в поле `#FIELD#` требуется наличие атрибута `Filterable` для такого запроса | Уберите из `filter` поле, по которому нельзя фильтровать ||
|| `#FIELD#` | В DTO `DocumentDto` в поле `#FIELD#` требуется наличие атрибута `Sortable` для такого запроса | Уберите из `order` поле, по которому нельзя сортировать ||
|#

#### Ошибка формата фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `Unknown filter condition` | Передайте `filter` массивом условий, например `[["docType","=","A"]]` ||
|#

#### Ошибка оператора фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Неизвестный оператор фильтра `#OPERATOR#` | Используйте операторы из [обзора REST 3.0](../../rest-v3.md#operators) ||
|#

#### Ошибка пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте в `limit` положительное число ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select`, `filter`, `order` | Неизвестное поле `#FIELD#` для сущности `DocumentDto` | Укажите только поля из описания параметра `select` ||
|#

#### Ошибка формата select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `#SELECT#` | Передайте `select` массивом строк, например `["id","title"]` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Просмотр и выбор склада» или «Просмотр каталога товаров» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-document-add-rest-v3.md)
- [{#T}](./catalog-document-update-rest-v3.md)
- [{#T}](./catalog-document-get.md)
- [{#T}](./catalog-document-delete-rest-v3.md)
- [{#T}](./catalog-document-delete-list-rest-v3.md)
- [{#T}](./catalog-document-field-list.md)
- [{#T}](./catalog-document-field-get.md)
