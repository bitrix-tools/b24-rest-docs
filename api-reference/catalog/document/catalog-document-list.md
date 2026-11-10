# Получить список документов складского учета catalog.document.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Просмотр и выбор склада»

Метод `catalog.document.list` возвращает список документов складского учета с фильтрацией, сортировкой и постраничной навигацией.

В ответ попадают только документы тех типов, на которые у пользователя есть право «Просмотр», и только с доступными ему складами. Документы отмены резервирования, тип `U`, метод не возвращает.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив полей документа, которые нужно вернуть. Доступные поля: `commentary`, `createdBy`, `currency`, `dateCreate`, `dateDocument`, `dateModify`, `dateStatus`, `docNumber`, `docType`, `id`, `modifiedBy`, `responsibleId`, `siteId`, `status`, `statusBy`, `title`, `total`. Описание полей — в объекте [catalog_document](../data-types.md#catalog_document).

Если массив не передан или пустой, метод вернет все поля. Неизвестные поля метод пропускает без ошибки. Имена полей пишите в camelCase: если в `select` нет ни одного известного поля, например `["ID", "TITLE"]`, метод вернет все поля
||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации документов в формате `{"field_1": "value_1", ..., "field_N": "value_N"}`.

Возможные значения для `field` — поля из списка в `select`. Например, `{"docType": "S", "status": "N"}` вернет черновики документов оприходования.

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
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

Массив без префикса работает как IN: `{"id": [359, 369]}` вернет оба документа.

Неизвестные поля и имена в верхнем регистре, например `ID`, метод пропускает без ошибки и возвращает документы без учета такого условия. Проверяйте имена полей по списку выше
||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки документов в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` — поля из списка в `select`.

Возможные значения для `order`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания

Регистр направления не важен: `DESC` и `desc` работают одинаково. Неизвестные поля в `order` метод пропускает без ошибки. По умолчанию документы упорядочены по возрастанию `id`
||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы.

Если есть следующая страница, ответ содержит ключ `next` со значением `start` для нее. Если `start` больше количества найденных документов, метод вернет пустой массив `documents`
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример получает черновики документов оприходования, в названии которых есть «Оприходование излишков», начиная с новых.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","docType","docNumber","title","status","dateDocument","total"],"filter":{"docType":"S","status":"N","%title":"Оприходование излишков"},"order":{"id":"desc"},"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","docType","docNumber","title","status","dateDocument","total"],"filter":{"docType":"S","status":"N","%title":"Оприходование излишков"},"order":{"id":"desc"},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.document.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of one document returned in result.documents (only the selected fields)
    type DocumentListItem = {
      id: number
      docType: string
      docNumber: string | null
      title: string | null
      status: string
      dateDocument: ISODate | null
      total: number | null
    }

    try {
      // catalog.document.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<{ documents: DocumentListItem[] }>({
        method: 'catalog.document.list',
        params: {
          select: ['id', 'docType', 'docNumber', 'title', 'status', 'dateDocument', 'total'],
          filter: {
            docType: 'S',
            status: 'N',
            '%title': 'Оприходование излишков',
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
        console.info('Documents on page:', result.documents.length)
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
      async function listDocuments() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.document.list',
            params: {
              select: ['id', 'docType', 'docNumber', 'title', 'status', 'dateDocument', 'total'],
              filter: {
                docType: 'S',
                status: 'N',
                '%title': 'Оприходование излишков',
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
          console.info('Documents on page:', result.documents.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listDocuments)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.document.list(
            select=["id", "docType", "docNumber", "title", "status", "dateDocument", "total"],
            filter={
                "docType": "S",
                "status": "N",
                "%title": "Оприходование излишков",
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
                'catalog.document.list',
                [
                    'select' => ['id', 'docType', 'docNumber', 'title', 'status', 'dateDocument', 'total'],
                    'filter' => [
                        'docType' => 'S',
                        'status'  => 'N',
                        '%title'  => 'Оприходование излишков',
                    ],
                    'order'  => [
                        'id' => 'desc',
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
        'catalog.document.list',
        {
            select: ['id', 'docType', 'docNumber', 'title', 'status', 'dateDocument', 'total'],
            filter: {
                docType: 'S',
                status: 'N',
                '%title': 'Оприходование излишков',
            },
            order: {
                id: 'desc',
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
        'catalog.document.list',
        [
            'select' => ['id', 'docType', 'docNumber', 'title', 'status', 'dateDocument', 'total'],
            'filter' => [
                'docType' => 'S',
                'status' => 'N',
                '%title' => 'Оприходование излишков',
            ],
            'order' => [
                'id' => 'desc',
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
    res, err := client.Core().Call(ctx, "catalog.document.list", b24.Params{
    	"select": []string{"id", "docType", "docNumber", "title", "status", "dateDocument", "total"},
    	"filter": b24.Params{
    		"docType": "S",
    		"status":  "N",
    		"%title":  "Оприходование излишков",
    	},
    	"order": b24.Params{
    		"id": "desc",
    	},
    	"start": 0,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.document.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "documents".
    raw, ok := b24.Unwrap(res.Result, "documents")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа documents")
    }

    // Необязательные поля могут прийти как null, поэтому для них указатели.
    var items []struct {
    	ID           b24.ID   `json:"id"`
    	DocType      string   `json:"docType"`
    	DocNumber    *string  `json:"docNumber"`
    	Title        *string  `json:"title"`
    	Status       string   `json:"status"`
    	DateDocument *string  `json:"dateDocument"`
    	Total        *float64 `json:"total"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID, it.Status)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "documents": [
            {
                "dateDocument": "2026-11-06T10:00:00+03:00",
                "docNumber": "OP-00042",
                "docType": "S",
                "id": 381,
                "status": "N",
                "title": "Оприходование излишков",
                "total": null
            }
        ]
    },
    "total": 1,
    "time": {
        "start": 1793883564,
        "finish": 1793883564.287555,
        "duration": 0.2875549793243408,
        "processing": 0,
        "date_start": "2026-11-05T15:59:24+03:00",
        "date_finish": "2026-11-05T15:59:24+03:00",
        "operating_reset_at": 1793884140,
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
|| **result.documents**
[`catalog_document[]`](../data-types.md#catalog_document) | Массив документов. У каждого документа только поля из `select`, пустые поля приходят со значением `null` ||
|| **next**
[`integer`](../../data-types.md) | Значение `start` для следующей страницы. Ключа нет, если страница последняя ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных документов ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Invalid order \"BAD\""
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | Недостаточно прав для сохранения документа | У пользователя нет ни права «Просмотр каталога товаров», ни права «Просмотр и выбор склада» ||
|| `400` | `100` | Invalid order "BAD" | В `order` передано направление, отличное от `asc` и `desc`. В тексте направление приведено к верхнему регистру ||
|| `400` | `100` | Invalid value {abc} to match with parameter {filter}. Should be value of type array. | В `filter` передан не объект. Такая же ошибка с `{select}` или `{order}` — если в них передан не массив или не объект ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-document-add.md)
- [{#T}](./catalog-document-update.md)
- [{#T}](./catalog-document-delete.md)
- [{#T}](./catalog-document-conduct.md)
- [{#T}](./catalog-document-get-fields.md)
- [{#T}](./document-element/catalog-document-element-list.md)
